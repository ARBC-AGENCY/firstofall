import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BRAND_DOMAIN, BRAND_MARK } from "@/lib/brand";

export const SITE_URL = `https://${BRAND_DOMAIN}`;
export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];

const OG_LOCALE: Record<string, string> = { fr: "fr_FR", en: "en_US" };

/**
 * Absolute URL for a locale + path, e.g. ("en", "/collection")
 * → https://firstofall.net/en/collection
 */
export function localeUrl(locale: string, path = ""): string {
  const clean = path === "/" ? "" : path;
  return `${SITE_URL}/${locale}${clean}`;
}

/**
 * Every page shares the same shape: a title that the layout template suffixes
 * with the brand, a description, a canonical URL, hreflang alternates for both
 * locales, and Open Graph tags for link previews.
 *
 * `path` is the route without the locale prefix ("" for the home page).
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = localeUrl(locale, path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        // x-default points at the default locale for searchers we can't place
        "x-default": localeUrl("fr", path),
        ...Object.fromEntries(LOCALES.map((l) => [l, localeUrl(l, path)])),
      },
    },
    openGraph: {
      type: "website",
      siteName: BRAND_MARK,
      title,
      description,
      url,
      locale: OG_LOCALE[locale] ?? locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * Convenience wrapper for pages whose title and description live under the
 * `seo` namespace, keyed by page.
 */
export async function metadataFromSeo(
  locale: string,
  key: string,
  path: string
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "seo" });
  return pageMetadata({
    locale,
    path,
    title: t(`${key}.title`),
    description: t(`${key}.description`),
  });
}
