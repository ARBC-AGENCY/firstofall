"use client";

import { useLocale } from "next-intl";

const LOCALES = ["fr", "en"] as const;
type Locale = (typeof LOCALES)[number];

/** Strip any leading locale segment from a pathname */
function stripLocale(pathname: string): string {
  for (const loc of LOCALES) {
    if (pathname === `/${loc}`) return "/";
    if (pathname.startsWith(`/${loc}/`)) return pathname.slice(loc.length + 1);
  }
  return pathname;
}

/**
 * `variant` follows the surface behind it: the default token colours are made
 * for dark backgrounds and wash out on a white header.
 */
export default function LangSwitcher({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  const locale = useLocale() as Locale;
  const light = variant === "light";

  const activeClass = light ? "text-primary font-bold" : "text-primary font-bold";
  const idleClass = light
    ? "text-neutral-500 hover:text-neutral-900"
    : "text-on-surface-variant hover:text-primary";

  function switchLocale(next: Locale) {
    if (next === locale) return;

    // Persist preference — cookie is read by next-intl middleware on every request
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000;SameSite=Lax`;
    // Also keep in localStorage as a client-side fallback
    try { localStorage.setItem("locale", next); } catch {}

    // Build the correct target URL from the raw browser pathname
    const stripped = stripLocale(window.location.pathname);
    const newPath = `/${next}${stripped === "/" ? "" : stripped}`;

    // Full page navigation — guarantees no stale state, no double-prefix
    window.location.href = newPath;
  }

  return (
    <div className="flex items-center gap-1 font-cinzel tracking-widest text-xs">
      <button
        onClick={() => switchLocale("fr")}
        className={`transition-colors duration-300 ${
          locale === "fr" ? activeClass : idleClass
        }`}
        aria-label="Français"
      >
        FR
      </button>
      <span className={light ? "text-neutral-300" : "text-outline-variant"}>|</span>
      <button
        onClick={() => switchLocale("en")}
        className={`transition-colors duration-300 ${
          locale === "en" ? activeClass : idleClass
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
