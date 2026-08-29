"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Keyboard and focus behaviour every dialog on the site was missing.
 *
 * Before this, none of the modals closed on Escape and none trapped focus, so a
 * keyboard user could Tab straight out of an open dialog onto the page behind the
 * overlay, with no way back and no way to dismiss.
 *
 * Attach the returned ref to the dialog's own container (not the backdrop).
 */
export function useDialog(isOpen: boolean, onClose: () => void) {
    const containerRef = useRef<HTMLDivElement>(null);
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;

    useEffect(() => {
        if (!isOpen) return;

        const previouslyFocused = document.activeElement as HTMLElement | null;
        const { overflow } = document.body.style;
        document.body.style.overflow = "hidden";

        // Move focus into the dialog so the first Tab lands somewhere sensible.
        const focusFirst = () => {
            const node = containerRef.current;
            if (!node) return;
            const target =
                node.querySelector<HTMLElement>(FOCUSABLE) ?? node;
            target.focus({ preventScroll: true });
        };
        const raf = requestAnimationFrame(focusFirst);

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.stopPropagation();
                onCloseRef.current();
                return;
            }

            if (event.key !== "Tab") return;

            const node = containerRef.current;
            if (!node) return;

            const focusable = Array.from(
                node.querySelectorAll<HTMLElement>(FOCUSABLE)
            ).filter((el) => el.offsetParent !== null || el === document.activeElement);
            if (focusable.length === 0) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", onKeyDown);

        return () => {
            cancelAnimationFrame(raf);
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = overflow;
            previouslyFocused?.focus?.({ preventScroll: true });
        };
    }, [isOpen]);

    return containerRef;
}
