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
            diagnosis: "Система внутреннего контроля отсутствует. Вы не управляете расходами — вы финансируете хаос. Высокий риск ошибок, переплат и кассовых разрывов. Текущая модель управления «съедает» до 25% чистой прибыли.",
            imperatives: [
                {
                    title: "Принцип «Нет согласования — нет оплаты»",
                    desc: "Полная блокировка платежей без предварительного согласования в системе. Запрет на оплату счетов «задним числом»."
                },
                {
                    title: "Аудит Расходов (Топ-20)",
                    desc: "Экспресс-разбор 20 крупнейших статей расходов: кто их согласует, за что именно платим и что можно отключить уже на этой неделе."
                },
                {
                    title: "Ликвидация «Теневых» Платежей",
                    desc: "Полный запрет на оплаты через переводы на личные карты сотрудников и устные договоренности в мессенджерах."
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
                    desc: "Внедрение сквозного процесса: Заявка → Согласование → Исполнение → Отчёт. Автоматизация рутины на 90%."
                },
                {
                    title: "Консолидация Инструментов",
                    desc: "Три таблицы и два чата на одну задачу — это не система. Сводим работу в один источник правды и убираем ручной перенос данных."
                },
                {
                    title: "Фокус на Стоимость Процесса",
                    desc: "Считаем не только цену инструмента, но и часы команды, которые уходят на его обслуживание, ошибки и переделки."
                }
            ],
            pitch: {
                title: "РЕШЕНИЕ: Архитектура Процессов",
                desc: "Трансформация операций из набора ручных привычек в работающую систему. Результат: снижение операционных затрат на 15% и полная прозрачность."
            }
        },
        green: {
            title: "ПРОТОКОЛ: КАПИТАЛИЗАЦИЯ",
            role: "СТАТУС: ЛИДЕР РЫНКА",
            diagnosis: "Поздравляю, вы построили «Крепость». Но «Хорошо» — враг «Великого». Ваш следующий уровень — превращение операционной системы в стратегический актив, который увеличивает стоимость компании (Valuation) для инвесторов.",
            imperatives: [
                {
                    title: "Предиктивная Аналитика (AI)",
                    desc: "Использование ИИ для прогнозирования спроса, загрузки команды и денежного потока раньше конкурентов."
                },
                {
                    title: "Стратегические Альянсы",
                    desc: "Партнёрства, которые открывают доступ к новым продуктам и рынкам раньше конкурентов."
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
            diagnosis: "Your internal controls are failing. You are not managing costs—you are funding chaos. High risk of errors, overpayment, and cash gaps. The current model is bleeding up to 25% of net profit.",
            imperatives: [
                {
                    title: "The 'No Approval, No Pay' Rule",
                    desc: "Total freeze on payments without prior sign-off in the system. No retroactive approvals allowed."
                },
                {
                    title: "Cost Audit (Top-20)",
                    desc: "Rapid review of the 20 largest cost lines: who approves them, what exactly is being paid for, and what can be switched off this week."
                },
                {
                    title: "Eliminate 'Shadow Payments'",
                    desc: "Zero tolerance for paying via personal cards or messengers. Centralization of cash flow."
                }
            ],
            pitch: {
                title: "SOLUTION: Crisis Management",
                desc: "I step in as an external crisis manager. In 30 days, we seal the financial leaks and return physical control of the 'Pay' button to you."
            }
        },
        yellow: {
            title: "PROTOCOL: RE-ENGINEERING",
            role: "STATUS: GROWING PAINS",
            diagnosis: "Caught in the 'Scale Trap'. Your business grew, but processes remained startup-level. Manual work, Excel errors, and friction are eroding margins. You are losing money on inefficiency, not just fraud.",
            imperatives: [
                {
                    title: "Digital Hygiene",
                    desc: "End-to-end automation: Request → Approval → Delivery → Report. Removing 90% of manual routine."
                },
                {
                    title: "Tool Consolidation",
                    desc: "Three spreadsheets and two chats for one task is not a system. We move the work into one source of truth and stop the manual re-typing."
                },
                {
                    title: "Focus on Process Cost",
                    desc: "Counting not just what a tool costs, but the team hours spent feeding it, fixing its errors and redoing work."
                }
            ],
            pitch: {
                title: "SOLUTION: Process Architecture",
                desc: "Turning operations from a set of manual habits into a working system. Result: 15% OPEX reduction and total transparency."
            }
        },
        green: {
            title: "PROTOCOL: EVOLUTION",
            role: "STATUS: MARKET LEADER",
            diagnosis: "You have built a Fortress. But 'Good' is the enemy of 'Great'. Your next level is turning your operations into a strategic asset that drives company Valuation for investors.",
            imperatives: [
                {
                    title: "Predictive Analytics (AI)",
                    desc: "Using AI to forecast demand, team workload and cash flow before competitors do."
                },
                {
                    title: "Innovation Partnerships",
                    desc: "Partnerships that open new products and markets before competitors get there."
                },
                {
                    title: "Valuation Multiplier",
                    desc: "Building a transparent operating architecture ready for Due Diligence (IPO / M&A)."
                }
            ],
            pitch: {
                title: "SOLUTION: Strategy & M&A",
                desc: "Acting as a Board Advisor. Implementing Global Best Practices to multiply business valuation and create an Economic Moat."
            }
        }
    }
};
