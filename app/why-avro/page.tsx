import Link from "next/link"
import {
  Section,
  SectionHeading,
  CtaGroup,
  SocialProof,
  ProductCards,
  FormulaLogic,
  FinalCta,
  InfoCard,
} from "@/components/sections"

export const metadata = {
  title: "Why AVRO | AVRO",
  description: "State before stimulation. AVRO is built on a simple idea: when the moment matters, more stimulation is not always the answer.",
}

export default function WhyPage() {
  return (
    <>
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(28px,6vw,80px)] items-center w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(42px,8vw,86px)] bg-gradient-to-br from-[#fffdf8] to-[#f7f4ec] border-b border-line">
        <div className="max-w-[620px]">
          <span className="block mb-3 text-olive text-xs font-black tracking-[0.12em] uppercase">
            Why AVRO
          </span>
          <h1 className="font-serif font-black text-[clamp(46px,7vw,86px)] leading-[0.98] mb-5">
            State before stimulation.
          </h1>
          <p className="max-w-[560px] text-muted text-[clamp(17px,2vw,20px)] leading-relaxed">
            AVRO is built on a simple idea: when the moment matters, more
            stimulation is not always the answer. Start calmer, stay clearer,
            and choose the support that fits the day.
          </p>
          <CtaGroup primary="Find Your Formula" secondary="Shop AVRO" />
        </div>
        <div className="grid place-items-center gap-4.5 min-h-[420px] p-11 bg-gradient-to-br from-[#f9f5ed] to-white border border-line rounded-lg shadow-[0_22px_70px_rgba(30,29,24,0.1)]">
          <div className="w-full max-w-[420px] p-6 text-white font-serif text-[42px] bg-calm rounded-lg shadow-[0_22px_70px_rgba(30,29,24,0.1)]">
            Calm
          </div>
          <div className="w-full max-w-[420px] p-6 text-white font-serif text-[42px] bg-focus rounded-lg shadow-[0_22px_70px_rgba(30,29,24,0.1)] translate-x-7.5">
            Clear
          </div>
          <div className="w-full max-w-[420px] p-6 text-ink font-serif text-[42px] bg-energy rounded-lg shadow-[0_22px_70px_rgba(30,29,24,0.1)] -translate-x-6">
            Lift
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading title="AVRO is different by design." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
          <InfoCard icon="leaf" title="Calm comes first">
            Every formula starts with naturally fermented PharmaGABA® as part of
            the calm-first foundation.
          </InfoCard>
          <InfoCard icon="target" title="Support the moment">
            Calm, Focus, and Energy each support a different kind of readiness
            while staying rooted in the same system.
          </InfoCard>
          <InfoCard icon="shield" title="No stimulant culture">
            AVRO is not built around hype language or more-is-more energy
            positioning.
          </InfoCard>
        </div>
      </Section>

      <ProductCards title="Choose the state that fits your moment." shopLabel="Shop" />
      <FormulaLogic />
      <SocialProof mode="compact" />
      <FinalCta
        title="Less noise. More control."
        copy="Choose the formula that supports the state before the moment."
      />
    </>
  )
}
