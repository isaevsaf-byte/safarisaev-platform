"use client";

import { useState } from "react";
import Link from "next/link";
import { Hand, Download, Cpu, Database, Brain, Calculator } from "lucide-react";
import { motion } from "framer-motion";
import { GlitchText } from "@/components/GlitchText";
import { AccessCard } from "@/components/AccessCard";
import { AuditModal } from "@/components/AuditModal";
import { ContactModal } from "@/components/ContactModal";
import { TypewriterText } from "@/components/TypewriterText";
import { ScanningLine } from "@/components/ScanningLine";
import { GridBackground } from "@/components/GridBackground";
import { getDictionary, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const dict = getDictionary(locale);

  const toggleLocale = () => {
    setLocale(locale === "en" ? "ru" : "en");
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <GridBackground />
      <ScanningLine />

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-secondary/20 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-foreground">
              {dict.header.logo}
            </span>
            <span className="text-xs text-accent">[{dict.header.status}]</span>
          </div>

          <Link
            href={`/efficiency-index?lang=${locale}`}
            className="hidden md:block font-mono text-sm font-bold text-secondary hover:text-accent transition-colors border border-transparent hover:border-accent/20 px-3 py-1 rounded-sm"
          >
            {dict.header.efficiency}
          </Link>

          <button
            onClick={toggleLocale}
            className="font-mono text-sm text-secondary transition-colors hover:text-foreground"
          >
            <GlitchText className="text-accent">
              {locale.toUpperCase()}
            </GlitchText>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        <motion.h1
          className="mb-6 text-6xl font-bold text-foreground md:text-8xl lg:text-9xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {dict.hero.title}
        </motion.h1>
        <motion.div
          className="text-lg text-secondary md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <TypewriterText text={dict.hero.subtext} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8"
        >
          <Link
            href={`/efficiency-index?lang=${locale}`}
            className="group relative inline-flex items-center gap-2 px-6 py-3 font-mono text-sm font-bold transition-all duration-300 border border-secondary text-secondary hover:text-accent hover:border-accent hover:shadow-[0_0_15px_rgba(0,255,148,0.2)]"
          >
            <Calculator className="w-4 h-4" />
            <span>{dict.hero.cta}</span>
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </motion.div>
      </section>

      {/* Active Protocols */}
      <section className="relative z-10 border-y border-secondary/20 py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <AccessCard
              icon={Hand}
              badge={dict.protocols.cardA.badge}
              title={dict.protocols.cardA.title}
              desc={dict.protocols.cardA.desc}
              cta={dict.protocols.cardA.cta}
              onClick={() => {
                setIsContactModalOpen(true);
              }}
            />
            <AccessCard
              icon={Download}
              badge={dict.protocols.cardB.badge}
              title={dict.protocols.cardB.title}
              desc={dict.protocols.cardB.desc}
              cta={dict.protocols.cardB.cta}
              href="#gumroad-link"
            />
          </div>
        </div>
      </section>

      {/* The Stack */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            className="mb-12 text-center text-3xl font-semibold text-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {dict.stack.title}
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Cpu,
                title: dict.stack.module1,
                desc: dict.stack.module1Desc,
                href: "/protocols",
              },
              {
                icon: Database,
                title: dict.stack.module2,
                desc: dict.stack.module2Desc,
                href: "/resources",
              },
              {
                icon: Brain,
                title: dict.stack.module3,
                desc: dict.stack.module3Desc,
                href: "/intelligence",
              },
            ].map((module, index) => (
              <Link key={index} href={module.href}>
                <motion.div
                  className="group relative border border-secondary/20 bg-background p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(0,255,148,0.1)] cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                >
                  <module.icon className="mb-4 h-10 w-10 text-accent" />
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    {module.title}
                  </h3>
                  <p className="text-sm text-secondary">{module.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section className="relative z-10 border-y border-secondary/20 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="mx-auto max-w-2xl border border-secondary/20 bg-background p-8 font-mono"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 space-y-2">
              <div className="text-sm text-secondary">
                {dict.leadMagnet.terminal}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">{">"}</span>
                <span className="text-foreground">_</span>
              </div>
            </div>
            <button
              onClick={() => setIsAuditModalOpen(true)}
              className="w-full border border-accent bg-accent/10 px-6 py-4 text-sm text-accent transition-all hover:bg-accent hover:text-background"
            >
              {dict.leadMagnet.cta}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-secondary/20 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center gap-2 text-center md:flex-row md:justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-secondary">
                {dict.footer.label}
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
              <a
                href={`mailto:${dict.footer.email}`}
                className="text-sm text-accent transition-colors hover:text-foreground"
              >
                {dict.footer.email}
              </a>
              <span className="hidden text-secondary md:inline">{'//'}</span>
              <a
                href="https://t.me/SafarIsaev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent transition-colors hover:text-foreground"
              >
                TELEGRAM // SECURE UPLINK
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Audit Modal */}
      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        dictionary={dict.leadMagnet}
      />

      {/* Contact Modal */}
      {dict.contactModal && (
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          dictionary={dict.contactModal}
          telegramUrl="https://t.me/SafarIsaev"
          emailAddress={dict.footer.email}
        />
      )}
    </main>
  );
}

