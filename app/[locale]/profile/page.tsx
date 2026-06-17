import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ProfileContent } from "@/components/pages/ProfileContent";
import { getPageMeta, isLocale, localizeHref, type Locale } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getUserProfile } from "@/lib/user-profile";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ userId?: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};

  const { userId } = await searchParams;
  const meta = getPageMeta(localeParam, "profile");

  if (userId) {
    const result = await getUserProfile(userId, localeParam);
    if (result.status === "found") {
      return {
        title: `${result.profile.name} — ${meta.title}`,
        description: result.profile.identityCard.archetype,
      };
    }
  }

  return { title: meta.title, description: meta.description };
}

export default async function ProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ userId?: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const { userId } = await searchParams;

  if (!isSupabaseConfigured()) {
    return <ProfileContent profile={null} userId={null} unconfigured />;
  }

  if (!userId?.trim() && isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.id) {
      redirect(localizeHref(locale, `/profile/${user.id}`));
    }
  }

  if (!userId?.trim()) {
    return <ProfileContent profile={null} userId={null} />;
  }

  const result = await getUserProfile(userId, locale);

  return (
    <ProfileContent
      userId={userId.trim()}
      profile={result.status === "found" ? result.profile : null}
      notFound={result.status === "not_found" || result.status === "invalid_id"}
      unconfigured={result.status === "unconfigured"}
    />
  );
}
