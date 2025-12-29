"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
}

export function AuditModal({ isOpen, onClose, dictionary }: AuditModalProps) {
  const [companyUrl, setCompanyUrl] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Audit Request:", { companyUrl, email });
    // Reset form
    setCompanyUrl("");
    setEmail("");
    onClose();
  };

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
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 border border-secondary/20 bg-background p-6 font-mono"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
          >
            <div className="mb-4 flex items-center justify-between border-b border-secondary/20 pb-3">
              <h2 className="text-lg font-semibold text-foreground">
                {dictionary.modal.title}
              </h2>
              <button
                onClick={onClose}
                className="text-secondary transition-colors hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-secondary">
                  {dictionary.modal.companyUrl}
                </label>
                <input
                  type="url"
                  value={companyUrl}
                  onChange={(e) => setCompanyUrl(e.target.value)}
                  className="w-full border border-secondary/20 bg-background px-3 py-2 text-foreground focus:border-accent focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-secondary">
                  {dictionary.modal.email}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-secondary/20 bg-background px-3 py-2 text-foreground focus:border-accent focus:outline-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 border border-accent bg-accent/10 px-4 py-2 text-sm text-accent transition-all hover:bg-accent hover:text-background"
                >
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

