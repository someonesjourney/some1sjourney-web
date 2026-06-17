import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CombatContent } from "@/components/pages/CombatContent";
import { getPageMeta, isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const meta = getPageMeta(localeParam, "combat");
  return { title: meta.title, description: meta.description };
}

export default async function CombatPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  return <CombatContent locale={localeParam as Locale} />;
}
