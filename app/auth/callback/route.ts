import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { syncUnifiedBackendUser } from "@/lib/supabase/sync-unified-user";
import { logSyncVerification } from "@/lib/debug/syncVerification";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/en/profile";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("[auth/callback] exchangeCodeForSession:", error.message);
      return NextResponse.redirect(`${origin}/en/profile?auth_error=1`);
    }

    const user = data.user;
    if (user?.id) {
      const displayName =
        (user.user_metadata?.full_name as string | undefined) ??
        (user.user_metadata?.display_name as string | undefined);

      logSyncVerification("auth_callback", {
        userId: user.id,
        email: user.email,
      });

      await syncUnifiedBackendUser(supabase, user.id, displayName);

      const profilePath = next.includes("/profile/")
        ? next
        : `/en/profile/${user.id}`;

      return NextResponse.redirect(`${origin}${profilePath}`);
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
