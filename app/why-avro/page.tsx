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
      <section className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(56px,9vw,112px)] bg-gradient-to-br from-[#fffdf8] to-[#f7f4ec] border-b border-line">
        <div className="flex flex-col items-center text-center max-w-[820px] mx-auto">
          <h1 className="font-serif font-black text-[clamp(46px,7vw,86px)] leading-[0.98] mb-5 text-balance">
            State before stimulation.
          </h1>
          <p className="max-w-[640px] text-muted-foreground text-[clamp(17px,2vw,20px)] leading-relaxed text-pretty">
            AVRO was built on a simple observation: in many moments that matter
            most, people do not need more energy. They need more control. More
            energy is not the same as more control.
          </p>
          <div className="flex flex-wrap justify-center">
            <CtaGroup primary="Find Your Formula" secondary="Shop AVRO" />
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
