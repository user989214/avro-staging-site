"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const GC = "var(--font-grotesk)"

const CALM_COLOR = "#7B5FB0"
const FOCUS_COLOR = "#C44A8A"
const ENERGY_COLOR = "#E8C547"

const COLS = [
  { key: "calm", label: "Calm", color: CALM_COLOR, href: "/calm" },
  { key: "focus", label: "Focus", color: FOCUS_COLOR, href: "/focus" },
  { key: "energy", label: "Energy", color: ENERGY_COLOR, href: "/energy" },
] as const

type ColKey = (typeof COLS)[number]["key"]

const ROWS: { label: string; values: Record<ColKey, string> }[] = [
  {
    label: "Primary state",
    values: { calm: "Composure", focus: "Clear focus", energy: "Steady energy" },
  },
  {
    label: "Best for",
    values: {
      calm: "Travel, social calm, daily reset",
      focus: "Deep work, meetings, study",
      energy: "Mornings, long days, travel",
    },
  },
  {
    label: "Caffeine",
    values: { calm: "No", focus: "No", energy: "Yes, 120 mg natural" },
  },
  {
    label: "Key addition",
    values: {
      calm: "Magnesium Bisglycinate",
      focus: "Cognigrape",
      energy: "Natural caffeine",
    },
  },
]

export function CompareAtAGlance() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref}>
      <h2
        className="font-serif"
        style={{
          fontWeight: 900,
          fontSize: "clamp(32px,4.5vw,52px)",
          lineHeight: 1.02,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          textAlign: "left",
          marginBottom: 36,
          maxWidth: 720,
        }}
      >
        Compare at a glance
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(140px, 1.1fr) repeat(3, 1fr)",
          columnGap: 24,
          rowGap: 0,
          alignItems: "stretch",
        }}
      >
        {/* Row 1 — header: empty cell + animated colored bar + formula name */}
        <div />
        {COLS.map((col, i) => (
          <div key={col.key} style={{ paddingBottom: 20 }}>
            {/* animated colored bar */}
            <div
              style={{
                height: 6,
                borderRadius: 999,
                backgroundColor: col.color,
                transformOrigin: "left center",
                transform: inView ? "scaleX(1)" : "scaleX(0)",
                transition: `transform 700ms cubic-bezier(0.22,1,0.36,1) ${120 * i}ms`,
                marginBottom: 16,
              }}
            />
            {/* formula name */}
            <div
              style={{
                fontFamily: GC,
                fontWeight: 800,
                fontSize: 18,
                letterSpacing: "-0.01em",
                color: "var(--ink)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(8px)",
                transition: `opacity 500ms ease ${300 + 120 * i}ms, transform 500ms ease ${300 + 120 * i}ms`,
              }}
            >
              {col.label}
            </div>
          </div>
        ))}

        {/* Data rows */}
        {ROWS.map((row, rIdx) => (
          <RowFragment
            key={row.label}
            row={row}
            inView={inView}
            rIdx={rIdx}
          />
        ))}

        {/* CTA row */}
        <div />
        {COLS.map((col, i) => (
          <div
            key={col.key}
            style={{
              paddingTop: 28,
              display: "flex",
              justifyContent: "center",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(8px)",
              transition: `opacity 500ms ease ${800 + 120 * i}ms, transform 500ms ease ${800 + 120 * i}ms`,
            }}
          >
            <Link
              href={col.href}
              style={{
                fontFamily: GC,
                fontWeight: 700,
                fontSize: 13,
                padding: "12px 28px",
                borderRadius: 999,
                backgroundColor: "var(--charcoal)",
                color: "var(--bone)",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
            >
              Shop {col.label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

function RowFragment({
  row,
  inView,
  rIdx,
}: {
  row: { label: string; values: Record<ColKey, string> }
  inView: boolean
  rIdx: number
}) {
  const baseDelay = 500 + rIdx * 90

  return (
    <>
      {/* row label */}
      <div
        style={{
          padding: "18px 0",
          borderTop: "1px solid var(--divider)",
          display: "flex",
          alignItems: "center",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(8px)",
          transition: `opacity 500ms ease ${baseDelay}ms, transform 500ms ease ${baseDelay}ms`,
        }}
      >
        <span
          style={{
            fontFamily: GC,
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--warm-gray)",
          }}
        >
          {row.label}
        </span>
      </div>

      {/* values */}
      {COLS.map((col, i) => (
        <div
          key={col.key}
          style={{
            padding: "18px 12px",
            borderTop: "1px solid var(--divider)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(8px)",
            transition: `opacity 500ms ease ${baseDelay + 80 + i * 60}ms, transform 500ms ease ${baseDelay + 80 + i * 60}ms`,
          }}
        >
          <span
            style={{
              fontFamily: GC,
              fontWeight: 600,
              fontSize: 14,
              color: "var(--ink)",
              lineHeight: 1.4,
            }}
          >
            {row.values[col.key]}
          </span>
        </div>
      ))}
    </>
  )
}
