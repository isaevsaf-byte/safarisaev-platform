import type { Metadata } from "next";
import EfficiencyIndexClient from "./EfficiencyIndexClient";
import { getDictionary } from "@/lib/i18n";
import { Suspense } from "react";

type Props = {
    params: { lang: string };
};

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
    const dict = getDictionary(lang as "en" | "ru");
    const t = dict.efficiencyIndex.text;

    return {
        title: t.title,
        description: t.subtitle,
        openGraph: {
            title: t.title,
            description: t.subtitle,
            url: `https://safarisaev.ai/${lang}/efficiency-index`,
            siteName: 'Safar Isaev AI',
            locale: lang,
            type: 'website',
            images: [
                {
                    url: "/efficiency-index/opengraph-image.png",
                    width: 1200,
                    height: 630,
                    alt: t.title,
                },
            ],
        },
    };
}

export async function generateStaticParams() {
    return [
        { lang: 'en' },
        { lang: 'ru' }
    ];
}

export default function Page({ params: { lang } }: Props) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EfficiencyIndexClient lang={lang as "en" | "ru"} />
        </Suspense>
    );
}
