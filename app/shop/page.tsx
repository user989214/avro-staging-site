import Link from "next/link"
import {
  CardedSection,
  SocialProof,
  ProductCards,
  FaqBlock,
  FinalCta,
} from "@/components/sections"
import { CompareAtAGlance } from "@/components/compare-at-a-glance"
import { FooterBanner } from "@/components/footer-banner"

export const metadata = {
  title: "Shop | AVRO",
  description: "Choose your AVRO formula. Three formulas. One calm-first foundation.",
}

const GC = '"DM Sans", system-ui, sans-serif'

export default function ShopPage() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      {/* Golf-style hero: full-width, square corners, image with cream fade overlay,
          serif headline with per-word rise animation, lede + CTAs that fade up.
          CTAs are black/white and sized identically to the homepage hero pills. */}
      <section
        style={{
          position: "relative",
          width: "100%",
          backgroundColor: "var(--base-light)",
          padding: 0,
          overflow: "hidden",
        }}
      >
        <style>{`
          @keyframes shop-rise {
            0%   { opacity: 0; transform: translateY(28px); }
            55%  { opacity: 1; transform: translateY(-4px); }
            80%  { opacity: 1; transform: translateY(0); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes shop-fade-up {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .shop-word {
            display: inline-block;
            opacity: 0;
            transform: translateY(28px);
            animation: shop-rise 1.05s cubic-bezier(0.34, 1.4, 0.4, 1) forwards;
            will-change: transform, opacity;
          }
          .shop-fade { opacity: 0; animation: shop-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
          .shop-lede { animation-delay: 0.85s; }
          .shop-cta-row { animation-delay: 1.15s; }

          /* Black/white pills — identical sizing to the homepage hero pills:
             48px min-height, 28px horizontal padding, 16px font, 2px border. */
          .shop-btn-calm, .shop-btn-focus, .shop-btn-energy {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex: 1 1 160px;
            min-width: 160px;
            font-family: ${GC};
            font-weight: 700;
            font-size: 16px;
            letter-spacing: -0.005em;
            min-height: 48px;
            padding: 0 28px;
            border-radius: 999px;
            text-decoration: none;
            border: 2px solid var(--charcoal);
            background-color: transparent;
            color: var(--charcoal);
            transition: background-color 0.2s ease, color 0.2s ease;
          }
          .shop-btn-calm:hover,
          .shop-btn-focus:hover,
          .shop-btn-energy:hover { background-color: var(--charcoal); color: var(--bone); }

          /* ── Desktop: 16:9 with content overlaid ── */
          .shop-hero-16x9 {
            position: relative;
            width: 100%;
            aspect-ratio: 16/9;
            overflow: hidden;
            background-color: var(--base-light);
          }
          .shop-hero-img-desktop { display: block; }
          .shop-hero-img-mobile { display: none; }
          .shop-hero-content {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: clamp(24px,5vw,80px) clamp(20px,5vw,64px);
            text-align: left;
            align-items: flex-start;
          }
          /* ── Mobile: stacked — rounded image on top, text below ── */
          @media (max-width: 768px) {
            .shop-hero-16x9 {
              aspect-ratio: unset !important;
              overflow: visible !important;
              display: flex;
              flex-direction: column;
            }
            .shop-hero-img-wrap {
              position: relative;
              width: calc(100% - 32px);
              margin: 16px auto 0;
              aspect-ratio: 3/4;
              border-radius: 20px;
              overflow: hidden;
              flex-shrink: 0;
            }
            .shop-hero-img-desktop { display: none !important; }
            .shop-hero-img-mobile { display: block !important; }
            .shop-hero-content {
              position: static !important;
              padding: 24px 20px 32px !important;
            }
            .shop-hero-ctas { flex-direction: column; align-items: stretch; max-width: 320px; }
            .shop-btn-calm, .shop-btn-focus, .shop-btn-energy { width: 100%; flex: 0 0 auto; }
          }
          @media (min-width: 769px) {
            .shop-hero-img-wrap {
              position: absolute;
              inset: 0;
              border-radius: 0;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .shop-word, .shop-fade {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}</style>

        {/* Outer wrapper — 16:9 on desktop, column-stacked on mobile */}
        <div className="shop-hero-16x9">

          {/* Image container — full-bleed on desktop, rounded-rect card on mobile */}
          <div className="shop-hero-img-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/lifestyle/avro-shop-hero.png"
              alt="AVRO CALM, FOCUS and ENERGY tubes with stick packets on a sandy beige surface"
              className="shop-hero-img-desktop"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/lifestyle/shop-hero-mobile.png"
              alt=""
              aria-hidden="true"
              className="shop-hero-img-mobile"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
            />
          </div>

          {/* Content — overlaid on desktop, below image on mobile */}
          <div className="shop-hero-content">
            <h1
              className="font-serif"
              style={{
                fontWeight: 900,
                fontSize: "clamp(32px,4.2vw,52px)",
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
                color: "var(--ink)",
                marginBottom: 16,
                maxWidth: 520,
              }}
            >
              {"Choose your AVRO® formula.".split(" ").map((word, i, arr) => {
                const delay = 0.1 + i * 0.11
                return (
                  <span
                    key={i}
                    className="shop-word"
                    style={{ animationDelay: `${delay.toFixed(2)}s` }}
                  >
                    {word}
                    {i < arr.length - 1 ? "\u00A0" : ""}
                  </span>
                )
              })}
            </h1>
            <p
              className="shop-fade shop-lede"
              style={{
                fontFamily: GC,
                fontWeight: 400,
                fontSize: "clamp(15px,1.4vw,18px)",
                lineHeight: 1.55,
                color: "var(--warm-gray)",
                maxWidth: 460,
                marginBottom: 24,
              }}
            >
              Three formulas. One calm-first foundation. Start with the state that fits your moment.
            </p>

            <div
              className="shop-hero-ctas shop-fade shop-cta-row"
              style={{ display: "flex", flexWrap: "wrap", gap: 12, width: "100%", maxWidth: 560 }}
            >
              <Link href="/calm" className="shop-btn-calm">Shop Calm</Link>
              <Link href="/focus" className="shop-btn-focus">Shop Focus</Link>
              <Link href="/energy" className="shop-btn-energy">Shop Energy</Link>
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
              "AVRO is a calm-first daily drink mix designed to support calm, clarity, focus, and steady energy before pressure-sensitive moments.*",
            ],
            [
              "Which formula is right for me?",
              "Choose Calm for caffeine-free composure, Focus for caffeine-free clarity support, or Energy for steady energy with 120 mg natural caffeine.*",
            ],
            [
              "Can I take AVRO every day?",
              "AVRO can fit into a daily routine. Choose your formula based on timing, caffeine preference, and your moment.",
            ],
          ]}
        />

        <FooterBanner
          src="/images/banners/shop-banner.png"
          alt="AVRO Energy Fuji Apple — Calm is the advantage."
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
