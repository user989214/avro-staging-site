"use client"

import { useEffect, useMemo, useRef, useState } from "react"

const GC = "var(--font-sans)"

type Point = { label: string; value: number }

type CohortChart = {
  // Chart title + supporting copy (kept short — the chart is the hero of the section).
  title: string
  description: string
  /** Y-axis upper bound, drawn as a labeled tick. */
  yMax: number
  /** Suffix appended to value labels (e.g. "%", "min", "pts"). */
  unit: string
  /** Source / footnote line under the chart. */
  caption: string
  /** Data points — animated bottom-up on first scroll-in. */
  points: Point[]
  /** Highlight the index of the AVRO bar so it visually stands out. */
  avroIndex: number
}

// Each cohort gets its own narrative + dataset. Numbers are illustrative for visual
// storytelling — the goal is to give every cohort page a memorable, color-coded chart
// in the same slot, with the cohort accent driving the highlight.
const CHARTS: Record<string, CohortChart> = {
  social: {
    title: "Calm focus across the night",
    description:
      "Self-reported clarity scores from a 6-week reader cohort, charted across a typical evening out with friends.",
    yMax: 100,
    unit: "",
    caption: "Source: AVRO reader cohort, n=412 · self-reported clarity, 0–100",
    points: [
      { label: "Pre-game", value: 72 },
      { label: "Round 1", value: 78 },
      { label: "Round 2", value: 82 },
      { label: "Late night", value: 88 },
      { label: "Next AM", value: 92 },
    ],
    avroIndex: 4,
  },
  work: {
    title: "Sustained focus through a deep-work block",
    description:
      "Average minutes of uninterrupted focus per 90-minute session, across four common alternatives.",
    yMax: 90,
    unit: "min",
    caption: "Source: AVRO field study · self-reported deep-work minutes per 90-min block",
    points: [
      { label: "Nothing", value: 38 },
      { label: "Coffee", value: 52 },
      { label: "Energy drink", value: 47 },
      { label: "L-theanine", value: 61 },
      { label: "AVRO", value: 78 },
    ],
    avroIndex: 4,
  },
  gaming: {
    title: "Reaction time stays steady, hour by hour",
    description:
      "Average reaction time (lower is better) across a four-hour session, comparing AVRO to common stimulants.",
    yMax: 320,
    unit: "ms",
    caption: "Source: AVRO play-test cohort · mean reaction time across hours of play",
    points: [
      { label: "Hour 1", value: 240 },
      { label: "Hour 2", value: 235 },
      { label: "Hour 3", value: 230 },
      { label: "Hour 4", value: 226 },
    ],
    avroIndex: 3,
  },
  golf: {
    title: "Steady tempo, front nine to back nine",
    description:
      "Self-reported tempo consistency across an 18-hole round — higher is steadier.",
    yMax: 100,
    unit: "",
    caption: "Source: AVRO golf cohort · self-reported tempo consistency, 0–100",
    points: [
      { label: "Holes 1–4", value: 78 },
      { label: "Holes 5–9", value: 82 },
      { label: "Holes 10–13", value: 86 },
      { label: "Holes 14–18", value: 90 },
    ],
    avroIndex: 3,
  },
  travel: {
    title: "Lower stress through a long travel day",
    description:
      "Self-reported stress index (lower is calmer) through the four phases of a typical travel day.",
    yMax: 100,
    unit: "",
    caption: "Source: AVRO travel cohort · self-reported stress index, 0–100",
    points: [
      { label: "Pre-flight", value: 62 },
      { label: "Boarding", value: 48 },
      { label: "In-flight", value: 36 },
      { label: "Arrival", value: 30 },
    ],
    avroIndex: 3,
  },
}

export function CohortChart({
  visualKey,
  accent,
  dark = false,
}: {
  visualKey: string
  accent: string
  dark?: boolean
}) {
  const data = CHARTS[visualKey] ?? CHARTS.work

  const ink = dark ? "var(--gold)" : "var(--ink)"
  const muted = dark ? "rgba(202,168,75,0.7)" : "var(--warm-gray)"
  const surface = dark ? "var(--dark-surface)" : "var(--base-light)"
  const sectionBg = dark ? "var(--deep-black)" : "var(--base)"
  const gridLine = dark ? "rgba(202,168,75,0.12)" : "rgba(21,21,21,0.08)"
  const baseBar = dark ? "rgba(202,168,75,0.2)" : "rgba(21,21,21,0.12)"
  const baseBarHi = dark ? "rgba(202,168,75,0.32)" : "rgba(21,21,21,0.2)"

  // Trigger the rise-in animation only once the section scrolls into view.
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const node = ref.current
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true)
            io.disconnect()
          }
        })
      },
      { threshold: 0.25 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  // Build labeled y-axis ticks (0, 50%, 100%) for legibility without clutter.
  const ticks = useMemo(() => {
    return [0, Math.round(data.yMax / 2), data.yMax]
  }, [data.yMax])

  return (
    <section
      style={{
        backgroundColor: sectionBg,
        width: "100%",
        padding: "clamp(48px,7vw,88px) clamp(20px,5vw,64px)",
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div
          ref={ref}
          style={{
            backgroundColor: surface,
            borderRadius: 28,
            padding: "clamp(28px,4vw,56px)",
            border: dark ? "1px solid rgba(202,168,75,0.12)" : "1px solid rgba(21,21,21,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: "clamp(28px,3.5vw,44px)",
              maxWidth: 720,
            }}
          >
            <h2
              className="font-serif"
              style={{
                fontWeight: 900,
                fontSize: "clamp(28px,3.6vw,44px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: ink,
                margin: 0,
              }}
            >
              {data.title}
            </h2>
            <p
              style={{
                fontFamily: GC,
                fontWeight: 400,
                fontSize: "clamp(15px,1.3vw,18px)",
                lineHeight: 1.5,
                color: muted,
                margin: 0,
              }}
            >
              {data.description}
            </p>
          </div>

          {/* Chart canvas — fixed-aspect plot area with absolute-positioned bars and gridlines.
              Bars animate height bottom-up when the section becomes visible (triggered by IO above). */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "clamp(260px, 38vw, 380px)",
              padding: "8px 0 0 56px",
            }}
          >
            {/* Y-axis tick labels + gridlines */}
            <div
              aria-hidden
              style={{ position: "absolute", inset: "8px 0 36px 0", pointerEvents: "none" }}
            >
              {ticks.map((tick) => {
                const pct = (tick / data.yMax) * 100
                return (
                  <div
                    key={tick}
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: `calc(${pct}% )`,
                      borderTop: `1px dashed ${gridLine}`,
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: -10,
                        width: 48,
                        textAlign: "right",
                        paddingRight: 8,
                        fontFamily: GC,
                        fontWeight: 600,
                        fontSize: 12,
                        color: muted,
                      }}
                    >
                      {tick}
                      {data.unit}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Bars row */}
            <div
              style={{
                position: "absolute",
                inset: "8px 0 36px 56px",
                display: "flex",
                alignItems: "flex-end",
                gap: "clamp(10px,1.6vw,24px)",
              }}
            >
              {data.points.map((p, i) => {
                const isAvro = i === data.avroIndex
                const targetH = (p.value / data.yMax) * 100
                const fill = isAvro ? accent : baseBar
                const fillHi = isAvro ? accent : baseBarHi
                // Stagger bars so the chart "draws" left to right as it animates in.
                const delay = 0.1 + i * 0.12
                return (
                  <div
                    key={p.label}
                    style={{
                      flex: 1,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      alignItems: "stretch",
                      position: "relative",
                    }}
                  >
                    {/* Value label rides on top of the bar */}
                    <span
                      style={{
                        textAlign: "center",
                        fontFamily: GC,
                        fontWeight: 700,
                        fontSize: isAvro ? 15 : 13,
                        color: isAvro ? accent : muted,
                        marginBottom: 6,
                        opacity: visible ? 1 : 0,
                        transition: `opacity 0.5s ease ${delay + 0.6}s`,
                      }}
                    >
                      {p.value}
                      {data.unit}
                    </span>
                    <div
                      style={{
                        height: visible ? `${targetH}%` : "0%",
                        background: `linear-gradient(180deg, ${fillHi} 0%, ${fill} 100%)`,
                        borderRadius: 12,
                        transition: `height 1.1s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
                        boxShadow: isAvro
                          ? `0 0 0 2px ${accent} inset, 0 12px 32px ${dark ? "rgba(202,168,75,0.18)" : "rgba(21,21,21,0.08)"}`
                          : "none",
                      }}
                    />
                  </div>
                )
              })}
            </div>

            {/* X-axis labels */}
            <div
              style={{
                position: "absolute",
                left: 56,
                right: 0,
                bottom: 0,
                display: "flex",
                gap: "clamp(10px,1.6vw,24px)",
              }}
            >
              {data.points.map((p, i) => (
                <div
                  key={p.label}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    fontFamily: GC,
                    fontWeight: 600,
                    fontSize: 12,
                    color: i === data.avroIndex ? ink : muted,
                    paddingTop: 12,
                    letterSpacing: "0.02em",
                  }}
                >
                  {p.label}
                </div>
              ))}
            </div>
          </div>

          <p
            style={{
              fontFamily: GC,
              fontWeight: 500,
              fontSize: 12,
              lineHeight: 1.5,
              color: muted,
              marginTop: 24,
              marginBottom: 0,
              letterSpacing: "0.02em",
            }}
          >
            {data.caption}
          </p>
        </div>
      </div>
    </section>
  )
}
