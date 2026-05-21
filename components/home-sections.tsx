"use client"

import Link from "next/link"
import { formulas, type FormulaKey, sharedProof, testimonials } from "@/lib/data"
import { ProductVisual } from "@/components/product-visual"
import { Icon } from "@/components/icons"

export function HomeRefHero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr] items-stretch w-full max-w-[1440px] mx-auto border-b border-line bg-white">
      <div className="flex flex-col justify-center px-[clamp(20px,7vw,92px)] py-[clamp(36px,7vw,92px)]">
        <h1
          className="max-w-[520px] mb-5 text-[clamp(48px,8vw,94px)] leading-[0.96] tracking-[-0.01em]"
          style={{ fontFamily: '"Gotham Condensed"', fontWeight: 700 }}
        >
          Calm. Clear. Ready.
        </h1>
        <p
          className="max-w-[520px] text-[#272727] text-[18px] leading-[1.45]"
          style={{ fontFamily: '"Gotham Condensed"', fontWeight: 400 }}
        >
          AVRO is a calm-first daily drink mix made with naturally fermented
          PharmaGABA®, designed to support clarity, composure, and steady energy
          before the moments that matter.
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <Link
            href="/shop"
            className="btn-primary"
            style={{ fontFamily: '"Gotham Condensed"', fontWeight: 800 }}
          >
            Shop AVRO
          </Link>
          <Link
            href="/shop"
            className="btn-secondary"
            style={{ fontFamily: '"Gotham Condensed"', fontWeight: 800 }}
          >
            Find Your Formula
          </Link>
        </div>
      </div>
      <div
        className="relative h-[360px] sm:h-[460px] lg:h-auto lg:min-h-[520px] overflow-hidden isolate"
        aria-label="AVRO social ritual scene"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/lifestyle/kitchen-trio-pink-cocktails.jpg"
          alt="AVRO Energy Fuji Apple stick packet next to a glass of mixed drink at a sunset rooftop dinner"
          className="absolute inset-0 w-full h-full object-cover object-center lg:object-[60%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/45 via-transparent to-transparent" />
      </div>
    </section>
  )
}

export function HomeProofBar() {
  return (
    <section
      className="grid grid-cols-3 w-[min(calc(100%-32px),1250px)] md:w-[min(calc(100%-72px),1250px)] mx-auto mt-5 overflow-hidden border border-line rounded-lg bg-white"
      aria-label="Customer testimonials + social proof"
    >
      {sharedProof.map((item, i) => (
        <div
          key={item.label}
          className={`grid gap-1 px-2 py-3 sm:p-4 text-center ${i > 0 ? "border-l border-line" : ""}`}
        >
          <strong className="text-[16px] sm:text-[22px] leading-tight">{item.stat}</strong>
          <span className="text-ink/60 text-[10px] sm:text-[13px] leading-tight text-balance">{item.label}</span>
        </div>
      ))}
    </section>
  )
}

export function HomeLogicRow() {
  const comparisonRows = [
    ["Push harder", "Settle first", "trending", "leaf"],
    ["More intensity", "More control", "zap", "gauge"],
    ["Spike and crash", "Steady state", "activity", "waves"],
    ["Noise", "Clarity", "volume", "lightbulb"],
  ]

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.2fr_0.9fr] gap-6 w-[min(calc(100%-32px),1250px)] md:w-[min(calc(100%-72px),1250px)] mx-auto py-[clamp(34px,5vw,54px)]">
      <article className="p-[30px] border border-line rounded-lg bg-white/88 shadow-[0_12px_32px_rgba(31,29,24,0.04)]">
        <h2 className="font-serif text-[clamp(28px,3.4vw,42px)] font-black leading-[1.05] mb-3">
          More energy is not always the answer.
        </h2>
        <p className="text-ink/75 leading-relaxed">
          Most products push stimulation. AVRO starts with calm, because calm
          helps create the conditions for clarity, composure, and readiness.
        </p>
      </article>

      <article className="overflow-hidden border border-line rounded-lg bg-white/88 shadow-[0_12px_32px_rgba(31,29,24,0.04)]">
        <div className="grid grid-cols-2">
          <strong className="p-4 text-center bg-[#f7f7f2]">
            Stimulant First
          </strong>
          <strong className="p-4 text-center bg-[#edf3e7]">Calm First</strong>
        </div>
        {comparisonRows.map(([left, right, leftIcon, rightIcon]) => (
          <div key={left} className="grid grid-cols-2">
            <span className="flex items-center gap-2 sm:gap-2.5 min-h-[58px] px-3 py-3 border-t border-line text-[#222] text-[12px] sm:text-sm font-bold">
              <Icon name={leftIcon as any} className="w-4 h-4 sm:w-5 sm:h-5 text-olive shrink-0" />
              {left}
            </span>
            <span className="flex items-center gap-2 sm:gap-2.5 min-h-[58px] px-3 py-3 border-t border-l border-line bg-[rgba(238,244,232,0.56)] text-[#222] text-[12px] sm:text-sm font-bold">
              <Icon name={rightIcon as any} className="w-4 h-4 sm:w-5 sm:h-5 text-olive shrink-0" />
              {right}
            </span>
          </div>
        ))}
      </article>

      <article className="p-[30px] border border-line rounded-lg bg-white/88 shadow-[0_12px_32px_rgba(31,29,24,0.04)]">
        <h2 className="font-serif text-[clamp(28px,3.4vw,42px)] font-black leading-[1.05] mb-3">
          Performance starts with state.
        </h2>
        <div className="flex items-center gap-2 sm:gap-3.5 my-5 flex-wrap">
          <span className="grid place-items-center gap-2 text-center text-[12px] sm:text-[13px] font-extrabold">
            <span className="w-[52px] h-[52px] sm:w-[62px] sm:h-[62px] p-3 sm:p-4 border border-[#bfc3bc] rounded-full">
              <Icon name="leaf" className="w-full h-full text-[#252525]" />
            </span>
            Calm
          </span>
          <b className="text-ink">→</b>
          <span className="grid place-items-center gap-2 text-center text-[12px] sm:text-[13px] font-extrabold">
            <span className="w-[52px] h-[52px] sm:w-[62px] sm:h-[62px] p-3 sm:p-4 border border-[#bfc3bc] rounded-full">
              <Icon name="brain" className="w-full h-full text-[#252525]" />
            </span>
            Clarity
          </span>
          <b className="text-ink">→</b>
          <span className="grid place-items-center gap-2 text-center text-[12px] sm:text-[13px] font-extrabold">
            <span className="w-[52px] h-[52px] sm:w-[62px] sm:h-[62px] p-3 sm:p-4 border border-[#bfc3bc] rounded-full">
              <Icon name="target" className="w-full h-full text-[#252525]" />
            </span>
            Readiness
          </span>
        </div>
        <p className="text-ink/75 leading-relaxed">
          AVRO is built to support the state before the moment.
        </p>
      </article>
    </section>
  )
}

export function HomeProductStrip() {
  const formulaAdditions: Record<FormulaKey, string> = {
    calm: "Magnesium Bisglycinate",
    focus: "Cognigrape®",
    energy: "Natural Caffeine",
  }

  // Front-page strip uses the clean white-background studio packshots.
  // Variety comes from flavor rotation (one signature flavor per formula).
  const stripFlavor: Partial<Record<FormulaKey, string>> = {
    calm: "Blueberry Acai",
    focus: "Pomegranate Raspberry",
    energy: "Orange Tangerine",
  }

  return (
    <section className="w-[min(calc(100%-32px),1250px)] md:w-[min(calc(100%-72px),1250px)] mx-auto py-[clamp(34px,5vw,54px)]">
      <div className="grid grid-cols-1 sm:grid-cols-3 overflow-hidden border border-line rounded-lg bg-white">
        {(Object.keys(formulas) as FormulaKey[]).map((key, i) => {
          return (
            <Link
              key={key}
              href={`/${key}`}
              className={`grid grid-rows-[1fr_auto] min-h-[360px] sm:min-h-[440px] transition-all hover:bg-[#fbfaf6] ${
                i < 2 ? "border-b sm:border-b-0 sm:border-r border-line" : ""
              }`}
            >
              <div className="min-h-[300px] sm:min-h-[390px] p-5 sm:p-6 pb-6 sm:pb-8">
                <ProductVisual
                  keys={[key]}
                  size="medium"
                  flavorIds={{ [key]: stripFlavor[key] } as Partial<Record<FormulaKey, string>>}
                />
              </div>
              <span className="flex items-center justify-center gap-2 px-3 py-3.5 border-t border-line text-[#333] text-[11px] sm:text-[13px] font-extrabold text-center">
                <Icon
                  name={key === "calm" ? "smile" : key === "focus" ? "brain" : "zap"}
                  className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
                />
                PharmaGABA® + {formulaAdditions[key]}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export function HomeMomentGrid() {
  const moments = [
    {
      title: "Golf",
      copy: "Before the first tee. Before the final putt.",
      cta: "Explore Golf",
      icon: "flag",
      url: "/golf",
      image: "/images/lifestyle/golfers-misty-tee-box.jpg",
      alt: "Golfers on a misty tee box at sunrise",
    },
    {
      title: "Work",
      copy: "Before the meeting. Before deep work.",
      cta: "Explore Work",
      icon: "briefcase",
      url: "/work",
      image: "/images/lifestyle/woman-journaling-mug.jpg",
      alt: "Calm morning routine with journal and warm mug",
    },
    {
      title: "Social",
      copy: "Show up present without alcohol.",
      cta: "Explore Social",
      icon: "wine",
      url: "/social",
      image: "/images/lifestyle/coupes-grapefruit-stickpack.jpg",
      alt: "AVRO stickpack styled with grapefruit coupes on a bar",
    },
    {
      title: "Gaming",
      copy: "Before the session. Before the decision.",
      cta: "Explore Gaming",
      icon: "gamepad",
      url: "/gaming",
      image: "/images/lifestyle/focus-iced-drink-headphones.jpg",
      alt: "Iced AVRO drink and headphones at a gaming desk",
    },
  ]

  return (
    <section className="w-[min(calc(100%-32px),1250px)] md:w-[min(calc(100%-72px),1250px)] mx-auto py-[clamp(34px,5vw,54px)]">
      <div className="mb-5 text-center">
        <h2 className="font-serif text-[clamp(28px,3.4vw,42px)] font-black leading-[1.05]">
          Built for pressure sensitive moments.
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {moments.map((m) => (
          <Link
            key={m.title}
            href={m.url}
            className="group flex flex-col gap-2.5 pb-5 overflow-hidden border border-line rounded-lg bg-white/88 shadow-[0_12px_32px_rgba(31,29,24,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(31,29,24,0.08)]"
          >
            <div className="relative h-[180px] sm:h-[160px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.image}
                alt={m.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 right-3 grid place-items-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm">
                <Icon name={m.icon as any} className="w-5 h-5 text-olive-dark" />
              </span>
            </div>
            <h3 className="mx-5 font-serif font-black text-[22px] leading-tight">{m.title}</h3>
            <p className="mx-5 mb-0 text-[#222] text-sm leading-[1.35]">
              {m.copy}
            </p>
            <span className="inline-flex justify-center w-fit mx-5 mt-1 px-4 py-2 border border-[#222] rounded-full text-xs font-extrabold whitespace-nowrap">
              {m.cta}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function HomeScienceGrid() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-6 w-[min(calc(100%-32px),1250px)] md:w-[min(calc(100%-72px),1250px)] mx-auto py-[clamp(34px,5vw,54px)]">
      <article className="p-7 border border-line rounded-lg bg-white/88 shadow-[0_12px_32px_rgba(31,29,24,0.04)]">
        <h2 className="font-serif text-[clamp(28px,3.4vw,42px)] font-black leading-[1.05] mb-3">
          Why GABA matters.
        </h2>
        <p className="text-ink/75 leading-relaxed mb-4">
          GABA is a naturally occurring compound associated with relaxation and
          balance. AVRO uses naturally fermented PharmaGABA® as the foundation
          of every formula.
        </p>
        <div className="flex items-center gap-2 sm:gap-3.5 my-5 flex-wrap">
          <span className="grid place-items-center gap-2 text-center text-[12px] sm:text-[13px] font-extrabold">
            <span className="w-[52px] h-[52px] sm:w-[62px] sm:h-[62px] p-3 sm:p-4 border border-[#bfc3bc] rounded-full">
              <Icon name="flask" className="w-full h-full text-[#252525]" />
            </span>
            Naturally Fermented
          </span>
          <b className="text-ink">→</b>
          <span className="grid place-items-center gap-2 text-center text-[12px] sm:text-[13px] font-extrabold">
            <span className="w-[52px] h-[52px] sm:w-[62px] sm:h-[62px] p-3 sm:p-4 border border-[#bfc3bc] rounded-full">
              <Icon name="leaf" className="w-full h-full text-[#252525]" />
            </span>
            Calm First
          </span>
          <b className="text-ink">→</b>
          <span className="grid place-items-center gap-2 text-center text-[12px] sm:text-[13px] font-extrabold">
            <span className="w-[52px] h-[52px] sm:w-[62px] sm:h-[62px] p-3 sm:p-4 border border-[#bfc3bc] rounded-full">
              <Icon name="shield" className="w-full h-full text-[#252525]" />
            </span>
            In Every Formula
          </span>
        </div>
        <Link
          href="/science"
          className="text-[#245f9a] text-[13px] font-extrabold"
        >
          Learn the Science of AVRO →
        </Link>
      </article>

      <article className="p-7 border border-line rounded-lg bg-white/88 shadow-[0_12px_32px_rgba(31,29,24,0.04)]">
        <h2 className="font-serif text-[clamp(28px,3.4vw,42px)] font-black leading-[1.05] mb-3">
          Every formula starts calm first.
        </h2>
        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <div className="grid grid-cols-[0.9fr_repeat(3,1fr)] min-w-[480px] mx-2 sm:mx-0 overflow-hidden border border-line rounded-md">
          <div></div>
          <strong className="min-h-12 p-3 border-b border-l border-line text-center text-sm">
            Calm
          </strong>
          <strong className="min-h-12 p-3 border-b border-l border-line text-center text-sm">
            Focus
          </strong>
          <strong className="min-h-12 p-3 border-b border-l border-line text-center text-sm">
            Energy
          </strong>

          <span className="min-h-12 p-3 border-b border-line bg-[#f5f5f2] text-xs font-black">
            Shared Foundation
          </span>
          <p className="min-h-12 p-3 border-b border-l border-line text-xs text-center">
            PharmaGABA®
          </p>
          <p className="min-h-12 p-3 border-b border-l border-line text-xs text-center">
            Naturally fermented base
          </p>
          <p className="min-h-12 p-3 border-b border-l border-line text-xs text-center">
            Calm-first logic
          </p>

          <span className="min-h-12 p-3 border-b border-line bg-[#f5f5f2] text-xs font-black">
            Primary Benefit
          </span>
          <p className="min-h-12 p-3 border-b border-l border-line text-xs text-center">
            Relaxation & steady clarity
          </p>
          <p className="min-h-12 p-3 border-b border-l border-line text-xs text-center">
            Clear thinking & attention
          </p>
          <p className="min-h-12 p-3 border-b border-l border-line text-xs text-center">
            Steady energy & lift
          </p>

          <span className="min-h-12 p-3 border-b border-line bg-[#f5f5f2] text-xs font-black">
            Unique Addition
          </span>
          <p className="min-h-12 p-3 border-b border-l border-line text-xs text-center">
            Magnesium
          </p>
          <p className="min-h-12 p-3 border-b border-l border-line text-xs text-center">
            Cognigrape®
          </p>
          <p className="min-h-12 p-3 border-b border-l border-line text-xs text-center">
            Natural Caffeine
          </p>

          <span className="min-h-12 p-3 bg-[#f5f5f2] text-xs font-black">
            Caffeine
          </span>
          <p className="min-h-12 p-3 border-l border-line text-xs text-center">
            0 mg
          </p>
          <p className="min-h-12 p-3 border-l border-line text-xs text-center">
            0 mg
          </p>
          <p className="min-h-12 p-3 border-l border-line text-xs text-center">
            120 mg
          </p>
          </div>
        </div>
      </article>
    </section>
  )
}

export function HomeBenefitRow() {
  const benefits = [
    {
      icon: "smile",
      title: "Supports composure under pressure",
      copy: "Helps you steady first before the moment matters.",
    },
    {
      icon: "target",
      title: "Supports clear-headed readiness",
      copy: "Helps you feel calm, clear, and in control.",
    },
    {
      icon: "waves",
      title: "Supports calm without sedation",
      copy: "Designed to support composure without turning you off.",
    },
  ] as const

  return (
    <section className="w-[min(calc(100%-32px),1250px)] md:w-[min(calc(100%-72px),1250px)] mx-auto pt-[clamp(20px,3vw,32px)]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {benefits.map((b) => (
          <article
            key={b.title}
            className="flex items-start gap-4 p-5 border border-line rounded-lg bg-white/88 shadow-[0_12px_32px_rgba(31,29,24,0.04)]"
          >
            <span className="grid place-items-center w-12 h-12 shrink-0 rounded-full border border-dashed border-[#bfc3bc]">
              <Icon name={b.icon} className="w-6 h-6 text-olive-dark" />
            </span>
            <div>
              <h3 className="mb-1 text-[15px] font-extrabold leading-tight">
                {b.title}
              </h3>
              <p className="m-0 text-ink/70 text-sm leading-snug">{b.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function HomeQualityRow() {
  const badges = [
    { icon: "leaf", label: "Naturally Fermented", sub: "PharmaGABA®" },
    { icon: "shield-check", label: "Quality Ingredients", sub: "You can trust" },
    { icon: "microscope", label: "Third-Party", sub: "Tested" },
    { icon: "sprout", label: "Vegan", sub: "Plant-based" },
    { icon: "wheat", label: "Gluten Free", sub: "Always" },
    { icon: "flag", label: "Made in the USA", sub: "GMP Compliant" },
  ] as const

  return (
    <section className="w-[min(calc(100%-32px),1250px)] md:w-[min(calc(100%-72px),1250px)] mx-auto py-[clamp(20px,3vw,32px)]">
      <div className="mb-4 px-1">
        <span className="text-olive text-xs font-black tracking-[0.12em] uppercase">
          Quality you can understand
        </span>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-0 overflow-hidden border border-line rounded-lg bg-white/88">
        {badges.map((b, i) => (
          <div
            key={b.label}
            className={`flex flex-col items-center gap-2 px-3 py-5 text-center ${
              i > 0 ? "border-l border-line" : ""
            } ${i >= 3 ? "border-t md:border-t-0" : ""}`}
          >
            <span className="grid place-items-center w-12 h-12 rounded-full border border-dashed border-[#bfc3bc]">
              <Icon name={b.icon} className="w-6 h-6 text-olive-dark" />
            </span>
            <strong className="text-[12px] leading-tight">{b.label}</strong>
            <span className="text-ink/55 text-[11px] leading-tight">
              {b.sub}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export function HomeStoryStrip() {
  return (
    <section className="w-[min(calc(100%-32px),1250px)] md:w-[min(calc(100%-72px),1250px)] mx-auto py-[clamp(34px,5vw,54px)]">
      <div className="overflow-hidden border border-line rounded-lg bg-white/88 shadow-[0_12px_32px_rgba(31,29,24,0.04)]">
        {/* Top: copy block, full width */}
        <div className="p-8 lg:p-12 flex flex-col items-start max-w-[800px]">
          <h2 className="font-serif text-[clamp(28px,3.4vw,42px)] font-black leading-[1.05] mb-3">
            Science-backed. Founder-driven.
          </h2>
          <p className="text-ink/75 leading-relaxed max-w-[60ch]">
            AVRO was built by Keigo Sugawara and Peter van Stolk for people who
            wanted a better option before the moments that matter. Every
            formula is backed by research and designed for real routines.
          </p>
          <div className="flex gap-3 mt-6">
            <Link href="/why-avro" className="btn-secondary text-sm">
              Our Story
            </Link>
            <Link href="/science" className="btn-secondary text-sm">
              The Science
            </Link>
          </div>
        </div>
        {/* Bottom: full-width two-image split.
            On mobile the images stack (fermentation on top, founders below).
            On md+ they sit side-by-side with founders getting the wider panel
            so both Keigo and Peter fit naturally without cropping. */}
        <div className="relative grid grid-cols-1 md:grid-cols-[38%_62%] min-h-[260px] md:min-h-[360px] lg:min-h-[440px] bg-ink">
          <div className="relative overflow-hidden min-h-[220px] md:min-h-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/science/fermentation-lab.jpg"
              alt="Stainless steel fermentation vessel cultivating naturally fermented PharmaGABA"
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ filter: "grayscale(1) contrast(1.05) brightness(0.98)" }}
            />
          </div>
          <div className="relative overflow-hidden min-h-[260px] md:min-h-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/team/founders-keigo-peter.jpg"
              alt="AVRO co-founders Keigo Sugawara and Peter van Stolk"
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ filter: "grayscale(1) contrast(1.05) brightness(0.98)" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export function HomeRitualSection() {
  const steps = [
    {
      num: 1,
      icon: "cup",
      text: "Pour one stick into 8–12 oz of cold water.",
      color: "#245f9a",
    },
    {
      num: 2,
      icon: "clock",
      text: "Mix until fully dissolved.",
      color: "var(--olive)",
    },
    {
      num: 3,
      icon: "target",
      text: "Drink about 30 minutes before your moment.",
      color: "#d57912",
    },
  ]

  return (
    <section className="w-[min(calc(100%-72px),1250px)] mx-auto pt-3 pb-[clamp(34px,5vw,54px)]">
      <div className="mb-5 text-center">
        <span className="block mb-3 text-olive text-xs font-black tracking-[0.12em] uppercase">
          Simple ritual
        </span>
        <h2 className="font-serif text-[clamp(28px,3.4vw,42px)] font-black leading-[1.05]">
          How to use AVRO.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((step) => (
          <article
            key={step.num}
            className="grid grid-cols-[34px_48px_1fr] gap-4 items-center p-5 border border-line rounded-lg bg-white/88 shadow-[0_12px_32px_rgba(31,29,24,0.04)]"
          >
            <strong
              className="grid place-items-center w-6.5 h-6.5 text-white rounded-full text-[13px]"
              style={{ background: step.color }}
            >
              {step.num}
            </strong>
            <Icon name={step.icon as any} className="w-10 h-10" />
            <p className="m-0 text-[#252525] text-sm leading-[1.35]">
              {step.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
