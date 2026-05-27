"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { Icon } from "@/components/icons"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Formula, FormulaKey } from "@/lib/data"
import { cn } from "@/lib/utils"

const GC = '"DM Sans", system-ui, sans-serif'
const LIGHT_GRAY = "#f2f2f2"

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

  const factsRows: [string, string][] = [
    ["Calories", "10"],
    ["Total Carbohydrate", formulaKey === "calm" ? "2 g" : "3 g"],
    ["Total Sugars", "0 g"],
    ...(formulaKey === "calm"
      ? ([["Magnesium (as magnesium bisglycinate)", "100 mg"]] as [string, string][])
      : []),
    ["Sodium (as sodium bicarbonate)", "80 mg"],
    ["Potassium (as potassium bicarbonate)", "100 mg"],
    ["PharmaGABA® (GABA)", "200 mg"],
    [
      formula.addition,
      formulaKey === "calm" ? "850 mg" : formulaKey === "focus" ? "250 mg" : "120 mg",
    ],
  ]

  return (
    <aside
      className="flex flex-col gap-6 bg-base"
      style={{ fontFamily: GC }}
    >
      {/* Header */}
      <header className="flex flex-col gap-2">
        <h1
          className="font-serif"
          style={{
            fontWeight: 900,
            fontSize: "clamp(36px,4vw,52px)",
            lineHeight: 0.96,
            color: "var(--ink)",
          }}
        >
          {formula.name}
        </h1>
        <div className="flex items-center gap-3">
          <span style={{ color: "var(--ink)" }} className="tracking-wider text-base">
            {"\u2605\u2605\u2605\u2605\u2605"}
          </span>
          <span
            style={{
              fontFamily: GC,
              fontWeight: 500,
              fontSize: 16,
              color: "var(--warm-gray)",
            }}
          >
            {reviewLabel}
          </span>
        </div>
        <p
          style={{
            fontFamily: GC,
            fontWeight: 500,
            fontSize: 17,
            lineHeight: 1.4,
            color: "var(--warm-gray)",
          }}
        >
          {formula.support}
        </p>
      </header>

      {/* Flavor switcher */}
      <div className="flex flex-col gap-2">
        <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>
          Flavor
        </span>
        <div className="flex gap-2">
          {formula.flavors.map((flavor) => (
            <button
              key={flavor.id}
              type="button"
              onClick={() => onFlavorChange(flavor.id)}
              className="flex-1 flex flex-col items-start px-4 py-3 rounded-2xl transition-all"
              style={{
                backgroundColor: flavorId === flavor.id ? "var(--charcoal)" : LIGHT_GRAY,
                color: flavorId === flavor.id ? "var(--bone)" : "var(--ink)",
                border: flavorId === flavor.id ? "2px solid var(--charcoal)" : "2px solid transparent",
              }}
            >
              <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 15 }}>{flavor.name}</span>
              <span
                style={{
                  fontFamily: GC,
                  fontWeight: 500,
                  fontSize: 13,
                  opacity: flavorId === flavor.id ? 0.7 : 0.6,
                }}
              >
                {flavor.tagline}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Purchase options */}
      <div className="flex flex-col gap-3">
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

      {/* Quantity */}
      <div className="flex items-center justify-between">
        <h2
          style={{
            fontFamily: GC,
            fontWeight: 700,
            fontSize: 19,
            color: "var(--ink)",
          }}
        >
          Quantity
        </h2>
        <div
          className="flex items-center"
          style={{ backgroundColor: LIGHT_GRAY, borderRadius: 999 }}
        >
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="w-12 h-12 flex items-center justify-center transition-colors hover:bg-black/5"
            style={{ fontFamily: GC, fontWeight: 700, fontSize: 22 }}
          >
            −
          </button>
          <span
            className="w-12 text-center"
            style={{ fontFamily: GC, fontWeight: 700, fontSize: 19 }}
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="w-12 h-12 flex items-center justify-center transition-colors hover:bg-black/5"
            style={{ fontFamily: GC, fontWeight: 700, fontSize: 22 }}
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
          fontWeight: 700,
          fontSize: 16,
          minHeight: 48,
          padding: "0 28px",
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
        .bb-add-btn:hover { background-color: transparent; color: var(--ink); }
      `}</style>

      {/* Supplement Facts button */}
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 transition-colors"
            style={{
              fontFamily: GC,
              fontWeight: 700,
              fontSize: 16,
              minHeight: 48,
              padding: "0 28px",
              borderRadius: 999,
              backgroundColor: LIGHT_GRAY,
              color: "var(--ink)",
              border: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#e6e6e6"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = LIGHT_GRAY
            }}
          >
            <Icon name="card" className="w-5 h-5" />
            Supplement facts
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-[440px] p-0 bg-base">
          <div className="p-6 pb-2">
            <DialogHeader>
              <DialogTitle style={{ fontFamily: GC, fontWeight: 700, fontSize: 32, color: "var(--ink)" }}>
                Supplement facts
              </DialogTitle>
            </DialogHeader>
            <p
              className="mt-1"
              style={{
                fontFamily: GC,
                fontWeight: 500,
                fontSize: 15,
                color: "rgba(0,0,0,0.55)",
              }}
            >
              {formula.name} · {activeFlavor.name} · Serving size 1 stick (5 g)
            </p>
          </div>
          <div className="px-6 pb-6">
            <div className="rounded-xl p-4" style={{ backgroundColor: LIGHT_GRAY }}>
              <div style={{ borderTop: "4px solid #000", paddingTop: 8 }}>
                {factsRows.map(([label, value], i) => (
                  <div
                    key={label}
                    className={cn(
                      "flex justify-between py-2",
                      i < factsRows.length - 1 && "border-b",
                    )}
                    style={{
                      borderColor: "rgba(0,0,0,0.1)",
                      fontFamily: GC,
                      fontSize: 14,
                    }}
                  >
                    <span style={{ fontWeight: 700 }}>{label}</span>
                    <span style={{ fontWeight: 500 }}>{value}</span>
                  </div>
                ))}
              </div>
              <p
                className="mt-3 leading-snug"
                style={{
                  fontFamily: GC,
                  fontWeight: 400,
                  fontSize: 12,
                  color: "rgba(0,0,0,0.55)",
                }}
              >
                10 stick packets per box. Mix 1 packet into 12 fl oz of water; up to 3 times per day.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
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
      className="relative flex items-start gap-3 p-5 cursor-pointer transition-all"
      style={{
        borderRadius: 24,
        backgroundColor: checked ? "#000" : LIGHT_GRAY,
        color: checked ? "#fff" : "#000",
        fontFamily: GC,
      }}
    >
      <input
        type="radio"
        name="purchase"
        checked={checked}
        onChange={onChange}
        className="mt-1 shrink-0"
        style={{ accentColor: "#fff", width: 18, height: 18 }}
      />
      <div className="flex-1">
        <div className="flex items-center justify-between gap-3">
          <strong style={{ fontFamily: GC, fontWeight: 700, fontSize: 18 }}>{title}</strong>
          <strong style={{ fontFamily: GC, fontWeight: 700, fontSize: 18, whiteSpace: "nowrap" }}>
            {price}
          </strong>
        </div>
        <p
          className="mt-1 leading-relaxed"
          style={{
            fontFamily: GC,
            fontWeight: 400,
            fontSize: 14,
            color: checked ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
          }}
        >
          {subtitle}
        </p>
      </div>
      {badge && (
        <span
          className="absolute -top-3 left-4 px-3 py-1"
          style={{
            fontFamily: GC,
            fontWeight: 700,
            fontSize: 12,
            backgroundColor: "var(--charcoal)",
            color: "var(--bone)",
            borderRadius: 999,
          }}
        >
          {badge}
        </span>
      )}
    </label>
  )
}
