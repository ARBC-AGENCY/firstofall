import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { BRAND_ID } from "@/lib/brand";

export async function GET(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ reservations: [], waitlist: [], brand: BRAND_ID });
  }

  // Every brand shares one database, so a deployment sees only its own rows
  // unless ?scope=all is asked for explicitly.
  const allBrands = req.nextUrl.searchParams.get("scope") === "all";

  const { getAdminClient } = await import("@/lib/supabase");
  const supabase = getAdminClient();

  const scoped = <T extends { eq: (c: string, v: string) => T }>(query: T) =>
    allBrands ? query : query.eq("brand", BRAND_ID);

  const [{ data: reservations, error: rErr }, { data: waitlist, error: wErr }] =
    await Promise.all([
      scoped(
        supabase
          .from("reservations")
          .select("*")
          .order("created_at", { ascending: false })
      ),
      scoped(
        supabase
          .from("waitlist")
          .select("*")
          .order("created_at", { ascending: false })
      ),
    ]);

  if (rErr) console.error("Supabase reservations fetch error:", rErr);
  if (wErr) console.error("Supabase waitlist fetch error:", wErr);

  return NextResponse.json({
    reservations: reservations ?? [],
    waitlist: waitlist ?? [],
    brand: BRAND_ID,
  });
}
