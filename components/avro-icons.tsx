import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * AVRO Custom Icon System
 * 
 * Maps semantic icon names to the custom PNG icons uploaded for the brand.
 * Golden variants (for /social page) are in /icons/golden/
 * Standard icons are in /icons/
 */

// Standard icons (cream/light colored for general use)
export const avroIconMap = {
  // Calm First Foundation
  "calm-first-foundation": "/icons/calm-first-foundation.png",
  
  // Clinically Tested Ingredients
  "clinically-tested-ingredients": "/icons/clinically-tested-ingredients.png",
  
  // Cohort Icons
  "cohort-games": "/icons/cohort-games.png",
  "cohort-golf": "/icons/cohort-golf.png",
  "cohort-tech": "/icons/cohort-tech.png",
  "cohort-zero-proof": "/icons/cohort-zero-proof.png",
  
  // Free From Icons
  "free-dairy": "/icons/free-dairy.png",
  "free-gmo": "/icons/free-gmo.png",
  "free-sugar": "/icons/free-sugar.png",
  "free-vegan": "/icons/free-vegan.png",
  "gluten-free": "/icons/gluten-free.png",
  
  // Quality & Standards
  "clear-labeling": "/icons/clear-labeling.png",
  "consistency-and-quality": "/icons/consistency-and-quality.png",
  "control-under-pressure": "/icons/control-under-pressure.png",
  "gmp-certified-facility": "/icons/gmp-certified-facility.png",
  "quality-standards": "/icons/quality-standards.png",
  "science-backed": "/icons/science-backed.png",
  "testing-and-documentation": "/icons/testing-and-documentation.png",
  "third-party-tested": "/icons/third-party-tested.png",
  "transparent-standards": "/icons/transparent-standards.png",
  
  // Supports/Benefits
  "supports-clear-thinking": "/icons/supports-clear-thinking.png",
  "supports-focus-without-overload": "/icons/supports-focus-without-overload.png",
  "supports-steady-attention": "/icons/supports-steady-attention.png",
  "recovery-sleep-support": "/icons/recovery-sleep-support.png",
  "relaxation-reduced-tension": "/icons/relaxation-reduced-tension.png",
  "social-composure": "/icons/social-composure.png",
  
  // Steps (How to Use)
  "step-pour": "/icons/step-pour.png",
  "step-stir": "/icons/step-stir.png",
  "step-drink": "/icons/step-drink.png",
  "step-pro-tip": "/icons/step-pro-tip.png",
  
  // Zero Proof specific
  "zp-nacocktails-with-intention": "/icons/zp-nacocktails-with-intention.png",
  "zp-zero-percent-alcohol": "/icons/zp-zero-percent-alcohol.png",
  "zp-margin-wins": "/icons/zp-margin-wins.png",
  "zp-calm-first-cocktails": "/icons/zp-calm-first-cocktails.png",
  "zp-social-lift": "/icons/zp-social-lift.png",
  "zp-built-for-the-bar": "/icons/zp-built-for-the-bar.png",
  "zp-function-forward": "/icons/zp-function-forward.png",
} as const

// Golden icons (for /social cohort page only)
export const goldenIconMap = {
  // Calm First Foundation
  "calm-first-foundation": "/icons/golden/calm-first-foundation.png",
  
  // Clinically Tested Ingredients
  "clinically-tested-ingredients": "/icons/golden/clinically-tested-ingredients.png",
  
  // Cohort Icons
  "cohort-games": "/icons/golden/cohort-games.png",
  "cohort-golf": "/icons/golden/cohort-golf.png",
  "cohort-tech": "/icons/golden/cohort-tech.png",
  "cohort-zero-proof": "/icons/golden/cohort-zero-proof.png",
  
  // Free From Icons
  "free-dairy": "/icons/golden/free-dairy.png",
  "free-gmo": "/icons/golden/free-gmo.png",
  "free-sugar": "/icons/golden/free-sugar.png",
  "free-vegan": "/icons/golden/free-vegan.png",
  "gluten-free": "/icons/golden/gluten-free.png",
  
  // Quality & Standards
  "clear-labeling": "/icons/golden/clear-labeling.png",
  "consistency-and-quality": "/icons/golden/consistency-and-quality.png",
  "control-under-pressure": "/icons/golden/control-under-pressure.png",
  "gmp-certified-facility": "/icons/golden/gmp-certified-facility.png",
  "quality-standards": "/icons/golden/quality-standards.png",
  "science-backed": "/icons/golden/science-backed.png",
  "ingredient-disclosure": "/icons/golden/ingredient-disclosure.png",
  
  // Supports/Benefits (use standard icons since golden equivalents may not exist for all)
  "supports-clear-thinking": "/icons/golden/supports-clear-thinking.png",
  "supports-focus-without-overload": "/icons/supports-focus-without-overload.png", // fallback to standard
  "mind": "/icons/golden/mind.png",
  "mind-body-diagram": "/icons/golden/mind-body-diagram.png",
  "mental-clarity": "/icons/golden/mental-clarity.png",
  "naturally-fermented-pharmagaba": "/icons/golden/naturally-fermented-pharmagaba.png",
  "recovery-sleep-support": "/icons/golden/recovery-sleep-support.png",
  "relaxation-reduced-tension": "/icons/golden/relaxation-reduced-tension.png",
  "social-composure": "/icons/golden/social-composure.png",
  
  // Steps (How to Use)
  "step-pour": "/icons/golden/step-pour.png",
  "step-stir": "/icons/golden/step-stir.png",
  "step-drink": "/icons/golden/step-drink.png",
  "step-pro-tip": "/icons/golden/step-pro-tip.png",
} as const

export type AvroIconName = keyof typeof avroIconMap
export type GoldenIconName = keyof typeof goldenIconMap
export type AnyAvroIconName = AvroIconName | GoldenIconName

interface AvroIconProps {
  name: AnyAvroIconName
  className?: string
  golden?: boolean
  size?: number
}

/**
 * AvroIcon - Renders custom AVRO brand icons
 * 
 * @param name - Icon name from the icon map
 * @param className - Additional CSS classes
 * @param golden - Use golden variant (for /social page)
 * @param size - Icon size in pixels (default 40)
 */
export function AvroIcon({ name, className, golden = false, size = 40 }: AvroIconProps) {
  // Get the source path - try golden first if requested, then fall back to standard
  const goldenSrc = goldenIconMap[name as keyof typeof goldenIconMap]
  const standardSrc = avroIconMap[name as keyof typeof avroIconMap]
  
  const src = (golden && goldenSrc) ? goldenSrc : standardSrc
  
  if (!src) {
    return null
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
  "beaker": "consistency-and-quality",
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
