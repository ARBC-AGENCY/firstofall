import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./src/i18n/routing";

const intlMiddleware = createMiddleware(routing);

async function computeSessionToken(): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET ?? "";
  const encoded = new TextEncoder().encode(`foa-admin:${secret}`);
  const buffer = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    const session = req.cookies.get("admin_session");
    const validToken = await computeSessionToken();
    const isAuthenticated = session?.value === validToken;

    if (pathname === "/admin") {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
      const res = NextResponse.next();
      res.headers.set("Cache-Control", "no-store");
      return res;
    }

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    const res = NextResponse.next();
    res.headers.set("Cache-Control", "no-store");
    return res;
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
