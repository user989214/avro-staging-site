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
import { Icon, type IconName } from "@/components/icons"

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

  // Theme surfaces — light cohorts use the bone/cream system; Zero Proof uses deep-black + gold only (no bone).
  const t = isZeroProof
    ? {
        pageBg: "var(--deep-black)",
        surface: "var(--deep-black)",
        cardBg: "var(--dark-surface)",
        ink: "var(--gold)",
        muted: "rgba(202,168,75,0.7)",
        heroBg: "var(--deep-black)",
        heroFade:
          "linear-gradient(to right, var(--deep-black) 0%, var(--deep-black) 38%, rgba(13,13,13,0.95) 48%, rgba(13,13,13,0.7) 58%, rgba(13,13,13,0.3) 70%, rgba(13,13,13,0.1) 82%, rgba(13,13,13,0.15) 94%, var(--deep-black) 100%), linear-gradient(to bottom, var(--deep-black) 0%, rgba(13,13,13,0.2) 10%, rgba(13,13,13,0) 20%, rgba(13,13,13,0) 80%, rgba(13,13,13,0.2) 90%, var(--deep-black) 100%)",
        stepNumBg: "var(--gold)",
        stepNumFg: "var(--deep-black)",
        stepIconColor: "var(--gold)",
      }
    : {
        pageBg: "var(--base)",
        surface: "var(--base)",
        cardBg: "var(--base-light)",
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
      src: "/images/lifestyle/kitchen-trio-pink-cocktails.jpg",
      alt: "Three pink alcohol-free AVRO cocktails styled in a kitchen",
    },
    work: {
      src: "/images/lifestyle/focus-desk-magenta-drink.jpg",
      alt: "Focus magenta drink at a sunlit work desk with notebook",
    },
    gaming: {
      src: "/images/lifestyle/focus-iced-drink-headphones.jpg",
      alt: "Iced AVRO drink and headphones on a gaming desk",
    },
  }

  // Per-cohort animation accent — each word briefly flashes the cohort accent before settling into the page ink.
  const wordAccent = accent
  const wordRest = t.ink

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
            0%   { opacity: 0; transform: translateY(28px); color: ${wordAccent}; }
            55%  { opacity: 1; transform: translateY(-4px); color: ${wordAccent}; }
            80%  { opacity: 1; transform: translateY(0); color: ${wordAccent}; }
            100% { opacity: 1; transform: translateY(0); color: ${wordRest}; }
          }
          @keyframes cohort-fade-up {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .cohort-word {
            display: inline-block;
            opacity: 0;
            transform: translateY(28px);
            color: ${wordAccent};
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
              color: ${wordRest} !important;
            }
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
            minHeight: data.visual === "work" ? "clamp(380px,50vh,480px)" : "clamp(480px,60vh,640px)",
          }}
        >
          {/* Background image — only for non-work cohorts */}
          {data.visual !== "work" && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cohortHero[data.visual]?.src}
                alt={cohortHero[data.visual]?.alt ?? ""}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "70% center",
                }}
              />

              {/* Gradient fade */}
              <div
                aria-hidden="true"
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
              padding: "clamp(72px,9vw,128px) clamp(20px,5vw,64px)",
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
                fontSize: "clamp(42px,6vw,72px)",
                lineHeight: 0.98,
                letterSpacing: "-0.025em",
                color: wordRest,
                marginBottom: 20,
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
              <CtaGroup primary={data.primary} secondary={data.secondary} dark={isZeroProof} />
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
          {data.reasons.map(([title, copy], index) => (
            <InfoCard
              key={title}
              icon={(["leaf", "brain", "clock"] as const)[index]}
              title={title}
              dark={isZeroProof}
            >
              {copy}
            </InfoCard>
          ))}
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
              { num: 1, icon: "cup" as IconName, title: "Mix", copy: "Mix one stick with water." },
              { num: 2, icon: "clock" as IconName, title: "Time it", copy: `Drink about 30 minutes before your ${data.stepMoment}.` },
              { num: 3, icon: "leaf" as IconName, title: "Show up", copy: "Step in with a calmer, clearer routine." },
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
                <Icon name={step.icon} className="w-10 h-10 mb-3" style={{ color: t.stepIconColor }} />
                <h3
                  style={{
                    fontFamily: GC,
                    fontWeight: 700,
                    fontSize: 18,
                    color: t.ink,
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
                    color: t.muted,
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

      {/* Use Moments — eyebrow removed; title carries the section. */}
      <Section dark={isZeroProof}>
        <SectionHeading title={data.useTitle} dark={isZeroProof} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.useMoments.map(([title, copy], index) => (
            <InfoCard
              key={title}
              icon={(["flag", "star", "target", "users"] as const)[index]}
              title={title}
              dark={isZeroProof}
            >
              {copy}
            </InfoCard>
          ))}
        </div>
      </Section>

      <ProductCards title={data.shopTitle} shopLabel="Shop" dark={isZeroProof} />
      <SocialProof mode="compact" dark={isZeroProof} />
      {/* Tonal continuation — light cohorts deepen toward CTA; ZP keeps the dark surface */}
      <div
        style={{
          background: isZeroProof
            ? "var(--dark-surface)"
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
