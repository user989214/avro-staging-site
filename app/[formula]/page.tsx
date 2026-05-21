import { notFound } from "next/navigation"
import { formulas, type FormulaKey } from "@/lib/data"
import { ProductHero } from "@/components/product-hero"
import { ReviewsBlock } from "@/components/reviews-block"
import { YouMightAlsoLike } from "@/components/you-might-also-like"
import { Icon, type IconName } from "@/components/icons"
import { FinalCta } from "@/components/sections"
import { PdpMarquee } from "@/components/pdp-marquee"
import { MoodGraph, IngredientBar } from "@/components/pdp-graph"
import { SocialProofSection } from "@/components/pdp-social-proof"

const validFormulas = ["calm", "focus", "energy"] as const

const benefits: Record<FormulaKey, [string, IconName][]> = {
  calm: [
    ["Supports composure under pressure", "shield"],
    ["Supports clear-headed readiness", "target"],
    ["Supports calm without sedation", "leaf"],
    ["Naturally fermented PharmaGABA", "flask"],
  ],
  focus: [
    ["Supports clear thinking", "brain"],
    ["Supports steady attention", "target"],
    ["Supports focus without overload", "leaf"],
    ["Naturally fermented PharmaGABA", "flask"],
  ],
  energy: [
    ["Supports steady energy", "bolt"],
    ["Supports clear-headed readiness", "brain"],
    ["Supports energy without chaos", "leaf"],
    ["Naturally fermented PharmaGABA", "flask"],
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

      {/* Breadcrumbs */}
      <nav
        className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] pt-6 pb-3 text-xs text-ink/55"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center gap-2">
          <li>
            <a href="/" className="hover:text-olive">Home</a>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <a href="/shop" className="hover:text-olive">Shop</a>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ink font-bold">{item.name}</li>
        </ol>
      </nav>

      {/* PDP Hero */}
      <section className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] pb-[clamp(36px,5vw,64px)] bg-white">
        <ProductHero formula={item} formulaKey={key} />
      </section>

      {/* Quick benefits strip */}
      <section className="w-full bg-soft/40 border-y border-line">
        <div className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-7">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
            {benefits[key].map(([label, icon]) => (
              <li key={label} className="flex items-center gap-3">
                <span className="grid place-items-center w-10 h-10 rounded-full bg-white border border-line shrink-0">
                  <Icon name={icon} className="w-5 h-5 text-olive" />
                </span>
                <span className="text-sm font-bold text-ink leading-snug text-balance">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* YOU MIGHT ALSO LIKE - Moved up per NeuroGum style */}
      <YouMightAlsoLike currentKey={key} />

      {/* Angled Section: Social Proof */}
      <section className="relative w-full bg-soft py-[clamp(48px,7vw,96px)]">
        {/* Top angle */}
        <div className="absolute top-0 left-0 right-0 h-[60px] bg-white" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)" }} />
        
        <div className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] pt-8">
          <SocialProofSection formulaKey={key} />
        </div>
        
        {/* Bottom angle */}
        <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-white" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }} />
      </section>

      {/* The Feeling of Good Energy / Calm - Graph Section */}
      <section className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(48px,6vw,80px)] bg-white">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-olive/10 text-olive text-xs font-bold uppercase tracking-wider mb-4">
            The Science
          </span>
          <h2 className="font-serif font-black text-[clamp(28px,4vw,48px)] leading-[1.05] text-ink mb-3">
            The feeling of {key === "energy" ? "good energy" : key === "focus" ? "clear focus" : "true calm"}.
          </h2>
          <p className="text-ink/60 text-lg max-w-[600px] mx-auto">
            {key === "energy" 
              ? "Steady energy that lasts, without the jitters or crash."
              : key === "focus"
                ? "Clear, sustained focus without overstimulation."
                : "Calm composure that doesn't make you drowsy."
            }
          </p>
        </div>
        <MoodGraph formulaKey={key} />
      </section>

      {/* Angled Section: Formulated with ingredients */}
      <section className="relative w-full bg-ink text-white py-[clamp(48px,7vw,96px)]">
        {/* Top angle */}
        <div className="absolute top-0 left-0 right-0 h-[60px] bg-white" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%, 0 0)" }} />
        
        <div className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-avro-blue text-xs font-bold uppercase tracking-wider mb-4">
                What&apos;s Inside
              </span>
              <h2 className="font-serif font-black text-[clamp(28px,4vw,48px)] leading-[1.05] text-white mb-5">
                Formulated with ingredients that work with your body, not against it.
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Every ingredient in AVRO {item.short} is selected with intention. No fillers, no artificial sweeteners, no compromises.
              </p>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-center gap-3">
                  <Icon name="check" className="w-5 h-5 text-avro-blue" />
                  <span>Vegan & Plant-based</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="check" className="w-5 h-5 text-avro-blue" />
                  <span>Gluten Free</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="check" className="w-5 h-5 text-avro-blue" />
                  <span>Third-Party Tested</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="check" className="w-5 h-5 text-avro-blue" />
                  <span>Made in USA • GMP Compliant</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              {ingredientData[key].map((ing) => (
                <div 
                  key={ing.name}
                  className={`flex items-center gap-4 p-4 rounded-lg border ${ing.highlight ? "border-avro-blue bg-avro-blue/10" : "border-white/20 bg-white/5"}`}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Icon name="flask" className={`w-6 h-6 ${ing.highlight ? "text-avro-blue" : "text-white/60"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="font-bold text-white truncate">{ing.name}</h4>
                      <span className="text-sm font-extrabold text-avro-blue shrink-0">{ing.amount}</span>
                    </div>
                    <p className="text-sm text-white/60 mt-0.5">{ing.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom angle */}
        <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-white" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%, 100% 0)" }} />
      </section>

      {/* How to use - Redesigned with icons */}
      <section className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(64px,8vw,100px)] bg-white">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-olive/10 text-olive text-xs font-bold uppercase tracking-wider mb-4">
            Simple Ritual
          </span>
          <h2 className="font-serif font-black text-[clamp(28px,4vw,48px)] leading-[1.05] text-ink mb-3">
            3 easy steps. Your new daily ritual.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[900px] mx-auto">
          {[
            { n: 1, icon: "cup" as IconName, title: "Pour", copy: "One stick into 8–12 oz of cold water." },
            { n: 2, icon: "flask" as IconName, title: "Mix", copy: "Stir or shake until fully dissolved." },
            { n: 3, icon: "clock" as IconName, title: "Enjoy", copy: "Drink 20–30 minutes before your moment." },
          ].map((step) => (
            <div key={step.n} className="text-center group">
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-soft border-2 border-line mb-5 transition-all group-hover:border-olive group-hover:bg-olive/5">
                <Icon name={step.icon} className="w-9 h-9 text-olive" />
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-olive text-white text-sm font-black flex items-center justify-center">
                  {step.n}
                </span>
              </div>
              <h3 className="font-black text-xl mb-2">{step.title}</h3>
              <p className="text-ink/60 leading-relaxed">{step.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Marquee divider */}
      <PdpMarquee text="HSA / FSA Eligible • Third-Party Tested • 30-Day Guarantee" variant="accent" />

      {/* FAQ accordion */}
      <section className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(48px,6vw,80px)] bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-16 items-start">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-olive/10 text-olive text-xs font-bold uppercase tracking-wider mb-4">
              Questions
            </span>
            <h2 className="font-serif font-black text-[clamp(30px,4vw,52px)] leading-[1.05] mb-4 text-balance">
              Frequently asked. All answered.
            </h2>
            <p className="text-ink/70 leading-relaxed">
              Everything you need to know about AVRO {item.short}.
            </p>
          </div>
          <div className="flex flex-col">
            {[
              [
                `What is ${item.name}?`,
                `${item.name} is a calm-first daily drink mix designed to support ${item.support.toLowerCase()} It uses naturally fermented PharmaGABA® as its foundation.`,
              ],
              [
                `Does ${item.name} contain caffeine?`,
                item.caffeine === "No caffeine"
                  ? `${item.name} is caffeine free.`
                  : `${item.name} contains 120 mg natural caffeine per stick.`,
              ],
              [
                "When should I take it?",
                "Most people use one stick about 20 to 30 minutes before the moment they want calm-first support.",
              ],
              [
                "Can I take it every day?",
                "Yes. AVRO is designed to fit a daily routine. Choose timing and formula based on your caffeine preference and moment.",
              ],
              [
                "Is it third-party tested?",
                "Every batch is third-party tested. Documentation is available on request.",
              ],
              [
                "How does the subscription work?",
                "Subscribe & Save delivers every 28 days at 25% off. Pause, skip, or cancel anytime from your account.",
              ],
            ].map(([q, a], i) => (
              <details
                key={q}
                className={
                  "group bg-white" +
                  (i > 0 ? " border-t border-line" : "")
                }
              >
                <summary className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none select-none text-base font-extrabold text-ink hover:text-olive transition-colors">
                  <span>{q}</span>
                  <span className="grid place-items-center w-8 h-8 rounded-full bg-soft text-lg leading-none transition-all group-open:bg-olive group-open:text-white shrink-0">
                    <span className="transition-transform group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="pb-5 pr-12 text-ink/70 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Reviews block */}
      <div id="reviews">
        <ReviewsBlock formula={item} formulaKey={key} />
      </div>

      {/* Final CTA */}
      <FinalCta
        title={item.headline}
        copy={`Support ${item.support.toLowerCase()} for the moments that matter.`}
      />
    </>
  )
}
