"use client";

import { useCallback, useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

const THEME_KEY = "saf:theme";
const LOCALE_KEY = "saf:locale";

type Theme = "light" | "dark";

function readStored<T extends string>(key: string, allowed: readonly T[]): T | null {
    try {
        const value = window.localStorage.getItem(key);
        return value && (allowed as readonly string[]).includes(value) ? (value as T) : null;
    } catch {
        // Private mode / storage disabled — fall back to defaults.
        return null;
    }
}

function write(key: string, value: string) {
    try {
        window.localStorage.setItem(key, value);
    } catch {
        /* ignore */
    }
}

/**
 * Theme and language survive navigation between pages.
 *
 * Every page used to hold its own `useState(false)` for dark mode and its own
 * `useState("en")` for locale, so picking Russian + dark on the home page and
 * clicking through to /portfolio silently reset both.
 *
 * The initial theme class is painted by the inline script in app/layout.tsx before
 * first paint; this hook only re-syncs after hydration so there is no flash.
 */
/** Persist a language choice so the non-localised home page picks it up. */
export function rememberLocale(locale: Locale) {
    write(LOCALE_KEY, locale);
}

/**
 * Theme only. Pages that carry their language in the URL take the locale from
 * the route and use this for the theme alone.
 */
export function useTheme() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const stored = readStored<Theme>(THEME_KEY, ["light", "dark"]);
        setIsDarkMode(
            stored ? stored === "dark" : document.documentElement.classList.contains("dark")
        );
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDarkMode);
    }, [isDarkMode]);

    const toggleTheme = useCallback(() => {
        setIsDarkMode((prev) => {
            write(THEME_KEY, prev ? "light" : "dark");
            return !prev;
        });
    }, []);

    return { isDarkMode, toggleTheme };
}

export function usePreferences(initialLocale: Locale = "en") {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [locale, setLocaleState] = useState<Locale>(initialLocale);

    // Hydrate from storage once mounted.
    useEffect(() => {
        const storedTheme = readStored<Theme>(THEME_KEY, ["light", "dark"]);
        if (storedTheme) {
            setIsDarkMode(storedTheme === "dark");
        } else {
            // No explicit choice yet — respect what the inline script already applied.
            setIsDarkMode(document.documentElement.classList.contains("dark"));
        }

        const storedLocale = readStored<Locale>(LOCALE_KEY, ["en", "ru"]);
        if (storedLocale) setLocaleState(storedLocale);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDarkMode);
    }, [isDarkMode]);

    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    const toggleTheme = useCallback(() => {
        setIsDarkMode((prev) => {
            write(THEME_KEY, prev ? "light" : "dark");
            return !prev;
        });
    }, []);

    const setLocale = useCallback((next: Locale) => {
        write(LOCALE_KEY, next);
        setLocaleState(next);
    }, []);

    const toggleLocale = useCallback(() => {
        setLocaleState((prev) => {
            const next: Locale = prev === "en" ? "ru" : "en";
            write(LOCALE_KEY, next);
            return next;
        });
    }, []);

    return { isDarkMode, toggleTheme, locale, setLocale, toggleLocale };
}
