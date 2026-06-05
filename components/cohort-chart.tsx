"use client"

import { useEffect, useMemo, useRef, useState } from "react"

const GC = "var(--font-sans)"

type Point = { label: string; value: number }

type ChartKind = "area" | "line" | "twoLine" | "clocks"

/** Two-series comparison line chart (PharmaGABA vs Placebo). */
type TwoLineSeries = {
  /** Per-point x labels (omit for dense charts that only show an axis title). */
  xLabels?: string[]
  /** Centered axis title under the x-axis (e.g. "Number of games"). */
  xAxisLabel?: string
  /** AVRO / PharmaGABA series values (themed with the cohort accent). */
  avro: number[]
  /** Placebo / control series values (neutral grey). */
  placebo: number[]
  yMin: number
  yMax: number
  /** Explicit gridline values + numeric labels. Omit for a baseline-only chart. */
  yTicks?: number[]
  /** Rotated y-axis title. */
  yAxisLabel?: string
  /** Labels for the top/bottom of the axis when there are no numeric ticks. */
  yTopLabel?: string
  yBottomLabel?: string
  /** Draw a solid baseline (e.g. 0 = no change from baseline). */
  baselineValue?: number
  avroLabel: string
  placeboLabel: string
  /** Indices where a dashed "Break" marker is drawn. */
  breaks?: number[]
}

type CohortChartConfig = {
  kind: ChartKind
  // Chart title + supporting copy (kept short — the chart is the hero of the section).
  title: string
  description: string
  /** Y-axis upper bound, drawn as a labeled tick. */
  yMax: number
  /** Lower bound (used by line/area for charts where the interesting range is high). */
  yMin?: number
  /** Suffix appended to value labels (e.g. "%", "min", "pts"). */
  unit: string
  /** Source / footnote line under the chart. */
  caption: string
  /** Data points — animated on first scroll-in. */
  points: Point[]
  /** Highlight the index of the AVRO bar/marker so it visually stands out (line/area only). */
  avroIndex: number
  /** Lower is better (used by line labels to phrase deltas correctly). */
  lowerIsBetter?: boolean
  /** twoLine-only: two-series comparison data. */
  twoLine?: TwoLineSeries
}

// Each cohort gets its own chart shape — a different visualization built from
// the same design language. The shape is chosen to fit the story:
//   • social  – clocks (the night that doesn't end early — AVRO keeps going)
//   • work    – area (sustained block of deep work)
//   • gaming  – line (consistency hour after hour)
//   • golf    – dial (single tempo-consistency score)
//   • travel  – descending area (stress falling through the day)
const CHARTS: Record<string, CohortChartConfig> = {
  social: {
    kind: "clocks",
    title: "Still going",
    description:
      "Round and round — AVRO keeps clarity going long after others wind down.",
    yMax: 100,
    unit: "",
    caption: "Illustrative — AVRO reader cohort, self-reported clarity",
    // Single AVRO clock. The hand sweeps three full revolutions, painting a glowing
    // gold trail layered around the face, before coming to rest at 12.
    points: [{ label: "AVRO", value: 12 }],
    avroIndex: 0,
  },
  work: {
    kind: "area",
    title: "Built for mentally demanding moments.",
    description:
      "When work requires attention, meetings require presence, or projects require focus, AVRO supports calm, clarity, and readiness.",
    yMax: 100,
    yMin: 30,
    unit: "",
    caption: "Source: AVRO field study · self-reported focus, 0–100",
    points: [
      { label: "0 min", value: 62 },
      { label: "20 min", value: 78 },
      { label: "40 min", value: 86 },
      { label: "60 min", value: 88 },
      { label: "90 min", value: 84 },
    ],
    avroIndex: 3,
  },
  gaming: {
    kind: "twoLine",
    title: "GABA x Esports Scores",
    description:
      "Across a long session, the GABA group held a higher, steadier score than placebo — even across breaks.",
    yMax: 1350,
    unit: "",
    caption: "Illustrative — GABA beverage vs. placebo · score across number of games",
    points: [],
    avroIndex: 0,
    twoLine: {
      xAxisLabel: "Number of games (times)",
      avro: [
        1075, 1150, 1118, 1140, 1148, 1180, 1170, 1178, 1168, 1195, 1165, 1155, 1185, 1165, 1180,
        1225, 1245, 1270,
      ],
      placebo: [
        1030, 1050, 1088, 1130, 1090, 1065, 1110, 1070, 1070, 1030, 1050, 1040, 1120, 1078, 1095,
        1125, 1070, 1062,
      ],
      yMin: 950,
      yMax: 1350,
      yTicks: [950, 1050, 1150, 1250, 1350],
      yAxisLabel: "Score",
      avroLabel: "GABA",
      placeboLabel: "Placebo",
      breaks: [6, 12],
    },
  },
  golf: {
    kind: "twoLine",
    title: "A more composed zone-state under pressure",
    description:
      "PharmaGABA® has been studied in pressure-sensitive performance settings and is associated with a more composed zone-state profile versus placebo.",
    yMax: 100,
    unit: "",
    caption: "Zone-state score (change from baseline) · adapted from PharmaGABA® performance research",
    points: [],
    avroIndex: 0,
    twoLine: {
      xLabels: ["Early", "Mid", "Late"],
      avro: [0, 4.5, 4],
      placebo: [0, -3.5, -5],
      yMin: -7,
      yMax: 7,
      yTopLabel: "High",
      yBottomLabel: "Low",
      baselineValue: 0,
      avroLabel: "PharmaGABA®",
      placeboLabel: "Placebo",
    },
  },
  travel: {
    kind: "area",
    title: "Lower stress through a long travel day",
    description:
      "Self-reported stress index (lower is calmer) through the four phases of a typical travel day.",
    yMax: 100,
    yMin: 0,
    unit: "",
    lowerIsBetter: true,
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

  // Color tokens — Zero Proof uses gold-on-deep-black with solid (non-gradient) cards.
  // Light cohorts use the bone/cream system with charcoal ink + the cohort accent.
  const sectionBg = dark ? "var(--deep-black)" : "var(--base)"
  const cardBg = dark ? "var(--gold)" : "var(--base-light)"
  const ink = dark ? "var(--deep-black)" : "var(--ink)"
  const muted = dark ? "rgba(13,13,13,0.7)" : "var(--warm-gray)"
  const gridLine = dark ? "rgba(13,13,13,0.18)" : "rgba(21,21,21,0.1)"
  // Non-AVRO bar/line color — dimmed but legible against whichever card background we're on.
  // On the gold card (Zero Proof) we need a much darker fill to actually read against gold.
  const baseFill = dark ? "rgba(13,13,13,0.55)" : "rgba(21,21,21,0.18)"
  const baseStroke = dark ? "rgba(13,13,13,0.7)" : "rgba(21,21,21,0.45)"
  // AVRO color sits against the card — on the gold card we use deep-black so it pops;
  // on light cards the cohort accent (blue, green, gold) is the highlight.
  const avroFill = dark ? "var(--deep-black)" : accent
  const avroStroke = dark ? "var(--deep-black)" : accent

  // Trigger the chart's draw-in animation only after the card scrolls into view.
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
            backgroundColor: cardBg,
            borderRadius: 28,
            padding: "clamp(28px,4vw,56px)",
            // Solid card — no gradients, no faded fills.
            border: dark ? "none" : "1px solid rgba(21,21,21,0.06)",
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
                fontWeight: 500,
                fontSize: "clamp(15px,1.3vw,18px)",
                lineHeight: 1.5,
                color: muted,
                margin: 0,
              }}
            >
              {data.description}
            </p>
          </div>

          {data.kind === "twoLine" && (
            <TwoLineChart
              data={data}
              ink={ink}
              muted={muted}
              gridLine={gridLine}
              baseStroke={baseStroke}
              avroStroke={avroStroke}
              visible={visible}
            />
          )}

          {data.kind === "clocks" && (
            <ClocksChart
              data={data}
              ink={ink}
              muted={muted}
              baseStroke={baseStroke}
              avroStroke={avroStroke}
              visible={visible}
              dark={dark}
            />
          )}

          {(data.kind === "area" || data.kind === "line") && (
            <LineAreaChart
              data={data}
              ink={ink}
              muted={muted}
              gridLine={gridLine}
              baseStroke={baseStroke}
              avroFill={avroFill}
              avroStroke={avroStroke}
              visible={visible}
            />
          )}

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

/* ---------- Two-line comparison (golf, gaming) ----------
 *
 * PharmaGABA / GABA series (cohort accent, circle markers) vs Placebo
 * (neutral grey, square markers). Supports an optional solid baseline
 * (golf — change-from-baseline), numeric gridlines (gaming — score),
 * and dashed "Break" markers between sessions.
 */
function TwoLineChart({
  data,
  ink,
  muted,
  gridLine,
  baseStroke,
  avroStroke,
  visible,
}: {
  data: CohortChartConfig
  ink: string
  muted: string
  gridLine: string
  baseStroke: string
  avroStroke: string
  visible: boolean
}) {
  const cfg = data.twoLine
  if (!cfg) return null

  const W = 820
  const H = 360
  const padLeft = 60
  const padRight = 24
  const padTop = 28
  const padBottom = 48
  const plotW = W - padLeft - padRight
  const plotH = H - padTop - padBottom
  const n = cfg.avro.length
  const dense = n > 6

  const xFor = (i: number) => padLeft + (n > 1 ? (plotW * i) / (n - 1) : plotW / 2)
  const yFor = (v: number) => padTop + plotH - ((v - cfg.yMin) / (cfg.yMax - cfg.yMin)) * plotH

  const buildPath = (vals: number[]) =>
    vals.map((v, i) => `${i === 0 ? "M" : "L"} ${xFor(i).toFixed(1)} ${yFor(v).toFixed(1)}`).join(" ")

  const avroD = buildPath(cfg.avro)
  const placeboD = buildPath(cfg.placebo)
  const pathLen = n * 260
  const markerR = dense ? 4 : 6.5
  const markerHalf = dense ? 4.5 : 6.5

  return (
    <div style={{ width: "100%" }}>
      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(14px,2vw,28px)", marginBottom: 16 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 13, height: 13, borderRadius: 999, backgroundColor: avroStroke, display: "inline-block" }} />
          <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 13, color: ink }}>{cfg.avroLabel}</span>
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 12, height: 12, backgroundColor: baseStroke, display: "inline-block" }} />
          <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 13, color: muted }}>{cfg.placeboLabel}</span>
        </span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", height: "clamp(260px, 40vw, 400px)", display: "block" }}
        role="img"
        aria-label={data.title}
      >
        {/* Numeric gridlines (gaming) */}
        {cfg.yTicks?.map((t) => {
          const y = yFor(t)
          return (
            <g key={t}>
              <line x1={padLeft} x2={W - padRight} y1={y} y2={y} stroke={gridLine} strokeDasharray="3 5" />
              <text x={padLeft - 8} y={y + 4} textAnchor="end" fontFamily={GC} fontWeight={600} fontSize="12" fill={muted}>
                {t}
              </text>
            </g>
          )
        })}

        {/* High / Low end labels (golf — no numeric ticks) */}
        {!cfg.yTicks && cfg.yTopLabel && (
          <text x={padLeft - 8} y={padTop + 10} textAnchor="end" fontFamily={GC} fontWeight={700} fontSize="12" fill={muted}>
            {cfg.yTopLabel}
          </text>
        )}
        {!cfg.yTicks && cfg.yBottomLabel && (
          <text x={padLeft - 8} y={padTop + plotH} textAnchor="end" fontFamily={GC} fontWeight={700} fontSize="12" fill={muted}>
            {cfg.yBottomLabel}
          </text>
        )}

        {/* Solid baseline (golf — 0 = no change) */}
        {cfg.baselineValue != null && (
          <>
            <line
              x1={padLeft}
              x2={W - padRight}
              y1={yFor(cfg.baselineValue)}
              y2={yFor(cfg.baselineValue)}
              stroke={ink}
              strokeWidth={2}
            />
            <text x={padLeft - 8} y={yFor(cfg.baselineValue) + 4} textAnchor="end" fontFamily={GC} fontWeight={600} fontSize="12" fill={muted}>
              0
            </text>
          </>
        )}

        {/* Y axis line */}
        <line x1={padLeft} x2={padLeft} y1={padTop} y2={padTop + plotH} stroke={ink} strokeWidth={2} />

        {/* Break markers (gaming) */}
        {cfg.breaks?.map((bi) => {
          const x = xFor(bi)
          return (
            <g key={`brk-${bi}`} opacity={visible ? 1 : 0} style={{ transition: "opacity 0.5s ease 0.6s" }}>
              <line x1={x} x2={x} y1={padTop} y2={padTop + plotH} stroke={baseStroke} strokeWidth={1.5} strokeDasharray="4 8" />
              <text x={x} y={padTop - 8} textAnchor="middle" fontFamily={GC} fontWeight={700} fontSize="12" fill={muted}>
                Break
              </text>
            </g>
          )
        })}

        {/* Placebo line (under) */}
        <path
          d={placeboD}
          fill="none"
          stroke={baseStroke}
          strokeWidth={dense ? 3 : 3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLen}
          strokeDashoffset={visible ? 0 : pathLen}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.2s" }}
        />
        {/* AVRO / GABA line */}
        <path
          d={avroD}
          fill="none"
          stroke={avroStroke}
          strokeWidth={dense ? 3.5 : 4}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLen}
          strokeDashoffset={visible ? 0 : pathLen}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.1s" }}
        />

        {/* Placebo markers (squares) */}
        {cfg.placebo.map((v, i) => {
          const delay = Math.min(0.6 + i * 0.06, 1.4)
          return (
            <rect
              key={`pb-${i}`}
              x={xFor(i) - markerHalf}
              y={yFor(v) - markerHalf}
              width={markerHalf * 2}
              height={markerHalf * 2}
              fill={baseStroke}
              opacity={visible ? 1 : 0}
              style={{ transition: `opacity 0.4s ease ${delay}s` }}
            />
          )
        })}
        {/* AVRO markers (circles) */}
        {cfg.avro.map((v, i) => {
          const delay = Math.min(0.6 + i * 0.06, 1.4)
          return (
            <circle
              key={`av-${i}`}
              cx={xFor(i)}
              cy={yFor(v)}
              r={markerR}
              fill={avroStroke}
              opacity={visible ? 1 : 0}
              style={{ transition: `opacity 0.4s ease ${delay}s` }}
            />
          )
        })}

        {/* Per-point x labels (golf) */}
        {cfg.xLabels?.map((lbl, i) => (
          <text
            key={`xl-${i}`}
            x={xFor(i)}
            y={H - 14}
            textAnchor="middle"
            fontFamily={GC}
            fontWeight={600}
            fontSize="12"
            fill={muted}
          >
            {lbl}
          </text>
        ))}

        {/* X-axis title (gaming) */}
        {cfg.xAxisLabel && (
          <text x={padLeft + plotW / 2} y={H - 10} textAnchor="middle" fontFamily={GC} fontWeight={600} fontSize="12" fill={muted}>
            {cfg.xAxisLabel}
          </text>
        )}

        {/* Y-axis title (rotated) */}
        {cfg.yAxisLabel && (
          <text
            x={16}
            y={padTop + plotH / 2}
            transform={`rotate(-90 16 ${padTop + plotH / 2})`}
            textAnchor="middle"
            fontFamily={GC}
            fontWeight={700}
            fontSize="12"
            fill={muted}
          >
            {cfg.yAxisLabel}
          </text>
        )}
      </svg>
    </div>
  )
}

/* ---------- Line / Area (work, gaming, travel) ---------- */
function LineAreaChart({
  data,
  ink,
  muted,
  gridLine,
  baseStroke,
  avroFill,
  avroStroke,
  visible,
}: {
  data: CohortChartConfig
  ink: string
  muted: string
  gridLine: string
  baseStroke: string
  avroFill: string
  avroStroke: string
  visible: boolean
}) {
  // SVG viewBox uses a normalized coordinate space — easier to do path math.
  const W = 800
  const H = 320
  const padLeft = 56
  const padRight = 16
  const padTop = 24
  const padBottom = 40

  const yMin = data.yMin ?? 0
  const yMax = data.yMax
  const plotW = W - padLeft - padRight
  const plotH = H - padTop - padBottom

  const xFor = (i: number) =>
    padLeft + (data.points.length > 1 ? (plotW * i) / (data.points.length - 1) : plotW / 2)
  const yFor = (v: number) => padTop + plotH - ((v - yMin) / (yMax - yMin)) * plotH

  const pathD = data.points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(p.value)}`)
    .join(" ")
  const areaD =
    data.kind === "area"
      ? `${pathD} L ${xFor(data.points.length - 1)} ${padTop + plotH} L ${xFor(0)} ${padTop + plotH} Z`
      : null

  const ticks = useMemo(
    () => [yMin, Math.round((yMin + yMax) / 2), yMax],
    [yMin, yMax],
  )

  // Estimate path length so the stroke can "draw in" with stroke-dashoffset.
  const pathLen = data.points.length * 220

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", height: "clamp(260px, 38vw, 380px)", display: "block" }}
        role="img"
        aria-label={data.title}
      >
        {/* Gridlines + y-tick labels */}
        {ticks.map((t) => {
          const y = yFor(t)
          return (
            <g key={t}>
              <line
                x1={padLeft}
                x2={W - padRight}
                y1={y}
                y2={y}
                stroke={gridLine}
                strokeDasharray="3 5"
              />
              <text
                x={padLeft - 8}
                y={y + 4}
                textAnchor="end"
                fontFamily={GC}
                fontWeight={600}
                fontSize="12"
                fill={muted}
              >
                {t}
                {data.unit}
              </text>
            </g>
          )
        })}

        {/* Area fill (solid color — no gradient) */}
        {areaD && (
          <path
            d={areaD}
            fill={avroFill}
            opacity={visible ? 0.18 : 0}
            style={{ transition: "opacity 0.8s ease 0.6s" }}
          />
        )}

        {/* Main stroke — draws in left-to-right */}
        <path
          d={pathD}
          fill="none"
          stroke={avroStroke}
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLen}
          strokeDashoffset={visible ? 0 : pathLen}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.1s" }}
        />

        {/* Point markers */}
        {data.points.map((p, i) => {
          const isAvro = i === data.avroIndex
          const cx = xFor(i)
          const cy = yFor(p.value)
          const delay = 0.6 + i * 0.12
          return (
            <g key={p.label}>
              <circle
                cx={cx}
                cy={cy}
                r={isAvro ? 7 : 5}
                fill={isAvro ? avroStroke : ink}
                stroke={isAvro ? avroStroke : baseStroke}
                strokeWidth={isAvro ? 0 : 1}
                opacity={visible ? 1 : 0}
                style={{ transition: `opacity 0.4s ease ${delay}s, r 0.4s ease ${delay}s` }}
              />
              <text
                x={cx}
                y={cy - (isAvro ? 16 : 12)}
                textAnchor="middle"
                fontFamily={GC}
                fontWeight={700}
                fontSize={isAvro ? 15 : 12}
                fill={isAvro ? ink : muted}
                opacity={visible ? 1 : 0}
                style={{ transition: `opacity 0.4s ease ${delay + 0.1}s` }}
              >
                {p.value}
                {data.unit}
              </text>
            </g>
          )
        })}

        {/* X-axis labels */}
        {data.points.map((p, i) => (
          <text
            key={p.label}
            x={xFor(i)}
            y={H - 12}
            textAnchor="middle"
            fontFamily={GC}
            fontWeight={600}
            fontSize="12"
            fill={i === data.avroIndex ? ink : muted}
          >
            {p.label}
          </text>
        ))}
      </svg>
    </div>
  )
}

/* ---------- Clocks (social) ----------
 *
 * Simple, solid illustration: one centered clock with hour ticks, two hand bars,
 * and a bold trail that paints around the rim a few times before the hands park
 * at 12. No labels on the face, no shadows, no emerge animation — just a clean
 * graphic of a clock that keeps going.
 */
function ClocksChart({
  data,
  ink,
  muted,
  avroStroke,
  visible,
}: {
  data: CohortChartConfig
  ink: string
  muted: string
  baseStroke: string
  avroStroke: string
  visible: boolean
  dark: boolean
}) {
  const cx = 160
  const cy = 160
  const R = 130
  const TRACK_W = 14
  const TICK_OUTER = R - 2
  const TICK_INNER = R - 16
  const HOUR_HAND = R - 60
  const MINUTE_HAND = R - 30

  const LAPS = 3
  const PATH = 360 * LAPS
  const SPIN_DURATION = 10

  const avro = data.points[data.avroIndex] ?? data.points[0]

  return (
    <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
      <style>{`
        @keyframes clk-trail-fill {
          0%   { stroke-dashoffset: ${PATH}; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes clk-hand-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(${360 * LAPS}deg); }
        }
        .clk-trail { stroke-dasharray: ${PATH}; stroke-dashoffset: ${PATH}; }
        .clk-trail.run {
          animation: clk-trail-fill ${SPIN_DURATION}s cubic-bezier(0.45, 0.05, 0.25, 1) forwards;
        }
        .clk-hand { transform-origin: ${cx}px ${cy}px; transform: rotate(0deg); }
        .clk-hand.run {
          animation: clk-hand-spin ${SPIN_DURATION}s cubic-bezier(0.45, 0.05, 0.25, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .clk-trail.run, .clk-hand.run { animation: none !important; }
          .clk-trail.run { stroke-dashoffset: 0 !important; }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          width: "100%",
          maxWidth: 320,
        }}
      >
        <svg
          viewBox="0 0 320 320"
          style={{ width: "100%", height: "auto", display: "block" }}
          role="img"
          aria-label="AVRO clock — hands sweeping slowly around the face"
        >
          {/* Background track ring — soft, low contrast so the trail pops over it. */}
          <circle
            cx={cx}
            cy={cy}
            r={R}
            fill="none"
            stroke={ink}
            strokeOpacity={0.12}
            strokeWidth={TRACK_W}
            strokeLinecap="round"
          />

          {/* Twelve hour ticks — just inside the rim. */}
          {Array.from({ length: 12 }).map((_, k) => {
            const angle = (k / 12) * Math.PI * 2 - Math.PI / 2
            const x1 = cx + Math.cos(angle) * TICK_INNER
            const y1 = cy + Math.sin(angle) * TICK_INNER
            const x2 = cx + Math.cos(angle) * TICK_OUTER
            const y2 = cy + Math.sin(angle) * TICK_OUTER
            return (
              <line
                key={k}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={muted}
                strokeWidth={k % 3 === 0 ? 3 : 1.75}
                strokeLinecap="round"
                opacity={k % 3 === 0 ? 0.9 : 0.5}
              />
            )
          })}

          {/* Trail — paints three times around the rim. Rotated -90° so the dash starts at 12. */}
          <g transform={`rotate(-90 ${cx} ${cy})`}>
            <circle
              className={`clk-trail${visible ? " run" : ""}`}
              cx={cx}
              cy={cy}
              r={R}
              fill="none"
              stroke={avroStroke}
              strokeWidth={TRACK_W}
              strokeLinecap="round"
              pathLength={PATH}
            />
          </g>

          {/* Two hand bars — minute (longer, slimmer) and hour (shorter, thicker). */}
          <g className={`clk-hand${visible ? " run" : ""}`}>
            <line
              x1={cx}
              y1={cy}
              x2={cx}
              y2={cy - HOUR_HAND}
              stroke={avroStroke}
              strokeWidth={8}
              strokeLinecap="round"
            />
            <line
              x1={cx}
              y1={cy}
              x2={cx}
              y2={cy - MINUTE_HAND}
              stroke={avroStroke}
              strokeWidth={5}
              strokeLinecap="round"
            />
          </g>

          {/* Center cap. */}
          <circle cx={cx} cy={cy} r={9} fill={avroStroke} />
        </svg>

        <div style={{ textAlign: "center" }}>
          <div
            className="font-serif"
            style={{
              fontWeight: 900,
              fontSize: "clamp(24px, 2.6vw, 34px)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: ink,
            }}
          >
            {avro?.label ?? "AVRO"}
          </div>
          <div
            style={{
              marginTop: 8,
              fontFamily: GC,
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: muted,
            }}
          >
            Still going
          </div>
        </div>
      </div>
    </div>
  )
}

