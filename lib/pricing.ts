/**
 * Every published price on the site, in one place.
 *
 * They used to live in several files and drifted apart. The AI Velocity offers
 * carried one set of numbers in the Russian block and another in the English
 * block of the same file — the entry product read $19 in one language and £99 in
 * the other, and both went into the PDF a lead downloads. The portfolio quoted
 * "from £300" while getwebpage.co.uk quoted "from £500" for the same offer.
 *
 * A price appears in exactly one constant here and is read everywhere else.
 * Product names stay localised; the number never is.
 */

/** Website packages. Must match getwebpage.co.uk — it is the same offer. */
export const WEBSITE_FROM_PRICE = "£500";

/** AI Velocity Index offers, keyed by result zone. */
export const AI_OFFER_PRICE = {
    green: "$890",
    yellow: "$290",
    red: "$19",
} as const;

/** The crossed-out anchor shown next to the entry offer. */
export const AI_OFFER_RED_ANCHOR = "$49";
