"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccessCardProps {
  icon: LucideIcon;
  badge: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
  className?: string;
}

export function AccessCard({
  icon: Icon,
  badge,
  title,
  desc,
  cta,
  href,
  className,
}: AccessCardProps) {
  return (
    <motion.div
      className={cn(
        "relative border border-secondary/20 bg-background p-6 transition-all duration-300",
        "hover:border-accent/50 hover:shadow-[0_0_20px_rgba(0,255,148,0.1)]",
        className
      )}
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Scan effect on hover */}
      <motion.div
        className="absolute inset-0 border-t border-accent/0"
        whileHover={{ borderColor: "rgba(0,255,148,0.3)" }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Icon className="h-8 w-8 text-accent" />
        </div>
        <div className="flex-1 space-y-3">
          <span className="inline-block text-xs font-mono text-accent">
            {badge}
          </span>
          <h3 className="text-xl font-mono font-semibold text-foreground">
            {title}
          </h3>
          <p className="text-sm text-secondary leading-relaxed">{desc}</p>
          <a
            href={href}
            className="inline-block border border-accent bg-accent/10 px-4 py-2 font-mono text-sm text-accent transition-all hover:bg-accent hover:text-background"
          >
            {cta}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

