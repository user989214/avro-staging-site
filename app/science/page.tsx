import {
  CardedSection,
  SectionHeading,
  SocialProof,
  ProductCards,
  FormulaLogic,
  FaqBlock,
  FinalCta,
  InfoCard,
} from "@/components/sections"
import { Icon } from "@/components/icons"
import { PageHero } from "@/components/page-hero"

export const metadata = {
  title: "The Science of AVRO | AVRO",
  description: "Calm first. Backed by science. Every AVRO formula starts with naturally fermented PharmaGABA®.",
}

export default function SciencePage() {
  return (
    <>
      <PageHero
        variant="flat"
        title="Calm first. Backed by science."
        lede="Every AVRO formula starts with naturally fermented PharmaGABA®, selected to support calm-first readiness, composure, and clarity before pressure-sensitive moments."
        imageSrc=""
        imageAlt=""
        primaryCta={{ href: "/shop", label: "Shop AVRO" }}
        secondaryCta={{ href: "#research", label: "View Research" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 max-w-[640px]">
          <span className="flex items-center gap-2 text-olive-dark text-[12px] font-extrabold">
            <Icon name="leaf" className="w-6 h-6 text-olive shrink-0" />
            Naturally Fermented PharmaGABA®
          </span>
          <span className="flex items-center gap-2 text-olive-dark text-[12px] font-extrabold">
            <Icon name="flask" className="w-6 h-6 text-olive shrink-0" />
            Research Supported Ingredient
          </span>
          <span className="flex items-center gap-2 text-olive-dark text-[12px] font-extrabold">
            <Icon name="shield" className="w-6 h-6 text-olive shrink-0" />
            Transparent Standards
          </span>
        </div>
      </PageHero>

      <CardedSection>
        <SectionHeading
          title="Calm is the foundation."
          centered={false}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </CardedSection>

      <CardedSection id="research">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(28px,6vw,80px)]">
          <div>
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
      </CardedSection>

      <FormulaLogic />
      <ProductCards title="Three formulas. One foundation." shopLabel="Shop" />
      <SocialProof mode="compact" />

      <div style={{ backgroundColor: "var(--base-deep)" }}>
        <FaqBlock
          title="Science FAQ"
          centered={false}
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
      </div>
    </>
  )
}
