"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const GC = "var(--font-good-centra)"

type Row = { label: string; calm: string; focus: string; energy: string }

const ROWS: Row[] = [
  { label: "Primary state", calm: "Composure", focus: "Clear focus", energy: "Steady energy" },
  { label: "Best for", calm: "Travel, social calm, daily reset", focus: "Deep work, meetings, study", energy: "Mornings, long days, travel" },
  { label: "Caffeine", calm: "No", focus: "No", energy: "Yes, 120 mg natural" },
  { label: "Key addition", calm: "Magnesium Bisglycinate", focus: "Cognigrape", energy: "Natural caffeine" },
]

const COLS = [
  { key: "calm" as const, name: "Calm", color: "var(--calm)", href: "/calm" },
  { key: "focus" as const, name: "Focus", color: "var(--focus)", href: "/focus" },
  { key: "energy" as const, name: "Energy", color: "var(--energy)", href: "/energy" },
]

export function CompareAtAGlance() {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.2 },
    )
    obs.observe(ref.current)
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
        }}
      >
        {/* Header row: empty cell + animated color bar + name */}
        <div />
        {COLS.map((col, i) => (
          <div
            key={col.key}
            style={{
              padding: "0 18px 20px 18px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div
              style={{
                width: shown ? "100%" : 0,
                height: 6,
                borderRadius: 999,
                backgroundColor: col.color,
                transition: `width 700ms cubic-bezier(0.22,1,0.36,1) ${i * 120}ms`,
              }}
            />
            <span
              style={{
                fontFamily: GC,
                fontWeight: 800,
                fontSize: 18,
                letterSpacing: "-0.01em",
                color: "var(--ink)",
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(6px)",
                transition: `opacity 500ms ease ${250 + i * 120}ms, transform 500ms ease ${250 + i * 120}ms`,
              }}
            >
              {col.name}
            </span>
          </div>
        ))}

        {/* Data rows */}
        {ROWS.map((row, rIdx) => {
          const baseDelay = 400 + rIdx * 90
          return (
            <RowFragment key={row.label} row={row} baseDelay={baseDelay} shown={shown} />
          )
        })}

        {/* CTA row */}
        <div style={{ borderTop: "1px solid var(--divider)", padding: "22px 0" }} />
        {COLS.map((col, i) => (
          <div
            key={`cta-${col.key}`}
            style={{
              borderTop: "1px solid var(--divider)",
              padding: "22px 18px",
              display: "flex",
              alignItems: "center",
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(6px)",
              transition: `opacity 500ms ease ${800 + i * 80}ms, transform 500ms ease ${800 + i * 80}ms`,
            }}
          >
            <Link
              href={col.href}
              style={{
                fontFamily: GC,
                fontWeight: 700,
                fontSize: 13,
                padding: "10px 22px",
                borderRadius: 999,
                backgroundColor: "var(--charcoal)",
                color: "var(--bone)",
                textDecoration: "none",
              }}
            >
              Shop {col.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

function RowFragment({
  row,
  baseDelay,
  shown,
}: {
  row: Row
  baseDelay: number
  shown: boolean
}) {
  return (
    <>
      <div
        style={{
          borderTop: "1px solid var(--divider)",
          padding: "20px 0",
          display: "flex",
          alignItems: "center",
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(6px)",
          transition: `opacity 500ms ease ${baseDelay}ms, transform 500ms ease ${baseDelay}ms`,
        }}
      >
        <span
          style={{
            fontFamily: GC,
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--warm-gray)",
          }}
        >
          {row.label}
        </span>
      </div>
      {(["calm", "focus", "energy"] as const).map((k, i) => (
        <div
          key={k}
          style={{
            borderTop: "1px solid var(--divider)",
            padding: "20px 18px",
            display: "flex",
            alignItems: "center",
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(6px)",
            transition: `opacity 500ms ease ${baseDelay + (i + 1) * 70}ms, transform 500ms ease ${baseDelay + (i + 1) * 70}ms`,
          }}
        >
          <span
            style={{
              fontFamily: GC,
              fontWeight: 600,
              fontSize: 15,
              color: "var(--ink)",
              lineHeight: 1.4,
            }}
          >
            {row[k]}
          </span>
        </div>
      ))}
    </>
  )
}
