import Link from "next/link"
import { Icon } from "@/components/icons"

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

const templateItems = [
  { icon: "search", label: "Clear question headline" },
  { icon: "card",   label: "Short answer box" },
  { icon: "shield", label: "Compliance-safe structure-function language" },
  { icon: "leaf",   label: "Internal links to formulas, science, cohorts, and FAQ" },
]

export default function LearnPage() {
  return (
    <main>
      {/* Button hover states */}
      <style>{`
        @font-face {
          font-family: "Gotham Condensed";
          src: url("/fonts/GothamCond-Ultra.woff") format("woff");
          font-weight: 950; font-style: normal; font-display: swap;
        }
        @font-face {
          font-family: "Gotham Condensed";
          src: url("/fonts/GothamCond-Black.woff") format("woff");
          font-weight: 800; font-style: normal; font-display: swap;
        }
        @font-face {
          font-family: "Gotham Condensed";
          src: url("/fonts/GothamCond-Bold.woff") format("woff");
          font-weight: 700; font-style: normal; font-display: swap;
        }
        @font-face {
          font-family: "Gotham Condensed";
          src: url("/fonts/GothamCond-Medium.woff") format("woff");
          font-weight: 500; font-style: normal; font-display: swap;
        }
        @font-face {
          font-family: "Gotham Condensed";
          src: url("/fonts/GothamCond-Book.woff") format("woff");
          font-weight: 400; font-style: normal; font-display: swap;
        }
        .lp-btn { display: inline-flex; align-items: center; justify-content: center; font-family: "Gotham Condensed", sans-serif; font-weight: 800; font-size: 22px; min-height: 68px; padding: 0 48px; border-radius: 10px; text-decoration: none; transition: background-color 0.18s ease, color 0.18s ease; }
        .lp-btn-sm { font-size: 21px; min-height: 66px; padding: 0 46px; }
        .lp-btn-blue  { background-color: #87CEEB; color: #000; border: 2.5px solid #87CEEB; }
        .lp-btn-blue:hover  { background-color: transparent; color: #87CEEB; }
        .lp-btn-white-outline { background-color: transparent; color: #fff; border: 2.5px solid #fff; }
        .lp-btn-white-outline:hover { background-color: #fff; color: #000; }
        .lp-btn-black { background-color: #000; color: #fff; border: 2.5px solid #000; }
        .lp-btn-black:hover { background-color: transparent; color: #000; }
        .lp-btn-black-outline { background-color: transparent; color: #000; border: 2.5px solid #000; }
        .lp-btn-black-outline:hover { background-color: #000; color: #fff; }
        .lp-article-link:hover { color: #87CEEB !important; }
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
            <Link href="/learn" className="lp-btn lp-btn-blue">Read Articles</Link>
            <Link href="/shop" className="lp-btn lp-btn-white-outline">Shop AVRO</Link>
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
                  <Link
                    key={article}
                    href="/learn"
                    className="lp-article-link"
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
                      transition: "color 0.15s ease",
                    }}
                  >
                    {article}
                  </Link>
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
            {templateItems.map(({ icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 16, backgroundColor: "#000", borderRadius: 12, padding: "20px 24px" }}>
                <Icon name={icon as any} className="w-7 h-7 shrink-0 text-white" />
                <span style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(17px,1.5vw,21px)", color: "#fff" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ backgroundColor: "#fff", width: "100%", padding: "clamp(32px,5vw,56px) clamp(16px,4vw,64px)" }}>
        <div style={{ maxWidth: 1250, margin: "0 auto", backgroundColor: "#87CEEB", borderRadius: 16, padding: "clamp(48px,7vw,80px) clamp(24px,6vw,80px)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 24 }}>
          <h2 style={{ fontFamily: GC, fontWeight: 950, fontSize: "clamp(36px,5vw,72px)", lineHeight: 1.0, color: "#000", maxWidth: 700 }}>
            Ready to find your formula?
          </h2>
          <p style={{ fontFamily: GC, fontWeight: 500, fontSize: "clamp(18px,1.8vw,22px)", lineHeight: 1.45, color: "#111", maxWidth: 560 }}>
            Choose Calm, Focus, or Energy based on the moment you want to support.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginTop: 8 }}>
            <Link href="/shop" className="lp-btn lp-btn-sm lp-btn-black">Shop AVRO</Link>
            <Link href="/shop" className="lp-btn lp-btn-sm lp-btn-black-outline">Find Your Formula</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
