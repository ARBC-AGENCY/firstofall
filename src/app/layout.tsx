import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import { getLocale } from "next-intl/server";
import { BRAND_FAVICON, BRAND_MARK } from "@/lib/brand";
import { SITE_URL } from "@/lib/seo";
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
  // Resolves relative URLs in Open Graph / canonical tags
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${BRAND_MARK}`,
    default: BRAND_MARK,
  },
  robots: { index: true, follow: true },
  // Omitted entirely when the brand has no icon, so nothing is inherited
  ...(BRAND_FAVICON
    ? {
        icons: {
          icon: [{ url: BRAND_FAVICON, type: "image/png" }],
          shortcut: [{ url: BRAND_FAVICON }],
          apple: [{ url: BRAND_FAVICON }],
        },
      }
    : {}),
  // No description here: this layout sits above [locale] and cannot know the
  // language, so a fixed one served French copy to English pages. Every page
  // supplies its own, localised.
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
