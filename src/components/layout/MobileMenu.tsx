"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LangSwitcher from "@/components/ui/LangSwitcher";
import { BRAND_HAS_IP, BRAND_MARK } from "@/lib/brand";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations("nav");
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLUListElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const items = itemsRef.current;
    const right = rightRef.current;
    if (!overlay || !items || !right) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(overlay, { display: "flex" });
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
      gsap.fromTo(
        Array.from(items.children),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out", delay: 0.15 }
      );
      gsap.fromTo(
        right,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out", delay: 0.3 }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => { gsap.set(overlay, { display: "none" }); },
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape" && isOpen) onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Use simple paths — the i18n Link from @/i18n/navigation adds the locale prefix
  const menuItems = [
    {
      key: "collection",
      label: t("collection"),
      href: "/collection" as const,
      sub: [
        { key: "essential", label: t("subVersions.essential"), href: "/collection/essential" as const },
        { key: "business",  label: t("subVersions.business"),  href: "/collection/business"  as const },
        { key: "executive", label: t("subVersions.executive"), href: "/collection/executive" as const },
        { key: "exclusive", label: t("subVersions.exclusive"), href: "/collection/exclusive" as const },
      ],
    },
    { key: "univers",    label: t("univers"),       href: "/univers"        as const, sub: [] },
    { key: "services",  label: t("services"),       href: "/services"       as const, sub: [] },
    { key: "dealers",   label: t("dealers"),        href: "/dealers"        as const, sub: [] },
    { key: "silicon",   label: t("siliconValley"),  href: "/silicon-valley" as const, sub: [] },
    { key: "actualites",label: t("actualites"),     href: "/actualites"     as const, sub: [] },
  ];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] w-full h-full bg-neutral-950 flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-20"
      style={{ display: "none" }}
      role="dialog"
      aria-modal="true"
      aria-label={t("menu")}
    >
      {/* Close button */}
      <button onClick={onClose} className="absolute top-7 right-10 z-[70] group" aria-label={t("close")}>
        <span className="material-symbols-outlined text-primary text-4xl transition-transform duration-500 group-hover:rotate-90 font-light">
          close
        </span>
      </button>

      {/* Left: nav links — flex-1 on mobile so the bottom bar keeps its space.
          h-full here would push it past the viewport, and the overlay is fixed
          with no scroll, so it could never be reached. */}
      <div className="w-full md:w-1/2 flex-1 min-h-0 md:h-full overflow-y-auto flex flex-col justify-center pt-24 md:pt-0">
        <ul ref={itemsRef} className="space-y-6 md:space-y-3">
          {menuItems.map((item) => (
            <li key={item.key} className="group cursor-pointer">
              <Link href={item.href} onClick={onClose}>
                <div className="flex items-center gap-4 transition-all duration-500 text-neutral-700 hover:text-primary hover:translate-x-3">
                  <span className="text-2xl md:text-4xl lg:text-3xl font-cinzel font-bold uppercase leading-none">
                    {item.label}
                  </span>
                  <span className="material-symbols-outlined text-3xl opacity-0 group-hover:opacity-100 transition-all duration-300 font-light">
                    trending_flat
                  </span>
                </div>
              </Link>
              {item.sub.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 pl-2">
                  {item.sub.map((s) => (
                    <Link
                      key={s.key}
                      href={s.href}
                      onClick={onClose}
                      className="text-primary-container italic text-sm md:text-base opacity-70 hover:opacity-100 transition-opacity"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Right: decorative panel */}
      <div
        ref={rightRef}
        className="hidden lg:flex w-1/2 h-full relative items-center justify-center border-l border-yellow-600/20"
      >
        <div className="relative z-10 text-center px-12">
          <h2 className="font-cinzel text-4xl lg:text-6xl font-black italic text-primary drop-shadow-[0_0_30px_rgba(242,202,80,0.25)]">
            {t("tagline")}
          </h2>
          <p className="mt-6 text-neutral-500 uppercase tracking-[0.4rem] text-xs font-light italic">
            {t("taglineSub")}
          </p>
          <div className="mt-10 h-16 w-[1px] bg-gradient-to-b from-primary to-transparent mx-auto" />
        </div>

        <div className="absolute bottom-10 left-10 flex flex-col gap-4">
          <LangSwitcher />
          <div className="flex gap-5 mt-2">
            <span className="material-symbols-outlined text-neutral-600 text-lg hover:text-primary transition-colors font-light">language</span>
            <span className="material-symbols-outlined text-neutral-600 text-lg  hover:text-primary transition-colors font-light">shield</span>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 text-right">
          <div className="font-cinzel text-primary font-bold text-sm mb-1">{t("ledger")}</div>
          <div className="text-[10px] text-neutral-600 uppercase tracking-widest leading-relaxed">
            {BRAND_HAS_IP && (
              <>
                EUIPO • OAPI • USPTO • UK • WIPO
                <br />
              </>
            )}
            © {BRAND_MARK} 2026
          </div>
        </div>
      </div>

      {/* Mobile bottom bar — sole language switcher below sm, where the header
          no longer shows one */}
      <div className="md:hidden w-full shrink-0 pb-10 pt-6 flex justify-between items-end border-t border-yellow-900/30">
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-primary font-light">verified</span>
          <span className="material-symbols-outlined text-primary font-light">public</span>
        </div>
        <div className="flex flex-col items-end gap-2">
          <LangSwitcher />
          <div className="text-[8px] text-neutral-500 uppercase tracking-tighter">{t("ipLabel")}</div>
        </div>
      </div>
    </div>
  );
}
