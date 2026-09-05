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

/** Same length out as in, so offsets still point at the original document. */
const blank = (match: string) => " ".repeat(match.length);

/** Strip script, style and comments so a pattern cannot match source code. */
function visibleText(html: string) {
    return html
        .replace(/<(script|style|noscript)[^>]*>[\s\S]*?<\/\1>/gi, blank)
        .replace(/<!--[\s\S]*?-->/g, blank);
}

/**
 * Element ids that some script in the same page refers to.
 *
 * A page may ship placeholder markup on purpose and swap it for the real thing on
 * load. silkbees.co.uk does exactly that with its product photography: the words
 * "Place queens.jpg in media/images/" are in the served HTML and no visitor ever
 * sees them, because a script replaces the element before paint. Reading raw HTML,
 * this checker cannot see that swap, and the first version of it duly reported a
 * healthy site as broken. It would have done so every night, which is how a daily
 * check trains its reader to ignore it.
 *
 * So a placeholder sitting in an element that a script addresses is treated as a
 * fallback rather than a defect. This recognises id-based replacement only: a page
 * that swaps by class or by querySelector would still be reported. That is the
 * honest limit of reading HTML without running it.
 */
function scriptManagedIds(html: string) {
    const scripts = Array.from(html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi))
        .map((match) => match[1])
        .join("\n");

    const managed = new Set<string>();
    if (!scripts.trim()) return managed;

    for (const match of Array.from(html.matchAll(/\sid=["']([^"']+)["']/g))) {
        if (scripts.includes(match[1])) managed.add(match[1]);
    }
    return managed;
}

/** The id of the nearest element opening before `index`, if it carries one. */
function enclosingId(html: string, index: number) {
    const preceding = html.slice(Math.max(0, index - 600), index);
    const opens = Array.from(preceding.matchAll(/<[a-z][^>]*\sid=["']([^"']+)["'][^>]*>/gi));
    return opens.length ? opens[opens.length - 1][1] : null;
}

/** True when at least one match is somewhere no script is going to replace. */
function matchesOutsideFallback(
    text: string,
    html: string,
    pattern: RegExp,
    managed: Set<string>
) {
    const flags = pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`;
    for (const match of Array.from(text.matchAll(new RegExp(pattern.source, flags)))) {
        const id = enclosingId(html, match.index ?? 0);
        if (!id || !managed.has(id)) return true;
    }
    return false;
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
    const managed = scriptManagedIds(html);

    const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
    if (!title) problems.push("no page title");

    for (const { label, pattern } of PLACEHOLDER_PATTERNS) {
        if (matchesOutsideFallback(text, html, pattern, managed)) problems.push(label);
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
