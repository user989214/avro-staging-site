"use client"

const GC = "var(--font-geist), -apple-system, BlinkMacSystemFont, system-ui, sans-serif"

export function CompareAtAGlance() {
  return (
    <div className="relative">
      <h2
        className="font-serif"
        style={{
          fontWeight: 900,
          fontSize: "clamp(26px,4vw,52px)",
          lineHeight: 1.02,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          textAlign: "left",
          marginBottom: 24,
          maxWidth: 720,
        }}
      >
        Compare at a glance
      </h2>

      <div
        className="overflow-x-auto -mx-4 px-4"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div
          style={{
            backgroundColor: "var(--base)",
            borderRadius: 20,
            overflow: "hidden",
            border: "2px solid var(--charcoal)",
            minWidth: 520,
          }}
        >
          {/* Header row */}
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr 1fr" }}>
            <div style={{ minHeight: 64, padding: "16px 18px", display: "flex", alignItems: "center", backgroundColor: "var(--charcoal)" }}>
              <span style={{ fontFamily: GC, fontWeight: 800, fontSize: 17, letterSpacing: "0.06em", color: "var(--bone)" }}>COMPARE</span>
            </div>
            <div style={{ minHeight: 64, padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--calm)" }}>
              <span style={{ fontFamily: GC, fontWeight: 800, fontSize: 17, letterSpacing: "0.06em", color: "#2D1B4E" }}>CALM</span>
            </div>
            <div style={{ minHeight: 64, padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--focus)" }}>
              <span style={{ fontFamily: GC, fontWeight: 800, fontSize: 17, letterSpacing: "0.06em", color: "#4A0A2E" }}>FOCUS</span>
            </div>
            <div style={{ minHeight: 64, padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--energy)" }}>
              <span style={{ fontFamily: GC, fontWeight: 800, fontSize: 17, letterSpacing: "0.06em", color: "#4A3D00" }}>ENERGY</span>
            </div>
          </div>

          {/* Data rows */}
          {[
            { label: "Primary State", calm: "Composure", focus: "Clear Focus", energy: "Steady Energy" },
            { label: "Best For", calm: "Travel, Social Calm, Daily Reset", focus: "Deep Work, Meetings, Study", energy: "Mornings, Long Days, Travel" },
            { label: "Caffeine", calm: "No", focus: "No", energy: "Yes, 120 mg" },
            { label: "Key Addition", calm: "Magnesium Bisglycinate", focus: "Cognigrape®", energy: "Natural Caffeine" },
          ].map((row, idx) => (
            <div
              key={row.label}
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 1fr 1fr 1fr",
                backgroundColor: idx % 2 === 0 ? "var(--base)" : "rgba(0,0,0,0.02)",
              }}
            >
              <div style={{ minHeight: 60, padding: "16px 18px", display: "flex", alignItems: "center", backgroundColor: "var(--base-light)" }}>
                <span style={{ fontFamily: GC, fontWeight: 800, fontSize: 15, color: "var(--ink)" }}>{row.label}</span>
              </div>
              <div style={{ minHeight: 60, padding: "16px 14px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <span style={{ fontFamily: GC, fontWeight: 600, fontSize: 14, color: "var(--ink)" }}>{row.calm}</span>
              </div>
              <div style={{ minHeight: 60, padding: "16px 14px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <span style={{ fontFamily: GC, fontWeight: 600, fontSize: 14, color: "var(--ink)" }}>{row.focus}</span>
              </div>
              <div style={{ minHeight: 60, padding: "16px 14px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <span style={{ fontFamily: GC, fontWeight: 600, fontSize: 14, color: "var(--ink)" }}>{row.energy}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
