"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { formulas, type FormulaKey, sharedProof, testimonials } from "@/lib/data"
import { Icon } from "@/components/icons"

const GC = '"DM Sans", system-ui, sans-serif'
const BLUE = "#94C6D4"

// ── FORMULA GRAPH (scroll-triggered) ──────────────────────────────────────────
function FormulaGraph() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const formulas = [
    { name: "Calm", segments: [{ color: BLUE, width: 70, label: "PharmaGABA®" }, { color: "#C9B8E8", width: 30, label: "Magnesium" }] },
    { name: "Focus", segments: [{ color: BLUE, width: 60, label: "PharmaGABA®" }, { color: "#A8D5BA", width: 40, label: "Cognigrape®" }] },
    { name: "Energy", segments: [{ color: BLUE, width: 55, label: "PharmaGABA®" }, { color: "#F5C896", width: 45, label: "Caffeine" }] },
  ]

  return (
    <div ref={ref} style={{ backgroundColor: "var(--bone)", borderRadius: 20, overflow: "hidden", padding: "clamp(24px,3vw,36px)", display: "flex", flexDirection: "column", height: "100%" }}>
      <h2 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(22px,2.4vw,30px)", lineHeight: 1.05, color: "var(--charcoal)", marginBottom: 8 }}>
        Every formula starts calm first.
      </h2>
      <p style={{ fontFamily: GC, fontWeight: 400, fontSize: 13, lineHeight: 1.45, color: "rgba(0,0,0,0.55)", marginBottom: 24 }}>
        Same calm-first base. Different active addition.
      </p>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
        {formulas.map((formula, idx) => (
          <div key={formula.name} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
              <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 16, color: "var(--charcoal)", letterSpacing: "-0.01em" }}>{formula.name}</span>
              <span style={{ fontFamily: GC, fontWeight: 500, fontSize: 11, color: "rgba(0,0,0,0.45)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {formula.segments.map((s) => s.label).join(" + ")}
              </span>
            </div>
            <div style={{ display: "flex", gap: 4, height: 14 }}>
              {formula.segments.map((seg, segIdx) => {
                const delay = idx * 0.25 + segIdx * 0.2
                return (
                  <div
                    key={segIdx}
                    style={{
                      flex: `${seg.width} 0 0`,
                      backgroundColor: seg.color,
                      borderRadius: 999,
                      transformOrigin: "left",
                      transform: visible ? "scaleX(1)" : "scaleX(0)",
                      opacity: visible ? 1 : 0,
                      transition: `transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, opacity 0.7s ease ${delay}s`,
                      willChange: "transform, opacity",
                    }}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap", paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        {[
          { color: BLUE, label: "PharmaGABA®" },
          { color: "#C9B8E8", label: "Magnesium" },
          { color: "#A8D5BA", label: "Cognigrape®" },
          { color: "#F5C896", label: "Caffeine" },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: item.color }} />
            <span style={{ fontFamily: GC, fontWeight: 600, fontSize: 11, color: "rgba(0,0,0,0.6)" }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── HERO ──────────────────────────────────────────────────────────────────────
export function HomeRefHero() {
  const [progress, setProgress] = useState(0) // 0 = full-bleed, 1 = docked

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        const max = 520 // px of scroll to fully dock — longer for smoother feel
        const raw = Math.max(0, Math.min(1, y / max))
        // Ease in/out cubic for buttery transition
        const eased = raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2
        setProgress(eased)
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Lerp helpers
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t

  // Section outer padding goes from 0 → normal as you scroll
  const sectionPadX = lerp(0, 64, progress)
  const sectionPadTop = lerp(0, 96, progress)
  const sectionPadBottom = lerp(0, 80, progress)
  const radius = lerp(0, 28, progress)
  const imgScale = lerp(1.06, 1.0, progress)
  // Compact enough so headline + lede + CTAs all fit on first load above the fold
  const heroMinH = `clamp(560px, ${lerp(78, 56, progress)}vh, ${lerp(780, 680, progress)}px)`

  return (
    <section
      style={{
        width: "100%",
        backgroundColor: "var(--base)",
        color: "var(--ink)",
        paddingLeft: `clamp(${lerp(0, 20, progress)}px, ${5 * progress}vw, ${sectionPadX}px)`,
        paddingRight: `clamp(${lerp(0, 20, progress)}px, ${5 * progress}vw, ${sectionPadX}px)`,
        paddingTop: `clamp(${lerp(0, 48, progress)}px, ${7 * progress}vw, ${sectionPadTop}px)`,
        paddingBottom: `clamp(${lerp(0, 48, progress)}px, ${6 * progress}vw, ${sectionPadBottom}px)`,
        transition: "padding 0.2s ease-out",
      }}
    >
      <style>{`
        @keyframes hp-rise {
          0% { opacity: 0; transform: translateY(28px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes hp-fade {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .hp-line { display: block; opacity: 0; transform: translateY(28px); animation: hp-rise 0.9s cubic-bezier(0.22,1,0.36,1) forwards; }
        .hp-line-1 { animation-delay: 0.10s; }
        .hp-line-2 { animation-delay: 0.40s; }
        .hp-line-3 { animation-delay: 0.70s; }
        .hp-fade-in { opacity: 0; animation: hp-fade 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .hp-lede { animation-delay: 1.15s; }
        .hp-cta-row { animation-delay: 1.55s; }
        @media (prefers-reduced-motion: reduce) {
          .hp-line, .hp-fade-in { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
        .hp-pill-primary, .hp-pill-secondary {
          flex: 1 1 180px;
          min-width: 180px;
        }
        @media (max-width: 640px) {
          .hp-pill-row { flex-direction: column; align-items: stretch; max-width: 320px !important; }
          .hp-pill-primary, .hp-pill-secondary { width: 100%; flex: 0 0 auto; }
        }
        @media (max-width: 768px) {
          .hp-hero-container { min-height: 640px !important; }
          .hp-hero-grid {
            grid-template-columns: 1fr !important;
            align-items: start !important;
            padding: clamp(32px,7vw,56px) clamp(20px,5vw,28px) !important;
          }
          .hp-hero-img { object-position: 65% 80% !important; }
          .hp-hero-fade {
            background: linear-gradient(180deg, var(--base-light) 0%, var(--base-light) 42%, rgba(245,241,234,0.92) 50%, rgba(245,241,234,0.55) 62%, rgba(245,241,234,0) 78%) !important;
          }
        }
        .hp-pill-primary {
          background-color: var(--charcoal);
          color: var(--bone);
          border: 2px solid var(--charcoal);
          border-radius: 999px;
          transition: background-color .2s ease, color .2s ease;
        }
        .hp-pill-primary:hover {
          background-color: transparent;
          color: var(--charcoal);
        }
        .hp-pill-secondary {
          background-color: var(--charcoal);
          color: var(--bone);
          border: 2px solid var(--charcoal);
          border-radius: 999px;
          transition: background-color .2s ease, color .2s ease;
        }
        .hp-pill-secondary:hover {
          background-color: transparent;
          color: var(--charcoal);
        }
        .hp-btn-black {
          transition: background-color .2s ease, color .2s ease;
        }
        .hp-btn-black:hover {
          background-color: transparent !important;
          color: var(--charcoal) !important;
        }
        .hp-btn-blue {
          transition: background-color .2s ease, color .2s ease;
        }
        .hp-btn-blue:hover {
          background-color: transparent !important;
          color: var(--avro-blue) !important;
        }
        .hp-btn-outline-light {
          transition: background-color .2s ease, color .2s ease;
        }
        .hp-btn-outline-light:hover {
          background-color: #fff !important;
          color: var(--charcoal) !important;
        }
        .hp-btn-bone {
          transition: background-color .2s ease, color .2s ease;
        }
        .hp-btn-bone:hover {
          background-color: transparent !important;
          color: var(--bone) !important;
        }
        .moment-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .moment-card:hover { transform: translateY(-3px); }
        .moment-card img { transition: transform 0.5s ease, filter 0.4s ease; filter: grayscale(100%); }
        .moment-card:hover img { transform: scale(1.04); filter: grayscale(0%); }
      `}</style>

      <div
        className="hp-hero-container"
        style={{
          position: "relative",
          maxWidth: lerp(2000, 1320, progress),
          margin: "0 auto",
          borderRadius: radius,
          overflow: "hidden",
          backgroundColor: "var(--base-light)",
          minHeight: heroMinH,
          transition: "border-radius 0.2s ease-out, max-width 0.2s ease-out, min-height 0.2s ease-out",
        }}
      >
        {/* Background image — full container */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4325552255-51euqtVRTaIeU2n0sGSiBvq4vuvEFe.png"
          alt="AVRO Energy stick packet next to a glass of green juice at an outdoor brunch"
          className="hp-hero-img"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "right center",
            transform: "none",
            transition: "transform 0.2s ease-out",
          }}
        />

        {/* Gradient overlay — wraps all four edges so the rectangular image border dissolves into the cream */}
        <div
          aria-hidden="true"
          className="hp-hero-fade"
          style={{
            position: "absolute",
            inset: 0,
            background: `
              linear-gradient(to right, var(--base-light) 0%, var(--base-light) 46%, rgba(245,241,234,0.98) 54%, rgba(245,241,234,0.78) 62%, rgba(245,241,234,0.4) 72%, rgba(245,241,234,0.18) 82%, rgba(245,241,234,0.35) 92%, var(--base-light) 100%),
              linear-gradient(to bottom, var(--base-light) 0%, rgba(245,241,234,0.4) 8%, rgba(245,241,234,0) 18%, rgba(245,241,234,0) 82%, rgba(245,241,234,0.4) 92%, var(--base-light) 100%)
            `,
            pointerEvents: "none",
          }}
        />

        {/* Content grid sits on top */}
        <div
          className="hp-hero-grid"
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1.05fr 1fr",
            alignItems: "center",
            gap: "clamp(32px,5vw,72px)",
            padding: "clamp(36px,5vw,64px) clamp(28px,5vw,64px)",
            minHeight: "inherit",
          }}
        >
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Hero headline — DM Sans per design system */}
          <h1
            style={{
              fontFamily: GC,
              fontSize: "clamp(40px,5vw,68px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              marginBottom: 24,
              maxWidth: 600,
              fontWeight: 700,
            }}
          >
            <span className="hp-line hp-line-1">Calm first.</span>
            <span className="hp-line hp-line-2">Clear headed.</span>
            <span className="hp-line hp-line-3">Ready when pressure rises.</span>
          </h1>

          {/* Lede — DM Sans, body LG */}
          <p
            className="hp-fade-in hp-lede"
            style={{
              fontFamily: GC,
              fontWeight: 400,
              fontSize: "clamp(16px,1.4vw,18px)",
              lineHeight: 1.55,
              color: "var(--warm-gray)",
              maxWidth: 520,
              marginBottom: 36,
            }}
          >
            Functional supplements formulated around naturally fermented PharmaGABA®. State control, not stimulation —
            so you can show up calm, clear, and ready for what matters.
          </p>

          <div className="hp-pill-row hp-fade-in hp-cta-row" style={{ display: "flex", flexWrap: "wrap", gap: 12, maxWidth: 520 }}>
            <a
              href="/shop"
              className="hp-pill-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: GC,
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: "-0.005em",
                minHeight: 48,
                padding: "0 28px",
                textDecoration: "none",
              }}
            >
              Shop AVRO →
            </a>
            <a
              href="/science"
              className="hp-pill-secondary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: GC,
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: "-0.005em",
                minHeight: 48,
                padding: "0 28px",
                textDecoration: "none",
              }}
            >
              Learn the Science
            </a>
          </div>
        </div>

          {/* Right column intentionally empty — image is the container background */}
          <div aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

// ── PROOF BAR ──────────────────────��──────────────────────────────────────────
export function HomeProofBar() {
  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "clamp(32px,5vw,56px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1250, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "2px solid rgba(0,0,0,0.12)", borderRadius: 24, overflow: "hidden" }}>
        {sharedProof.map((item, i) => (
          <div
            key={item.label}
            style={{ padding: "clamp(20px,3vw,36px) clamp(16px,3vw,32px)", textAlign: "center", borderLeft: i > 0 ? "2px solid rgba(0,0,0,0.12)" : "none" }}
          >
            <strong style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(28px,3.5vw,48px)", lineHeight: 1.0, color: "var(--ink)", display: "block" }}>{item.stat}</strong>
            <span style={{ fontFamily: GC, fontWeight: 500, fontSize: "clamp(15px,1.4vw,18px)", color: "rgba(0,0,0,0.6)", marginTop: 6, display: "block" }}>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── BENEFIT ROW ───────────────────��───────────────────────────────────────────
export function HomeBenefitRow() {
  const benefits = [
    { title: "Supports composure under pressure", copy: "Helps you steady first before the moment matters." },
    { title: "Supports clear-headed readiness", copy: "Helps you feel calm, clear, and in control." },
    { title: "Supports calm without sedation", copy: "Designed to support composure without turning you off." },
  ]

  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "0 clamp(20px,5vw,64px) clamp(48px,6vw,72px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 16 }}>
        {benefits.map((b) => (
          <div key={b.title} style={{ backgroundColor: BLUE, borderRadius: 24, padding: "clamp(28px,3vw,36px)", display: "flex", flexDirection: "column", gap: 12, minHeight: 200 }}>
            <h3 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(20px,1.8vw,24px)", lineHeight: 1.2, color: "var(--ink)", letterSpacing: "-0.01em" }}>
              {b.title}
            </h3>
            <p style={{ fontFamily: GC, fontWeight: 400, fontSize: "clamp(15px,1.2vw,17px)", lineHeight: 1.5, color: "rgba(0,0,0,0.65)" }}>
              {b.copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── LOGIC ROW ─────────────────────────────────────────────────────────────────
export function HomeLogicRow() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  const cards = [
    {
      title: "More energy is not always the answer.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      ),
      content: "Most products push stimulation. AVRO starts with calm, because calm helps create the conditions for clarity, composure, and readiness."
    },
    {
      title: "Performance starts with state.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
        </svg>
      ),
      content: "AVRO is built to support the state before the moment. Calm creates the foundation for clarity and readiness when it counts."
    },
    {
      title: "Calm first, then clarity.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 8C8 10 5.9 16.17 3.82 19.12A1 1 0 0 0 4.69 20.7C7.14 20.1 11.75 18.5 14 16c2.5-2.77 2.87-6.12 3-8-.5.25-2.25.75-3 0z"/>
        </svg>
      ),
      content: "Every AVRO formula starts with naturally fermented PharmaGABA®. It's the calm-first foundation that makes everything else work better."
    },
  ]

  const comparisonRows = [
    ["Push harder", "Settle first"],
    ["More intensity", "More control"],
    ["Spike and crash", "Steady state"],
    ["Noise", "Clarity"],
  ]

  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        {/* Outer container card */}
        <div style={{ backgroundColor: "var(--base-light)", borderRadius: 28, padding: "clamp(24px,4vw,48px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: 24 }}>
            {/* Accordion cards column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <h2 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(26px,3vw,40px)", lineHeight: 1.05, color: "var(--ink)", marginBottom: 12 }}>
                The calm-first approach.
              </h2>
              {cards.map((card, i) => (
                <div
                  key={card.title}
                  style={{
                    backgroundColor: "var(--bone)",
                    borderRadius: 16,
                    overflow: "hidden",
                    transition: "all 0.25s ease",
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: "20px 24px",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 999,
                        border: "2px solid var(--charcoal)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        backgroundColor: openIndex === i ? "var(--charcoal)" : "transparent",
                        color: openIndex === i ? "var(--bone)" : "var(--charcoal)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {card.icon}
                    </div>
                    <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 18, color: "var(--ink)", flex: 1 }}>
                      {card.title}
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.25s ease",
                        color: "var(--ink)",
                      }}
                    >
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                  <div
                    style={{
                      maxHeight: openIndex === i ? 200 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.3s ease",
                    }}
                  >
                    <p style={{ 
                      padding: "0 24px 24px 84px", 
                      fontFamily: GC, 
                      fontWeight: 400, 
                      fontSize: 16, 
                      lineHeight: 1.55, 
                      color: "rgba(0,0,0,0.6)",
                      margin: 0,
                    }}>
                      {card.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison table */}
            <div style={{ backgroundColor: "var(--bone)", borderRadius: 20, overflow: "hidden", border: "2px solid rgba(0,0,0,0.08)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <div style={{ padding: "20px 24px", fontFamily: GC, fontWeight: 700, fontSize: 18, color: "rgba(0,0,0,0.4)", borderBottom: "2px solid rgba(0,0,0,0.08)", textAlign: "center" }}>Stimulant First</div>
                <div style={{ padding: "20px 24px", fontFamily: GC, fontWeight: 700, fontSize: 18, color: "var(--ink)", borderBottom: "2px solid rgba(0,0,0,0.08)", borderLeft: "2px solid rgba(0,0,0,0.08)", textAlign: "center", backgroundColor: BLUE }}>Calm First</div>
              </div>
              {comparisonRows.map(([left, right]) => (
                <div key={left} style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  <div style={{ padding: "20px 24px", fontFamily: GC, fontWeight: 700, fontSize: 18, color: "rgba(0,0,0,0.4)", borderTop: "1px solid rgba(0,0,0,0.06)" }}>{left}</div>
                  <div style={{ padding: "20px 24px", fontFamily: GC, fontWeight: 700, fontSize: 18, color: "var(--ink)", borderTop: "1px solid rgba(0,0,0,0.06)", borderLeft: "2px solid rgba(0,0,0,0.08)", backgroundColor: "var(--base-light)" }}>{right}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── PRODUCT STRIP ─────────────────────────────────────────────────────────────
export function HomeProductStrip() {
  const formulaAdditions: Record<FormulaKey, string> = {
    calm: "Magnesium Bisglycinate",
    focus: "Cognigrape®",
    energy: "Natural Caffeine",
  }
  const socialImages: Record<FormulaKey, string> = {
    calm: "/images/lifestyle/tube-social-calm-blueberry-acai.png",
    focus: "/images/lifestyle/tube-tech-focus-pomegranate-raspberry.png",
    energy: "/images/lifestyle/tube-golf-energy-orange-tangerine.png",
  }

  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "clamp(40px,6vw,72px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        <h2 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(28px,3.6vw,48px)", lineHeight: 1.0, color: "var(--ink)", marginBottom: 32 }}>
          Three formulas. One foundation.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {(Object.keys(formulas) as FormulaKey[]).map((key) => (
            <div
              key={key}
              style={{ display: "flex", flexDirection: "column", borderRadius: 24, overflow: "hidden", backgroundColor: "var(--base-light)" }}
            >
              <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={socialImages[key]}
                  alt={`AVRO ${formulas[key].name}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                />
              </div>
              <div style={{ padding: "20px 20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                <span style={{ 
                  display: "inline-block",
                  alignSelf: "flex-start",
                  fontFamily: GC, 
                  fontWeight: 700, 
                  fontSize: 13, 
                  color: "var(--ink)", 
                  backgroundColor: BLUE,
                  padding: "8px 14px",
                  borderRadius: 999,
                }}>
                  PharmaGABA® + {formulaAdditions[key]}
                </span>
                <h3 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(22px,2vw,28px)", lineHeight: 1.1, color: "var(--ink)", marginTop: 4 }}>
                  {formulas[key].name}
                </h3>
                <p style={{ fontFamily: GC, fontWeight: 400, fontSize: 16, lineHeight: 1.45, color: "rgba(0,0,0,0.6)" }}>
                  {formulas[key].tagline}
                </p>
                <a 
                  href={`/${key}`}
                  className="hp-btn-black"
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    gap: 10, 
                    fontFamily: GC, 
                    fontWeight: 700, 
                    fontSize: 16, 
                    width: "100%",
                    minHeight: 48, 
                    padding: "0 20px", 
                    borderRadius: 999, 
                    border: "2px solid var(--charcoal)", 
                    backgroundColor: "var(--charcoal)", 
                    color: "var(--bone)",
                    textDecoration: "none",
                    marginTop: 8,
                  }}
                >
                  Explore {formulas[key].name}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
            max-width: 400px !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </section>
  )
}

// ── MOMENT GRID ───────────────────────────────────────────────────────────────
export function HomeMomentGrid() {
  const moments = [
    { title: "Golf", copy: "Before the first tee. Before the final putt.", cta: "Explore Golf", url: "/golf", image: "/images/lifestyle/golfers-misty-tee-box.jpg", alt: "Golfers on a misty tee box at sunrise" },
    { title: "Work", copy: "Before the meeting. Before deep work.", cta: "Explore Work", url: "/work", image: "/images/lifestyle/woman-journaling-mug.jpg", alt: "Calm morning routine with journal and warm mug" },
    { title: "Social", copy: "Show up present without alcohol.", cta: "Explore Social", url: "/social", image: "/images/lifestyle/coupes-grapefruit-stickpack.jpg", alt: "AVRO stickpack styled with grapefruit coupes on a bar" },
    { title: "Gaming", copy: "Before the session. Before the decision.", cta: "Explore Gaming", url: "/gaming", image: "/images/lifestyle/focus-iced-drink-headphones.jpg", alt: "Iced AVRO drink and headphones at a gaming desk" },
  ]

  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        <h2 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(28px,3.6vw,48px)", lineHeight: 1.0, color: "var(--ink)", marginBottom: 32 }}>
          Built for pressure sensitive moments.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {moments.map((m) => (
            <a key={m.title} href={m.url} className="moment-card" style={{ display: "flex", flexDirection: "column", textDecoration: "none", borderRadius: 24, overflow: "hidden", backgroundColor: "var(--base-light)" }}>
              <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.image} alt={m.alt} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "24px 24px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(22px,2vw,30px)", lineHeight: 1.0, color: "var(--ink)", marginBottom: 10 }}>{m.title}</h3>
                <p style={{ fontFamily: GC, fontWeight: 400, fontSize: 17, lineHeight: 1.45, color: "rgba(0,0,0,0.6)", marginBottom: 20, flex: 1 }}>{m.copy}</p>
                <span className="hp-btn-black" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: GC, fontWeight: 700, fontSize: 16, minHeight: 48, padding: "0 28px", borderRadius: 999, border: "2px solid var(--charcoal)", backgroundColor: "var(--charcoal)", color: "var(--bone)" }}>
                  {m.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 1024px) {
          div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

// ── SCIENCE GRID ─────────────────────�����───────────────────────���───────────────
export function HomeScienceGrid() {
  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        {/* Card section with base-light background */}
        <div style={{ backgroundColor: "var(--base-light)", borderRadius: 28, padding: "clamp(24px,4vw,48px)", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))", gap: 20 }}>
            {/* Why GABA card - flat bone */}
            <div style={{ backgroundColor: "var(--bone)", borderRadius: 20, padding: "clamp(28px,4vw,44px)" }}>
              <h2 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(26px,3vw,40px)", lineHeight: 1.0, color: "var(--charcoal)", marginBottom: 16 }}>
                Why GABA matters.
              </h2>
              <p style={{ fontFamily: GC, fontWeight: 400, fontSize: "clamp(16px,1.3vw,18px)", lineHeight: 1.55, color: "rgba(0,0,0,0.6)", marginBottom: 28 }}>
                GABA is a naturally occurring compound associated with relaxation and balance. AVRO uses naturally fermented PharmaGABA® as the foundation of every formula.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
                {[["Naturally Fermented", "flask"], ["Calm First", "leaf"], ["In Every Formula", "shield"]].map(([label, _icon], i) => (
                  <React.Fragment key={`gaba-${i}`}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center" }}>
                      <div style={{ width: 56, height: 56, backgroundColor: "var(--base)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--charcoal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          {i === 0 && <><path d="M9 3H5a2 2 0 0 0-2 2v4"/><path d="M9 3h6"/><path d="M15 3h4a2 2 0 0 1 2 2v4"/><path d="M3 9c0 7.18 4.03 12 9 12s9-4.82 9-12"/></>}
                          {i === 1 && <path d="M17 8C8 10 5.9 16.17 3.82 19.12A1 1 0 0 0 4.69 20.7C7.14 20.1 11.75 18.5 14 16c2.5-2.77 2.87-6.12 3-8-.5.25-2.25.75-3 0z"/>}
                          {i === 2 && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>}
                        </svg>
                      </div>
                      <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 16, color: "var(--charcoal)" }}>{label}</span>
                    </div>
                    {i < 2 && <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 22, color: "rgba(0,0,0,0.15)" }}>→</span>}
                  </React.Fragment>
                ))}
              </div>
              <a href="/science" className="hp-btn-black" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: GC, fontWeight: 700, fontSize: 16, minHeight: 48, padding: "0 28px", borderRadius: 999, textDecoration: "none", border: "2px solid var(--charcoal)", backgroundColor: "var(--charcoal)", color: "var(--bone)" }}>
                Learn the Science of AVRO
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>

            {/* Formula comparison - segmented bar graph */}
            <FormulaGraph />

          </div>
        </div>
      </div>
    </section>
  )
}

// ── QUALITY ROW ──────��────────────────────────────────────────────────────────
export function HomeQualityRow() {
  const badges = [
    { label: "Naturally Fermented", sub: "PharmaGABA®" },
    { label: "Quality Ingredients", sub: "You can trust" },
    { label: "Third-Party", sub: "Tested" },
    { label: "Vegan", sub: "Plant-based" },
    { label: "Gluten Free", sub: "Always" },
    { label: "Made in the USA", sub: "GMP Compliant" },
  ]

  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "0 clamp(20px,5vw,64px) clamp(48px,6vw,72px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        {/* Outer container card */}
        <div style={{ backgroundColor: "var(--base-light)", borderRadius: 28, padding: "clamp(20px,3vw,32px)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))", gap: 2, backgroundColor: "var(--base-deep)", borderRadius: 20, overflow: "hidden" }}>
            {badges.map((b) => (
              <div key={b.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "clamp(20px,3vw,32px) clamp(12px,2vw,20px)", textAlign: "center", backgroundColor: "var(--bone)" }}>
                <strong style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(17px,1.6vw,22px)", color: "var(--ink)", lineHeight: 1.2 }}>{b.label}</strong>
                <span style={{ fontFamily: GC, fontWeight: 400, fontSize: "clamp(14px,1.2vw,17px)", color: "rgba(0,0,0,0.55)" }}>{b.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── STORY STRIP ──────────────────────��─────────────────────────���──────────������──
export function HomeStoryStrip() {
  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "clamp(40px,6vw,72px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto", backgroundColor: "var(--charcoal)", borderRadius: 28, overflow: "hidden" }}>
        <div style={{ padding: "clamp(36px,5vw,64px) clamp(28px,5vw,72px)" }}>
          <h2 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(28px,3.4vw,46px)", lineHeight: 1.0, color: "#fff", marginBottom: 16 }}>
            Science-backed. Founder-driven.
          </h2>
          <p style={{ fontFamily: GC, fontWeight: 400, fontSize: "clamp(15px,1.2vw,18px)", lineHeight: 1.5, color: "rgba(255,255,255,0.55)", maxWidth: 680, marginBottom: 28 }}>
            AVRO was built by Keigo Sugawara and Peter van Stolk for people who wanted a better option before the moments that matter. Every formula is backed by research and designed for real routines.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="/why-avro" className="hp-btn-outline-light" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: GC, fontWeight: 700, fontSize: 16, minHeight: 48, padding: "0 36px", borderRadius: 999, textDecoration: "none", border: "2px solid #fff", backgroundColor: "transparent", color: "#fff" }}>Our Story</a>
            <a href="/science" className="hp-btn-blue" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: GC, fontWeight: 700, fontSize: 16, minHeight: 48, padding: "0 36px", borderRadius: 999, textDecoration: "none", border: `2px solid ${BLUE}`, backgroundColor: BLUE, color: "var(--charcoal)" }}>The Science</a>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "38% 62%", minHeight: 360 }}>
          <div style={{ position: "relative", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/science/fermentation-lab.jpg" alt="Stainless steel fermentation vessel cultivating naturally fermented PharmaGABA" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) contrast(1.05) brightness(0.98)" }} />
          </div>
          <div style={{ position: "relative", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/team/founders-keigo-peter.jpg" alt="AVRO co-founders Keigo Sugawara and Peter van Stolk" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) contrast(1.05) brightness(0.98)" }} />
          </div>
        </div>
      </div>
    </section>
  )
}

// ── RITUAL SECTION ────────────────────────────────────────────────────────────
export function HomeRitualSection() {
  const [openStep, setOpenStep] = useState<number | null>(null)
  
  const steps = [
    { 
      num: 1, 
      title: "Pour one stick into water",
      detail: "Add one AVRO stick to 8–12 oz of cold water. Use more water for a lighter taste, less for a stronger flavor."
    },
    { 
      num: 2, 
      title: "Mix until fully dissolved",
      detail: "Stir or shake until the powder is completely dissolved. AVRO mixes easily without clumping."
    },
    { 
      num: 3, 
      title: "Drink before your moment",
      detail: "Drink about 30 minutes before the moment that matters. Give it time to settle in so you're ready when it counts."
    },
  ]

  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        {/* Card section with base-light background */}
        <div style={{ backgroundColor: "var(--base-light)", borderRadius: 28, padding: "clamp(24px,4vw,48px)" }}>
          <h2 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(28px,3.6vw,48px)", lineHeight: 1.0, color: "var(--ink)", marginBottom: 24 }}>
            How to use AVRO.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {steps.map((step) => (
              <div
                key={step.num}
                style={{
                  backgroundColor: "var(--bone)",
                  borderRadius: 16,
                  overflow: "hidden",
                  transition: "all 0.25s ease",
                }}
              >
                <button
                  onClick={() => setOpenStep(openStep === step.num ? null : step.num)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    padding: "20px 24px",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 999,
                      border: "2px solid var(--charcoal)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      backgroundColor: openStep === step.num ? "var(--charcoal)" : "transparent",
                      color: openStep === step.num ? "var(--bone)" : "var(--charcoal)",
                      fontFamily: GC,
                      fontWeight: 700,
                      fontSize: 20,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {step.num}
                  </div>
                  <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 20, color: "var(--charcoal)", flex: 1 }}>
                    {step.title}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: openStep === step.num ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                      color: "var(--charcoal)",
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div
                  style={{
                    maxHeight: openStep === step.num ? 150 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                  }}
                >
                  <p style={{ 
                    padding: "0 24px 24px 92px", 
                    fontFamily: GC, 
                    fontWeight: 400, 
                    fontSize: 17, 
                    lineHeight: 1.55, 
                    color: "rgba(0,0,0,0.6)",
                    margin: 0,
                  }}>
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
