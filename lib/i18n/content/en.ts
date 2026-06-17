import { EXPO_GO_URL, SUPPORT_EMAIL } from "../constants";
import type { SiteContent } from "../types";
import { pathOfBecomingEn } from "./path-of-becoming-en";

export const enContent: SiteContent = {
  brand: {
    name: "Some1sJourney",
    tagline: "Every Person Has A Journey",
    subtitle: "Discover your identity. Join your tribe. Evolve your future.",
    footerTagline: "A living universe of identity, memory, and human evolution.",
  },

  worldState: {
    currentSeason: {
      name: "Season One",
      subtitle: "The First Migration",
      shortLabel: "Season One",
      status: "Active",
    },
    evolutionStage: "First Migration",
    stats: {
      identityCount: 420,
      tribeCountLabel: "Tribes forming and growing",
    },
  },

  assets: {
    logo: "/images/logo.png",
    hero: "/images/journey-hero.png",
    cardBack: "/images/card-back.png",
    expoQr: "/images/expo-qr.png",
  },

  access: {
    expoGoIosUrl: "https://apps.apple.com/app/expo-go/id982107779",
    expoGoAndroidUrl:
      "https://play.google.com/store/apps/details?id=host.exp.exponent",
    expoGoUrl: EXPO_GO_URL,
    qrAlt: "Scan to open Some1sJourney in Expo Go",
  },

  routes: {
    home: "/",
    howItWorks: "/how-it-works",
    gameHub: "/game-hub",
    combat: "/combat",
    pathOfBecoming: "/path-of-becoming",
    download: "/download",
    privacy: "/privacy",
    terms: "/terms",
    support: "/support",
    anchors: {
      discovery: "/#discovery",
      seasonOne: "/#season-one",
      earlyAccess: "/#early-access",
    },
  },

  ctas: {
    startJourney: { label: "Start Your Journey", href: "/download" },
    enterJourney: { label: "Enter Your Journey", href: "/download" },
    enterJourneyShort: { label: "Enter Journey", href: "/download" },
    joinEarlyAccess: { label: "Join Early Access", href: "/download" },
    exploreSeasonOne: { label: "Explore Season One", href: "#season-one" },
    exploreCombat: { label: "Explore Combat", href: "/combat" },
    exploreGameHub: { label: "Explore Game Hub", href: "/game-hub" },
    explorePathOfBecoming: {
      label: "Explore Path of Becoming",
      href: "/path-of-becoming",
    },
    openInExpoGo: { label: "Open in Expo Go", href: EXPO_GO_URL || "/download" },
    fullInstructions: { label: "Full instructions", href: "/download" },
    troubleshooting: { label: "Troubleshooting", href: "/support" },
    learnHowItWorks: { label: "Learn how it works →", href: "/how-it-works" },
    needHelp: { label: "Need help getting started?", href: "/support" },
    goToDownload: { label: "Go to download page", href: "/download" },
  },

  navigation: {
    header: [
      { href: "/game-hub", label: "Game Hub", id: "game-hub" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/profile", label: "Identity" },
      { href: "/#discovery", label: "Discovery" },
      { href: "/#season-one", label: "Season One" },
    ],
    auth: {
      signIn: "Sign In",
      signUp: "Sign Up",
      myProfile: "My Profile",
    },
    footer: {
      product: [
        { href: "/game-hub", label: "Game Hub" },
        { href: "/path-of-becoming", label: "Path of Becoming" },
        { href: "/combat", label: "Combat System" },
        { href: "/how-it-works", label: "How It Works" },
        { href: "/profile", label: "Identity Profile" },
        { href: "/download", label: "Enter Your Journey" },
      ],
      legal: [
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
      ],
      support: [
        { href: "/support", label: "Support" },
        { href: `mailto:${SUPPORT_EMAIL}`, label: "Contact", external: true },
      ],
      columns: {
        product: "Product",
        legal: "Legal",
        support: "Support",
      },
    },
  },

  metadata: {
    defaultDescription:
      "A living identity world where people discover who they are, join their tribe, and evolve through seasons of memory and growth.",
    pages: {
      home: {
        title: "Every Person Has A Journey",
        description:
          "A living identity world where people discover who they are, join their tribe, and evolve through seasons of memory and growth.",
      },
      howItWorks: {
        title: "How It Works",
        description:
          "Learn how Some1sJourney works — from identity discovery to tribe belonging, memories, and evolution.",
      },
      combat: {
        title: "Combat System",
        description:
          "Learn how Some1sJourney card combat works — rounds, actions, stats, PvE, PvP, and group battles in the Combat Area.",
      },
      gameHub: {
        title: "Game Hub",
        description:
          "Explore every game lane in Some1sJourney — Combat, Path of Becoming, Narrative Arena, seasonal identity, and the living Journey.",
      },
      pathOfBecoming: {
        title: "Path of Becoming",
        description:
          "Deep guide to Some1sJourney’s narrative psychological journey — 15 stages, perception lens, Traveler mode, Entry Ritual, and why it matters.",
      },
      download: {
        title: "Enter Your Journey",
        description:
          "Install Expo Go, scan the QR code, and begin your journey in Some1sJourney.",
      },
      privacy: {
        title: "Privacy Policy",
        description:
          "How Some1sJourney collects, uses, and protects your information.",
      },
      terms: {
        title: "Terms of Service",
        description:
          "The terms for participating in the Some1sJourney identity world.",
      },
      support: {
        title: "Support",
        description:
          "Get help with Some1sJourney early access, report issues, or contact our team.",
      },
      profile: {
        title: "Identity Profile",
        description:
          "View your Some1sJourney identity, tribe, memories, and evolution on the web.",
      },
    },
    sitemapRoutes: [
      "",
      "/game-hub",
      "/path-of-becoming",
      "/combat",
      "/how-it-works",
      "/download",
      "/profile",
      "/privacy",
      "/terms",
      "/support",
    ],
  },

  hero: {
    label: "Season One",
    title: "Every Person Has A Journey",
    subtitle: "Discover your identity. Join your tribe. Evolve your future.",
    primaryCta: "startJourney",
    secondaryCta: "exploreSeasonOne",
  },

  homepage: {
    whatIs: {
      id: "what-is",
      label: "The World",
      title: "What is Some1sJourney?",
      description:
        "Some1sJourney is a living identity world where people discover who they are through choices, questions, and experiences.",
      pillars: [
        {
          title: "Discover Yourself",
          description:
            "Answer deep questions. Reveal the patterns that define who you are.",
        },
        {
          title: "Find Your Tribe",
          description:
            "Belong to a living community shaped by shared identity and purpose.",
        },
        {
          title: "Build Your Legacy",
          description:
            "Collect memories, evolve through seasons, and leave a mark on the world.",
        },
      ],
    },
    discovery: {
      id: "discovery",
      label: "Identity",
      title: "Identity Discovery System",
      description:
        "This is not a quiz. It is a reflection of your personality, past, and behavior patterns — distilled into an identity that belongs to you alone.",
      flow: [
        {
          label: "Answer",
          description:
            "Reflect on questions about your past, choices, and patterns.",
        },
        {
          label: "Analysis",
          description: "The world reads who you are — not what you wish to be.",
        },
        {
          label: "Identity Card",
          description:
            "Receive a unique card that reflects your inner identity.",
        },
        {
          label: "Tribe",
          description: "Join the people whose paths resonate with yours.",
        },
      ],
    },
    pathBeyond: {
      id: "path-beyond",
      label: "Evolution",
      title: "The Path Beyond",
      description:
        "Your identity is not your destination. Each identity contains a hidden future path — a direction of evolution that deeper seasons will reveal.",
      flow: [
        {
          label: "Past",
          description:
            "Where you have been shapes the foundation of who you are.",
        },
        {
          label: "Choices",
          description: "Every decision leaves a trace in your identity.",
        },
        {
          label: "Identity",
          description: "Your card is a snapshot — not your final form.",
        },
        {
          label: "Future Evolution",
          description: "Hidden paths wait to be unlocked in seasons ahead.",
        },
      ],
      callout:
        "Every card carries a direction of evolution. Future seasons unlock deeper identity layers — new memories, new paths, new versions of who you are becoming. This is what makes Some1sJourney unlike anything else.",
    },
    identities: {
      id: "identities",
      label: "Collection",
      titleTemplate: (count: number) => `${count} Unique Identities`,
      descriptionTemplate: (count: number) =>
        `${count} identities. One for every combination of human patterns, choices, and perspectives. Each one mysterious. Each one earned.`,
      footnote:
        "A glimpse into Season One. The full collection awaits inside the world.",
    },
    tribes: {
      id: "tribes",
      label: "Belonging",
      title: "Find Your People",
      description:
        "Users belong to identity-based tribes — living communities, not follower counts. Each tribe has its own character, history, and direction.",
      traits: [
        {
          title: "Members",
          description:
            "Real people bound by shared identity patterns and collective purpose.",
        },
        {
          title: "Leader",
          description:
            "Every tribe traces back to an origin card — the first of its kind.",
        },
        {
          title: "Collective Pattern",
          description:
            "Your tribe moves as one — shaped by behavior, memory, and evolution.",
        },
      ],
    },
    memories: {
      id: "memories",
      label: "Legacy",
      title: "Memories Live Forever",
      description:
        "Every card stores a living history — and that history stays attached to the identity, even when it changes hands.",
      layers: [
        "Personal achievements",
        "Shared experiences with your tribe",
        "Moments that shaped your evolution",
      ],
      callout:
        "This is not ownership of an asset. It is living history attached to identity — a record of who you were, what you did, and who you became.",
      badge: "Memory attached permanently",
      cardAlt: "Identity card with attached memories",
    },
    competeEvolve: {
      id: "compete-evolve",
      label: "Growth",
      title: "Compete & Evolve",
      description:
        "Play, challenge, and progress — not for points alone, but for evolution. Every competition shapes your identity and your tribe.",
      pillars: [
        {
          title: "Games",
          description: "Challenge yourself and others within the world.",
        },
        {
          title: "Team Challenges",
          description: "Grow stronger alongside your tribe.",
        },
        {
          title: "Rankings",
          description: "See how your identity rises through the seasons.",
        },
        {
          title: "Progression",
          description: "Every step forward deepens who you are becoming.",
        },
      ],
      cta: "exploreGameHub" as const,
    },
    marketplace: {
      id: "marketplace",
      label: "Exchange",
      title: "Marketplace",
      description:
        "Identities can be traded — but value here is not measured in speculation. It is measured in history, tribe contribution, and progression.",
      body:
        "An identity that has walked far, contributed deeply, and collected rich memories carries a different weight than one just beginning. The marketplace exists within the world — not outside it.",
    },
    pts: {
      id: "pts",
      label: "Growth System",
      title: "PTS",
      description:
        "PTS is a support system for identity growth — not a currency to chase, but a measure of how deeply you engage with the world.",
      uses: [
        {
          title: "Strengthen Your Identity",
          description:
            "Deepen your card's presence and influence in the world.",
        },
        {
          title: "Support Your Tribe",
          description: "Contribute to the collective growth of your people.",
        },
        {
          title: "Increase Influence",
          description:
            "Shape the world around you through meaningful participation.",
        },
      ],
    },
    seasonOne: {
      id: "season-one",
      label: "Live Now",
      titleTemplate: (season: string, stage: string) =>
        `${season} — ${stage}`,
      description:
        "This is not a preview of something coming. Season One is alive — identities discovered, tribes united, memories written into the world.",
      liveSignals: [
        "Identities are active across the world",
        "Tribes are forming and growing",
        "Memories are being created every day",
        "The first migration is underway",
      ],
    },
    evolution: {
      id: "evolution",
      label: "Roadmap",
      title: "Evolution / Future Seasons",
      description:
        "The world does not stand still. Each season opens new layers of identity, memory, and possibility.",
      seasons: [
        { name: "Season One", subtitle: "First Migration", status: "Active" },
        { name: "Season Two", subtitle: "Expansion", status: "Ahead" },
        { name: "Season Three", subtitle: "Awakening", status: "Ahead" },
        { name: "Future", subtitle: "Unknown Evolution", status: "Unknown" },
      ],
    },
    earlyAccess: {
      id: "early-access",
      label: "Enter",
      title: "Enter the World",
      description:
        "Early access is open. Your journey begins with a single scan.",
      steps: [
        "Install Expo Go on your phone",
        "Scan the QR code below",
        "Start your journey in the world",
      ],
      primaryCta: "joinEarlyAccess" as const,
      secondaryCta: "needHelp" as const,
    },
  },

  qrPanel: {
    label: "Early Access",
    title: "Scan to enter the world",
    description:
      "Install Expo Go on your phone, then scan this code to begin your journey in Some1sJourney.",
    primaryCta: "openInExpoGo" as const,
    secondaryCta: "fullInstructions" as const,
  },

  howItWorks: {
    label: "App Preview",
    title: "How Some1sJourney Works",
    description:
      "Some1sJourney is an identity world — not a quiz app. Here is how you enter, discover yourself, and begin to evolve.",
    productFlow: [
      {
        label: "Answer identity questions",
        description: "Reflect on who you are and who you have been.",
      },
      {
        label: "Receive your identity card",
        description: "A unique card generated from your patterns.",
      },
      {
        label: "Join your tribe",
        description: "Find the people whose paths align with yours.",
      },
      {
        label: "Participate in journeys",
        description: "Walk through experiences that shape your identity.",
      },
      {
        label: "Collect memories & evolve",
        description: "Build legacy that stays attached to your card.",
      },
      {
        label: "Play, compete, progress",
        description: "Grow through challenges — individually and as a tribe.",
      },
    ],
    mockPanels: {
      identity: {
        label: "Your Identity",
        description:
          "Your card is generated from deep questions and behavioral patterns — a reflection, not a label.",
        cardAlt: "Sample identity card",
      },
      tribe: {
        label: "Your Tribe",
        description:
          "Tribes are living communities with members, leaders, and shared patterns of behavior.",
        memberAlt: "Tribe member",
      },
    },
    differentiators: {
      title: "What makes it different",
      items: [
        "Hidden evolution paths within every identity",
        "Memories that live forever on your card",
        "Tribe belonging rooted in who you truly are",
      ],
    },
    primaryCta: "enterJourney" as const,
  },

  gameHub: {
    label: "Game Hub",
    title: "Every game lane in one hub",
    description:
      "The Games tab in the app is your arcade — card combat, narrative arenas, identity rituals, and the living Journey. Combat has a full guide on the web; everything else waits inside the app.",
    availableGamesLabel: "Available games",
    inAppBadge: "In app",
    viewCombatGuide: "Full combat guide",
    questsNote: "Quests & daily rewards live in the Games tab — pull XP, missions, and streak bonuses there.",
    clubNote:
      "Social Club is separate — teams, followers, and the user directory live in the Club tab.",
    games: [
      {
        id: "combat",
        title: "Combat Area",
        summary:
          "Turn-based card battles — 2 rounds (+ tiebreaker), Attack, Defend, Skills, Ultimate. PvE, PvP, and group relay on one fighter card.",
        badge: "Web guide",
        href: "/combat",
        cta: "Explore Combat",
        featured: true,
      },
      {
        id: "path-of-becoming",
        title: "Path of Becoming",
        summary:
          "15 stages · one event per run · replay unlocks alternates · play any Rare Character as your Traveler.",
        badge: "Deep guide",
        href: "/path-of-becoming",
        cta: "Explore guide",
      },
      {
        id: "entry-ritual",
        title: "Entry Ritual",
        summary:
          "Six reflective questions before your composition — replay anytime from Game Hub (~3 min).",
        badge: "6 questions",
      },
      {
        id: "arena",
        title: "Three Cards Narrative Arena",
        summary:
          "Solo or group narrative table — entry 20–50 PTS by rounds, +10 PTS & XP per correct answer. Rules on the table.",
        badge: "Live tables",
      },
      {
        id: "seasonal-identity",
        title: "Seasonal Identity Card",
        summary:
          "Discover your season identity and build your card team through the seasonal swipe journey.",
        badge: "Season active",
      },
      {
        id: "journey",
        title: "Journey & Story",
        summary:
          "Progress through stages, collect cards, and shape your destiny across the living world map.",
        badge: "Core loop",
      },
    ],
    cta: {
      title: "Play inside the app",
      description:
        "Game Hub, Combat Area, and every lane above open from the Games tab after you enter through Expo Go.",
      primaryCta: "enterJourney" as const,
      secondaryCta: "exploreCombat" as const,
    },
  },

  combat: {
    label: "Combat Area",
    title: "Card combat that reads who you are",
    description:
      "Some1sJourney Combat is a turn-based card battle system inside the Games tab. One Rare or seasonal fighter. Hidden commitments. Two rounds to win — with a tiebreaker when the fight stays even.",
    heroHighlight:
      "Every fight uses the same engine across PvE, PvP, and Group modes: Attack, Defend, Skills, Ultimate, HP, Stamina, and passives from your card’s Past, Influence, and Identity layers.",
    slider: {
      title: "Combat Codex — swipe through the system",
      subtitle:
        "Use the slider to explore how a full challenge plays out — from picking your fighter to winning two rounds.",
      prevLabel: "Previous slide",
      nextLabel: "Next slide",
      goToLabel: "Go to slide",
      slides: [
        {
          id: "arena",
          kicker: "01 · Combat Area",
          title: "Enter the arena with one fighter card",
          body:
            "Combat Area is the card-battle hub in the Games tab. You always fight with one Rare character card or your seasonal identity card — the same rules everywhere.",
          bullets: [
            "Open Games → Enter Combat Area.",
            "Equip a combat-ready Rare card or your seasonal identity.",
            "Choose PvE, PvP, or Group — then scout, start, or accept a challenge.",
          ],
          chips: ["One fighter", "Same rules", "Games tab"],
          accent: "gold",
        },
        {
          id: "rounds",
          kicker: "02 · Match rules",
          title: "Win 2 rounds. Tiebreaker at 1–1.",
          body:
            "Each challenge is two main rounds. Each round lasts 3 minutes and ends on knockout or when the timer runs out — higher HP wins the round.",
          bullets: [
            "Win the challenge by taking two rounds.",
            "At 1–1, a third tiebreaker round decides the winner.",
            "Each new round resets HP to 100% and Stamina to 70%.",
          ],
          chips: ["2 rounds", "3 min each", "Tiebreaker"],
          accent: "crimson",
        },
        {
          id: "exchange",
          kicker: "03 · Exchanges",
          title: "Commit hidden. Reveal together.",
          body:
            "Inside each round, fighters trade exchanges. Both players choose an action before the exchange timer — Attack, Defend, Skill, or Ultimate — then the server resolves both at once.",
          bullets: [
            "Actions stay hidden until resolve.",
            "Passives can fire during resolution.",
            "Round ends at 0 HP or when the round timer hits zero.",
          ],
          chips: ["Hidden picks", "Simultaneous resolve"],
          accent: "violet",
        },
        {
          id: "stats",
          kicker: "04 · HP & Stamina",
          title: "Survive the round. Spend Stamina wisely.",
          body:
            "HP is your life total — reach 0 and the round is over. Stamina fuels Skills and Ultimate. Attack and Defend both recover a little Stamina each exchange.",
          bullets: [
            "HP starts at 100% every round.",
            "Stamina starts at 70% every round.",
            "Momentum builds across round wins and shifts late-fight pressure.",
          ],
          chips: ["HP 100%", "Stamina 70%", "Momentum"],
          accent: "emerald",
        },
        {
          id: "power-defend",
          kicker: "05 · Attack & Defense",
          title: "Power hits harder. Defend absorbs more.",
          body:
            "Your card’s Origin, Influence, and Identity layers combine into Power (Attack) and Defend. Scout opponents when you can — a small stat edge can decide a timed round.",
          bullets: [
            "Power adds to outgoing damage.",
            "Defend reduces incoming damage.",
            "Compare ATK/DEF before risky fights.",
          ],
          chips: ["Power / Attack", "Defend / Defense", "Scout tiles"],
          accent: "gold",
        },
        {
          id: "actions",
          kicker: "06 · Actions",
          title: "Four moves. One exchange.",
          body:
            "Attack and Defend are your baseline rhythm. Skills spend Stamina for layer effects. Ultimate is your Identity finisher — high cost, high impact, and higher risk.",
          bullets: [
            "Attack — pressure damage (+10% Stamina).",
            "Defend — block or soften hits (+10% Stamina).",
            "Skills — 25% Stamina; Influence or Identity layer.",
            "Ultimate — 70% Stamina; unlocks after your first hit in the challenge.",
          ],
          chips: ["Attack", "Defend", "Skills", "Ultimate"],
          accent: "crimson",
        },
        {
          id: "layers",
          kicker: "07 · Card build",
          title: "Past auto-fires. You choose the rest.",
          body:
            "Your fighter is built from Past (Origin), Influence, and Identity — plus Destiny as a separate progression track, not a combat button.",
          bullets: [
            "Past passives trigger automatically during resolution.",
            "Influence and Identity skills are chosen with the Skill button.",
            "Using Skill or Ultimate this exchange can double incoming damage — time them carefully.",
          ],
          chips: ["Origin", "Influence", "Identity", "Destiny DP"],
          accent: "violet",
        },
        {
          id: "modes",
          kicker: "08 · Play modes",
          title: "PvE. PvP. Group relay.",
          body:
            "Solo AI encounters, live player challenges, and team relay sessions all run on the same combat engine — with Player XP, Card XP, Destiny DP, and team contribution after every fight.",
          bullets: [
            "PvE — Suggested Challenge, style carousels, Classic Encounters.",
            "PvP — live lobby challenges and notification accept flow.",
            "Group — Team War relay or Co-op Raid with invite codes.",
          ],
          chips: ["PvE", "PvP", "Group"],
          accent: "emerald",
        },
      ],
    },
    matchRules: {
      title: "How a challenge is won",
      body:
        "A challenge is two main rounds (3 minutes each). Win a round by knockout or by having more HP when the timer ends. Win the challenge by taking two rounds. At 1–1, a third tiebreaker round (same rules) decides the winner.",
      steps: [
        { label: "Round opens", description: "HP 100% · Stamina 70% for both fighters." },
        { label: "Exchange loop", description: "Both commit → resolve → passives → HP/Stamina update." },
        { label: "Round closes", description: "Knockout or higher HP when the timer ends." },
        { label: "Match score", description: "First to 2 rounds wins; 1–1 triggers tiebreaker." },
      ],
    },
    modes: {
      title: "Three ways to fight",
      items: [
        {
          id: "pve",
          title: "PvE — Solo",
          summary: "Fight AI opponents, curated encounters, and style carousels.",
          bullets: [
            "Suggested Challenge at the top of the arena.",
            "World Boss, Smart Skills, Speed Demons, Iron Wall, Balanced Masters.",
            "Wins and losses both grant partial progression.",
          ],
        },
        {
          id: "pvp",
          title: "PvP — Live",
          summary: "Challenge online players from the live lobby.",
          bullets: [
            "Send or accept challenges via notifications.",
            "Requires a combat-ready Rare card equipped.",
            "Same 2-round + tiebreaker rules as every mode.",
          ],
        },
        {
          id: "group",
          title: "Group — Relay",
          summary: "Team War or Co-op Raid with invite codes and sub-matches.",
          bullets: [
            "Team War — up to 3 fighters per side in paired 1v1 relays.",
            "Co-op Raid — allies vs a boss; one collective win can clear the raid.",
            "Majority wins the session after relay sub-matches resolve.",
          ],
        },
      ],
    },
    actions: {
      title: "Your four actions each exchange",
      items: [
        {
          title: "Attack",
          cost: "+10% STA",
          description: "Apply pressure and chip HP. The default way to build momentum when you read a defensive opponent.",
        },
        {
          title: "Defend",
          cost: "+10% STA",
          description: "Full or partial blocks. Strong when you expect a burst or need to survive to the round timer.",
        },
        {
          title: "Skills",
          cost: "25% STA",
          description: "Trigger Influence or Identity layer effects. High reward — but using Skill or Ultimate can double incoming damage this exchange.",
        },
        {
          title: "Ultimate",
          cost: "70% STA",
          description: "Identity-only finisher. Unlocks after your first hit in the challenge. Repeatable when you can afford the Stamina cost.",
        },
      ],
    },
    layers: {
      title: "What your card brings into combat",
      items: [
        {
          title: "Past (Origin)",
          description: "Always-on passives and automatic triggers during resolution — your foundation in every exchange.",
        },
        {
          title: "Influence",
          description: "Manual skills with tactical effects. Choose when the timing and Stamina cost are right.",
        },
        {
          title: "Identity",
          description: "Manual skills plus your Ultimate. This layer defines your finisher identity in the arena.",
        },
        {
          title: "Destiny",
          description: "Progression through Destiny DP — not a combat button, but the long arc your fighter grows toward.",
        },
      ],
    },
    flow: {
      title: "From hub to victory",
      steps: [
        { label: "Games tab", description: "Enter Combat Area and equip your fighter card." },
        { label: "Pick a mode", description: "PvE tile, PvP challenge, or Group invite code." },
        { label: "Scout (optional)", description: "Compare Attack and Defense before you commit." },
        { label: "Fight 2 rounds", description: "Exchange loop until knockout or round timer." },
        { label: "Result & replay", description: "Collect XP rewards, review history, run it back." },
      ],
    },
    cta: {
      title: "Ready to fight in the app?",
      description:
        "Combat lives inside the Some1sJourney app today. Enter through Expo Go, equip your Rare card, and open Combat Area from the Games tab.",
      primaryCta: "enterJourney" as const,
      secondaryCta: "learnHowItWorks" as const,
    },
  },

  pathOfBecoming: pathOfBecomingEn,

  download: {
    label: "Early Access",
    title: "Enter Your Journey",
    description:
      "Your journey begins in the app. Install Expo Go, scan the code, and step into the world.",
    steps: [
      {
        title: "Install Expo Go",
        description: "Download Expo Go on your iPhone or Android device.",
        storeLinks: [
          { label: "App Store", key: "ios" as const },
          { label: "Google Play", key: "android" as const },
        ],
      },
      {
        title: "Scan the QR Code",
        description:
          "Open Expo Go and scan the code below to launch Some1sJourney.",
      },
      {
        title: "Start Your Journey",
        description:
          "Answer your first questions, receive your identity, and join your tribe.",
      },
    ],
    nativeStores: {
      label: "Coming Soon",
      description:
        "Native App Store and Google Play downloads will appear here when Some1sJourney launches outside early access.",
      placeholders: ["App Store", "Google Play"],
    },
    primaryCta: "troubleshooting" as const,
    secondaryCta: "learnHowItWorks" as const,
  },

  privacy: {
    title: "Privacy Policy",
    description:
      "We believe in transparency. Here is how Some1sJourney handles your information — in plain language.",
    updatedAt: "June 2025",
    sections: [
      {
        title: "What we collect",
        paragraphs: [
          "When you enter Some1sJourney, we collect information that helps the world recognize you and remember your journey.",
        ],
        list: [
          "Account details you provide when joining",
          "Your answers to identity questions",
          "Gameplay activity and interactions within the world",
          "Progress, tribe membership, and memories attached to your identity",
        ],
      },
      {
        title: "How we use your data",
        paragraphs: [
          "Your data exists to serve your journey — not to sell you something else.",
        ],
        list: [
          "Generating your unique identity card",
          "Matching you with your tribe",
          "Tracking progression, seasons, and evolution paths",
          "Preserving memories and shared experiences on your identity",
        ],
      },
      {
        title: "How we store it",
        paragraphs: [
          "Your information is stored on secure backend infrastructure. We do not sell your personal data to third parties.",
          "Some1sJourney is built as a living identity world. Your data stays connected to your journey so the world can evolve with you.",
        ],
      },
      {
        title: "Your control",
        paragraphs: ["This is your identity. You remain in control of it."],
        list: [
          "You can request access to the data we hold about you",
          "You can request deletion of your account and associated data",
          "Contact us anytime if you have questions about your information",
        ],
      },
    ],
    contact: {
      title: "Contact",
      prompt: "Questions about your privacy? Reach us at",
    },
  },

  terms: {
    title: "Terms of Service",
    description:
      "The rules of the world — written to be understood, not to intimidate.",
    updatedAt: "June 2025",
    sections: [
      {
        title: "Using Some1sJourney",
        paragraphs: [
          "Some1sJourney is a living identity world. By entering, you agree to participate respectfully and honestly.",
        ],
        list: [
          "You are responsible for your account and activity",
          "You will not attempt to harm, disrupt, or exploit the world or its members",
          "You will engage with others in good faith",
        ],
      },
      {
        title: "The identity system",
        paragraphs: [
          "Your identity card is a reflection of who you are within this world — your choices, patterns, and path.",
          "Identity cards are personal expressions within Some1sJourney. They are not financial assets or investment instruments.",
        ],
      },
      {
        title: "Trading identities",
        paragraphs: [
          "Some identities may be traded between members. When this happens, the value of an identity is tied to its history, tribe contribution, and progression — not financial speculation.",
          "Some1sJourney does not promise monetary returns from identity trading. Trade thoughtfully, knowing that memories and legacy travel with each identity.",
        ],
      },
      {
        title: "Fair use",
        paragraphs: ["We expect all members to uphold the integrity of the world."],
        list: [
          "No cheating, manipulation, or abuse of game systems",
          "No harassment or harmful behavior toward other members",
          "No attempts to exploit technical vulnerabilities",
        ],
      },
      {
        title: "Account termination",
        paragraphs: [
          "We may suspend or remove accounts that violate these terms or harm the community.",
          "You may leave the world at any time. When you do, contact us if you wish to delete your data.",
        ],
      },
    ],
    contact: {
      title: "Contact",
      prompt: "Questions about these terms? Contact us at",
    },
  },

  support: {
    label: "Help",
    title: "Support",
    description:
      "We are here to help you enter the world and walk your journey.",
    emailBlock: {
      title: "Email us",
      description: "The fastest way to reach us is by email.",
    },
    sections: [
      {
        title: "Get help",
        description:
          "Whether you are entering early access or already walking your journey, we are here to help you find your way in the world.",
      },
      {
        title: "Report an issue",
        description:
          "If something is not working as expected, send us an email with a brief description of the issue, your device type, and the steps that led to the problem.",
        items: [
          "What you were trying to do",
          "What happened instead",
          "Your device (iPhone, Android, etc.)",
          "Screenshots if helpful",
        ],
      },
      {
        title: "Early access support",
        description:
          "Early access runs through Expo Go. Install the app, scan the QR code on our download page, and your journey will open directly.",
        linkKey: "goToDownload" as const,
      },
    ],
    primaryCta: "enterJourney" as const,
  },

  profile: {
    label: "Identity",
    loading: {
      title: "Loading identity…",
      description: "Fetching your profile from the shared Some1sJourney universe.",
    },
    unconfigured: {
      title: "Backend not connected",
      description:
        "Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (same project as the Expo app) to load real profiles.",
      downloadLabel: "Get the app",
    },
    empty: {
      title: "Sign in or enter a Journey ID",
      description:
        "Use the same Supabase account as the Expo app, or enter a user's UUID to view their public identity.",
      inputLabel: "User ID (UUID)",
      inputPlaceholder: "e.g. 550e8400-e29b-41d4-a716-446655440000",
      submitLabel: "View Profile",
      divider: "Or look up by ID",
    },
    auth: {
      title: "Unified account",
      description:
        "Sign in or create an account — the same email and password work on the website and in the Expo app.",
      firstTimeAppHint:
        "After creating your account here, open the app and sign in with the same credentials for the first time.",
      signInTab: "Sign in",
      signUpTab: "Sign up",
      emailLabel: "Email",
      passwordLabel: "Password",
      confirmPasswordLabel: "Confirm password",
      nameLabel: "Full name",
      showPassword: "Show passwords",
      hidePassword: "Hide passwords",
      signInButton: "Sign in",
      signUpButton: "Create account",
      signOutButton: "Sign out",
      signedInAs: "Signed in as",
      userId: "User ID",
      viewMyProfile: "View my profile",
      signInSuccess: "Signed in — loading your identity…",
      signUpSuccess: "Account created — loading your identity…",
      confirmEmail: "Enter the verification code sent to your email.",
      genericError: "Authentication failed. Try again.",
      fixErrors: "Fix the errors before continuing.",
      loading: "Working…",
      unconfigured: "Supabase is not configured on this site yet.",
      passwordRules: {
        length: "At least 8 characters",
        letter: "At least one letter",
        number: "At least one number",
        symbol: "At least one symbol (e.g. !@#$%)",
      },
      validation: {
        nameRequired: "Full name is required",
        nameMinLength: "Full name must be at least 2 characters",
        reservedStaffTag:
          "The [GM] and [PM] tags are reserved for staff only.",
        emailRequired: "Email is required",
        emailInvalid: "Please enter a valid email address",
        passwordRequired: "Password is required",
        passwordWeak: "Password does not meet the requirements",
        confirmRequired: "Please confirm your password",
        passwordsMismatch: "Passwords do not match",
      },
      otp: {
        title: "Enter verification code",
        description: "We sent a 6-digit code to",
        verifyButton: "Verify & create account",
        resend: "Didn't get it? Resend code",
        resendCooldown: "Resend in",
        useDifferentEmail: "Use a different email",
        invalidCode: "Enter the 6-digit code",
        tooManyAttempts: "Too many attempts. Request a new code.",
        resendSuccess: "A new code has been sent to your email.",
        verifySuccess: "Verified — loading your identity…",
      },
    },
    notFound: {
      title: "Identity not found",
      description:
        "No profile exists for this user ID. Sign up in the app or on this page to begin your journey.",
      backLabel: "Back to profile lookup",
    },
    sections: {
      identity: "Your Identity",
      tribe: "Your Tribe",
      pts: "PTS",
      level: "Level",
      memories: "Memory Highlights",
      season: "Current Season",
      myCards: "My Cards",
    },
    cardStats: {
      attack: "Attack",
      defend: "Defense",
      power: "Power",
      identityBadge: "Identity",
    },
    tribeLabels: {
      role: "Role",
      members: "Members",
      pattern: "Collective Pattern",
    },
    actions: {
      share: "Share Profile",
      copied: "Link copied",
      openInApp: "Open in Expo Go",
      viewInApp: "Continue in the app",
    },
    journeyId: "User ID",
    ptsUnit: "PTS",
    levelPrefix: "Level",
    emptyMemories: "No public memories yet.",
    emptyMyCards: "No collected cards yet — build your collection in the app.",
  },
};

