"use client"

import { useState } from "react"
import { CardedSection, SectionHeading, FinalCta } from "@/components/sections"
import { PageHero } from "@/components/page-hero"
import { FooterBanner } from "@/components/footer-banner"

const categories = ["All", "Science", "Formula Guides", "Lifestyle", "Research"]

const featured = {
  category: "Science",
  date: "May 2026",
  title: "Why PharmaGABA® Is Not the Same as Synthetic GABA",
  excerpt:
    "Most GABA supplements use a synthetic form that does not cross the blood-brain barrier effectively. PharmaGABA® is fermentation-derived and clinically shown to behave differently — here is what that means for your formula.",
  readTime: "6 min read",
  href: "/blog/pharmgaba-vs-synthetic",
}

const posts = [
  {
    category: "Formula Guides",
    date: "May 2026",
    title: "AVRO Calm vs. Focus vs. Energy: How to Choose",
    excerpt:
      "Each formula is built around the same calm-first philosophy. The difference is in what you are preparing for.",
    readTime: "4 min read",
  },
  {
    category: "Lifestyle",
    date: "Apr 2026",
    title: "A Calm-First Morning Routine Before Deep Work",
    excerpt:
      "What you do in the first 30 minutes shapes the next four hours. Here is how to set the tone without stimulants.",
    readTime: "3 min read",
  },
  {
    category: "Science",
    date: "Apr 2026",
    title: "What Is GABA and Why Does It Matter?",
    excerpt:
      "GABA is your brain's primary inhibitory neurotransmitter. Understanding it is the first step to understanding calm performance.",
    readTime: "5 min read",
  },
  {
    category: "Research",
    date: "Mar 2026",
    title: "Fermentation-Derived Ingredients: Why Process Matters",
    excerpt:
      "The source and method of extraction change how your body uses a compound. AVRO uses fermentation-derived GABA for a reason.",
    readTime: "5 min read",
  },
  {
    category: "Lifestyle",
    date: "Mar 2026",
    title: "Golf, Precision, and the Case Against Pre-Round Caffeine",
    excerpt:
      "Shakiness, over-arousal, and reactive decision-making are the enemy of a clean round. Calm performance starts before you tee off.",
    readTime: "4 min read",
  },
  {
    category: "Formula Guides",
    date: "Feb 2026",
    title: "Why AVRO Focus Is Caffeine Free",
    excerpt:
      "Focus without stimulation is possible. In fact, for sustained cognitive work, it is often better.",
    readTime: "3 min read",
  },
  {
    category: "Research",
    date: "Feb 2026",
    title: "Calm-First vs. Stimulant-First: What the Research Shows",
    excerpt:
      "Decades of research on arousal and performance point in one direction. High stimulation is not always high performance.",
    readTime: "6 min read",
  },
  {
    category: "Lifestyle",
    date: "Jan 2026",
    title: "Gaming Sessions, Focus, and What the Body Actually Needs",
    excerpt:
      "Long sessions do not always demand more stimulation. Here is what the best performers are actually doing differently.",
    readTime: "4 min read",
  },
  {
    category: "Science",
    date: "Jan 2026",
    title: "Stress, Cortisol, and the Calm Performance Window",
    excerpt:
      "There is a zone of optimal stress that enables peak output. AVRO is designed to help you find and stay in it.",
    readTime: "5 min read",
  },
]

export function BlogContent() {
  const [activeCategory, setActiveCategory] = useState("All")

  const visiblePosts =
    activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory)

  const showFeatured = activeCategory === "All" || featured.category === activeCategory

  return (
    <>
      <style>{`
        /* ── Blog-specific hover states ── */
        .blog-card { transition: background-color 0.18s ease; }
        .blog-card:hover { background-color: var(--charcoal) !important; }
        .blog-card:hover .blog-card-title { color: var(--bone) !important; }
        .blog-card:hover .blog-card-excerpt { color: rgba(255,255,255,0.65) !important; }
        .blog-card:hover .blog-card-meta { color: rgba(255,255,255,0.45) !important; }
        .blog-card:hover .blog-card-cat { color: var(--avro-blue) !important; }
        .blog-card:hover .blog-card-arrow { background-color: var(--bone) !important; color: var(--charcoal) !important; }

        .blog-feat-card { transition: background-color 0.18s ease; }
        .blog-feat-card:hover { background-color: var(--ink) !important; }
        .blog-feat-card:hover .blog-feat-excerpt { color: rgba(255,255,255,0.72) !important; }

        .blog-cat-btn { transition: background-color 0.15s ease, color 0.15s ease; cursor: pointer; }
        .blog-cat-btn:hover { background-color: var(--charcoal) !important; color: var(--bone) !important; border-color: var(--charcoal) !important; }

        /* Load more button */
        .blog-load-more { transition: background-color 0.15s ease, color 0.15s ease; cursor: pointer; }
        .blog-load-more:hover { background-color: var(--ink) !important; color: var(--bone) !important; }

        @media (max-width: 640px) {
          .blog-feat-inner { flex-direction: column !important; gap: 20px !important; }
          .blog-feat-btn { align-self: flex-start !important; }
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ── uses the site-standard PageHero component, flat variant (no image) */}
      <PageHero
        variant="flat"
        title="News & Media"
        lede="Science, lifestyle, and formula guidance for people who perform better when they are calm."
      >
        {/* Category filter pills — these now filter the article list below */}
        <div className="flex flex-wrap gap-3 mt-4">
          {categories.map((cat) => {
            const isActive = cat === activeCategory
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={isActive}
                className="blog-cat-btn font-sans font-bold text-[15px]"
                style={{
                  minHeight: 44,
                  padding: "0 22px",
                  borderRadius: 999,
                  border: "2px solid var(--charcoal)",
                  backgroundColor: isActive ? "var(--charcoal)" : "transparent",
                  color: isActive ? "var(--bone)" : "var(--charcoal)",
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </PageHero>

      {/* ── FEATURED POST ── */}
      {showFeatured && (
        <CardedSection>
          <SectionHeading title="Featured" centered={false} />

          <a
            href={featured.href}
            className="blog-feat-card block w-full"
            style={{
              backgroundColor: "var(--charcoal)",
              borderRadius: 24,
              padding: "clamp(32px,5vw,64px) clamp(24px,4vw,72px)",
              textDecoration: "none",
            }}
          >
            <div
              className="blog-feat-inner"
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 32,
              }}
            >
              {/* Text */}
              <div style={{ flex: "1 1 300px", minWidth: 0 }}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-sans font-bold text-[15px]" style={{ color: "var(--avro-blue)" }}>
                    {featured.category}
                  </span>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
                  <span className="font-sans text-[15px]" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {featured.date}
                  </span>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
                  <span className="font-sans text-[15px]" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {featured.readTime}
                  </span>
                </div>

                <h2
                  className="font-serif font-black text-balance"
                  style={{
                    fontSize: "clamp(26px,3.8vw,50px)",
                    lineHeight: 1.02,
                    color: "var(--bone)",
                    marginBottom: 18,
                  }}
                >
                  {featured.title}
                </h2>

                <p
                  className="blog-feat-excerpt font-sans leading-relaxed"
                  style={{
                    fontSize: "clamp(16px,1.5vw,20px)",
                    color: "rgba(255,255,255,0.78)",
                    maxWidth: 560,
                  }}
                >
                  {featured.excerpt}
                </p>
              </div>

              {/* CTA pill */}
              <div
                className="blog-feat-btn font-sans font-bold text-[15px] inline-flex items-center gap-2.5 shrink-0"
                style={{
                  minHeight: 48,
                  padding: "0 24px",
                  borderRadius: 999,
                  backgroundColor: "var(--bone)",
                  color: "var(--charcoal)",
                }}
              >
                Read Article
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </a>
        </CardedSection>
      )}

      {/* ── POST GRID ── */}
      <CardedSection>
        <SectionHeading
          title={activeCategory === "All" ? "Latest Articles" : activeCategory}
          centered={false}
        />

        {visiblePosts.length > 0 ? (
          <div
            className="blog-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(320px, 100%), 1fr))",
              gap: 16,
            }}
          >
            {visiblePosts.map((post) => (
              <a
                key={post.title}
                href="/blog/article"
                className="blog-card flex flex-col justify-between"
                style={{
                  backgroundColor: "var(--base-light)",
                  borderRadius: 20,
                  padding: "28px 28px 24px",
                  textDecoration: "none",
                  gap: 24,
                }}
              >
                {/* Top: category + date + title + excerpt */}
                <div>
                  <div className="flex items-center gap-2.5 mb-3.5">
                    <span className="blog-card-cat font-sans font-bold text-[14px]" style={{ color: "var(--ink)" }}>
                      {post.category}
                    </span>
                    <span style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "var(--divider)", flexShrink: 0 }} />
                    <span className="blog-card-meta font-sans text-[14px]" style={{ color: "var(--warm-gray)" }}>
                      {post.date}
                    </span>
                  </div>

                  <h3
                    className="blog-card-title font-serif font-black text-balance"
                    style={{
                      fontSize: "clamp(20px,2vw,26px)",
                      lineHeight: 1.05,
                      color: "var(--ink)",
                      marginBottom: 12,
                    }}
                  >
                    {post.title}
                  </h3>

                  <p
                    className="blog-card-excerpt font-sans leading-relaxed"
                    style={{ fontSize: 15, color: "var(--warm-gray)" }}
                  >
                    {post.excerpt}
                  </p>
                </div>

                {/* Bottom: read time + arrow */}
                <div className="flex items-center justify-between">
                  <span className="blog-card-meta font-sans text-[14px]" style={{ color: "var(--warm-gray)" }}>
                    {post.readTime}
                  </span>
                  <span
                    className="blog-card-arrow inline-flex items-center justify-center shrink-0"
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 999,
                      backgroundColor: "var(--charcoal)",
                      color: "var(--bone)",
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="font-sans text-[16px]" style={{ color: "var(--warm-gray)" }}>
            No articles in this category yet — check back soon.
          </p>
        )}

        {/* Load more */}
        {visiblePosts.length > 0 && (
          <div className="flex justify-center mt-14">
            <button
              type="button"
              className="blog-load-more btn-secondary font-sans font-bold"
              style={{ fontSize: 16, padding: "0 48px", minHeight: 52 }}
            >
              Load More Articles
            </button>
          </div>
        )}
      </CardedSection>

      {/* ── FOOTER BANNER + CTA ── matches science page exactly */}
      <div style={{ backgroundColor: "var(--base-deep)" }}>
        <FooterBanner
          src="/images/banners/science-banner.png"
          alt="AVRO — Calm is the advantage."
        />
        <FinalCta
          title="Ready to find your formula?"
          copy="Choose Calm, Focus, or Energy based on the moment you want to support."
        />
      </div>
    </>
  )
}
