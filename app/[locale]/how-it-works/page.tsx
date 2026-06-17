import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HowItWorksContent } from "@/components/pages/HowItWorksContent";
import { getPageMeta, isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const meta = getPageMeta(localeParam, "howItWorks");
  return { title: meta.title, description: meta.description };
}

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  return <HowItWorksContent locale={localeParam as Locale} />;
}
