import { Metadata } from "next";
import AiVelocityClient from "./AiVelocityClient";

type Props = {
    params: { lang: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const isRussian = params.lang === "ru";

    return {
        title: isRussian ? "AI Velocity Index | Сафар Исаев" : "AI Velocity Index | Safar Isaev",
        description: isRussian
            ? "Оцените ваш реальный AI IQ: от 'Пользователя' до 'Архитектора'. 10 стратегических вопросов и персональный план действий."
            : "Assess your real AI IQ: From 'User' to 'Architect'. 10 strategic questions and a personalized action plan.",
        openGraph: {
            title: isRussian ? "AI Velocity Index | Сафар Исаев" : "AI Velocity Index | Safar Isaev",
            description: isRussian
                ? "Оцените ваш AI IQ и получите персональный план действий."
                : "Assess your AI IQ and get a personalized action plan.",
            type: "website",
            url: `https://safarisaev.ai/${params.lang}/ai-velocity-index`,
        },
        twitter: {
            card: "summary_large_image",
            title: isRussian ? "AI Velocity Index | Сафар Исаев" : "AI Velocity Index | Safar Isaev",
            description: isRussian
                ? "Оцените ваш AI IQ и получите персональный план действий."
                : "Assess your AI IQ and get a personalized action plan.",
        },
    };
}

export default function AiVelocityPage({ params }: Props) {
    return <AiVelocityClient initialLang={params.lang === "ru" ? "ru" : "en"} />;
}
