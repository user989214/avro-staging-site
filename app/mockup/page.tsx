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
import { MockupLogicRow, MockupBlueCta } from "@/components/mockup-sections"

export const metadata = {
  title: "AVRO — Homepage Mockup",
  description: "Styling mockup of the AVRO homepage with the white/grey colorway.",
}

export default function MockupPage() {
  return (
    <div className="mockup-theme">
      <style>{`
        /* ── Colorway: white background, light-grey secondary surfaces ───────── */
        .mockup-theme {
          --base: #FFFFFF;          /* page background → white */
          --base-light: #F2F2F2;    /* card surface → light grey */
          --base-deep: #EDEDED;     /* alt sections / dividers → light grey */
          --bone: #FFFFFF;          /* inner surfaces → white */
          /* --avro-blue and --warm-gray (supporting copy) kept as-is */
        }

        /* ── Bolder + larger headlines and section headers ───────────────────── */
        .mockup-theme h1 {
          font-weight: 800 !important;
          letter-spacing: -0.03em !important;
          font-size: clamp(46px, 5.8vw, 80px) !important;
        }
        .mockup-theme h2 {
          font-weight: 800 !important;
          letter-spacing: -0.025em !important;
        }

        /* ── Hero CTA buttons → AVRO blue fill (instead of black) ─────────────── */
        .mockup-theme .hp-pill-primary,
        .mockup-theme .hp-pill-secondary {
          background-color: var(--avro-blue) !important;
          color: var(--charcoal) !important;
          border-color: var(--avro-blue) !important;
        }
        .mockup-theme .hp-pill-primary:hover,
        .mockup-theme .hp-pill-secondary:hover {
          background-color: var(--avro-blue-deep) !important;
          border-color: var(--avro-blue-deep) !important;
          color: var(--bone) !important;
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

      {/* Full-bleed banner CTA with artwork + Shop button */}
      <MockupBlueCta />
    </div>
  )
}
