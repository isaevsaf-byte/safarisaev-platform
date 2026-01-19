"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface LiquidTankProps {
    level: number; // 0 to 100
    mode: "progress" | "result";
    label: string;
}

export function LiquidTank({ level, mode, label }: LiquidTankProps) {
    // Color Logic
    const colorState = useMemo(() => {
        if (mode === "progress") return "neutral";
        if (level >= 90) return "safe";
        if (level >= 70) return "warning";
        return "critical";
    }, [level, mode]);

    const colors = {
        neutral: {
            liquid: "bg-blue-500",
            glow: "shadow-[0_0_20px_rgba(59,130,246,0.3)] dark:shadow-[0_0_20px_rgba(59,130,246,0.5)]",
            border: "border-blue-500/30",
        },
        safe: {
            liquid: "bg-efficiency-safe",
            glow: "shadow-[0_0_20px_rgba(16,185,129,0.5)]",
            border: "border-efficiency-safe/30",
        },
        warning: {
            liquid: "bg-efficiency-warning",
            glow: "shadow-[0_0_20px_rgba(245,158,11,0.5)]",
            border: "border-efficiency-warning/30",
        },
        critical: {
            liquid: "bg-efficiency-critical",
            glow: "shadow-[0_0_20px_rgba(244,63,94,0.5)]",
            border: "border-efficiency-critical/30",
        },
    };

    const currentTheme = colors[colorState];

    return (
        <div className="relative h-full w-full flex flex-col items-center justify-center p-4 pb-12 md:pb-4">
            {/* Container - Tube */}
            <div
                className={`relative w-24 h-[250px] md:w-32 md:h-[500px] rounded-full border-2 bg-white/50 dark:bg-black/40 backdrop-blur-sm overflow-hidden ${currentTheme.border} transition-colors duration-500 shadow-xl dark:shadow-none ring-1 ring-black/5 dark:ring-0`}
            >
                {/* Glass Reflection Overlay (Dark Mode Enhanced) */}
                <div className="absolute inset-0 z-20 pointer-events-none rounded-full bg-gradient-to-r from-white/20 to-transparent opacity-50 dark:from-white/5" />

                {/* Ticks/Grid */}
                <div className="absolute inset-0 z-10 opacity-20 dark:opacity-20 flex flex-col justify-between py-4 px-2 text-black dark:text-white">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="w-full h-[1px] bg-current" />
                    ))}
                </div>

                {/* Liquid */}
                <div className="absolute bottom-0 left-0 right-0 h-full w-full z-0 flex items-end">
                    <motion.div
                        className={`w-full ${currentTheme.liquid} ${currentTheme.glow} relative`}
                        initial={mode === "result" ? { height: "100%" } : { height: 0 }}
                        animate={{ height: `${level}%` }}
                        transition={{ type: "spring", stiffness: 50, damping: 15, delay: mode === "result" ? 0.3 : 0 }}
                    >
                        {/* Bubbles / Surface Effect */}
                        <motion.div
                            className="absolute top-0 left-0 right-0 h-2 bg-white/30 blur-[2px]"
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        />
                    </motion.div>
                </div>
            </div>

            {/* Label */}
            <div className="absolute -bottom-12 md:bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div className="text-xs font-mono font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-[0.2em] mb-1 text-center">
                    {mode === "progress" ? "Status" : "Efficiency"}
                </div>
                <div className="text-sm md:text-base font-bold text-slate-900 dark:text-white uppercase tracking-widest text-center">
                    {label}
                </div>
            </div>
        </div>
    );
}
