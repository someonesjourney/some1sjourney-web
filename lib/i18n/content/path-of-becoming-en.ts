import type { SiteContent } from "../types";

export const pathOfBecomingEn: SiteContent["pathOfBecoming"] = {
  label: "Path of Becoming",
  title: "Events are fixed. Perception is not.",
  description:
    "Path of Becoming is Some1sJourney’s narrative psychological journey — Pillar II of the living world. Fifteen stages, one event per run, and a Rare Character lens that changes what you see, what unlocks, and who you become.",
  heroHighlight:
    "This is not combat and not a personality quiz. It is a fixed library of 45 story events discovered across replays — where your Past, Influence, and Identity reshape every decision.",
  importance: {
    title: "Why Path of Becoming matters",
    pillars: [
      {
        title: "The perception philosophy",
        description:
          "The world does not rewrite itself for you. Your Rare Character rewrites what you notice, what resonates, and which hidden paths open — the core Some1sJourney idea that identity is lived, not labeled.",
      },
      {
        title: "Every Rare Character becomes playable",
        description:
          "420 library characters are perception lenses, not locked collectibles. Traveler mode lets anyone experience the full journey and build personal knowledge — even without owning the card.",
      },
      {
        title: "Progression that feeds the whole world",
        description:
          "Owners and team members convert deep runs into Card Knowledge, Card XP, Team XP, and Destiny DP — linking narrative play to tribes, combat readiness, and long-term evolution.",
      },
      {
        title: "Replay without bloat",
        description:
          "Three events exist per stage, but each run shows only one. Run 1, 2, and 3 rotate through the catalog so sessions stay focused while the full 45-event library unfolds over time.",
      },
    ],
  },
  slider: {
    title: "Journey codex — swipe through the system",
    subtitle:
      "Eight lenses on how a run works — from choosing a character to earning knowledge and replaying for alternate events.",
    prevLabel: "Previous slide",
    nextLabel: "Next slide",
    goToLabel: "Go to slide",
    slides: [
      {
        id: "what",
        kicker: "01 · What it is",
        title: "A narrative psychological journey",
        body:
          "Each run has 15 stages with one event per stage. On replay, alternate events from the same stages appear. The world does not change — what changes is what you perceive and which choices unlock.",
        bullets: [
          "Not combat — story, choices, and identity.",
          "One focused run ≈ 15 meaningful decisions.",
          "Philosophy: events are fixed — perception is not.",
        ],
        accent: "violet",
      },
      {
        id: "character",
        kicker: "02 · Rare Character",
        title: "Choose your perception lens",
        body:
          "Pick any Rare Character from the library. Past + Influence + Identity form your lens: the same event may read differently, and extra choices may unlock that others cannot see.",
        bullets: [
          "Owned cards first; unowned = Traveler mode.",
          "Three hidden affinities per character (420 combinations).",
          "Each card = a unique perception experience.",
        ],
        chips: ["Past", "Influence", "Identity"],
        accent: "gold",
      },
      {
        id: "triangle",
        kicker: "03 · Decision Triangle",
        title: "Action · Reflection · Preservation",
        body:
          "Every event offers three core paths. Your pattern builds Resonance and steers endings — there is no single “correct” answer, only who you become.",
        bullets: [
          "Action — Courage rises; direct momentum.",
          "Reflection — Insight rises; read before you move.",
          "Preservation — Balance rises; protect what matters.",
        ],
        accent: "emerald",
      },
      {
        id: "hidden",
        kicker: "04 · Hidden choices",
        title: "Opportunity · Secret · Chaos",
        body:
          "Extra choices may appear when Awareness and character layers align. They are not visible from the start — discovery is part of the journey.",
        bullets: [
          "Opportunity — often unlocks from stage depth ≥ 1.",
          "Secret — deeper affinity and Awareness thresholds.",
          "Chaos — high-risk paths when the journey demands it.",
        ],
        accent: "crimson",
      },
      {
        id: "resources",
        kicker: "05 · Journey resources",
        title: "Four inner measures",
        body:
          "Courage, Insight, Balance, and Awareness shift with every choice. Awareness opens deeper perception; the other three echo your decision style.",
        chips: ["Courage", "Insight", "Balance", "Awareness"],
        accent: "gold",
      },
      {
        id: "endings",
        kicker: "06 · Endings",
        title: "Who did you become?",
        body:
          "A visible ending reflects your character identity. You may also uncover a secret ending. Separately, a Journey Identity labels your path style — Wanderer, Observer, Rebel, and more.",
        accent: "violet",
      },
      {
        id: "rewards",
        kicker: "07 · Rewards",
        title: "Knowledge depth tiers",
        body:
          "Owners and team members earn Card XP, Player XP, Team XP, Destiny DP, and Knowledge Points on the card. Travelers earn Player XP and personal knowledge only — full experience, scoped rewards.",
        bullets: [
          "Deeper runs (resonance, secrets, awareness) pay more.",
          "Knowledge unlocks perception depth: Dormant → Transcendent.",
          "Traveler: no card or team XP — by design.",
        ],
        accent: "emerald",
      },
      {
        id: "replay",
        kicker: "08 · Replay",
        title: "45 events · 15 per run",
        body:
          "Run 1 shows event 1 per stage; run 2 shows event 2; run 3 shows event 3; then the cycle repeats. You discover the full catalog without overstaying a single session.",
        chips: ["45 catalog", "15 per run", "3-run rotation"],
        accent: "crimson",
      },
    ],
  },
  philosophy: {
    title: "Philosophy of perception",
    quote: "Events are fixed — perception is not.",
    body:
      "Path of Becoming is not a game that changes the world. It is a game that changes the lens. The event library is shared; the text variants, resonance bonuses, hidden unlocks, and endings are filtered through your Rare Character’s Past, Influence, and Identity.",
  },
  stages: {
    title: "The 15 stages",
    subtitle:
      "One themed stage per step of the journey — from the first call to migrate toward the Final Gate.",
    items: [
      { number: 1, title: "The Migrant's Call", theme: "Departure, risk, and the road not taken" },
      { number: 2, title: "Matrix Vortex", theme: "Collective truth vs. your own signal" },
      { number: 3, title: "House of Tranquility", theme: "Comfort, routine, and the cost of staying" },
      { number: 4, title: "Instinct of Light", theme: "Help, gain, and moral pressure" },
      { number: 5, title: "Beneath The Trees", theme: "Silence, missing pieces, learning" },
      { number: 6, title: "Locks & Doors", theme: "Secrets, guardians, and thresholds" },
      { number: 7, title: "Sharks & Pearls", theme: "Wagers, deals, and what you trade" },
      { number: 8, title: "Apples & Arrows", theme: "Memory, repetition, familiar faces" },
      { number: 9, title: "Burning Echoes", theme: "Provocation, rivalry, open conflict" },
      { number: 10, title: "Conflict Cycle", theme: "Patterns that return until faced" },
      { number: 11, title: "Wishbearer", theme: "Desire, rewrite, and identity power" },
      { number: 12, title: "The Red Giant", theme: "Scale, awe, and overwhelming force" },
      { number: 13, title: "Collapse of Ego", theme: "When the self structure breaks open" },
      { number: 14, title: "Abyss Eagle", theme: "Depth, conversion, and abyss sight" },
      { number: 15, title: "Final Gate", theme: "The last threshold — who crosses, and as whom" },
    ],
  },
  decisionFlow: {
    title: "How a single event plays",
    body:
      "You read the premise through your character lens, choose from the Decision Triangle, and may unlock hidden paths. The outcome narrative reflects resonance, resources, and passives — then the journey advances.",
    coreChoices: [
      { title: "Action", description: "Commit outward — builds Courage and bold endings." },
      { title: "Reflection", description: "Pause and read — builds Insight and observant endings." },
      { title: "Preservation", description: "Protect stability — builds Balance and guarded endings." },
    ],
    hiddenChoices: [
      { title: "Opportunity", description: "A door others walk past — often needs perception depth." },
      { title: "Secret", description: "Affinity-aligned revelations — high Awareness runs." },
      { title: "Chaos", description: "Volatile paths — risk and reward spike together." },
    ],
  },
  perceptionLens: {
    title: "The perception lens",
    body:
      "Your Rare Character is not cosmetic. It filters event wording, resonance on aligned choices, hidden unlock thresholds, and which endings are even reachable.",
    layers: [
      { title: "Past (Origin)", description: "Foundation tone — automatic leanings in how events frame duty, memory, and roots." },
      { title: "Influence", description: "Behavioral tilt — how you are pushed toward alliance, impulse, or strategy." },
      { title: "Identity", description: "Core self — finisher mechanics like Wishbearer Rewrite or Abyss Eagle resource conversion." },
    ],
  },
  traveler: {
    title: "Owner · Team · Traveler",
    body:
      "Everyone can play the full 15-event journey on any library Rare Character. What changes is what progress attaches to the shared card and tribe.",
    columns: { reward: "Reward", owner: "Owner / team", traveler: "Traveler" },
    rows: [
      { label: "Player XP", owner: "Yes", traveler: "Yes" },
      { label: "Personal knowledge of character", owner: "Yes", traveler: "Yes" },
      { label: "Card XP on the character", owner: "Yes", traveler: "No" },
      { label: "Team XP / contribution", owner: "Yes", traveler: "No" },
      { label: "Destiny DP", owner: "Yes", traveler: "No" },
      { label: "Full perception / hidden mechanics", owner: "Yes", traveler: "Yes" },
    ],
  },
  entryRitual: {
    title: "Entry Ritual — the threshold before the path",
    body:
      "Separate from a full run, Entry Ritual is six reflective questions that map to a probabilistic composition and suggested Rare Character. Replay anytime from Game Hub — there is no wrong answer.",
    steps: [
      { label: "Language", description: "Choose Arabic or English for the ritual voice." },
      { label: "Six questions", description: "Reflect on fear, desire, patterns, and direction (~3 min)." },
      { label: "Composition reveal", description: "See your emerging archetype blend — not a final label." },
      { label: "Next step", description: "Continue to Seasonal Identity or enter Path of Becoming with a matched card." },
    ],
    sampleQuestions: [
      "What occupies most of your thoughts these days?",
      "If fear disappeared for a week… what would you do?",
      "When conflict appears, do you confront, withdraw, or observe first?",
    ],
  },
  replay: {
    title: "Replay & the 45-event catalog",
    body:
      "Each stage stores three events. Your first completed run pulls index 0 from every stage; the second run pulls index 1; the third index 2; then rotation continues. Secrets, affinities, and alternate endings reward returning with the same or a different character.",
    steps: [
      { label: "Run 1", description: "First event per stage — your baseline journey." },
      { label: "Run 2", description: "Second event per stage — alternate faces of the same themes." },
      { label: "Run 3", description: "Third event per stage — deepest catalog exposure in one cycle." },
      { label: "Cycle repeats", description: "Further runs continue rotation — mastery is long-form." },
    ],
  },
  rewards: {
    title: "What deep runs earn",
    body:
      "Resonance, secrets found, Awareness, and completion bonuses feed Knowledge Points and XP formulas server-side. Card profiles track runs, best resonance, endings unlocked, and perception depth tier.",
    bullets: [
      "Card XP scales with resonance, secrets, awareness, and completion (owners/team).",
      "Knowledge Points deepen card intel — used in-app and tied to perception depth.",
      "Secret endings and Journey Identities are collectible story outcomes per character.",
      "Wishbearer can Rewrite one past choice; Abyss Eagle converts resources up to three times.",
    ],
  },
  worldLinks: {
    title: "Connected to the living world",
    items: [
      {
        title: "Combat Area",
        description:
          "Same Past / Influence / Identity layers — but expressed as Power, Defend, Skills, and Ultimate in card battles.",
      },
      {
        title: "Teams & tribes",
        description:
          "Team members earn full PoB card rewards on shared characters; Traveler knowledge is personal.",
      },
      {
        title: "Seasonal Identity",
        description:
          "Entry Ritual and Journey discovery feed the seasonal card loop — identity before optimization.",
      },
      {
        title: "Library vs collection",
        description:
          "The library is playable. Ownership deepens what the world remembers on the card permanently.",
      },
    ],
  },
  faq: {
    title: "Common questions",
    items: [
      {
        question: "Is Path of Becoming the same as the Journey tab?",
        answer:
          "No. Journey is the living world map and station discovery. Path of Becoming is a dedicated 15-stage narrative game mode inside Game Hub with its own event catalog and endings.",
      },
      {
        question: "Do I need to own a Rare Character to play?",
        answer:
          "No. Traveler mode gives the full journey on any library card. Owners and team members additionally earn card and team progression on that character.",
      },
      {
        question: "How long is one run?",
        answer:
          "Fifteen events — one per stage — designed as a focused session, not an endless RPG chapter.",
      },
      {
        question: "What is Entry Ritual?",
        answer:
          "A six-question onboarding ritual that suggests a composition and Rare Character match. It is optional, replayable, and separate from completing a full 15-event run.",
      },
    ],
  },
  cta: {
    title: "Begin the path in the app",
    description:
      "Open Game Hub → Path of Becoming, pick a Rare Character (or start Entry Ritual), and play the perception journey inside Some1sJourney.",
    primaryCta: "enterJourney" as const,
    secondaryCta: "exploreGameHub" as const,
  },
};
