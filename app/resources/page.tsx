import { Metadata } from "next";
import ResourcesClient from "./ResourcesClient";

export const metadata: Metadata = {
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

export default function ResourcesPage() {
    return <ResourcesClient />;
}
