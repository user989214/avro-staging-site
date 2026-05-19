import { formulas, type FormulaKey, type Flavor } from "@/lib/data"
import { cn } from "@/lib/utils"

export type TubeScene = "tech" | "golf" | "social" | "gaming"

export const TUBE_SCENES: TubeScene[] = ["tech", "golf", "social", "gaming"]

export const TUBE_SCENE_LABELS: Record<TubeScene, string> = {
  tech: "Studio",
  golf: "On the course",
  social: "At the bar",
  gaming: "At the desk",
}

function flavorSlug(flavorName: string) {
  return flavorName.toLowerCase().replace(/\s+/g, "-")
}

function resolveFlavor(key: FormulaKey, flavorIdOrName?: string): Flavor {
  const formula = formulas[key]
  if (flavorIdOrName) {
    const match = formula.flavors.find(
      (f) => f.id === flavorIdOrName || f.name === flavorIdOrName,
    )
    if (match) return match
  }
  return formula.flavors[0]
}

/**
 * The PRIMARY product image. Returns the cohort display tube render
 * for a given scene + formula + flavor.
 */
export function tubeImageFor(
  scene: TubeScene,
  key: FormulaKey,
  flavorIdOrName?: string,
) {
  const formula = formulas[key]
  const flavor = resolveFlavor(key, flavorIdOrName)
  return {
    src: `/images/lifestyle/tube-${scene}-${key}-${flavorSlug(flavor.name)}.png`,
    alt: `AVRO ${formula.short} ${flavor.name} display tube — ${TUBE_SCENE_LABELS[scene]}`,
    sceneLabel: TUBE_SCENE_LABELS[scene],
    flavor,
  }
}

/**
 * All four cohort scene tubes for a single formula + flavor.
 * Used by PDP gallery thumbnails so customers can see the tube
 * in every relevant moment.
 */
export function allTubesFor(key: FormulaKey, flavorIdOrName?: string) {
  return TUBE_SCENES.map((scene) => ({
    scene,
    ...tubeImageFor(scene, key, flavorIdOrName),
  }))
}

/**
 * Loose stickpack render — used as a SECONDARY visual on swatches and
 * small selectors only. Not for primary product imagery.
 */
export function stickImageFor(key: FormulaKey, flavorIdOrName?: string) {
  const formula = formulas[key]
  const flavor = resolveFlavor(key, flavorIdOrName)
  return {
    src: `/images/sticks/${key}-${flavorSlug(flavor.name)}.png`,
    alt: `AVRO ${formula.short} ${flavor.name} drink mix stick`,
    flavor,
  }
}

interface ProductVisualProps {
  keys?: FormulaKey[]
  scene?: "stone" | "hero-stone" | "bundle" | "social" | FormulaKey
  size?: "small" | "medium" | "large"
  className?: string
  /** Cohort scene for the tube renders. Defaults to "tech" (studio). */
  tubeScene?: TubeScene
  /** Optional flavor override per formula key. */
  flavorIds?: Partial<Record<FormulaKey, string>>
}

export function ProductVisual({
  keys = ["calm", "focus", "energy"],
  scene = "stone",
  size = "large",
  className,
  tubeScene = "tech",
  flavorIds,
}: ProductVisualProps) {
  const stageSizeClasses = {
    small: "min-h-[240px] p-0",
    medium: "min-h-[300px] p-4 pb-6",
    large: "min-h-[360px] px-6 pt-10 pb-10",
  }

  const tubeSizeClasses = {
    small: "h-[240px] w-auto",
    medium: "h-[320px] w-auto",
    large: "h-[clamp(300px,38vw,480px)] w-auto",
  }

  return (
    <div
      className={cn(
        "relative flex items-end justify-center gap-[clamp(8px,1.8vw,20px)] isolate",
        stageSizeClasses[size],
        scene === "hero-stone" && "min-h-[470px]",
        className,
      )}
      aria-label="AVRO product lineup"
    >
      {keys.map((key, index) => {
        const { src, alt } = tubeImageFor(tubeScene, key, flavorIds?.[key])
        // Subtle stagger so multiple tubes feel like a styled lineup
        const offsetY =
          keys.length > 1
            ? Math.abs(index - (keys.length - 1) / 2) * -8
            : 0
        const z = keys.length - Math.abs(index - (keys.length - 1) / 2)

        return (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={key + (flavorIds?.[key] ?? "") + tubeScene}
            src={src}
            alt={alt}
            className={cn("object-contain", tubeSizeClasses[size])}
            style={{
              transform: `translateY(${offsetY}px)`,
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
  tubeScene?: TubeScene
  className?: string
}

/**
 * Single product visual for grid cards. Uses the tube render so every
 * shop tile and "you might also like" cell shows real product imagery.
 */
export function ProductCard({
  formulaKey,
  flavorId,
  tubeScene = "tech",
  className,
}: ProductCardProps) {
  const { src, alt } = tubeImageFor(tubeScene, formulaKey, flavorId)
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      className={cn(
        "h-[260px] w-auto object-contain",
        className,
      )}
    />
  )
}
