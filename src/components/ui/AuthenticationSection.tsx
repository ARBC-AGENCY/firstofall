"use client";

import { useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

type AuthRequestType = "authentication" | "expert" | "quote";

const TYPES: AuthRequestType[] = ["authentication", "expert", "quote"];

/**
 * The authentication request form, rendered inline on the page rather than in
 * a modal: its height follows its fields, so it never scrolls inside itself.
 * The three buttons pick the request type and bring the form into view.
 */
export default function AuthenticationSection() {
  const t = useTranslations("authentication");
  const ts = useTranslations("services");
  const locale = useLocale();
  const formRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    organisation: "",
    type: "authentication" as AuthRequestType,
    message: "",
    gdpr: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function choose(type: AuthRequestType) {
    setForm((f) => ({ ...f, type }));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.gdpr) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          country: form.country,
          organisation: form.organisation,
          version: "authentication",
          // The request type rides in the message so no schema migration is needed
          message: `[${t(`types.${form.type}`)}] ${form.message}`.trim(),
          locale,
          gdpr: form.gdpr,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        country: "",
        organisation: "",
        type: "authentication",
        message: "",
        gdpr: false,
      });
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full bg-transparent border-b border-outline-variant/40 text-on-surface text-sm py-3 px-0 focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-neutral-600";

  const btnBase =
    "px-8 py-4 font-cinzel font-bold tracking-widest uppercase text-sm transition-all duration-300";

  return (
    <div id="request" className="scroll-mt-28">
      {/* Request-type entry points */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center mb-16">
        <button
          type="button"
          onClick={() => choose("authentication")}
          className={`${btnBase} primary-cta-gradient text-on-primary glow-gold hover:scale-105`}
        >
          {ts("ctaRequest")}
        </button>
        <button
          type="button"
          onClick={() => choose("expert")}
          className={`${btnBase} border border-primary/60 text-primary hover:border-primary`}
        >
          {ts("ctaExpert")}
        </button>
        <button
          type="button"
          onClick={() => choose("quote")}
          className={`${btnBase} border border-primary/60 text-primary hover:border-primary`}
        >
          {ts("ctaQuote")}
        </button>
      </div>

      <div
        ref={formRef}
        className="max-w-2xl mx-auto border border-outline-variant/20 bg-surface-container-low p-8 md:p-12"
      >
        <h3 className="text-2xl font-cinzel font-bold text-on-surface mb-2">
          {t("title")}
        </h3>
        <p className="text-neutral-500 text-sm italic mb-10 leading-relaxed">
          {t("intro")}
        </p>

        {status === "success" ? (
          <div className="text-center py-10">
            <span className="material-symbols-outlined text-primary text-5xl mb-4 block font-light">
              verified
            </span>
            <p className="text-on-surface font-cinzel">{t("success")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="label-md text-neutral-500 block mb-2">
                {t("fields.type")} *
              </label>
              <select
                required
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value as AuthRequestType })
                }
                className={`${inputClass} cursor-pointer bg-surface-container-low`}
              >
                {TYPES.map((v) => (
                  <option key={v} value={v} className="bg-surface-container-low">
                    {t(`types.${v}`)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label-md text-neutral-500 block mb-2">
                {t("fields.name")} *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="label-md text-neutral-500 block mb-2">
                {t("fields.email")} *
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
                placeholder="john@example.com"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="label-md text-neutral-500 block mb-2">
                  {t("fields.phone")}
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                  placeholder="+1 234 567 890"
                />
              </div>
              <div>
                <label className="label-md text-neutral-500 block mb-2">
                  {t("fields.country")} *
                </label>
                <input
                  type="text"
                  required
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className={inputClass}
                  placeholder={t("placeholders.country")}
                />
              </div>
            </div>

            <div>
              <label className="label-md text-neutral-500 block mb-2">
                {t("fields.organisation")}
              </label>
              <input
                type="text"
                value={form.organisation}
                onChange={(e) => setForm({ ...form, organisation: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className="label-md text-neutral-500 block mb-2">
                {t("fields.message")} *
              </label>
              <textarea
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="auth-gdpr"
                required
                checked={form.gdpr}
                onChange={(e) => setForm({ ...form, gdpr: e.target.checked })}
                className="mt-1 accent-primary"
              />
              <label
                htmlFor="auth-gdpr"
                className="text-neutral-500 text-xs leading-relaxed cursor-pointer"
              >
                {t("fields.gdpr")}
              </label>
            </div>

            {status === "error" && <p className="text-error text-xs">{t("error")}</p>}

            <button
              type="submit"
              disabled={status === "loading" || !form.gdpr}
              className="w-full primary-cta-gradient text-on-primary py-4 font-cinzel font-bold tracking-widest uppercase text-sm hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "..." : t("submit")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
