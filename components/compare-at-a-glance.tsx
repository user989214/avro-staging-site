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
          gridTemplateColumns: "repeat(3, 1fr)",
          columnGap: 16,
          alignItems: "stretch",
        }}
      >
        {COLS.map((col, i) => (
          <div
            key={col.key}
            style={{
              backgroundColor: col.color,
              borderRadius: 24,
              padding: "28px 22px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 22,
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(14px)",
              transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${i * 120}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${i * 120}ms`,
            }}
          >
            {/* Formula name */}
            <span
              style={{
                fontFamily: GC,
                fontWeight: 800,
                fontSize: 22,
                letterSpacing: "-0.01em",
                color: "var(--ink)",
              }}
            >
              {col.name}
            </span>

            {/* Each row's value as a stacked block */}
            {ROWS.map((row, rIdx) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  opacity: shown ? 1 : 0,
                  transform: shown ? "translateY(0)" : "translateY(8px)",
                  transition: `opacity 500ms ease ${300 + i * 120 + rIdx * 70}ms, transform 500ms ease ${300 + i * 120 + rIdx * 70}ms`,
                }}
              >
                <span
                  style={{
                    fontFamily: GC,
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(30,29,24,0.55)",
                  }}
                >
                  {row.label}
                </span>
                <span
                  style={{
                    fontFamily: GC,
                    fontWeight: 600,
                    fontSize: 15,
                    color: "var(--ink)",
                    lineHeight: 1.35,
                  }}
                >
                  {row[col.key]}
                </span>
              </div>
            ))}

            {/* CTA */}
            <Link
              href={col.href}
              style={{
                marginTop: 6,
                fontFamily: GC,
                fontWeight: 700,
                fontSize: 13,
                padding: "12px 20px",
                borderRadius: 999,
                backgroundColor: "var(--charcoal)",
                color: "var(--bone)",
                textDecoration: "none",
                textAlign: "center",
                alignSelf: "stretch",
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
