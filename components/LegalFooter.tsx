import Link from "next/link";
import { legalEntity, legalFooterLine } from "@/lib/legal";

/**
 * Minimal entity strip appended to pages that carry no full footer.
 * Names the operating company and links to the full record at /legal.
 */
export function LegalFooter({ locale = "en" }: { locale?: "en" | "ru" }) {
    return (
        <footer className="relative z-10 border-t border-secondary/20 py-8">
            <div className="container mx-auto flex flex-col items-center gap-3 px-6 text-center md:flex-row md:justify-between md:text-left">
                <p className="font-mono text-xs leading-relaxed text-secondary">
                    {legalFooterLine}
                </p>
                <div className="flex items-center gap-4 font-mono text-xs">
                    <a
                        href={`mailto:${legalEntity.email}`}
                        className="text-secondary transition-colors hover:text-accent"
                    >
                        {legalEntity.email}
                    </a>
                    <span className="text-secondary/40">{"//"}</span>
                    <Link
                        href="/legal"
                        className="text-accent transition-colors hover:text-foreground"
                    >
                        {locale === "ru" ? "РЕКВИЗИТЫ" : "LEGAL"}
                    </Link>
                    <span className="text-secondary/40">{"//"}</span>
                    <Link
                        href="/privacy"
                        className="text-accent transition-colors hover:text-foreground"
                    >
                        {locale === "ru" ? "ПРИВАТНОСТЬ" : "PRIVACY"}
                    </Link>
                </div>
            </div>
        </footer>
    );
}
