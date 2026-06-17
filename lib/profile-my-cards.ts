/**
 * Same "My Cards" eligibility rules as Expo (`services/profileMyCards.ts`).
 * Original station cards and discovery-only rows are excluded.
 */

const SEASON_FUSION_RE = /^nft_(\d{2})(\d{2})(\d{2})$/i;

const OWNED_NFT_COLLECTION_SOURCES = new Set([
  "library_store",
  "store",
  "purchase",
  "generated",
  "market_purchase",
  "market_negotiation",
  "market",
  "trade",
  "sale",
  "mission_reward",
  "mission",
  "reward",
  "quest",
  "gift",
  "path_fusion",
  "fusion",
]);

const PROFILE_ELIGIBLE_SOURCES = new Set([
  "library_store",
  "market_purchase",
  "mission_reward",
  "path_fusion",
  "seasonal_identity",
]);

export type CardAcquisitionSource =
  | "station"
  | "path_fusion"
  | "library_store"
  | "market_purchase"
  | "mission_reward"
  | "seasonal_identity";

export function isSeasonFusionNftId(raw: string): boolean {
  return SEASON_FUSION_RE.test(raw.trim());
}

export function normalizeNftCardId(raw: string): string {
  const trimmed = raw.trim();
  if (isSeasonFusionNftId(trimmed)) {
    return trimmed.toLowerCase();
  }
  if (isOriginalStationCardId(trimmed)) {
    return trimmed.padStart(2, "0");
  }
  if (trimmed.toLowerCase().startsWith("nft_")) {
    const numeric = parseInt(trimmed.replace(/^nft_/i, ""), 10);
    return Number.isFinite(numeric) ? `nft_${numeric}` : trimmed;
  }
  const numeric = parseInt(trimmed, 10);
  if (Number.isFinite(numeric) && numeric > 0) {
    return `nft_${numeric}`;
  }
  return trimmed;
}

export function isOriginalStationCardId(
  raw: string,
  stationIdsFromCatalog?: Set<string>,
): boolean {
  const id = raw.trim();
  if (!id || isSeasonFusionNftId(id)) return false;
  if (id.toLowerCase().startsWith("nft_")) return false;

  if (stationIdsFromCatalog?.has(id) || stationIdsFromCatalog?.has(id.padStart(2, "0"))) {
    return true;
  }

  const padded = id.padStart(2, "0");
  const numeric = parseInt(padded, 10);
  return Number.isFinite(numeric) && numeric >= 0 && numeric <= 15;
}

function mapDbSource(
  dbSource: string,
  norm: string,
): CardAcquisitionSource | null {
  if (norm.startsWith("nft_") && dbSource === "collected") {
    return null;
  }

  if (
    dbSource === "library_store" ||
    dbSource === "generated" ||
    dbSource === "store" ||
    dbSource === "purchase"
  ) {
    return "library_store";
  }
  if (
    dbSource === "market_purchase" ||
    dbSource === "market_negotiation" ||
    dbSource === "market" ||
    dbSource === "trade" ||
    dbSource === "sale"
  ) {
    return "market_purchase";
  }
  if (
    dbSource === "mission_reward" ||
    dbSource === "mission" ||
    dbSource === "reward" ||
    dbSource === "quest" ||
    dbSource === "gift"
  ) {
    return "mission_reward";
  }
  if (dbSource === "path_fusion" || dbSource === "fusion") {
    return "path_fusion";
  }
  if (dbSource === "seasonal_identity" || dbSource === "identity") {
    return "seasonal_identity";
  }
  if (dbSource === "station") {
    return "station";
  }
  if (OWNED_NFT_COLLECTION_SOURCES.has(dbSource)) {
    return dbSource as CardAcquisitionSource;
  }
  if (norm.startsWith("nft_")) {
    return null;
  }
  return "library_store";
}

export function filterProfileMyCharacterCards(
  collectedCards: string[],
  sources: Partial<Record<string, string>>,
  stationIdsFromCatalog?: Set<string>,
): string[] {
  const out: string[] = [];
  const seen = new Set<string>();

  for (const raw of collectedCards) {
    if (isOriginalStationCardId(raw, stationIdsFromCatalog)) {
      continue;
    }

    const norm = normalizeNftCardId(raw);
    if (!norm.startsWith("nft_")) {
      continue;
    }

    const dbSource = sources[raw] ?? sources[norm];
    let src: CardAcquisitionSource | null = null;

    if (dbSource) {
      src = mapDbSource(dbSource, norm);
    } else if (norm.startsWith("nft_")) {
      continue;
    } else {
      src = "library_store";
    }

    if (!src || !PROFILE_ELIGIBLE_SOURCES.has(src)) {
      continue;
    }

    if (!seen.has(norm)) {
      seen.add(norm);
      out.push(norm);
    }
  }

  return out.sort(
    (a, b) =>
      parseInt(a.replace(/^nft_/i, ""), 10) -
      parseInt(b.replace(/^nft_/i, ""), 10),
  );
}
