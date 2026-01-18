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
            title: "ПРОТОКОЛ: ОСТАНОВКА КРОВОТЕЧЕНИЯ",
            role: "Роль: Crisis Manager / Хирург",
            diagnosis: "Ваш бизнес в состоянии шока. Вы не управляете расходами — вы финансируете хаос. Риск переплат >25%.",
            imperatives: [
                { title: "Режим 'Cash Control Tower'", desc: "Заморозка платежей без трехсторонней сверки. Внедрение 'No PO, No Pay'." },
                { title: "Forensic Spend Audit", desc: "Экспресс-проверка топ-20 поставщиков на рыночную адекватность." },
                { title: "Централизация", desc: "Полный запрет на закупки через мессенджеры и переводы на карты." }
            ],
            pitch: { title: "ОФФЕР: Финансовая Реанимация", desc: "Я захожу как Crisis CPO на 30 дней. Мы остановим отток наличности за 4 недели." }
        },
        yellow: {
            title: "ПРОТОКОЛ: ПЕРЕСБОРКА",
            role: "Роль: System Architect / Инженер",
            diagnosis: "Вы попали в 'Ловушку Масштаба'. Процессы остались гаражными. Вы теряете деньги на операционном трении.",
            imperatives: [
                { title: "Цифровая Гигиена (P2P)", desc: "Отказ от зоопарка таблиц. Автоматизация рутины на 90%." },
                { title: "Консолидация Tail Spend", desc: "80% поставщиков создают 90% проблем. Сокращаем базу в 3 раза." },
                { title: "Фокус на TCO", desc: "Переход от выбора 'по цене' к выбору 'по стоимости владения'." }
            ],
            pitch: { title: "ОФФЕР: Трансформация Закупок", desc: "Я перестрою архитектуру снабжения. Снижение OPEX на 15% и освобождение времени." }
        },
        green: {
            title: "ПРОТОКОЛ: ЭВОЛЮЦИЯ",
            role: "Роль: Visionary / Стратег",
            diagnosis: "Вы построили Крепость. Ваш следующий уровень — превращение Supply Chain в актив, драйвящий капитализацию.",
            imperatives: [
                { title: "Predictive AI Analytics", desc: "Предиктивное управление и хеджирование рисков." },
                { title: "Supplier Innovation", desc: "Поставщики как лаборатории R&D. Эксклюзив на инновации." },
                { title: "ESG Multiplier", desc: "Прозрачная цепь поставок повышает оценку бизнеса при M&A/IPO." }
            ],
            pitch: { title: "ОФФЕР: AI-Driven Strategy", desc: "Мы строим ракету. Внедрение ИИ и альянсов для создания 'Economic Moat'." }
        }
    },
    en: {
        red: {
            title: "PROTOCOL: HEMOSTASIS",
            role: "Role: Crisis Manager / Surgeon",
            diagnosis: "Your business is in shock. You are funding chaos. Risk of overpayment >25%.",
            imperatives: [
                { title: "Cash Control Tower", desc: "Freeze payments without 3-way match. Implement 'No PO, No Pay'." },
                { title: "Forensic Spend Audit", desc: "Express audit of Top-20 suppliers for market rates." },
                { title: "Centralization", desc: "Ban on 'WhatsApp procurement' and P2P transfers." }
            ],
            pitch: { title: "OFFER: Financial Resuscitation", desc: "I enter as Crisis CPO for 30 days. We stop cash burn in 4 weeks." }
        },
        yellow: {
            title: "PROTOCOL: RE-ENGINEERING",
            role: "Role: System Architect",
            diagnosis: "Caught in the 'Scale Trap'. Business grew, processes didn't. You lose money on friction.",
            imperatives: [
                { title: "Digital Hygiene (P2P)", desc: "No more Excel chaos. Automate 90% of routine." },
                { title: "Tail Spend Consolidation", desc: "Cut supplier base by 3x via framework agreements." },
                { title: "Focus on TCO", desc: "Shift from 'Price' to 'Total Cost of Ownership'." }
            ],
            pitch: { title: "OFFER: Procurement Transformation", desc: "I rebuild your supply architecture. Reduce OPEX by 15%." }
        },
        green: {
            title: "PROTOCOL: EVOLUTION",
            role: "Role: Visionary / Strategist",
            diagnosis: "You built a Fortress. Next level: Supply Chain as a valuation driver.",
            imperatives: [
                { title: "Predictive AI Analytics", desc: "AI for demand forecasting and risk hedging." },
                { title: "Supplier Innovation", desc: "Vendors as R&D labs. First-to-market advantage." },
                { title: "ESG Multiplier", desc: "Transparent supply chain boosts M&A/IPO valuation." }
            ],
            pitch: { title: "OFFER: AI-Driven Strategy", desc: "Building the rocket. AI implementation for an Economic Moat." }
        }
    }
};
