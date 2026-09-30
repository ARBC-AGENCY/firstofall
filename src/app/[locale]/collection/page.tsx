import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { metadataFromSeo } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BRAND_HAS_IP } from "@/lib/brand";
// Framed by scripts/frame-cachets.py so object-cover never crops the product
import essentialImg from "@/assets/images/cachets/essential.webp";
import businessImg from "@/assets/images/cachets/business.webp";
import executiveImg from "@/assets/images/cachets/executive.webp";
import exclusiveImg from "@/assets/images/cachets/exclusive.webp";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metadataFromSeo(locale, "collection", "/collection");
}

const VERSIONS = [
  {
    key: "essential",
    img: essentialImg,
    flip: false,
  },
  {
    key: "business",
    img: businessImg,
    flip: true,
  },
  {
    key: "executive",
    img: executiveImg,
    flip: false,
  },
  {
    key: "exclusive",
    img: exclusiveImg,
    flip: true,
  },
] as const;

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "collection" });

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 bg-surface text-center px-6">
        <ScrollReveal>
          <span className="label-md text-primary block mb-4">{t("label")}</span>
          <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-on-surface mb-6">
            {t("title")}
          </h1>
          <p className="text-neutral-400 text-lg italic font-light max-w-2xl mx-auto leading-relaxed">
            {BRAND_HAS_IP ? t("intro") : t("introNoIp")}
          </p>
        </ScrollReveal>
      </section>

      {/* Alternating sections */}
      {VERSIONS.map(({ key, img, flip }) => (
        <section
          key={key}
          className={`min-h-screen flex items-center ${
            flip ? "bg-surface-container-low" : "bg-surface"
          }`}
        >
          <div
            className={` mx-auto w-full flex flex-col ${
              flip ? "lg:flex-row-reverse" : "lg:flex-row"
            } items-center gap-0`}
          >
            {/* Image */}
            <div className="w-full aspect-[3/4] lg:aspect-auto lg:w-1/2 lg:h-screen relative overflow-hidden">
              <Image
                src={img}
                alt={t(`versions.${key}.name`)}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <ScrollReveal className="lg:w-1/2 px-8 md:px-16 py-16 lg:py-0">
              {/* Badge — asserts a registration, so brand-gated */}
              {BRAND_HAS_IP && (
                <div className="inline-flex items-center gap-2 border border-primary/30 px-4 py-2 mb-8">
                  <span className="text-primary text-[10px] font-cinzel tracking-widest">
                    {t("badge")}
                  </span>
                </div>
              )}

              <span className="label-md text-primary block mb-3">
                {t("limited")}
              </span>
              <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-on-surface mb-4 leading-tight">
                {t(`versions.${key}.name`)}
              </h2>
              <p className="text-neutral-400 text-lg font-light italic leading-relaxed mb-4">
                {t(`versions.${key}.intro`)}
              </p>
              <p className="text-primary-container text-sm font-cinzel tracking-widest mb-10">
                {t(`versions.${key}.limited`)}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/collection/${key}`}
                  className="primary-cta-gradient text-on-primary px-8 py-4 font-cinzel font-bold tracking-widest uppercase text-sm glow-gold hover:scale-105 transition-transform duration-300 text-center"
                >
                  {t("discover")}
                </Link>
                <Link
                  href={`/collection/${key}#reserve`}
                  className="border border-primary/60 text-primary px-8 py-4 font-cinzel font-bold tracking-widest uppercase text-sm hover:border-primary transition-all duration-300 text-center"
                >
                  {t("reserve")}
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      ))}
    </>
  );
}
