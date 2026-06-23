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
    name: "PharmaGABA®",
    amount: "200 mg",
    description: "Naturally fermented. AVRO's calm-first foundation.",
    image: "/images/ingredients/pharmagaba-2.jpg",
  },
]

const sharedBack: Ingredient[] = [
  {
    name: "Prebiotic Fiber",
    amount: "SOLUBLE GUAR FIBER + ACACIA FIBER",
    description: "Supports gut comfort.* Part of AVRO's daily formula.",
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
      description: "Yields 100 mg of active magnesium (24% DV).* Supports muscle and nervous system function.",
      image: "/images/ingredients/magnesium-bisglycinate-2.jpg",
    },
    ...sharedBack,
  ],
  focus: [
    ...sharedFront,
    {
      name: "Cognigrape®",
      amount: "250 mg",
      description: "Clinically shown to support cognitive function and clarity.*",
      image: "/images/ingredients/cognigrape-2.jpg",
    },
    ...sharedBack,
  ],
  energy: [
    ...sharedFront,
    {
      name: "Natural Caffeine",
      amount: "120 mg",
      description: "Clinically shown to support cognitive function and clarity.*",
      image: "/images/ingredients/natural-caffeine-2.jpg",
    },
    ...sharedBack,
  ],
}

export function PdpIngredients({ formulaKey }: { formulaKey: FormulaKey }) {
  const ingredients = formulaIngredients[formulaKey]

  return (
    <section className="w-full bg-base py-[clamp(32px,6vw,80px)]" style={{ fontFamily: GC }}>
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(16px,5vw,64px)]">
        {/* Header - left aligned, like reference */}
        <div className="mb-6 lg:mb-10">
          <span
            className="block uppercase tracking-[0.18em]"
            style={{
              fontFamily: GC,
              fontWeight: 700,
              fontSize: "clamp(10px,0.9vw,12px)",
              color: "var(--warm-gray)",
              marginBottom: 8,
            }}
          >
            What&apos;s inside
          </span>
          <h2
            className="font-serif"
            style={{
              fontWeight: 900,
              fontSize: "clamp(24px,4.5vw,56px)",
              lineHeight: 1.0,
              color: "var(--ink)",
              textWrap: "balance",
            }}
          >
            Clear ingredient logic. Nothing hidden.
          </h2>
        </div>

        {/* Ingredients row — small framed image, name, amount label, short description */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-5">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.name}
              className="flex flex-col"
              style={{
                borderRadius: 14,
                backgroundColor: "var(--base-light)",
                padding: "clamp(10px,1.5vw,14px)",
              }}
            >
              {/* Image frame — square, matches homepage product cards (no stroke) */}
              <div
                className="relative aspect-square overflow-hidden mb-3"
                style={{ borderRadius: 10, backgroundColor: "var(--bone)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="px-0.5">
                <h3
                  style={{
                    fontFamily: GC,
                    fontWeight: 800,
                    fontSize: "clamp(12px,1.2vw,16px)",
                    lineHeight: 1.15,
                    color: "var(--ink)",
                    marginBottom: 2,
                  }}
                >
                  {ingredient.name}
                </h3>
                <span
                  className="block uppercase tracking-[0.08em]"
                  style={{
                    fontFamily: GC,
                    fontWeight: 700,
                    fontSize: "clamp(9px,0.8vw,11px)",
                    color: "var(--warm-gray)",
                    marginBottom: 6,
                  }}
                >
                  {ingredient.amount}
                </span>
                <p
                  style={{
                    fontFamily: GC,
                    fontWeight: 500,
                    fontSize: "clamp(11px,1vw,13.5px)",
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
