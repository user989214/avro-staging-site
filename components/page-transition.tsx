"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

/**
 * Subtle cross-fade between routes (e.g. social ↔ golf).
 * Re-keying on pathname restarts the fade-in animation on each navigation.
 * Respects prefers-reduced-motion via the CSS in globals.css.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  return (
    <main key={pathname} className="min-h-[60vh] page-transition">
      {children}
    </main>
  )
}
