import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { z } from "zod";

const updateSchema = z.object({
  table: z.enum(["reservations", "waitlist"]),
  id: z.string().uuid(),
  status: z.enum(["pending", "reviewed", "contacted", "completed"]),
  notes: z.string().optional(),
});

export async function PATCH(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { table, id, status, notes } = parsed.data;

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { getAdminClient } = await import("@/lib/supabase");
  const supabase = getAdminClient();

  const update: Record<string, string> = { status };
  if (notes !== undefined) update.notes = notes;

  const { error } = await supabase.from(table).update(update).eq("id", id);

  if (error) {
    console.error("Status update error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
