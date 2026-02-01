"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aiIndexData, Lang, Context } from "@/lib/aiIndexData";
import { generateAiPdf } from "@/lib/generateAiPdf";
import { ArrowLeft, Check, Globe, ArrowRight, Loader2, Download, Zap, RefreshCw, Moon, Sun, User, Users } from "lucide-react";
import Link from "next/link";
import { useForm } from "@formspree/react";

export default function AiVelocityClient() {
    const [lang, setLang] = useState<Lang>("ru");
    const [context, setContext] = useState<Context>("self");
    const [hasStarted, setHasStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [isFinished, setIsFinished] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [formState, handleSubmit] = useForm("xzddelvr");

    useEffect(() => {
        // Sync dark mode class
        const html = document.documentElement;
        if (isDarkMode) {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    }, [isDarkMode]);

    const t = aiIndexData.translations[lang];
    const questions = aiIndexData.questions;
    const currentQuestion = questions[currentQuestionIndex];
    const baseScore = aiIndexData.config.baseScore;

    // Calculate Score
    const score = useMemo(() => {
        const totalPenalty = Object.values(answers).reduce((acc, val) => acc + val, 0);
        return Math.max(0, baseScore - totalPenalty);
    }, [answers, baseScore]);

    // Determine Zone
    const zoneKey = useMemo(() => {
        const z = aiIndexData.config.zones;
        if (score >= z.green.min) return "green";
        if (score >= z.yellow.min) return "yellow";
        return "red";
    }, [score]);

    const zoneData = t.zones[zoneKey];

    // Health Bar Color Logic
    const healthColor = useMemo(() => {
        const z = aiIndexData.config.zones;
        if (score >= z.green.min) return "bg-emerald-500 shadow-emerald-500/50";
        if (score >= z.yellow.min) return "bg-amber-500 shadow-amber-500/50";
        return "bg-red-500 shadow-red-500/50";
    }, [score]);

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

    const handleRestart = () => {
        setHasStarted(false);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setIsFinished(false);
        setIsModalOpen(false);
    };

    // Effect for PDF download after form submission
    useEffect(() => {
        if (formState.succeeded && isModalOpen) {
            console.log("Form submitted successfully. Generating PDF...");
            generateAiPdf(score, zoneKey, lang, context, email)
                .then(() => {
                    console.log("PDF Generated.");
                    setTimeout(() => setIsModalOpen(false), 2000);
                })
                .catch(err => console.error("PDF Fail:", err));
        }
    }, [formState.succeeded, isModalOpen, score, zoneKey, lang, context, email]);

    // Zone Colors Helper
    const zoneColors = useMemo(() => {
        return {
            green: { text: "text-emerald-500", border: "border-emerald-500", bg: "bg-emerald-500" },
            yellow: { text: "text-amber-500", border: "border-amber-500", bg: "bg-amber-500" },
            red: { text: "text-red-500", border: "border-red-500", bg: "bg-red-500" }
        }[zoneKey];
    }, [zoneKey]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-mono text-slate-900 dark:text-gray-100 transition-colors selection:bg-emerald-500/30">

            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="font-bold text-lg dark:text-white flex items-center gap-2 group">
                        <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:-translate-x-1 transition-transform" />
                        <span className="tracking-widest">SAFAR ISAEV</span>
                    </Link>

                    {/* Progress Bar (Only visible when started) */}
                    {hasStarted && !isFinished && (
                        <div className="flex-1 max-w-md mx-4 hidden md:block">
                            <div className="flex justify-between text-xs font-bold mb-1 text-slate-400">
                                <span>PROGRESS</span>
                                <span>{currentQuestionIndex + 1} / {questions.length}</span>
                            </div>
                            <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-300"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-3">
                        {/* Context Switcher (Only on Home) */}
                        {!hasStarted && (
                            <div className="hidden md:flex bg-slate-100 dark:bg-slate-900 rounded-lg p-1 border border-slate-200 dark:border-slate-800">
                                <button
                                    onClick={() => setContext('self')}
                                    className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-2 transition-all ${context === 'self' ? 'bg-white dark:bg-emerald-500 shadow text-black' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                                >
                                    <User className="w-3 h-3" /> {lang === 'en' ? 'ME' : 'Я'}
                                </button>
                                <button
                                    onClick={() => setContext('team')}
                                    className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-2 transition-all ${context === 'team' ? 'bg-white dark:bg-emerald-500 shadow text-black' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                                >
                                    <Users className="w-3 h-3" /> {lang === 'en' ? 'TEAM' : 'КОМАНДА'}
                                </button>
                            </div>
                        )}

                        <button
                            onClick={() => setLang(l => l === 'en' ? 'ru' : 'en')}
                            className="bg-slate-100 dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-colors"
                        >
                            <span className="text-xs font-bold uppercase w-6 block text-center">{lang}</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Progress Bar */}
                {hasStarted && !isFinished && (
                    <div className="md:hidden h-1 bg-slate-200 dark:bg-slate-800 w-full fixed top-16 left-0 z-30">
                        <motion.div
                            className="h-full bg-emerald-500 transition-all duration-300"
                            animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                        />
                    </div>
                )}
            </header>

            <main className="pt-24 pb-12 px-4 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">

                {/* Background Grid & Glow */}
                <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-500 opacity-20 blur-[100px]"></div>
                </div>

                <div className="w-full max-w-3xl z-10 relative">
                    <AnimatePresence mode="wait">
                        {!hasStarted ? (
                            // INTRO
                            <motion.div
                                key="intro"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center space-y-8"
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold tracking-[0.2em] uppercase glow-text">
                                    <Zap className="w-4 h-4" /> VELOCITY INDEX 2.0
                                </div>
                                <h1 className="text-4xl md:text-7xl font-bold dark:text-white leading-tight tracking-tight">
                                    {t.title}
                                </h1>
                                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                                    {t.subtitle}
                                </p>

                                {/* Mobile Context Toggle */}
                                <div className="flex md:hidden justify-center gap-4">
                                    <button
                                        onClick={() => setContext('self')}
                                        className={`px-4 py-2 rounded-lg border text-sm font-bold transition-all ${context === 'self' ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-slate-700 text-slate-400'}`}
                                    >
                                        {t.toggles.self}
                                    </button>
                                    <button
                                        onClick={() => setContext('team')}
                                        className={`px-4 py-2 rounded-lg border text-sm font-bold transition-all ${context === 'team' ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-slate-700 text-slate-400'}`}
                                    >
                                        {t.toggles.team}
                                    </button>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setHasStarted(true)}
                                    className="group relative px-8 py-5 bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-bold text-xl rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all flex items-center gap-3 mx-auto"
                                >
                                    START ASSESSMENT <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </motion.div>
                        ) : !isFinished ? (
                            // QUIZ
                            <motion.div
                                key={currentQuestion.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="w-full"
                            >
                                <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4">
                                    {lang === 'ru' ? 'ВОПРОС' : 'QUESTION'} {currentQuestionIndex + 1} / {questions.length} • {currentQuestion.category[lang]}
                                </div>
                                <h2 className="text-2xl md:text-4xl font-bold mb-8 leading-snug dark:text-white">
                                    {context === 'self' ? currentQuestion.text.self[lang] : currentQuestion.text.team[lang]}
                                </h2>

                                <div className="grid gap-4">
                                    {currentQuestion.options.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleAnswer(opt.penalty)}
                                            className="w-full text-left p-6 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-6 h-6 rounded border border-slate-400 dark:border-slate-600 group-hover:border-emerald-500 flex items-center justify-center flex-shrink-0 transition-colors">
                                                    <div className="w-3 h-3 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                <span className="text-lg text-slate-700 dark:text-slate-300 group-hover:text-black dark:group-hover:text-white transition-colors">{opt.label[lang]}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-8 flex justify-start">
                                    {currentQuestionIndex > 0 && (
                                        <button
                                            onClick={handleBack}
                                            className="text-slate-400 hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors"
                                        >
                                            <ArrowLeft className="w-4 h-4" /> {lang === 'ru' ? 'Назад' : 'Back'}
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            // RESULT
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center w-full max-w-2xl mx-auto"
                            >
                                {/* Radial Gauge Result */}
                                <div className="relative w-72 h-72 mx-auto mb-8 flex items-center justify-center">
                                    {/* Outer Ring */}
                                    <div className="absolute inset-0 rounded-full border-4 border-slate-800 border-t-emerald-500/20 rotate-45" />

                                    {/* Score Circle */}
                                    <div className={`w-64 h-64 rounded-full border-8 bg-slate-900 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden ${zoneColors.border}`}
                                    >
                                        <div className="text-7xl font-bold text-white relative z-10">{score}</div>
                                        <div className="text-sm text-slate-400 uppercase tracking-widest mt-2 relative z-10">VELOCITY</div>

                                        {/* Glow Behind */}
                                        <div className={`absolute inset-0 opacity-20 blur-xl ${zoneColors.bg}`} />
                                    </div>
                                </div>

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${zoneColors.text}`}>
                                        {zoneData.title}
                                    </h2>
                                    <p className="text-lg text-slate-400 italic mb-8 max-w-lg mx-auto">
                                        {zoneData.slogan}
                                    </p>

                                    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 mb-8 text-left relative overflow-hidden">
                                        <div className={`absolute top-0 left-0 w-1 h-full ${zoneColors.bg}`} />
                                        <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                                            {zoneData.desc}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="w-full px-8 py-5 bg-white text-black font-bold text-lg rounded-xl shadow-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-3"
                                        >
                                            <Download className="w-5 h-5" /> {t.cta}
                                        </button>

                                        <button
                                            onClick={handleRestart}
                                            className="w-full px-8 py-4 bg-transparent border border-slate-700 text-slate-500 hover:text-white hover:border-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                                        >
                                            <RefreshCw className="w-4 h-4" /> RESTART
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-slate-900 w-full max-w-md p-8 rounded-2xl shadow-2xl border border-slate-700 relative"
                        >
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white">✕</button>

                            {formState.succeeded ? (
                                <div className="text-center py-8">
                                    <div className="w-20 h-20 bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
                                        <Check className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 text-white">Success!</h3>
                                    <p className="text-slate-400 mb-6">Your report is ready.</p>

                                    <button
                                        onClick={() => generateAiPdf(score, zoneKey, lang, context, email)}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-colors shadow-lg"
                                    >
                                        <Download className="w-5 h-5" /> Download Report
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="text-center">
                                        <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 mb-4">
                                            <Download className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{t.cta}</h3>
                                        <p className="text-sm text-slate-400">Enter your email to receive the detailed strategy and roadmap.</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full p-4 rounded-xl bg-black/50 border border-slate-700 focus:border-emerald-500 outline-none text-white transition-colors"
                                            placeholder="name@company.com"
                                        />
                                    </div>
                                    {/* Hidden Fields for Formspree */}
                                    <input type="hidden" name="score" value={score} />
                                    <input type="hidden" name="zone" value={zoneKey} />
                                    <input type="hidden" name="context" value={context} />

                                    <button
                                        type="submit"
                                        disabled={formState.submitting}
                                        className="w-full py-4 bg-emerald-500 text-black font-bold text-lg rounded-xl hover:bg-emerald-400 transition-colors disabled:opacity-50 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                                    >
                                        {formState.submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "Download PDF Now"}
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
