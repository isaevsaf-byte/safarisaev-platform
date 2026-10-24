"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { LegalFooter } from "@/components/LegalFooter";

/**
 * Shown for any error while rendering any page.
 *
 * The one-off "System Error" seen once on the Efficiency Index and never reproduced
 * matches the most common cause of exactly that pattern: a deploy lands while the
 * page is open, the old JavaScript chunks are gone from the server, and the next
 * lazily loaded piece fails to download. The quiz code itself has no failing path
 * (checked in the October audit). Nothing is wrong with the page; it only needs the
 * new build, so a chunk-load failure reloads once by itself.
 *
 * The old text said the incident had been logged. Nothing was: the only record was
 * a console.error in the visitor's own browser. It now says what is true.
 */
const COPY = {
    en: {
        title: "Something broke",
        body: "The page hit an error. Trying again usually fixes it. If it keeps happening, write to saf@safarisaev.ai.",
        retry: "TRY AGAIN",
        home: "RETURN HOME",
        id: "Error ID",
    },
    ru: {
        title: "Что-то сломалось",
        body: "Страница споткнулась об ошибку. Обычно помогает повторить. Если повторяется, напишите на saf@safarisaev.ai.",
        retry: "ПОВТОРИТЬ",
        home: "НА ГЛАВНУЮ",
        id: "Код ошибки",
    },
} as const;

const RELOAD_KEY = "saf:chunk-reload";

function isChunkLoadError(error: Error) {
    return (
        error.name === "ChunkLoadError" ||
        /Loading chunk [\w-]+ failed|Failed to fetch dynamically imported module|Importing a module script failed/i.test(
            error.message
        )
    );
}

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const pathname = usePathname();
    const locale = pathname?.startsWith("/ru") ? "ru" : "en";
    const t = COPY[locale];

    useEffect(() => {
        console.error("Application error:", error);
        if (!isChunkLoadError(error)) return;
        try {
            // One automatic reload per tab session, so a chunk that is genuinely
            // missing cannot put the visitor in a reload loop.
            if (sessionStorage.getItem(RELOAD_KEY)) return;
            sessionStorage.setItem(RELOAD_KEY, "1");
        } catch {
            return; // storage blocked: do not risk a loop
        }
        window.location.reload();
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-background">
            <div className="mb-6 text-8xl">⚠️</div>
            <h1 className="text-4xl font-bold text-foreground mb-4">{t.title}</h1>
            <p className="text-lg text-secondary mb-8 max-w-md">{t.body}</p>
            <div className="flex gap-4">
                <button
                    onClick={reset}
                    className="px-8 py-4 border border-accent bg-accent/10 text-accent hover:bg-accent hover:text-background transition-colors font-mono text-sm"
                >
                    {t.retry}
                </button>
                <a
                    href="/"
                    className="px-8 py-4 border border-secondary text-secondary hover:text-foreground hover:border-foreground transition-colors font-mono text-sm"
                >
                    {t.home}
                </a>
            </div>
            {error.digest && (
                <p className="mt-8 text-xs text-secondary font-mono">
                    {t.id}: {error.digest}
                </p>
            )}

            <div className="mt-16 w-full">
                <LegalFooter locale={locale} />
            </div>
        </div>
    );
}
