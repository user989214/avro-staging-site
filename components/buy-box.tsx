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

const GC = '"Gotham Condensed", sans-serif'

interface BuyBoxProps {
  formula: Formula
  formulaKey: FormulaKey
  flavorId: string
  onFlavorChange: (flavorId: string) => void
}

export function BuyBox({ formula, formulaKey, flavorId }: BuyBoxProps) {
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
    <aside className="flex flex-col gap-6 p-8 bg-white rounded-xl" style={{ fontFamily: GC }}>
      {/* Header */}
      <header className="flex flex-col gap-2">
        <span
          className="text-[11px] tracking-[0.14em] uppercase"
          style={{ fontFamily: GC, fontWeight: 700, color: "rgba(0,0,0,0.55)" }}
        >
          {formula.name}
        </span>
        <h1
          style={{
            fontFamily: GC,
            fontWeight: 950,
            fontSize: "clamp(28px,3vw,42px)",
            lineHeight: 1.0,
            color: "#000",
          }}
        >
          {formula.headline}
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <span style={{ color: "#d79a23" }} className="tracking-wider text-sm">
            {"\u2605\u2605\u2605\u2605\u2605"}
          </span>
          <span className="text-sm" style={{ color: "rgba(0,0,0,0.55)" }}>
            {reviewLabel}
          </span>
        </div>
        <p className="mt-1 text-xs" style={{ color: "rgba(0,0,0,0.55)" }}>
          10 stick packets per box · Flavor: {activeFlavor.name}
        </p>
      </header>

      {/* Purchase options */}
      <div className="flex flex-col gap-3">
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
        <h2 className="text-sm uppercase tracking-[0.1em]" style={{ fontFamily: GC, fontWeight: 800 }}>
          Quantity
        </h2>
        <div
          className="flex items-center"
          style={{ backgroundColor: "#f2f2f2", borderRadius: 8 }}
        >
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="w-10 h-10 flex items-center justify-center text-lg transition-colors hover:bg-black/5"
            style={{ fontFamily: GC, fontWeight: 800 }}
          >
            −
          </button>
          <span
            className="w-10 text-center"
            style={{ fontFamily: GC, fontWeight: 800, fontSize: 16 }}
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="w-10 h-10 flex items-center justify-center text-lg transition-colors hover:bg-black/5"
            style={{ fontFamily: GC, fontWeight: 800 }}
          >
            +
          </button>
        </div>
      </div>

      {/* Add to cart */}
      <button
        type="button"
        onClick={handleAdd}
        className="w-full flex items-center justify-center transition-colors"
        style={{
          fontFamily: GC,
          fontWeight: 800,
          fontSize: 18,
          minHeight: 60,
          padding: "0 32px",
          borderRadius: 10,
          backgroundColor: "#000",
          color: "#fff",
          border: "2.5px solid #000",
          letterSpacing: "0.01em",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "transparent"
          e.currentTarget.style.color = "#000"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#000"
          e.currentTarget.style.color = "#fff"
        }}
      >
        Add to Cart — ${displayTotal.toFixed(2)}
      </button>

      {/* Supplement Facts button */}
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 transition-colors"
            style={{
              fontFamily: GC,
              fontWeight: 700,
              fontSize: 14,
              minHeight: 48,
              padding: "0 24px",
              borderRadius: 10,
              backgroundColor: "#f2f2f2",
              color: "#000",
              border: "none",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#e8e8e8"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f2f2f2"
            }}
          >
            <Icon name="card" className="w-4 h-4" />
            Supplement Facts
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-[420px] p-0 bg-white">
          <div className="p-6 pb-2">
            <DialogHeader>
              <DialogTitle style={{ fontFamily: GC, fontWeight: 950, fontSize: 28 }}>
                Supplement Facts
              </DialogTitle>
            </DialogHeader>
            <p className="mt-1 text-xs" style={{ color: "rgba(0,0,0,0.55)" }}>
              {formula.name} · {activeFlavor.name} · Serving size 1 stick (5 g)
            </p>
          </div>
          <div className="px-6 pb-6">
            <div className="rounded-md p-4" style={{ backgroundColor: "#f5f5f5" }}>
              <div style={{ borderTop: "4px solid #000", paddingTop: 8 }}>
                {factsRows.map(([label, value], i) => (
                  <div
                    key={label}
                    className={cn(
                      "flex justify-between text-xs py-2",
                      i < factsRows.length - 1 && "border-b",
                    )}
                    style={{ borderColor: "rgba(0,0,0,0.08)" }}
                  >
                    <span style={{ fontFamily: GC, fontWeight: 700 }}>{label}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[10px] leading-snug" style={{ color: "rgba(0,0,0,0.55)" }}>
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
      className="relative flex items-start gap-3 p-4 cursor-pointer transition-all"
      style={{
        borderRadius: 10,
        backgroundColor: checked ? "#000" : "#f5f5f5",
        color: checked ? "#fff" : "#000",
      }}
    >
      <input
        type="radio"
        name="purchase"
        checked={checked}
        onChange={onChange}
        className="mt-1 shrink-0"
        style={{ accentColor: "#87CEEB" }}
      />
      <div className="flex-1">
        <div className="flex items-center justify-between gap-3">
          <strong style={{ fontFamily: GC, fontWeight: 800, fontSize: 15 }}>{title}</strong>
          <strong style={{ fontFamily: GC, fontWeight: 950, fontSize: 15, whiteSpace: "nowrap" }}>
            {price}
          </strong>
        </div>
        <p
          className="mt-1 leading-relaxed"
          style={{
            fontFamily: GC,
            fontWeight: 400,
            fontSize: 12,
            color: checked ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
          }}
        >
          {subtitle}
        </p>
      </div>
      {badge && (
        <span
          className="absolute -top-2.5 left-4 px-2 py-0.5 text-[10px] tracking-[0.1em]"
          style={{
            fontFamily: GC,
            fontWeight: 950,
            backgroundColor: "#87CEEB",
            color: "#000",
            borderRadius: 4,
          }}
        >
          {badge}
        </span>
      )}
    </label>
  )
}
