import Link from "next/link"
import { CardedSection, SectionHeading } from "@/components/sections"
import { PageHero } from "@/components/page-hero"

export const metadata = {
  title: "Articles | AVRO",
  description:
    "Category ownership, not content noise. Learn how AVRO thinks about calm performance, PharmaGABA®, calm-first energy, and choosing the right formula.",
}

/* ──────────────────────────────────────────────────────────────────────────
 * /learn — editorial hub.
 *
 * Simplified: flat hero → four pillar cards with 12 articles. That's it.
 * ────────────────────────────────────────────────────────────────────────── */

const pillars: { title: string; articles: { title: string; slug: string }[] }[] = [
  {
    title: "Start Here",
    articles: [
      { title: "What Is Calm Performance?", slug: "/learn/what-is-calm-performance" },
      { title: "Why More Energy Is Not Always the Answer", slug: "/learn/more-energy-not-always-the-answer" },
      { title: "Calm First vs. Stimulant First: What's the Difference?", slug: "/learn/calm-first-vs-stimulant-first" },
    ],
  },
  {
    title: "Science of Calm",
    articles: [
      { title: "What Is GABA?", slug: "/learn/what-is-gaba" },
      { title: "What Is PharmaGABA®?", slug: "/learn/what-is-pharmagaba" },
      { title: "Why Fermentation Matters in AVRO", slug: "/learn/why-fermentation-matters" },
    ],
  },
  {
    title: "Formula Guides",
    articles: [
      { title: "AVRO Calm vs. Focus vs. Energy", slug: "/learn/calm-vs-focus-vs-energy" },
      { title: "Why AVRO Focus Is Caffeine Free", slug: "/learn/why-focus-is-caffeine-free" },
      { title: "What Makes AVRO Energy Different?", slug: "/learn/what-makes-energy-different" },
    ],
  },
  {
    title: "Use Guides",
    articles: [
      { title: "What to Drink Before Golf When You Do Not Want More Caffeine", slug: "/learn/what-to-drink-before-golf" },
      { title: "A Calm First Routine Before Deep Work", slug: "/learn/calm-first-routine-deep-work" },
      { title: "Why Long Gaming Sessions Do Not Always Need More Stimulation", slug: "/learn/long-gaming-sessions" },
    ],
  },
]

export default function LearnPage() {
  return (
    <>
      {/* Flat editorial hero — centered headline, lede, two pill CTAs. */}
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

      {/* Twelve strong articles — four pillar cards, plain title list. */}
      <CardedSection id="articles" bg="var(--base-light)">
        <SectionHeading
          eyebrow="Recommended structure"
          title="Start with 12 strong articles."
        />

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-[18px] flex flex-col"
              style={{
                backgroundColor: "var(--bone)",
                border: "1px solid rgba(30,29,24,0.14)",
                padding: "26px 24px 28px",
                minHeight: 280,
              }}
            >
              <h3 className="font-serif font-black text-[22px] leading-[1.2] tracking-[-0.01em] text-ink mb-5">
                {pillar.title}
              </h3>
              <ul className="flex flex-col gap-4">
                {pillar.articles.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={a.slug}
                      className="block text-[15px] leading-[1.45] font-semibold text-ink hover:text-ink/70 transition-colors"
                    >
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </CardedSection>
    </>
  )
}
