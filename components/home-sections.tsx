"use client"

import Link from "next/link"
import { formulas, type FormulaKey, sharedProof, testimonials } from "@/lib/data"
import { ProductVisual } from "@/components/product-visual"
import { Icon } from "@/components/icons"

export function HomeRefHero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr] items-stretch w-full max-w-[1440px] min-h-[520px] mx-auto border-b border-line bg-white">
      <div className="flex flex-col justify-center p-[clamp(42px,7vw,92px)] lg:p-[clamp(42px,7vw,92px)_clamp(24px,7vw,78px)]">
        <h1 className="max-w-[520px] mb-5 font-sans text-[clamp(58px,8vw,94px)] font-black leading-[0.96]">
          Calm. Clear. Ready.
        </h1>
        <p className="max-w-[520px] text-[#272727] text-[17px] leading-[1.55]">
          AVRO is a calm-first daily drink mix made with naturally fermented
          PharmaGABA®, designed to support clarity, composure, and steady energy
          before the moments that matter.
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <Link href="/shop" className="btn-primary">
            Shop AVRO
          </Link>
          <Link href="/shop" className="btn-secondary">
            Find Your Formula
          </Link>
        </div>
      </div>
      <div
        className="relative min-h-[520px] overflow-hidden isolate"
        style={{
          background: `
            radial-gradient(circle at 76% 46%, rgba(247, 205, 107, 0.75) 0 9%, transparent 10%),
            radial-gradient(circle at 28% 24%, rgba(87, 68, 48, 0.32) 0 9%, transparent 10%),
            linear-gradient(135deg, rgba(251, 247, 238, 0.2), rgba(143, 112, 72, 0.2)),
            linear-gradient(120deg, #f5eddf 0%, #fffaf0 48%, #d9bc8e 100%)
          `,
        }}
        aria-label="AVRO social ritual scene"
      >
        <div
          className="absolute inset-0 opacity-75"
          style={{
            background: `
              linear-gradient(90deg, rgba(255, 255, 255, 0.22), transparent 28%),
              repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.16) 0 2px, transparent 2px 28px)
            `,
          }}
        />
        <div
          className="absolute inset-[8%_5%_auto_8%] h-[43%] z-[1] opacity-[0.82] blur-[2px]"
          style={{
            background: `
              radial-gradient(circle at 18% 34%, #3b2b1d 0 8%, transparent 8.5%),
              radial-gradient(circle at 22% 64%, #d8b088 0 16%, transparent 16.5%),
              radial-gradient(circle at 78% 30%, #7d4c2d 0 7%, transparent 7.5%),
              radial-gradient(circle at 74% 64%, #f1d5b5 0 15%, transparent 15.5%)
            `,
          }}
        />
        <div
          className="absolute left-[36%] bottom-[18%] z-[3] w-[170px] h-[160px] border-5 border-t-0 border-white/85 rounded-b-[42px]"
          style={{
            background: `
              radial-gradient(circle at 50% 24%, rgba(255, 245, 210, 0.85) 0 12%, transparent 13%),
              linear-gradient(180deg, transparent 0 28%, rgba(74, 35, 12, 0.88) 29% 100%)
            `,
            boxShadow: "0 20px 55px rgba(74, 41, 16, 0.28)",
          }}
        />
        <div className="absolute right-[24%] bottom-[12%] z-[4]">
          <ProductVisual keys={["calm"]} scene="social" size="small" />
        </div>
      </div>
    </section>
  )
}

export function HomeProofBar() {
  return (
    <section
      className="grid grid-cols-3 w-[min(calc(100%-72px),1250px)] mx-auto mt-5 overflow-hidden border border-line rounded-lg bg-white"
      aria-label="Customer testimonials + social proof"
    >
      {sharedProof.map((item, i) => (
        <div
          key={item.label}
          className={`grid gap-1 p-4 text-center ${i > 0 ? "border-l border-line" : ""}`}
        >
          <strong className="text-[22px]">{item.stat}</strong>
          <span className="text-ink/60 text-[13px]">{item.label}</span>
        </div>
      ))}
    </section>
  )
}

export function HomeLogicRow() {
  const comparisonRows = [
    ["Push harder", "Settle first", "bolt", "leaf"],
    ["More intensity", "More control", "bolt", "target"],
    ["Spike and crash", "Steady state", "card", "brain"],
    ["Noise", "Clarity", "users", "star"],
  ]

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.2fr_0.9fr] gap-6 w-[min(calc(100%-72px),1250px)] mx-auto py-[clamp(34px,5vw,54px)]">
      <article className="p-[30px] border border-line rounded-lg bg-white/88 shadow-[0_12px_32px_rgba(31,29,24,0.04)]">
        <h2 className="font-sans text-[clamp(26px,3vw,38px)] font-black leading-[1.08] mb-3">
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
            <span className="flex items-center gap-2.5 min-h-[58px] px-4 py-3 border-t border-line text-[#222] text-sm font-bold">
              <Icon name={leftIcon as any} className="w-5 h-5 text-olive" />
              {left}
            </span>
            <span className="flex items-center gap-2.5 min-h-[58px] px-4 py-3 border-t border-l border-line bg-[rgba(238,244,232,0.56)] text-[#222] text-sm font-bold">
              <Icon name={rightIcon as any} className="w-5 h-5 text-olive" />
              {right}
            </span>
          </div>
        ))}
      </article>

      <article className="p-[30px] border border-line rounded-lg bg-white/88 shadow-[0_12px_32px_rgba(31,29,24,0.04)]">
        <h2 className="font-sans text-[clamp(26px,3vw,38px)] font-black leading-[1.08] mb-3">
          Performance starts with state.
        </h2>
        <div className="flex items-center gap-3.5 my-5">
          <span className="grid place-items-center gap-2 text-center text-[13px] font-extrabold">
            <span className="w-[62px] h-[62px] p-4 border border-[#bfc3bc] rounded-full">
              <Icon name="leaf" className="w-full h-full text-[#252525]" />
            </span>
            Calm
          </span>
          <b className="text-ink">→</b>
          <span className="grid place-items-center gap-2 text-center text-[13px] font-extrabold">
            <span className="w-[62px] h-[62px] p-4 border border-[#bfc3bc] rounded-full">
              <Icon name="brain" className="w-full h-full text-[#252525]" />
            </span>
            Clarity
          </span>
          <b className="text-ink">→</b>
          <span className="grid place-items-center gap-2 text-center text-[13px] font-extrabold">
            <span className="w-[62px] h-[62px] p-4 border border-[#bfc3bc] rounded-full">
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

  return (
    <section className="w-[min(calc(100%-72px),1250px)] mx-auto py-[clamp(34px,5vw,54px)]">
      <div className="grid grid-cols-3 overflow-hidden border border-line rounded-lg bg-white">
        {(Object.keys(formulas) as FormulaKey[]).map((key, i) => {
          const item = formulas[key]
          return (
            <Link
              key={key}
              href={`/${key}`}
              className={`grid grid-rows-[1fr_auto] min-h-[360px] transition-all hover:bg-[#fbfaf6] ${i < 2 ? "border-r border-line" : ""}`}
            >
              <div className="min-h-[310px] p-6 pb-8">
                <ProductVisual keys={[key]} scene={key} size="medium" />
              </div>
              <span className="flex items-center justify-center gap-2.5 px-4 py-3.5 border-t border-line text-[#333] text-[13px] font-extrabold">
                <Icon
                  name={key === "calm" ? "shield" : key === "focus" ? "brain" : "bolt"}
                  className="w-5 h-5"
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
      tone: "golf",
      gradient: "linear-gradient(135deg, #edf2e7, #c8d6b4)",
    },
    {
      title: "Work",
      copy: "Before the meeting. Before deep work.",
      cta: "Explore Work",
      icon: "monitor",
      url: "/work",
      tone: "work",
      gradient: "linear-gradient(135deg, #f7f7f4, #d7d8d2)",
    },
    {
      title: "Social",
      copy: "Show up present without alcohol.",
      cta: "Explore Social",
      icon: "users",
      url: "/social",
      tone: "social",
      gradient: "linear-gradient(135deg, #f4ddbe, #9b6744)",
    },
    {
      title: "Gaming",
      copy: "Before the session. Before the decision.",
      cta: "Explore Gaming",
      icon: "card",
      url: "/gaming",
      tone: "gaming",
      gradient: "linear-gradient(135deg, #dce5ff, #222b4c)",
    },
  ]

  return (
    <section className="w-[min(calc(100%-72px),1250px)] mx-auto py-[clamp(34px,5vw,54px)]">
      <div className="mb-5 text-center">
        <h2 className="font-sans text-[clamp(26px,3vw,38px)] font-black leading-[1.08]">
          Built for pressure sensitive moments.
        </h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {moments.map((m) => (
          <Link
            key={m.title}
            href={m.url}
            className="grid gap-2.5 pb-5 overflow-hidden border border-line rounded-lg bg-white/88 shadow-[0_12px_32px_rgba(31,29,24,0.04)]"
          >
            <div
              className="grid place-items-end h-[118px] p-4"
              style={{ background: m.gradient }}
            >
              <span className="w-11 h-11 p-2.5 rounded-full bg-white/85">
                <Icon name={m.icon as any} className="w-full h-full" />
              </span>
            </div>
            <h3 className="mx-5 font-bold">{m.title}</h3>
            <p className="mx-5 mb-0 text-[#222] text-sm leading-[1.35]">
              {m.copy}
            </p>
            <span className="inline-flex justify-center w-fit min-w-[134px] mx-5 mt-1 px-3.5 py-2 border border-[#222] rounded-[5px] text-xs font-extrabold">
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
    <section className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-6 w-[min(calc(100%-72px),1250px)] mx-auto py-[clamp(34px,5vw,54px)]">
      <article className="p-7 border border-line rounded-lg bg-white/88 shadow-[0_12px_32px_rgba(31,29,24,0.04)]">
        <h2 className="font-sans text-[clamp(26px,3vw,38px)] font-black leading-[1.08] mb-3">
          Why GABA matters.
        </h2>
        <p className="text-ink/75 leading-relaxed mb-4">
          GABA is a naturally occurring compound associated with relaxation and
          balance. AVRO uses naturally fermented PharmaGABA® as the foundation
          of every formula.
        </p>
        <div className="flex items-center gap-3.5 my-5">
          <span className="grid place-items-center gap-2 text-center text-[13px] font-extrabold">
            <span className="w-[62px] h-[62px] p-4 border border-[#bfc3bc] rounded-full">
              <Icon name="flask" className="w-full h-full text-[#252525]" />
            </span>
            Naturally Fermented
          </span>
          <b className="text-ink">→</b>
          <span className="grid place-items-center gap-2 text-center text-[13px] font-extrabold">
            <span className="w-[62px] h-[62px] p-4 border border-[#bfc3bc] rounded-full">
              <Icon name="leaf" className="w-full h-full text-[#252525]" />
            </span>
            Calm First
          </span>
          <b className="text-ink">→</b>
          <span className="grid place-items-center gap-2 text-center text-[13px] font-extrabold">
            <span className="w-[62px] h-[62px] p-4 border border-[#bfc3bc] rounded-full">
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
        <h2 className="font-sans text-[clamp(26px,3vw,38px)] font-black leading-[1.08] mb-3">
          Every formula starts calm first.
        </h2>
        <div className="grid grid-cols-[0.9fr_repeat(3,1fr)] overflow-hidden border border-line rounded-md">
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
      </article>
    </section>
  )
}

export function HomeStoryStrip() {
  return (
    <section className="w-[min(calc(100%-72px),1250px)] mx-auto py-[clamp(34px,5vw,54px)]">
      <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1fr_1fr] gap-0 overflow-hidden border border-line rounded-lg bg-white/88 shadow-[0_12px_32px_rgba(31,29,24,0.04)]">
        <div className="p-8">
          <h2 className="font-sans text-[clamp(26px,3vw,38px)] font-black leading-[1.08] mb-3">
            Science-backed. Founder-driven.
          </h2>
          <p className="text-ink/75 leading-relaxed">
            AVRO was built by people who wanted a better option before the
            moments that matter. Every formula is backed by research and
            designed for real routines.
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
        <div
          className="min-h-[220px]"
          style={{
            background: `
              radial-gradient(circle at 52% 44%, rgba(255,255,255,0.8) 0 9%, transparent 10%),
              repeating-linear-gradient(90deg, rgba(255,255,255,0.46) 0 9px, transparent 9px 54px),
              linear-gradient(135deg, #e8e7e1, #a9aaa4)
            `,
          }}
        />
        <div
          className="min-h-[220px]"
          style={{
            background: `
              radial-gradient(circle at 34% 34%, #d5d5d2 0 11%, transparent 12%),
              radial-gradient(circle at 68% 32%, #c9c9c7 0 11%, transparent 12%),
              radial-gradient(circle at 36% 76%, #202020 0 22%, transparent 23%),
              radial-gradient(circle at 70% 76%, #161616 0 23%, transparent 24%),
              linear-gradient(135deg, #f2f2ef, #cfcfca)
            `,
          }}
        />
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
        <h2 className="font-sans text-[clamp(26px,3vw,38px)] font-black leading-[1.08]">
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
