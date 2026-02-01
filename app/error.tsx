"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Application error:", error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-background">
            <div className="mb-6 text-8xl">⚠️</div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
                System Error
            </h1>
            <p className="text-lg text-secondary mb-8 max-w-md">
                An unexpected error occurred. Our systems have logged this incident.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={reset}
                    className="px-8 py-4 border border-accent bg-accent/10 text-accent hover:bg-accent hover:text-background transition-colors font-mono text-sm"
                >
                    TRY AGAIN
                </button>
                <a
                    href="/"
                    className="px-8 py-4 border border-secondary text-secondary hover:text-foreground hover:border-foreground transition-colors font-mono text-sm"
                >
                    RETURN HOME
                </a>
            </div>
            {error.digest && (
                <p className="mt-8 text-xs text-secondary/50 font-mono">
                    Error ID: {error.digest}
                </p>
            )}
        </div>
    );
}
