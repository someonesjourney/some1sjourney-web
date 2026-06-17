import type { SupabaseClient } from "@supabase/supabase-js";
import { CARD_PREVIEWS } from "./cardPreviews";

const CARD_BACK_FALLBACK = "/images/card-back.png";

function extractNftNumericId(nftCardId: string): number | null {
  const match = nftCardId.match(/nft_(\d+)/i);
  if (!match) return null;
  const parsed = Number.parseInt(match[1], 10);
  return Number.isFinite(parsed) ? parsed : null;
}

/** Resolve card image from Supabase catalog (same source as Expo). */
export async function resolveCardImageUrl(
  supabase: SupabaseClient,
  cardId: string | null | undefined,
): Promise<string> {
  if (!cardId?.trim()) return CARD_BACK_FALLBACK;

  const normalized = cardId.trim();

  const { data: rpcUrl } = await supabase.rpc("get_card_image_url", {
    p_card_id: normalized,
  });

  if (typeof rpcUrl === "string" && rpcUrl.trim()) {
    return rpcUrl.trim();
  }

  const { data: masterRow } = await supabase
    .from("master_cards")
    .select("image_url")
    .eq("card_id", normalized)
    .maybeSingle();

  if (masterRow?.image_url) {
    return masterRow.image_url;
  }

  const numericId = extractNftNumericId(normalized);
  if (numericId != null) {
    const preview = CARD_PREVIEWS.find((card) => card.id === numericId);
    if (preview) return preview.url;
  }

  return CARD_BACK_FALLBACK;
}

export function getNftImageUrl(nftCardId: string | null | undefined): string {
  if (!nftCardId?.trim()) return CARD_BACK_FALLBACK;
  const numericId = extractNftNumericId(nftCardId.trim());
  if (numericId != null) {
    const preview = CARD_PREVIEWS.find((card) => card.id === numericId);
    if (preview) return preview.url;
  }
  return CARD_BACK_FALLBACK;
}

export function getNftNumericId(nftCardId: string | null | undefined): number {
  return extractNftNumericId(nftCardId?.trim() ?? "") ?? 0;
}

export { CARD_BACK_FALLBACK };
