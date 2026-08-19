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
