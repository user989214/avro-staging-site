"use client"

import { formulas, type FormulaKey } from "@/lib/data"
import { ProductCard } from "@/components/product-visual"
import Link from "next/link"

const GC = '"Gotham Condensed", sans-serif'

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
    <section className="w-full bg-white py-[clamp(48px,7vw,96px)]" style={{ fontFamily: GC }}>
      <div className="w-full max-w-[1200px] mx-auto px-[clamp(18px,5vw,64px)]">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            style={{
              fontFamily: GC,
              fontWeight: 950,
              fontSize: "clamp(32px,5vw,60px)",
              lineHeight: 1.0,
              color: "#000",
              marginBottom: 12,
            }}
          >
            We put intention into every formula.
          </h2>
          <p
            style={{
              fontFamily: GC,
              fontWeight: 500,
              fontSize: "clamp(18px,1.5vw,22px)",
              color: "rgba(0,0,0,0.6)",
            }}
          >
            Find the one that was made with your day in mind.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {formulaKeys.map((key) => {
            const item = formulas[key]
            const data = comparisonData[key]
            const isActive = key === currentKey

            return (
              <Link
                key={key}
                href={`/${key}`}
                className="group flex flex-col rounded-xl overflow-hidden bg-white transition-all hover:-translate-y-1"
                style={{
                  border: isActive ? "2px solid #000" : "1.5px solid rgba(0,0,0,0.12)",
                }}
              >
                {/* Product image */}
                <div className="relative h-[220px] flex items-center justify-center p-4" style={{ backgroundColor: "#f2f2f2" }}>
                  <ProductCard formulaKey={key} className="h-full w-auto object-contain" />
                  {isActive && (
                    <span
                      className="absolute top-3 right-3 px-3 py-1 rounded"
                      style={{
                        backgroundColor: "#000",
                        color: "#fff",
                        fontFamily: GC,
                        fontWeight: 800,
                        fontSize: 13,
                      }}
                    >
                      Current
                    </span>
                  )}
                </div>

                {/* Product info */}
                <div className="flex-1 p-6">
                  <h3 style={{ fontFamily: GC, fontWeight: 950, fontSize: 26, lineHeight: 1.05, color: "#000", marginBottom: 6 }}>
                    {item.name}
                  </h3>
                  <p style={{ fontFamily: GC, fontWeight: 500, fontSize: 16, color: "rgba(0,0,0,0.6)", marginBottom: 18 }}>
                    {item.headline}
                  </p>

                  {/* Specs */}
                  <div className="space-y-3" style={{ fontFamily: GC, fontSize: 16 }}>
                    <Row label="Caffeine" value={data.caffeine} />
                    <Row label="Experience" value={data.experience} />
                    <Row label="Best for" value={data.bestFor} />
                  </div>
                </div>

                {/* Price */}
                <div
                  className="px-6 py-4 flex items-baseline justify-between"
                  style={{ borderTop: "1.5px solid rgba(0,0,0,0.1)" }}
                >
                  <span style={{ fontFamily: GC, fontWeight: 500, fontSize: 16, color: "rgba(0,0,0,0.6)" }}>
                    From
                  </span>
                  <span style={{ fontFamily: GC, fontWeight: 950, fontSize: 22, color: "#000" }}>
                    ${item.bundlePrice.toFixed(2)}
                  </span>
                </div>
              </Link>
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
      <span style={{ fontFamily: GC, fontWeight: 500, color: "rgba(0,0,0,0.55)" }}>{label}</span>
      <span style={{ fontFamily: GC, fontWeight: 800, color: "#000", textAlign: "right", maxWidth: 160 }}>
        {value}
      </span>
    </div>
  )
}
