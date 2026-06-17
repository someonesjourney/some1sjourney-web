import { CARD_PREVIEWS } from "@/lib/cardPreviews";
import type { Locale } from "@/lib/i18n";
import type { CombatSlide, GuideSlideCardLayout } from "@/lib/i18n/types";

export type GuideCardPreview = (typeof CARD_PREVIEWS)[number];

export function getGuideCardById(id: number): GuideCardPreview {
  const card = CARD_PREVIEWS.find((entry) => entry.id === id);
  if (!card) {
    throw new Error(`Missing card preview for id ${id}`);
  }
  return card;
}

export function getGuideCardsByIds(ids: readonly number[]): GuideCardPreview[] {
  return ids.map(getGuideCardById);
}

/** Curated picks for the Combat guide page. */
export const COMBAT_GUIDE_CARD_IDS = {
  duel: [75, 277] as const,
  roster: [42, 88, 133, 200, 250] as const,
  layers: 63,
} as const;

/** Curated picks for the Path of Becoming guide page. */
export const POB_GUIDE_CARD_IDS = {
  lensFan: [1, 11, 25] as const,
  library: [50, 100, 150, 222, 333, 420] as const,
  perception: [11, 177, 420] as const,
} as const;

type SliderCardConfig = {
  cardIds: readonly number[];
  cardLayout: GuideSlideCardLayout;
};

export const GUIDE_SLIDER_CARDS = {
  combat: {
    arena: { cardIds: [250], cardLayout: "single" },
    rounds: { cardIds: [75, 277], cardLayout: "duel" },
    exchange: { cardIds: [42, 88], cardLayout: "duel" },
    stats: { cardIds: [133], cardLayout: "single" },
    "power-defend": { cardIds: [200, 63], cardLayout: "duel" },
    actions: { cardIds: [150], cardLayout: "single" },
    layers: { cardIds: [177], cardLayout: "single" },
    modes: { cardIds: [42, 88, 133], cardLayout: "fan" },
  },
  pathOfBecoming: {
    what: { cardIds: [1], cardLayout: "single" },
    character: { cardIds: [1, 11, 25], cardLayout: "fan" },
    triangle: { cardIds: [11, 177, 420], cardLayout: "fan" },
    hidden: { cardIds: [222, 333], cardLayout: "duel" },
    resources: { cardIds: [100], cardLayout: "single" },
    endings: { cardIds: [420], cardLayout: "single" },
    rewards: { cardIds: [250], cardLayout: "single" },
    replay: { cardIds: [50, 150, 222], cardLayout: "fan" },
  },
} satisfies Record<string, Record<string, SliderCardConfig>>;

export type GuideSliderKey = keyof typeof GUIDE_SLIDER_CARDS;

export function enrichGuideSlides<T extends Pick<CombatSlide, "id">>(
  slides: readonly T[],
  guide: GuideSliderKey,
): (T & Partial<SliderCardConfig>)[] {
  const map = GUIDE_SLIDER_CARDS[guide] as Record<string, SliderCardConfig>;

  return slides.map((slide) => ({
    ...slide,
    ...map[slide.id],
  }));
}

export function getGuideCardArtCopy(locale: Locale) {
  if (locale === "ar") {
    return {
      combat: {
        duelCaption: "كروت نادرة في منطقة القتال — Power وDefend من طبقات الماضي والمؤثر والهوية.",
        rosterCaption: "جهّز كارتك النادر وادخل PvE أو PvP أو معركة جماعية.",
        layersCaption: "كل كارت يحمل نفس طبقات الهوية — لكن يعبّر عنها في القتال بشكل مختلف.",
        duelLeftAlt: "كارت نادر — جانب الهجوم",
        duelRightAlt: "كارت نادر — جانب الدفاع",
        cardAlt: (id: number) => `كارت نادر ${id}`,
      },
      pathOfBecoming: {
        lensCaption: "نفس الحدث — عدسات إدراك مختلفة حسب الشخصية التي تختارها.",
        libraryCaption: "420 شخصية في المكتبة — كل واحدة رحلة ونهايات مختلفة.",
        perceptionCaption: "الماضي · المؤثر · الهوية — ثلاث طبقات تعيد تشكيل ما تراه.",
        cardAlt: (id: number) => `شخصية نادرة ${id}`,
      },
    };
  }

  return {
    combat: {
      duelCaption:
        "Rare cards in the Combat Area — Power and Defend shaped by Past, Influence, and Identity.",
      rosterCaption: "Equip your Rare Character and enter PvE, PvP, or group battles.",
      layersCaption:
        "Every card carries the same identity layers — expressed differently in combat.",
      duelLeftAlt: "Rare card — offensive side",
      duelRightAlt: "Rare card — defensive side",
      cardAlt: (id: number) => `Rare card ${id}`,
    },
    pathOfBecoming: {
      lensCaption:
        "The same event — different perception lenses depending on which character you choose.",
      libraryCaption:
        "420 library characters — each one a different journey and ending set.",
      perceptionCaption:
        "Past · Influence · Identity — three layers that reshape what you see.",
      cardAlt: (id: number) => `Rare character ${id}`,
    },
  };
}
