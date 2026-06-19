import {
  HomeRefHero,
  HomeProofBar,
  HomeBenefitRow,
  HomeProductStrip,
  HomeMomentGrid,
  HomeScienceGrid,
  HomeQualityRow,
  HomeStoryStrip,
  HomeRitualSection,
} from "@/components/home-sections"
import { SocialProof, ProductCards } from "@/components/sections"
import {
  MockupLogicRow,
  MockupBlueCta,
} from "@/components/mockup-sections"

export default function HomePage() {
  return (
    <div className="home-theme">
      <style>{`
        /* ── Colorway: white background, light-grey secondary surfaces (no beige, no gradients) ── */
        .home-theme {
          --base: #FFFFFF;          /* page background → white */
          --base-light: #F2F2F2;    /* card surface → light grey */
          --base-deep: #EDEDED;     /* alt sections / dividers → light grey */
          --bone: #FFFFFF;          /* inner surfaces → white */
          background-color: #FFFFFF;
          /* --avro-blue and --warm-gray (supporting copy) kept as-is */
        }

        /* ── Bolder + larger headlines and section headers ───────────────────── */
        .home-theme h1 {
          font-weight: 800 !important;
          letter-spacing: -0.03em !important;
          font-size: clamp(46px, 5.8vw, 80px) !important;
        }
        .home-theme h2 {
          font-weight: 800 !important;
          letter-spacing: -0.025em !important;
        }
        .home-theme h3 {
          font-weight: 700 !important;
        }

        /* ── Hero CTA buttons → BLACK OUTLINE, black fill + white text on hover ── */
        .home-theme .hp-pill-primary,
        .home-theme .hp-pill-secondary {
          background-color: transparent !important;
          color: #000000 !important;
          border-color: #000000 !important;
        }
        .home-theme .hp-pill-primary:hover,
        .home-theme .hp-pill-secondary:hover {
          background-color: #000000 !important;
          border-color: #000000 !important;
          color: #FFFFFF !important;
        }

        /* Banner CTA button — outline pill, fills on hover */
        .banner-shop-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: transparent;
          color: var(--charcoal);
          border: 2px solid var(--charcoal);
          border-radius: 999px;
          font-weight: 700;
          font-size: 16px;
          letter-spacing: -0.005em;
          min-height: 48px;
          padding: 0 28px;
          text-decoration: none;
          transition: background-color .2s ease, color .2s ease;
          cursor: pointer;
        }
        .banner-shop-btn:hover {
          background-color: var(--charcoal);
          color: var(--bone);
        }

      `}</style>

      <HomeRefHero />
      <HomeProofBar />
      <HomeBenefitRow />
      <MockupLogicRow />
      <HomeProductStrip />
      <HomeMomentGrid />
      <HomeScienceGrid />
      <HomeQualityRow />
      <HomeStoryStrip />
      <HomeRitualSection />
      <ProductCards title="Choose your AVRO formula" shopLabel="Shop" />
      <SocialProof mode="full" />

      {/* Calm = Power banner as the background of the blue CTA card, single Shop button */}
      <MockupBlueCta bgImage="/images/banners/calm-power.png" shopHref="/shop" shopLabel="Shop" />
    </div>
  )
}
