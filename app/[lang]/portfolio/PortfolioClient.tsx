"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { LegalFooter } from "@/components/LegalFooter";
import { ProjectScreenshot } from "@/components/portfolio/ProjectScreenshot";
import { ThemeToggle, LocaleSwitch } from "@/components/HeaderControls";
import type { Locale } from "@/lib/i18n";
import { countNoun, type CountForms } from "@/lib/plural";
import {
    projects,
    surfaceLabel,
    tools,
    WEBSITE_FROM_PRICE,
    type PortfolioProject,
    type PortfolioTool,
} from "@/lib/portfolioData";

const content = {
    en: {
        back: "SAFARISAEV.AI",
        eyebrow: "— Selected work",
        title: "Portfolio",
        subtitle:
            "Client sites and working automation. Every one designed and built end to end by one person, not specified and handed off.",
        statDelivery: "typical delivery",
        statDeliveryValue: "7 days",
        workEyebrow: "— Client work",
        botsEyebrow: "— Telegram",
        botsTitle: "Bots and mini apps",
        botsSubtitle:
            "Work that lives inside a chat instead of a browser. Neither one has a link to open: one runs a private client channel, the other runs inside a single company.",
        buildTitle: "What else a bot can take off your hands",
        buildIntro:
            "The two above sit at opposite ends: a public product with money moving through it, and an internal tool with roles and a schedule. Most requests land somewhere between them.",
        buildOutro:
            "Describe the job and I will tell you which parts are worth a bot and which parts are not. Some of them are better as a spreadsheet, and saying so costs you less than building the wrong thing.",
        toolsEyebrow: "— Proof",
        toolsTitle: "Automation I built and run myself",
        toolsSubtitle:
            "Not client work. These are the systems behind the pitch, and every one is live and free to try right now.",
        readCase: "READ CASE",
        open: "OPEN",
        ctaEyebrow: "— Next project",
        ctaTitle: "Got a project in mind?",
        ctaSubtitle: `Websites from ${WEBSITE_FROM_PRICE}. Fast, clean, no agency markup.`,
        ctaButton: "START A CONVERSATION",
        ctaSecondary: "SEE PACKAGES & PRICING",
        themeLight: "LIGHT",
        themeDark: "DARK",
    },
    ru: {
        back: "SAFARISAEV.AI",
        eyebrow: "— Избранные работы",
        title: "Работы",
        subtitle:
            "Клиентские сайты и работающая автоматизация — каждый проект сделан одним человеком целиком, а не расписан и передан.",
        statDelivery: "обычный срок",
        statDeliveryValue: "7 дней",
        workEyebrow: "— Клиентские проекты",
        botsEyebrow: "— Telegram",
        botsTitle: "Боты и мини-приложения",
        botsSubtitle:
            "Работы, которые живут внутри чата, а не в браузере. Открыть по ссылке нельзя ни ту, ни другую: одна ведёт закрытый клиентский канал, вторая работает внутри одной компании.",
        buildTitle: "Что ещё бот может снять с вас",
        buildIntro:
            "Эти два — разные полюса: публичный продукт, через который идут деньги, и внутренний инструмент с ролями и расписанием. Большинство задач попадает куда-то между ними.",
        buildOutro:
            "Опишите задачу — скажу, какую часть стоит делать ботом, а какую не стоит. Часть таких вещей честнее оставить таблицей, и сказать это дешевле, чем собрать не то.",
        toolsEyebrow: "— Доказательства",
        toolsTitle: "Автоматизация, которую я построил и веду сам",
        toolsSubtitle:
            "Это не клиентские работы. Это системы, стоящие за словами: каждая работает прямо сейчас и открыта для теста.",
        readCase: "ЧИТАТЬ КЕЙС",
        open: "ОТКРЫТЬ",
        ctaEyebrow: "— Следующий проект",
        ctaTitle: "Есть идея проекта?",
        ctaSubtitle: `Сайты от ${WEBSITE_FROM_PRICE}. Быстро, чисто, без агентских наценок.`,
        ctaButton: "НАЧАТЬ РАЗГОВОР",
        ctaSecondary: "ПАКЕТЫ И ЦЕНЫ",
        themeLight: "СВЕТЛАЯ",
        themeDark: "ТЁМНАЯ",
    },
} satisfies Record<Locale, Record<string, string>>;

/** Labels for the counters under the title. The form depends on the number. */
const COUNT_FORMS: Record<"sites" | "bots" | "tools", CountForms> = {
    sites: { en: ["live site", "live sites"], ru: ["живой сайт", "живых сайта", "живых сайтов"] },
    bots: { en: ["Telegram bot", "Telegram bots"], ru: ["Telegram-бот", "Telegram-бота", "Telegram-ботов"] },
    tools: { en: ["in-house tool", "in-house tools"], ru: ["свой инструмент", "своих инструмента", "своих инструментов"] },
};

/**
 * What a bot can be asked for.
 *
 * Written from the two that are already running rather than from a menu of things
 * that sound possible: every line here names a piece that exists in one of them.
 * Both languages sit in the same object so they cannot drift apart.
 */
const BOT_CAPABILITIES: { title: Record<Locale, string>; body: Record<Locale, string> }[] = [
    {
        title: { en: "Publishing on a schedule", ru: "Публикация по расписанию" },
        body: {
            en: "Posts land at the hour people actually read, not the hour somebody sent them in.",
            ru: "Посты выходят в час, когда их читают, а не когда их прислали.",
        },
    },
    {
        title: { en: "Moderation and roles", ru: "Модерация и роли" },
        body: {
            en: "A review queue, separate reach for owner, moderator and editor, and a log that settles who did what.",
            ru: "Очередь на проверку, разный доступ у владельца, модератора и редактора, журнал, который решает спор «кто это сделал».",
        },
    },
    {
        title: { en: "Payments and reconciliation", ru: "Оплаты и сверка" },
        body: {
            en: "Packages, a balance, duplicate receipts caught automatically, and a CSV that matches a card statement.",
            ru: "Пакеты, баланс, автоматический отлов дублей чеков и CSV, который сходится с выпиской карты.",
        },
    },
    {
        title: { en: "Requests and booking", ru: "Заявки и бронирование" },
        body: {
            en: "A form inside the chat, a conflict check before anything is accepted, and a visible status instead of a thread.",
            ru: "Форма прямо в чате, проверка накладок до приёма заявки и понятный статус вместо переписки.",
        },
    },
    {
        title: { en: "Notifications and reminders", ru: "Уведомления и напоминания" },
        body: {
            en: "A new event, a nudge before the deadline, a morning digest. Nobody has to open anything to stay current.",
            ru: "Новое событие, напоминание заранее, утренняя сводка. Чтобы быть в курсе, открывать ничего не нужно.",
        },
    },
    {
        title: { en: "Reports and exports", ru: "Отчёты и выгрузки" },
        body: {
            en: "Funnel, revenue, a weekly summary, and the raw rows on request when somebody wants to check the arithmetic.",
            ru: "Воронка, выручка, недельная сводка и сырые строки по запросу, когда кто-то хочет пересчитать сам.",
        },
    },
];

function ProjectCard({
    project,
    index,
    locale,
    caseLabel,
    featured = false,
}: {
    project: PortfolioProject;
    index: number;
    locale: Locale;
    caseLabel: string;
    featured?: boolean;
}) {
    return (
        <div className="saf-reveal" style={{ animationDelay: `${Math.min(index * 0.05, 0.25)}s` }}>
            {/* Links to the case study rather than straight off-site: the visitor
                stays here, and the live link sits on the case page. */}
            <Link
                href={`/${locale}/portfolio/${project.slug}`}
                className="group relative block overflow-hidden border border-secondary/20 bg-background transition-colors duration-300 hover:border-accent/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
                <div
                    className={`relative overflow-hidden ${
                        featured ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[16/10]"
                    }`}
                >
                    <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
                        <ProjectScreenshot project={project} eager={featured} />
                    </div>
                </div>

                <div className={featured ? "p-5 md:p-6" : "p-4"}>
                    <div className="flex items-start justify-between gap-3">
                        <h3
                            className={`font-mono font-bold text-foreground ${
                                featured ? "text-lg md:text-2xl" : "text-sm"
                            }`}
                        >
                            {project.name}
                        </h3>
                        <span className="shrink-0 border border-accent/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent md:text-xs">
                            {project.category[locale]}
                        </span>
                    </div>

                    {/* Always visible — the old build hid this behind :hover, which meant
                        no touch device could ever read it or reach the link. */}
                    <p
                        className={`mt-2 font-mono text-secondary ${
                            featured ? "max-w-xl text-sm md:text-base" : "text-xs"
                        }`}
                    >
                        {project.description[locale]}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-secondary/15 pt-3">
                        <span className="font-mono text-[10px] tracking-wider text-secondary/70">
                            {surfaceLabel(project, locale)}
                        </span>
                        <span className="flex items-center gap-1 font-mono text-xs font-bold text-accent">
                            {caseLabel}
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

function ToolCard({
    tool,
    index,
    locale,
    openLabel,
}: {
    tool: PortfolioTool;
    index: number;
    locale: Locale;
    openLabel: string;
}) {
    const body = (
        <>
            <div className="flex items-start justify-between gap-3">
                <h3 className="font-mono text-sm font-bold text-foreground">{tool.name}</h3>
                <span className="shrink-0 border border-secondary/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-secondary">
                    {tool.status[locale]}
                </span>
            </div>
            <p className="mt-2 font-mono text-xs leading-relaxed text-secondary">
                {tool.description[locale]}
            </p>
            <div className="mt-4 flex items-center justify-between gap-3">
                <span className="border border-accent/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                    {tool.category[locale]}
                </span>
                <span className="flex items-center gap-1 font-mono text-xs font-bold text-accent">
                    {openLabel}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
            </div>
        </>
    );

    const className =
        "group flex h-full flex-col border border-secondary/20 bg-background p-4 transition-colors duration-300 hover:border-accent/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

    const href = tool.localisedHref ? `/${locale}${tool.href}` : tool.href;

    return (
        <div className="saf-reveal h-full" style={{ animationDelay: `${Math.min(index * 0.05, 0.25)}s` }}>
            {tool.external ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
                    {body}
                </a>
            ) : (
                <Link href={href} className={className}>
                    {body}
                </Link>
            )}
        </div>
    );
}

export default function PortfolioClient({ locale }: { locale: Locale }) {
    const t = content[locale];
    // Bots get their own section rather than a slot in the site grid: a card with
    // no screenshot and no link to open reads as a broken site card next to real ones.
    const sites = projects.filter((p) => p.surface !== "telegram");
    const bots = projects.filter((p) => p.surface === "telegram");
    const featured = sites.find((p) => p.featured) ?? sites[0];
    const grid = sites.filter((p) => p.slug !== featured.slug);

    return (
        <main className="relative min-h-screen overflow-x-hidden">
            <header className="sticky top-0 z-30 border-b border-secondary/20 bg-background/80 backdrop-blur-md transition-colors duration-500">
                <div className="container mx-auto flex items-center justify-between px-6 py-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-mono text-sm text-secondary transition-colors hover:text-accent"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        {t.back}
                    </Link>

                    <div className="flex items-center gap-4">
                        <ThemeToggle locale={locale} />
                        <LocaleSwitch locale={locale} />
                    </div>
                </div>
            </header>

            {/* Heading + at-a-glance numbers */}
            <section className="relative z-10 container mx-auto px-6 pb-10 pt-16">
                <div className="saf-reveal">
                    <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
                        {t.eyebrow}
                    </p>
                    <h1 className="font-mono text-3xl font-bold text-foreground md:text-5xl">
                        {t.title}
                    </h1>
                    <p className="mt-4 max-w-xl font-mono text-sm text-secondary">{t.subtitle}</p>

                    <dl className="mt-8 grid max-w-xl grid-cols-2 gap-4 border-t border-secondary/20 pt-6 sm:grid-cols-4">
                        {[
                            { value: String(sites.length), label: countNoun(sites.length, COUNT_FORMS.sites, locale) },
                            { value: String(bots.length), label: countNoun(bots.length, COUNT_FORMS.bots, locale) },
                            { value: String(tools.length), label: countNoun(tools.length, COUNT_FORMS.tools, locale) },
                            { value: t.statDeliveryValue, label: t.statDelivery },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <dt className="font-mono text-2xl font-bold tabular-nums text-foreground md:text-3xl">
                                    {stat.value}
                                </dt>
                                <dd className="mt-1 font-mono text-[10px] uppercase tracking-wider text-secondary md:text-xs">
                                    {stat.label}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* Client work */}
            <section className="relative z-10 container mx-auto px-6">
                <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
                    {t.workEyebrow}
                </p>
                <ProjectCard
                    project={featured}
                    index={0}
                    locale={locale}
                    caseLabel={t.readCase}
                    featured
                />
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {grid.map((project, i) => (
                        <ProjectCard
                            key={project.slug}
                            project={project}
                            index={i}
                            locale={locale}
                            caseLabel={t.readCase}
                        />
                    ))}
                </div>
            </section>

            {/* Telegram work — no screenshot, no link, so it gets its own treatment */}
            {bots.length > 0 && (
                <section className="relative z-10 mt-20 border-t border-secondary/20">
                    <div className="container mx-auto px-6 py-16">
                        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
                            {t.botsEyebrow}
                        </p>
                        <h2 className="font-mono text-2xl font-bold text-foreground md:text-3xl">
                            {t.botsTitle}
                        </h2>
                        <p className="mt-3 max-w-xl font-mono text-sm text-secondary">
                            {t.botsSubtitle}
                        </p>

                        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                            {bots.map((project, i) => (
                                <ProjectCard
                                    key={project.slug}
                                    project={project}
                                    index={i}
                                    locale={locale}
                                    caseLabel={t.readCase}
                                />
                            ))}
                        </div>

                        <div className="mt-14 border-t border-secondary/20 pt-10">
                            <h3 className="font-mono text-lg font-bold text-foreground md:text-xl">
                                {t.buildTitle}
                            </h3>
                            <p className="mt-3 max-w-xl font-mono text-sm text-secondary">
                                {t.buildIntro}
                            </p>

                            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                                {BOT_CAPABILITIES.map((capability) => (
                                    <div
                                        key={capability.title.en}
                                        className="border-l border-accent/30 pl-4"
                                    >
                                        <p className="font-mono text-sm font-bold text-foreground">
                                            {capability.title[locale]}
                                        </p>
                                        <p className="mt-1.5 font-mono text-xs leading-relaxed text-secondary">
                                            {capability.body[locale]}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <p className="mt-10 max-w-xl border-l-2 border-secondary/25 pl-4 font-mono text-sm text-secondary">
                                {t.buildOutro}
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* Tools & products */}
            <section className="relative z-10 mt-20 border-t border-secondary/20">
                <div className="container mx-auto px-6 py-16">
                    <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
                        {t.toolsEyebrow}
                    </p>
                    <h2 className="font-mono text-2xl font-bold text-foreground md:text-3xl">
                        {t.toolsTitle}
                    </h2>
                    <p className="mt-3 max-w-lg font-mono text-sm text-secondary">
                        {t.toolsSubtitle}
                    </p>

                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {tools.map((tool, i) => (
                            <ToolCard
                                key={tool.slug}
                                tool={tool}
                                index={i}
                                locale={locale}
                                openLabel={t.open}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative z-10 border-t border-secondary/20">
                <div className="container mx-auto flex flex-col items-center px-6 py-20 text-center">
                    <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
                        {t.ctaEyebrow}
                    </p>
                    <h2 className="mb-3 font-mono text-2xl font-bold text-foreground md:text-4xl">
                        {t.ctaTitle}
                    </h2>
                    <p className="mb-8 max-w-sm font-mono text-sm text-secondary">
                        {t.ctaSubtitle}
                    </p>
                    <div className="flex flex-col items-center gap-3 sm:flex-row">
                        <a
                            href="mailto:saf@safarisaev.ai"
                            className="bg-accent px-8 py-3 font-mono text-sm font-bold text-background transition-opacity hover:opacity-80"
                        >
                            {t.ctaButton}
                        </a>
                        <a
                            href="https://getwebpage.co.uk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-secondary/40 px-8 py-3 font-mono text-sm font-bold text-secondary transition-colors hover:border-accent hover:text-accent"
                        >
                            {t.ctaSecondary}
                        </a>
                    </div>
                </div>
            </section>

            <LegalFooter locale={locale} />
        </main>
    );
}
