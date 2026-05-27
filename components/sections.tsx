"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { formulas, sharedProof, testimonials, type FormulaKey } from "@/lib/data"
import { Icon, type IconName } from "@/components/icons"
import { ProductCard } from "@/components/product-visual"

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(52px,7vw,86px)] border-b border-line",
        className
      )}
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
}: {
  eyebrow?: string
  title: string
  description?: string
  centered?: boolean
}) {
  return (
    <div
      className={cn(
        "max-w-[900px] mb-8.5",
        centered && "mx-auto text-center"
      )}
    >
      {eyebrow && (
        <span
          className="inline-block mb-4 px-3.5 py-1.5 rounded-full bg-charcoal text-bone text-[11px] font-black tracking-[0.12em] uppercase"
        >
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif font-black text-[clamp(30px,4vw,52px)] leading-[1.05] mb-3.5">
        {title}
      </h2>
      {description && (
        <p className="max-w-[760px] mx-auto text-ink/75 text-base leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}

export function CtaGroup({
  primary = "Shop AVRO",
  secondary = "Find Your Formula",
}: {
  primary?: string
  secondary?: string
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 mt-6.5">
      <Link href="/shop" className="btn-primary">
        {primary}
      </Link>
      <Link href="/shop" className="btn-secondary">
        {secondary}
      </Link>
    </div>
  )
}

export function SocialProof({ mode = "full" }: { mode?: "full" | "compact" }) {
  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        <h2 style={{ fontFamily: GC_FINAL, fontWeight: 700, fontSize: "clamp(28px,3.6vw,48px)", lineHeight: 1.0, color: "var(--ink)", marginBottom: 32 }}>
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
}: {
  title?: string
  shopLabel?: string
}) {
  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        <h2 style={{ fontFamily: GC_FINAL, fontWeight: 700, fontSize: "clamp(28px,3.6vw,48px)", lineHeight: 1.0, color: "var(--ink)", marginBottom: 12 }}>
          {title}
        </h2>
        <p style={{ fontFamily: GC_FINAL, fontWeight: 500, fontSize: "clamp(15px,1.2vw,18px)", lineHeight: 1.4, color: "rgba(0,0,0,0.6)", marginBottom: 32 }}>
          Every AVRO formula starts with the same calm-first base, then supports the moment in a different way.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {(Object.keys(formulas) as FormulaKey[]).map((key) => {
            const item = formulas[key]
            return (
              <article key={key} style={{ backgroundColor: "var(--base-light)", borderRadius: 24, padding: "clamp(20px,3vw,32px)", display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ borderRadius: 20, height: 340, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", backgroundColor: "var(--bone)" }}>
                  <ProductCard formulaKey={key} className="h-full w-full object-cover" />
                </div>
                <h3 style={{ fontFamily: GC_FINAL, fontWeight: 700, fontSize: "clamp(22px,2vw,28px)", color: "var(--ink)", margin: 0 }}>{item.name}</h3>
                <p style={{ fontFamily: GC_FINAL, fontWeight: 400, fontSize: "clamp(16px,1.3vw,18px)", lineHeight: 1.45, color: "rgba(0,0,0,0.6)", margin: 0 }}>{item.support}</p>
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                  <div>
                    <span style={{ fontFamily: GC_FINAL, fontWeight: 700, fontSize: 16, color: "var(--ink)" }}>Best for</span>
                    <p style={{ fontFamily: GC_FINAL, fontWeight: 400, fontSize: 15, lineHeight: 1.4, color: "rgba(0,0,0,0.6)", margin: "4px 0 0" }}>{item.bestFor}</p>
                  </div>
                  <div>
                    <span style={{ fontFamily: GC_FINAL, fontWeight: 700, fontSize: 16, color: "var(--ink)" }}>Caffeine</span>
                    <p style={{ fontFamily: GC_FINAL, fontWeight: 400, fontSize: 15, lineHeight: 1.4, color: "rgba(0,0,0,0.6)", margin: "4px 0 0" }}>{item.caffeine}</p>
                  </div>
                </div>
                <a 
                  href={`/${key}`} 
                  className="hp-btn-black"
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
                    border: "2px solid var(--charcoal)",
                    backgroundColor: "var(--charcoal)", 
                    color: "var(--bone)", 
                    marginTop: "auto",
                    transition: "background-color 0.2s ease, color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = 'var(--charcoal)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--charcoal)'
                    e.currentTarget.style.color = 'var(--bone)'
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

export function FormulaLogic() {
  const cards: [string, string, IconName][] = [
    [
      "PharmaGABA®",
      "Naturally fermented PharmaGABA® is the calm-first foundation in every AVRO formula.",
      "leaf",
    ],
    [
      "Formula Logic",
      "Each formula builds from the same base, then adds targeted support for the moment.",
      "flask",
    ],
    [
      "Quality + Transparency",
      "Clear ingredient disclosure and quality standards, with documentation where applicable.",
      "shield",
    ],
    [
      "Calm First Foundation",
      "AVRO is designed to support state before stimulation.",
      "brain",
    ],
  ]

  return (
    <Section>
      <SectionHeading
        eyebrow="Science + formula logic"
        title="Calm first. Then support the moment."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
        {cards.map(([title, copy, iconName]) => (
          <InfoCard key={title} icon={iconName} title={title}>
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
}: {
  icon: IconName
  title: string
  children: React.ReactNode
  href?: string
}) {
  const content = (
    <>
      <Icon name={icon} className="w-10.5 h-10.5 mb-5 text-olive" />
      <h3 className="font-black mb-2">{title}</h3>
      <p className="text-ink/75 text-base leading-relaxed">{children}</p>
    </>
  )

  if (href) {
    return (
      <Link
      href={href}
      className="min-h-[180px] p-7 bg-base-light rounded-[20px] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_70px_rgba(30,29,24,0.08)]"
      >
        {content}
      </Link>
    )
  }

  return (
    <article className="min-h-[180px] p-7 bg-base-light rounded-[20px]">
      {content}
    </article>
  )
}

export function FaqBlock({
  title,
  faqs,
  centered = true,
}: {
  title: string
  faqs: [string, string][]
  centered?: boolean
}) {
  return (
    <Section>
      <SectionHeading eyebrow="Questions" title={title} centered={centered} />
      <div className={cn("grid gap-2 w-full max-w-[1080px]", centered && "mx-auto")}>
        {faqs.map(([q, a]) => (
          <details
            key={q}
            className="bg-base-light rounded-[12px] group"
          >
            <summary className="flex justify-between gap-4 px-5.5 py-4.5 cursor-pointer font-extrabold select-none after:content-['+'] after:text-[22px] after:leading-none group-open:after:content-['-']">
              {q}
            </summary>
            <p className="px-5.5 pb-5 text-ink/75 leading-relaxed">{a}</p>
          </details>
        ))}
      </div>
      <div className={cn("mt-5.5", centered ? "text-center" : "text-left")}>
        <Link href="/faq" className="btn-secondary">
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
}: {
  title: string
  copy: string
  productButtons?: boolean
  eyebrow?: string
}) {
  return (
    <section
      style={{
        backgroundColor: "var(--base)",
        width: "100%",
        padding: "clamp(40px,6vw,72px) clamp(20px,5vw,64px)",
      }}
    >
      <div
        style={{
          maxWidth: 1250,
          margin: "0 auto",
          backgroundColor: "var(--avro-blue)",
          color: "var(--charcoal)",
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
                color: "var(--charcoal)",
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
              color: "var(--charcoal)",
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
              color: "rgba(21,21,21,0.7)",
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
                  border: "2px solid var(--charcoal)",
                  backgroundColor: "var(--charcoal)",
                  color: "var(--bone)",
                  textDecoration: "none",
                  transition: "background-color 0.18s ease, color 0.18s ease",
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
                  border: "2px solid var(--charcoal)",
                  backgroundColor: "var(--charcoal)",
                  color: "var(--bone)",
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
                  border: "2px solid var(--charcoal)",
                  backgroundColor: "var(--charcoal)",
                  color: "var(--bone)",
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
          color: var(--charcoal) !important;
        }
        .final-cta-pill-outline:hover {
          background-color: transparent !important;
          color: var(--charcoal) !important;
        }
      `}</style>
    </section>
  )
}
