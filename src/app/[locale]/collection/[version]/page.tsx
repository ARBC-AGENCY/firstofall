import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import VersionContent from "@/components/pages/VersionContent";

const VALID_VERSIONS = ["essential", "business", "executive", "exclusive"];

export function generateStaticParams() {
  return VALID_VERSIONS.map((version) => ({ version }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; version: string }>;
}): Promise<Metadata> {
  const { locale, version } = await params;
  if (!VALID_VERSIONS.includes(version)) return {};

  const tc = await getTranslations({ locale, namespace: "collection" });
  const ts = await getTranslations({ locale, namespace: "seo" });
  const name = tc(`versions.${version}.name`);

  return pageMetadata({
    locale,
    path: `/collection/${version}`,
    title: name,
    // Prefer the version's own intro; it is written for this page
    description:
      tc(`versions.${version}.intro`) ||
      ts("collectionVersion.description", { name }),
  });
}

export default async function VersionPage({
  params,
}: {
  params: Promise<{ locale: string; version: string }>;
}) {
  const { locale, version } = await params;
  if (!VALID_VERSIONS.includes(version)) notFound();
  setRequestLocale(locale);
  return <VersionContent params={params} />;
}
