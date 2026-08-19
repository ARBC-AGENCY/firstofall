import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import { getLocale } from "next-intl/server";
import { BRAND_HAS_IP, BRAND_MARK } from "@/lib/brand";
import "@/styles/globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${BRAND_MARK}`,
    default: `${BRAND_MARK} | L'Excellence Infalsifiable`,
  },
  description: BRAND_HAS_IP
    ? `${BRAND_MARK} — La première technologie cryptofiduciaire protégée dans cinq juridictions mondiales. EUIPO • OAPI • USPTO • Canada • UK.`
    : `${BRAND_MARK} — Services d'authentification de documents, cachets et œuvres d'art, sécurisés par une technologie cryptofiduciaire.`,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`dark ${cinzel.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="bg-surface text-on-surface font-body antialiased">
        {children}
      </body>
    </html>
  );
}
