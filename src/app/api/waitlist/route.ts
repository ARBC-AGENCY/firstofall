import { NextRequest, NextResponse } from "next/server";
import { waitlistSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = waitlistSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed" }, { status: 400 });
    }

    const data = parsed.data;

    // Supabase insert
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const { getAdminClient } = await import("@/lib/supabase");
      const supabase = getAdminClient();
      await supabase.from("waitlist").insert([{ name: data.name, email: data.email, locale: data.locale }]);
    }

    // Confirmation email
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromEmail = process.env.RESEND_FROM_EMAIL ?? "noreply@firstofall.net";
      const isFr = data.locale === "fr";

      await resend.emails.send({
        from: fromEmail,
        to: data.email,
        subject: isFr
          ? "First of All® Club — Votre demande a été reçue"
          : "First of All® Club — Your request has been received",
        html: `
          <div style="font-family:Georgia,serif;background:#131313;color:#e5e2e1;padding:40px;max-width:600px;margin:0 auto;">
            <h1 style="color:#f2ca50;font-size:24px;margin-bottom:16px;">Club First of All®</h1>
            <p style="color:#e5e2e1;line-height:1.7;">${isFr ? `Cher(e) ${data.name},` : `Dear ${data.name},`}</p>
            <p style="color:#e5e2e1;line-height:1.7;">
              ${isFr
                ? "Votre demande d'adhésion au Club First of All® a bien été enregistrée. Notre équipe l'examinera et vous contactera prochainement."
                : "Your First of All® Club membership application has been registered. Our team will review it and contact you soon."
              }
            </p>
            <p style="font-size:10px;color:#4d4635;text-transform:uppercase;letter-spacing:0.1rem;margin-top:32px;">© 2026 First of All®</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Waitlist API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
