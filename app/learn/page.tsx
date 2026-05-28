import Link from "next/link"
import { CardedSection, Section, SectionHeading, FinalCta } from "@/components/sections"
import { PageHero } from "@/components/page-hero"
import { Icon } from "@/components/icons"

export const metadata = {
  title: "Articles | AVRO",
  description:
    "Category ownership, not content noise. Learn how AVRO thinks about calm performance, PharmaGABA®, calm-first energy, and choosing the right formula.",
}

/* ──────────────────────────────────────────────────────────────────────────
 * /learn — editorial hub.
 *
 * Restored to the simpler reference layout: flat hero → four pillar cards
 * (plain title list, no numbering, no arrow icons) → "Article Template"
 * split section on cream → three outlined stat boxes → SocialProof rail →
 * black "Ready to find your formula?" bar with three shop pills.
 *
 * Color rule: only the blue cohort accent is allowed in the theme. The Calm
 * pill keeps Avro Blue. Focus and Energy are neutralized — Focus uses bone
 * on ink, Energy uses an outline-only ink pill. Social / Zero Proof keeps
 * its own gold identity on its own page and is intentionally not surfaced.
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

const templatePoints: { icon: Parameters<typeof Icon>[0]["name"]; label: string }[] = [
  { icon: "search", label: "Clear question headline" },
  { icon: "badge-check", label: "Short answer box" },
  { icon: "shield-check", label: "Compliance-safe structure-function language" },
  { icon: "leaf", label: "Internal links to formulas, science, cohorts, and FAQ" },
]

const stats = [
  { value: "4.8 / 5", label: "Average customer rating" },
  { value: "25,000+", label: "Customer reviews" },
  { value: "100,000+", label: "Sticks sold" },
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

      {/* Twelve strong articles — four pillar cards, plain title list. The article
          links sit inside a bone card with a thin ink hairline; the title itself
          is the affordance, no numbering, no trailing arrow. */}
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

      {/* Article template — split layout on the page's cream `--base`. Left column =
          eyebrow + headline + supporting paragraph. Right column = four small icon
          rows. Hairlines top and bottom for definition without a card. */}
      <section
        style={{
          backgroundColor: "var(--base)",
          borderTop: "1px solid rgba(30,29,24,0.10)",
          borderBottom: "1px solid rgba(30,29,24,0.10)",
        }}
      >
        <div
          className="mx-auto px-[clamp(16px,5vw,64px)]"
          style={{
            maxWidth: 1320,
            paddingTop: "clamp(56px, 7vw, 96px)",
            paddingBottom: "clamp(56px, 7vw, 96px)",
          }}
        >
          <div className="grid gap-12 md:grid-cols-2 md:items-start">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-ink/55 mb-3">
                Article Template
              </p>
              <h2 className="font-serif font-black text-[clamp(30px,4vw,48px)] leading-[1.04] tracking-[-0.02em] text-ink text-balance mb-5">
                Built for clear answers.
              </h2>
              <p className="text-[15px] md:text-base leading-relaxed text-ink/72 max-w-[480px]">
                Each article should open with a short answer, then explain why it
                matters, how AVRO thinks about it, which formula fits, FAQs,
                sources, and a clear CTA.
              </p>
            </div>

            <ul className="flex flex-col gap-5 md:mt-0 mt-6">
              {templatePoints.map((p) => (
                <li key={p.label} className="flex items-center gap-4">
                  <span
                    className="flex items-center justify-center rounded-full shrink-0"
                    style={{
                      width: 44,
                      height: 44,
                      backgroundColor: "var(--bone)",
                      border: "1px solid rgba(30,29,24,0.16)",
                    }}
                  >
                    <Icon name={p.icon} className="w-5 h-5 text-ink" />
                  </span>
                  <span className="text-[15px] font-semibold text-ink">
                    {p.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Customer testimonials + social proof — eyebrow + headline + three outlined
          stat boxes in a tight row. */}
      <CardedSection bg="var(--base-light)">
        <SectionHeading
          eyebrow="Customer testimonials + social proof"
          title="Trusted for calm-first routines."
        />

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-[14px] text-center"
              style={{
                backgroundColor: "var(--bone)",
                border: "1px solid rgba(30,29,24,0.14)",
                padding: "32px 22px",
              }}
            >
              <div className="font-serif font-black text-[clamp(32px,3.6vw,44px)] leading-none tracking-[-0.02em] text-ink mb-2.5">
                {s.value}
              </div>
              <p className="text-[13px] leading-relaxed text-ink/65 font-semibold">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </CardedSection>

      {/* Bottom CTA — uses the site's standard FinalCta component with product buttons. */}
      <FinalCta
        eyebrow="Choose the formula that fits your moment."
        title="Ready to find your formula?"
        copy="Choose Calm, Focus, or Energy based on the moment you want to support."
        productButtons
      />
    </>
  )
}
