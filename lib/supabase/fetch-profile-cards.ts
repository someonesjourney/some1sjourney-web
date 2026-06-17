import type { Locale } from "@/lib/i18n";
import type { ProfileCardStat } from "@/lib/user-profile";
import { filterProfileMyCharacterCards } from "@/lib/profile-my-cards";
import type { SupabaseClient } from "@supabase/supabase-js";
import { resolveCardImageUrl } from "@/lib/cardImageUrl";

/** Same combat scale as Expo (`CombatStatBar` uses max 100). */
export const COMBAT_STAT_MAX = 100;

type CombatProfileRpc = {
  power: number;
  defend: number;
  origin_power: number;
  origin_defend: number;
  influence_power: number;
  influence_defend: number;
  identity_power: number;
  identity_defend: number;
  influence_behavior_tags: string[];
};

type MasterCardRow = {
  card_id: string;
  name_ar: string;
  name_en: string;
  rarity: string | null;
  category: string | null;
  image_url: string | null;
  background_id: string | null;
  effect_id: string | null;
  identity_id: string | null;
};

function toStat(value: unknown): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 0;
  return Math.max(0, Math.round(parsed));
}

export function statBarPercent(
  value: number,
  max: number = COMBAT_STAT_MAX,
): number {
  if (max <= 0) return 0;
  return Math.min(100, Math.round((Math.max(0, value) / max) * 100));
}

function parseCombatProfile(data: unknown): CombatProfileRpc | null {
  if (!data || typeof data !== "object") return null;
  const row = data as Record<string, unknown>;
  const tags = row.influence_behavior_tags;

  return {
    power: toStat(row.power),
    defend: toStat(row.defend),
    origin_power: toStat(row.origin_power),
    origin_defend: toStat(row.origin_defend),
    influence_power: toStat(row.influence_power),
    influence_defend: toStat(row.influence_defend),
    identity_power: toStat(row.identity_power),
    identity_defend: toStat(row.identity_defend),
    influence_behavior_tags: Array.isArray(tags)
      ? tags.map((tag) => String(tag))
      : [],
  };
}

async function buildCombatLookupIds(
  supabase: SupabaseClient,
  cardId: string,
): Promise<string[]> {
  const trimmed = cardId.trim();
  const ids = new Set<string>([trimmed]);

  const { data: masterRow } = await supabase
    .from("master_cards")
    .select("card_id, background_id, effect_id, identity_id")
    .eq("card_id", trimmed)
    .maybeSingle();

  const row = masterRow as Pick<
    MasterCardRow,
    "card_id" | "background_id" | "effect_id" | "identity_id"
  > | null;

  if (
    row?.background_id &&
    row.effect_id &&
    row.identity_id &&
    !trimmed.match(/^nft_\d+$/)
  ) {
    const { data: libraryMatches } = await supabase
      .from("master_cards")
      .select("card_id")
      .eq("background_id", row.background_id)
      .eq("effect_id", row.effect_id)
      .eq("identity_id", row.identity_id)
      .like("card_id", "nft_%")
      .limit(8);

    for (const match of libraryMatches ?? []) {
      ids.add(String(match.card_id));
    }
  }

  return [...ids];
}

async function fetchCombatProfile(
  supabase: SupabaseClient,
  cardId: string,
): Promise<CombatProfileRpc | null> {
  const lookupIds = await buildCombatLookupIds(supabase, cardId);
  let fallback: CombatProfileRpc | null = null;

  for (const id of lookupIds) {
    const { data, error } = await supabase.rpc("card_intel_combat_profile", {
      p_card_id: id,
    });

    if (error || !data) continue;

    const parsed = parseCombatProfile(data);
    if (!parsed) continue;

    fallback = parsed;
    if (parsed.power > 0 || parsed.defend > 0) {
      return parsed;
    }
  }

  return fallback;
}

async function fetchMasterCard(
  supabase: SupabaseClient,
  cardId: string,
): Promise<MasterCardRow | null> {
  const { data } = await supabase
    .from("master_cards")
    .select(
      "card_id, name_ar, name_en, rarity, category, image_url, background_id, effect_id, identity_id",
    )
    .eq("card_id", cardId)
    .maybeSingle();

  return (data as MasterCardRow | null) ?? null;
}

function pickName(row: MasterCardRow | null, locale: Locale, fallback: string): string {
  if (!row) return fallback;
  if (locale === "ar") return row.name_ar || row.name_en || fallback;
  return row.name_en || row.name_ar || fallback;
}

function formatTag(tag: string): string {
  return tag.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function buildProfileCardStat(
  supabase: SupabaseClient,
  cardId: string,
  locale: Locale,
  options: {
    fallbackName?: string;
    fallbackRole?: string;
    isIdentity?: boolean;
  } = {},
): Promise<ProfileCardStat | null> {
  if (!cardId.trim()) return null;

  const [master, combat, imageUrl] = await Promise.all([
    fetchMasterCard(supabase, cardId),
    fetchCombatProfile(supabase, cardId),
    resolveCardImageUrl(supabase, cardId),
  ]);

  const power = combat?.power ?? 0;
  const defend = combat?.defend ?? 0;
  const tags = (combat?.influence_behavior_tags ?? []).slice(0, 3).map(formatTag);

  return {
    cardId,
    name: pickName(master, locale, options.fallbackName ?? cardId),
    imageUrl: master?.image_url || imageUrl,
    rarity: master?.rarity ?? "common",
    role: options.fallbackRole ?? master?.category ?? "identity",
    power,
    defend,
    attack: power,
    tags,
    isIdentity: options.isIdentity ?? false,
  };
}

export async function fetchOwnedProfileCards(
  supabase: SupabaseClient,
  userId: string,
  locale: Locale,
  identityCardId: string | null,
  limit = 5,
): Promise<ProfileCardStat[]> {
  const { data: rows } = await supabase
    .from("user_collected_cards")
    .select("card_id, source")
    .eq("user_id", userId)
    .order("acquired_at", { ascending: false })
    .limit(48);

  const sources: Record<string, string> = {};
  const collectedIds: string[] = [];

  for (const row of rows ?? []) {
    const cardId = String(row.card_id);
    collectedIds.push(cardId);
    if (row.source) {
      sources[cardId] = String(row.source);
    }
  }

  const uniqueLookupIds = [...new Set(collectedIds)];
  const { data: stationRows } =
    uniqueLookupIds.length > 0
      ? await supabase
          .from("master_cards")
          .select("card_id")
          .in("card_id", uniqueLookupIds)
          .eq("is_station", true)
      : { data: [] as { card_id: string }[] };

  const stationIds = new Set(
    (stationRows ?? []).map((row) => String(row.card_id)),
  );

  const eligibleIds = filterProfileMyCharacterCards(
    collectedIds,
    sources,
    stationIds,
  ).filter((id) => id !== identityCardId);

  const orderedIds = eligibleIds.slice(0, limit);

  const cards = await Promise.all(
    orderedIds.map((cardId) =>
      buildProfileCardStat(supabase, cardId, locale, {
        isIdentity: cardId === identityCardId,
      }),
    ),
  );

  return cards.filter((card): card is ProfileCardStat => card != null);
}
