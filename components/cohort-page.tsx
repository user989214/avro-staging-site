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
  const sceneLabels = {
    golf: "First tee routine",
    social: "Alcohol-free ritual",
    work: "Deep work routine",
    gaming: "Pre-session ritual",
  }

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

  // Cohort-specific tube image folder prefix mapping
  const tubeCohort: Record<string, string> = {
    golf: "tube-golf",
    social: "tube-social",
    work: "tube-tech",
    gaming: "tube-gaming",
  }

  const tubeImageFor = (key: FormulaKey) => {
    const prefix = tubeCohort[data.visual] ?? "tube-tech"
    const flavor = formulas[key].flavors[0]
    const slug = flavor.name.toLowerCase().replace(/\s+/g, "-")
    return {
      src: `/images/lifestyle/${prefix}-${key}-${slug}.png`,
      alt: `AVRO ${formulas[key].short} ${flavor.name} in ${data.visual} setting`,
    }
  }

  const chooseCopy: Record<FormulaKey, string> = {
    calm:
      data.visual === "social"
        ? "Evening, dinner, wind down, social calm."
        : data.visual === "work"
          ? "High-pressure meetings, travel days, evening work, and calm without caffeine."
          : data.visual === "gaming"
            ? "Late sessions, decompression, poker nights, social gaming, and calm without caffeine."
            : "First tee nerves, evening rounds, travel days, clubhouse social settings, and calm without caffeine.",
    focus:
      data.visual === "social"
        ? "Events, conversations, creative work, and social work settings."
        : data.visual === "work"
          ? "Deep work, coding sessions, writing, strategy work, and presentations without caffeine."
          : data.visual === "gaming"
            ? "Ranked play, online poker, long attention blocks, and competitive sessions without caffeine."
            : "Practice sessions, competitive rounds, tournament prep, and focus support without caffeine.",
    energy:
      data.visual === "social"
        ? "Daytime events, long gatherings, travel, and social days."
        : data.visual === "work"
          ? "Early mornings, long workdays, travel, conferences, and steady energy."
          : data.visual === "gaming"
            ? "Early sessions, long tournaments, travel days, and steady energy with calm built in."
            : "Early tee times, long rounds, travel days, and steady energy with calm built in.",
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
                color: "var(--warm-gray)",
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

      {/* Choose Formula — charcoal section, AVRO-blue cards */}
      <section style={{ width: "100%", padding: "clamp(64px,8vw,112px) clamp(20px,5vw,64px)", backgroundColor: "var(--charcoal)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <span
            style={{
              display: "block",
              fontFamily: GC,
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--avro-blue)",
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            Choose formula
          </span>
          <h2
            className="font-serif"
            style={{
              fontWeight: 900,
              fontSize: "clamp(32px,4.5vw,52px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: "var(--bone)",
              textAlign: "center",
              marginBottom: 56,
            }}
          >
            {data.chooseTitle}
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {(Object.keys(formulas) as FormulaKey[]).map((key) => {
              const item = formulas[key]
              const tube = tubeImageFor(key)
              return (
                <article
                  key={key}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                    padding: 32,
                    minHeight: 560,
                    backgroundColor: "rgba(74,144,226,0.08)",
                    borderRadius: 24,
                    border: "1px solid rgba(74,144,226,0.22)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: GC,
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--avro-blue)",
                    }}
                  >
                    Formula
                  </span>
                  <h3
                    className="font-serif"
                    style={{
                      fontWeight: 900,
                      fontSize: 28,
                      lineHeight: 1.05,
                      letterSpacing: "-0.015em",
                      color: "var(--bone)",
                      marginTop: -8,
                    }}
                  >
                    {item.name}
                  </h3>
                  <div
                    style={{
                      position: "relative",
                      minHeight: 280,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(74,144,226,0.06)",
                      border: "1px solid rgba(74,144,226,0.14)",
                      borderRadius: 18,
                      overflow: "hidden",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tube.src}
                      alt={tube.alt}
                      style={{ height: 240, width: "auto", objectFit: "contain" }}
                    />
                  </div>
                  <p
                    style={{
                      fontFamily: GC,
                      fontWeight: 400,
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "rgba(245,241,234,0.78)",
                      flex: 1,
                    }}
                  >
                    {chooseCopy[key]}
                  </p>
                  <style>{`
                    .cohort-choose-btn-${key} {
                      transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
                    }
                    .cohort-choose-btn-${key}:hover {
                      background-color: var(--bone) !important;
                      color: var(--charcoal) !important;
                      border-color: var(--bone) !important;
                    }
                  `}</style>
                  <Link
                    href={`/${key}`}
                    className={`cohort-choose-btn-${key}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: GC,
                      fontWeight: 700,
                      fontSize: 15,
                      minHeight: 52,
                      borderRadius: 999,
                      textDecoration: "none",
                      border: "2px solid var(--avro-blue)",
                      backgroundColor: "var(--avro-blue)",
                      color: "var(--charcoal)",
                    }}
                  >
                    Choose {item.short}
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>

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
      <FinalCta title={data.finalTitle} copy={data.finalCopy} productButtons />
    </>
  )
}
