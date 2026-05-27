import { notFound } from "next/navigation"
import { formulas, type FormulaKey } from "@/lib/data"
import { ProductHero } from "@/components/product-hero"
import { ReviewsBlock } from "@/components/reviews-block"
import { Icon, type IconName } from "@/components/icons"
import { FinalCta } from "@/components/sections"
import { ProductComparisonGrid } from "@/components/product-comparison-grid"
import { PdpTabsWithRecommendations } from "@/components/pdp-tabs-with-recommendations"
import { PdpIngredients } from "@/components/pdp-ingredients"
import { SupplementFactsDialog } from "@/components/supplement-facts-dialog"

const GC = '"DM Sans", system-ui, sans-serif'
const BLUE = "#94C6D4"

const validFormulas = ["calm", "focus", "energy"] as const

// "The feeling of good calm/focus/energy" section benefit cards - 4 icons
const feelingBenefits: Record<FormulaKey, { icon: IconName; title: string }[]> = {
  calm: [
    { icon: "brain", title: "Improved clarity & composure" },
    { icon: "smile", title: "Calm, balanced mood" },
    { icon: "target", title: "Sharper decision making" },
    { icon: "zap", title: "Steady, sustained calm" },
  ],
  focus: [
    { icon: "brain", title: "Improved cognition & alertness" },
    { icon: "smile", title: "Calm, balanced mood" },
    { icon: "target", title: "Sharper focus" },
    { icon: "zap", title: "Clean, sustained energy" },
  ],
  energy: [
    { icon: "brain", title: "Improved cognition & alertness" },
    { icon: "smile", title: "Calm, balanced mood" },
    { icon: "target", title: "Sharper focus" },
    { icon: "zap", title: "Clean, sustained energy" },
  ],
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
      {/* PDP Hero - rounded section background, like homepage feature blocks */}
      <section
        style={{
          width: "100%",
          maxWidth: 1440,
          margin: "0 auto",
          padding: "clamp(16px,2.5vw,32px) clamp(18px,5vw,64px) clamp(24px,3vw,40px)",
          backgroundColor: "var(--base)",
        }}
      >
        <div
          style={{
            backgroundColor: "var(--base-light, #f5f1e8)",
            borderRadius: 32,
            padding: "clamp(20px,2.4vw,36px)",
          }}
        >
          <ProductHero formula={item} formulaKey={key} />
        </div>
      </section>

      {/* Tabs with Recommendations */}
      <section style={{ width: "100%", backgroundColor: "var(--base)", paddingBottom: "clamp(32px,4vw,48px)" }}>
        <div style={{ width: "100%", maxWidth: 1440, margin: "0 auto", padding: "0 clamp(18px,5vw,64px)" }}>
          <PdpTabsWithRecommendations currentKey={key} />
        </div>
      </section>

      {/* Ingredients Section */}
      <PdpIngredients formulaKey={key} />

      {/* The feeling of good calm/focus/energy */}
      <section style={{ width: "100%", backgroundColor: "var(--base)", padding: "clamp(48px,6vw,80px) 0" }}>
        <div style={{ width: "100%", maxWidth: 1440, margin: "0 auto", padding: "0 clamp(18px,5vw,64px)" }}>
          {/* Section header */}
          <h2
            className="font-serif"
            style={{
              fontWeight: 900,
              fontSize: "clamp(32px,4.5vw,56px)",
              lineHeight: 1.0,
              color: "var(--ink)",
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            The feeling of good {key}.
          </h2>

          {/* Benefit icons - 4 across */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 40 }}>
            {feelingBenefits[key].map((benefit) => (
              <div
                key={benefit.title}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 12,
                  padding: 24,
                  backgroundColor: "var(--base-light)",
                  borderRadius: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 48,
                    height: 48,
                    borderRadius: 9999,
                    backgroundColor: "var(--charcoal)",
                  }}
                >
                  <Icon name={benefit.icon} className="w-6 h-6 text-bone" />
                </div>
                <h3
                  style={{
                    fontFamily: GC,
                    fontWeight: 700,
                    fontSize: 16,
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40, alignItems: "center" }}>
            <style>{`
              @media (min-width: 1024px) {
                .pdp-graph-grid { grid-template-columns: 1fr 1fr !important; }
              }
            `}</style>
            <div className="pdp-graph-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40, alignItems: "center" }}>
              {/* Left side - text */}
              <div>
                <p
                  style={{
                    fontFamily: GC,
                    fontWeight: 400,
                    fontSize: 18,
                    lineHeight: 1.55,
                    color: "var(--warm-gray)",
                    marginBottom: 16,
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
                    fontSize: 18,
                    lineHeight: 1.55,
                    color: "var(--warm-gray)",
                    marginBottom: 24,
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
                `}</style>
                <div style={{ display: "inline-flex", flexWrap: "wrap", gap: 12 }}>
                  <a
                    href="/science"
                    className="pdp-learn-btn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 12,
                      fontFamily: GC,
                      fontWeight: 700,
                      fontSize: 16,
                      minHeight: 48,
                      padding: "0 28px",
                      borderRadius: 999,
                      backgroundColor: "var(--charcoal)",
                      color: "var(--bone)",
                      border: "2px solid var(--charcoal)",
                      textDecoration: "none",
                    }}
                  >
                    Learn how it works
                    <Icon name="arrowRight" className="w-5 h-5" />
                  </a>
                  <SupplementFactsDialog formula={item} formulaKey={key} />
                </div>
              </div>

              {/* Right side - graph */}
              <div style={{ padding: 24, backgroundColor: "var(--charcoal)", borderRadius: 24 }}>
                {/* Graph */}
                <div style={{ position: "relative", height: 200 }}>
                  {/* Grid lines */}
                  <div style={{ position: "absolute", inset: "0 0 32px 0", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={i} style={{ width: "100%", borderTop: "1px solid rgba(245,241,234,0.1)" }} />
                    ))}
                  </div>

                  {/* SVG curves */}
                  <svg
                    viewBox="0 0 400 200"
                    style={{ position: "absolute", inset: "0 0 32px 0", width: "100%", height: "calc(100% - 32px)" }}
                    preserveAspectRatio="none"
                  >
                    <path
                      d={
                        key === "energy"
                          ? "M 0 180 Q 40 180 70 30 Q 90 10 110 50 Q 150 130 200 160 Q 280 180 400 185"
                          : "M 0 100 Q 50 80 100 40 Q 150 70 200 90 Q 280 120 350 140 Q 380 150 400 160"
                      }
                      fill="none"
                      stroke="rgba(245,241,234,0.4)"
                      strokeWidth="3"
                      strokeDasharray="8 6"
                    />
                    <path
                      d={
                        key === "energy"
                          ? "M 0 180 Q 60 160 100 90 Q 140 60 200 65 Q 300 70 400 85"
                          : key === "focus"
                            ? "M 0 150 Q 60 130 100 80 Q 140 55 200 60 Q 300 65 400 75"
                            : "M 0 140 Q 60 120 100 70 Q 140 50 200 55 Q 300 60 400 70"
                      }
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
                      fontSize: 12,
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
                    gap: 24,
                    marginTop: 16,
                    paddingTop: 16,
                    borderTop: "1px solid rgba(245,241,234,0.15)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 24, height: 4, borderRadius: 999, backgroundColor: BLUE }} />
                    <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 12, color: "var(--bone)" }}>
                      AVRO {item.short}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                      style={{
                        width: 24,
                        height: 4,
                        borderRadius: 999,
                        backgroundImage: "repeating-linear-gradient(90deg, rgba(245,241,234,0.4), rgba(245,241,234,0.4) 4px, transparent 4px, transparent 8px)",
                      }}
                    />
                    <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 12, color: "rgba(245,241,234,0.5)" }}>
                      {key === "energy" ? "Coffee" : "Typical Stress"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Comparison Grid */}
      <ProductComparisonGrid currentKey={key} />

      {/* Your favorites. On repeat - Subscription CTA */}
      <section style={{ width: "100%", padding: "clamp(36px,4vw,56px) 0", backgroundColor: "var(--avro-blue)" }}>
        <div style={{ width: "100%", maxWidth: 1250, margin: "0 auto", padding: "0 clamp(18px,5vw,64px)" }}>
          <span
            style={{
              display: "inline-block",
              fontFamily: GC,
              fontWeight: 800,
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--charcoal)",
              backgroundColor: "rgba(0,0,0,0.08)",
              padding: "6px 14px",
              borderRadius: 999,
              marginBottom: 16,
            }}
          >
            Subscribe & save
          </span>
          <h2
            className="font-serif"
            style={{
              fontWeight: 900,
              fontSize: "clamp(26px,3.5vw,44px)",
              lineHeight: 1.05,
              color: "var(--charcoal)",
              marginBottom: 12,
            }}
          >
            Your favorites. On repeat.
          </h2>
          <p
            style={{
              fontFamily: GC,
              fontWeight: 400,
              fontSize: 17,
              lineHeight: 1.5,
              color: "var(--charcoal)",
              opacity: 0.75,
              maxWidth: 500,
              margin: "0 0 24px",
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
            className="pdp-subscribe-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: GC,
              fontWeight: 700,
              fontSize: 16,
              minHeight: 48,
              padding: "0 28px",
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
      <section style={{ width: "100%", maxWidth: 1440, margin: "0 auto", padding: "clamp(36px,4vw,56px) clamp(18px,5vw,64px)", backgroundColor: "var(--base)" }}>
        <style>{`
          @media (min-width: 1024px) {
            .pdp-faq-grid { grid-template-columns: 0.7fr 1.3fr !important; }
          }
        `}</style>
        <div className="pdp-faq-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32, alignItems: "start" }}>
          <div>
            <h2
              className="font-serif"
              style={{
                fontWeight: 900,
                fontSize: "clamp(26px,3.5vw,44px)",
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
                `What makes ${item.name} different from the original formula?`,
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
                    gap: 16,
                    padding: "16px 0",
                    cursor: "pointer",
                    listStyle: "none",
                    fontFamily: GC,
                    fontWeight: 700,
                    fontSize: 17,
                    color: "var(--ink)",
                  }}
                >
                  <span>{q}</span>
                  <span
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: 32,
                      height: 32,
                      borderRadius: 9999,
                      fontSize: 18,
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
                    paddingBottom: 16,
                    paddingRight: 40,
                    fontFamily: GC,
                    fontWeight: 400,
                    fontSize: 16,
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

      {/* Final CTA */}
      <FinalCta
        title="Good energy starts here."
        copy="Get easy lifestyle tips, wellness inspo, plus early access to AVRO launches and offers."
        productButtons
      />
    </>
  )
}
