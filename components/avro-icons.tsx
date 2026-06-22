import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * AVRO Custom Icon System
 * 
 * Maps semantic icon names to the custom PNG icons uploaded for the brand.
 * Golden variants (for /social page) are in /images/icons/gold/
 * Standard (white) icons are in /images/icons/
 * 
 * Icon naming conventions:
 * - cohort-* = Page-specific cohort icons (tech→work, golf→golf, games→gaming, zero-proof→social)
 * - free-* = "Free from" dietary icons (dairy, gmo, sugar, vegan)
 * - gluten-free = Gluten free dietary icon
 * - supports-* = Benefit/cognitive support icons
 * - step-* = How to use step icons (pour, stir, drink, pro-tip)
 * - zp-* = Zero Proof specific icons
 * - Others = Quality, science, and foundational icons
 */

// Standard icons (white/cream colored for light backgrounds)
export const avroIconMap = {
  // Calm First Foundation & Core
  "calm-first-foundation": "/images/icons/calm-first-foundation.png",
  "mind": "/images/icons/mind.png",
  "mind-body-diagram": "/images/icons/mind-body-diagram.png",
  "mental-clarity": "/images/icons/mental-clarity.png",
  
  // Clinically Tested / Science
  "clinically-tested-ingredients": "/images/icons/clinically-tested-ingredients.png",
  "naturally-fermented-pharmagaba": "/images/icons/naturally-fermented-pharmagaba.png",
  "science-backed": "/images/icons/science-backed.png",
  
  // Cohort Icons (page-specific)
  "cohort-games": "/images/icons/cohort-games.png",       // Gaming page
  "cohort-golf": "/images/icons/cohort-golf.png",         // Golf page
  "cohort-tech": "/images/icons/cohort-tech.png",         // Work page
  "cohort-zero-proof": "/images/icons/cohort-zero-proof.png", // Social page
  
  // Free From Icons (dietary - for PDP, product pages)
  "free-dairy": "/images/icons/free-dairy.png",
  "free-gmo": "/images/icons/free-gmo.png",
  "free-sugar": "/images/icons/free-sugar.png",
  "free-vegan": "/images/icons/free-vegan.png",
  "gluten-free": "/images/icons/gluten-free.png",
  
  // Quality & Standards
  "clear-labeling": "/images/icons/clear-labeling.png",
  "consistency-quality": "/images/icons/consistency-quality.png",
  "gmp-certified-facility": "/images/icons/gmp-certified-facility.png",
  "ingredient-disclosure": "/images/icons/ingredient-disclosure.png",
  "quality-standards": "/images/icons/quality-standards.png",
  "testing-documentation": "/images/icons/testing-documentation.png",
  "third-party-tested": "/images/icons/third-party-tested.png",
  "transparent-standards": "/images/icons/transparent-standards.png",
  
  // Supports/Benefits (cognitive & state)
  "control-under-pressure": "/images/icons/control-under-pressure.png",
  "supports-clear-thinking": "/images/icons/supports-clear-thinking.png",
  "supports-focus-without-overload": "/images/icons/supports-focus-without-overload.png",
  "supports-steady-attention": "/images/icons/supports-steady-attention.png",
  "recovery-sleep-support": "/images/icons/recovery-sleep-support.png",
  "relaxation-reduced-tension": "/images/icons/relaxation-reduced-tension.png",
  "social-composure": "/images/icons/social-composure.png",
  
  // Steps (How to Use)
  "step-pour": "/images/icons/step-pour.png",
  "step-stir": "/images/icons/step-stir.png",
  "step-drink": "/images/icons/step-drink.png",
  "step-pro-tip": "/images/icons/step-pro-tip.png",
  
  // Zero Proof specific (dark/charcoal versions for light backgrounds)
  "zp-built-for-bar": "/images/icons/zp-built-for-bar.png",
  "zp-calm-first-cocktails": "/images/icons/zp-calm-first-cocktails.png",
  "zp-function-forward": "/images/icons/zp-function-forward.png",
  "zp-margin-wins": "/images/icons/zp-margin-wins.png",
  "zp-na-cocktails-intention": "/images/icons/zp-na-cocktails-intention.png",
  "zp-social-lift": "/images/icons/zp-social-lift.png",
  "zp-zero-percent-alcohol": "/images/icons/zp-zero-percent-alcohol.png",
} as const

// Golden icons (for /social cohort page - dark backgrounds)
export const goldenIconMap = {
  // Calm First Foundation & Core
  "calm-first-foundation": "/images/icons/gold/calm-first-foundation.png",
  "mind": "/images/icons/gold/mind.png",
  "mind-body-diagram": "/images/icons/gold/mind-body-diagram.png",
  "mental-clarity": "/images/icons/gold/mental-clarity.png",
  
  // Clinically Tested / Science
  "clinically-tested-ingredients": "/images/icons/gold/clinically-tested-ingredients.png",
  "naturally-fermented-pharmagaba": "/images/icons/gold/naturally-fermented-pharmagaba.png",
  "science-backed": "/images/icons/gold/science-backed.png",
  
  // Cohort Icons
  "cohort-games": "/images/icons/gold/cohort-games.png",
  "cohort-golf": "/images/icons/gold/cohort-golf.png",
  "cohort-tech": "/images/icons/gold/cohort-tech.png",
  "cohort-zero-proof": "/images/icons/gold/cohort-zero-proof.png",
  
  // Free From Icons
  "free-dairy": "/images/icons/gold/free-dairy.png",
  "free-gmo": "/images/icons/gold/free-gmo.png",
  "free-sugar": "/images/icons/gold/free-sugar.png",
  "free-vegan": "/images/icons/gold/free-vegan.png",
  "gluten-free": "/images/icons/gold/gluten-free.png",
  
  // Quality & Standards
  "clear-labeling": "/images/icons/gold/clear-labeling.png",
  "consistency-quality": "/images/icons/gold/consistency-quality.png",
  "gmp-certified-facility": "/images/icons/gold/gmp-certified-facility.png",
  "ingredient-disclosure": "/images/icons/gold/ingredient-disclosure.png",
  "quality-standards": "/images/icons/gold/quality-standards.png",
  "testing-documentation": "/images/icons/gold/testing-documentation.png",
  "third-party-tested": "/images/icons/gold/third-party-tested.png",
  "transparent-standards": "/images/icons/gold/transparent-standards.png",
  
  // Supports/Benefits
  "control-under-pressure": "/images/icons/gold/control-under-pressure.png",
  "supports-clear-thinking": "/images/icons/gold/supports-clear-thinking.png",
  "supports-focus-without-overload": "/images/icons/gold/supports-focus-without-overload.png",
  "supports-steady-attention": "/images/icons/gold/supports-steady-attention.png",
  "recovery-sleep-support": "/images/icons/gold/recovery-sleep-support.png",
  "relaxation-reduced-tension": "/images/icons/gold/relaxation-reduced-tension.png",
  "social-composure": "/images/icons/gold/social-composure.png",
  
  // Steps (How to Use)
  "step-pour": "/images/icons/gold/step-pour.png",
  "step-stir": "/images/icons/gold/step-stir.png",
  "step-drink": "/images/icons/gold/step-drink.png",
  "step-pro-tip": "/images/icons/gold/step-pro-tip.png",
  
  // Zero Proof specific (golden versions for dark backgrounds)
  "zp-built-for-bar": "/images/icons/gold/zp-built-for-bar.png",
  "zp-calm-first-cocktails": "/images/icons/gold/zp-calm-first-cocktails.png",
  "zp-function-forward": "/images/icons/gold/zp-function-forward.png",
  "zp-margin-wins": "/images/icons/gold/zp-margin-wins.png",
  "zp-na-cocktails-intention": "/images/icons/gold/zp-na-cocktails-intention.png",
  "zp-social-lift": "/images/icons/gold/zp-social-lift.png",
  "zp-zero-percent-alcohol": "/images/icons/gold/zp-zero-percent-alcohol.png",
} as const

export type AvroIconName = keyof typeof avroIconMap
export type GoldenIconName = keyof typeof goldenIconMap
export type AnyAvroIconName = AvroIconName | GoldenIconName

/**
 * Formula-state icon colors — tied to the product tubes.
 * Only icons that REPRESENT a calm / focus / energy state are tinted; all other
 * icons (quality, dietary, steps, science, cohort, zero-proof) keep their
 * original appearance. The /social page uses the golden variant, which opts
 * out of tinting automatically.
 *   Calm   → indigo  #4b4d9a
 *   Focus  → magenta #C13584
 *   Energy → amber   #E8A23D
 */
export const formulaIconColors: Partial<Record<AvroIconName, string>> = {
  // Calm
  "calm-first-foundation": "#4b4d9a",
  "relaxation-reduced-tension": "#4b4d9a",
  "recovery-sleep-support": "#4b4d9a",
  "social-composure": "#4b4d9a",
  // Focus
  "supports-focus-without-overload": "#C13584",
  "supports-steady-attention": "#C13584",
  "supports-clear-thinking": "#C13584",
  "mental-clarity": "#C13584",
  "mind": "#C13584",
  // Energy
  "control-under-pressure": "#E8A23D",
}

interface AvroIconProps {
  name: AnyAvroIconName
  className?: string
  golden?: boolean
  size?: number
  style?: React.CSSProperties
  /**
   * Icon color control:
   * - a CSS color string (e.g. "#fff" or "var(--bone)") forces that color via a mask
   * - `false` disables tinting (renders the raw PNG)
   * - omitted (default) auto-tints formula-state icons with their tube color
   */
  tint?: string | false
}

/**
 * AvroIcon - Renders custom AVRO brand icons
 * 
 * @param name - Icon name from the icon map
 * @param className - Additional CSS classes
 * @param golden - Use golden variant (for /social page dark backgrounds)
 * @param size - Icon size in pixels (default 40)
 * @param tint - Override/disable color tinting (see AvroIconProps)
 */
export function AvroIcon({ name, className, golden = false, size = 40, style, tint }: AvroIconProps) {
  // Get the source path - try golden first if requested, then fall back to standard
  const goldenSrc = goldenIconMap[name as keyof typeof goldenIconMap]
  const standardSrc = avroIconMap[name as keyof typeof avroIconMap]
  
  const src = (golden && goldenSrc) ? goldenSrc : standardSrc
  
  if (!src) {
    return null
  }

  // Resolve the effective tint color. No icon should render black/raw.
  // Priority:
  //  1. explicit `tint` string  → forced color
  //  2. `tint === false`        → opt out (raw PNG)
  //  3. golden /social variant  → rendered from the gold PNG below (no mask)
  //  4. formula-state icon       → its tube color (calm/focus/energy), always
  //  5. everything else          → the page spot color via --icon-spot
  //     (defaults to AVRO blue; golf/PDP pages override --icon-spot)
  const autoColor = formulaIconColors[name as AvroIconName]
  const tintColor =
    tint === false
      ? undefined
      : typeof tint === "string"
        ? tint
        : golden
          ? undefined
          : autoColor ?? "var(--icon-spot, var(--avro-blue-deep))"

  // Tinted icons render as a CSS-mask span so the PNG's alpha drives the shape
  // while the color comes from the formula/tube palette.
  if (tintColor) {
    return (
      <span
        aria-hidden="true"
        className={cn("inline-block", className)}
        style={{
          width: size,
          height: size,
          flexShrink: 0,
          backgroundColor: tintColor,
          WebkitMaskImage: `url(${src})`,
          maskImage: `url(${src})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          ...style,
        }}
      />
    )
  }
  
  // Use regular img for golden icons to avoid Next.js Image optimization issues
  if (golden && goldenSrc) {
    return (
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        className={cn("object-contain", className)}
        style={style}
        aria-hidden="true"
      />
    )
  }
  
  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      className={cn("object-contain", className)}
      style={style}
      aria-hidden="true"
    />
  )
}

/**
 * Mapping from old Lucide icon names to new AVRO icon names
 * This helps with migration from the old icon system
 */
export const lucideToAvroMap: Record<string, AvroIconName> = {
  // Foundational
  "leaf": "calm-first-foundation",
  "flask": "clinically-tested-ingredients",
  "beaker": "consistency-quality",
  "shield": "quality-standards",
  "shield-check": "third-party-tested",
  
  // Benefits/State
  "brain": "supports-clear-thinking",
  "target": "supports-focus-without-overload",
  "bolt": "control-under-pressure",
  "zap": "control-under-pressure",
  "smile": "social-composure",
  "moon": "recovery-sleep-support",
  "heart": "relaxation-reduced-tension",
  
  // Steps
  "cup": "step-pour",
  "clock": "step-drink",
  
  // Quality
  "microscope": "science-backed",
  "sprout": "free-vegan",
  "wheat": "gluten-free",
  "badge-check": "gmp-certified-facility",
  "book": "clear-labeling",
  "scale": "transparent-standards",
  
  // Cohorts
  "gamepad": "cohort-games",
  "flag": "cohort-golf",
  "monitor": "cohort-tech",
  "wine": "cohort-zero-proof",
  "briefcase": "cohort-tech",
  "users": "social-composure",
  "star": "quality-standards",
}

/**
 * Helper to get AVRO icon name from old Lucide name
 * Returns the original name if no mapping exists
 */
export function getAvroIconName(lucideName: string): AvroIconName | string {
  return lucideToAvroMap[lucideName] || lucideName
}
