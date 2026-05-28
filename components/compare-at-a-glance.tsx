"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const GC = '"DM Sans", system-ui, sans-serif'

type Formula = {
  name: "Calm" | "Focus" | "Energy"
  href: string
  accent: string
  ink: string
  primaryState: string
  bestFor: string
  caffeine: string
  keyAddition: string
}

const FORMULAS: Formula[] = [
  {
    name: "Calm",
    href: "/calm",
    accent: "#94C6D4",
    ink: "var(--charcoal)",
    primaryState: "Composure",
    bestFor: "Travel, social calm, daily reset",
    caffeine: "No",
    keyAddition: "Magnesium Bisglycinate",
  },
  {
    name: "Focus",
    href: "/focus",
    accent: "#94C6D4",
    ink: "var(--charcoal)",
    primaryState: "Clear focus",
    bestFor: "Deep work, meetings, study",
    caffeine: "No",
    keyAddition: "Cognigrape",
  },
  {
    name: "Energy",
    href: "/energy",
    accent: "#94C6D4",
    ink: "var(--charcoal)",
    primaryState: "Steady energy",
    bestFor: "Mornings, long days, travel",
    caffeine: "Yes, 120 mg natural",
    keyAddition: "Natural caffeine",
  },
]

const ATTRIBUTES: { key: keyof Pick<Formula, "primaryState" | "bestFor" | "caffeine" | "keyAddition">; label: string }[] = [
  { key: "primaryState", label: "Primary state" },
  { key: "bestFor", label: "Best for" },
  { key: "caffeine", label: "Caffeine" },
  { key: "keyAddition", label: "Key addition" },
]

export function CompareAtAGlance() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.18 }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref}>
      <style>{`
        @keyframes cag-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cag-row-in {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .cag-card {
          opacity: 0;
        }
        .cag-card.in {
          animation: cag-fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .cag-row {
          opacity: 0;
        }
        .cag-row.in {
          animation: cag-row-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .cag-card-inner {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease;
        }
        .cag-card-inner:hover {
          transform: translateY(-4px);
        }
        .cag-cta {
          transition: background-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }
        .cag-cta:hover {
          transform: translateY(-1px);
        }
      `}</style>

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
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {FORMULAS.map((f, i) => (
          <div
            key={f.name}
            className={`cag-card ${visible ? "in" : ""}`}
            style={{
              animationDelay: `${i * 120}ms`,
            }}
          >
            <div
              className="cag-card-inner"
              style={{
                backgroundColor: "var(--bone)",
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid rgba(30,29,24,0.08)",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {/* Accent header */}
              <div
                style={{
                  backgroundColor: f.accent,
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <span
                  className="font-serif"
                  style={{
                    fontWeight: 900,
                    fontSize: 26,
                    letterSpacing: "-0.02em",
                    color: f.ink,
                    lineHeight: 1,
                  }}
                >
                  {f.name}
                </span>
                <span
                  style={{
                    fontFamily: GC,
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: f.ink,
                    opacity: 0.7,
                  }}
                >
                  0{i + 1}
                </span>
              </div>

              {/* Attribute rows */}
              <div style={{ padding: "8px 24px", flex: 1 }}>
                {ATTRIBUTES.map((attr, ri) => (
                  <div
                    key={attr.key}
                    className={`cag-row ${visible ? "in" : ""}`}
                    style={{
                      animationDelay: `${i * 120 + 200 + ri * 80}ms`,
                      padding: "16px 0",
                      borderBottom:
                        ri < ATTRIBUTES.length - 1
                          ? "1px solid rgba(30,29,24,0.08)"
                          : "none",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: GC,
                        fontWeight: 700,
                        fontSize: 11,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "var(--warm-gray)",
                        marginBottom: 6,
                      }}
                    >
                      {attr.label}
                    </div>
                    <div
                      style={{
                        fontFamily: GC,
                        fontWeight: 600,
                        fontSize: 15,
                        color: "var(--ink)",
                        lineHeight: 1.4,
                      }}
                    >
                      {f[attr.key]}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ padding: "16px 24px 24px" }}>
                <Link
                  href={f.href}
                  className="cag-cta"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: GC,
                    fontWeight: 700,
                    fontSize: 14,
                    padding: "14px 20px",
                    borderRadius: 999,
                    backgroundColor: "var(--charcoal)",
                    color: "var(--bone)",
                    textDecoration: "none",
                    width: "100%",
                  }}
                >
                  Shop {f.name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
