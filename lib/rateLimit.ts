/**
 * Rate limiting for the public API route.
 *
 * The in-memory counter is a stopgap: it lives in one edge isolate, resets on a
 * cold start and is not shared between regions, so a determined caller can walk
 * around it. When Upstash Redis credentials are present it uses those instead —
 * a real, shared quota. Set both to switch over, no code change:
 *
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 *
 * Vercel KV exposes the same REST shape under KV_REST_API_URL / KV_REST_API_TOKEN,
 * and those are read as a fallback.
 */

const REST_URL =
    process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL ?? "";
const REST_TOKEN =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN ?? "";

export const usingSharedStore = Boolean(REST_URL && REST_TOKEN);

type Bucket = { count: number; resetAt: number };
const memory = new Map<string, Bucket>();

function memoryLimit(key: string, limit: number, windowMs: number) {
    const now = Date.now();
    const entry = memory.get(key);

    if (!entry || now > entry.resetAt) {
        memory.set(key, { count: 1, resetAt: now + windowMs });
        return { limited: false, remaining: limit - 1, retryAfter: 0 };
    }

    entry.count += 1;

    // Opportunistic cleanup so the map cannot grow without bound.
    if (memory.size > 5000) {
        for (const [k, v] of memory) if (now > v.resetAt) memory.delete(k);
    }

    if (entry.count > limit) {
        return {
            limited: true,
            remaining: 0,
            retryAfter: Math.ceil((entry.resetAt - now) / 1000),
        };
    }
    return { limited: false, remaining: limit - entry.count, retryAfter: 0 };
}

/**
 * INCR the key, and set the TTL on the first hit of a window. Two commands in
 * one pipeline call so a burst cannot land between them and leave a key with no
 * expiry.
 */
async function sharedLimit(key: string, limit: number, windowMs: number) {
    const seconds = Math.ceil(windowMs / 1000);
    const response = await fetch(`${REST_URL}/pipeline`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${REST_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify([
            ["INCR", key],
            ["EXPIRE", key, String(seconds), "NX"],
            ["TTL", key],
        ]),
        cache: "no-store",
    });

    if (!response.ok) throw new Error(`rate store ${response.status}`);

    const results = (await response.json()) as { result: number }[];
    const count = Number(results[0]?.result ?? 0);
    const ttl = Number(results[2]?.result ?? seconds);

    return {
        limited: count > limit,
        remaining: Math.max(0, limit - count),
        retryAfter: ttl > 0 ? ttl : seconds,
    };
}

export async function rateLimit(
    identifier: string,
    { limit, windowMs }: { limit: number; windowMs: number }
) {
    const key = `rl:${identifier}`;

    if (usingSharedStore) {
        try {
            return await sharedLimit(key, limit, windowMs);
        } catch (error) {
            // A limiter outage must not take the endpoint down with it; fall
            // back to the local counter and say so in the logs.
            console.error("[rateLimit] shared store unavailable, using memory", error);
        }
    }

    return memoryLimit(key, limit, windowMs);
}
