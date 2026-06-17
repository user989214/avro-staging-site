"use client"

import { useState } from "react"
import type { AvroIconName } from "@/components/avro-icons"
import { EmbeddedGraphic } from "@/components/embedded-graphic"

const GC =
  "var(--font-dm-sans), ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"

/**
 * Palette supplied for the mockup (used to colorize the calm-first chart icons).
 * green, magenta, lavender — one per card.
 */
const ICON_PALETTE = ["#A4C55A", "#C13B7C", "#C3B4D8"]

/** Recolors a black-on-transparent PNG icon by using it as a CSS mask. */
function ColorIcon({ src, color, size = 52 }: { src: string; color: string; size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: size,
        height: size,
        flexShrink: 0,
        backgroundColor: color,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  )
}

/**
 * Mockup version of HomeLogicRow — "The calm-first approach." chart with the
 * three philosophy icons rendered in the supplied color palette.
 */
export function MockupLogicRow() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const cards: { title: string; icon: AvroIconName; src: string; content: string }[] = [
    {
      title: "More energy is not always the answer.",
      icon: "control-under-pressure",
      src: "/images/icons/control-under-pressure.png",
      content:
        "Most products push stimulation. AVRO starts with calm, because calm helps create the conditions for clarity, composure, and readiness.",
    },
    {
      title: "Performance starts with state.",
      icon: "supports-focus-without-overload",
      src: "/images/icons/supports-focus-without-overload.png",
      content:
        "AVRO is built to support the state before the moment. Calm creates the foundation for clarity and readiness when it counts.",
    },
    {
      title: "Calm first, then clarity.",
      icon: "calm-first-foundation",
      src: "/images/icons/calm-first-foundation.png",
      content:
        "Every AVRO formula starts with naturally fermented PharmaGABA®. It's the calm-first foundation that makes everything else work better.",
    },
  ]

  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "clamp(32px,6vw,88px) clamp(16px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        <div style={{ backgroundColor: "var(--base-light)", borderRadius: 20, padding: "clamp(16px,3vw,48px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <h2 style={{ fontFamily: GC, fontWeight: 800, fontSize: "clamp(22px,2.6vw,44px)", lineHeight: 1.03, color: "var(--ink)", marginBottom: 6 }}>
                The calm-first approach.
              </h2>
              {cards.map((card, i) => (
                <div
                  key={card.title}
                  style={{ backgroundColor: "var(--bone)", borderRadius: 12, overflow: "hidden", transition: "all 0.25s ease" }}
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
                    <div style={{ width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <ColorIcon src={card.src} color={ICON_PALETTE[i]} size={52} />
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
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div style={{ maxHeight: openIndex === i ? 240 : 0, overflow: "hidden", transition: "max-height 0.3s ease" }}>
                    <p
                      style={{
                        padding: "0 16px 18px 64px",
                        fontFamily: GC,
                        fontWeight: 500,
                        fontSize: "clamp(14px,1.1vw,17px)",
                        lineHeight: 1.5,
                        color: "var(--warm-gray)",
                        margin: 0,
                      }}
                    >
                      {card.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <EmbeddedGraphic src="/graphics/homepage.html" ratio="1200 / 720" title="The Calm-First approach" />
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Full-bleed blue section (mockup version of FinalCta) — the avro-blue band
 * spans edge to edge with no rounded card or side gutters.
 */
export function MockupBlueCta({ title, copy }: { title: string; copy: string }) {
  return (
    /* Outer section is white so the rounded card sits on the same base as every other section */
    <section style={{ width: "100%", backgroundColor: "var(--base)", padding: 0 }}>
      <style>{`
        .mk-blue-card {
          width: calc(100% - 32px);
          margin: 0 auto 16px;
          border-radius: 20px;
          overflow: hidden;
          background-color: var(--avro-blue);
          color: var(--charcoal);
        }
        /* Calm Performance banner sits at the very top of the card */
        .mk-blue-banner {
          width: 100%;
          display: block;
          height: auto;
        }
        .mk-blue-inner {
          padding: clamp(32px,4vw,72px) clamp(24px,5vw,80px) clamp(36px,5vw,80px);
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: flex-end;
          justify-content: space-between;
          gap: 28px;
        }
        .mk-blue-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 28px;
          border-radius: 999px;
          background-color: transparent;
          border: 2px solid var(--charcoal);
          color: var(--charcoal);
          font-family: ${GC};
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          white-space: nowrap;
          transition: background-color .2s ease, color .2s ease;
        }
        .mk-blue-cta-btn:hover {
          background-color: var(--charcoal);
          color: var(--bone);
        }
        .mk-blue-btn-row {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
        }
        @media (max-width: 640px) {
          .mk-blue-inner {
            flex-direction: column;
            align-items: flex-start;
          }
          .mk-blue-btn-row {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
          }
          .mk-blue-cta-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="mk-blue-card">
        {/* Calm Performance artwork — image sits ABOVE the copy */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/banners/calm-power.png"
          alt="Calm Performance"
          className="mk-blue-banner"
        />

        <div className="mk-blue-inner">
          <div style={{ flex: "1 1 320px", minWidth: 0, maxWidth: 580 }}>
            <h2
              style={{
                fontFamily: GC,
                fontWeight: 800,
                fontSize: "clamp(28px,4.2vw,62px)",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                color: "var(--charcoal)",
                marginBottom: 12,
              }}
            >
              {title}
            </h2>
            <p style={{ fontFamily: GC, fontWeight: 500, fontSize: "clamp(15px,1.3vw,19px)", lineHeight: 1.5, color: "rgba(21,21,21,0.72)" }}>
              {copy}*
            </p>
          </div>

          <div className="mk-blue-btn-row">
            <a href="/shop?formula=calm"   className="mk-blue-cta-btn">Shop Calm</a>
            <a href="/shop?formula=focus"  className="mk-blue-cta-btn">Shop Focus</a>
            <a href="/shop?formula=energy" className="mk-blue-cta-btn">Shop Energy</a>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Kept for backwards-compat — the image is now rendered inside MockupBlueCta above the copy. */
export function MockupCalmPerformance() {
  return null
}
