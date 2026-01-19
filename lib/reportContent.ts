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
            title: "ПРОТОКОЛ: ОСТАНОВКА ПОТЕРЬ",
            role: "СТАТУС: КРИТИЧЕСКАЯ УЯЗВИМОСТЬ",
            diagnosis: "Система внутреннего контроля отсутствует. Вы не управляете расходами — вы финансируете хаос. Высокий риск хищений, завышения цен и кассовых разрывов. Текущая модель управления «съедает» до 25% чистой прибыли.",
            imperatives: [
                {
                    title: "Принцип «Нет заказа — нет оплаты»",
                    desc: "Полная блокировка платежей без предварительной заявки в системе. Запрет на оплату счетов «задним числом»."
                },
                {
                    title: "Ценовой Аудит (Forensic)",
                    desc: "Экспресс-проверка ключевых поставщиков на аффилированность с сотрудниками и соответствие цен рыночным индикаторам."
                },
                {
                    title: "Ликвидация «Теневых» Закупок",
                    desc: "Полный запрет на закупки через переводы на личные карты сотрудников и устные договоренности в мессенджерах."
                }
            ],
            pitch: {
                title: "РЕШЕНИЕ: Антикризисное Управление",
                desc: "Я захожу как внешний управляющий. За 30 дней мы перекрываем каналы утечки денег и возвращаем вам физический контроль над финансовым потоком."
            }
        },
        yellow: {
            title: "ПРОТОКОЛ: СИСТЕМАТИЗАЦИЯ",
            role: "СТАТУС: БОЛЕЗНЬ РОСТА",
            diagnosis: "Вы попали в «Ловушку Масштаба». Бизнес вырос, а процессы остались на уровне стартапа. Ручное управление, ошибки в Excel и раздутый штат размывают маржинальность. Вы теряете деньги не на воровстве, а на неэффективности.",
            imperatives: [
                {
                    title: "Цифровизация Процессов",
                    desc: "Внедрение сквозного процесса (P2P): Заявка → Тендер → Договор → Оплата. Автоматизация рутины на 90%."
                },
                {
                    title: "Оптимизация Малых Закупок",
                    desc: "80% поставщиков создают лишь 20% ценности, но 90% проблем. Мы сократим базу контрагентов в 3 раза через рамочные договоры."
                },
                {
                    title: "Фокус на Совокупную Стоимость",
                    desc: "Смена приоритета с «Цены закупки» на «Стоимость владения» (Цена + Логистика + Отсрочка + Качество)."
                }
            ],
            pitch: {
                title: "РЕШЕНИЕ: Архитектура Снабжения",
                desc: "Трансформация закупок из «обслуживающего отдела» в системный департамент. Результат: снижение операционных затрат на 15% и полная прозрачность."
            }
        },
        green: {
            title: "ПРОТОКОЛ: КАПИТАЛИЗАЦИЯ",
            role: "СТАТУС: ЛИДЕР РЫНКА",
            diagnosis: "Поздравляю, вы построили «Крепость». Но «Хорошо» — враг «Великого». Ваш следующий уровень — превращение цепи поставок в стратегический актив, который увеличивает стоимость компании (Valuation) для инвесторов.",
            imperatives: [
                {
                    title: "Предиктивная Аналитика (AI)",
                    desc: "Использование ИИ для прогнозирования цен на сырье и хеджирования валютных рисков раньше конкурентов."
                },
                {
                    title: "Стратегические Альянсы",
                    desc: "Трансформация поставщиков в партнеров по инновациям (R&D). Получение эксклюзивных прав на новые продукты до выхода на рынок."
                },
                {
                    title: "Инвестиционный Мультипликатор",
                    desc: "Построение прозрачной и устойчивой архитектуры бизнеса для успешного прохождения Due Diligence (IPO / M&A)."
                }
            ],
            pitch: {
                title: "РЕШЕНИЕ: Стратегия и M&A",
                desc: "Работа в формате советника (Board Advisor). Внедрение лучших мировых практик для кратного роста оценки бизнеса и создания устойчивого конкурентного преимущества."
            }
        }
    },
    en: {
        red: {
            title: "PROTOCOL: HEMOSTASIS",
            role: "STATUS: CRITICAL VULNERABILITY",
            diagnosis: "Your internal controls are failing. You are not managing spend—you are funding chaos. High risk of fraud, inflated pricing, and cash gaps. The current model is bleeding up to 25% of net profit.",
            imperatives: [
                {
                    title: "The 'No PO, No Pay' Rule",
                    desc: "Total freeze on payments without a prior system purchase order. No retroactive approvals allowed."
                },
                {
                    title: "Forensic Audit (Top-20)",
                    desc: "Rapid audit of key suppliers for conflict of interest and market price benchmarking."
                },
                {
                    title: "Eliminate 'Shadow Spend'",
                    desc: "Zero tolerance for purchasing via personal cards or messengers. Centralization of cash flow."
                }
            ],
            pitch: {
                title: "SOLUTION: Crisis Management",
                desc: "I enter as an external Crisis CPO. In 30 days, we seal the financial leaks and return physical control of the 'Pay' button to you."
            }
        },
        yellow: {
            title: "PROTOCOL: RE-ENGINEERING",
            role: "STATUS: GROWING PAINS",
            diagnosis: "Caught in the 'Scale Trap'. Your business grew, but processes remained startup-level. Manual work, Excel errors, and friction are eroding margins. You are losing money on inefficiency, not just fraud.",
            imperatives: [
                {
                    title: "Digital Hygiene (P2P)",
                    desc: "End-to-end automation: Request → Tender → Contract → Pay. Removing 90% of manual routine."
                },
                {
                    title: "Tail Spend Consolidation",
                    desc: "80% of vendors create 90% of the headache. We cut the supplier base by 3x via framework agreements."
                },
                {
                    title: "Focus on TCO",
                    desc: "Shifting focus from 'Purchase Price' to 'Total Cost of Ownership' (Logistics, Terms, Quality, Risk)."
                }
            ],
            pitch: {
                title: "SOLUTION: Supply Chain Architecture",
                desc: "Transforming procurement from 'support function' to a profit center. Result: 15% OPEX reduction and total transparency."
            }
        },
        green: {
            title: "PROTOCOL: EVOLUTION",
            role: "STATUS: MARKET LEADER",
            diagnosis: "You have built a Fortress. But 'Good' is the enemy of 'Great'. Your next level is transforming the Supply Chain into a strategic asset that drives company Valuation for investors.",
            imperatives: [
                {
                    title: "Predictive Analytics (AI)",
                    desc: "Using AI to forecast commodity prices and hedge currency risks before competitors do."
                },
                {
                    title: "Innovation Partnerships",
                    desc: "Treating vendors as R&D partners. Securing exclusive access to innovations before market release."
                },
                {
                    title: "Valuation Multiplier",
                    desc: "Building a transparent Supply Chain architecture ready for Due Diligence (IPO / M&A)."
                }
            ],
            pitch: {
                title: "SOLUTION: Strategy & M&A",
                desc: "Acting as a Board Advisor. Implementing Global Best Practices to multiply business valuation and create an Economic Moat."
            }
        }
    }
};
