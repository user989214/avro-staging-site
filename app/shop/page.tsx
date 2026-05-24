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
            <style>{`
              .btn-formula-calm {
                border: 2px solid var(--calm);
                background-color: var(--calm);
                color: var(--bone);
              }
              .btn-formula-calm:hover {
                background-color: transparent;
                color: var(--calm);
              }
              .btn-formula-focus {
                border: 2px solid var(--focus);
                background-color: var(--focus);
                color: var(--bone);
              }
              .btn-formula-focus:hover {
                background-color: transparent;
                color: var(--focus);
              }
              .btn-formula-energy {
                border: 2px solid var(--energy);
                background-color: var(--energy);
                color: var(--bone);
              }
              .btn-formula-energy:hover {
                background-color: transparent;
                color: var(--energy);
              }
            `}</style>
            <Link
              href="/calm"
              className="btn-formula-calm inline-flex items-center justify-center min-h-[52px] px-7 rounded-full font-bold text-[15px] transition-all duration-200"
            >
              Shop Calm
            </Link>
            <Link
              href="/focus"
              className="btn-formula-focus inline-flex items-center justify-center min-h-[52px] px-7 rounded-full font-bold text-[15px] transition-all duration-200"
            >
              Shop Focus
            </Link>
            <Link
              href="/energy"
              className="btn-formula-energy inline-flex items-center justify-center min-h-[52px] px-7 rounded-full font-bold text-[15px] transition-all duration-200"
            >
              Shop Energy
            </Link>
          </div>
        </div>
        <div className="relative aspect-[3/2] w-full max-w-[620px] justify-self-center overflow-hidden rounded-2xl border border-line shadow-[0_30px_60px_-30px_rgba(20,18,12,0.35)]">
          <Image
            src="/images/lifestyle/avro-trio-stone-hero.png"
            alt="AVRO Calm, Focus, and Energy tubes arranged on a stone slab with soft botanicals"
            fill
            sizes="(min-width: 1024px) 620px, 90vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      <ProductCards title="Three formulas. One foundation." shopLabel="Shop" />

      {/* Compare Table - Redesigned */}
      <section className="w-full py-[clamp(48px,6vw,80px)]" style={{ backgroundColor: "var(--avro-blue)" }}>
        <div className="w-full max-w-[1280px] mx-auto px-[clamp(18px,5vw,64px)]">
          <h2
            className="text-center mb-10"
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontWeight: 700,
              fontSize: "clamp(32px,4.5vw,52px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: "var(--charcoal)",
            }}
          >
            Compare at a glance
          </h2>

          <div
            className="overflow-hidden"
            style={{
              backgroundColor: "var(--base)",
              borderRadius: 24,
              boxShadow: "0 8px 40px -12px rgba(0,0,0,0.12)",
            }}
          >
            {/* Header row with colored backgrounds */}
            <div className="grid grid-cols-1 sm:grid-cols-4">
              <div className="min-h-[72px] p-5 flex items-center" style={{ backgroundColor: "var(--base-light)" }} />
              <div
                className="min-h-[72px] p-5 flex items-center justify-center"
                style={{ backgroundColor: "var(--calm)" }}
              >
                <span style={{ fontFamily: '"DM Sans"', fontWeight: 700, fontSize: 20, color: "var(--bone)" }}>
                  Calm
                </span>
              </div>
              <div
                className="min-h-[72px] p-5 flex items-center justify-center"
                style={{ backgroundColor: "var(--focus)" }}
              >
                <span style={{ fontFamily: '"DM Sans"', fontWeight: 700, fontSize: 20, color: "var(--bone)" }}>
                  Focus
                </span>
              </div>
              <div
                className="min-h-[72px] p-5 flex items-center justify-center"
                style={{ backgroundColor: "var(--energy)" }}
              >
                <span style={{ fontFamily: '"DM Sans"', fontWeight: 700, fontSize: 20, color: "var(--charcoal)" }}>
                  Energy
                </span>
              </div>
            </div>

            {/* Data rows */}
            {[
              { label: "Primary state", calm: "Composure", focus: "Clear focus", energy: "Steady energy" },
              { label: "Best for", calm: "Travel, social calm, daily reset", focus: "Deep work, meetings, study", energy: "Mornings, long days, travel" },
              { label: "Caffeine", calm: "No", focus: "No", energy: "Yes, 120 mg natural" },
              { label: "Key addition", calm: "Magnesium Bisglycinate", focus: "Cognigrape®", energy: "Natural caffeine" },
            ].map((row, i, arr) => (
              <div
                key={row.label}
                className="grid grid-cols-1 sm:grid-cols-4"
                style={{ borderTop: "1px solid rgba(28,27,20,0.08)" }}
              >
                <div
                  className="min-h-[64px] p-5 flex items-center"
                  style={{ backgroundColor: "var(--base-light)" }}
                >
                  <span style={{ fontFamily: '"DM Sans"', fontWeight: 700, fontSize: 15, color: "var(--charcoal)" }}>
                    {row.label}
                  </span>
                </div>
                <div
                  className="min-h-[64px] p-5 flex items-center justify-center text-center"
                  style={{ borderLeft: "1px solid rgba(28,27,20,0.06)" }}
                >
                  <span style={{ fontFamily: '"DM Sans"', fontWeight: 500, fontSize: 15, color: "var(--ink)" }}>
                    {row.calm}
                  </span>
                </div>
                <div
                  className="min-h-[64px] p-5 flex items-center justify-center text-center"
                  style={{ borderLeft: "1px solid rgba(28,27,20,0.06)" }}
                >
                  <span style={{ fontFamily: '"DM Sans"', fontWeight: 500, fontSize: 15, color: "var(--ink)" }}>
                    {row.focus}
                  </span>
                </div>
                <div
                  className="min-h-[64px] p-5 flex items-center justify-center text-center"
                  style={{ borderLeft: "1px solid rgba(28,27,20,0.06)" }}
                >
                  <span style={{ fontFamily: '"DM Sans"', fontWeight: 500, fontSize: 15, color: "var(--ink)" }}>
                    {row.energy}
                  </span>
                </div>
              </div>
            ))}

            {/* CTA row */}
            <style>{`
              .compare-btn {
                background-color: var(--charcoal);
                color: var(--bone);
                border: 2px solid var(--charcoal);
              }
              .compare-btn:hover {
                background-color: transparent;
                color: var(--charcoal);
              }
            `}</style>
            <div
              className="grid grid-cols-1 sm:grid-cols-4"
              style={{ borderTop: "1px solid rgba(28,27,20,0.08)" }}
            >
              <div className="min-h-[80px] p-5 flex items-center" style={{ backgroundColor: "var(--base-light)" }} />
              <div className="min-h-[80px] p-4 flex items-center justify-center" style={{ borderLeft: "1px solid rgba(28,27,20,0.06)" }}>
                <Link
                  href="/calm"
                  className="compare-btn inline-flex items-center justify-center px-5 py-2.5 rounded-full font-bold text-[14px] transition-all duration-200"
                >
                  Shop Calm
                </Link>
              </div>
              <div className="min-h-[80px] p-4 flex items-center justify-center" style={{ borderLeft: "1px solid rgba(28,27,20,0.06)" }}>
                <Link
                  href="/focus"
                  className="compare-btn inline-flex items-center justify-center px-5 py-2.5 rounded-full font-bold text-[14px] transition-all duration-200"
                >
                  Shop Focus
                </Link>
              </div>
              <div className="min-h-[80px] p-4 flex items-center justify-center" style={{ borderLeft: "1px solid rgba(28,27,20,0.06)" }}>
                <Link
                  href="/energy"
                  className="compare-btn inline-flex items-center justify-center px-5 py-2.5 rounded-full font-bold text-[14px] transition-all duration-200"
                >
                  Shop Energy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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
