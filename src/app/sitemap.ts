import type { MetadataRoute } from "next";
import { LOCALES, SITE_URL, localeUrl } from "@/lib/seo";

/** Routes without their locale prefix, with a rough crawl priority. */
const ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/collection", priority: 0.9 },
  { path: "/collection/essential", priority: 0.7 },
  { path: "/collection/business", priority: 0.7 },
  { path: "/collection/executive", priority: 0.7 },
  { path: "/collection/exclusive", priority: 0.7 },
  { path: "/univers", priority: 0.6 },
  { path: "/univers/notre-histoire", priority: 0.6 },
  { path: "/univers/engagements", priority: 0.5 },
  { path: "/dealers", priority: 0.6 },
  { path: "/club", priority: 0.5 },
  { path: "/silicon-valley", priority: 0.6 },
  { path: "/actualites", priority: 0.5 },
  { path: "/legal", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap(({ path, priority }) =>
    LOCALES.map((locale) => ({
      url: localeUrl(locale, path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      // Tells search engines the two locales are translations of one another
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, localeUrl(l, path)])
        ),
      },
    }))
  );
}

export const dynamic = "force-static";
export { SITE_URL };
