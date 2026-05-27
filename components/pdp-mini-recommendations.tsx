"use client"

import Link from "next/link"
import { formulas, type FormulaKey } from "@/lib/data"
import { ProductCard } from "@/components/product-visual"
import { Icon } from "@/components/icons"

interface PdpMiniRecommendationsProps {
  currentKey: FormulaKey
}

export function PdpMiniRecommendations({ currentKey }: PdpMiniRecommendationsProps) {
  const otherKeys = (Object.keys(formulas) as FormulaKey[]).filter((k) => k !== currentKey).slice(0, 2)

  return (
    <div
      style={{
        backgroundColor: "var(--base-light, #f5f1e8)",
        borderRadius: 24,
        padding: "clamp(16px,2vw,20px)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-extrabold text-ink">You might also like</span>
        <Link href="/shop" className="text-xs font-bold text-ink/70 hover:text-ink flex items-center gap-1">
          Shop All
          <Icon name="arrowRight" className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {otherKeys.map((key) => {
          const product = formulas[key]
          return (
            <Link
              key={key}
              href={`/${key}`}
              className="group flex flex-col gap-3 transition-transform hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--bone)",
                borderRadius: 18,
                padding: 12,
              }}
            >
              {/* Square product image — matches homepage card style */}
              <div
                className="relative flex items-center justify-center overflow-hidden"
                style={{
                  backgroundColor: "var(--base-light, #f5f1e8)",
                  borderRadius: 14,
                  aspectRatio: "1 / 1",
                }}
              >
                <ProductCard formulaKey={key} className="h-full w-full object-cover" />
              </div>

              {/* Title + price row */}
              <div className="flex items-center justify-between gap-2 px-1">
                <span className="text-sm font-extrabold text-ink truncate">{product.short}</span>
                <span className="text-xs font-bold text-ink/70">${product.price.toFixed(2)}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
