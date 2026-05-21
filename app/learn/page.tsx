import Link from "next/link"
import {
  Section,
  SectionHeading,
  CtaGroup,
  SocialProof,
  FinalCta,
} from "@/components/sections"
import { Icon } from "@/components/icons"

export const metadata = {
  title: "Learn | AVRO",
  description: "Learn how AVRO thinks about calm performance, PharmaGABA®, calm-first energy, and choosing the right formula.",
}

const articleGroups = [
  {
    title: "Start Here",
    articles: [
      "What Is Calm Performance?",
      "Why More Energy Is Not Always the Answer",
      "Calm First vs. Stimulant First: What's the Difference?",
    ],
  },
  {
    title: "Science of Calm",
    articles: [
      "What Is GABA?",
      "What Is PharmaGABA®?",
      "Why Fermentation Matters in AVRO",
    ],
  },
  {
    title: "Formula Guides",
    articles: [
      "AVRO Calm vs. Focus vs. Energy",
      "Why AVRO Focus Is Caffeine Free",
      "What Makes AVRO Energy Different?",
    ],
  },
  {
    title: "Use Guides",
    articles: [
      "What to Drink Before Golf When You Do Not Want More Caffeine",
      "A Calm First Routine Before Deep Work",
      "Why Long Gaming Sessions Do Not Always Need More Stimulation",
    ],
  },
]

/* Gotham Condensed hierarchy for this page:
   Ultra (950)  → hero h1
   Black (800)  → section h2, card h3, article links
   Bold (700)   → eyebrow labels, icon row text
   Medium (500) → body copy / descriptions
   Book (400)   → meta / secondary text
*/
const gc = (weight: number, extra?: string) =>
  `font-family: "Gotham Condensed"; font-weight: ${weight};${extra ? ` ${extra}` : ""}`

export default function LearnPage() {
  return (
    <>
      {/* Hero */}
      <section className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(56px,9vw,112px)] bg-gradient-to-br from-[#fffdf8] to-[#f7f4ec] border-b border-line">
        <div className="flex flex-col items-center text-center max-w-[820px] mx-auto">
          <h1
            className="text-[clamp(56px,8vw,108px)] leading-[0.96] mb-6 text-balance"
            style={{ fontFamily: '"Gotham Condensed"', fontWeight: 950 }}
          >
            Category ownership, not content noise.
          </h1>
          <p
            className="max-w-[680px] text-muted-foreground text-[clamp(20px,2.2vw,26px)] leading-relaxed text-pretty"
            style={{ fontFamily: '"Gotham Condensed"', fontWeight: 500 }}
          >
            Learn how AVRO thinks about calm performance, PharmaGABA®,
            calm-first energy, state before pressure moments, and choosing the
            right formula.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Link
              href="/learn"
              className="btn-primary"
              style={{ fontFamily: '"Gotham Condensed"', fontWeight: 800, fontSize: "20px", minHeight: "60px", paddingLeft: "38px", paddingRight: "38px" }}
            >
              Read Articles
            </Link>
            <Link
              href="/shop"
              className="btn-secondary"
              style={{ fontFamily: '"Gotham Condensed"', fontWeight: 800, fontSize: "20px", minHeight: "60px", paddingLeft: "38px", paddingRight: "38px", border: "2.5px solid #1a1a1a" }}
            >
              Shop AVRO
            </Link>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading
          title="Start with 12 strong articles."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
          {articleGroups.map((group) => (
            <article
              key={group.title}
              className="p-6 bg-white/72 border border-line rounded-lg shadow-[0_10px_30px_rgba(31,29,24,0.04)]"
            >
              <h3
                className="text-[22px] mb-5"
                style={{ fontFamily: '"Gotham Condensed"', fontWeight: 800 }}
              >
                {group.title}
              </h3>
              {group.articles.map((article) => (
                <Link
                  key={article}
                  href="/learn"
                  className="block py-3.5 border-t border-line text-muted-foreground text-[17px] leading-[1.4] hover:text-ink transition-colors"
                  style={{ fontFamily: '"Gotham Condensed"', fontWeight: 700 }}
                >
                  {article}
                </Link>
              ))}
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(28px,6vw,80px)]">
          <div>
            <h2
              className="text-[clamp(36px,4.5vw,62px)] leading-[1.02] mb-4"
              style={{ fontFamily: '"Gotham Condensed"', fontWeight: 800 }}
            >
              Built for clear answers.
            </h2>
            <p
              className="text-muted-foreground leading-relaxed text-[clamp(18px,1.6vw,22px)]"
              style={{ fontFamily: '"Gotham Condensed"', fontWeight: 500 }}
            >
              Each article should open with a short answer, then explain why it
              matters, how AVRO thinks about it, which formula fits, FAQs,
              sources, and a clear CTA.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              { icon: "search", label: "Clear question headline" },
              { icon: "card",   label: "Short answer box" },
              { icon: "shield", label: "Compliance-safe structure-function language" },
              { icon: "leaf",   label: "Internal links to formulas, science, cohorts, and FAQ" },
            ].map(({ icon, label }) => (
              <p
                key={label}
                className="grid grid-cols-[38px_1fr] gap-4 items-center text-ink text-[clamp(17px,1.5vw,21px)]"
                style={{ fontFamily: '"Gotham Condensed"', fontWeight: 700 }}
              >
                <Icon name={icon as any} className="w-8.5 h-8.5 text-olive" />
                {label}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <SocialProof mode="compact" />
      <FinalCta
        title="Ready to find your formula?"
        copy="Choose Calm, Focus, or Energy based on the moment you want to support."
      />
    </>
  )
}
