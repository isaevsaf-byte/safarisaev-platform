import type { Locale } from "@/lib/i18n";
import { MONITOR_PRICE, MONITOR_SETUP_PRICE, TEARDOWN_PRICE } from "@/lib/pricing";

/**
 * Paid offers that have a page, a price and a way to buy.
 *
 * The site used to advertise offers that could not be bought: the knowledge base
 * card opened a contact modal, and the AI offers existed only as a line inside a
 * downloaded PDF. An advertised offer with no purchase path costs more trust than
 * no offer at all, so everything here has all three.
 */

type Localised = Record<Locale, string>;
type LocalisedList = Record<Locale, string[]>;

export type OfferSlug = "teardown" | "monitor";

export interface Offer {
    slug: OfferSlug;
    /** Draft offers render with noindex, stay out of the sitemap and are unlinked. */
    published: boolean;
    price: string;
    priceNote: Localised;
    /** A one-off charged before the recurring one starts. Shown as the headline figure. */
    setup?: {
        price: string;
        note: Localised;
    };
    eyebrow: Localised;
    title: Localised;
    lede: Localised;
    /** What the buyer actually receives. */
    deliverables: LocalisedList;
    /** How it runs, step by step. */
    process: { title: Localised; body: Localised }[];
    forWho: LocalisedList;
    /** Stated plainly so nobody buys the wrong thing. */
    notFor: LocalisedList;
    /** A running instance a prospect can open and poke at. Beats any screenshot. */
    demo?: {
        url: string;
        label: Localised;
        note: Localised;
    };
    ctaTitle: Localised;
    ctaBody: Localised;
    ctaButton: Localised;
    /** Formspree source tag, so this offer is distinguishable in the inbox. */
    source: string;
}

export const offers: Record<OfferSlug, Offer> = {
    teardown: {
        slug: "teardown",
        published: true,
        price: TEARDOWN_PRICE,
        priceNote: {
            en: "one-off · credited in full against a build",
            ru: "разово · целиком засчитывается в счёт сборки",
        },
        eyebrow: { en: "— Paid diagnostic", ru: "— Платная диагностика" },
        title: { en: "Automation Teardown", ru: "Разбор автоматизации" },
        lede: {
            en: "Ninety minutes on a call, then a written map of every manual step in your operation: what can be automated, what it costs to do, what it saves, and the order to do it in. You keep the map whether or not you ever hire me to build any of it.",
            ru: "Полтора часа созвона, затем письменная карта каждого ручного шага в вашей операции: что автоматизируется, во сколько обойдётся, сколько сэкономит и в каком порядке делать. Карта остаётся у вас независимо от того, закажете вы сборку или нет.",
        },
        deliverables: {
            en: [
                "A written inventory of the manual work in the process we look at — who does it, how often, how long it takes.",
                "For each item: can it be automated, with what, and how much build effort it needs.",
                "An estimate of the time and money each fix returns, with the assumptions written out so you can argue with them.",
                "A priority order — what to do first, what to leave, and what is not worth automating at all.",
                "The whole thing as a PDF you can forward to a finance director without translating it first.",
            ],
            ru: [
                "Письменная опись ручной работы в разобранном процессе — кто делает, как часто, сколько занимает.",
                "По каждому пункту: автоматизируется ли, чем именно и какой объём разработки нужен.",
                "Оценка времени и денег, которые возвращает каждое исправление, с явно выписанными допущениями — чтобы с ними можно было спорить.",
                "Порядок приоритетов: что делать первым, что оставить и что автоматизировать не стоит вообще.",
                "Всё это PDF-документом, который можно переслать финансовому директору без перевода.",
            ],
        },
        process: [
            {
                title: { en: "You send the shape of it", ru: "Вы присылаете вводные" },
                body: {
                    en: "A short brief before the call: which process hurts, who touches it, and what you have already tried. No data room, no access to your systems.",
                    ru: "Короткий бриф до созвона: какой процесс болит, кто в нём участвует и что уже пробовали. Ни дата-рума, ни доступов к вашим системам.",
                },
            },
            {
                title: { en: "Ninety minutes together", ru: "Полтора часа вместе" },
                body: {
                    en: "We walk the process end to end and I ask the questions that surface the steps nobody counts — the re-typing, the chasing, the second spreadsheet.",
                    ru: "Проходим процесс от начала до конца, и я задаю вопросы, которые вытаскивают шаги, которые никто не считает: перенабор, догоняющие письма, вторая табличка.",
                },
            },
            {
                title: { en: "The map, within three working days", ru: "Карта в течение трёх рабочих дней" },
                body: {
                    en: "Written up, priced, ordered. If you then want any of it built, this fee comes off the build in full.",
                    ru: "Расписано, оценено, упорядочено. Если после этого захотите что-то собрать — стоимость разбора вычитается из сборки целиком.",
                },
            },
        ],
        forWho: {
            en: [
                "You run an operation where people still re-type things between systems.",
                "You suspect there is money leaking but cannot point at where.",
                "You have been quoted for automation and could not tell whether the number was fair.",
            ],
            ru: [
                "У вас операция, где люди до сих пор перенабирают данные между системами.",
                "Вы подозреваете утечку денег, но не можете показать пальцем куда.",
                "Вам называли цену за автоматизацию, и вы не смогли понять, справедливая ли она.",
            ],
        },
        notFor: {
            en: [
                "You want someone to build a specific thing you have already specified — go straight to a build, skip this.",
                "You need a strategy deck for a board. This produces a working document, not a presentation.",
            ],
            ru: [
                "Вам нужно собрать конкретную уже описанную вещь — идите сразу к сборке, разбор не нужен.",
                "Нужна стратегическая презентация для совета директоров. На выходе рабочий документ, а не презентация.",
            ],
        },
        ctaTitle: { en: "Book a teardown", ru: "Заказать разбор" },
        ctaBody: {
            en: "Tell me which process hurts. I reply within one working day with a time and an invoice — no call needed before that.",
            ru: "Напишите, какой процесс болит. Отвечу в течение рабочего дня временем и счётом — созвон до этого не нужен.",
        },
        ctaButton: { en: "SEND BRIEF", ru: "ОТПРАВИТЬ БРИФ" },
        source: "teardown",
    },

    monitor: {
        slug: "monitor",
        // Draft: the page is written and the board it demonstrates is labelled as a
        // sample dataset. Flip to true to publish — nothing else is outstanding.
        published: false,
        price: MONITOR_PRICE,
        priceNote: {
            en: "per month afterwards, to keep it running",
            ru: "в месяц дальше, за то что панель работает",
        },
        setup: {
            price: MONITOR_SETUP_PRICE,
            note: {
                en: "one-off setup — mapping your suppliers, buying regions and peer set",
                ru: "разовая настройка — размётка ваших поставщиков, регионов закупок и круга конкурентов",
            },
        },
        eyebrow: { en: "— Monitoring", ru: "— Мониторинг" },
        title: { en: "Supply Chain Monitor", ru: "Монитор цепочки поставок" },
        lede: {
            en: "One screen that answers the only question a procurement lead asks in the morning: what changed overnight, and does it need me today. Macro conditions, your peers, and your own supplier list — read together and given a position, with the reason attached.",
            ru: "Один экран, отвечающий на единственный утренний вопрос закупщика: что изменилось за ночь и требует ли это меня сегодня. Макро-условия, конкуренты и ваш собственный лист поставщиков — прочитаны вместе, с занятой позицией и обоснованием.",
        },
        deliverables: {
            en: [
                "Your supplier list, tagged by criticality, dependency and country, with the risks that actually apply to each.",
                "Macro conditions for the regions you buy from — inflation, policy rate, currency — read rather than just displayed.",
                "A watch on the companies you compete with, so you hear about a sector move before it reaches you.",
                "A written daily position with the drivers named and one concrete next step.",
                "A stability counter, so a quiet board reads as genuinely quiet rather than as stale data.",
            ],
            ru: [
                "Ваш лист поставщиков с тегами критичности, зависимости и страны и рисками, которые реально к каждому применимы.",
                "Макро-условия по регионам, откуда закупаете — инфляция, ставка, валюта — прочитанные, а не просто выведенные.",
                "Наблюдение за компаниями, с которыми вы конкурируете, чтобы о движении в отрасли узнать раньше, чем оно дойдёт до вас.",
                "Ежедневная письменная позиция с названными причинами и одним конкретным следующим шагом.",
                "Счётчик стабильности, чтобы спокойная панель читалась как реально спокойная, а не как зависшие данные.",
            ],
        },
        process: [
            {
                title: { en: "Setup", ru: "Настройка" },
                body: {
                    en: "We map your suppliers, your buying regions and your peer set. This is the part that takes real work and it is where the value sits.",
                    ru: "Размечаем ваших поставщиков, регионы закупок и круг конкурентов. Это та часть, где реальная работа, и именно в ней ценность.",
                },
            },
            {
                title: { en: "It runs", ru: "Он работает" },
                body: {
                    en: "The board refreshes on its own and timestamps itself, so you can always tell how old the picture is.",
                    ru: "Панель обновляется сама и ставит отметку времени, чтобы всегда было понятно, насколько картинка свежая.",
                },
            },
            {
                title: { en: "It stays yours", ru: "Он остаётся вашим" },
                body: {
                    en: "Your supplier list is your commercial information. It is not shared, not pooled and not used to build anyone else's board.",
                    ru: "Ваш лист поставщиков — ваша коммерческая информация. Он не передаётся, не объединяется с чужими и не используется для чьей-либо ещё панели.",
                },
            },
        ],
        forWho: {
            en: [
                "You buy from twenty to fifty suppliers that matter, across more than one country.",
                "Supplier risk currently lives in someone's head and a spreadsheet.",
                "Enterprise tools quoted you five figures a year and you closed the tab.",
            ],
            ru: [
                "Вы закупаете у двадцати–пятидесяти значимых поставщиков более чем в одной стране.",
                "Риски по поставщикам сейчас живут в чьей-то голове и в таблице.",
                "Энтерпрайз-инструменты назвали вам пятизначную годовую цену, и вы закрыли вкладку.",
            ],
        },
        notFor: {
            en: [
                "You need a full procurement suite with contracts, invoices and approvals. This watches risk; it does not replace your ERP.",
                "You have fewer than ten suppliers. A spreadsheet is genuinely fine at that size.",
            ],
            ru: [
                "Нужен полный закупочный комплекс с контрактами, счетами и согласованиями. Это наблюдение за риском, а не замена ERP.",
                "У вас меньше десяти поставщиков. На таком размере таблица честно справляется.",
            ],
        },
        demo: {
            url: "https://cpo-watchtower.co.uk",
            label: { en: "Open the board", ru: "Открыть панель" },
            note: {
                en: "A running instance on a sample supply base — click a supplier or a region.",
                ru: "Работающий экземпляр на демо-базе поставок — кликните поставщика или регион.",
            },
        },
        ctaTitle: { en: "Ask for a walkthrough", ru: "Запросить демонстрацию" },
        ctaBody: {
            en: "Send the rough shape of your supply base and I will show you the board running against it.",
            ru: "Пришлите общий контур вашей базы поставок, и я покажу панель, работающую на нём.",
        },
        ctaButton: { en: "REQUEST A WALKTHROUGH", ru: "ЗАПРОСИТЬ ДЕМО" },
        source: "supply-chain-monitor",
    },
};

export const publishedOffers = Object.values(offers).filter((offer) => offer.published);
