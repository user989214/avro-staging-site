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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-start">
      <ProductGallery
        formula={formula}
        formulaKey={formulaKey}
        flavorId={flavorId}
        onFlavorChange={setFlavorId}
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
