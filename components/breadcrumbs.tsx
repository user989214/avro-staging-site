import { Fragment } from "react"

const GC = '"DM Sans", system-ui, sans-serif'

export type Crumb = { label: string; href?: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{ width: "100%", maxWidth: 1440, margin: "0 auto", padding: "clamp(12px,2vw,20px) clamp(16px,5vw,64px) 0" }}
    >
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
          listStyle: "none",
          margin: 0,
          padding: 0,
          fontFamily: GC,
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "0.01em",
        }}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <Fragment key={`${item.label}-${i}`}>
              <li style={{ display: "flex", alignItems: "center" }}>
                {item.href && !isLast ? (
                  <a
                    href={item.href}
                    style={{ color: "var(--ink)", opacity: 0.55, textDecoration: "none", transition: "opacity 160ms ease" }}
                    className="crumb-link"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span aria-current={isLast ? "page" : undefined} style={{ color: "var(--ink)", opacity: isLast ? 1 : 0.55 }}>
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true" style={{ color: "var(--ink)", opacity: 0.35, lineHeight: 1 }}>
                  /
                </li>
              )}
            </Fragment>
          )
        })}
      </ol>
      <style>{`.crumb-link:hover{opacity:1 !important;}`}</style>
    </nav>
  )
}
