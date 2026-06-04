import {
  CardedSection,
  SectionHeading,
  InfoCard,
  ProductCards,
  SocialProof,
  FinalCta,
} from "@/components/sections"
import { PageHero } from "@/components/page-hero"

export const metadata = {
  title: "Subscribe + Save | AVRO",
  description:
    "Join the AVRO subscription and save 25% on every order. Free shipping, flexible scheduling, and calm-first support delivered on your terms.",
}

export default function SubscribePage() {
  return (
    <>
      <PageHero
        variant="flat"
        title="Subscribe + save."
        lede="Join the AVRO subscription and save 25% on every order. Free shipping, a flexible delivery schedule, and the calm-first support you need — delivered on your terms."
        imageSrc=""
        imageAlt=""
        primaryCta={{ href: "/shop", label: "Start Your Subscription" }}
        secondaryCta={{ href: "/shop", label: "Shop All Products" }}
      />

      <CardedSection>
        <SectionHeading
          title="Why subscribe."
          centered={false}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoCard icon="quality-standards" title="Save on every order">
            Subscribers get 25% off every delivery plus free shipping — the best
            price on AVRO, automatically.
          </InfoCard>
          <InfoCard icon="control-under-pressure" title="Total flexibility">
            Adjust your delivery schedule, skip a shipment, or pause and cancel
            anytime. No commitments, no hassle.
          </InfoCard>
          <InfoCard icon="consistency-quality" title="Never run out">
            Your formula arrives on a schedule that fits your routine, so calm-first
            support is always on hand.
          </InfoCard>
        </div>
      </CardedSection>

      <CardedSection bg="var(--base)">
        <SectionHeading
          title="How it works."
          centered={false}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoCard icon="calm-first-foundation" title="1. Choose your formula">
            Select the AVRO formula that fits your needs — Calm, Focus, or Energy.
          </InfoCard>
          <InfoCard icon="step-drink" title="2. Set your schedule">
            Decide how often you want deliveries — every 2, 4, or 6 weeks.
          </InfoCard>
          <InfoCard icon="transparent-standards" title="3. Save 25% every time">
            Your subscription ships automatically with 25% off and free shipping.
          </InfoCard>
        </div>
      </CardedSection>

      <ProductCards title="Choose your formula." shopLabel="Shop" />
      <SocialProof mode="compact" />

      <div style={{ backgroundColor: "var(--base-deep)" }}>
        <FinalCta
          eyebrow="Subscribe + save 25%"
          title="Calm-first support, on your schedule."
          copy="Start a subscription and save 25% on every order with free shipping. Pause, skip, or cancel anytime."
        />
      </div>
    </>
  )
}
