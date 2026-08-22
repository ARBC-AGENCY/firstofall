"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Link } from "@/i18n/navigation";

type Tier = { version: string; level: string };
type Row = { version: string; level: string; benefits: string; events: string };

const inputClass =
  "w-full bg-transparent border-b border-outline-variant/40 text-on-surface text-sm py-3 px-0 focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-neutral-600";

export default function ClubContent() {
  const t = useTranslations("club");
  const locale = useLocale();
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const tiers = t.raw("about.tiers") as Tier[];
  const privileges = t.raw("benefits.privileges") as string[];
  const rows = t.raw("tiers.rows") as Row[];

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
      {/* ── HERO ── */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pb-20">
          <ScrollReveal>
            <span className="label-md text-primary block mb-4">{t("label")}</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-cinzel font-black text-on-surface mb-6 leading-none">
              {t("title")}
              <br />
              <span className="text-primary italic text-4xl md:text-5xl font-light">
                {t("heroTagline")}
              </span>
            </h1>
            <p className="text-neutral-300 text-lg italic font-light max-w-3xl leading-relaxed border-l-2 border-primary/60 pl-6">
              {t("heroSubtitle")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SECTION 1: Un Club d'Exception ── */}
      <section className="py-28 bg-surface px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <span className="label-md text-primary block mb-4">{t("about.label")}</span>
            <h2 className="text-3xl md:text-5xl font-cinzel font-bold text-on-surface mb-10 leading-tight">
              {t("about.title")}
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-10">
              {t("about.text")}
            </p>
            <p className="text-neutral-500 text-sm italic mb-8">{t("about.tiersIntro")}</p>
            <div className="space-y-3 mb-10 pl-4">
              {tiers.map((tier, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="text-primary mt-1 font-cinzel">—</span>
                  <p className="text-on-surface text-sm font-cinzel">
                    <span className="text-primary font-bold">{tier.version}</span>
                    <span className="text-neutral-500 mx-2">→</span>
                    <span>{tier.level}</span>
                  </p>
                </div>
              ))}
            </div>
            <p className="text-neutral-400 text-lg italic leading-relaxed border-l-2 border-primary/40 pl-6">
              {t("about.closing")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SECTION 2: Benefits ── */}
      <section className="py-28 bg-surface-container-low px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-16">
            <span className="label-md text-primary block mb-4">{t("benefits.label")}</span>
            <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-on-surface mb-8">
              {t("benefits.networkingTitle")}
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-3xl">
              {t("benefits.networkingText")}
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <h3 className="text-xs font-cinzel tracking-[0.3rem] text-primary uppercase mb-8">
              {t("benefits.privilegesTitle")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {privileges.map((p, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start p-6 border border-outline-variant/20 bg-surface hover:border-primary/30 transition-all duration-500 group"
                >
                  <span className="material-symbols-outlined text-primary text-lg font-light mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-300">
                    verified
                  </span>
                  <p className="text-neutral-400 text-sm leading-relaxed">{p}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SECTION 3: Tiers Table ── */}
      <section className="py-28 bg-surface px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-12">
            <span className="label-md text-primary block mb-4">{t("tiers.label")}</span>
          </ScrollReveal>
          <ScrollReveal>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm font-cinzel">
                <thead>
                  <tr className="border-b border-yellow-600/30">
                    {(["version", "level", "benefits", "events"] as const).map((h) => (
                      <th
                        key={h}
                        className="text-left text-[10px] uppercase tracking-[0.2rem] text-primary py-4 pr-6 font-normal"
                      >
                        {t(`tiers.headers.${h}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr
                      key={i}
                      className={`border-b border-yellow-900/10 transition-colors duration-300 hover:bg-surface-container-low group ${
                        i === rows.length - 1 ? "border-primary/20" : ""
                      }`}
                    >
                      <td className="py-5 pr-6 text-on-surface font-bold group-hover:text-primary transition-colors duration-300 whitespace-nowrap">
                        {row.version}
                      </td>
                      <td className="py-5 pr-6 text-neutral-300 whitespace-nowrap">{row.level}</td>
                      <td className="py-5 pr-6 text-neutral-500 text-xs leading-relaxed">{row.benefits}</td>
                      <td className="py-5 text-primary text-xs whitespace-nowrap">{row.events}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SECTION 4: Spirit + CTA ── */}
      <section className="py-32 bg-surface-container-lowest text-center px-6">
        <ScrollReveal className="max-w-3xl mx-auto">
          <div className="w-12 h-[1px] bg-primary mx-auto mb-12" />
          <blockquote className="text-2xl md:text-3xl font-cinzel italic text-on-surface leading-relaxed mb-8">
            &ldquo;{t("spirit.quote")}&rdquo;
          </blockquote>
          <p className="text-neutral-500 text-lg italic font-light mb-14 leading-relaxed">
            {t("spirit.closing")}
          </p>
          <Link
            href="/collection"
            className="primary-cta-gradient text-on-primary px-12 py-5 font-cinzel font-bold tracking-widest uppercase glow-gold hover:scale-105 transition-transform duration-300 text-sm inline-block"
          >
            {t("spirit.cta")}
          </Link>
        </ScrollReveal>
      </section>

      {/* ── WAITLIST ── */}
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
                <label className="label-md text-neutral-500 block mb-2">{t("form.name")} *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="label-md text-neutral-500 block mb-2">{t("form.email")} *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>
              {status === "error" && (
                <p className="text-red-500 text-xs">{t("form.error")}</p>
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
