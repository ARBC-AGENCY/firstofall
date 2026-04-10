"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

export default function SiliconValleyForm() {
  const t = useTranslations("siliconValley");
  const locale = useLocale();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    organisation: "",
    project: "",
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
          version: "silicon-valley",
          locale,
          gdpr: true,
          message: form.project,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-10">
        <span className="material-symbols-outlined text-primary text-5xl mb-4 block font-light">
          verified
        </span>
        <p className="text-on-surface font-cinzel">{t("form.success")}</p>
      </div>
    );
  }

  return (
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
        <label className="label-md text-neutral-500 block mb-2">{t("form.organisation")}</label>
        <input type="text" value={form.organisation} onChange={(e) => setForm({ ...form, organisation: e.target.value })} className={inputClass} />
      </div>
      <div>
        <label className="label-md text-neutral-500 block mb-2">{t("form.project")} *</label>
        <textarea required rows={4} value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} className={`${inputClass} resize-none`} />
      </div>

      {status === "error" && <p className="text-error text-xs">{t("form.error")}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full primary-cta-gradient text-on-primary py-4 font-cinzel font-bold tracking-widest uppercase text-sm hover:opacity-90 transition-all duration-300 disabled:opacity-50"
      >
        {status === "loading" ? "..." : t("form.submit")}
      </button>
    </form>
  );
}
