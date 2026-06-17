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
 * Visible inline marker for content that still needs real data / legal sign-off.
 * Intentionally obvious so reviewers can spot every open item.
 */
export function ReviewTODO({ children }: { children: ReactNode }) {
  return (
    <mark
      data-review-todo="true"
      style={{
        display: "inline-block",
        backgroundColor: "#FEF3C7",
        color: "#92400E",
        border: "1px dashed #D97706",
        borderRadius: 6,
        padding: "1px 6px",
        margin: "0 2px",
        fontSize: "0.72em",
        fontWeight: 700,
        letterSpacing: "0.02em",
        textTransform: "uppercase",
        verticalAlign: "middle",
        whiteSpace: "normal",
      }}
    >
      [REVIEW] {children}
    </mark>
  )
}
