import Link from "next/link"
import Image from "next/image"
import {
  CardedSection,
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
      {/* ---------- HERO ---------- */}
      {/* True full-width hero — edge-to-edge, square corners, faded look retained. */}
      <section
        style={{
          position: "relative",
          width: "100%",
          backgroundColor: "var(--base)",
          padding: 0,
        }}
      >
        <style>{`
          @keyframes shop-rise {
            0% { opacity: 0; transform: translate3d(0, 14px, 0); }
            100% { opacity: 1; transform: translate3d(0, 0, 0); }
          }
          @keyframes shop-float {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(0, -10px, 0); }
          }
          @keyframes shop-orb {
            0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.55; }
            50% { transform: translate3d(0, -16px, 0) scale(1.04); opacity: 0.75; }
          }
          .shop-hero-card {
            opacity: 0;
            animation: shop-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.05s forwards;
          }
          .shop-hero-h1 { opacity: 0; animation: shop-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.25s forwards; }
          .shop-hero-lede { opacity: 0; animation: shop-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards; }
          .shop-hero-ctas { opacity: 0; animation: shop-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.55s forwards; }
          .shop-hero-image { animation: shop-float 8s ease-in-out infinite; }

          .shop-btn-calm, .shop-btn-focus, .shop-btn-energy {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-family: ${GC};
            font-weight: 700;
            font-size: 16px;
            letter-spacing: -0.005em;
            min-height: 48px;
            min-width: 240px;
            padding: 0 44px;
            border-radius: 999px;
            text-decoration: none;
            transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
          }
          .shop-btn-calm  { border: 2px solid var(--calm);   background-color: var(--calm);   color: #2D1B4E; }
          .shop-btn-focus { border: 2px solid var(--focus);  background-color: var(--focus);  color: #4A0A2E; }
          .shop-btn-energy{ border: 2px solid var(--energy); background-color: var(--energy); color: #4A3D00; }
          .shop-btn-calm:hover  { background-color: transparent; color: var(--calm); }
          .shop-btn-focus:hover { background-color: transparent; color: var(--focus); }
          .shop-btn-energy:hover{ background-color: transparent; color: var(--energy); }

          @media (max-width: 640px) {
            .shop-hero-ctas { flex-direction: column; align-items: stretch; }
            .shop-btn-calm, .shop-btn-focus, .shop-btn-energy { width: 100%; }
          }
        `}</style>

        <div
          className="shop-hero-card relative w-full overflow-hidden"
          style={{
            backgroundColor: "var(--base-light)",
            borderRadius: 0,
            minHeight: "clamp(520px,72vh,760px)",
          }}
        >
          {/* Animated ambient orbs — calm, focus, energy tones */}
          <div
            aria-hidden="true"
            className="shop-hero-image"
            style={{
              position: "absolute",
              right: "-8%",
              top: "12%",
              width: "42%",
              height: "70%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 50% 50%, var(--calm) 0%, rgba(0,0,0,0) 65%)",
              opacity: 0.35,
              filter: "blur(40px)",
              pointerEvents: "none",
              animation: "shop-orb 9s ease-in-out infinite",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "8%",
              bottom: "-6%",
              width: "30%",
              height: "55%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 50% 50%, var(--energy) 0%, rgba(0,0,0,0) 65%)",
              opacity: 0.28,
              filter: "blur(50px)",
              pointerEvents: "none",
              animation: "shop-orb 11s ease-in-out infinite 1.2s",
            }}
          />

          {/* Hero product image — full image visible, softly faded into the card on all edges */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          >
            <div className="shop-hero-image absolute inset-0">
              <Image
                src="/images/lifestyle/avro-trio-stone-hero.png"
                alt=""
                fill
                sizes="100vw"
                className="object-contain object-right"
                priority
                style={{
                  // Much stronger vignette — image dissolves well before reaching any edge
                  WebkitMaskImage:
                    "radial-gradient(ellipse 55% 65% at 75% 50%, rgba(0,0,0,1) 15%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.15) 78%, rgba(0,0,0,0) 92%)",
                  maskImage:
                    "radial-gradient(ellipse 55% 65% at 75% 50%, rgba(0,0,0,1) 15%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.15) 78%, rgba(0,0,0,0) 92%)",
                }}
              />
            </div>

            {/* Left-side wash so the headline reads cleanly over the image */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, var(--base-light) 0%, var(--base-light) 28%, rgba(245,241,234,0.92) 40%, rgba(245,241,234,0.6) 52%, rgba(245,241,234,0.18) 66%, rgba(245,241,234,0) 78%)",
              }}
            />
            {/* Outer edge fade — softens any visible border on top, bottom and right */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse 90% 90% at 50% 50%, rgba(245,241,234,0) 55%, rgba(245,241,234,0.55) 82%, var(--base-light) 100%)",
              }}
            />
          </div>

          {/* Content */}
          <div
            className="relative flex items-center"
            style={{
              minHeight: "inherit",
              padding: "clamp(56px,7vw,96px) clamp(28px,5vw,72px)",
            }}
          >
            <div style={{ maxWidth: 580 }}>
              <h1
                className="font-serif shop-hero-h1"
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
                className="shop-hero-lede"
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

              <div
                className="shop-hero-ctas"
                style={{ display: "flex", flexWrap: "wrap", gap: 12 }}
              >
                <Link href="/calm" className="shop-btn-calm">Shop Calm</Link>
                <Link href="/focus" className="shop-btn-focus">Shop Focus</Link>
                <Link href="/energy" className="shop-btn-energy">Shop Energy</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- THE THREE FORMULAS ---------- */}
      <ProductCards title="Three formulas. One foundation." shopLabel="Shop" />

      {/* ---------- COMPARE AT A GLANCE ---------- */}
      <CardedSection>
        <div>
          <h2
            className="font-serif"
            style={{
              fontWeight: 900,
              fontSize: "clamp(32px,4.5vw,52px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              textAlign: "left",
              marginBottom: 36,
              maxWidth: 720,
            }}
          >
            Compare at a glance
          </h2>

          <div
            style={{
              backgroundColor: "#9A9A95",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            {/* Header row — Avro Blue accent for each formula column */}
            <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr 1fr 1fr" }}>
              <div style={{ minHeight: 60, padding: "16px 24px" }} />
              <div style={{ minHeight: 60, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#94C6D4" }}>
                <span style={{ fontFamily: GC, fontWeight: 800, fontSize: 15, letterSpacing: "-0.01em", color: "var(--charcoal)" }}>Calm</span>
              </div>
              <div style={{ minHeight: 60, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#94C6D4" }}>
                <span style={{ fontFamily: GC, fontWeight: 800, fontSize: 15, letterSpacing: "-0.01em", color: "var(--charcoal)" }}>Focus</span>
              </div>
              <div style={{ minHeight: 60, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#94C6D4" }}>
                <span style={{ fontFamily: GC, fontWeight: 800, fontSize: 15, letterSpacing: "-0.01em", color: "var(--charcoal)" }}>Energy</span>
              </div>
            </div>

            {/* Data rows */}
            {[
              { label: "Primary state", calm: "Composure", focus: "Clear focus", energy: "Steady energy" },
              { label: "Best for", calm: "Travel, social calm, daily reset", focus: "Deep work, meetings, study", energy: "Mornings, long days, travel" },
              { label: "Caffeine", calm: "No", focus: "No", energy: "Yes, 120 mg natural" },
              { label: "Key addition", calm: "Magnesium Bisglycinate", focus: "Cognigrape", energy: "Natural caffeine" },
            ].map((row) => (
              <div
                key={row.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.25fr 1fr 1fr 1fr",
                  borderTop: "1px solid rgba(255,255,255,0.25)",
                }}
              >
                <div style={{ minHeight: 56, padding: "14px 24px", display: "flex", alignItems: "center" }}>
                  <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 14, color: "var(--charcoal)" }}>{row.label}</span>
                </div>
                <div style={{ minHeight: 56, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.25)" }}>
                  <span style={{ fontFamily: GC, fontWeight: 500, fontSize: 14, color: "var(--ink)", lineHeight: 1.4 }}>{row.calm}</span>
                </div>
                <div style={{ minHeight: 56, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.25)" }}>
                  <span style={{ fontFamily: GC, fontWeight: 500, fontSize: 14, color: "var(--ink)", lineHeight: 1.4 }}>{row.focus}</span>
                </div>
                <div style={{ minHeight: 56, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.25)" }}>
                  <span style={{ fontFamily: GC, fontWeight: 500, fontSize: 14, color: "var(--ink)", lineHeight: 1.4 }}>{row.energy}</span>
                </div>
              </div>
            ))}

            {/* CTA row */}
            <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr 1fr 1fr", borderTop: "1px solid rgba(255,255,255,0.25)" }}>
              <div style={{ minHeight: 72, padding: 16 }} />
              <div style={{ minHeight: 72, padding: 16, display: "flex", alignItems: "center", justifyContent: "center", borderLeft: "1px solid rgba(255,255,255,0.25)" }}>
                <Link
                  href="/calm"
                  style={{
                    fontFamily: GC,
                    fontWeight: 700,
                    fontSize: 13,
                    padding: "12px 24px",
                    borderRadius: 999,
                    backgroundColor: "var(--charcoal)",
                    color: "var(--bone)",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                >
                  Shop Calm
                </Link>
              </div>
              <div style={{ minHeight: 72, padding: 16, display: "flex", alignItems: "center", justifyContent: "center", borderLeft: "1px solid rgba(255,255,255,0.25)" }}>
                <Link
                  href="/focus"
                  style={{
                    fontFamily: GC,
                    fontWeight: 700,
                    fontSize: 13,
                    padding: "12px 24px",
                    borderRadius: 999,
                    backgroundColor: "var(--charcoal)",
                    color: "var(--bone)",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                >
                  Shop Focus
                </Link>
              </div>
              <div style={{ minHeight: 72, padding: 16, display: "flex", alignItems: "center", justifyContent: "center", borderLeft: "1px solid rgba(255,255,255,0.25)" }}>
                <Link
                  href="/energy"
                  style={{
                    fontFamily: GC,
                    fontWeight: 700,
                    fontSize: 13,
                    padding: "12px 24px",
                    borderRadius: 999,
                    backgroundColor: "var(--charcoal)",
                    color: "var(--bone)",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                >
                  Shop Energy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardedSection>

      <SocialProof mode="compact" />

      {/* Tone-band switch — soft shift to --base-deep to differentiate the lower-page rhythm */}
      <div style={{ backgroundColor: "var(--base-deep)" }}>
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
      </div>
    </>
  )
}
