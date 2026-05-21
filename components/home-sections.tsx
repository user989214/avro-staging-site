"use client"

import Link from "next/link"
import { formulas, type FormulaKey, sharedProof, testimonials } from "@/lib/data"
import { Icon } from "@/components/icons"

const GC = '"Gotham Condensed", sans-serif'
const BLUE = "#87CEEB"

// ── HERO ──────────────────────────────────────────────────────────────────────
export function HomeRefHero() {
  return (
    <section style={{ width: "100%", backgroundColor: "#fff", color: "#000" }}>
      <style>{`
        @font-face { font-family: "Gotham Condensed"; src: url("/fonts/GothamCond-Ultra.woff") format("woff"); font-weight: 950; font-style: normal; font-display: swap; }
        @font-face { font-family: "Gotham Condensed"; src: url("/fonts/GothamCond-Black.woff") format("woff"); font-weight: 800; font-style: normal; font-display: swap; }
        @font-face { font-family: "Gotham Condensed"; src: url("/fonts/GothamCond-Bold.woff") format("woff"); font-weight: 700; font-style: normal; font-display: swap; }
        @font-face { font-family: "Gotham Condensed"; src: url("/fonts/GothamCond-Medium.woff") format("woff"); font-weight: 500; font-style: normal; font-display: swap; }
        @font-face { font-family: "Gotham Condensed"; src: url("/fonts/GothamCond-Book.woff") format("woff"); font-weight: 400; font-style: normal; font-display: swap; }
        .hp-btn-blue { background-color: #87CEEB; color: #000; border: 2.5px solid #87CEEB; transition: background-color 0.18s ease, color 0.18s ease; }
        .hp-btn-blue:hover { background-color: transparent; color: #87CEEB; }
        .hp-btn-outline-white { background-color: transparent; color: #fff; border: 2.5px solid #fff; transition: background-color 0.18s ease, color 0.18s ease; }
        .hp-btn-outline-white:hover { background-color: #fff; color: #000; }
        .hp-btn-black { background-color: #000; color: #fff; border: 2.5px solid #000; transition: background-color 0.18s ease, color 0.18s ease; }
        .hp-btn-black:hover { background-color: transparent; color: #000; }
        .hp-btn-outline-black { background-color: transparent; color: #000; border: 2.5px solid #000; transition: background-color 0.18s ease, color 0.18s ease; }
        .hp-btn-outline-black:hover { background-color: #000; color: #fff; }
        .hp-cta-btn { background-color: #fff; color: #000; border: 2.5px solid #fff; transition: background-color 0.18s ease, color 0.18s ease; }
        .hp-cta-btn:hover { background-color: transparent; color: #fff; }
        .moment-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .moment-card:hover { transform: translateY(-3px); }
        .moment-card img { transition: transform 0.5s ease; }
        .moment-card:hover img { transform: scale(1.04); }
      `}</style>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", maxWidth: 1440, margin: "0 auto" }}>
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(56px,8vw,112px) clamp(20px,6vw,80px)" }}>
          <h1 style={{ fontFamily: GC, fontWeight: 950, fontSize: "clamp(52px,7.5vw,108px)", lineHeight: 0.94, color: "#000", marginBottom: 28, maxWidth: 560 }}>
            Calm. Clear. Ready.
          </h1>
          <p style={{ fontFamily: GC, fontWeight: 500, fontSize: "clamp(19px,1.8vw,24px)", lineHeight: 1.5, color: "rgba(0,0,0,0.65)", maxWidth: 520, marginBottom: 36 }}>
            AVRO is a calm-first daily drink mix made with naturally fermented PharmaGABA®, designed to support clarity, composure, and steady energy before the moments that matter.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            <a href="/shop" className="hp-btn-black" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: GC, fontWeight: 800, fontSize: 21, minHeight: 66, padding: "0 44px", borderRadius: 10, textDecoration: "none" }}>Shop AVRO</a>
            <a href="/shop" className="hp-btn-outline-black" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: GC, fontWeight: 800, fontSize: 21, minHeight: 66, padding: "0 44px", borderRadius: 10, textDecoration: "none" }}>Find Your Formula</a>
          </div>
        </div>
        {/* Right: image */}
        <div style={{ position: "relative", minHeight: "clamp(360px,50vw,640px)", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/lifestyle/kitchen-trio-pink-cocktails.jpg"
            alt="AVRO Energy Fuji Apple stick packet next to a glass of mixed drink at a sunset rooftop dinner"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "60% center" }}
          />
        </div>
      </div>
    </section>
  )
}

// ── PROOF BAR ─────────────────────────────────────────────────────────────────
export function HomeProofBar() {
  return (
    <section style={{ backgroundColor: "#fff", width: "100%", padding: "clamp(32px,5vw,56px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1250, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "2px solid rgba(0,0,0,0.12)", borderRadius: 12, overflow: "hidden" }}>
        {sharedProof.map((item, i) => (
          <div
            key={item.label}
            style={{ padding: "clamp(20px,3vw,36px) clamp(16px,3vw,32px)", textAlign: "center", borderLeft: i > 0 ? "2px solid rgba(0,0,0,0.12)" : "none" }}
          >
            <strong style={{ fontFamily: GC, fontWeight: 950, fontSize: "clamp(28px,3.5vw,48px)", lineHeight: 1.0, color: "#000", display: "block" }}>{item.stat}</strong>
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
    <section style={{ backgroundColor: "#fff", width: "100%", padding: "0 clamp(20px,5vw,64px) clamp(40px,6vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 16 }}>
        {benefits.map((b) => (
          <div key={b.title} style={{ backgroundColor: "#fff", borderRadius: 12, padding: "clamp(24px,3vw,36px)", border: "1px solid rgba(0,0,0,0.08)" }}>
            <h3 style={{ fontFamily: GC, fontWeight: 800, fontSize: "clamp(20px,2vw,26px)", lineHeight: 1.1, color: "#000", marginBottom: 10 }}>{b.title}</h3>
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
    <section style={{ backgroundColor: "#f5f5f5", width: "100%", padding: "clamp(40px,6vw,72px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 20 }}>
        {/* Card 1 */}
        <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: "clamp(28px,3vw,44px)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontFamily: GC, fontWeight: 950, fontSize: "clamp(28px,3vw,44px)", lineHeight: 1.05, color: "#000", marginBottom: 16 }}>
            More energy is not always the answer.
          </h2>
          <p style={{ fontFamily: GC, fontWeight: 400, fontSize: "clamp(17px,1.5vw,20px)", lineHeight: 1.5, color: "rgba(0,0,0,0.6)" }}>
            Most products push stimulation. AVRO starts with calm, because calm helps create the conditions for clarity, composure, and readiness.
          </p>
        </div>

        {/* Comparison table */}
        <div style={{ backgroundColor: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ padding: "16px 20px", fontFamily: GC, fontWeight: 800, fontSize: 18, color: "rgba(0,0,0,0.4)", borderBottom: "1px solid rgba(0,0,0,0.08)", textAlign: "center" }}>Stimulant First</div>
            <div style={{ padding: "16px 20px", fontFamily: GC, fontWeight: 800, fontSize: 18, color: "#000", borderBottom: "1px solid rgba(0,0,0,0.08)", borderLeft: "1px solid rgba(0,0,0,0.08)", textAlign: "center", backgroundColor: "rgba(135,206,235,0.15)" }}>Calm First</div>
          </div>
          {comparisonRows.map(([left, right]) => (
            <div key={left} style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <div style={{ padding: "16px 20px", fontFamily: GC, fontWeight: 700, fontSize: 17, color: "rgba(0,0,0,0.45)", borderTop: "1px solid rgba(0,0,0,0.05)" }}>{left}</div>
              <div style={{ padding: "16px 20px", fontFamily: GC, fontWeight: 700, fontSize: 17, color: "#000", borderTop: "1px solid rgba(0,0,0,0.05)", borderLeft: "1px solid rgba(0,0,0,0.08)", backgroundColor: "rgba(135,206,235,0.08)" }}>{right}</div>
            </div>
          ))}
        </div>

        {/* Card 3 */}
        <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: "clamp(28px,3vw,44px)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontFamily: GC, fontWeight: 950, fontSize: "clamp(28px,3vw,44px)", lineHeight: 1.05, color: "#000", marginBottom: 16 }}>
            Performance starts with state.
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", margin: "20px 0" }}>
            {["Calm", "Clarity", "Readiness"].map((label, i) => (
              <>
                <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, backgroundColor: "rgba(135,206,235,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {i === 0 && <path d="M17 8C8 10 5.9 16.17 3.82 19.12A1 1 0 0 0 4.69 20.7C7.14 20.1 11.75 18.5 14 16c2.5-2.77 2.87-6.12 3-8-.5.25-2.25.75-3 0z"/>}
                      {i === 1 && <><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></>}
                      {i === 2 && <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></>}
                    </svg>
                  </div>
                  <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 17, color: "#000" }}>{label}</span>
                </div>
                {i < 2 && <span key={`arrow-${i}`} style={{ fontFamily: GC, fontWeight: 800, fontSize: 22, color: "rgba(0,0,0,0.2)" }}>→</span>}
              </>
            ))}
          </div>
          <p style={{ fontFamily: GC, fontWeight: 400, fontSize: "clamp(17px,1.5vw,20px)", lineHeight: 1.5, color: "rgba(0,0,0,0.6)" }}>
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
    <section style={{ backgroundColor: "#fff", width: "100%", padding: "clamp(40px,6vw,72px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        <h2 style={{ fontFamily: GC, fontWeight: 950, fontSize: "clamp(36px,5vw,68px)", lineHeight: 1.0, color: "#000", marginBottom: 32 }}>
          Three formulas. One foundation.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", border: "2px solid rgba(0,0,0,0.12)", borderRadius: 16, overflow: "hidden" }}>
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
                <span style={{ fontFamily: GC, fontWeight: 800, fontSize: "clamp(16px,1.4vw,20px)", color: "#000", textAlign: "center" }}>
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

// ── MOMENT GRID ───────────────────────────────────────────────────────────────
export function HomeMomentGrid() {
  const moments = [
    { title: "Golf", copy: "Before the first tee. Before the final putt.", cta: "Explore Golf", url: "/golf", image: "/images/lifestyle/golfers-misty-tee-box.jpg", alt: "Golfers on a misty tee box at sunrise" },
    { title: "Work", copy: "Before the meeting. Before deep work.", cta: "Explore Work", url: "/work", image: "/images/lifestyle/woman-journaling-mug.jpg", alt: "Calm morning routine with journal and warm mug" },
    { title: "Social", copy: "Show up present without alcohol.", cta: "Explore Social", url: "/social", image: "/images/lifestyle/coupes-grapefruit-stickpack.jpg", alt: "AVRO stickpack styled with grapefruit coupes on a bar" },
    { title: "Gaming", copy: "Before the session. Before the decision.", cta: "Explore Gaming", url: "/gaming", image: "/images/lifestyle/focus-iced-drink-headphones.jpg", alt: "Iced AVRO drink and headphones at a gaming desk" },
  ]

  return (
    <section style={{ backgroundColor: "#f0f0f0", width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        <h2 style={{ fontFamily: GC, fontWeight: 950, fontSize: "clamp(36px,5vw,68px)", lineHeight: 1.0, color: "#000", marginBottom: 32 }}>
          Built for pressure sensitive moments.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 16 }}>
          {moments.map((m) => (
            <a key={m.title} href={m.url} className="moment-card" style={{ display: "flex", flexDirection: "column", textDecoration: "none", borderRadius: 12, overflow: "hidden", backgroundColor: BLUE }}>
              <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.image} alt={m.alt} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "20px 24px 24px" }}>
                <h3 style={{ fontFamily: GC, fontWeight: 950, fontSize: "clamp(24px,2.5vw,34px)", lineHeight: 1.0, color: "#000", marginBottom: 8 }}>{m.title}</h3>
                <p style={{ fontFamily: GC, fontWeight: 400, fontSize: 18, lineHeight: 1.45, color: "rgba(0,0,0,0.6)", marginBottom: 20 }}>{m.copy}</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: GC, fontWeight: 800, fontSize: 17, minHeight: 52, padding: "0 24px", borderRadius: 10, backgroundColor: "#000", color: "#fff" }}>
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
    <section style={{ backgroundColor: "#fff", width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))", gap: 20 }}>
        {/* Why GABA card */}
        <div style={{ backgroundColor: "#f8f8f8", borderRadius: 12, padding: "clamp(28px,4vw,48px)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontFamily: GC, fontWeight: 950, fontSize: "clamp(28px,3.5vw,52px)", lineHeight: 1.0, color: "#000", marginBottom: 16 }}>
            Why GABA matters.
          </h2>
          <p style={{ fontFamily: GC, fontWeight: 400, fontSize: "clamp(17px,1.5vw,20px)", lineHeight: 1.5, color: "rgba(0,0,0,0.6)", marginBottom: 24 }}>
            GABA is a naturally occurring compound associated with relaxation and balance. AVRO uses naturally fermented PharmaGABA® as the foundation of every formula.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
            {[["Naturally Fermented", "flask"], ["Calm First", "leaf"], ["In Every Formula", "shield"]].map(([label, _icon], i) => (
              <>
                <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textAlign: "center" }}>
                  <div style={{ width: 52, height: 52, backgroundColor: "rgba(135,206,235,0.25)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {i === 0 && <><path d="M9 3H5a2 2 0 0 0-2 2v4"/><path d="M9 3h6"/><path d="M15 3h4a2 2 0 0 1 2 2v4"/><path d="M3 9c0 7.18 4.03 12 9 12s9-4.82 9-12"/></>}
                      {i === 1 && <path d="M17 8C8 10 5.9 16.17 3.82 19.12A1 1 0 0 0 4.69 20.7C7.14 20.1 11.75 18.5 14 16c2.5-2.77 2.87-6.12 3-8-.5.25-2.25.75-3 0z"/>}
                      {i === 2 && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>}
                    </svg>
                  </div>
                  <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 16, color: "#000" }}>{label}</span>
                </div>
                {i < 2 && <span key={`arr-${i}`} style={{ fontFamily: GC, fontWeight: 800, fontSize: 20, color: "rgba(0,0,0,0.2)" }}>→</span>}
              </>
            ))}
          </div>
          <a href="/science" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: GC, fontWeight: 800, fontSize: 18, minHeight: 58, padding: "0 32px", borderRadius: 10, textDecoration: "none", backgroundColor: BLUE, color: "#000" }}>
            Learn the Science of AVRO
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>

        {/* Formula comparison */}
        <div style={{ backgroundColor: "#f8f8f8", borderRadius: 12, overflow: "hidden", padding: "clamp(28px,4vw,48px)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontFamily: GC, fontWeight: 950, fontSize: "clamp(28px,3.5vw,52px)", lineHeight: 1.0, color: "#000", marginBottom: 24 }}>
            Every formula starts calm first.
          </h2>
          <div style={{ overflowX: "auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr repeat(3,1fr)", minWidth: 420, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, overflow: "hidden", backgroundColor: "#fff" }}>
              <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(0,0,0,0.08)" }} />
              {["Calm", "Focus", "Energy"].map((f) => (
                <div key={f} style={{ padding: "12px 14px", fontFamily: GC, fontWeight: 800, fontSize: 16, color: "#000", borderBottom: "1px solid rgba(0,0,0,0.08)", borderLeft: "1px solid rgba(0,0,0,0.08)", textAlign: "center", backgroundColor: "rgba(135,206,235,0.12)" }}>{f}</div>
              ))}
              {[
                ["Shared Foundation", "PharmaGABA®", "Naturally fermented base", "Calm-first logic"],
                ["Primary Benefit", "Relaxation & steady clarity", "Clear thinking & attention", "Steady energy & lift"],
                ["Unique Addition", "Magnesium", "Cognigrape®", "Natural Caffeine"],
                ["Caffeine", "0 mg", "0 mg", "120 mg"],
              ].map(([row, ...cells]) => (
                <>
                  <div key={row} style={{ padding: "14px 16px", fontFamily: GC, fontWeight: 800, fontSize: 16, color: "rgba(0,0,0,0.5)", borderTop: "1px solid rgba(0,0,0,0.06)", backgroundColor: "rgba(0,0,0,0.02)" }}>{row}</div>
                  {cells.map((c, ci) => (
                    <div key={`${row}-${ci}`} style={{ padding: "14px 16px", fontFamily: GC, fontWeight: 400, fontSize: 16, color: "#000", borderTop: "1px solid rgba(0,0,0,0.06)", borderLeft: "1px solid rgba(0,0,0,0.08)", textAlign: "center" }}>{c}</div>
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
    <section style={{ backgroundColor: "#fff", width: "100%", padding: "0 clamp(20px,5vw,64px) clamp(40px,6vw,64px)" }}>
        <div style={{ maxWidth: 1250, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))", border: "2px solid rgba(0,0,0,0.12)", borderRadius: 12, overflow: "hidden" }}>
          {badges.map((b, i) => (
            <div key={b.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "clamp(20px,3vw,36px) clamp(12px,2vw,20px)", textAlign: "center", borderLeft: i > 0 ? "2px solid rgba(0,0,0,0.12)" : "none" }}>
            <strong style={{ fontFamily: GC, fontWeight: 800, fontSize: "clamp(16px,1.5vw,21px)", color: "#000", lineHeight: 1.2 }}>{b.label}</strong>
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
    <section style={{ backgroundColor: "#fff", width: "100%", padding: "clamp(40px,6vw,72px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto", backgroundColor: BLUE, borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: "clamp(36px,5vw,64px) clamp(28px,5vw,72px)" }}>
          <h2 style={{ fontFamily: GC, fontWeight: 950, fontSize: "clamp(32px,4.5vw,64px)", lineHeight: 1.0, color: "#000", marginBottom: 16 }}>
            Science-backed. Founder-driven.
          </h2>
          <p style={{ fontFamily: GC, fontWeight: 400, fontSize: "clamp(17px,1.5vw,21px)", lineHeight: 1.5, color: "rgba(0,0,0,0.65)", maxWidth: 680, marginBottom: 28 }}>
            AVRO was built by Keigo Sugawara and Peter van Stolk for people who wanted a better option before the moments that matter. Every formula is backed by research and designed for real routines.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="/why-avro" className="hp-btn-black" style={{ display: "inline-flex", alignItems: "center", fontFamily: GC, fontWeight: 800, fontSize: 18, minHeight: 56, padding: "0 32px", borderRadius: 10, textDecoration: "none" }}>Our Story</a>
            <a href="/science" className="hp-btn-outline-black" style={{ display: "inline-flex", alignItems: "center", fontFamily: GC, fontWeight: 800, fontSize: 18, minHeight: 56, padding: "0 32px", borderRadius: 10, textDecoration: "none" }}>The Science</a>
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
    <section style={{ backgroundColor: "#f8f8f8", width: "100%", padding: "clamp(40px,6vw,72px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        <h2 style={{ fontFamily: GC, fontWeight: 950, fontSize: "clamp(36px,5vw,68px)", lineHeight: 1.0, color: "#000", marginBottom: 32 }}>
          How to use AVRO.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 16 }}>
          {steps.map((step) => (
            <div key={step.num} style={{ backgroundColor: "#fff", borderRadius: 12, padding: "clamp(24px,3vw,36px)", display: "flex", gap: 20, alignItems: "flex-start", border: "1px solid rgba(0,0,0,0.08)" }}>
              <span style={{ fontFamily: GC, fontWeight: 950, fontSize: 48, lineHeight: 1.0, color: BLUE, flexShrink: 0 }}>{step.num}</span>
              <p style={{ fontFamily: GC, fontWeight: 500, fontSize: "clamp(18px,1.6vw,22px)", lineHeight: 1.4, color: "rgba(0,0,0,0.7)", margin: 0, paddingTop: 6 }}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
