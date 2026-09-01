import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { LegalFooter } from "@/components/LegalFooter";
import { legalAddressLine, legalEntity } from "@/lib/legal";

export const metadata: Metadata = {
    title: `Legal, company & website privacy | ${legalEntity.name}`,
    description: `safarisaev.ai is owned and operated by ${legalEntity.name}, a private limited company registered in ${legalEntity.jurisdiction} under company number ${legalEntity.companyNumber}.`,
    alternates: {
        canonical: "https://safarisaev.ai/legal",
    },
    openGraph: {
        title: `Legal, company & website privacy | ${legalEntity.name}`,
        description: `Registered company details for ${legalEntity.name}, the operator of safarisaev.ai.`,
        type: "website",
        url: "https://safarisaev.ai/legal",
    },
    robots: {
        index: true,
        follow: true,
    },
};

const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: legalEntity.name,
    legalName: legalEntity.name,
    url: legalEntity.website,
    email: legalEntity.email,
    identifier: {
        "@type": "PropertyValue",
        name: "Companies House company number",
        value: legalEntity.companyNumber,
    },
    address: {
        "@type": "PostalAddress",
        streetAddress: `${legalEntity.registeredOffice[0]}, ${legalEntity.registeredOffice[1]}`,
        addressLocality: "Southampton",
        addressCountry: "GB",
        postalCode: "SO17 1LA",
    },
};

const record: { label: string; value: string; href?: string }[] = [
    { label: "Registered company name", value: legalEntity.name },
    { label: "Company number", value: legalEntity.companyNumber },
    { label: "Entity type", value: legalEntity.entityType },
    { label: "Jurisdiction of registration", value: legalEntity.jurisdiction },
    { label: "Date of incorporation", value: legalEntity.incorporatedOn },
    { label: "Mobile applications", value: legalEntity.apps.join(", ") },
];

export default function LegalPage() {
    return (
        <main className="relative min-h-screen overflow-x-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationJsonLd),
                }}
            />

            {/* Header */}
            <header className="sticky top-0 z-30 border-b border-secondary/20 bg-background/80 backdrop-blur-md">
                <div className="container mx-auto flex items-center justify-between px-6 py-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-mono text-sm text-secondary transition-colors hover:text-accent"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        SAFARISAEV.AI
                    </Link>
                    <span className="font-mono text-xs text-accent">
                        [ENTITY RECORD]
                    </span>
                </div>
            </header>

            <section className="container mx-auto px-6 py-16 md:py-24">
                <div className="max-w-3xl">
                    <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
                        {"// Legal, company & website privacy"}
                    </p>
                    <h1 className="mb-6 font-mono text-3xl font-bold text-foreground md:text-5xl">
                        {legalEntity.name}
                    </h1>
                    <p className="max-w-2xl font-mono text-sm leading-relaxed text-secondary">
                        This website, <span className="text-foreground">safarisaev.ai</span>,
                        is owned and operated by {legalEntity.name}, a private limited
                        company registered in {legalEntity.jurisdiction} under company
                        number {legalEntity.companyNumber}. The company builds and
                        operates business software, AI automation systems, and web
                        platforms, and provides IT and operations consultancy to its
                        clients. All services, tools, and content published on this
                        domain are provided by {legalEntity.name}, which also
                        publishes the mobile application{" "}
                        <span className="text-foreground">
                            {legalEntity.apps.join(", ")}
                        </span>{" "}
                        on the App Store. Its{" "}
                        <Link
                            href="/privacy"
                            className="text-accent transition-colors hover:text-foreground"
                        >
                            privacy policy
                        </Link>{" "}
                        is published on this site.
                    </p>
                </div>


                {/* What the website itself does with data. The policy at /privacy
                    covers the Kalorii app; this covers safarisaev.ai. */}
                <div className="mt-16 max-w-3xl border border-secondary/20">
                    <div className="border-b border-secondary/20 px-6 py-4">
                        <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                            What this website collects
                        </h2>
                    </div>

                    <div className="space-y-6 px-6 py-6 font-mono text-sm leading-relaxed text-secondary">
                        <p>
                            <span className="text-foreground">Visitor numbers.</span>{" "}
                            We count page views and load speed through Vercel Analytics and
                            Speed Insights. Both are cookieless: no cookie is written, no
                            identifier follows you between sites, and no profile is built.
                            What we see is aggregate — which pages were opened, from which
                            country, on what kind of device, and how fast they rendered. We
                            cannot pick an individual visitor out of it, and neither can we
                            connect it to anything you send us.
                        </p>

                        <p>
                            <span className="text-foreground">What you type into a form.</span>{" "}
                            The diagnostics, the audit request and the offer pages each have
                            a form. They send us what you fill in — your email address, and
                            depending on the form a company URL, a short brief, your
                            language, and the result the tool produced for you. Submissions
                            are delivered through Formspree, which acts as our processor and
                            passes them to {legalEntity.email}. Nothing is submitted until
                            you press the button.
                        </p>

                        <p>
                            <span className="text-foreground">A reply you did not ask a human for.</span>{" "}
                            When a form goes through, an automatic email confirms it arrived
                            and says what happens next. It goes only to the address you
                            entered, only once, and carries no tracking pixel. A person
                            replies separately.
                        </p>

                        <p>
                            <span className="text-foreground">The diagnostics themselves.</span>{" "}
                            Your answers to the Efficiency Index and the AI Velocity Index
                            are scored in your browser and are not sent anywhere. The PDF is
                            built on your device. Your answers reach us only if you choose
                            to submit the form afterwards, and then only as the summary the
                            form carries.
                        </p>

                        <p>
                            <span className="text-foreground">What we never do.</span>{" "}
                            No advertising trackers, no third-party pixels, no selling or
                            sharing of anything you send us, no newsletter you did not
                            request. The theme and language you pick are kept in your own
                            browser and never leave it.
                        </p>

                        <p>
                            <span className="text-foreground">Keeping and removing.</span>{" "}
                            Enquiries are kept while a conversation is live and for as long
                            as we may need them for our records afterwards. Write to{" "}
                            <a
                                href={`mailto:${legalEntity.email}`}
                                className="text-accent transition-colors hover:text-foreground"
                            >
                                {legalEntity.email}
                            </a>{" "}
                            to ask for a copy of what we hold about you, a correction, or
                            deletion, and we will act on it.
                        </p>

                        <p className="border-t border-secondary/20 pt-6 text-secondary/80">
                            The mobile application published by this company has a separate
                            and more detailed policy, because it handles health data:{" "}
                            <Link
                                href="/privacy"
                                className="text-accent transition-colors hover:text-foreground"
                            >
                                app privacy policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>

                {/* Registration record */}
                <div className="mt-16 max-w-3xl border border-secondary/20">
                    <div className="border-b border-secondary/20 px-6 py-4">
                        <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                            Registration
                        </h2>
                    </div>
                    <dl>
                        {record.map((row) => (
                            <div
                                key={row.label}
                                className="flex flex-col gap-1 border-b border-secondary/10 px-6 py-4 last:border-b-0 md:flex-row md:items-baseline md:gap-8"
                            >
                                <dt className="font-mono text-xs uppercase tracking-wider text-secondary md:w-72 md:shrink-0">
                                    {row.label}
                                </dt>
                                <dd className="font-mono text-sm text-foreground">
                                    {row.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* Registered office */}
                <div className="mt-8 max-w-3xl border border-secondary/20">
                    <div className="border-b border-secondary/20 px-6 py-4">
                        <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                            Registered office
                        </h2>
                    </div>
                    <address className="px-6 py-5 font-mono text-sm not-italic leading-relaxed text-foreground">
                        {legalEntity.registeredOffice.map((line) => (
                            <span key={line} className="block">
                                {line}
                            </span>
                        ))}
                    </address>
                </div>

                {/* Contact */}
                <div className="mt-8 max-w-3xl border border-secondary/20">
                    <div className="border-b border-secondary/20 px-6 py-4">
                        <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                            Contact
                        </h2>
                    </div>
                    <dl>
                        <div className="flex flex-col gap-1 border-b border-secondary/10 px-6 py-4 md:flex-row md:items-baseline md:gap-8">
                            <dt className="font-mono text-xs uppercase tracking-wider text-secondary md:w-72 md:shrink-0">
                                Email
                            </dt>
                            <dd className="font-mono text-sm">
                                <a
                                    href={`mailto:${legalEntity.email}`}
                                    className="text-accent transition-colors hover:text-foreground"
                                >
                                    {legalEntity.email}
                                </a>
                            </dd>
                        </div>
                        <div className="flex flex-col gap-1 px-6 py-4 md:flex-row md:items-baseline md:gap-8">
                            <dt className="font-mono text-xs uppercase tracking-wider text-secondary md:w-72 md:shrink-0">
                                Correspondence address
                            </dt>
                            <dd className="font-mono text-sm text-foreground">
                                {legalAddressLine}
                            </dd>
                        </div>
                    </dl>
                </div>

                {/* Verification */}
                <div className="mt-8 max-w-3xl border border-accent/30 bg-accent/5 px-6 py-5">
                    <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                        Public register
                    </h2>
                    <p className="mb-4 font-mono text-sm leading-relaxed text-secondary">
                        The details above are published by Companies House, the United
                        Kingdom registrar of companies, and can be verified against the
                        public register.
                    </p>
                    <a
                        href={legalEntity.registerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-sm text-accent transition-colors hover:text-foreground"
                    >
                        Companies House entry for company {legalEntity.companyNumber}
                        <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                </div>
            </section>

            <LegalFooter />
        </main>
    );
}
