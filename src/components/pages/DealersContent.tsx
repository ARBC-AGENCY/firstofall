"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function DealersContent() {
  const t = useTranslations("dealers");
  const locale = useLocale();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    organisation: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const inputClass =
    "w-full bg-transparent border-b border-outline-variant/40 text-on-surface text-sm py-3 px-0 focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-neutral-600";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          version: "dealer",
          locale,
          gdpr: true,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <section className="pt-36 pb-20 bg-surface text-center px-6">
        <ScrollReveal>
          <span className="label-md text-primary block mb-4">{t("networkLabel")}</span>
          <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-on-surface mb-6">
            {t("title")}
          </h1>
          <p className="text-neutral-400 text-lg italic font-light max-w-2xl mx-auto leading-relaxed">
            {t("intro")}
          </p>
        </ScrollReveal>
      </section>

      {/* Map placeholder */}
      <section className="h-72 bg-surface-container-lowest flex items-center justify-center border-y border-yellow-900/10">
        <div className="text-center">
          <span className="material-symbols-outlined text-primary text-5xl font-light mb-3 block">
            map
          </span>
          <p className="text-neutral-600 text-sm font-cinzel tracking-widest uppercase">
            {t("mapPlaceholder")}
          </p>
        </div>
      </section>

      {/* Application form */}
      <section className="py-24 bg-surface px-6 md:px-12">
        <div className="max-w-xl mx-auto">
          <ScrollReveal className="mb-10">
            <h2 className="text-3xl font-cinzel font-bold text-on-surface mb-3">
              {t("formTitle")}
            </h2>
            <p className="text-neutral-400 italic font-light leading-relaxed">
              {t("formIntro")}
            </p>
          </ScrollReveal>

          {status === "success" ? (
            <div className="text-center py-10">
              <span className="material-symbols-outlined text-primary text-5xl mb-4 block font-light">
                verified
              </span>
              <p className="text-on-surface font-cinzel">{t("form.success")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="label-md text-neutral-500 block mb-2">{t("form.name")} *</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="label-md text-neutral-500 block mb-2">{t("form.email")} *</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="label-md text-neutral-500 block mb-2">{t("form.phone")}</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="label-md text-neutral-500 block mb-2">{t("form.country")} *</label>
                  <input type="text" required value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div>
                <label className="label-md text-neutral-500 block mb-2">{t("form.organisation")} *</label>
                <input type="text" required value={form.organisation} onChange={(e) => setForm({ ...form, organisation: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="label-md text-neutral-500 block mb-2">{t("form.message")}</label>
                <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} resize-none`} />
              </div>
              {status === "error" && <p className="text-error text-xs">{t("form.error")}</p>}
              <button type="submit" disabled={status === "loading"} className="w-full primary-cta-gradient text-on-primary py-4 font-cinzel font-bold tracking-widest uppercase text-sm hover:opacity-90 transition-all duration-300 disabled:opacity-50">
                {status === "loading" ? "..." : t("form.submit")}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
