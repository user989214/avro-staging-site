import Link from "next/link"
import {
  CardedSection,
  Section,
  SectionHeading,
  SocialProof,
  FinalCta,
  FaqBlock,
  InfoCard,
} from "@/components/sections"
import { PageHero } from "@/components/page-hero"

export const metadata = {
  title: "Ingredients | AVRO",
  description:
    "Clear ingredient logic. Every AVRO formula starts with naturally fermented PharmaGABA® and a small set of supporting ingredients chosen for their role.",
}

/* ──────────────────────────────────────────────────────────────────────────
 * Ingredient catalog
 * Each ingredient lists which formulas it appears in, so the page reads as
 * one transparent ingredient story across the whole line.
 * ────────────────────────────────────────────────────────────────────────── */

type Ingredient = {
  name: string
  amount: string
  description: string
  image: string
  formulas: ("Calm" | "Focus" | "Energy")[]
  group: "foundation" | "active" | "supporting" | "flavor"
}

const ingredients: Ingredient[] = [
  {
    name: "PharmaGABA®",
    amount: "200 mg",
    description:
      "Naturally fermented form of GABA. AVRO's calm-first foundation, used in every formula.",
    image: "/images/ingredients/pharmagaba-2.jpg",
    formulas: ["Calm", "Focus", "Energy"],
    group: "foundation",
  },
  {
    name: "Magnesium Bisglycinate",
    amount: "850 mg",
    description:
      "Yields 100 mg of active magnesium. Supports muscle and nervous system function.",
    image: "/images/ingredients/magnesium-bisglycinate-2.jpg",
    formulas: ["Calm"],
    group: "active",
  },
  {
    name: "Cognigrape®",
    amount: "250 mg",
    description:
      "Grape extract studied for cognitive function and clarity support.",
    image: "/images/ingredients/cognigrape-2.jpg",
    formulas: ["Focus"],
    group: "active",
  },
  {
    name: "Natural Caffeine",
    amount: "120 mg",
    description:
      "Plant-derived caffeine for clean, sustained energy without the jitters.",
    image: "/images/ingredients/natural-caffeine-2.jpg",
    formulas: ["Energy"],
    group: "active",
  },
  {
    name: "Prebiotic Fiber",
    amount: "PHGG + Acacia",
    description:
      "Supports gut comfort. Part of AVRO's daily formula across the line.",
    image: "/images/ingredients/prebiotic-fiber-2.jpg",
    formulas: ["Calm", "Focus", "Energy"],
    group: "supporting",
  },
  {
    name: "Stevia",
    amount: "< 2%",
    description:
      "A small amount for a clean, balanced finish. No added sugar, no artificial sweeteners.",
    image: "/images/ingredients/stevia-2.jpg",
    formulas: ["Calm", "Focus", "Energy"],
    group: "supporting",
  },
  {
    name: "Blueberry Acai",
    amount: "Natural Flavor",
    description: "Bright, clean flavor for AVRO Calm.",
    image: "/images/ingredients/blueberry-acai-2.jpg",
    formulas: ["Calm"],
    group: "flavor",
  },
  {
    name: "Pomegranate Raspberry",
    amount: "Natural Flavor",
    description: "Bright, clean flavor for AVRO Focus.",
    image: "/images/ingredients/pomegranate-raspberry-2.jpg",
    formulas: ["Focus"],
    group: "flavor",
  },
  {
    name: "Orange Tangerine",
    amount: "Natural Flavor",
    description: "Bright, clean flavor for AVRO Energy.",
    image: "/images/ingredients/orange-tangerine.jpg",
    formulas: ["Energy"],
    group: "flavor",
  },
]

const groups: { key: Ingredient["group"]; title: string; eyebrow: string; copy: string }[] = [
  {
    key: "foundation",
    eyebrow: "The foundation",
    title: "Calm-first, in every formula.",
    copy: "Every AVRO stick pack starts with PharmaGABA®, the naturally fermented ingredient at the heart of our calm-first foundation.",
  },
  {
    key: "active",
    eyebrow: "Formula-specific actives",
    title: "What changes between formulas.",
    copy: "Calm, Focus, and Energy share the same foundation — what changes is the active that fits the moment.",
  },
  {
    key: "supporting",
    eyebrow: "Supporting ingredients",
    title: "The daily basics.",
    copy: "A small set of supporting ingredients used across the line for gut comfort and a clean finish.",
  },
  {
    key: "flavor",
    eyebrow: "Natural flavors",
    title: "Bright. Clean. No artificial sweeteners.",
    copy: "Each formula has its own natural flavor profile, paired to the moment it was built for.",
  },
]

export default function IngredientsPage() {
  return (
    <>
      <PageHero
        variant="flat"
        title="Clear ingredient logic. Nothing hidden."
        lede="Every AVRO formula starts with naturally fermented PharmaGABA®, then adds a small set of supporting ingredients chosen for their role. No filler. No mystery blends."
        imageSrc=""
        imageAlt=""
        primaryCta={{ href: "/shop", label: "Shop AVRO" }}
        secondaryCta={{ href: "/science", label: "View the Science" }}
      />

      {/* What's inside, at a glance */}
      <Section>
        <SectionHeading
          eyebrow="What's inside"
          title="A short, transparent list."
          centered={false}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoCard icon="leaf" title="Naturally fermented">
            PharmaGABA® is produced through a natural fermentation process.
          </InfoCard>
          <InfoCard icon="shield" title="No added sugar">
            Sweetened with stevia at 2% or less for a clean, balanced finish.
          </InfoCard>
          <InfoCard icon="flask" title="Backed by research">
            Each ingredient is selected for its role and supported by published studies.
          </InfoCard>
        </div>
      </Section>

      {/* One section per ingredient group */}
      {groups.map((group) => {
        const items = ingredients.filter((i) => i.group === group.key)
        if (items.length === 0) return null
        return (
          <CardedSection key={group.key}>
            <SectionHeading
              eyebrow={group.eyebrow}
              title={group.title}
              description={group.copy}
              centered={false}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
              {items.map((ingredient) => (
                <IngredientCard key={ingredient.name} ingredient={ingredient} />
              ))}
            </div>
          </CardedSection>
        )
      })}

      <FaqBlock
        title="Ingredient questions, answered."
        centered={false}
        faqs={[
          [
            "Does AVRO contain sugar?",
            "AVRO is sugar free and uses stevia at 2% or less for a clean, balanced finish.",
          ],
          [
            "Are AVRO ingredients natural?",
            "AVRO uses naturally fermented PharmaGABA® and natural flavors. There are no artificial sweeteners.",
          ],
          [
            "Which formulas contain caffeine?",
            "Energy contains 120 mg natural caffeine. Calm and Focus are caffeine free.",
          ],
          [
            "Why prebiotic fiber?",
            "PHGG and acacia gum are part of AVRO's daily formula base across the line.",
          ],
        ]}
      />

      <SocialProof mode="compact" />

      <div style={{ backgroundColor: "var(--base-deep)" }}>
        <FinalCta
          title="Ready to find your formula?"
          copy="Choose Calm, Focus, or Energy based on the moment you want to support."
        />
      </div>
    </>
  )
}

function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
  return (
    <div
      className="flex flex-col"
      style={{
        borderRadius: 18,
        backgroundColor: "var(--base)",
        border: "1px solid var(--divider)",
        padding: 14,
      }}
    >
      <div
        className="relative aspect-square overflow-hidden mb-4"
        style={{ borderRadius: 12, backgroundColor: "var(--bone)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="px-1">
        <h3
          className="font-serif"
          style={{
            fontWeight: 900,
            fontSize: 17,
            lineHeight: 1.15,
            color: "var(--ink)",
            marginBottom: 4,
          }}
        >
          {ingredient.name}
        </h3>
        <span
          className="block uppercase tracking-[0.08em]"
          style={{
            fontWeight: 700,
            fontSize: 11,
            color: "var(--warm-gray)",
            marginBottom: 8,
          }}
        >
          {ingredient.amount}
        </span>
        <p
          style={{
            fontWeight: 500,
            fontSize: 13.5,
            lineHeight: 1.45,
            color: "var(--warm-gray)",
            marginBottom: 10,
          }}
        >
          {ingredient.description}
        </p>

        {/* Tiny formula-tag row — tells you instantly which products use this ingredient. */}
        <div className="flex flex-wrap gap-1.5">
          {ingredient.formulas.map((f) => (
            <Link
              key={f}
              href={`/${f.toLowerCase()}`}
              className="inline-flex items-center px-2 py-0.5 rounded-full transition-colors hover:bg-charcoal hover:text-bone"
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                backgroundColor: "var(--base-light)",
                color: "var(--ink)",
                border: "1px solid var(--divider)",
              }}
            >
              {f}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
