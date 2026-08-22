import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { metadataFromSeo } from "@/lib/seo";
import ClubContent from "@/components/pages/ClubContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metadataFromSeo(locale, "club", "/club");
}

export default async function ClubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ClubContent />;
}
