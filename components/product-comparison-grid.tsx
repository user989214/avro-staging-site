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
    <section className="w-full bg-white py-[clamp(40px,5vw,64px)]" style={{ fontFamily: GC }}>
      <div className="w-full max-w-[1200px] mx-auto px-[clamp(18px,5vw,64px)]">
        {/* Header */}
        <div className="text-center mb-10">
          <h2
            style={{
              fontFamily: GC,
              fontWeight: 950,
              fontSize: "clamp(28px,4vw,52px)",
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
              fontSize: "clamp(17px,1.5vw,22px)",
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
            const subscribePrice = (item.bundlePrice * 0.75).toFixed(2)

            return (
              <div
                key={key}
                className="group flex flex-col rounded-xl overflow-hidden bg-white"
                style={{
                  border: isActive ? "3px solid #000" : "2px solid rgba(0,0,0,0.12)",
                }}
              >
                {/* Product image */}
                <Link href={`/${key}`} className="relative h-[200px] flex items-center justify-center p-3" style={{ backgroundColor: "#f2f2f2" }}>
                  <ProductCard formulaKey={key} className="h-full w-auto object-contain" />
                  {isActive && (
                    <span
                      className="absolute top-3 right-3 px-3 py-1.5 rounded"
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
                </Link>

                {/* Product info */}
                <div className="flex-1 p-4">
                  <h3 style={{ fontFamily: GC, fontWeight: 950, fontSize: 26, lineHeight: 1.05, color: "#000", marginBottom: 6 }}>
                    {item.name}
                  </h3>
                  <p style={{ fontFamily: GC, fontWeight: 500, fontSize: 16, color: "rgba(0,0,0,0.6)", marginBottom: 14 }}>
                    {item.headline}
                  </p>

                  {/* Specs */}
                  <div className="space-y-2" style={{ fontFamily: GC, fontSize: 16 }}>
                    <Row label="Caffeine" value={data.caffeine} />
                    <Row label="Experience" value={data.experience} />
                    <Row label="Best for" value={data.bestFor} />
                  </div>
                </div>

                {/* Quick Add buttons */}
                <div className="p-4 flex flex-col gap-2" style={{ borderTop: "1.5px solid rgba(0,0,0,0.1)" }}>
                  <button
                    className="w-full flex items-center justify-center transition-colors hover:bg-transparent hover:text-black"
                    style={{
                      fontFamily: GC,
                      fontWeight: 800,
                      fontSize: 16,
                      minHeight: 48,
                      padding: "0 16px",
                      borderRadius: 8,
                      backgroundColor: "#000",
                      color: "#fff",
                      border: "2px solid #000",
                    }}
                  >
                    Add to cart — ${item.bundlePrice.toFixed(2)}
                  </button>
                  <button
                    className="w-full flex items-center justify-center transition-colors"
                    style={{
                      fontFamily: GC,
                      fontWeight: 700,
                      fontSize: 14,
                      minHeight: 36,
                      color: "rgba(0,0,0,0.6)",
                      backgroundColor: "transparent",
                      border: "none",
                      textDecoration: "underline",
                    }}
                  >
                    Subscribe & save — ${subscribePrice}
                  </button>
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
      <span style={{ fontFamily: GC, fontWeight: 500, fontSize: 17, color: "rgba(0,0,0,0.55)" }}>{label}</span>
      <span style={{ fontFamily: GC, fontWeight: 800, fontSize: 17, color: "#000", textAlign: "right", maxWidth: 180 }}>
        {value}
      </span>
    </div>
  )
}
