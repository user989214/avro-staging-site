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
  // Per-cohort accent color (per AVRO Design System v2)
  // Golf uses the Fuji-Apple green (#BDD637); Social uses the main-site blue (#94C6D4).
  // Work + Gaming have no dedicated accent and quietly inherit the main-site blue,
  // which keeps them visually aligned with the rest of avrolife.com.
  const cohortAccent: Record<string, string> = {
    golf: "var(--golf)",
    social: "var(--avro-blue)",
    work: "var(--avro-blue)",
    gaming: "var(--avro-blue)",
  }
  const accent = cohortAccent[data.visual] ?? "var(--avro-blue)"
  // Golf is the only cohort whose accent is light/saturated enough to read as a
  // background block with charcoal text — match the design system's CTA closer.
  const useColoredFinalCta = data.visual === "golf"

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

  return (
    <>
      {/* Hero — full-width, square corners (matches site-wide page hero language) */}
      <section
        style={{
          width: "100%",
          backgroundColor: "var(--base-light)",
          padding: 0,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            margin: 0,
            borderRadius: 0,
            overflow: "hidden",
            backgroundColor: "var(--base-light)",
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
                  background: `
                    linear-gradient(to right, var(--base-light) 0%, var(--base-light) 38%, rgba(245,241,234,0.95) 48%, rgba(245,241,234,0.7) 58%, rgba(245,241,234,0.3) 70%, rgba(245,241,234,0.1) 82%, rgba(245,241,234,0.15) 94%, var(--base-light) 100%),
                    linear-gradient(to bottom, var(--base-light) 0%, rgba(245,241,234,0.2) 10%, rgba(245,241,234,0) 20%, rgba(245,241,234,0) 80%, rgba(245,241,234,0.2) 90%, var(--base-light) 100%)
                  `,
                  pointerEvents: "none",
                }}
              />

              {/* Scene label removed for cleaner full-width hero */}
            </>
          )}

          {/* Content */}
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
              textAlign: data.visual === "work" ? "center" : "left",
              alignItems: data.visual === "work" ? "center" : "flex-start",
            }}
          >
            <span
              style={{
                display: "block",
                marginBottom: 12,
                fontFamily: GC,
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: accent,
              }}
            >
              {data.eyebrow}
            </span>
            <h1
              className="font-serif"
              style={{
                fontWeight: 900,
                fontSize: "clamp(42px,6vw,72px)",
                lineHeight: 0.98,
                letterSpacing: "-0.025em",
                color: "var(--ink)",
                marginBottom: 20,
                maxWidth: data.visual === "work" ? 820 : 560,
              }}
            >
              {data.title}
            </h1>
            <p
              style={{
                fontFamily: GC,
                fontWeight: 400,
                fontSize: "clamp(17px,2vw,20px)",
                lineHeight: 1.55,
                color: "var(--warm-gray)",
                maxWidth: data.visual === "work" ? 580 : 480,
                marginBottom: 28,
              }}
            >
              {data.copy}
            </p>
            <CtaGroup primary={data.primary} secondary={data.secondary} />
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="The moment"
          title={data.momentTitle}
          description={data.momentCopy}
        />
      </Section>

      <Section>
        <SectionHeading title={data.whyTitle} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.reasons.map(([title, copy], index) => (
            <InfoCard
              key={title}
              icon={(["leaf", "brain", "clock"] as const)[index]}
              title={title}
            >
              {copy}
            </InfoCard>
          ))}
        </div>
      </Section>

      {/* How to Use Steps */}
      <section style={{ width: "100%", padding: "clamp(48px,6vw,80px) clamp(20px,5vw,64px)", backgroundColor: "var(--base)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <span
            style={{
              display: "block",
              fontFamily: GC,
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--warm-gray)",
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            How to use
          </span>
          <h2
            className="font-serif"
            style={{
              fontWeight: 900,
              fontSize: "clamp(32px,4.5vw,52px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
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
                  backgroundColor: "var(--base-light)",
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
                    backgroundColor: "var(--charcoal)",
                    color: "var(--bone)",
                  }}
                >
                  {step.num}
                </span>
                <Icon name={step.icon} className="w-10 h-10 mb-3" style={{ color: "var(--avro-blue)" }} />
                <h3
                  style={{
                    fontFamily: GC,
                    fontWeight: 700,
                    fontSize: 18,
                    color: "var(--ink)",
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
                    color: "var(--warm-gray)",
                  }}
                >
                  {step.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FormulaLogic />

      {/* Use Moments */}
      <Section>
        <SectionHeading eyebrow="Use moments" title={data.useTitle} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.useMoments.map(([title, copy], index) => (
            <InfoCard
              key={title}
              icon={(["flag", "star", "target", "users"] as const)[index]}
              title={title}
            >
              {copy}
            </InfoCard>
          ))}
        </div>
      </Section>

      <ProductCards title={data.shopTitle} shopLabel="Shop" />
      <SocialProof mode="compact" />
      <FaqBlock title={data.faqTitle} faqs={data.faqs} />
      <FinalCta
        title={data.finalTitle}
        copy={data.finalCopy}
        productButtons
        bg={useColoredFinalCta ? accent : undefined}
      />
    </>
  )
}
