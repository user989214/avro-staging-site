"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { formulas, sharedProof, testimonials, type FormulaKey } from "@/lib/data"
import { Icon, type IconName } from "@/components/icons"
import { AvroIcon, type AvroIconName, lucideToAvroMap } from "@/components/avro-icons"
import { ProductCard } from "@/components/product-visual"

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id, dark = false }: SectionProps & { dark?: boolean }) {
  const bg = dark ? "var(--deep-black)" : undefined
  return (
    <section
      id={id}
      className={cn(
        "w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(52px,7vw,86px)]",
        className
      )}
      style={bg ? { backgroundColor: bg } : undefined}
    >
      {children}
    </section>
  )
}

/**
 * CardedSection — a section whose content sits inside a rounded "paper" panel,
 * matching the rounded-rectangle language used on the homepage and PDP.
 */
export function CardedSection({
  children,
  className,
  panelClassName,
  bg = "var(--base-light)",
  id,
}: {
  children: React.ReactNode
  className?: string
  panelClassName?: string
  bg?: string
  id?: string
}) {
  return (
    <section
      id={id}
      className={cn(
        "w-full max-w-[1440px] mx-auto px-[clamp(16px,5vw,64px)] py-[clamp(28px,4vw,56px)]",
        className
      )}
    >
      <div
        className={cn("rounded-[28px] p-[clamp(28px,5vw,64px)]", panelClassName)}
        style={{ backgroundColor: bg }}
      >
        {children}
      </div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = true,
  dark = false,
}: {
  eyebrow?: string
  title: string
  description?: string
  centered?: boolean
  dark?: boolean
}) {
  const textColor = dark ? "text-gold" : ""
  const mutedText = dark ? "text-gold/70" : "text-ink/75"
  const chipBg = dark ? "bg-dark-surface text-gold" : "bg-charcoal text-bone"
  return (
    <div
      className={cn(
        "max-w-[900px] mb-8.5",
        centered && "mx-auto text-center",
        textColor
      )}
    >
      {eyebrow && (
        <span
          className={cn("inline-block mb-4 px-3.5 py-1.5 rounded-full text-[11px] font-black tracking-[0.12em] uppercase", chipBg)}
        >
          {eyebrow}
        </span>
      )}
      <h2 className={cn("font-serif font-black text-[clamp(30px,4vw,52px)] leading-[1.05] mb-3.5", textColor)}>
        {title}
      </h2>
      {description && (
        <p className={cn("max-w-[760px] mx-auto text-base leading-relaxed", mutedText)}>
          {description}
        </p>
      )}
    </div>
  )
}

export function CtaGroup({
  primary = "Shop AVRO",
  secondary = "Find Your Formula",
  dark = false,
  hero = false,
}: {
  primary?: string
  secondary?: string
  dark?: boolean
  hero?: boolean
}) {
  // Hero buttons are wider — visually echo the homepage hero CTAs (≥220px, generous horizontal padding,
  // and they stretch to fill the row so labels never wrap awkwardly).
  const heroStyle = hero
    ? {
        minWidth: 220,
        padding: "0 44px",
        flex: "1 1 220px" as const,
        whiteSpace: "nowrap" as const,
      }
    : undefined
  return (
    <div
      className="flex flex-wrap items-center gap-3 mt-6.5"
      style={hero ? { maxWidth: 560 } : undefined}
    >
      <Link
        href="/shop"
        className={dark ? "btn-primary-dark" : "btn-primary"}
        style={heroStyle}
      >
        {primary}
      </Link>
      <Link
        href="/shop"
        className={dark ? "btn-outline-dark" : "btn-secondary"}
        style={heroStyle}
      >
        {secondary}
      </Link>
    </div>
  )
}

export function SocialProof({ mode = "full", dark = false }: { mode?: "full" | "compact"; dark?: boolean }) {
  // Zero Proof / dark variant — solid deep-black, no gradient. The cohort reads as a high-contrast
  // black + gold story end-to-end, so SocialProof falls in line with the rest of the page.
  const bg = dark
    ? "var(--deep-black)"
    : "linear-gradient(to bottom, var(--base) 0%, #EAE6DC 100%)"
  const ink = dark ? "var(--gold)" : "var(--ink)"
  return (
    <section
      style={{
        width: "100%",
        padding: "clamp(64px,8vw,112px) clamp(20px,5vw,64px) clamp(72px,9vw,120px)",
        background: bg,
      }}
    >
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        <h2 style={{ fontFamily: GC_FINAL, fontWeight: 700, fontSize: "clamp(34px,4.4vw,60px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: ink, marginBottom: 40, textAlign: "center" }}>
          Trusted for calm-first routines.
        </h2>
        {mode === "full" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 16 }}>
            {testimonials.map((item) => (
              <article key={item.name} style={{ backgroundColor: "var(--base-light)", borderRadius: 24, padding: "clamp(24px,3vw,36px)" }}>
                <p style={{ fontFamily: GC_FINAL, fontWeight: 400, fontSize: "clamp(18px,1.6vw,22px)", lineHeight: 1.4, color: "rgba(0,0,0,0.75)", marginBottom: 16 }}>
                  &ldquo;{item.quote}&rdquo;
                </p>
                <strong style={{ fontFamily: GC_FINAL, fontWeight: 700, fontSize: 18, color: "var(--ink)", display: "block" }}>{item.name}</strong>
                <span style={{ fontFamily: GC_FINAL, fontWeight: 500, fontSize: 15, color: "rgba(0,0,0,0.55)", display: "block", marginTop: 4 }}>{item.role}</span>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export function ProductCards({
  title = "Choose your AVRO formula",
  shopLabel = "Shop",
  dark = false,
}: {
  title?: string
  shopLabel?: string
  dark?: boolean
}) {
  const bg = dark ? "var(--deep-black)" : "var(--base)"
  // Zero Proof / dark variant uses gold cards with deep-black text for high-contrast
  // product display. The product visual sits inside a deep-black inner panel so the
  // can/sachet pops against the gold card.
  const cardBg = dark ? "var(--gold)" : "var(--base-light)"
  const ink = dark ? "var(--deep-black)" : "var(--ink)"
  // Section title sits on the deep-black page background, so it stays gold there.
  const titleInk = dark ? "var(--gold)" : "var(--ink)"
  const titleMuted = dark ? "rgba(202,168,75,0.7)" : "rgba(0,0,0,0.6)"
  const muted = dark ? "rgba(13,13,13,0.7)" : "rgba(0,0,0,0.6)"
  const border = dark ? "rgba(13,13,13,0.18)" : "rgba(0,0,0,0.08)"
  return (
    <section style={{ backgroundColor: bg, width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        <h2 style={{ fontFamily: GC_FINAL, fontWeight: 700, fontSize: "clamp(28px,3.6vw,48px)", lineHeight: 1.0, color: titleInk, marginBottom: 12 }}>
          {title}
        </h2>
        <p style={{ fontFamily: GC_FINAL, fontWeight: 500, fontSize: "clamp(15px,1.2vw,18px)", lineHeight: 1.4, color: titleMuted, marginBottom: 32 }}>
          Every AVRO formula starts with the same calm-first base, then supports the moment in a different way.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {(Object.keys(formulas) as FormulaKey[]).map((key) => {
            const item = formulas[key]
            return (
              <article key={key} style={{ backgroundColor: cardBg, borderRadius: 24, padding: "clamp(20px,3vw,32px)", display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Inner product frame — solid deep-black on Zero Proof so the can pops against the gold card; bone on light. */}
                <div style={{ borderRadius: 20, height: 340, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", backgroundColor: dark ? "var(--deep-black)" : "var(--bone)" }}>
                  <ProductCard formulaKey={key} className="h-full w-full object-cover" />
                </div>
                <h3 style={{ fontFamily: GC_FINAL, fontWeight: 700, fontSize: "clamp(22px,2vw,28px)", color: ink, margin: 0 }}>{item.name}</h3>
                <p style={{ fontFamily: GC_FINAL, fontWeight: 400, fontSize: "clamp(16px,1.3vw,18px)", lineHeight: 1.45, color: muted, margin: 0 }}>{item.support}</p>
                <div style={{ borderTop: `1px solid ${border}`, paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                  <div>
                    <span style={{ fontFamily: GC_FINAL, fontWeight: 700, fontSize: 16, color: ink }}>Best for</span>
                    <p style={{ fontFamily: GC_FINAL, fontWeight: 400, fontSize: 15, lineHeight: 1.4, color: muted, margin: "4px 0 0" }}>{item.bestFor}</p>
                  </div>
                  <div>
                    <span style={{ fontFamily: GC_FINAL, fontWeight: 700, fontSize: 16, color: ink }}>Caffeine</span>
                    <p style={{ fontFamily: GC_FINAL, fontWeight: 400, fontSize: 15, lineHeight: 1.4, color: muted, margin: "4px 0 0" }}>{item.caffeine}</p>
                  </div>
                </div>
                <a 
                  href={`/${key}`} 
                  className={dark ? "hp-btn-gold" : "hp-btn-black"}
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    fontFamily: GC_FINAL, 
                    fontWeight: 700, 
                    fontSize: 16, 
                    width: "100%",
                    minHeight: 48, 
                    padding: "0 24px", 
                    borderRadius: 999, 
                    textDecoration: "none", 
                    // On Zero Proof the card is gold, so the CTA inverts to deep-black with gold text
                    // (and on hover collapses to outline mode — gold stroke + deep-black text on the gold card).
                    border: dark ? "2px solid var(--deep-black)" : "2px solid var(--charcoal)",
                    backgroundColor: dark ? "var(--deep-black)" : "var(--charcoal)", 
                    color: dark ? "var(--gold)" : "var(--bone)", 
                    marginTop: "auto",
                    transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (dark) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = 'var(--deep-black)'
                    } else {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = 'var(--charcoal)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (dark) {
                      e.currentTarget.style.backgroundColor = 'var(--deep-black)'
                      e.currentTarget.style.color = 'var(--gold)'
                    } else {
                      e.currentTarget.style.backgroundColor = 'var(--charcoal)'
                      e.currentTarget.style.color = 'var(--bone)'
                    }
                  }}
                >
                  {shopLabel} {item.short}
                </a>
              </article>
            )
          })}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
            max-width: 400px !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </section>
  )
}

export function FormulaLogic({ dark = false }: { dark?: boolean }) {
  const cards: [string, string, AvroIconName][] = [
    [
      "PharmaGABA®",
      "Naturally fermented PharmaGABA® is the calm-first foundation in every AVRO formula.",
      "calm-first-foundation",
    ],
    [
      "Formula Logic",
      "Each formula builds from the same base, then adds targeted support for the moment.",
      "clinically-tested-ingredients",
    ],
    [
      "Quality + Transparency",
      "Clear ingredient disclosure and quality standards, with documentation where applicable.",
      "quality-standards",
    ],
    [
      "Calm First Foundation",
      "AVRO is designed to support state before stimulation.",
      "supports-clear-thinking",
    ],
  ]

  return (
    <Section dark={dark}>
      <SectionHeading
        eyebrow="Science + formula logic"
        title="Calm first. Then support the moment."
        dark={dark}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
        {cards.map(([title, copy, iconName]) => (
          <InfoCard key={title} icon={iconName} title={title} dark={dark}>
            {copy}
          </InfoCard>
        ))}
      </div>
    </Section>
  )
}

export function InfoCard({
  icon,
  title,
  children,
  href,
  dark = false,
}: {
  icon: AvroIconName
  title: string
  children: React.ReactNode
  href?: string
  dark?: boolean
}) {
  // Zero Proof / dark cards = dark surface card with bone text and golden icons.
  // Light cohorts = bone card with ink text and standard icons.
  const cardBg = dark ? "bg-[#111110]" : "bg-base-light"
  const titleColor = dark ? "text-bone" : ""
  const textColor = dark ? "text-bone/60" : "text-ink/75"
  const content = (
    <>
      <div className="mb-5">
        <AvroIcon name={icon} golden={dark} size={56} className="md:w-[72px] md:h-[72px]" />
      </div>
      <h3 className={cn("font-black mb-2", titleColor)}>{title}</h3>
      <p className={cn("text-base leading-relaxed", textColor)}>{children}</p>
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={cn("min-h-[180px] p-7 rounded-[20px] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_70px_rgba(30,29,24,0.08)]", cardBg)}
      >
        {content}
      </Link>
    )
  }

  return (
    <article className={cn("min-h-[180px] p-7 rounded-[20px]", cardBg)}>
      {content}
    </article>
  )
}

export function FaqBlock({
  title,
  faqs,
  centered = true,
  dark = false,
}: {
  title: string
  faqs: [string, string][]
  centered?: boolean
  dark?: boolean
}) {
  // Zero Proof / dark variant uses dark surface cards with bone text,
  // matching the design system v2. Light cohorts keep the bone card with default ink.
  const cardBg = dark ? "bg-[#111110]" : "bg-base-light"
  const textColor = dark ? "text-bone" : ""
  const mutedText = dark ? "text-bone/60" : "text-ink/75"
  return (
    <Section className="max-w-[1080px]">
      <SectionHeading title={title} centered={centered} dark={dark} />
      <div className="grid gap-2 w-full">
        {faqs.map(([q, a]) => (
          <details
            key={q}
            className={cn(cardBg, "rounded-[12px] group", textColor)}
          >
            <summary className="flex justify-between gap-4 px-5.5 py-4.5 cursor-pointer font-extrabold select-none after:content-['+'] after:text-[22px] after:leading-none group-open:after:content-['-']">
              {q}
            </summary>
            <p className={cn("px-5.5 pb-5 leading-relaxed", mutedText)}>{a}</p>
          </details>
        ))}
      </div>
      <div className={cn("mt-5.5", centered ? "text-center" : "text-left")}>
        <Link href="/faq" className={dark ? "btn-secondary-dark" : "btn-secondary"}>
          View All FAQs
        </Link>
      </div>
    </Section>
  )
}

const GC_FINAL = '"DM Sans", system-ui, sans-serif'

export function FinalCta({
  title,
  copy,
  productButtons = true,
  eyebrow,
  bg = "var(--avro-blue)",
  dark = false,
}: {
  title: string
  copy: string
  productButtons?: boolean
  eyebrow?: string
  /** Background color for the rounded CTA card (defaults to AVRO blue). */
  bg?: string
  dark?: boolean
}) {
  // Dark (Zero Proof): deep-black text on gold card, deep-black buttons with gold text
  // Light: charcoal text on blue/green card, charcoal buttons with bone text
  const textColor = dark ? "var(--deep-black)" : "var(--charcoal)"
  const mutedColor = dark ? "rgba(13,13,13,0.7)" : "rgba(21,21,21,0.7)"
  const sectionBg = dark ? "var(--deep-black)" : "transparent"
  const btnBg = dark ? "var(--deep-black)" : "var(--charcoal)"
  const btnText = dark ? "var(--gold)" : "var(--bone)"
  return (
    <section
      style={{
        backgroundColor: sectionBg,
        width: "100%",
        padding: "clamp(40px,6vw,72px) clamp(20px,5vw,64px)",
      }}
    >
      <div
        style={{
          maxWidth: 1250,
          margin: "0 auto",
          backgroundColor: bg,
          color: textColor,
          borderRadius: 28,
          padding: "clamp(48px,6vw,88px) clamp(28px,5vw,80px)",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 40,
          fontFamily: GC_FINAL,
        }}
      >
        {/* Left: eyebrow + heading + copy */}
        <div style={{ flex: "1 1 420px", minWidth: 0, maxWidth: 580 }}>
          {eyebrow && (
            <span
              style={{
                display: "inline-block",
                marginBottom: 14,
                fontFamily: GC_FINAL,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: textColor,
                opacity: 0.7,
              }}
            >
              {eyebrow}
            </span>
          )}
          <h2
            style={{
              fontFamily: GC_FINAL,
              fontWeight: 700,
              fontSize: "clamp(34px,4.6vw,60px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: textColor,
              marginBottom: 14,
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontFamily: GC_FINAL,
              fontWeight: 400,
              fontSize: "clamp(15px,1.3vw,17px)",
              lineHeight: 1.55,
              color: mutedColor,
            }}
          >
            {copy}
          </p>
        </div>

        {/* Right: stacked full-width CTA buttons */}
        <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: 12, minWidth: 280, maxWidth: 460 }}>
          {productButtons ? (
            [
              { href: "/calm", label: "Shop Calm" },
              { href: "/focus", label: "Shop Focus" },
              { href: "/energy", label: "Shop Energy" },
            ].map((b) => (
              <a
                key={b.href}
                href={b.href}
                className="final-cta-pill"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  fontFamily: GC_FINAL,
                  fontWeight: 700,
                  fontSize: 16,
                  letterSpacing: "-0.005em",
                  minHeight: 48,
                  padding: "0 28px",
                  borderRadius: 999,
                  border: `2px solid ${btnBg}`,
                  backgroundColor: btnBg,
                  color: btnText,
                  textDecoration: "none",
                  transition: "background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease",
                }}
              >
                {b.label}
              </a>
            ))
          ) : (
            <>
              <a
                href="/shop"
                className="final-cta-pill"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  fontFamily: GC_FINAL,
                  fontWeight: 700,
                  fontSize: 16,
                  minHeight: 48,
                  padding: "0 28px",
                  borderRadius: 999,
                  border: `2px solid ${btnBg}`,
                  backgroundColor: btnBg,
                  color: btnText,
                  textDecoration: "none",
                }}
              >
                Shop AVRO
              </a>
              <a
                href="/contact"
                className="final-cta-pill-outline"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  fontFamily: GC_FINAL,
                  fontWeight: 700,
                  fontSize: 16,
                  minHeight: 48,
                  padding: "0 28px",
                  borderRadius: 999,
                  border: `2px solid ${btnBg}`,
                  backgroundColor: btnBg,
                  color: btnText,
                  textDecoration: "none",
                }}
              >
                Contact Us
              </a>
            </>
          )}
        </div>
      </div>

      <style>{`
        .final-cta-pill:hover {
          background-color: transparent !important;
          color: var(--deep-black) !important;
        }
        .final-cta-pill-outline:hover {
          background-color: transparent !important;
          color: var(--deep-black) !important;
        }
      `}</style>
    </section>
  )
}
