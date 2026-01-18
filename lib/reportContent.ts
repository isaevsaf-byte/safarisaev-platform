export type ReportContent = {
    title: string;
    role: string;
    diagnosis: string;
    imperatives: { title: string; desc: string }[];
    pitch: { title: string; desc: string };
};

export const REPORT_DATA = {
    ru: {
        red: {
            title: "ПРОТОКОЛ: УПРАВЛЕНИЕ РИСКАМИ",
            role: "Статус: Критическая уязвимость",
            diagnosis: "Выявлены критические уязвимости в контроле затрат. Текущая модель создает риски кассовых разрывов. Разрыв между плановой и реальной маржинальностью требует немедленного устранения.",
            imperatives: [
                { title: "Централизация Казначейства", desc: "Введение жесткого контроля платежей. Оплата только при наличии утвержденной заявки (3-Way Match)." },
                { title: "Аудит Контрактов", desc: "Сверка цен топ-20 поставщиков с рыночными бенчмарками для выявления переплат." },
                { title: "Минимизация Рисков", desc: "Исключение закупок через неавторизованные каналы (мессенджеры, подотчет)." }
            ],
            pitch: { title: "РЕШЕНИЕ: Программа Оптимизации Затрат", desc: "Внедрение инструментов финансового контроля за 4 недели. Цель: стабилизация денежного потока и исключение нецелевых расходов." }
        },
        yellow: {
            title: "ПРОТОКОЛ: ОПЕРАЦИОННАЯ ЭФФЕКТИВНОСТЬ",
            role: "Статус: Требуется систематизация",
            diagnosis: "Бизнес масштабируется быстрее, чем процессы. Вы теряете ресурсы на ручном управлении и административном трении. Это скрытые издержки, снижающие EBITDA.",
            imperatives: [
                { title: "Стандартизация Процессов", desc: "Внедрение регламентов (SOP) для снижения трудозатрат и зависимости от конкретных сотрудников." },
                { title: "Работа с Tail Spend", desc: "Консолидация базы мелких поставщиков для снижения административной нагрузки на отдел." },
                { title: "Цифровая Гигиена", desc: "Переход от хаотичных таблиц к единому реестру обязательств." }
            ],
            pitch: { title: "РЕШЕНИЕ: Систематизация Снабжения", desc: "Трансформация закупок из сервисной функции в системную. Оцифровка рутины и внедрение категорийного менеджмента." }
        },
        green: {
            title: "ПРОТОКОЛ: СТРАТЕГИЧЕСКОЕ РАЗВИТИЕ",
            role: "Статус: Лидер рынка",
            diagnosis: "Высокий уровень операционной дисциплины. Текущая база позволяет использовать закупки как инструмент создания добавленной стоимости.",
            imperatives: [
                { title: "Управление Отношениями (SRM)", desc: "Развитие стратегических партнерств с ключевыми вендорами для получения эксклюзивных условий." },
                { title: "Предиктивная Аналитика", desc: "Использование данных для точного планирования спроса и управления оборотным капиталом." },
                { title: "Масштабирование", desc: "Подготовка архитектуры цепи поставок к выходу на новые рынки или M&A." }
            ],
            pitch: { title: "РЕШЕНИЕ: Стратегия Масштабирования", desc: "Интеграция лучших мировых практик (Best Practices) для поддержки роста капитализации компании." }
        }
    },
    en: {
        red: {
            title: "PROTOCOL: RISK MANAGEMENT",
            role: "Status: Critical Vulnerability",
            diagnosis: "Critical vulnerabilities in cost control detected. Current model creates cash flow risks. The gap between planned and actual margins requires immediate attention.",
            imperatives: [
                { title: "Treasury Centralization", desc: "Strict payment control. Payments released only with approved POs (3-Way Match)." },
                { title: "Contract Audit", desc: "Benchmarking top-20 supplier contracts against market rates to identify overpayment." },
                { title: "Risk Mitigation", desc: "Elimination of unauthorized purchasing channels (maverick spend)." }
            ],
            pitch: { title: "SOLUTION: Cost Optimization Program", desc: "Implementation of financial controls in 4 weeks. Goal: Stabilize cash flow and eliminate non-compliant spending." }
        },
        yellow: {
            title: "PROTOCOL: OPERATIONAL EFFICIENCY",
            role: "Status: Systematization Required",
            diagnosis: "Business is scaling faster than processes. You are losing resources on manual management friction. These are hidden costs eroding EBITDA.",
            imperatives: [
                { title: "Process Standardization", desc: "Implementing SOPs to reduce manual effort and dependency on specific individuals." },
                { title: "Tail Spend Management", desc: "Consolidating low-value suppliers to reduce administrative burden." },
                { title: "Digital Hygiene", desc: "Moving from chaotic spreadsheets to a unified commitment register." }
            ],
            pitch: { title: "SOLUTION: Procurement Systematization", desc: "Transforming procurement from a service function to a system. Digitizing routine and implementing category management." }
        },
        green: {
            title: "PROTOCOL: STRATEGIC DEVELOPMENT",
            role: "Status: Market Leader",
            diagnosis: "High level of operational discipline. Current base allows using procurement as a value creation tool.",
            imperatives: [
                { title: "Supplier Relationship Management", desc: "Developing strategic partnerships with key vendors for exclusive terms." },
                { title: "Predictive Analytics", desc: "Using data for accurate demand planning and working capital management." },
                { title: "Scaling Architecture", desc: "Preparing supply chain architecture for new market entry or M&A." }
            ],
            pitch: { title: "SOLUTION: Scaling Strategy", desc: "Integrating Global Best Practices to support company valuation growth." }
        }
    }
};
