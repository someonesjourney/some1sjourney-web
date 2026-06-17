import type { Locale } from "@/lib/i18n";
import { getNftNumericId } from "@/lib/cardImageUrl";
import {
  buildProfileCardStat,
  fetchOwnedProfileCards,
} from "@/lib/supabase/fetch-profile-cards";
import { getSupabase } from "@/lib/supabase";
import type { MemoryHighlight, UserProfile } from "@/lib/user-profile";

type ProfileRow = {
  user_id: string;
  email: string;
  username: string | null;
  display_name: string | null;
};

type IdentityCardRow = {
  nft_card_id: string;
  card_name_ar: string;
  card_name_en: string;
  card_description_ar: string;
  card_description_en: string;
  destiny_name_ar: string;
  destiny_name_en: string;
  stage_at_creation: string;
};

type UserStatsRow = {
  total_points: number | null;
  level: number | null;
};

type TeamMemberRow = {
  team_id: string;
  card_teams: {
    id: string;
    card_name_ar: string;
    card_name_en: string;
    member_count: number;
  } | null;
};

type MemoryRow = {
  id: string;
  note: string;
  created_at: string;
};

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUuid(value: string): boolean {
  return UUID_REGEX.test(value);
}

function resolveDisplayName(profile: ProfileRow): string {
  return (
    profile.display_name?.trim() ||
    profile.username?.trim() ||
    profile.email.split("@")[0] ||
    "Traveler"
  );
}

function pickLocalized(
  locale: Locale,
  enKey: "card_name_en" | "card_description_en" | "destiny_name_en",
  arKey: "card_name_ar" | "card_description_ar" | "destiny_name_ar",
  row: Record<string, string | null | undefined>,
): string {
  const arValue = row[arKey];
  const enValue = row[enKey];
  if (locale === "ar") {
    return (arValue ?? enValue ?? "").toString();
  }
  return (enValue ?? arValue ?? "").toString();
}

function mapMemories(rows: MemoryRow[]): MemoryHighlight[] {
  return rows.map((row) => {
    const trimmed = row.note.trim();
    const [firstLine, ...rest] = trimmed.split("\n");
    const title = firstLine?.slice(0, 80) || "Memory";
    const description = rest.join("\n").trim() || trimmed;

    return {
      id: row.id,
      title,
      description,
      earnedAt: row.created_at.slice(0, 10),
    };
  });
}

export async function fetchPublicProfileFromSupabase(
  userId: string,
  locale: Locale = "en",
): Promise<UserProfile | null> {
  const supabase = getSupabase();
  if (!supabase || !isUuid(userId)) return null;

  const { data: profileRow, error: profileError } = await supabase
    .from("profiles")
    .select("user_id, email, username, display_name")
    .eq("user_id", userId)
    .maybeSingle();

  if (profileError || !profileRow) return null;

  const profile = profileRow as ProfileRow;

  const [
    { data: identityRow },
    { data: statsRow },
    { data: teamMemberRow },
    { data: memoryRows },
    seasonKeyResult,
  ] = await Promise.all([
    supabase
      .from("user_identity_cards")
      .select(
        "nft_card_id, card_name_ar, card_name_en, card_description_ar, card_description_en, destiny_name_ar, destiny_name_en, stage_at_creation",
      )
      .eq("user_id", userId)
      .maybeSingle(),
    supabase
      .from("user_stats")
      .select("total_points, level")
      .eq("user_id", userId)
      .maybeSingle(),
    supabase
      .from("team_members")
      .select(
        "team_id, card_teams ( id, card_name_ar, card_name_en, member_count )",
      )
      .eq("user_id", userId)
      .maybeSingle(),
    supabase
      .from("card_memories")
      .select("id, note, created_at")
      .eq("author_id", userId)
      .order("created_at", { ascending: false })
      .limit(12),
    supabase.rpc("get_current_season_key"),
  ]);

  const identity = identityRow as IdentityCardRow | null;
  const stats = statsRow as UserStatsRow | null;
  const teamMember = teamMemberRow as TeamMemberRow | null;
  const memories = (memoryRows ?? []) as MemoryRow[];

  const identityCardId = identity?.nft_card_id?.trim() ?? null;

  const cardName = identity
    ? pickLocalized(locale, "card_name_en", "card_name_ar", identity)
    : locale === "ar"
      ? "هوية قيد الاكتشاف"
      : "Identity Pending";
  const cardArchetype = identity
    ? pickLocalized(locale, "card_description_en", "card_description_ar", identity)
    : locale === "ar"
      ? "لم يُكشف بعد"
      : "Not yet revealed";
  const destinyRole = identity
    ? pickLocalized(locale, "destiny_name_en", "destiny_name_ar", identity)
    : locale === "ar"
      ? "عضو"
      : "Member";

  const [identityCardStat, ownedCards] = await Promise.all([
    identityCardId
      ? buildProfileCardStat(supabase, identityCardId, locale, {
          fallbackName: cardName,
          fallbackRole: destinyRole,
          isIdentity: true,
        })
      : Promise.resolve(null),
    fetchOwnedProfileCards(supabase, userId, locale, identityCardId, 5),
  ]);

  const seasonKey =
    typeof seasonKeyResult.data === "string" && seasonKeyResult.data.trim()
      ? seasonKeyResult.data
      : "Season One";

  const tribeTeam = teamMember?.card_teams;
  const tribeName = tribeTeam
    ? pickLocalized(locale, "card_name_en", "card_name_ar", {
        card_name_en: tribeTeam.card_name_en,
        card_name_ar: tribeTeam.card_name_ar,
      })
    : cardName;

  const power = identityCardStat?.power ?? 0;
  const defend = identityCardStat?.defend ?? 0;

  return {
    id: profile.user_id,
    name: resolveDisplayName(profile),
    identityCard: {
      id: getNftNumericId(identityCardId),
      cardId: identityCardId ?? "",
      name: identityCardStat?.name ?? cardName,
      imageUrl: identityCardStat?.imageUrl ?? "/images/card-back.png",
      archetype: cardArchetype,
      power,
      defend,
      attack: power,
      rarity: identityCardStat?.rarity ?? "identity",
      role: destinyRole,
      tags: identityCardStat?.tags ?? [],
    },
    tribe: {
      id: tribeTeam?.id ?? `team-${profile.user_id}`,
      name: tribeName,
      role: destinyRole,
      memberCount: tribeTeam?.member_count ?? 1,
      collectivePattern: cardArchetype,
    },
    pts: stats?.total_points ?? 0,
    level: stats?.level ?? 1,
    season: {
      name: seasonKey,
      stage: identity?.stage_at_creation ?? seasonKey,
    },
    memories: mapMemories(memories),
    ownedCards:
      ownedCards.length > 0
        ? ownedCards
        : identityCardStat
          ? [identityCardStat]
          : [],
  };
}
