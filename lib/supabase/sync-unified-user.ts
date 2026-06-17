import type { SupabaseClient } from "@supabase/supabase-js";
import { logSyncVerification } from "@/lib/debug/syncVerification";

const REPAIR_TEAM_RPC = "repair_user_identity_team_membership";

/** Same backend sync as Expo — profiles, stats, tribe membership. */
export async function syncUnifiedBackendUser(
  supabase: SupabaseClient,
  userId: string,
  displayName?: string | null,
): Promise<void> {
  if (!userId) return;

  logSyncVerification("sync_start", { userId, displayName: displayName ?? null });

  const { data: profileRow } = await supabase
    .from("profiles")
    .select("user_id, display_name, email")
    .eq("user_id", userId)
    .maybeSingle();

  if (!profileRow) {
    const { error: ensureError } = await supabase.rpc("ensure_user_profile", {
      p_full_name: displayName?.trim() || null,
    });
    if (ensureError) {
      console.error("[unifiedProfileSync:web] ensure_user_profile:", ensureError.message);
    }
  }

  const { data: statsRow } = await supabase
    .from("user_stats")
    .select("user_id, total_points, level")
    .eq("user_id", userId)
    .maybeSingle();

  if (!statsRow) {
    const { error: statsError } = await supabase.from("user_stats").insert({
      user_id: userId,
      total_points: 0,
      level: 1,
      followers_count: 0,
      following_count: 0,
      xp: 0,
    });
    if (statsError) {
      console.error("[unifiedProfileSync:web] user_stats insert:", statsError.message);
    }
  }

  const { data: identityRow } = await supabase
    .from("user_identity_cards")
    .select("nft_card_id, card_name_en")
    .eq("user_id", userId)
    .maybeSingle();

  const { error: repairError } = await supabase.rpc(REPAIR_TEAM_RPC, {
    p_user_id: userId,
  });
  if (repairError && !repairError.message.includes("does not exist")) {
    console.warn("[unifiedProfileSync:web] repair team:", repairError.message);
  }

  logSyncVerification("sync_complete", {
    userId,
    profileExists: Boolean(profileRow),
    stats: statsRow ?? null,
    identityCard: identityRow ?? null,
  });
}
