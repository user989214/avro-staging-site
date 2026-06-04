"use client"

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

const GC = '"DM Sans", system-ui, sans-serif'
const BLUE = "#94C6D4"
const GREY = "rgba(245,241,234,0.55)"

// ── CALM PAGE — PharmaGABA stress study ─────────────────────────────────────
// Source: T. Kanehira et al., J Nutr Sci Vitaminol. 2011;57(1):9-15.
// Salivary Chromogranin A (CgA) & cortisol — stress markers — measured across
// the Uchida-Kraepelin arithmetic task. Control rises sharply; the GABA
// beverage group stays significantly lower. Values shown as a relative stress
// index (baseline = 100).
const calmStudyData = [
  { phase: "Before", control: 100, gaba: 100 },
  { phase: "After 1st half", control: 138, gaba: 112 },
  { phase: "After 2nd half", control: 162, gaba: 117 },
]

// Square marker for the control group
function SquareDot(props: any) {
  const { cx, cy } = props
  if (cx == null || cy == null) return null
  return (
    <rect
      x={cx - 5}
      y={cy - 5}
      width={10}
      height={10}
      fill={GREY}
      stroke="var(--charcoal)"
      strokeWidth={1.5}
    />
  )
}

// Circle marker for the GABA beverage group
function CircleDot(props: any) {
  const { cx, cy } = props
  if (cx == null || cy == null) return null
  return (
    <circle
      cx={cx}
      cy={cy}
      r={5.5}
      fill={BLUE}
      stroke="var(--charcoal)"
      strokeWidth={1.5}
    />
  )
}

export function CalmStudyChart() {
  return (
    <div style={{ padding: "clamp(14px,2vw,24px)", backgroundColor: "var(--charcoal)", borderRadius: 20 }}>
      {/* Y-axis caption + chart */}
      <div style={{ position: "relative", width: "100%", height: "clamp(200px,26vw,280px)" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={calmStudyData} margin={{ top: 16, right: 16, bottom: 8, left: 8 }}>
            <CartesianGrid stroke="rgba(245,241,234,0.1)" vertical={false} />
            <XAxis
              dataKey="phase"
              tick={{ fill: "rgba(245,241,234,0.6)", fontFamily: GC, fontSize: 11, fontWeight: 700 }}
              tickLine={false}
              axisLine={{ stroke: "rgba(245,241,234,0.2)" }}
            />
            <YAxis
              tick={{ fill: "rgba(245,241,234,0.5)", fontFamily: GC, fontSize: 11, fontWeight: 700 }}
              tickLine={false}
              axisLine={false}
              label={{
                value: "Stress (CgA) & Cortisol",
                angle: -90,
                position: "insideLeft",
                style: { fill: "rgba(245,241,234,0.55)", fontFamily: GC, fontSize: 11, fontWeight: 700, textAnchor: "middle" },
              }}
            />
            <Line
              type="monotone"
              dataKey="control"
              stroke={GREY}
              strokeWidth={2.5}
              dot={<SquareDot />}
              activeDot={false}
              isAnimationActive
            />
            <Line
              type="monotone"
              dataKey="gaba"
              stroke={BLUE}
              strokeWidth={3}
              dot={<CircleDot />}
              activeDot={false}
              isAnimationActive
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(12px,2vw,24px)",
          marginTop: 12,
          paddingTop: 12,
          borderTop: "1px solid rgba(245,241,234,0.15)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 11, height: 11, backgroundColor: BLUE, display: "inline-block", borderRadius: 999 }} />
          <span style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(10px,0.9vw,12px)", color: "var(--bone)" }}>
            GABA Beverage
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 11, height: 11, backgroundColor: GREY, display: "inline-block" }} />
          <span style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(10px,0.9vw,12px)", color: "rgba(245,241,234,0.6)" }}>
            Control
          </span>
        </div>
      </div>

      {/* Source */}
      <p style={{ fontFamily: GC, fontWeight: 400, fontSize: "clamp(9px,0.8vw,11px)", color: "rgba(245,241,234,0.4)", textAlign: "center", margin: "10px 0 0", lineHeight: 1.4 }}>
        Adapted from T. Kanehira et al., J Nutr Sci Vitaminol. 2011;57(1):9-15.
      </p>
    </div>
  )
}

// ── FOCUS / WORK PAGE — PharmaGABA cognitive benefits ───────────────────────
// Source: PharmaGABA large-scale clinical study (200 mg). Logical thinking,
// working memory, sustained attention, etc. were improved.
const cognitiveBenefits = [
  "Logical thinking",
  "Working memory",
  "Sustained attention",
  "Visuospatial & construction ability",
  "Long-term memory",
  "Vitality",
  "Mental health",
]

export function FocusBenefitsTable() {
  return (
    <div style={{ padding: "clamp(16px,2.4vw,28px)", backgroundColor: "var(--charcoal)", borderRadius: 20 }}>
      <h3 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(13px,1.2vw,16px)", color: "var(--bone)", margin: "0 0 4px" }}>
        Improved cognitive functions by GABA
      </h3>
      <p style={{ fontFamily: GC, fontWeight: 400, fontSize: "clamp(11px,1vw,13px)", color: "rgba(245,241,234,0.55)", margin: "0 0 16px" }}>
        Measured at 200 mg in clinical study.
      </p>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" }}>
        {cognitiveBenefits.map((benefit, i) => (
          <li
            key={benefit}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "11px 0",
              borderTop: i > 0 ? "1px solid rgba(245,241,234,0.12)" : "none",
            }}
          >
            <span
              style={{
                display: "grid",
                placeItems: "center",
                width: 24,
                height: 24,
                borderRadius: 999,
                backgroundColor: BLUE,
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 13l4 4L19 7" stroke="var(--charcoal)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span style={{ fontFamily: GC, fontWeight: 600, fontSize: "clamp(13px,1.2vw,16px)", color: "var(--bone)" }}>
              {benefit}
            </span>
          </li>
        ))}
      </ul>
      <p style={{ fontFamily: GC, fontWeight: 400, fontSize: "clamp(9px,0.8vw,11px)", color: "rgba(245,241,234,0.4)", margin: "16px 0 0", lineHeight: 1.4 }}>
        Adapted from PharmaGABA® clinical research. pharmagaba.com
      </p>
    </div>
  )
}

// ── WORK PAGE — same cognitive benefits chart as the Focus page ──────────────
export function WorkBenefitsSection() {
  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div
          style={{
            backgroundColor: "var(--base-light)",
            borderRadius: 28,
            padding: "clamp(28px,4vw,56px)",
            border: "1px solid rgba(21,21,21,0.06)",
            display: "grid",
            gap: "clamp(24px,3vw,48px)",
            alignItems: "center",
          }}
          className="work-benefits-grid"
        >
          <style>{`
            @media (min-width: 1024px) {
              .work-benefits-grid { grid-template-columns: 1fr 1fr !important; }
            }
          `}</style>
          <div>
            <h2
              className="font-serif"
              style={{ fontWeight: 900, fontSize: "clamp(28px,3.6vw,44px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 12px" }}
            >
              Built for mentally demanding work.
            </h2>
            <p style={{ fontFamily: GC, fontWeight: 500, fontSize: "clamp(15px,1.3vw,18px)", lineHeight: 1.5, color: "var(--warm-gray)", margin: 0 }}>
              In clinical research, PharmaGABA® improved cognitive functions in a dose-dependent way — supporting the kind of logical thinking, working memory, and sustained attention that demanding work requires.
            </p>
          </div>
          <FocusBenefitsTable />
        </div>
      </div>
    </section>
  )
}
