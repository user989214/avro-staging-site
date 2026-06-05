import { formulas, type FormulaKey, type Flavor } from "@/lib/data"
import { cn } from "@/lib/utils"

export type TubeScene = "studio" | "tech" | "golf" | "social" | "gaming"

export const TUBE_SCENES: TubeScene[] = ["studio", "tech", "golf", "social", "gaming"]

export const TUBE_SCENE_LABELS: Record<TubeScene, string> = {
  studio: "Studio",
  tech: "At the desk",
  golf: "On the course",
  social: "At the bar",
  gaming: "Late-night setup",
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
  const slug = flavorSlug(flavor.name)
  // The "studio" scene uses the clean white-background packshots and is
  // available for every flavor. All other scenes are cohort lifestyle PNGs.
  const src =
    scene === "studio"
      ? `/images/tubes/studio/${key}-${slug}.png`
      : `/images/lifestyle/tube-${scene}-${key}-${slug}.png`
  return {
    src,
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

/**
 * Registry of flavors that have a dedicated "in the glass" lifestyle
 * photo (hands holding the tube next to a prepared drink). Keyed by
 * `${formulaKey}-${flavorSlug}`. Only these get the lifestyle slot in
 * the PDP gallery so we never render a 404 for flavors without one.
 */
const GLASS_LIFESTYLE_FLAVORS = new Set<string>([
  "calm-blackberry-jasmine",
  "calm-blueberry-acai",
  "focus-red-dragon-fruit",
  "focus-pomegranate-raspberry",
])

/**
 * "In the glass" lifestyle shot for a flavor, if one exists.
 * Returns null when the flavor has no dedicated lifestyle photo.
 */
export function glassLifestyleFor(key: FormulaKey, flavorIdOrName?: string) {
  const formula = formulas[key]
  const flavor = resolveFlavor(key, flavorIdOrName)
  const slug = flavorSlug(flavor.name)
  if (!GLASS_LIFESTYLE_FLAVORS.has(`${key}-${slug}`)) return null
  return {
    src: `/images/lifestyle/glass-${key}-${slug}.jpg`,
    alt: `AVRO ${formula.short} ${flavor.name} prepared in a glass`,
    flavor,
  }
}

/**
 * Solo display tube render — the canister by itself with sticks inside,
 * on a clean white background. Used on the PDP gallery as the dedicated
 * "Display Tube" view.
 */
export function soloTubeImageFor(key: FormulaKey, flavorIdOrName?: string) {
  const formula = formulas[key]
  const flavor = resolveFlavor(key, flavorIdOrName)
  return {
    src: `/images/tubes/solo/${key}-${flavorSlug(flavor.name)}.jpg`,
    alt: `AVRO ${formula.short} ${flavor.name} display tube`,
    flavor,
  }
}

interface ProductVisualProps {
  keys?: FormulaKey[]
  scene?: "stone" | "hero-stone" | "bundle" | "social" | FormulaKey
  size?: "small" | "medium" | "large"
  className?: string
  /** Cohort scene for the tube renders. Defaults to "studio" (white-background packshot). */
  tubeScene?: TubeScene
  /** Optional flavor override per formula key. */
  flavorIds?: Partial<Record<FormulaKey, string>>
}

export function ProductVisual({
  keys = ["calm", "focus", "energy"],
  scene = "stone",
  size = "large",
  className,
  tubeScene = "studio",
  flavorIds,
}: ProductVisualProps) {
  const stageSizeClasses = {
    small: "min-h-[300px] p-0",
    medium: "min-h-[380px] p-4 pb-6",
    large: "min-h-[460px] px-6 pt-10 pb-10",
  }

  const tubeSizeClasses = {
    small: "h-[300px] w-auto",
    medium: "h-[400px] w-auto",
    large: "h-[clamp(380px,44vw,560px)] w-auto",
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
  tubeScene = "studio",
  className,
}: ProductCardProps) {
  const { src, alt } = tubeImageFor(tubeScene, formulaKey, flavorId)
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      className={cn(
        "h-full w-auto max-w-full object-contain",
        className,
      )}
    />
  )
}
