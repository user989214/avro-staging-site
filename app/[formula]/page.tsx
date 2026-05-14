import Link from "next/link"
import { notFound } from "next/navigation"
import { formulas, type FormulaKey } from "@/lib/data"
import { ProductVisual } from "@/components/product-visual"
import {
  Section,
  SectionHeading,
  SocialProof,
  FaqBlock,
  FinalCta,
  InfoCard,
} from "@/components/sections"
import { Icon } from "@/components/icons"

const validFormulas = ["calm", "focus", "energy"] as const

const benefits: Record<FormulaKey, [string, string, "brain" | "target" | "users" | "bolt" | "leaf"][]> = {
  calm: [
    ["Supports composure under pressure", "Helps you steady first before the moment matters.", "brain"],
    ["Supports clear-headed readiness", "Helps you feel calm, clear, and in control.", "target"],
    ["Supports calm without sedation", "Designed to support composure without turning you off.", "users"],
  ],
  focus: [
    ["Supports clear thinking", "Helps you stay sharp when the work demands attention.", "brain"],
    ["Supports steady attention", "Helps you stay with the task without adding noise.", "target"],
    ["Supports focus without overload", "Designed to support concentration without stimulant culture.", "users"],
  ],
  energy: [
    ["Supports steady energy", "Helps you show up with lift and control when the moment calls for more energy.", "bolt"],
    ["Supports clear-headed readiness", "Helps you feel energized, clear, and composed.", "brain"],
    ["Supports energy without chaos", "Designed to support controlled lift without turning into stimulant culture.", "leaf"],
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

  const supportText =
    key === "energy"
      ? "steady energy, clarity, and controlled lift"
      : key === "focus"
        ? "clarity, concentration, and controlled readiness"
        : "composure, clarity, and controlled readiness"

  const designedFor =
    key === "energy"
      ? "demanding days."
      : key === "focus"
        ? "demanding mental moments."
        : "pressure-sensitive moments."

  const wantText =
    key === "energy"
      ? "more lift without losing control"
      : key === "focus"
        ? "clearer readiness before attention-heavy moments"
        : "to feel steadier before demanding moments"

  return (
    <>
      {/* PDP Hero */}
      <section
        className="grid grid-cols-1 lg:grid-cols-[minmax(280px,1fr)_minmax(280px,0.8fr)_minmax(310px,0.68fr)] gap-7 items-center w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(42px,8vw,86px)] border-b border-line"
        style={
          {
            "--theme": item.color,
            "--theme-accent": item.accent,
            background: `linear-gradient(90deg, #fffdf8 0%, rgba(255,255,255,0.88) 45%, rgba(246,242,234,0.82) 100%), radial-gradient(circle at 50% 30%, ${item.accent}, transparent 35%)`,
          } as React.CSSProperties
        }
      >
        <div className="max-w-[620px]">
          <span className="block mb-3 text-olive text-xs font-black tracking-[0.12em] uppercase">
            {item.name}
          </span>
          <h1 className="font-serif font-black text-[clamp(42px,5vw,68px)] leading-[0.98] mb-5">
            {item.headline}
          </h1>
          <p className="max-w-[560px] text-muted text-[clamp(17px,2vw,20px)] leading-relaxed">
            {item.name} is a calm-first daily drink mix built with naturally
            fermented PharmaGABA® to support {supportText} before
            pressure-sensitive moments.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-9 max-w-[560px]">
            <span className="flex flex-col gap-2 text-olive-dark text-[13px] font-extrabold">
              <Icon name="leaf" className="w-8.5 h-8.5 text-olive" />
              Calm-First Foundation
            </span>
            <span className="flex flex-col gap-2 text-olive-dark text-[13px] font-extrabold">
              <Icon name="flask" className="w-8.5 h-8.5 text-olive" />
              Science Rooted
            </span>
            <span className="flex flex-col gap-2 text-olive-dark text-[13px] font-extrabold">
              <Icon name="users" className="w-8.5 h-8.5 text-olive" />
              Made for Real Life
            </span>
          </div>
        </div>

        <ProductVisual keys={[key]} scene={key} className="min-h-[500px]" />

        {/* Buy Box */}
        <aside className="grid gap-3 p-6 bg-white/90 border border-line rounded-lg shadow-[0_10px_30px_rgba(31,29,24,0.04)]">
          <h2 className="font-sans font-black text-[28px]">{item.name}</h2>
          <p className="text-muted">{item.flavor}</p>
          <div className="text-[#b66f19] font-black">
            ★★★★★{" "}
            <span className="text-muted font-bold">
              4.8 ({key === "calm" ? "82" : key === "focus" ? "62" : "76"}{" "}
              reviews)
            </span>
          </div>
          <label className="flex gap-2.5 items-center p-3 border border-line rounded-[7px] cursor-pointer">
            <input type="radio" name="purchase" className="accent-olive" />
            One-time purchase
          </label>
          <label className="flex gap-2.5 items-center p-3 border border-line rounded-[7px] cursor-pointer">
            <input
              type="radio"
              name="purchase"
              defaultChecked
              className="accent-olive"
            />
            Subscribe & Save 25%
          </label>
          <div className="flex gap-2">
            <button className="min-h-[38px] px-3 border border-line rounded-[7px] bg-white hover:bg-gray-50">
              10 Sticks
            </button>
            <button className="min-h-[38px] px-3 border border-line rounded-[7px] bg-white hover:bg-gray-50">
              30 Sticks
            </button>
            <button className="min-h-[38px] px-3 border border-line rounded-[7px] bg-white hover:bg-gray-50">
              60 Sticks
            </button>
          </div>
          <strong className="text-[34px]">{item.price}</strong>
          <div className="flex gap-2">
            <button className="min-h-[38px] px-3 border border-line rounded-[7px] bg-white hover:bg-gray-50">
              -
            </button>
            <span className="grid place-items-center min-w-[44px] border border-line rounded-[7px]">
              1
            </span>
            <button className="min-h-[38px] px-3 border border-line rounded-[7px] bg-white hover:bg-gray-50">
              +
            </button>
          </div>
          <Link
            href="/shop"
            className={`btn-primary w-full ${
              key === "calm"
                ? "!bg-calm"
                : key === "focus"
                  ? "!bg-focus"
                  : "!bg-energy !text-ink"
            }`}
          >
            Add to Cart
          </Link>
          <small className="text-center text-muted">
            Free Shipping Over $50
          </small>
        </aside>
      </section>

      {/* Benefits */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
          {benefits[key].map(([title, copy, iconName]) => (
            <InfoCard key={title} icon={iconName} title={title}>
              {copy}
            </InfoCard>
          ))}
        </div>
      </Section>

      {/* About */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(28px,6vw,80px)]">
          <div>
            <span className="block mb-3 text-olive text-xs font-black tracking-[0.12em] uppercase">
              About this formula
            </span>
            <h2 className="font-serif font-black text-[clamp(30px,4vw,52px)] leading-[1.05] mb-3.5">
              Designed for {designedFor}
            </h2>
            <p className="text-muted leading-relaxed">
              {item.name} is for people who want {wantText}. Use it before
              meetings, travel, social situations, rounds, sessions, or any
              moment where your state matters.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <InfoCard icon="users" title="Who it&apos;s for">
              Golfers, founders, operators, developers, students, creators,
              athletes, and anyone who wants calm-first support.
            </InfoCard>
            <InfoCard icon="clock" title="When to use">
              About 20 to 30 minutes before the moment you want to feel clear,
              calm, and composed.
            </InfoCard>
            <InfoCard icon="shield" title="What it supports">
              {item.support} Daily ritual behavior and calm-first readiness.
            </InfoCard>
          </div>
        </div>
      </Section>

      {/* Ingredients */}
      <Section>
        <SectionHeading eyebrow="What&apos;s inside" title="Clear ingredient logic." centered={false} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 bg-white/72 border border-line rounded-lg overflow-hidden">
          {[
            [
              "PharmaGABA®",
              "200 mg GABA equivalent to 250 mg PharmaGABA®. Naturally fermented and selected as AVRO's calm-first foundation.",
            ],
            [
              item.addition,
              key === "calm"
                ? "550 mg. Supports normal muscle and nervous system function."
                : key === "focus"
                  ? "250 mg. Selected to support clarity and focus."
                  : "120 mg. Supports steady energy and alertness with calm built in.",
            ],
            [
              "Prebiotic Fiber Blend",
              "PHGG + Acacia Gum. Part of AVRO's daily formula system.",
            ],
            [
              "Stevia",
              "2% or less. Used in a small amount for a clean, balanced finish.",
            ],
            [
              "Natural Flavor System",
              `${item.flavor}. Bright, clean flavor.`,
            ],
          ].map(([title, copy], i) => (
            <article
              key={title}
              className={`p-7 text-center ${i > 0 ? "border-t sm:border-t-0 sm:border-l border-line" : ""}`}
            >
              <div className="w-[84px] h-[84px] mx-auto mb-4.5 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fff,transparent_25%),linear-gradient(135deg,#e2d4bf,#f7f2e9)]" />
              <h3 className="font-black text-lg mb-2.5">{title}</h3>
              <p className="text-muted">{copy}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Steps */}
      <Section>
        <SectionHeading eyebrow="How to use" title="Make it a simple ritual." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <article className="relative p-7 bg-white/72 border border-line rounded-lg shadow-[0_10px_30px_rgba(31,29,24,0.04)]">
            <strong className="grid place-items-center w-7.5 h-7.5 mb-4.5 text-white bg-olive rounded-full">
              1
            </strong>
            <Icon name="cup" className="w-10.5 h-10.5 mb-3 text-olive" />
            <h3 className="font-black text-lg mb-2">Mix</h3>
            <p className="text-muted">
              Pour one stick into 8 to 12 oz of cold water.
            </p>
          </article>
          <article className="relative p-7 bg-white/72 border border-line rounded-lg shadow-[0_10px_30px_rgba(31,29,24,0.04)]">
            <strong className="grid place-items-center w-7.5 h-7.5 mb-4.5 text-white bg-olive rounded-full">
              2
            </strong>
            <Icon name="flask" className="w-10.5 h-10.5 mb-3 text-olive" />
            <h3 className="font-black text-lg mb-2">Stir or shake</h3>
            <p className="text-muted">Mix well until fully dissolved.</p>
          </article>
          <article className="relative p-7 bg-white/72 border border-line rounded-lg shadow-[0_10px_30px_rgba(31,29,24,0.04)]">
            <strong className="grid place-items-center w-7.5 h-7.5 mb-4.5 text-white bg-olive rounded-full">
              3
            </strong>
            <Icon name="clock" className="w-10.5 h-10.5 mb-3 text-olive" />
            <h3 className="font-black text-lg mb-2">Time it</h3>
            <p className="text-muted">
              Use about 20 to 30 minutes before the moment you want to support.
            </p>
          </article>
        </div>
      </Section>

      <SocialProof mode="full" />

      {/* Product Promos */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
          <article className="grid grid-cols-[0.75fr_1fr] items-center gap-3 p-6 bg-white/72 border border-line rounded-lg">
            <ProductVisual keys={[key]} className="min-h-[240px]" />
            <div>
              <h2 className="font-serif font-black text-2xl mb-3.5">
                Subscribe & Save 25%
              </h2>
              <p className="text-muted mb-4">
                25% off every order, free shipping, and flexible routine
                support.
              </p>
              <Link href="/shop" className="btn-primary">
                Subscribe & Save
              </Link>
            </div>
          </article>
          <article className="grid grid-cols-[0.75fr_1fr] items-center gap-3 p-6 bg-white/72 border border-line rounded-lg">
            <ProductVisual
              keys={["calm", "focus", "energy"]}
              className="min-h-[240px]"
            />
            <div>
              <h2 className="font-serif font-black text-2xl mb-3.5">
                Build Your Bundle
              </h2>
              <p className="text-muted mb-4">
                Mix Calm, Focus, and Energy. Save 20% when you bundle.
              </p>
              <Link href="/shop" className="btn-secondary">
                Build Bundle
              </Link>
            </div>
          </article>
        </div>
      </Section>

      <FaqBlock
        title={`${item.short} FAQ`}
        faqs={[
          [
            `What is ${item.name}?`,
            `${item.name} is a calm-first daily drink mix designed to support ${item.support.toLowerCase()}`,
          ],
          [
            `Does ${item.name} contain caffeine?`,
            item.caffeine === "No caffeine"
              ? `${item.name} is caffeine free.`
              : `${item.name} contains 120 mg natural caffeine.`,
          ],
          [
            "Can I take it every day?",
            "AVRO can fit into a daily routine. Choose timing and formula based on your caffeine preference and moment.",
          ],
        ]}
      />

      <FinalCta title={item.headline} copy={`Support ${item.support.toLowerCase()} for the moments that matter.`} />
    </>
  )
}
