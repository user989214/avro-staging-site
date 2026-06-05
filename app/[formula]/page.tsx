import { notFound } from "next/navigation"
import { formulas, type FormulaKey } from "@/lib/data"
import { ProductHero } from "@/components/product-hero"
import { ReviewsBlock } from "@/components/reviews-block"
import { AvroIcon, type AvroIconName } from "@/components/avro-icons"
import { Icon } from "@/components/icons"
import { FinalCta } from "@/components/sections"
import { ProductComparisonGrid } from "@/components/product-comparison-grid"
import { PdpTabsWithRecommendations } from "@/components/pdp-tabs-with-recommendations"
import { PdpIngredients } from "@/components/pdp-ingredients"
import { SupplementFactsDialog } from "@/components/supplement-facts-dialog"
import { CalmStudyChart, FocusBenefitsTable } from "@/components/study-charts"

const GC = '"DM Sans", system-ui, sans-serif'
const BLUE = "#94C6D4"

const validFormulas = ["calm", "focus", "energy"] as const

// "The feeling of good calm/focus/energy" section benefit cards - 4 icons
const feelingBenefits: Record<FormulaKey, { icon: AvroIconName; title: string }[]> = {
  calm: [
    { icon: "supports-clear-thinking", title: "Improved clarity & composure" },
    { icon: "social-composure", title: "Calm, balanced mood" },
    { icon: "supports-focus-without-overload", title: "Sharper decision making" },
    { icon: "control-under-pressure", title: "Steady, sustained calm" },
  ],
  focus: [
    { icon: "supports-clear-thinking", title: "Improved cognition & alertness" },
    { icon: "social-composure", title: "Calm, balanced mood" },
    { icon: "supports-focus-without-overload", title: "Sharper focus" },
    { icon: "control-under-pressure", title: "Calm, sustained clarity" },
  ],
  energy: [
    { icon: "supports-clear-thinking", title: "Improved cognition & alertness" },
    { icon: "social-composure", title: "Calm, balanced mood" },
    { icon: "supports-focus-without-overload", title: "Sharper focus" },
    { icon: "control-under-pressure", title: "Clean, sustained energy" },
  ],
}

// "CALM = POWER." footer banner per formula (color-matched product shot).
// Focus banner will be added once its artwork is attached.
const footerBanner: Partial<Record<FormulaKey, string>> = {
  calm: "/images/banners/calm-power.png",
  energy: "/images/banners/energy-power.png",
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
                    ? "AVRO's ingredients are formulated to work better together. Delivering steady energy in a convenient stick pack format."
                    : key === "focus"
                      ? "AVRO's ingredients are formulated to work better together. Delivering steady focus in a convenient stick pack format."
                      : "AVRO's ingredients are formulated to work better together. Delivering steady calm in a convenient stick pack format."}
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
                    ? "Instead of energy that spikes and crashes, AVRO is designed to support a smoother, more sustained curve. No crash. No jitters. Just good energy."
                    : key === "focus"
                      ? "Instead of focus that fades, AVRO is designed to support a smoother, more sustained curve. No overstimulation. Just clear thinking."
                      : "Instead of calm that makes you drowsy, AVRO is designed to support a smoother, more sustained baseline. No sedation. Just composure."}
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
                    className="pdp-learn-btn avro-size-lg"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontFamily: GC,
                      fontWeight: 700,
                      borderRadius: 999,
                      backgroundColor: "var(--charcoal)",
                      color: "var(--bone)",
                      border: "2px solid var(--charcoal)",
                      textDecoration: "none",
                    }}
                  >
                    Learn how it works
                    <Icon name="arrowRight" className="w-4 h-4" />
                  </a>
                  <SupplementFactsDialog formula={item} formulaKey={key} />
                </div>
              </div>

              {/* Right side - chart (study-based for Calm & Focus, curve for Energy) */}
              {key === "calm" ? (
                <CalmStudyChart />
              ) : key === "focus" ? (
                <FocusBenefitsTable />
              ) : (
                <div style={{ padding: "clamp(14px,2vw,24px)", backgroundColor: "var(--charcoal)", borderRadius: 20 }}>
                  {/* Graph */}
                  <div style={{ position: "relative", height: "clamp(140px,18vw,200px)" }}>
                    {/* Grid lines */}
                    <div style={{ position: "absolute", inset: "0 0 28px 0", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} style={{ width: "100%", borderTop: "1px solid rgba(245,241,234,0.1)" }} />
                      ))}
                    </div>

                    {/* SVG curves */}
                    <svg
                      viewBox="0 0 400 200"
                      style={{ position: "absolute", inset: "0 0 28px 0", width: "100%", height: "calc(100% - 28px)" }}
                      preserveAspectRatio="none"
                    >
                      <path
                        className="pdp-graph-coffee"
                        d="M 0 180 Q 40 180 70 30 Q 90 10 110 50 Q 150 130 200 160 Q 280 180 400 185"
                        fill="none"
                        stroke="rgba(245,241,234,0.4)"
                        strokeWidth="3"
                      />
                      <path
                        className="pdp-graph-avro"
                        d="M 0 180 Q 60 160 100 90 Q 140 60 200 65 Q 300 70 400 85"
                        fill="none"
                        stroke={BLUE}
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Time labels */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: GC,
                        fontWeight: 700,
                        fontSize: "clamp(9px,1vw,12px)",
                        color: "rgba(245,241,234,0.5)",
                      }}
                    >
                      <span>0 min</span>
                      <span>30 min</span>
                      <span>1 hr</span>
                      <span>2 hr</span>
                      <span>3 hr</span>
                    </div>
                  </div>

                  {/* Legend */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "clamp(12px,2vw,24px)",
                      marginTop: 12,
                      paddingTop: 12,
                      borderTop: "1px solid rgba(245,241,234,0.15)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 20, height: 3, borderRadius: 999, backgroundColor: BLUE }} />
                      <span style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(10px,0.9vw,12px)", color: "var(--bone)" }}>
                        AVRO {item.short}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div
                        style={{
                          width: 20,
                          height: 3,
                          borderRadius: 999,
                          backgroundImage: "repeating-linear-gradient(90deg, rgba(245,241,234,0.4), rgba(245,241,234,0.4) 4px, transparent 4px, transparent 8px)",
                        }}
                      />
                      <span style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(10px,0.9vw,12px)", color: "rgba(245,241,234,0.5)" }}>
                        Coffee
                      </span>
                    </div>
                  </div>
                </div>
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
            Save 25% when you subscribe. Pick your favorites, set your schedule. Leave the rest to us.
          </p>
          <style>{`
            .pdp-subscribe-btn {
              transition: background-color 0.2s ease, color 0.2s ease;
            }
            .pdp-subscribe-btn:hover {
              background-color: transparent;
              color: var(--charcoal);
            }
          `}</style>
          <a
            href={`/${key}`}
            className="pdp-subscribe-btn avro-size-lg"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: GC,
              fontWeight: 700,
              borderRadius: 999,
              backgroundColor: "var(--charcoal)",
              color: "var(--bone)",
              border: "2px solid var(--charcoal)",
              textDecoration: "none",
            }}
          >
            Subscribe now
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

      {/* "CALM = POWER." footer banner — color-matched to the formula */}
      {footerBanner[key] && (
        <section
          aria-label={`${item.name} — Calm equals power`}
          style={{ backgroundColor: "#ffffff", padding: "clamp(24px, 5vw, 64px) 16px" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={footerBanner[key] || "/placeholder.svg"}
            alt={`${item.name} ${item.flavor} — Calm equals power.`}
            style={{
              display: "block",
              width: "100%",
              maxWidth: 1100,
              height: "auto",
              margin: "0 auto",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
            }}
          />
        </section>
      )}

      {/* Final CTA */}
      <FinalCta
        title="Good energy starts here."
        copy="Get easy lifestyle tips, wellness inspo, plus early access to AVRO launches and offers."
        productButtons
      />
    </>
  )
}
