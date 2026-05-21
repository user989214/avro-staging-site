import { notFound } from "next/navigation"
import { formulas, type FormulaKey } from "@/lib/data"
import { ProductHero } from "@/components/product-hero"
import { ReviewsBlock } from "@/components/reviews-block"
import { Icon, type IconName } from "@/components/icons"
import { FinalCta } from "@/components/sections"
import { PdpMarquee } from "@/components/pdp-marquee"
import { ProductComparisonGrid } from "@/components/product-comparison-grid"
import { PdpSocialScroll } from "@/components/pdp-social-scroll"
import { PdpTabsWithRecommendations } from "@/components/pdp-tabs-with-recommendations"

const GC = '"Gotham Condensed", sans-serif'
const BLUE = "#87CEEB"

const validFormulas = ["calm", "focus", "energy"] as const

// "The feeling of good calm/focus/energy" section benefit cards - 4 icons like NeuroGum
const feelingBenefits: Record<FormulaKey, { icon: IconName; title: string }[]> = {
  calm: [
    { icon: "brain", title: "Improved Clarity & Composure" },
    { icon: "smile", title: "Calm, Balanced Mood" },
    { icon: "target", title: "Sharper Decision Making" },
    { icon: "zap", title: "Steady, Sustained Calm" },
  ],
  focus: [
    { icon: "brain", title: "Improved Cognition & Alertness" },
    { icon: "smile", title: "Calm, Balanced Mood" },
    { icon: "target", title: "Sharper Focus" },
    { icon: "zap", title: "Clean, Sustained Energy" },
  ],
  energy: [
    { icon: "brain", title: "Improved Cognition & Alertness" },
    { icon: "smile", title: "Calm, Balanced Mood" },
    { icon: "target", title: "Sharper Focus" },
    { icon: "zap", title: "Clean, Sustained Energy" },
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
      {/* Top Marquee - Bigger, Blue */}
      <PdpMarquee text="Subscribe & Save 25% on Every Order" variant="accent" size="lg" />

      {/* PDP Hero */}
      <section className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(24px,4vw,48px)] bg-white">
        <ProductHero formula={item} formulaKey={key} />
      </section>

      {/* Tabs with Recommendations - Cure style */}
      <section className="w-full bg-white py-[clamp(32px,5vw,64px)]">
        <div className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)]">
          <PdpTabsWithRecommendations currentKey={key} />
        </div>
      </section>

      {/* "This is what calm feels like" - Social Scroll Section */}
      <PdpSocialScroll formulaKey={key} />

      {/* The feeling of good calm/focus/energy - NeuroGum style */}
      <section className="w-full bg-white py-[clamp(48px,7vw,96px)]">
        <div className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)]">
          {/* Section header */}
          <h2
            className="text-center mb-12"
            style={{
              fontFamily: GC,
              fontWeight: 950,
              fontSize: "clamp(32px,5vw,64px)",
              lineHeight: 1.0,
              color: "#000",
            }}
          >
            The feeling of good {key}.
          </h2>

          {/* Benefit icons - 4 across like NeuroGum */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {feelingBenefits[key].map((benefit) => (
              <div
                key={benefit.title}
                className="flex flex-col items-center text-center gap-3 p-6"
                style={{ backgroundColor: "#f5f5f5", borderRadius: 12 }}
              >
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-full"
                  style={{ backgroundColor: BLUE }}
                >
                  <Icon name={benefit.icon} className="w-7 h-7 text-black" />
                </div>
                <h3
                  style={{
                    fontFamily: GC,
                    fontWeight: 800,
                    fontSize: 16,
                    lineHeight: 1.2,
                    color: "#000",
                  }}
                >
                  {benefit.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Graph section - two columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - text */}
            <div>
              <p
                className="mb-6"
                style={{
                  fontFamily: GC,
                  fontWeight: 400,
                  fontSize: 19,
                  lineHeight: 1.5,
                  color: "rgba(0,0,0,0.65)",
                }}
              >
                {key === "energy"
                  ? "AVRO's ingredients are formulated to work better together. Delivering steady energy in a convenient stick pack format."
                  : key === "focus"
                    ? "AVRO's ingredients are formulated to work better together. Delivering steady focus in a convenient stick pack format."
                    : "AVRO's ingredients are formulated to work better together. Delivering steady calm in a convenient stick pack format."}
              </p>
              <p
                className="mb-8"
                style={{
                  fontFamily: GC,
                  fontWeight: 400,
                  fontSize: 19,
                  lineHeight: 1.5,
                  color: "rgba(0,0,0,0.65)",
                }}
              >
                {key === "energy"
                  ? "Instead of energy that spikes and crashes, AVRO is designed to support a smoother, more sustained curve. No crash. No jitters. Just good energy."
                  : key === "focus"
                    ? "Instead of focus that fades, AVRO is designed to support a smoother, more sustained curve. No overstimulation. Just clear thinking."
                    : "Instead of calm that makes you drowsy, AVRO is designed to support a smoother, more sustained baseline. No sedation. Just composure."}
              </p>
              <a
                href="/science"
                className="inline-flex items-center gap-2 transition-colors"
                style={{
                  fontFamily: GC,
                  fontWeight: 800,
                  fontSize: 16,
                  minHeight: 56,
                  padding: "0 32px",
                  borderRadius: 10,
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "2.5px solid #000",
                  letterSpacing: "0.02em",
                }}
              >
                Learn How It Works
                <Icon name="arrowRight" className="w-4 h-4" />
              </a>
            </div>

            {/* Right side - graph */}
            <div className="relative">
              <div className="rounded-2xl p-6 lg:p-8" style={{ backgroundColor: "#f5f5f5" }}>
                {/* Graph */}
                <div className="relative h-[240px] lg:h-[280px]">
                  {/* Grid lines */}
                  <div className="absolute inset-x-0 top-0 bottom-8 flex flex-col justify-between">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-full" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }} />
                    ))}
                  </div>

                  {/* SVG curves */}
                  <svg
                    viewBox="0 0 400 200"
                    className="absolute inset-x-0 top-0 bottom-8 w-full h-[calc(100%-32px)]"
                    preserveAspectRatio="none"
                  >
                    <path
                      d={
                        key === "energy"
                          ? "M 0 180 Q 40 180 70 30 Q 90 10 110 50 Q 150 130 200 160 Q 280 180 400 185"
                          : "M 0 100 Q 50 80 100 40 Q 150 70 200 90 Q 280 120 350 140 Q 380 150 400 160"
                      }
                      fill="none"
                      stroke="#CCCCCC"
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
                    className="absolute bottom-0 left-0 right-0 flex justify-between"
                    style={{ fontFamily: GC, fontWeight: 700, fontSize: 11, color: "rgba(0,0,0,0.5)" }}
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
                  className="flex flex-wrap items-center justify-center gap-6 mt-4 pt-4"
                  style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-1 rounded-full" style={{ backgroundColor: BLUE }} />
                    <span style={{ fontFamily: GC, fontWeight: 800, fontSize: 12, color: "#000" }}>
                      AVRO {item.short}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-1 rounded-full"
                      style={{
                        backgroundImage: "repeating-linear-gradient(90deg, #CCC, #CCC 4px, transparent 4px, transparent 8px)",
                      }}
                    />
                    <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 12, color: "rgba(0,0,0,0.5)" }}>
                      {key === "energy" ? "Coffee" : "Typical Stress"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Comparison Grid - "We put intention into every formula" */}
      <ProductComparisonGrid currentKey={key} />

      {/* Your favorites. On repeat - Subscription CTA */}
      <section className="w-full py-[clamp(48px,6vw,80px)]" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="w-full max-w-[900px] mx-auto px-[clamp(18px,5vw,64px)] text-center">
          <h2
            className="mb-4"
            style={{
              fontFamily: GC,
              fontWeight: 950,
              fontSize: "clamp(28px,4vw,52px)",
              lineHeight: 1.05,
              color: "#000",
            }}
          >
            Your favorites. On repeat.
          </h2>
          <p
            className="max-w-[500px] mx-auto mb-8"
            style={{
              fontFamily: GC,
              fontWeight: 400,
              fontSize: 19,
              lineHeight: 1.5,
              color: "rgba(0,0,0,0.6)",
            }}
          >
            Save 25% when you subscribe. Pick your favorites, set your schedule. Leave the rest to us.
          </p>
          <a
            href={`/${key}`}
            className="inline-flex items-center gap-2 transition-colors"
            style={{
              fontFamily: GC,
              fontWeight: 800,
              fontSize: 18,
              minHeight: 60,
              padding: "0 36px",
              borderRadius: 10,
              backgroundColor: "#000",
              color: "#fff",
              border: "2.5px solid #000",
              letterSpacing: "0.02em",
            }}
          >
            Subscribe Now
            <Icon name="arrowRight" className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(48px,6vw,80px)] bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-16 items-start">
          <div>
            <h2
              style={{
                fontFamily: GC,
                fontWeight: 950,
                fontSize: "clamp(28px,4vw,52px)",
                lineHeight: 1.05,
                color: "#000",
              }}
            >
              Frequently asked, all answered.
            </h2>
          </div>
          <div className="flex flex-col">
            {[
              [
                `What makes ${item.name} different from the original formula?`,
                `${item.name} is ${key === "energy" ? "formulated with 120mg of natural caffeine combined with PharmaGABA® for steady energy without the jitters" : key === "focus" ? "formulated with Cognigrape® and PharmaGABA® for clear focus without overstimulation" : "formulated with Magnesium and PharmaGABA® for calm without drowsiness"}.`,
              ],
              [
                `What is the best time to take ${item.name}?`,
                "Most people use one stick about 20 to 30 minutes before the moment they want calm-first support. Morning routines, pre-meeting prep, or afternoon resets all work well.",
              ],
              [
                `Can I take ${item.name} if I'm sensitive to caffeine?`,
                item.caffeine === "No caffeine"
                  ? `${item.name} is caffeine free, making it perfect for those sensitive to caffeine or who want calm-first support any time of day.`
                  : `${item.name} contains 120 mg natural caffeine. If you're sensitive to caffeine, we recommend starting with our Calm or Focus formulas.`,
              ],
              [
                `Can I use ${item.name} with other caffeinated products?`,
                key === "energy"
                  ? "We recommend being mindful of your total daily caffeine intake. AVRO Energy contains 120mg per serving."
                  : `${item.name} is caffeine free, so it can be used alongside your regular coffee or tea routine.`,
              ],
              [
                `Does ${item.name} have added sugar or artificial sweeteners?`,
                "No. AVRO uses no added sugars and no artificial sweeteners. Just clean, functional ingredients.",
              ],
            ].map(([q, a], i) => (
              <details
                key={q}
                className="group bg-white"
                style={{ borderTop: i > 0 ? "1px solid rgba(0,0,0,0.08)" : "none" }}
              >
                <summary
                  className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none select-none transition-colors"
                  style={{ fontFamily: GC, fontWeight: 800, fontSize: 17, color: "#000" }}
                >
                  <span>{q}</span>
                  <span
                    className="grid place-items-center w-9 h-9 rounded-full text-lg leading-none transition-all shrink-0"
                    style={{ backgroundColor: BLUE, color: "#000" }}
                  >
                    <span className="transition-transform group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p
                  className="pb-5 pr-12 leading-relaxed"
                  style={{ fontFamily: GC, fontWeight: 400, fontSize: 16, color: "rgba(0,0,0,0.65)" }}
                >
                  {a}
                </p>
              </details>
            ))}
            <a
              href="/faq"
              className="inline-flex items-center gap-2 mt-6 hover:underline"
              style={{ fontFamily: GC, fontWeight: 800, fontSize: 14, color: "#000", letterSpacing: "0.05em", textTransform: "uppercase" }}
            >
              See More Answers
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
      />
    </>
  )
}
