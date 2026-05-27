"use client"

import { useEffect, useRef, useState } from "react"
import { useCart } from "@/lib/cart-context"
import { formulas, type FormulaKey } from "@/lib/data"
import { ProductCard } from "@/components/product-visual"

const GC = "var(--font-grotesk-condensed,'Helvetica Neue',Helvetica,Arial,sans-serif)"

interface QuickAddBarProps {
  formulaKey: FormulaKey
  triggerSelector?: string
  hideSelector?: string
}

export function QuickAddBar({
  formulaKey,
  triggerSelector = "[data-quick-add-trigger]",
  hideSelector = "[data-quick-add-hide]",
}: QuickAddBarProps) {
  const { addItem, openCart } = useCart()
  const formula = formulas[formulaKey]

  const [revealed, setRevealed] = useState(false)
  const [nearBottom, setNearBottom] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const triggerRef = useRef<HTMLElement | null>(null)
  const hideRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    triggerRef.current = document.querySelector(triggerSelector)
    hideRef.current = document.querySelector(hideSelector)

    const onScroll = () => {
      const trigger = triggerRef.current
      const hide = hideRef.current
      const vh = window.innerHeight

      if (trigger) {
        const r = trigger.getBoundingClientRect()
        setRevealed(r.bottom < vh - 80)
      } else {
        setRevealed(window.scrollY > 600)
      }

      if (hide) {
        const r = hide.getBoundingClientRect()
        setNearBottom(r.top < vh - 40)
      } else {
        setNearBottom(false)
      }
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [triggerSelector, hideSelector])

  const visible = revealed && !nearBottom
  const unitPrice = formula.bundlePrice
  const total = unitPrice * quantity

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addItem(formulaKey, "single")
    openCart()
  }

  return (
    <div
      aria-hidden={!visible}
      className="fixed inset-x-0 bottom-0 z-40 pointer-events-none"
      style={{
        paddingBottom: 16,
        transform: visible ? "translateY(0)" : "translateY(140%)",
        opacity: visible ? 1 : 0,
        transition: "transform 380ms cubic-bezier(0.22,1,0.36,1), opacity 220ms ease-out",
      }}
    >
      <div
        className="mx-auto pointer-events-auto"
        style={{ maxWidth: 1240, paddingLeft: 16, paddingRight: 16 }}
      >
        <div
          role="region"
          aria-label="Quick add to cart"
          className="relative flex items-center justify-between gap-6"
          style={{
            backgroundColor: "var(--avro-blue)",
            borderRadius: 28,
            padding: "20px 24px",
            boxShadow: "0 18px 48px rgba(20,20,20,0.18)",
            fontFamily: GC,
          }}
        >
          {/* LEFT — thumbnail mockup + name + price */}
          <div className="flex items-center gap-4 min-w-0">
            <div
              className="relative flex-shrink-0 overflow-hidden"
              style={{
                width: 72,
                height: 72,
                borderRadius: 18,
                backgroundColor: "var(--bone)",
              }}
            >
              <ProductCard
                formulaKey={formulaKey}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex flex-col leading-tight">
              <span
                className="truncate"
                style={{ fontWeight: 800, fontSize: 19, color: "var(--charcoal)", letterSpacing: "0.005em" }}
              >
                AVRO {formula.name}
              </span>
              <span
                className="truncate"
                style={{ fontWeight: 600, fontSize: 14, color: "rgba(20,20,20,0.7)", marginTop: 2 }}
              >
                ${unitPrice.toFixed(2)} · 10 sticks
              </span>
            </div>
          </div>

          {/* RIGHT — quantity stepper + add to cart */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div
              className="flex items-center"
              style={{
                backgroundColor: "rgba(20,20,20,0.08)",
                borderRadius: 999,
              }}
            >
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex items-center justify-center transition-colors hover:bg-black/10 disabled:opacity-40"
                style={{ width: 44, height: 44, fontWeight: 700, fontSize: 20, color: "var(--charcoal)", background: "transparent", border: "none", cursor: "pointer", borderRadius: 999 }}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span
                className="text-center"
                style={{ width: 28, fontWeight: 800, fontSize: 15, color: "var(--charcoal)" }}
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex items-center justify-center transition-colors hover:bg-black/10"
                style={{ width: 44, height: 44, fontWeight: 700, fontSize: 20, color: "var(--charcoal)", background: "transparent", border: "none", cursor: "pointer", borderRadius: 999 }}
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="qab-add flex items-center justify-center transition-colors"
              style={{
                fontWeight: 800,
                fontSize: 15,
                minHeight: 52,
                padding: "0 36px",
                borderRadius: 999,
                backgroundColor: "var(--charcoal)",
                color: "var(--bone)",
                border: "2px solid var(--charcoal)",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Add to cart — ${total.toFixed(2)}
            </button>
          </div>

          <style>{`
            .qab-add:hover {
              background-color: transparent !important;
              color: var(--charcoal) !important;
            }
          `}</style>
        </div>
      </div>
    </div>
  )
}
