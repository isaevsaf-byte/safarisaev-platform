export const efficiencyData = {
    meta: {
        cap_waste: 32,
        start_score: 100,
    },
    content: {
        en: {
            text: {
                title: "The Anonymous Efficiency Index",
                subtitle: "Calculate hidden operational waste in 3 minutes.",
                tank_label: "Efficiency Level",
                progress_label: "Audit Progress",
                input_label: "Annual Revenue / Budget",
                money_lost_label: "ESTIMATED ANNUAL LOSS",
                cta: "Book Zero-Waste Audit",
                calculating: "Calculating...",
                zones: {
                    green: { title: "The Fortress", desc: "Operational Excellence. Margins protected." },
                    yellow: { title: "The Leaking Pipe", desc: "Silent Erosion. Growth funds inefficiency." },
                    red: { title: "The Bleeding Edge", desc: "Critical Vulnerability. You are donating cash to the market." },
                },
            },
            questions: [
                {
                    id: 1,
                    text: "What are your standard Payment Terms?",
                    options: [
                        { text: "Net 45-60 days (Optimized)", penalty: 0 },
                        { text: "Inconsistent / Case-by-case", penalty: 3 },
                        { text: "Immediate / Net 14 (Cash Trap)", penalty: 4 },
                    ],
                },
                {
                    id: 2,
                    text: "Can you instantly quote exact spend with Top 10 suppliers?",
                    options: [
                        { text: "Yes, live dashboard", penalty: 0 },
                        { text: "Roughly, need to ask", penalty: 2 },
                        { text: "No, only P&L view", penalty: 4 },
                    ],
                },
                {
                    id: 3,
                    text: "Can a manager spend £2k without prior PO?",
                    options: [
                        { text: "No, system blocks it", penalty: 0 },
                        { text: "Yes, if in budget", penalty: 3 },
                        { text: "Yes, no strict limits", penalty: 5 },
                    ],
                },
                {
                    id: 4,
                    text: "Last benchmark of service contracts?",
                    options: [
                        { text: "< 9 months ago", penalty: 0 },
                        { text: "~1 year ago", penalty: 2 },
                        { text: "> 2 years / Never", penalty: 4 },
                    ],
                },
                {
                    id: 5,
                    text: "Tail Spend management strategy?",
                    options: [
                        { text: "Consolidated volumes", penalty: 0 },
                        { text: "Fragmented / Bloated list", penalty: 3 },
                    ],
                },
                {
                    id: 6,
                    text: "Contract repository status?",
                    options: [
                        { text: "Digital CLM with alerts", penalty: 0 },
                        { text: "Shared Drive / Excel", penalty: 2 },
                        { text: "Emails / Paper", penalty: 4 },
                    ],
                },
                {
                    id: 7,
                    text: "Service delivery validation?",
                    options: [
                        { text: "Strict 3-way match", penalty: 0 },
                        { text: "Visual check", penalty: 2 },
                        { text: "Auto-payment", penalty: 3 },
                    ],
                },
                {
                    id: 8,
                    text: "Invoice processing method?",
                    options: [
                        { text: "Auto (EDI/OCR)", penalty: 0 },
                        { text: "Manual entry", penalty: 3 },
                    ],
                },
                {
                    id: 9,
                    text: "Panic buying frequency?",
                    options: [
                        { text: "Rare (<5%)", penalty: 0 },
                        { text: "Regular", penalty: 3 },
                    ],
                },
                {
                    id: 10,
                    text: "Backup for key suppliers?",
                    options: [
                        { text: "Yes, contract signed", penalty: 0 },
                        { text: "Know who, no contract", penalty: 1 },
                        { text: "No, dependent", penalty: 3 },
                    ],
                },
            ],
        },
        ru: {
            text: {
                title: "Индекс Невидимой Эффективности",
                subtitle: "Рассчитайте скрытые операционные потери за 3 минуты.",
                tank_label: "Уровень Эффективности",
                progress_label: "Прогресс Аудита",
                input_label: "Ваш годовой оборот / Бюджет",
                money_lost_label: "ОЦЕНКА ЕЖЕГОДНЫХ ПОТЕРЬ",
                cta: "Записаться на Аудит",
                calculating: "Анализ данных...",
                zones: {
                    green: { title: "Крепость", desc: "Операционное превосходство. Ваша прибыль защищена." },
                    yellow: { title: "Протекающая труба", desc: "Тихая эрозия. Ваш рост финансирует вашу неэффективность." },
                    red: { title: "Кровотечение", desc: "Критическая уязвимость. Вы дарите рынку огромные суммы." },
                },
            },
            questions: [
                {
                    id: 1,
                    text: "Какова ваша стандартная отсрочка платежа?",
                    options: [
                        { text: "Стратегический стандарт: 45-60 дней", penalty: 0 },
                        { text: "Хаотично: Условия разные, договариваемся по ситуации", penalty: 3 },
                        { text: "Платим по факту или быстро (до 14 дней)", penalty: 4 },
                    ],
                },
                {
                    id: 2,
                    text: "Можете ли вы за 1 минуту назвать точную сумму расходов по Топ-10 поставщикам?",
                    options: [
                        { text: "Да, данные доступны в 1 клик", penalty: 0 },
                        { text: "Примерно, но нужно уточнять", penalty: 2 },
                        { text: "Нет, вижу только общие цифры P&L", penalty: 4 },
                    ],
                },
                {
                    id: 3,
                    text: "Может ли руководитель департамента оплатить счет на $2,000 без предварительного утверждения?",
                    options: [
                        { text: "Нет, система блокирует такие оплаты", penalty: 0 },
                        { text: "Да, если это в рамках бюджета", penalty: 3 },
                        { text: "Да, строгих лимитов нет / оформляем задним числом", penalty: 5 },
                    ],
                },
                {
                    id: 4,
                    text: "Когда последний раз проводился тендер или мониторинг цен по вашим старым поставщикам?",
                    options: [
                        { text: "Менее 6-9 месяцев назад", penalty: 0 },
                        { text: "Около года назад", penalty: 2 },
                        { text: "Более 2 лет назад / «Мы им доверяем»", penalty: 4 },
                    ],
                },
                {
                    id: 5,
                    text: "Как вы управляете мелкими закупками (низкий чек, большие объемы)?",
                    options: [
                        { text: "Минимум поставщиков (консолидация)", penalty: 0 },
                        { text: "Много разовых контрагентов, база раздута", penalty: 3 },
                    ],
                },
                {
                    id: 6,
                    text: "Где хранятся ваши контракты и сроки их автопродления?",
                    options: [
                        { text: "В цифровой системе с напоминаниями", penalty: 0 },
                        { text: "В папках на сервере / Google Drive", penalty: 2 },
                        { text: "В почте, у юристов или в бумаге", penalty: 4 },
                    ],
                },
                {
                    id: 7,
                    text: "Как вы проверяете, что услуги были реально оказаны перед оплатой?",
                    options: [
                        { text: "Строгая приемка / трехсторонняя сверка", penalty: 0 },
                        { text: "Визуальная проверка руководителем", penalty: 2 },
                        { text: "Счет просто передается в оплату", penalty: 3 },
                    ],
                },
                {
                    id: 8,
                    text: "Как входящие счета попадают в учетную систему?",
                    options: [
                        { text: "Автоматически (EDI / сканирование)", penalty: 0 },
                        { text: "Ручной ввод сотрудником", penalty: 3 },
                    ],
                },
                {
                    id: 9,
                    text: "Как часто случаются срочные закупки («нужно вчера»)?",
                    options: [
                        { text: "Крайне редко (<5%)", penalty: 0 },
                        { text: "Регулярно", penalty: 3 },
                    ],
                },
                {
                    id: 10,
                    text: "Есть ли у вас утвержденный альтернативный поставщик для ключевых позиций?",
                    options: [
                        { text: "Да, резервные контракты подписаны", penalty: 0 },
                        { text: "Знаем кого позвать, но контракта нет", penalty: 1 },
                        { text: "Нет, зависим от текущего", penalty: 3 },
                    ],
                },
            ],
        },
    },
};

export type Lang = "en" | "ru";
export type Question = typeof efficiencyData.content.en.questions[0];
export type Option = Question["options"][0];
