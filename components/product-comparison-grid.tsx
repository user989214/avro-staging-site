"use client"

import { formulas, type FormulaKey } from "@/lib/data"
import { ProductCard } from "@/components/product-visual"
import Link from "next/link"

const GC = '"DM Sans", system-ui, sans-serif'

interface ProductComparisonGridProps {
  currentKey: FormulaKey
}

const comparisonData: Record<FormulaKey, {
  caffeine: string
  experience: string
  bestFor: string
}> = {
  calm: {
    caffeine: "0 mg",
    experience: "Gentle",
    bestFor: "Stress relief & focused calm",
  },
  focus: {
    caffeine: "0 mg",
    experience: "Steady",
    bestFor: "Desk work & daily routines",
  },
  energy: {
    caffeine: "120 mg",
    experience: "Stronger",
    bestFor: "Workouts or peak-demand moments",
  },
}

export function ProductComparisonGrid({ currentKey }: ProductComparisonGridProps) {
  const formulaKeys: FormulaKey[] = ["calm", "focus", "energy"]

  return (
    <section className="w-full py-[clamp(48px,6vw,80px)]" style={{ fontFamily: GC, backgroundColor: "var(--charcoal)" }}>
      <div className="w-full max-w-[1250px] mx-auto px-[clamp(18px,5vw,64px)]">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            style={{
              display: "inline-block",
              fontFamily: GC,
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--bone)",
              opacity: 0.6,
              marginBottom: 12,
            }}
          >
            Compare at a glance
          </span>
          <h2
            className="font-serif"
            style={{
              fontWeight: 900,
              fontSize: "clamp(32px,4.5vw,52px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: "var(--bone)",
              marginBottom: 14,
            }}
          >
            We put intention into every formula.
          </h2>
          <p
            style={{
              fontFamily: GC,
              fontWeight: 500,
              fontSize: "clamp(16px,1.4vw,20px)",
              color: "rgba(245,242,234,0.65)",
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            Find the one that was made with your day in mind.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {formulaKeys.map((key) => {
            const item = formulas[key]
            const data = comparisonData[key]
            const isActive = key === currentKey
            const subscribePrice = (item.bundlePrice * 0.75).toFixed(2)

            return (
              <div
                key={key}
                className="group flex flex-col overflow-hidden"
                style={{
                  backgroundColor: "var(--base-light)",
                  borderRadius: 24,
                  padding: "clamp(20px,3vw,32px)",
                }}
              >
                {/* Product image */}
                <Link
                  href={`/${key}`}
                  className="relative flex items-center justify-center overflow-hidden"
                  style={{
                    backgroundColor: "var(--bone)",
                    borderRadius: 20,
                    aspectRatio: "1 / 1",
                  }}
                >
                  <ProductCard formulaKey={key} className="h-full w-full object-cover" />
                  {isActive && (
                    <span
                      className="absolute top-4 right-4 px-3 py-1.5"
                      style={{
                        backgroundColor: "var(--charcoal)",
                        color: "var(--bone)",
                        fontFamily: GC,
                        fontWeight: 700,
                        fontSize: 11,
                        borderRadius: 999,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}
                    >
                      Viewing
                    </span>
                  )}
                </Link>

                {/* Product info */}
                <div className="flex-1 px-2 pt-5 pb-2">
                  <h3 
                    className="font-serif"
                    style={{ fontWeight: 900, fontSize: "clamp(24px,2.5vw,32px)", lineHeight: 1.05, color: "var(--ink)", marginBottom: 8 }}
                  >
                    {item.name}
                  </h3>
                  <p style={{ fontFamily: GC, fontWeight: 400, fontSize: 16, color: "rgba(0,0,0,0.6)", marginBottom: 20, lineHeight: 1.45 }}>
                    {item.headline}
                  </p>

                  {/* Specs */}
                  <div 
                    className="space-y-3 py-4 mb-4" 
                    style={{ 
                      borderTop: "1px solid rgba(0,0,0,0.08)", 
                      borderBottom: "1px solid rgba(0,0,0,0.08)" 
                    }}
                  >
                    <Row label="Caffeine" value={data.caffeine} />
                    <Row label="Experience" value={data.experience} />
                    <Row label="Best for" value={data.bestFor} />
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="px-2 pb-2 flex flex-col gap-2">
                  <style>{`
                    .compare-btn {
                      background-color: var(--charcoal);
                      border: 2px solid var(--charcoal);
                      color: var(--bone);
                      transition: background-color 0.2s ease, color 0.2s ease;
                    }
                    .compare-btn:hover {
                      background-color: transparent !important;
                      color: var(--charcoal) !important;
                    }
                  `}</style>
                  <button
                    className="compare-btn w-full flex items-center justify-center"
                    style={{
                      fontFamily: GC,
                      fontWeight: 700,
                      fontSize: 16,
                      minHeight: 48,
                      padding: "0 28px",
                      borderRadius: 999,
                    }}
                  >
                    Add to cart — ${item.bundlePrice.toFixed(2)}
                  </button>
                  <Link
                    href={`/${key}`}
                    className="w-full flex items-center justify-center transition-colors hover:opacity-70"
                    style={{
                      fontFamily: GC,
                      fontWeight: 600,
                      fontSize: 14,
                      minHeight: 36,
                      color: "rgba(0,0,0,0.5)",
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                    }}
                  >
                    Subscribe & save — ${subscribePrice}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline gap-3">
      <span style={{ fontFamily: GC, fontWeight: 500, fontSize: 15, color: "rgba(0,0,0,0.5)" }}>{label}</span>
      <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 15, color: "var(--ink)", textAlign: "right", maxWidth: 180 }}>
        {value}
      </span>
    </div>
  )
}
