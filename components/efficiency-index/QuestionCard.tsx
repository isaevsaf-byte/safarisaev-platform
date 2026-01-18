import { motion } from "framer-motion";
import { Question, efficiencyData } from "./data";
import { ArrowLeft } from "lucide-react";

interface QuestionCardProps {
    question: Question;
    onAnswer: (penalty: number) => void;
    onBack: () => void;
    lang: "en" | "ru";
    currentIndex: number;
    total: number;
}

export function QuestionCard({ question, onAnswer, onBack, lang, currentIndex, total }: QuestionCardProps) {
    const t = efficiencyData.content[lang].text;

    return (
        <div className="w-full max-w-2xl mx-auto p-4 md:p-8">
            {/* Progress Indicator */}
            <div className="mb-6 md:mb-8 flex items-center gap-2 text-xs font-mono text-slate-400 dark:text-zinc-500">
                <span className="text-blue-500 dark:text-accent font-bold">0{currentIndex + 1}</span>
                <div className="h-[2px] flex-1 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-blue-500 dark:bg-accent"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIndex + 1) / total) * 100}%` }}
                    />
                </div>
                <span className="font-bold">{total}</span>
            </div>

            {/* Question Text */}
            <motion.h2
                key={question.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl md:text-3xl font-bold mb-6 md:mb-10 text-slate-900 dark:text-white min-h-[60px] md:min-h-[80px]"
            >
                {question.text}
            </motion.h2>

            {/* Options */}
            <div className="space-y-3 md:space-y-4">
                {question.options.map((option, idx) => (
                    <motion.button
                        key={`${question.id}-${idx}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => onAnswer(option.penalty)}
                        className="w-full text-left p-5 md:p-6 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:bg-slate-50 dark:hover:bg-zinc-800/80 hover:border-blue-500 dark:hover:border-accent/50 transition-all duration-300 group relative overflow-hidden shadow-sm hover:shadow-md active:scale-[0.98]"
                    >
                        {/* Hover Glitch Effect Line (Dark) */}
                        <div className="absolute inset-0 bg-blue-500/5 dark:bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-transparent group-hover:bg-blue-500 dark:group-hover:bg-accent transition-colors" />

                        <span className="relative z-10 text-slate-700 dark:text-zinc-300 group-hover:text-slate-900 dark:group-hover:text-white font-mono text-sm md:text-base pl-2 font-medium">
                            {option.text}
                        </span>
                    </motion.button>
                ))}
            </div>

            {/* Back Button */}
            <div className="mt-8 flex justify-start">
                <button
                    onClick={onBack}
                    disabled={currentIndex === 0}
                    className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors ${currentIndex === 0
                            ? "opacity-0 pointer-events-none"
                            : "text-slate-400 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-white"
                        }`}
                >
                    <ArrowLeft className="w-4 h-4" />
                    {t.back_btn}
                </button>
            </div>
        </div>
    );
}
