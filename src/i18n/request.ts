import { getRequestConfig } from "next-intl/server";
import type { AbstractIntlMessages } from "next-intl";
import { routing } from "./routing";
import {
  BRAND_MARK,
  BRAND_NAME,
  PARENT_BRAND_MARK,
  PARENT_BRAND_NAME,
  sealPhrase,
} from "@/lib/brand";

type MessageNode = string | MessageNode[] | { [key: string]: MessageNode };

/**
 * Message files store the brand as %BRAND% (name + symbol) and %BRAND_NAME%
 * (bare name) so the same copy serves every deployment. Substituting here, at
 * the single point where messages are loaded, keeps every `t()` call site
 * unchanged — and happens before next-intl parses the ICU syntax, so the
 * tokens deliberately avoid curly braces.
 */
function applyBrand(node: MessageNode, seal: string): MessageNode {
  if (typeof node === "string") {
    // Longer tokens first so a shorter one never consumes part of them.
    return node
      .replaceAll("%PARENT_NAME%", PARENT_BRAND_NAME)
      .replaceAll("%PARENT%", PARENT_BRAND_MARK)
      .replaceAll("%BRAND_NAME%", BRAND_NAME)
      .replaceAll("%BRAND%", BRAND_MARK)
      .replaceAll("%SEAL%", seal);
  }
  if (Array.isArray(node)) {
    return node.map((child) => applyBrand(child, seal));
  }
  return Object.fromEntries(
    Object.entries(node).map(([key, value]) => [key, applyBrand(value, seal)])
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
    messages: applyBrand(messages, sealPhrase(locale)) as AbstractIntlMessages,
  };
});
