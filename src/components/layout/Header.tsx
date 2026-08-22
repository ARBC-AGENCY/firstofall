"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import MobileMenu from "./MobileMenu";
import LangSwitcher from "@/components/ui/LangSwitcher";
import Image from "next/image";
import {
  BRAND_LOGO,
  BRAND_LOGO_HEIGHT,
  BRAND_LOGO_WIDTH,
  BRAND_LOGO_INVERT_ON_DARK,
  BRAND_MARK,
  HEADER_SCROLLED_THEME,
  IS_SUB_BRAND,
} from "@/lib/brand";

export default function Header() {
  const t = useTranslations("nav");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Only once scrolled: at the top the header is transparent over the hero,
  // so its contents must stay light whatever the brand's scrolled theme is.
  const onLight = scrolled && HEADER_SCROLLED_THEME === "light";
  // Full literal classes — Tailwind only generates what it finds in the source
  const barColor = onLight ? "bg-primary" : "bg-primary";

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b glass-nav ${
          onLight ? "border-neutral-200" : "border-yellow-600/20"
        } ${
          scrolled
            ? HEADER_SCROLLED_THEME === "light"
              ? "bg-white/95"
              : "bg-black/90"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 py-5">
          {/* Logo — left */}
          <div className="flex flex-col">
            <Link
              href="/"
              className="text-xl md:text-2xl font-bold text-primary font-cinzel tracking-tight hover:text-primary-container transition-colors duration-300"
              aria-label={`${BRAND_MARK} — Home`}
            >
              {BRAND_LOGO ? (
                <Image
                  src={BRAND_LOGO}
                  alt={BRAND_MARK}
                  width={BRAND_LOGO_WIDTH}
                  height={BRAND_LOGO_HEIGHT}
                  priority
                  className={`h-7 md:h-9 w-auto transition-[filter] duration-500 ${
                    !onLight && BRAND_LOGO_INVERT_ON_DARK ? "invert" : ""
                  }`}
                />
              ) : (
                BRAND_MARK
              )}
            </Link>
            {IS_SUB_BRAND && (
              <span
                className={`text-[9px] md:text-[10px] tracking-[0.15rem] uppercase mt-0.5 transition-colors duration-500 ${
                  onLight ? "text-neutral-600" : "text-neutral-500"
                }`}
              >
                {t("parentBadge")}
              </span>
            )}
          </div>

          {/* Hamburger — center */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col items-center justify-center gap-[5px] group p-2"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
          >
            <span
              className={`block w-6 h-[1.5px] transition-all duration-300 group-hover:w-8 ${barColor}`}
            />
            <span
              className={`block w-4 h-[1.5px] transition-all duration-300 group-hover:w-8 ${barColor}`}
            />
            <span
              className={`block w-6 h-[1.5px] transition-all duration-300 group-hover:w-8 ${barColor}`}
            />
          </button>

          {/* Right: lang switcher — below sm it lives in the mobile menu instead.
              The whole container is dropped from the layout there, leaving two
              flex children so justify-between pushes the hamburger to the right. */}
          <div className="hidden sm:flex items-center gap-6">
            <LangSwitcher variant={onLight ? "light" : "dark"} />
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
