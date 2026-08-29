import { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";

export const metadata: Metadata = {
    alternates: { canonical: `https://safarisaev.ai/intelligence` },
    title: "Cognitive Intelligence | Safar Isaev",
    description: "AI agent implementation, no-code workflow automation, chatbots, and data processing pipelines. Free 20-30 hours per week per employee with intelligent automation.",
    openGraph: {
        title: "Cognitive Intelligence | Safar Isaev",
        description: "AI agent implementation, no-code workflow automation, chatbots, and data processing pipelines.",
        type: "website",
        url: "https://safarisaev.ai/intelligence",
    },
    twitter: {
        card: "summary_large_image",
        title: "Cognitive Intelligence | Safar Isaev",
        description: "AI agent implementation, no-code workflow automation, chatbots, and data processing pipelines.",
    },
};

export default function Page() {
    return <ServicePage slug="intelligence" />;
}
