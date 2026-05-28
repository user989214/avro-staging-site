"use client"

import Link from "next/link"

const GC = "var(--font-geist), -apple-system, BlinkMacSystemFont, system-ui, sans-serif"

export function CompareAtAGlance() {
  return (
    <div className="relative">
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

      {/* Decorative animated SVG accent — subtle, sits on the right of the heading on large screens */}
      <svg
        aria-hidden="true"
        viewBox="0 0 220 80"
        className="hidden lg:block absolute"
        style={{ right: 0, top: 8, width: 220, height: 80, opacity: 0.55 }}
      >
        <defs>
          <linearGradient id="shopCompareGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--calm)" />
            <stop offset="50%" stopColor="var(--focus)" />
            <stop offset="100%" stopColor="var(--energy)" />
          </linearGradient>
        </defs>
        <path
          d="M0 40 Q 55 0, 110 40 T 220 40"
          fill="none"
          stroke="url(#shopCompareGrad)"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="
              M0 40 Q 55 0, 110 40 T 220 40;
              M0 40 Q 55 80, 110 40 T 220 40;
              M0 40 Q 55 0, 110 40 T 220 40
            "
          />
        </path>
      </svg>

      <div
        style={{
          backgroundColor: "var(--base)",
          borderRadius: 24,
          overflow: "hidden",
        }}
      >
        {/* Header row */}
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr 1fr" }}>
          <div style={{ minHeight: 64, padding: 20, backgroundColor: "var(--base-light)" }} />
          <div style={{ minHeight: 64, padding: 20, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--calm)" }}>
            <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 18, color: "#2D1B4E" }}>Calm</span>
          </div>
          <div style={{ minHeight: 64, padding: 20, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--focus)" }}>
            <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 18, color: "#4A0A2E" }}>Focus</span>
          </div>
          <div style={{ minHeight: 64, padding: 20, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--energy)" }}>
            <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 18, color: "#4A3D00" }}>Energy</span>
          </div>
        </div>

        {/* Data rows */}
        {[
          { label: "Primary state", calm: "Composure", focus: "Clear focus", energy: "Steady energy" },
          { label: "Best for", calm: "Travel, social calm, daily reset", focus: "Deep work, meetings, study", energy: "Mornings, long days, travel" },
          { label: "Caffeine", calm: "No", focus: "No", energy: "Yes, 120 mg natural" },
          { label: "Key addition", calm: "Magnesium Bisglycinate", focus: "Cognigrape", energy: "Natural caffeine" },
        ].map((row, idx) => (
          <div
            key={row.label}
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr 1fr 1fr",
              backgroundColor: idx % 2 === 0 ? "var(--base)" : "rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ minHeight: 56, padding: "16px 20px", display: "flex", alignItems: "center", backgroundColor: "var(--base-light)" }}>
              <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>{row.label}</span>
            </div>
            <div style={{ minHeight: 56, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
              <span style={{ fontFamily: GC, fontWeight: 500, fontSize: 14, color: "var(--warm-gray)" }}>{row.calm}</span>
            </div>
            <div style={{ minHeight: 56, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
              <span style={{ fontFamily: GC, fontWeight: 500, fontSize: 14, color: "var(--warm-gray)" }}>{row.focus}</span>
            </div>
            <div style={{ minHeight: 56, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
              <span style={{ fontFamily: GC, fontWeight: 500, fontSize: 14, color: "var(--warm-gray)" }}>{row.energy}</span>
            </div>
          </div>
        ))}

        {/* CTA row */}
        <style>{`
          .compare-cta {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 14px;
            min-height: 46px;
            min-width: 148px;
            padding: 0 28px;
            border-radius: 999px;
            text-decoration: none;
            border: 2px solid var(--charcoal);
            background-color: var(--charcoal);
            color: var(--bone);
            transition: background-color 0.2s ease, color 0.2s ease;
          }
          .compare-cta:hover {
            background-color: transparent;
            color: var(--charcoal);
          }
        `}</style>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr 1fr" }}>
          <div style={{ minHeight: 76, padding: 16, backgroundColor: "var(--base-light)" }} />
          <div style={{ minHeight: 76, padding: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Link href="/calm" className="compare-cta" style={{ fontFamily: GC }}>Shop Calm</Link>
          </div>
          <div style={{ minHeight: 76, padding: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Link href="/focus" className="compare-cta" style={{ fontFamily: GC }}>Shop Focus</Link>
          </div>
          <div style={{ minHeight: 76, padding: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Link href="/energy" className="compare-cta" style={{ fontFamily: GC }}>Shop Energy</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
