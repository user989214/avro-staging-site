import Link from "next/link"
import Image from "next/image"
import {
  CardedSection,
  SocialProof,
  ProductCards,
  FaqBlock,
  FinalCta,
} from "@/components/sections"
import { CompareAtAGlance } from "@/components/compare-at-a-glance"

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
            font-size: 14px;
            letter-spacing: -0.005em;
            min-height: 44px;
            min-width: 200px;
            padding: 0 32px;
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
            .shop-hero-ctas { flex-direction: column; align-items: stretch; gap: 8px; }
            .shop-btn-calm, .shop-btn-focus, .shop-btn-energy { 
              width: 100%; 
              min-height: 42px;
              font-size: 13px;
            }
          }
        `}</style>

        <div
          className="shop-hero-card relative w-full overflow-hidden"
          style={{
            backgroundColor: "var(--base-light)",
            borderRadius: 0,
            minHeight: "clamp(420px,60vh,760px)",
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

          {/* Hero product image — hidden on mobile, visible on tablet+ */}
          <div
            aria-hidden="true"
            className="shop-hero-image-wrap"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          >
            <div className="absolute inset-0">
              <Image
                src="/images/lifestyle/avro-trio-stone-hero.png"
                alt=""
                fill
                sizes="100vw"
                className="object-contain object-right"
                priority
                style={{
                  WebkitMaskImage:
                    "radial-gradient(ellipse 65% 75% at 78% 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0) 100%)",
                  maskImage:
                    "radial-gradient(ellipse 65% 75% at 78% 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0) 100%)",
                }}
              />
            </div>

            {/* Left-side wash — soft */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, var(--base-light) 0%, rgba(245,241,234,0.85) 22%, rgba(245,241,234,0.45) 38%, rgba(245,241,234,0.1) 55%, rgba(245,241,234,0) 70%)",
              }}
            />
            {/* Outer edge fade — soft */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse 95% 95% at 50% 50%, rgba(245,241,234,0) 70%, rgba(245,241,234,0.3) 90%, rgba(245,241,234,0.6) 100%)",
              }}
            />
          </div>

          {/* Mobile-only / narrow-viewport: hide image, show no wash so the card reads clean */}
          <style>{`
            @media (max-width: 767px) {
              .shop-hero-image-wrap { display: none !important; }
            }
          `}</style>

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
        <CompareAtAGlance />
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
