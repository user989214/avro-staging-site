import {
  Section,
  SectionHeading,
  CtaGroup,
  SocialProof,
  ProductCards,
  FormulaLogic,
  FaqBlock,
  FinalCta,
  InfoCard,
} from "@/components/sections"
import { Icon } from "@/components/icons"

export const metadata = {
  title: "The Science of AVRO | AVRO",
  description: "Calm first. Backed by science. Every AVRO formula starts with naturally fermented PharmaGABA®.",
}

export default function SciencePage() {
  return (
    <>
      {/* Hero */}
      <section className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(56px,9vw,112px)] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.85),transparent_42%),linear-gradient(180deg,#fffdf8_0%,#f4efe5_100%)] border-b border-line">
        <div className="flex flex-col items-center text-center max-w-[820px] mx-auto">
          <h1 className="font-serif font-black text-[clamp(46px,7vw,86px)] leading-[0.98] mb-5 text-balance">
            Calm first. Backed by science.
          </h1>
          <p className="max-w-[640px] text-muted-foreground text-[clamp(17px,2vw,20px)] leading-relaxed text-pretty">
            Every AVRO formula starts with naturally fermented PharmaGABA®,
            selected to support calm-first readiness, composure, and clarity
            before pressure-sensitive moments.
          </p>
          <div className="flex flex-wrap justify-center">
            <CtaGroup primary="Shop AVRO" secondary="View Research" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 max-w-[640px]">
            <span className="flex flex-col items-center gap-2 text-olive-dark text-[13px] font-extrabold">
              <Icon name="leaf" className="w-8.5 h-8.5 text-olive" />
              Naturally Fermented PharmaGABA®
            </span>
            <span className="flex flex-col items-center gap-2 text-olive-dark text-[13px] font-extrabold">
              <Icon name="flask" className="w-8.5 h-8.5 text-olive" />
              Research Supported Ingredient
            </span>
            <span className="flex flex-col items-center gap-2 text-olive-dark text-[13px] font-extrabold">
              <Icon name="shield" className="w-8.5 h-8.5 text-olive" />
              Transparent Standards
            </span>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="Why calm comes first"
          title="Calm is the foundation."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
          <InfoCard icon="bolt" title="Pressure creates noise">
            When pressure rises, more stimulation is not always better.
          </InfoCard>
          <InfoCard icon="brain" title="Calm supports clarity">
            A calmer state can help support clearer thinking and better
            composure.
          </InfoCard>
          <InfoCard icon="leaf" title="AVRO starts with state">
            AVRO is built around state support before pressure-sensitive
            moments.
          </InfoCard>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(28px,6vw,80px)]">
          <div>
            <span className="block mb-3 text-olive text-xs font-black tracking-[0.12em] uppercase">
              What is GABA?
            </span>
            <h2 className="font-serif font-black text-[clamp(30px,4vw,52px)] leading-[1.05] mb-3.5">
              A naturally occurring part of the body&apos;s balance system.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              GABA is a naturally occurring compound involved in the body&apos;s
              signaling and regulation processes. AVRO uses a naturally
              fermented form as part of its calm-first foundation.
            </p>
          </div>
          <div>
            <span className="block mb-3 text-olive text-xs font-black tracking-[0.12em] uppercase">
              Why PharmaGABA®?
            </span>
            <h2 className="font-serif font-black text-[clamp(30px,4vw,52px)] leading-[1.05] mb-3.5">
              Why AVRO uses PharmaGABA®.
            </h2>
            <div className="grid gap-4">
              <p className="grid grid-cols-[34px_1fr] gap-3.5 items-center text-ink">
                <Icon name="leaf" className="w-8.5 h-8.5 text-olive" />
                Produced through a natural fermentation process.
              </p>
              <p className="grid grid-cols-[34px_1fr] gap-3.5 items-center text-ink">
                <Icon name="shield" className="w-8.5 h-8.5 text-olive" />
                Selected for reliable composition and ingredient quality.
              </p>
              <p className="grid grid-cols-[34px_1fr] gap-3.5 items-center text-ink">
                <Icon name="flask" className="w-8.5 h-8.5 text-olive" />
                Supported by published studies and ingredient research.
              </p>
              <p className="grid grid-cols-[34px_1fr] gap-3.5 items-center text-ink">
                <Icon name="brain" className="w-8.5 h-8.5 text-olive" />
                Chosen because it fits AVRO&apos;s calm-first foundation.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <FormulaLogic />
      <ProductCards title="Three formulas. One foundation." shopLabel="Shop" />
      <SocialProof mode="compact" />

      <FaqBlock
        title="Science FAQ"
        faqs={[
          [
            "What makes PharmaGABA different?",
            "PharmaGABA is a naturally fermented form of GABA used as part of AVRO's calm-first foundation.",
          ],
          [
            "Why does AVRO start with calm?",
            "AVRO is built around the idea that state matters before pressure-sensitive moments, and more stimulation is not always the answer.",
          ],
          [
            "Does AVRO contain caffeine?",
            "Calm and Focus are caffeine free. Energy contains 120 mg natural caffeine.",
          ],
        ]}
      />

      <FinalCta
        title="Start with calm. Show up ready."
        copy="Choose Calm, Focus, or Energy based on the moment you want to support."
      />
    </>
  )
}
