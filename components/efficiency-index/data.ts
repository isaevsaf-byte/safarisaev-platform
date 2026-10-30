export const efficiencyData = {
    meta: {
        cap_waste: 50,
        start_score: 100,
    },
    content: {
        en: {
            text: {
                title: "The Anonymous Efficiency Index",
                subtitle: "Calculate hidden operational waste in 3 minutes.",
                tank_label: "Efficiency Level",
                progress_label: "Progress",
                input_label: "Annual Revenue / Budget",
                money_lost_label: "ESTIMATED ANNUAL LOSS",
                back_btn: "Go Back",
                calculating: "Calculating...",
                zones: {
                    green: {
                        title: "The Fortress",
                        desc: "Elite Tier. Your processes are airtight, margins protected. You are ready for safe scaling.",
                    },
                    yellow: {
                        title: "The Leaking Pipe",
                        desc: "Silent Capital Erosion. Your growth funds your inefficiency. You are losing money on process friction.",
                    },
                    red: {
                        title: "The Bleeding Edge",
                        desc: "Critical Vulnerability. You are donating huge sums to the market daily. Immediate intervention required.",
                    },
                },
            },
            questions: [
                {
                    id: 1,
                    text: "How quickly do customers pay your invoices?",
                    options: [
                        { text: "On time, reminders go out automatically", penalty: 0 },
                        { text: "Inconsistent / Chased by hand", penalty: 1.5 },
                        { text: "Late is normal, nobody owns it (Cash Trap)", penalty: 5.0 },
                    ],
                },
                {
                    id: 2,
                    text: "Can you instantly name your 10 biggest costs from last month?",
                    options: [
                        { text: "Yes, live dashboard", penalty: 0 },
                        { text: "Roughly, need to ask", penalty: 1.0 },
                        { text: "No, only P&L view", penalty: 5.0 },
                    ],
                },
                {
                    id: 3,
                    text: "Can a department head pay a £2k invoice without prior approval?",
                    options: [
                        { text: "No, system blocks it", penalty: 0 },
                        { text: "Yes, if in budget", penalty: 1.5 },
                        { text: "Yes, no strict limits", penalty: 6.0 },
                    ],
                },
                {
                    id: 4,
                    text: "When did you last review the software and subscriptions you pay for?",
                    options: [
                        { text: "< 9 months ago", penalty: 0 },
                        { text: "~1 year ago", penalty: 1.0 },
                        { text: "> 2 years / Never", penalty: 4.0 },
                    ],
                },
                {
                    id: 5,
                    text: "How many tools does the team use to track the same work?",
                    options: [
                        { text: "One shared system", penalty: 0 },
                        { text: "Several, copied between them", penalty: 3.0 },
                    ],
                },
                {
                    id: 6,
                    text: "Where do your contracts and renewal dates live?",
                    options: [
                        { text: "Digital system with alerts", penalty: 0 },
                        { text: "Shared Drive / Excel", penalty: 1.0 },
                        { text: "Emails / Paper", penalty: 4.0 },
                    ],
                },
                {
                    id: 7,
                    text: "How are handoffs between teams tracked?",
                    options: [
                        { text: "Shared system, every step has an owner", penalty: 0 },
                        { text: "Chat and memory", penalty: 1.0 },
                        { text: "They are not, things get dropped", penalty: 4.0 },
                    ],
                },
                {
                    id: 8,
                    text: "How does data get from one system into another?",
                    options: [
                        { text: "Automatically (integrations)", penalty: 0 },
                        { text: "Manual re-typing", penalty: 3.0 },
                    ],
                },
                {
                    id: 9,
                    text: "How often does work turn urgent (\"needed yesterday\")?",
                    options: [
                        { text: "Rare (<5%)", penalty: 0 },
                        { text: "Regular", penalty: 3.0 },
                    ],
                },
                {
                    id: 10,
                    text: "If a key person is off for two weeks, does their work carry on?",
                    options: [
                        { text: "Yes, documented and covered", penalty: 0 },
                        { text: "Someone could manage, nothing written down", penalty: 0.5 },
                        { text: "No, it stops", penalty: 3.0 },
                    ],
                },
            ],
        },
        ru: {
            text: {
                title: "Индекс Эффективности",
                subtitle: "Рассчитайте скрытые операционные потери за 3 минуты.",
                tank_label: "Уровень Эффективности",
                progress_label: "Прогресс",
                input_label: "Ваш годовой оборот / Бюджет",
                money_lost_label: "ОЦЕНКА ЕЖЕГОДНЫХ ПОТЕРЬ",
                back_btn: "Назад",
                calculating: "Анализ данных...",
                zones: {
                    green: {
                        title: "Крепость",
                        desc: "Элитный уровень. Ваши процессы герметичны, маржа защищена. Вы готовы к безопасному масштабированию.",
                    },
                    yellow: {
                        title: "Протекающая Труба",
                        desc: "Тихая эрозия капитала. Ваш рост финансирует вашу неэффективность. Вы теряете деньги на трении процессов.",
                    },
                    red: {
                        title: "Кровотечение",
                        desc: "Критическая уязвимость. Вы дарите рынку огромные суммы ежедневно. Требуется немедленное вмешательство.",
                    },
                },
            },
            questions: [
                {
                    id: 1,
                    text: "Как быстро клиенты оплачивают ваши счета?",
                    options: [
                        { text: "В срок, напоминания уходят автоматически", penalty: 0 },
                        { text: "По-разному, догоняем вручную", penalty: 1.5 },
                        { text: "Просрочка — норма, за неё никто не отвечает", penalty: 5.0 },
                    ],
                },
                {
                    id: 2,
                    text: "Можете ли вы за 1 минуту назвать 10 крупнейших статей расходов за прошлый месяц?",
                    options: [
                        { text: "Да, данные доступны в 1 клик", penalty: 0 },
                        { text: "Примерно, но нужно уточнять", penalty: 1.0 },
                        { text: "Нет, вижу только общие цифры P&L", penalty: 5.0 },
                    ],
                },
                {
                    id: 3,
                    text: "Может ли руководитель департамента оплатить счет на $2,000 без предварительного утверждения?",
                    options: [
                        { text: "Нет, система блокирует такие оплаты", penalty: 0 },
                        { text: "Да, если это в рамках бюджета", penalty: 1.5 },
                        { text: "Да, строгих лимитов нет / оформляем задним числом", penalty: 6.0 },
                    ],
                },
                {
                    id: 4,
                    text: "Когда вы последний раз пересматривали софт и подписки, за которые платите?",
                    options: [
                        { text: "Менее 6-9 месяцев назад", penalty: 0 },
                        { text: "Около года назад", penalty: 1.0 },
                        { text: "Более 2 лет назад / Никогда", penalty: 4.0 },
                    ],
                },
                {
                    id: 5,
                    text: "Во скольких инструментах команда ведёт одну и ту же работу?",
                    options: [
                        { text: "В одной общей системе", penalty: 0 },
                        { text: "В нескольких, данные переносятся вручную", penalty: 3.0 },
                    ],
                },
                {
                    id: 6,
                    text: "Где хранятся ваши контракты и сроки их автопродления?",
                    options: [
                        { text: "В цифровой системе с напоминаниями", penalty: 0 },
                        { text: "В папках на сервере / Google Drive", penalty: 1.0 },
                        { text: "В почте, у юристов или в бумаге", penalty: 4.0 },
                    ],
                },
                {
                    id: 7,
                    text: "Как отслеживается передача работы между отделами?",
                    options: [
                        { text: "В общей системе, у каждого шага есть ответственный", penalty: 0 },
                        { text: "В чатах и по памяти", penalty: 1.0 },
                        { text: "Никак — задачи теряются", penalty: 4.0 },
                    ],
                },
                {
                    id: 8,
                    text: "Как данные попадают из одной системы в другую?",
                    options: [
                        { text: "Автоматически (интеграции)", penalty: 0 },
                        { text: "Ручной перенабор сотрудником", penalty: 3.0 },
                    ],
                },
                {
                    id: 9,
                    text: "Как часто задачи становятся срочными («нужно вчера»)?",
                    options: [
                        { text: "Крайне редко (<5%)", penalty: 0 },
                        { text: "Регулярно", penalty: 3.0 },
                    ],
                },
                {
                    id: 10,
                    text: "Если ключевой сотрудник выпадет на две недели, его работа продолжится?",
                    options: [
                        { text: "Да, всё описано, есть замена", penalty: 0 },
                        { text: "Кто-то справится, но ничего не записано", penalty: 0.5 },
                        { text: "Нет, всё встанет", penalty: 3.0 },
                    ],
                },
            ],
        },
    },
};

export type Lang = "en" | "ru";
export type Question = typeof efficiencyData.content.en.questions[0];
export type Option = Question["options"][0];
