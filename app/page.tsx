"use client";

import { useState } from "react";
import Link from "next/link";
import { Hand, Download, Cpu, Database, Brain, Calculator, Sun, Moon, Layers, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { GlitchText } from "@/components/GlitchText";
import { AccessCard } from "@/components/AccessCard";
import { AuditModal } from "@/components/AuditModal";
import { ContactModal } from "@/components/ContactModal";
import { TypewriterText } from "@/components/TypewriterText";
import { ScanningLine } from "@/components/ScanningLine";
import { GridBackground } from "@/components/GridBackground";
import { getDictionary } from "@/lib/i18n";
import { usePreferences } from "@/hooks/usePreferences";
import { legalFooterLine } from "@/lib/legal";

export default function Home() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Theme and language persist across pages — picking RU + dark here used to reset
  // to EN + light the moment you clicked through to /portfolio or /protocols.
  const { isDarkMode, toggleTheme, locale, setLocale, toggleLocale } = usePreferences("en");

  const dict = getDictionary(locale);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Conditionally render Punk Elements only in Dark Mode */}
      {isDarkMode && (
        <>
          <GridBackground />
          <ScanningLine />
        </>
      )}

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-secondary/20 bg-background/80 backdrop-blur-md transition-colors duration-500">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-foreground">
              {dict.header.logo}
            </span>
            <span className="text-xs text-accent">[{dict.header.status}]</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDarkMode ? "Light mode" : "Dark mode"}
              className="p-2 rounded-full hover:bg-secondary/10 transition-colors"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-white" /> : <Moon className="w-4 h-4 text-slate-900" />}
            </button>

            <Link
              href={`/${locale}/portfolio`}
              className="hidden md:block font-mono text-sm font-bold text-secondary hover:text-accent transition-colors border border-transparent hover:border-accent/20 px-3 py-1 rounded-sm"
            >
              {dict.header.portfolio}
            </Link>

            <Link
              href={`/${locale}/efficiency-index`}
              className="hidden md:block font-mono text-sm font-bold text-secondary hover:text-accent transition-colors border border-transparent hover:border-accent/20 px-3 py-1 rounded-sm"
            >
              {dict.header.efficiency}
            </Link>

            <Link
              href={`/${locale}/ai-velocity-index`}
              className="hidden md:block font-mono text-sm font-bold text-secondary hover:text-emerald-500 transition-colors border border-transparent hover:border-emerald-500/20 px-3 py-1 rounded-sm"
            >
              {dict.header.aiIndex}
            </Link>

            <button
              onClick={toggleLocale}
              className="font-mono text-sm text-secondary transition-colors hover:text-foreground"
            >
              <GlitchText className="text-accent">
                {locale.toUpperCase()}
              </GlitchText>
            </button>

            {/* On phones the three nav links above are hidden and there was no
                replacement, so nothing but the hero CTAs reached the tools. */}
            <button
              onClick={() => setIsNavOpen((open) => !open)}
              aria-expanded={isNavOpen}
              aria-controls="mobile-nav"
              aria-label={
                isNavOpen
                  ? locale === "ru" ? "Закрыть меню" : "Close menu"
                  : locale === "ru" ? "Открыть меню" : "Open menu"
              }
              className="md:hidden p-2 rounded-sm text-secondary hover:text-accent transition-colors"
            >
              {isNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isNavOpen && (
          <nav
            id="mobile-nav"
            className="md:hidden border-t border-secondary/20 bg-background"
          >
            <ul className="container mx-auto flex flex-col px-6 py-2">
              {[
                { href: `/${locale}/portfolio`, label: dict.header.portfolio },
                { href: `/${locale}/efficiency-index`, label: dict.header.efficiency },
                { href: `/${locale}/ai-velocity-index`, label: dict.header.aiIndex },
                { href: "/legal", label: locale === "ru" ? "РЕКВИЗИТЫ" : "LEGAL" },
              ].map((item) => (
                <li key={item.href} className="border-b border-secondary/10 last:border-b-0">
                  <Link
                    href={item.href}
                    onClick={() => setIsNavOpen(false)}
                    className="block py-3 font-mono text-sm font-bold text-secondary transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        {/* CSS entrance instead of a framer mount animation: the hero used to
            reach the browser as inline opacity:0 and stayed invisible until
            hydration finished. */}
        <h1 className="saf-reveal mb-6 max-w-5xl text-3xl font-bold text-foreground md:text-5xl lg:text-6xl">
          {dict.hero.title}
        </h1>
        <div className="saf-reveal-delayed text-lg text-secondary md:text-xl">
          <TypewriterText text={dict.hero.subtext} />
        </div>

        <div className="saf-reveal-late mt-8 flex flex-col items-center gap-4 md:flex-row">
          <Link
            href={`/${locale}/efficiency-index`}
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-bold transition-all duration-300 border border-secondary text-secondary hover:text-accent hover:border-accent hover:shadow-[0_0_15px_rgba(0,255,148,0.2)] w-full md:w-auto"
          >
            <Calculator className="w-4 h-4" />
            <span>{dict.hero.cta}</span>
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          <Link
            href={`/${locale}/ai-velocity-index`}
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-bold transition-all duration-300 border border-secondary text-secondary hover:text-emerald-500 hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] w-full md:w-auto"
          >
            <Brain className="w-4 h-4" />
            <span>{dict.hero.ctaAi}</span>
            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          <Link
            href={`/${locale}/portfolio`}
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-bold transition-all duration-300 border border-secondary text-secondary hover:text-accent hover:border-accent/60 hover:shadow-[0_0_15px_rgba(0,255,148,0.15)] w-full md:w-auto"
          >
            <Layers className="w-4 h-4" />
            <span>{dict.hero.ctaWork}</span>
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
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
              onClick={() => setIsContactModalOpen(true)}
            />
          </div>
        </div>
      </section>

      {/* The Stack */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <h2 className="saf-reveal mb-12 text-center text-3xl font-semibold text-foreground">
            {dict.stack.title}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Cpu,
                title: dict.stack.module1,
                desc: dict.stack.module1Desc,
                href: `/${locale}/protocols`,
              },
              {
                icon: Database,
                title: dict.stack.module2,
                desc: dict.stack.module2Desc,
                href: `/${locale}/resources`,
              },
              {
                icon: Brain,
                title: dict.stack.module3,
                desc: dict.stack.module3Desc,
                href: `/${locale}/intelligence`,
              },
            ].map((module, index) => (
              <Link key={index} href={module.href}>
                <motion.div
                  className="saf-reveal group relative border border-secondary/20 bg-background p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(0,255,148,0.1)] cursor-pointer"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
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
          <div className="saf-reveal mx-auto max-w-2xl border border-secondary/20 bg-background p-8 font-mono">
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
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-secondary/20 py-12">
        <div className="container mx-auto px-6">
          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 mb-8 md:grid-cols-4">
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">
                {locale === "ru" ? "Инструменты" : "Tools"}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href={`/${locale}/efficiency-index`} className="text-sm text-secondary hover:text-accent transition-colors">
                    Efficiency Index
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/ai-velocity-index`} className="text-sm text-secondary hover:text-accent transition-colors">
                    AI Velocity Index
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">
                {locale === "ru" ? "Услуги" : "Services"}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href={`/${locale}/protocols`} className="text-sm text-secondary hover:text-accent transition-colors">
                    {locale === "ru" ? "Системные Протоколы" : "System Protocols"}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/resources`} className="text-sm text-secondary hover:text-accent transition-colors">
                    {locale === "ru" ? "Архитектура Ресурсов" : "Resource Architecture"}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/intelligence`} className="text-sm text-secondary hover:text-accent transition-colors">
                    {locale === "ru" ? "Когнитивный Интеллект" : "Cognitive Intelligence"}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">
                {locale === "ru" ? "Контакт" : "Contact"}
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`mailto:${dict.footer.email}`}
                    className="text-sm text-secondary hover:text-accent transition-colors"
                  >
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/SafarIsaev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-secondary hover:text-accent transition-colors"
                  >
                    Telegram
                  </a>
                </li>
                <li>
                  <a
                    href="https://cal.com/safarisaev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-secondary hover:text-accent transition-colors"
                  >
                    {locale === "ru" ? "Забронировать звонок" : "Book a Call"}
                  </a>
                </li>
                <li>
                  <Link
                    href="/legal"
                    className="text-sm text-secondary hover:text-accent transition-colors"
                  >
                    {locale === "ru" ? "Реквизиты компании" : "Legal & Company Info"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-secondary hover:text-accent transition-colors"
                  >
                    {locale === "ru" ? "Политика приватности" : "Privacy Policy"}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">
                {locale === "ru" ? "Язык" : "Language"}
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setLocale("en")}
                    className={`text-sm transition-colors ${locale === "en" ? "text-accent" : "text-secondary hover:text-accent"}`}
                  >
                    English
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setLocale("ru")}
                    className={`text-sm transition-colors ${locale === "ru" ? "text-accent" : "text-secondary hover:text-accent"}`}
                  >
                    Русский
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-secondary/20 flex flex-col items-center gap-2 text-center md:flex-row md:justify-between">
            <div className="flex flex-col items-center gap-1 md:items-start">
              <span className="text-xs text-secondary">
                {dict.footer.label}
              </span>
              <span className="text-xs text-secondary">
                {legalFooterLine}
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
        locale={locale}
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

