"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTranslations, useLocale } from "next-intl";

export type AuthRequestType = "authentication" | "expert" | "quote";

interface AuthenticationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: AuthRequestType;
}

const TYPES: AuthRequestType[] = ["authentication", "expert", "quote"];

export default function AuthenticationModal({
  isOpen,
  onClose,
  defaultType = "authentication",
}: AuthenticationModalProps) {
  const t = useTranslations("authentication");
  const locale = useLocale();
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    organisation: "",
    type: defaultType,
    message: "",
    gdpr: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Sync request type when opened from a different button
  useEffect(() => {
    setForm((f) => ({ ...f, type: defaultType }));
  }, [defaultType]);

  // Animate in/out
  useEffect(() => {
    const overlay = overlayRef.current;
    const modal = modalRef.current;
    if (!overlay || !modal) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(overlay, { display: "flex" });
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        modal,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.05 }
      );
    } else {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.25,
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
          document.body.style.overflow = "";
        },
      });
    }
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

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
        type: defaultType,
        message: "",
        gdpr: false,
      });
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full bg-transparent border-b border-outline-variant/40 text-on-surface text-sm py-3 px-0 focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-neutral-600";

  return (
    <div
      ref={overlayRef}
      className="inset inset-0 z-[100] items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      style={{ display: "none" }}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={t("title")}
    >
      <div
        ref={modalRef}
        className="w-full max-w-xl bg-surface-container-low border border-outline-variant/20 p-8 md:p-10 relative max-h-[90vh] overflow-y-auto"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-500 hover:text-primary transition-colors"
          aria-label={t("close")}
        >
          <span className="material-symbols-outlined text-2xl font-light">close</span>
        </button>

        <h2 className="text-2xl font-cinzel font-bold text-on-surface mb-2">
          {t("title")}
        </h2>
        <p className="text-neutral-500 text-sm italic mb-8 leading-relaxed">
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
            {/* Request type */}
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

            {/* Name */}
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

            {/* Email */}
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

            {/* Phone + Country */}
            <div className="grid grid-cols-2 gap-6">
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
                  placeholder="United States"
                />
              </div>
            </div>

            {/* Organisation */}
            <div>
              <label className="label-md text-neutral-500 block mb-2">
                {t("fields.organisation")}
              </label>
              <input
                type="text"
                value={form.organisation}
                onChange={(e) =>
                  setForm({ ...form, organisation: e.target.value })
                }
                className={inputClass}
              />
            </div>

            {/* Message */}
            <div>
              <label className="label-md text-neutral-500 block mb-2">
                {t("fields.message")} *
              </label>
              <textarea
                rows={3}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-none`}
                placeholder="..."
              />
            </div>

            {/* GDPR */}
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

            {status === "error" && (
              <p className="text-error text-xs">{t("error")}</p>
            )}

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
