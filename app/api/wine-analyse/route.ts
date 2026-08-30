import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rateLimit'

export const runtime = 'edge'

/**
 * Guards on this route, in order of what they stop:
 *
 *  1. Bad JSON            — used to throw and return a full Next.js 500 error page.
 *  2. Cross-origin abuse  — the endpoint spends real Anthropic credit per call and
 *                           was callable by anyone who found the URL.
 *  3. Burst abuse         — a per-IP window.
 *
 * The limiter uses Upstash Redis / Vercel KV when the credentials are set and
 * falls back to an in-isolate counter otherwise — see lib/rateLimit.ts.
 */

const ALLOWED_ORIGINS = [
  'https://safarisaev.ai',
  'https://www.safarisaev.ai',
]

const RATE_LIMIT = 8 // requests
const RATE_WINDOW_MS = 60_000 // per minute, per IP

function isAllowedOrigin(req: NextRequest): boolean {
  // Local development has no fixed origin worth pinning.
  if (process.env.NODE_ENV !== 'production') return true

  const origin = req.headers.get('origin')
  if (origin) return ALLOWED_ORIGINS.includes(origin)

  // Same-origin form posts may omit Origin; fall back to Referer.
  const referer = req.headers.get('referer')
  return !!referer && ALLOWED_ORIGINS.some((allowed) => referer.startsWith(allowed))
}

export async function POST(req: NextRequest) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'

  const limit = await rateLimit(`wine:${ip}`, {
    limit: RATE_LIMIT,
    windowMs: RATE_WINDOW_MS,
  })

  if (limit.limited) {
    return NextResponse.json(
      { error: 'Too many requests. Try again in a minute.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(limit.retryAfter || 60),
          'X-RateLimit-Limit': String(RATE_LIMIT),
          'X-RateLimit-Remaining': '0',
        },
      }
    )
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('[wine-analyse] ANTHROPIC_API_KEY is not configured')
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  let wine: unknown
  try {
    const body = await req.json()
    wine = (body as { wine?: unknown })?.wine
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (typeof wine !== 'string' || wine.trim().length === 0 || wine.length > 200) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  let response: Response
  try {
    response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: `You are a fine wine procurement analyst for a high-end wine merchant (like Hedonism Wines in Mayfair). Your job is to give concise, sharp sourcing intelligence — not investment advice for collectors, but buying guidance for a merchant's desk.

Context you know:
- Liv-ex Fine Wine 100 has risen 6 consecutive months as of Q1 2026, now +2.8% since July 2025
- Market still ~27% below its 2022 peak — still in early recovery
- Bid:offer ratio hit 1.10 (highest since Oct 2022) — buyers are engaged
- Trade vs quote gap narrowed from -8% to -2.8% — sellers meeting the bid
- Burgundy: 31.8% of Jan trade value — demand strong but prices ran
- Champagne: Dom Pérignon 2015 +2.2% MoM, Krug 2004 +10.7% MoM
- Bordeaux: 2016 vintage +1.9%, 2022 +1.5%
- Italy: Most resilient sub-index through the correction
- 80% of Liv-ex trade value sits in just 2% of wines

Give your analysis in this exact structure:
1. One line: SIGNAL: [BUY / HOLD / WAIT] — one sentence why
2. SOURCING: 2-3 sentences on where/how to source this wine (geography, channel, timing)
3. PROVENANCE NOTE: one sentence on any provenance or storage considerations
4. WATCH FOR: one short sentence on the main risk

Be direct, specific, and short. No fluff. Sound like a sharp buyer, not a journalist.`,
        messages: [{ role: 'user', content: `Analyse this wine for sourcing: ${wine}` }],
      }),
    })
  } catch (err) {
    console.error('[wine-analyse] upstream request failed', err)
    return NextResponse.json({ error: 'Upstream unavailable' }, { status: 502 })
  }

  if (!response.ok) {
    // Log the detail server-side; never hand the upstream body to the client.
    console.error('[wine-analyse] Anthropic error', response.status, await response.text())
    return NextResponse.json({ error: 'Analysis failed' }, { status: 502 })
  }

  try {
    const data = await response.json()
    const text = data.content?.[0]?.text ?? ''
    return NextResponse.json({ result: text })
  } catch {
    return NextResponse.json({ error: 'Malformed upstream response' }, { status: 502 })
  }
}
