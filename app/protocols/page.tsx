import { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";

export const metadata: Metadata = {
    alternates: { canonical: `https://safarisaev.ai/protocols` },
    title: "System Protocols | Safar Isaev",
    description: "Process mapping, SOP documentation, org structure optimization, and workflow automation design. Eliminate decision paralysis and create scalable operations.",
    openGraph: {
        title: "System Protocols | Safar Isaev",
        description: "Process mapping, SOP documentation, org structure optimization, and workflow automation design.",
        type: "website",
        url: "https://safarisaev.ai/protocols",
    },
    twitter: {
        card: "summary_large_image",
        title: "System Protocols | Safar Isaev",
        description: "Process mapping, SOP documentation, org structure optimization, and workflow automation design.",
    },
};

export default function Page() {
    return <ServicePage slug="protocols" />;
}
