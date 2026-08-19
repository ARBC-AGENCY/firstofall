import { getRequestConfig } from "next-intl/server";
import type { AbstractIntlMessages } from "next-intl";
import { routing } from "./routing";
import { BRAND_MARK, BRAND_NAME } from "@/lib/brand";

type MessageNode = string | MessageNode[] | { [key: string]: MessageNode };

/**
 * Message files store the brand as %BRAND% (name + symbol) and %BRAND_NAME%
 * (bare name) so the same copy serves every deployment. Substituting here, at
 * the single point where messages are loaded, keeps every `t()` call site
 * unchanged — and happens before next-intl parses the ICU syntax, so the
 * tokens deliberately avoid curly braces.
 */
function applyBrand(node: MessageNode): MessageNode {
  if (typeof node === "string") {
    return node.replaceAll("%BRAND%", BRAND_MARK).replaceAll("%BRAND_NAME%", BRAND_NAME);
  }
  if (Array.isArray(node)) {
    return node.map(applyBrand);
  }
  return Object.fromEntries(
    Object.entries(node).map(([key, value]) => [key, applyBrand(value)])
  );
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "fr" | "en")) {
    locale = routing.defaultLocale;
  }
  const messages = (await import(`../messages/${locale}.json`)).default;
  return {
    locale,
    messages: applyBrand(messages) as AbstractIntlMessages,
  };
});
