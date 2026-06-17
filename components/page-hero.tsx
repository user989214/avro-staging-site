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
  /** Portrait (9:16) crop shown on mobile instead of the desktop image. */
  mobileImageSrc?: string
  primaryCta?: { href: string; label: string }
  secondaryCta?: { href: string; label: string }
  /** Optional content rendered below the lede / CTAs (e.g. badges, search bar, chip row). */
  children?: ReactNode
  /** Tighter hero (used for FAQ-style search heroes). */
  compact?: boolean
  /** Center-align the title, lede, CTAs and children inside the flat hero. */
  centered?: boolean
  /**
   * Visual variant.
   * - `card` (default): full-bleed panel with image inside, CTAs below.
   * - `flat`: full-width, no image, tone-on-tone fade.
   *
   * Both variants share the same typography / animation language as the cohort
   * hero (golf, social, work, gaming) so every non-home page hero reads as a
   * coordinated family.
   */
  variant?: "card" | "flat"
}

/**
 * Word-by-word rising headline — matches the cohort hero animation so every
 * non-home hero on the site shares the same "land into place" motion language.
 */
function AnimatedHeadline({
  text,
  className,
  style,
}: {
  text: ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  if (typeof text !== "string") {
    return (
      <h1 className={className} style={style}>
        {text}
      </h1>
    )
  }
  const words = text.split(" ")
  return (
    <h1 className={className} style={style}>
      {words.map((word, i) => {
        const delay = 0.1 + i * 0.09
        return (
          <span
            key={i}
            className="ph-word"
            style={{ animationDelay: `${delay.toFixed(2)}s` }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        )
      })}
    </h1>
  )
}

/** Shared animation + button keyframes/styles used by both variants. */
const SHARED_HERO_STYLES = `
  @keyframes ph-rise {
    0%   { opacity: 0; transform: translateY(24px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes ph-fade-up {
    0%   { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .ph-word {
    display: inline-block;
    opacity: 0;
    transform: translateY(24px);
    animation: ph-rise 0.95s cubic-bezier(0.34, 1.4, 0.4, 1) forwards;
    will-change: transform, opacity;
  }
  .ph-fade { opacity: 0; animation: ph-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
  .ph-lede { animation-delay: 0.85s; }
  .ph-cta  { animation-delay: 1.05s; }
  .ph-extra { animation-delay: 0.95s; }
  @media (prefers-reduced-motion: reduce) {
    .ph-word, .ph-fade {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }

  /* Button sizing + width aligned to home-page hero CTAs. */
  .ph-pill-primary, .ph-pill-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 180px;
    min-width: 180px;
    font-family: ${GC};
    font-weight: 700;
    font-size: 16px;
    letter-spacing: -0.005em;
    min-height: 48px;
    padding: 0 28px;
    border-radius: 999px;
    text-decoration: none;
    border: 2px solid var(--charcoal);
    transition: background-color .2s ease, color .2s ease;
  }
  .ph-pill-primary {
    background-color: transparent;
    color: var(--charcoal);
  }
  .ph-pill-secondary {
    background-color: transparent;
    color: var(--charcoal);
  }
  .ph-pill-primary:hover {
    background-color: var(--charcoal);
    color: var(--bone);
  }
  .ph-pill-secondary:hover {
    background-color: var(--charcoal);
    color: var(--bone);
  }
  .ph-pill-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
    max-width: 520px;
  }
  @media (max-width: 640px) {
    .ph-pill-row { flex-direction: column; align-items: stretch; max-width: 320px; }
    .ph-pill-primary, .ph-pill-secondary { width: 100%; flex: 0 0 auto; }
  }
`

/**
 * Shared "docked" page hero.
 * - `card` variant matches the homepage HomeRefHero treatment: rounded card with
 *   edge-fading image on the right, headline + lede + CTAs on the left.
 * - `flat` variant is a clean, simplistic full-width hero used for pages that don't
 *   need the carded product treatment.
 */
export function PageHero({
  title,
  lede,
  imageSrc,
  imageAlt,
  imageObjectPosition = "right center",
  mobileImageSrc,
  primaryCta,
  secondaryCta,
  children,
  compact = false,
  centered = false,
  variant = "card",
}: PageHeroProps) {
  if (variant === "flat") {
    return <FlatHero {...{ title, lede, primaryCta, secondaryCta, children, compact, centered }} />
  }

  // Tuned so the entire hero (headline + lede + extras + CTAs) lands above
  // the fold on a typical 800px-tall desktop viewport after the sticky header.
  const minH = compact
    ? "clamp(420px, 52vh, 540px)"
    : "clamp(480px, 60vh, 620px)"

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
        ${SHARED_HERO_STYLES}
        /* ── Desktop: rounded 16:9 card with content overlaid ── */
        .ph-hero-16x9 {
          position: relative;
          width: calc(100% - 32px);
          margin: 0 auto 16px;
          aspect-ratio: 16/9;
          overflow: hidden;
          background-color: var(--base-light);
          border-radius: 20px;
        }
        .ph-hero-16x9-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(32px,5vw,80px) clamp(20px,5vw,64px);
        }
        .ph-hero-img-mobile { display: none; }
        .ph-hero-img-desktop { display: block; }
        /* ── Mobile: stacked — rounded image on top, text below ── */
        @media (max-width: 768px) {
          .ph-hero-16x9 {
            aspect-ratio: unset !important;
            height: auto !important;
            overflow: visible !important;
            display: flex;
            flex-direction: column;
          }
          .ph-hero-img-wrapper {
            position: relative !important;
            inset: unset !important;
            width: calc(100% - 32px);
            margin: 16px auto 0;
            aspect-ratio: 3/4;
            border-radius: 20px;
            overflow: hidden;
            flex-shrink: 0;
          }
          .ph-hero-img-desktop { display: none !important; }
          .ph-hero-img-mobile { display: block !important; }
          .ph-hero-16x9-content {
            position: static !important;
            padding: 24px 20px 32px !important;
          }
        }
        @media (min-width: 769px) {
          .ph-hero-img-wrapper {
            position: absolute;
            inset: 0;
            border-radius: 0;
          }
        }
      `}</style>

      {/* Outer wrapper — 16:9 on desktop, column-stacked on mobile */}
      <div className="ph-hero-16x9">

        {/* Image container — full-bleed on desktop, rounded-rect card on mobile */}
        <div className="ph-hero-img-wrapper">
          {imageSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt={imageAlt}
              className="ph-hero-img-desktop"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: imageObjectPosition }}
            />
          )}
          {mobileImageSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mobileImageSrc}
              alt={imageAlt}
              className="ph-hero-img-mobile"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: imageObjectPosition }}
            />
          )}
          {/* Fallback: if no mobile src, show the desktop image on mobile too */}
          {!mobileImageSrc && imageSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt={imageAlt}
              className="ph-hero-img-mobile"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: imageObjectPosition }}
            />
          )}
        </div>

        {/* Content — overlaid on desktop, below image on mobile */}
        <div className="ph-hero-16x9-content">
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 580 }}>
            <AnimatedHeadline
              text={title}
              className="font-serif"
              style={{
                fontWeight: 900,
                fontSize: compact ? "clamp(28px,3.5vw,48px)" : "clamp(32px,4vw,60px)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "var(--ink)",
                marginBottom: 14,
              }}
            />

            <p
              className="ph-fade ph-lede"
              style={{
                fontFamily: GC,
                fontWeight: 500,
                fontSize: "clamp(16px,1.4vw,20px)",
                lineHeight: 1.5,
                color: "var(--ink)",
                maxWidth: 500,
                marginBottom: children || primaryCta || secondaryCta ? 24 : 0,
              }}
            >
              {lede}
            </p>

            {children && (
              <div className="ph-fade ph-extra" style={{ width: "100%" }}>
                {children}
              </div>
            )}

            {(primaryCta || secondaryCta) && (
              <div className="ph-fade ph-cta ph-pill-row" style={{ marginTop: children ? 20 : 0 }}>
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
        </div>
      </div>
    </section>
  )
}

/**
 * Flat full-width hero — same typography + animation language as the cohort
 * hero, with no image. Used for Science / Why / Learn / FAQ / Contact / Account.
 */
function FlatHero({
  title,
  lede,
  primaryCta,
  secondaryCta,
  children,
  compact,
  centered,
}: Omit<PageHeroProps, "imageSrc" | "imageAlt" | "imageObjectPosition" | "variant">) {
  return (
    /* Outer section matches the site page background — pure white — so no
       colour bleeds above or below the card. */
    <section
      style={{
        width: "100%",
        backgroundColor: "var(--base)",
        color: "var(--ink)",
        padding: 0,
      }}
    >
      <style>{`
        ${SHARED_HERO_STYLES}
        .ph-flat-card {
          position: relative;
          width: calc(100% - 32px);
          margin: 0 auto 16px;
          border-radius: 20px;
          overflow: hidden;
          background-color: var(--base-light);
        }
        /* Subtle tone-on-tone gradient overlay */
        .ph-flat-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 80% at 80% 50%, rgba(222,218,208,0.55) 0%, rgba(222,218,208,0) 60%),
            radial-gradient(ellipse 80% 70% at 15% 100%, rgba(222,218,208,0.35) 0%, rgba(222,218,208,0) 65%);
          pointer-events: none;
        }
        .ph-flat-inner {
          position: relative;
          padding: ${compact
            ? "clamp(56px,8vw,100px) clamp(20px,5vw,64px) clamp(48px,6vw,80px)"
            : "clamp(72px,9vw,120px) clamp(20px,5vw,64px) clamp(64px,8vw,104px)"};
          display: flex;
          flex-direction: column;
          align-items: ${centered ? "center" : "flex-start"};
          text-align: ${centered ? "center" : "left"};
        }
        @media (max-width: 768px) {
          .ph-flat-card {
            width: calc(100% - 24px);
          }
          .ph-flat-inner {
            padding: clamp(48px,10vw,72px) clamp(16px,5vw,28px) clamp(40px,8vw,60px);
          }
        }
      `}</style>

      <div className="ph-flat-card">
        <div className="ph-flat-inner">
          <AnimatedHeadline
            text={title}
            className="font-serif"
            style={{
              fontWeight: 900,
              fontSize: compact
                ? "clamp(32px,4.5vw,52px)"
                : "clamp(36px,5vw,64px)",
              lineHeight: 1,
              letterSpacing: "-0.025em",
              color: "var(--ink)",
              marginBottom: 16,
              maxWidth: 820,
            }}
          />

          <p
            className="ph-fade ph-lede"
            style={{
              fontFamily: GC,
              fontWeight: 500,
              fontSize: "clamp(18px,1.7vw,21px)",
              lineHeight: 1.5,
              color: "var(--ink)",
              maxWidth: 660,
              marginBottom: 0,
            }}
          >
            {lede}
          </p>

          {children && (
            <div
              className="ph-fade ph-extra"
              style={{
                marginTop: 22,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: centered ? "center" : "flex-start",
              }}
            >
              {children}
            </div>
          )}

          {(primaryCta || secondaryCta) && (
            <div
              className="ph-fade ph-cta ph-pill-row"
              style={{
                marginTop: 22,
                justifyContent: centered ? "center" : "flex-start",
              }}
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
      </div>
    </section>
  )
}
