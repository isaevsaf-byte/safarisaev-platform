"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Loader2, CheckCircle } from "lucide-react";
import { useForm } from "@formspree/react";
import { useEffect } from "react";
import { generateEfficiencyReport } from "@/lib/generatePdf";
import { efficiencyData, Lang } from "./data";

interface EmailModalProps {
    isOpen: boolean;
    onClose: () => void;
    lang: Lang;
    score: number;
    revenue: string | number;
    wastePercentage: number;
    zone: "red" | "yellow" | "green";
}

export function EmailModal({ isOpen, onClose, lang, score, revenue, wastePercentage, zone }: EmailModalProps) {
    const t = efficiencyData.content[lang].text;

    // Replace "YOUR_FORMSPREE_ID" with actual ID from user
    const [state, handleSubmit] = useForm("YOUR_FORMSPREE_ID");

    useEffect(() => {
        if (state.succeeded) {
            // Generate PDF on success
            generateEfficiencyReport(score, revenue, zone, lang);

            // Auto close after 3s
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [state.succeeded, score, revenue, zone, lang, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4"
                    >
                        <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-2xl">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Success State */}
                            {state.succeeded ? (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                        <CheckCircle className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                        Success!
                                    </h3>
                                    <p className="text-slate-600 dark:text-zinc-400">
                                        Your report is downloading...
                                    </p>
                                </div>
                            ) : (
                                /* Form State */
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="text-center mb-6">
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                            {lang === "ru" ? "Получить полный отчет" : "Get Full Report"}
                                        </h2>
                                        <p className="text-sm text-slate-600 dark:text-zinc-400">
                                            {lang === "ru"
                                                ? "Введите email, чтобы скачать детальный PDF-разбор с рекомендациями."
                                                : "Enter your email to download a detailed PDF analysis with recommendations."}
                                        </p>
                                    </div>

                                    {/* Hidden Fields for Context */}
                                    <input type="hidden" name="score" value={score} />
                                    <input type="hidden" name="waste" value={wastePercentage} />
                                    <input type="hidden" name="zone" value={zone} />
                                    <input type="hidden" name="lang" value={lang} />

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-xs font-bold uppercase text-slate-500 dark:text-zinc-500 tracking-wider">
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="you@company.com"
                                            className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-zinc-700 rounded-lg p-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-accent outline-none transition-all"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={state.submitting}
                                        className="w-full mt-4 flex items-center justify-center gap-2 py-4 bg-accent text-black font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {state.submitting ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                <Download className="w-5 h-5" />
                                                <span>{lang === "ru" ? "СКАЧАТЬ PDF" : "DOWNLOAD PDF"}</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
