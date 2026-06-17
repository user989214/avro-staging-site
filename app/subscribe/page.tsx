import {
  CardedSection,
  SectionHeading,
  InfoCard,
  ProductCards,
  SocialProof,
  FinalCta,
} from "@/components/sections"
import { PageHero } from "@/components/page-hero"
import { ReviewTODO } from "@/components/compliance"

export const metadata = {
  title: "Subscribe + Save | AVRO",
  description:
    "Subscribe & save 15% every order of 2 or more tubes. Free shipping on orders of 2 or more tubes, a flexible delivery schedule, and calm-first support delivered on your terms.",
}

export default function SubscribePage() {
  return (
    <>
      <PageHero
        variant="flat"
        title="Subscribe + save."
        lede="Subscribe & save 15% every order of 2 or more tubes. Select your own delivery schedule, get free shipping on orders of 2 or more tubes, and skip, change or cancel anytime."
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
            Subscribers get 15% off every order — the best price on AVRO,
            automatically.
          </InfoCard>
          <InfoCard icon="control-under-pressure" title="Total flexibility">
            Select your own delivery schedule, skip a shipment, or change and cancel
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
            Select your own delivery schedule — every 30, 45, or 60 days.
          </InfoCard>
          <InfoCard icon="transparent-standards" title="3. Save 15% every time">
            Orders of 2 or more tubes ship automatically with 15% off and free
            shipping.
          </InfoCard>
        </div>
      </CardedSection>

      <ProductCards title="Choose your formula." shopLabel="Shop" />
      <SocialProof mode="compact" />

      <CardedSection>
        <p className="text-[13px] leading-relaxed max-w-[760px]">
          <ReviewTODO>
            Confirm the live free-shipping rule for subscriptions (is the order-minimum
            waived for subscribers?) and make every &quot;free shipping&quot; / &quot;2 or more
            tubes&quot; line on this page match the commerce settings.
          </ReviewTODO>
        </p>
      </CardedSection>

      <div style={{ backgroundColor: "var(--base-deep)" }}>
        <FinalCta
          eyebrow="Subscribe & save 15%"
          title="Calm-first support, on your schedule."
          copy="Subscribe & save 15% every order of 2 or more tubes, with free shipping on orders of 2 or more tubes. Skip, change or cancel anytime."
        />
      </div>
    </>
  )
}
