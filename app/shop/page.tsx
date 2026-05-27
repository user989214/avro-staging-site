import Link from "next/link"
import {
  SocialProof,
  ProductCards,
  FaqBlock,
  FinalCta,
} from "@/components/sections"
import { PageHero } from "@/components/page-hero"

export const metadata = {
  title: "Shop | AVRO",
  description: "Choose your AVRO formula. Three formulas. One calm-first foundation.",
}

const GC = '"DM Sans", system-ui, sans-serif'

export default function ShopPage() {
  return (
    <>
      <PageHero
        title="Choose your AVRO formula."
        lede="Three formulas. One calm-first foundation. Start with the state that fits your moment."
        imageSrc="/images/lifestyle/avro-trio-stone-hero.png"
        imageAlt="AVRO Calm, Focus, and Energy tubes arranged on a stone slab with soft botanicals"
        imageObjectPosition="70% center"
        primaryCta={{ href: "/calm", label: "Shop Calm" }}
        secondaryCta={{ href: "/focus", label: "Shop Focus" }}
      />

      <ProductCards title="Three formulas. One foundation." shopLabel="Shop" />

      {/* Compare Table — charcoal section, rounded card inside */}
      <section
        style={{
          width: "100%",
          padding: "clamp(36px,5vw,72px) clamp(16px,5vw,64px)",
          backgroundColor: "var(--base)",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            backgroundColor: "var(--charcoal)",
            borderRadius: 28,
            padding: "clamp(28px,5vw,64px) clamp(20px,5vw,48px)",
          }}
        >
          <h2
            className="font-serif"
            style={{
              fontWeight: 900,
              fontSize: "clamp(32px,4.5vw,52px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: "var(--bone)",
              textAlign: "left",
              marginBottom: 32,
            }}
          >
            Compare at a glance
          </h2>

          <div
            style={{
              backgroundColor: "var(--base)",
              borderRadius: 22,
              overflow: "hidden",
            }}
          >
            {/* Header row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
              <div style={{ minHeight: 64, padding: 20, backgroundColor: "var(--base-light)" }} />
              <div style={{ minHeight: 64, padding: 20, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--calm)" }}>
                <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 18, color: "#2D1B4E" }}>Calm</span>
              </div>
              <div style={{ minHeight: 64, padding: 20, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--focus)" }}>
                <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 18, color: "#4A0A2E" }}>Focus</span>
              </div>
              <div style={{ minHeight: 64, padding: 20, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--energy)" }}>
                <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 18, color: "#4A3D00" }}>Energy</span>
              </div>
            </div>

            {/* Data rows */}
            {[
              { label: "Primary state", calm: "Composure", focus: "Clear focus", energy: "Steady energy" },
              { label: "Best for", calm: "Travel, social calm, daily reset", focus: "Deep work, meetings, study", energy: "Mornings, long days, travel" },
              { label: "Caffeine", calm: "No", focus: "No", energy: "Yes, 120 mg natural" },
              { label: "Key addition", calm: "Magnesium Bisglycinate", focus: "Cognigrape®", energy: "Natural caffeine" },
            ].map((row) => (
              <div
                key={row.label}
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", borderTop: "1px solid var(--divider)" }}
              >
                <div style={{ minHeight: 56, padding: "16px 20px", display: "flex", alignItems: "center", backgroundColor: "var(--base-light)" }}>
                  <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>{row.label}</span>
                </div>
                <div style={{ minHeight: 56, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", borderLeft: "1px solid var(--divider)" }}>
                  <span style={{ fontFamily: GC, fontWeight: 500, fontSize: 14, color: "var(--warm-gray)" }}>{row.calm}</span>
                </div>
                <div style={{ minHeight: 56, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", borderLeft: "1px solid var(--divider)" }}>
                  <span style={{ fontFamily: GC, fontWeight: 500, fontSize: 14, color: "var(--warm-gray)" }}>{row.focus}</span>
                </div>
                <div style={{ minHeight: 56, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", borderLeft: "1px solid var(--divider)" }}>
                  <span style={{ fontFamily: GC, fontWeight: 500, fontSize: 14, color: "var(--warm-gray)" }}>{row.energy}</span>
                </div>
              </div>
            ))}

            {/* CTA row */}
            <style>{`
              .compare-cta {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                font-size: 14px;
                min-height: 44px;
                padding: 0 28px;
                border-radius: 999px;
                text-decoration: none;
                border: 2px solid var(--charcoal);
                background-color: var(--charcoal);
                color: var(--bone);
                transition: background-color 0.2s ease, color 0.2s ease;
              }
              .compare-cta:hover {
                background-color: transparent;
                color: var(--charcoal);
              }
            `}</style>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", borderTop: "1px solid var(--divider)" }}>
              <div style={{ minHeight: 72, padding: 16, backgroundColor: "var(--base-light)" }} />
              <div style={{ minHeight: 72, padding: 16, display: "flex", alignItems: "center", justifyContent: "center", borderLeft: "1px solid var(--divider)" }}>
                <Link href="/calm" className="compare-cta" style={{ fontFamily: GC }}>Shop Calm</Link>
              </div>
              <div style={{ minHeight: 72, padding: 16, display: "flex", alignItems: "center", justifyContent: "center", borderLeft: "1px solid var(--divider)" }}>
                <Link href="/focus" className="compare-cta" style={{ fontFamily: GC }}>Shop Focus</Link>
              </div>
              <div style={{ minHeight: 72, padding: 16, display: "flex", alignItems: "center", justifyContent: "center", borderLeft: "1px solid var(--divider)" }}>
                <Link href="/energy" className="compare-cta" style={{ fontFamily: GC }}>Shop Energy</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SocialProof mode="compact" />

      <FaqBlock
        title="Questions? We have answers."
        centered={false}
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
        productButtons
      />
    </>
  )
}
