import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrivacyContent } from "@/components/pages/PrivacyContent";
import { getPageMeta, isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const meta = getPageMeta(localeParam, "privacy");
  return { title: meta.title, description: meta.description };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  return <PrivacyContent locale={localeParam as Locale} />;
}
