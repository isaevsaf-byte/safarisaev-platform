import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const { wine } = await req.json()

  if (!wine || typeof wine !== 'string' || wine.length > 200) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
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

  if (!response.ok) {
    return NextResponse.json({ error: 'Anthropic API error' }, { status: 500 })
  }

  const data = await response.json()
  const text = data.content?.[0]?.text ?? ''
  return NextResponse.json({ result: text })
}
