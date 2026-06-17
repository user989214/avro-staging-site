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
    "Placeholder ingredient page — lorem ipsum label data shown for demonstration only.",
}

const designations: { label: string; icon: Parameters<typeof AvroIcon>[0]["name"] }[] = [
  { label: "Lorem Ipsum", icon: "free-sugar" },
  { label: "Dolor Sit", icon: "free-gmo" },
  { label: "Amet", icon: "free-vegan" },
  { label: "Consectetur Adipiscing", icon: "clinically-tested-ingredients" },
]

export default function IngredientsPage() {
  return (
    <>
      <PageHero
        variant="card"
        title="Every ingredient, fully disclosed."
        lede="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Placeholder copy only — not the final label."
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
        <SectionHeading title="What every box has in common." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard title="Lorem ipsum dolor">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor per box.
          </InfoCard>
          <InfoCard title="Sit amet serving">
            Lorem ipsum (00g) per serving — 0.00 oz (00g) net weight per box.
          </InfoCard>
          <InfoCard title="Consectetur usage">
            Lorem ipsum dolor sit amet into 00 fl oz of water. Adipiscing up to three times per day.
          </InfoCard>
          <InfoCard title="Adipiscing by design">
            Lorem ipsum, consectetur, and adipiscing, with ingredients selected for elit support.
          </InfoCard>
          <InfoCard title="00mg PharmaGABA®">
            Lorem ipsum dolor sit amet is the calm-first foundation in every single formula.
          </InfoCard>
          <InfoCard title="Tempor where it counts">
            Lorem ipsum dolor sit amet. Only the elit stack adds 00mg sed do eiusmod.
          </InfoCard>
        </div>
        <p className="mt-5 text-[13px] leading-relaxed text-warm-gray">
          Lorem ipsum — placeholder details only. Serving size, net weight, servings per box, and
          directions shown here are illustrative and not the final approved label.
        </p>
      </CardedSection>

      {/* Per-stack labels: actives, nutrition facts, other ingredients */}
      <section className="py-[clamp(8px,2vw,24px)]">
        <div className="w-full max-w-[1440px] mx-auto px-[clamp(16px,5vw,64px)] mb-[clamp(8px,2vw,16px)]">
          <SectionHeading
            title="Three stacks. Six flavors. Nothing hidden."
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
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
              "Lorem ipsum dolor sit amet consectetur?",
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Placeholder answer only.",
            ],
            [
              "Adipiscing elit sed do eiusmod tempor?",
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placeholder answer only — not the final approved copy.",
            ],
            [
              "Ut labore et dolore magna aliqua?",
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Placeholder answer only.",
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
