import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyClient from "./CaseStudyClient";
import { getProject, getNeighbours, projects } from "@/lib/portfolioData";

type Props = { params: { slug: string } };

// Only the eight slugs in portfolioData exist; anything else is a 404, not a
// server-rendered guess.
export const dynamicParams = false;

export async function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project = getProject(params.slug);
    if (!project) return {};

    const title = `${project.name} — case study | Safar Isaev`;
    const description = project.caseStudy.lede.en;
    const url = `https://safarisaev.ai/portfolio/${project.slug}`;

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            type: "article",
            url,
            siteName: "Safar Isaev",
        },
        twitter: { card: "summary_large_image", title, description },
        robots: { index: true, follow: true },
    };
}

export default function CaseStudyPage({ params }: Props) {
    const project = getProject(params.slug);
    if (!project) notFound();

    const { previous, next, index } = getNeighbours(project.slug);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.name,
        headline: `${project.name} — case study`,
        description: project.caseStudy.lede.en,
        url: `https://safarisaev.ai/portfolio/${project.slug}`,
        about: project.category.en,
        creator: {
            "@type": "Person",
            name: "Safar Isaev",
            url: "https://safarisaev.ai",
        },
        mainEntityOfPage: project.url,
        isPartOf: {
            "@type": "CollectionPage",
            name: "Portfolio | Safar Isaev",
            url: "https://safarisaev.ai/portfolio",
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
            />
        </>
    );
}
