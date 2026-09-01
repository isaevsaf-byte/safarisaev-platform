"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/i18n";
import type { LeadSource } from "@/lib/leadReply";

/**
 * Fires the automatic confirmation once a form has gone through.
 *
 * Deliberately fire-and-forget and deliberately separate from the submission
 * itself: the lead is already captured by Formspree before this runs, so a failure
 * here costs a courtesy email and nothing else. Nothing is shown to the user about
 * it either way, and it can only run once per successful submission.
 */
export function useLeadReply({
    succeeded,
    email,
    source,
    locale,
}: {
    succeeded: boolean;
    email: string;
    source: LeadSource;
    locale: Locale;
}) {
    const alreadySent = useRef(false);

    useEffect(() => {
        if (!succeeded || alreadySent.current) return;
        if (!email || !email.includes("@")) return;

        alreadySent.current = true;

        fetch("/api/lead-reply", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, source, locale }),
            keepalive: true,
        }).catch(() => {
            // The lead is safe regardless. Nothing to recover and nothing to say.
        });
    }, [succeeded, email, source, locale]);
}

/**
 * Reads the email out of a submitted form without the component having to hold it
 * in state. Several of the forms are uncontrolled, so this is the least invasive
 * way to pass the address along.
 */
export function readEmailFromForm(form: HTMLFormElement | null) {
    if (!form) return "";
    const field = form.querySelector<HTMLInputElement>('input[type="email"]');
    return field?.value.trim() ?? "";
}
