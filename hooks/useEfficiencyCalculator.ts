import { useState, useMemo, useEffect, useRef } from "react";
import { efficiencyData, Lang } from "../components/efficiency-index/data";

export function useEfficiencyCalculator(initialLang: Lang = "en") {
    const [lang, setLang] = useState<Lang>(initialLang);

    // Sync state if prop changes
    useEffect(() => {
        setLang(initialLang);
    }, [initialLang]);

    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const content = efficiencyData.content[lang];
    const questions = content.questions;
    const currentQuestion = questions[currentQuestionIndex];

    const { start_score, cap_waste } = efficiencyData.meta;

    const score = useMemo(() => {
        const totalPenalty = Object.values(answers).reduce((acc, val) => acc + val, 0);
        const calculatedScore = start_score - totalPenalty;
        const minScore = 100 - cap_waste;
        return Math.max(calculatedScore, minScore);
    }, [answers, start_score, cap_waste]);

    const wastePercentage = useMemo(() => Math.round((100 - score) / 3), [score]);

    const progress = useMemo(() => {
        return Math.min(((currentQuestionIndex) / questions.length) * 100, 100);
    }, [currentQuestionIndex, questions.length]);

    const handleAnswer = (penalty: number) => {
        setAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: penalty,
        }));

        if (timerRef.current) clearTimeout(timerRef.current);

        if (currentQuestionIndex < questions.length - 1) {
            timerRef.current = setTimeout(() => {
                setCurrentQuestionIndex((prev) => prev + 1);
            }, 400);
        } else {
            timerRef.current = setTimeout(() => {
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
        progress,
        goBack,
    };
}
