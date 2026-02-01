import { redirect } from "next/navigation";

// Redirect old URL to new localized URL
export default function AiVelocityPage() {
    redirect("/en/ai-velocity-index");
}
