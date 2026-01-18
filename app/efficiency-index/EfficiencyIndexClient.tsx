"use client";

import { useEfficiencyCalculator } from "../../hooks/useEfficiencyCalculator";
import { LiquidTank } from "../../components/efficiency-index/LiquidTank";
import { QuestionCard } from "../../components/efficiency-index/QuestionCard";
import { ResultDashboard } from "../../components/efficiency-index/ResultDashboard";
import { efficiencyData } from "../../components/efficiency-index/data";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ArrowRight, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

import { Suspense } from "react";

function EfficiencyIndexContent() {
    const {
        lang,
        setLang,
        score,
        wastePercentage,
        currentQuestion,
        currentQuestionIndex,
        totalQuestions,
        isFinished,
        handleAnswer,
        reset,
        progress,
        goBack,
    } = useEfficiencyCalculator();

    const [hasStarted, setHasStarted] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Toggle Dark Mode
    useEffect(() => {
        const html = document.documentElement;
        if (isDarkMode) {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    }, [isDarkMode]);

    const t = efficiencyData.content[lang].text;

    // Determine Tank State
    // Mode: "progress" (during quiz) | "result" (finished)
    // Level: progress % (during quiz) | score % (finished)
    const tankMode = isFinished ? "result" : "progress";

    // For progress: we want 0 -> 100. Actually, if we use progress from hook, 
    // it is 0 at start, 10 after Q1. 
    // User wants: "starts empty (0%) and fills up by 10% after each answered question."
    // So currentQuestionIndex * 10 is correct.
    const tankLevel = isFinished ? score : (currentQuestionIndex / totalQuestions) * 100;

    const tankLabel = isFinished ? t.tank_label : t.progress_label;

    return (
        <div className={`min-h-screen font-mono selection:bg-accent selection:text-black overflow-x-hidden relative transition-colors duration-500 bg-gray-50 dark:bg-black text-slate-900 dark:text-gray-100`}>

            {/* Background Grid (Cyberpunk only) */}
            <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-0 dark:opacity-20 pointer-events-none transition-opacity duration-500" />
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500" />

            {/* Header / Nav */}
            <header className="relative z-50 p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
                <Link href="/" className="font-bold tracking-tighter text-2xl md:text-3xl text-slate-900 dark:text-white transition-colors hover:opacity-80">
                    SAFAR<span className="text-slate-400 dark:text-secondary">ISAEV</span>
                </Link>

                <div className="flex items-center gap-2">
                    {/* Theme Toggle */}
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="p-2 rounded-full border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors bg-white/50 dark:bg-black/50 backdrop-blur-sm"
                    >
                        {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
                    </button>

                    {/* Lang Toggle */}
                    <button
                        onClick={() => setLang(lang === "en" ? "ru" : "en")}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors bg-white/50 dark:bg-black/50 backdrop-blur-sm"
                    >
                        <Globe className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
                        <span className="text-xs font-bold uppercase">{lang}</span>
                    </button>
                </div>
            </header>

            <main className="relative z-10 flex flex-col md:flex-row min-h-[calc(100vh-100px)] max-w-7xl mx-auto">

                {/* Left Column: Tank (Visible after start) */}
                {hasStarted && (
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full md:w-1/3 lg:w-1/4 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-zinc-900 bg-white/40 dark:bg-black/40 backdrop-blur-sm sticky top-0 md:h-[calc(100vh-100px)]"
                    >
                        <LiquidTank level={tankLevel} mode={tankMode} label={tankLabel} />

                        <div className="mt-8 text-center transition-opacity duration-500" style={{ opacity: isFinished ? 1 : 0.5 }}>
                            <div className="text-xs text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-1">
                                {isFinished ? "Current Score" : "Progress"}
                            </div>
                            <div className="text-4xl font-bold text-slate-900 dark:text-white">
                                {Math.round(tankLevel)}%
                            </div>
                            {isFinished && (
                                <div className="text-xs text-red-500 mt-2 font-bold uppercase tracking-widest">
                                    {wastePercentage > 0 ? `-${wastePercentage}% Waste Limit` : "Optimal"}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Right Column: Interaction Zone */}
                <div className={`w-full ${hasStarted ? "md:w-2/3 lg:w-3/4" : "md:w-full"} p-4 md:p-12 flex flex-col justify-center transition-[width] duration-500`}>

                    <AnimatePresence mode="wait">
                        {!hasStarted ? (
                            /* Intro Screen */
                            <motion.div
                                key="intro"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="max-w-3xl mx-auto text-center md:text-left"
                            >
                                <div className="inline-block px-3 py-1 mb-6 border border-blue-500/20 dark:border-accent/20 bg-blue-50 dark:bg-accent/10 rounded text-blue-600 dark:text-accent text-xs font-bold tracking-[0.2em] uppercase">
                                    Beta v2.0
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-slate-900 dark:bg-gradient-to-r dark:from-white dark:to-zinc-500 mb-6 leading-tight">
                                    {t.title}
                                </h1>
                                <p className="text-xl text-slate-600 dark:text-zinc-400 mb-10 max-w-xl">
                                    {t.subtitle}
                                </p>
                                <button
                                    onClick={() => setHasStarted(true)}
                                    className="group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-lg rounded overflow-hidden shadow-lg hover:shadow-xl transition-all"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        START ANALYSIS <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-accent opacity-0 dark:opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </button>
                            </motion.div>
                        ) : !isFinished ? (
                            /* Questions */
                            <motion.div
                                key="quiz"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full"
                            >
                                <QuestionCard
                                    question={currentQuestion}
                                    onAnswer={handleAnswer}
                                    onBack={goBack}
                                    lang={lang}
                                    currentIndex={currentQuestionIndex}
                                    total={totalQuestions}
                                />
                            </motion.div>
                        ) : (
                            /* Results */
                            <motion.div
                                key="result"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full"
                            >
                                <div className="mb-8 flex justify-center md:justify-start">
                                    <button
                                        onClick={reset}
                                        className="text-xs text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-white underline underline-offset-4"
                                    >
                                        RESTART ANALYSIS
                                    </button>
                                </div>
                                <ResultDashboard score={score} wastePercentage={wastePercentage} lang={lang} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </main>
        </div>
    );
}

export default function EfficiencyIndexClient() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-black text-white font-mono">
                LOADING SYSTEM...
            </div>
        }>
            <EfficiencyIndexContent />
        </Suspense>
    );
}
