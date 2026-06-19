import { type AvroIconName } from "@/components/avro-icons"
import { supplementFactsByFlavor } from "@/lib/data"

const GC = '"DM Sans", system-ui, sans-serif'

type Flavor = {
  name: string
  flavorId: string
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

export const stacks: Stack[] = [
  {
    key: "focus",
    name: "AVRO Focus Stack",
    claim: "This stack supports focus and productivity without caffeine.*",
    tagline: "Powered by Naturally Fermented GABA — Without Caffeine",
    accent: "var(--avro-blue)",
    icon: "supports-focus-without-overload",
    flavors: [
      { name: "Pomegranate Raspberry", flavorId: "pomegranate-raspberry" },
      { name: "Red Dragon Fruit", flavorId: "red-dragon-fruit" },
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
      { name: "Fuji Apple", flavorId: "fuji-apple" },
      { name: "Orange Tangerine", flavorId: "orange-tangerine" },
    ],
  },
  {
    key: "calm",
    name: "AVRO Calm Stack",
    claim: "This stack supports stress reduction and a calm, clear state.*",
    tagline: "Powered by Naturally Fermented GABA — With Magnesium",
    accent: "var(--avro-blue)",
    icon: "relaxation-reduced-tension",
    flavors: [
      { name: "Blueberry Acai", flavorId: "blueberry-acai" },
      { name: "Blackberry Jasmine", flavorId: "blackberry-jasmine" },
    ],
  },
]

function FlavorCard({ flavor }: { flavor: Flavor }) {
  const panelSrc = supplementFactsByFlavor[flavor.flavorId]
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

      {/* Approved Supplement Facts panel — rendered directly from the label graphic */}
      <div className="rounded-[12px] overflow-hidden" style={{ border: "1px solid rgba(30,29,24,0.1)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={panelSrc || "/placeholder.svg"}
          alt={`${flavor.name} Supplement Facts panel`}
          className="w-full h-auto block"
          style={{ backgroundColor: "var(--base)" }}
        />
      </div>
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
            Serving size 1 packet (5 g) · 10 servings per container. {stack.tagline}.
          </p>
        </section>
      ))}
    </div>
  )
}
