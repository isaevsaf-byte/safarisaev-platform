import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyClient from "./CaseStudyClient";
import { getProject, getNeighbours, projects } from "@/lib/portfolioData";
import { isLocale, LOCALES } from "@/lib/locale";

type Props = { params: { lang: string; slug: string } };

export const dynamicParams = false;

export async function generateStaticParams() {
    return LOCALES.flatMap((lang) => projects.map((project) => ({ lang, slug: project.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project = getProject(params.slug);
    if (!project || !isLocale(params.lang)) return {};

    const lang = params.lang;
    const title =
        lang === "ru"
            ? `${project.name} — кейс | Сафар Исаев`
            : `${project.name} — case study | Safar Isaev`;
    const description = project.caseStudy.lede[lang];
    const languages = {
        en: `https://safarisaev.ai/en/portfolio/${project.slug}`,
        ru: `https://safarisaev.ai/ru/portfolio/${project.slug}`,
    };

    return {
        title,
        description,
        alternates: { canonical: languages[lang], languages },
        openGraph: {
            title,
            description,
            type: "article",
            url: languages[lang],
            siteName: "Safar Isaev",
            locale: lang,
        },
        twitter: { card: "summary_large_image", title, description },
        robots: { index: true, follow: true },
    };
}

export default function CaseStudyPage({ params }: Props) {
    const project = getProject(params.slug);
    if (!project || !isLocale(params.lang)) notFound();
    const lang = params.lang;

    const { previous, next, index } = getNeighbours(project.slug);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.name,
        headline: `${project.name} — case study`,
        description: project.caseStudy.lede[lang],
        url: `https://safarisaev.ai/${lang}/portfolio/${project.slug}`,
        about: project.category.en,
        inLanguage: lang,
        creator: { "@type": "Person", name: "Safar Isaev", url: "https://safarisaev.ai" },
        mainEntityOfPage: project.url,
        isPartOf: {
            "@type": "CollectionPage",
            name: "Portfolio | Safar Isaev",
            url: `https://safarisaev.ai/${lang}/portfolio`,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CaseStudyClient
                project={project}
                previous={previous}
                next={next}
                position={index + 1}
                total={projects.length}
                locale={lang}
            />
        </>
    );
}
