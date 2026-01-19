"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aiIndexData, Lang } from "@/lib/aiIndexData";
import { generateAiPdf } from "@/lib/generateAiPdf";
import { ArrowLeft, Check, Clock, Globe, ArrowRight, Loader2, Download, Zap } from "lucide-react";
import Link from "next/link";
import { useForm } from "@formspree/react";

export default function AiVelocityClient() {
    const [lang, setLang] = useState<Lang>("ru");
    const [context, setContext] = useState<"myself" | "team">("myself");
    const [hasStarted, setHasStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [isFinished, setIsFinished] = useState(false);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [formState, handleSubmit] = useForm("xzddelvr"); // Reusing same formspree ID

    const t = aiIndexData.content[lang].text;
    const questions = aiIndexData.content[lang].questions;
    const currentQuestion = questions[currentQuestionIndex];
    const { start_score, thresholds } = aiIndexData.meta;

    // Calculate Score
    const score = useMemo(() => {
        const totalPenalty = Object.values(answers).reduce((acc, val) => acc + val, 0);
        return Math.max(0, start_score - totalPenalty);
    }, [answers]);

    // Determine Zone
    const zoneKey = useMemo(() => {
        if (score >= thresholds.architect) return "architect";
        if (score >= thresholds.executive) return "executive";
        return "legacy";
    }, [score]);

    const zoneData = t.zones[zoneKey];

    // Handlers
    const handleAnswer = (penalty: number) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: penalty }));

        if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => setCurrentQuestionIndex(prev => prev + 1), 300);
        } else {
            setTimeout(() => setIsFinished(true), 300);
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            // Remove previous answer
            setAnswers(prev => {
                const newAnswers = { ...prev };
                delete newAnswers[questions[currentQuestionIndex - 1].id];
                return newAnswers;
            });
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handlePdfDownload = async (e: React.FormEvent) => {
        e.preventDefault();
        // We will trigger handleSubmit programmatically or wrapping the form
        // But since we use useForm hook, we attach it to the form tag.
        // We need to pass data to PDF after success.

        // This function is just to open modal, actual submit is inside modal form
    };

    // Effect for PDF download after form submission
    if (formState.succeeded && isModalOpen) {
        // Trigger PDF and close
        generateAiPdf(score, zoneKey, lang).then(() => {
            setTimeout(() => setIsModalOpen(false), 2000);
        });
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black font-mono text-slate-900 dark:text-gray-100 transition-colors">
            {/* Header */}
            <header className="p-6 flex justify-between items-center max-w-7xl mx-auto">
                <Link href="/" className="font-bold text-2xl dark:text-white flex items-center gap-2">
                    <ArrowLeft className="w-5 h-5 text-slate-400" />
                    SAFAR<span className="text-slate-400">ISAEV</span>
                </Link>
                <button
                    onClick={() => setLang(l => l === 'en' ? 'ru' : 'en')}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50"
                >
                    <Globe className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase">{lang}</span>
                </button>
            </header>

            <main className="max-w-4xl mx-auto p-6 md:p-12 min-h-[600px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    {!hasStarted ? (
                        // INTRO
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-center md:text-left space-y-8"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded text-xs font-bold tracking-[0.2em] uppercase">
                                <Zap className="w-4 h-4" /> VELOCITY INDEX
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold dark:text-white leading-tight">
                                {t.title}
                            </h1>
                            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl">
                                {t.subtitle}
                            </p>

                            {/* Context Toggle */}
                            <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-1 rounded-lg border border-slate-200 dark:border-zinc-800 w-fit">
                                <button
                                    onClick={() => setContext("myself")}
                                    className={`px-6 py-2 rounded-md text-sm font-bold transition-colors ${context === 'myself' ? 'bg-slate-900 dark:bg-white text-white dark:text-black' : 'hover:bg-slate-100 dark:hover:bg-zinc-800'}`}
                                >
                                    {t.context_toggle.myself}
                                </button>
                                <button
                                    onClick={() => setContext("team")}
                                    className={`px-6 py-2 rounded-md text-sm font-bold transition-colors ${context === 'team' ? 'bg-slate-900 dark:bg-white text-white dark:text-black' : 'hover:bg-slate-100 dark:hover:bg-zinc-800'}`}
                                >
                                    {t.context_toggle.team}
                                </button>
                            </div>

                            <button
                                onClick={() => setHasStarted(true)}
                                className="group px-8 py-4 bg-slate-900 dark:bg-emerald-500 text-white dark:text-black font-bold text-lg rounded-lg shadow-lg hover:opacity-90 transition-all flex items-center gap-2"
                            >
                                START ASSESSMENT <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    ) : !isFinished ? (
                        // QUIZ
                        <motion.div
                            key="quiz"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full max-w-2xl mx-auto"
                        >
                            {/* Progress Bar */}
                            <div className="w-full h-1 bg-slate-200 dark:bg-zinc-800 rounded-full mb-8 overflow-hidden">
                                <motion.div
                                    className="h-full bg-slate-900 dark:bg-emerald-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
                                />
                            </div>

                            {/* Question */}
                            <div className="mb-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                QUESTION {currentQuestion.id} / {questions.length}
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-snug">
                                {context === 'myself' ? currentQuestion.text_myself : currentQuestion.text_team}
                            </h2>

                            <div className="space-y-4">
                                {currentQuestion.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleAnswer(opt.penalty)}
                                        className="w-full text-left p-6 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-slate-900 dark:hover:border-emerald-500 transition-all group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-6 h-6 rounded-full border-2 border-slate-300 dark:border-zinc-700 group-hover:border-emerald-500 flex items-center justify-center">
                                                <div className="w-3 h-3 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <span className="text-lg">{opt.text}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {currentQuestionIndex > 0 && (
                                <button
                                    onClick={handleBack}
                                    className="mt-8 text-sm font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" /> BACK
                                </button>
                            )}
                        </motion.div>
                    ) : (
                        // RESULT
                        <motion.div
                            key="result"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center max-w-3xl mx-auto"
                        >
                            <h2 className="text-2xl font-bold mb-8">{t.results.title}</h2>

                            {/* Gauge Visualization */}
                            <div className="relative w-64 h-64 mx-auto mb-8 flex items-center justify-center rounded-full border-8 border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl">
                                <div className="absolute inset-0 rounded-full border-8 border-transparent"
                                    style={{
                                        background: `conic-gradient(${zoneKey === 'hero' ? '#10b981' : zoneKey === 'executive' ? '#d97706' : '#e11d48'} ${score}%, transparent 0)`
                                    }}
                                />
                                <div className="text-center z-10">
                                    <div className={`text-6xl font-bold ${zoneData.color}`}>{score}%</div>
                                    <div className="text-xs text-slate-400 mt-2 uppercase tracking-widest px-4">{zoneData.badge}</div>
                                </div>
                            </div>

                            <div className={`inline-block px-4 py-2 rounded mb-4 ${zoneData.bg} text-white font-bold tracking-wider`}>
                                {zoneData.title}
                            </div>
                            <p className="text-lg text-slate-600 dark:text-zinc-400 mb-12">
                                {zoneData.desc}
                            </p>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full md:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-lg shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                            >
                                <Download className="w-5 h-5" /> {t.results.download_btn}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-zinc-900 w-full max-w-md p-8 rounded-2xl shadow-2xl border border-slate-200 dark:border-zinc-800 relative"
                        >
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-black dark:hover:text-white">✕</button>

                            {formState.succeeded ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                                        <Check className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Success!</h3>
                                    <p className="text-slate-500">Downloading PDF...</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <h3 className="text-xl font-bold text-center">{t.cta}</h3>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full p-3 rounded-lg bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 focus:border-emerald-500 outline-none"
                                            placeholder="you@company.com"
                                        />
                                    </div>
                                    {/* Hidden Fields */}
                                    <input type="hidden" name="score" value={score} />
                                    <input type="hidden" name="zone" value={zoneKey} />

                                    <button
                                        type="submit"
                                        disabled={formState.submitting}
                                        className="w-full py-4 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
                                    >
                                        {formState.submitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : t.results.download_btn}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
