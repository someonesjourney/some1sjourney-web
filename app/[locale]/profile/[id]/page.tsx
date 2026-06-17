import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProfileContent } from "@/components/pages/ProfileContent";
import { getPageMeta, isLocale, type Locale } from "@/lib/i18n";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getUserProfile } from "@/lib/user-profile";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, id } = await params;
  if (!isLocale(localeParam)) return {};

  const meta = getPageMeta(localeParam, "profile");
  const result = await getUserProfile(id, localeParam);

  if (result.status === "found") {
    return {
      title: `${result.profile.name} — ${meta.title}`,
      description: result.profile.identityCard.archetype,
    };
  }

  return { title: meta.title, description: meta.description };
}

export default async function ProfileByIdPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: localeParam, id } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;

  if (!isSupabaseConfigured()) {
    return (
      <ProfileContent
        userId={id}
        profile={null}
        unconfigured
      />
    );
  }

  const result = await getUserProfile(id, locale);

  return (
    <ProfileContent
      userId={id}
      profile={result.status === "found" ? result.profile : null}
      notFound={result.status === "not_found" || result.status === "invalid_id"}
      unconfigured={result.status === "unconfigured"}
    />
  );
}
