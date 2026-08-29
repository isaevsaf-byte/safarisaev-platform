"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { GlitchText } from "@/components/GlitchText";
import { LegalFooter } from "@/components/LegalFooter";
import { usePreferences } from "@/hooks/usePreferences";
import type { Locale } from "@/lib/i18n";
import {
    projects,
    tools,
    projectImage,
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
            "Sites and tools built for founders, brands and operators. Fast, clean, no agency markup.",
        statSites: "live sites",
        statTools: "in-house tools",
        statDelivery: "typical delivery",
        statDeliveryValue: "7 days",
        workEyebrow: "— Client work",
        toolsEyebrow: "— Tools & products",
        toolsTitle: "Things I built and run myself",
        toolsSubtitle:
            "Not client work — products of my own. Each one is live and free to try.",
        open: "OPEN",
        openSite: "OPEN SITE",
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
            "Сайты и инструменты для основателей, брендов и операционных команд. Быстро, чисто, без агентской накрутки.",
        statSites: "живых сайта",
        statTools: "своих инструмента",
        statDelivery: "обычный срок",
        statDeliveryValue: "7 дней",
        workEyebrow: "— Клиентские проекты",
        toolsEyebrow: "— Инструменты и продукты",
        toolsTitle: "То, что я построил и веду сам",
        toolsSubtitle:
            "Это не клиентские работы, а собственные продукты. Каждый работает и открыт для теста.",
        open: "ОТКРЫТЬ",
        openSite: "ОТКРЫТЬ САЙТ",
        ctaEyebrow: "— Следующий проект",
        ctaTitle: "Есть идея проекта?",
        ctaSubtitle: `Сайты от ${WEBSITE_FROM_PRICE}. Быстро, чисто, без агентских наценок.`,
        ctaButton: "НАЧАТЬ РАЗГОВОР",
        ctaSecondary: "ПАКЕТЫ И ЦЕНЫ",
        themeLight: "СВЕТЛАЯ",
        themeDark: "ТЁМНАЯ",
    },
} satisfies Record<Locale, Record<string, string>>;

function ScreenshotImage({
    project,
    eager,
}: {
    project: PortfolioProject;
    eager?: boolean;
}) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    return (
        <div className="relative h-full w-full bg-secondary/5">
            {!loaded && !error && (
                <div className="absolute inset-0 animate-pulse bg-secondary/10" />
            )}
            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-secondary/10">
                    <span className="font-mono text-xs uppercase tracking-widest text-secondary/50">
                        {project.name}
                    </span>
                </div>
            )}
            {!error && (
                // eslint-disable-next-line @next/next/no-img-element -- third-party screenshot service, not a local asset next/image can optimise
                <img
                    src={projectImage(project)}
                    alt={`${project.name} — website screenshot`}
                    width={1200}
                    height={800}
                    loading={eager ? "eager" : "lazy"}
                    fetchPriority={eager ? "high" : "auto"}
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className={`h-full w-full object-cover object-top transition-[opacity,transform] duration-500 group-hover:scale-[1.03] ${
                        loaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setLoaded(true)}
                    onError={() => setError(true)}
                />
            )}
        </div>
    );
}

function CardChrome({ children }: { children: React.ReactNode }) {
    return (
        <span className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-300 group-hover:border-accent/40 group-focus-visible:border-accent/60">
            {children}
        </span>
    );
}

function ProjectCard({
    project,
    index,
    locale,
    openLabel,
    featured = false,
}: {
    project: PortfolioProject;
    index: number;
    locale: Locale;
    openLabel: string;
    featured?: boolean;
}) {
    return (
        <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3) }}
            className="group relative block overflow-hidden border border-secondary/20 bg-background transition-colors duration-300 hover:border-accent/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
            <div
                className={`relative overflow-hidden ${
                    featured ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[16/10]"
                }`}
            >
                <ScreenshotImage project={project} eager={featured} />
                <CardChrome>{null}</CardChrome>
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

                {/* Always visible — the old build hid this behind :hover, which meant no
                    touch device could ever read the description or reach the link. */}
                <p
                    className={`mt-2 font-mono text-secondary ${
                        featured ? "max-w-xl text-sm md:text-base" : "text-xs"
                    }`}
                >
                    {project.description[locale]}
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                            <span
                                key={item}
                                className="border border-secondary/25 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-secondary"
                            >
                                {item}
                            </span>
                        ))}
                        {project.year && (
                            <span className="px-1 py-0.5 font-mono text-[10px] uppercase tracking-wider text-secondary/70">
                                {project.year}
                            </span>
                        )}
                    </div>

                    <span className="flex items-center gap-1 font-mono text-xs font-bold text-accent">
                        {openLabel}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                </div>
            </div>
        </motion.a>
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.3) }}
        >
            {tool.external ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
                    {body}
                </a>
            ) : (
                <Link href={href} className={className}>
                    {body}
                </Link>
            )}
        </motion.div>
    );
}

export default function PortfolioClient() {
    const { isDarkMode, toggleTheme, locale, toggleLocale } = usePreferences("en");

    const t = content[locale];
    const featured = projects.find((p) => p.featured) ?? projects[0];
    const grid = projects.filter((p) => p.slug !== featured.slug);

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
                        <button
                            onClick={toggleTheme}
                            aria-label={isDarkMode ? "Light mode" : "Dark mode"}
                            className="rounded-full p-2 font-mono text-xs text-secondary transition-colors hover:bg-secondary/10 hover:text-foreground"
                        >
                            {isDarkMode ? t.themeLight : t.themeDark}
                        </button>

                        <button
                            onClick={toggleLocale}
                            aria-label={locale === "en" ? "Переключить на русский" : "Switch to English"}
                            className="font-mono text-sm text-secondary transition-colors hover:text-foreground"
                        >
                            <GlitchText className="text-accent">{locale.toUpperCase()}</GlitchText>
                        </button>
                    </div>
                </div>
            </header>

            {/* Heading + at-a-glance numbers */}
            <section className="relative z-10 container mx-auto px-6 pb-10 pt-16">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
                        {t.eyebrow}
                    </p>
                    <h1 className="font-mono text-3xl font-bold text-foreground md:text-5xl">
                        {t.title}
                    </h1>
                    <p className="mt-4 max-w-lg font-mono text-sm text-secondary">{t.subtitle}</p>

                    <dl className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-t border-secondary/20 pt-6">
                        {[
                            { value: String(projects.length), label: t.statSites },
                            { value: String(tools.length), label: t.statTools },
                            { value: t.statDeliveryValue, label: t.statDelivery },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <dt className="font-mono text-2xl font-bold text-foreground md:text-3xl">
                                    {stat.value}
                                </dt>
                                <dd className="mt-1 font-mono text-[10px] uppercase tracking-wider text-secondary md:text-xs">
                                    {stat.label}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </motion.div>
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
                    openLabel={t.openSite}
                    featured
                />
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {grid.map((project, i) => (
                        <ProjectCard
                            key={project.slug}
                            project={project}
                            index={i}
                            locale={locale}
                            openLabel={t.open}
                        />
                    ))}
                </div>
            </section>

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
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="container mx-auto flex flex-col items-center px-6 py-20 text-center"
                >
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
                </motion.div>
            </section>

            <LegalFooter locale={locale} />
        </main>
    );
}
