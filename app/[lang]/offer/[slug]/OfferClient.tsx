"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "@formspree/react";
import { useLeadReply, readEmailFromForm } from "@/hooks/useLeadReply";
import { ArrowLeft, ArrowUpRight, CheckCircle, Loader2 } from "lucide-react";
import { LegalFooter } from "@/components/LegalFooter";
import { ThemeToggle, LocaleSwitch } from "@/components/HeaderControls";
import type { Locale } from "@/lib/i18n";
import type { Offer } from "@/lib/offersData";

const copy = {
    en: {
        back: "SAFARISAEV.AI",
        included: "What you get",
        how: "How it runs",
        forWho: "Worth it if",
        notFor: "Not this if",
        draft: "Draft. This page is not published or indexed yet.",
        name: "Name",
        email: "Email",
        brief: "Which process hurts?",
        briefHint: "A few lines is enough. No NDA needed at this stage.",
        sent: "Got it. I'll reply within one working day.",
        failed: "Could not send. Please email saf@safarisaev.ai instead.",
    },
    ru: {
        back: "SAFARISAEV.AI",
        included: "Что вы получаете",
        how: "Как это устроено",
        forWho: "Стоит брать, если",
        notFor: "Не берите, если",
        draft: "Черновик — страница не опубликована и не индексируется.",
        name: "Имя",
        email: "Email",
        brief: "Какой процесс болит?",
        briefHint: "Достаточно нескольких строк. NDA на этом этапе не нужен.",
        sent: "Принято. Отвечу в течение рабочего дня.",
        failed: "Не удалось отправить. Напишите на saf@safarisaev.ai.",
    },
} satisfies Record<Locale, Record<string, string>>;

function Section({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <section className="container mx-auto px-6 pt-16">
            <div className="grid gap-8 md:grid-cols-[minmax(0,20ch)_minmax(0,1fr)] md:gap-14">
                <h2 className="font-mono text-xl font-bold tracking-tight text-foreground md:text-2xl">
                    {label}
                </h2>
                <div>{children}</div>
            </div>
        </section>
    );
}

export default function OfferClient({
    offer,
    locale,
}: {
    offer: Offer;
    locale: Locale;
}) {
    const t = copy[locale];
    const [state, handleSubmit] = useForm("xzddelvr");
    const [submittedEmail, setSubmittedEmail] = useState("");

    // Read before Formspree takes the event: the form may be unmounted by the
    // time the submission resolves.
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setSubmittedEmail(readEmailFromForm(event.currentTarget));
        handleSubmit(event);
    };

    useLeadReply({
        succeeded: state.succeeded,
        email: submittedEmail,
        source: offer.source,
        locale: locale,
    });
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (state.succeeded) {
            formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [state.succeeded]);

    return (
        <main className="relative min-h-screen overflow-x-hidden">
            <header className="sticky top-0 z-30 border-b border-secondary/20 bg-background/85 backdrop-blur-md">
                <div className="container mx-auto flex items-center justify-between gap-4 px-6 py-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-mono text-xs text-secondary transition-colors hover:text-accent md:text-sm"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        {t.back}
                    </Link>
                    <div className="flex items-center gap-4">
                        <ThemeToggle locale={locale} />
                        <LocaleSwitch locale={locale} />
                    </div>
                </div>
            </header>

            {!offer.published && (
                <p className="border-b border-secondary/20 bg-secondary/10 px-6 py-3 text-center font-mono text-xs text-secondary">
                    {t.draft}
                </p>
            )}

            {/* Hero — price is stated before anything is asked for */}
            <section className="container mx-auto px-6 pb-12 pt-14 md:pt-20">
                <div className="saf-reveal">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                        {offer.eyebrow[locale]}
                    </p>
                    <h1 className="mt-4 max-w-3xl font-mono text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl">
                        {offer.title[locale]}
                    </h1>
                    <p className="mt-7 max-w-2xl font-mono text-base leading-relaxed text-secondary md:text-lg">
                        {offer.lede[locale]}
                    </p>

                    <div className="mt-9 flex flex-col gap-6 border-t border-secondary/20 pt-6 md:flex-row md:items-end md:justify-between">
                        {/* When there is a setup fee it leads: the buyer is purchasing a
                            build they understand, with cheap upkeep after — not a
                            subscription to a dashboard from someone they have not met. */}
                        <div className="flex flex-col gap-3">
                            {offer.setup && (
                                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                                    <span className="font-mono text-4xl font-bold tabular-nums text-foreground md:text-5xl">
                                        {offer.setup.price}
                                    </span>
                                    <span className="max-w-xs font-mono text-sm leading-snug text-secondary">
                                        {offer.setup.note[locale]}
                                    </span>
                                </div>
                            )}
                            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                                <span
                                    className={`font-mono font-bold tabular-nums text-foreground ${
                                        offer.setup ? "text-2xl md:text-3xl" : "text-4xl md:text-5xl"
                                    }`}
                                >
                                    {offer.setup ? `+ ${offer.price}` : offer.price}
                                </span>
                                <span className="max-w-xs font-mono text-sm leading-snug text-secondary">
                                    {offer.priceNote[locale]}
                                </span>
                            </div>
                        </div>

                        {/* A product is bought with the eyes. Words about a screen do not
                            sell a screen — a running instance does. */}
                        {offer.demo && (
                            <a
                                href={offer.demo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex shrink-0 flex-col gap-1 border border-accent/50 px-6 py-3.5 transition-colors hover:bg-accent hover:text-background focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                            >
                                <span className="flex items-center gap-2 font-mono text-sm font-bold text-accent group-hover:text-background">
                                    {offer.demo.label[locale]}
                                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </span>
                                <span className="font-mono text-[11px] leading-snug text-secondary group-hover:text-background/80">
                                    {offer.demo.note[locale]}
                                </span>
                            </a>
                        )}
                    </div>
                </div>
            </section>

            <Section label={t.included}>
                <ul className="border-t border-secondary/20">
                    {offer.deliverables[locale].map((item) => (
                        <li key={item} className="flex gap-5 border-b border-secondary/15 py-5">
                            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                            <p className="font-mono text-sm leading-relaxed text-secondary md:text-[15px]">
                                {item}
                            </p>
                        </li>
                    ))}
                </ul>
            </Section>

            <Section label={t.how}>
                <ol className="border-t border-secondary/20">
                    {offer.process.map((step, i) => (
                        <li
                            key={step.title.en}
                            className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-secondary/15 py-5"
                        >
                            <span className="pt-0.5 font-mono text-xs font-bold tabular-nums text-accent">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <div>
                                <h3 className="font-mono text-sm font-bold text-foreground">
                                    {step.title[locale]}
                                </h3>
                                <p className="mt-2 font-mono text-sm leading-relaxed text-secondary">
                                    {step.body[locale]}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
            </Section>

            {/* Saying who it is not for is what makes the rest believable */}
            <section className="container mx-auto px-6 pt-16">
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="border border-secondary/20 p-6">
                        <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-accent">
                            {t.forWho}
                        </h2>
                        <ul className="mt-5 space-y-4">
                            {offer.forWho[locale].map((item) => (
                                <li key={item} className="font-mono text-sm leading-relaxed text-secondary">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="border border-secondary/20 p-6">
                        <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-secondary">
                            {t.notFor}
                        </h2>
                        <ul className="mt-5 space-y-4">
                            {offer.notFor[locale].map((item) => (
                                <li key={item} className="font-mono text-sm leading-relaxed text-secondary">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="mt-20 border-t border-secondary/20 bg-secondary/[0.03]">
                <div ref={formRef} className="container mx-auto grid gap-10 px-6 py-16 md:grid-cols-2 md:gap-16">
                    <div>
                        <h2 className="font-mono text-2xl font-bold text-foreground md:text-3xl">
                            {offer.ctaTitle[locale]}
                        </h2>
                        <p className="mt-4 max-w-md font-mono text-sm leading-relaxed text-secondary">
                            {offer.ctaBody[locale]}
                        </p>
                        <p className="mt-6 font-mono text-xs text-secondary/70">{t.briefHint}</p>
                    </div>

                    {state.succeeded ? (
                        <div className="flex flex-col items-start justify-center gap-3 border border-accent/40 p-6">
                            <CheckCircle className="h-8 w-8 text-accent" />
                            <p className="font-mono text-sm text-foreground">{t.sent}</p>
                        </div>
                    ) : (
                        <form onSubmit={onSubmit} className="space-y-4">
                            <input type="hidden" name="source" value={offer.source} />
                            <input type="hidden" name="lang" value={locale} />
                            <input type="hidden" name="price" value={offer.price} />

                            <div>
                                <label htmlFor="offer-name" className="mb-2 block font-mono text-xs uppercase tracking-wider text-secondary">
                                    {t.name}
                                </label>
                                <input
                                    id="offer-name"
                                    name="name"
                                    required
                                    className="w-full border border-secondary/25 bg-background px-3 py-2.5 font-mono text-sm text-foreground focus:border-accent focus:outline-none"
                                />
                            </div>

                            <div>
                                <label htmlFor="offer-email" className="mb-2 block font-mono text-xs uppercase tracking-wider text-secondary">
                                    {t.email}
                                </label>
                                <input
                                    id="offer-email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="you@company.com"
                                    className="w-full border border-secondary/25 bg-background px-3 py-2.5 font-mono text-sm text-foreground focus:border-accent focus:outline-none"
                                />
                            </div>

                            <div>
                                <label htmlFor="offer-brief" className="mb-2 block font-mono text-xs uppercase tracking-wider text-secondary">
                                    {t.brief}
                                </label>
                                <textarea
                                    id="offer-brief"
                                    name="brief"
                                    rows={4}
                                    required
                                    className="w-full border border-secondary/25 bg-background px-3 py-2.5 font-mono text-sm text-foreground focus:border-accent focus:outline-none"
                                />
                            </div>

                            {state.errors && (
                                <p className="font-mono text-xs text-efficiency-critical">{t.failed}</p>
                            )}

                            <button
                                type="submit"
                                disabled={state.submitting}
                                className="flex w-full items-center justify-center gap-2 bg-accent px-6 py-3.5 font-mono text-sm font-bold text-background transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {state.submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                                {offer.ctaButton[locale]}
                            </button>
                        </form>
                    )}
                </div>
            </section>

            <LegalFooter locale={locale} />
        </main>
    );
}
