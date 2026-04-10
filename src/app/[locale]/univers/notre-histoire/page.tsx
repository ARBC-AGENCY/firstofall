import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "histoire" });
  return { title: t("title") };
}

export default async function NotrHistoirePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "histoire" });

  const timeline = t.raw("timeline") as { date: string; event: string }[];
  const levels = t.raw("protection.levels") as { name: string; desc: string }[];
  const legal = t.raw("legal") as { name: string; desc: string }[];
  const commerce = t.raw("commerce") as string[];

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 bg-surface px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <span className="label-md text-primary block mb-4">L&apos;UNIVERS</span>
            <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-on-surface mb-8 leading-tight">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl font-bold text-on-surface leading-relaxed mb-4">
              {t("launch")}
            </p>
            <p className="text-neutral-400 italic font-light leading-relaxed">
              {t("intro")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Présentation */}
      <section className="py-20 bg-surface-container-low px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-xs font-cinzel tracking-[0.3rem] text-primary uppercase mb-6">
              {t("invention.title")}
            </h2>
            <p className="text-on-surface text-lg leading-relaxed mb-6">
              {t("invention.text")}
            </p>
            <p className="text-neutral-400 italic font-light leading-relaxed">
              {t("invention.inventor")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 9 niveaux */}
      <section className="py-24 bg-surface px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-12">
            <h2 className="text-xs font-cinzel tracking-[0.3rem] text-primary uppercase mb-4">
              {t("protection.title")}
            </h2>
            <h3 className="text-3xl md:text-4xl font-cinzel font-bold text-on-surface mb-4">
              {t("protection.subtitle")}
            </h3>
            <p className="text-neutral-400 leading-relaxed italic">
              {t("protection.intro")}
            </p>
          </ScrollReveal>

          <ScrollReveal stagger className="space-y-0">
            {levels.map((level, i) => (
              <div
                key={i}
                className="flex gap-6 md:gap-10 items-start py-8 border-b border-yellow-900/10 group"
              >
                <div className="text-3xl md:text-4xl font-cinzel font-black text-primary/20 group-hover:text-primary/50 transition-colors duration-500 min-w-[3rem] text-right">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h4 className="font-cinzel font-bold text-on-surface mb-2">
                    {level.name}
                  </h4>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    {level.desc}
                  </p>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Protection légale */}
      <section className="py-20 bg-surface-container-low px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-xs font-cinzel tracking-[0.3rem] text-primary uppercase mb-8">
              {t("legalTitle")}
            </h2>
            <div className="space-y-6">
              {legal.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-primary font-cinzel font-bold text-sm min-w-[6rem]">
                    {item.name}
                  </span>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Philosophie */}
      <section className="py-20 bg-surface px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-xs font-cinzel tracking-[0.3rem] text-primary uppercase mb-6">
              {t("philosophyTitle")}
            </h2>
            <p className="text-on-surface text-lg leading-relaxed italic">
              {t("philosophy")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Commerce */}
      <section className="py-16 bg-surface-container-low px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-xs font-cinzel tracking-[0.3rem] text-primary uppercase mb-6">
              {t("commerceTitle")}
            </h2>
            <ul className="space-y-4">
              {commerce.map((item, i) => (
                <li key={i} className="flex gap-3 text-neutral-400 text-sm leading-relaxed">
                  <span className="text-primary mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Structure + Vision */}
      <section className="py-16 bg-surface px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <ScrollReveal>
            <h2 className="text-xs font-cinzel tracking-[0.3rem] text-primary uppercase mb-4">
              {t("structureTitle")}
            </h2>
            <p className="text-neutral-400 leading-relaxed">{t("structure")}</p>
          </ScrollReveal>
          <ScrollReveal>
            <h2 className="text-xs font-cinzel tracking-[0.3rem] text-primary uppercase mb-4">
              {t("visionTitle")}
            </h2>
            <p className="text-on-surface text-lg italic leading-relaxed">
              {t("vision")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-surface-container-lowest px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-14">
            <h2 className="text-xs font-cinzel tracking-[0.3rem] text-primary uppercase mb-4">
              {t("timelineTitle")}
            </h2>
          </ScrollReveal>

          <ScrollReveal stagger className="relative">
            {/* Vertical line */}
            <div className="absolute left-[7rem] md:left-[9rem] top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

            {timeline.map((item, i) => (
              <div key={i} className="flex gap-6 md:gap-10 mb-10 relative">
                <div className="text-right min-w-[6rem] md:min-w-[8rem] pt-1">
                  <span className="text-xs font-cinzel text-primary-container tracking-wider leading-tight block">
                    {item.date}
                  </span>
                </div>
                {/* Dot */}
                <div className="relative flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-[5px] shrink-0 -ml-[4px]" />
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed flex-1 pt-0.5">
                  {item.event}
                </p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
