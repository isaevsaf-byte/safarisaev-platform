import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";
import { projects, tools, WEBSITE_FROM_PRICE } from "@/lib/portfolioData";

const title = "Portfolio | Safar Isaev";
const description = `Websites and internal tools built for founders, brands and operators — ${projects.length} live sites and ${tools.length} products. Fast, clean, no agency markup. From ${WEBSITE_FROM_PRICE}.`;

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: "https://safarisaev.ai/portfolio",
    },
    openGraph: {
        title,
        description,
        type: "website",
        url: "https://safarisaev.ai/portfolio",
        siteName: "Safar Isaev",
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
    },
    robots: { index: true, follow: true },
};

// Machine-readable index of the work, so the page can win a rich result
// instead of sitting behind an empty client-rendered shell.
const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: "https://safarisaev.ai/portfolio",
    mainEntity: {
        "@type": "ItemList",
        itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: project.name,
            url: project.url,
            description: project.description.en,
        })),
    },
};

export default function PortfolioPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
            />
            <PortfolioClient />
        </>
    );
}
