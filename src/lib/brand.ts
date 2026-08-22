/**
 * Brand configuration.
 *
 * The same codebase is deployed under several brands (one Vercel project per
 * brand, all pointing at this repository). Everything brand-specific is read
 * from the environment here — nothing else in the app should hardcode a name,
 * a domain or an IP claim.
 *
 * Defaults reproduce the original First of All deployment, so an environment
 * that sets none of these keeps behaving exactly as before.
 */

/** Slug stored in the Supabase `brand` column — must be stable, it partitions the data. */
export const BRAND_ID = process.env.NEXT_PUBLIC_BRAND_ID ?? "first-of-all";

/** Display name, without any trademark symbol. */
export const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME ?? "First of All";

/** Trademark symbol appended to the name. Empty string is valid. */
export const BRAND_SYMBOL = process.env.NEXT_PUBLIC_BRAND_SYMBOL ?? "™";

/** Name + symbol, e.g. "First of All™". */
export const BRAND_MARK = `${BRAND_NAME}${BRAND_SYMBOL}`;

/** Uppercase form used in the admin chrome. */
export const BRAND_MARK_UPPER = `${BRAND_NAME.toUpperCase()}${BRAND_SYMBOL}`;

export const BRAND_DOMAIN = process.env.NEXT_PUBLIC_BRAND_DOMAIN ?? "firstofall.net";

/**
 * Wordmark image, served from /public. Set to an empty string to fall back to
 * the text mark — which is what a brand without a logo asset yet should do,
 * rather than inherit another brand's logo.
 *
 * Intrinsic pixel dimensions, needed by next/image to reserve layout space.
 */
export const BRAND_LOGO =
  process.env.NEXT_PUBLIC_BRAND_LOGO ?? "/brand/first-of-all.png";
export const BRAND_LOGO_WIDTH = Number(
  process.env.NEXT_PUBLIC_BRAND_LOGO_WIDTH ?? 4500
);
export const BRAND_LOGO_HEIGHT = Number(
  process.env.NEXT_PUBLIC_BRAND_LOGO_HEIGHT ?? 1000
);

/**
 * The First of All wordmark is black artwork on transparency, so it vanishes on
 * dark surfaces (the header over the hero, the footer). Inverting flips it to
 * white there. Set to "false" for a logo that already reads on dark.
 */
export const BRAND_LOGO_INVERT_ON_DARK =
  (process.env.NEXT_PUBLIC_BRAND_LOGO_INVERT_ON_DARK ?? "true").toLowerCase() !==
  "false";

/**
 * Browser tab icon. Empty string leaves the browser default, which is what a
 * brand without its own icon should get rather than inheriting another's.
 */
export const BRAND_FAVICON =
  process.env.NEXT_PUBLIC_BRAND_FAVICON ?? "/brand/first-of-all-icon.png";

/**
 * Parent brand — the Maison that carries the invention.
 *
 * Some entities belong to the Maison rather than to the product: the Business
 * Club, the Silicon Valley Program funding, the trademark and company notices,
 * the brand's own history. Those must keep naming the parent even on a
 * sub-brand deployment, so they use the %PARENT% / %PARENT_NAME% tokens
 * instead of %BRAND% / %BRAND_NAME%.
 *
 * On the parent's own deployment these resolve to the same strings, so nothing
 * changes there.
 */
export const PARENT_BRAND_ID = process.env.NEXT_PUBLIC_PARENT_BRAND_ID ?? "first-of-all";
export const PARENT_BRAND_NAME =
  process.env.NEXT_PUBLIC_PARENT_BRAND_NAME ?? "First of All";
export const PARENT_BRAND_SYMBOL = process.env.NEXT_PUBLIC_PARENT_BRAND_SYMBOL ?? "™";
export const PARENT_BRAND_MARK = `${PARENT_BRAND_NAME}${PARENT_BRAND_SYMBOL}`;
export const PARENT_BRAND_URL =
  process.env.NEXT_PUBLIC_PARENT_BRAND_URL ?? "https://firstofall.net";

/** True when this deployment is an invention carried by the parent Maison. */
export const IS_SUB_BRAND = BRAND_ID !== PARENT_BRAND_ID;

/**
 * Header background once the page is scrolled: "light" gives a white bar,
 * "dark" keeps the black one. The header is transparent at the top of the page
 * either way.
 *
 * Chosen per brand so the wordmark stays legible against it.
 */
export const HEADER_SCROLLED_THEME =
  process.env.NEXT_PUBLIC_BRAND_HEADER_SCROLLED === "dark" ? "dark" : "light";

/**
 * Product noun used with the brand name, per language. Set both to an empty
 * string when the brand name already contains the noun — otherwise copy reads
 * "Cachet Cachet Infalsifiable™".
 *
 * Word order differs: French puts the noun first ("sceau First of All™"),
 * English last ("First of All™ seal"), which is why %SEAL% is composed here
 * rather than written into the message files.
 */
const PRODUCT_NOUN_FR = process.env.NEXT_PUBLIC_BRAND_PRODUCT_NOUN_FR ?? "sceau";
const PRODUCT_NOUN_EN = process.env.NEXT_PUBLIC_BRAND_PRODUCT_NOUN_EN ?? "seal";

export function sealPhrase(locale: string): string {
  if (locale === "fr") {
    return PRODUCT_NOUN_FR ? `${PRODUCT_NOUN_FR} ${BRAND_MARK}` : BRAND_MARK;
  }
  return PRODUCT_NOUN_EN ? `${BRAND_MARK} ${PRODUCT_NOUN_EN}` : BRAND_MARK;
}

export const BRAND_CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_BRAND_CONTACT_EMAIL ?? `contact@${BRAND_DOMAIN}`;

/**
 * Whether this brand actually holds the registered IP referenced across the
 * site (EUIPO / OAPI / USPTO / Canada / UK).
 *
 * Those registrations belong to First of All specifically. A brand that does
 * not hold them must not display the jurisdiction badges or the "internationally
 * protected trademark" wording — so this gates that content rather than
 * rebranding it into a false claim.
 */
export const BRAND_HAS_IP =
  (process.env.NEXT_PUBLIC_BRAND_HAS_IP ?? "true").toLowerCase() === "true";
