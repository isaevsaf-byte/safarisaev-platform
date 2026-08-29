import { Metadata } from "next";
import { notFound } from "next/navigation";
import AiVelocityClient from "./AiVelocityClient";
import type { Locale } from "@/lib/i18n";

type Props = {
    params: { lang: string };
};

const LOCALES: Locale[] = ["en", "ru"];

function isLocale(lang: string): lang is Locale {
    return (LOCALES as string[]).includes(lang);
}

// Only /en and /ru exist. Anything else 404s instead of silently rendering the
// English page under an arbitrary URL and splitting the page's SEO signals.
export const dynamicParams = false;

export async function generateStaticParams() {
    return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    if (!isLocale(params.lang)) return {};

    const isRussian = params.lang === "ru";
    const title = isRussian ? "AI Velocity Index | Сафар Исаев" : "AI Velocity Index | Safar Isaev";
    const description = isRussian
        ? "Оцените ваш реальный AI IQ: от «Пользователя» до «Архитектора». 10 стратегических вопросов и персональный план действий."
        : "Assess your real AI IQ: From 'User' to 'Architect'. 10 strategic questions and a personalized action plan.";
    const shortDescription = isRussian
        ? "Оцените ваш AI IQ и получите персональный план действий."
        : "Assess your AI IQ and get a personalized action plan.";
    const url = `https://safarisaev.ai/${params.lang}/ai-velocity-index`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: {
                en: "https://safarisaev.ai/en/ai-velocity-index",
                ru: "https://safarisaev.ai/ru/ai-velocity-index",
            },
        },
        openGraph: {
            title,
            description: shortDescription,
            siteName: "Safar Isaev",
            locale: params.lang,
            type: "website",
            url,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: shortDescription,
        },
    };
}

export default function AiVelocityPage({ params }: Props) {
    if (!isLocale(params.lang)) notFound();

    return <AiVelocityClient initialLang={params.lang} />;
}
