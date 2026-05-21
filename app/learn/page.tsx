import React from "react"

export const metadata = {
  title: "Learn | AVRO",
  description: "Learn how AVRO thinks about calm performance, PharmaGABA®, calm-first energy, and choosing the right formula.",
}

const GC = '"Gotham Condensed", sans-serif'

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

const templateItems: { svg: React.ReactNode; label: string }[] = [
  {
    svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    label: "Clear question headline",
  },
  {
    svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    label: "Short answer box",
  },
  {
    svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    label: "Compliance-safe structure-function language",
  },
  {
    svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 8C8 10 5.9 16.17 3.82 19.12A1 1 0 0 0 4.69 20.7C7.14 20.1 11.75 18.5 14 16c2.5-2.77 2.87-6.12 3-8-.5.25-2.25.75-3 0z"/></svg>,
    label: "Internal links to formulas, science, cohorts, and FAQ",
  },
]

export default function LearnPage() {
  return (
    <main>
      {/* Button hover states */}
      <style>{`
        @font-face { font-family: "Gotham Condensed"; src: url("/fonts/GothamCond-Ultra.woff") format("woff"); font-weight: 950; font-style: normal; font-display: swap; }
        @font-face { font-family: "Gotham Condensed"; src: url("/fonts/GothamCond-Black.woff") format("woff"); font-weight: 800; font-style: normal; font-display: swap; }
        @font-face { font-family: "Gotham Condensed"; src: url("/fonts/GothamCond-Bold.woff") format("woff"); font-weight: 700; font-style: normal; font-display: swap; }
        @font-face { font-family: "Gotham Condensed"; src: url("/fonts/GothamCond-Medium.woff") format("woff"); font-weight: 500; font-style: normal; font-display: swap; }
        @font-face { font-family: "Gotham Condensed"; src: url("/fonts/GothamCond-Book.woff") format("woff"); font-weight: 400; font-style: normal; font-display: swap; }
        .cta-btn { transition: background-color 0.18s ease, color 0.18s ease; }
        .cta-btn-white { background-color: #fff; color: #000; border: 2.5px solid #fff; }
        .cta-btn-white:hover { background-color: transparent; color: #fff; }
        .cta-btn-blue { background-color: #87CEEB; color: #000; border: 2.5px solid #87CEEB; }
        .cta-btn-blue:hover { background-color: transparent; color: #87CEEB; }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ backgroundColor: "#000", color: "#fff", width: "100%" }}>
        <div style={{ maxWidth: 1250, margin: "0 auto", padding: "clamp(64px,10vw,128px) clamp(16px,4vw,64px)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <h1 style={{ fontFamily: GC, fontWeight: 950, fontSize: "clamp(56px,8.5vw,120px)", lineHeight: 0.94, color: "#fff", maxWidth: 900, marginBottom: 28 }}>
            Category ownership, not content noise.
          </h1>
          <p style={{ fontFamily: GC, fontWeight: 500, fontSize: "clamp(20px,2.2vw,26px)", lineHeight: 1.5, color: "rgba(255,255,255,0.78)", maxWidth: 680, marginBottom: 40 }}>
            Learn how AVRO thinks about calm performance, PharmaGABA®,
            calm-first energy, state before pressure moments, and choosing the
            right formula.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
            <a href="/learn" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: GC, fontWeight: 800, fontSize: 22, minHeight: 68, padding: "0 48px", borderRadius: 10, textDecoration: "none", backgroundColor: "#87CEEB", color: "#000", border: "2.5px solid #87CEEB" }}>Read Articles</a>
            <a href="/shop" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: GC, fontWeight: 800, fontSize: 22, minHeight: 68, padding: "0 48px", borderRadius: 10, textDecoration: "none", backgroundColor: "transparent", color: "#fff", border: "2.5px solid #fff" }}>Shop AVRO</a>
          </div>
        </div>
      </section>

      {/* ── ARTICLE GROUPS ── */}
      <section style={{ backgroundColor: "#fff", width: "100%", padding: "clamp(48px,7vw,88px) clamp(16px,4vw,64px)" }}>
        <div style={{ maxWidth: 1250, margin: "0 auto" }}>
          <h2 style={{ fontFamily: GC, fontWeight: 800, fontSize: "clamp(32px,4vw,56px)", lineHeight: 1.02, color: "#000", marginBottom: 40 }}>
            Start with 12 strong articles.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {articleGroups.map((group) => (
              <article key={group.title} style={{ backgroundColor: "#000", borderRadius: 12, padding: 28 }}>
                <h3 style={{ fontFamily: GC, fontWeight: 800, fontSize: 24, color: "#fff", marginBottom: 24, lineHeight: 1.1 }}>
                  {group.title}
                </h3>
                {group.articles.map((article) => (
                  <a
                    key={article}
                    href="/learn"
                    style={{
                      display: "block",
                      fontFamily: GC,
                      fontWeight: 700,
                      fontSize: 18,
                      lineHeight: 1.4,
                      color: "rgba(255,255,255,0.82)",
                      borderTop: "1px solid rgba(255,255,255,0.12)",
                      padding: "16px 0",
                      textDecoration: "none",
                    }}
                  >
                    {article}
                  </a>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMPLATE SECTION ── */}
      <section style={{ backgroundColor: "#fff", borderTop: "1px solid #e8e8e8", width: "100%", padding: "clamp(48px,7vw,88px) clamp(16px,4vw,64px)" }}>
        <div style={{ maxWidth: 1250, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(32px,6vw,80px)" }}>
          <div>
            <h2 style={{ fontFamily: GC, fontWeight: 800, fontSize: "clamp(36px,4.5vw,64px)", lineHeight: 1.02, color: "#000", marginBottom: 20 }}>
              Built for clear answers.
            </h2>
            <p style={{ fontFamily: GC, fontWeight: 500, fontSize: "clamp(18px,1.6vw,23px)", lineHeight: 1.55, color: "#3a3a3a" }}>
              Each article should open with a short answer, then explain why it
              matters, how AVRO thinks about it, which formula fits, FAQs,
              sources, and a clear CTA.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {templateItems.map(({ svg, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 16, backgroundColor: "#000", borderRadius: 12, padding: "20px 24px" }}>
                <span style={{ flexShrink: 0 }}>{svg}</span>
                <span style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(17px,1.5vw,21px)", color: "#fff" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ backgroundColor: "#fff", width: "100%", padding: "clamp(40px,6vw,72px) clamp(16px,4vw,64px)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", backgroundColor: "#000", borderRadius: 20, padding: "clamp(56px,7vw,88px) clamp(48px,6vw,96px)", display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 48 }}>
          {/* Left: text */}
          <div style={{ flex: "1 1 480px", minWidth: 300 }}>
            <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 16, color: "rgba(255,255,255,0.6)", marginBottom: 16, display: "block" }}>
              Choose the formula that fits your moment.
            </span>
            <h2 style={{ fontFamily: GC, fontWeight: 950, fontSize: "clamp(40px,5.5vw,72px)", lineHeight: 1.0, color: "#fff", marginBottom: 20 }}>
              Ready to find your formula?
            </h2>
            <p style={{ fontFamily: GC, fontWeight: 500, fontSize: "clamp(19px,1.8vw,24px)", lineHeight: 1.4, color: "rgba(255,255,255,0.75)", maxWidth: 540 }}>
              Choose Calm, Focus, or Energy based on the moment you want to support.
            </p>
          </div>
          {/* Right: buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            <a href="/shop/calm" className="cta-btn cta-btn-white" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: GC, fontWeight: 800, fontSize: 20, minHeight: 64, padding: "0 40px", borderRadius: 10, textDecoration: "none" }}>Shop Calm</a>
            <a href="/shop/focus" className="cta-btn cta-btn-blue" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: GC, fontWeight: 800, fontSize: 20, minHeight: 64, padding: "0 40px", borderRadius: 10, textDecoration: "none" }}>Shop Focus</a>
            <a href="/shop/energy" className="cta-btn cta-btn-blue" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: GC, fontWeight: 800, fontSize: 20, minHeight: 64, padding: "0 40px", borderRadius: 10, textDecoration: "none" }}>Shop Energy</a>
          </div>
        </div>
      </section>
    </main>
  )
}
