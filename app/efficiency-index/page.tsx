import type { Metadata } from "next";
import EfficiencyIndexClient from "./EfficiencyIndexClient";
import { efficiencyData } from "../../components/efficiency-index/data";

type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const lang = (searchParams?.lang === "ru" || searchParams?.lang === "en") ? searchParams.lang : "en";
    const dict = efficiencyData.content[lang].text;

    return {
        title: dict.title,
        description: dict.subtitle,
        openGraph: {
            title: dict.title,
            description: dict.subtitle,
            type: "website",
            images: [
                {
                    url: "/efficiency-index/opengraph-image.png",
                    width: 1200,
                    height: 630,
                    alt: dict.title,
                },
            ],
        },
    };
}

export default function Page() {
    return <EfficiencyIndexClient />;
}
