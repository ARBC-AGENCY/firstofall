import { NextRequest, NextResponse } from "next/server";
import { waitlistSchema } from "@/lib/validations";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function emailShell(content: string): string {
  return `<div style="font-family:Georgia,serif;background:#131313;color:#e5e2e1;padding:40px;max-width:600px;margin:0 auto;">${content}<div style="margin-top:32px;height:1px;background:linear-gradient(to right,transparent,#d4af37,transparent);opacity:0.3;"></div><p style="margin-top:16px;font-size:10px;color:#4d4635;text-transform:uppercase;letter-spacing:0.1rem;">© 2026 First of All® — The Sovereign Ledger</p></div>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = waitlistSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed" }, { status: 400 });
    }

    const data = parsed.data;

    // === Supabase insert ===
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const { getAdminClient } = await import("@/lib/supabase");
      const supabase = getAdminClient();
      const { error } = await supabase
        .from("waitlist")
        .insert([{ name: data.name, email: data.email, locale: data.locale, status: "pending" }]);
      if (error) {
        console.error("Supabase waitlist insert error:", error);
      }
    }

    // === Resend emails ===
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromEmail = process.env.RESEND_FROM_EMAIL ?? "noreply@firstofall.net";
      const adminEmail = process.env.ADMIN_EMAIL ?? "contact@firstofall.net";
      const isFr = data.locale === "fr";

      await Promise.allSettled([
        // Admin notification
        resend.emails.send({
          from: fromEmail,
          to: adminEmail,
          subject: `[FOA®] Nouveau membre Club — ${data.name}`,
          html: emailShell(`
            <h1 style="color:#f2ca50;font-size:20px;margin-bottom:24px;">Nouvelle inscription Club</h1>
            <table style="width:100%;border-collapse:collapse;border-top:1px solid #2a2520;">
              <tr><td style="padding:8px 0;color:#99907c;font-size:12px;text-transform:uppercase;width:120px;">Nom</td><td style="padding:8px 0;color:#e5e2e1;">${escapeHtml(data.name)}</td></tr>
              <tr><td style="padding:8px 0;color:#99907c;font-size:12px;text-transform:uppercase;">Email</td><td style="padding:8px 0;color:#e5e2e1;"><a href="mailto:${escapeHtml(data.email)}" style="color:#f2ca50;">${escapeHtml(data.email)}</a></td></tr>
              <tr><td style="padding:8px 0;color:#99907c;font-size:12px;text-transform:uppercase;">Langue</td><td style="padding:8px 0;color:#e5e2e1;">${data.locale.toUpperCase()}</td></tr>
            </table>
          `),
        }),
        // User confirmation
        resend.emails.send({
          from: fromEmail,
          to: data.email,
          subject: isFr
            ? "First of All® Club — Votre inscription est confirmée"
            : "First of All® Club — Your registration is confirmed",
          html: emailShell(`
            <h1 style="color:#f2ca50;font-size:22px;margin-bottom:8px;">Club First of All®</h1>
            <p style="color:#e5e2e1;line-height:1.8;margin-bottom:16px;">${isFr ? `Cher(e) ${escapeHtml(data.name)},` : `Dear ${escapeHtml(data.name)},`}</p>
            <p style="color:#e5e2e1;line-height:1.8;margin-bottom:24px;">
              ${isFr
                ? "Votre inscription au Club First of All® a bien été enregistrée. Notre équipe examinera votre profil et vous contactera prochainement pour les prochaines étapes."
                : "Your First of All® Club registration has been registered. Our team will review your profile and contact you soon with next steps."}
            </p>
            <p style="color:#99907c;font-size:13px;line-height:1.7;font-style:italic;">
              ${isFr ? "Bienvenue dans l'univers d'exception First of All®." : "Welcome to the First of All® world of exception."}
            </p>
          `),
        }),
      ]);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Waitlist API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
