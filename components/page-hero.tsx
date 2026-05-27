"use client"

import Link from "next/link"
import type { ReactNode } from "react"

const GC = '"DM Sans", system-ui, sans-serif'

export interface PageHeroProps {
  title: ReactNode
  lede: ReactNode
  imageSrc: string
  imageAlt: string
  imageObjectPosition?: string
  primaryCta?: { href: string; label: string }
  secondaryCta?: { href: string; label: string }
  /** Optional content rendered below the lede / CTAs (e.g. badges, search bar, chip row). */
  children?: ReactNode
  /** Tighter hero (used for FAQ-style search heroes). */
  compact?: boolean
}

/**
 * Shared "docked" page hero used across Shop, Science, and FAQ.
 * Matches the homepage HomeRefHero treatment: rounded card with edge-fading image
 * on the right side, headline + lede + CTAs on the left.
 */
export function PageHero({
  title,
  lede,
  imageSrc,
  imageAlt,
  imageObjectPosition = "right center",
  primaryCta,
  secondaryCta,
  children,
  compact = false,
}: PageHeroProps) {
  const minH = compact
    ? "clamp(420px, 52vh, 540px)"
    : "clamp(520px, 62vh, 660px)"

  return (
    <section
      style={{
        width: "100%",
        backgroundColor: "var(--base)",
        color: "var(--ink)",
        padding:
          "clamp(16px,3vw,40px) clamp(16px,5vw,64px) clamp(36px,5vw,72px)",
      }}
    >
      <style>{`
        .ph-pill-primary, .ph-pill-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: ${GC};
          font-weight: 700;
          font-size: 16px;
          letter-spacing: -0.005em;
          min-height: 48px;
          padding: 0 28px;
          border-radius: 999px;
          text-decoration: none;
          background-color: var(--charcoal);
          color: var(--bone);
          border: 2px solid var(--charcoal);
          transition: background-color .2s ease, color .2s ease;
        }
        .ph-pill-primary:hover, .ph-pill-secondary:hover {
          background-color: transparent;
          color: var(--charcoal);
        }
        .ph-pill-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          max-width: 520px;
        }
        @media (max-width: 640px) {
          .ph-pill-row { flex-direction: column; align-items: stretch; max-width: 320px !important; }
          .ph-pill-primary, .ph-pill-secondary { width: 100%; }
        }
        @media (max-width: 768px) {
          .ph-hero-grid {
            grid-template-columns: 1fr !important;
            align-items: start !important;
            padding: clamp(28px,7vw,48px) clamp(20px,5vw,28px) !important;
          }
          .ph-hero-img { object-position: 65% 80% !important; }
          .ph-hero-fade {
            background: linear-gradient(180deg, var(--base-light) 0%, var(--base-light) 42%, rgba(245,241,234,0.92) 50%, rgba(245,241,234,0.55) 62%, rgba(245,241,234,0) 78%) !important;
          }
        }
      `}</style>

      <div
        style={{
          position: "relative",
          maxWidth: 1320,
          margin: "0 auto",
          borderRadius: 28,
          overflow: "hidden",
          backgroundColor: "var(--base-light)",
          minHeight: minH,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="ph-hero-img"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: imageObjectPosition,
          }}
        />

        {/* Edge-wrapping fade — matches homepage */}
        <div
          aria-hidden="true"
          className="ph-hero-fade"
          style={{
            position: "absolute",
            inset: 0,
            background: `
              linear-gradient(to right, var(--base-light) 0%, var(--base-light) 45%, rgba(245,241,234,0.94) 53%, rgba(245,241,234,0.65) 62%, rgba(245,241,234,0.3) 72%, rgba(245,241,234,0.1) 82%, rgba(245,241,234,0.2) 94%, var(--base-light) 100%),
              linear-gradient(to bottom, var(--base-light) 0%, rgba(245,241,234,0.25) 8%, rgba(245,241,234,0) 16%, rgba(245,241,234,0) 84%, rgba(245,241,234,0.25) 92%, var(--base-light) 100%)
            `,
            pointerEvents: "none",
          }}
        />

        <div
          className="ph-hero-grid"
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1
              style={{
                fontFamily: GC,
                fontSize: compact
                  ? "clamp(36px,5vw,60px)"
                  : "clamp(40px,5vw,68px)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
                marginBottom: 22,
                maxWidth: 600,
                fontWeight: 700,
              }}
            >
              {title}
            </h1>

            <p
              style={{
                fontFamily: GC,
                fontWeight: 400,
                fontSize: "clamp(16px,1.4vw,18px)",
                lineHeight: 1.55,
                color: "var(--warm-gray)",
                maxWidth: 520,
                marginBottom: children || primaryCta || secondaryCta ? 28 : 0,
              }}
            >
              {lede}
            </p>

            {children}

            {(primaryCta || secondaryCta) && (
              <div
                className="ph-pill-row"
                style={{ marginTop: children ? 24 : 0 }}
              >
                {primaryCta && (
                  <Link href={primaryCta.href} className="ph-pill-primary">
                    {primaryCta.label}
                  </Link>
                )}
                {secondaryCta && (
                  <Link href={secondaryCta.href} className="ph-pill-secondary">
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </div>

          <div aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
