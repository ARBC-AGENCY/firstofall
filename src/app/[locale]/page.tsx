import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ParentBrandSection from "@/components/ui/ParentBrandSection";
import { pageMetadata } from "@/lib/seo";
import { BRAND_HAS_IP, BRAND_MARK, BRAND_NAME, IS_SUB_BRAND } from "@/lib/brand";
import essentialImg from "@/assets/images/IMG-20260422-WA0015.webp";
import businessImg from "@/assets/images/IMG-20260422-WA0016.webp";
import executiveImg from "@/assets/images/image-2.webp";
import exclusiveImg from "@/assets/images/IMG-20260422-WA0018.webp";
import technologyImg from "@/assets/images/patented-tech.jpg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  // The home page is the one title that should not be suffixed by the template
  return {
    ...pageMetadata({
      locale,
      path: "",
      title: `${BRAND_MARK} — ${t("home.title")}`,
      description: t("home.description"),
    }),
    title: { absolute: `${BRAND_MARK} — ${t("home.title")}` },
  };
}

const VERSIONS = ["essential", "business", "executive", "exclusive"] as const;

const COLLECTION_IMAGES = {
  essential: essentialImg,
  business: businessImg,
  executive: executiveImg,
  exclusive: exclusiveImg,
};

const PLACEHOLDER_IMAGES = {
  technology:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
  silicon:
    "https://images.unsplash.com/photo-1545987796-200677ee1011?w=900&q=80",
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const tc = await getTranslations({ locale, namespace: "collection" });
  const tp = await getTranslations({ locale, namespace: "parentBrand" });

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/placeholder.png"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero-video.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="relative z-10 text-center max-w-5xl px-6">
          {/* The brand name leads the hero only on the parent site; a sub-brand
              already carries it in the header and would just repeat itself. */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-cinzel font-black tracking-tight text-on-surface mb-4 leading-none">
            {!IS_SUB_BRAND && (
              <>
                {t("hero.headline")}
                <br />
              </>
            )}
            <span className="text-primary">{t("hero.headlineSub")}</span>
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-cinzel text-on-surface mb-4 max-w-3xl mx-auto leading-snug">
            {t("hero.serviceLine")}
          </h2>
          <p className="text-lg md:text-xl font-light italic text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t("hero.subtext")}
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link
              href="/services"
              className="primary-cta-gradient text-on-primary px-10 py-5 font-cinzel font-bold tracking-widest uppercase glow-gold hover:scale-105 transition-transform duration-300 text-sm"
            >
              {t("hero.cta")}
            </Link>
            <Link
              href="/collection"
              className="border border-primary/60 text-primary px-10 py-5 font-cinzel font-bold tracking-widest uppercase hover:border-primary transition-all duration-300 text-sm"
            >
              {t("hero.ctaSecondary")}
            </Link>
          </div>
        </div>

        {/* Attribution to the parent Maison — hidden on the parent's own site */}


        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40">
          <span className="label-md text-[10px] tracking-[0.3rem]">
            {t("hero.scroll")}
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary-container to-transparent" />
        </div>
      </section>

      {/* ── LA COLLECTION ────────────────────────────────────── */}
      <section className="py-28 px-6 md:px-12 bg-surface">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-16 text-center">
            <span className="label-md text-primary block mb-3">
              {t("collection.label")}
            </span>
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-on-surface mb-4">
              {t("collection.title")}
            </h2>
            <p className="text-primary/80 tracking-[0.2rem] uppercase text-xs font-light max-w-xl mx-auto">
              {t("collection.tagline")}
            </p>
          </ScrollReveal>

          <ScrollReveal
            stagger
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {VERSIONS.map((v) => (
              <Link
                key={v}
                href={`/collection/${v}`}
                className="group relative bg-surface-container-low p-1 border border-transparent hover:border-primary-container/40 transition-all duration-700 h-[480px] block"
              >
                <div className="h-full w-full relative overflow-hidden bg-surface-container-lowest flex flex-col p-7">
                  {COLLECTION_IMAGES[v] ? (
                    <Image
                      src={COLLECTION_IMAGES[v]!}
                      alt={t(`collection.versions.${v}.name`)}
                      fill
                      className="object-cover opacity-60 group-hover:opacity-50 transition-opacity duration-700"
                    />
                  ) : null}
                  <div className="mt-auto relative z-10">
                    <h3 className="text-xl font-cinzel text-on-surface mb-2">
                      {t(`collection.versions.${v}.name`)}
                    </h3>
                    <p className="text-neutral-400 text-sm mb-5 leading-relaxed">
                      {t(`collection.versions.${v}.desc`)}
                    </p>
                    <span className="text-xs font-cinzel tracking-widest text-primary group-hover:translate-x-2 inline-block transition-transform duration-300">
                      {t("collection.explore")}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ── TECHNOLOGIE ──────────────────────────────────────── */}
      <section className="bg-surface-container-low py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 px-6 md:px-12">
          <ScrollReveal className="lg:w-1/2 relative">
            <div className="absolute -inset-4 border border-primary/20 scale-105 pointer-events-none" />
            <Image
              src={technologyImg}
              alt={`Technologie ${BRAND_NAME}`}
              width={700}
              height={500}
              className="w-full grayscale-0 hover:grayscale-0 transition-all duration-1000 object-cover"
            />
          </ScrollReveal>

          <ScrollReveal className="lg:w-1/2" delay={0.15}>
            <span className="label-md text-primary block mb-4">
              {t("technology.label")}
            </span>
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-on-surface mb-6 leading-tight">
              {t("technology.title")}
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-10 italic font-light">
              {t("technology.text")}
            </p>
            <Link
              href="/univers/notre-histoire"
              className="border-b border-primary text-primary pb-2 font-cinzel tracking-[0.15rem] uppercase text-sm hover:text-on-surface hover:border-on-surface transition-all duration-300 inline-block"
            >
              {t("technology.cta")}
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── PROTECTIONS MONDIALES — brand-specific registrations ── */}
      {BRAND_HAS_IP && (
        <section className="py-20 bg-surface text-center px-6">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-cinzel text-on-surface mb-12 uppercase tracking-widest">
              {t("protection.title")}
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {["EUIPO", "OAPI", "USPTO", "CANADA", "UK"].map((j) => (
                <div
                  key={j}
                  className="px-8 py-3 border border-primary-container/30 bg-surface-container-high text-primary font-cinzel tracking-widest text-xs"
                >
                  {j}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* ── ARCHITECTURE DE MARQUE ───────────────────────────── */}
      <ParentBrandSection locale={locale} />

      {/* ── PROGRAMME SILICON VALLEY ─────────────────────────── */}
      <section className="bg-surface relative overflow-hidden min-h-[560px] flex items-center">
        <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full hidden lg:block">
          <Image
            src={PLACEHOLDER_IMAGES.silicon}
            alt="Silicon Valley"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/70 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10 py-24">
          <ScrollReveal className="lg:w-1/2">
            <span className="label-md text-primary block mb-4">
              {t("siliconValley.label")}
            </span>
            <h2 className="text-4xl md:text-6xl font-cinzel font-bold text-on-surface mb-6 leading-none">
              {t("siliconValley.title")}
            </h2>
            <p className="text-neutral-500 text-lg mb-10 max-w-md font-light leading-relaxed">
              {t("siliconValley.text")}
            </p>
            <Link
              href="/silicon-valley"
              className="primary-cta-gradient text-on-primary px-10 py-5 font-cinzel font-bold tracking-widest uppercase hover:opacity-90 transition-all duration-300 text-sm inline-block"
            >
              {t("siliconValley.cta")}
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CHIFFRES CLÉS ────────────────────────────────────── */}
      <section className="py-28 bg-surface-container-lowest border-y border-yellow-900/10">
        <ScrollReveal
          stagger
          className={`max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 gap-10 ${
            BRAND_HAS_IP ? "md:grid-cols-4" : "md:grid-cols-3"
          }`}
        >
          <div className="text-center">
            <div className="text-5xl font-cinzel text-primary font-black mb-2">
              9
            </div>
            <div className="text-xs uppercase tracking-widest text-neutral-400">
              {t("metrics.levels")}
            </div>
          </div>
          {/* "5 jurisdictions" is a registration claim, not a product fact */}
          {BRAND_HAS_IP && (
            <div className="text-center">
              <div className="text-5xl font-cinzel text-primary font-black mb-2">
                5
              </div>
              <div className="text-xs uppercase tracking-widest text-neutral-400">
                {t("metrics.jurisdictions")}
              </div>
            </div>
          )}
          <div className="text-center">
            <div className="text-5xl font-cinzel text-primary font-black mb-2">
              8 050
            </div>
            <div className="text-xs uppercase tracking-widest text-neutral-400">
              {t("metrics.seals")}
            </div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-cinzel text-primary font-black mb-2">
              125+
            </div>
            <div className="text-xs uppercase tracking-widest text-neutral-400">
              {t("metrics.media")}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── CLUB FIRST OF ALL ─────────────────────────────────── */}
      <section className="py-40 bg-surface text-center">
        <ScrollReveal className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-on-surface mb-6">
            {t("club.title")}
          </h2>
          <div className="w-12 h-[1px] bg-primary mx-auto mb-8" />
          <p className="text-neutral-400 text-xl italic font-light mb-14 leading-relaxed">
            {t("club.text")}
          </p>
          <Link
            href="/club"
            className="border border-primary text-primary px-14 py-6 font-cinzel font-bold tracking-[0.2rem] uppercase hover:bg-primary/5 transition-all duration-300 text-sm inline-block"
          >
            {t("club.cta")}
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
