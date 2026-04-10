import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "actualites" });
  return { title: t("title") };
}

export default async function ActualitesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "actualites" });

  return (
    <>
      <section className="pt-36 pb-20 bg-surface text-center px-6">
        <ScrollReveal>
          <span className="label-md text-primary block mb-4">ACTUALITÉS</span>
          <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-on-surface mb-6">
            {t("title")}
          </h1>
          <p className="text-neutral-400 text-lg italic font-light max-w-2xl mx-auto">
            {t("intro")}
          </p>
        </ScrollReveal>
      </section>

      <section className="py-24 bg-surface-container-low px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <span className="material-symbols-outlined text-neutral-700 text-6xl font-light mb-6 block">
              article
            </span>
            <p className="text-neutral-600 font-cinzel tracking-widest uppercase text-sm">
              {t("comingSoon")}
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
