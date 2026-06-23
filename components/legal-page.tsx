import { Section } from "@/components/sections"
import { PageHero } from "@/components/page-hero"

export type LegalSection = {
  heading: string
  body: string[]
}

/**
 * Shared layout for simple long-form policy / info pages
 * (Privacy, Terms, Accessibility, Returns). Uses the same flat hero +
 * constrained Section rhythm as the rest of the site.
 */
export function LegalPage({
  title,
  lede,
  updated,
  sections,
}: {
  title: string
  lede: string
  updated?: string
  sections: LegalSection[]
}) {
  return (
    <>
      <PageHero
        variant="flat"
        title={title}
        lede={lede}
        imageSrc=""
        imageAlt=""
        compact
        centered
      />

      <Section className="!py-[clamp(40px,5vw,72px)]">
        <div className="mx-auto w-full max-w-[760px]">
          {updated && (
            <p
              className="mb-8"
              style={{ fontSize: 13, color: "var(--warm-gray)" }}
            >
              Last updated: {updated}
            </p>
          )}

          <div className="flex flex-col gap-9">
            {sections.map((s) => (
              <div key={s.heading} className="flex flex-col gap-3">
                <h2
                  style={{
                    fontWeight: 800,
                    fontSize: "clamp(20px,2.4vw,26px)",
                    lineHeight: 1.2,
                    color: "var(--ink)",
                  }}
                >
                  {s.heading}
                </h2>
                {s.body.map((p, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: 15,
                      lineHeight: 1.65,
                      color: "var(--warm-gray)",
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
