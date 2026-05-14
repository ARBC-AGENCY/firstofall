import { NextRequest, NextResponse } from "next/server";
import { reservationSchema } from "@/lib/validations";

const STAMP_VERSIONS = ["essential", "business", "executive", "exclusive"];

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function emailShell(content: string): string {
  return `<div style="font-family:Georgia,serif;background:#131313;color:#e5e2e1;padding:40px;max-width:600px;margin:0 auto;">${content}<div style="margin-top:32px;height:1px;background:linear-gradient(to right,transparent,#d4af37,transparent);opacity:0.3;"></div><p style="margin-top:16px;font-size:10px;color:#4d4635;text-transform:uppercase;letter-spacing:0.1rem;">© 2026 First of All® — The Sovereign Ledger<br/>EUIPO · OAPI · USPTO · Canada · UK</p></div>`;
}

function dataRow(label: string, value: string): string {
  return `<tr><td style="padding:8px 0;color:#99907c;font-size:12px;text-transform:uppercase;letter-spacing:0.1rem;width:140px;">${label}</td><td style="padding:8px 0;color:#e5e2e1;">${value}</td></tr>`;
}

function versionBadge(version: string): string {
  const label =
    version === "silicon-valley" ? "Silicon Valley" :
    version === "dealer" ? "Revendeur" :
    version.charAt(0).toUpperCase() + version.slice(1);
  return `<span style="display:inline-block;padding:2px 10px;background:#1e1a0e;border:1px solid #d4af37;color:#f2ca50;font-size:11px;text-transform:uppercase;letter-spacing:0.1rem;">${label}</span>`;
}

function adminEmailHtml(data: ReturnType<typeof reservationSchema.parse>): string {
  const typeLabel =
    STAMP_VERSIONS.includes(data.version) ? `Réservation Timbre — ${data.version.toUpperCase()}` :
    data.version === "silicon-valley" ? "Candidature Silicon Valley Africa" :
    "Candidature Revendeur";

  return emailShell(`
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:28px;">
      <h1 style="color:#f2ca50;font-size:20px;margin:0;letter-spacing:0.05rem;">${typeLabel}</h1>
      ${versionBadge(data.version)}
    </div>
    <table style="width:100%;border-collapse:collapse;border-top:1px solid #2a2520;">
      ${dataRow("Nom", escapeHtml(data.name))}
      ${dataRow("Email", `<a href="mailto:${escapeHtml(data.email)}" style="color:#f2ca50;">${escapeHtml(data.email)}</a>`)}
      ${dataRow("Téléphone", data.phone ? escapeHtml(data.phone) : "—")}
      ${dataRow("Pays", escapeHtml(data.country))}
      ${dataRow("Organisation", data.organisation ? escapeHtml(data.organisation) : "—")}
      ${dataRow("Langue", data.locale.toUpperCase())}
      ${data.message ? dataRow("Message", `<span style="font-style:italic;">${escapeHtml(data.message)}</span>`) : ""}
    </table>
  `);
}

function userEmailHtml(data: ReturnType<typeof reservationSchema.parse>): string {
  const isFr = data.locale === "fr";

  if (STAMP_VERSIONS.includes(data.version)) {
    const versionName = data.version.charAt(0).toUpperCase() + data.version.slice(1);
    return emailShell(`
      <h1 style="color:#f2ca50;font-size:22px;margin-bottom:8px;">First of All®</h1>
      <p style="color:#e5e2e1;line-height:1.8;margin-bottom:16px;">${isFr ? `Cher(e) ${escapeHtml(data.name)},` : `Dear ${escapeHtml(data.name)},`}</p>
      <p style="color:#e5e2e1;line-height:1.8;margin-bottom:24px;">
        ${isFr
          ? `Votre réservation pour le timbre <strong style="color:#f2ca50;">First of All® ${versionName}</strong> a bien été enregistrée. Notre équipe vous contactera dans les <strong>48 heures</strong> pour finaliser votre commande.`
          : `Your reservation for the <strong style="color:#f2ca50;">First of All® ${versionName}</strong> stamp has been registered. Our team will contact you within <strong>48 hours</strong> to finalize your order.`}
      </p>
      <p style="color:#99907c;font-size:13px;line-height:1.7;font-style:italic;">
        ${isFr
          ? "First of All® est une marque protégée internationalement. Votre intérêt nous honore."
          : "First of All® is an internationally protected brand. We are honoured by your interest."}
      </p>
    `);
  }

  if (data.version === "silicon-valley") {
    return emailShell(`
      <h1 style="color:#f2ca50;font-size:22px;margin-bottom:8px;">Programme Silicon Valley Africa</h1>
      <p style="color:#e5e2e1;line-height:1.8;margin-bottom:16px;">${isFr ? `Cher(e) ${escapeHtml(data.name)},` : `Dear ${escapeHtml(data.name)},`}</p>
      <p style="color:#e5e2e1;line-height:1.8;margin-bottom:16px;">
        ${isFr
          ? "Votre candidature au <strong style=\"color:#f2ca50;\">Programme Silicon Valley Africa</strong> de First of All® a bien été reçue."
          : "Your application to the <strong style=\"color:#f2ca50;\">First of All® Silicon Valley Africa Program</strong> has been received."}
      </p>
      <p style="color:#e5e2e1;line-height:1.8;margin-bottom:24px;">
        ${isFr
          ? "Notre comité de sélection examinera votre dossier et vous contactera prochainement pour les prochaines étapes."
          : "Our selection committee will review your application and contact you soon regarding next steps."}
      </p>
      <p style="color:#99907c;font-size:13px;line-height:1.7;font-style:italic;">
        ${isFr ? "Nous vous souhaitons bonne chance dans le processus de sélection." : "We wish you the best of luck in the selection process."}
      </p>
    `);
  }

  // dealer
  return emailShell(`
    <h1 style="color:#f2ca50;font-size:22px;margin-bottom:8px;">${isFr ? "Candidature Revendeur" : "Dealer Application"}</h1>
    <p style="color:#e5e2e1;line-height:1.8;margin-bottom:16px;">${isFr ? `Cher(e) ${escapeHtml(data.name)},` : `Dear ${escapeHtml(data.name)},`}</p>
    <p style="color:#e5e2e1;line-height:1.8;margin-bottom:24px;">
      ${isFr
        ? "Votre candidature au réseau de revendeurs <strong style=\"color:#f2ca50;\">First of All®</strong> a bien été enregistrée. Notre équipe commerciale étudiera votre dossier et vous contactera dans les meilleurs délais."
        : "Your application to the <strong style=\"color:#f2ca50;\">First of All®</strong> dealer network has been registered. Our commercial team will review your application and contact you as soon as possible."}
    </p>
  `);
}

function adminSubject(data: ReturnType<typeof reservationSchema.parse>): string {
  if (STAMP_VERSIONS.includes(data.version)) {
    return `[FOA®] Réservation ${data.version.toUpperCase()} — ${data.name} (${data.country})`;
  }
  if (data.version === "silicon-valley") {
    return `[FOA®] Candidature Silicon Valley — ${data.name} (${data.country})`;
  }
  return `[FOA®] Candidature Revendeur — ${data.organisation ?? data.name} (${data.country})`;
}

function userSubject(data: ReturnType<typeof reservationSchema.parse>): string {
  const isFr = data.locale === "fr";
  if (STAMP_VERSIONS.includes(data.version)) {
    const v = data.version.charAt(0).toUpperCase() + data.version.slice(1);
    return isFr ? `First of All® — Réservation ${v} confirmée` : `First of All® — ${v} reservation confirmed`;
  }
  if (data.version === "silicon-valley") {
    return isFr
      ? "First of All® — Votre candidature Silicon Valley Africa"
      : "First of All® — Your Silicon Valley Africa application";
  }
  return isFr ? "First of All® — Votre candidature revendeur" : "First of All® — Your dealer application";
}

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
      }
    }

    // === Resend emails ===
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromEmail = process.env.RESEND_FROM_EMAIL ?? "noreply@firstofall.net";
      const adminEmail = process.env.ADMIN_EMAIL ?? "contact@firstofall.net";

      await Promise.allSettled([
        resend.emails.send({
          from: fromEmail,
          to: adminEmail,
          subject: adminSubject(data),
          html: adminEmailHtml(data),
        }),
        resend.emails.send({
          from: fromEmail,
          to: data.email,
          subject: userSubject(data),
          html: userEmailHtml(data),
        }),
      ]);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Reservation API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
