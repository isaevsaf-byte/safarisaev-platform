"use client";

import { useEffect, useRef, useState } from "react";
import { projectImage, type PortfolioProject } from "@/lib/portfolioData";

/**
 * Shared between the portfolio grid and the case-study hero.
 *
 * Falls back to the project name on error, and reserves the aspect ratio through
 * width/height so the page doesn't jump when a slow screenshot finally lands.
 *
 * Some work cannot be photographed at all: a bot has no page for a screenshot
 * service to fetch. Rather than show a grey box, those entries render their own
 * commands, copied out of the running source. It is the closest thing to a true
 * picture of something that only exists inside a chat.
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
    const imgRef = useRef<HTMLImageElement>(null);
    const source = projectImage(project);

    // The server renders the image at opacity 0 and onLoad is what reveals it. But
    // React only attaches onLoad when the page hydrates, and on a repeat visit the
    // browser has usually finished loading the cached screenshot before that. The
    // load event has already fired, nobody was listening, and the picture stayed
    // invisible behind a pulsing grey box: measured hidden in 8 of 10 reloads.
    // So check the element itself once React is attached.
    useEffect(() => {
        const img = imgRef.current;
        if (!img || !img.complete) return;
        if (img.naturalWidth > 0) setLoaded(true);
        else setError(true);
    }, [source]);

    if (!source) {
        return (
            <div
                className={`flex h-full w-full flex-col justify-center gap-2 overflow-hidden bg-secondary/[0.07] px-5 py-7 sm:px-7 sm:py-9 ${className}`}
            >
                {project.preview?.length ? (
                    project.preview.map((line) => (
                        <p
                            key={line}
                            className="truncate font-mono text-xs text-secondary md:text-sm"
                        >
                            <span className="text-accent">›</span> {line}
                        </p>
                    ))
                ) : (
                    <span className="text-center font-mono text-xs uppercase tracking-widest text-secondary/50">
                        {project.name}
                    </span>
                )}
            </div>
        );
    }

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
                    ref={imgRef}
                    src={source}
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
