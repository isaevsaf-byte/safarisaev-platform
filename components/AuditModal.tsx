"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useDialog } from "@/hooks/useDialog";
import { useForm } from "@formspree/react";

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  dictionary: {
    modal: {
      title: string;
      companyUrl: string;
      email: string;
      submit: string;
      close: string;
    };
  };
  locale?: "en" | "ru";
}

export function AuditModal({ isOpen, onClose, dictionary, locale = "en" }: AuditModalProps) {
  // Previously this form only ran console.log() and closed — every lead submitted
  // from the homepage audit CTA was silently discarded. It now posts to Formspree,
  // the same endpoint the other two lead forms use.
  const [state, handleSubmit] = useForm("xzddelvr");
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Escape, focus trap, scroll lock and focus restore.
  const dialogRef = useDialog(isOpen, onClose);

  useEffect(() => {
    if (!state.succeeded) return;
    const timer = setTimeout(() => onCloseRef.current(), 2500);
    return () => clearTimeout(timer);
  }, [state.succeeded]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={dialogRef}
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 border border-secondary/20 bg-background p-6 font-mono"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={dictionary.modal.title}
          >
            <div className="mb-4 flex items-center justify-between border-b border-secondary/20 pb-3">
              <h2 className="text-lg font-semibold text-foreground">
                {dictionary.modal.title}
              </h2>
              <button
                onClick={onClose}
                aria-label={dictionary.modal.close}
                className="text-secondary transition-colors hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {state.succeeded ? (
              <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                <CheckCircle className="h-10 w-10 text-accent" />
                <p className="text-sm text-foreground">
                  {locale === "ru"
                    ? "Заявка принята. Отвечу в течение 24 часов."
                    : "Request received. I'll reply within 24 hours."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Lets you tell homepage audit leads apart from the two index tools,
                    which post to the same Formspree form. */}
                <input type="hidden" name="source" value="homepage-audit-protocol" />
                <input type="hidden" name="lang" value={locale} />

                <div>
                  <label
                    htmlFor="audit-company-url"
                    className="mb-2 block text-sm text-secondary"
                  >
                    {dictionary.modal.companyUrl}
                  </label>
                  <input
                    id="audit-company-url"
                    name="companyUrl"
                    type="url"
                    placeholder="https://"
                    className="w-full border border-secondary/20 bg-background px-3 py-2 text-foreground focus:border-accent focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="audit-email" className="mb-2 block text-sm text-secondary">
                    {dictionary.modal.email}
                  </label>
                  <input
                    id="audit-email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    className="w-full border border-secondary/20 bg-background px-3 py-2 text-foreground focus:border-accent focus:outline-none"
                    required
                  />
                </div>

                {state.errors && (
                  <p className="text-xs text-efficiency-critical">
                    {locale === "ru"
                      ? "Не удалось отправить. Напишите на saf@safarisaev.ai."
                      : "Could not send. Please email saf@safarisaev.ai."}
                  </p>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="flex flex-1 items-center justify-center gap-2 border border-accent bg-accent/10 px-4 py-2 text-sm text-accent transition-all hover:bg-accent hover:text-background disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {state.submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {dictionary.modal.submit}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="border border-secondary/20 px-4 py-2 text-sm text-secondary transition-all hover:border-secondary hover:text-foreground"
                  >
                    {dictionary.modal.close}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
