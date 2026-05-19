import Link from "next/link"
import Image from "next/image"
import {
  Section,
  SectionHeading,
  SocialProof,
  ProductCards,
  FaqBlock,
  FinalCta,
} from "@/components/sections"

export const metadata = {
  title: "Shop | AVRO",
  description: "Choose your AVRO formula. Three formulas. One calm-first foundation.",
}

export default function ShopPage() {
  return (
    <>
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(28px,6vw,80px)] items-center w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(42px,8vw,86px)] bg-[radial-gradient(circle_at_22%_28%,rgba(255,255,255,0.8),transparent_28%),linear-gradient(105deg,#fffdf8_0%,#f4efe5_100%)] border-b border-line">
        <div className="max-w-[620px]">
          <h1 className="font-serif font-black text-[clamp(46px,7vw,86px)] leading-[0.98] mb-5">
            Choose your AVRO formula.
          </h1>
          <p className="max-w-[560px] text-ink/80 text-[clamp(17px,2vw,20px)] leading-relaxed">
            Three formulas. One calm-first foundation. Start with the state
            that fits your moment.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-6.5">
            <Link href="/calm" className="btn-primary !bg-calm">
              Shop Calm
            </Link>
            <Link href="/focus" className="btn-primary !bg-focus">
              Shop Focus
            </Link>
            <Link href="/energy" className="btn-primary !bg-energy !text-ink">
              Shop Energy
            </Link>
          </div>
        </div>
        <div className="relative aspect-[3/2] w-full max-w-[620px] justify-self-center overflow-hidden rounded-lg border border-line shadow-[0_30px_60px_-30px_rgba(20,18,12,0.35)]">
          <Image
            src="/images/products/avro-six-flavor-fan.png"
            alt="AVRO's six flavors fanned across a sandstone slab — Pomegranate Raspberry, Red Dragon Fruit, Blackberry Jasmine, Blueberry Acai, Fuji Apple, and Orange Tangerine"
            fill
            sizes="(min-width: 1024px) 620px, 90vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      <ProductCards title="Three formulas. One foundation." shopLabel="Shop" />

      {/* Compare Table */}
      <Section>
        <SectionHeading title="Compare at a glance" />
        <div className="grid grid-cols-1 sm:grid-cols-4 border border-line rounded-lg overflow-hidden bg-white">
          <div className="min-h-[56px] p-4 border-b border-line" />
          <strong className="min-h-[56px] p-4 text-center border-b border-l border-line">
            Calm
          </strong>
          <strong className="min-h-[56px] p-4 text-center border-b border-l border-line">
            Focus
          </strong>
          <strong className="min-h-[56px] p-4 text-center border-b border-l border-line">
            Energy
          </strong>

          <span className="min-h-[56px] p-4 font-black bg-soft border-b border-line">
            Primary state
          </span>
          <p className="min-h-[56px] p-4 border-b border-l border-line">Composure</p>
          <p className="min-h-[56px] p-4 border-b border-l border-line">Clear focus</p>
          <p className="min-h-[56px] p-4 border-b border-l border-line">Steady energy</p>

          <span className="min-h-[56px] p-4 font-black bg-soft border-b border-line">
            Best for
          </span>
          <p className="min-h-[56px] p-4 border-b border-l border-line">
            Travel, social calm, daily reset
          </p>
          <p className="min-h-[56px] p-4 border-b border-l border-line">
            Deep work, meetings, study
          </p>
          <p className="min-h-[56px] p-4 border-b border-l border-line">
            Mornings, long days, travel
          </p>

          <span className="min-h-[56px] p-4 font-black bg-soft border-b border-line">
            Caffeine
          </span>
          <p className="min-h-[56px] p-4 border-b border-l border-line">No</p>
          <p className="min-h-[56px] p-4 border-b border-l border-line">No</p>
          <p className="min-h-[56px] p-4 border-b border-l border-line">
            Yes, 120 mg natural caffeine
          </p>

          <span className="min-h-[56px] p-4 font-black bg-soft">Key addition</span>
          <p className="min-h-[56px] p-4 border-l border-line">Magnesium Bisglycinate</p>
          <p className="min-h-[56px] p-4 border-l border-line">Cognigrape®</p>
          <p className="min-h-[56px] p-4 border-l border-line">Natural caffeine</p>
        </div>
      </Section>

      <SocialProof mode="compact" />

      <FaqBlock
        title="Questions? We have answers."
        faqs={[
          [
            "What is AVRO?",
            "AVRO is a calm-first daily drink mix designed to support calm, clarity, focus, and steady energy before pressure-sensitive moments.",
          ],
          [
            "Which formula is right for me?",
            "Choose Calm for caffeine-free composure, Focus for caffeine-free clarity support, or Energy for steady energy with 120 mg natural caffeine.",
          ],
          [
            "Can I take AVRO every day?",
            "AVRO can fit into a daily routine. Choose your formula based on timing, caffeine preference, and your moment.",
          ],
        ]}
      />

      <FinalCta
        title="Find your formula. Show up ready."
        copy="Choose your formula and start your calm-first routine today."
      />
    </>
  )
}
