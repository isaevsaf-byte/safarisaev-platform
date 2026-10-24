import type { Locale } from "@/lib/i18n";

/**
 * Russian picks the noun form from the number: 1 сайт, 2 сайта, 5 сайтов, 11 сайтов,
 * 21 сайт. A single form hard-coded next to a count that changes is how the
 * portfolio ended up telling Google it had "7 живых сайта".
 */
export function ruPlural(n: number, forms: [one: string, few: string, many: string]) {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return forms[0];
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1];
    return forms[2];
}

export type CountForms = { en: [one: string, other: string]; ru: [one: string, few: string, many: string] };

/** The noun that goes after `n`, in the right form for the locale. */
export function countNoun(n: number, forms: CountForms, locale: Locale) {
    return locale === "ru" ? ruPlural(n, forms.ru) : n === 1 ? forms.en[0] : forms.en[1];
}
