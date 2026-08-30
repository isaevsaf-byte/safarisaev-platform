import { ImageResponse } from "next/og";
import { getProject, projects } from "@/lib/portfolioData";
import { isLocale, LOCALES } from "@/lib/locale";

// Every case study shares with a generic site-wide preview until it has its own
// card. Generated here from the case data, so it can never drift out of sync
// with the page and needs no design file.
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Case study — Safar Isaev";

export function generateStaticParams() {
    return LOCALES.flatMap((lang) => projects.map((project) => ({ lang, slug: project.slug })));
}

export default function Image({ params }: { params: { lang: string; slug: string } }) {
    const project = getProject(params.slug);
    const lang = isLocale(params.lang) ? params.lang : "en";

    const name = project?.name ?? "Safar Isaev";
    const category = project?.category[lang] ?? "";
    const description = project?.description[lang] ?? "";
    const label = lang === "ru" ? "КЕЙС" : "CASE STUDY";

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: "#050505",
                    color: "#E5E5E5",
                    padding: "72px 80px",
                    fontFamily: "monospace",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div
                        style={{
                            display: "flex",
                            gap: 18,
                            fontSize: 22,
                            letterSpacing: 6,
                            color: "#00FF94",
                        }}
                    >
                        <span>{label}</span>
                        {category ? <span style={{ color: "#737373" }}>/ {category}</span> : null}
                    </div>

                    <div
                        style={{
                            fontSize: name.length > 18 ? 88 : 108,
                            fontWeight: 700,
                            lineHeight: 1.05,
                            letterSpacing: -2,
                            color: "#FFFFFF",
                        }}
                    >
                        {name}
                    </div>

                    <div
                        style={{
                            fontSize: 30,
                            lineHeight: 1.4,
                            color: "#9A9A9A",
                            maxWidth: 900,
                        }}
                    >
                        {description}
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        borderTop: "1px solid #262626",
                        paddingTop: 26,
                        fontSize: 24,
                        color: "#737373",
                    }}
                >
                    <span style={{ color: "#E5E5E5" }}>SAFARISAEV.AI</span>
                    <span>{project?.url.replace(/^https?:\/\/(www\.)?/, "") ?? ""}</span>
                </div>
            </div>
        ),
        size
    );
}
