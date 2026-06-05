import { type AvroIconName } from "@/components/avro-icons"

const GC = '"DM Sans", system-ui, sans-serif'

type NutritionRow = { label: string; value: string; dv?: string }
type Active = { name: string; amount: string }
type Flavor = {
  name: string
  nutrition: NutritionRow[]
  actives: Active[]
  others: string
}
type Stack = {
  key: string
  name: string
  claim: string
  tagline: string
  accent: string
  icon: AvroIconName
  flavors: Flavor[]
}

/** Nutrition facts shared across the two caffeine-free Focus flavors. */
const FOCUS_NUTRITION: NutritionRow[] = [
  { label: "Calories", value: "10" },
  { label: "Total Carbohydrate", value: "3g", dv: "1%" },
  { label: "Total Sugars", value: "0g" },
  { label: "Sodium (as sodium bicarbonate)", value: "80mg", dv: "3%" },
  { label: "Potassium (as potassium bicarbonate)", value: "100mg", dv: "2%" },
]

const ENERGY_NUTRITION = FOCUS_NUTRITION

const CALM_NUTRITION: NutritionRow[] = [
  { label: "Calories", value: "10" },
  { label: "Total Carbohydrate", value: "2g", dv: "1%" },
  { label: "Total Sugars", value: "0g" },
  { label: "Magnesium (as magnesium bisglycinate)", value: "100mg", dv: "24%" },
  { label: "Sodium (as sodium bicarbonate)", value: "80mg", dv: "3%" },
  { label: "Potassium (as potassium bicarbonate)", value: "100mg", dv: "2%" },
]

export const stacks: Stack[] = [
  {
    key: "focus",
    name: "AVRO Focus Stack",
    claim: "This stack supports focus and productivity without caffeine.",
    tagline: "Powered by Naturally Fermented GABA — Without Caffeine",
    accent: "var(--focus)",
    icon: "supports-focus-without-overload",
    flavors: [
      {
        name: "Pomegranate Raspberry",
        nutrition: FOCUS_NUTRITION,
        actives: [
          { name: "PharmaGABA® (Gamma-Aminobutyric Acid)", amount: "200mg" },
          { name: "COGNIGRAPE® (Grape fruit extract — Vitis vinifera)", amount: "250mg" },
        ],
        others:
          "Soluble Guar Fiber, Citric Acid, Modified Corn Starch, Natural Flavor, Contains 2% or less of Acacia Fiber, Stevia Leaf Extract, Silica.",
      },
      {
        name: "Red Dragon Fruit",
        nutrition: FOCUS_NUTRITION,
        actives: [
          { name: "PharmaGABA® (Gamma-Aminobutyric Acid)", amount: "200mg" },
          { name: "COGNIGRAPE® (Grape fruit extract — Vitis vinifera)", amount: "250mg" },
        ],
        others:
          "Soluble Guar Fiber, Citric Acid, Modified Corn Starch, Natural Flavor, Contains 2% or less of Acacia Fiber, Stevia Leaf Extract, Silica.",
      },
    ],
  },
  {
    key: "energy",
    name: "AVRO Energy Stack",
    claim: "This stack supports sustained energy and mental clarity.",
    tagline: "Powered by Naturally Fermented GABA — With Caffeine",
    accent: "var(--energy)",
    icon: "mental-clarity",
    flavors: [
      {
        name: "Fuji Apple",
        nutrition: ENERGY_NUTRITION,
        actives: [
          { name: "PharmaGABA® (Gamma-Aminobutyric Acid)", amount: "200mg" },
          { name: "Natural Caffeine (from Coffea arabica and Coffea canephora bean extract)", amount: "120mg" },
        ],
        others:
          "Soluble Guar Fiber, Citric Acid, Modified Corn Starch, Natural Flavor, Contains 2% or less of Acacia Fiber, Beta Carotene Color, Stevia Leaf Extract, Vegetable Juice Color, Spirulina Color, Silica.",
      },
      {
        name: "Orange Tangerine",
        nutrition: ENERGY_NUTRITION,
        actives: [
          { name: "PharmaGABA® (Gamma-Aminobutyric Acid)", amount: "200mg" },
          { name: "Natural Caffeine (from Coffea arabica and Coffea canephora bean extract)", amount: "120mg" },
        ],
        others:
          "Soluble Guar Fiber, Citric Acid, Modified Corn Starch, Contains 2% or less of Acacia Fiber, Beta Carotene Color, Stevia Leaf Extract, Natural Flavor, Silica.",
      },
    ],
  },
  {
    key: "calm",
    name: "AVRO Calm Stack",
    claim: "This stack supports stress reduction and improved sleep.",
    tagline: "Powered by Naturally Fermented GABA — With Magnesium",
    accent: "var(--calm)",
    icon: "relaxation-reduced-tension",
    flavors: [
      {
        name: "Blueberry Acai",
        nutrition: CALM_NUTRITION,
        actives: [
          { name: "PharmaGABA® (Gamma-Aminobutyric Acid)", amount: "200mg" },
          { name: "Magnesium Bisglycinate (yields 100mg active Magnesium from 850mg of the compound)", amount: "850mg" },
        ],
        others:
          "Soluble Guar Fiber, Citric Acid, Modified Corn Starch, Contains 2% or less of Acacia Fiber, Stevia Leaf Extract, Natural Flavor, Vegetable Juice Color, Spirulina Color, Silica.",
      },
      {
        name: "Blackberry Jasmine",
        nutrition: CALM_NUTRITION,
        actives: [
          { name: "PharmaGABA® (Gamma-Aminobutyric Acid)", amount: "200mg" },
          { name: "Magnesium Bisglycinate (yields 100mg active Magnesium from 850mg of the compound)", amount: "850mg" },
        ],
        others:
          "Soluble Guar Fiber, Citric Acid, Modified Corn Starch, Contains 2% or less of Acacia Fiber, Stevia Leaf Extract, Natural Flavor, Vegetable Juice Color, Spirulina Color, Silica.",
      },
    ],
  },
]

function FlavorCard({ flavor, accent }: { flavor: Flavor; accent: string }) {
  return (
    <article
      className="rounded-[20px] flex flex-col"
      style={{
        backgroundColor: "var(--bone)",
        border: "1px solid rgba(30,29,24,0.12)",
        padding: "clamp(22px,3vw,32px)",
        fontFamily: GC,
      }}
    >
      <div className="flex items-center gap-2.5 mb-5">
        <span aria-hidden="true" style={{ width: 12, height: 12, borderRadius: 999, backgroundColor: accent, flexShrink: 0 }} />
        <h4 className="font-serif font-black text-[clamp(20px,2vw,26px)] leading-none text-ink">{flavor.name}</h4>
      </div>

      {/* Active ingredients */}
      <p className="text-[12px] font-black tracking-[0.1em] uppercase text-warm-gray mb-3">Active Ingredients</p>
      <ul className="flex flex-col gap-2.5 mb-6">
        {flavor.actives.map((a) => (
          <li key={a.name} className="flex items-baseline justify-between gap-3 border-b border-[rgba(30,29,24,0.1)] pb-2.5">
            <span className="text-[14px] leading-snug text-ink font-medium">{a.name}</span>
            <span className="text-[14px] font-extrabold text-ink whitespace-nowrap">{a.amount}</span>
          </li>
        ))}
      </ul>

      {/* Nutrition facts */}
      <p className="text-[12px] font-black tracking-[0.1em] uppercase text-warm-gray mb-3">Nutrition Facts</p>
      <ul className="flex flex-col mb-6">
        {flavor.nutrition.map((n, i) => (
          <li
            key={n.label}
            className="flex items-baseline justify-between gap-3 py-2"
            style={{ borderTop: i === 0 ? "2px solid var(--ink)" : "1px solid rgba(30,29,24,0.1)" }}
          >
            <span className="text-[13px] leading-snug text-ink">{n.label}</span>
            <span className="text-[13px] text-ink whitespace-nowrap">
              <span className="font-bold">{n.value}</span>
              {n.dv ? <span className="text-warm-gray ml-2">{n.dv} DV</span> : null}
            </span>
          </li>
        ))}
      </ul>

      {/* Other ingredients */}
      <p className="text-[12px] font-black tracking-[0.1em] uppercase text-warm-gray mb-2">Other Ingredients</p>
      <p className="text-[13px] leading-relaxed text-ink/75 mt-auto">{flavor.others}</p>
    </article>
  )
}

export function IngredientStacks() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-[clamp(16px,5vw,64px)] flex flex-col gap-[clamp(20px,4vw,40px)]">
      {stacks.map((stack) => (
        <section key={stack.key} id={stack.key} className="rounded-[28px] p-[clamp(28px,5vw,64px)]" style={{ backgroundColor: "var(--base-light)" }}>
          <div className="flex flex-col gap-2 mb-8 max-w-[760px]">
            <span
              className="inline-flex items-center gap-2 self-start mb-1 px-3.5 py-1.5 rounded-full text-[12px] font-black tracking-[0.08em] uppercase"
              style={{ backgroundColor: stack.accent, color: "var(--charcoal)" }}
            >
              {stack.tagline}
            </span>
            <h2 className="font-serif font-black text-[clamp(28px,4vw,46px)] leading-[1.02] tracking-[-0.02em] text-ink">{stack.name}</h2>
            <p className="text-[clamp(16px,1.4vw,19px)] leading-relaxed text-warm-gray">{stack.claim}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {stack.flavors.map((flavor) => (
              <FlavorCard key={flavor.name} flavor={flavor} accent={stack.accent} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
