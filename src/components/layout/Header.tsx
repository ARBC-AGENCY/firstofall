"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import MobileMenu from "./MobileMenu";
import LangSwitcher from "@/components/ui/LangSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-yellow-600/20 glass-nav ${
          scrolled ? "bg-black/90" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 py-5">
          {/* Logo — left */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold text-primary font-cinzel tracking-tight hover:text-primary-container transition-colors duration-300"
            aria-label="First of All™ — Home"
          >
            First of All™
          </Link>

          {/* Hamburger — center */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col items-center justify-center gap-[5px] group p-2"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
          >
            <span className="block w-6 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-8" />
            <span className="block w-4 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-8" />
            <span className="block w-6 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-8" />
          </button>

          {/* Right: services entry point + lang switcher */}
          <div className="flex items-center gap-6">
            <Link
              href="/services"
              className="hidden md:block text-[11px] font-cinzel font-bold tracking-[0.2rem] uppercase text-neutral-400 hover:text-primary transition-colors duration-300 whitespace-nowrap"
            >
              {t("services")}
            </Link>
            <LangSwitcher />
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
