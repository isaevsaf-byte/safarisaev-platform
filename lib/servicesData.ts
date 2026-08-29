import type { Locale } from "@/lib/i18n";

/**
 * Content for the three service pages.
 *
 * /protocols, /resources and /intelligence used to be three 191-line client
 * components with identical markup and only the strings differing — every layout
 * change had to be made three times. The markup now lives in one component and
 * the words live here.
 */

type Localised = Record<Locale, string>;
type LocalisedList = Record<Locale, string[]>;

export type ServiceSlug = "protocols" | "resources" | "intelligence";
export type ServiceIcon = "cpu" | "database" | "brain";

export interface Service {
    slug: ServiceSlug;
    icon: ServiceIcon;
    title: Localised;
    /** Shown under the heading; the old pages had no summary at all. */
    summary: Localised;
    deliverables: LocalisedList;
    problem: Localised;
    outcomes: LocalisedList;
}

export const services: Record<ServiceSlug, Service> = {
    protocols: {
        slug: "protocols",
        icon: "cpu",
        title: { en: "SYSTEM PROTOCOLS", ru: "СИСТЕМНЫЕ ПРОТОКОЛЫ" },
        summary: {
            en: "Turning how the work gets done from tribal knowledge into a documented system.",
            ru: "Превращаю то, как делается работа, из устных знаний в документированную систему.",
        },
        deliverables: {
            en: [
                "Process mapping & bottleneck analysis",
                "SOP documentation & standardization",
                "Org structure optimization",
                "Workflow automation design",
                "Compliance framework setup",
                "Performance metrics definition",
            ],
            ru: [
                "Картирование процессов и анализ узких мест",
                "Документирование и стандартизация SOP",
                "Оптимизация организационной структуры",
                "Проектирование автоматизации рабочих процессов",
                "Настройка системы соответствия требованиям",
                "Определение метрик производительности",
            ],
        },
        problem: {
            en: "Unclear processes create friction. Every handoff becomes a bottleneck. Employees waste time on 'how do I do this?' instead of execution.",
            ru: "Неясные процессы создают трение. Каждая передача становится узким местом. Сотрудники тратят время на «как это сделать?» вместо выполнения.",
        },
        outcomes: {
            en: [
                "Eliminates decision paralysis at every step",
                "Reduces onboarding time by 60%",
                "Creates predictable, scalable operations",
                "Enables remote team coordination",
                "Turns tribal knowledge into documented systems",
            ],
            ru: [
                "Устраняет паралич решений на каждом шаге",
                "Сокращает время адаптации на 60%",
                "Создает предсказуемые, масштабируемые операции",
                "Обеспечивает координацию удаленных команд",
                "Превращает внутренние знания в документированные системы",
            ],
        },
    },

    resources: {
        slug: "resources",
        icon: "database",
        title: { en: "RESOURCE ARCHITECTURE", ru: "АРХИТЕКТУРА РЕСУРСОВ" },
        summary: {
            en: "Getting visibility and control over what the business actually spends, and with whom.",
            ru: "Даю видимость и контроль над тем, что бизнес реально тратит и на кого.",
        },
        deliverables: {
            en: [
                "Procurement audit & spend analysis",
                "Supplier negotiation framework",
                "Vendor relationship management",
                "Cost reduction roadmap",
                "Supply chain optimization",
                "Contract standardization",
            ],
            ru: [
                "Аудит закупок и анализ расходов",
                "Рамки для переговоров с поставщиками",
                "Управление отношениями с поставщиками",
                "Дорожная карта снижения затрат",
                "Оптимизация цепочки поставок",
                "Стандартизация контрактов",
            ],
        },
        problem: {
            en: "Uncontrolled spending bleeds margin. Multiple vendors for the same need. No visibility into what you're actually paying for.",
            ru: "Неконтролируемые расходы истощают маржу. Несколько поставщиков для одной потребности. Нет видимости того, за что вы на самом деле платите.",
        },
        outcomes: {
            en: [
                "Reduces procurement costs by 20-40%",
                "Eliminates duplicate vendor relationships",
                "Creates spending visibility and control",
                "Standardizes contracts and terms",
                "Builds strategic supplier partnerships",
            ],
            ru: [
                "Снижает затраты на закупки на 20-40%",
                "Устраняет дублирование отношений с поставщиками",
                "Создает видимость и контроль расходов",
                "Стандартизирует контракты и условия",
                "Строит стратегические партнерства с поставщиками",
            ],
        },
    },

    intelligence: {
        slug: "intelligence",
        icon: "brain",
        title: { en: "COGNITIVE INTELLIGENCE", ru: "КОГНИТИВНЫЙ ИНТЕЛЛЕКТ" },
        summary: {
            en: "Handing the repetitive half of the job to software, so the expensive half of the team stops doing it.",
            ru: "Отдаю повторяющуюся половину работы софту, чтобы дорогая половина команды перестала ей заниматься.",
        },
        deliverables: {
            en: [
                "AI agent implementation & training",
                "No-code workflow automation",
                "Chatbot & customer support bots",
                "Data processing pipelines",
                "Integration with existing tools",
                "Custom AI model fine-tuning",
            ],
            ru: [
                "Внедрение и обучение AI-агентов",
                "Автоматизация рабочих процессов без кода",
                "Чат-боты и боты поддержки клиентов",
                "Конвейеры обработки данных",
                "Интеграция с существующими инструментами",
                "Тонкая настройка пользовательских AI-моделей",
            ],
        },
        problem: {
            en: "Repetitive tasks consume human bandwidth. Manual data entry, customer inquiries, report generation — all done by expensive talent doing $15/hour work.",
            ru: "Повторяющиеся задачи потребляют человеческие ресурсы. Ручной ввод данных, запросы клиентов, генерация отчетов — всё это делается дорогими специалистами, выполняющими работу за $15/час.",
        },
        outcomes: {
            en: [
                "Frees 20-30 hours per week per employee",
                "Eliminates human error in routine tasks",
                "Provides 24/7 automated support",
                "Scales without linear cost increase",
                "Enables focus on high-value work",
            ],
            ru: [
                "Освобождает 20-30 часов в неделю на сотрудника",
                "Устраняет человеческие ошибки в рутинных задачах",
                "Обеспечивает автоматизированную поддержку 24/7",
                "Масштабируется без линейного увеличения затрат",
                "Позволяет сосредоточиться на высокоценной работе",
            ],
        },
    },
};

/** Shared chrome, previously copy-pasted into all three pages. */
export const serviceChrome = {
    backLink: { en: "< BACK TO TERMINAL", ru: "< НАЗАД К ТЕРМИНАЛУ" },
    deliverables: { en: "DELIVERABLES", ru: "РЕЗУЛЬТАТЫ" },
    why: { en: "WHY THIS FIXES THE CHAOS", ru: "ПОЧЕМУ ЭТО ИСПРАВЛЯЕТ ХАОС" },
    cta: { en: "BOOK THIS MODULE", ru: "ЗАБРОНИРОВАТЬ МОДУЛЬ" },
    themeLight: { en: "LIGHT", ru: "СВЕТЛАЯ" },
    themeDark: { en: "DARK", ru: "ТЁМНАЯ" },
} satisfies Record<string, Localised>;
