"use client"

import type { FormulaKey } from "@/lib/data"

const GC = '"DM Sans", system-ui, sans-serif'

type Ingredient = {
  name: string
  amount: string
  description: string
  image: string
}

const sharedFront: Ingredient[] = [
  {
    name: "PharmaGABA",
    amount: "200 mg",
    description: "Naturally fermented. AVRO's calm-first foundation.",
    image: "/images/ingredients/pharmagaba-2.jpg",
  },
]

const sharedBack: Ingredient[] = [
  {
    name: "Prebiotic Fiber",
    amount: "PHGG + ACACIA",
    description: "Supports gut comfort. Part of AVRO's daily formula.",
    image: "/images/ingredients/prebiotic-fiber-2.jpg",
  },
  {
    name: "Stevia",
    amount: "< 2%",
    description: "Used in a small amount for a clean, balanced finish.",
    image: "/images/ingredients/stevia-2.jpg",
  },
]

const formulaIngredients: Record<FormulaKey, Ingredient[]> = {
  calm: [
    ...sharedFront,
    {
      name: "Magnesium Bisglycinate",
      amount: "850 mg",
      description: "Yields 100 mg of active magnesium. Supports muscle and nervous system function.",
      image: "/images/ingredients/magnesium-bisglycinate-2.jpg",
    },
    ...sharedBack,
    {
      name: "Natural Flavor",
      amount: "BLUEBERRY ACAI",
      description: "Bright, clean flavor without artificial sweeteners.",
      image: "/images/ingredients/blueberry-acai-2.jpg",
    },
  ],
  focus: [
    ...sharedFront,
    {
      name: "Cognigrape",
      amount: "250 mg",
      description: "Grape extract clinically shown to support cognitive function and clarity.",
      image: "/images/ingredients/cognigrape-2.jpg",
    },
    ...sharedBack,
    {
      name: "Natural Flavor",
      amount: "POMEGRANATE",
      description: "Bright, clean flavor without artificial sweeteners.",
      image: "/images/ingredients/pomegranate-raspberry-2.jpg",
    },
  ],
  energy: [
    ...sharedFront,
    {
      name: "Natural Caffeine",
      amount: "120 mg",
      description: "Plant-derived caffeine for clean, sustained energy without the jitters.",
      image: "/images/ingredients/natural-caffeine-2.jpg",
    },
    ...sharedBack,
    {
      name: "Natural Flavor",
      amount: "ORANGE TANGERINE",
      description: "Bright, clean flavor without artificial sweeteners.",
      image: "/images/ingredients/orange-tangerine.jpg",
    },
  ],
}

export function PdpIngredients({ formulaKey }: { formulaKey: FormulaKey }) {
  const ingredients = formulaIngredients[formulaKey]

  return (
    <section className="w-full bg-base py-[clamp(48px,6vw,80px)]" style={{ fontFamily: GC }}>
      <div className="w-full max-w-[1280px] mx-auto px-[clamp(18px,5vw,64px)]">
        {/* Header - left aligned, like reference */}
        <div className="mb-10">
          <span
            className="block uppercase tracking-[0.18em]"
            style={{
              fontFamily: GC,
              fontWeight: 700,
              fontSize: 12,
              color: "var(--warm-gray)",
              marginBottom: 12,
            }}
          >
            What&apos;s inside
          </span>
          <h2
            className="font-serif"
            style={{
              fontWeight: 900,
              fontSize: "clamp(28px,3.6vw,44px)",
              lineHeight: 1.0,
              color: "var(--ink)",
              maxWidth: 720,
            }}
          >
            Clear ingredient logic. Nothing hidden.
          </h2>
        </div>

        {/* Ingredients row — small framed image, name, amount label, short description */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.name}
              className="flex flex-col"
              style={{
                borderRadius: 18,
                backgroundColor: "var(--base-light)",
                padding: 14,
              }}
            >
              {/* Image frame — square, matches homepage product cards (no stroke) */}
              <div
                className="relative aspect-square overflow-hidden mb-4"
                style={{ borderRadius: 12, backgroundColor: "var(--bone)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="px-1">
                <h3
                  style={{
                    fontFamily: GC,
                    fontWeight: 800,
                    fontSize: 16,
                    lineHeight: 1.15,
                    color: "var(--ink)",
                    marginBottom: 4,
                  }}
                >
                  {ingredient.name}
                </h3>
                <span
                  className="block uppercase tracking-[0.08em]"
                  style={{
                    fontFamily: GC,
                    fontWeight: 700,
                    fontSize: 11,
                    color: "var(--warm-gray)",
                    marginBottom: 8,
                  }}
                >
                  {ingredient.amount}
                </span>
                <p
                  style={{
                    fontFamily: GC,
                    fontWeight: 500,
                    fontSize: 13.5,
                    lineHeight: 1.4,
                    color: "var(--warm-gray)",
                  }}
                >
                  {ingredient.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
