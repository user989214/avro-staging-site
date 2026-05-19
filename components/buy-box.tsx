"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { Icon } from "@/components/icons"
import { stickImageFor } from "@/components/product-visual"
import type { Formula, FormulaKey } from "@/lib/data"
import { cn } from "@/lib/utils"

interface BuyBoxProps {
  formula: Formula
  formulaKey: FormulaKey
  flavorId: string
  onFlavorChange: (flavorId: string) => void
}

export function BuyBox({ formula, formulaKey, flavorId, onFlavorChange }: BuyBoxProps) {
  const [purchaseType, setPurchaseType] = useState<"onetime" | "subscribe">("subscribe")
  const [quantity, setQuantity] = useState(1)
  const { addItem, openCart } = useCart()

  const activeFlavor = formula.flavors.find((f) => f.id === flavorId) ?? formula.flavors[0]
  const baseTotal = formula.bundlePrice
  const subscribeTotal = baseTotal * 0.75
  const oneTimeTotal = baseTotal
  const displayTotal = (purchaseType === "subscribe" ? subscribeTotal : oneTimeTotal) * quantity
  const reviewCount = formulaKey === "calm" ? 82 : formulaKey === "focus" ? 62 : 76
  const reviewLabel = `4.8 (${reviewCount} reviews)`

  const handleAdd = () => {
    addItem(formula, purchaseType === "subscribe" ? "bundle" : "single")
    openCart()
  }

  return (
    <aside className="flex flex-col gap-5 p-7 bg-white border border-line rounded-lg shadow-[0_8px_32px_rgba(31,29,24,0.05)]">
      {/* Header */}
      <header className="flex flex-col gap-2">
        <span className="text-olive text-[11px] font-black tracking-[0.14em] uppercase">
          {formula.name}
        </span>
        <h1 className="font-serif font-black text-[clamp(28px,3vw,38px)] leading-[1.05] text-ink">
          {formula.headline}
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[#d79a23] tracking-wider text-sm">{"\u2605\u2605\u2605\u2605\u2605"}</span>
          <span className="text-ink/60 text-sm">{reviewLabel}</span>
        </div>
        <p className="mt-1 text-xs text-ink/60">
          10 stick packets per box &middot; Net wt 1.76 oz (50 g)
        </p>
      </header>

      {/* Flavor switcher */}
      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-extrabold text-ink-dark">
            Flavor: <span className="font-bold text-ink/70">{activeFlavor.name}</span>
          </h2>
          <span className="text-xs text-ink/60 italic">{activeFlavor.tagline}</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {formula.flavors.map((flavor) => {
            const selected = flavor.id === flavorId
            const { src, alt } = stickImageFor(formulaKey, flavor.id)
            return (
              <button
                key={flavor.id}
                type="button"
                onClick={() => onFlavorChange(flavor.id)}
                aria-pressed={selected}
                className={cn(
                  "relative flex items-center gap-2 rounded-lg border-2 bg-white overflow-hidden text-left transition-all min-h-[64px]",
                  selected
                    ? "border-olive ring-1 ring-olive/30"
                    : "border-line hover:border-ink/30"
                )}
              >
                <span
                  className="flex items-center justify-center w-14 h-full self-stretch shrink-0 py-1.5"
                  style={{
                    background: `linear-gradient(135deg, ${formula.color}10, ${formula.accent}1f)`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={alt}
                    className="h-12 w-auto object-contain"
                  />
                </span>
                <span
                  className={cn(
                    "flex-1 pr-3 py-2 text-xs font-extrabold leading-tight",
                    selected ? "text-olive-dark" : "text-ink"
                  )}
                >
                  {flavor.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Purchase options */}
      <div className="flex flex-col gap-2.5">
        <PurchaseOption
          checked={purchaseType === "subscribe"}
          onChange={() => setPurchaseType("subscribe")}
          title="Subscribe & Save 25%"
          subtitle="Delivered every 28 days. Pause, skip, or cancel anytime."
          price={`$${subscribeTotal.toFixed(2)}`}
          badge="MOST POPULAR"
        />
        <PurchaseOption
          checked={purchaseType === "onetime"}
          onChange={() => setPurchaseType("onetime")}
          title="One-time purchase"
          subtitle="No commitment. Free shipping over $50."
          price={`$${oneTimeTotal.toFixed(2)}`}
        />
      </div>

      {/* Quantity */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-extrabold text-ink-dark">Quantity</h2>
        <div className="flex items-center gap-1 border border-line rounded-md overflow-hidden">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="w-10 h-10 flex items-center justify-center hover:bg-soft transition-colors text-lg font-bold"
          >
            -
          </button>
          <span className="w-10 text-center font-extrabold">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="w-10 h-10 flex items-center justify-center hover:bg-soft transition-colors text-lg font-bold"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to cart */}
      <button
        type="button"
        onClick={handleAdd}
        className="btn-primary w-full !min-h-[54px] !text-base"
      >
        Add to Cart &mdash; ${displayTotal.toFixed(2)}
      </button>

      {/* Trust bar */}
      <ul className="grid grid-cols-3 gap-2 pt-2 border-t border-line">
        <TrustItem icon="shield" label="HSA/FSA eligible" />
        <TrustItem icon="leaf" label="Third-party tested" />
        <TrustItem icon="star" label="30-day guarantee" />
      </ul>
    </aside>
  )
}

function PurchaseOption({
  checked,
  onChange,
  title,
  subtitle,
  price,
  badge,
}: {
  checked: boolean
  onChange: () => void
  title: string
  subtitle: string
  price: string
  badge?: string
}) {
  return (
    <label
      className={cn(
        "relative flex items-start gap-3 p-4 rounded-md border-2 cursor-pointer transition-all",
        checked ? "border-olive bg-olive/5" : "border-line bg-white hover:border-ink/30"
      )}
    >
      <input
        type="radio"
        name="purchase"
        checked={checked}
        onChange={onChange}
        className="mt-1 accent-olive shrink-0"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between gap-3">
          <strong className="text-sm font-extrabold text-ink">{title}</strong>
          <strong className="text-sm font-black text-ink whitespace-nowrap">{price}</strong>
        </div>
        <p className="text-xs text-ink/65 mt-1 leading-relaxed">{subtitle}</p>
      </div>
      {badge && (
        <span
          className="absolute -top-2.5 left-4 px-2 py-0.5 bg-olive text-[10px] font-black tracking-[0.1em] rounded-sm"
          style={{ color: "var(--avro-blue)" }}
        >
          {badge}
        </span>
      )}
    </label>
  )
}

function TrustItem({ icon, label }: { icon: "shield" | "leaf" | "star"; label: string }) {
  return (
    <li className="flex flex-col items-center gap-1.5 text-center">
      <Icon name={icon} className="w-5 h-5 text-olive" />
      <span className="text-[11px] font-bold text-ink/70 leading-tight">{label}</span>
    </li>
  )
}
