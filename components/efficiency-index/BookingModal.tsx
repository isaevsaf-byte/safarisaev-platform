"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Mail } from "lucide-react";
import { efficiencyData, Lang } from "./data";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    lang: Lang;
}

export function BookingModal({ isOpen, onClose, lang }: BookingModalProps) {
    const t = efficiencyData.content[lang].text.booking;

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

                            {/* Content */}
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                    {t.modal_title}
                                </h2>
                                <p className="text-sm text-slate-600 dark:text-zinc-400">
                                    {t.modal_subtitle}
                                </p>
                            </div>

                            <div className="space-y-3">
                                {/* Telegram Button */}
                                <a
                                    href="https://t.me/SafarIsaev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-center gap-3 w-full p-4 rounded-lg bg-[#229ED9] hover:bg-[#1C8CC2] text-white font-bold transition-all shadow-lg hover:shadow-[#229ED9]/20"
                                >
                                    <Send className="w-5 h-5" />
                                    <span>{t.telegram_btn}</span>
                                </a>

                                {/* Email Button */}
                                <a
                                    href="mailto:saf@safarisaev.ai"
                                    className="group flex items-center justify-center gap-3 w-full p-4 rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-900 dark:text-white font-bold transition-all"
                                >
                                    <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    <span>{t.email_btn}</span>
                                </a>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full mt-6 text-xs text-slate-400 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-white uppercase tracking-widest font-bold transition-colors"
                            >
                                {t.cancel}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
