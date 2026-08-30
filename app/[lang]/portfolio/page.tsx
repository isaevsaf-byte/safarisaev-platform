import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PortfolioClient from "./PortfolioClient";
import { projects, tools, WEBSITE_FROM_PRICE } from "@/lib/portfolioData";
import { alternatesFor, isLocale, localeParams } from "@/lib/locale";

type Props = { params: { lang: string } };

export const dynamicParams = false;

export async function generateStaticParams() {
    return localeParams();
}

const COPY = {
    en: {
        title: "Portfolio | Safar Isaev",
        description: `Websites and internal tools built for founders, brands and operators — ${projects.length} live sites and ${tools.length} products. Every one designed and built end to end by one person. From ${WEBSITE_FROM_PRICE}.`,
    },
    ru: {
        title: "Работы | Сафар Исаев",
        description: `Сайты и инструменты для основателей, брендов и операционных команд — ${projects.length} живых сайта и ${tools.length} продукта. Каждый сделан целиком одним человеком. От ${WEBSITE_FROM_PRICE}.`,
    },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    if (!isLocale(params.lang)) return {};
    const { title, description } = COPY[params.lang];
    const languages = alternatesFor("/portfolio");

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

export default function PortfolioPage({ params }: Props) {
    if (!isLocale(params.lang)) notFound();
    const lang = params.lang;

    // Machine-readable index of the work, so the page can win a rich result
    // instead of sitting behind an empty client-rendered shell.
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: COPY[lang].title,
        description: COPY[lang].description,
        url: alternatesFor("/portfolio")[lang],
        inLanguage: lang,
        mainEntity: {
            "@type": "ItemList",
            itemListElement: projects.map((project, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: project.name,
                url: `https://safarisaev.ai/${lang}/portfolio/${project.slug}`,
                description: project.description[lang],
            })),
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PortfolioClient locale={lang} />
        </>
    );
}
