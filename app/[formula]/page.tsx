import { notFound } from "next/navigation"
import { formulas, type FormulaKey } from "@/lib/data"
import { ProductHero } from "@/components/product-hero"
import { ReviewsBlock } from "@/components/reviews-block"
import { AvroIcon, type AvroIconName } from "@/components/avro-icons"
import { Icon } from "@/components/icons"
import { MockupBlueCta } from "@/components/mockup-sections"
import { ProductComparisonGrid } from "@/components/product-comparison-grid"
import { PdpTabsWithRecommendations } from "@/components/pdp-tabs-with-recommendations"
import { PdpIngredients } from "@/components/pdp-ingredients"
import { SupplementFactsDialog } from "@/components/supplement-facts-dialog"
import { EmbeddedGraphic } from "@/components/embedded-graphic"

const GC = '"DM Sans", system-ui, sans-serif'
const BLUE = "#94C6D4"

const validFormulas = ["calm", "focus", "energy"] as const

// "The feeling of good calm/focus/energy" section benefit cards - 4 icons
const feelingBenefits: Record<FormulaKey, { icon: AvroIconName; title: string }[]> = {
  calm: [
    { icon: "supports-clear-thinking", title: "Improved clarity & composure*" },
    { icon: "social-composure", title: "Calm, balanced mood*" },
    { icon: "supports-focus-without-overload", title: "Sharper decision making*" },
    { icon: "control-under-pressure", title: "Steady, sustained calm*" },
  ],
  focus: [
    { icon: "supports-clear-thinking", title: "Improved cognition & alertness*" },
    { icon: "social-composure", title: "Calm, balanced mood*" },
    { icon: "supports-focus-without-overload", title: "Sharper focus*" },
    { icon: "control-under-pressure", title: "Calm, sustained clarity*" },
  ],
  energy: [
    { icon: "supports-clear-thinking", title: "Improved cognition & alertness*" },
    { icon: "social-composure", title: "Calm, balanced mood*" },
    { icon: "supports-focus-without-overload", title: "Sharper focus*" },
    { icon: "control-under-pressure", title: "Clean, sustained energy*" },
  ],
}

// "CALM = POWER." footer banner per formula (color-matched product shot).
const footerBanner: Partial<Record<FormulaKey, string>> = {
  calm: "/images/banners/calm-power.png",
  energy: "/images/banners/energy-power.png",
  focus: "/images/banners/focus-power.png",
}

export async function generateStaticParams() {
  return validFormulas.map((formula) => ({ formula }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ formula: string }>
}) {
  const { formula } = await params
  if (!validFormulas.includes(formula as FormulaKey)) {
    return { title: "Not Found | AVRO" }
  }
  const item = formulas[formula as FormulaKey]
  return {
    title: `${item.name} | AVRO`,
    description: item.headline,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ formula: string }>
}) {
  const { formula } = await params

  if (!validFormulas.includes(formula as FormulaKey)) {
    notFound()
  }

  const key = formula as FormulaKey
  const item = formulas[key]

  return (
    <>
      {/* PDP Hero - full width on mobile, rounded on desktop */}
      <section
        className="pdp-hero-section"
        style={{
          width: "100%",
          maxWidth: 1440,
          margin: "0 auto",
          padding: "clamp(0px,2.5vw,32px) clamp(0px,5vw,64px) clamp(16px,3vw,40px)",
          backgroundColor: "var(--base)",
        }}
      >
        <style>{`
          @media (max-width: 768px) {
            .pdp-hero-section {
              padding: 0 0 16px 0 !important;
            }
            .pdp-hero-card {
              border-radius: 0 !important;
              padding: 16px !important;
            }
          }
        `}</style>
        <div
          className="pdp-hero-card"
          style={{
            backgroundColor: "var(--base-light, #f5f1e8)",
            borderRadius: 24,
            padding: "clamp(16px,2.4vw,36px)",
          }}
        >
          <ProductHero formula={item} formulaKey={key} />
        </div>
      </section>

      {/* Tabs with Recommendations */}
      <section style={{ width: "100%", backgroundColor: "var(--base)", paddingBottom: "clamp(24px,4vw,48px)" }}>
        <div style={{ width: "100%", maxWidth: 1440, margin: "0 auto", padding: "0 clamp(16px,5vw,64px)" }}>
          <PdpTabsWithRecommendations currentKey={key} />
        </div>
      </section>

      {/* Ingredients Section */}
      <PdpIngredients formulaKey={key} />

      {/* The feeling of good calm/focus/energy */}
      <section style={{ width: "100%", backgroundColor: "var(--base)", padding: "clamp(32px,6vw,80px) 0" }}>
        <div style={{ width: "100%", maxWidth: 1440, margin: "0 auto", padding: "0 clamp(16px,5vw,64px)" }}>
          {/* Section header */}
          <h2
            className="font-serif"
            style={{
              fontWeight: 900,
              fontSize: "clamp(24px,4.5vw,56px)",
              lineHeight: 1.0,
              color: "var(--ink)",
              textAlign: "left",
              marginBottom: "clamp(20px,3vw,40px)",
            }}
          >
            The feeling of good {key}.
          </h2>

          {/* Benefit icons - 2x2 on mobile, 4 across on desktop */}
          <div className="pdp-benefits-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: "clamp(24px,3vw,40px)" }}>
            <style>{`
              @media (min-width: 768px) {
                .pdp-benefits-grid {
                  grid-template-columns: repeat(4, 1fr) !important;
                  gap: 16px !important;
                }
              }
            `}</style>
            {feelingBenefits[key].map((benefit) => (
              <div
                key={benefit.title}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 8,
                  padding: "clamp(14px,2vw,24px)",
                  backgroundColor: "var(--base-light)",
                  borderRadius: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "clamp(40px,6vw,72px)",
                    height: "clamp(40px,6vw,72px)",
                  }}
                >
                  <AvroIcon name={benefit.icon} size={56} className="md:w-[72px] md:h-[72px] lg:w-[96px] lg:h-[96px]" />
                </div>
                <h3
                  style={{
                    fontFamily: GC,
                    fontWeight: 700,
                    fontSize: "clamp(11px,1.2vw,16px)",
                    lineHeight: 1.2,
                    color: "var(--ink)",
                  }}
                >
                  {benefit.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Feeling section source footnote */}
          <p
            style={{
              fontFamily: GC,
              fontWeight: 400,
              fontSize: "clamp(10px,0.85vw,12px)",
              lineHeight: 1.5,
              color: "rgba(0,0,0,0.38)",
              marginBottom: "clamp(20px,3vw,40px)",
              marginTop: -16,
            }}
          >
            * These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Benefit icons are for illustrative purposes only.
          </p>

          {/* Graph section - two columns */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24, alignItems: "center" }}>
            <style>{`
              @media (min-width: 1024px) {
                .pdp-graph-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
              }
            `}</style>
            <div className="pdp-graph-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24, alignItems: "center" }}>
              {/* Left side - text */}
              <div>
                <p
                  style={{
                    fontFamily: GC,
                    fontWeight: 400,
                    fontSize: "clamp(14px,1.3vw,18px)",
                    lineHeight: 1.55,
                    color: "var(--warm-gray)",
                    marginBottom: 12,
                  }}
                >
                  {key === "energy"
                    ? "AVRO's ingredients are formulated to work better together. Delivering steady energy in a convenient stick pack format.*"
                    : key === "focus"
                      ? "AVRO's ingredients are formulated to work better together. Delivering steady focus in a convenient stick pack format.*"
                      : "AVRO's ingredients are formulated to work better together. Delivering steady calm in a convenient stick pack format.*"}
                </p>
                <p
                  style={{
                    fontFamily: GC,
                    fontWeight: 400,
                    fontSize: "clamp(14px,1.3vw,18px)",
                    lineHeight: 1.55,
                    color: "var(--warm-gray)",
                    marginBottom: 20,
                  }}
                >
                  {key === "energy"
                    ? "Instead of energy that spikes and crashes, AVRO is designed to support a smoother, more sustained curve. No crash. No jitters. Just good energy.*"
                    : key === "focus"
                      ? "Instead of focus that fades, AVRO is designed to support a smoother, more sustained curve. No overstimulation. Just clear thinking.*"
                      : "Instead of calm that makes you drowsy, AVRO is designed to support a smoother, more sustained baseline. Just composure.*"}
                </p>
                <style>{`
                  .pdp-learn-btn {
                    transition: background-color 0.2s ease, color 0.2s ease;
                  }
                  .pdp-learn-btn:hover {
                    background-color: transparent;
                    color: var(--charcoal);
                  }
                  @keyframes pdp-graph-draw {
                    from { stroke-dashoffset: var(--draw-len); }
                    to { stroke-dashoffset: 0; }
                  }
                  @keyframes pdp-graph-fade {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.7; }
                  }
                  .pdp-graph-coffee {
                    stroke-dasharray: 8 6;
                    animation: pdp-graph-fade 4s ease-in-out infinite;
                  }
                  .pdp-graph-avro {
                    --draw-len: 900;
                    stroke-dasharray: var(--draw-len);
                    stroke-dashoffset: var(--draw-len);
                    animation: pdp-graph-draw 2.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                  }
                `}</style>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    <a
                    href="/science"
                    className="btn-primary avro-size-lg"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: GC, textDecoration: "none" }}
                  >
                    Learn How It Works
                    <Icon name="arrowRight" className="w-4 h-4" />
                  </a>
                  <SupplementFactsDialog formula={item} formulaKey={key} />
                </div>
              </div>

              {/* Right side - chart (study-based for Calm & Focus, curve for Energy) */}
              {key === "calm" ? (
                <EmbeddedGraphic src="/graphics/calm.html" ratio="1200 / 740" title="Calm: stress (CgA) & cortisol study" />
              ) : key === "focus" ? (
                <EmbeddedGraphic src="/graphics/focus.html" ratio="1400 / 620" title="Focus: improved cognitive functions by GABA" />
              ) : (
                <EmbeddedGraphic src="/graphics/energy.html" ratio="1200 / 720" title="Energy: the calm-first energy curve" />
              )}

              {/* Data source attribution — study charts only (Calm & Focus). The Energy
                  philosophy graphic carries its own disclaimer, so no page-width * line. */}
              {key !== "energy" && (
                <p
                  style={{
                    fontFamily: GC,
                    fontWeight: 400,
                    fontSize: "clamp(11px,0.9vw,13px)",
                    lineHeight: 1.5,
                    color: "rgba(0,0,0,0.38)",
                    marginTop: 10,
                    gridColumn: "1 / -1",
                  }}
                >
                  For illustrative purposes only. Individual results may vary. This curve is a conceptual
                  representation and is not based on a single clinical trial. * These statements have not
                  been evaluated by the Food and Drug Administration. This product is not intended to
                  diagnose, treat, cure, or prevent any disease.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Comparison Grid */}
      <ProductComparisonGrid currentKey={key} />

      {/* Your favorites. On repeat - Subscription CTA */}
      <section style={{ width: "100%", padding: "clamp(28px,4vw,56px) 0", backgroundColor: "var(--avro-blue)" }}>
        <div style={{ width: "100%", maxWidth: 1250, margin: "0 auto", padding: "0 clamp(16px,5vw,64px)" }}>
          <h2
            className="font-serif"
            style={{
              fontWeight: 900,
              fontSize: "clamp(22px,3.5vw,44px)",
              lineHeight: 1.05,
              color: "var(--charcoal)",
              marginBottom: 10,
            }}
          >
            Your favorites. On repeat.
          </h2>
          <p
            style={{
              fontFamily: GC,
              fontWeight: 400,
              fontSize: "clamp(13px,1.2vw,17px)",
              lineHeight: 1.5,
              color: "var(--charcoal)",
              opacity: 0.75,
              maxWidth: 500,
              margin: "0 0 20px",
            }}
          >
            Subscribe & save 15% every order of 2 or more tubes. Pick your favorites, set your schedule. Leave the rest to us.
          </p>
          <a
            href={`/${key}`}
            className="btn-primary avro-size-lg"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: GC, textDecoration: "none" }}
          >
            Subscribe Now
            <Icon name="arrowRight" className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* FAQ accordion */}
      <section style={{ width: "100%", maxWidth: 1440, margin: "0 auto", padding: "clamp(28px,4vw,56px) clamp(16px,5vw,64px)", backgroundColor: "var(--base)" }}>
        <style>{`
          @media (min-width: 1024px) {
            .pdp-faq-grid { grid-template-columns: 0.7fr 1.3fr !important; }
          }
        `}</style>
        <div className="pdp-faq-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24, alignItems: "start" }}>
          <div>
            <h2
              className="font-serif"
              style={{
                fontWeight: 900,
                fontSize: "clamp(22px,3.5vw,44px)",
                lineHeight: 1.05,
                color: "var(--ink)",
              }}
            >
              Frequently asked, all answered.
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              [
                `What are the main ingredients in ${item.name}?`,
                `${item.name} is ${key === "energy" ? "formulated with 120mg of natural caffeine combined with PharmaGABA® for steady energy without the jitters" : key === "focus" ? "formulated with Cognigrape® and PharmaGABA® for clear focus without overstimulation" : "formulated with Magnesium and PharmaGABA® for calm without drowsiness"}.`,
              ],
              [
                `What is the best time to take ${item.name}?`,
                "Most people use one stick about 20 to 30 minutes before the moment they want calm-first support.",
              ],
              [
                `Can I take ${item.name} if I'm sensitive to caffeine?`,
                item.caffeine === "No caffeine"
                  ? `${item.name} is caffeine free, making it perfect for those sensitive to caffeine.`
                  : `${item.name} contains 120 mg natural caffeine. If you're sensitive, we recommend our Calm or Focus formulas.`,
              ],
              [
                `Does ${item.name} have added sugar or artificial sweeteners?`,
                "No. AVRO uses no added sugars and no artificial sweeteners. Just clean, functional ingredients.",
              ],
            ].map(([q, a], i) => (
              <details
                key={q}
                className="group"
                style={{ backgroundColor: "var(--base)", borderTop: i > 0 ? "1px solid var(--divider)" : "none" }}
              >
                <summary
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    padding: "14px 0",
                    cursor: "pointer",
                    listStyle: "none",
                    fontFamily: GC,
                    fontWeight: 700,
                    fontSize: "clamp(13px,1.2vw,17px)",
                    color: "var(--ink)",
                  }}
                >
                  <span>{q}</span>
                  <span
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: 28,
                      height: 28,
                      borderRadius: 9999,
                      fontSize: 16,
                      lineHeight: 1,
                      flexShrink: 0,
                      backgroundColor: "var(--charcoal)",
                      color: "var(--bone)",
                    }}
                  >
                    <span className="transition-transform group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p
                  style={{
                    paddingBottom: 14,
                    paddingRight: 40,
                    fontFamily: GC,
                    fontWeight: 400,
                    fontSize: "clamp(13px,1.1vw,16px)",
                    lineHeight: 1.55,
                    color: "var(--warm-gray)",
                  }}
                >
                  {a}
                </p>
              </details>
            ))}
            <a
              href="/faq"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: 16,
                fontFamily: GC,
                fontWeight: 700,
                fontSize: 15,
                color: "var(--ink)",
                textDecoration: "none",
              }}
            >
              See more answers
              <Icon name="arrowRight" className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Bottom Reviews block */}
      <div id="reviews">
        <ReviewsBlock formula={item} formulaKey={key} />
      </div>

      {/* Banner CTA — color-matched artwork confined to a rounded box with a single Shop button */}
      {footerBanner[key] && (
        <MockupBlueCta bgImage={footerBanner[key]} shopHref="/shop" shopLabel="Shop" />
      )}
    </>
  )
}
