import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localeDetection: true, // reads NEXT_LOCALE cookie to restore preference
});
