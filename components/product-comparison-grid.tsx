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

const formulaColors: Record<FormulaKey, string> = {
  calm: "var(--calm)",
  focus: "var(--focus)",
  energy: "var(--energy)",
}

export function ProductComparisonGrid({ currentKey }: ProductComparisonGridProps) {
  const formulaKeys: FormulaKey[] = ["calm", "focus", "energy"]

  return (
    <section className="w-full py-[clamp(48px,6vw,80px)]" style={{ fontFamily: GC, backgroundColor: "var(--avro-blue)" }}>
      <div className="w-full max-w-[1280px] mx-auto px-[clamp(18px,5vw,64px)]">
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
              color: "var(--charcoal)",
              opacity: 0.7,
              marginBottom: 12,
            }}
          >
            Compare at a glance
          </span>
          <h2
            style={{
              fontFamily: GC,
              fontWeight: 700,
              fontSize: "clamp(32px,4.5vw,56px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: "var(--charcoal)",
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
              color: "rgba(21,21,21,0.65)",
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            Find the one that was made with your day in mind.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {formulaKeys.map((key) => {
            const item = formulas[key]
            const data = comparisonData[key]
            const isActive = key === currentKey
            const subscribePrice = (item.bundlePrice * 0.75).toFixed(2)
            const accentColor = formulaColors[key]

            return (
              <div
                key={key}
                className="group flex flex-col overflow-hidden"
                style={{
                  backgroundColor: "var(--base)",
                  borderRadius: 24,
                  border: isActive ? `3px solid ${accentColor}` : "none",
                  boxShadow: isActive 
                    ? `0 8px 32px -8px rgba(0,0,0,0.15)` 
                    : "0 4px 20px -6px rgba(0,0,0,0.08)",
                  transform: isActive ? "scale(1.02)" : "scale(1)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                {/* Product image with colored top bar */}
                <div style={{ backgroundColor: accentColor, padding: "3px 3px 0 3px" }}>
                  <Link 
                    href={`/${key}`} 
                    className="relative flex items-center justify-center p-6" 
                    style={{ 
                      backgroundColor: "var(--base-light)", 
                      borderRadius: "20px 20px 0 0",
                      minHeight: 200,
                    }}
                  >
                    <ProductCard formulaKey={key} className="h-[160px] w-auto object-contain" />
                    {isActive && (
                      <span
                        className="absolute top-4 right-4 px-3 py-1.5"
                        style={{
                          backgroundColor: accentColor,
                          color: key === "energy" ? "var(--charcoal)" : "var(--bone)",
                          fontFamily: GC,
                          fontWeight: 700,
                          fontSize: 12,
                          borderRadius: 999,
                          letterSpacing: "0.02em",
                        }}
                      >
                        Viewing
                      </span>
                    )}
                  </Link>
                </div>

                {/* Product info */}
                <div className="flex-1 p-5 pt-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span 
                      style={{ 
                        width: 10, 
                        height: 10, 
                        borderRadius: "50%", 
                        backgroundColor: accentColor,
                        flexShrink: 0,
                      }} 
                    />
                    <h3 style={{ fontFamily: GC, fontWeight: 700, fontSize: 24, lineHeight: 1.1, color: "var(--charcoal)" }}>
                      {item.name}
                    </h3>
                  </div>
                  <p style={{ fontFamily: GC, fontWeight: 500, fontSize: 15, color: "rgba(21,21,21,0.55)", marginBottom: 18, lineHeight: 1.4 }}>
                    {item.headline}
                  </p>

                  {/* Specs */}
                  <div 
                    className="space-y-3 py-4 mb-4" 
                    style={{ 
                      borderTop: "1px solid rgba(21,21,21,0.08)", 
                      borderBottom: "1px solid rgba(21,21,21,0.08)" 
                    }}
                  >
                    <Row label="Caffeine" value={data.caffeine} />
                    <Row label="Experience" value={data.experience} />
                    <Row label="Best for" value={data.bestFor} />
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="p-5 pt-0 flex flex-col gap-2">
                  <style>{`
                    .compare-btn-${key} {
                      background-color: ${accentColor};
                      border: 2px solid ${accentColor};
                      color: ${key === "energy" ? "var(--charcoal)" : "var(--bone)"};
                    }
                    .compare-btn-${key}:hover {
                      background-color: transparent;
                      color: ${accentColor};
                    }
                  `}</style>
                  <button
                    className={`compare-btn-${key} w-full flex items-center justify-center transition-all duration-200`}
                    style={{
                      fontFamily: GC,
                      fontWeight: 700,
                      fontSize: 15,
                      minHeight: 50,
                      padding: "0 20px",
                      borderRadius: 999,
                    }}
                  >
                    Add to cart — ${item.bundlePrice.toFixed(2)}
                  </button>
                  <Link
                    href={`/${key}`}
                    className="w-full flex items-center justify-center transition-colors hover:opacity-80"
                    style={{
                      fontFamily: GC,
                      fontWeight: 600,
                      fontSize: 14,
                      minHeight: 36,
                      color: "rgba(21,21,21,0.5)",
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
      <span style={{ fontFamily: GC, fontWeight: 500, fontSize: 15, color: "rgba(21,21,21,0.5)" }}>{label}</span>
      <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 15, color: "var(--charcoal)", textAlign: "right", maxWidth: 180 }}>
        {value}
      </span>
    </div>
  )
}
