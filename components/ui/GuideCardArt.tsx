import { IdentityCard } from "@/components/ui/IdentityCard";
import {
  COMBAT_GUIDE_CARD_IDS,
  POB_GUIDE_CARD_IDS,
  getGuideCardById,
  getGuideCardsByIds,
  type GuideCardPreview,
} from "@/lib/guideCardArt";
import type { GuideSlideCardLayout } from "@/lib/i18n/types";

type GuideCardDuelProps = {
  left: GuideCardPreview;
  right: GuideCardPreview;
  leftAlt: string;
  rightAlt: string;
  vsLabel: string;
  caption?: string;
  className?: string;
};

export function GuideCardDuel({
  left,
  right,
  leftAlt,
  rightAlt,
  vsLabel,
  caption,
  className = "",
}: GuideCardDuelProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative flex w-full max-w-md items-end justify-center gap-3 sm:gap-4">
        <div className="relative w-[42%] -rotate-6 transition hover:z-10 hover:scale-[1.02]">
          <IdentityCard src={left.url} alt={leftAlt} priority />
        </div>
        <div
          className="absolute bottom-[38%] z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-gold)] bg-background/90 text-[11px] font-bold uppercase tracking-wide text-gold shadow-lg backdrop-blur-sm"
          aria-hidden="true"
        >
          {vsLabel}
        </div>
        <div className="relative w-[42%] rotate-6 transition hover:z-10 hover:scale-[1.02]">
          <IdentityCard src={right.url} alt={rightAlt} priority />
        </div>
      </div>
      {caption ? (
        <p className="mt-4 max-w-sm text-center text-xs leading-relaxed text-muted">
          {caption}
        </p>
      ) : null}
    </div>
  );
}

type GuideCardFanProps = {
  cards: GuideCardPreview[];
  alts: string[];
  caption?: string;
  className?: string;
};

export function GuideCardFan({
  cards,
  alts,
  caption,
  className = "",
}: GuideCardFanProps) {
  const rotations = [-12, 0, 12];
  const offsets = ["translate-x-3", "translate-y-0", "-translate-x-3"];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative flex h-[220px] w-full max-w-xs items-end justify-center sm:h-[260px] sm:max-w-sm">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`absolute w-[38%] transition hover:z-20 hover:scale-105 ${offsets[index] ?? ""}`}
            style={{
              transform: `rotate(${rotations[index] ?? 0}deg)`,
              zIndex: index + 1,
              left: `${18 + index * 22}%`,
            }}
          >
            <IdentityCard
              src={card.url}
              alt={alts[index] ?? `Card ${card.id}`}
              priority={index === 1}
            />
          </div>
        ))}
      </div>
      {caption ? (
        <p className="mt-2 max-w-sm text-center text-xs leading-relaxed text-muted">
          {caption}
        </p>
      ) : null}
    </div>
  );
}

type GuideCardStripProps = {
  cards: GuideCardPreview[];
  altForId: (id: number) => string;
  caption?: string;
  className?: string;
};

export function GuideCardStrip({
  cards,
  altForId,
  caption,
  className = "",
}: GuideCardStripProps) {
  return (
    <div className={className}>
      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:thin]">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="w-[108px] shrink-0 sm:w-[120px]"
          >
            <IdentityCard
              src={card.url}
              alt={altForId(card.id)}
              priority={index < 3}
            />
          </div>
        ))}
      </div>
      {caption ? (
        <p className="mt-3 text-center text-xs leading-relaxed text-muted sm:text-start">
          {caption}
        </p>
      ) : null}
    </div>
  );
}

type GuideCardSpotlightProps = {
  card: GuideCardPreview;
  alt: string;
  className?: string;
};

export function GuideCardSpotlight({
  card,
  alt,
  className = "",
}: GuideCardSpotlightProps) {
  return (
    <div className={`relative mx-auto max-w-[200px] ${className}`}>
      <div className="absolute -inset-4 rounded-3xl bg-accent/10 blur-2xl" aria-hidden="true" />
      <div className="relative">
        <IdentityCard src={card.url} alt={alt} priority />
      </div>
    </div>
  );
}

type GuideCardPerceptionRowProps = {
  cardIds: readonly number[];
  labels: string[];
  altForId: (id: number) => string;
  caption?: string;
  className?: string;
};

export function GuideCardPerceptionRow({
  cardIds,
  labels,
  altForId,
  caption,
  className = "",
}: GuideCardPerceptionRowProps) {
  const cards = getGuideCardsByIds(cardIds);

  return (
    <div className={className}>
      <div className="grid grid-cols-3 gap-3">
        {cards.map((card, index) => (
          <div key={card.id} className="flex flex-col items-center gap-2">
            <div className="w-full max-w-[120px]">
              <IdentityCard src={card.url} alt={altForId(card.id)} />
            </div>
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-gold">
              {labels[index]}
            </p>
          </div>
        ))}
      </div>
      {caption ? (
        <p className="mt-4 text-center text-xs leading-relaxed text-muted">
          {caption}
        </p>
      ) : null}
    </div>
  );
}

export function buildCombatGuideCards() {
  const ids = COMBAT_GUIDE_CARD_IDS;
  return {
    duel: {
      left: getGuideCardById(ids.duel[0]),
      right: getGuideCardById(ids.duel[1]),
    },
    roster: getGuideCardsByIds(ids.roster),
    layers: getGuideCardById(ids.layers),
  };
}

type FeatureSliderCardsProps = {
  cardIds: readonly number[];
  layout?: GuideSlideCardLayout;
  altForId: (id: number) => string;
  vsLabel: string;
  className?: string;
};

export function FeatureSliderCards({
  cardIds,
  layout,
  altForId,
  vsLabel,
  className = "",
}: FeatureSliderCardsProps) {
  if (cardIds.length === 0) return null;

  const resolvedLayout =
    layout ??
    (cardIds.length >= 3 ? "fan" : cardIds.length === 2 ? "duel" : "single");
  const cards = getGuideCardsByIds(
    cardIds.slice(0, resolvedLayout === "fan" ? 3 : resolvedLayout === "duel" ? 2 : 1),
  );

  if (resolvedLayout === "duel" && cards.length >= 2) {
    return (
      <div className={`mx-auto w-full max-w-[168px] sm:max-w-[180px] ${className}`}>
        <div className="relative flex items-end justify-center gap-1.5">
          <div className="relative w-[46%] -rotate-6">
            <IdentityCard src={cards[0].url} alt={altForId(cards[0].id)} priority />
          </div>
          <div
            className="absolute bottom-[36%] z-10 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border-gold)] bg-background/90 text-[9px] font-bold uppercase text-gold"
            aria-hidden="true"
          >
            {vsLabel}
          </div>
          <div className="relative w-[46%] rotate-6">
            <IdentityCard src={cards[1].url} alt={altForId(cards[1].id)} />
          </div>
        </div>
      </div>
    );
  }

  if (resolvedLayout === "fan" && cards.length >= 3) {
    const rotations = [-10, 0, 10];
    return (
      <div className={`relative mx-auto h-[190px] w-full max-w-[200px] sm:max-w-[220px] ${className}`}>
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="absolute w-[40%]"
            style={{
              left: `${14 + index * 23}%`,
              bottom: 0,
              zIndex: index + 1,
              transform: `rotate(${rotations[index] ?? 0}deg)`,
            }}
          >
            <IdentityCard
              src={card.url}
              alt={altForId(card.id)}
              priority={index === 1}
            />
          </div>
        ))}
      </div>
    );
  }

  const card = cards[0];
  if (!card) return null;

  return (
    <div className={`relative mx-auto w-full max-w-[132px] sm:max-w-[148px] ${className}`}>
      <div className="absolute -inset-3 rounded-2xl bg-accent/10 blur-xl" aria-hidden="true" />
      <div className="relative">
        <IdentityCard src={card.url} alt={altForId(card.id)} priority />
      </div>
    </div>
  );
}

export function buildPoBGuideCards() {
  const ids = POB_GUIDE_CARD_IDS;
  return {
    lensFan: getGuideCardsByIds(ids.lensFan),
    library: getGuideCardsByIds(ids.library),
    perceptionIds: ids.perception,
  };
}
