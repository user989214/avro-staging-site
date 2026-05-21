"use client"

import { formulas, type FormulaKey } from "@/lib/data"
import { ProductCard } from "@/components/product-visual"
import Link from "next/link"

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
    <section className="w-full bg-white py-[clamp(48px,7vw,96px)]">
      <div className="w-full max-w-[1200px] mx-auto px-[clamp(18px,5vw,64px)]">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-serif font-black text-[clamp(28px,4vw,48px)] leading-[1.05] text-ink mb-3">
            We put intention into every formula we make.
          </h2>
          <p className="text-ink/60 text-lg">
            Find the one that was made with your day in mind.
          </p>
        </div>
        
        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {formulaKeys.map((key) => {
            const item = formulas[key]
            const data = comparisonData[key]
            const isActive = key === currentKey
            
            return (
              <Link
                key={key}
                href={`/${key}`}
                className={`group flex flex-col rounded-xl border-2 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg ${
                  isActive ? "border-avro-blue bg-avro-blue/5" : "border-line bg-white hover:border-ink/30"
                }`}
              >
                {/* Product image */}
                <div className="relative h-[200px] bg-soft flex items-center justify-center p-4">
                  <ProductCard formulaKey={key} className="h-full w-auto object-contain" />
                  {isActive && (
                    <span className="absolute top-3 right-3 px-2 py-1 bg-avro-blue text-ink text-[10px] font-black uppercase tracking-wider rounded">
                      Current
                    </span>
                  )}
                </div>
                
                {/* Product info */}
                <div className="flex-1 p-5">
                  <h3 className="font-black text-lg text-ink mb-1">{item.name}</h3>
                  <p className="text-sm text-ink/60 mb-4">{item.headline}</p>
                  
                  {/* Specs */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-ink/50 font-medium">Caffeine</span>
                      <span className="font-bold text-ink">{data.caffeine}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink/50 font-medium">Energy Experience</span>
                      <span className="font-bold text-ink">{data.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink/50 font-medium">Best for</span>
                      <span className="font-bold text-ink text-right max-w-[140px]">{data.bestFor}</span>
                    </div>
                  </div>
                </div>
                
                {/* Price */}
                <div className="px-5 py-4 border-t border-line bg-soft/50">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-ink/60">From</span>
                    <span className="font-black text-lg text-ink">${item.bundlePrice.toFixed(2)}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
