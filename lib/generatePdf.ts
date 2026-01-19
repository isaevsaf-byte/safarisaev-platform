import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { REPORT_DATA } from "./reportContent";

// Helper to fetch font as Base64/Binary
async function loadFonts(doc: jsPDF) {
    try {
        const fontUrl = window.location.origin + '/fonts/Roboto-Regular.ttf';
        console.log(`[PDF] Fetching font from: ${fontUrl}`);

        // 2. Fetch the font as an ArrayBuffer
        const response = await fetch(fontUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch font: ${response.status} ${response.statusText} at ${fontUrl}`);
        }

        const blob = await response.blob();

        // 3. Convert to Base64 using FileReader (most reliable for browser)
        return new Promise<void>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    // remove "data:font/ttf;base64," header
                    const base64 = reader.result.split(',')[1];
                    if (base64) {
                        // base64 is supported by addFileToVFS in modern jsPDF
                        doc.addFileToVFS("Roboto-Regular.ttf", base64);
                        doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
                        doc.addFont("Roboto-Regular.ttf", "Roboto", "bold"); // Register as bold too to prevent fallback glitch
                        console.log("[PDF] Font loaded and registered successfully (Normal + Bold map)");
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
        throw err; // Propegate so we see the alert
    }
}

export const generateEfficiencyReport = async (
    score: number,
    revenue: string | number,
    zone: "red" | "green" | "yellow",
    lang: "en" | "ru"
) => {
    const doc = new jsPDF();

    // 1. Load Custom Font for Cyrillic
    await loadFonts(doc);
    doc.setFont("Roboto");

    try {
        const content = REPORT_DATA[lang][zone];
        const revenueDisplay = revenue.toLocaleString();

        // Header
        doc.setFontSize(20);
        doc.setTextColor(40, 40, 40);
        doc.text("SAFAR ISAEV | Efficiency Audit", 14, 22);

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Date: ${new Date().toLocaleDateString()} | ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}`, 14, 28);

        // Score Section
        doc.setFontSize(40);
        doc.setTextColor(zone === 'red' ? '#e11d48' : zone === 'yellow' ? '#d97706' : '#059669');
        doc.text(`${score}%`, 14, 50);

        // Revenue Risk Context
        doc.setFontSize(10);
        doc.setTextColor(40, 40, 40);
        doc.text(`Est. Revenue Input: $${revenueDisplay}`, 50, 45); // Adjust position as needed

        // Reset color
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);

        // Title & Role
        doc.text(content.title, 14, 65);
        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        doc.text(content.role, 14, 72);

        // Diagnosis
        autoTable(doc, {
            startY: 80,
            head: [[lang === 'ru' ? 'ДИАГНОЗ' : 'DIAGNOSIS']],
            body: [[content.diagnosis]],
            styles: { font: "Roboto", fontSize: 11, cellPadding: 4 },
            headStyles: { fillColor: [40, 40, 40], textColor: 255, fontStyle: 'bold', font: "Roboto" }
        });

        // Imperatives
        const imperativesData = content.imperatives.map(imp => [`${imp.title}\n${imp.desc}`]);
        // @ts-ignore
        const nextY = doc.lastAutoTable.finalY + 10;

        autoTable(doc, {
            startY: nextY,
            head: [[lang === 'ru' ? 'СТРАТЕГИЧЕСКИЕ ИМПЕРАТИВЫ' : 'STRATEGIC IMPERATIVES']],
            body: imperativesData,
            styles: { font: "Roboto", fontSize: 10, cellPadding: 4 },
            headStyles: { fillColor: [30, 30, 30], textColor: 255, font: "Roboto" },
            columnStyles: { 0: { cellWidth: 'auto' } }
        });

        // Pitch
        // @ts-ignore
        const finalY = doc.lastAutoTable.finalY + 15;

        autoTable(doc, {
            startY: finalY,
            head: [[content.pitch.title]],
            body: [[content.pitch.desc]],
            theme: 'plain',
            styles: {
                font: "Roboto",
                fontSize: 12,
                cellPadding: 8,
                textColor: [40, 40, 40], // Dark gray
                fillColor: [243, 244, 246] // Gray-100
            },
            headStyles: {
                font: "Roboto",
                fillColor: [16, 185, 129], // Emerald-500
                textColor: 255,
                fontSize: 12,
                halign: 'center',
                fontStyle: 'bold'
            }
        });

        // Footer
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text("Generated by safarisaev.ai", 14, 280);

        doc.save('Safar_Isaev_Audit_Protocol.pdf');
        console.log("PDF Generated Successfully");

    } catch (error) {
        console.error("PDF Generation Failed:", error);
        alert("Error generating PDF. Please check console.");
    }
};
