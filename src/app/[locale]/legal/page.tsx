import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { metadataFromSeo } from "@/lib/seo";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BRAND_HAS_IP, BRAND_MARK } from "@/lib/brand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metadataFromSeo(locale, "legal", "/legal");
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });

  return (
    <section className="pt-36 pb-20 bg-surface px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <span className="label-md text-primary block mb-4">{t("label")}</span>
          <h1 className="text-4xl font-cinzel font-bold text-on-surface mb-10">
            {t("title")}
          </h1>
          <div className="space-y-8 text-neutral-400 leading-relaxed text-sm">
            <p>
              <strong className="text-on-surface font-cinzel">{BRAND_MARK}</strong>{" "}
              {BRAND_HAS_IP ? t("p1") : t("p1NoIp")}
            </p>
            <p>{t("p2")}</p>
            <p>{t("copyright")}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
