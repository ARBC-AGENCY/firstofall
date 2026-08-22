import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { metadataFromSeo } from "@/lib/seo";
import DealersContent from "@/components/pages/DealersContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metadataFromSeo(locale, "dealers", "/dealers");
}

export default async function DealersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <DealersContent />;
}
