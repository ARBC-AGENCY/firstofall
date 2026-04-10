"use client";

import { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ReservationModal from "@/components/ui/ReservationModal";
import { use } from "react";
import essentials from "@/assets/images/7.webp";
import business from "@/assets/images/6.webp";
import executive from "@/assets/images/999.webp";
import exclusive from "@/assets/images/3.jpeg";

const VALID_VERSIONS = ["essential", "business", "executive", "exclusive"];

const VERSION_CONFIG = {
  essential: {
    img: essentials,
    levels: 5,
    color: "from-neutral-900",
  },
  business: {
    img: business,
    levels: 7,
    color: "from-neutral-900",
  },
  executive: {
    img: executive,
    levels: 8,
    color: "from-neutral-900",
  },
  exclusive: {
    img: exclusive,
    levels: 9,
    color: "from-neutral-900",
  },
} as const;

const PROTECTION_LEVELS = [
  "Sécurités Fiduciaires Visibles",
  "Sécurités Fiduciaires Invisibles",
  "Cryptographie Numérique",
  "Calibrage Spécifique",
  "Authentification Temporelle",
  "Lien Documentaire Indestructible",
  "Traçabilité Totale",
  "Anti-Usurpation",
  "Vérification Instantanée",
];

export default function VersionPage({
  params,
}: {
  params: Promise<{ version: string; locale: string }>;
}) {
  const { version } = use(params);
  const t = useTranslations("collection");
  const th = useTranslations("histoire");
  const [modalOpen, setModalOpen] = useState(false);

  if (!VALID_VERSIONS.includes(version)) notFound();

  const config = VERSION_CONFIG[version as keyof typeof VERSION_CONFIG];
  const versionKey = version as
    | "essential"
    | "business"
    | "executive"
    | "exclusive";

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={config.img}
            alt={t(`versions.${versionKey}.name`)}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pb-16">
          {/* Protected badge */}
          <div className="inline-flex items-center gap-2 border border-primary/40 px-4 py-2 mb-6">
            <span className="material-symbols-outlined text-primary text-xs font-light">
              verified
            </span>
            <span className="text-primary text-[10px] font-cinzel tracking-widest">
              {t("badge")}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-on-surface mb-4 leading-none">
            {t(`versions.${versionKey}.name`)}
          </h1>
          <p className="text-neutral-400 text-lg italic font-light max-w-2xl leading-relaxed">
            {t(`versions.${versionKey}.intro`)}
          </p>
        </div>
      </section>

      {/* Limited series + reserve */}
      <section
        id="reserve"
        className="bg-surface-container-low py-16 px-6 md:px-12"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="label-md text-primary block mb-2">
              {t("limited")}
            </span>
            <p className="text-2xl font-cinzel text-on-surface font-bold">
              {t(`versions.${versionKey}.limited`)}
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="primary-cta-gradient text-on-primary px-12 py-5 font-cinzel font-bold tracking-widest uppercase text-sm glow-gold hover:scale-105 transition-transform duration-300 whitespace-nowrap"
          >
            {t("reserve")}
          </button>
        </div>
      </section>

      {/* Protection levels */}
      <section className="py-24 bg-surface px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-16">
            <span className="label-md text-primary block mb-3">
              PARTICULARITÉS TECHNIQUES
            </span>
            <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-on-surface">
              {config.levels} Niveaux de Protection
            </h2>
          </ScrollReveal>

          <ScrollReveal stagger className="space-y-0">
            {PROTECTION_LEVELS.slice(0, config.levels).map((level, i) => (
              <div
                key={i}
                className="flex gap-6 md:gap-10 items-start py-8 border-b border-yellow-900/10 group"
              >
                <div className="text-4xl md:text-5xl font-cinzel font-black text-primary/20 group-hover:text-primary/40 transition-colors duration-500 min-w-[3rem] text-right">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-lg font-cinzel font-bold text-on-surface mb-2">
                    {level}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    {th(`protection.levels.${i}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="py-24 bg-surface-container-lowest text-center px-6">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-on-surface mb-6">
            Réservez votre {t(`versions.${versionKey}.name`)}
          </h2>
          <p className="text-neutral-500 italic font-light mb-10 max-w-lg mx-auto">
            {t(`versions.${versionKey}.limited`)} disponibles dans le monde.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="border border-primary text-primary px-14 py-5 font-cinzel font-bold tracking-[0.2rem] uppercase hover:bg-primary/5 transition-all duration-300 text-sm"
          >
            {t("reserve")}
          </button>
        </ScrollReveal>
      </section>

      <ReservationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultVersion={version}
      />
    </>
  );
}
