"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

const LOCALES = ["fr", "en"] as const;
type Locale = (typeof LOCALES)[number];

function stripLocale(pathname: string): string {
  for (const loc of LOCALES) {
    if (pathname === `/${loc}`) return "/";
    if (pathname.startsWith(`/${loc}/`)) return pathname.slice(loc.length + 1);
  }
  return pathname;
}

/**
 * Runs once on mount. If the cookie is missing but localStorage has a saved
 * locale that differs from the current one, redirects to the preferred locale.
 * This bridges the gap when cookies are cleared between sessions.
 */
export default function LocaleBootstrap() {
  const locale = useLocale() as Locale;

  useEffect(() => {
    // Only act if NEXT_LOCALE cookie is absent
    const hasCookie = document.cookie.split(";").some((c) =>
      c.trim().startsWith("NEXT_LOCALE=")
    );
    if (hasCookie) return;

    let saved: string | null = null;
    try { saved = localStorage.getItem("locale"); } catch {}

    if (saved && LOCALES.includes(saved as Locale) && saved !== locale) {
      const stripped = stripLocale(window.location.pathname);
      const newPath = `/${saved}${stripped === "/" ? "" : stripped}`;
      // Set cookie so middleware keeps it for subsequent requests
      document.cookie = `NEXT_LOCALE=${saved};path=/;max-age=31536000;SameSite=Lax`;
      window.location.href = newPath;
    } else {
      // Sync cookie with current locale
      document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000;SameSite=Lax`;
      try { localStorage.setItem("locale", locale); } catch {}
    }
  }, [locale]);

  return null;
}
