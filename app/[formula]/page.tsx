import { notFound } from "next/navigation"
import { formulas, type FormulaKey } from "@/lib/data"
import { ProductHero } from "@/components/product-hero"
import { ReviewsBlock } from "@/components/reviews-block"
import { YouMightAlsoLike } from "@/components/you-might-also-like"
import { Icon, type IconName } from "@/components/icons"
import { FinalCta } from "@/components/sections"
import { PdpMarquee } from "@/components/pdp-marquee"
import { ProductComparisonGrid } from "@/components/product-comparison-grid"

const validFormulas = ["calm", "focus", "energy"] as const

const benefits: Record<FormulaKey, { icon: IconName; label: string }[]> = {
  calm: [
    { icon: "leaf", label: "Vegan" },
    { icon: "shield", label: "Gluten Free" },
    { icon: "flask", label: "Third-Party Tested" },
    { icon: "star", label: "HSA/FSA Eligible" },
  ],
  focus: [
    { icon: "leaf", label: "Vegan" },
    { icon: "shield", label: "Gluten Free" },
    { icon: "flask", label: "Third-Party Tested" },
    { icon: "star", label: "HSA/FSA Eligible" },
  ],
  energy: [
    { icon: "leaf", label: "Vegan" },
    { icon: "shield", label: "Gluten Free" },
    { icon: "flask", label: "Third-Party Tested" },
    { icon: "star", label: "HSA/FSA Eligible" },
  ],
}

const ingredientData: Record<FormulaKey, { name: string; amount: string; desc: string; highlight?: boolean }[]> = {
  calm: [
    { name: "PharmaGABA®", amount: "200 mg", desc: "Naturally fermented. AVRO's calm-first foundation.", highlight: true },
    { name: "Magnesium Bisglycinate", amount: "850 mg", desc: "Yields 100 mg active magnesium. Supports muscle and nervous system." },
    { name: "Prebiotic Fiber", amount: "PHGG + Acacia", desc: "Supports gut comfort. Part of AVRO's daily formula." },
  ],
  focus: [
    { name: "PharmaGABA®", amount: "200 mg", desc: "Naturally fermented. AVRO's calm-first foundation.", highlight: true },
    { name: "Cognigrape®", amount: "250 mg", desc: "Grape extract selected to support clarity and focus." },
    { name: "Prebiotic Fiber", amount: "PHGG + Acacia", desc: "Supports gut comfort. Part of AVRO's daily formula." },
  ],
  energy: [
    { name: "PharmaGABA®", amount: "200 mg", desc: "Naturally fermented. AVRO's calm-first foundation.", highlight: true },
    { name: "Natural Caffeine", amount: "120 mg", desc: "From coffee bean extract. Steady alertness with calm built in." },
    { name: "Prebiotic Fiber", amount: "PHGG + Acacia", desc: "Supports gut comfort. Part of AVRO's daily formula." },
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
      {/* Top Marquee */}
      <PdpMarquee text="Free shipping on orders over $50" variant="light" />

      {/* PDP Hero */}
      <section className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(24px,4vw,48px)] bg-white">
        <ProductHero formula={item} formulaKey={key} />
      </section>

      {/* Quick benefits strip */}
      <section className="w-full bg-soft border-y border-line">
        <div className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-5">
          <ul className="flex flex-wrap justify-center gap-x-10 gap-y-3">
            {benefits[key].map(({ icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon name={icon} className="w-5 h-5 text-olive" />
                <span className="text-sm font-bold text-ink">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Marquee divider */}
      <PdpMarquee text="Free shipping on orders over $50" variant="light" />

      {/* Stay in the zone - Graph Section (NeuroGum style) */}
      <section className="w-full bg-avro-blue/10 py-[clamp(48px,7vw,96px)]">
        <div className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - text */}
            <div>
              <h2 className="font-serif font-black text-[clamp(32px,5vw,56px)] leading-[1.05] text-ink mb-5">
                Stay in the zone.
              </h2>
              <p className="text-ink/70 text-lg leading-relaxed mb-6">
                {key === "energy" 
                  ? "AVRO's ingredients are formulated to work better together. Delivering steady energy in a convenient stick pack format."
                  : key === "focus"
                    ? "AVRO's ingredients are formulated to work better together. Delivering steady focus in a convenient stick pack format."
                    : "AVRO's ingredients are formulated to work better together. Delivering steady calm in a convenient stick pack format."
                }
              </p>
              <p className="text-ink/70 text-lg leading-relaxed mb-8">
                {key === "energy"
                  ? "Instead of energy that spikes and crashes, AVRO is designed to support a smoother, more sustained curve. No crash. No jitters. Just good energy."
                  : key === "focus"
                    ? "Instead of focus that fades, AVRO is designed to support a smoother, more sustained curve. No overstimulation. Just clear thinking."
                    : "Instead of calm that makes you drowsy, AVRO is designed to support a smoother, more sustained baseline. No sedation. Just composure."
                }
              </p>
              <a 
                href="/science" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-white font-bold text-sm rounded-lg hover:bg-ink/90 transition-colors"
              >
                Learn How It Works
                <Icon name="arrowRight" className="w-4 h-4" />
              </a>
            </div>
            
            {/* Right side - graph */}
            <div className="relative">
              <div className="bg-white rounded-2xl border border-line p-6 lg:p-8 shadow-sm">
                {/* Y-axis label */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 hidden lg:block">
                  <span className="text-[10px] font-bold text-ink/40 uppercase tracking-wider [writing-mode:vertical-lr] rotate-180">
                    {key === "energy" ? "Energy Level" : key === "focus" ? "Focus Level" : "Calm Level"}
                  </span>
                </div>
                
                {/* Graph */}
                <div className="relative h-[240px] lg:h-[280px]">
                  {/* Grid lines */}
                  <div className="absolute inset-x-0 top-0 bottom-8 flex flex-col justify-between">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-full border-t border-line/60" />
                    ))}
                  </div>
                  
                  {/* SVG curves */}
                  <svg
                    viewBox="0 0 400 200"
                    className="absolute inset-x-0 top-0 bottom-8 w-full h-[calc(100%-32px)]"
                    preserveAspectRatio="none"
                  >
                    {/* Comparison line (coffee/stress) - dashed, gray */}
                    <path
                      d={key === "energy" 
                        ? "M 0 180 Q 40 180 70 30 Q 90 10 110 50 Q 150 130 200 160 Q 280 180 400 185"
                        : "M 0 100 Q 50 80 100 40 Q 150 70 200 90 Q 280 120 350 140 Q 380 150 400 160"
                      }
                      fill="none"
                      stroke="#CCCCCC"
                      strokeWidth="3"
                      strokeDasharray="8 6"
                    />
                    
                    {/* AVRO line - solid, blue */}
                    <path
                      d={key === "energy" 
                        ? "M 0 180 Q 60 160 100 90 Q 140 60 200 65 Q 300 70 400 85"
                        : key === "focus"
                          ? "M 0 150 Q 60 130 100 80 Q 140 55 200 60 Q 300 65 400 75"
                          : "M 0 140 Q 60 120 100 70 Q 140 50 200 55 Q 300 60 400 70"
                      }
                      fill="none"
                      stroke="var(--avro-blue)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  {/* Time labels */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[11px] font-bold text-ink/50">
                    <span>0 min</span>
                    <span>30 min</span>
                    <span>1 hr</span>
                    <span>2 hr</span>
                    <span>3 hr</span>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="flex flex-wrap items-center justify-center gap-6 mt-4 pt-4 border-t border-line">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-1 bg-avro-blue rounded-full" />
                    <span className="text-xs font-bold text-ink">AVRO {item.short}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-1 bg-ink/30 rounded-full" style={{ backgroundImage: "repeating-linear-gradient(90deg, #CCC, #CCC 4px, transparent 4px, transparent 8px)" }} />
                    <span className="text-xs font-bold text-ink/50">{key === "energy" ? "Coffee" : "Typical Stress"}</span>
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
      <section className="w-full bg-soft py-[clamp(48px,6vw,80px)]">
        <div className="w-full max-w-[900px] mx-auto px-[clamp(18px,5vw,64px)] text-center">
          <h2 className="font-serif font-black text-[clamp(28px,4vw,48px)] leading-[1.05] text-ink mb-4">
            Your favorites. On repeat.
          </h2>
          <p className="text-ink/60 text-lg max-w-[500px] mx-auto mb-8">
            Save 25% when you subscribe. Pick your favorites, set your schedule. Leave the rest to us.
          </p>
          <a 
            href={`/${key}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-avro-blue text-ink font-bold text-base rounded-lg hover:bg-avro-blue/90 transition-colors"
          >
            Subscribe Now
            <Icon name="arrowRight" className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* More ways to support your day - You Might Also Like */}
      <section className="w-full bg-white py-[clamp(48px,6vw,80px)]">
        <div className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)]">
          <h2 className="font-serif font-black text-[clamp(28px,4vw,48px)] leading-[1.05] text-ink mb-8 text-center">
            More ways to support your day.
          </h2>
          <YouMightAlsoLike currentKey={key} hideHeader />
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(48px,6vw,80px)] bg-white border-t border-line">
        <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-16 items-start">
          <div>
            <h2 className="font-serif font-black text-[clamp(28px,4vw,48px)] leading-[1.05] mb-4 text-balance">
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
                className={
                  "group bg-white" +
                  (i > 0 ? " border-t border-line" : "")
                }
              >
                <summary className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none select-none text-base font-bold text-ink hover:text-olive transition-colors">
                  <span>{q}</span>
                  <span className="grid place-items-center w-8 h-8 rounded-full bg-avro-blue text-ink text-lg leading-none transition-all shrink-0">
                    <span className="transition-transform group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="pb-5 pr-12 text-ink/70 leading-relaxed">{a}</p>
              </details>
            ))}
            <a href="/faq" className="inline-flex items-center gap-2 mt-4 text-olive font-bold hover:underline">
              See More Answers
              <Icon name="arrowRight" className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Marquee divider */}
      <PdpMarquee text="Good Energy On Repeat • Subscribe & Save 25%" variant="accent" />

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
