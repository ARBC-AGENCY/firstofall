import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SiliconValleyForm from "@/components/ui/SiliconValleyForm";
import { Link } from "@/i18n/navigation";

type Stat = { value: string; label: string };
type Step = { phase: string; title: string; desc: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "siliconValley" });
  return { title: t("title") };
}

export default async function SiliconValleyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "siliconValley" });

  const stats = t.raw("program.stats") as Stat[];
  const coverage = t.raw("program.coverage") as string[];
  const steps = t.raw("journey.steps") as Step[];
  const criteria = t.raw("profile.criteria") as string[];

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80"
            alt="Silicon Valley Africa Program"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pb-20">
          <ScrollReveal>
            <span className="label-md text-primary block mb-4">{t("label")}</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-cinzel font-black text-on-surface mb-4 leading-none">
              {t("title")}
              <br />
              <span className="text-primary italic text-3xl md:text-4xl font-light">
                {t("heroTagline")}
              </span>
            </h1>
            <p className="text-neutral-300 text-lg italic font-light max-w-3xl leading-relaxed border-l-2 border-primary/60 pl-6 mb-10">
              {t("heroSubtitle")}
            </p>
            {/* Primary CTA — placeholder href until program site is provided */}
            <a
              href="#apply"
              className="primary-cta-gradient text-on-primary px-10 py-5 font-cinzel font-bold tracking-widest uppercase glow-gold hover:scale-105 transition-transform duration-300 text-sm inline-block"
            >
              {t("heroCta")}
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ── NOTRE ENGAGEMENT ── */}
      <section className="py-28 bg-surface px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <span className="label-md text-primary block mb-4">{t("commitment.label")}</span>
            <h2 className="text-3xl md:text-5xl font-cinzel font-bold text-on-surface mb-10 leading-tight">
              {t("commitment.title")}
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-12">
              {t("commitment.text")}
            </p>
            <div className="border-l-2 border-primary/40 pl-8">
              <h3 className="text-xs font-cinzel tracking-[0.3rem] text-primary uppercase mb-4">
                {t("commitment.objectiveTitle")}
              </h3>
              <p className="text-neutral-300 text-lg italic font-light leading-relaxed">
                {t("commitment.objectiveText")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── UN PROGRAMME BIANNUEL ── */}
      <section className="py-28 bg-surface-container-low px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-16">
            <span className="label-md text-primary block mb-4">{t("program.label")}</span>
            <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-on-surface">
              {t("program.title")}
            </h2>
          </ScrollReveal>

          {/* Stats grid */}
          <ScrollReveal stagger className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-surface border border-outline-variant/20 p-6 text-center hover:border-primary/30 transition-all duration-500"
              >
                <div className="text-3xl md:text-4xl font-cinzel font-black text-primary mb-2 leading-none">
                  {s.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2rem] text-neutral-500 font-cinzel">
                  {s.label}
                </div>
              </div>
            ))}
          </ScrollReveal>

          {/* Coverage */}
          <ScrollReveal>
            <h3 className="text-xs font-cinzel tracking-[0.3rem] text-primary uppercase mb-8">
              {t("program.coverageTitle")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {coverage.map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-4 border-b border-yellow-900/10">
                  <span className="material-symbols-outlined text-primary text-base font-light shrink-0">
                    check_circle
                  </span>
                  <span className="text-neutral-400 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── LE PARCOURS DES LAURÉATS ── */}
      <section className="py-28 bg-surface px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-16">
            <span className="label-md text-primary block mb-4">{t("journey.label")}</span>
            <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-on-surface">
              {t("journey.title")}
            </h2>
          </ScrollReveal>

          <ScrollReveal stagger className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[5.5rem] md:left-[7.5rem] top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block" />

            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 md:gap-10 mb-0 py-8 border-b border-yellow-900/10 group relative">
                <div className="min-w-[4rem] md:min-w-[6rem] text-right pt-1 shrink-0">
                  <span className="text-[10px] font-cinzel text-primary tracking-widest leading-tight block uppercase">
                    {step.phase}
                  </span>
                </div>
                {/* Dot */}
                <div className="hidden md:flex items-start pt-[5px] shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0 group-hover:scale-150 transition-transform duration-300" />
                </div>
                <div className="flex-1">
                  <h3 className="font-cinzel font-bold text-on-surface mb-2 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ── LE PROFIL ── */}
      <section className="py-28 bg-surface-container-low px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <span className="label-md text-primary block mb-4">{t("profile.label")}</span>
            <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-on-surface mb-10">
              {t("profile.title")}
            </h2>

            <div className="flex items-center gap-4 mb-8 p-5 border border-primary/20 bg-surface">
              <span className="material-symbols-outlined text-primary font-light text-xl shrink-0">info</span>
              <p className="text-neutral-400 text-sm italic">{t("profile.note")}</p>
            </div>

            <div className="flex items-center gap-4 mb-10">
              <span className="text-xs font-cinzel tracking-[0.2rem] text-neutral-500 uppercase">
                {t("profile.ageLabel")} :
              </span>
              <span className="text-primary font-cinzel font-bold text-lg">{t("profile.age")}</span>
            </div>

            <div className="space-y-4 mb-12">
              {criteria.map((c, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="text-primary font-cinzel font-bold mt-0.5">0{i + 1}</span>
                  <p className="text-neutral-400 text-sm leading-relaxed">{c}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-32 bg-surface-container-lowest text-center px-6">
        <ScrollReveal className="max-w-3xl mx-auto">
          <div className="w-12 h-[1px] bg-primary mx-auto mb-12" />
          <blockquote className="text-xl md:text-2xl font-cinzel italic text-on-surface leading-relaxed mb-14">
            &ldquo;{t("finalCta.quote")}&rdquo;
          </blockquote>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a
              href="#apply"
              className="primary-cta-gradient text-on-primary px-10 py-5 font-cinzel font-bold tracking-widest uppercase glow-gold hover:scale-105 transition-transform duration-300 text-sm inline-block"
            >
              {t("finalCta.applyBtn")}
            </a>
            <Link
              href="/collection"
              className="border border-primary/60 text-primary px-10 py-5 font-cinzel font-bold tracking-widest uppercase hover:border-primary transition-all duration-300 text-sm"
            >
              {t("finalCta.buyBtn")}
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section id="apply" className="py-24 bg-surface px-6 md:px-12">
        <div className="max-w-xl mx-auto">
          <ScrollReveal className="mb-10">
            <h2 className="text-3xl font-cinzel font-bold text-on-surface mb-3">
              {t("applyTitle")}
            </h2>
            <div className="w-8 h-[1px] bg-primary" />
          </ScrollReveal>
          <SiliconValleyForm />
        </div>
      </section>
    </>
  );
}
