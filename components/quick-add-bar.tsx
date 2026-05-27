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
}

export function QuickAddBar({ formulaKey, triggerSelector = "[data-quick-add-trigger]" }: QuickAddBarProps) {
  const { addItem, openCart } = useCart()
  const formula = formulas[formulaKey]
  const stickImg = stickImageFor(formulaKey)

  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const triggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    triggerRef.current = document.querySelector(triggerSelector)
    const onScroll = () => {
      if (dismissed) return
      const trigger = triggerRef.current
      if (!trigger) {
        // Fallback: reveal after 600px scroll
        setVisible(window.scrollY > 600)
        return
      }
      const rect = trigger.getBoundingClientRect()
      // Reveal when the bottom of the ingredients section has scrolled above the viewport bottom
      setVisible(rect.bottom < window.innerHeight - 80)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [triggerSelector, dismissed])

  const handleAdd = () => {
    addItem(formula as never, "bundle")
    openCart()
  }

  if (dismissed) return null

  const bundlePrice = (formula.bundlePrice * 0.75).toFixed(2)

  return (
    <div
      aria-hidden={!visible}
      className="fixed inset-x-0 bottom-0 z-40 pointer-events-none flex justify-center px-4 pb-4 sm:pb-6"
      style={{
        transform: visible ? "translateY(0)" : "translateY(120%)",
        opacity: visible ? 1 : 0,
        transition: "transform 360ms cubic-bezier(0.22,1,0.36,1), opacity 240ms ease-out",
      }}
    >
      {minimized ? (
        <button
          type="button"
          onClick={() => setMinimized(false)}
          aria-label="Expand quick add"
          className="pointer-events-auto flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
          style={{
            width: 56,
            height: 56,
            borderRadius: 999,
            backgroundColor: formula.color,
            color: "#fff",
            boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
            fontFamily: GC,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M7 14l5-5 5 5" />
          </svg>
        </button>
      ) : (
        <div
          role="region"
          aria-label="Quick add to cart"
          className="pointer-events-auto w-full"
          style={{
            maxWidth: 1200,
            backgroundColor: formula.color,
            color: "#fff",
            borderRadius: 999,
            padding: "10px 14px 10px 10px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxShadow: "0 18px 48px rgba(0,0,0,0.22)",
            fontFamily: GC,
          }}
        >
          {/* Product thumbnail tile (rounded inside the pill, like an oversized flavor pill icon) */}
          <div
            className="flex-shrink-0 flex items-center justify-center"
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.14)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={stickImg.src}
              alt=""
              className="object-contain"
              style={{ height: 48, width: "auto" }}
            />
          </div>

          {/* Copy */}
          <div className="flex-1 min-w-0 flex flex-col leading-tight">
            <span
              className="truncate"
              style={{ fontFamily: GC, fontWeight: 800, fontSize: 15, letterSpacing: "0.01em" }}
            >
              {formula.name} · {formula.flavor}
            </span>
            <span
              className="truncate"
              style={{ fontFamily: GC, fontWeight: 500, fontSize: 12.5, color: "rgba(255,255,255,0.78)" }}
            >
              Subscribe ${bundlePrice} · ships free over $50
            </span>
          </div>

          {/* Quick select (subscribe) — secondary white pill */}
          <button
            type="button"
            onClick={handleAdd}
            className="hidden sm:inline-flex items-center justify-center transition-colors"
            style={{
              fontFamily: GC,
              fontWeight: 800,
              fontSize: 13,
              minHeight: 44,
              padding: "0 18px",
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.14)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.28)",
            }}
          >
            Subscribe
          </button>

          {/* Quick add — primary circular CTA */}
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Quick add ${formula.name} to cart`}
            className="qa-add flex items-center justify-center transition-transform hover:scale-[1.03] active:scale-95"
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              backgroundColor: "#fff",
              color: formula.color,
              fontFamily: GC,
              fontWeight: 800,
              boxShadow: "0 6px 16px rgba(0,0,0,0.18)",
              flexShrink: 0,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>

          {/* Minimize (down arrow) */}
          <button
            type="button"
            onClick={() => setMinimized(true)}
            aria-label="Minimize quick add"
            className="hidden sm:flex items-center justify-center transition-opacity"
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              color: "#fff",
              opacity: 0.55,
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M7 10l5 5 5-5" />
            </svg>
          </button>

          {/* Dismiss (lower opacity by design) */}
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="flex items-center justify-center transition-opacity hover:opacity-90"
            style={{
              width: 28,
              height: 28,
              borderRadius: 999,
              color: "#fff",
              opacity: 0.4,
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
