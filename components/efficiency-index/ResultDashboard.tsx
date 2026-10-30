"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { efficiencyData } from "./data";
import { Download, Loader2 } from "lucide-react";
import { generateEfficiencyReport } from "@/lib/generatePdf";

interface ResultDashboardProps {
    score: number;
    wastePercentage: number;
    lang: "en" | "ru";
}

export function ResultDashboard({ score, wastePercentage, lang }: ResultDashboardProps) {
    const t = efficiencyData.content[lang].text;
    const z = t.zones;
    const [revenue, setRevenue] = useState<string>("");
    const [estimatedLoss, setEstimatedLoss] = useState<number>(0);
    const [isCalculating, setIsCalculating] = useState(false);
    const [pdfState, setPdfState] = useState<"idle" | "working" | "failed">("idle");
    const calcTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Status Logic - derive zone directly from score, not CSS strings
    const getStatus = () => {
        if (score >= 90) return { title: z.green.title, desc: z.green.desc, zone: "green" as const, color: "text-efficiency-safe" };
        if (score >= 75) return { title: z.yellow.title, desc: z.yellow.desc, zone: "yellow" as const, color: "text-efficiency-warning" };
        return { title: z.red.title, desc: z.red.desc, zone: "red" as const, color: "text-efficiency-critical" };
    };

    const status = getStatus();

    // Handle Input Change - store raw numeric value, format only for display
    const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, "");
        setRevenue(rawValue);

        // Clear previous timer to prevent stacking
        if (calcTimerRef.current) {
            clearTimeout(calcTimerRef.current);
        }

        if (rawValue) {
            setIsCalculating(true);
            calcTimerRef.current = setTimeout(() => {
                const val = parseInt(rawValue, 10);
                const loss = val * (wastePercentage / 100);
                setEstimatedLoss(loss);
                setIsCalculating(false);
            }, 500);
        } else {
            setEstimatedLoss(0);
            setIsCalculating(false);
        }
    };

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (calcTimerRef.current) {
                clearTimeout(calcTimerRef.current);
            }
        };
    }, []);

    // Format revenue for display
    const formattedRevenue = useMemo(() => {
        if (!revenue) return "";
        return Number(revenue).toLocaleString();
    }, [revenue]);

    // The report is built in the browser, so nothing about the visitor is sent anywhere.
    const handleDownload = async () => {
        setPdfState("working");
        try {
            await generateEfficiencyReport(score, revenue, status.zone, lang, wastePercentage);
            setPdfState("idle");
        } catch (err) {
            console.error("PDF download failed", err);
            setPdfState("failed");
        }
    };

    // Counting Animation for Loss
    const springValue = useSpring(0, { bounce: 0, duration: 1000 });
    const displayLoss = useTransform(springValue, (value) => Math.floor(value).toLocaleString());

    useEffect(() => {
        springValue.set(estimatedLoss);
    }, [estimatedLoss, springValue]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl mx-auto grid md:grid-cols-2 gap-8 p-6"
        >
            {/* Left Col: Analysis */}
            <div className="space-y-6">
                <div className="p-6 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-sm shadow-sm">
                    <h3 className="text-slate-500 dark:text-zinc-500 font-mono text-sm mb-2">{t.tank_label}</h3>
                    <div className={`text-4xl md:text-5xl font-bold ${status.color} mb-2`}>
                        {score}%
                    </div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                            className={`h-full ${status.color.replace("text-", "bg-")}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${score}%` }}
                            transition={{ delay: 0.5, duration: 1 }}
                        />
                    </div>
                </div>

                <div className="p-6 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-sm shadow-sm">
                    <h3 className={`text-2xl font-bold ${status.color} mb-2`}>{status.title}</h3>
                    <p className="text-slate-600 dark:text-zinc-400">{status.desc}</p>
                </div>
            </div>

            {/* Right Col: Calculator */}
            <div className="space-y-6">
                <div className="p-6 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-black/60 backdrop-blur-md shadow-xl relative overflow-hidden group">
                    {/* Cyberpunk details (Dark mode only) */}
                    <div className="hidden dark:block absolute top-0 right-0 p-2 opacity-50">
                        <div className="w-16 h-[2px] bg-zinc-700 mb-1" />
                        <div className="w-8 h-[2px] bg-zinc-700 ml-auto" />
                    </div>

                    <label className="block text-sm font-mono text-slate-400 dark:text-zinc-400 mb-2 uppercase tracking-wider">
                        {t.input_label}
                    </label>
                    <div className="relative mb-6">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-zinc-500 text-lg">$</span>
                        <input
                            type="text"
                            value={formattedRevenue}
                            onChange={handleRevenueChange}
                            placeholder="1,000,000"
                            className="w-full bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white rounded-lg py-4 pl-10 pr-4 text-xl font-mono focus:outline-none focus:border-blue-500 dark:focus:border-accent focus:ring-1 focus:ring-blue-500 dark:focus:ring-accent transition-all placeholder:text-slate-300 dark:placeholder:text-zinc-700"
                        />
                    </div>

                    <div className="border-t border-slate-200 dark:border-zinc-800 pt-6">
                        <label className="block text-xs font-bold text-red-500 mb-2 tracking-[0.2em]">
                            {t.money_lost_label}
                        </label>
                        <div className="text-3xl md:text-4xl font-mono text-slate-900 dark:text-white flex items-center gap-2 h-12">
                            {isCalculating ? (
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Loader2 className="animate-spin text-red-500" />
                                    <span className="text-sm">{t.calculating}</span>
                                </div>
                            ) : (
                                <>
                                    <span className="text-red-500">$</span>
                                    <motion.span>{displayLoss}</motion.span>
                                </>
                            )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-zinc-600 mt-2 font-mono">
                            {lang === "ru"
                                ? `На основе ${wastePercentage}% расчетных потерь`
                                : `Based on ${wastePercentage}% calculated waste`}
                        </p>
                    </div>

                    <motion.button
                        onClick={handleDownload}
                        disabled={pdfState === "working"}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-8 flex w-full items-center justify-center gap-2 py-4 bg-slate-900 dark:bg-accent text-white dark:text-black font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-accent/90 transition-colors uppercase tracking-widest shadow-lg disabled:opacity-60"
                    >
                        {pdfState === "working" ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
                        {lang === "ru" ? "Скачать PDF-отчёт" : "Download PDF Report"}
                    </motion.button>
                    {pdfState === "failed" && (
                        <p role="alert" className="mt-3 text-center text-xs text-red-500">
                            {lang === "ru" ? "PDF не собрался. Попробуйте ещё раз." : "The PDF did not build. Please try again."}
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
