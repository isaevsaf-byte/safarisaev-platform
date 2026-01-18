import type { Metadata } from "next";
import EfficiencyIndexClient from "./EfficiencyIndexClient";
import { getDictionary } from "@/lib/i18n";

type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const lang = (searchParams?.lang === "ru" || searchParams?.lang === "en") ? (searchParams.lang as "ru" | "en") : "en";
    const dict = getDictionary(lang);
    const t = dict.efficiencyIndex.text;

    return {
        title: t.title,
        description: t.subtitle,
        openGraph: {
            title: t.title,
            description: t.subtitle,
            url: `https://safarisaev.ai/efficiency-index?lang=${lang}`,
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

export default function Page() {
    return <EfficiencyIndexClient />;
}
