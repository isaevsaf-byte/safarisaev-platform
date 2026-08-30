import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/ServicePage";
import { alternatesFor, isLocale, localeParams } from "@/lib/locale";

type Props = { params: { lang: string } };

export const dynamicParams = false;

export async function generateStaticParams() {
    return localeParams();
}

const COPY = {
    en: {
        title: "Cognitive Intelligence | Safar Isaev",
        description: "AI agent implementation, no-code workflow automation, chatbots, and data processing pipelines. Free 20-30 hours per week per employee with intelligent automation.",
    },
    ru: {
        title: "Когнитивный интеллект | Сафар Исаев",
        description: "Внедрение AI-агентов, автоматизация без кода, чат-боты и конвейеры обработки данных. Освобождает 20–30 часов в неделю на сотрудника.",
    },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    if (!isLocale(params.lang)) return {};
    const { title, description } = COPY[params.lang];
    const languages = alternatesFor("/intelligence");

    return {
        title,
        description,
        alternates: { canonical: languages[params.lang], languages },
        openGraph: {
            title,
            description,
            type: "website",
            url: languages[params.lang],
            siteName: "Safar Isaev",
            locale: params.lang,
        },
        twitter: { card: "summary_large_image", title, description },
        robots: { index: true, follow: true },
    };
}

export default function Page({ params }: Props) {
    if (!isLocale(params.lang)) notFound();
    return <ServicePage slug="intelligence" locale={params.lang} />;
}
