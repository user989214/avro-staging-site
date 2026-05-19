import { formulas, type FormulaKey, type Flavor } from "@/lib/data"
import { cn } from "@/lib/utils"

interface ProductVisualProps {
  keys?: FormulaKey[]
  scene?: "stone" | "hero-stone" | "bundle" | "social" | FormulaKey
  size?: "small" | "medium" | "large"
  className?: string
  /** Optional flavor override per formula key (id). Defaults to first flavor of that formula. */
  flavorIds?: Partial<Record<FormulaKey, string>>
}

function flavorSlug(flavorName: string) {
  return flavorName.toLowerCase().replace(/\s+/g, "-")
}

export function stickImageFor(key: FormulaKey, flavorIdOrName?: string) {
  const formula = formulas[key]
  let flavor: Flavor = formula.flavors[0]
  if (flavorIdOrName) {
    const match = formula.flavors.find(
      (f) => f.id === flavorIdOrName || f.name === flavorIdOrName,
    )
    if (match) flavor = match
  }
  return {
    src: `/images/sticks/${key}-${flavorSlug(flavor.name)}.png`,
    alt: `AVRO ${formula.short} ${flavor.name} drink mix stick`,
    flavor,
  }
}

export function ProductVisual({
  keys = ["calm", "focus", "energy"],
  scene = "stone",
  size = "large",
  className,
  flavorIds,
}: ProductVisualProps) {
  const stageSizeClasses = {
    small: "min-h-[240px] p-0",
    medium: "min-h-[300px] p-4 pb-6",
    large: "min-h-[360px] px-6 pt-10 pb-10",
  }

  const stickSizeClasses = {
    small: "h-[210px] w-auto",
    medium: "h-[280px] w-auto",
    large: "h-[clamp(260px,32vw,420px)] w-auto",
  }

  return (
    <div
      className={cn(
        "relative flex items-end justify-center gap-[clamp(10px,2.5vw,28px)] isolate",
        stageSizeClasses[size],
        scene === "hero-stone" && "min-h-[470px]",
        className,
      )}
      aria-label="AVRO product lineup"
    >
      {keys.map((key, index) => {
        const { src, alt } = stickImageFor(key, flavorIds?.[key])
        const tilt = keys.length > 1 ? (index - (keys.length - 1) / 2) * 4 : 0
        const z = keys.length - Math.abs(index - (keys.length - 1) / 2)

        return (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={key + (flavorIds?.[key] ?? "")}
            src={src}
            alt={alt}
            className={cn(
              "object-contain drop-shadow-[0_22px_32px_rgba(30,24,20,0.22)]",
              stickSizeClasses[size],
            )}
            style={{
              transform: `rotate(${tilt}deg) translateY(${Math.abs(tilt) * 0.6}px)`,
              zIndex: z,
            }}
          />
        )
      })}
    </div>
  )
}

interface ProductCardProps {
  formulaKey: FormulaKey
  flavorId?: string
  className?: string
}

export function ProductCard({ formulaKey, flavorId, className }: ProductCardProps) {
  const { src, alt } = stickImageFor(formulaKey, flavorId)
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      className={cn(
        "h-[230px] w-auto object-contain drop-shadow-[0_18px_28px_rgba(30,24,20,0.2)]",
        className,
      )}
    />
  )
}
