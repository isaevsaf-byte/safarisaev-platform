import type { Metadata } from "next";
import { legalEntity } from "@/lib/legal";
import { APP_NAME_EN } from "./content";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
    title: `Privacy Policy — ${APP_NAME_EN} | ${legalEntity.name}`,
    description: `Privacy policy for the ${APP_NAME_EN} nutrition and weight tracking app, operated by ${legalEntity.name}. Health data stays on your device unless you enable a feature that sends it.`,
    alternates: {
        canonical: "https://safarisaev.ai/privacy",
    },
    openGraph: {
        title: `Privacy Policy — ${APP_NAME_EN}`,
        description: `Privacy policy for the ${APP_NAME_EN} app, operated by ${legalEntity.name}.`,
        type: "website",
        url: "https://safarisaev.ai/privacy",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function PrivacyPage() {
    return <PrivacyClient />;
}
