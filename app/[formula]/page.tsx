import { notFound } from "next/navigation"
import { formulas, type FormulaKey } from "@/lib/data"
import { ProductGallery } from "@/components/product-gallery"
import { BuyBox } from "@/components/buy-box"
import { ReviewsBlock } from "@/components/reviews-block"
import { YouMightAlsoLike } from "@/components/you-might-also-like"
import { Icon, type IconName } from "@/components/icons"
import { FinalCta } from "@/components/sections"

const validFormulas = ["calm", "focus", "energy"] as const

const flavorImageMap: Record<string, string> = {
  "Blueberry Acai": "/images/ingredients/blueberry-acai-2.jpg",
  "Blackberry Jasmine": "/images/ingredients/blackberry-jasmine-2.jpg",
  "Pomegranate Raspberry": "/images/ingredients/pomegranate-raspberry-2.jpg",
  "Red Dragon Fruit": "/images/ingredients/red-dragon-fruit-2.jpg",
  "Fuji Apple": "/images/ingredients/fuji-apple-2.jpg",
  "Orange Tangerine": "/images/ingredients/orange-tangerine.jpg",
}

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
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-start">
          <ProductGallery formula={item} formulaKey={key} />
          <BuyBox formula={item} formulaKey={key} />
        </div>
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

      {/* Designed for + Top Reviews row (Cure / Avro style) */}
      <section className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(48px,6vw,80px)] bg-white border-b border-line">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-12 items-start">
          <div>
            <span className="block mb-3 text-olive text-[11px] font-black tracking-[0.14em] uppercase">
              About this formula
            </span>
            <h2 className="font-serif font-black text-[clamp(30px,4vw,52px)] leading-[1.05] mb-5 text-balance">
              Designed for pressure-sensitive moments.
            </h2>
            <p className="text-ink/75 text-lg leading-relaxed mb-8 max-w-[560px]">
              {item.name} is a calm-first daily drink mix built with naturally
              fermented PharmaGABA® to support {item.support.toLowerCase()} Use
              it before meetings, travel, social situations, rounds, sessions,
              or any moment where state matters.
            </p>
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-[640px]">
              <div className="flex flex-col gap-1.5">
                <dt className="text-[11px] font-black tracking-[0.14em] uppercase text-olive">
                  Best for
                </dt>
                <dd className="text-sm text-ink/75 leading-relaxed">
                  {item.bestFor}
                </dd>
              </div>
              <div className="flex flex-col gap-1.5">
                <dt className="text-[11px] font-black tracking-[0.14em] uppercase text-olive">
                  Caffeine
                </dt>
                <dd className="text-sm text-ink/75 leading-relaxed">
                  {item.caffeine}
                </dd>
              </div>
              <div className="flex flex-col gap-1.5">
                <dt className="text-[11px] font-black tracking-[0.14em] uppercase text-olive">
                  When to use
                </dt>
                <dd className="text-sm text-ink/75 leading-relaxed">
                  About 20 to 30 minutes before the moment.
                </dd>
              </div>
            </dl>
          </div>

          {/* Top customer review (Avro Freeform first review block) */}
          <aside className="p-7 bg-soft/50 border border-line rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[#d79a23] tracking-wider text-base">{"\u2605\u2605\u2605\u2605\u2605"}</span>
                <strong className="text-sm font-extrabold">4.8 / 5</strong>
              </div>
              <span className="text-xs text-ink/55">Verified buyer</span>
            </div>
            <p className="font-serif text-[22px] leading-[1.35] text-ink mb-5">
              &ldquo;{item.review}&rdquo;
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-line">
              <div>
                <strong className="block text-sm font-extrabold">
                  {key === "calm" ? "Jessica M." : key === "focus" ? "Michael T." : "Sarah K."}
                </strong>
                <span className="block text-xs text-ink/60 mt-0.5">
                  {item.flavor} &middot; 30 Sticks
                </span>
              </div>
              <a
                href="#reviews"
                className="text-xs font-extrabold text-olive-dark hover:underline"
              >
                Read all reviews →
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* What's inside */}
      <section className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(48px,6vw,80px)] bg-white border-b border-line">
        <div className="max-w-[700px] mb-9">
          <span className="block mb-3 text-olive text-[11px] font-black tracking-[0.14em] uppercase">
            What&apos;s inside
          </span>
          <h2 className="font-serif font-black text-[clamp(28px,3.5vw,46px)] leading-[1.05] text-balance">
            Clear ingredient logic. Nothing hidden.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-line rounded-lg overflow-hidden bg-white">
          {[
            {
              title: "PharmaGABA®",
              dose: "200 mg",
              copy: "Naturally fermented. AVRO's calm-first foundation.",
              icon: "leaf" as IconName,
              image: "/images/ingredients/pharmagaba-2.jpg",
              alt: "Naturally fermented PharmaGABA powder",
            },
            {
              title: item.addition,
              dose:
                key === "calm" ? "550 mg" : key === "focus" ? "250 mg" : "120 mg",
              copy:
                key === "calm"
                  ? "Supports normal muscle and nervous system function."
                  : key === "focus"
                    ? "Selected to support clarity and focus."
                    : "Supports steady alertness with calm built in.",
              icon: "flask" as IconName,
              image:
                key === "focus"
                  ? "/images/ingredients/cognigrape-2.jpg"
                  : key === "energy"
                    ? "/images/ingredients/natural-caffeine-2.jpg"
                    : null,
              alt:
                key === "focus"
                  ? "Cognigrape red grape cluster"
                  : key === "energy"
                    ? "Roasted coffee beans, source of natural caffeine"
                    : "",
            },
            {
              title: "Prebiotic Fiber",
              dose: "PHGG + Acacia",
              copy: "Supports gut comfort. Part of AVRO's daily formula.",
              icon: "shield" as IconName,
              image: "/images/ingredients/prebiotic-fiber-2.jpg",
              alt: "Prebiotic fiber blend powder",
            },
            {
              title: "Stevia",
              dose: "≤ 2%",
              copy: "Used in a small amount for a clean, balanced finish.",
              icon: "star" as IconName,
              image: "/images/ingredients/stevia-2.jpg",
              alt: "Fresh stevia leaves",
            },
            {
              title: "Natural Flavor",
              dose: item.flavor,
              copy: "Bright, clean flavor without artificial sweeteners.",
              icon: "cup" as IconName,
              image: flavorImageMap[item.flavor] ?? null,
              alt: `${item.flavor} natural flavor`,
            },
          ].map((ing, i) => (
            <article
              key={ing.title}
              className={
                "flex flex-col bg-white " +
                (i > 0
                  ? "border-t sm:border-t-0 sm:border-l border-line"
                  : "")
              }
            >
              {ing.image ? (
                <div className="relative w-full aspect-square bg-soft/60 border-b border-line overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ing.image}
                    alt={ing.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full aspect-square bg-soft/60 border-b border-line grid place-items-center">
                  <span className="grid place-items-center w-16 h-16 rounded-full bg-white border border-line">
                    <Icon name={ing.icon} className="w-8 h-8 text-olive" />
                  </span>
                </div>
              )}
              <div className="flex flex-col p-7">
                <h3 className="font-black text-base mb-1">{ing.title}</h3>
                <span className="text-[11px] font-black tracking-[0.1em] uppercase text-olive mb-3">
                  {ing.dose}
                </span>
                <p className="text-sm text-ink/70 leading-relaxed">{ing.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* How to use */}
      <section className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(48px,6vw,80px)] bg-white border-b border-line">
        <div className="max-w-[700px] mb-9">
          <span className="block mb-3 text-olive text-[11px] font-black tracking-[0.14em] uppercase">
            How to use
          </span>
          <h2 className="font-serif font-black text-[clamp(28px,3.5vw,46px)] leading-[1.05] text-balance">
            Make it a simple ritual.
          </h2>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { n: 1, icon: "cup" as IconName, title: "Pour", copy: "One stick into 8–12 oz of cold water." },
            { n: 2, icon: "flask" as IconName, title: "Stir", copy: "Mix or shake until fully dissolved." },
            { n: 3, icon: "clock" as IconName, title: "Time it", copy: "Drink 20–30 minutes before the moment." },
          ].map((step) => (
            <li
              key={step.n}
              className="relative flex flex-col gap-3 p-7 bg-white border border-line rounded-lg"
            >
              <span className="absolute -top-3 left-7 grid place-items-center w-8 h-8 rounded-full bg-olive text-white text-sm font-black">
                {step.n}
              </span>
              <Icon name={step.icon} className="w-9 h-9 text-olive mt-2" />
              <h3 className="font-black text-lg">{step.title}</h3>
              <p className="text-sm text-ink/70 leading-relaxed">{step.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* You might also like (Cure Hydration) */}
      <YouMightAlsoLike currentKey={key} />

      {/* FAQ accordion (Avro Freeform style) */}
      <section className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(48px,6vw,80px)] bg-white border-b border-line">
        <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-16 items-start">
          <div>
            <span className="block mb-3 text-olive text-[11px] font-black tracking-[0.14em] uppercase">
              Questions
            </span>
            <h2 className="font-serif font-black text-[clamp(30px,4vw,52px)] leading-[1.05] mb-4 text-balance">
              {item.short} FAQ
            </h2>
            <p className="text-ink/70 leading-relaxed">
              Important info, kept tidy. Tap a question to expand.
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
                  <span className="grid place-items-center w-7 h-7 rounded-full border border-line text-lg leading-none transition-transform group-open:rotate-45 shrink-0">
                    +
                  </span>
                </summary>
                <p className="pb-5 pr-12 text-ink/70 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Reviews block (second review location like Avro / Cure) */}
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
