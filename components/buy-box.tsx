"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { soloTubeImageFor } from "@/components/product-visual"
import type { Formula, FormulaKey } from "@/lib/data"

const GC = '"DM Sans", system-ui, sans-serif'
// Matte mid-grey so unselected pills/rows read clearly on the cream section bg
const LIGHT_GRAY = "#cfcbc1"

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
  void reviewCount

  const handleAdd = () => {
    const variant = purchaseType === "subscribe" ? "bundle" : "single"
    for (let i = 0; i < quantity; i++) {
      addItem(formula, variant)
    }
    openCart()
  }

  return (
    <aside
      className="flex flex-col gap-3"
      style={{ fontFamily: GC }}
    >
      {/* Header - tighter, no rating (rating now lives in gallery overlay) */}
      <header className="flex flex-col gap-1">
        <h1
          className="font-serif text-balance"
          style={{
            fontWeight: 900,
            fontSize: "clamp(24px,2.8vw,40px)",
            lineHeight: 0.98,
            color: "var(--ink)",
          }}
        >
          {formula.headline}
        </h1>
        <p
          style={{
            fontFamily: GC,
            fontWeight: 500,
            fontSize: "clamp(12px,1vw,15px)",
            lineHeight: 1.4,
            color: "var(--warm-gray)",
          }}
        >
          10 stick packets per box
        </p>
      </header>

      {/* Flavor switcher - compact circular pills */}
      <div className="flex flex-col gap-1">
        <span style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(11px,0.9vw,13px)", color: "var(--ink)" }}>
          Flavor
        </span>
        <div className="flex flex-wrap gap-1.5">
          {formula.flavors.map((flavor) => {
            const isSelected = flavorId === flavor.id
            return (
              <button
                key={flavor.id}
                type="button"
                onClick={() => onFlavorChange(flavor.id)}
                className="inline-flex items-center gap-1 pl-0.5 pr-2.5 py-0.5 transition-all"
                style={{
                  borderRadius: 999,
                  backgroundColor: isSelected ? "var(--charcoal)" : LIGHT_GRAY,
                  border: isSelected ? "2px solid var(--charcoal)" : "2px solid transparent",
                }}
              >
                {/* Circular solo tube thumbnail */}
                <div
                  className="w-6 h-6 overflow-hidden flex-shrink-0 grid place-items-center"
                  style={{
                    borderRadius: 999,
                    backgroundColor: "#FBF8F1",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={soloTubeImageFor(formulaKey, flavor.id).src}
                    alt={flavor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  style={{
                    fontFamily: GC,
                    fontWeight: 700,
                    fontSize: "clamp(10px,0.85vw,12px)",
                    lineHeight: 1,
                    color: isSelected ? "var(--bone)" : "var(--ink)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {flavor.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Purchase options - fully circular pills */}
      <div className="flex flex-col gap-1">
        <PurchaseOption
          checked={purchaseType === "subscribe"}
          onChange={() => setPurchaseType("subscribe")}
          title="Subscribe & save 25%"
          subtitle="Delivered every 28 days. Pause, skip, or cancel anytime."
          price={`$${subscribeTotal.toFixed(2)}`}
          badge="Most popular"
        />
        <PurchaseOption
          checked={purchaseType === "onetime"}
          onChange={() => setPurchaseType("onetime")}
          title="One-time purchase"
          subtitle="No commitment. Free shipping over $50."
          price={`$${oneTimeTotal.toFixed(2)}`}
        />
      </div>

      {/* Quantity - compact */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span
          style={{
            fontFamily: GC,
            fontWeight: 700,
            fontSize: "clamp(12px,1vw,14px)",
            color: "var(--ink)",
          }}
        >
          Quantity
        </span>
        <div
          className="flex items-center"
          style={{
            backgroundColor: "var(--bone)",
            borderRadius: 999,
            border: "2px solid var(--charcoal)",
          }}
        >
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-colors hover:bg-black/5 disabled:opacity-40"
            style={{ fontFamily: GC, fontWeight: 700, fontSize: 16, color: "var(--charcoal)" }}
            disabled={quantity <= 1}
          >
            −
          </button>
          <span
            className="w-7 text-center"
            style={{ fontFamily: GC, fontWeight: 800, fontSize: 14, color: "var(--charcoal)" }}
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-colors hover:bg-black/5"
            style={{ fontFamily: GC, fontWeight: 700, fontSize: 16, color: "var(--charcoal)" }}
          >
            +
          </button>
        </div>
      </div>

      {/* Add to cart */}
      <button
        type="button"
        onClick={handleAdd}
        className="bb-add-btn w-full flex items-center justify-center transition-colors"
        style={{
          fontFamily: GC,
          fontWeight: 800,
          fontSize: "clamp(12px,1vw,14px)",
          minHeight: "clamp(40px,4vw,48px)",
          padding: "0 16px",
          borderRadius: 999,
          backgroundColor: "var(--charcoal)",
          color: "var(--bone)",
          border: "2px solid var(--charcoal)",
          letterSpacing: "0.01em",
        }}
      >
        Add to cart — ${displayTotal.toFixed(2)}
      </button>
      <style>{`
        .bb-add-btn { cursor: pointer; }
        .bb-add-btn:hover {
          background-color: transparent !important;
          color: var(--charcoal) !important;
        }
        .bb-add-btn:active { transform: scale(0.99); }
      `}</style>
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
      className="relative flex items-center gap-2 cursor-pointer transition-colors"
      style={{
        backgroundColor: checked ? "var(--charcoal)" : LIGHT_GRAY,
        color: checked ? "var(--bone)" : "var(--ink)",
        fontFamily: GC,
        borderRadius: 999,
        padding: "8px 12px 8px 10px",
        border: checked ? "2px solid var(--charcoal)" : "2px solid transparent",
      }}
    >
      <span
        aria-hidden
        className="shrink-0 grid place-items-center"
        style={{
          width: 16,
          height: 16,
          borderRadius: 999,
          border: checked ? "2px solid var(--bone)" : "2px solid var(--warm-gray)",
          backgroundColor: "transparent",
        }}
      >
        {checked && (
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              backgroundColor: "var(--bone)",
            }}
          />
        )}
      </span>
      <input
        type="radio"
        name="purchase"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 flex-wrap min-w-0">
            <strong
              style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(11px,0.9vw,13px)", lineHeight: 1.2 }}
            >
              {title}
            </strong>
            {badge && (
              <span
                style={{
                  fontFamily: GC,
                  fontWeight: 700,
                  fontSize: "clamp(7px,0.6vw,8px)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "2px 5px",
                  backgroundColor: checked ? "var(--bone)" : "var(--charcoal)",
                  color: checked ? "var(--charcoal)" : "var(--bone)",
                  borderRadius: 999,
                  whiteSpace: "nowrap",
                }}
              >
                {badge}
              </span>
            )}
          </div>
          <strong
            style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(11px,0.9vw,13px)", whiteSpace: "nowrap" }}
          >
            {price}
          </strong>
        </div>
        <p
          className="mt-0.5 leading-snug"
          style={{
            fontFamily: GC,
            fontWeight: 500,
            fontSize: "clamp(9px,0.75vw,11px)",
            color: checked ? "rgba(255,255,255,0.75)" : "rgba(20,20,20,0.7)",
          }}
        >
          {subtitle}
        </p>
      </div>
    </label>
  )
}
