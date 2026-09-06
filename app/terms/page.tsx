import type { Metadata } from "next";
import { legalEntity } from "@/lib/legal";
import { APP_NAME_EN } from "./content";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
    title: `Terms of Use — ${APP_NAME_EN} | ${legalEntity.name}`,
    description: `Terms of use for the ${APP_NAME_EN} nutrition and weight tracking app, operated by ${legalEntity.name}. Covers what the app is, subscriptions and automatic renewal, and liability.`,
    alternates: {
        canonical: "https://safarisaev.ai/terms",
    },
    openGraph: {
        title: `Terms of Use — ${APP_NAME_EN}`,
        description: `Terms of use for the ${APP_NAME_EN} app, operated by ${legalEntity.name}.`,
        type: "website",
        url: "https://safarisaev.ai/terms",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function TermsPage() {
    return <TermsClient />;
}
