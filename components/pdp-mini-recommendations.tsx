"use client"

import Link from "next/link"
import { formulas, type FormulaKey } from "@/lib/data"
import { stickImageFor } from "@/components/product-visual"
import { Icon } from "@/components/icons"

interface PdpMiniRecommendationsProps {
  currentKey: FormulaKey
}

export function PdpMiniRecommendations({ currentKey }: PdpMiniRecommendationsProps) {
  const otherKeys = (Object.keys(formulas) as FormulaKey[]).filter(k => k !== currentKey).slice(0, 2)

  return (
    <div className="bg-soft rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold text-ink">You might also like</span>
        <Link 
          href="/shop" 
          className="text-xs font-bold text-olive hover:underline flex items-center gap-1"
        >
          Shop All
          <Icon name="arrowRight" className="w-3 h-3" />
        </Link>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {otherKeys.map((key) => {
          const product = formulas[key]
          const stickImage = stickImageFor(key)
          
          return (
            <Link
              key={key}
              href={`/${key}`}
              className="group flex items-center gap-3 bg-base rounded-lg p-3 hover:shadow-md transition-shadow"
            >
              {/* Product image */}
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-soft rounded-lg">
                <img 
                  src={stickImage.src}
                  alt={stickImage.alt}
                  className="w-10 h-10 object-contain"
                />
              </div>
              
              {/* Product info */}
              <div className="flex-1 min-w-0">
                <span className="block text-sm font-bold text-ink truncate group-hover:text-olive transition-colors">
                  {product.short}
                </span>
                <span className="block text-xs text-ink/60">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              
              {/* Add icon */}
              <div className="w-7 h-7 rounded-full bg-avro-blue flex items-center justify-center flex-shrink-0">
                <span className="text-ink font-bold text-sm">+</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
