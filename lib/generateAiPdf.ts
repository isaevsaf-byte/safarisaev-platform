
import type jsPDF from "jspdf";
import { aiIndexData, Lang, Context } from "./aiIndexData";

// Loaded on demand — see lib/generatePdf.ts for why.
async function loadPdfLib() {
    const { default: JsPDF } = await import("jspdf");
    return JsPDF;
}

// Cache font data to avoid re-fetching, but register on each new jsPDF instance
let cachedFontBase64: string | null = null;

// Helper to fetch font as Base64/Binary
async function loadFonts(doc: jsPDF) {
    try {
        if (!cachedFontBase64) {
            const fontUrl = window.location.origin + '/fonts/Roboto-Regular.ttf';

            const response = await fetch(fontUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch font: ${response.status} ${response.statusText} at ${fontUrl}`);
            }

            const blob = await response.blob();

            cachedFontBase64 = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                        const base64 = reader.result.split(',')[1];
                        if (base64) {
                            resolve(base64);
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
        }

        // Register font on every new jsPDF instance
        doc.addFileToVFS("Roboto-Regular.ttf", cachedFontBase64);
        doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
        doc.addFont("Roboto-Regular.ttf", "Roboto", "bold");
        doc.setFont("Roboto");

    } catch (err) {
        console.error("Font loading error:", err);
        throw new Error("Failed to load font for PDF. Cyrillic characters may not render correctly.");
    }
}

// ── Design System Constants ──────────────────────────────────────────

const COLORS = {
    SLATE_950: [15, 23, 42] as const,
    SLATE_600: [71, 85, 105] as const,
    SLATE_400: [148, 163, 184] as const,
    SLATE_200: [226, 232, 240] as const,
    SLATE_100: [241, 245, 249] as const,
    SLATE_50: [248, 250, 252] as const,
    WHITE: [255, 255, 255] as const,
    NEAR_BLACK: [15, 23, 42] as const,
    ACCENT_BLUE: [59, 130, 246] as const,
    LOSS_RED: [239, 68, 68] as const,
    BEFORE_BG: [254, 242, 242] as const,
    BEFORE_TEXT: [153, 27, 27] as const,
    AFTER_BG: [236, 253, 245] as const,
    AFTER_TEXT: [6, 95, 70] as const,
};

const ML = 20;    // Margin left
const MR = 190;   // Margin right (x-coordinate)
const CW = 170;   // Content width
const CX = 105;   // Page center X
const PAGE_BOTTOM = 275; // Safe bottom for content before footer

type RGB = readonly [number, number, number];

function hexToRgb(hex: string): RGB {
    const h = hex.replace('#', '');
    return [
        parseInt(h.substring(0, 2), 16),
        parseInt(h.substring(2, 4), 16),
        parseInt(h.substring(4, 6), 16),
    ];
}

function setFill(doc: jsPDF, c: RGB) { doc.setFillColor(c[0], c[1], c[2]); }
function setDraw(doc: jsPDF, c: RGB) { doc.setDrawColor(c[0], c[1], c[2]); }
function setText(doc: jsPDF, c: RGB) { doc.setTextColor(c[0], c[1], c[2]); }

// ── Reusable Drawing Helpers ─────────────────────────────────────────

function drawPageHeader(doc: jsPDF, leftLabel: string, zoneRgb: RGB, height: number) {
    // Dark background block
    setFill(doc, COLORS.SLATE_950);
    doc.rect(0, 0, 210, height, 'F');

    // Zone-color accent line at bottom
    setFill(doc, zoneRgb);
    doc.rect(0, height, 210, 2, 'F');

    // Left label
    doc.setFontSize(14);
    setText(doc, COLORS.WHITE);
    doc.text(leftLabel, ML, height / 2 + 2);

    // Right branding
    doc.setFontSize(8);
    setText(doc, COLORS.SLATE_400);
    doc.text("AI VELOCITY INDEX", MR, height / 2 + 2, { align: 'right' });
}

function drawFooter(doc: jsPDF) {
    setDraw(doc, COLORS.SLATE_200);
    doc.setLineWidth(0.3);
    doc.line(70, 286, 140, 286);

    doc.setFontSize(8);
    setText(doc, COLORS.ACCENT_BLUE);
    const footerText = "safarisaev.ai";
    const footerW = doc.getTextWidth(footerText);
    doc.textWithLink(footerText, CX - footerW / 2, 291, { url: "https://safarisaev.ai" });
}

function drawAccentBar(doc: jsPDF, x: number, y: number, h: number, color: RGB) {
    setFill(doc, color);
    doc.rect(x, y, 3, h, 'F');
}

function drawCard(doc: jsPDF, x: number, y: number, w: number, h: number) {
    setFill(doc, COLORS.SLATE_50);
    setDraw(doc, COLORS.SLATE_200);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, y, w, h, 3, 3, 'FD');
}

function drawNumberBadge(doc: jsPDF, x: number, y: number, num: number, color: RGB) {
    setFill(doc, color);
    doc.circle(x, y, 5, 'F');
    doc.setFontSize(11);
    setText(doc, COLORS.WHITE);
    doc.text(String(num), x, y + 1.5, { align: 'center' });
}

// ── PDF Content by Zone ──────────────────────────────────────────────

const pdfContent = {
    red: {
        ru: {
            page1: {
                headline: "Вы работаете слишком много",
                intro: "Вы попали в \"Красную Зону\". Это не значит, что вы плохой специалист. Это значит, что ваши инструменты устарели.",
                trapTitle: "3 Признака \"Аналоговой Ловушки\":",
                traps: [
                    { title: "Google-зависимость", desc: "Вы ищете ответы в статьях, вместо того чтобы получить синтез данных от ИИ.", loss: "Потеря: 3 часа/неделю" },
                    { title: "Ручной набор", desc: "Вы пишете письма, отчеты и планы с нуля. Вы тратите энергию на форму (слова), а не на суть (смысл).", loss: "Потеря: 5 часов/неделю" },
                    { title: "Одиночество", desc: "Вы думаете в одиночку. У вас нет цифрового спарринг-партнера, который критикует и улучшает ваши идеи.", loss: "" }
                ]
            },
            page2: {
                headline: "Что сделать прямо завтра (3 шага)",
                steps: [
                    {
                        title: "Запрет на \"Чистый лист\"",
                        desc: "Никогда не начинайте писать сами.",
                        oldWay: "Было: Открыл Word \u2192 Думаю.",
                        newWay: "Стало: Пишу в ChatGPT: \u00ABЯ хочу написать письмо клиенту о [суть]. Напиши 3 варианта: вежливый, напористый и короткий\u00BB."
                    },
                    {
                        title: "Голосовой ввод",
                        desc: "Перестаньте печатать большие тексты.",
                        oldWay: "",
                        newWay: "Скачайте ChatGPT на телефон \u2192 Нажмите иконку наушников \u2192 Надиктуйте мысль \u2192 Скопируйте идеальный текст."
                    },
                    {
                        title: "Умный Поиск",
                        desc: "Перестаньте гуглить факты.",
                        oldWay: "",
                        newWay: "Спросите Perplexity или ChatGPT: \u00ABНайди топ-5 конкурентов [товар] и сделай таблицу сравнения цен\u00BB."
                    }
                ]
            }
        },
        en: {
            page1: {
                headline: "The Hard Work Trap",
                intro: "You landed in the \"Red Zone\". This doesn't mean you are incompetent. It means your toolkit is obsolete.",
                trapTitle: "3 Signs of the \"Analog Trap\":",
                traps: [
                    { title: "Google-Dependency", desc: "You hunt for answers in articles instead of getting data synthesis from AI.", loss: "Loss: 3 hrs/week" },
                    { title: "Manual Typing", desc: "You write emails, reports, and plans from scratch. You waste energy on form (words) instead of substance (meaning).", loss: "Loss: 5 hrs/week" },
                    { title: "Solitude", desc: "You think alone. You lack a digital sparring partner to critique and elevate your ideas.", loss: "" }
                ]
            },
            page2: {
                headline: "Action Plan for Tomorrow (3 Steps)",
                steps: [
                    {
                        title: "Ban the \"Blank Page\"",
                        desc: "Never start writing from scratch.",
                        oldWay: "Old Way: Open Word \u2192 Think.",
                        newWay: "New Way: Prompt AI: \"I need to write an email to a client about [topic]. Draft 3 versions: polite, assertive, and short.\""
                    },
                    {
                        title: "Voice First",
                        desc: "Stop typing long texts.",
                        oldWay: "",
                        newWay: "Download ChatGPT App \u2192 Hit Headphone Icon \u2192 Ramble your thoughts \u2192 Copy the perfect summary."
                    },
                    {
                        title: "Smart Search",
                        desc: "Stop Googling facts.",
                        oldWay: "",
                        newWay: "Ask Perplexity or ChatGPT: \"Find the top 5 competitors for [product] and make a price comparison table.\""
                    }
                ]
            }
        }
    },
    yellow: {
        ru: {
            page1: {
                headline: "Вы уперлись в интерфейс чата",
                intro: "Вы отлично генерируете тексты. Но бизнес — это не только текст. Это цифры, стратегии и визуализация.",
                trapTitle: "3 Признака \"Желтой Ловушки\":",
                traps: [
                    { title: "Амнезия", desc: "Вы начинаете каждый чат с нуля. У вас нет настроенных \"Агентов\", которые помнят ваш бизнес. Вы тратите время на объяснение контекста.", loss: "" },
                    { title: "Ручной мостик", desc: "Вы — \u00ABживой буфер\u00BB между ИИ и результатом. ИИ пишет код — вы не знаете, куда его вставить. ИИ пишет структуру слайдов — вы рисуете их в PowerPoint.", loss: "" },
                    { title: "Иллюзия Аналитики", desc: "Вы просите ИИ \"подумать\", но используете обычные модели (GPT-4o), вместо рассуждающих (o1 / DeepSeek), которые реально умеют строить стратегии.", loss: "" }
                ]
            },
            page2: {
                headline: "Как стать One-Man Army (3 шага)",
                steps: [
                    { title: "Создайте Агентов (Custom GPTs)", desc: "Перестаньте писать промпты.", oldWay: "", newWay: "Создайте \"Личного Маркетолога\" и \"Личного Юриста\". Загрузите в них свои файлы и правила один раз. Теперь они работают на вас вечно." },
                    { title: "Визуализируйте (Gemini Canvas / Artifacts)", desc: "Хватит читать текст.", oldWay: "", newWay: "Просите ИИ: \"Нарисуй мне схему воронки продаж\" или \"Сделай дашборд\". Превращайте слова в активы." },
                    { title: "Глубокий Анализ (NotebookLM)", desc: "Не копируйте куски текста.", oldWay: "", newWay: "Загрузите 50 PDF-отчетов конкурентов в NotebookLM и устройте им перекрестный допрос. Это уровень аналитика за $5000/мес." }
                ]
            }
        },
        en: {
            page1: {
                headline: "Stuck in the Chat Interface",
                intro: "You generate great text. But business is not just text. It's numbers, strategy, and visuals.",
                trapTitle: "3 Signs of the \"Yellow Trap\":",
                traps: [
                    { title: "Amnesia", desc: "You start every chat from scratch. You lack \"Agents\" that remember your business context. You waste time explaining the rules again.", loss: "" },
                    { title: "The Human Bridge", desc: "You are the buffer between AI and the result. AI writes code \u2014 you don't know where to put it. AI structures slides \u2014 you draw them manually in PowerPoint.", loss: "" },
                    { title: "The Analysis Illusion", desc: "You ask AI to \"think,\" but you use standard models (GPT-4o) instead of reasoning models (o1 / DeepSeek) that can actually strategize.", loss: "" }
                ]
            },
            page2: {
                headline: "How to become a One-Man Army (3 Steps)",
                steps: [
                    { title: "Build Agents (Custom GPTs)", desc: "Stop writing prompts.", oldWay: "", newWay: "Create a \"Personal Marketer\" and \"Personal Lawyer.\" Upload your files and rules once. Now they work for you forever." },
                    { title: "Visualize (Gemini Canvas / Artifacts)", desc: "Stop reading text.", oldWay: "", newWay: "Ask AI: \"Draw a sales funnel diagram\" or \"Create a dashboard.\" Turn words into assets." },
                    { title: "Deep Analysis (NotebookLM)", desc: "Don't copy-paste text chunks.", oldWay: "", newWay: "Upload 50 competitor PDF reports into NotebookLM and cross-examine them. This is $5,000/month analyst level work." }
                ]
            }
        }
    },
    green: {
        ru: {
            page1: {
                headline: "Вы — Главный Актив (и это проблема)",
                intro: "Поздравляю. Вы — редкий вид. Вы не просто \"используете ИИ\", вы им управляете. Но есть ловушка: Золотая Клетка.",
                trapTitle: "Почему это ловушка:",
                traps: [
                    { title: "Вы — Бутылочное Горлышко", desc: "Вы настолько эффективны, что все процессы идут через вас. Без вас ничего не работает. Это не актив, это зависимость.", loss: "" },
                    { title: "Вы Делаете, а не Владеете", desc: "Вы пишете скрипты, собираете агентов, автоматизируете рутину. Но всё это — внутренние инструменты. Они не приносят денег, пока вы спите.", loss: "" },
                    { title: "Время — Ваш Потолок", desc: "Вы продаете часы, а не системы. Ваша экспертиза умирает вместе с рабочим днем. Пора это изменить.", loss: "" }
                ]
            },
            page2: {
                headline: "От Исполнителя к Создателю (3 шага)",
                steps: [
                    { title: "Natural Language Coding", desc: "Перестаньте быть \"юзером\". Станьте Создателем.", oldWay: "", newWay: "Cursor + Claude 3.5 = полноценный софт без знания синтаксиса. Вы уже думаете как разработчик. Осталось начать создавать как разработчик." },
                    { title: "Productize Yourself", desc: "Превратите внутренние инструменты в продукты.", oldWay: "", newWay: "Ваш \"скрипт для отчетов\" — это SaaS за $49/мес для 1000 клиентов. Ваш \"GPT-юрист\" — это Telegram-бот с подпиской. Хватит работать бесплатно." },
                    { title: "Kill The Middleman", desc: "Увольте \"внутренний IT-отдел\" в своей голове.", oldWay: "", newWay: "Вам не нужны программисты для проверки гипотез. MVP за выходные. Запуск в понедельник. Один. Без зависимостей." }
                ]
            }
        },
        en: {
            page1: {
                headline: "You Are The Asset (And That's The Problem)",
                intro: "Congratulations. You're a rare breed. You don't just \"use AI\" \u2014 you command it. But there's a trap: The Golden Cage.",
                trapTitle: "Why this is a trap:",
                traps: [
                    { title: "You Are The Bottleneck", desc: "You're so efficient that everything runs through you. Without you, nothing works. That's not an asset, that's a liability.", loss: "" },
                    { title: "You Execute, You Don't Own", desc: "You write scripts, build agents, automate workflows. But these are internal tools. They don't make money while you sleep.", loss: "" },
                    { title: "Time Is Your Ceiling", desc: "You're selling hours, not systems. Your expertise dies with the workday. Time to change that.", loss: "" }
                ]
            },
            page2: {
                headline: "From Executor to Creator (3 Steps)",
                steps: [
                    { title: "Natural Language Coding", desc: "Stop being a \"user.\" Become a Creator.", oldWay: "", newWay: "Cursor + Claude 3.5 = full-stack software without knowing syntax. You already think like a developer. Time to build like one." },
                    { title: "Productize Yourself", desc: "Turn your internal tools into products.", oldWay: "", newWay: "Your \"reporting script\" is a $49/mo SaaS for 1000 clients. Your \"GPT Lawyer\" is a Telegram bot with subscriptions. Stop working for free." },
                    { title: "Kill The Middleman", desc: "Fire the \"internal IT department\" in your head.", oldWay: "", newWay: "You don't need developers to test hypotheses. MVP in a weekend. Launch on Monday. Alone. No dependencies." }
                ]
            }
        }
    }
};

// ── Main PDF Generator ───────────────────────────────────────────────

export const generateAiPdf = async (
    score: number,
    zoneKey: "green" | "yellow" | "red",
    lang: Lang,
    context: Context
) => {
    const JsPDF = await loadPdfLib();
    const doc = new JsPDF();
    await loadFonts(doc);
    doc.setFont("Roboto");

    const t = aiIndexData.translations[lang];
    const zone = t.zones[zoneKey];
    const config = aiIndexData.config.zones[zoneKey];
    const content = pdfContent[zoneKey][lang];
    const zoneRgb = hexToRgb(config.color);

    // ════════════════════════════════════════════════════════════════
    // PAGE 1: SCORE & DIAGNOSIS
    // ════════════════════════════════════════════════════════════════

    // ── Dark Hero Header (48mm tall) ──
    const HEADER_H = 48;
    setFill(doc, COLORS.SLATE_950);
    doc.rect(0, 0, 210, HEADER_H, 'F');

    // Zone accent line
    setFill(doc, zoneRgb);
    doc.rect(0, HEADER_H, 210, 2, 'F');

    // Header text - left
    doc.setFontSize(20);
    setText(doc, COLORS.WHITE);
    doc.text("AI VELOCITY INDEX", ML, 20);

    doc.setFontSize(9);
    setText(doc, COLORS.SLATE_400);
    const contextLabel = context === 'self'
        ? (lang === 'ru' ? 'ИНДИВИДУАЛЬНЫЙ' : 'INDIVIDUAL')
        : (lang === 'ru' ? 'КОМАНДА' : 'TEAM');
    doc.text(`${lang === 'ru' ? 'ОТЧЕТ' : 'ASSESSMENT REPORT'} | ${contextLabel}`, ML, 29);

    // Header text - right
    doc.setFontSize(8);
    setText(doc, COLORS.SLATE_400);
    doc.text(new Date().toLocaleDateString(), MR, 20, { align: 'right' });

    // Small zone badge in header
    setFill(doc, zoneRgb);
    doc.roundedRect(MR - 30, 35, 30, 9, 2, 2, 'F');
    doc.setFontSize(7);
    setText(doc, COLORS.WHITE);
    doc.text(zoneKey.toUpperCase() + " ZONE", MR - 15, 41, { align: 'center' });

    // ── Score Section (centered, y≈80) ──
    const scoreY = 80;
    const scoreR = 24;

    // Outer light ring
    setDraw(doc, COLORS.SLATE_200);
    doc.setLineWidth(1.5);
    doc.circle(CX, scoreY, scoreR, 'S');

    // Zone-colored ring overlay
    setDraw(doc, zoneRgb);
    doc.setLineWidth(3);
    doc.circle(CX, scoreY, scoreR, 'S');

    // Inner circle fill (subtle)
    setFill(doc, COLORS.SLATE_50);
    doc.circle(CX, scoreY, scoreR - 4, 'F');

    // Score number
    doc.setFontSize(40);
    setText(doc, zoneRgb);
    doc.text(`${score}`, CX, scoreY + 5, { align: 'center' });

    // Denominator
    doc.setFontSize(12);
    setText(doc, COLORS.SLATE_400);
    doc.text("/ 100", CX, scoreY + 14, { align: 'center' });

    // Zone title
    doc.setFontSize(13);
    setText(doc, COLORS.NEAR_BLACK);
    doc.text(zone.title.toUpperCase(), CX, scoreY + 30, { align: 'center' });

    // Zone slogan
    doc.setFontSize(9);
    setText(doc, COLORS.SLATE_600);
    const sloganLines = doc.splitTextToSize(zone.slogan, 140);
    doc.text(sloganLines, CX, scoreY + 38, { align: 'center' });

    // Decorative center divider
    const dividerY = scoreY + 38 + (sloganLines.length * 4) + 4;
    setDraw(doc, COLORS.SLATE_200);
    doc.setLineWidth(0.3);
    doc.line(65, dividerY, 145, dividerY);

    // ── Diagnosis Section ──
    let yPos = dividerY + 7;

    // Headline with accent bar
    drawAccentBar(doc, ML, yPos - 2, 10, zoneRgb);
    doc.setFontSize(13);
    setText(doc, COLORS.NEAR_BLACK);
    doc.text(content.page1.headline, ML + 7, yPos + 5);
    yPos += 13;

    // Intro paragraph
    doc.setFontSize(9);
    setText(doc, COLORS.SLATE_600);
    const introLines = doc.splitTextToSize(content.page1.intro, CW - 7);
    doc.text(introLines, ML + 7, yPos);
    yPos += introLines.length * 4 + 6;

    // Trap section title
    doc.setFontSize(11);
    setText(doc, COLORS.NEAR_BLACK);
    doc.text(content.page1.trapTitle, ML, yPos);
    yPos += 8;

    // ── Trap Cards ──
    content.page1.traps.forEach((trap) => {
        // Calculate card height
        doc.setFontSize(9);
        const descLines = doc.splitTextToSize(trap.desc, 148);
        const cardH = 12 + (descLines.length * 4) + (trap.loss ? 8 : 3);

        // Page break check
        if (yPos + cardH > PAGE_BOTTOM) {
            drawFooter(doc);
            doc.addPage();
            yPos = 20;
        }

        // Card background
        drawCard(doc, ML, yPos, CW, cardH);

        // Zone-colored dot
        setFill(doc, zoneRgb);
        doc.circle(ML + 8, yPos + 9, 2, 'F');

        // Trap title
        doc.setFontSize(10);
        setText(doc, COLORS.NEAR_BLACK);
        doc.text(trap.title, ML + 14, yPos + 10);

        // Trap description
        doc.setFontSize(9);
        setText(doc, COLORS.SLATE_600);
        doc.text(descLines, ML + 14, yPos + 16);

        // Loss text (if present)
        if (trap.loss) {
            const lossY = yPos + 16 + (descLines.length * 4) + 1;
            doc.setFontSize(9);
            setText(doc, COLORS.LOSS_RED);
            doc.text(trap.loss, ML + 14, lossY);
        }

        yPos += cardH + 4;
    });

    // Page 1 Footer
    drawFooter(doc);

    // ════════════════════════════════════════════════════════════════
    // PAGE 2: ACTION PLAN
    // ════════════════════════════════════════════════════════════════
    doc.addPage();

    // Header
    drawPageHeader(doc, lang === 'ru' ? 'ПЛАН ДЕЙСТВИЙ' : 'ACTION PLAN', zoneRgb, 30);

    // Section headline
    yPos = 46;
    doc.setFontSize(16);
    setText(doc, COLORS.NEAR_BLACK);
    const headlineLines = doc.splitTextToSize(content.page2.headline, CW);
    doc.text(headlineLines, ML, yPos);
    yPos += headlineLines.length * 7;

    // Zone-color underline accent
    setFill(doc, zoneRgb);
    doc.rect(ML, yPos + 1, 40, 1.5, 'F');
    yPos += 10;

    // ── Step Cards ──
    content.page2.steps.forEach((step, i) => {
        // Pre-calculate heights for page break check
        doc.setFontSize(9);
        const newLines = doc.splitTextToSize(step.newWay, step.oldWay ? 72 : 152);
        const oldLines = step.oldWay ? doc.splitTextToSize(step.oldWay, 72) : [];
        const compH = step.oldWay
            ? Math.max(oldLines.length, newLines.length) * 4 + 18
            : newLines.length * 4 + 14;
        const totalH = 22 + compH;

        // Page break check
        if (yPos + totalH > PAGE_BOTTOM) {
            drawFooter(doc);
            doc.addPage();
            drawPageHeader(doc, lang === 'ru' ? 'ПЛАН ДЕЙСТВИЙ' : 'ACTION PLAN', zoneRgb, 30);
            yPos = 44;
        }

        // Number badge
        drawNumberBadge(doc, ML + 7, yPos + 3, i + 1, zoneRgb);

        // Step title
        doc.setFontSize(12);
        setText(doc, COLORS.NEAR_BLACK);
        doc.text(step.title, ML + 16, yPos + 5);

        // Step description
        doc.setFontSize(10);
        setText(doc, COLORS.SLATE_600);
        doc.text(step.desc, ML + 16, yPos + 13);

        const compY = yPos + 20;

        if (step.oldWay) {
            // ── Two-tone comparison card ──
            setDraw(doc, COLORS.SLATE_200);
            doc.setLineWidth(0.3);
            doc.roundedRect(ML, compY, CW, compH, 3, 3, 'S');

            // Left half: light red (BEFORE)
            setFill(doc, COLORS.BEFORE_BG);
            doc.rect(ML + 0.5, compY + 0.5, CW / 2 - 0.5, compH - 1, 'F');

            // Right half: light green (AFTER)
            setFill(doc, COLORS.AFTER_BG);
            doc.rect(ML + CW / 2, compY + 0.5, CW / 2 - 0.5, compH - 1, 'F');

            // Vertical divider
            setDraw(doc, COLORS.SLATE_200);
            doc.line(ML + CW / 2, compY + 3, ML + CW / 2, compY + compH - 3);

            // BEFORE label + text
            doc.setFontSize(7);
            setText(doc, COLORS.LOSS_RED);
            doc.text(lang === 'ru' ? 'БЫЛО' : 'BEFORE', ML + 6, compY + 7);
            doc.setFontSize(9);
            setText(doc, COLORS.BEFORE_TEXT);
            doc.text(oldLines, ML + 6, compY + 13);

            // AFTER label + text
            doc.setFontSize(7);
            setText(doc, [16, 185, 129]);
            doc.text(lang === 'ru' ? 'СТАЛО' : 'AFTER', ML + CW / 2 + 6, compY + 7);
            doc.setFontSize(9);
            setText(doc, COLORS.AFTER_TEXT);
            doc.text(newLines, ML + CW / 2 + 6, compY + 13);
        } else {
            // ── Single green action card ──
            setFill(doc, COLORS.AFTER_BG);
            setDraw(doc, [16, 185, 129]);
            doc.setLineWidth(0.3);
            doc.roundedRect(ML, compY, CW, compH, 3, 3, 'FD');

            // Left accent bar inside card
            setFill(doc, [16, 185, 129]);
            doc.rect(ML + 1, compY + 4, 2, compH - 8, 'F');

            // Arrow + text
            doc.setFontSize(9);
            setText(doc, COLORS.AFTER_TEXT);
            doc.text(newLines, ML + 10, compY + 9);
        }

        yPos = compY + compH + 12;
    });

    // Page 2 Footer
    drawFooter(doc);

    // ── Save ──
    doc.save('Safar_Isaev_AI_Velocity_Report.pdf');
};
