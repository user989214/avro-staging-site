"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { formulas, type FormulaKey, testimonials } from "@/lib/data"
import { Icon } from "@/components/icons"
import { AvroIcon, type AvroIconName } from "@/components/avro-icons"

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
      <p style={{ fontFamily: GC, fontWeight: 400, fontSize: 13, lineHeight: 1.45, color: "var(--warm-gray)", marginBottom: 24 }}>
        Same calm-first base. Different active addition.
      </p>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
        {formulas.map((formula, idx) => (
          <div key={formula.name} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
              <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 16, color: "var(--charcoal)", letterSpacing: "-0.01em" }}>{formula.name}</span>
              <span style={{ fontFamily: GC, fontWeight: 500, fontSize: 11, color: "var(--warm-gray)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
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
      <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap", paddingTop: 16, borderTop: "1px solid var(--divider)" }}>
        {[
          { color: BLUE, label: "PharmaGABA®" },
          { color: "#C9B8E8", label: "Magnesium" },
          { color: "#A8D5BA", label: "Cognigrape®" },
          { color: "#F5C896", label: "Caffeine" },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: 999, backgroundColor: item.color }} />
            <span style={{ fontFamily: GC, fontWeight: 600, fontSize: 14, color: "var(--warm-gray)" }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── HERO ──────────────────────────────────────────────────────────────────────
export function HomeRefHero() {
  const [progress, setProgress] = useState(0) // 0 = full-bleed, 1 = docked
  const [currentSlide, setCurrentSlide] = useState(0)

  // Carousel slide data from Peter's outline
  const slides = [
    {
      headline: "Performance Starts with Being Calm.",
      lede: "AVRO helps you steady first, with calm-first formulas built to support composure, clarity and controlled readiness when pressure rises.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4325552255-51euqtVRTaIeU2n0sGSiBvq4vuvEFe.png",
      alt: "AVRO Energy stick packet next to a glass of green juice at an outdoor brunch",
    },
    {
      headline: "Calm Comes First.",
      lede: "AVRO is built for people who know pressure changes everything. Support composure, clarity and readiness before the moment matters.",
      image: "/images/lifestyle/golfers-misty-tee-box.jpg",
      alt: "Golfers on a misty tee box at sunrise",
    },
    {
      headline: "Start Calm. Stay Ready.",
      lede: "AVRO supports calm-first performance with formulas designed for pressure-sensitive moments in work, play, competition and social life.",
      image: "/images/lifestyle/woman-journaling-mug.jpg",
      alt: "Calm morning routine with journal and warm mug",
    },
  ]

  // Auto-advance carousel every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [slides.length])

  useEffect(() => {
    let raf = 0
    let current = 0
    let target = 0
    let running = false

    const tick = () => {
      // Smooth lerp toward target each frame for buttery feel (no CSS tween fighting)
      const diff = target - current
      if (Math.abs(diff) < 0.0005) {
        current = target
        setProgress(current)
        running = false
        return
      }
      current += diff * 0.18 // smoothing factor
      setProgress(current)
      raf = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      // Disable shrinking effect on mobile
      if (window.innerWidth <= 768) {
        target = 0
        if (!running) {
          running = true
          raf = requestAnimationFrame(tick)
        }
        return
      }
      const y = window.scrollY
      const max = 480
      const raw = Math.max(0, Math.min(1, y / max))
      // Ease in/out cubic
      target = raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2
      if (!running) {
        running = true
        raf = requestAnimationFrame(tick)
      }
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
        willChange: "padding",
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
        @keyframes hp-rise-color {
          0%   { opacity: 0; transform: translateY(34px); color: var(--avro-blue); }
          45%  { opacity: 1; transform: translateY(-6px); color: var(--avro-blue); }
          70%  { opacity: 1; transform: translateY(0); color: var(--avro-blue); }
          100% { opacity: 1; transform: translateY(0); color: var(--ink); }
        }
        .hp-line { display: block; }
        .hp-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(34px);
          color: var(--avro-blue);
          animation: hp-rise-color 1.5s cubic-bezier(0.34, 1.4, 0.4, 1) forwards;
          will-change: transform, opacity, color;
        }
        .hp-fade-in { opacity: 0; animation: hp-fade 0.9s cubic-bezier(0.22,1,0.36,1) forwards; }
        .hp-lede { animation-delay: 2.1s; }
        .hp-cta-row { animation-delay: 2.5s; }
        @media (prefers-reduced-motion: reduce) {
          .hp-word, .hp-fade-in { animation: none !important; opacity: 1 !important; transform: none !important; color: var(--ink) !important; }
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
  .hp-hero-container {
    max-width: 100% !important;
    width: 100% !important;
    border-radius: 0 !important;
    min-height: auto !important;
    background: var(--base-light) !important;
  }
          .hp-hero-grid {
            grid-template-columns: 1fr !important;
            align-items: start !important;
            padding: clamp(48px,10vw,80px) clamp(20px,5vw,28px) !important;
            background: var(--base-light) !important;
          }
          .hp-hero-img { display: none !important; opacity: 0 !important; visibility: hidden !important; }
          .hp-hero-fade { display: none !important; opacity: 0 !important; visibility: hidden !important; }
        }
        .hp-pill-primary {
          background-color: transparent;
          color: var(--charcoal);
          border: 2px solid var(--charcoal);
          border-radius: 999px;
          transition: background-color .2s ease, color .2s ease;
        }
        .hp-pill-primary:hover {
          background-color: var(--charcoal);
          color: var(--bone);
        }
        .hp-pill-secondary {
          background-color: transparent;
          color: var(--charcoal);
          border: 2px solid var(--charcoal);
          border-radius: 999px;
          transition: background-color .2s ease, color .2s ease;
        }
        .hp-pill-secondary:hover {
          background-color: var(--charcoal);
          color: var(--bone);
        }
        .hp-btn-black {
          transition: background-color .2s ease, color .2s ease;
        }
        .hp-btn-black:hover {
          background-color: var(--charcoal) !important;
          color: var(--bone) !important;
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
          backgroundColor: "var(--bone)",
          minHeight: heroMinH,
          willChange: "border-radius, max-width, min-height",
        }}
      >
        {/* Background images — all slides, opacity-based crossfade */}
        {slides.map((slide, idx) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={idx}
            src={slide.image}
            alt={slide.alt}
            className="hp-hero-img"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "right center",
              opacity: currentSlide === idx ? 1 : 0,
              transition: "opacity 0.8s ease-in-out",
            }}
          />
        ))}

        {/* Gradient overlay — wraps all four edges so the rectangular image border dissolves into the bone */}
        <div
          aria-hidden="true"
          className="hp-hero-fade"
          style={{
            position: "absolute",
            inset: 0,
            background: `
              linear-gradient(to right, var(--bone) 0%, var(--bone) 45%, rgba(245,241,234,0.94) 53%, rgba(245,241,234,0.65) 62%, rgba(245,241,234,0.3) 72%, rgba(245,241,234,0.1) 82%, rgba(245,241,234,0.2) 94%, var(--bone) 100%),
              linear-gradient(to bottom, var(--bone) 0%, rgba(245,241,234,0.25) 8%, rgba(245,241,234,0) 16%, rgba(245,241,234,0) 84%, rgba(245,241,234,0.25) 92%, var(--bone) 100%)
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
          {/* Hero headline — slides with fade */}
          <h1
            key={currentSlide}
            style={{
              fontFamily: GC,
              fontSize: "clamp(40px,5vw,68px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              marginBottom: 24,
              maxWidth: 600,
              fontWeight: 700,
              opacity: 1,
              animation: "hp-fade 0.6s ease-out forwards",
            }}
          >
            {slides[currentSlide].headline}
          </h1>

          {/* Lede — slides with fade */}
          <p
            key={`lede-${currentSlide}`}
            style={{
              fontFamily: GC,
              fontWeight: 400,
              fontSize: "clamp(16px,1.4vw,18px)",
              lineHeight: 1.55,
              color: "var(--warm-gray)",
              maxWidth: 520,
              marginBottom: 28,
              opacity: 1,
              animation: "hp-fade 0.6s ease-out 0.1s forwards",
            }}
          >
            {slides[currentSlide].lede}
          </p>

          <div className="hp-pill-row" style={{ display: "flex", flexWrap: "wrap", gap: 12, maxWidth: 520 }}>
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
              Shop AVRO
            </a>
            <a
              href="/shop"
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
              Find Your Formula
            </a>
          </div>

          {/* Carousel dots */}
          <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                style={{
                  width: currentSlide === idx ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: currentSlide === idx ? "var(--avro-blue)" : "rgba(0,0,0,0.2)",
                  border: "none",
                  cursor: "pointer",
                  transition: "width 0.3s ease, background-color 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>

          {/* Right column intentionally empty — image is the container background */}
          <div aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

// ── PROOF BAR ────────────────────────────────────────────────────────────────
export function HomeProofBar() {
  const stats: { value: number; suffix: string; decimals: number; label: string }[] = [
    { value: 4.8, suffix: "/5", decimals: 1, label: "Average customer rating" },
    { value: 25000, suffix: "+", decimals: 0, label: "Customer reviews" },
    { value: 100000, suffix: "+", decimals: 0, label: "Sticks sold" },
  ]
  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "clamp(32px,5vw,56px) clamp(16px,4vw,64px)" }}>
      <div className="proof-bar-container" style={{ maxWidth: 1250, margin: "0 auto", border: "2px solid var(--charcoal)", borderRadius: 20, overflow: "hidden" }}>
        <style jsx>{`
          .proof-bar-container {
            display: flex;
            flex-direction: column;
          }
          .proof-bar-container .proof-stat {
            border-top: 2px solid var(--charcoal);
          }
          .proof-bar-container .proof-stat:first-child {
            border-top: none;
          }
          @media (min-width: 640px) {
            .proof-bar-container {
              flex-direction: row !important;
            }
            .proof-bar-container .proof-stat {
              flex: 1 1 0;
              border-top: none !important;
              border-left: 2px solid var(--charcoal);
            }
            .proof-bar-container .proof-stat:first-child {
              border-left: none;
            }
          }
        `}</style>
        {stats.map((item, i) => (
          <div
            key={item.label}
            className="proof-stat"
            style={{ padding: "clamp(16px,2.5vw,36px) clamp(12px,2vw,32px)", textAlign: "center" }}
          >
            <strong style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(24px,3vw,48px)", lineHeight: 1.0, display: "block" }}>
              <CountUpStat
                value={item.value}
                suffix={item.suffix}
                decimals={item.decimals}
                duration={1800}
                delay={150 + i * 200}
              />
            </strong>
            <span style={{ fontFamily: GC, fontWeight: 500, fontSize: "clamp(12px,1.2vw,18px)", color: "var(--warm-gray)", marginTop: 4, display: "block" }}>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function CountUpStat({ value, suffix = "", decimals = 0, duration = 1800, delay = 0 }: { value: number; suffix?: string; decimals?: number; duration?: number; delay?: number }) {
  const [display, setDisplay] = useState(0)
  const [colorPhase, setColorPhase] = useState(true)

  useEffect(() => {
    let raf = 0
    let startTs = 0
    const startTimeout = setTimeout(() => {
      const animate = (ts: number) => {
        if (!startTs) startTs = ts
        const t = Math.min(1, (ts - startTs) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        setDisplay(value * eased)
        if (t < 1) {
          raf = requestAnimationFrame(animate)
        } else {
          setTimeout(() => setColorPhase(false), 180)
        }
      }
      raf = requestAnimationFrame(animate)
    }, delay)
    return () => {
      clearTimeout(startTimeout)
      cancelAnimationFrame(raf)
    }
  }, [value, duration, delay])

  const formatted = decimals > 0
    ? display.toFixed(decimals)
    : Math.round(display).toLocaleString("en-US")

  return (
    <span
      style={{
        color: colorPhase ? "var(--avro-blue)" : "var(--ink)",
        transition: "color 0.7s cubic-bezier(0.22,1,0.36,1)",
        display: "inline-block",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {formatted}{suffix}
    </span>
  )
}

// ── BENEFIT ROW ───────────────────��───────────────────────────────────────────
export function HomeBenefitRow() {
  const benefits = [
    {
      title: "Supports composure under pressure",
      copy: "Helps you steady first before the moment matters — so you arrive ready, not reactive.",
      tone: "blue" as const,
    },
    {
      title: "Supports clear-headed readiness",
      copy: "Calm, clear, and in control — without the spike or the crash.",
      tone: "blue" as const,
    },
    {
  title: "Supports calm while helping you stay present",
  copy: "Designed to support composure without turning you off. Quiet focus, fully online.",
      tone: "blue" as const,
    },
  ]

  // Scroll-triggered visibility per card
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [visibleCards, setVisibleCards] = useState<boolean[]>(() => benefits.map(() => false))
  // Track when each card became visible so we can cascade row-2 cards one-by-one
  const [revealOrder, setRevealOrder] = useState<number[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    cardRefs.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              setVisibleCards((prev) => {
                if (prev[i]) return prev
                const next = [...prev]
                next[i] = true
                return next
              })
              setRevealOrder((prev) => (prev.includes(i) ? prev : [...prev, i]))
              obs.disconnect()
            }
          })
        },
        { threshold: 0.25 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "0 clamp(20px,5vw,64px) clamp(48px,6vw,72px)" }}>
      <style>{`
        @keyframes hp-pop-in {
          0% { opacity: 0; transform: translateY(14px) scale(0.94); }
          60% { opacity: 1; transform: translateY(-2px) scale(1.015); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes hp-fade-up {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 0.78; transform: translateY(0); }
        }
        .hp-benefit-title {
          opacity: 0;
          will-change: transform, opacity;
        }
        .hp-benefit-title.is-visible {
          animation: hp-pop-in 0.7s cubic-bezier(0.34, 1.4, 0.4, 1) both;
        }
        .hp-benefit-copy {
          opacity: 0;
          will-change: transform, opacity;
        }
        .hp-benefit-copy.is-visible {
          animation: hp-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both;
          animation-delay: 0.18s;
        }
        @media (min-width: 768px) {
          .hp-benefit-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        {/* Three boxes in one row on desktop, stack on mobile */}
        <div className="hp-benefit-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
          {benefits.map((b, i) => {
            const visible = visibleCards[i]
            const order = revealOrder.indexOf(i)
            const cardDelay = order >= 0 ? order * 0.12 : 0

            return (
              <div
                key={b.title}
                ref={(el) => { cardRefs.current[i] = el }}
                style={{
                  backgroundColor: BLUE,
                  borderRadius: 20,
                  padding: "clamp(24px,3vw,40px) clamp(24px,3vw,44px)",
                  minHeight: "clamp(160px,18vw,240px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  justifyContent: "space-between",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.985)",
                  transition: `opacity 0.85s cubic-bezier(0.22,1,0.36,1) ${cardDelay.toFixed(2)}s, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${cardDelay.toFixed(2)}s`,
                }}
              >
                <h3
                  className={`hp-benefit-title ${visible ? "is-visible" : ""}`}
                  style={{
                    fontFamily: GC,
                    fontWeight: 700,
                    fontSize: "clamp(20px,2vw,28px)",
                    lineHeight: 1.12,
                    color: "var(--ink)",
                    letterSpacing: "-0.02em",
                    margin: 0,
                    textWrap: "balance",
                    animationDelay: `${(cardDelay + 0.1).toFixed(2)}s`,
                  }}
                >
                  {b.title}
                </h3>
                <p
                  className={`hp-benefit-copy ${visible ? "is-visible" : ""}`}
                  style={{
                    fontFamily: GC,
                    fontWeight: 400,
                    fontSize: "clamp(13px,1.1vw,16px)",
                    lineHeight: 1.5,
                    color: "var(--ink)",
                    margin: 0,
                    animationDelay: `${(cardDelay + 0.25).toFixed(2)}s`,
                  }}
                >
                  {b.copy}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── LOGIC ROW ─────────────────────────────────────────────────────────────────
export function HomeLogicRow() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  const cards: { title: string; icon: AvroIconName; content: string }[] = [
    {
      title: "More energy is not always the answer.",
      icon: "control-under-pressure",
      content: "Most products push stimulation. AVRO starts with calm, because calm helps create the conditions for clarity, composure, and readiness."
    },
    {
      title: "Performance starts with state.",
      icon: "supports-focus-without-overload",
      content: "AVRO is built to support the state before the moment. Calm creates the foundation for clarity and readiness when it counts."
    },
    {
      title: "Calm first, then clarity.",
      icon: "calm-first-foundation",
      content: "Every AVRO formula starts with naturally fermented PharmaGABA®. It's the calm-first foundation that makes everything else work better."
    },
  ]

  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "clamp(32px,6vw,88px) clamp(16px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        {/* Outer container card */}
        <div style={{ backgroundColor: "var(--base-light)", borderRadius: 20, padding: "clamp(16px,3vw,48px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 16 }}>
            {/* Accordion cards column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <h2 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(20px,2.4vw,40px)", lineHeight: 1.05, color: "var(--ink)", marginBottom: 6 }}>
                The calm-first approach.
              </h2>
              {cards.map((card, i) => (
                <div
                  key={card.title}
                  style={{
                    backgroundColor: "var(--bone)",
                    borderRadius: 12,
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
                      gap: 10,
                      padding: "12px 14px",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <AvroIcon name={card.icon} size={52} className="md:w-16 md:h-16" />
                    </div>
                    <span style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(15px,1.3vw,19px)", lineHeight: 1.25, color: "var(--ink)", flex: 1 }}>
                      {card.title}
                    </span>
                    <svg
                      width="16"
                      height="16"
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
                      maxHeight: openIndex === i ? 240 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.3s ease",
                    }}
                  >
                    <p style={{ 
                      padding: "0 16px 18px 64px", 
                      fontFamily: GC, 
                      fontWeight: 500, 
                      fontSize: "clamp(14px,1.1vw,17px)", 
                      lineHeight: 1.5, 
                      color: "var(--warm-gray)",
                      margin: 0,
                    }}>
                      {card.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* State-over-time chart — replaces the comparison table */}
            <ApproachChart />
          </div>
        </div>
      </div>
    </section>
  )
}

// ── APPROACH CHART ─────────────────────────────────────────────────────────────
function ApproachChart() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setMounted(true)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.35 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Path lengths (approximate — long enough to cover the longest stroke)
  const STIM_LEN = 900
  const CALM_LEN = 800

  return (
    <div
      ref={containerRef}
      style={{
        borderRadius: 16,
        backgroundColor: "var(--charcoal)",
        padding: "clamp(14px,2.5vw,28px)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {/* Legend */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ display: "inline-block", width: 22, height: 3, borderRadius: 2, backgroundColor: "rgba(245,242,234,0.55)" }} />
          <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 11, color: "rgba(245,242,234,0.6)", letterSpacing: "0.02em" }}>Stimulant First</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ display: "inline-block", width: 22, height: 3, borderRadius: 2, backgroundColor: BLUE }} />
          <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 11, color: "var(--bone)", letterSpacing: "0.02em" }}>Calm First</span>
        </div>
      </div>

      {/* Chart */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 7", minHeight: 160 }}>
        <svg viewBox="0 0 800 320" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
          {/* Stimulant First — sharp spike then crash */}
          <path
            d="M 0 260 C 80 250, 120 230, 150 200 C 175 175, 195 90, 220 50 C 240 25, 260 30, 280 70 C 310 130, 340 250, 380 285 C 430 305, 480 295, 540 285 C 600 280, 680 290, 800 295"
            fill="none"
            stroke="rgba(245,242,234,0.55)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={`${STIM_LEN} ${STIM_LEN}`}
            strokeDashoffset={mounted ? 0 : STIM_LEN}
            style={{
              transition: "stroke-dashoffset 2.6s cubic-bezier(0.5,0,0.5,1)",
            }}
          />

          {/* Calm First — smooth sustained ramp */}
          <path
            d="M 0 240 C 100 225, 180 200, 260 165 C 340 130, 420 110, 520 100 C 620 95, 700 100, 800 105"
            fill="none"
            stroke={BLUE}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${CALM_LEN} ${CALM_LEN}`}
            strokeDashoffset={mounted ? 0 : CALM_LEN}
            style={{
              transition: "stroke-dashoffset 2.6s cubic-bezier(0.5,0,0.5,1)",
            }}
          />

          {/* Calm endpoint dot — appears at the pause point */}
          <circle
            cx="800"
            cy="105"
            r={mounted ? 6 : 0}
            fill={BLUE}
            stroke="var(--bone)"
            strokeWidth="2"
            style={{
              transition: "r 0.5s cubic-bezier(0.34,1.4,0.4,1) 2.7s",
            }}
          />
          {/* Soft pulse ring around the endpoint */}
          {mounted && (
            <circle
              cx="800"
              cy="105"
              r="6"
              fill="none"
              stroke={BLUE}
              strokeWidth="2"
              style={{
                transformOrigin: "800px 105px",
                animation: "calm-pulse 2.4s ease-out 2.9s infinite",
                opacity: 0,
              }}
            />
          )}
          <style>{`
            @keyframes calm-pulse {
              0% { transform: scale(1); opacity: 0.55; }
              100% { transform: scale(2.4); opacity: 0; }
            }
          `}</style>
        </svg>
      </div>

      {/* Caption strip */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}>
        <div style={{ padding: "12px 14px", borderRadius: 12, backgroundColor: "#8A8A82" }}>
          <span style={{ display: "block", fontFamily: GC, fontWeight: 700, fontSize: 11, color: "rgba(255,255,255,0.75)", margin: "0 0 2px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Stimulant-First
          </span>
          <p style={{ fontFamily: GC, fontWeight: 700, fontSize: 13, color: "var(--bone)", margin: 0, letterSpacing: "0.02em" }}>
            Push. Spike. Crash.
          </p>
        </div>
        <div style={{ padding: "12px 14px", borderRadius: 12, backgroundColor: BLUE }}>
          <span style={{ display: "block", fontFamily: GC, fontWeight: 700, fontSize: 11, color: "rgba(20,20,30,0.6)", margin: "0 0 2px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Calm-First
          </span>
          <p style={{ fontFamily: GC, fontWeight: 700, fontSize: 13, color: "var(--ink)", margin: 0, letterSpacing: "0.02em" }}>
            Settle. Focus. Sustain.
          </p>
        </div>
      </div>
    </div>
  )
}

function _ApproachSectionEnd() {
  return null
}

// ── PRODUCT STRIP ───────────────────────────────�����──────────────────────────────
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
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "clamp(32px,6vw,72px) clamp(16px,5vw,64px)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <h2 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(24px,3.2vw,48px)", lineHeight: 1.0, color: "var(--ink)", marginBottom: 24 }}>
          Three formulas. One foundation.
        </h2>
        <div className="product-cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          <style jsx>{`
            @media (max-width: 768px) {
              .product-cards-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
          {(Object.keys(formulas) as FormulaKey[]).map((key) => (
            <div
              key={key}
              style={{ display: "flex", flexDirection: "column", borderRadius: 20, overflow: "hidden", backgroundColor: "var(--base-light)", padding: "clamp(14px,1.8vw,20px)" }}
            >
              <div style={{ position: "relative", height: "clamp(200px,24vw,280px)", overflow: "hidden", borderRadius: 16, backgroundColor: "var(--bone)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={socialImages[key]}
                  alt={`AVRO ${formulas[key].name}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                />
              </div>
              <div style={{ padding: "16px 4px 4px", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingBottom: 10, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                  <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 11, color: "var(--ink)", letterSpacing: "-0.005em" }}>
                    Foundation
                  </span>
                  <span style={{ fontFamily: GC, fontWeight: 500, fontSize: 13, lineHeight: 1.4, color: "rgba(0,0,0,0.6)" }}>
                    PharmaGABA® + {formulaAdditions[key]}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <h3 className="font-serif" style={{ fontWeight: 900, fontSize: "clamp(22px,2vw,32px)", lineHeight: 1.05, color: "var(--ink)", margin: 0, letterSpacing: "-0.02em" }}>
                    {formulas[key].name.replace(/^AVRO\s+/, "")}
                  </h3>
                </div>
                <p style={{ fontFamily: GC, fontWeight: 400, fontSize: 14, lineHeight: 1.45, color: "rgba(0,0,0,0.6)", margin: 0 }}>
                  {formulas[key].tagline}
                </p>
                <a 
                  href={`/${key}`}
                  className="hp-btn-black"
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    gap: 8, 
                    fontFamily: GC, 
                    fontWeight: 700, 
                    fontSize: 13, 
                    width: "100%",
                    minHeight: 40, 
                    padding: "0 16px", 
                    borderRadius: 999, 
                    border: "2px solid var(--charcoal)", 
                    backgroundColor: "transparent", 
                    color: "var(--charcoal)",
                    textDecoration: "none",
                    marginTop: 4,
                  }}
                >
                  Explore {formulas[key].name}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── MOMENT GRID ────────────────────────────���──────────────────────────────────
export function HomeMomentGrid() {
  const moments = [
    { title: "Golf", copy: "Before the first tee. Before the final putt.", cta: "Explore Golf", url: "/golf", image: "/images/lifestyle/golfers-misty-tee-box.jpg", alt: "Golfers on a misty tee box at sunrise", position: "50% 35%" },
    { title: "Work", copy: "Before the meeting. Before deep work.", cta: "Explore Work", url: "/work", image: "/images/lifestyle/woman-journaling-mug.jpg", alt: "Calm morning routine with journal and warm mug", position: "50% 40%" },
    { title: "Social", copy: "Show up present without alcohol.", cta: "Explore Social", url: "/social", image: "/images/lifestyle/coupes-grapefruit-stickpack.jpg", alt: "AVRO stickpack styled with grapefruit coupes on a bar", position: "50% 50%" },
    { title: "Gaming", copy: "Before the session. Before the decision.", cta: "Explore Gaming", url: "/gaming", image: "/images/lifestyle/focus-iced-drink-headphones.jpg", alt: "Iced AVRO drink and headphones at a gaming desk", position: "50% 50%" },
  ]

  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "clamp(32px,6vw,88px) clamp(16px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        <h2 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(22px,3.2vw,48px)", lineHeight: 1.0, color: "var(--ink)", marginBottom: 20 }}>
          Built for pressure sensitive moments.
        </h2>
        <div className="moment-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
          <style jsx>{`
            @media (min-width: 768px) {
              .moment-grid {
                grid-template-columns: repeat(4, 1fr) !important;
                gap: 16px !important;
              }
            }
          `}</style>
          {moments.map((m) => (
            <a key={m.title} href={m.url} className="moment-card" style={{ display: "flex", flexDirection: "column", textDecoration: "none", borderRadius: 16, overflow: "hidden", backgroundColor: "var(--base-light)", padding: 10 }}>
              <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", borderRadius: 12, backgroundColor: "var(--bone)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.image} alt={m.alt} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: m.position }} />
              </div>
              <div style={{ padding: "12px 4px 8px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(14px,1.6vw,24px)", lineHeight: 1.0, color: "var(--ink)", marginBottom: 6 }}>{m.title}</h3>
                <p style={{ fontFamily: GC, fontWeight: 400, fontSize: "clamp(11px,1vw,15px)", lineHeight: 1.35, color: "var(--warm-gray)", marginBottom: 10, flex: 1 }}>{m.copy}</p>
                <span className="hp-btn-black btn-sm" style={{ display: "inline-flex", alignSelf: "flex-start", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: GC, fontWeight: 700, borderRadius: 999, border: "2px solid var(--charcoal)", backgroundColor: "transparent", color: "var(--charcoal)" }}>
                  {m.cta}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── SCIENCE GRID ────────────────��────�����───────────────────────���───────────────
export function HomeScienceGrid() {
  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "clamp(32px,6vw,88px) clamp(16px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        {/* Card section with base-light background */}
        <div style={{ backgroundColor: "var(--base-light)", borderRadius: 20, padding: "clamp(16px,3vw,48px)", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 14 }}>
            {/* Why GABA card - flat bone */}
            <div style={{ backgroundColor: "var(--bone)", borderRadius: 16, padding: "clamp(16px,2.5vw,40px)" }}>
              <h2 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(18px,2.4vw,36px)", lineHeight: 1.0, color: "var(--charcoal)", marginBottom: 10 }}>
                Why GABA matters.
              </h2>
              <p style={{ fontFamily: GC, fontWeight: 500, fontSize: "clamp(14px,1.1vw,18px)", lineHeight: 1.5, color: "var(--warm-gray)", marginBottom: 18 }}>
                GABA is a naturally occurring compound associated with relaxation and balance. AVRO uses naturally fermented PharmaGABA® as the foundation of every formula.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
                {([["Naturally Fermented", "naturally-fermented-pharmagaba"], ["Calm First", "calm-first-foundation"], ["In Every Formula", "ingredient-disclosure"]] as const).map(([label, iconName], i) => (
                  <React.Fragment key={`gaba-${i}`}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textAlign: "center", minWidth: 72 }}>
                      <AvroIcon name={iconName} size={48} className="md:w-16 md:h-16" />
                      <span style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(11px,0.95vw,14px)", color: "var(--charcoal)", lineHeight: 1.2 }}>{label}</span>
                    </div>
                    {i < 2 && <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 14, color: "var(--avro-blue)" }}>→</span>}
                  </React.Fragment>
                ))}
              </div>
              <a href="/science" className="hp-btn-black btn-sm" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: GC, fontWeight: 700, borderRadius: 999, textDecoration: "none", border: "2px solid var(--charcoal)", backgroundColor: "transparent", color: "var(--charcoal)" }}>
                Learn the Science of AVRO
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
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

// ── QUALITY ROW ──────────────────────────────────────────────────────────────
export function HomeQualityRow() {
  const badges: { icon: AvroIconName; label: string; sub: string }[] = [
    { icon: "naturally-fermented-pharmagaba", label: "Naturally Fermented", sub: "PharmaGABA®" },
    { icon: "calm-first-foundation", label: "Calm First", sub: "Foundation" },
    { icon: "third-party-tested", label: "Third-Party", sub: "Tested" },
    { icon: "free-vegan", label: "Vegan", sub: "Plant-based" },
    { icon: "gluten-free", label: "Gluten Free", sub: "Always" },
    { icon: "gmp-certified-facility", label: "GMP Certified", sub: "Facility" },
  ]

  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "0 clamp(20px,5vw,64px) clamp(48px,6vw,72px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        {/* Outer container card */}
        <div style={{ backgroundColor: "var(--base-light)", borderRadius: 28, padding: "clamp(20px,3vw,32px)", border: "1px solid var(--divider)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))", gap: 2, backgroundColor: "var(--base-deep)", borderRadius: 20, overflow: "hidden" }}>
            {badges.map((b) => (
              <div key={b.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "clamp(20px,3vw,32px) clamp(12px,2vw,20px)", textAlign: "center", backgroundColor: "var(--bone)" }}>
                <AvroIcon name={b.icon} size={64} className="md:w-20 md:h-20 opacity-80" />
                <div>
                  <strong style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(15px,1.4vw,19px)", color: "var(--ink)", lineHeight: 1.2, display: "block" }}>{b.label}</strong>
                  <span style={{ fontFamily: GC, fontWeight: 500, fontSize: "clamp(13px,1.05vw,16px)", color: "var(--warm-gray)" }}>{b.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── STORY STRIP ─────────────����───────��─────���──────��────────��───����──────────������──
export function HomeStoryStrip() {
  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "clamp(40px,6vw,72px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto", backgroundColor: "var(--charcoal)", borderRadius: 28, overflow: "hidden" }}>
        <div style={{ padding: "clamp(36px,5vw,64px) clamp(28px,5vw,72px)" }}>
          <h2 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(28px,3.4vw,46px)", lineHeight: 1.0, color: "#fff", marginBottom: 16 }}>
            Science-backed. Founder-driven.
          </h2>
          <p style={{ fontFamily: GC, fontWeight: 400, fontSize: "clamp(15px,1.2vw,18px)", lineHeight: 1.5, color: "rgba(255,255,255,0.85)", maxWidth: 680, marginBottom: 28 }}>
            AVRO was built by Keigo Sugawara and Peter van Stolk for people who wanted a better option before the moments that matter. Every formula is backed by research and designed for real routines.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="/why-avro" className="hp-btn-outline-light" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: GC, fontWeight: 700, fontSize: 16, minHeight: 48, padding: "0 28px", borderRadius: 999, textDecoration: "none", border: "2px solid #fff", backgroundColor: "transparent", color: "#fff" }}>Our Story</a>
            <a href="/science" className="hp-btn-blue" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: GC, fontWeight: 700, fontSize: 16, minHeight: 48, padding: "0 28px", borderRadius: 999, textDecoration: "none", border: `2px solid ${BLUE}`, backgroundColor: BLUE, color: "var(--charcoal)" }}>The Science</a>
          </div>
        </div>
        <div className="hidden sm:block" style={{ padding: "0 clamp(20px,4vw,32px) clamp(20px,4vw,32px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "38% 62%", minHeight: 300, gap: 12 }}>
            <div style={{ position: "relative", overflow: "hidden", borderRadius: 18, backgroundColor: "var(--bone)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/science/fermentation-lab.jpg" alt="Stainless steel fermentation vessel cultivating naturally fermented PharmaGABA" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) contrast(1.05) brightness(0.98)" }} />
            </div>
            <div style={{ position: "relative", overflow: "hidden", borderRadius: 18, backgroundColor: "var(--bone)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/team/founders-keigo-peter.jpg" alt="AVRO co-founders Keigo Sugawara and Peter van Stolk" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) contrast(1.05) brightness(0.98)" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── RITUAL SECTION ──────────────────────────────────────────────────────────
export function HomeRitualSection() {
  const [openStep, setOpenStep] = useState<number | null>(null)
  
  const steps: { num: number; icon: AvroIconName; title: string; detail: string }[] = [
    { 
      num: 1, 
      icon: "step-pour",
      title: "Pour one stick into water",
      detail: "Add one AVRO stick to 8–12 oz of cold water. Use more water for a lighter taste, less for a stronger flavor."
    },
    { 
      num: 2, 
      icon: "step-stir",
      title: "Mix until fully dissolved",
      detail: "Stir or shake until the powder is completely dissolved. AVRO mixes easily without clumping."
    },
    { 
      num: 3, 
      icon: "step-drink",
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
                      backgroundColor: openStep === step.num ? "var(--charcoal)" : "var(--bone)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <AvroIcon 
                      name={step.icon} 
                      size={28} 
                      style={{ 
                        filter: openStep === step.num ? "invert(1) brightness(2)" : "none",
                        transition: "filter 0.2s ease",
                      }} 
                    />
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
                    color: "var(--warm-gray)",
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
