"use client";

import Link from "next/link";
import { GlitchText } from "@/components/GlitchText";
import { ArrowLeft, Brain, Cpu, Database } from "lucide-react";
import { GridBackground } from "@/components/GridBackground";
import { ScanningLine } from "@/components/ScanningLine";
import { LegalFooter } from "@/components/LegalFooter";
import { ThemeToggle, LocaleSwitch } from "@/components/HeaderControls";
import type { Locale } from "@/lib/i18n";
import { serviceChrome, services, type ServiceSlug } from "@/lib/servicesData";
import { useTheme } from "@/hooks/usePreferences";

const ICONS = { cpu: Cpu, database: Database, brain: Brain } as const;

/**
 * One layout for all three service pages.
 *
 * Also picks up the shared theme/locale preference, which these pages never had —
 * they hard-coded English and offered no theme toggle, so arriving here from the
 * home page silently reset both.
 */
export function ServicePage({ slug, locale }: { slug: ServiceSlug; locale: Locale }) {
    const { isDarkMode } = useTheme();
    const service = services[slug];
    const Icon = ICONS[service.icon];

    return (
        <main className="relative min-h-screen overflow-x-hidden">
            {isDarkMode && (
                <>
                    <GridBackground />
                    <ScanningLine />
                </>
            )}

            <header className="sticky top-0 z-30 border-b border-secondary/20 bg-background/85 backdrop-blur-md">
                <div className="container mx-auto flex items-center justify-between gap-4 px-6 py-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-mono text-xs text-secondary transition-colors hover:text-accent md:text-sm"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        {serviceChrome.backLink[locale]}
                    </Link>

                    <div className="flex items-center gap-4">
                        <ThemeToggle locale={locale} />
                        <LocaleSwitch locale={locale} />
                    </div>
                </div>
            </header>

            <section className="relative z-10 py-12 md:py-16">
                <div className="container mx-auto px-6">
                    {/* CSS entrance rather than a framer mount animation, which shipped
                        the whole heading to the browser as inline opacity:0. */}
                    <div className="saf-reveal mb-12">
                        <div className="flex items-center gap-4">
                            <Icon className="h-10 w-10 shrink-0 text-accent md:h-12 md:w-12" />
                            <h1 className="text-3xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                                <GlitchText>{service.title[locale]}</GlitchText>
                            </h1>
                        </div>
                        <p className="mt-5 max-w-2xl font-mono text-sm text-secondary md:text-base">
                            {service.summary[locale]}
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="saf-reveal-delayed border border-secondary/20 bg-background p-6 font-mono">
                            <h2 className="mb-4 text-lg font-semibold text-accent">
                                {serviceChrome.deliverables[locale]}
                            </h2>
                            <ul className="space-y-3 text-sm text-secondary">
                                {service.deliverables[locale].map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                        <span className="text-accent">{">"}</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="saf-reveal-delayed border border-secondary/20 bg-background p-6">
                            <h2 className="mb-4 text-lg font-semibold text-foreground">
                                {serviceChrome.why[locale]}
                            </h2>
                            <p className="mb-6 leading-relaxed text-secondary">
                                {service.problem[locale]}
                            </p>
                            <ul className="space-y-3 text-sm text-secondary">
                                {service.outcomes[locale].map((point) => (
                                    <li key={point} className="flex items-start gap-2">
                                        <span className="mt-1 text-accent">✓</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <a
                            href="https://cal.com/safarisaev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block border border-accent bg-accent/10 px-8 py-4 font-mono text-sm text-accent transition-all hover:bg-accent hover:text-background focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                            {serviceChrome.cta[locale]}
                        </a>
                    </div>
                </div>
            </section>

            <LegalFooter locale={locale} />
        </main>
    );
}
