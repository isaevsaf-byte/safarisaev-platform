"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { GlitchText } from "@/components/GlitchText";

type Locale = "en" | "ru";

const content = {
  en: {
    back: "SAFARISAEV.AI",
    eyebrow: "— Selected Work",
    title: "Portfolio",
    subtitle: "Sites built for founders, brands, and operators. Fast, clean, no agency markup.",
    visit: "VISIT",
    visitSite: "VISIT SITE",
    ctaEyebrow: "— Next project",
    ctaTitle: "Got a project in mind?",
    ctaSubtitle: "Websites from £300. Fast, clean, no agency markup.",
    ctaButton: "START A CONVERSATION",
  },
  ru: {
    back: "SAFARISAEV.AI",
    eyebrow: "— Избранные работы",
    title: "Работы",
    subtitle: "Сайты для основателей, брендов и операционных команд. Быстро, чисто, без агентской накрутки.",
    visit: "ОТКРЫТЬ",
    visitSite: "ОТКРЫТЬ САЙТ",
    ctaEyebrow: "— Следующий проект",
    ctaTitle: "Есть идея проекта?",
    ctaSubtitle: "Сайты от £300. Быстро, чисто, без агентских наценок.",
    ctaButton: "НАЧАТЬ РАЗГОВОР",
  },
};

// Ordered: featured hero first, then by visual complexity / beauty
const projects = {
  en: [
    {
      slug: "silkbees",
      name: "Silk Bees",
      url: "https://silkbees.co.uk",
      category: "AgriTech",
      description: "Wholesale beekeeping export from Uzbekistan to UK",
      featured: true,
    },
    {
      slug: "cpowatchtower",
      name: "CPO Watchtower",
      url: "https://cpo-watchtower.co.uk",
      category: "Procurement",
      description: "Procurement intelligence platform",
      featured: false,
    },
    {
      slug: "beautasy",
      name: "Beautasy Atelier",
      url: "https://beautasy.co.uk/atelier",
      category: "Beauty",
      description: "Luxury beauty atelier",
      featured: false,
    },
    {
      slug: "safarisaev",
      name: "Safarisaev.ai",
      url: "https://safarisaev.ai",
      category: "Consulting",
      description: "Business operations platform",
      featured: false,
    },
    {
      slug: "bektothefuture",
      name: "Bek to the Future",
      url: "https://bektothefuture.com",
      category: "Music",
      description: "Tech House DJ personal brand",
      featured: false,
    },
    {
      slug: "newyear2025",
      name: "New Year 2025",
      url: "https://newyear2025.tiiny.site",
      category: "Event",
      description: "New Year event landing page",
      featured: false,
    },
  ],
  ru: [
    {
      slug: "silkbees",
      name: "Silk Bees",
      url: "https://silkbees.co.uk",
      category: "AgriTech",
      description: "Оптовый экспорт продуктов пчеловодства из Узбекистана в Великобританию",
      featured: true,
    },
    {
      slug: "cpowatchtower",
      name: "CPO Watchtower",
      url: "https://cpo-watchtower.co.uk",
      category: "Закупки",
      description: "Платформа аналитики для директоров по закупкам",
      featured: false,
    },
    {
      slug: "beautasy",
      name: "Beautasy Atelier",
      url: "https://beautasy.co.uk/atelier",
      category: "Бьюти",
      description: "Люксовое бьюти-ателье",
      featured: false,
    },
    {
      slug: "safarisaev",
      name: "Safarisaev.ai",
      url: "https://safarisaev.ai",
      category: "Консалтинг",
      description: "Платформа операционного управления бизнесом",
      featured: false,
    },
    {
      slug: "bektothefuture",
      name: "Bek to the Future",
      url: "https://bektothefuture.com",
      category: "Музыка",
      description: "Личный бренд Tech House DJ",
      featured: false,
    },
    {
      slug: "newyear2025",
      name: "New Year 2025",
      url: "https://newyear2025.tiiny.site",
      category: "Ивент",
      description: "Лендинг новогоднего мероприятия",
      featured: false,
    },
  ],
};

function screenshotUrl(url: string) {
  return `https://image.thum.io/get/width/1200/crop/800/noanimate/${url}`;
}

type Project = (typeof projects)["en"][number];

function ScreenshotImage({
  url,
  alt,
  eager,
}: {
  url: string;
  alt: string;
  eager?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* Skeleton shown until image loads */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-secondary/10 animate-pulse" />
      )}
      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 bg-secondary/10 flex items-center justify-center">
          <span className="font-mono text-xs text-secondary/40 uppercase tracking-widest">
            {alt}
          </span>
        </div>
      )}
      {!error && (
        <img
          src={screenshotUrl(url)}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          className={`w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  visitLabel,
}: {
  project: Project;
  index: number;
  visitLabel: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative overflow-hidden border border-secondary/20 bg-background hover:border-accent/30 transition-colors duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden aspect-[16/10]">
        <ScreenshotImage url={project.url} alt={project.name} />
        <div
          className={`absolute inset-0 bg-background/90 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="font-mono text-sm text-secondary text-center px-6 max-w-xs">
            {project.description}
          </p>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-xs font-bold text-accent border border-accent/40 px-4 py-2 hover:bg-accent/10 transition-colors"
          >
            {visitLabel} <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="p-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-mono text-sm font-bold text-foreground">
            {project.name}
          </h3>
          <p className="font-mono text-xs text-secondary mt-0.5 line-clamp-1">
            {project.description}
          </p>
        </div>
        <span className="shrink-0 font-mono text-xs text-accent border border-accent/30 px-2 py-0.5 uppercase">
          {project.category}
        </span>
      </div>
    </motion.div>
  );
}

function FeaturedCard({
  project,
  visitSiteLabel,
}: {
  project: Project;
  visitSiteLabel: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="group relative overflow-hidden border border-secondary/20 bg-background hover:border-accent/30 transition-colors duration-300 w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden aspect-[21/9] md:aspect-[21/8]">
        <ScreenshotImage url={project.url} alt={project.name} eager />
        <div
          className={`absolute inset-0 bg-background/90 flex flex-col items-center justify-center gap-5 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="font-mono text-base text-secondary text-center px-8 max-w-lg">
            {project.description}
          </p>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-sm font-bold text-accent border border-accent/40 px-6 py-2.5 hover:bg-accent/10 transition-colors"
          >
            {visitSiteLabel} <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="p-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-mono text-lg font-bold text-foreground">
            {project.name}
          </h2>
          <p className="font-mono text-sm text-secondary mt-1">
            {project.description}
          </p>
        </div>
        <span className="shrink-0 font-mono text-xs text-accent border border-accent/30 px-2.5 py-1 uppercase">
          {project.category}
        </span>
      </div>
    </motion.div>
  );
}

export default function PortfolioPage() {
  const [locale, setLocale] = useState<Locale>("en");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDarkMode]);

  const t = content[locale];
  const list = projects[locale];
  const featured = list.find((p) => p.featured)!;
  const grid = list.filter((p) => !p.featured);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-secondary/20 bg-background/80 backdrop-blur-md transition-colors duration-500">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-sm text-secondary hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label={isDarkMode ? "Light mode" : "Dark mode"}
              className="p-2 rounded-full hover:bg-secondary/10 transition-colors"
            >
              <span className="font-mono text-xs text-secondary">
                {isDarkMode ? "LIGHT" : "DARK"}
              </span>
            </button>

            <button
              onClick={() => setLocale(locale === "en" ? "ru" : "en")}
              className="font-mono text-sm text-secondary transition-colors hover:text-foreground"
            >
              <GlitchText className="text-accent">
                {locale.toUpperCase()}
              </GlitchText>
            </button>
          </div>
        </div>
      </header>

      {/* Page heading */}
      <section className="relative z-10 container mx-auto px-6 pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs text-accent uppercase tracking-widest mb-3">
            {t.eyebrow}
          </p>
          <h1 className="font-mono text-3xl md:text-5xl font-bold text-foreground">
            {t.title}
          </h1>
          <p className="font-mono text-sm text-secondary mt-4 max-w-md">
            {t.subtitle}
          </p>
        </motion.div>
      </section>

      {/* Featured project */}
      <section className="relative z-10 container mx-auto px-6 mb-6">
        <FeaturedCard project={featured} visitSiteLabel={t.visitSite} />
      </section>

      {/* Grid */}
      <section className="relative z-10 container mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {grid.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              visitLabel={t.visit}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 border-t border-secondary/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-6 py-20 flex flex-col items-center text-center"
        >
          <p className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
            {t.ctaEyebrow}
          </p>
          <h2 className="font-mono text-2xl md:text-4xl font-bold text-foreground mb-3">
            {t.ctaTitle}
          </h2>
          <p className="font-mono text-sm text-secondary mb-8 max-w-sm">
            {t.ctaSubtitle}
          </p>
          <a
            href="mailto:saf@safarisaev.ai"
            className="font-mono text-sm font-bold text-background bg-accent px-8 py-3 hover:opacity-80 transition-opacity"
          >
            {t.ctaButton}
          </a>
        </motion.div>
      </section>
    </main>
  );
}
