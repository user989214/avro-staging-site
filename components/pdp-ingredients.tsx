"use client"

import type { FormulaKey } from "@/lib/data"

const GC = '"DM Sans", system-ui, sans-serif'

type Ingredient = {
  name: string
  amount: string
  description: string
  image: string
}

const sharedIngredients: Ingredient[] = [
  {
    name: "PharmaGABA",
    amount: "100mg",
    description: "Naturally fermented GABA that supports calm and composure without sedation.",
    image: "/images/ingredients/pharmagaba.jpg",
  },
  {
    name: "L-Theanine",
    amount: "200mg",
    description: "Amino acid found in green tea that promotes relaxation and focus.",
    image: "/images/ingredients/ltheanine.jpg",
  },
]

const formulaIngredients: Record<FormulaKey, Ingredient[]> = {
  calm: [
    ...sharedIngredients,
    {
      name: "Magnesium Bisglycinate",
      amount: "150mg",
      description: "Highly bioavailable form of magnesium that supports relaxation and muscle function.",
      image: "/images/ingredients/magnesium.jpg",
    },
  ],
  focus: [
    ...sharedIngredients,
    {
      name: "Cognigrape",
      amount: "300mg",
      description: "Grape extract clinically shown to support cognitive function and mental clarity.",
      image: "/images/ingredients/cognigrape.jpg",
    },
  ],
  energy: [
    ...sharedIngredients,
    {
      name: "Natural Caffeine",
      amount: "120mg",
      description: "Plant-derived caffeine for clean, sustained energy without the jitters.",
      image: "/images/ingredients/caffeine.jpg",
    },
  ],
}

export function PdpIngredients({ formulaKey }: { formulaKey: FormulaKey }) {
  const ingredients = formulaIngredients[formulaKey]

  return (
    <section className="w-full bg-white py-[clamp(40px,5vw,64px)]" style={{ fontFamily: GC }}>
      <div className="w-full max-w-[1200px] mx-auto px-[clamp(18px,5vw,64px)]">
        {/* Header */}
        <div className="text-center mb-10">
          <h2
            style={{
              fontFamily: GC,
              fontWeight: 700,
              fontSize: "clamp(28px,4vw,52px)",
              lineHeight: 1.0,
              color: "var(--ink)",
              marginBottom: 12,
            }}
          >
            What&apos;s inside.
          </h2>
          <p
            style={{
              fontFamily: GC,
              fontWeight: 500,
              fontSize: "clamp(17px,1.5vw,22px)",
              color: "rgba(0,0,0,0.6)",
            }}
          >
            Clean, functional ingredients. Nothing artificial.
          </p>
        </div>

        {/* Ingredients grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.name}
              className="flex flex-col overflow-hidden"
              style={{ borderRadius: 24, border: "1.5px solid rgba(0,0,0,0.1)" }}
            >
              {/* Image */}
              <div className="relative h-[180px] overflow-hidden" style={{ backgroundColor: "#f2f2f2" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className="w-full h-full object-cover"
                />
                {/* Amount badge */}
                <span
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: "var(--charcoal)",
                    color: "var(--bone)",
                    fontFamily: GC,
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  {ingredient.amount}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 p-5">
                <h3
                  style={{
                    fontFamily: GC,
                    fontWeight: 700,
                    fontSize: 22,
                    lineHeight: 1.1,
                    color: "var(--ink)",
                    marginBottom: 8,
                  }}
                >
                  {ingredient.name}
                </h3>
                <p
                  style={{
                    fontFamily: GC,
                    fontWeight: 500,
                    fontSize: 16,
                    lineHeight: 1.45,
                    color: "rgba(0,0,0,0.6)",
                  }}
                >
                  {ingredient.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-8">
          <a
            href="/science"
            className="inline-flex items-center gap-2 hover:underline"
            style={{ fontFamily: GC, fontWeight: 700, fontSize: 17, color: "var(--ink)" }}
          >
            See full ingredient list
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
