"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Globe } from "lucide-react";
import { LegalFooter } from "@/components/LegalFooter";
import { legalEntity } from "@/lib/legal";
import { privacyContent } from "./content";

export default function PrivacyClient() {
    const [locale, setLocale] = useState<"en" | "ru">("en");
    const t = privacyContent[locale];

    return (
        <main className="relative min-h-screen overflow-x-hidden">
            {/* Header */}
            <header className="sticky top-0 z-30 border-b border-secondary/20 bg-background/80 backdrop-blur-md">
                <div className="container mx-auto flex items-center justify-between px-6 py-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-mono text-sm text-secondary transition-colors hover:text-accent"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        SAFARISAEV.AI
                    </Link>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setLocale(locale === "en" ? "ru" : "en")}
                            className="flex items-center gap-2 font-mono text-xs text-secondary transition-colors hover:text-accent"
                            aria-label={locale === "en" ? "Читать по-русски" : "Read in English"}
                        >
                            <Globe className="h-3.5 w-3.5" />
                            {locale === "en" ? "РУССКИЙ" : "ENGLISH"}
                        </button>
                        <span className="hidden font-mono text-xs text-accent sm:inline">
                            [PRIVACY]
                        </span>
                    </div>
                </div>
            </header>

            <section className="container mx-auto px-6 py-16 md:py-24">
                <div className="max-w-3xl">
                    <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
                        {t.eyebrow}
                    </p>
                    <h1 className="mb-6 font-mono text-3xl font-bold leading-tight text-foreground md:text-4xl">
                        {t.title}
                    </h1>
                    <p className="max-w-2xl font-mono text-sm leading-relaxed text-secondary">
                        {t.subtitle}
                    </p>

                    {/* Meta strip */}
                    <div className="mt-8 flex flex-col gap-2 border-y border-secondary/20 py-4 font-mono text-xs text-secondary sm:flex-row sm:items-center sm:gap-6">
                        <span>
                            {t.updatedLabel}:{" "}
                            <span className="text-foreground">{t.updated}</span>
                        </span>
                        <span className="hidden text-secondary/40 sm:inline">{"//"}</span>
                        <span>
                            {t.controllerLabel}:{" "}
                            <span className="text-foreground">{legalEntity.name}</span>
                        </span>
                        <span className="hidden text-secondary/40 sm:inline">{"//"}</span>
                        <Link
                            href="/legal"
                            className="text-accent transition-colors hover:text-foreground"
                        >
                            {t.legalLinkLabel}
                        </Link>
                    </div>
                </div>

                {/* Sections */}
                <div className="mt-12 max-w-3xl space-y-6">
                    {t.sections.map((section) => (
                        <section
                            key={section.heading}
                            className={
                                section.emphasis
                                    ? "border border-accent/30 bg-accent/5"
                                    : "border border-secondary/20"
                            }
                        >
                            <h2 className="border-b border-secondary/20 px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                                {section.heading}
                            </h2>
                            <div className="space-y-4 px-6 py-5">
                                {section.bullets && (
                                    <ul className="space-y-2">
                                        {section.bullets.map((item) => (
                                            <li
                                                key={item}
                                                className="flex gap-3 font-mono text-sm leading-relaxed text-foreground"
                                            >
                                                <span className="text-accent">—</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {section.body?.map((paragraph) => (
                                    <p
                                        key={paragraph}
                                        className="font-mono text-sm leading-relaxed text-secondary"
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </section>
                    ))}

                    {/* Contact */}
                    <section className="border border-secondary/20">
                        <h2 className="border-b border-secondary/20 px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                            {t.contactHeading}
                        </h2>
                        <div className="px-6 py-5">
                            <p className="font-mono text-sm leading-relaxed text-secondary">
                                {t.contactBody}
                            </p>
                            <a
                                href={`mailto:${legalEntity.email}`}
                                className="mt-3 inline-block font-mono text-sm text-accent transition-colors hover:text-foreground"
                            >
                                {legalEntity.email}
                            </a>
                        </div>
                    </section>
                </div>
            </section>

            <LegalFooter locale={locale} />
        </main>
    );
}
