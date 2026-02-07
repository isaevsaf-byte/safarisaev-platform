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
                self: {
                    ru: "Вы столкнулись с абсолютно новой темой или задачей. Ваши действия в первую минуту?",
                    en: "You are facing a completely new topic or task. Your move in the first minute?"
                },
                team: {
                    ru: "Команда столкнулась с абсолютно новой темой или задачей. Их действия в первую минуту?",
                    en: "The team faces a completely new topic or task. Their move in the first minute?"
                }
            },
            options: [
                { label: { ru: "Сразу открываю чат с ИИ. Мне быстрее спросить, чем искать.", en: "I open an AI chat immediately. It's faster to ask than to search." }, penalty: 0 },
                { label: { ru: "Иду в Google или YouTube. Ищу статьи, видео, примеры.", en: "I go to Google or YouTube. I look for articles and videos." }, penalty: 5 },
                { label: { ru: "Открываю пустой документ и пытаюсь набросать мысли из головы.", en: "I open a blank doc and try to figure it out with my own brain." }, penalty: 10 }
            ]
        },
        {
            id: "q2",
            category: { ru: "Критика", en: "Thinking" },
            text: {
                self: {
                    ru: "У вас есть черновик важного письма, план проекта или просто спорная идея. Что вы попросите у ИИ?",
                    en: "You have a draft of an important email, a plan, or just an idea. What do you ask AI to do?"
                },
                team: {
                    ru: "У команды есть черновик важного документа или спорная идея. Что они попросят у ИИ?",
                    en: "The team has a draft of an important document or idea. What do they ask AI to do?"
                }
            },
            options: [
                { label: { ru: "«Найди слабые места, логические дыры и покритикуй этот текст».", en: "\"Find logic gaps, potential risks, and criticize this text.\"" }, penalty: 0 },
                { label: { ru: "«Исправь ошибки, сделай текст красивее и короче».", en: "\"Fix grammar, polish the tone, and make it shorter.\"" }, penalty: 5 },
                { label: { ru: "Ничего. Я перечитываю и правлю всё сам.", en: "Nothing. I re-read and edit it myself." }, penalty: 10 }
            ]
        },
        {
            id: "q3",
            category: { ru: "Документы", en: "Deep Dive" },
            text: {
                self: {
                    ru: "Перед вами длинный документ (договор, инструкция, статья или книга). Нужно найти конкретный ответ.",
                    en: "You have a long document in front of you (contract, manual, article, or book). You need a specific answer."
                },
                team: {
                    ru: "Перед командой длинный документ. Нужно найти конкретный ответ.",
                    en: "The team has a long document. They need a specific answer."
                }
            },
            options: [
                { label: { ru: "Загружаю файл целиком в ИИ и задаю ему вопросы по тексту.", en: "I upload the file to AI and ask specific questions about the content." }, penalty: 0 },
                { label: { ru: "Копирую текст (или кусок) в чат и прошу: «Сделай краткий пересказ».", en: "I copy-paste the text (or chunk) into AI and ask: \"Summarize this.\"" }, penalty: 5 },
                { label: { ru: "Читаю сам по диагонали или использую поиск (Ctrl+F).", en: "I read it diagonally or use the search function (Ctrl+F)." }, penalty: 10 }
            ]
        },
        {
            id: "q4",
            category: { ru: "Инструменты", en: "Builder" },
            text: {
                self: {
                    ru: "Вам нужен специфический инструмент: например, калькулятор ипотеки, конвертер файлов или сложная формула.",
                    en: "You need a specific tool: a custom mortgage calculator, a file converter, or a complex formula."
                },
                team: {
                    ru: "Команде нужен специфический инструмент: калькулятор, конвертер или сложная формула.",
                    en: "The team needs a specific tool: a calculator, converter, or complex formula."
                }
            },
            options: [
                { label: { ru: "Пишу ИИ: «Напиши мне код/скрипт для этого», даже если я не умею программировать.", en: "I ask AI: \"Write the code/script for this,\" even if I don't know how to code." }, penalty: 0 },
                { label: { ru: "Ищу в Google готовое приложение, сайт или плагин, который это делает.", en: "I search Google for an existing app, website, or plugin that does this." }, penalty: 5 },
                { label: { ru: "Пытаюсь посчитать/сделать это вручную или ищу знакомого программиста.", en: "I try to calculate/do it manually or look for a friend who can help." }, penalty: 10 }
            ]
        },
        {
            id: "q5",
            category: { ru: "Визуализация", en: "Visuals" },
            text: {
                self: {
                    ru: "Вам нужно подготовить презентацию или нарисовать схему, чтобы объяснить сложную идею.",
                    en: "You need to prepare a presentation or draw a diagram to explain a complex idea."
                },
                team: {
                    ru: "Команде нужно подготовить презентацию или схему для сложной идеи.",
                    en: "The team needs to prepare a presentation or diagram for a complex idea."
                }
            },
            options: [
                { label: { ru: "Прошу ИИ: «Нарисуй схему/график» или «Собери готовые слайды».", en: "I ask AI: \"Draw a diagram/chart\" or \"Generate the actual slides.\"" }, penalty: 0 },
                { label: { ru: "Прошу ИИ написать текст для слайдов, а потом вручную копирую его в PowerPoint.", en: "I ask AI to write the text, then I manually copy-paste it into PowerPoint." }, penalty: 5 },
                { label: { ru: "Рисую квадратики, стрелочки и подбираю картинки сам.", en: "I draw boxes, arrows, and search for images manually." }, penalty: 10 }
            ]
        },
        {
            id: "q6",
            category: { ru: "Контекст", en: "Context" },
            text: {
                self: {
                    ru: "Вы садитесь писать типичное для вас письмо, пост или задачу. Как вы объясняете ИИ, что нужно делать?",
                    en: "You sit down to write a typical email, post, or task. How do you explain to AI what you need?"
                },
                team: {
                    ru: "Команда садится писать типичное письмо или задачу. Как они объясняют ИИ, что нужно?",
                    en: "The team sits down to write a typical email or task. How do they explain to AI what they need?"
                }
            },
            options: [
                { label: { ru: "Открываю своего настроенного бота (Custom GPT), который уже знает мой стиль и правила.", en: "I open my custom bot (Custom GPT) that already knows my style and rules." }, penalty: 0 },
                { label: { ru: "Каждый раз пишу вступление: «Представь, что ты профи, пиши в таком-то стиле...»", en: "I type an intro every time: \"Act as a pro, write in this style, here is the context...\"" }, penalty: 5 },
                { label: { ru: "Просто пишу задачу в пустую строку. Если результат плохой — переспрашиваю.", en: "I just type the task into the blank bar. If the result is bad, I ask again." }, penalty: 10 }
            ]
        },
        {
            id: "q7",
            category: { ru: "Поиск", en: "Research" },
            text: {
                self: {
                    ru: "Вам нужно выбрать лучший товар (ноутбук/пылесос), найти отель или сравнить цены конкурентов.",
                    en: "You need to choose the best product (laptop/vacuum), find a hotel, or compare prices."
                },
                team: {
                    ru: "Команде нужно выбрать лучший товар, найти отель или сравнить цены.",
                    en: "The team needs to choose the best product, find a hotel, or compare prices."
                }
            },
            options: [
                { label: { ru: "Пишу ИИ: «Найди в интернете 5 лучших вариантов, сравни цены и сделай сводную таблицу».", en: "I ask AI: \"Search the web, compare top 5 options, and make a comparison table.\"" }, penalty: 0 },
                { label: { ru: "Гуглю запрос, открываю 10–15 вкладок и прыгаю между ними, сравнивая вручную.", en: "I Google it, open 10–15 tabs, and jump between them comparing manually." }, penalty: 5 },
                { label: { ru: "Спрашиваю обычного чат-бота (без доступа в сеть) и верю его ответу, даже если он выдумал цены.", en: "I ask a standard chatbot (offline) and trust the answer, even if it hallucinates the prices." }, penalty: 10 }
            ]
        },
        {
            id: "q8",
            category: { ru: "Данные", en: "Data" },
            text: {
                self: {
                    ru: "У вас есть «страшная» таблица (семейный бюджет, список клиентов или выгрузка продаж). Нужно навести порядок.",
                    en: "You have a \"messy\" spreadsheet (expenses, client list, or sales data). You need to fix it."
                },
                team: {
                    ru: "У команды есть «страшная» таблица с данными. Нужно навести порядок.",
                    en: "The team has a \"messy\" spreadsheet with data. They need to fix it."
                }
            },
            options: [
                { label: { ru: "Кидаю файл в ИИ и говорю: «Почисти данные, посчитай итоги и нарисуй графики».", en: "I drop the file into AI and say: \"Clean this up, calculate totals, and show me charts.\"" }, penalty: 0 },
                { label: { ru: "Прошу ИИ: «Напиши мне формулу для Excel, чтобы я мог это посчитать».", en: "I ask AI: \"Write me an Excel formula so I can calculate this myself.\"" }, penalty: 5 },
                { label: { ru: "Сижу, выделяю ячейки мышкой и считаю вручную или на калькуляторе.", en: "I sit there, highlighting cells and calculating manually." }, penalty: 10 }
            ]
        },
        {
            id: "q9",
            category: { ru: "На ходу", en: "Voice" },
            text: {
                self: {
                    ru: "Вам пришла гениальная идея (или вы вспомнили о деле) в неудобный момент: за рулем, на беговой дорожке или на прогулке.",
                    en: "You get a brilliant idea (or remember a task) at a bad time: driving, running, or walking."
                },
                team: {
                    ru: "Сотруднику пришла идея в неудобный момент: за рулем или на ходу.",
                    en: "A team member gets an idea at a bad time: driving or on the go."
                }
            },
            options: [
                { label: { ru: "Включаю Голосовой Режим (Voice Mode), обсуждаю идею с ИИ вслух и прошу прислать резюме на почту.", en: "I turn on Voice Mode, talk it out with AI, and ask it to email me the summary." }, penalty: 0 },
                { label: { ru: "Останавливаюсь и пытаюсь быстро набить заметку в телефоне пальцами или записываю голосовое «сам себе».", en: "I stop and try to type a note with my thumbs or record a voice memo to myself." }, penalty: 5 },
                { label: { ru: "Говорю себе: «Запомни это!» (Спойлер: вы это забудете).", en: "I tell myself: \"Remember this!\" (Spoiler: You will forget it)." }, penalty: 10 }
            ]
        },
        {
            id: "q10",
            category: { ru: "Рутина", en: "The Loop" },
            text: {
                self: {
                    ru: "У вас есть нудная задача, которая повторяется каждую неделю (отчет, контент-план, разбор почты).",
                    en: "You have a boring task that repeats every week (report, content plan, cleaning inbox)."
                },
                team: {
                    ru: "У команды есть нудная задача, которая повторяется каждую неделю.",
                    en: "The team has a boring task that repeats every week."
                }
            },
            options: [
                { label: { ru: "Один раз настроил цепочку (или скрипт), и теперь это работает само, пока я сплю.", en: "I built a workflow (or script) once. Now it runs on autopilot while I sleep." }, penalty: 0 },
                { label: { ru: "Каждый раз захожу в чат, копирую прошлый промпт и прошу: «Сделай это снова».", en: "I open the chat every time, paste the old prompt, and ask: \"Do this again.\"" }, penalty: 5 },
                { label: { ru: "Делаю руками. Это же моя работа!", en: "I do it manually. It's my job, isn't it?" }, penalty: 10 }
            ]
        }
    ]
};
