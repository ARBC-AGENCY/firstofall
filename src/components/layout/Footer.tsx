import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "footer" });

  return (
    <footer className="bg-neutral-950 border-t border-yellow-900/30">
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="text-xl font-bold text-primary font-cinzel">
              First of All®
            </div>
            <p className="text-neutral-500 text-xs tracking-wider leading-relaxed uppercase">
              {t("tagline")}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {["EUIPO 🇪🇺", "USPTO 🇺🇸", "OAPI 🌍", "CA 🇨🇦", "UK 🇬🇧"].map((j) => (
                <span
                  key={j}
                  className="text-[10px] text-primary border border-primary/30 px-2 py-1 font-cinzel"
                >
                  {j}
                </span>
              ))}
            </div>
          </div>

          {/* Gouvernance */}
          <div className="flex flex-col gap-3">
            <span className="label-md text-on-surface mb-2">
              {t("sections.gouvernance")}
            </span>
            {["EUIPO", "OAPI", "USPTO", "WIPO / OMPI"].map((g) => (
              <span
                key={g}
                className="text-neutral-500 text-xs uppercase tracking-widest"
              >
                {g}
              </span>
            ))}
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-3">
            <span className="label-md text-on-surface mb-2">
              {t("sections.links")}
            </span>
            <Link
              href="/collection"
              className="text-neutral-500 text-xs uppercase tracking-widest hover:text-primary transition-colors"
            >
              {t("links.collection")}
            </Link>
            <Link
              href="/univers/notre-histoire"
              className="text-neutral-500 text-xs uppercase tracking-widest hover:text-primary transition-colors"
            >
              {t("links.histoire")}
            </Link>
            <Link
              href="/services"
              className="text-neutral-500 text-xs uppercase tracking-widest hover:text-primary transition-colors"
            >
              {t("links.services")}
            </Link>
            <Link
              href="/silicon-valley"
              className="text-neutral-500 text-xs uppercase tracking-widest hover:text-primary transition-colors"
            >
              Silicon Valley
            </Link>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <span className="label-md text-on-surface mb-2">
              {t("sections.legal")}
            </span>
            <Link
              href="/legal"
              className="text-neutral-500 text-xs uppercase tracking-widest hover:text-primary transition-colors"
            >
              {t("links.privacy")}
            </Link>
            <Link
              href="/legal"
              className="text-neutral-500 text-xs uppercase tracking-widest hover:text-primary transition-colors"
            >
              {t("links.terms")}
            </Link>
          </div>
        </div>

        <div className="my-12 h-[1px] bg-gradient-to-r from-transparent via-yellow-600/40 to-transparent" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-neutral-600 text-[10px] leading-relaxed max-w-xl">
            {t("legal")}
          </p>
          <div className="text-neutral-600 text-[10px] uppercase tracking-widest whitespace-nowrap">
            {t("copyright")}
          </div>
        </div>
      </div>
    </footer>
  );
}
