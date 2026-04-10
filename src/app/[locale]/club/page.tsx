"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ClubPage() {
  const t = useTranslations("club");
  const locale = useLocale();
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const inputClass =
    "w-full bg-transparent border-b border-outline-variant/40 text-on-surface text-sm py-3 px-0 focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-neutral-600";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 bg-surface text-center px-6">
        <ScrollReveal>
          <div className="w-12 h-[1px] bg-primary mx-auto mb-8" />
          <span className="material-symbols-outlined text-primary text-4xl font-light mb-6 block">
            diamond
          </span>
          <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-on-surface mb-6">
            {t("title")}
          </h1>
          <p className="text-neutral-400 text-lg italic font-light max-w-2xl mx-auto leading-relaxed">
            {t("intro")}
          </p>
        </ScrollReveal>
      </section>

      {/* About */}
      <section className="py-16 bg-surface-container-low px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-on-surface text-lg leading-relaxed mb-8">{t("text")}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Waitlist form */}
      <section className="py-24 bg-surface px-6 md:px-12">
        <div className="max-w-md mx-auto">
          <ScrollReveal className="mb-10 text-center">
            <h2 className="text-2xl font-cinzel font-bold text-on-surface mb-3">
              {t("waitlistTitle")}
            </h2>
            <p className="text-neutral-500 text-sm italic leading-relaxed">
              {t("waitlistText")}
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
                <label className="label-md text-neutral-500 block mb-2">
                  {t("form.name")} *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="label-md text-neutral-500 block mb-2">
                  {t("form.email")} *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>
              {status === "error" && (
                <p className="text-error text-xs">{t("form.error")}</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full border border-primary text-primary py-4 font-cinzel font-bold tracking-widest uppercase text-sm hover:bg-primary/5 transition-all duration-300 disabled:opacity-50"
              >
                {status === "loading" ? "..." : t("form.submit")}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
