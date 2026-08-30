import type { Locale } from "@/lib/i18n";

export const LOCALES: Locale[] = ["en", "ru"];

export function isLocale(value: string): value is Locale {
    return (LOCALES as string[]).includes(value);
}

export function localeParams() {
    return LOCALES.map((lang) => ({ lang }));
}

/**
 * Swap the locale segment of a pathname: /ru/portfolio/beautasy -> /en/portfolio/beautasy.
 * Used by the header language switch, which is now a real link between two real
 * URLs instead of a state toggle — that is what makes the Russian pages
 * shareable and indexable at all.
 */
export function swapLocale(pathname: string, next: Locale) {
    const segments = pathname.split("/");
    // segments[0] is the empty string before the leading slash.
    if (segments.length > 1 && isLocale(segments[1])) {
        segments[1] = next;
        return segments.join("/") || "/";
    }
    return `/${next}${pathname === "/" ? "" : pathname}`;
}

/** Absolute alternates for a localised route, for canonical + hreflang. */
export function alternatesFor(path: string) {
    const base = "https://safarisaev.ai";
    return {
        en: `${base}/en${path}`,
        ru: `${base}/ru${path}`,
    };
}
