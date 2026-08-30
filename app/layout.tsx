import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { legalEntity } from "@/lib/legal";

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Safar Isaev — Operations & AI Automation",
    description: "I find where a business loses money and time, then build the system that stops it — process design, procurement, and AI automation for founders.",
    metadataBase: new URL("https://safarisaev.ai"),
    alternates: { canonical: "https://safarisaev.ai" },
    openGraph: {
        title: "Safar Isaev — Operations & AI Automation",
        description: "I find where a business loses money and time, then build the system that stops it.",
        type: "website",
        url: "https://safarisaev.ai",
        siteName: "Safar Isaev",
    },
    twitter: {
        card: "summary_large_image",
        title: "Safar Isaev — Operations & AI Automation",
        description: "I find where a business loses money and time, then build the system that stops it.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

// JSON-LD Structured Data
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Safar Isaev",
    jobTitle: "Operations engineer",
    description: "Operations engineer working on process design, procurement and AI automation. Builds the systems rather than only advising on them.",
    url: "https://safarisaev.ai",
    sameAs: [
        "https://t.me/SafarIsaev",
    ],
    worksFor: {
        "@type": "Organization",
        name: legalEntity.name,
        url: legalEntity.website,
    },
    knowsAbout: [
        "Business Operations",
        "Process Optimization",
        "AI Automation",
        "AI Agents",
        "Workflow Automation",
        "Procurement",
        "Resource Management",
    ],
    offers: [
        {
            "@type": "Service",
            name: "System Protocols",
            description: "Process mapping, SOP documentation, org structure optimization, and workflow automation design.",
            url: "https://safarisaev.ai/protocols",
        },
        {
            "@type": "Service",
            name: "Resource Architecture",
            description: "Procurement audit, supplier negotiation, vendor management, and cost reduction roadmap.",
            url: "https://safarisaev.ai/resources",
        },
        {
            "@type": "Service",
            name: "Cognitive Intelligence",
            description: "AI agent implementation, no-code workflow automation, chatbots, and data processing pipelines.",
            url: "https://safarisaev.ai/intelligence",
        },
    ],
};

// Operating legal entity behind safarisaev.ai
const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: legalEntity.name,
    legalName: legalEntity.name,
    url: legalEntity.website,
    email: legalEntity.email,
    identifier: {
        "@type": "PropertyValue",
        name: "Companies House company number",
        value: legalEntity.companyNumber,
    },
    address: {
        "@type": "PostalAddress",
        streetAddress: `${legalEntity.registeredOffice[0]}, ${legalEntity.registeredOffice[1]}`,
        addressLocality: "Southampton",
        addressCountry: "GB",
        postalCode: "SO17 1LA",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* Applies the stored theme before first paint so navigating between
                    pages doesn't flash light-then-dark. Pages read the same key via
                    hooks/usePreferences. */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var t=localStorage.getItem("saf:theme");if(t==="dark")document.documentElement.classList.add("dark");var l=localStorage.getItem("saf:locale");if(l==="ru"||l==="en")document.documentElement.lang=l;}catch(e){}})();`,
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(organizationJsonLd),
                    }}
                />
            </head>
            <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
                {children}
            </body>
        </html>
    );
}
