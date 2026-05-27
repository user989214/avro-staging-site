"use client"

import { useState } from "react"
import { ProductGallery } from "@/components/product-gallery"
import { BuyBox } from "@/components/buy-box"
import type { Formula, FormulaKey } from "@/lib/data"

interface ProductHeroProps {
  formula: Formula
  formulaKey: FormulaKey
}

/**
 * Lifts the selected flavor up so the gallery image and the BuyBox swatch
 * stay perfectly synced when either side changes flavor.
 */
export function ProductHero({ formula, formulaKey }: ProductHeroProps) {
  const [flavorId, setFlavorId] = useState<string>(formula.flavors[0].id)
  const reviewCount = formulaKey === "calm" ? 82 : formulaKey === "focus" ? 62 : 76

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-8 lg:gap-12 items-start">
      <ProductGallery
        formula={formula}
        formulaKey={formulaKey}
        flavorId={flavorId}
        onFlavorChange={setFlavorId}
        reviewCount={reviewCount}
        rating={4.8}
      />
      <BuyBox
        formula={formula}
        formulaKey={formulaKey}
        flavorId={flavorId}
        onFlavorChange={setFlavorId}
      />
    </div>
  )
}
