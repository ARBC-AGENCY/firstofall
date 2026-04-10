import { NextRequest, NextResponse } from "next/server";
import { reservationSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = reservationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // === Supabase insert ===
    // Only run if Supabase is configured
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const { getAdminClient } = await import("@/lib/supabase");
      const supabase = getAdminClient();
      const { error } = await supabase.from("reservations").insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone ?? null,
          country: data.country,
          organisation: data.organisation ?? null,
          version: data.version,
          message: data.message ?? null,
          locale: data.locale,
          status: "pending",
        },
      ]);
      if (error) {
        console.error("Supabase insert error:", error);
        // Don't fail the request — still send email
      }
    }

    // === Resend email ===
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      const fromEmail = process.env.RESEND_FROM_EMAIL ?? "noreply@firstofall.net";
      const adminEmail = process.env.ADMIN_EMAIL ?? "contact@firstofall.net";

      // Admin notification
      await resend.emails.send({
        from: fromEmail,
        to: adminEmail,
        subject: `[First of All®] Nouvelle Réservation — ${data.version.toUpperCase()}`,
        html: `
          <div style="font-family:Georgia,serif;background:#131313;color:#e5e2e1;padding:40px;max-width:600px;margin:0 auto;">
            <h1 style="color:#f2ca50;font-size:24px;margin-bottom:24px;">Nouvelle Réservation</h1>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#99907c;font-size:12px;text-transform:uppercase;letter-spacing:0.1rem;">Nom</td><td style="padding:8px 0;color:#e5e2e1;">${data.name}</td></tr>
              <tr><td style="padding:8px 0;color:#99907c;font-size:12px;text-transform:uppercase;letter-spacing:0.1rem;">Email</td><td style="padding:8px 0;color:#e5e2e1;">${data.email}</td></tr>
              <tr><td style="padding:8px 0;color:#99907c;font-size:12px;text-transform:uppercase;letter-spacing:0.1rem;">Téléphone</td><td style="padding:8px 0;color:#e5e2e1;">${data.phone ?? "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#99907c;font-size:12px;text-transform:uppercase;letter-spacing:0.1rem;">Pays</td><td style="padding:8px 0;color:#e5e2e1;">${data.country}</td></tr>
              <tr><td style="padding:8px 0;color:#99907c;font-size:12px;text-transform:uppercase;letter-spacing:0.1rem;">Organisation</td><td style="padding:8px 0;color:#e5e2e1;">${data.organisation ?? "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#99907c;font-size:12px;text-transform:uppercase;letter-spacing:0.1rem;">Version</td><td style="padding:8px 0;color:#f2ca50;font-weight:bold;">${data.version.toUpperCase()}</td></tr>
              <tr><td style="padding:8px 0;color:#99907c;font-size:12px;text-transform:uppercase;letter-spacing:0.1rem;">Langue</td><td style="padding:8px 0;color:#e5e2e1;">${data.locale.toUpperCase()}</td></tr>
              <tr><td style="padding:8px 0;color:#99907c;font-size:12px;text-transform:uppercase;letter-spacing:0.1rem;vertical-align:top;">Message</td><td style="padding:8px 0;color:#e5e2e1;">${data.message ?? "—"}</td></tr>
            </table>
            <p style="margin-top:32px;font-size:10px;color:#4d4635;text-transform:uppercase;letter-spacing:0.1rem;">© First of All® — The Sovereign Ledger</p>
          </div>
        `,
      });

      // User confirmation
      const isFr = data.locale === "fr";
      await resend.emails.send({
        from: fromEmail,
        to: data.email,
        subject: isFr
          ? "First of All® — Votre réservation est confirmée"
          : "First of All® — Your reservation is confirmed",
        html: `
          <div style="font-family:Georgia,serif;background:#131313;color:#e5e2e1;padding:40px;max-width:600px;margin:0 auto;">
            <h1 style="color:#f2ca50;font-size:24px;margin-bottom:16px;">First of All®</h1>
            <p style="color:#e5e2e1;line-height:1.7;">
              ${isFr ? `Cher(e) ${data.name},` : `Dear ${data.name},`}
            </p>
            <p style="color:#e5e2e1;line-height:1.7;">
              ${
                isFr
                  ? `Votre réservation pour la <strong style="color:#f2ca50;">${data.version.toUpperCase()}</strong> a bien été enregistrée. Notre équipe vous contactera dans les 48 heures pour finaliser votre commande.`
                  : `Your reservation for the <strong style="color:#f2ca50;">${data.version.toUpperCase()}</strong> has been registered. Our team will contact you within 48 hours to finalize your order.`
              }
            </p>
            <div style="margin:32px 0;height:1px;background:linear-gradient(to right,transparent,#d4af37,transparent);opacity:0.4;"></div>
            <p style="font-size:10px;color:#4d4635;text-transform:uppercase;letter-spacing:0.1rem;">
              ${isFr ? "Marque protégée internationalement" : "Internationally protected trademark"} — EUIPO • OAPI • USPTO • Canada • UK<br/>
              © 2026 First of All®
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Reservation API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
