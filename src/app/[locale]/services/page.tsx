import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AuthenticationCta from "@/components/ui/AuthenticationCta";
import { BRAND_HAS_IP } from "@/lib/brand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("title") };
}

const ICONS = ["verified", "shield", "wifi_calling", "handshake"];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });
  const items = t.raw("items") as { title: string; desc: string }[];

  return (
    <>
      <section className="pt-36 pb-20 bg-surface text-center px-6">
        <ScrollReveal>
          <span className="label-md text-primary block mb-4">{t("label")}</span>
          <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-on-surface mb-6">
            {t("title")}
          </h1>
          <p className="text-neutral-400 text-lg italic font-light max-w-2xl mx-auto leading-relaxed">
            {t("intro")}
          </p>
        </ScrollReveal>
      </section>

      <section className="py-20 bg-surface-container-low px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, i) => (
              <div
                key={i}
                className="bg-surface border border-outline-variant/20 p-8 hover:border-primary/30 transition-all duration-500 group"
              >
                <span className="material-symbols-outlined text-primary text-3xl mb-5 block font-light group-hover:scale-110 transition-transform duration-300">
                  {ICONS[i] ?? "star"}
                </span>
                <h2 className="text-xl font-cinzel font-bold text-on-surface mb-3">
                  {item.title}
                </h2>
                <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </ScrollReveal>

          {/* Engage the service — request / expert / quote */}
          <ScrollReveal className="mt-16 border border-primary/20 bg-surface p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-on-surface mb-4">
              {t("ctaTitle")}
            </h2>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-10">
              {t("ctaText")}
            </p>
            <AuthenticationCta
              size="md"
              className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center"
              buttons={[
                { type: "authentication", label: t("ctaRequest") },
                { type: "expert", label: t("ctaExpert"), style: "outline" },
                { type: "quote", label: t("ctaQuote"), style: "outline" },
              ]}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Protection badges — the registrations are brand-specific */}
      {BRAND_HAS_IP && (
        <section className="py-20 bg-surface text-center px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-cinzel text-on-surface mb-10 uppercase tracking-widest">
              {t("protectionTitle")}
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
              {["EUIPO", "OAPI", "USPTO", "CANADA", "UK"].map((j) => (
                <div
                  key={j}
                  className="px-6 py-3 border border-primary-container/30 bg-surface-container-high text-primary font-cinzel tracking-widest text-xs"
                >
                  {j}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>
      )}
    </>
  );
}
