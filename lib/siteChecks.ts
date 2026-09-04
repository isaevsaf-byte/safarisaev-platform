import { projects } from "@/lib/portfolioData";

/**
 * A nightly look at every site in the portfolio.
 *
 * This exists because silkbees.co.uk shipped with its product photography
 * commented out and the words "Place queens.jpg in media/images/" rendering in
 * its place. It sat there publicly, linked from the featured card of this site's
 * portfolio, until somebody happened to read the page. Nothing was watching.
 *
 * The checks are deliberately shallow. A site that answers 200 with a title and
 * no placeholder text is almost certainly fine; anything deeper needs a browser
 * and would produce more false alarms than it is worth.
 */

export type CheckFailure = {
    site: string;
    url: string;
    problems: string[];
};

/** Every portfolio project, plus this site. Adding a project adds it to the watch. */
export function watchedSites() {
    return [
        { name: "safarisaev.ai", url: "https://safarisaev.ai" },
        ...projects.map((project) => ({ name: project.name, url: project.url })),
    ];
}

/**
 * Text that should never survive to production. Kept tight on purpose: a noisy
 * checker gets ignored, and an ignored checker is the same as no checker.
 */
const PLACEHOLDER_PATTERNS: { label: string; pattern: RegExp }[] = [
    { label: 'unreplaced image placeholder ("Place …jpg in …")', pattern: /Place\s+[\w-]+\.(jpe?g|png|webp|svg)\s+in\s+/i },
    { label: "lorem ipsum", pattern: /lorem\s+ipsum/i },
    { label: "TODO or FIXME left in the page", pattern: /\b(TODO|FIXME)\b:/ },
    { label: "a NaN reached the page", pattern: /(^|[\s>(:])[+-]?nan\s*%/i },
    { label: "undefined rendered as text", pattern: />\s*undefined\s*</ },
    { label: "an unrendered template expression", pattern: /\{\{\s*[\w.]+\s*\}\}/ },
];

/** Strip script, style and inline JSON so a pattern cannot match source code. */
function visibleText(html: string) {
    return html
        .replace(/<(script|style|noscript)[^>]*>[\s\S]*?<\/\1>/gi, " ")
        .replace(/<!--[\s\S]*?-->/g, " ");
}

export async function checkSite(site: { name: string; url: string }): Promise<CheckFailure | null> {
    const problems: string[] = [];

    let response: Response;
    const startedAt = Date.now();
    try {
        response = await fetch(site.url, {
            redirect: "follow",
            headers: { "User-Agent": "safarisaev.ai site check" },
            signal: AbortSignal.timeout(20_000),
        });
    } catch (error) {
        return {
            site: site.name,
            url: site.url,
            problems: [`unreachable: ${error instanceof Error ? error.message : "request failed"}`],
        };
    }

    const elapsed = Date.now() - startedAt;

    if (!response.ok) {
        problems.push(`responded ${response.status}`);
        return { site: site.name, url: site.url, problems };
    }

    if (elapsed > 8000) {
        problems.push(`slow: ${(elapsed / 1000).toFixed(1)}s to first byte`);
    }

    const html = await response.text();
    const text = visibleText(html);

    const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
    if (!title) problems.push("no page title");

    for (const { label, pattern } of PLACEHOLDER_PATTERNS) {
        if (pattern.test(text)) problems.push(label);
    }

    return problems.length ? { site: site.name, url: site.url, problems } : null;
}

export async function runSiteChecks() {
    const sites = watchedSites();
    const results = await Promise.all(sites.map((site) => checkSite(site)));
    const failures = results.filter((result): result is CheckFailure => result !== null);
    return { checked: sites.length, failures };
}

/** Only ever written when something is wrong. Silence is the healthy state. */
export function formatReport(failures: CheckFailure[]) {
    const lines = [
        failures.length === 1
            ? "One site needs a look."
            : `${failures.length} sites need a look.`,
        "",
        ...failures.flatMap((failure) => [
            `${failure.site} — ${failure.url}`,
            ...failure.problems.map((problem) => `    ${problem}`),
            "",
        ]),
        "Checked nightly. This message is only sent when something is wrong.",
    ];
    return lines.join("\n");
}
