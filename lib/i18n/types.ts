export type ContentSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
};

export type FlowStep = {
  label: string;
  description?: string;
};

export type NavLink = {
  href: string;
  label: string;
  external?: boolean;
  id?: string;
};

export type CTA = {
  label: string;
  href: string;
};

export type CtaKey =
  | "enterWorld"
  | "startJourney"
  | "enterJourney"
  | "enterJourneyShort"
  | "joinEarlyAccess"
  | "exploreSeasonOne"
  | "exploreCombat"
  | "exploreGameHub"
  | "explorePathOfBecoming"
  | "openInExpoGo"
  | "fullInstructions"
  | "troubleshooting"
  | "learnHowItWorks"
  | "needHelp"
  | "goToDownload";

export type PageMetaKey =
  | "home"
  | "howItWorks"
  | "gameHub"
  | "combat"
  | "pathOfBecoming"
  | "download"
  | "privacy"
  | "terms"
  | "support"
  | "profile";

export type GuideSlideCardLayout = "single" | "duel" | "fan";

export type CombatSlide = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  bullets?: string[];
  chips?: string[];
  accent?: "gold" | "violet" | "crimson" | "emerald";
  cardIds?: readonly number[];
  cardLayout?: GuideSlideCardLayout;
};

export type SiteContent = {
  brand: {
    name: string;
    tagline: string;
    subtitle: string;
    footerTagline: string;
  };
  worldState: {
    currentSeason: {
      name: string;
      subtitle: string;
      shortLabel: string;
      status: string;
    };
    evolutionStage: string;
    stats: {
      identityCount: number;
      tribeCountLabel: string;
    };
  };
  assets: {
    logo: string;
    hero: string;
    cardBack: string;
    expoQr: string;
  };
  access: {
    expoGoIosUrl: string;
    expoGoAndroidUrl: string;
    expoGoUrl: string;
    qrAlt: string;
  };
  routes: {
    home: string;
    howItWorks: string;
    gameHub: string;
    combat: string;
    pathOfBecoming: string;
    download: string;
    privacy: string;
    terms: string;
    support: string;
    anchors: {
      discovery: string;
      seasonOne: string;
      earlyAccess: string;
    };
  };
  ctas: Record<CtaKey, { label: string; href: string }>;
  navigation: {
    header: NavLink[];
    auth: {
      signIn: string;
      signUp: string;
      myProfile: string;
      enterWorld: string;
    };
    footer: {
      product: NavLink[];
      legal: NavLink[];
      support: NavLink[];
      columns: { product: string; legal: string; support: string };
    };
  };
  metadata: {
    defaultDescription: string;
    pages: Record<PageMetaKey, { title: string; description: string }>;
    sitemapRoutes: string[];
  };
  hero: {
    label: string;
    title: string;
    subtitle: string;
    primaryCta: CtaKey;
    secondaryCta: CtaKey;
  };
  homepage: {
    whatIs: {
      id: string;
      label: string;
      title: string;
      description: string;
      pillars: { title: string; description: string }[];
    };
    discovery: {
      id: string;
      label: string;
      title: string;
      description: string;
      flow: FlowStep[];
    };
    pathBeyond: {
      id: string;
      label: string;
      title: string;
      description: string;
      flow: FlowStep[];
      callout: string;
    };
    identities: {
      id: string;
      label: string;
      titleTemplate: (count: number) => string;
      descriptionTemplate: (count: number) => string;
      footnote: string;
    };
    tribes: {
      id: string;
      label: string;
      title: string;
      description: string;
      traits: { title: string; description: string }[];
    };
    memories: {
      id: string;
      label: string;
      title: string;
      description: string;
      layers: string[];
      callout: string;
      badge: string;
      cardAlt: string;
    };
    competeEvolve: {
      id: string;
      label: string;
      title: string;
      description: string;
      pillars: { title: string; description: string }[];
      cta: CtaKey;
    };
    marketplace: {
      id: string;
      label: string;
      title: string;
      description: string;
      body: string;
    };
    pts: {
      id: string;
      label: string;
      title: string;
      description: string;
      uses: { title: string; description: string }[];
    };
    seasonOne: {
      id: string;
      label: string;
      titleTemplate: (season: string, stage: string) => string;
      description: string;
      liveSignals: string[];
    };
    evolution: {
      id: string;
      label: string;
      title: string;
      description: string;
      seasons: { name: string; subtitle: string; status: string }[];
    };
    earlyAccess: {
      id: string;
      label: string;
      title: string;
      description: string;
      steps: string[];
      primaryCta: CtaKey;
      secondaryCta: CtaKey;
    };
  };
  qrPanel: {
    label: string;
    title: string;
    description: string;
    primaryCta: CtaKey;
    secondaryCta: CtaKey;
  };
  howItWorks: {
    label: string;
    title: string;
    description: string;
    productFlow: FlowStep[];
    mockPanels: {
      identity: { label: string; description: string; cardAlt: string };
      tribe: { label: string; description: string; memberAlt: string };
    };
    differentiators: { title: string; items: string[] };
    primaryCta: CtaKey;
  };
  gameHub: {
    label: string;
    title: string;
    description: string;
    availableGamesLabel: string;
    inAppBadge: string;
    viewCombatGuide: string;
    questsNote: string;
    clubNote: string;
    games: Array<{
      id: string;
      title: string;
      summary: string;
      badge?: string;
      href?: string;
      cta?: string;
      featured?: boolean;
    }>;
    cta: {
      title: string;
      description: string;
      primaryCta: CtaKey;
      secondaryCta: CtaKey;
    };
  };
  combat: {
    label: string;
    title: string;
    description: string;
    heroHighlight: string;
    slider: {
      title: string;
      subtitle: string;
      prevLabel: string;
      nextLabel: string;
      goToLabel: string;
      slides: CombatSlide[];
    };
    matchRules: {
      title: string;
      body: string;
      steps: FlowStep[];
    };
    modes: {
      title: string;
      items: Array<{
        id: string;
        title: string;
        summary: string;
        bullets: string[];
      }>;
    };
    actions: {
      title: string;
      items: Array<{
        title: string;
        cost: string;
        description: string;
      }>;
    };
    layers: {
      title: string;
      items: Array<{ title: string; description: string }>;
    };
    flow: {
      title: string;
      steps: FlowStep[];
    };
    cta: {
      title: string;
      description: string;
      primaryCta: CtaKey;
      secondaryCta: CtaKey;
    };
  };
  pathOfBecoming: {
    label: string;
    title: string;
    description: string;
    heroHighlight: string;
    importance: {
      title: string;
      pillars: Array<{ title: string; description: string }>;
    };
    slider: {
      title: string;
      subtitle: string;
      prevLabel: string;
      nextLabel: string;
      goToLabel: string;
      slides: CombatSlide[];
    };
    philosophy: {
      title: string;
      quote: string;
      body: string;
    };
    stages: {
      title: string;
      subtitle: string;
      items: Array<{ number: number; title: string; theme: string }>;
    };
    decisionFlow: {
      title: string;
      body: string;
      coreChoices: Array<{ title: string; description: string }>;
      hiddenChoices: Array<{ title: string; description: string }>;
    };
    perceptionLens: {
      title: string;
      body: string;
      layers: Array<{ title: string; description: string }>;
    };
    traveler: {
      title: string;
      body: string;
      columns: { reward: string; owner: string; traveler: string };
      rows: Array<{ label: string; owner: string; traveler: string }>;
    };
    entryRitual: {
      title: string;
      body: string;
      steps: FlowStep[];
      sampleQuestions: string[];
    };
    replay: {
      title: string;
      body: string;
      steps: FlowStep[];
    };
    rewards: {
      title: string;
      body: string;
      bullets: string[];
    };
    worldLinks: {
      title: string;
      items: Array<{ title: string; description: string }>;
    };
    faq: {
      title: string;
      items: Array<{ question: string; answer: string }>;
    };
    cta: {
      title: string;
      description: string;
      primaryCta: CtaKey;
      secondaryCta: CtaKey;
    };
  };
  download: {
    label: string;
    title: string;
    description: string;
    steps: Array<{
      title: string;
      description: string;
      storeLinks?: { label: string; key: "ios" | "android" }[];
    }>;
    nativeStores: {
      label: string;
      description: string;
      placeholders: string[];
    };
    primaryCta: CtaKey;
    secondaryCta: CtaKey;
  };
  privacy: {
    title: string;
    description: string;
    updatedAt: string;
    sections: ContentSection[];
    contact: { title: string; prompt: string };
  };
  terms: {
    title: string;
    description: string;
    updatedAt: string;
    sections: ContentSection[];
    contact: { title: string; prompt: string };
  };
  support: {
    label: string;
    title: string;
    description: string;
    emailBlock: { title: string; description: string };
    sections: Array<{
      title: string;
      description: string;
      items?: string[];
      linkKey?: CtaKey;
    }>;
    primaryCta: CtaKey;
  };
  profile: {
    label: string;
    loading: {
      title: string;
      description: string;
    };
    unconfigured: {
      title: string;
      description: string;
      downloadLabel: string;
    };
    empty: {
      title: string;
      description: string;
      inputLabel: string;
      inputPlaceholder: string;
      submitLabel: string;
      divider: string;
    };
    auth: {
      title: string;
      description: string;
      firstTimeAppHint: string;
      signInTab: string;
      signUpTab: string;
      emailLabel: string;
      passwordLabel: string;
      confirmPasswordLabel: string;
      nameLabel: string;
      showPassword: string;
      hidePassword: string;
      signInButton: string;
      signUpButton: string;
      signOutButton: string;
      signedInAs: string;
      userId: string;
      viewMyProfile: string;
      signInSuccess: string;
      signUpSuccess: string;
      confirmEmail: string;
      genericError: string;
      fixErrors: string;
      loading: string;
      unconfigured: string;
      passwordRules: {
        length: string;
        letter: string;
        number: string;
        symbol: string;
      };
      validation: {
        nameRequired: string;
        nameMinLength: string;
        reservedStaffTag: string;
        emailRequired: string;
        emailInvalid: string;
        passwordRequired: string;
        passwordWeak: string;
        confirmRequired: string;
        passwordsMismatch: string;
      };
      otp: {
        title: string;
        description: string;
        verifyButton: string;
        resend: string;
        resendCooldown: string;
        useDifferentEmail: string;
        invalidCode: string;
        tooManyAttempts: string;
        resendSuccess: string;
        verifySuccess: string;
      };
    };
    notFound: {
      title: string;
      description: string;
      backLabel: string;
    };
    sections: {
      identity: string;
      tribe: string;
      pts: string;
      level: string;
      memories: string;
      season: string;
      myCards: string;
    };
    cardStats: {
      attack: string;
      defend: string;
      power: string;
      identityBadge: string;
    };
    tribeLabels: {
      role: string;
      members: string;
      pattern: string;
    };
    actions: {
      share: string;
      copied: string;
      openInApp: string;
      viewInApp: string;
    };
    journeyId: string;
    ptsUnit: string;
    levelPrefix: string;
    emptyMemories: string;
    emptyMyCards: string;
  };
};
