import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Deliberately narrow: only the root and locale-prefixed paths. This can
  // never intercept /admin, /api, /_next or static assets.
  matcher: ["/", "/(fr|en)/:path*"],
};
