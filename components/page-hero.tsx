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
        .ph-hero-img-mobile { display: none; }
        @media (max-width: 768px) {
          .ph-hero-grid {
            grid-template-columns: 1fr !important;
            align-items: start !important;
            padding: clamp(56px,9vw,80px) clamp(20px,5vw,28px) !important;
          }
          .ph-hero-img { object-position: 65% 80% !important; }
          .ph-hero-img-desktop { display: none !important; }
          .ph-hero-img-mobile { display: block; }
        }
      `}</style>

      <div
        style={{
          position: "relative",
          width: "100%",
          margin: 0,
          borderRadius: 0,
          overflow: "hidden",
          backgroundColor: "var(--base-light)",
          minHeight: minH,
        }}
      >
        {imageSrc && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={imageAlt}
              className={`ph-hero-img${mobileImageSrc ? " ph-hero-img-desktop" : ""}`}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: imageObjectPosition,
              }}
            />
            {mobileImageSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mobileImageSrc}
                alt={imageAlt}
                className="ph-hero-img ph-hero-img-mobile"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
              />
            )}


          </>
        )}

        <div
          className="ph-hero-grid"
          style={{
            position: "relative",
            maxWidth: 1440,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: imageSrc ? "1.05fr 1fr" : "1fr",
            alignItems: "center",
            gap: "clamp(32px,5vw,72px)",
          padding: "clamp(56px,7vw,100px) clamp(20px,5vw,64px)",
          minHeight: "inherit",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
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
              maxWidth: 600,
            }}
          />

            <p
              className="ph-fade ph-lede"
              style={{
                fontFamily: GC,
                fontWeight: 500,
                fontSize: "clamp(18px,1.7vw,21px)",
                lineHeight: 1.5,
                color: "rgba(0,0,0,0.72)",
                maxWidth: 540,
                marginBottom: children || primaryCta || secondaryCta ? 28 : 0,
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
              <div
                className="ph-fade ph-cta ph-pill-row"
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

          {imageSrc && <div aria-hidden="true" />}
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
    <section
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "var(--base-light)",
        color: "var(--ink)",
        padding: 0,
        overflow: "hidden",
        minHeight: compact
          ? "clamp(420px, 52vh, 540px)"
          : "clamp(480px, 60vh, 620px)",
      }}
    >
      {/* Subtle tone-on-tone gradient — adds depth without visual noise */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 70% 80% at 80% 50%, rgba(222,218,208,0.55) 0%, rgba(222,218,208,0) 60%),
            radial-gradient(ellipse 80% 70% at 15% 100%, rgba(222,218,208,0.35) 0%, rgba(222,218,208,0) 65%),
            linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.03) 100%)
          `,
          pointerEvents: "none",
        }}
      />

      <style>{SHARED_HERO_STYLES}</style>

      <div
        className="relative w-full max-w-[1440px] mx-auto"
        style={{
          padding: compact
            ? "clamp(80px,9vw,120px) clamp(20px,5vw,64px) clamp(56px,7vw,88px)"
            : "clamp(88px,10vw,140px) clamp(20px,5vw,64px) clamp(64px,8vw,104px)",
          textAlign: centered ? "center" : "left",
          display: "flex",
          flexDirection: "column",
          alignItems: centered ? "center" : "flex-start",
          minHeight: "inherit",
          justifyContent: "center",
        }}
      >
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
            color: "rgba(0,0,0,0.72)",
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
    </section>
  )
}
