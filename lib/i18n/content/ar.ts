import { EXPO_GO_URL, SUPPORT_EMAIL } from "../constants";
import type { SiteContent } from "../types";
import { pathOfBecomingAr } from "./path-of-becoming-ar";

export const arContent: SiteContent = {
  brand: {
    name: "Some1sJourney",
    tagline: "لكلّ إنسانٍ رحلة",
    subtitle: "اكتشف هويتك. انضم إلى قبيلتك. تطوَّر نحو مستقبلك.",
    footerTagline: "عالمٌ حيّ من الهوية والذاكرة وتطوّر الإنسان.",
  },

  worldState: {
    currentSeason: {
      name: "الموسم الأول",
      subtitle: "الهجرة الأولى",
      shortLabel: "الموسم الأول",
      status: "نشط",
    },
    evolutionStage: "الهجرة الأولى",
    stats: {
      identityCount: 420,
      tribeCountLabel: "قبائل تتشكّل وتنمو",
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
    qrAlt: "امسح لفتح Some1sJourney في Expo Go",
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
    enterWorld: { label: "ادخل إلى العالم", href: "/app" },
    startJourney: { label: "ادخل إلى العالم", href: "/app" },
    enterJourney: { label: "ادخل إلى رحلتك", href: "/app" },
    enterJourneyShort: { label: "ادخل الرحلة", href: "/app" },
    joinEarlyAccess: { label: "ادخل إلى العالم", href: "/app" },
    exploreSeasonOne: { label: "استكشف الموسم الأول", href: "#season-one" },
    exploreCombat: { label: "استكشف القتال", href: "/combat" },
    exploreGameHub: { label: "استكشف مركز الألعاب", href: "/game-hub" },
    explorePathOfBecoming: {
      label: "استكشف مسار التكوّن",
      href: "/path-of-becoming",
    },
    openInExpoGo: { label: "افتح في Expo Go", href: EXPO_GO_URL || "/download" },
    fullInstructions: { label: "التعليمات الكاملة", href: "/download" },
    troubleshooting: { label: "حل المشكلات", href: "/support" },
    learnHowItWorks: { label: "← تعرّف على كيفيّة العمل", href: "/how-it-works" },
    needHelp: { label: "هل تحتاج مساعدة للبدء؟", href: "/support" },
    goToDownload: { label: "انتقل إلى صفحة التحميل", href: "/download" },
  },

  navigation: {
    header: [
      { href: "/game-hub", label: "مركز الألعاب", id: "game-hub" },
      { href: "/how-it-works", label: "كيف يعمل" },
      { href: "/profile", label: "الهوية" },
      { href: "/#discovery", label: "الاكتشاف" },
      { href: "/#season-one", label: "الموسم الأول" },
    ],
    auth: {
      signIn: "تسجيل الدخول",
      signUp: "إنشاء حساب",
      myProfile: "ملفي",
      enterWorld: "ادخل إلى العالم",
      enterWorldShort: "ادخل",
    },
    footer: {
      product: [
        { href: "/game-hub", label: "مركز الألعاب" },
        { href: "/path-of-becoming", label: "مسار التكوّن" },
        { href: "/combat", label: "نظام القتال" },
        { href: "/how-it-works", label: "كيف يعمل" },
        { href: "/profile", label: "ملف الهوية" },
        { href: "/download", label: "ادخل إلى رحلتك" },
      ],
      legal: [
        { href: "/privacy", label: "سياسة الخصوصية" },
        { href: "/terms", label: "شروط الخدمة" },
      ],
      support: [
        { href: "/support", label: "الدعم" },
        { href: `mailto:${SUPPORT_EMAIL}`, label: "تواصل", external: true },
      ],
      columns: {
        product: "المنتج",
        legal: "قانوني",
        support: "الدعم",
      },
    },
  },

  metadata: {
    defaultDescription:
      "عالم هوية حيّ حيث يكتشف الناس من هم، وينضمون إلى قبيلتهم، ويتطوّرون عبر مواسم من الذاكرة والنمو.",
    pages: {
      home: {
        title: "لكلّ إنسانٍ رحلة",
        description:
          "عالم هوية حيّ حيث يكتشف الناس من هم، وينضمون إلى قبيلتهم، ويتطوّرون عبر مواسم من الذاكرة والنمو.",
      },
      howItWorks: {
        title: "كيف يعمل",
        description:
          "تعرّف على كيفية عمل Some1sJourney — من اكتشاف الهوية إلى الانتماء للقبيلة، والذكريات، والتطوّر.",
      },
      combat: {
        title: "نظام القتال",
        description:
          "تعرّف على قتال الكروت في Some1sJourney — الجولات، الأفعال، الإحصائيات، PvE وPvP والمعارك الجماعية في منطقة القتال.",
      },
      gameHub: {
        title: "مركز الألعاب",
        description:
          "استكشف كل مسارات اللعب في Some1sJourney — القتال، مسار التكوّن، ساحة السرد، الهوية الموسمية، والرحلة الحيّة.",
      },
      pathOfBecoming: {
        title: "مسار التكوّن",
        description:
          "دليل معمّق لمسار التكوّن في Some1sJourney — 15 مرحلة، عدسة الإدراك، وضع المسافر، طقس الدخول، ولماذا يهمّ.",
      },
      download: {
        title: "ادخل إلى رحلتك",
        description:
          "ثبّت Expo Go، امسح رمز QR، وابدأ رحلتك في Some1sJourney.",
      },
      privacy: {
        title: "سياسة الخصوصية",
        description:
          "كيف تجمع Some1sJourney معلوماتك وتستخدمها وتحميها.",
      },
      terms: {
        title: "شروط الخدمة",
        description:
          "الشروط التي تحكم مشاركتك في عالم هوية Some1sJourney.",
      },
      support: {
        title: "الدعم",
        description:
          "احصل على مساعدة في الوصول المبكر لـ Some1sJourney، أو أبلغ عن مشكلة، أو تواصل مع فريقنا.",
      },
      profile: {
        title: "ملف الهوية",
        description:
          "اعرض هويتك في Some1sJourney وقبيلتك وذكرياتك وتطوّرك على الويب.",
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
    label: "الموسم الأول",
    title: "لكلّ إنسانٍ رحلة",
    subtitle: "اكتشف هويتك. انضم إلى قبيلتك. تطوَّر نحو مستقبلك.",
    primaryCta: "enterWorld",
    secondaryCta: "exploreSeasonOne",
  },

  homepage: {
    whatIs: {
      id: "what-is",
      label: "العالم",
      title: "ما هو Some1sJourney؟",
      description:
        "Some1sJourney عالم هوية حيّ، حيث يكتشف الناس من هم من خلال الخيارات والأسئلة والتجارب.",
      pillars: [
        {
          title: "اكتشف نفسك",
          description:
            "أجب عن أسئلة عميقة. اكشف الأنماط التي تحدّد من أنت.",
        },
        {
          title: "اعثر على قبيلتك",
          description:
            "انتمِ إلى مجتمع حيّ يتشكّل من هوية مشتركة وهدف واحد.",
        },
        {
          title: "ابنِ إرثك",
          description:
            "اجمع الذكريات، وتطوّر عبر المواسم، واترك أثرًا في العالم.",
        },
      ],
    },
    discovery: {
      id: "discovery",
      label: "الهوية",
      title: "نظام اكتشاف الهوية",
      description:
        "هذا ليس اختبارًا. إنه انعكاس لشخصيتك وماضيك وأنماط سلوكك — مقطّرًا في هوية تخصّك وحدك.",
      flow: [
        {
          label: "أجب",
          description:
            "تأمّل في أسئلة عن ماضيك وخياراتك وأنماطك.",
        },
        {
          label: "التحليل",
          description: "العالم يقرأ من أنت — لا من تتمنّى أن تكون.",
        },
        {
          label: "بطاقة الهوية",
          description:
            "احصل على بطاقة فريدة تعكس هويتك الداخلية.",
        },
        {
          label: "القبيلة",
          description: "انضم إلى من تتّفق مساراتهم مع مسارك.",
        },
      ],
    },
    pathBeyond: {
      id: "path-beyond",
      label: "التطوّر",
      title: "المسار ما بعد",
      description:
        "هويتك ليست وجهتك. كل هوية تحمل مسار تطوّر مستقبليًا مخفيًا — اتجاهًا تكشفه مواسم أعمق.",
      flow: [
        {
          label: "الماضي",
          description:
            "أين كنت يشكّل أساس من أنت.",
        },
        {
          label: "الخيارات",
          description: "كل قرار يترك أثرًا في هويتك.",
        },
        {
          label: "الهوية",
          description: "بطاقتك لقطة — لا شكلك النهائي.",
        },
        {
          label: "التطوّر المستقبلي",
          description: "مسارات مخفية تنتظر أن تُفتح في المواسم القادمة.",
        },
      ],
      callout:
        "كل بطاقة تحمل اتجاه تطوّر. المواسم القادمة تفتح طبقات هوية أعمق — ذكريات جديدة، مسارات جديدة، نسخ جديدة مما تصبح عليه. هذا ما يجعل Some1sJourney مختلفًا عن أي شيء آخر.",
    },
    identities: {
      id: "identities",
      label: "المجموعة",
      titleTemplate: (count: number) => `${count} هويةً فريدة`,
      descriptionTemplate: (count: number) =>
        `${count} هوية. واحدة لكل تركيبة من أنماط الإنسان وخياراته ونظرته. كل واحدة غامضة. كل واحدة مكتسبة.`,
      footnote:
        "لمحة من الموسم الأول. المجموعة الكاملة تنتظرك داخل العالم.",
    },
    tribes: {
      id: "tribes",
      label: "الانتماء",
      title: "اعثر على قومك",
      description:
        "ينتمي المستخدمون إلى قبائل قائمة على الهوية — مجتمعات حية، لا أعداد متابعين. لكل قبيلة طابعها وتاريخها واتجاهها.",
      traits: [
        {
          title: "الأعضاء",
          description:
            "بشر حقيقيون يربطهم أنماط هوية مشتركة وهدف جماعي.",
        },
        {
          title: "القائد",
          description:
            "كل قبيلة تعود إلى بطاقة أصل — الأولى من نوعها.",
        },
        {
          title: "النمط الجماعي",
          description:
            "قبيلتك تتحرّك ككيان واحد — يشكّلها السلوك والذاكرة والتطوّر.",
        },
      ],
    },
    memories: {
      id: "memories",
      label: "الإرث",
      title: "الذكريات تعيش إلى الأبد",
      description:
        "كل بطاقة تحفظ تاريخًا حيًا — ويبقى هذا التاريخ مرتبطًا بالهوية، حتى عندما تنتقل من يد إلى أخرى.",
      layers: [
        "إنجازات شخصية",
        "تجارب مشتركة مع قبيلتك",
        "لحظات شكّلت تطوّرك",
      ],
      callout:
        "هذا ليس ملكية أصل. إنه تاريخ حيّ مرتبط بالهوية — سجلّ لمن كنت، وما فعلت، ومن أصبحت.",
      badge: "ذاكرة مرتبطة بشكل دائم",
      cardAlt: "بطاقة هوية مع ذكريات مرفقة",
    },
    competeEvolve: {
      id: "compete-evolve",
      label: "النمو",
      title: "نافس وتطوّر",
      description:
        "العب، تحدَّ، وتقدّم — لا للنقاط وحدها، بل للتطوّر. كل منافسة تشكّل هويتك وقبيلتك.",
      pillars: [
        {
          title: "الألعاب",
          description: "تحدَّ نفسك وغيرك داخل العالم.",
        },
        {
          title: "تحدّيات الفريق",
          description: "تقوَّ إلى جانب قبيلتك.",
        },
        {
          title: "التصنيفات",
          description: "شاهد كيف ترتفع هويتك عبر المواسم.",
        },
        {
          title: "التقدّم",
          description: "كل خطوة للأمام تعمّق من تصبح عليه.",
        },
      ],
      cta: "exploreGameHub" as const,
    },
    marketplace: {
      id: "marketplace",
      label: "التبادل",
      title: "السوق",
      description:
        "يمكن تداول الهويات — لكن القيمة هنا لا تُقاس بالمضاربة. تُقاس بالتاريخ، ومساهمة القبيلة، والتقدّم.",
      body:
        "الهوية التي قطعت شوطًا بعيدًا، وساهمت بعمق، وجمعت ذكريات غنية، تحمل وزنًا مختلفًا عن تلك التي بدأت للتو. السوق موجود داخل العالم — لا خارجه.",
    },
    pts: {
      id: "pts",
      label: "نظام النمو",
      title: "PTS",
      description:
        "PTS نظام دعم لنمو الهوية — ليس عملة تطاردها، بل مقياس لعمق تفاعلك مع العالم.",
      uses: [
        {
          title: "قوِّ هويتك",
          description:
            "عمّق حضور بطاقتك وتأثيرها في العالم.",
        },
        {
          title: "ادعم قبيلتك",
          description: "ساهم في النمو الجماعي لقومك.",
        },
        {
          title: "زِد نفوذك",
          description:
            "شكّل العالم من حولك من خلال مشاركة ذات معنى.",
        },
      ],
    },
    seasonOne: {
      id: "season-one",
      label: "مباشر الآن",
      titleTemplate: (season: string, stage: string) =>
        `${season} — ${stage}`,
      description:
        "هذا ليس معاينة لشيء قادم. الموسم الأول حيّ — هويات مكتشفة، قبائل متحدّة، ذكريات تُكتب في العالم.",
      liveSignals: [
        "هويات نشطة في أنحاء العالم",
        "قبائل تتشكّل وتنمو",
        "ذكريات تُخلَق كل يوم",
        "الهجرة الأولى جارية",
      ],
    },
    evolution: {
      id: "evolution",
      label: "خارطة الطريق",
      title: "التطوّر / المواسم القادمة",
      description:
        "العالم لا يقف ساكنًا. كل موسم يفتح طبقات جديدة من الهوية والذاكرة والإمكان.",
      seasons: [
        { name: "الموسم الأول", subtitle: "الهجرة الأولى", status: "نشط" },
        { name: "الموسم الثاني", subtitle: "التوسّع", status: "قادم" },
        { name: "الموسم الثالث", subtitle: "اليقظة", status: "قادم" },
        { name: "المستقبل", subtitle: "تطوّر مجهول", status: "مجهول" },
      ],
    },
    earlyAccess: {
      id: "early-access",
      label: "ادخل",
      title: "ادخل إلى العالم",
      description:
        "سجّل دخولك في الموقع، ثم ادخل إلى العالم الحيّ من متصفّحك.",
      steps: [
        "أنشئ حسابًا أو سجّل الدخول من الشريط العلوي",
        "اضغط «ادخل إلى العالم» لفتح تطبيق الويب",
        "تابع رحلتك بنفس هويتك",
      ],
      primaryCta: "enterWorld",
      secondaryCta: "needHelp",
    },
  },

  qrPanel: {
    label: "الوصول المبكر",
    title: "امسح للدخول إلى العالم",
    description:
      "ثبّت Expo Go على هاتفك، ثم امسح هذا الرمز لبدء رحلتك في Some1sJourney.",
    primaryCta: "openInExpoGo",
    secondaryCta: "fullInstructions",
  },

  howItWorks: {
    label: "معاينة التطبيق",
    title: "كيف يعمل Some1sJourney",
    description:
      "Some1sJourney عالم هوية — لا تطبيق اختبارات. إليك كيف تدخل، وتكتشف نفسك، وتبدأ التطوّر.",
    productFlow: [
      {
        label: "أجب عن أسئلة الهوية",
        description: "تأمّل في من أنت ومن كنت.",
      },
      {
        label: "احصل على بطاقة هويتك",
        description: "بطاقة فريدة تُولَّد من أنماطك.",
      },
      {
        label: "انضم إلى قبيلتك",
        description: "اعثر على من تتوافق مساراتهم مع مسارك.",
      },
      {
        label: "شارك في الرحلات",
        description: "سِر في تجارب تشكّل هويتك.",
      },
      {
        label: "اجمع الذكريات وتطوّر",
        description: "ابنِ إرثًا يبقى مرتبطًا ببطاقتك.",
      },
      {
        label: "العب، نافس، تقدّم",
        description: "انمُ عبر التحدّيات — فرديًا ومع قبيلتك.",
      },
    ],
    mockPanels: {
      identity: {
        label: "هويتك",
        description:
          "بطاقتك تُولَّد من أسئلة عميقة وأنماط سلوكية — انعكاس، لا وسم.",
        cardAlt: "نموذج بطاقة هوية",
      },
      tribe: {
        label: "قبيلتك",
        description:
          "القبائل مجتمعات حية بأعضاء وقادة وأنماط سلوك مشتركة.",
        memberAlt: "عضو قبيلة",
      },
    },
    differentiators: {
      title: "ما الذي يجعله مختلفًا",
      items: [
        "مسارات تطوّر مخفية داخل كل هوية",
        "ذكريات تعيش إلى الأبد على بطاقتك",
        "انتماء قبيلي متجذّر في من أنت حقًا",
      ],
    },
    primaryCta: "enterJourney",
  },

  gameHub: {
    label: "مركز الألعاب",
    title: "كل مسارات اللعب في مكان واحد",
    description:
      "تبويب الألعاب في التطبيق هو ساحة الأركيد — قتال الكروت، ساحات السرد، طقوس الهوية، والرحلة الحيّة. القتال له دليل كامل على الويب؛ باقي الألعاب تفتح داخل التطبيق.",
    availableGamesLabel: "الألعاب المتاحة",
    inAppBadge: "داخل التطبيق",
    viewCombatGuide: "دليل القتال الكامل",
    questsNote:
      "المهمات والمكافآت اليومية في تبويب الألعاب — XP، مهام، وسلسلة إنجازات.",
    clubNote:
      "النادي الاجتماعي منفصل — الفرق والمتابعون ودليل المستخدمين في تبويب النادي.",
    games: [
      {
        id: "combat",
        title: "منطقة القتال",
        summary:
          "معارك كروت بالدور — جولتان (+ فاصلة)، هجوم، دفاع، مهارات، نهائي. PvE وPvP وجماعي بكارت مقاتل واحد.",
        badge: "دليل على الويب",
        href: "/combat",
        cta: "استكشف القتال",
        featured: true,
      },
      {
        id: "path-of-becoming",
        title: "مسار التكوّن",
        summary:
          "١٥ مرحلة · حدث واحد لكل رحلة · إعادة اللعب تُظهر بدائل · العب أي شخصية نادرة كمسافر.",
        badge: "15 مرحلة",
        href: "/path-of-becoming",
        cta: "استكشف الدليل",
      },
      {
        id: "entry-ritual",
        title: "طقس الدخول",
        summary:
          "ستة أسئلة تمهيدية قبل تكوينك — أعد تجربتها من مركز الألعاب (~3 دقائق).",
        badge: "6 أسئلة",
      },
      {
        id: "arena",
        title: "ساحة الثلاثة كروت",
        summary:
          "طاولة سرد فردية أو جماعية — رسوم 20–50 PTS حسب الجولات، +10 PTS وXP لكل إجابة صحيحة.",
        badge: "طاولات مباشرة",
      },
      {
        id: "seasonal-identity",
        title: "كارت الشخصية الموسمي",
        summary:
          "اكتشف هويتك للموسم وابنِ فريق كروتك عبر رحلة السحب الموسمية.",
        badge: "الموسم نشط",
      },
      {
        id: "journey",
        title: "الرحلة والقصة",
        summary:
          "تقدّم عبر المراحل، اجمع الكروت، واصنع مصيرك في خريطة العالم الحيّة.",
        badge: "الحلقة الأساسية",
      },
    ],
    cta: {
      title: "العب داخل التطبيق",
      description:
        "مركز الألعاب ومنطقة القتال وكل المسارات أعلاه تفتح من تبويب الألعاب بعد الدخول عبر Expo Go.",
      primaryCta: "enterJourney" as const,
      secondaryCta: "exploreCombat" as const,
    },
  },

  combat: {
    label: "منطقة القتال",
    title: "قتال كروت يقرأ من أنت",
    description:
      "Combat في Some1sJourney نظام معارك كروت بالدور داخل تبويب الألعاب. مقاتل واحد نادر أو موسمي. اختيارات مخفية. جولتان للفوز — وجولة فاصلة عند التعادل ١–١.",
    heroHighlight:
      "كل معركة تستخدم نفس المحرّك في PvE وPvP والجماعي: هجوم، دفاع، مهارات، نهائي، HP، Stamina، وتأثيرات سلبية من طبقات الماضي والمؤثر والهوية في كارتك.",
    slider: {
      title: "موسوعة القتال — مرّر لاستكشاف النظام",
      subtitle:
        "استخدم السلايدر لفهم مسار التحدي الكامل — من اختيار المقاتل إلى الفوز بجولتين.",
      prevLabel: "الشريحة السابقة",
      nextLabel: "الشريحة التالية",
      goToLabel: "انتقل إلى الشريحة",
      slides: [
        {
          id: "arena",
          kicker: "٠١ · منطقة القتال",
          title: "ادخل الساحة بكارت مقاتل واحد",
          body:
            "منطقة القتال هي مركز معارك الكروت داخل تبويب الألعاب. تقاتل دائماً بكارت شخصية نادرة واحد أو كارت هويتك الموسمية — بنفس القواعد في كل مكان.",
          bullets: [
            "افتح الألعاب ← ادخل منطقة القتال.",
            "جهّز كارت نادر جاهز للقتال أو هويتك الموسمية.",
            "اختر PvE أو PvP أو جماعي — ثم استطلع، ابدأ، أو اقبل التحدي.",
          ],
          chips: ["مقاتل واحد", "قواعد موحّدة", "تبويب الألعاب"],
          accent: "gold",
        },
        {
          id: "rounds",
          kicker: "٠٢ · قواعد التحدي",
          title: "فُز بجولتين. فاصلة عند ١–١.",
          body:
            "كل تحدٍ جولتان أساسيتان. كل جولة ٣ دقائق وتنتهي بالإقصاء أو بانتهاء الوقت — HP الأعلى يفوز بالجولة.",
          bullets: [
            "فُز بالتحدي بجمع جولتين.",
            "عند ١–١ تُلعب جولة ثالثة فاصلة.",
            "بداية كل جولة: HP ١٠٠% · Stamina ٧٠%.",
          ],
          chips: ["جولتان", "٣ دقائق", "جولة فاصلة"],
          accent: "crimson",
        },
        {
          id: "exchange",
          kicker: "٠٣ · التبادلات",
          title: "اختيار مخفي. كشف مشترك.",
          body:
            "داخل كل جولة يتبادل المقاتلون «تبادلات». يختار كل لاعب فعلاً قبل مؤقت التبادل — هجوم، دفاع، مهارة، أو نهائي — ثم يحلّهما الخادم معاً.",
          bullets: [
            "الأفعال تبقى مخفية حتى لحظة الحل.",
            "قد تُفعَّل التأثيرات السلبية أثناء الحل.",
            "تنتهي الجولة عند ٠ HP أو انتهاء مؤقت الجولة.",
          ],
          chips: ["اختيارات مخفية", "حلّ متزامن"],
          accent: "violet",
        },
        {
          id: "stats",
          kicker: "٠٤ · HP وStamina",
          title: "اصمد في الجولة. أنفق Stamina بذكاء.",
          body:
            "HP هو مجموع حياتك — عند ٠ تنتهي الجولة. Stamina تغذّي المهارات والنهائي. الهجوم والدفاع يستردان قليلاً من Stamina في كل تبادل.",
          bullets: [
            "HP يبدأ ١٠٠% في كل جولة.",
            "Stamina تبدأ ٧٠% في كل جولة.",
            "الزخم يتراكم مع فوز الجولات ويغيّر ضغط أواخر المعركة.",
          ],
          chips: ["HP ١٠٠%", "Stamina ٧٠%", "زخم"],
          accent: "emerald",
        },
        {
          id: "power-defend",
          kicker: "٠٥ · الهجوم والدفاع",
          title: "Power يضرب أقوى. Defend يمتص أكثر.",
          body:
            "طبقات الأصول والمؤثر والهوية في كارتك تتجمّع في Power (هجوم) وDefend (دفاع). استطلع الخصم عندما يمكن — فارق بسيط قد يحسم جولة بالوقت.",
          bullets: [
            "Power يزيد الضرر الصادر.",
            "Defend يقلّل الضرر الوارد.",
            "قارن الهجوم/الدفاع قبل المخاطرة.",
          ],
          chips: ["Power / هجوم", "Defend / دفاع", "استطلاع"],
          accent: "gold",
        },
        {
          id: "actions",
          kicker: "٠٦ · الأفعال",
          title: "أربعة تحركات. تبادل واحد.",
          body:
            "الهجوم والدفاع هما إيقاعك الأساسي. المهارات تنفق Stamina لتأثيرات الطبقات. النهائي هو إنهاء الهوية — تكلفة عالية، أثر كبير، ومخاطرة أعلى.",
          bullets: [
            "هجوم — ضغط ضرر (+١٠% Stamina).",
            "دفاع — حجب كلي أو جزئي (+١٠% Stamina).",
            "مهارات — ٢٥% Stamina؛ طبقة المؤثر أو الهوية.",
            "نهائي — ٧٠% Stamina؛ يُفتح بعد أول ضربة في التحدي.",
          ],
          chips: ["هجوم", "دفاع", "مهارات", "نهائي"],
          accent: "crimson",
        },
        {
          id: "layers",
          kicker: "٠٧ · بناء الكارت",
          title: "الماضي يعمل تلقائياً. أنت تختار الباقي.",
          body:
            "مقاتلك مبني من الماضي (الأصول) والمؤثر والهوية — مع القدر كمسار تقدم منفصل، وليس زر قتال.",
          bullets: [
            "تأثيرات الماضي السلبية تُفعَّل تلقائياً أثناء الحل.",
            "مهارات المؤثر والهوية تُختار بزر المهارات.",
            "استخدام مهارة أو نهائي في هذا التبادل قد يضاعف الضرر الوارد — اختَر توقيتها بعناية.",
          ],
          chips: ["أصول", "مؤثر", "هوية", "Destiny DP"],
          accent: "violet",
        },
        {
          id: "modes",
          kicker: "٠٨ · أنظمة اللعب",
          title: "PvE. PvP. جماعي بالتناوب.",
          body:
            "مواجهات AI فردية، تحديات لاعبين مباشرة، وجلسات فرق بالتناوب — كلها على نفس محرّك القتال، مع XP اللاعب وXP الكارت وDestiny DP ومساهمة الفريق بعد كل معركة.",
          bullets: [
            "PvE — تحدي مقترح، قوائم أسلوب، مواجهات كلاسيكية.",
            "PvP — تحديات من اللوبي المباشر وقبول عبر الإشعارات.",
            "جماعي — حرب فرق بالتناوب أو غارة تعاونية برموز دعوة.",
          ],
          chips: ["PvE", "PvP", "جماعي"],
          accent: "emerald",
        },
      ],
    },
    matchRules: {
      title: "كيف يُفوز بالتحدي",
      body:
        "التحدي جولتان أساسيتان (٣ دقائق لكل جولة). تفوز بالجولة بالإقصاء أو بـ HP أعلى عند انتهاء الوقت. تفوز بالتحدي بجولتين؛ عند ١–١ تُلعب جولة ثالثة فاصلة بنفس النظام.",
      steps: [
        { label: "بداية الجولة", description: "HP ١٠٠% · Stamina ٧٠% للطرفين." },
        { label: "حلقة التبادل", description: "التزام ← حل ← تأثيرات سلبية ← تحديث HP/Stamina." },
        { label: "نهاية الجولة", description: "إقصاء أو HP أعلى عند انتهاء المؤقت." },
        { label: "نتيجة التحدي", description: "أول من يفوز بجولتين؛ ١–١ تفتح الجولة الفاصلة." },
      ],
    },
    modes: {
      title: "ثلاث طرق للقتال",
      items: [
        {
          id: "pve",
          title: "PvE — فردي",
          summary: "قاتل خصوم AI ومواجهات منسّقة وقوائم حسب الأسلوب.",
          bullets: [
            "تحدي مقترح في أعلى الساحة.",
            "زعيم العالم، مهارات ذكية، شياطين السرعة، حائط حديدي، سادة التوازن.",
            "الفوز والخسارة يمنحان تقدماً جزئياً.",
          ],
        },
        {
          id: "pvp",
          title: "PvP — مباشر",
          summary: "تحدِّ لاعبين متصلين من اللوبي المباشر.",
          bullets: [
            "إرسال أو قبول التحديات عبر الإشعارات.",
            "يتطلب كارت نادر جاهزاً للقتال.",
            "نفس قواعد الجولتين + الفاصلة في كل الأنظمة.",
          ],
        },
        {
          id: "group",
          title: "جماعي — تناوب",
          summary: "حرب فرق أو غارة تعاونية برموز دعوة ومعارك فرعية.",
          bullets: [
            "حرب الفرق — حتى ٣ مقاتلين لكل جانب في تناوب 1v1.",
            "غارة تعاونية — تحالف ضد زعيم؛ فوز جماعي واحد قد يكمل الغارة.",
            "أغلبية الفوز بعد انتهاء المعارك الفرعية.",
          ],
        },
      ],
    },
    actions: {
      title: "أفعالك الأربعة في كل تبادل",
      items: [
        {
          title: "هجوم",
          cost: "+١٠% STA",
          description: "ضغط ضرر ونقش HP. الطريق الافتراضي لبناء الزخم عندما تتوقع دفاعاً.",
        },
        {
          title: "دفاع",
          cost: "+١٠% STA",
          description: "حجب كامل أو جزئي. قوي عند توقع burst أو الحاجة للبقاء حتى مؤقت الجولة.",
        },
        {
          title: "مهارات",
          cost: "٢٥% STA",
          description: "تفعيل تأثيرات طبقة المؤثر أو الهوية. عائد عالٍ — لكن المهارة أو النهائي قد يضاعفان الضرر الوارد هذا التبادل.",
        },
        {
          title: "نهائي",
          cost: "٧٠% STA",
          description: "إنهاء الهوية فقط. يُفتح بعد أول ضربة في التحدي. قابل للتكرار عند توفر Stamina.",
        },
      ],
    },
    layers: {
      title: "ما الذي يجلب كارتك إلى القتال",
      items: [
        {
          title: "الماضي (الأصول)",
          description: "تأثيرات سلبية دائمة وتفعيلات تلقائية أثناء الحل — أساسك في كل تبادل.",
        },
        {
          title: "المؤثر",
          description: "مهارات يدوية بتأثيرات تكتيكية. اخترها عندما يكون التوقيت وتكلفة Stamina مناسبين.",
        },
        {
          title: "الهوية",
          description: "مهارات يدوية + النهائي. هذه الطبقة تحدّد شخصية إنهائك في الساحة.",
        },
        {
          title: "القدر",
          description: "تقدم عبر Destiny DP — ليس زر قتال، بل المسار الذي ينمو إليه مقاتلك.",
        },
      ],
    },
    flow: {
      title: "من الساحة إلى النصر",
      steps: [
        { label: "تبويب الألعاب", description: "ادخل منطقة القتال واختر كارت مقاتلك." },
        { label: "اختر النظام", description: "بلاطة PvE، تحدي PvP، أو رمز دعوة جماعي." },
        { label: "استطلاع (اختياري)", description: "قارن الهجوم والدفاع قبل الالتزام." },
        { label: "قاتل جولتين", description: "حلقة تبادل حتى الإقصاء أو مؤقت الجولة." },
        { label: "النتيجة والإعادة", description: "اجمع مكافآت XP، راجع السجل، وعد للمعركة." },
      ],
    },
    cta: {
      title: "مستعد للقتال في التطبيق؟",
      description:
        "القتال يعمل اليوم داخل تطبيق Some1sJourney. ادخل عبر Expo Go، جهّز كارتك النادر، وافتح منطقة القتال من تبويب الألعاب.",
      primaryCta: "enterJourney" as const,
      secondaryCta: "learnHowItWorks" as const,
    },
  },

  pathOfBecoming: pathOfBecomingAr,

  download: {
    label: "الوصول المبكر",
    title: "ادخل إلى رحلتك",
    description:
      "رحلتك تبدأ في التطبيق. ثبّت Expo Go، امسح الرمز، وادخل إلى العالم.",
    steps: [
      {
        title: "ثبّت Expo Go",
        description: "حمّل Expo Go على iPhone أو جهاز Android.",
        storeLinks: [
          { label: "App Store", key: "ios" },
          { label: "Google Play", key: "android" },
        ],
      },
      {
        title: "امسح رمز QR",
        description:
          "افتح Expo Go وامسح الرمز أدناه لتشغيل Some1sJourney.",
      },
      {
        title: "ابدأ رحلتك",
        description:
          "أجب عن أسئلتك الأولى، واحصل على هويتك، وانضم إلى قبيلتك.",
      },
    ],
    nativeStores: {
      label: "قريبًا",
      description:
        "ستظهر هنا روابط التحميل من App Store وGoogle Play عند إطلاق Some1sJourney خارج الوصول المبكر.",
      placeholders: ["App Store", "Google Play"],
    },
    primaryCta: "troubleshooting",
    secondaryCta: "learnHowItWorks",
  },

  privacy: {
    title: "سياسة الخصوصية",
    description:
      "نؤمن بالشفافية. إليك كيف تتعامل Some1sJourney مع معلوماتك — بلغة واضحة.",
    updatedAt: "يونيو 2025",
    sections: [
      {
        title: "ما الذي نجمعه",
        paragraphs: [
          "عند دخولك Some1sJourney، نجمع معلومات تساعد العالم على التعرّف عليك وتذكّر رحلتك.",
        ],
        list: [
          "تفاصيل الحساب التي تقدّمها عند الانضمام",
          "إجاباتك على أسئلة الهوية",
          "نشاط اللعب والتفاعلات داخل العالم",
          "التقدّم، وعضوية القبيلة، والذكريات المرتبطة بهويتك",
        ],
      },
      {
        title: "كيف نستخدم بياناتك",
        paragraphs: [
          "بياناتك موجودة لخدمة رحلتك — لا لبيعك شيئًا آخر.",
        ],
        list: [
          "توليد بطاقة هويتك الفريدة",
          "مطابقتك مع قبيلتك",
          "تتبّع التقدّم والمواسم ومسارات التطوّر",
          "حفظ الذكريات والتجارب المشتركة على هويتك",
        ],
      },
      {
        title: "كيف نخزّنها",
        paragraphs: [
          "معلوماتك مخزّنة على بنية تحتية آمنة. لا نبيع بياناتك الشخصية لأطراف ثالثة.",
          "Some1sJourney مبني كعالم هوية حيّ. بياناتك تبقى مرتبطة برحلتك ليتطوّر العالم معك.",
        ],
      },
      {
        title: "سيطرتك",
        paragraphs: ["هذه هويتك. تبقى أنت المتحكّم بها."],
        list: [
          "يمكنك طلب الوصول إلى البيانات التي نحتفظ بها عنك",
          "يمكنك طلب حذف حسابك والبيانات المرتبطة به",
          "تواصل معنا في أي وقت إن كان لديك أسئلة عن معلوماتك",
        ],
      },
    ],
    contact: {
      title: "تواصل",
      prompt: "أسئلة عن خصوصيتك؟ راسلنا على",
    },
  },

  terms: {
    title: "شروط الخدمة",
    description:
      "قواعد العالم — مكتوبة لتُفهم، لا لتُرهب.",
    updatedAt: "يونيو 2025",
    sections: [
      {
        title: "استخدام Some1sJourney",
        paragraphs: [
          "Some1sJourney عالم هوية حيّ. بدخولك، توافق على المشاركة باحترام وصدق.",
        ],
        list: [
          "أنت مسؤول عن حسابك ونشاطك",
          "لن تحاول الإضرار بالعالم أو أعضائه أو تعطيله أو استغلاله",
          "ستتفاعل مع الآخرين بحسن نية",
        ],
      },
      {
        title: "نظام الهوية",
        paragraphs: [
          "بطاقة هويتك انعكاس لمن أنت داخل هذا العالم — خياراتك وأنماطك ومسارك.",
          "بطاقات الهوية تعبيرات شخصية داخل Some1sJourney. ليست أصولًا مالية أو أدوات استثمار.",
        ],
      },
      {
        title: "تداول الهويات",
        paragraphs: [
          "قد تُتداول بعض الهويات بين الأعضاء. عندها، قيمة الهوية مرتبطة بتاريخها ومساهمتها في القبيلة وتقدّمها — لا بالمضاربة المالية.",
          "Some1sJourney لا تعد بعوائد مالية من تداول الهويات. تداول بعناية، مع العلم أن الذكريات والإرث يسافران مع كل هوية.",
        ],
      },
      {
        title: "الاستخدام العادل",
        paragraphs: ["نتوقع من جميع الأعضاء حماية سلامة العالم."],
        list: [
          "لا غش ولا تلاعب ولا إساءة استخدام لأنظمة اللعب",
          "لا مضايقة ولا سلوك ضار تجاه أعضاء آخرين",
          "لا محاولات لاستغلال ثغرات تقنية",
        ],
      },
      {
        title: "إنهاء الحساب",
        paragraphs: [
          "قد نعلّق أو نزيل حسابات تنتهك هذه الشروط أو تضر بالمجتمع.",
          "يمكنك مغادرة العالم في أي وقت. عندها، تواصل معنا إن رغبت في حذف بياناتك.",
        ],
      },
    ],
    contact: {
      title: "تواصل",
      prompt: "أسئلة عن هذه الشروط؟ راسلنا على",
    },
  },

  support: {
    label: "المساعدة",
    title: "الدعم",
    description:
      "نحن هنا لمساعدتك على الدخول إلى العالم وسلك رحلتك.",
    emailBlock: {
      title: "راسلنا",
      description: "أسرع طريقة للتواصل معنا هي البريد الإلكتروني.",
    },
    sections: [
      {
        title: "احصل على مساعدة",
        description:
          "سواء كنت تدخل الوصول المبكر أو تسلك رحلتك بالفعل، نحن هنا لمساعدتك على إيجاد طريقك في العالم.",
      },
      {
        title: "أبلغ عن مشكلة",
        description:
          "إن لم يعمل شيء كما تتوقّع، أرسل لنا بريدًا إلكترونيًا مع وصف مختصر للمشكلة، ونوع جهازك، والخطوات التي أدّت إليها.",
        items: [
          "ما الذي كنت تحاول فعله",
          "ما الذي حدث بدلًا من ذلك",
          "جهازك (iPhone، Android، إلخ.)",
          "لقطات شاشة إن كانت مفيدة",
        ],
      },
      {
        title: "دعم الوصول المبكر",
        description:
          "الوصول المبكر يعمل عبر Expo Go. ثبّت التطبيق، وامسح رمز QR في صفحة التحميل، وستُفتح رحلتك مباشرة.",
        linkKey: "goToDownload",
      },
    ],
    primaryCta: "enterJourney",
  },

  profile: {
    label: "الهوية",
    loading: {
      title: "جاري تحميل الهوية…",
      description: "جاري جلب ملفك من عالم Some1sJourney المشترك.",
    },
    unconfigured: {
      title: "الخادم غير متصل",
      description:
        "أضف NEXT_PUBLIC_SUPABASE_URL و NEXT_PUBLIC_SUPABASE_ANON_KEY (نفس مشروع Expo) لتحميل الملفات الحقيقية.",
      downloadLabel: "حمّل التطبيق",
    },
    empty: {
      title: "سجّل الدخول أو أدخل معرّف الرحلة",
      description:
        "استخدم نفس حساب Supabase كما في تطبيق Expo، أو أدخل UUID المستخدم لعرض هويته العامة.",
      inputLabel: "معرّف المستخدم (UUID)",
      inputPlaceholder: "مثال: 550e8400-e29b-41d4-a716-446655440000",
      submitLabel: "عرض الملف",
      divider: "أو ابحث بالمعرّف",
    },
    auth: {
      title: "حساب موحّد",
      description:
        "سجّل الدخول أو أنشئ حسابًا — نفس البريد وكلمة المرور تعمل على الموقع وفي تطبيق Expo.",
      firstTimeAppHint:
        "بعد إنشاء الحساب هنا، افتح التطبيق وسجّل الدخول بنفس البيانات لأول مرة.",
      signInTab: "تسجيل الدخول",
      signUpTab: "إنشاء حساب",
      emailLabel: "البريد الإلكتروني",
      passwordLabel: "كلمة المرور",
      confirmPasswordLabel: "تأكيد كلمة المرور",
      nameLabel: "الاسم الكامل",
      showPassword: "إظهار كلمات المرور",
      hidePassword: "إخفاء كلمات المرور",
      signInButton: "تسجيل الدخول",
      signUpButton: "إنشاء حساب",
      signOutButton: "تسجيل الخروج",
      signedInAs: "مسجّل الدخول كـ",
      userId: "معرّف المستخدم",
      viewMyProfile: "عرض ملفي",
      signInSuccess: "تم تسجيل الدخول — جاري تحميل هويتك…",
      signUpSuccess: "تم إنشاء الحساب — جاري تحميل هويتك…",
      confirmEmail: "أدخل رمز التحقق المرسل إلى بريدك.",
      genericError: "فشلت المصادقة. حاول مرة أخرى.",
      fixErrors: "صحّح الأخطاء قبل المتابعة.",
      loading: "جاري العمل…",
      unconfigured: "Supabase غير مُعدّ على هذا الموقع بعد.",
      passwordRules: {
        length: "8 أحرف على الأقل",
        letter: "حرف واحد على الأقل",
        number: "رقم واحد على الأقل",
        symbol: "رمز واحد على الأقل (!@#$%)",
      },
      validation: {
        nameRequired: "الاسم الكامل مطلوب",
        nameMinLength: "الاسم يجب أن يكون حرفين على الأقل",
        reservedStaffTag:
          "الوسم [GM] و [PM] مخصّص لفريق الإدارة فقط.",
        emailRequired: "البريد الإلكتروني مطلوب",
        emailInvalid: "أدخل بريدًا إلكترونيًا صالحًا",
        passwordRequired: "كلمة المرور مطلوبة",
        passwordWeak: "كلمة المرور لا تستوفي المتطلبات",
        confirmRequired: "أكّد كلمة المرور",
        passwordsMismatch: "كلمتا المرور غير متطابقتين",
      },
      otp: {
        title: "أدخل رمز التحقق",
        description: "أرسلنا رمزًا من 6 أرقام إلى",
        verifyButton: "تحقّق وأنشئ الحساب",
        resend: "لم يصلك؟ أعد إرسال الرمز",
        resendCooldown: "إعادة الإرسال خلال",
        useDifferentEmail: "استخدم بريدًا آخر",
        invalidCode: "أدخل الرمز المكوّن من 6 أرقام",
        tooManyAttempts: "محاولات كثيرة. اطلب رمزًا جديدًا.",
        resendSuccess: "تم إرسال رمز جديد إلى بريدك.",
        verifySuccess: "تم التحقق — جاري تحميل هويتك…",
      },
    },
    notFound: {
      title: "الهوية غير موجودة",
      description:
        "لا يوجد ملف بهذا المعرّف. سجّل في التطبيق أو هنا لبدء رحلتك.",
      backLabel: "العودة إلى البحث",
    },
    sections: {
      identity: "هويتك",
      tribe: "قبيلتك",
      pts: "PTS",
      level: "المستوى",
      memories: "أبرز الذكريات",
      season: "الموسم الحالي",
      myCards: "كروتي",
    },
    cardStats: {
      attack: "هجوم",
      defend: "دفاع",
      power: "قوة",
      identityBadge: "الهوية",
    },
    tribeLabels: {
      role: "الدور",
      members: "الأعضاء",
      pattern: "النمط الجمعي",
    },
    actions: {
      share: "مشاركة الملف",
      copied: "تم نسخ الرابط",
      openInApp: "فتح في Expo Go",
      viewInApp: "تابع في التطبيق",
    },
    journeyId: "معرّف المستخدم",
    ptsUnit: "PTS",
    levelPrefix: "المستوى",
    emptyMemories: "لا توجد ذكريات عامة بعد.",
    emptyMyCards: "لا توجد كروت مجمّعة بعد — ابنِ مجموعتك من التطبيق.",
  },
};
