import { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";

export const metadata: Metadata = {
    alternates: { canonical: `https://safarisaev.ai/resources` },
    title: "Resource Architecture | Safar Isaev",
    description: "Procurement audit, supplier negotiation, vendor management, and cost reduction roadmap. Reduce procurement costs by 20-40% and eliminate duplicate vendors.",
    openGraph: {
        title: "Resource Architecture | Safar Isaev",
        description: "Procurement audit, supplier negotiation, vendor management, and cost reduction roadmap.",
        type: "website",
        url: "https://safarisaev.ai/resources",
    },
    twitter: {
        card: "summary_large_image",
        title: "Resource Architecture | Safar Isaev",
        description: "Procurement audit, supplier negotiation, vendor management, and cost reduction roadmap.",
    },
};

export default function Page() {
    return <ServicePage slug="resources" />;
}
