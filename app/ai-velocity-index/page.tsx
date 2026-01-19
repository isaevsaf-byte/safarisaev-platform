
import { Metadata } from "next";
import AiVelocityClient from "./AiVelocityClient";

export const metadata: Metadata = {
    title: "AI Velocity Index | Safar Isaev",
    description: "Measure your organization's AI maturity and speed.",
};

export default function AiVelocityPage() {
    return <AiVelocityClient />;
}
