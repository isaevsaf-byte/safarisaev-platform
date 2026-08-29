import type { Locale } from "@/lib/i18n";

/**
 * Single source of truth for everything shown on /portfolio.
 *
 * Localised strings live inside each entry (`{ en, ru }`) instead of two parallel
 * arrays — the old shape duplicated slug/url/featured per language and had already
 * started to drift.
 */

type Localised = Record<Locale, string>;

export interface PortfolioProject {
    slug: string;
    name: string;
    url: string;
    category: Localised;
    description: Localised;
    /** Verified from HTTP headers / markup. Leave empty rather than guessing. */
    stack: string[];
    /** Year the site went live. Fill in as you confirm each one. */
    year?: string;
    /** Optional local screenshot at /public/portfolio/<file>. Falls back to thum.io. */
    image?: string;
    featured?: boolean;
}

export interface PortfolioTool {
    slug: string;
    name: string;
    href: string;
    /** External tools open in a new tab; internal ones route inside the app. */
    external: boolean;
    /** Internal links that need the active locale segment, e.g. /en/efficiency-index */
    localisedHref?: boolean;
    category: Localised;
    description: Localised;
    status: Localised;
}

/** Public price floor. Must match getwebpage.co.uk — they are the same offer. */
export const WEBSITE_FROM_PRICE = "£500";

export const projects: PortfolioProject[] = [
    {
        slug: "silkbees",
        name: "Silk Bees",
        url: "https://silkbees.co.uk",
        category: { en: "AgriTech", ru: "АгроТех" },
        description: {
            en: "Wholesale beekeeping export from Uzbekistan to the UK",
            ru: "Оптовый экспорт продуктов пчеловодства из Узбекистана в Великобританию",
        },
        stack: ["Vercel"],
        featured: true,
    },
    {
        slug: "vedovec",
        name: "Vedovec",
        url: "https://vedovec.uz/en",
        category: { en: "Logistics", ru: "Логистика" },
        description: {
            en: "Customs broker in Uzbekistan — clearance, FEA consulting, certification",
            ru: "Таможенный брокер в Узбекистане — оформление, ВЭД-консалтинг, сертификация",
        },
        stack: ["Next.js", "RU / EN / UZ"],
    },
    {
        slug: "getwebpage",
        name: "GetWebPage",
        url: "https://getwebpage.co.uk",
        category: { en: "Web Studio", ru: "Веб-студия" },
        description: {
            en: `UK web studio — a serious site in 7 days, from ${WEBSITE_FROM_PRICE}`,
            ru: `Веб-студия в UK — рабочий сайт за 7 дней, от ${WEBSITE_FROM_PRICE}`,
        },
        stack: ["Next.js", "Vercel"],
    },
    {
        slug: "cpowatchtower",
        name: "CPO Watchtower",
        url: "https://cpo-watchtower.co.uk",
        category: { en: "Procurement", ru: "Закупки" },
        description: {
            en: "Procurement intelligence platform for CPOs",
            ru: "Платформа аналитики для директоров по закупкам",
        },
        stack: ["Next.js", "Vercel"],
    },
    {
        slug: "beautasy",
        name: "Beautasy Atelier",
        url: "https://beautasy.co.uk/atelier",
        category: { en: "Beauty", ru: "Бьюти" },
        description: {
            en: "Luxury lingerie brand and bespoke atelier",
            ru: "Люксовый бренд белья и ателье под заказ",
        },
        stack: ["Next.js", "Vercel"],
    },
    {
        slug: "bektothefuture",
        name: "Bek to the Future",
        url: "https://bektothefuture.com",
        category: { en: "Music", ru: "Музыка" },
        description: {
            en: "Tech House DJ personal brand and booking page",
            ru: "Личный бренд Tech House DJ и страница букинга",
        },
        stack: ["Vercel"],
    },
    {
        slug: "safarisaev",
        name: "Safarisaev.ai",
        url: "https://safarisaev.ai",
        category: { en: "Consulting", ru: "Консалтинг" },
        description: {
            en: "This site — consulting practice plus three live diagnostic tools",
            ru: "Этот сайт — консалтинговая практика и три живых диагностических инструмента",
        },
        stack: ["Next.js", "Vercel"],
    },
    {
        slug: "newyear2025",
        name: "New Year 2025",
        url: "https://newyear2025.tiiny.site",
        category: { en: "Event", ru: "Ивент" },
        description: {
            en: "One-page landing for a New Year event",
            ru: "Одностраничный лендинг новогоднего мероприятия",
        },
        stack: [],
    },
];

/**
 * Tools built and run in-house. These are products, not client work, so they get
 * their own section — and it gives /cellar an entry point it never had.
 */
export const tools: PortfolioTool[] = [
    {
        slug: "efficiency-index",
        name: "Efficiency Index",
        href: "/efficiency-index",
        external: false,
        localisedHref: true,
        category: { en: "Diagnostic", ru: "Диагностика" },
        description: {
            en: "Ten questions that put a number on hidden operational waste, with a PDF report",
            ru: "Десять вопросов, которые оцифровывают скрытые операционные потери, с PDF-отчётом",
        },
        status: { en: "Live", ru: "Работает" },
    },
    {
        slug: "ai-velocity-index",
        name: "AI Velocity Index",
        href: "/ai-velocity-index",
        external: false,
        localisedHref: true,
        category: { en: "Diagnostic", ru: "Диагностика" },
        description: {
            en: "Scores how far you are from User to Architect — for yourself or your team",
            ru: "Оценивает путь от «Пользователя» до «Архитектора» — для себя или команды",
        },
        status: { en: "Live", ru: "Работает" },
    },
    {
        slug: "cellar",
        name: "Cellar",
        href: "/cellar",
        external: false,
        category: { en: "AI Agent", ru: "AI-агент" },
        description: {
            en: "Fine wine sourcing desk — name a wine, get a buy/hold/wait signal from live market context",
            ru: "Стол закупок вина — называете вино, получаете сигнал buy/hold/wait по рыночному контексту",
        },
        status: { en: "Beta", ru: "Бета" },
    },
    {
        slug: "getwebpage-tool",
        name: "GetWebPage",
        href: "https://getwebpage.co.uk",
        external: true,
        category: { en: "Productised service", ru: "Продуктовая услуга" },
        description: {
            en: `Fixed-scope website packages from ${WEBSITE_FROM_PRICE}, delivered in seven days`,
            ru: `Пакеты сайтов с фиксированным объёмом от ${WEBSITE_FROM_PRICE}, срок — семь дней`,
        },
        status: { en: "Live", ru: "Работает" },
    },
];

/** Screenshot fallback for projects without a local image. */
export function screenshotUrl(url: string) {
    return `https://image.thum.io/get/width/1200/crop/800/noanimate/${url}`;
}

export function projectImage(project: PortfolioProject) {
    return project.image ? `/portfolio/${project.image}` : screenshotUrl(project.url);
}
