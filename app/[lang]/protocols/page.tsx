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
        title: "System Protocols | Safar Isaev",
        description: "Process mapping, SOP documentation, org structure optimization, and workflow automation design. Eliminate decision paralysis and create scalable operations.",
    },
    ru: {
        title: "Системные протоколы | Сафар Исаев",
        description: "Картирование процессов, документирование SOP, оптимизация оргструктуры и проектирование автоматизации. Устраняет паралич решений и делает операции масштабируемыми.",
    },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    if (!isLocale(params.lang)) return {};
    const { title, description } = COPY[params.lang];
    const languages = alternatesFor("/protocols");

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
    return <ServicePage slug="protocols" locale={params.lang} />;
}
