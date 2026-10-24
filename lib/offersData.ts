import type { Locale } from "@/lib/i18n";
import { TEARDOWN_PRICE } from "@/lib/pricing";
import type { LeadSource } from "@/lib/leadReply";

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

export type OfferSlug = "teardown";

export interface Offer {
    slug: OfferSlug;
    /** Draft offers render with noindex, stay out of the sitemap and are unlinked. */
    published: boolean;
    price: string;
    priceNote: Localised;
    eyebrow: Localised;
    title: Localised;
    lede: Localised;
    /** What the client actually receives. */
    deliverables: LocalisedList;
    /** How it runs, step by step. */
    process: { title: Localised; body: Localised }[];
    forWho: LocalisedList;
    /** Stated plainly so nobody buys the wrong thing. */
    notFor: LocalisedList;
    ctaTitle: Localised;
    ctaBody: Localised;
    ctaButton: Localised;
    /**
     * Tags the lead in the Formspree inbox and picks the automatic reply. Typed,
     * so a new offer cannot ship without a reply template written for it.
     */
    source: LeadSource;
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
                "A written inventory of the manual work in the process we look at: who does it, how often, how long it takes.",
                "For each item: can it be automated, with what, and how much build effort it needs.",
                "An estimate of the time and money each fix returns, with the assumptions written out so you can argue with them.",
                "A priority order: what to do first, what to leave, and what is not worth automating at all.",
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
                    en: "We walk the process end to end and I ask the questions that surface the steps nobody counts. The re-typing, the chasing, the second spreadsheet.",
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
                "You already know exactly what you want built. Go straight to a build and skip this.",
                "You need a strategy deck for a board. This produces a working document, not a presentation.",
            ],
            ru: [
                "Вам нужно собрать конкретную уже описанную вещь — идите сразу к сборке, разбор не нужен.",
                "Нужна стратегическая презентация для совета директоров. На выходе рабочий документ, а не презентация.",
            ],
        },
        ctaTitle: { en: "Book a teardown", ru: "Заказать разбор" },
        ctaBody: {
            en: "Tell me which process hurts. I reply within one working day with a time and an invoice. No call needed before that.",
            ru: "Напишите, какой процесс болит. Отвечу в течение рабочего дня временем и счётом — созвон до этого не нужен.",
        },
        ctaButton: { en: "SEND BRIEF", ru: "ОТПРАВИТЬ БРИФ" },
        source: "teardown",
    },
};

export const publishedOffers = Object.values(offers).filter((offer) => offer.published);
