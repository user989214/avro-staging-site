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
  { label: "Calories", value: "00" },
  { label: "Lorem ipsum dolor", value: "00g", dv: "0%" },
  { label: "Total Sugars", value: "0g" },
  { label: "Consectetur (as adipiscing)", value: "00mg", dv: "0%" },
  { label: "Elit sed (as bicarbonate)", value: "00mg", dv: "0%" },
]

const ENERGY_NUTRITION = FOCUS_NUTRITION

const CALM_NUTRITION: NutritionRow[] = [
  { label: "Calories", value: "00" },
  { label: "Lorem ipsum dolor", value: "00g", dv: "0%" },
  { label: "Total Sugars", value: "0g" },
  { label: "Magnesium (as lorem bisglycinate)", value: "00mg", dv: "0%" },
  { label: "Consectetur (as adipiscing)", value: "00mg", dv: "0%" },
  { label: "Elit sed (as bicarbonate)", value: "00mg", dv: "0%" },
]

export const stacks: Stack[] = [
  {
    key: "focus",
    name: "AVRO Focus Stack",
    claim: "This stack supports focus and productivity without caffeine.*",
    tagline: "Powered by Naturally Fermented GABA — Without Caffeine",
    accent: "var(--avro-blue)",
    icon: "supports-focus-without-overload",
    flavors: [
      {
        name: "Pomegranate Raspberry",
        nutrition: FOCUS_NUTRITION,
        actives: [
          { name: "PharmaGABA® (Gamma-Aminobutyric Acid)", amount: "00mg" },
          { name: "Lorem ipsum dolor (sit amet consectetur)", amount: "00mg" },
        ],
        others:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        name: "Red Dragon Fruit",
        nutrition: FOCUS_NUTRITION,
        actives: [
          { name: "PharmaGABA® (Gamma-Aminobutyric Acid)", amount: "00mg" },
          { name: "Lorem ipsum dolor (sit amet consectetur)", amount: "00mg" },
        ],
        others:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
    ],
  },
  {
    key: "energy",
    name: "AVRO Energy Stack",
    claim: "This stack supports sustained energy and mental clarity.*",
    tagline: "Powered by Naturally Fermented GABA — With Caffeine",
    accent: "var(--avro-blue)",
    icon: "mental-clarity",
    flavors: [
      {
        name: "Fuji Apple",
        nutrition: ENERGY_NUTRITION,
        actives: [
          { name: "PharmaGABA® (Gamma-Aminobutyric Acid)", amount: "00mg" },
          { name: "Lorem ipsum dolor (sit amet consectetur adipiscing)", amount: "00mg" },
        ],
        others:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.",
      },
      {
        name: "Orange Tangerine",
        nutrition: ENERGY_NUTRITION,
        actives: [
          { name: "PharmaGABA® (Gamma-Aminobutyric Acid)", amount: "00mg" },
          { name: "Lorem ipsum dolor (sit amet consectetur adipiscing)", amount: "00mg" },
        ],
        others:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.",
      },
    ],
  },
  {
    key: "calm",
    name: "AVRO Calm Stack",
    claim: "This stack supports stress reduction and improved sleep.*",
    tagline: "Powered by Naturally Fermented GABA — With Magnesium",
    accent: "var(--avro-blue)",
    icon: "relaxation-reduced-tension",
    flavors: [
      {
        name: "Blueberry Acai",
        nutrition: CALM_NUTRITION,
        actives: [
          { name: "PharmaGABA® (Gamma-Aminobutyric Acid)", amount: "00mg" },
          { name: "Lorem ipsum (yields 00mg active lorem from 00mg of the compound)", amount: "00mg" },
        ],
        others:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.",
      },
      {
        name: "Blackberry Jasmine",
        nutrition: CALM_NUTRITION,
        actives: [
          { name: "PharmaGABA® (Gamma-Aminobutyric Acid)", amount: "00mg" },
          { name: "Lorem ipsum (yields 00mg active lorem from 00mg of the compound)", amount: "00mg" },
        ],
        others:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.",
      },
    ],
  },
]

function FlavorCard({ flavor }: { flavor: Flavor }) {
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
      <h4 className="font-serif font-black text-[clamp(20px,2vw,26px)] leading-none text-ink mb-5">{flavor.name}</h4>

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
            <h2 className="font-serif font-black text-[clamp(28px,4vw,46px)] leading-[1.02] tracking-[-0.02em] text-ink">{stack.name}</h2>
            <p className="text-[clamp(16px,1.4vw,19px)] leading-relaxed text-warm-gray">{stack.claim}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {stack.flavors.map((flavor) => (
              <FlavorCard key={flavor.name} flavor={flavor} />
            ))}
          </div>

          <p className="mt-5 text-[13px] leading-relaxed text-warm-gray">
            Lorem ipsum — placeholder label data for {stack.name}. Values shown are illustrative
            only and are not the final approved label.
          </p>
        </section>
      ))}
    </div>
  )
}
