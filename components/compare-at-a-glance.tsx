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

const GRID = "minmax(140px, 1.1fr) repeat(3, 1fr)"

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
          marginBottom: 36,
          maxWidth: 720,
        }}
      >
        Compare at a glance
      </h2>

      {/* ---------- HEADER ROW (colored pills) ---------- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: GRID,
          columnGap: 12,
          alignItems: "stretch",
          marginBottom: 8,
        }}
      >
        <div />
        {COLS.map((col, i) => (
          <div
            key={col.key}
            style={{
              backgroundColor: col.color,
              borderRadius: 14,
              minHeight: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${i * 120}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${i * 120}ms`,
            }}
          >
            <span
              style={{
                fontFamily: GC,
                fontWeight: 800,
                fontSize: 18,
                letterSpacing: "-0.01em",
                color: "var(--ink)",
              }}
            >
              {col.name}
            </span>
          </div>
        ))}
      </div>

      {/* ---------- DATA ROWS ---------- */}
      {ROWS.map((row, rIdx) => (
        <div
          key={row.label}
          style={{
            display: "grid",
            gridTemplateColumns: GRID,
            columnGap: 12,
            alignItems: "center",
            minHeight: 68,
            paddingTop: 14,
            paddingBottom: 14,
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(8px)",
            transition: `opacity 500ms ease ${380 + rIdx * 80}ms, transform 500ms ease ${380 + rIdx * 80}ms`,
          }}
        >
          <div style={{ paddingLeft: 4 }}>
            <span
              style={{
                fontFamily: GC,
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--warm-gray)",
              }}
            >
              {row.label}
            </span>
          </div>

          {COLS.map((col) => (
            <div
              key={col.key}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "0 12px",
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
                {row[col.key]}
              </span>
            </div>
          ))}
        </div>
      ))}

      {/* ---------- CTA ROW ---------- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: GRID,
          columnGap: 12,
          alignItems: "center",
          marginTop: 20,
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 600ms ease 720ms, transform 600ms ease 720ms",
        }}
      >
        <div />
        {COLS.map((col) => (
          <div
            key={col.key}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
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
                whiteSpace: "nowrap",
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
