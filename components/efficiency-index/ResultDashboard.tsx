"use client";

import { useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { efficiencyData } from "./data";
import { Loader2 } from "lucide-react";

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

    // Status Logic
    const getStatus = () => {
        if (score > 92) return { title: z.green.title, desc: z.green.desc, color: "text-efficiency-safe" };
        if (score >= 80) return { title: z.yellow.title, desc: z.yellow.desc, color: "text-efficiency-warning" };
        return { title: z.red.title, desc: z.red.desc, color: "text-efficiency-critical" };
    };

    const status = getStatus();

    // Handle Input Change
    const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Remove non-numeric chars for calculation
        const rawValue = e.target.value.replace(/[^0-9]/g, "");
        setRevenue(Number(rawValue).toLocaleString()); // Format display

        if (rawValue) {
            setIsCalculating(true);
            // Simulate calculation delay for effect
            setTimeout(() => {
                const val = parseInt(rawValue, 10);
                const loss = val * (wastePercentage / 100);
                setEstimatedLoss(loss);
                setIsCalculating(false);
            }, 500);
        } else {
            setEstimatedLoss(0);
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

                    <motion.a
                        href="https://cal.com/safarisaev"
                        target="_blank"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-8 block w-full py-4 bg-slate-900 dark:bg-accent text-white dark:text-black font-bold text-center rounded-lg hover:bg-slate-800 dark:hover:bg-accent/90 transition-colors uppercase tracking-widest shadow-lg"
                    >
                        {t.cta}
                    </motion.a>
                </div>
            </div>
        </motion.div>
    );
}
