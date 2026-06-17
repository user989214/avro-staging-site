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
  MockupCalmPerformance,
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

        /* ── Hero edge-fade → neutral light grey (remove warm cream/green hue) ── */
        .home-theme .hp-hero-fade {
          background:
            linear-gradient(to right, #FFFFFF 0%, #FFFFFF 32%, rgba(240,240,240,0.68) 46%, rgba(240,240,240,0.38) 58%, rgba(240,240,240,0.15) 72%, rgba(240,240,240,0.04) 86%, rgba(240,240,240,0.1) 95%, #FFFFFF 100%),
            linear-gradient(to bottom, #FFFFFF 0%, rgba(240,240,240,0.13) 7%, rgba(240,240,240,0) 16%, rgba(240,240,240,0) 84%, rgba(240,240,240,0.13) 93%, #FFFFFF 100%) !important;
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

      {/* Full-bleed blue section */}
      <MockupBlueCta
        title="Calm first. Clear headed. Ready for what matters."
        copy="Support composure, clarity, and calm-first readiness for the moments that matter."
      />

      {/* Full-bleed Calm Performance artwork (white background) — footer follows */}
      <MockupCalmPerformance />
    </div>
  )
}
