
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { aiIndexData, Lang, Context } from "./aiIndexData";

// Add font tracking to prevent multiple loads
let fontLoaded = false;

// Helper to fetch font as Base64/Binary
async function loadFonts(doc: jsPDF) {
    if (fontLoaded) return;

    try {
        const fontUrl = window.location.origin + '/fonts/Roboto-Regular.ttf';
        console.log(`[PDF] Fetching font from: ${fontUrl}`);

        const response = await fetch(fontUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch font: ${response.status} ${response.statusText} at ${fontUrl}`);
        }

        const blob = await response.blob();

        return new Promise<void>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    const base64 = reader.result.split(',')[1];
                    if (base64) {
                        doc.addFileToVFS("Roboto-Regular.ttf", base64);
                        doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
                        doc.setFont("Roboto");
                        console.log("[PDF] Font loaded and registered successfully");
                        fontLoaded = true;
                        resolve();
                    } else {
                        reject(new Error("Empty base64 result from FileReader"));
                    }
                } else {
                    reject(new Error("FileReader result is not a string"));
                }
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });

    } catch (err) {
        console.error("Font loading error:", err);
        // Fallback to standard font if custom fails (will break Cyrillic but prevent crash)
        console.warn("Falling back to standard fonts (Cyrillic will be broken)");
    }
}

export const generateAiPdf = async (
    score: number,
    zoneKey: "green" | "yellow" | "red",
    lang: Lang,
    context: Context,
    email: string
) => {
    const doc = new jsPDF();
    await loadFonts(doc);
    doc.setFont("Roboto");

    const t = aiIndexData.translations[lang];
    const zone = t.zones[zoneKey];
    const offer = t.offers[zoneKey];
    const config = aiIndexData.config.zones[zoneKey];

    // --- PAGE 1: SCORE & VERDICT ---

    // Background Header
    doc.setFillColor(15, 23, 42); // Slate-950
    doc.rect(0, 0, 210, 40, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("AI VELOCITY INDEX", 14, 20);
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184); // Slate-400
    doc.text(`ASSESSMENT REPORT | ${context === 'self' ? 'INDIVIDUAL' : 'TEAM'}`, 14, 30);

    // Date & Name
    doc.setFontSize(8);
    doc.text(new Date().toLocaleDateString(), 180, 20, { align: 'right' });
    doc.text(email, 180, 28, { align: 'right' });

    // Speedometer Visualization (Approximate)
    const centerX = 105;
    const centerY = 100;
    const radius = 40;

    // Draw Gauge Arc (Gray background)
    doc.setDrawColor(226, 232, 240); // Slate-200
    doc.setLineWidth(3);
    doc.arc(centerX, centerY, radius, radius, 180, 0, 'S'); // Half circle

    // Draw Active Arc based on score
    // Map score 0-100 to angle 180-0
    const angle = 180 - (score / 100 * 180);
    doc.setDrawColor(config.color); // Zone Color
    doc.setLineWidth(5);
    // doc.arc is limited in jsPDF raw, using approximate line for 'needle' instead for reliability

    // Needle
    const needleLen = 35;
    const rad = (angle + 180) * (Math.PI / 180); // Adjust for canvas coordinates
    // jsPDF coordinate system: 0 is right, 90 is down. 
    // We want 180 (left) to 360/0 (right) going clockwise. 
    // Actually simpler: 
    // 0% = 180 deg (Left)
    // 50% = 270 deg (Top)
    // 100% = 360 deg (Right)
    const needleAngle = (180 + (score / 100 * 180)) * (Math.PI / 180);
    const nx = centerX + needleLen * Math.cos(needleAngle);
    const ny = centerY + needleLen * Math.sin(needleAngle);

    doc.setDrawColor(51, 65, 85); // Slate-700
    doc.setLineWidth(2);
    doc.line(centerX, centerY, nx, ny);
    doc.circle(centerX, centerY, 3, 'F');

    // Score Text
    doc.setTextColor(config.color);
    doc.setFontSize(50);
    doc.text(`${score}`, centerX, centerY + 25, { align: 'center' });
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text("/ 100", centerX, centerY + 35, { align: 'center' });

    // Verdict Section
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text(zone.title.toUpperCase(), centerX, centerY + 60, { align: 'center' });

    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.setFont("Roboto", "italic");
    doc.text(zone.slogan, centerX, centerY + 70, { align: 'center' });
    doc.setFont("Roboto", "normal");

    // Diagnosis Box
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(248, 250, 252); // Slate-50
    doc.roundedRect(20, 190, 170, 40, 3, 3, 'FD');

    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    const splitDesc = doc.splitTextToSize(zone.desc, 160);
    doc.text(splitDesc, 25, 200);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Powered by safarisaev.ai", 105, 280, { align: 'center' });


    // --- PAGE 2: ROADMAP (Static concept based on zone) ---
    doc.addPage();

    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text("STRATEGIC DIAGNOSIS & ROADMAP", 14, 13);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text(lang === 'ru' ? "Что это значит для вас?" : "What this means for you", 14, 40);

    // Generic Logic based on Zone (Hardcoded for prototype as per JSON lacks deep drill - using implicit knowledge based on prompt vibe)
    let diagnosisText = "";
    let steps = [];

    if (zoneKey === 'green') {
        diagnosisText = lang === 'ru'
            ? "Вы находитесь на пике эффективности. Ваша главная угроза — самодовольство. Технологии меняются каждую неделю."
            : "You are at peak efficiency. Your main threat is complacency. Technology changes every week.";
        steps = [
            lang === 'ru' ? "1. Создайте собственные LLM-модели (Fine-tuning)" : "1. Build custom LLM models (Fine-tuning)",
            lang === 'ru' ? "2. Автоматизируйте сложные цепочки задач агентами" : "2. Automate complex task chains with agents",
            lang === 'ru' ? "3. Начните продавать свои промпты или решения" : "3. Start selling your prompts or solutions"
        ];
    } else if (zoneKey === 'yellow') {
        diagnosisText = lang === 'ru'
            ? "Вы застряли в 'Ловушке Продуктивности'. Вы делаете старые вещи быстрее, но не делаете новые вещи."
            : "You are stuck in the 'Productivity Trap'. You do old things faster, but don't do new things.";
        steps = [
            lang === 'ru' ? "1. Превратите хаотичные промпты в Систему" : "1. Turn chaotic prompts into a System",
            lang === 'ru' ? "2. Освойте No-Code инструменты (Cursor/Replit)" : "2. Master No-Code tools (Cursor/Replit)",
            lang === 'ru' ? "3. Делегируйте ИИ не только текст, но и решения" : "3. Delegate decisions to AI, not just text"
        ];
    } else {
        diagnosisText = lang === 'ru'
            ? "Ваш бизнес/карьера в зоне риска. Вы конкурируете с людьми, которые в 10 раз быстрее вас."
            : "Your business/career is at risk. You are competing with people who are 10x faster than you.";
        steps = [
            lang === 'ru' ? "1. Начните использовать ИИ для ВСЕХ текстов" : "1. Start using AI for ALL texts",
            lang === 'ru' ? "2. Изучите основы промпт-инжиниринга" : "2. Learn basics of prompt engineering",
            lang === 'ru' ? "3. Перестаньте гуглить — начните спрашивать ИИ" : "3. Stop Googling — start asking AI"
        ];
    }

    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    const splitDiag = doc.splitTextToSize(diagnosisText, 180);
    doc.text(splitDiag, 14, 50);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(lang === 'ru' ? "Ваш План Действий:" : "Your Action Plan:", 14, 80);

    let yPos = 90;
    steps.forEach(step => {
        doc.setFontSize(11);
        doc.setTextColor(40, 40, 40);
        doc.text(step, 20, yPos);
        yPos += 15;
    });


    // --- PAGE 3: THE OFFER ---
    doc.addPage();

    // High impact header
    doc.setFillColor(config.color);
    doc.rect(0, 0, 210, 60, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text(lang === 'ru' ? "РЕКОМЕНДОВАННОЕ РЕШЕНИЕ" : "RECOMMENDED SOLUTION", 105, 30, { align: 'center' });

    // Offer Card
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(30, 80, 150, 100, 5, 5, 'FD');

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(20);
    const splitOffer = doc.splitTextToSize(offer.name, 120);
    doc.text(splitOffer, 105, 110, { align: 'center' });

    doc.setTextColor(config.color);
    doc.setFontSize(30);
    doc.setFont("Roboto", "bold");
    doc.text(offer.price, 105, 150, { align: 'center' });
    doc.setFont("Roboto", "normal");

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(lang === 'ru' ? "Нажмите, чтобы получить доступ" : "Click to access", 105, 200, { align: 'center' });

    // Manual Link (not clickable in basic jsPDF text usually without link annotation, but good enough for visual)
    doc.setTextColor(59, 130, 246); // Blue
    doc.textWithLink("safarisaev.ai/education", 105, 210, { url: "https://safarisaev.ai", align: 'center' });

    doc.save('Safar_Isaev_AI_Velocity_Report.pdf');
};
