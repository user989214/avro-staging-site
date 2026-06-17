import {
  Section,
  SectionHeading,
  SocialProof,
  ProductCards,
  FormulaLogic,
  FinalCta,
  InfoCard,
} from "@/components/sections"
import { PageHero } from "@/components/page-hero"
import { FooterBanner } from "@/components/footer-banner"

export const metadata = {
  title: "Why AVRO | AVRO",
  description: "State before stimulation. AVRO is built on a simple idea: when the moment matters, more stimulation is not always the answer.",
}

export default function WhyPage() {
  return (
    <>
      <PageHero
        variant="card"
        title="State before stimulation."
        lede="AVRO was built on a simple observation: in many moments that matter most, people do not need more energy. They need more control. More energy is not the same as more control."
        imageSrc="/images/lifestyle/why-hero.png"
        imageAlt="AVRO CALM Blackberry Jasmine tube on a marble ledge"
        imageObjectPosition="right center"
        primaryCta={{ href: "/shop", label: "Find Your Formula" }}
        secondaryCta={{ href: "/shop", label: "Shop AVRO" }}
      />

      <Section>
        <SectionHeading title="AVRO is different by design." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
          <InfoCard icon="calm-first-foundation" title="Calm comes first">
            Every formula starts with naturally fermented PharmaGABA® as part of
            the calm-first foundation.
          </InfoCard>
          <InfoCard icon="supports-focus-without-overload" title="Support the moment">
            Calm, Focus, and Energy each support a different kind of readiness
            while staying rooted in the same system.
          </InfoCard>
          <InfoCard icon="quality-standards" title="No stimulant culture">
            AVRO is not built around hype language or more-is-more energy
            positioning.
          </InfoCard>
        </div>
      </Section>

      <ProductCards title="Choose the state that fits your moment." shopLabel="Shop" />
      <FormulaLogic />
      <SocialProof mode="compact" />
      <FooterBanner
        src="/images/banners/why-avro-banner.png"
        alt="AVRO Energy Fuji Apple — Calm performs best."
      />
      <FinalCta
        title={
          <>
            Less noise.<br />
            More control.
          </>
        }
        copy="Choose the formula that supports the state before the moment."
      />
    </>
  )
}
