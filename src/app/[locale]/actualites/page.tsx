import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MediaGallery from "@/components/ui/MediaGallery";

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
      {/* ── HERO ── */}
      <section className="pt-36 pb-20 bg-surface text-center px-6">
        <ScrollReveal>
          <span className="label-md text-primary block mb-4">{t("label")}</span>
          <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-on-surface mb-6">
            {t("title")}
          </h1>
          <p className="text-neutral-400 text-lg italic font-light max-w-2xl mx-auto">
            {t("intro")}
          </p>
        </ScrollReveal>
      </section>

      {/* ── MEDIA GALLERY ── */}
      <section className="py-16 bg-surface px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <MediaGallery />
        </div>
      </section>
    </>
  );
}
