import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  BRAND_CONTACT_EMAIL,
  BRAND_HAS_IP,
  BRAND_LOGO,
  BRAND_LOGO_HEIGHT,
  BRAND_LOGO_WIDTH,
  BRAND_MARK,
  IS_SUB_BRAND,
  PARENT_BRAND_URL,
} from "@/lib/brand";

export default async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const tp = await getTranslations({ locale, namespace: "parentBrand" });

  return (
    <footer className="bg-neutral-950 border-t border-yellow-900/30">
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-16 md:py-20">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 ${
            BRAND_HAS_IP ? "lg:grid-cols-5" : "lg:grid-cols-4"
          }`}
        >
          {/* Brand */}
          <div className="flex flex-col gap-4">
            {BRAND_LOGO ? (
              <Image
                src={BRAND_LOGO}
                alt={BRAND_MARK}
                width={BRAND_LOGO_WIDTH}
                height={BRAND_LOGO_HEIGHT}
                className="h-8 w-auto"
              />
            ) : (
              <div className="text-xl font-bold text-primary font-cinzel">
                {BRAND_MARK}
              </div>
            )}
            <p className="text-neutral-500 text-xs tracking-wider leading-relaxed uppercase">
              {t("tagline")}
            </p>
            {IS_SUB_BRAND && (
              <p className="text-neutral-500 text-xs leading-relaxed">
                {tp("statement")}{" "}
                <a
                  href={PARENT_BRAND_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {PARENT_BRAND_URL.replace(/^https?:\/\//, "")}
                </a>
              </p>
            )}
            {/* Registrations belong to a specific brand — never shown for one that lacks them */}
            {BRAND_HAS_IP && (
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
            )}
          </div>

          {/* Gouvernance */}
          {BRAND_HAS_IP && (
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
          )}

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

          {/* Contact — US entity */}
          <div className="flex flex-col gap-3">
            <span className="label-md text-on-surface mb-2">
              {t("sections.contact")}
            </span>
            <address className="not-italic text-neutral-500 text-xs leading-relaxed">
              <span className="text-primary font-cinzel tracking-widest block mb-1">
                {t("entity.name")}
              </span>
              {t("entity.address1")}
              <br />
              {t("entity.address2")}
              <br />
              {t("entity.country")}
            </address>
            <a
              href={`mailto:${BRAND_CONTACT_EMAIL}`}
              className="text-neutral-500 text-xs tracking-widest hover:text-primary transition-colors"
            >
              {BRAND_CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="my-12 h-[1px] bg-gradient-to-r from-transparent via-yellow-600/40 to-transparent" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-neutral-600 text-[10px] leading-relaxed max-w-xl">
            {BRAND_HAS_IP ? t("legal") : t("legalNoIp")}
          </p>
          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="text-neutral-600 text-[10px] uppercase tracking-widest whitespace-nowrap">
              {t("copyright")}
            </div>
            <a
              href="https://www.arbc-agency.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-neutral-700 hover:text-primary transition-colors duration-300"
            >
              <span>{t("crafted")}</span>
              <span className="font-cinzel font-bold text-neutral-500 group-hover:text-primary transition-colors duration-300">
                ARBC Agency
              </span>

            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
