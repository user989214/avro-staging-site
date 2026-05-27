"use client"

import { useEffect, useRef, useState } from "react"
import { useCart } from "@/lib/cart-context"
import { formulas, type FormulaKey } from "@/lib/data"
import { stickImageFor } from "@/components/product-visual"

const GC = "var(--font-sans)"

interface QuickAddBarProps {
  formulaKey: FormulaKey
  /** Element after which the bar should reveal (typically the ingredients section). */
  triggerSelector?: string
  /** Element before which the bar should hide (typically the final CTA / footer area). */
  hideSelector?: string
}

export function QuickAddBar({
  formulaKey,
  triggerSelector = "[data-quick-add-trigger]",
  hideSelector = "[data-quick-add-hide]",
}: QuickAddBarProps) {
  const { addItem, openCart } = useCart()
  const formula = formulas[formulaKey]
  const stickImg = stickImageFor(formulaKey)

  const [revealed, setRevealed] = useState(false)
  const [nearBottom, setNearBottom] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  const triggerRef = useRef<HTMLElement | null>(null)
  const hideRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    triggerRef.current = document.querySelector(triggerSelector)
    hideRef.current = document.querySelector(hideSelector)

    const onScroll = () => {
      const trigger = triggerRef.current
      const hide = hideRef.current
      const vh = window.innerHeight

      // Reveal once the ingredients section bottom has scrolled above the viewport bottom
      if (trigger) {
        const r = trigger.getBoundingClientRect()
        setRevealed(r.bottom < vh - 80)
      } else {
        setRevealed(window.scrollY > 600)
      }

      // Hide once we approach the final CTA / footer area
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

  if (dismissed) return null

  const visible = revealed && !nearBottom
  const bundlePrice = (formula.bundlePrice * 0.75).toFixed(2)

  const handleAdd = () => {
    addItem(formula as never, "bundle")
    openCart()
  }

  return (
    <div
      aria-hidden={!visible}
      className="fixed left-0 bottom-0 z-40 pointer-events-none flex items-end pl-4 pb-4 sm:pl-6 sm:pb-6"
      style={{
        transform: visible ? "translateY(0)" : "translateY(140%)",
        opacity: visible ? 1 : 0,
        transition: "transform 380ms cubic-bezier(0.22,1,0.36,1), opacity 220ms ease-out",
      }}
    >
      {minimized ? (
        // Collapsed: circular floating button on the left with a plus icon to re-expand
        <button
          type="button"
          onClick={() => setMinimized(false)}
          aria-label="Open quick add"
          className="pointer-events-auto flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
          style={{
            width: 60,
            height: 60,
            borderRadius: 999,
            backgroundColor: formula.color,
            color: "#fff",
            boxShadow: "0 14px 36px rgba(0,0,0,0.22)",
            fontFamily: GC,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      ) : (
        <div
          role="region"
          aria-label="Quick add to cart"
          className="pointer-events-auto"
          style={{
            width: "min(440px, calc(100vw - 32px))",
            backgroundColor: formula.color,
            color: "#fff",
            borderRadius: 999,
            padding: "8px 12px 8px 8px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            boxShadow: "0 18px 48px rgba(0,0,0,0.22)",
            fontFamily: GC,
          }}
        >
          {/* Product thumbnail */}
          <div
            className="flex-shrink-0 flex items-center justify-center"
            style={{
              width: 52,
              height: 52,
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.14)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={stickImg.src}
              alt=""
              className="object-contain"
              style={{ height: 44, width: "auto" }}
            />
          </div>

          {/* Copy */}
          <div className="flex-1 min-w-0 flex flex-col leading-tight">
            <span
              className="truncate"
              style={{ fontFamily: GC, fontWeight: 800, fontSize: 14.5, letterSpacing: "0.01em" }}
            >
              Add {formula.name} to cart
            </span>
            <span
              className="truncate"
              style={{ fontFamily: GC, fontWeight: 500, fontSize: 12, color: "rgba(255,255,255,0.78)" }}
            >
              Subscribe & save · ${bundlePrice}
            </span>
          </div>

          {/* Quick add — primary circular CTA in black */}
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Quick add ${formula.name} to cart`}
            className="flex items-center justify-center transition-transform hover:scale-[1.04] active:scale-95"
            style={{
              width: 52,
              height: 52,
              borderRadius: 999,
              backgroundColor: "var(--charcoal)",
              color: "#fff",
              fontFamily: GC,
              fontWeight: 800,
              boxShadow: "0 6px 16px rgba(0,0,0,0.22)",
              flexShrink: 0,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>

          {/* Minimize — collapses to the floating circle */}
          <button
            type="button"
            onClick={() => setMinimized(true)}
            aria-label="Minimize quick add"
            className="flex items-center justify-center transition-opacity hover:opacity-90"
            style={{
              width: 28,
              height: 28,
              borderRadius: 999,
              color: "#fff",
              opacity: 0.55,
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
