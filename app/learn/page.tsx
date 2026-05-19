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

export default function LearnPage() {
  return (
    <>
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(28px,6vw,80px)] items-center w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(42px,8vw,86px)] bg-gradient-to-br from-[#fffdf8] to-[#f7f4ec] border-b border-line">
        <div className="max-w-[620px]">
          <span className="block mb-3 text-olive text-xs font-black tracking-[0.12em] uppercase">
            Learn
          </span>
          <h1 className="font-serif font-black text-[clamp(46px,7vw,86px)] leading-[0.98] mb-5">
            Category ownership, not content noise.
          </h1>
          <p className="max-w-[560px] text-muted-foregroundtext-[clamp(17px,2vw,20px)] leading-relaxed">
            Learn how AVRO thinks about calm performance, PharmaGABA®,
            calm-first energy, state before pressure moments, and choosing the
            right formula.
          </p>
          <CtaGroup primary="Read Articles" secondary="Shop AVRO" />
        </div>
        <div className="grid content-center gap-3.5 min-h-[420px] p-8.5 border border-line rounded-lg overflow-hidden bg-gradient-to-br from-[#f9f5ed] to-white shadow-[0_22px_70px_rgba(30,29,24,0.1)]">
          {articleGroups.map((group) => (
            <article
              key={group.title}
              className="p-5 bg-white border border-line rounded-lg"
            >
              <h3 className="font-black text-lg mb-2">{group.title}</h3>
              <p className="text-muted-foreground">{group.articles[0]}</p>
            </article>
          ))}
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="Recommended structure"
          title="Start with 12 strong articles."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
          {articleGroups.map((group) => (
            <article
              key={group.title}
              className="p-6 bg-white/72 border border-line rounded-lg shadow-[0_10px_30px_rgba(31,29,24,0.04)]"
            >
              <h3 className="font-black text-lg mb-5">{group.title}</h3>
              {group.articles.map((article) => (
                <Link
                  key={article}
                  href="/learn"
                  className="block py-3 border-t border-line text-muted-foregroundfont-bold leading-[1.35] hover:text-ink transition-colors"
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
            <span className="block mb-3 text-olive text-xs font-black tracking-[0.12em] uppercase">
              Article template
            </span>
            <h2 className="font-serif font-black text-[clamp(30px,4vw,52px)] leading-[1.05] mb-3.5">
              Built for clear answers.
            </h2>
            <p className="text-muted-foregroundleading-relaxed">
              Each article should open with a short answer, then explain why it
              matters, how AVRO thinks about it, which formula fits, FAQs,
              sources, and a clear CTA.
            </p>
          </div>
          <div className="grid gap-4">
            <p className="grid grid-cols-[34px_1fr] gap-3.5 items-center text-ink">
              <Icon name="search" className="w-8.5 h-8.5 text-olive" />
              Clear question headline
            </p>
            <p className="grid grid-cols-[34px_1fr] gap-3.5 items-center text-ink">
              <Icon name="card" className="w-8.5 h-8.5 text-olive" />
              Short answer box
            </p>
            <p className="grid grid-cols-[34px_1fr] gap-3.5 items-center text-ink">
              <Icon name="shield" className="w-8.5 h-8.5 text-olive" />
              Compliance-safe structure-function language
            </p>
            <p className="grid grid-cols-[34px_1fr] gap-3.5 items-center text-ink">
              <Icon name="leaf" className="w-8.5 h-8.5 text-olive" />
              Internal links to formulas, science, cohorts, and FAQ
            </p>
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
