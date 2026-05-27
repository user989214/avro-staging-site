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
      {/* Carded hero on the page --base background, mirroring site-wide language. */}
      <section
        style={{
          position: "relative",
          width: "100%",
          backgroundColor: "var(--base)",
          padding: "clamp(20px,3vw,40px) clamp(16px,5vw,64px) clamp(28px,3.5vw,48px)",
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
            min-height: 54px;
            min-width: 168px;
            padding: 0 36px;
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
          className="shop-hero-card relative w-full max-w-[1440px] mx-auto overflow-hidden"
          style={{
            backgroundColor: "var(--base-light)",
            borderRadius: 28,
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
                  // strong radial vignette mask — hides borders, image dissolves into the card
                  WebkitMaskImage:
                    "radial-gradient(ellipse 75% 80% at 72% 50%, rgba(0,0,0,1) 35%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0) 95%)",
                  maskImage:
                    "radial-gradient(ellipse 75% 80% at 72% 50%, rgba(0,0,0,1) 35%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0) 95%)",
                }}
              />
            </div>

            {/* Left-side wash so the headline reads cleanly over the image */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, var(--base-light) 0%, var(--base-light) 28%, rgba(245,241,234,0.85) 42%, rgba(245,241,234,0.35) 58%, rgba(245,241,234,0) 75%)",
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
        <div className="relative">
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

          {/* Decorative animated SVG accent — subtle, sits on the right of the heading on large screens */}
          <svg
            aria-hidden="true"
            viewBox="0 0 220 80"
            className="hidden lg:block absolute"
            style={{ right: 0, top: 8, width: 220, height: 80, opacity: 0.55 }}
          >
            <defs>
              <linearGradient id="shopCompareGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--calm)" />
                <stop offset="50%" stopColor="var(--focus)" />
                <stop offset="100%" stopColor="var(--energy)" />
              </linearGradient>
            </defs>
            <path
              d="M0 40 Q 55 0, 110 40 T 220 40"
              fill="none"
              stroke="url(#shopCompareGrad)"
              strokeWidth="3"
              strokeLinecap="round"
            >
              <animate
                attributeName="d"
                dur="6s"
                repeatCount="indefinite"
                values="
                  M0 40 Q 55 0, 110 40 T 220 40;
                  M0 40 Q 55 80, 110 40 T 220 40;
                  M0 40 Q 55 0, 110 40 T 220 40
                "
              />
            </path>
          </svg>

          <div
            style={{
              backgroundColor: "var(--base)",
              borderRadius: 24,
              overflow: "hidden",
            }}
          >
            {/* Header row */}
            <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr 1fr" }}>
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
            ].map((row, idx) => (
              <div
                key={row.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.1fr 1fr 1fr 1fr",
                  backgroundColor: idx % 2 === 0 ? "var(--base)" : "rgba(0,0,0,0.02)",
                }}
              >
                <div style={{ minHeight: 56, padding: "16px 20px", display: "flex", alignItems: "center", backgroundColor: "var(--base-light)" }}>
                  <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>{row.label}</span>
                </div>
                <div style={{ minHeight: 56, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                  <span style={{ fontFamily: GC, fontWeight: 500, fontSize: 14, color: "var(--warm-gray)" }}>{row.calm}</span>
                </div>
                <div style={{ minHeight: 56, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                  <span style={{ fontFamily: GC, fontWeight: 500, fontSize: 14, color: "var(--warm-gray)" }}>{row.focus}</span>
                </div>
                <div style={{ minHeight: 56, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
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
                min-height: 46px;
                min-width: 148px;
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
            <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr 1fr" }}>
              <div style={{ minHeight: 76, padding: 16, backgroundColor: "var(--base-light)" }} />
              <div style={{ minHeight: 76, padding: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Link href="/calm" className="compare-cta" style={{ fontFamily: GC }}>Shop Calm</Link>
              </div>
              <div style={{ minHeight: 76, padding: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Link href="/focus" className="compare-cta" style={{ fontFamily: GC }}>Shop Focus</Link>
              </div>
              <div style={{ minHeight: 76, padding: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Link href="/energy" className="compare-cta" style={{ fontFamily: GC }}>Shop Energy</Link>
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
