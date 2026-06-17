import type { Locale } from "./i18n";
import {
  fetchPublicProfileFromSupabase,
  isUuid,
} from "./supabase/fetch-public-profile";
import { isSupabaseConfigured } from "./supabase/config";
import { logSyncVerification } from "./debug/syncVerification";

// ============================================================
// User Profile — shared Supabase backend (web + Expo)
// Supabase auth.users.id is the ONLY canonical user identity.
// ============================================================

export type IdentityCardData = {
  id: number;
  cardId: string;
  name: string;
  imageUrl: string;
  archetype: string;
  power: number;
  defend: number;
  attack: number;
  rarity: string;
  role: string;
  tags: string[];
};

export type ProfileCardStat = {
  cardId: string;
  name: string;
  imageUrl: string;
  rarity: string;
  role: string;
  power: number;
  defend: number;
  attack: number;
  tags: string[];
  isIdentity: boolean;
};

export type TribeData = {
  id: string;
  name: string;
  role: string;
  memberCount: number;
  collectivePattern: string;
};

export type MemoryHighlight = {
  id: string;
  title: string;
  description: string;
  earnedAt: string;
};

export type UserProfile = {
  id: string;
  name: string;
  identityCard: IdentityCardData;
  tribe: TribeData;
  pts: number;
  memories: MemoryHighlight[];
  level: number;
  season: {
    name: string;
    stage: string;
  };
  ownedCards: ProfileCardStat[];
};

export type UserProfileResult =
  | { status: "found"; profile: UserProfile }
  | { status: "not_found" }
  | { status: "invalid_id" }
  | { status: "unconfigured" };

function normalizeUserId(userId: string | undefined | null): string | null {
  if (!userId) return null;
  const trimmed = userId.trim();
  if (!trimmed || !isUuid(trimmed)) return null;
  return trimmed;
}

async function fetchUserProfile(
  userId: string,
  locale: Locale = "en",
): Promise<UserProfileResult> {
  const normalized = normalizeUserId(userId);
  if (!normalized) return { status: "invalid_id" };

  if (!isSupabaseConfigured()) {
    return { status: "unconfigured" };
  }

  const profile = await fetchPublicProfileFromSupabase(normalized, locale);
  if (!profile) {
    logSyncVerification("profile_not_found", { userId: normalized });
    return { status: "not_found" };
  }

  logSyncVerification("profile_fetched", {
    userId: profile.id,
    name: profile.name,
    pts: profile.pts,
    level: profile.level,
    identityCard: profile.identityCard.name,
    tribe: profile.tribe.name,
  });

  return { status: "found", profile };
}

export async function getUserProfile(
  userId: string | undefined | null,
  locale: Locale = "en",
): Promise<UserProfileResult> {
  if (!userId?.trim()) return { status: "invalid_id" };
  return fetchUserProfile(userId, locale);
}

/** Build a shareable profile URL for the marketing site. */
export function getProfileSharePath(userId: string): string {
  return `/profile/${encodeURIComponent(userId)}`;
}

/** Deep link for opening profile in the Expo app. */
export function getProfileExpoDeepLink(userId: string): string {
  return `some1sjourney://profile/${encodeURIComponent(userId)}`;
}

/** Canonical Supabase table mapping (single source of truth with Expo). */
export const SUPABASE_ENTITY_MAP = {
  users: "profiles (user_id → auth.users.id)",
  identityCards: "user_identity_cards",
  tribes: "card_teams + team_members",
  pts: "user_stats.total_points",
  memories: "card_memories",
} as const;
