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
import { EmbeddedGraphic } from "@/components/embedded-graphic"
import { GolfHeroRotator } from "@/components/golf-hero-rotator"
import { FooterBanner } from "@/components/footer-banner"
import { ChartSource } from "@/components/compliance"

// "CALM = POWER." footer banner per cohort (color-matched product shot).
const cohortFooterBanner: Record<string, { src: string; alt: string }> = {
  work: { src: "/images/banners/work-banner.png", alt: "AVRO Focus Red Dragon Fruit — Calm equals power." },
  golf: { src: "/images/banners/golf-banner.png", alt: "AVRO Focus Pomegranate Raspberry — Calm is the advantage." },
  social: { src: "/images/banners/social-banner.png", alt: "AVRO Calm Blueberry Acai — Calm equals power." },
  gaming: { src: "/images/banners/gaming-banner.png", alt: "AVRO Calm Blackberry Jasmine — Calm is the advantage." },
}

// Golf hero cycles through three studio product shots (cream studio background)
const GOLF_HERO_IMAGES = [
  "/images/lifestyle/golf-hero-01.png",
  "/images/lifestyle/golf-hero-02.png",
  "/images/lifestyle/golf-hero-03.png",
]
// Mobile (9:16) crops for the golf hero rotator
const GOLF_HERO_IMAGES_MOBILE = [
  "/images/lifestyle/golf-hero-01-mobile.png",
  "/images/lifestyle/golf-hero-02-mobile.png",
  "/images/lifestyle/golf-hero-03-mobile.png",
]

const GC = '"DM Sans", system-ui, sans-serif'

// Cohorts whose chart slot renders a brand data graphic verbatim (public/graphics/*.html).
type CohortGraphic = { src: string; ratio: string; title: string }
const COHORT_GRAPHICS: Record<string, CohortGraphic> = {
  golf: { src: "/graphics/golf.html", ratio: "1200 / 560", title: "AVRO for golf — pressure-sensitive performance research" },
  gaming: { src: "/graphics/esports.html", ratio: "1200 / 740", title: "AVRO for esports — GABA vs. placebo scores" },
  work: { src: "/graphics/work.html", ratio: "1400 / 620", title: "AVRO for work — cognitive functions" },
}

// Marketing header copy that sits above the embedded chart graphic for select cohorts.
const COHORT_GRAPHIC_HEADERS: Record<string, { title: string; copy: string }> = {
  work: {
    title: "Built for mentally demanding moments.",
    copy: "When work requires attention, meetings require presence, or projects require focus, AVRO supports calm, clarity, and readiness.",
  },
  gaming: {
    title: "State affects every session.",
    copy: "AVRO is designed for moments where attention, composure and focus matter most.",
  },
}

// Themed section wrapper that frames an embedded brand graphic on the bone background.
function CohortGraphicSection({
  graphic,
  header,
}: {
  graphic: CohortGraphic
  header?: { title: string; copy: string }
}) {
  return (
    <section style={{ backgroundColor: "var(--base)", width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        {header && (
          <div style={{ maxWidth: 760, marginBottom: "clamp(24px,3vw,40px)" }}>
            <h2
              className="font-serif"
              style={{
                fontWeight: 900,
                fontSize: "clamp(32px,4.5vw,52px)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                marginBottom: 14,
              }}
            >
              {header.title}
            </h2>
            <p
              style={{
                fontFamily: GC,
                fontWeight: 400,
                fontSize: "clamp(16px,1.4vw,20px)",
                lineHeight: 1.55,
                color: "var(--warm-gray)",
              }}
            >
              {header.copy}
            </p>
          </div>
        )}
        <EmbeddedGraphic src={graphic.src} ratio={graphic.ratio} title={graphic.title} />
        <ChartSource>
          Source: Lorem ipsum dolor sit amet (2024). Illustrative data shown for demonstration
          purposes only; individual results may vary.
        </ChartSource>
      </div>
    </section>
  )
}

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
  const isGolf = data.visual === "golf"
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
        muted: "var(--ink)",
        heroBg: "var(--base-light)",
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
      src: "/images/lifestyle/cohort-golf-hero.png",
      alt: "Golfer selecting club from bag with friends chatting in background",
    },
    social: {
      src: "/images/lifestyle/cohort-social-hero.jpg",
      alt: "Bartender pouring an alcohol-free mixer into a jigger beside an AVRO Focus tube and crystal glasses of garnishes",
    },
    work: {
      src: "/images/lifestyle/cohort-work-hero.png",
      alt: "Professional typing on laptop in conference room meeting",
    },
    gaming: {
      src: "/images/lifestyle/cohort-gaming-hero.png",
      alt: "Gamer at desk with mouse keyboard and monitor with blue ambient lighting",
    },
  }

  // Mobile (9:16) versions of the hero — shown only on small screens
  const cohortHeroMobile: Record<string, string> = {
    golf:   "/images/lifestyle/golf-hero-01-mobile.png",
    social: "/images/lifestyle/cohort-social-hero-mobile.png",
    work:   "/images/lifestyle/cohort-work-hero-mobile.png",
    gaming: "/images/lifestyle/cohort-gaming-hero-mobile.png",
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
            100% { opacity: 1; transform: translateY(0); color: var(--hero-word-end, ${wordEnd}); }
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
          /* ── Desktop: rounded 16:9 card with content overlaid ── */
          .cohort-hero-16x9 {
            position: relative;
            width: calc(100% - 32px);
            margin: 0 auto 16px;
            aspect-ratio: 16/9;
            overflow: hidden;
            border-radius: 20px;
          }
          .cohort-hero-image-mobile { display: none; }
          .cohort-hero-content {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: clamp(24px,5vw,80px) clamp(20px,5vw,64px);
            text-align: left;
            align-items: flex-start;
          }
          /* ── Mobile: stacked — rounded image on top, text below ── */
          @media (max-width: 768px) {
            .cohort-hero-16x9 {
              aspect-ratio: unset !important;
              overflow: visible !important;
              display: flex;
              flex-direction: column;
            }
            .cohort-hero-img-wrap {
              position: relative;
              width: calc(100% - 32px);
              margin: 16px auto 0;
              aspect-ratio: 3/4;
              border-radius: 20px;
              overflow: hidden;
              flex-shrink: 0;
            }
            .cohort-hero-image { display: none !important; }
            .cohort-hero-image-mobile { display: block !important; }
            .cohort-hero-content {
              position: static !important;
              padding: 24px 20px 32px !important;
            }
          }
          @media (min-width: 769px) {
            .cohort-hero-img-wrap {
              position: absolute;
              inset: 0;
              border-radius: 0;
            }
            /* On desktop the ZP hero image is light (white-brick bar scene),
               so override gold content colors to black/dark for legibility. */
            .cohort-hero-content.cohort-hero-zp {
              --hero-word-end: var(--ink);
            }
            .cohort-hero-content.cohort-hero-zp p {
              color: var(--ink) !important;
            }
            .cohort-hero-content.cohort-hero-zp .btn-primary-dark {
              color: var(--bone) !important;
              background-color: var(--ink) !important;
              border-color: var(--ink) !important;
            }
            .cohort-hero-content.cohort-hero-zp .btn-outline-dark {
              color: var(--ink) !important;
              border-color: var(--ink) !important;
            }
          }
        `}</style>

        {/* Outer wrapper — 16:9 on desktop, column-stacked on mobile */}
        <div className="cohort-hero-16x9" style={{ backgroundColor: t.heroBg }}>

          {/* Image container — full-bleed on desktop, rounded-rect card on mobile */}
          <div className="cohort-hero-img-wrap">
            {isGolf ? (
              <GolfHeroRotator
                images={GOLF_HERO_IMAGES}
                mobileImages={GOLF_HERO_IMAGES_MOBILE}
                className="cohort-hero-image"
                objectPosition="center"
                alt={cohortHero[data.visual]?.alt ?? ""}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cohortHero[data.visual]?.src}
                alt={cohortHero[data.visual]?.alt ?? ""}
                className="cohort-hero-image"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
              />
            )}
            {isGolf ? (
              <GolfHeroRotator
                images={GOLF_HERO_IMAGES}
                mobileImages={GOLF_HERO_IMAGES_MOBILE}
                className="cohort-hero-image-mobile"
                objectPosition="center"
                alt={cohortHero[data.visual]?.alt ?? ""}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cohortHeroMobile[data.visual]}
                alt={cohortHero[data.visual]?.alt ?? ""}
                className="cohort-hero-image-mobile"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
              />
            )}
          </div>

          {/* Content — overlaid on desktop, below image on mobile */}
          <div
            className={`cohort-hero-content${isZeroProof ? " cohort-hero-zp" : ""}`}
            style={{ ["--hero-word-end" as string]: wordEnd }}
          >
            {/* Eyebrow chip removed per design — title carries the moment via the per-cohort word animation. */}
            <h1
              className="font-serif"
              style={{
                fontWeight: 900,
                fontSize: "clamp(36px,5.5vw,72px)",
                lineHeight: 0.98,
                letterSpacing: "-0.025em",
                color: `var(--hero-word-end, ${wordEnd})`,
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
          </div>{/* /cohort-hero-content */}
        </div>{/* /cohort-hero-16x9 */}
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
            // Icons match the cohort theme and the specific reason titles
            const reasonIcons: Record<string, readonly [AvroIconName, AvroIconName, AvroIconName]> = {
              golf: ["control-under-pressure", "supports-clear-thinking", "cohort-golf"],
              social: ["zp-zero-percent-alcohol", "zp-social-lift", "zp-function-forward"],
              work: ["calm-first-foundation", "supports-clear-thinking", "cohort-tech"],
              gaming: ["control-under-pressure", "supports-clear-thinking", "supports-steady-attention"],
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
                  <AvroIcon name={step.icon} golden={isZeroProof} size={72} className="md:w-[96px] md:h-[96px]" />
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

      {/* Per-cohort graphic — shown on every cohort EXCEPT social/Zero Proof, which
          intentionally skips the chart slot. Golf, Gaming and Work render the brand
          data graphics verbatim; remaining cohorts use the animated CohortChart. */}
      {!isZeroProof && COHORT_GRAPHICS[data.visual] ? (
        <CohortGraphicSection graphic={COHORT_GRAPHICS[data.visual]} header={COHORT_GRAPHIC_HEADERS[data.visual]} />
      ) : (
        !isZeroProof && <CohortChart visualKey={data.visual} accent={accent} dark={isZeroProof} />
      )}

      {/* Use Moments — eyebrow removed; title carries the section. */}
      <Section dark={isZeroProof}>
        <SectionHeading title={data.useTitle} dark={isZeroProof} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.useMoments.map(([title, copy], index) => {
            // Page-specific icons for use moments
            // Icons should match the specific moment being described
            const useMomentIcons: Record<string, readonly [AvroIconName, AvroIconName, AvroIconName, AvroIconName]> = {
              golf: ["cohort-golf", "control-under-pressure", "supports-focus-without-overload", "social-composure"],
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
            : "var(--base-deep)",
        }}
      >
        <FaqBlock title={data.faqTitle} faqs={data.faqs} dark={isZeroProof} />
      </div>
      {cohortFooterBanner[data.visual] && (
        <FooterBanner
          src={cohortFooterBanner[data.visual].src}
          alt={cohortFooterBanner[data.visual].alt}
        />
      )}

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
