import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { buildReply, isLeadSource } from "@/lib/leadReply";
import { isLocale } from "@/lib/locale";

export const runtime = "edge";

/**
 * Sends the automatic first reply after a form submission.
 *
 * This is deliberately NOT the lead capture path. Forms still post to Formspree
 * exactly as before, and the client calls this afterwards without waiting for it.
 * If this route is down, misconfigured or slow, the lead is already safe.
 *
 * An endpoint that emails an arbitrary address on request is a spam cannon, so it
 * is fenced on four sides: same-origin only, a hard per-IP limit, a fixed set of
 * message bodies the caller cannot influence, and one recipient per request. The
 * caller chooses which of five templates to send and to which address. It cannot
 * write a single word of the message.
 *
 * Nothing is sent until RESEND_API_KEY is set. Until then the route answers
 * honestly that replies are not configured, and the form still works.
 */

const ALLOWED_ORIGINS = ["https://safarisaev.ai", "https://www.safarisaev.ai"];

// Deliberately tight. A person submits one form, not six.
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000;

const FROM = process.env.LEAD_REPLY_FROM ?? "Safar Isaev <saf@safarisaev.ai>";

function isAllowedOrigin(req: NextRequest) {
    if (process.env.NODE_ENV !== "production") return true;
    const origin = req.headers.get("origin");
    if (origin) return ALLOWED_ORIGINS.includes(origin);
    const referer = req.headers.get("referer");
    return !!referer && ALLOWED_ORIGINS.some((allowed) => referer.startsWith(allowed));
}

/** Conservative on purpose: a bad address here is a bounce against our domain. */
function isPlausibleEmail(value: string) {
    return /^[^\s@,;]+@[^\s@,;.]+\.[^\s@,;]{2,}$/.test(value) && value.length <= 254;
}

export async function POST(req: NextRequest) {
    if (!isAllowedOrigin(req)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        req.headers.get("x-real-ip") ||
        "unknown";

    const limit = await rateLimit(`lead-reply:${ip}`, {
        limit: RATE_LIMIT,
        windowMs: RATE_WINDOW_MS,
    });
    if (limit.limited) {
        return NextResponse.json(
            { error: "Too many requests" },
            { status: 429, headers: { "Retry-After": String(limit.retryAfter || 3600) } }
        );
    }

    let body: { email?: unknown; source?: unknown; locale?: unknown };
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const email = typeof body.email === "string" ? body.email.trim() : "";
    const source = typeof body.source === "string" ? body.source : "";
    const locale = typeof body.locale === "string" ? body.locale : "en";

    if (!isPlausibleEmail(email) || !isLeadSource(source) || !isLocale(locale)) {
        return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
        // Not an error: the site is expected to run without replies configured.
        return NextResponse.json({ sent: false, reason: "not-configured" });
    }

    const reply = buildReply(source, locale);

    try {
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: FROM,
                to: [email],
                reply_to: "saf@safarisaev.ai",
                subject: reply.subject,
                text: reply.text,
                html: reply.html,
            }),
        });

        if (!response.ok) {
            console.error("[lead-reply] provider error", response.status, await response.text());
            return NextResponse.json({ sent: false }, { status: 502 });
        }
    } catch (error) {
        console.error("[lead-reply] request failed", error);
        return NextResponse.json({ sent: false }, { status: 502 });
    }

    return NextResponse.json({ sent: true });
}
