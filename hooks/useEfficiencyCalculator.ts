import { useState, useMemo, useEffect } from "react";
import { efficiencyData, Lang, Option } from "../components/efficiency-index/data";

export function useEfficiencyCalculator(initialLang: Lang = "en") {
    // We can allow some external control or default to initialLang
    const [lang, setLang] = useState<Lang>(initialLang);

    // Sync state if prop changes (optional, but good for reliable routing update)
    useEffect(() => {
        setLang(initialLang);
    }, [initialLang]);
    const [answers, setAnswers] = useState<Record<number, number>>({}); // questionId -> penalty
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    // We rely on new data structure
    const content = efficiencyData.content[lang];
    const questions = content.questions;
    const currentQuestion = questions[currentQuestionIndex];

    const { start_score, cap_waste } = efficiencyData.meta;

    const score = useMemo(() => {
        const totalPenalty = Object.values(answers).reduce((acc, val) => acc + val, 0);
        const calculatedScore = start_score - totalPenalty;
        const minScore = 100 - cap_waste;
        // Ensure we don't go below minScore even if calculated says so
        return Math.max(calculatedScore, minScore);
    }, [answers, start_score, cap_waste]);

    const wastePercentage = 100 - score;

    // Progress logic
    const progress = useMemo(() => {
        // 10% per question (since there are 10 questions)
        // We want to show progress filling UP.
        // If not started: 0%. After Q1: 10%. After Q10: 100%.
        return Math.min(((currentQuestionIndex) / questions.length) * 100, 100);
    }, [currentQuestionIndex, questions.length]);

    const handleAnswer = (penalty: number) => {
        setAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: penalty,
        }));

        if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex((prev) => prev + 1);
            }, 400);
        } else {
            setTimeout(() => {
                setIsFinished(true);
            }, 400);
        }
    };

    const reset = () => {
        setAnswers({});
        setCurrentQuestionIndex(0);
        setIsFinished(false);
    };

    const goBack = () => {
        if (currentQuestionIndex > 0) {
            setAnswers((prev) => {
                const newAnswers = { ...prev };
                delete newAnswers[questions[currentQuestionIndex - 1].id];
                return newAnswers;
            });
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    return {
        lang,
        setLang,
        score,
        wastePercentage,
        currentQuestion,
        currentQuestionIndex,
        totalQuestions: questions.length,
        isFinished,
        handleAnswer,
        reset,
        progress, // Exposed for progress bar
        goBack,
    };
}
