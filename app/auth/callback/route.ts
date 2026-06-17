import { NextResponse } from "next/server";
import { defaultLocale } from "@/lib/i18n";
import {
  localeFromRedirectPath,
  profilePathForUser,
  safeRedirectPath,
} from "@/lib/safeRedirectPath";
import { logSyncVerification } from "@/lib/debug/syncVerification";
import { createClient } from "@/lib/supabase/server";
import { syncUnifiedBackendUser } from "@/lib/supabase/sync-unified-user";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const fallback = `/${defaultLocale}/profile`;
  const next = safeRedirectPath(searchParams.get("next"), fallback);

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("[auth/callback] exchangeCodeForSession:", error.message);
      return NextResponse.redirect(`${origin}${fallback}?auth_error=1`);
    }

    const user = data.user;
    if (user?.id) {
      const displayName =
        (user.user_metadata?.full_name as string | undefined) ??
        (user.user_metadata?.display_name as string | undefined);

      logSyncVerification("auth_callback", {
        userId: user.id,
      });

      await syncUnifiedBackendUser(supabase, user.id, displayName);

      const locale =
        localeFromRedirectPath(next) ?? defaultLocale;
      const profilePath = next.includes("/profile/")
        ? safeRedirectPath(next, profilePathForUser(user.id, locale))
        : profilePathForUser(user.id, locale);

      return NextResponse.redirect(`${origin}${profilePath}`);
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
