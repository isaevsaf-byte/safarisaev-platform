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
        title: "Resource Architecture | Safar Isaev",
        description: "Procurement audit, supplier negotiation, vendor management, and cost reduction roadmap. Reduce procurement costs by 20-40% and eliminate duplicate vendors.",
    },
    ru: {
        title: "Архитектура ресурсов | Сафар Исаев",
        description: "Аудит закупок, переговоры с поставщиками, управление вендорами и дорожная карта снижения затрат. Снижает стоимость закупок на 20–40%.",
    },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    if (!isLocale(params.lang)) return {};
    const { title, description } = COPY[params.lang];
    const languages = alternatesFor("/resources");

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
    return <ServicePage slug="resources" locale={params.lang} />;
}
