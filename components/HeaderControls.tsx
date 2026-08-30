"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlitchText } from "@/components/GlitchText";
import { useTheme, rememberLocale } from "@/hooks/usePreferences";
import type { Locale } from "@/lib/i18n";
import { swapLocale } from "@/lib/locale";

const THEME_LABEL: Record<Locale, { light: string; dark: string }> = {
    en: { light: "LIGHT", dark: "DARK" },
    ru: { light: "СВЕТЛАЯ", dark: "ТЁМНАЯ" },
};

export function ThemeToggle({ locale }: { locale: Locale }) {
    const { isDarkMode, toggleTheme } = useTheme();
    const label = THEME_LABEL[locale];

    return (
        <button
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Light mode" : "Dark mode"}
            className="rounded-full p-2 font-mono text-xs text-secondary transition-colors hover:bg-secondary/10 hover:text-foreground"
        >
            {isDarkMode ? label.light : label.dark}
        </button>
    );
}

/**
 * A link between two real URLs, not a state toggle. The old version kept the
 * language in React state, so the Russian version of a page had no address —
 * it could not be shared, bookmarked or indexed.
 */
export function LocaleSwitch({ locale }: { locale: Locale }) {
    const pathname = usePathname();
    const next: Locale = locale === "en" ? "ru" : "en";

    return (
        <Link
            href={swapLocale(pathname ?? "/", next)}
            hrefLang={next}
            onClick={() => rememberLocale(next)}
            aria-label={locale === "en" ? "Переключить на русский" : "Switch to English"}
            className="font-mono text-sm text-secondary transition-colors hover:text-foreground"
        >
            <GlitchText className="text-accent">{locale.toUpperCase()}</GlitchText>
        </Link>
    );
}
