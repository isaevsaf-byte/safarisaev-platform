"use client";

import { useState } from "react";
import { projectImage, type PortfolioProject } from "@/lib/portfolioData";

/**
 * Shared between the portfolio grid and the case-study hero.
 *
 * Falls back to the project name on error, and reserves the aspect ratio through
 * width/height so the page doesn't jump when a slow screenshot finally lands.
 */
export function ProjectScreenshot({
    project,
    eager,
    className = "",
}: {
    project: PortfolioProject;
    eager?: boolean;
    className?: string;
}) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    return (
        <div className={`relative h-full w-full bg-secondary/5 ${className}`}>
            {!loaded && !error && (
                <div className="absolute inset-0 animate-pulse bg-secondary/10" />
            )}
            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-secondary/10 px-4">
                    <span className="text-center font-mono text-xs uppercase tracking-widest text-secondary/50">
                        {project.name}
                    </span>
                </div>
            )}
            {!error && (
                // eslint-disable-next-line @next/next/no-img-element -- third-party screenshot service, not a local asset next/image can optimise
                <img
                    src={projectImage(project)}
                    alt={`${project.name} — website screenshot`}
                    width={1200}
                    height={800}
                    loading={eager ? "eager" : "lazy"}
                    fetchPriority={eager ? "high" : "auto"}
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className={`h-full w-full object-cover object-top transition-opacity duration-500 ${
                        loaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setLoaded(true)}
                    onError={() => setError(true)}
                />
            )}
        </div>
    );
}
