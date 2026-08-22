import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/ui/LenisProvider";
import LocaleBootstrap from "@/components/ui/LocaleBootstrap";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "fr" | "en")) {
    notFound();
  }

  setRequestLocale(locale);

  // Pass the locale explicitly: the root layout resolves the request config
  // before setRequestLocale runs, so a bare getMessages() returns the cached
  // default-locale bundle and every client component renders in French.
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleBootstrap />
      <LenisProvider>
        <Header />
        <main>{children}</main>
        <Footer locale={locale} />
      </LenisProvider>
    </NextIntlClientProvider>
  );
}
