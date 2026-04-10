import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import ScrollReveal from "@/components/ui/ScrollReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "univers" });
  return { title: t("title") };
}

const LINKS = [
  { key: "histoire", href: "/univers/notre-histoire", icon: "history_edu" },
  { key: "engagements", href: "/univers/engagements", icon: "science" },
  { key: "dealers", href: "/dealers", icon: "store" },
  { key: "club", href: "/club", icon: "diamond" },
] as const;

export default async function UniversPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "univers" });

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
          <ScrollReveal
            stagger
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {LINKS.map(({ key, href, icon }) => (
              <Link
                key={key}
                href={href}
                className="group flex items-center gap-6 border border-outline-variant/20 p-8 bg-surface hover:border-primary/40 transition-all duration-500"
              >
                <span className="material-symbols-outlined text-primary text-3xl font-light group-hover:scale-110 transition-transform duration-300">
                  {icon}
                </span>
                <div>
                  <h2 className="text-xl font-cinzel font-bold text-on-surface group-hover:text-primary transition-colors duration-300 mb-1">
                    {t(`links.${key}`)}
                  </h2>
                  <span className="text-xs font-cinzel tracking-widest text-neutral-600 group-hover:text-primary/60 transition-colors duration-300">
                    {t("explore")}{" "}
                  </span>
                </div>
              </Link>
            ))}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
