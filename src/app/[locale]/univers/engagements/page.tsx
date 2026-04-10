import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "engagements" });
  return { title: t("title") };
}

export default async function EngagementsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "engagements" });
  const items = t.raw("items") as { title: string; desc: string }[];

  return (
    <>
      <section className="pt-36 pb-20 bg-surface text-center px-6">
        <ScrollReveal>
          <span className="label-md text-primary block mb-4">L&apos;UNIVERS</span>
          <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-on-surface mb-6">
            {t("title")}
          </h1>
          <p className="text-neutral-400 text-lg italic font-light max-w-2xl mx-auto">
            {t("intro")}
          </p>
        </ScrollReveal>
      </section>

      <section className="py-20 bg-surface-container-low px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal stagger className="space-y-0">
            {items.map((item, i) => (
              <div
                key={i}
                className="py-10 border-b border-yellow-900/10 flex gap-8"
              >
                <div className="text-4xl font-cinzel font-black text-primary/20 min-w-[3rem] text-right pt-1">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h2 className="text-2xl font-cinzel font-bold text-on-surface mb-3">
                    {item.title}
                  </h2>
                  <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
