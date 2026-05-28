import Link from "next/link"
import {
  CardedSection,
  Section,
  SectionHeading,
  SocialProof,
} from "@/components/sections"
import { PageHero } from "@/components/page-hero"
import { Icon } from "@/components/icons"

export const metadata = {
  title: "Articles | AVRO",
  description:
    "Category ownership, not content noise. Learn how AVRO thinks about calm performance, PharmaGABA®, calm-first energy, and choosing the right formula.",
}

/* ──────────────────────────────────────────────────────────────────────────
 * Article catalog
 *
 * The /learn hub is AVRO's editorial / category-ownership page. It is built
 * around 12 strong articles grouped into four pillars: Start Here, Science of
 * Calm, Formula Guides, and Use Guides. Every article gets a slug-style URL
 * under /learn so this hub stays the canonical entry point.
 * ────────────────────────────────────────────────────────────────────────── */

type Article = {
  title: string
  slug: string
  blurb: string
}

type Pillar = {
  eyebrow: string
  title: string
  description: string
  articles: Article[]
}

const pillars: Pillar[] = [
  {
    eyebrow: "Start here",
    title: "Foundations",
    description:
      "Three articles that explain calm performance and why it changes how you think about energy.",
    articles: [
      {
        title: "What Is Calm Performance?",
        slug: "/learn/what-is-calm-performance",
        blurb: "The shift from stimulant-first to calm-first, and why it matters.",
      },
      {
        title: "Why More Energy Is Not Always the Answer",
        slug: "/learn/more-energy-not-always-the-answer",
        blurb: "What stacking caffeine actually does to your nervous system.",
      },
      {
        title: "Calm First vs. Stimulant First",
        slug: "/learn/calm-first-vs-stimulant-first",
        blurb: "Two different starting points. Two different days.",
      },
    ],
  },
  {
    eyebrow: "Science of calm",
    title: "How AVRO works",
    description:
      "GABA, PharmaGABA®, and the role of natural fermentation in every formula.",
    articles: [
      {
        title: "What Is GABA?",
        slug: "/learn/what-is-gaba",
        blurb: "Your body's main calming neurotransmitter, in plain language.",
      },
      {
        title: "What Is PharmaGABA®?",
        slug: "/learn/what-is-pharmagaba",
        blurb: "The naturally fermented form of GABA we use in every AVRO formula.",
      },
      {
        title: "Why Fermentation Matters in AVRO",
        slug: "/learn/why-fermentation-matters",
        blurb: "Why we choose fermented over synthetic — and what changes for you.",
      },
    ],
  },
  {
    eyebrow: "Formula guides",
    title: "Find your formula",
    description:
      "Side-by-side comparisons of Calm, Focus, and Energy — and what makes each one different.",
    articles: [
      {
        title: "AVRO Calm vs. Focus vs. Energy",
        slug: "/learn/calm-vs-focus-vs-energy",
        blurb: "Same calm-first base. Three different moments of the day.",
      },
      {
        title: "Why AVRO Focus Is Caffeine Free",
        slug: "/learn/why-focus-is-caffeine-free",
        blurb: "Sustained mental clarity without the spike — here's how.",
      },
      {
        title: "What Makes AVRO Energy Different?",
        slug: "/learn/what-makes-energy-different",
        blurb: "Lift without the jitters. The thinking behind our caffeine pairing.",
      },
    ],
  },
  {
    eyebrow: "Use guides",
    title: "Real moments, real routines",
    description:
      "How AVRO fits into the moments that actually matter — golf, deep work, long sessions, evenings.",
    articles: [
      {
        title: "What to Drink Before Golf",
        slug: "/learn/what-to-drink-before-golf",
        blurb: "When you don't want more caffeine but still need to be sharp.",
      },
      {
        title: "A Calm-First Routine Before Deep Work",
        slug: "/learn/calm-first-routine-deep-work",
        blurb: "Start steady. Stay steady. The routine takes ten minutes.",
      },
      {
        title: "Why Long Gaming Sessions Don't Always Need More Stimulation",
        slug: "/learn/long-gaming-sessions",
        blurb: "What happens when you stop stacking energy drinks.",
      },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 * Article template — what every AVRO article delivers
 * ────────────────────────────────────────────────────────────────────────── */

const articleTemplate: { icon: Parameters<typeof Icon>[0]["name"]; title: string; copy: string }[] = [
  {
    icon: "shield-check",
    title: "Clear question headline",
    copy: "Every article opens on the actual question the reader is asking.",
  },
  {
    icon: "badge-check",
    title: "Short answer, up top",
    copy: "Two to three sentences before any explanation. No burying the lede.",
  },
  {
    icon: "leaf",
    title: "Compliance-safe language",
    copy: "Structure-and-function only. We never claim to treat or cure anything.",
  },
  {
    icon: "target",
    title: "Linked to the right formula",
    copy: "Every article points to the AVRO product that fits the moment.",
  },
]

export default function LearnPage() {
  return (
    <>
      {/* Flat editorial hero — matches Science / FAQ */}
      <PageHero
        variant="flat"
        centered
        title="Category ownership, not content noise."
        lede="Learn how AVRO thinks about calm performance, PharmaGABA®, calm-first energy, state before pressure moments, and choosing the right formula."
        imageSrc=""
        imageAlt=""
        primaryCta={{ href: "#articles", label: "Read Articles" }}
        secondaryCta={{ href: "/shop", label: "Shop AVRO" }}
      />

      {/* Anchor target + intro headline before the article grid. */}
      <CardedSection id="articles" bg="var(--base-light)">
        <SectionHeading
          eyebrow="The library"
          title="Start with 12 strong articles."
          description="Four pillars, three articles each — every piece points back to the formula it fits and the moment it serves."
        />

        <div
          className="grid gap-6"
          style={{
            // Mobile: single column. Desktop: two columns of pillar cards.
            gridTemplateColumns: "repeat(auto-fit, minmax(min(420px, 100%), 1fr))",
          }}
        >
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-[20px] p-7"
              style={{ backgroundColor: "var(--bone)" }}
            >
              <span
                className="inline-block mb-4 px-3.5 py-1.5 rounded-full font-black uppercase"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  backgroundColor: "var(--charcoal)",
                  color: "var(--bone)",
                }}
              >
                {pillar.eyebrow}
              </span>
              <h3 className="font-serif font-black text-[clamp(24px,2.4vw,32px)] leading-[1.05] mb-2 text-ink">
                {pillar.title}
              </h3>
              <p className="text-base leading-relaxed text-ink/70 mb-6">
                {pillar.description}
              </p>

              <ul className="flex flex-col gap-3">
                {pillar.articles.map((a, idx) => (
                  <li key={a.slug}>
                    <Link
                      href={a.slug}
                      className="group flex items-start gap-4 rounded-[14px] p-4 transition-colors hover:bg-base-light"
                      style={{ border: "1px solid rgba(30,29,24,0.08)" }}
                    >
                      <span
                        className="font-black shrink-0"
                        style={{
                          fontSize: 13,
                          letterSpacing: "0.08em",
                          color: "var(--warm-gray)",
                          minWidth: 28,
                        }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">
                        <span className="block font-extrabold text-ink leading-snug mb-1">
                          {a.title}
                        </span>
                        <span className="block text-sm leading-relaxed text-ink/65">
                          {a.blurb}
                        </span>
                      </span>
                      <Icon
                        name="arrowRight"
                        className="w-5 h-5 shrink-0 mt-1 text-ink/40 transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </CardedSection>

      {/* Article template — what every AVRO article delivers. */}
      <CardedSection bg="var(--charcoal)" panelClassName="text-bone">
        <SectionHeading
          eyebrow="Article template"
          title="Built for clear answers."
          description="Each article opens with a short answer, then explains why it matters, how AVRO thinks about it, which formula fits, FAQs, sources, and a clear next step."
          dark
        />

        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          {articleTemplate.map((row) => (
            <div
              key={row.title}
              className="rounded-[18px] p-6"
              style={{ backgroundColor: "rgba(245,241,234,0.06)" }}
            >
              <Icon name={row.icon} className="w-9 h-9 mb-4 text-gold" />
              <h4 className="font-black text-bone mb-2">{row.title}</h4>
              <p className="text-sm leading-relaxed text-bone/70">
                {row.copy}
              </p>
            </div>
          ))}
        </div>
      </CardedSection>

      {/* Social proof + the three signal stats. */}
      <Section className="max-w-[1320px]">
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
          }}
        >
          {[
            { stat: "4.8 / 5", label: "Average customer rating" },
            { stat: "25,000+", label: "Customer reviews" },
            { stat: "100,000+", label: "Sticks sold" },
          ].map((row) => (
            <div
              key={row.label}
              className="rounded-[20px] p-7 text-center"
              style={{ backgroundColor: "var(--base-light)" }}
            >
              <div className="font-serif font-black text-[clamp(32px,4vw,48px)] leading-none text-ink mb-2">
                {row.stat}
              </div>
              <p className="text-sm leading-relaxed text-ink/65 uppercase tracking-[0.12em] font-extrabold">
                {row.label}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <SocialProof mode="full" />

      {/* Bottom CTA — custom three-formula picker bar matching the previous /learn
          layout. Only Shop Calm keeps its cohort accent (Avro Blue). Shop Focus and
          Shop Energy use neutral ink/charcoal pills, per the rule that no cohort
          color besides blue may appear in the theme. */}
      <Section className="max-w-[1320px] pb-24">
        <div
          className="rounded-[28px] p-8 md:p-12"
          style={{ backgroundColor: "var(--deep-black)", color: "var(--bone)" }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-bone/60 mb-3">
                Choose the formula that fits your moment
              </p>
              <h3 className="font-serif font-black text-[clamp(28px,3.4vw,42px)] leading-[1.05] text-bone text-balance mb-3">
                Ready to find your formula?
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-bone/75">
                Choose Calm, Focus, or Energy based on the moment you want to support.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/calm"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-extrabold transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: "#94C6D4", color: "var(--deep-black)" }}
              >
                Shop Calm
              </Link>
              <Link
                href="/focus"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-extrabold transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--bone)", color: "var(--deep-black)" }}
              >
                Shop Focus
              </Link>
              <Link
                href="/energy"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-extrabold transition-transform hover:-translate-y-0.5 border"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--bone)",
                  borderColor: "rgba(245,241,234,0.4)",
                }}
              >
                Shop Energy
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
