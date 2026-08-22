import { getTranslations } from "next-intl/server";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  BRAND_MARK,
  IS_SUB_BRAND,
  PARENT_BRAND_MARK,
  PARENT_BRAND_URL,
} from "@/lib/brand";

/**
 * States the brand architecture: inventor → Maison → invention.
 *
 * Renders nothing on the parent's own deployment, where there is no parent to
 * credit.
 */
export default async function ParentBrandSection({ locale }: { locale: string }) {
  if (!IS_SUB_BRAND) return null;

  const t = await getTranslations({ locale, namespace: "parentBrand" });

  const chain = [
    { name: "Édouard Patrick Junior Onana", role: t("inventorRole") },
    { name: PARENT_BRAND_MARK, role: t("maisonRole") },
    { name: BRAND_MARK, role: t("inventionRole") },
  ];

  return (
    <section className="py-28 px-6 md:px-12 bg-surface-container-lowest border-y border-yellow-900/10">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <span className="label-md text-primary block mb-3">{t("label")}</span>
          <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-on-surface mb-6">
            {t("title")}
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed max-w-3xl mx-auto">
            {t("statement")}
          </p>
        </ScrollReveal>

        {/* inventor → Maison → invention */}
        <ScrollReveal stagger className="flex flex-col items-center gap-2 mb-14">
          {chain.map((step, i) => (
            <div key={step.name} className="flex flex-col items-center gap-2">
              <div className="text-center border border-outline-variant/20 bg-surface px-8 py-5 min-w-[280px]">
                <div className="font-cinzel text-primary text-lg">{step.name}</div>
                <div className="text-[10px] uppercase tracking-widest text-neutral-500 mt-1">
                  {step.role}
                </div>
              </div>
              {i < chain.length - 1 && (
                <span className="material-symbols-outlined text-primary/50 font-light">
                  arrow_downward
                </span>
              )}
            </div>
          ))}
        </ScrollReveal>

        <ScrollReveal className="text-center">
          <p className="text-neutral-500 text-sm italic leading-relaxed max-w-2xl mx-auto mb-10">
            {t("detail")}
          </p>
         
        </ScrollReveal>
      </div>
    </section>
  );
}
