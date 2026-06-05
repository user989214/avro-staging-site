import {
  CardedSection,
  SectionHeading,
  ProductCards,
  FaqBlock,
  FinalCta,
  InfoCard,
} from "@/components/sections"
import { AvroIcon } from "@/components/avro-icons"
import { PageHero } from "@/components/page-hero"
import { FooterBanner } from "@/components/footer-banner"
import { IngredientStacks } from "@/components/ingredient-stacks"

export const metadata = {
  title: "Ingredients | AVRO",
  description:
    "Every AVRO ingredient, fully disclosed. Naturally fermented PharmaGABA®, zero sugar, non-GMO, vegan, and clinically tested — see the complete label for every flavor.",
}

const designations: { label: string; icon: Parameters<typeof AvroIcon>[0]["name"] }[] = [
  { label: "Zero Sugar", icon: "calm-first-foundation" },
  { label: "Non-GMO", icon: "naturally-fermented-pharmagaba" },
  { label: "Vegan", icon: "transparent-standards" },
  { label: "Clinically Tested Ingredients", icon: "science-backed" },
]

export default function IngredientsPage() {
  return (
    <>
      <PageHero
        variant="card"
        title="Every ingredient, fully disclosed."
        lede="Each AVRO stick starts with naturally fermented PharmaGABA®, then adds targeted support for the moment. No proprietary blends, no hidden amounts — here is the complete label for every formula."
        imageSrc="/images/ingredients/ingredients-hero.jpg"
        imageAlt="Flat-lay of AVRO ingredients — blackberries, dried lavender, jasmine flowers, and fine powders on a cream surface"
        imageObjectPosition="right center"
        primaryCta={{ href: "/shop", label: "Shop AVRO" }}
        secondaryCta={{ href: "#focus", label: "View Labels" }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2 max-w-[680px]">
          {designations.map((d) => (
            <span key={d.label} className="flex items-center gap-3 text-ink text-[12px] font-extrabold leading-tight">
              <AvroIcon name={d.icon} size={48} className="shrink-0 md:w-14 md:h-14" />
              {d.label}
            </span>
          ))}
        </div>
      </PageHero>

      {/* General product details — applies to every flavor */}
      <CardedSection>
        <SectionHeading
          eyebrow="The essentials"
          title="What every box has in common."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard icon="naturally-fermented-pharmagaba" title="Powder stick packs">
            A powder dietary supplement delivered in 10 single-serve stick packets per box.
          </InfoCard>
          <InfoCard icon="calm-first-foundation" title="5g serving size">
            One packet (5g) per serving — 1.76 oz (50g) net weight per box.
          </InfoCard>
          <InfoCard icon="control-under-pressure" title="Simple to use">
            Mix one packet into 12 fl oz of water. Enjoy up to three times per day.
          </InfoCard>
          <InfoCard icon="transparent-standards" title="Clean by design">
            Zero sugar, non-GMO, and vegan, with ingredients selected for clinical support.
          </InfoCard>
          <InfoCard icon="science-backed" title="200mg PharmaGABA®">
            Naturally fermented PharmaGABA® is the calm-first foundation in every single formula.
          </InfoCard>
          <InfoCard icon="consistency-quality" title="Caffeine where it counts">
            Focus and Calm are caffeine-free. Only the Energy stack adds 120mg natural caffeine.
          </InfoCard>
        </div>
      </CardedSection>

      {/* Per-stack labels: actives, nutrition facts, other ingredients */}
      <section className="py-[clamp(8px,2vw,24px)]">
        <div className="w-full max-w-[1440px] mx-auto px-[clamp(16px,5vw,64px)] mb-[clamp(8px,2vw,16px)]">
          <SectionHeading
            eyebrow="Full label disclosure"
            title="Three stacks. Six flavors. Nothing hidden."
            description="Every formula builds from the same naturally fermented PharmaGABA® base, then supports the moment in a different way."
          />
        </div>
        <IngredientStacks />
      </section>

      <ProductCards title="Find the formula for your moment." shopLabel="Shop" />

      <div style={{ backgroundColor: "var(--base-deep)" }}>
        <FaqBlock
          title="Ingredient FAQ"
          centered={false}
          faqs={[
            [
              "Why is silica listed as an other ingredient?",
              "Silica is included in a small amount to help the powder mix well and stay consistent from serving to serving. It is not one of AVRO's primary active ingredients.",
            ],
            [
              "Does AVRO contain added sugar or artificial sweeteners?",
              "No. Every formula is zero sugar and sweetened only with stevia leaf extract.",
            ],
            [
              "Which stack contains caffeine?",
              "Only the Energy stack (Fuji Apple and Orange Tangerine) contains caffeine — 120mg of natural caffeine. Focus and Calm are caffeine-free.",
            ],
          ]}
        />

        <FooterBanner
          src="/images/banners/ingredients-banner.png"
          alt="AVRO Energy Orange Tangerine — Calm is the advantage."
        />

        <FinalCta
          title="Clean label. Clear logic."
          copy="Choose Calm, Focus, or Energy based on the moment you want to support — and know exactly what's in every stick."
        />
      </div>
    </>
  )
}
