import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import EfficiencyIndexClient from "./EfficiencyIndexClient";
import { getDictionary, type Locale } from "@/lib/i18n";

type Props = {
    params: { lang: string };
};

const LOCALES: Locale[] = ["en", "ru"];

function isLocale(lang: string): lang is Locale {
    return (LOCALES as string[]).includes(lang);
}

export const dynamicParams = false;

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
    // Any other segment (/xx/efficiency-index) used to blow up here with
    // "Cannot read properties of undefined" and return a 500 instead of a 404.
    if (!isLocale(lang)) return {};

    const dict = getDictionary(lang);
    const t = dict.efficiencyIndex.text;
    const url = `https://safarisaev.ai/${lang}/efficiency-index`;

    return {
        title: t.title,
        description: t.subtitle,
        alternates: {
            canonical: url,
            languages: {
                en: "https://safarisaev.ai/en/efficiency-index",
                ru: "https://safarisaev.ai/ru/efficiency-index",
            },
        },
        openGraph: {
            title: t.title,
            description: t.subtitle,
            url,
            siteName: "Safar Isaev",
            locale: lang,
            type: "website",
            images: [
                {
                    // Matches the actual file convention asset in this folder.
                    // The previous value pointed at /efficiency-index/opengraph-image.png,
                    // which 404s — every share of this page had a blank preview.
                    url: `/${lang}/efficiency-index/opengraph-image.jpg`,
                    width: 1200,
                    height: 630,
                    alt: t.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: t.title,
            description: t.subtitle,
            images: [`/${lang}/efficiency-index/opengraph-image.jpg`],
        },
    };
}

export async function generateStaticParams() {
    return LOCALES.map((lang) => ({ lang }));
}

export default function Page({ params: { lang } }: Props) {
    if (!isLocale(lang)) notFound();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EfficiencyIndexClient lang={lang} />
        </Suspense>
    );
}
