"use client"

import { useState } from "react"
import type { AvroIconName } from "@/components/avro-icons"
import { EmbeddedGraphic } from "@/components/embedded-graphic"

const GC =
  "var(--font-dm-sans), ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"

/**
 * Tube-derived palette for the calm-first chart icons — one per formula.
 * Energy (gauge) → amber, Focus (eye) → magenta, Calm (lotus) → indigo.
 */
const ICON_PALETTE = ["#E8A23D", "#C13584", "#4b4d9a"]

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
 * Banner CTA — a gray section containing a rounded rectangle box that the
 * per-page banner artwork fills edge to edge, with a single wide "Shop" button
 * overlaid in the bottom-right corner of the box.
 */
export function MockupBlueCta({
  bgImage = "/images/banners/calm-power.png",
  shopHref = "/shop",
  shopLabel = "Shop",
  bgColor = "var(--base-deep)",
}: {
  bgImage?: string
  shopHref?: string
  shopLabel?: string
  /** Section background — defaults to the grey base-deep; pass a dark token for dark-theme pages. */
  bgColor?: string
}) {
  return (
    <section
      style={{
        width: "100%",
        backgroundColor: bgColor,
        padding: "clamp(32px,5vw,72px) clamp(16px,4vw,64px)",
      }}
    >
      {/* Scoped responsive rules — overlay bottom-right on desktop, stack below on mobile */}
      <style>{`
        .banner-cta-box {
          position: relative;
          max-width: 1250px;
          margin: 0 auto;
          border-radius: 24px;
          overflow: hidden;
          background-color: var(--base);
        }
        .banner-cta-img { width: 100%; height: auto; display: block; }
        .banner-cta-btn {
          position: absolute;
          right: clamp(16px, 3%, 40px);
          bottom: clamp(16px, 3%, 40px);
          min-width: 220px;
          text-decoration: none;
        }
        @media (max-width: 640px) {
          .banner-cta-box { display: flex; flex-direction: column; padding-bottom: 20px; }
          .banner-cta-btn {
            position: static;
            width: calc(100% - 32px);
            min-width: 0;
            margin: 16px auto 0;
          }
        }
      `}</style>

      {/* Rounded box that confines the banner artwork */}
      <div className="banner-cta-box">
        {/* Banner artwork fills the box */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={bgImage} alt="" className="banner-cta-img" />

        {/* Shop button — overlaid bottom-right on desktop, stacked below on mobile */}
        <a href={shopHref} className="btn-primary banner-cta-btn" style={{ fontFamily: GC }}>
          {shopLabel}
        </a>
      </div>
    </section>
  )
}
