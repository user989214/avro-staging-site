"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import type { Formula, FormulaKey } from "@/lib/data"

interface BuyBoxProps {
  formula: Formula
  formulaKey: FormulaKey
}

export function BuyBox({ formula, formulaKey }: BuyBoxProps) {
  const [purchaseType, setPurchaseType] = useState<"onetime" | "subscribe">("subscribe")
  const [packSize, setPackSize] = useState<"10" | "30" | "60">("30")
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const basePrice = formula.bundlePrice
  const discount = purchaseType === "subscribe" ? 0.25 : 0
  const packMultiplier = packSize === "10" ? 0.4 : packSize === "60" ? 1.8 : 1
  const price = (basePrice * packMultiplier * (1 - discount)).toFixed(2)

  const handleAddToCart = () => {
    addItem(formula, purchaseType === "subscribe" ? "bundle" : "single")
  }

  const bgColorClass =
    formulaKey === "calm"
      ? "!bg-calm"
      : formulaKey === "focus"
        ? "!bg-focus"
        : "!bg-energy !text-ink"

  return (
    <aside className="grid gap-3 p-6 bg-white/90 border border-line rounded-lg shadow-[0_10px_30px_rgba(31,29,24,0.04)]">
      <h2 className="font-sans font-black text-[28px]">{formula.name}</h2>
      <p className="text-ink/75">{formula.flavor}</p>
      <div className="text-[#b66f19] font-black">
        {"★★★★★ "}
        <span className="text-ink/70 font-bold">
          4.8 ({formulaKey === "calm" ? "82" : formulaKey === "focus" ? "62" : "76"} reviews)
        </span>
      </div>

      <label className="flex gap-2.5 items-center p-3 border border-line rounded-[7px] cursor-pointer hover:border-olive transition-colors">
        <input
          type="radio"
          name="purchase"
          checked={purchaseType === "onetime"}
          onChange={() => setPurchaseType("onetime")}
          className="accent-olive"
        />
        One-time purchase
      </label>
      <label className="flex gap-2.5 items-center p-3 border border-line rounded-[7px] cursor-pointer hover:border-olive transition-colors">
        <input
          type="radio"
          name="purchase"
          checked={purchaseType === "subscribe"}
          onChange={() => setPurchaseType("subscribe")}
          className="accent-olive"
        />
        Subscribe & Save 25%
      </label>

      <div className="flex gap-2">
        {(["10", "30", "60"] as const).map((size) => (
          <button
            key={size}
            onClick={() => setPackSize(size)}
            className={`min-h-[38px] px-3 border rounded-[7px] transition-colors ${
              packSize === size
                ? "border-olive bg-olive/5 text-olive font-bold"
                : "border-line bg-white hover:bg-gray-50"
            }`}
          >
            {size} Sticks
          </button>
        ))}
      </div>

      <strong className="text-[34px]">${price}</strong>

      <div className="flex gap-2">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="min-h-[38px] px-4 border border-line rounded-[7px] bg-white hover:bg-gray-50 font-bold text-lg"
        >
          -
        </button>
        <span className="grid place-items-center min-w-[44px] border border-line rounded-[7px] font-bold">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="min-h-[38px] px-4 border border-line rounded-[7px] bg-white hover:bg-gray-50 font-bold text-lg"
        >
          +
        </button>
      </div>

      <button onClick={handleAddToCart} className={`btn-primary w-full ${bgColorClass}`}>
        Add to Cart
      </button>

      <small className="text-center text-ink/70">Free Shipping Over $50</small>
    </aside>
  )
}
