import { createHash } from "crypto";
import { cookies } from "next/headers";

export function getSessionToken(): string {
  const secret = process.env.ADMIN_SESSION_SECRET ?? "";
  return createHash("sha256").update(`foa-admin:${secret}`).digest("hex");
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session) return false;
  return session.value === getSessionToken();
}
