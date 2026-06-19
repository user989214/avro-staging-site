import {
  CardedSection,
  SectionHeading,
  ProductCards,
  FaqBlock,
  InfoCard,
} from "@/components/sections"
import { AvroIcon } from "@/components/avro-icons"
import { PageHero } from "@/components/page-hero"
import { MockupBlueCta } from "@/components/mockup-sections"
import { IngredientStacks } from "@/components/ingredient-stacks"

export const metadata = {
  title: "Ingredients | AVRO",
  description:
    "Every AVRO ingredient, fully disclosed. See the approved Supplement Facts panel for all six flavors across Calm, Focus, and Energy.",
}

const designations: { label: string; icon: Parameters<typeof AvroIcon>[0]["name"] }[] = [
  { label: "No Added Sugar", icon: "free-sugar" },
  { label: "Non-GMO", icon: "free-gmo" },
  { label: "Vegan", icon: "free-vegan" },
  { label: "Clinically Studied Ingredients", icon: "clinically-tested-ingredients" },
]

export default function IngredientsPage() {
  return (
    <>
      <PageHero
        variant="card"
        title="Every ingredient, fully disclosed."
        lede="Every formula starts with 200 mg of naturally fermented PharmaGABA® and adds one studied active — magnesium, Cognigrape®, or natural caffeine. See the approved Supplement Facts panel for every flavor below."
        imageSrc="/images/ingredients/ingredients-hero.jpg"
        imageAlt="Flat-lay of AVRO ingredients — blackberries, dried lavender, jasmine flowers, and fine powders on a cream surface"
        imageObjectPosition="right center"
        mobileImageSrc="/images/ingredients/ingredients-hero-mobile.png"
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
        <SectionHeading title="What every box has in common." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard title="10 servings per box">
            Each box contains 10 single-serve packets — a two-week supply at one packet per day.
          </InfoCard>
          <InfoCard title="5 g per serving">
            One packet is 5 g (0.18 oz), for a net weight of 1.76 oz (50 g) per box.
          </InfoCard>
          <InfoCard title="Simple to use">
            Mix one packet into 16 fl oz of water. Enjoy up to one packet per day.
          </InfoCard>
          <InfoCard title="10 calories, no added sugar">
            Every serving is 10 calories with 0 g total sugars — sweetened lightly with stevia.
          </InfoCard>
          <InfoCard title="200 mg PharmaGABA®">
            Naturally fermented PharmaGABA® is the calm-first foundation in every single formula.
          </InfoCard>
          <InfoCard title="One active per stack">
            Calm adds 100 mg magnesium, Focus adds 250 mg Cognigrape®, and Energy adds 120 mg natural caffeine.
          </InfoCard>
        </div>
        <p className="mt-5 text-[13px] leading-relaxed text-warm-gray">
          Calm and Focus are caffeine free. Only AVRO Energy contains caffeine (120 mg from natural
          coffee bean extract). See each flavor&apos;s Supplement Facts panel below for full detail.
        </p>
      </CardedSection>

      {/* Per-stack labels: actives, nutrition facts, other ingredients */}
      <section className="py-[clamp(8px,2vw,24px)]">
        <div className="w-full max-w-[1440px] mx-auto px-[clamp(16px,5vw,64px)] mb-[clamp(8px,2vw,16px)]">
          <SectionHeading
            title="Three stacks. Six flavors. Nothing hidden."
            description="Here is the approved Supplement Facts panel for every flavor across Calm, Focus, and Energy."
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
              "What is in every AVRO formula?",
              "Every formula is built on 200 mg of naturally fermented PharmaGABA®, plus sodium and potassium for electrolyte balance. Each serving is 10 calories with no added sugar.",
            ],
            [
              "What makes each stack different?",
              "Calm adds 100 mg of magnesium (as magnesium bisglycinate), Focus adds 250 mg of Cognigrape® grape fruit extract, and Energy adds 120 mg of natural caffeine from coffee bean extract.",
            ],
            [
              "Which formulas contain caffeine?",
              "Only AVRO Energy contains caffeine — 120 mg from Coffea arabica and Coffea canephora bean extract. Calm and Focus are completely caffeine free.",
            ],
          ]}
        />

        <MockupBlueCta bgImage="/images/banners/ingredients-banner.png" shopHref="/shop" shopLabel="Shop" />
      </div>
    </>
  )
}
