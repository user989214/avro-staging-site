import Link from "next/link"
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

const GC_FAMILY = '"Gotham Condensed"'

export default function LearnPage() {
  return (
    <>
      {/* Scoped button hover states for the learn page */}
      <style>{`
        .learn-btn-blue, .learn-btn-outline-white,
        .learn-btn-black, .learn-btn-outline-black {
          transition: background-color 0.18s ease, color 0.18s ease;
        }
        /* Blue fill: hover → transparent, blue text. border stays #87CEEB via inline */
        .learn-btn-blue { background-color: #87CEEB; color: #000; border: 2.5px solid #87CEEB; }
        .learn-btn-blue:hover { background-color: transparent; color: #87CEEB; }
        /* White outline: hover → white fill, black text */
        .learn-btn-outline-white { background-color: transparent; color: #fff; border: 2.5px solid #fff; }
        .learn-btn-outline-white:hover { background-color: #fff; color: #000; }
        /* Black fill: hover → white fill, black text */
        .learn-btn-black { background-color: #000; color: #fff; border: 2.5px solid #000; }
        .learn-btn-black:hover { background-color: #fff; color: #000; }
        /* Black outline: hover → black fill, white text */
        .learn-btn-outline-black { background-color: transparent; color: #000; border: 2.5px solid #000; }
        .learn-btn-outline-black:hover { background-color: #000; color: #fff; }
      `}</style>

      {/* Hero — pure black background */}
      <section style={{ backgroundColor: "#000", color: "#fff" }} className="w-full">
        <div className="w-[min(calc(100%-32px),1250px)] md:w-[min(calc(100%-72px),1250px)] mx-auto py-[clamp(64px,10vw,128px)] flex flex-col items-center text-center">
          <h1
            className="text-[clamp(56px,8.5vw,120px)] leading-[0.94] mb-7 text-balance max-w-[900px]"
            style={{ fontFamily: GC_FAMILY, fontWeight: 950, color: "#fff" }}
          >
            Category ownership, not content noise.
          </h1>
          <p
            className="max-w-[680px] text-[clamp(20px,2.2vw,26px)] leading-[1.5] mb-10"
            style={{ fontFamily: GC_FAMILY, fontWeight: 500, color: "rgba(255,255,255,0.78)" }}
          >
            Learn how AVRO thinks about calm performance, PharmaGABA®,
            calm-first energy, state before pressure moments, and choosing the
            right formula.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {/* Primary: AVRO blue fill */}
            <Link
              href="/learn"
              className="learn-btn-blue"
              style={{ fontFamily: GC_FAMILY, fontWeight: 800, fontSize: "22px", minHeight: "68px", paddingLeft: "48px", paddingRight: "48px", borderRadius: "10px", display: "inline-flex", alignItems: "center" }}
            >
              Read Articles
            </Link>
            <Link
              href="/shop"
              className="learn-btn-outline-white"
              style={{ fontFamily: GC_FAMILY, fontWeight: 800, fontSize: "22px", minHeight: "68px", paddingLeft: "48px", paddingRight: "48px", borderRadius: "10px", display: "inline-flex", alignItems: "center" }}
            >
              Shop AVRO
            </Link>
          </div>
        </div>
      </section>

      {/* Article groups — pure white */}
      <section style={{ backgroundColor: "#fff" }} className="w-full py-[clamp(48px,7vw,88px)]">
        <style>{`.learn-article-link:hover { color: #87CEEB !important; }`}</style>
        <div className="w-[min(calc(100%-32px),1250px)] md:w-[min(calc(100%-72px),1250px)] mx-auto">
          <h2
            className="text-[clamp(32px,4vw,56px)] leading-[1.02] mb-10"
            style={{ fontFamily: GC_FAMILY, fontWeight: 800, color: "#000" }}
          >
            Start with 12 strong articles.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {articleGroups.map((group) => (
              <article
                key={group.title}
                style={{ backgroundColor: "#000", color: "#fff", borderRadius: "12px" }}
                className="p-7"
              >
                <h3
                  className="text-[24px] mb-6"
                  style={{ fontFamily: GC_FAMILY, fontWeight: 800, color: "#fff" }}
                >
                  {group.title}
                </h3>
                {group.articles.map((article) => (
                  <Link
                    key={article}
                    href="/learn"
                    className="learn-article-link block py-4 text-[18px] leading-[1.4] transition-colors"
                    style={{
                      fontFamily: GC_FAMILY,
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.82)",
                      borderTop: "1px solid rgba(255,255,255,0.12)",
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

      {/* Template section — AVRO blue accent strip */}
      <section style={{ backgroundColor: "#fff", borderTop: "1px solid #e8e8e8" }} className="w-full py-[clamp(48px,7vw,88px)]">
        <div className="w-[min(calc(100%-32px),1250px)] md:w-[min(calc(100%-72px),1250px)] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[clamp(32px,6vw,80px)]">
          <div>
            <h2
              className="text-[clamp(36px,4.5vw,64px)] leading-[1.02] mb-5"
              style={{ fontFamily: GC_FAMILY, fontWeight: 800, color: "#000" }}
            >
              Built for clear answers.
            </h2>
            <p
              className="text-[clamp(18px,1.6vw,23px)] leading-[1.55]"
              style={{ fontFamily: GC_FAMILY, fontWeight: 500, color: "#3a3a3a" }}
            >
              Each article should open with a short answer, then explain why it
              matters, how AVRO thinks about it, which formula fits, FAQs,
              sources, and a clear CTA.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            {[
              { icon: "search", label: "Clear question headline" },
              { icon: "card",   label: "Short answer box" },
              { icon: "shield", label: "Compliance-safe structure-function language" },
              { icon: "leaf",   label: "Internal links to formulas, science, cohorts, and FAQ" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-5 rounded-xl"
                style={{ backgroundColor: "#000" }}
              >
                <Icon name={icon as any} className="w-7 h-7 shrink-0 text-white" />
                <span
                  className="text-[clamp(17px,1.5vw,21px)]"
                  style={{ fontFamily: GC_FAMILY, fontWeight: 700, color: "#fff" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — AVRO blue rounded box */}
      <section className="w-full py-[clamp(32px,5vw,56px)] bg-white">
        <div
          className="w-[min(calc(100%-32px),1250px)] md:w-[min(calc(100%-72px),1250px)] mx-auto flex flex-col items-center text-center gap-6 py-[clamp(48px,7vw,80px)] px-[clamp(24px,6vw,80px)]"
          style={{ backgroundColor: "#87CEEB", borderRadius: "16px" }}
        >
          <h2
            className="text-[clamp(36px,5vw,72px)] leading-[1.0] text-balance"
            style={{ fontFamily: GC_FAMILY, fontWeight: 950, color: "#000" }}
          >
            Ready to find your formula?
          </h2>
          <p
            className="max-w-[560px] text-[clamp(18px,1.8vw,22px)] leading-[1.45]"
            style={{ fontFamily: GC_FAMILY, fontWeight: 500, color: "#111" }}
          >
            Choose Calm, Focus, or Energy based on the moment you want to support.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link
              href="/shop"
              className="learn-btn-black"
              style={{ fontFamily: GC_FAMILY, fontWeight: 800, fontSize: "21px", minHeight: "66px", paddingLeft: "46px", paddingRight: "46px", borderRadius: "10px", display: "inline-flex", alignItems: "center" }}
            >
              Shop AVRO
            </Link>
            <Link
              href="/shop"
              className="learn-btn-outline-black"
              style={{ fontFamily: GC_FAMILY, fontWeight: 800, fontSize: "21px", minHeight: "66px", paddingLeft: "46px", paddingRight: "46px", borderRadius: "10px", display: "inline-flex", alignItems: "center" }}
            >
              Find Your Formula
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
