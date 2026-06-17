import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GameHubContent } from "@/components/pages/GameHubContent";
import { getPageMeta, isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const meta = getPageMeta(localeParam, "gameHub");
  return { title: meta.title, description: meta.description };
}

export default async function GameHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  return <GameHubContent locale={localeParam as Locale} />;
}
