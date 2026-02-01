"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { GlitchText } from "@/components/GlitchText";
import { GridBackground } from "@/components/GridBackground";
import { ScanningLine } from "@/components/ScanningLine";
import { type Locale } from "@/lib/i18n";

export default function ProtocolsClient() {
    const [locale, setLocale] = useState<Locale>("en");

    const toggleLocale = () => {
        setLocale(locale === "en" ? "ru" : "en");
    };

    const content = {
        en: {
            title: "SYSTEM PROTOCOLS",
            backLink: "< BACK TO TERMINAL",
            specs: {
                title: "DELIVERABLES",
                items: [
                    "Process mapping & bottleneck analysis",
                    "SOP documentation & standardization",
                    "Org structure optimization",
                    "Workflow automation design",
                    "Compliance framework setup",
                    "Performance metrics definition",
                ],
            },
            value: {
                title: "WHY THIS FIXES THE CHAOS",
                description:
                    "Unclear processes create friction. Every handoff becomes a bottleneck. Employees waste time on 'how do I do this?' instead of execution.",
                points: [
                    "Eliminates decision paralysis at every step",
                    "Reduces onboarding time by 60%",
                    "Creates predictable, scalable operations",
                    "Enables remote team coordination",
                    "Turns tribal knowledge into documented systems",
                ],
            },
            cta: "BOOK THIS MODULE",
        },
        ru: {
            title: "СИСТЕМНЫЕ ПРОТОКОЛЫ",
            backLink: "< НАЗАД К ТЕРМИНАЛУ",
            specs: {
                title: "РЕЗУЛЬТАТЫ",
                items: [
                    "Картирование процессов и анализ узких мест",
                    "Документирование и стандартизация SOP",
                    "Оптимизация организационной структуры",
                    "Проектирование автоматизации рабочих процессов",
                    "Настройка системы соответствия требованиям",
                    "Определение метрик производительности",
                ],
            },
            value: {
                title: "ПОЧЕМУ ЭТО ИСПРАВЛЯЕТ ХАОС",
                description:
                    "Неясные процессы создают трение. Каждая передача становится узким местом. Сотрудники тратят время на 'как это сделать?' вместо выполнения.",
                points: [
                    "Устраняет паралич решений на каждом шаге",
                    "Сокращает время адаптации на 60%",
                    "Создает предсказуемые, масштабируемые операции",
                    "Обеспечивает координацию удаленных команд",
                    "Превращает внутренние знания в документированные системы",
                ],
            },
            cta: "ЗАБРОНИРОВАТЬ МОДУЛЬ",
        },
    };

    const pageContent = content[locale];

    return (
        <main className="relative min-h-screen overflow-x-hidden">
            <GridBackground />
            <ScanningLine />

            {/* Header */}
            <header className="sticky top-0 z-30 border-b border-secondary/20 bg-background/80 backdrop-blur-md">
                <div className="container mx-auto flex items-center justify-between px-6 py-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm text-secondary transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        {pageContent.backLink}
                    </Link>
                    <button
                        onClick={toggleLocale}
                        className="font-mono text-sm text-secondary transition-colors hover:text-foreground"
                    >
                        <GlitchText className="text-accent">
                            {locale.toUpperCase()}
                        </GlitchText>
                    </button>
                </div>
            </header>

            {/* Content */}
            <section className="relative z-10 py-12">
                <div className="container mx-auto px-6">
                    {/* Title */}
                    <motion.div
                        className="mb-12 flex items-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Cpu className="h-12 w-12 text-accent" />
                        <h1 className="text-5xl font-bold text-foreground md:text-7xl">
                            <GlitchText>{pageContent.title}</GlitchText>
                        </h1>
                    </motion.div>

                    {/* Two Column Layout */}
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Left: Technical Specs */}
                        <motion.div
                            className="border border-secondary/20 bg-background p-6 font-mono"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <h2 className="mb-4 text-lg font-semibold text-accent">
                                {pageContent.specs.title}
                            </h2>
                            <ul className="space-y-3 text-sm text-secondary">
                                {pageContent.specs.items.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="text-accent">{">"}</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Right: Value Proposition */}
                        <motion.div
                            className="border border-secondary/20 bg-background p-6"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            <h2 className="mb-4 text-lg font-semibold text-foreground">
                                {pageContent.value.title}
                            </h2>
                            <p className="mb-6 text-secondary leading-relaxed">
                                {pageContent.value.description}
                            </p>
                            <ul className="space-y-3 text-sm text-secondary">
                                {pageContent.value.points.map((point, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="mt-1 text-accent">✓</span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* CTA */}
                    <motion.div
                        className="mt-12 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <a
                            href="https://cal.com/safarisaev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block border border-accent bg-accent/10 px-8 py-4 font-mono text-sm text-accent transition-all hover:bg-accent hover:text-background"
                        >
                            {pageContent.cta}
                        </a>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
