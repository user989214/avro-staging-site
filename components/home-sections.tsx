"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { formulas, type FormulaKey, testimonials } from "@/lib/data"
import { Icon } from "@/components/icons"
import { AvroIcon, type AvroIconName } from "@/components/avro-icons"
import { EmbeddedGraphic } from "@/components/embedded-graphic"
import { ChartSource } from "@/components/compliance"

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

  // Accent colors pulled directly from each tube's physical color identity
  const CALM_COLOR  = "#7A79C8"  // Calm tube: purple/indigo
  const FOCUS_COLOR = "#E05A7A"  // Focus tube: pink-red (Red Dragon Fruit)
  const ENERGY_COLOR = "#C8E84B" // Energy tube: yellow-green

  const formulas = [
    { name: "Calm",   nameColor: CALM_COLOR,   segments: [{ color: BLUE, width: 70, label: "PharmaGABA®" }, { color: CALM_COLOR,   width: 30, label: "Magnesium" }] },
    { name: "Focus",  nameColor: FOCUS_COLOR,  segments: [{ color: BLUE, width: 60, label: "PharmaGABA®" }, { color: FOCUS_COLOR,  width: 40, label: "Cognigrape®" }] },
    { name: "Energy", nameColor: ENERGY_COLOR, segments: [{ color: BLUE, width: 55, label: "PharmaGABA®" }, { color: ENERGY_COLOR, width: 45, label: "Caffeine" }] },
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
              <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 16, color: formula.nameColor, letterSpacing: "-0.01em" }}>{formula.name}</span>
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
          { color: BLUE,         label: "PharmaGABA®" },
          { color: CALM_COLOR,   label: "Magnesium" },
          { color: FOCUS_COLOR,  label: "Cognigrape®" },
          { color: ENERGY_COLOR, label: "Caffeine" },
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
      lede: "AVRO helps you steady first, with calm-first formulas built to support composure, clarity and controlled readiness when pressure rises.*",
      image: "/images/home/hero-01.jpg",
      mobileImage: "/images/home/hero-01-mobile.png",
      alt: "Pouring an AVRO Calm Blackberry Jasmine stick into a glass of water",
    },
    {
      headline: "Calm Comes First.",
      lede: "AVRO is built for people who know pressure changes everything. Support composure, clarity and readiness before the moment matters.*",
      image: "/images/home/hero-03.jpg",
      mobileImage: "/images/home/hero-03-mobile.png",
      alt: "Hand holding an AVRO Focus Pomegranate Raspberry tube",
    },
    {
      headline: "Start Calm. Stay Ready.",
      lede: "AVRO supports calm-first performance with formulas designed for pressure-sensitive moments in work, play, competition and social life.*",
      image: "/images/home/hero-02.jpg",
      mobileImage: "/images/home/hero-02-mobile.png",
      alt: "Hand holding an AVRO Energy Fuji Apple tube",
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




  return (
    <section
      style={{
        width: "100%",
        backgroundColor: "var(--base)",
        color: "var(--ink)",
        padding: 0,
      }}
    >
      <style>{`
        @keyframes hp-rise {
          0%   { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes hp-fade {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        /* Word-by-word rising headline — matches the cohort / PageHero animation
           so the homepage hero shares the same motion language as every other page. */
        .hp-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(24px);
          animation: hp-rise 0.95s cubic-bezier(0.34, 1.4, 0.4, 1) forwards;
          will-change: transform, opacity;
        }
        .hp-fade-in { opacity: 0; animation: hp-fade 0.9s cubic-bezier(0.22,1,0.36,1) forwards; }
        @media (prefers-reduced-motion: reduce) {
          .hp-word, .hp-fade-in { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
        .hp-pill-primary, .hp-pill-secondary {
          flex: 1 1 180px;
          min-width: 180px;
        }
        @media (max-width: 640px) {
          .hp-pill-row { flex-direction: column; align-items: stretch; max-width: 320px !important; }
          .hp-pill-primary, .hp-pill-secondary { width: 100%; flex: 0 0 auto; }
        }
  /* ── Desktop: 16:9 image with content overlaid ── */
  .hp-hero-img-mobile { display: none; }
  .hp-hero-container {
    position: relative;
    width: calc(100% - 32px);
    margin: 0 auto 16px;
    aspect-ratio: 16/9;
    overflow: hidden;
    background-color: var(--bone);
    border-radius: 20px;
  }
  .hp-hero-grid {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(24px,4vw,64px) clamp(28px,5vw,64px);
  }
  /* ── Mobile: stacked — rounded image on top, text below ── */
  @media (max-width: 768px) {
    .hp-hero-container {
      aspect-ratio: unset !important;
      overflow: visible !important;
      display: flex;
      flex-direction: column;
    }
    .hp-hero-img-wrap {
      position: relative;
      width: calc(100% - 32px);
      margin: 16px auto 0;
            aspect-ratio: 3/4;
      border-radius: 20px;
      overflow: hidden;
      flex-shrink: 0;
    }
    .hp-hero-img { display: none !important; }
    .hp-hero-img-mobile { display: block !important; }
    .hp-hero-grid {
      position: static !important;
      padding: 24px 20px 32px !important;
    }
  }
  @media (min-width: 769px) {
    .hp-hero-img-wrap {
      position: absolute;
      inset: 0;
      border-radius: 0;
    }
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
        .moment-card img { transition: transform 0.5s ease; }
        .moment-card:hover img { transform: scale(1.04); }
      `}</style>

      {/* Outer wrapper — 16:9 on desktop, column-stacked on mobile */}
      <div className="hp-hero-container">

        {/* Image container — full-bleed on desktop, rounded-rect card on mobile */}
        <div className="hp-hero-img-wrap">
          {/* Desktop slides */}
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
                objectFit: "cover",
                objectPosition: "center center",
                opacity: currentSlide === idx ? 1 : 0,
                transition: "opacity 0.8s ease-in-out",
              }}
            />
          ))}

          {/* Mobile slides */}
          {slides.map((slide, idx) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`mob-${idx}`}
              src={slide.mobileImage}
              alt={slide.alt}
              className="hp-hero-img-mobile"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                opacity: currentSlide === idx ? 1 : 0,
                transition: "opacity 0.8s ease-in-out",
              }}
            />
          ))}
        </div>{/* /hp-hero-img-wrap */}



        {/* Content — overlaid on desktop, below image on mobile */}
        <div className="hp-hero-grid">
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Hero headline — word-by-word rise, re-animates on each slide change */}
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
            }}
          >
            {slides[currentSlide].headline.split(" ").map((word, i, arr) => (
              <span
                key={i}
                className="hp-word"
                style={{ animationDelay: `${(0.1 + i * 0.09).toFixed(2)}s` }}
              >
                {word}
                {i < arr.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </h1>

          {/* Lede — slides with fade */}
          <p
            key={`lede-${currentSlide}`}
            style={{
              fontFamily: GC,
              fontWeight: 400,
              fontSize: "clamp(16px,1.4vw,18px)",
              lineHeight: 1.55,
              color: "var(--ink)",
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
  const stacks: { name: string }[] = [
    { name: "AVRO Calm" },
    { name: "AVRO Focus" },
    { name: "AVRO Energy" },
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
        {stacks.map((item) => (
          <div
            key={item.name}
            className="proof-stat"
            style={{ padding: "clamp(16px,2.5vw,36px) clamp(12px,2vw,32px)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
          >
            <strong style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(22px,3vw,42px)", lineHeight: 1.0, color: "var(--ink)", letterSpacing: "-0.02em" }}>
              {item.name}
            </strong>
            <StarRating />
          </div>
        ))}
      </div>
    </section>
  )
}

function StarRating() {
  return (
    <span role="img" aria-label="Rated 5 out of 5 stars" style={{ display: "inline-flex", gap: "clamp(2px,0.4vw,6px)" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="22" height="22" viewBox="0 0 24 24" fill="var(--avro-blue)" aria-hidden="true" style={{ width: "clamp(16px,1.6vw,24px)", height: "auto" }}>
          <path d="M12 2.25l2.955 5.988 6.61.96-4.783 4.66 1.129 6.583L12 17.347l-5.911 3.094 1.129-6.583L2.435 9.198l6.61-.96L12 2.25z" />
        </svg>
      ))}
    </span>
  )
}

// ── BENEFIT ROW ───────────────────��───────────────────────────────────────────
export function HomeBenefitRow() {
  const benefits = [
    {
      title: "Supports composure under pressure*",
      copy: "Helps you steady first before the moment matters — so you arrive ready, not reactive.",
      tone: "blue" as const,
      image: "/images/home/benefit-golf.png",
      focal: "center 30%",
    },
    {
      title: "Supports clear-headed readiness*",
      copy: "Calm, clear, and in control — without the spike or the crash.",
      tone: "blue" as const,
      image: "/images/home/benefit-bar.png",
      focal: "center 40%",
    },
    {
  title: "Supports calm while helping you stay present*",
  copy: "Designed to support composure without turning you off. Quiet focus, fully online.",
      tone: "blue" as const,
      image: "/images/home/benefit-community.png",
      focal: "center 35%",
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
                  position: "relative",
                  overflow: "hidden",
                  backgroundColor: "var(--base-light)",
                  borderRadius: 20,
                  padding: "clamp(24px,3vw,40px) clamp(24px,3vw,44px)",
                  minHeight: "clamp(160px,18vw,240px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  justifyContent: "flex-end",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.985)",
                  transition: `opacity 0.85s cubic-bezier(0.22,1,0.36,1) ${cardDelay.toFixed(2)}s, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${cardDelay.toFixed(2)}s`,
                }}
              >
                {/* Photo fill — scaled up slightly to crop the PNG's baked-in rounded
                    frame / edge shadow so no card background shows at the corners. */}
                <img
                  src={b.image || "/placeholder.svg"}
                  alt=""
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: b.focal,
                    display: "block",
                    transform: "scale(1.06)",
                  }}
                />
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
      content: "Most products push stimulation. AVRO starts with calm, because calm helps create the conditions for clarity, composure, and readiness.*"
    },
    {
      title: "Performance starts with state.",
      icon: "supports-focus-without-overload",
      content: "AVRO is built to support the state before the moment. Calm creates the foundation for clarity and readiness when it counts.*"
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

            {/* State-over-time chart �� replaces the comparison table */}
            <ApproachChart />
          </div>
        </div>
      </div>
    </section>
  )
}

// ── APPROACH CHART ─────────────────────────────────�����──────────────────���─���─────
// Renders the homepage "Calm-First Approach" philosophy graphic verbatim.
function ApproachChart() {
  return (
    <>
      <EmbeddedGraphic src="/graphics/homepage.html" ratio="1200 / 720" title="The Calm-First approach" />
      <ChartSource>
        Illustrative — conceptual representation of stimulant push/crash vs. AVRO&apos;s calm-first
        settle. Lorem ipsum dolor sit amet, not based on a single clinical trial.
      </ChartSource>
    </>
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
    calm: "/images/home/card-calm.jpg",
    focus: "/images/home/card-focus.jpg",
    energy: "/images/home/card-energy.jpg",
  }

  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "clamp(32px,6vw,72px) clamp(16px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
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
    { title: "Golf", copy: "Before the first tee. Before the final putt.", cta: "Explore Golf", url: "/golf", image: "/images/home/tile-golf.jpg", alt: "Golf club and ball on a tee", position: "50% 50%" },
    { title: "Work", copy: "Before the meeting. Before deep work.", cta: "Explore Work", url: "/work", image: "/images/home/tile-work.jpg", alt: "Navy notebook and pen on a desk", position: "50% 50%" },
    { title: "Social", copy: "Show up present without alcohol.", cta: "Explore Social", url: "/social", image: "/images/home/tile-social.png", alt: "Two ceramic cups leaning together", position: "50% 50%" },
    { title: "Gaming", copy: "Before the session. Before the decision.", cta: "Explore Gaming", url: "/gaming", image: "/images/home/tile-gaming.jpg", alt: "Arcade-style button with a green ring", position: "50% 50%" },
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
                <span className="hp-btn-black avro-size-md" style={{ display: "inline-flex", alignSelf: "flex-start", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: GC, fontWeight: 700, borderRadius: 999, border: "2px solid var(--charcoal)", backgroundColor: "transparent", color: "var(--charcoal)" }}>
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
              <a href="/science" className="hp-btn-black avro-size-md" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: GC, fontWeight: 700, borderRadius: 999, textDecoration: "none", border: "2px solid var(--charcoal)", backgroundColor: "transparent", color: "var(--charcoal)" }}>
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
          <style>{`
            .quality-badge-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 2px; background-color: var(--base-deep); border-radius: 20px; overflow: hidden; }
            @media (max-width: 900px) { .quality-badge-grid { grid-template-columns: repeat(3, 1fr); } }
            @media (max-width: 520px) { .quality-badge-grid { grid-template-columns: repeat(2, 1fr); } }
          `}</style>
          <div className="quality-badge-grid">
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

// ── STORY STRIP ─────────────����───────��─────���──────��────────��───����──────────������─��
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
            <a href="/about" className="hp-btn-outline-light" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: GC, fontWeight: 700, fontSize: 16, minHeight: 48, padding: "0 28px", borderRadius: 999, textDecoration: "none", border: "2px solid #fff", backgroundColor: "transparent", color: "#fff" }}>Our Story</a>
            <a href="/science" className="hp-btn-blue" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: GC, fontWeight: 700, fontSize: 16, minHeight: 48, padding: "0 28px", borderRadius: 999, textDecoration: "none", border: `2px solid ${BLUE}`, backgroundColor: BLUE, color: "var(--charcoal)" }}>The Science</a>
          </div>
        </div>
        <div className="hidden sm:block" style={{ padding: "0 clamp(20px,4vw,32px) clamp(20px,4vw,32px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "38% 62%", minHeight: 300, gap: 12 }}>
            <div style={{ position: "relative", overflow: "hidden", borderRadius: 18, backgroundColor: "var(--bone)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/science/science-hero-4x3.jpg" alt="Trays of AVRO Energy sticks on a stainless cart in the production lab" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ position: "relative", overflow: "hidden", borderRadius: 18, backgroundColor: "var(--bone)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/home/founder.jpg" alt="AVRO co-founder Keigo Sugawara" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
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
