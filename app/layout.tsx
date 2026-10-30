import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { legalEntity } from "@/lib/legal";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Safar Isaev — Software, web and video projects built with AI",
    description: "Small software, web and video projects built with AI by Safar Isaev, published under OPTIFLOW LABS LTD.",
    metadataBase: new URL("https://safarisaev.ai"),
    alternates: { canonical: "https://safarisaev.ai" },
    openGraph: {
        title: "Safar Isaev — Software, web and video projects built with AI",
        description: "Small software, web and video projects built with AI by Safar Isaev.",
        type: "website",
        url: "https://safarisaev.ai",
        siteName: "Safar Isaev",
    },
    twitter: {
        card: "summary_large_image",
        title: "Safar Isaev — Software, web and video projects built with AI",
        description: "Small software, web and video projects built with AI by Safar Isaev.",
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
    description: "Builds small software, web and video projects with AI.",
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
        "Software development",
        "Web development",
        "Video production",
        "AI tools",
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
                {/* Cookieless and aggregate: no cookie, no cross-site identifier, no
                    profile. Chosen over a product-analytics SDK so the site needs no
                    consent banner and the privacy notice stays short and true.
                    Both need switching on in the Vercel project before data flows. */}
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
