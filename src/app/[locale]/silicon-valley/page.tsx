import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SiliconValleyForm from "@/components/ui/SiliconValleyForm";

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
  const how = t.raw("how") as { step: string; title: string; desc: string }[];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1545987796-200677ee1011?w=1400&q=80"
            alt="Silicon Valley"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pb-16">
          <span className="label-md text-primary block mb-4">{t("label")}</span>
          <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-on-surface leading-none">
            {t("title")}
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-surface px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <p className="text-xl md:text-2xl font-cinzel text-on-surface mb-6 leading-relaxed">
              {t("intro")}
            </p>
            <p className="text-neutral-400 text-lg italic font-light leading-relaxed">
              {t("text")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-surface-container-low px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-12">
            <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-on-surface">
              {t("howTitle")}
            </h2>
          </ScrollReveal>
          <ScrollReveal stagger className="space-y-0">
            {how.map((step) => (
              <div
                key={step.step}
                className="flex gap-8 py-8 border-b border-yellow-900/10"
              >
                <div className="text-4xl font-cinzel font-black text-primary/30 min-w-[3rem]">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-on-surface mb-2">
                    {step.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Application form */}
      <section className="py-24 bg-surface px-6 md:px-12">
        <div className="max-w-xl mx-auto">
          <ScrollReveal className="mb-10">
            <h2 className="text-3xl font-cinzel font-bold text-on-surface mb-4">
              {t("applyTitle")}
            </h2>
            <div className="w-8 h-[1px] bg-primary mb-0" />
          </ScrollReveal>
          <SiliconValleyForm />
        </div>
      </section>
    </>
  );
}
