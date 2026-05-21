import React from "react"

export const metadata = {
  title: "Blog | AVRO Life",
  description: "Insights on calm performance, focus, energy, and the science behind AVRO formulas.",
}

const GC = '"Gotham Condensed", sans-serif'
const BLUE = "#87CEEB"

const categories = ["All", "Science", "Formula Guides", "Lifestyle", "Research"]

const featured = {
  category: "Science",
  date: "May 2026",
  title: "Why PharmaGABA® Is Not the Same as Synthetic GABA",
  excerpt: "Most GABA supplements use a synthetic form that does not cross the blood-brain barrier effectively. PharmaGABA® is fermentation-derived and clinically shown to behave differently — here is what that means for your formula.",
  readTime: "6 min read",
}

const posts = [
  {
    category: "Formula Guides",
    date: "May 2026",
    title: "AVRO Calm vs. Focus vs. Energy: How to Choose",
    excerpt: "Each formula is built around the same calm-first philosophy. The difference is in what you are preparing for.",
    readTime: "4 min read",
  },
  {
    category: "Lifestyle",
    date: "Apr 2026",
    title: "A Calm-First Morning Routine Before Deep Work",
    excerpt: "What you do in the first 30 minutes shapes the next four hours. Here is how to set the tone without stimulants.",
    readTime: "3 min read",
  },
  {
    category: "Science",
    date: "Apr 2026",
    title: "What Is GABA and Why Does It Matter?",
    excerpt: "GABA is your brain's primary inhibitory neurotransmitter. Understanding it is the first step to understanding calm performance.",
    readTime: "5 min read",
  },
  {
    category: "Research",
    date: "Mar 2026",
    title: "Fermentation-Derived Ingredients: Why Process Matters",
    excerpt: "The source and method of extraction change how your body uses a compound. AVRO uses fermentation-derived GABA for a reason.",
    readTime: "5 min read",
  },
  {
    category: "Lifestyle",
    date: "Mar 2026",
    title: "Golf, Precision, and the Case Against Pre-Round Caffeine",
    excerpt: "Shakiness, over-arousal, and reactive decision-making are the enemy of a clean round. Calm performance starts before you tee off.",
    readTime: "4 min read",
  },
  {
    category: "Formula Guides",
    date: "Feb 2026",
    title: "Why AVRO Focus Is Caffeine Free",
    excerpt: "Focus without stimulation is possible. In fact, for sustained cognitive work, it is often better.",
    readTime: "3 min read",
  },
  {
    category: "Research",
    date: "Feb 2026",
    title: "Calm-First vs. Stimulant-First: What the Research Shows",
    excerpt: "Decades of research on arousal and performance point in one direction. High stimulation is not always high performance.",
    readTime: "6 min read",
  },
  {
    category: "Lifestyle",
    date: "Jan 2026",
    title: "Gaming Sessions, Focus, and What the Body Actually Needs",
    excerpt: "Long sessions do not always demand more stimulation. Here is what the best performers are actually doing differently.",
    readTime: "4 min read",
  },
  {
    category: "Science",
    date: "Jan 2026",
    title: "Stress, Cortisol, and the Calm Performance Window",
    excerpt: "There is a zone of optimal stress that enables peak output. AVRO is designed to help you find and stay in it.",
    readTime: "5 min read",
  },
]

export default function BlogPage() {
  return (
    <main style={{ backgroundColor: "#fff", minHeight: "100vh" }}>

      <style>{`
        @font-face { font-family: "Gotham Condensed"; src: url("/fonts/GothamCond-Ultra.woff") format("woff"); font-weight: 950; font-style: normal; font-display: swap; }
        @font-face { font-family: "Gotham Condensed"; src: url("/fonts/GothamCond-Black.woff") format("woff"); font-weight: 800; font-style: normal; font-display: swap; }
        @font-face { font-family: "Gotham Condensed"; src: url("/fonts/GothamCond-Bold.woff") format("woff"); font-weight: 700; font-style: normal; font-display: swap; }
        @font-face { font-family: "Gotham Condensed"; src: url("/fonts/GothamCond-Medium.woff") format("woff"); font-weight: 500; font-style: normal; font-display: swap; }
        @font-face { font-family: "Gotham Condensed"; src: url("/fonts/GothamCond-Book.woff") format("woff"); font-weight: 400; font-style: normal; font-display: swap; }

        .blog-card { transition: background-color 0.18s ease; }
        .blog-card:hover { background-color: #000 !important; }
        .blog-card:hover .blog-card-title { color: #fff !important; }
        .blog-card:hover .blog-card-excerpt { color: rgba(255,255,255,0.65) !important; }
        .blog-card:hover .blog-card-meta { color: rgba(255,255,255,0.45) !important; }
        .blog-card:hover .blog-card-cat { color: ${BLUE} !important; }
        .blog-card:hover .blog-card-arrow { background-color: #fff !important; color: #000 !important; }

        .cat-btn { transition: background-color 0.15s ease, color 0.15s ease; }
        .cat-btn:hover { background-color: #000 !important; color: #fff !important; }

        .featured-card { transition: background-color 0.18s ease; }
        .featured-card:hover { background-color: #111 !important; }
        .featured-card:hover .feat-excerpt { color: rgba(255,255,255,0.7) !important; }

        /* Mobile */
        @media (max-width: 640px) {
          .blog-grid { grid-template-columns: 1fr !important; }
          .featured-inner { flex-direction: column !important; align-items: flex-start !important; }
          .feat-read-btn { align-self: flex-start; margin-top: 8px; }
          .cta-inner { flex-direction: column !important; padding: 40px 28px !important; }
          .cta-btns { width: 100%; }
          .cta-btns a { flex: 1 1 100%; justify-content: center; }
        }
      `}</style>

      {/* ── HERO HEADER ── */}
      <section style={{ backgroundColor: "#000", padding: "clamp(56px,8vw,104px) clamp(16px,5vw,80px) clamp(48px,6vw,80px)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <h1 style={{ fontFamily: GC, fontWeight: 950, fontSize: "clamp(56px,9vw,120px)", lineHeight: 0.95, color: "#fff", marginBottom: 20, maxWidth: 900 }}>
            Calm. Clear. Informed.
          </h1>
          <p style={{ fontFamily: GC, fontWeight: 500, fontSize: "clamp(20px,2vw,26px)", lineHeight: 1.4, color: "rgba(255,255,255,0.65)", maxWidth: 600 }}>
            Science, lifestyle, and formula guidance for people who perform better when they are calm.
          </p>

          {/* Category filters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 40 }}>
            {categories.map((cat, i) => (
              <button
                key={cat}
                className="cat-btn"
                style={{
                  fontFamily: GC,
                  fontWeight: 800,
                  fontSize: 18,
                  padding: "10px 24px",
                  borderRadius: 10,
                  border: "2px solid rgba(255,255,255,0.25)",
                  backgroundColor: i === 0 ? "#fff" : "transparent",
                  color: i === 0 ? "#000" : "rgba(255,255,255,0.7)",
                  cursor: "pointer",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED POST ── */}
      <section style={{ backgroundColor: "#fff", padding: "clamp(40px,6vw,72px) clamp(16px,5vw,80px)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <p style={{ fontFamily: GC, fontWeight: 700, fontSize: 18, color: "rgba(0,0,0,0.4)", marginBottom: 20 }}>
            Featured
          </p>
          <a
            href="/blog/pharmgaba-vs-synthetic"
            className="featured-card"
            style={{
              display: "block",
              backgroundColor: "#000",
              borderRadius: 16,
              padding: "clamp(40px,5vw,64px) clamp(32px,5vw,72px)",
              textDecoration: "none",
            }}
          >
            <div className="featured-inner" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 32 }}>
              <div style={{ flex: "1 1 480px", minWidth: 280 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <span style={{ fontFamily: GC, fontWeight: 800, fontSize: 17, color: BLUE }}>{featured.category}</span>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.3)" }} />
                  <span style={{ fontFamily: GC, fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.4)" }}>{featured.date}</span>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.3)" }} />
                  <span style={{ fontFamily: GC, fontWeight: 400, fontSize: 17, color: "rgba(255,255,255,0.4)" }}>{featured.readTime}</span>
                </div>
                <h2 style={{ fontFamily: GC, fontWeight: 950, fontSize: "clamp(28px,4vw,52px)", lineHeight: 1.0, color: "#fff", marginBottom: 20, maxWidth: 700 }}>
                  {featured.title}
                </h2>
                <p className="feat-excerpt" style={{ fontFamily: GC, fontWeight: 400, fontSize: "clamp(19px,1.8vw,23px)", lineHeight: 1.45, color: "rgba(255,255,255,0.65)", maxWidth: 620 }}>
                  {featured.excerpt}
                </p>
              </div>
              <div className="feat-read-btn" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: GC, fontWeight: 800, fontSize: 20, color: "#000", backgroundColor: "#fff", borderRadius: 10, padding: "16px 32px", flexShrink: 0 }}>
                Read Article
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* ── POST GRID ── */}
      <section style={{ backgroundColor: "#fff", padding: "0 clamp(16px,5vw,80px) clamp(64px,8vw,104px)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))", gap: 20 }}>
            {posts.map((post) => (
              <a
                key={post.title}
                href="/blog/article"
                className="blog-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "#f4f4f4",
                  borderRadius: 14,
                  padding: "32px 32px 28px",
                  textDecoration: "none",
                  gap: 24,
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <span className="blog-card-cat" style={{ fontFamily: GC, fontWeight: 800, fontSize: 18, color: "#000" }}>{post.category}</span>
                    <span style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.25)" }} />
                    <span className="blog-card-meta" style={{ fontFamily: GC, fontWeight: 400, fontSize: 18, color: "rgba(0,0,0,0.4)" }}>{post.date}</span>
                  </div>
                  <h3 className="blog-card-title" style={{ fontFamily: GC, fontWeight: 800, fontSize: "clamp(22px,2.2vw,29px)", lineHeight: 1.05, color: "#000", marginBottom: 14 }}>
                    {post.title}
                  </h3>
                  <p className="blog-card-excerpt" style={{ fontFamily: GC, fontWeight: 400, fontSize: 18, lineHeight: 1.45, color: "rgba(0,0,0,0.6)" }}>
                    {post.excerpt}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span className="blog-card-meta" style={{ fontFamily: GC, fontWeight: 500, fontSize: 18, color: "rgba(0,0,0,0.4)" }}>{post.readTime}</span>
                  <span className="blog-card-arrow" style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: "#000", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Load more */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 56 }}>
            <button style={{ fontFamily: GC, fontWeight: 800, fontSize: 21, padding: "18px 56px", borderRadius: 10, backgroundColor: "#000", color: "#fff", border: "2.5px solid #000", cursor: "pointer" }}>
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "#fff", padding: "0 clamp(16px,5vw,80px) clamp(48px,7vw,88px)" }}>
        <div className="cta-inner" style={{ maxWidth: 1440, margin: "0 auto", backgroundColor: "#000", borderRadius: 20, padding: "clamp(56px,7vw,88px) clamp(48px,6vw,96px)", display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 48 }}>
          <div style={{ flex: "1 1 480px", minWidth: 280 }}>
            <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 19, color: "rgba(255,255,255,0.55)", marginBottom: 16, display: "block" }}>
              Put it into practice.
            </span>
            <h2 style={{ fontFamily: GC, fontWeight: 950, fontSize: "clamp(36px,5vw,64px)", lineHeight: 1.0, color: "#fff", marginBottom: 16 }}>
              Ready to find your formula?
            </h2>
            <p style={{ fontFamily: GC, fontWeight: 500, fontSize: "clamp(17px,1.6vw,21px)", lineHeight: 1.4, color: "rgba(255,255,255,0.65)", maxWidth: 480 }}>
              Choose Calm, Focus, or Energy based on the moment you want to support.
            </p>
          </div>
          <div className="cta-btns" style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            {[["Shop Calm", "/shop/calm"], ["Shop Focus", "/shop/focus"], ["Shop Energy", "/shop/energy"]].map(([label, href]) => (
              <a
                key={label}
                href={href}
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: GC, fontWeight: 800, fontSize: 20, minHeight: 64, padding: "0 40px", borderRadius: 10, textDecoration: "none", backgroundColor: "#fff", color: "#000", border: "2.5px solid #fff" }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
