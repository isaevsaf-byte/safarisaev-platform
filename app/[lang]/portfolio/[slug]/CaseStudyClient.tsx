"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { LegalFooter } from "@/components/LegalFooter";
import { ProjectScreenshot } from "@/components/portfolio/ProjectScreenshot";
import { ThemeToggle, LocaleSwitch } from "@/components/HeaderControls";
import type { Locale } from "@/lib/i18n";
import type { PortfolioProject } from "@/lib/portfolioData";

const copy = {
    en: {
        back: "ALL WORK",
        role: "Role",
        liveSite: "OPEN LIVE SITE",
        built: "What was built",
        spec: "Spec",
        note: "Open item",
        prev: "Previous",
        next: "Next",
        ctaTitle: "Want one of these?",
        ctaBody:
            "Same approach, your business. Direction, copy, design and build by one person, start to finish.",
        ctaPrimary: "START A CONVERSATION",
        ctaSecondary: "SEE PACKAGES & PRICING",
        themeLight: "LIGHT",
        themeDark: "DARK",
        outcome: "Outcome",
    },
    ru: {
        back: "ВСЕ РАБОТЫ",
        role: "Роль",
        liveSite: "ОТКРЫТЬ САЙТ",
        built: "Что построено",
        spec: "Спека",
        note: "Открытый пункт",
        prev: "Предыдущий",
        next: "Следующий",
        ctaTitle: "Нужен такой же?",
        ctaBody:
            "Тот же подход, ваш бизнес. Направление, тексты, дизайн и разработка — один человек от начала до конца.",
        ctaPrimary: "НАЧАТЬ РАЗГОВОР",
        ctaSecondary: "ПАКЕТЫ И ЦЕНЫ",
        themeLight: "СВЕТЛАЯ",
        themeDark: "ТЁМНАЯ",
        outcome: "Результат",
    },
} satisfies Record<Locale, Record<string, string>>;

function pad(n: number) {
    return String(n).padStart(2, "0");
}

function hostOf(url: string) {
    try {
        return new URL(url).host.replace(/^www\./, "");
    } catch {
        return url;
    }
}

function NeighbourLink({
    project,
    label,
    direction,
    locale,
}: {
    project: PortfolioProject;
    label: string;
    direction: "prev" | "next";
    locale: Locale;
}) {
    return (
        <Link
            href={`/${locale}/portfolio/${project.slug}`}
            className={`group flex flex-1 flex-col gap-2 p-6 transition-colors hover:bg-secondary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset md:p-10 ${
                direction === "next" ? "md:items-end md:text-right" : ""
            }`}
        >
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-secondary">
                {direction === "prev" && (
                    <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                )}
                {label}
                {direction === "next" && (
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                )}
            </span>
            <span className="font-mono text-xl font-bold text-foreground transition-colors group-hover:text-accent md:text-3xl">
                {project.name}
            </span>
            <span className="font-mono text-xs text-secondary">
                {project.category[locale]}
            </span>
        </Link>
    );
}

export default function CaseStudyClient({
    project,
    previous,
    next,
    position,
    total,
    locale,
}: {
    project: PortfolioProject;
    previous?: PortfolioProject;
    next?: PortfolioProject;
    position: number;
    total: number;
    locale: Locale;
}) {
    const t = copy[locale];
    const c = project.caseStudy;

    return (
        <main className="relative min-h-screen overflow-x-hidden">
            <header className="sticky top-0 z-30 border-b border-secondary/20 bg-background/85 backdrop-blur-md">
                <div className="container mx-auto flex items-center justify-between gap-4 px-6 py-4">
                    <Link
                        href={`/${locale}/portfolio`}
                        className="flex items-center gap-2 font-mono text-xs text-secondary transition-colors hover:text-accent md:text-sm"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        {t.back}
                    </Link>

                    <span className="font-mono text-xs tabular-nums text-secondary/60">
                        {pad(position)} <span className="text-secondary/30">/</span> {pad(total)}
                    </span>

                    <div className="flex items-center gap-4">
                        <ThemeToggle locale={locale} />
                        <LocaleSwitch locale={locale} />
                    </div>
                </div>
            </header>

            {/* ── Hero ─────────────────────────────────────────────── */}
            <section className="container mx-auto px-6 pb-14 pt-14 md:pt-24">
                <div className="saf-reveal relative">
                    {/* Typographic anchor: the project's place in the set. */}
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-8 right-0 select-none font-mono text-[110px] font-bold leading-none tabular-nums text-secondary/[0.07] md:-top-14 md:text-[200px]"
                    >
                        {pad(position)}
                    </span>

                    <p className="relative font-mono text-xs uppercase tracking-[0.25em] text-accent">
                        {project.category[locale]}
                    </p>

                    <h1 className="relative mt-4 max-w-4xl font-mono text-4xl font-bold leading-[1.02] tracking-tight text-foreground md:text-6xl lg:text-7xl">
                        {project.name}
                    </h1>

                    <p className="relative mt-7 max-w-2xl font-mono text-base leading-relaxed text-secondary md:text-lg">
                        {c.lede[locale]}
                    </p>

                    <div className="relative mt-9 flex flex-col gap-6 border-t border-secondary/20 pt-6 md:flex-row md:items-end md:justify-between">
                        <div className="max-w-md">
                            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary/70">
                                {t.role}
                            </p>
                            <p className="mt-2 font-mono text-sm text-foreground">
                                {c.role[locale]}
                            </p>
                        </div>

                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex shrink-0 items-center gap-2 border border-accent/50 px-6 py-3 font-mono text-xs font-bold text-accent transition-colors hover:bg-accent hover:text-background focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background md:text-sm"
                        >
                            {t.liveSite}
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                    </div>
                </div>
            </section>

            {/* ── Screenshot, framed like the browser window it is ──── */}
            <section className="container mx-auto px-6">
                <figure className="saf-reveal-delayed overflow-hidden border border-secondary/25">
                    <div className="flex items-center gap-3 border-b border-secondary/20 bg-secondary/[0.04] px-4 py-2.5">
                        <span className="flex gap-1.5" aria-hidden="true">
                            <span className="h-2 w-2 rounded-full bg-secondary/30" />
                            <span className="h-2 w-2 rounded-full bg-secondary/30" />
                            <span className="h-2 w-2 rounded-full bg-secondary/30" />
                        </span>
                        <span className="truncate font-mono text-[11px] text-secondary">
                            {hostOf(project.url)}
                        </span>
                    </div>
                    <div className="aspect-[16/10] md:aspect-[21/9]">
                        <ProjectScreenshot project={project} eager />
                    </div>
                </figure>
            </section>

            {/* ── Spec band ────────────────────────────────────────── */}
            <section className="container mx-auto px-6 pt-14">
                <h2 className="sr-only">{t.spec}</h2>
                <dl className="grid grid-cols-2 border-t border-secondary/20 md:grid-cols-4">
                    {c.facts.map((fact) => (
                        <div
                            key={fact.label.en}
                            className="border-b border-r border-secondary/15 px-4 py-5 last:border-r-0 md:border-b-0 md:px-5 md:py-6"
                        >
                            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary/70">
                                {fact.label[locale]}
                            </dt>
                            <dd className="mt-2 font-mono text-sm font-bold text-foreground md:text-base">
                                {fact.value[locale]}
                            </dd>
                        </div>
                    ))}
                </dl>
                {project.stack.length > 0 && (
                    <div className="flex flex-wrap gap-2 border-t border-secondary/20 pt-5">
                        {project.stack.map((item) => (
                            <span
                                key={item}
                                className="border border-secondary/25 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-secondary"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                )}
            </section>

            {/* ── What was built ───────────────────────────────────── */}
            <section className="container mx-auto px-6 pt-20">
                <div className="grid gap-10 md:grid-cols-[minmax(0,22ch)_minmax(0,1fr)] md:gap-16">
                    <div>
                        <h2 className="sticky top-24 font-mono text-xl font-bold tracking-tight text-foreground md:text-2xl">
                            {t.built}
                        </h2>
                    </div>

                    {/* Deliberately not animated. This list is the case study's
                        actual argument — it should never depend on JS running,
                        or on an IntersectionObserver threshold, to be readable. */}
                    <ul className="border-t border-secondary/20">
                        {c.built.map((item) => (
                            <li
                                key={item.en}
                                className="flex gap-5 border-b border-secondary/15 py-6"
                            >
                                <span
                                    aria-hidden="true"
                                    className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent"
                                />
                                <p className="font-mono text-sm leading-relaxed text-secondary md:text-[15px]">
                                    {item[locale]}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── Outcome, when there is a real one ────────────────── */}
            {(c.outcome || c.metrics?.length) && (
                <section className="container mx-auto px-6 pt-20">
                    <div className="grid gap-10 md:grid-cols-[minmax(0,22ch)_minmax(0,1fr)] md:gap-16">
                        <h2 className="font-mono text-xl font-bold tracking-tight text-foreground md:text-2xl">
                            {t.outcome}
                        </h2>
                        <div>
                            {c.metrics && c.metrics.length > 0 && (
                                <dl className="mb-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
                                    {c.metrics.map((metric) => (
                                        <div key={metric.label.en}>
                                            <dt className="font-mono text-3xl font-bold tabular-nums text-accent md:text-4xl">
                                                {metric.value}
                                            </dt>
                                            <dd className="mt-2 font-mono text-[11px] uppercase tracking-wider text-secondary">
                                                {metric.label[locale]}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            )}
                            {c.outcome && (
                                <p className="max-w-2xl font-mono text-sm leading-relaxed text-secondary md:text-[15px]">
                                    {c.outcome[locale]}
                                </p>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Client words ─────────────────────────────────────── */}
            {c.testimonial && (
                <section className="mt-20 border-y border-secondary/20 bg-secondary/[0.03]">
                    <figure className="container mx-auto px-6 py-16 md:py-20">
                        <blockquote className="max-w-3xl font-mono text-xl leading-snug text-foreground md:text-3xl md:leading-[1.35]">
                            <span aria-hidden="true" className="text-accent">
                                “
                            </span>
                            {c.testimonial.quote[locale]}
                            <span aria-hidden="true" className="text-accent">
                                ”
                            </span>
                        </blockquote>
                        <figcaption className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-secondary">
                            {c.testimonial.author[locale]}
                        </figcaption>
                    </figure>
                </section>
            )}

            {/* ── Honest open item ─────────────────────────────────── */}
            {c.note && (
                <section className="container mx-auto px-6 pt-20">
                    <div className="max-w-3xl border-l-2 border-secondary/40 py-1 pl-6">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary/70">
                            {t.note}
                        </p>
                        <p className="mt-3 font-mono text-sm leading-relaxed text-secondary">
                            {c.note[locale]}
                        </p>
                    </div>
                </section>
            )}

            {/* ── Prev / next ──────────────────────────────────────── */}
            {previous && next && (
                <nav className="mt-24 border-t border-secondary/20">
                    <div className="container mx-auto flex flex-col divide-y divide-secondary/20 px-0 md:flex-row md:divide-x md:divide-y-0">
                        <NeighbourLink
                            project={previous}
                            label={t.prev}
                            direction="prev"
                            locale={locale}
                        />
                        <NeighbourLink
                            project={next}
                            label={t.next}
                            direction="next"
                            locale={locale}
                        />
                    </div>
                </nav>
            )}

            {/* ── CTA ──────────────────────────────────────────────── */}
            <section className="border-t border-secondary/20">
                <div className="container mx-auto flex flex-col items-center px-6 py-20 text-center">
                    <h2 className="font-mono text-2xl font-bold text-foreground md:text-4xl">
                        {t.ctaTitle}
                    </h2>
                    <p className="mt-4 max-w-md font-mono text-sm text-secondary">
                        {t.ctaBody}
                    </p>
                    <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
                        <a
                            href="mailto:saf@safarisaev.ai"
                            className="bg-accent px-8 py-3 font-mono text-sm font-bold text-background transition-opacity hover:opacity-80"
                        >
                            {t.ctaPrimary}
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
