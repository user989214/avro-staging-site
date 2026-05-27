"use client"

import Link from "next/link"
import { formulas, type FormulaKey, sharedProof, testimonials } from "@/lib/data"
import { Icon } from "@/components/icons"

const GC = '"DM Sans", system-ui, sans-serif'
const BLUE = "#94C6D4"

// ── HERO ──────────────────────────────────────────────────────────────────────
export function HomeRefHero() {
  return (
    <section
      style={{
        width: "100%",
        backgroundColor: "var(--base)",
        color: "var(--ink)",
        padding: "clamp(48px,7vw,96px) clamp(20px,5vw,64px) clamp(48px,6vw,80px)",
      }}
    >
      <style>{`
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
        .moment-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .moment-card:hover { transform: translateY(-3px); }
        .moment-card img { transition: transform 0.5s ease; }
        .moment-card:hover img { transform: scale(1.04); }
      `}</style>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.05fr 1fr",
          gap: "clamp(32px,5vw,72px)",
          alignItems: "center",
          maxWidth: 1320,
          margin: "0 auto",
        }}
      >
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Hero headline — DM Sans per design system */}
          <h1
            style={{
              fontFamily: GC,
              fontSize: "clamp(44px,5.6vw,76px)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              marginBottom: 24,
              maxWidth: 600,
              fontWeight: 700,
            }}
          >
            Calm first.
            <br />
            Clear headed.
            <br />
            Ready when pressure rises.
          </h1>

          {/* Lede — DM Sans, body LG */}
          <p
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

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a
              href="/shop"
              className="hp-pill-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: GC,
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "-0.005em",
                minHeight: 52,
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
                fontSize: 14,
                letterSpacing: "-0.005em",
                minHeight: 52,
                padding: "0 28px",
                textDecoration: "none",
              }}
            >
              Learn the Science
            </a>
          </div>
        </div>

        {/* Right: image */}
        <div
          style={{
            position: "relative",
            aspectRatio: "1 / 1.05",
            overflow: "hidden",
            borderRadius: 28,
            backgroundColor: "var(--base-deep)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4325552255-51euqtVRTaIeU2n0sGSiBvq4vuvEFe.png"
            alt="AVRO Energy stick packet next to a glass of green juice at an outdoor brunch"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "60% center",
            }}
          />
        </div>
      </div>
    </section>
  )
}

// ── PROOF BAR ─────────────────────────────────────────────────────────────────
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

// ── BENEFIT ROW ───────────────────────────────────────────────────────────────
export function HomeBenefitRow() {
  const benefits = [
    { title: "Supports composure under pressure", copy: "Helps you steady first before the moment matters." },
    { title: "Supports clear-headed readiness", copy: "Helps you feel calm, clear, and in control." },
    { title: "Supports calm without sedation", copy: "Designed to support composure without turning you off." },
  ]

  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "0 clamp(20px,5vw,64px) clamp(40px,6vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 16 }}>
        {benefits.map((b) => (
          <div key={b.title} style={{ backgroundColor: "var(--base)", borderRadius: 24, padding: "clamp(24px,3vw,36px)", border: "1px solid rgba(0,0,0,0.08)" }}>
            <h3 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(18px,1.6vw,22px)", lineHeight: 1.1, color: "var(--ink)", marginBottom: 10 }}>{b.title}</h3>
            <p style={{ fontFamily: GC, fontWeight: 400, fontSize: "clamp(16px,1.4vw,19px)", lineHeight: 1.5, color: "rgba(0,0,0,0.55)" }}>{b.copy}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── LOGIC ROW ─────────────────────────────────────────────────────────────────
export function HomeLogicRow() {
  const comparisonRows = [
    ["Push harder", "Settle first"],
    ["More intensity", "More control"],
    ["Spike and crash", "Steady state"],
    ["Noise", "Clarity"],
  ]

  return (
    <section style={{ backgroundColor: "var(--base-light)", width: "100%", padding: "clamp(40px,6vw,72px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 20 }}>
        {/* Card 1 */}
        <div style={{ backgroundColor: "var(--base)", borderRadius: 24, padding: "clamp(24px,2.6vw,36px)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(24px,2.6vw,36px)", lineHeight: 1.05, color: "var(--ink)", marginBottom: 16 }}>
            More energy is not always the answer.
          </h2>
          <p style={{ fontFamily: GC, fontWeight: 400, fontSize: "clamp(15px,1.2vw,17px)", lineHeight: 1.5, color: "rgba(0,0,0,0.6)" }}>
            Most products push stimulation. AVRO starts with calm, because calm helps create the conditions for clarity, composure, and readiness.
          </p>
        </div>

        {/* Comparison table */}
        <div style={{ backgroundColor: "var(--base)", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ padding: "16px 20px", fontFamily: GC, fontWeight: 700, fontSize: 18, color: "rgba(0,0,0,0.4)", borderBottom: "1px solid rgba(0,0,0,0.08)", textAlign: "center" }}>Stimulant First</div>
            <div style={{ padding: "16px 20px", fontFamily: GC, fontWeight: 700, fontSize: 18, color: "var(--ink)", borderBottom: "1px solid rgba(0,0,0,0.08)", borderLeft: "1px solid rgba(0,0,0,0.08)", textAlign: "center", backgroundColor: "rgba(148,198,212,0.15)" }}>Calm First</div>
          </div>
          {comparisonRows.map(([left, right]) => (
            <div key={left} style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <div style={{ padding: "16px 20px", fontFamily: GC, fontWeight: 700, fontSize: 17, color: "rgba(0,0,0,0.45)", borderTop: "1px solid rgba(0,0,0,0.05)" }}>{left}</div>
              <div style={{ padding: "16px 20px", fontFamily: GC, fontWeight: 700, fontSize: 17, color: "var(--ink)", borderTop: "1px solid rgba(0,0,0,0.05)", borderLeft: "1px solid rgba(0,0,0,0.08)", backgroundColor: "rgba(148,198,212,0.08)" }}>{right}</div>
            </div>
          ))}
        </div>

        {/* Card 3 */}
        <div style={{ backgroundColor: "var(--base)", borderRadius: 24, padding: "clamp(24px,2.6vw,36px)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(24px,2.6vw,36px)", lineHeight: 1.05, color: "var(--ink)", marginBottom: 16 }}>
            Performance starts with state.
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", margin: "20px 0" }}>
            {["Calm", "Clarity", "Readiness"].map((label, i) => (
              <>
                <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, backgroundColor: "rgba(148,198,212,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {i === 0 && <path d="M17 8C8 10 5.9 16.17 3.82 19.12A1 1 0 0 0 4.69 20.7C7.14 20.1 11.75 18.5 14 16c2.5-2.77 2.87-6.12 3-8-.5.25-2.25.75-3 0z"/>}
                      {i === 1 && <><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></>}
                      {i === 2 && <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></>}
                    </svg>
                  </div>
                  <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 17, color: "var(--ink)" }}>{label}</span>
                </div>
                {i < 2 && <span key={`arrow-${i}`} style={{ fontFamily: GC, fontWeight: 700, fontSize: 22, color: "rgba(0,0,0,0.2)" }}>→</span>}
              </>
            ))}
          </div>
          <p style={{ fontFamily: GC, fontWeight: 400, fontSize: "clamp(15px,1.2vw,17px)", lineHeight: 1.5, color: "rgba(0,0,0,0.6)" }}>
            AVRO is built to support the state before the moment.
          </p>
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", border: "1.5px solid rgba(28,27,20,0.1)", borderRadius: 20, overflow: "hidden", backgroundColor: "var(--base-light)" }}>
          {(Object.keys(formulas) as FormulaKey[]).map((key, i) => (
            <a
              key={key}
              href={`/${key}`}
              style={{ display: "grid", gridTemplateRows: "1fr auto", textDecoration: "none", borderLeft: i > 0 ? "2px solid rgba(0,0,0,0.12)" : "none" }}
            >
              <div style={{ height: "clamp(320px, 30vw, 460px)", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={socialImages[key]}
                  alt={`AVRO ${formulas[key].name}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 24px", borderTop: "2px solid rgba(0,0,0,0.1)", backgroundColor: BLUE }}>
                <span style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(16px,1.4vw,20px)", color: "var(--ink)", textAlign: "center" }}>
                  PharmaGABA® + {formulaAdditions[key]}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── MOMENT GRID ───���───────────────────────────────────────────────────────────
export function HomeMomentGrid() {
  const moments = [
    { title: "Golf", copy: "Before the first tee. Before the final putt.", cta: "Explore Golf", url: "/golf", image: "/images/lifestyle/golfers-misty-tee-box.jpg", alt: "Golfers on a misty tee box at sunrise" },
    { title: "Work", copy: "Before the meeting. Before deep work.", cta: "Explore Work", url: "/work", image: "/images/lifestyle/woman-journaling-mug.jpg", alt: "Calm morning routine with journal and warm mug" },
    { title: "Social", copy: "Show up present without alcohol.", cta: "Explore Social", url: "/social", image: "/images/lifestyle/coupes-grapefruit-stickpack.jpg", alt: "AVRO stickpack styled with grapefruit coupes on a bar" },
    { title: "Gaming", copy: "Before the session. Before the decision.", cta: "Explore Gaming", url: "/gaming", image: "/images/lifestyle/focus-iced-drink-headphones.jpg", alt: "Iced AVRO drink and headphones at a gaming desk" },
  ]

  return (
    <section style={{ backgroundColor: BLUE, width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        <h2 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(28px,3.6vw,48px)", lineHeight: 1.0, color: "var(--ink)", marginBottom: 32 }}>
          Built for pressure sensitive moments.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 16 }}>
          {moments.map((m) => (
            <a key={m.title} href={m.url} className="moment-card" style={{ display: "flex", flexDirection: "column", textDecoration: "none", borderRadius: 24, overflow: "hidden", backgroundColor: "var(--base)" }}>
              <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.image} alt={m.alt} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "20px 24px 24px" }}>
                <h3 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(24px,2.5vw,34px)", lineHeight: 1.0, color: "var(--ink)", marginBottom: 8 }}>{m.title}</h3>
                <p style={{ fontFamily: GC, fontWeight: 400, fontSize: 18, lineHeight: 1.45, color: "rgba(0,0,0,0.6)", marginBottom: 20 }}>{m.copy}</p>
                <span className="hp-btn-blue" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: GC, fontWeight: 700, fontSize: 17, minHeight: 52, padding: "0 24px", borderRadius: 999, border: `2px solid ${BLUE}`, backgroundColor: BLUE, color: "var(--ink)" }}>
                  {m.cta}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── SCIENCE GRID ──────────────────────────────────────────────────────────────
export function HomeScienceGrid() {
  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))", gap: 20 }}>
        {/* Why GABA card */}
        <div style={{ backgroundColor: "var(--base-light)", borderRadius: 24, padding: "clamp(28px,4vw,48px)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(24px,2.8vw,38px)", lineHeight: 1.0, color: "var(--ink)", marginBottom: 16 }}>
            Why GABA matters.
          </h2>
          <p style={{ fontFamily: GC, fontWeight: 400, fontSize: "clamp(15px,1.2vw,17px)", lineHeight: 1.5, color: "rgba(0,0,0,0.6)", marginBottom: 24 }}>
            GABA is a naturally occurring compound associated with relaxation and balance. AVRO uses naturally fermented PharmaGABA® as the foundation of every formula.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
            {[["Naturally Fermented", "flask"], ["Calm First", "leaf"], ["In Every Formula", "shield"]].map(([label, _icon], i) => (
              <>
                <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textAlign: "center" }}>
                  <div style={{ width: 52, height: 52, backgroundColor: "rgba(148,198,212,0.25)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {i === 0 && <><path d="M9 3H5a2 2 0 0 0-2 2v4"/><path d="M9 3h6"/><path d="M15 3h4a2 2 0 0 1 2 2v4"/><path d="M3 9c0 7.18 4.03 12 9 12s9-4.82 9-12"/></>}
                      {i === 1 && <path d="M17 8C8 10 5.9 16.17 3.82 19.12A1 1 0 0 0 4.69 20.7C7.14 20.1 11.75 18.5 14 16c2.5-2.77 2.87-6.12 3-8-.5.25-2.25.75-3 0z"/>}
                      {i === 2 && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>}
                    </svg>
                  </div>
                  <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 16, color: "var(--ink)" }}>{label}</span>
                </div>
                {i < 2 && <span key={`arr-${i}`} style={{ fontFamily: GC, fontWeight: 700, fontSize: 20, color: "rgba(0,0,0,0.2)" }}>→</span>}
              </>
            ))}
          </div>
          <a href="/science" className="hp-btn-blue" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: GC, fontWeight: 700, fontSize: 18, minHeight: 58, padding: "0 32px", borderRadius: 999, textDecoration: "none", border: `2px solid ${BLUE}`, backgroundColor: BLUE, color: "var(--ink)" }}>
            Learn the Science of AVRO
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>

        {/* Formula comparison */}
        <div style={{ backgroundColor: "var(--base-light)", borderRadius: 24, overflow: "hidden", padding: "clamp(28px,4vw,48px)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(24px,2.8vw,38px)", lineHeight: 1.0, color: "var(--ink)", marginBottom: 24 }}>
            Every formula starts calm first.
          </h2>
          <div style={{ overflowX: "auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr repeat(3,1fr)", minWidth: 420, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 24, overflow: "hidden", backgroundColor: "var(--base)" }}>
              <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(0,0,0,0.08)" }} />
              {["Calm", "Focus", "Energy"].map((f) => (
                <div key={f} style={{ padding: "12px 14px", fontFamily: GC, fontWeight: 700, fontSize: 16, color: "var(--ink)", borderBottom: "1px solid rgba(0,0,0,0.08)", borderLeft: "1px solid rgba(0,0,0,0.08)", textAlign: "center", backgroundColor: "rgba(148,198,212,0.12)" }}>{f}</div>
              ))}
              {[
                ["Shared Foundation", "PharmaGABA®", "Naturally fermented base", "Calm-first logic"],
                ["Primary Benefit", "Relaxation & steady clarity", "Clear thinking & attention", "Steady energy & lift"],
                ["Unique Addition", "Magnesium", "Cognigrape®", "Natural Caffeine"],
                ["Caffeine", "0 mg", "0 mg", "120 mg"],
              ].map(([row, ...cells]) => (
                <>
                  <div key={row} style={{ padding: "14px 16px", fontFamily: GC, fontWeight: 700, fontSize: 16, color: "rgba(0,0,0,0.5)", borderTop: "1px solid rgba(0,0,0,0.06)", backgroundColor: "rgba(0,0,0,0.02)" }}>{row}</div>
                  {cells.map((c, ci) => (
                    <div key={`${row}-${ci}`} style={{ padding: "14px 16px", fontFamily: GC, fontWeight: 400, fontSize: 16, color: "var(--ink)", borderTop: "1px solid rgba(0,0,0,0.06)", borderLeft: "1px solid rgba(0,0,0,0.08)", textAlign: "center" }}>{c}</div>
                  ))}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── QUALITY ROW ───────────────────────────────────────────────────────────────
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
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "0 clamp(20px,5vw,64px) clamp(40px,6vw,64px)" }}>
        <div style={{ maxWidth: 1250, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))", border: "2px solid rgba(0,0,0,0.12)", borderRadius: 24, overflow: "hidden" }}>
          {badges.map((b, i) => (
            <div key={b.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "clamp(20px,3vw,36px) clamp(12px,2vw,20px)", textAlign: "center", borderLeft: i > 0 ? "2px solid rgba(0,0,0,0.12)" : "none" }}>
            <strong style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(16px,1.5vw,21px)", color: "var(--ink)", lineHeight: 1.2 }}>{b.label}</strong>
            <span style={{ fontFamily: GC, fontWeight: 400, fontSize: "clamp(14px,1.2vw,17px)", color: "rgba(0,0,0,0.6)" }}>{b.sub}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── STORY STRIP ───────────────────────────────────────────────────────────────
export function HomeStoryStrip() {
  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "clamp(40px,6vw,72px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto", backgroundColor: BLUE, borderRadius: 28, overflow: "hidden" }}>
        <div style={{ padding: "clamp(36px,5vw,64px) clamp(28px,5vw,72px)" }}>
          <h2 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(28px,3.4vw,46px)", lineHeight: 1.0, color: "var(--ink)", marginBottom: 16 }}>
            Science-backed. Founder-driven.
          </h2>
          <p style={{ fontFamily: GC, fontWeight: 400, fontSize: "clamp(15px,1.2vw,18px)", lineHeight: 1.5, color: "rgba(0,0,0,0.65)", maxWidth: 680, marginBottom: 28 }}>
            AVRO was built by Keigo Sugawara and Peter van Stolk for people who wanted a better option before the moments that matter. Every formula is backed by research and designed for real routines.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="/why-avro" className="hp-btn-black" style={{ display: "inline-flex", alignItems: "center", fontFamily: GC, fontWeight: 700, fontSize: 18, minHeight: 56, padding: "0 32px", borderRadius: 999, textDecoration: "none", border: "2px solid var(--charcoal)", backgroundColor: "var(--charcoal)", color: "var(--bone)" }}>Our Story</a>
            <a href="/science" className="hp-btn-black" style={{ display: "inline-flex", alignItems: "center", fontFamily: GC, fontWeight: 700, fontSize: 18, minHeight: 56, padding: "0 32px", borderRadius: 999, textDecoration: "none", border: "2px solid var(--charcoal)", backgroundColor: "var(--charcoal)", color: "var(--bone)" }}>The Science</a>
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
  const steps = [
    { num: 1, text: "Pour one stick into 8–12 oz of cold water." },
    { num: 2, text: "Mix until fully dissolved." },
    { num: 3, text: "Drink about 30 minutes before your moment." },
  ]

  return (
    <section style={{ backgroundColor: BLUE, width: "100%", padding: "clamp(40px,6vw,72px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        <h2 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(28px,3.6vw,48px)", lineHeight: 1.0, color: "var(--charcoal)", marginBottom: 32 }}>
          How to use AVRO.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 16 }}>
          {steps.map((step) => (
            <div key={step.num} style={{ backgroundColor: "var(--base)", borderRadius: 24, padding: "clamp(24px,3vw,36px)", display: "flex", gap: 20, alignItems: "flex-start", border: "1px solid rgba(28,27,20,0.08)" }}>
              <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 48, lineHeight: 1.0, color: "var(--charcoal)", flexShrink: 0 }}>{step.num}</span>
              <p style={{ fontFamily: GC, fontWeight: 500, fontSize: "clamp(18px,1.6vw,22px)", lineHeight: 1.4, color: "rgba(28,27,20,0.7)", margin: 0, paddingTop: 6 }}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
