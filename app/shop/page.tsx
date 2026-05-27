import Link from "next/link"
import Image from "next/image"
import {
  SocialProof,
  ProductCards,
  FaqBlock,
  FinalCta,
} from "@/components/sections"

export const metadata = {
  title: "Shop | AVRO",
  description: "Choose your AVRO formula. Three formulas. One calm-first foundation.",
}

const GC = '"DM Sans", system-ui, sans-serif'

export default function ShopPage() {
  return (
    <>
      {/* Hero — full-width edge-fading product image with formula-colored CTAs */}
      <section
        style={{
          position: "relative",
          width: "100%",
          backgroundColor: "var(--base)",
          overflow: "hidden",
          minHeight: "clamp(520px,68vh,720px)",
        }}
      >
        {/* Background image */}
        <Image
          src="/images/lifestyle/avro-trio-stone-hero.png"
          alt="AVRO Calm, Focus, and Energy tubes arranged on a stone slab with soft botanicals"
          fill
          sizes="100vw"
          className="object-cover object-[70%_center]"
          priority
        />

        {/* Edge-fading gradient — fades on all four edges into the page background */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `
              linear-gradient(to right, var(--base) 0%, var(--base) 32%, rgba(245,241,234,0.96) 42%, rgba(245,241,234,0.7) 54%, rgba(245,241,234,0.3) 68%, rgba(245,241,234,0.08) 82%, rgba(245,241,234,0.18) 94%, var(--base) 100%),
              linear-gradient(to bottom, var(--base) 0%, rgba(245,241,234,0.45) 8%, rgba(245,241,234,0) 18%, rgba(245,241,234,0) 78%, rgba(245,241,234,0.6) 92%, var(--base) 100%)
            `,
            pointerEvents: "none",
          }}
        />

        {/* Content — aligned to the same max-width / padding as the rest of the page */}
        <div
          className="relative w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)]"
          style={{
            display: "flex",
            alignItems: "center",
            minHeight: "inherit",
            paddingTop: "clamp(72px,9vw,128px)",
            paddingBottom: "clamp(56px,7vw,96px)",
          }}
        >
          <div style={{ maxWidth: 580 }}>
            <h1
              className="font-serif"
              style={{
                fontWeight: 900,
                fontSize: "clamp(42px,6vw,72px)",
                lineHeight: 0.98,
                letterSpacing: "-0.025em",
                color: "var(--ink)",
                marginBottom: 20,
              }}
            >
              Choose your AVRO formula.
            </h1>
            <p
              style={{
                fontFamily: GC,
                fontWeight: 400,
                fontSize: "clamp(17px,2vw,20px)",
                lineHeight: 1.55,
                color: "var(--warm-gray)",
                maxWidth: 480,
                marginBottom: 28,
              }}
            >
              Three formulas. One calm-first foundation. Start with the state that fits your moment.
            </p>

            {/* CTA buttons — formula colors */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <style>{`
                .shop-btn-calm {
                  border: 2px solid var(--calm);
                  background-color: var(--calm);
                  color: #2D1B4E;
                  transition: background-color 0.2s ease, color 0.2s ease;
                }
                .shop-btn-calm:hover { background-color: transparent; color: var(--calm); }
                .shop-btn-focus {
                  border: 2px solid var(--focus);
                  background-color: var(--focus);
                  color: #4A0A2E;
                  transition: background-color 0.2s ease, color 0.2s ease;
                }
                .shop-btn-focus:hover { background-color: transparent; color: var(--focus); }
                .shop-btn-energy {
                  border: 2px solid var(--energy);
                  background-color: var(--energy);
                  color: #4A3D00;
                  transition: background-color 0.2s ease, color 0.2s ease;
                }
                .shop-btn-energy:hover { background-color: transparent; color: var(--energy); }
              `}</style>
              <Link
                href="/calm"
                className="shop-btn-calm"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: GC,
                  fontWeight: 700,
                  fontSize: 16,
                  minHeight: 48,
                  padding: "0 32px",
                  borderRadius: 999,
                  textDecoration: "none",
                }}
              >
                Shop Calm
              </Link>
              <Link
                href="/focus"
                className="shop-btn-focus"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: GC,
                  fontWeight: 700,
                  fontSize: 16,
                  minHeight: 48,
                  padding: "0 32px",
                  borderRadius: 999,
                  textDecoration: "none",
                }}
              >
                Shop Focus
              </Link>
              <Link
                href="/energy"
                className="shop-btn-energy"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: GC,
                  fontWeight: 700,
                  fontSize: 16,
                  minHeight: 48,
                  padding: "0 32px",
                  borderRadius: 999,
                  textDecoration: "none",
                }}
              >
                Shop Energy
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ProductCards title="Three formulas. One foundation." shopLabel="Shop" />

      {/* Compare Table — charcoal section, left-aligned heading */}
      <section style={{ width: "100%", padding: "clamp(48px,6vw,80px) clamp(20px,5vw,64px)", backgroundColor: "var(--charcoal)" }}>
        <div style={{ maxWidth: 1250, margin: "0 auto" }}>
          <h2
            className="font-serif"
            style={{
              fontWeight: 900,
              fontSize: "clamp(32px,4.5vw,52px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: "var(--bone)",
              textAlign: "left",
              marginBottom: 40,
            }}
          >
            Compare at a glance
          </h2>

          <div
            style={{
              backgroundColor: "var(--base)",
              borderRadius: 24,
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
