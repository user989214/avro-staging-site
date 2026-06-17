import type { ReactNode } from "react"

/**
 * Compliance / legal-review helpers for the AVRO 2.0 redline pass.
 *
 * Per legal-review direction:
 *  - Structure/Function claims get a simple asterisk marker (final disclaimer
 *    wording will be supplied by Erin later — no sitewide footer text yet).
 *  - Items that need data we don't have yet (supplement facts, label specifics,
 *    chart sources, correct links) get a VISIBLE review marker so they are
 *    tracked and easy to find.
 */

/** Inline asterisk appended to a structure/function claim. */
export function ClaimMark() {
  return (
    <sup
      aria-hidden="true"
      title="Structure/function claim — disclaimer wording pending legal review"
      style={{
        color: "var(--avro-blue, #2563eb)",
        fontWeight: 700,
        fontSize: "0.7em",
        lineHeight: 0,
        marginLeft: "0.05em",
      }}
    >
      *
    </sup>
  )
}

/**
 * Subtle source / citation line shown under a chart or data graphic.
 * Styled to match the quiet footnote captions used elsewhere on the site.
 */
export function ChartSource({
  children,
  dark = false,
}: {
  children: ReactNode
  dark?: boolean
}) {
  return (
    <p
      style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 400,
        fontSize: 12,
        lineHeight: 1.5,
        letterSpacing: "0.01em",
        color: dark ? "rgba(245,240,232,0.55)" : "rgba(0,0,0,0.42)",
        marginTop: 14,
        marginBottom: 0,
      }}
    >
      {children}
    </p>
  )
}
