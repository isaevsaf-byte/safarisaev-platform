
export type Lang = "en" | "ru";

export const aiIndexData = {
    meta: {
        start_score: 100, // Reverse scoring starts at 100
        thresholds: {
            architect: 90, // Green
            executive: 60, // Yellow (60-89)
            legacy: 0,     // Red (<60)
        }
    },
    content: {
        en: {
            text: {
                title: "AI Velocity Index",
                subtitle: "Measure your organization's speed to intelligence.",
                context_toggle: {
                    myself: "Assess Myself",
                    team: "Assess My Team",
                },
                gauge_label: "Velocity Multiplier",
                input_label: "Your Email (for report)",
                cta: "Get Full Strategy",
                calculating: "Analyzing Velocity...",
                results: {
                    title: "Your AI Velocity Profile",
                    download_btn: "Download Strategy PDF"
                },
                zones: {
                    architect: {
                        title: "AI Architect (10x)",
                        desc: "You are building software without code. Your speed is your moat.",
                        color: "text-emerald-500",
                        bg: "bg-emerald-500",
                        badge: "Velocity: Supersonic"
                    },
                    executive: {
                        title: "AI Executive (2x)",
                        desc: "You have strategy, but execution is fragmented. You need a system.",
                        color: "text-amber-500",
                        bg: "bg-amber-500",
                        badge: "Velocity: Accelerated"
                    },
                    legacy: {
                        title: "Legacy Operator (1x)",
                        desc: "Using a supercomputer like a typewriter. You are at risk of obsolescence.",
                        color: "text-rose-500",
                        bg: "bg-rose-500",
                        badge: "Velocity: Stalled"
                    }
                }
            },
            questions: [
                {
                    id: 1,
                    text_myself: "How do you write daily emails & reports?",
                    text_team: "How does your team write daily emails & reports?",
                    options: [
                        { text: "Fully automated / ONE prompt generates 90%", penalty: 0 },
                        { text: "I use ChatGPT to edit/refine drafts", penalty: 5 },
                        { text: "I write everything manually from scratch", penalty: 15 }
                    ]
                },
                {
                    id: 2,
                    text_myself: "How do you handle meeting notes?",
                    text_team: "How does your team handle meeting notes?",
                    options: [
                        { text: "AI records, transcribes & emails action items instantly", penalty: 0 },
                        { text: "I take notes, then clean them up later", penalty: 5 },
                        { text: "Manual note-taking / No notes shared", penalty: 15 }
                    ]
                },
                {
                    id: 3,
                    text_myself: "What is your approach to coding/automation?",
                    text_team: "What is your team's approach to automation?",
                    options: [
                        { text: "I build my own tools using AI (Cursor/Replit)", penalty: 0 },
                        { text: "I ask developers to build things for me", penalty: 10 },
                        { text: "We use standard software only (Excel/SaaS)", penalty: 20 }
                    ]
                },
                {
                    id: 4,
                    text_myself: "How do you analyze large documents?",
                    text_team: "How does your team analyze large documents?",
                    options: [
                        { text: "Upload to AI -> Answer in seconds", penalty: 0 },
                        { text: "Skim read manually + Ctrl+F", penalty: 10 },
                        { text: "Read fully line-by-line", penalty: 20 }
                    ]
                },
                {
                    id: 5,
                    text_myself: "How fast can you launch a new landing page/idea?",
                    text_team: "How fast can your team launch a new idea?",
                    options: [
                        { text: "Hours (AI generated copy + code)", penalty: 0 },
                        { text: "Days (Need checks/approvals)", penalty: 10 },
                        { text: "Weeks/Months (Agency/IT dept)", penalty: 25 }
                    ]
                }
            ],
            report: {
                title: "AI VELOCITY AUDIT",
                role: "Strategic Assessment",
                diagnosis_title: "DIAGNOSIS",
                imperatives_title: "STRATEGIC IMPERATIVES"
            },
            deep_think: {
                architect: {
                    diagnosis: "You have achieved 'Escape Velocity'. You are no longer constrained by human typing speed or manual cognition.",
                    imperatives: [
                        { title: "Sovereign AI Infrastructure", desc: "Move from public models to private, fine-tuned local LLMs for IP protection." },
                        { title: "Agentic Workflows", desc: "Replace discrete tasks with autonomous agents that run 24/7." }
                    ]
                },
                executive: {
                    diagnosis: "You understand the power of AI, but your implementation is sporadic. You are a 'Centaur'—human + AI, but still manual.",
                    imperatives: [
                        { title: "Systemization", desc: "Turn ad-hoc prompting into standardized prompts libraries." },
                        { title: "Automation First", desc: "Default to AI for every text/code task. Stop typing." }
                    ]
                },
                legacy: {
                    diagnosis: "You are operating in the pre-2023 era. Your competitors are moving 10x faster using the same tools you ignore.",
                    imperatives: [
                        { title: "Radical Adoption", desc: "Force adoption of basic LLM tools for all communication." },
                        { title: "Process Audit", desc: "Identify the 20% of tasks taking 80% of time and kill them with AI." }
                    ]
                }
            }
        },
        ru: {
            text: {
                title: "Индекс AI-Скорости",
                subtitle: "Измерьте скорость вашего интеллекта.",
                context_toggle: {
                    myself: "Оценить Себя",
                    team: "Оценить Команду",
                },
                gauge_label: "Множитель Скорости",
                input_label: "Ваш Email (для отчета)",
                cta: "Получить Стратегию",
                calculating: "Расчет скорости...",
                results: {
                    title: "Ваш AI-Профиль",
                    download_btn: "Скачать PDF Отчет"
                },
                zones: {
                    architect: {
                        title: "AI Архитектор (10x)",
                        desc: "Вы создаете софт без кода. Ваша скорость — ваше главное преимущество.",
                        color: "text-emerald-500",
                        bg: "bg-emerald-500",
                        badge: "Скорость: Сверхзвуковая"
                    },
                    executive: {
                        title: "AI Экзекьютив (2x)",
                        desc: "У вас есть стратегия, но исполнение фрагментарно. Вам нужна система.",
                        color: "text-amber-500",
                        bg: "bg-amber-500",
                        badge: "Скорость: Высокая"
                    },
                    legacy: {
                        title: "Legacy Оператор (1x)",
                        desc: "Используете суперкомпьютер как печатную машинку. Риск устаревания критичен.",
                        color: "text-rose-500",
                        bg: "bg-rose-500",
                        badge: "Скорость: Минимальная"
                    }
                }
            },
            questions: [
                {
                    id: 1,
                    text_myself: "Как вы пишете ежедневные письма и отчеты?",
                    text_team: "Как ваша команда пишет письма и отчеты?",
                    options: [
                        { text: "Автоматически / ОДИН промпт делает 90%", penalty: 0 },
                        { text: "Использую GPT для редактуры черновиков", penalty: 5 },
                        { text: "Пишу всё вручную с нуля", penalty: 15 }
                    ]
                },
                {
                    id: 2,
                    text_myself: "Как вы фиксируете итоги встреч?",
                    text_team: "Как команда фиксирует итоги встреч?",
                    options: [
                        { text: "AI записывает, транскрибирует и шлет задачи", penalty: 0 },
                        { text: "Делаю пометки, потом привожу в порядок", penalty: 5 },
                        { text: "Ручные записи / Или вообще без записей", penalty: 15 }
                    ]
                },
                {
                    id: 3,
                    text_myself: "Ваш подход к кодингу и автоматизации?",
                    text_team: "Подход команды к автоматизации?",
                    options: [
                        { text: "Сам пишу инструменты с AI (Cursor, Replit)", penalty: 0 },
                        { text: "Ставлю ТЗ разработчикам и жду", penalty: 10 },
                        { text: "Используем только готовый софт (Excel/SaaS)", penalty: 20 }
                    ]
                },
                {
                    id: 4,
                    text_myself: "Как вы анализируете большие документы?",
                    text_team: "Как команда анализирует документы?",
                    options: [
                        { text: "Загружаю в AI -> Ответ за секунды", penalty: 0 },
                        { text: "Бегло читаю + Ctrl+F", penalty: 10 },
                        { text: "Читаю всё подряд построчно", penalty: 20 }
                    ]
                },
                {
                    id: 5,
                    text_myself: "Как быстро вы можете запустить идею/лендинг?",
                    text_team: "Скорость запуска идей в команде?",
                    options: [
                        { text: "Часы (AI пишет текст и код)", penalty: 0 },
                        { text: "Дни (Согласования, проверки)", penalty: 10 },
                        { text: "Недели/Месяцы (ТЗ, дизайн, IT отдел)", penalty: 25 }
                    ]
                }
            ],
            report: {
                title: "АУДИТ AI-СКОРОСТИ",
                role: "Стратегическая Оценка",
                diagnosis_title: "ДИАГНОЗ",
                imperatives_title: "СТРАТЕГИЧЕСКИЕ ИМПЕРАТИВЫ"
            },
            deep_think: {
                architect: {
                    diagnosis: "Вы достигли 'Второй Космической'. Вы больше не ограничены скоростью печати или ручной когнитивной нагрузкой.",
                    imperatives: [
                        { title: "Суверенный AI", desc: "Переход от публичных моделей к приватным локальным LLM для защиты IP." },
                        { title: "Агентные Воркфлоу", desc: "Замена дискретных задач автономными агентами 24/7." }
                    ]
                },
                executive: {
                    diagnosis: "Вы понимаете мощь AI, но внедрение хаотично. Вы 'Кентавр' — человек + AI, но процесс всё ещё ручной.",
                    imperatives: [
                        { title: "Систематизация", desc: "Превращение хаотичных промптов в библиотеки стандартов." },
                        { title: "Automation First", desc: "Принцип: не писать ни строчки текста/кода руками." }
                    ]
                },
                legacy: {
                    diagnosis: "Вы работаете в эпохе до 2023 года. Конкуренты с теми же ресурсами уже двигаются в 10 раз быстрее.",
                    imperatives: [
                        { title: "Радикальное Внедрение", desc: "Принудительное использование LLM для всех коммуникаций." },
                        { title: "Аудит Процессов", desc: "Найти 20% рутины, занимающей 80% времени, и убить её через AI." }
                    ]
                }
            }
        }
    }
};
