"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, MessageSquare } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  dictionary: {
    title: string;
    choose: string;
    telegram: string;
    email: string;
    close: string;
  };
  telegramUrl: string;
  emailAddress: string;
}

export function ContactModal({
  isOpen,
  onClose,
  dictionary,
  telegramUrl,
  emailAddress,
}: ContactModalProps) {
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
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 border border-secondary/20 bg-background p-6 font-mono mx-4"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between border-b border-secondary/20 pb-3">
              <h2 className="text-lg font-semibold text-foreground leading-tight">
                {dictionary.title}
              </h2>
              <button
                onClick={onClose}
                className="text-secondary transition-colors hover:text-foreground flex-shrink-0 ml-4"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-secondary">{dictionary.choose}</p>

              <div className="grid gap-3">
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="flex items-center gap-3 border border-accent bg-accent/10 p-4 transition-all hover:bg-accent hover:text-background min-h-[60px]"
                >
                  <MessageSquare className="h-5 w-5 flex-shrink-0 text-accent" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-foreground text-sm">
                      {dictionary.telegram}
                    </div>
                    <div className="text-xs text-secondary mt-0.5">Direct message</div>
                  </div>
                </a>

                <a
                  href={`mailto:${emailAddress}`}
                  onClick={onClose}
                  className="flex items-center gap-3 border border-secondary/20 bg-background p-4 transition-all hover:border-accent/50 hover:bg-accent/10 min-h-[60px]"
                >
                  <Mail className="h-5 w-5 flex-shrink-0 text-accent" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-foreground text-sm">
                      {dictionary.email}
                    </div>
                    <div className="text-xs text-secondary mt-0.5 break-all">{emailAddress}</div>
                  </div>
                </a>
              </div>

              <button
                onClick={onClose}
                className="mt-4 w-full border border-secondary/20 px-4 py-2 text-sm text-secondary transition-all hover:border-secondary hover:text-foreground"
              >
                {dictionary.close}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
