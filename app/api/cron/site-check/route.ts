import { NextRequest, NextResponse } from "next/server";
import { formatReport, runSiteChecks } from "@/lib/siteChecks";

// Node rather than edge: this fans out to eight external sites and needs the
// longer ceiling more than it needs the cold-start saving.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Nightly watch over every site in the portfolio. Scheduled from vercel.json.
 *
 * The endpoint makes outbound requests and can send mail, so it is not public:
 * Vercel Cron presents CRON_SECRET as a bearer token, and without that secret set
 * the route refuses to run at all rather than quietly leaving itself open.
 *
 * Mail only goes out when something is wrong. A healthy night is silent, which is
 * the only way a daily check stays worth reading.
 */
export async function GET(req: NextRequest) {
    const secret = process.env.CRON_SECRET;

    if (!secret) {
        return NextResponse.json(
            { error: "CRON_SECRET is not configured; refusing to run" },
            { status: 503 }
        );
    }
    if (req.headers.get("authorization") !== `Bearer ${secret}`) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { checked, failures } = await runSiteChecks();

    if (failures.length === 0) {
        console.log(`[site-check] ${checked} sites, all healthy`);
        return NextResponse.json({ checked, failures: 0 });
    }

    const report = formatReport(failures);
    console.warn(`[site-check] ${failures.length} of ${checked} need attention\n${report}`);

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.SITE_CHECK_TO ?? "saf@safarisaev.ai";

    if (!apiKey) {
        // Still a useful run: the report is in the deployment logs.
        return NextResponse.json({ checked, failures: failures.length, emailed: false });
    }

    try {
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: process.env.LEAD_REPLY_FROM ?? "Safar Isaev <saf@safarisaev.ai>",
                to: [to],
                subject:
                    failures.length === 1
                        ? `Site check: ${failures[0].site} needs a look`
                        : `Site check: ${failures.length} sites need a look`,
                text: report,
            }),
        });
        if (!response.ok) {
            console.error("[site-check] mail failed", response.status, await response.text());
            return NextResponse.json({ checked, failures: failures.length, emailed: false });
        }
    } catch (error) {
        console.error("[site-check] mail request failed", error);
        return NextResponse.json({ checked, failures: failures.length, emailed: false });
    }

    return NextResponse.json({ checked, failures: failures.length, emailed: true });
}
