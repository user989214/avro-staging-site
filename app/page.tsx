import {
  HomeRefHero,
  HomeProofBar,
  HomeBenefitRow,
  HomeLogicRow,
  HomeProductStrip,
  HomeMomentGrid,
  HomeScienceGrid,
  HomeQualityRow,
  HomeStoryStrip,
  HomeRitualSection,
} from "@/components/home-sections"
import {
  SocialProof,
  ProductCards,
  FinalCta,
} from "@/components/sections"

export default function HomePage() {
  return (
    <>
      <HomeRefHero />
      <HomeProofBar />
      <HomeBenefitRow />
      <HomeLogicRow />
      <HomeProductStrip />
      <HomeMomentGrid />
      <HomeScienceGrid />
      <HomeQualityRow />
      <HomeStoryStrip />
      <HomeRitualSection />
      <ProductCards title="Choose your AVRO formula" shopLabel="Shop" />
      <SocialProof mode="full" />
      <FinalCta
        title="Calm first. Clear headed. Ready for what matters."
        copy="Support composure, clarity, and calm-first readiness for the moments that matter."
      />
    </>
  )
}
