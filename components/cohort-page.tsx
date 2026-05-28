import Link from "next/link"
import Image from "next/image"
import { formulas, type FormulaKey } from "@/lib/data"
import {
  Section,
  SectionHeading,
  CtaGroup,
  SocialProof,
  ProductCards,
  FormulaLogic,
  FaqBlock,
  FinalCta,
  InfoCard,
} from "@/components/sections"
import { AvroIcon, type AvroIconName } from "@/components/avro-icons"
import { CohortChart } from "@/components/cohort-chart"

const GC = '"DM Sans", system-ui, sans-serif'

interface CohortData {
  eyebrow: string
  title: string
  copy: string
  visual: string
  primary: string
  secondary: string
  momentTitle: string
  momentCopy: string
  whyTitle: string
  reasons: [string, string][]
  chooseTitle: string
  howTitle: string
  stepMoment: string
  useTitle: string
  useMoments: [string, string][]
  shopTitle: string
  faqTitle: string
  faqs: [string, string][]
  finalTitle: string
  finalCopy: string
}

export function CohortPage({ data }: { data: CohortData }) {
  // Per AVRO Design System v2 — the accent color is the only thing that swaps per cohort:
  //   Main (Work, Gaming) → Avro Blue   #94C6D4 — light theme
  //   Golf                → Fuji Apple  #BDD637 — light theme
  //   Social (Zero Proof) → Avro Gold   #CAA84B — DARK theme
  const isZeroProof = data.visual === "social"
  const accent =
    data.visual === "golf"
      ? "var(--golf)"
      : isZeroProof
        ? "var(--gold)"
        : "var(--avro-blue)"

  // Theme surfaces — light cohorts use the bone/cream system; Zero Proof uses solid
  // deep-black sections with dark cards and gold accents/icons.
  const t = isZeroProof
    ? {
        pageBg: "var(--deep-black)",
        surface: "var(--zp-surface)", // #1A1A17
        // Dark card with bone text and gold icons. Per design system v2.
        cardBg: "#111110",
        cardInk: "var(--bone)",
        cardMuted: "rgba(245,240,232,0.6)",
        // Section headings sit on the deep-black background and stay gold.
        ink: "var(--gold)",
        muted: "rgba(202,168,75,0.7)",
        heroBg: "var(--deep-black)",
        // Solid hero overlay — no gradient. A subtle near-black wash sits on top of the
        // photo so the title is legible against any image.
        heroFade: "rgba(13,13,13,0.62)",
        // Step number chip on the dark card → gold chip with dark numeral.
        stepNumBg: "var(--gold)",
        stepNumFg: "var(--deep-black)",
        stepIconColor: "var(--gold)",
      }
    : {
        pageBg: "var(--base)",
        surface: "var(--base)",
        cardBg: "var(--base-light)",
        // Light-theme cards use the same ink/muted as the page — no special inversion needed.
        cardInk: "var(--ink)",
        cardMuted: "var(--warm-gray)",
        ink: "var(--ink)",
        muted: "var(--warm-gray)",
        heroBg: "var(--base-light)",
        heroFade:
          "linear-gradient(to right, var(--base-light) 0%, var(--base-light) 38%, rgba(245,241,234,0.95) 48%, rgba(245,241,234,0.7) 58%, rgba(245,241,234,0.3) 70%, rgba(245,241,234,0.1) 82%, rgba(245,241,234,0.15) 94%, var(--base-light) 100%), linear-gradient(to bottom, var(--base-light) 0%, rgba(245,241,234,0.2) 10%, rgba(245,241,234,0) 20%, rgba(245,241,234,0) 80%, rgba(245,241,234,0.2) 90%, var(--base-light) 100%)",
        stepNumBg: "var(--charcoal)",
        stepNumFg: "var(--bone)",
        stepIconColor: "var(--avro-blue)",
      }

  // Golf gets a colored CTA closer (charcoal text on green); ZP gets a gold card on dark bg.
  const finalCtaBg =
    data.visual === "golf"
      ? accent
      : isZeroProof
        ? "var(--gold)"
        : undefined

  // Cohort-specific lifestyle hero photo
  const cohortHero: Record<string, { src: string; alt: string }> = {
    golf: {
      src: "/images/lifestyle/golf-cart-gloves-tee.jpg",
      alt: "Golf cart with gloves and tee laid out at first tee",
    },
    social: {
      src: "/images/lifestyle/coupes-grapefruit-stickpack.jpg",
      alt: "Elegant cocktail coupes with grapefruit garnish",
    },
    work: {
      src: "/images/lifestyle/tube-tech-focus-pomegranate-raspberry.png",
      alt: "AVRO Focus tube at a modern office desk",
    },
    gaming: {
      src: "/images/lifestyle/focus-iced-drink-headphones.jpg",
      alt: "Iced AVRO drink and headphones on a gaming desk",
    },
  }

  // Per-cohort animation accent — words begin at a dimmed shade of the accent and rise into the full bright accent (Zero Proof) or the page ink (light cohorts), so the brand color feels intentional, not just transitional.
  const dimAccent =
    data.visual === "golf"
      ? "rgba(189,214,55,0.55)"
      : isZeroProof
        ? "var(--gold-dim)"
        : "rgba(140,194,231,0.6)" // dim avro-blue
  const wordStart = dimAccent
  const wordEnd = isZeroProof ? "var(--gold)" : t.ink

  return (
    <div style={{ backgroundColor: t.pageBg, color: t.ink }}>
      {/* Hero — full-width, square corners (matches site-wide page hero language) */}
      <section
        style={{
          width: "100%",
          backgroundColor: t.heroBg,
          padding: 0,
        }}
      >
        <style>{`
          @keyframes cohort-rise-color {
            0%   { opacity: 0; transform: translateY(28px); color: ${wordStart}; }
            55%  { opacity: 1; transform: translateY(-4px); color: ${wordStart}; }
            80%  { opacity: 1; transform: translateY(0); color: ${wordStart}; }
            100% { opacity: 1; transform: translateY(0); color: ${wordEnd}; }
          }
          @keyframes cohort-fade-up {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .cohort-word {
            display: inline-block;
            opacity: 0;
            transform: translateY(28px);
            color: ${wordStart};
            animation: cohort-rise-color 1.05s cubic-bezier(0.34, 1.4, 0.4, 1) forwards;
            will-change: transform, opacity, color;
          }
          .cohort-fade { opacity: 0; animation: cohort-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
          .cohort-lede { animation-delay: 0.9s; }
          .cohort-cta { animation-delay: 1.15s; }
          @media (prefers-reduced-motion: reduce) {
            .cohort-word, .cohort-fade {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
              color: ${wordEnd} !important;
            }
          }
          @media (max-width: 768px) {
            .cohort-hero-image { display: none !important; }
          }
        `}</style>

        <div
          style={{
            position: "relative",
            width: "100%",
            margin: 0,
            borderRadius: 0,
            overflow: "hidden",
            backgroundColor: t.heroBg,
            minHeight: "clamp(360px,50vh,560px)",
          }}
        >
          {/* Background image — hidden on mobile */}
          {(
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cohortHero[data.visual]?.src}
                alt={cohortHero[data.visual]?.alt ?? ""}
                className="cohort-hero-image"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: data.visual === "gaming" ? "60% center" : data.visual === "work" ? "center center" : "70% center",
                }}
              />

              {/* Gradient fade */}
              <div
                aria-hidden="true"
                className="cohort-hero-image"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: t.heroFade,
                  pointerEvents: "none",
                }}
              />

              {/* Scene label removed for cleaner full-width hero */}
            </>
          )}

          <div
            style={{
              position: "relative",
              maxWidth: 1440,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "clamp(48px,7vw,128px) clamp(20px,5vw,64px)",
              minHeight: "inherit",
              textAlign: "left",
              alignItems: "flex-start",
            }}
          >
            {/* Eyebrow chip removed per design — title carries the moment via the per-cohort word animation. */}
            <h1
              className="font-serif"
              style={{
                fontWeight: 900,
                fontSize: "clamp(36px,5.5vw,72px)",
                lineHeight: 0.98,
                letterSpacing: "-0.025em",
                color: wordEnd,
                marginBottom: 16,
                maxWidth: 560,
              }}
            >
              {(() => {
                const words = data.title.split(" ")
                return words.map((word, i) => {
                  const delay = 0.1 + i * 0.11
                  return (
                    <span
                      key={i}
                      className="cohort-word"
                      style={{ animationDelay: `${delay.toFixed(2)}s` }}
                    >
                      {word}
                      {i < words.length - 1 ? "\u00A0" : ""}
                    </span>
                  )
                })
              })()}
            </h1>
            <p
              className="cohort-fade cohort-lede"
              style={{
                fontFamily: GC,
                fontWeight: 400,
                fontSize: "clamp(17px,2vw,20px)",
                lineHeight: 1.55,
                color: t.muted,
                maxWidth: 480,
                marginBottom: 28,
              }}
            >
              {data.copy}
            </p>
            <div className="cohort-fade cohort-cta">
              <CtaGroup primary={data.primary} secondary={data.secondary} dark={isZeroProof} hero />
            </div>
          </div>
        </div>
      </section>

      <Section dark={isZeroProof}>
        <SectionHeading
          title={data.momentTitle}
          description={data.momentCopy}
          dark={isZeroProof}
        />
      </Section>

      <Section dark={isZeroProof}>
        <SectionHeading title={data.whyTitle} dark={isZeroProof} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.reasons.map(([title, copy], index) => {
            // Page-specific icons for "Why AVRO fits" reasons
            const reasonIcons: Record<string, readonly [AvroIconName, AvroIconName, AvroIconName]> = {
              golf: ["cohort-golf", "supports-clear-thinking", "control-under-pressure"],
              social: ["zp-zero-percent-alcohol", "zp-social-lift", "zp-function-forward"],
              work: ["cohort-tech", "supports-focus-without-overload", "supports-steady-attention"],
              gaming: ["cohort-games", "supports-clear-thinking", "control-under-pressure"],
            }
            const icons = reasonIcons[data.visual] || reasonIcons.golf
            return (
              <InfoCard
                key={title}
                icon={icons[index]}
                title={title}
                dark={isZeroProof}
              >
                {copy}
              </InfoCard>
            )
          })}
        </div>
      </Section>

      {/* How to Use Steps — eyebrow removed; title carries the section. */}
      <section style={{ width: "100%", padding: "clamp(48px,6vw,80px) clamp(20px,5vw,64px)", backgroundColor: t.surface }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <h2
            className="font-serif"
            style={{
              fontWeight: 900,
              fontSize: "clamp(32px,4.5vw,52px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: t.ink,
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            {data.howTitle}
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {[
              { num: 1, icon: "step-pour" as AvroIconName, title: "Mix", copy: "Mix one stick with water." },
              { num: 2, icon: "step-stir" as AvroIconName, title: "Time it", copy: `Drink about 30 minutes before your ${data.stepMoment}.` },
              { num: 3, icon: "step-drink" as AvroIconName, title: "Show up", copy: "Step in with a calmer, clearer routine." },
            ].map((step) => (
              <article
                key={step.num}
                style={{
                  position: "relative",
                  padding: 28,
                  backgroundColor: t.cardBg,
                  borderRadius: 20,
                }}
              >
                <span
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: 30,
                    height: 30,
                    marginBottom: 18,
                    borderRadius: 9999,
                    fontFamily: GC,
                    fontWeight: 700,
                    fontSize: 14,
                    backgroundColor: t.stepNumBg,
                    color: t.stepNumFg,
                  }}
                >
                  {step.num}
                </span>
                <div className="mb-3">
                  <AvroIcon name={step.icon} golden={isZeroProof} size={56} className="md:w-[72px] md:h-[72px]" />
                </div>
                <h3
                  style={{
                    fontFamily: GC,
                    fontWeight: 700,
                    fontSize: 18,
                    color: t.cardInk,
                    marginBottom: 8,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: GC,
                    fontWeight: 400,
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: t.cardMuted,
                  }}
                >
                  {step.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FormulaLogic dark={isZeroProof} />

      {/* Per-cohort animated chart — shown on every cohort EXCEPT social/Zero Proof,
          which intentionally skips the chart slot. */}
      {!isZeroProof && (
        <CohortChart visualKey={data.visual} accent={accent} dark={isZeroProof} />
      )}

      {/* Use Moments — eyebrow removed; title carries the section. */}
      <Section dark={isZeroProof}>
        <SectionHeading title={data.useTitle} dark={isZeroProof} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.useMoments.map(([title, copy], index) => {
            // Page-specific icons for use moments
            const useMomentIcons: Record<string, readonly [AvroIconName, AvroIconName, AvroIconName, AvroIconName]> = {
              golf: ["cohort-golf", "control-under-pressure", "supports-steady-attention", "social-composure"],
              social: ["zp-calm-first-cocktails", "zp-zero-percent-alcohol", "zp-social-lift", "relaxation-reduced-tension"],
              work: ["supports-focus-without-overload", "control-under-pressure", "cohort-tech", "supports-steady-attention"],
              gaming: ["cohort-games", "control-under-pressure", "supports-steady-attention", "supports-clear-thinking"],
            }
            const icons = useMomentIcons[data.visual] || useMomentIcons.golf
            return (
              <InfoCard
                key={title}
                icon={icons[index]}
                title={title}
                dark={isZeroProof}
              >
                {copy}
              </InfoCard>
            )
          })}
        </div>
      </Section>

      <ProductCards title={data.shopTitle} shopLabel="Shop" dark={isZeroProof} />
      <SocialProof mode="compact" dark={isZeroProof} />
      {/* Tonal continuation — light cohorts deepen toward CTA; ZP keeps a single solid
          deep-black surface (no dark-surface tint, no gradient) so the gold FAQ cards
          read crisply against the page. */}
      <div
        style={{
          background: isZeroProof
            ? "var(--deep-black)"
            : "linear-gradient(to bottom, #EAE6DC 0%, #DEDAD0 100%)",
        }}
      >
        <FaqBlock title={data.faqTitle} faqs={data.faqs} dark={isZeroProof} />
      </div>
      <FinalCta
        title={data.finalTitle}
        copy={data.finalCopy}
        productButtons
        bg={finalCtaBg}
        dark={isZeroProof}
      />
    </div>
  )
}
