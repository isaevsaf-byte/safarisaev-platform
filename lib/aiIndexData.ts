export type Lang = "en" | "ru";
export type Context = "self" | "team";

export interface ZoneConfig {
    min: number;
    color: string;
}

export interface ZoneTranslation {
    title: string;
    slogan: string;
    desc: string;
}

export interface OfferTranslation {
    name: string;
    price: string;
}

export interface QuestionOption {
    label: {
        ru: string;
        en: string;
    };
    penalty: number;
}

export interface Question {
    id: string;
    category: {
        ru: string;
        en: string;
    };
    text: {
        self: {
            ru: string;
            en: string;
        };
        team: {
            ru: string;
            en: string;
        };
    };
    options: QuestionOption[];
}

export const aiIndexData = {
    config: {
        baseScore: 100,
        zones: {
            green: { min: 90, color: "#10B981" },
            yellow: { min: 66, color: "#F59E0B" },
            red: { min: 0, color: "#EF4444" }
        }
    },
    translations: {
        ru: {
            title: "AI Velocity Index",
            subtitle: "Оцените ваш реальный IQ в эпоху ИИ: от 'Пользователя' до 'Архитектора'.",
            toggles: { self: "Оцениваю СЕБЯ", team: "Оцениваю КОМАНДУ" },
            cta: "Скачать Отчет и План (PDF)",
            zones: {
                green: { title: "AI ARCHITECT (Создатель)", slogan: "«Перестань искать софт — создай его сам.»", desc: "Вы — Киборг. Вы переросли интерфейс чата. Вы готовы создавать собственные активы." },
                yellow: { title: "AI EXECUTIVE (Профи)", slogan: "«Вам не нужно быстрее писать. Вам нужно масштабнее думать.»", desc: "Вы виртуозно владеете чатом, но у вас нет Системы. Превратите один чат в целый Департамент." },
                red: { title: "LEGACY OPERATOR (Аналоговый)", slogan: "«Вы используете суперкомпьютер как печатную машинку.»", desc: "Вы работаете руками там, где конкуренты нажимают кнопку. Вы теряете ~15 часов в неделю." }
            },
            offers: {
                green: { name: "Mastermind: AI Architect (Cursor)", price: "$890" },
                yellow: { name: "Intensive: AI Strategy & Agents", price: "$290" },
                red: { name: "Course: AI Foundation (Start Now)", price: "$49" }
            }
        },
        en: {
            title: "AI Velocity Index",
            subtitle: "Assess your real AI IQ: From 'User' to 'Architect'.",
            toggles: { self: "Assess MYSELF", team: "Assess MY TEAM" },
            cta: "Download Report & Plan (PDF)",
            zones: {
                green: { title: "AI ARCHITECT (The Creator)", slogan: "'Stop looking for software — build it yourself.'", desc: "You are a Cyborg. You've outgrown the chat interface. You are ready to build assets." },
                yellow: { title: "AI EXECUTIVE (Pro)", slogan: "'You don't need to write faster. You need to think bigger.'", desc: "You are a chat virtuoso, but you lack a System. Turn one chat into a Department." },
                red: { title: "LEGACY OPERATOR (Analog)", slogan: "'You are using a supercomputer as a typewriter.'", desc: "You work manually where competitors push a button. You lose ~15 hours/week." }
            },
            offers: {
                green: { name: "Mastermind: AI Architect (Cursor)", price: "£1,200" },
                yellow: { name: "Intensive: AI Strategy & Agents", price: "£599" },
                red: { name: "Course: AI Foundation (Start Now)", price: "£99" }
            }
        }
    },
    questions: [
        {
            id: "q1",
            category: { ru: "Рефлекс", en: "Reflex" },
            text: {
                self: { ru: "Вам поручили задачу, в которой вы не эксперт. Ваши действия в первую минуту?", en: "You get a task you are not an expert in. Your first minute move?" },
                team: { ru: "Что делают сотрудники при получении новой сложной задачи?", en: "What do employees do when facing a new complex task?" }
            },
            options: [
                { label: { ru: "Открываю ИИ, задаю Роль и прошу структуру", en: "Open AI, define Role, ask for structure" }, penalty: 0 },
                { label: { ru: "Иду в Google искать примеры", en: "Go to Google to search for examples" }, penalty: 5 },
                { label: { ru: "Открываю пустой документ и думаю сам", en: "Open blank doc and brainstorm manually" }, penalty: 10 }
            ]
        },
        {
            id: "q2",
            category: { ru: "Мышление", en: "Reasoning" },
            text: {
                self: { ru: "Нужно найти логическую ошибку в стратегии или финмодели.", en: "Need to find a logic flaw in strategy or model." },
                team: { ru: "Различают ли сотрудники модели (o1 vs GPT-4)?", en: "Do employees distinguish models (o1 vs GPT-4)?" }
            },
            options: [
                { label: { ru: "Использую «Рассуждающие» модели (o1, DeepSeek R1)", en: "Use 'Reasoning' models (o1, DeepSeek R1)" }, penalty: 0 },
                { label: { ru: "Использую обычный ChatGPT (GPT-4o) для всего", en: "Use standard ChatGPT (GPT-4o) for everything" }, penalty: 4 },
                { label: { ru: "Не знаю разницы / Бесплатная версия", en: "Don't know difference / Free version" }, penalty: 8 }
            ]
        },
        {
            id: "q3",
            category: { ru: "Документы", en: "Docs" },
            text: {
                self: { ru: "Прислали 5 длинных PDF-отчетов. Нужно быстро понять риски.", en: "Received 5 long PDF reports. Need risks ASAP." },
                team: { ru: "Как аналитики работают с базой знаний?", en: "How do analysts handle knowledge bases?" }
            },
            options: [
                { label: { ru: "Загружаю в NotebookLM (RAG) и «допрашиваю» их", en: "Upload to NotebookLM (RAG) and 'interrogate' them" }, penalty: 0 },
                { label: { ru: "Копирую кусками в чат и прошу саммари", en: "Copy-paste chunks into chat for summary" }, penalty: 5 },
                { label: { ru: "Читаю сам / Ctrl+F", en: "Read manually / Ctrl+F" }, penalty: 10 }
            ]
        },
        {
            id: "q4",
            category: { ru: "Строитель", en: "Builder" },
            text: {
                self: { ru: "Нужен калькулятор для сайта или скрипт для Excel.", en: "Need a web calculator or Excel script." },
                team: { ru: "Могут ли менеджеры автоматизировать рутину?", en: "Can managers automate their routine?" }
            },
            options: [
                { label: { ru: "Пишу задачу в Cursor/Replit (No-Code)", en: "Prompt in Cursor/Replit (No-Code)" }, penalty: 0 },
                { label: { ru: "Пишу ТЗ программистам и жду неделю", en: "Write specs for IT and wait a week" }, penalty: 8 },
                { label: { ru: "Ищу готовое / Делаю вручную", en: "Look for SaaS / Do manually" }, penalty: 15 }
            ]
        },
        {
            id: "q5",
            category: { ru: "Визуал", en: "Visuals" },
            text: {
                self: { ru: "Срочно нужна презентация или схема.", en: "Urgent need for slides or chart." },
                team: { ru: "Как создаются драфты презентаций?", en: "How are slide drafts created?" }
            },
            options: [
                { label: { ru: "ИИ-холсты (Gemini Canvas / Napkin.ai)", en: "AI Canvas (Gemini / Napkin.ai)" }, penalty: 0 },
                { label: { ru: "Текст в ИИ, слайды в PowerPoint", en: "Text in AI, slides in PPT" }, penalty: 5 },
                { label: { ru: "Рисую квадратики вручную", en: "Draw manually" }, penalty: 10 }
            ]
        },
        {
            id: "q6",
            category: { ru: "Агенты", en: "Agents" },
            text: {
                self: { ru: "Кто проверяет ваши идеи и письма?", en: "Who checks your ideas?" },
                team: { ru: "Есть ли библиотека системных промптов?", en: "Is there a prompt library?" }
            },
            options: [
                { label: { ru: "Мои GPTs: Критик, Редактор с инструкциями", en: "My Custom GPTs: Critic, Editor" }, penalty: 0 },
                { label: { ru: "Иногда пишу: «Представь, что ты профи»", en: "Sometimes type: 'Act as a pro'" }, penalty: 4 },
                { label: { ru: "Пишу в пустой чат", en: "Type in empty chat" }, penalty: 7 }
            ]
        },
        {
            id: "q7",
            category: { ru: "Поиск", en: "Research" },
            text: {
                self: { ru: "Нужно найти тренды рынка с точными цифрами.", en: "Need market trends with exact numbers." },
                team: { ru: "Как проводится анализ рынка?", en: "How is market research done?" }
            },
            options: [
                { label: { ru: "Perplexity Pro / Deep Research", en: "Perplexity Pro / Deep Research" }, penalty: 0 },
                { label: { ru: "Гуглю 10 вкладок + ChatGPT", en: "Google 10 tabs + ChatGPT" }, penalty: 5 },
                { label: { ru: "Обычный ChatGPT (риск галлюцинаций)", en: "Standard ChatGPT (Risk of hallucinations)" }, penalty: 8 }
            ]
        },
        {
            id: "q8",
            category: { ru: "Данные", en: "Data" },
            text: {
                self: { ru: "Excel на 5000 строк. Нужно найти инсайты.", en: "5000-row Excel. Need insights." },
                team: { ru: "Как анализируют сырые данные?", en: "How is raw data analyzed?" }
            },
            options: [
                { label: { ru: "Code Interpreter (Python): чистка + графики", en: "Code Interpreter (Python): clean + charts" }, penalty: 0 },
                { label: { ru: "ВПР (VLOOKUP) / Сводные таблицы", en: "VLOOKUP / Pivot Tables" }, penalty: 6 },
                { label: { ru: "Жду аналитика 2 дня", en: "Wait 2 days for analyst" }, penalty: 10 }
            ]
        },
        {
            id: "q9",
            category: { ru: "Голос", en: "Voice" },
            text: {
                self: { ru: "Гениальная идея за рулем / на ходу.", en: "Brilliant idea while driving." },
                team: { ru: "Используется ли голосовой ввод?", en: "Is voice input used?" }
            },
            options: [
                { label: { ru: "Voice Mode -> Саммари на почту", en: "Voice Mode -> Summary to email" }, penalty: 0 },
                { label: { ru: "Голосовое сообщение себе", en: "Voice note to self" }, penalty: 3 },
                { label: { ru: "Надеюсь, что не забуду", en: "Hope I won't forget" }, penalty: 6 }
            ]
        },
        {
            id: "q10",
            category: { ru: "Поток", en: "Workflow" },
            text: {
                self: { ru: "Как результат ИИ попадает в документ?", en: "How does AI result get into doc?" },
                team: { ru: "Насколько бесшовна работа?", en: "How seamless is it?" }
            },
            options: [
                { label: { ru: "Бесшовно (API / Zapier / Export)", en: "Seamless (API / Zapier / Export)" }, penalty: 0 },
                { label: { ru: "Копировать — Вставить — Поправить", en: "Copy — Paste — Fix" }, penalty: 4 },
                { label: { ru: "Перепечатываю руками", en: "Retype manually" }, penalty: 8 }
            ]
        }
    ]
};
