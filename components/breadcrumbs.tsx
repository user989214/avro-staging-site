import { Fragment } from "react"

const GC = '"DM Sans", system-ui, sans-serif'

export type Crumb = { label: string; href?: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    // Full-width band matches the surface below it (white on desktop, grey on
    // mobile where the hero is full-bleed) so there's no white/grey seam.
    <div className="crumb-band">
    <nav
      aria-label="Breadcrumb"
      style={{
        width: "100%",
        maxWidth: 1440,
        margin: "0 auto",
        padding: "clamp(16px,2.5vw,24px) clamp(16px,5vw,64px) clamp(8px,1.5vw,12px)",
      }}
    >
      {/* Soft rounded pill keeps the trail in line with the site's card/button style */}
      <ol
        className="crumb-pill"
        style={{
          display: "inline-flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 6,
          listStyle: "none",
          margin: 0,
          padding: "7px 14px",
          borderRadius: 999,
          fontFamily: GC,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.01em",
          maxWidth: "100%",
        }}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <Fragment key={`${item.label}-${i}`}>
              <li style={{ display: "flex", alignItems: "center", minWidth: 0 }}>
                {item.href && !isLast ? (
                  <a
                    href={item.href}
                    className="crumb-link"
                    style={{ color: "var(--ink)", opacity: 0.5, textDecoration: "none", transition: "opacity 160ms ease", whiteSpace: "nowrap" }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    style={{
                      color: "var(--ink)",
                      opacity: isLast ? 1 : 0.5,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "60vw",
                    }}
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && (
                <li
                  aria-hidden="true"
                  style={{ display: "flex", alignItems: "center", color: "var(--ink)", opacity: 0.3 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                </li>
              )}
            </Fragment>
          )
        })}
      </ol>
      <style>{`
        .crumb-band { width: 100%; background-color: var(--base); }
        .crumb-pill { background-color: var(--base-light); border: 1px solid transparent; }
        .crumb-link:hover { opacity: 1 !important; }
        @media (max-width: 768px) {
          .crumb-band { background-color: var(--base-light); }
          .crumb-pill { background-color: var(--base); border-color: rgba(0,0,0,0.06); }
        }
      `}</style>
    </nav>
    </div>
  )
}
