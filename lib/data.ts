export const formulas = {
  calm: {
    id: "calm",
    name: "AVRO Calm",
    short: "Calm",
    flavor: "Blueberry Acai",
    flavors: [
      { id: "blueberry-acai", name: "Blueberry Acai", tagline: "Bright berry. Clean finish." },
      { id: "blackberry-jasmine", name: "Blackberry Jasmine", tagline: "Soft floral. Deep berry." },
    ],
    color: "#4b4d9a",
    accent: "#7a79c8",
    price: 24.95,
    priceLabel: "$24.95",
    bundlePrice: 24.95,
    caffeine: "No caffeine",
    headline: "Calm first. Clear headed. Ready when pressure rises.",
    heroSupport: "Clear headed. Ready when pressure rises.*",
    support: "Calm support without stimulation.*",
    bestFor:
      "Travel days, social calm, pre-match nerves and for a daily reset.",
    addition: "Magnesium Bisglycinate",
    review:
      "Helps me stay composed without feeling dull. It is part of my pre-meeting routine.",
  },
  focus: {
    id: "focus",
    name: "AVRO Focus",
    short: "Focus",
    flavor: "Pomegranate Raspberry",
    flavors: [
      { id: "pomegranate-raspberry", name: "Pomegranate Raspberry", tagline: "Tart. Bright. Clean." },
      { id: "red-dragon-fruit", name: "Red Dragon Fruit", tagline: "Smooth tropical. Vibrant." },
    ],
    // Per request: only the blue cohort accent (Calm) is permitted in the
    // theme. Focus is neutralized to ink/charcoal so it inherits the system
    // grayscale instead of tinting cards, charts, badges, and CTAs pink.
    color: "#1E1D18",
    accent: "#3A3A38",
    price: 24.95,
    priceLabel: "$24.95",
    bundlePrice: 24.95,
    caffeine: "No caffeine",
    headline: "Calm first. Clear headed. Ready to focus.",
    heroSupport: "Clear headed. Ready to focus.*",
    support: "Clarity and focus support without caffeine.*",
    bestFor:
      "Deep work, competitive rounds, studying, creative work and longer attention blocks.",
    addition: "Cognigrape®",
    review:
      "Great for work blocks and long sessions. Clear without feeling frantic.",
  },
  energy: {
    id: "energy",
    name: "AVRO Energy",
    short: "Energy",
    flavor: "Orange Tangerine",
    flavors: [
      { id: "orange-tangerine", name: "Orange Tangerine", tagline: "Bright citrus. Sunny lift." },
      { id: "fuji-apple", name: "Fuji Apple", tagline: "Crisp orchard. Clean finish." },
    ],
    // Per request: only the blue cohort accent (Calm) is permitted. Energy is
    // neutralized to ink/charcoal so it stops painting the site yellow.
    color: "#1E1D18",
    accent: "#3A3A38",
    price: 24.95,
    priceLabel: "$24.95",
    bundlePrice: 24.95,
    caffeine: "120 mg natural caffeine",
    headline: "Calm first. Steady energy. Ready when it matters.",
    heroSupport: "Steady energy. Ready when it matters.*",
    support: "Natural caffeine with a calm-first foundation.*",
    bestFor:
      "Mornings, early start times, long workdays and steady energy with built in calm.",
    addition: "Natural Caffeine",
    review:
      "Clean lift for demanding mornings without feeling overcaffeinated.",
  },
} as const

export type FormulaKey = keyof typeof formulas
export type Formula = (typeof formulas)[FormulaKey]
export type Flavor = Formula["flavors"][number]

/**
 * Approved Supplement Facts panels, keyed by flavor id.
 * These are the real label graphics — render them directly. Do NOT
 * hand-build or regenerate Supplement Facts tables anywhere in the app.
 */
export const supplementFactsByFlavor: Record<string, string> = {
  "blueberry-acai": "/images/supplement-facts/blueberry-acai.png",
  "blackberry-jasmine": "/images/supplement-facts/blackberry-jasmine.png",
  "pomegranate-raspberry": "/images/supplement-facts/pomegranate-raspberry.png",
  "red-dragon-fruit": "/images/supplement-facts/red-dragon-fruit.png",
  "fuji-apple": "/images/supplement-facts/fuji-apple.png",
  "orange-tangerine": "/images/supplement-facts/orange-tangerine.png",
}

/** Convenience: the default (first-flavor) panel image for each formula. */
export function defaultPanelForFormula(key: FormulaKey): string {
  const firstFlavorId = formulas[key].flavors[0].id
  return supplementFactsByFlavor[firstFlavorId]
}

export const sharedProof = [
  { stat: "4.8/5", label: "Average customer rating" },
  { stat: "25,000+", label: "Customer reviews" },
  { stat: "100,000+", label: "Sticks sold" },
]

export const testimonials = [
  {
    quote:
      "Highly recommend for anyone looking for a natural, functional way to support relaxation and balance!",
    name: "Verified Buyer",
    role: "AVRO Calm",
  },
  {
    quote:
      "Absolutely obsessed — the midday pick-me-up from Focus keeps me locked in throughout a work day.",
    name: "Verified Buyer",
    role: "AVRO Focus",
  },
  {
    quote:
      "The boost is clean, focused, and steady. No jitters. No weird crash. Just that dialed-in feeling.",
    name: "Verified Buyer",
    role: "AVRO Energy",
  },
]

export const cohortData = {
  golf: {
    eyebrow: "Built for the game",
    title: "Built for the State Before the Round.",
    copy: "AVRO supports calm, clarity, and composure before golf moments where state matters, from the first tee to the final stretch.*",
    visual: "golf",
    primary: "Choose Your Formula",
    secondary: "Shop AVRO",
    momentTitle: "Golf is a game of state.",
    momentCopy:
      "The first tee, a tight approach shot, a tournament round, or a long day on the course can create internal noise. More stimulation is not always the answer. A calmer starting state can help create the conditions for clarity and composure.",
    whyTitle: "Why AVRO fits golf",
    reasons: [
      [
        "Calm Before Pressure",
        "Supports a calmer state before pressure-sensitive golf moments.",
      ],
      [
        "Clarity Without the Edge",
        "Supports clear focus without turning your pre-round routine into stimulant overload.",
      ],
      [
        "Built for Ritual",
        "A simple pre-round ritual designed for golfers who know state matters.",
      ],
    ],
    chooseTitle: "Choose a formula for your round",
    howTitle: "How to use before golf",
    stepMoment: "round, practice session, or golf moment",
    useTitle: "Golf use moments",
    useMoments: [
      ["First Tee", "For a pre-round routine before the opening shot."],
      [
        "Tournament Day",
        "For pressure-sensitive rounds where composure matters.",
      ],
      [
        "Practice Sessions",
        "For focused range work, lessons, or structured practice.",
      ],
      [
        "Clubhouse + Social",
        "For alcohol-free social moments, travel days, and post-round wind down.",
      ],
    ],
    shopTitle: "Shop AVRO for golf",
    faqTitle: "Golf FAQ",
    faqs: [
      [
        "Which AVRO formula is best for golf?",
        "The best fit depends on your tee time, caffeine preference, and type of round. Calm is caffeine free, Focus is caffeine free with clarity support, and Energy adds 120 mg natural caffeine with a calm-first foundation.",
      ],
      [
        "When should I take AVRO before a round?",
        "Most people use one stick about 30 minutes before the round, practice session, or golf moment.",
      ],
      [
        "Is AVRO a sports performance supplement?",
        "AVRO is positioned as a calm-first drink mix for state, routine, clarity, and composure before pressure-sensitive moments. It does not claim to improve scores, accuracy, putting, or swing mechanics.",
      ],
    ],
    finalTitle: "Choose the formula that fits your round.",
    finalCopy:
      "Start calm. Stay clear. Choose the AVRO formula that matches your moment on the course.",
  },
  social: {
    eyebrow: "Alcohol free social ritual",
    title: "Present. Clear. Alcohol Free.",
    copy: "AVRO is a calm, clear, alcohol-free social ritual for gatherings, events and evening routines.*",
    visual: "social",
    primary: "Shop AVRO",
    secondary: "Find Your Formula",
    momentTitle: "The social moment has a lot of noise.",
    momentCopy:
      "Social settings can bring pressure, alcohol defaults, stimulation, and the need to feel present without being pulled out of the moment. AVRO gives the ritual a calmer starting point.",
    whyTitle: "Why AVRO Supports Social Settings",
    reasons: [
      [
        "Alcohol Free Ritual",
        "A functional ritual for nights when alcohol is not the move.",
      ],
      [
        "Calm and Clear Presence",
        "Supports calm, clarity, and composed presence before social moments.",
      ],
      [
        "Adult Alternative",
        "A more intentional option than stimulant-heavy or sugar-heavy drinks.",
      ],
    ],
    chooseTitle: "Choose a formula for your occasion",
    howTitle: "How to use before social settings",
    stepMoment: "social moment",
    useTitle: "Social use moments",
    useMoments: [
      ["Dinner / Hosting", "A calm-first ritual for meals, hosting, and gatherings."],
      [
        "Alcohol Free Nights",
        "For evenings where you want something intentional without alcohol.",
      ],
      [
        "Events / Networking",
        "For long social settings where calm, clarity, and presence matter.",
      ],
      [
        "Evening Wind Down",
        "For a gentler close to the day on your own terms.",
      ],
    ],
    shopTitle: "Shop AVRO for social",
    faqTitle: "Social / Zero Proof FAQ",
    faqs: [
      ["Is AVRO alcoholic?", "No. AVRO is an alcohol-free daily drink mix."],
      [
        "Which formula is best for evening social settings?",
        "Calm is usually the best fit for evening social settings because it is caffeine free and designed for calm support.",
      ],
      [
        "Can I use AVRO as a mocktail base?",
        "Yes. AVRO can be mixed with still or sparkling water and used as a functional mocktail base.",
      ],
    ],
    finalTitle: "Choose your state for the moment.",
    finalCopy: "Find the AVRO formula that fits how you want to show up.",
  },
  work: {
    eyebrow: "Built for modern work",
    title: "Built for the State Before the Work.",
    copy: "AVRO supports calm, clarity, and composure before deep work, meetings, presentations, demos, coding sessions, and long workdays.*",
    visual: "work",
    primary: "Choose Your Formula",
    secondary: "Shop AVRO",
    momentTitle: "Modern work creates noise.",
    momentCopy:
      "Work is full of inputs: meetings, notifications, deadlines, decisions, presentations, and long focus blocks. More stimulation is not always the answer. Sometimes the better starting point is a calmer, clearer state.",
    whyTitle: "Why AVRO Fits Work",
    reasons: [
      [
        "Calm Before Output",
        "Supports a calmer state before demanding work moments.",
      ],
      [
        "Clarity Without the Edge",
        "Supports clear focus without turning the workday into stimulant overload.",
      ],
      [
        "Built for Mental Demands",
        "A simple pre-work ritual for meetings, deep work, coding sessions, presentations, and long days.",
      ],
    ],
    chooseTitle: "Choose a formula for your workday",
    howTitle: "How to use before work",
    stepMoment: "work moment",
    useTitle: "Work use moments",
    useMoments: [
      [
        "Deep Work",
        "For focus blocks, writing, planning, strategy, and long attention sessions.",
      ],
      [
        "Meetings + Presentations",
        "For moments when composure and clarity matter.",
      ],
      [
        "Coding + Building Sessions",
        "For long technical sessions where overstimulation can become a problem.",
      ],
      [
        "Travel + Long Workdays",
        "For demanding days when you want steady support without defaulting to more stimulation.",
      ],
    ],
    shopTitle: "Shop AVRO for work",
    faqTitle: "Tech + Work FAQ",
    faqs: [
      [
        "Which AVRO formula is best for work?",
        "The best fit depends on the work moment. Calm supports calm without caffeine, Focus supports clarity and focus without caffeine, and Energy supports steady energy with 120 mg natural caffeine.",
      ],
      [
        "Is AVRO just another energy product?",
        "No. AVRO starts with a calm-first foundation and Energy is only one part of the lineup.",
      ],
      [
        "Can I take AVRO with coffee?",
        "You can, but consider total caffeine intake, especially with AVRO Energy. If you are caffeine sensitive, speak with a healthcare professional.",
      ],
    ],
    finalTitle: "Choose the formula that fits your workday.",
    finalCopy:
      "Start calm. Stay clear. Choose the AVRO formula that matches your moment.",
  },
  gaming: {
    eyebrow: "Built for esports",
    title: "Built for the State Before the Session.",
    copy: "AVRO supports calm, clarity, and composure before gaming, ranked play, and competitive esports sessions.*",
    visual: "gaming",
    primary: "Choose Your Formula",
    secondary: "Shop AVRO",
    momentTitle: "Sessions are shaped by state.",
    momentCopy:
      "Long sessions create noise. Ranked play and tournaments require patience, clarity, composure, and controlled attention without becoming overstimulated. More caffeine is not always the answer.",
    whyTitle: "Why AVRO Fits Esports",
    reasons: [
      [
        "Calm Before Pressure",
        "Supports a calmer state before high-pressure moments.",
      ],
      [
        "Clarity Without the Edge",
        "Supports clear focus without turning the session into stimulant overload.",
      ],
      [
        "Built for Long Sessions",
        "A simple pre-session ritual for extended attention and pressure-sensitive play.",
      ],
    ],
    chooseTitle: "Choose a formula for your session",
    howTitle: "How to use before play",
    stepMoment: "session",
    useTitle: "Session use moments",
    useMoments: [
      ["Ranked Play", "For a pre-session routine before competitive play."],
      ["Tournament Play", "For longer, pressure-sensitive sessions."],
      [
        "Long Sessions",
        "For extended attention blocks when overstimulation can become a problem.",
      ],
      [
        "Online Poker Sessions",
        "For decision-heavy environments where composure matters.",
      ],
    ],
    shopTitle: "Shop AVRO for Esports",
    faqTitle: "Esports FAQ",
    faqs: [
      [
        "Which AVRO formula is best for gaming?",
        "Focus is a strong fit for caffeine-free clarity support, Calm is useful for late sessions, and Energy fits earlier or longer sessions when you want natural caffeine.",
      ],
      [
        "Which AVRO formula is best for online poker?",
        "Focus or Calm are the most natural fits for caffeine-free composure and clarity support. AVRO does not claim to improve betting decisions, win rates, or gambling outcomes.",
      ],
      [
        "Will AVRO make me jittery?",
        "Calm and Focus are caffeine free. Energy contains 120 mg natural caffeine, so people who are caffeine sensitive should consider timing and total intake.",
      ],
    ],
    finalTitle: "Choose the formula that fits your session.",
    finalCopy:
      "Start calm. Stay clear. Choose the AVRO formula that matches your moment.",
  },
} as const

export type CohortKey = keyof typeof cohortData
