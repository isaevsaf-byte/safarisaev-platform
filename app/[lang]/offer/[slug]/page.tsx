import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OfferClient from "./OfferClient";
import { offers, type OfferSlug } from "@/lib/offersData";
import { isLocale, LOCALES } from "@/lib/locale";

type Props = { params: { lang: string; slug: string } };

export const dynamicParams = false;

export async function generateStaticParams() {
    return LOCALES.flatMap((lang) =>
        Object.keys(offers).map((slug) => ({ lang, slug }))
    );
}

function resolve(slug: string) {
    return Object.prototype.hasOwnProperty.call(offers, slug)
        ? offers[slug as OfferSlug]
        : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const offer = resolve(params.slug);
    if (!offer || !isLocale(params.lang)) return {};

    const lang = params.lang;
    const title = `${offer.title[lang]} — ${offer.price} | Safar Isaev`;
    const description = offer.lede[lang];
    const languages = {
        en: `https://safarisaev.ai/en/offer/${offer.slug}`,
        ru: `https://safarisaev.ai/ru/offer/${offer.slug}`,
    };

    // A draft offer is reachable by URL for review but must not be indexed or
    // shared until it is switched on in lib/offersData.ts.
    if (!offer.published) {
        return { title, description, robots: { index: false, follow: false } };
    }

    return {
        title,
        description,
        alternates: { canonical: languages[lang], languages },
        openGraph: {
            title,
            description,
            type: "website",
            url: languages[lang],
            siteName: "Safar Isaev",
            locale: lang,
        },
        twitter: { card: "summary_large_image", title, description },
        robots: { index: true, follow: true },
    };
}

export default function OfferPage({ params }: Props) {
    const offer = resolve(params.slug);
    if (!offer || !isLocale(params.lang)) notFound();
    const lang = params.lang;

    const jsonLd = offer.published
        ? {
              "@context": "https://schema.org",
              "@type": "Service",
              name: offer.title[lang],
              description: offer.lede[lang],
              url: `https://safarisaev.ai/${lang}/offer/${offer.slug}`,
              provider: { "@type": "Person", name: "Safar Isaev", url: "https://safarisaev.ai" },
              offers: {
                  "@type": "Offer",
                  price: offer.price.replace(/[^0-9.]/g, ""),
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
              },
          }
        : null;

    return (
        <>
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
            <OfferClient offer={offer} locale={lang} />
        </>
    );
}
