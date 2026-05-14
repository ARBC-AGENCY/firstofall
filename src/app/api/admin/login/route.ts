import { NextRequest, NextResponse } from "next/server";
import { getSessionToken } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const password = formData.get("password") as string | null;

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.redirect(new URL("/admin?error=1", req.url), 303);
  }

  const token = getSessionToken();
  const res = NextResponse.redirect(new URL("/admin/dashboard", req.url), 303);
  res.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
  return res;
}
