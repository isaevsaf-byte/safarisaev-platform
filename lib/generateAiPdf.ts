
import jsPDF from "jspdf";
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

// PDF Content by Zone
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
                        title: "1. Запрет на \"Чистый лист\"",
                        desc: "Никогда не начинайте писать сами.",
                        oldWay: "Было: Открыл Word → Думаю.",
                        newWay: "Стало: Пишу в ChatGPT: «Я хочу написать письмо клиенту о [суть]. Напиши 3 варианта: вежливый, напористый и короткий»."
                    },
                    {
                        title: "2. Голосовой ввод",
                        desc: "Перестаньте печатать большие тексты.",
                        oldWay: "",
                        newWay: "Скачайте ChatGPT на телефон → Нажмите иконку наушников → Надиктуйте мысль → Скопируйте идеальный текст."
                    },
                    {
                        title: "3. Умный Поиск",
                        desc: "Перестаньте гуглить факты.",
                        oldWay: "",
                        newWay: "Спросите Perplexity или ChatGPT: «Найди топ-5 поставщиков [товар] и сделай таблицу сравнения цен»."
                    }
                ]
            },
            page3: {
                headline: "AI FOUNDATION: РАННИЙ СПИСОК (EARLY ACCESS)",
                intro: "Прямо сейчас я упаковываю этот опыт в короткий видео-курс. Я хочу, чтобы он был идеальным. Вы попали в список Beta-участников. Это значит, что вы получите курс первыми и по специальной цене.",
                benefits: [
                    "Вы получите курс первыми.",
                    "Специальная цена $19 (вместо $49) за отзыв.",
                    "Плюс я лично разберу ваш кейс."
                ],
                cta: "Занять место за $19 (Вместо $49)",
                link: "https://safarisaev.ai" // Placeholder for [ВАША_ССЫЛКА_НА_SYSTEME_IO]
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
                        title: "1. Ban the \"Blank Page\"",
                        desc: "Never start writing from scratch.",
                        oldWay: "Old Way: Open Word → Think.",
                        newWay: "New Way: Prompt AI: \"I need to write an email to a client about [topic]. Draft 3 versions: polite, assertive, and short.\""
                    },
                    {
                        title: "2. Voice First",
                        desc: "Stop typing long texts.",
                        oldWay: "",
                        newWay: "Download ChatGPT App → Hit Headphone Icon → Ramble your thoughts → Copy the perfect summary."
                    },
                    {
                        title: "3. Smart Search",
                        desc: "Stop Googling facts.",
                        oldWay: "",
                        newWay: "Ask Perplexity or ChatGPT: \"Find top 5 suppliers for [product] and make a price comparison table.\""
                    }
                ]
            },
            page3: {
                headline: "Your Path Out: AI FOUNDATION",
                intro: "You don't need complex agents or code yet. You need to free your hands. In AI Foundation, we don't teach \"tech.\" We teach you to delegate the grunt work.",
                benefits: [
                    "How to cut email time from 1 hour to 5 mins.",
                    "How to get ready-made Excel sheets without formulas.",
                    "How to write prompts so AI understands you instantly."
                ],
                cta: "Reclaim 2 Hours/Day"
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
                    { title: "Ручной мостик", desc: "Вы — «живой буфер» между ИИ и результатом. ИИ пишет код — вы не знаете, куда его вставить. ИИ пишет структуру слайдов — вы рисуете их в PowerPoint.", loss: "" },
                    { title: "Иллюзия Аналитики", desc: "Вы просите ИИ \"подумать\", но используете обычные модели (GPT-4o), вместо рассуждающих (o1 / DeepSeek), которые реально умеют строить стратегии.", loss: "" }
                ]
            },
            page2: {
                headline: "Как стать One-Man Army (3 шага)",
                steps: [
                    {
                        title: "1. Создайте Агентов (Custom GPTs)",
                        desc: "Перестаньте писать промпты.",
                        oldWay: "",
                        newWay: "Создайте \"Личного Маркетолога\" и \"Личного Юриста\". Загрузите в них свои файлы и правила один раз. Теперь они работают на вас вечно."
                    },
                    {
                        title: "2. Визуализируйте (Gemini Canvas / Artifacts)",
                        desc: "Хватит читать текст.",
                        oldWay: "",
                        newWay: "Просите ИИ: \"Нарисуй мне схему воронки продаж\" или \"Сделай дашборд\". Превращайте слова в активы."
                    },
                    {
                        title: "3. Глубокий Анализ (NotebookLM)",
                        desc: "Не копируйте куски текста.",
                        oldWay: "",
                        newWay: "Загрузите 50 PDF-отчетов конкурентов в NotebookLM и устройте им перекрестный допрос. Это уровень аналитика за $5000/мес."
                    }
                ]
            },
            page3: {
                headline: "Ваш путь наверх: AI EXECUTIVE SUITE",
                intro: "Вы уже умеете \"общаться\". Пора научиться \"управлять\". Курс AI Executive — это превращение вас в Цифровой Штаб.",
                benefits: [
                    "Deep Research: Как делать анализ рынка за 15 минут с пруфами.",
                    "Reasoning: Стратегическое мышление с моделями o1.",
                    "Visuals: Создание презентаций и схем внутри диалога.",
                    "Agents: Сборка своей команды ботов."
                ],
                cta: "Стать One-Man Army"
            }
        },
        en: {
            page1: {
                headline: "Stuck in the Chat Interface",
                intro: "You generate great text. But business is not just text. It's numbers, strategy, and visuals.",
                trapTitle: "3 Signs of the \"Yellow Trap\":",
                traps: [
                    { title: "Amnesia", desc: "You start every chat from scratch. You lack \"Agents\" that remember your business context. You waste time explaining the rules again.", loss: "" },
                    { title: "The Human Bridge", desc: "You are the buffer between AI and the result. AI writes code — you don't know where to put it. AI structures slides — you draw them manually in PowerPoint.", loss: "" },
                    { title: "The Analysis Illusion", desc: "You ask AI to \"think,\" but you use standard models (GPT-4o) instead of reasoning models (o1 / DeepSeek) that can actually strategize.", loss: "" }
                ]
            },
            page2: {
                headline: "How to become a One-Man Army (3 Steps)",
                steps: [
                    {
                        title: "1. Build Agents (Custom GPTs)",
                        desc: "Stop writing prompts.",
                        oldWay: "",
                        newWay: "Create a \"Personal Marketer\" and \"Personal Lawyer.\" Upload your files and rules once. Now they work for you forever."
                    },
                    {
                        title: "2. Visualize (Gemini Canvas / Artifacts)",
                        desc: "Stop reading text.",
                        oldWay: "",
                        newWay: "Ask AI: \"Draw a sales funnel diagram\" or \"Create a dashboard.\" Turn words into assets."
                    },
                    {
                        title: "3. Deep Analysis (NotebookLM)",
                        desc: "Don't copy-paste text chunks.",
                        oldWay: "",
                        newWay: "Upload 50 competitor PDF reports into NotebookLM and cross-examine them. This is $5,000/month analyst level work."
                    }
                ]
            },
            page3: {
                headline: "Your Path Up: AI EXECUTIVE SUITE",
                intro: "You know how to \"chat.\" It's time to learn how to \"command.\" AI Executive transforms you into a Digital HQ.",
                benefits: [
                    "Deep Research: Market analysis in 15 mins with citations.",
                    "Reasoning: Strategic thinking with o1 models.",
                    "Visuals: Creating slides and diagrams within the chat.",
                    "Agents: Assembling your own bot team."
                ],
                cta: "Become a One-Man Army"
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
                    {
                        title: "1. Natural Language Coding",
                        desc: "Перестаньте быть \"юзером\". Станьте Создателем.",
                        oldWay: "",
                        newWay: "Cursor + Claude 3.5 = полноценный софт без знания синтаксиса. Вы уже думаете как разработчик. Осталось начать создавать как разработчик."
                    },
                    {
                        title: "2. Productize Yourself",
                        desc: "Превратите внутренние инструменты в продукты.",
                        oldWay: "",
                        newWay: "Ваш \"скрипт для отчетов\" — это SaaS за $49/мес для 1000 клиентов. Ваш \"GPT-юрист\" — это Telegram-бот с подпиской. Хватит работать бесплатно."
                    },
                    {
                        title: "3. Kill The Middleman",
                        desc: "Увольте \"внутренний IT-отдел\" в своей голове.",
                        oldWay: "",
                        newWay: "Вам не нужны программисты для проверки гипотез. MVP за выходные. Запуск в понедельник. Один. Без зависимостей."
                    }
                ]
            },
            page3: {
                headline: "AI ARCHITECT MASTERMIND",
                intro: "Это не курс. Здесь не учат \"нажимать кнопки\". Это закрытая группа, где мы строим ваши ИИ-активы и продукты. Работа в малой группе равных.",
                benefits: [
                    "Еженедельные сессии: разбор ваших проектов и узких мест.",
                    "Совместная сборка: от идеи до деплоя за 4-6 недель.",
                    "Нетворк: доступ к сообществу таких же \"киборгов\"."
                ],
                cta: "Напишите мне лично",
                ctaSubtext: "Чтобы обсудить формат и понять, подходим ли мы друг другу.",
                contacts: {
                    telegram: "@SafarIsaev",
                    email: "safarisaev@gmail.com"
                }
            }
        },
        en: {
            page1: {
                headline: "You Are The Asset (And That's The Problem)",
                intro: "Congratulations. You're a rare breed. You don't just \"use AI\" — you command it. But there's a trap: The Golden Cage.",
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
                    {
                        title: "1. Natural Language Coding",
                        desc: "Stop being a \"user.\" Become a Creator.",
                        oldWay: "",
                        newWay: "Cursor + Claude 3.5 = full-stack software without knowing syntax. You already think like a developer. Time to build like one."
                    },
                    {
                        title: "2. Productize Yourself",
                        desc: "Turn your internal tools into products.",
                        oldWay: "",
                        newWay: "Your \"reporting script\" is a $49/mo SaaS for 1000 clients. Your \"GPT Lawyer\" is a Telegram bot with subscriptions. Stop working for free."
                    },
                    {
                        title: "3. Kill The Middleman",
                        desc: "Fire the \"internal IT department\" in your head.",
                        oldWay: "",
                        newWay: "You don't need developers to test hypotheses. MVP in a weekend. Launch on Monday. Alone. No dependencies."
                    }
                ]
            },
            page3: {
                headline: "AI ARCHITECT MASTERMIND",
                intro: "This is not a course. We don't teach you to \"click buttons.\" This is a closed group where we build your AI assets and products. Work in a small group of equals.",
                benefits: [
                    "Weekly sessions: review of your projects and bottlenecks.",
                    "Co-building: from idea to deploy in 4-6 weeks.",
                    "Network: access to a community of fellow \"cyborgs.\""
                ],
                cta: "Message me personally",
                ctaSubtext: "To discuss the format and see if we're a good fit.",
                contacts: {
                    telegram: "@SafarIsaev",
                    email: "safarisaev@gmail.com"
                }
            }
        }
    }
};

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
    const content = pdfContent[zoneKey][lang];

    // --- PAGE 1: SCORE & DIAGNOSIS ---

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

    // Date & Email
    doc.setFontSize(8);
    doc.text(new Date().toLocaleDateString(), 180, 20, { align: 'right' });
    doc.text(email, 180, 28, { align: 'right' });

    // Score Circle
    const centerX = 105;
    const centerY = 80;
    const radius = 30;

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(3);
    doc.circle(centerX, centerY, radius, 'S');

    // Score Text
    doc.setTextColor(config.color);
    doc.setFontSize(40);
    doc.text(`${score}`, centerX, centerY + 5, { align: 'center' });
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text("/ 100", centerX, centerY + 15, { align: 'center' });

    // Zone Title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(zone.title.toUpperCase(), centerX, centerY + 35, { align: 'center' });

    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.text(zone.slogan, centerX, centerY + 45, { align: 'center' });

    // Page 1 Content - The Truth Bomb
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(content.page1.headline, 14, 145);

    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const introLines = doc.splitTextToSize(content.page1.intro, 180);
    doc.text(introLines, 14, 155);

    // Traps
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(content.page1.trapTitle, 14, 175);

    let yPos = 185;
    content.page1.traps.forEach((trap, i) => {
        doc.setFontSize(11);
        doc.setTextColor(config.color);
        doc.text(`${i + 1}. ${trap.title}`, 14, yPos);

        doc.setFontSize(9);
        doc.setTextColor(60, 60, 60);
        const trapDesc = doc.splitTextToSize(trap.desc, 170);
        doc.text(trapDesc, 20, yPos + 6);

        if (trap.loss) {
            doc.setTextColor(239, 68, 68); // Red
            doc.text(trap.loss, 20, yPos + 6 + (trapDesc.length * 4));
            yPos += 20 + (trapDesc.length * 4);
        } else {
            yPos += 16 + (trapDesc.length * 4);
        }
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Powered by safarisaev.ai", 105, 285, { align: 'center' });


    // --- PAGE 2: QUICK WINS ---
    doc.addPage();

    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 25, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text(lang === 'ru' ? "ПЛАН ДЕЙСТВИЙ" : "ACTION PLAN", 14, 16);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text(content.page2.headline, 14, 45);

    yPos = 60;
    content.page2.steps.forEach((step) => {
        // Step title
        doc.setFontSize(12);
        doc.setTextColor(config.color);
        doc.text(step.title, 14, yPos);

        // Description
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        doc.text(step.desc, 14, yPos + 8);

        yPos += 18;

        // Old way (if exists)
        if (step.oldWay) {
            doc.setTextColor(200, 50, 50);
            doc.setFontSize(9);
            const oldLines = doc.splitTextToSize(step.oldWay, 170);
            doc.text(oldLines, 20, yPos);
            yPos += oldLines.length * 5 + 3;
        }

        // New way
        doc.setTextColor(16, 185, 129); // Green
        doc.setFontSize(9);
        const newLines = doc.splitTextToSize(step.newWay, 170);
        doc.text(newLines, 20, yPos);
        yPos += newLines.length * 5 + 15;
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Powered by safarisaev.ai", 105, 285, { align: 'center' });


    // --- PAGE 3: THE OFFER ---
    doc.addPage();

    // High impact header
    doc.setFillColor(config.color);
    doc.rect(0, 0, 210, 50, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    const headlineLines = doc.splitTextToSize(content.page3.headline, 180);
    doc.text(headlineLines, 105, 25, { align: 'center' });

    // Intro
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    const introText = doc.splitTextToSize(content.page3.intro, 180);
    doc.text(introText, 14, 70);

    // Benefits
    doc.setFontSize(12);
    doc.text(lang === 'ru' ? "Что вы получите:" : "What you'll get:", 14, 95);

    yPos = 105;
    content.page3.benefits.forEach((benefit) => {
        doc.setFontSize(10);
        doc.setTextColor(16, 185, 129);
        doc.text("✓", 14, yPos);
        doc.setTextColor(60, 60, 60);
        const benefitLines = doc.splitTextToSize(benefit, 165);
        doc.text(benefitLines, 22, yPos);
        yPos += benefitLines.length * 5 + 8;
    });

    // Check if this is the Mastermind format (green zone with contacts)
    const page3Content = content.page3 as {
        headline: string;
        intro: string;
        benefits: string[];
        cta: string;
        ctaSubtext?: string;
        contacts?: { telegram: string; email: string };
        link?: string;
    };

    if (page3Content.contacts) {
        // Mastermind format - personal contact instead of price
        doc.setDrawColor(200, 200, 200);
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(30, 145, 150, 90, 5, 5, 'FD');

        // CTA
        doc.setTextColor(config.color);
        doc.setFontSize(16);
        doc.text(page3Content.cta, 105, 165, { align: 'center' });

        // Subtext
        if (page3Content.ctaSubtext) {
            doc.setFontSize(10);
            doc.setTextColor(80, 80, 80);
            const subtextLines = doc.splitTextToSize(page3Content.ctaSubtext, 130);
            doc.text(subtextLines, 105, 178, { align: 'center' });
        }

        // Contact info
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Telegram: ${page3Content.contacts.telegram}`, 105, 205, { align: 'center' });
        doc.setTextColor(59, 130, 246);
        doc.text(page3Content.contacts.email, 105, 220, { align: 'center' });

    } else {
        // Standard offer format with price
        doc.setDrawColor(200, 200, 200);
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(30, 150, 150, 80, 5, 5, 'FD');

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(16);
        const offerLines = doc.splitTextToSize(offer.name, 130);
        doc.text(offerLines, 105, 175, { align: 'center' });

        doc.setTextColor(config.color);
        doc.setFontSize(28);
        doc.text(offer.price, 105, 200, { align: 'center' });

        // CTA Button
        doc.setFillColor(config.color);
        doc.roundedRect(50, 240, 110, 20, 3, 3, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.text(page3Content.cta, 105, 253, { align: 'center' });
    }

    // Link
    const linkUrl = page3Content.link || "https://safarisaev.ai";
    const linkText = page3Content.link ? "safarisaev.ai" : "safarisaev.ai"; // Could customize text too if needed

    doc.setFontSize(10);
    doc.setTextColor(59, 130, 246);
    doc.textWithLink(linkText, 105, 275, { url: linkUrl, align: 'center' });

    doc.save('Safar_Isaev_AI_Velocity_Report.pdf');
};
