import { stickImageFor } from "@/components/product-visual"
import type { FormulaKey, Formula } from "@/lib/data"

const GC = '"Gotham Condensed", sans-serif'

interface ReviewsBlockProps {
  formula: Formula
  formulaKey: FormulaKey
}

const REVIEWS_BY_KEY: Record<FormulaKey, { name: string; date: string; title: string; body: string; size: string }[]> = {
  calm: [
    {
      name: "Jessica M.",
      date: "05/14/2026",
      title: "Composed without feeling dull",
      body: "Helps me stay composed without feeling dull. I take it before meetings and travel. Easily part of my routine.",
      size: "30 Sticks",
    },
    {
      name: "Anonymous",
      date: "05/12/2026",
      title: "Better than I expected",
      body: "Smooth taste, no aftertaste. I notice a calmer baseline within about 30 minutes.",
      size: "10 Sticks",
    },
    {
      name: "Samantha B.",
      date: "05/12/2026",
      title: "Perfect blend",
      body: "Loved this flavor and how it makes me feel. Calm without being sleepy.",
      size: "30 Sticks",
    },
    {
      name: "Kathy P.",
      date: "05/11/2026",
      title: "Love this flavor",
      body: "Great flavor, and it actually helps before high-pressure days. Will keep restocking.",
      size: "60 Sticks",
    },
  ],
  focus: [
    {
      name: "Michael T.",
      date: "05/14/2026",
      title: "Stays clear and steady",
      body: "I use Focus before important meetings and it helps me stay clear and on point without the caffeine edge.",
      size: "30 Sticks",
    },
    {
      name: "Priya R.",
      date: "05/12/2026",
      title: "Great for deep work",
      body: "Drink one before a long writing block and the difference is real. Tastes clean too.",
      size: "30 Sticks",
    },
    {
      name: "Anonymous",
      date: "05/10/2026",
      title: "Subtle but reliable",
      body: "Not flashy, just dependable. I notice fewer scattered moments during the workday.",
      size: "10 Sticks",
    },
    {
      name: "David K.",
      date: "05/08/2026",
      title: "My new pre-meeting drink",
      body: "Replaced my second coffee. I am steadier and clearer all afternoon.",
      size: "60 Sticks",
    },
  ],
  energy: [
    {
      name: "Sarah K.",
      date: "05/14/2026",
      title: "Calm-first energy is real",
      body: "Love the taste and how it fits my routine. It feels calm-first, not jittery.",
      size: "30 Sticks",
    },
    {
      name: "Jordan L.",
      date: "05/12/2026",
      title: "Perfect morning lift",
      body: "Lift without the crash. Great before early tee times and long workdays.",
      size: "30 Sticks",
    },
    {
      name: "Anonymous",
      date: "05/11/2026",
      title: "Smooth caffeine",
      body: "Steady, controlled energy. I do not feel tense like with normal energy drinks.",
      size: "10 Sticks",
    },
    {
      name: "Erin H.",
      date: "05/09/2026",
      title: "Clean and tasty",
      body: "Bright orange flavor without being sweet. Easy daily addition.",
      size: "60 Sticks",
    },
  ],
}

export function ReviewsBlock({ formula, formulaKey }: ReviewsBlockProps) {
  const reviews = REVIEWS_BY_KEY[formulaKey]
  const reviewCount = formulaKey === "calm" ? 82 : formulaKey === "focus" ? 62 : 76

  return (
    <section className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(48px,6vw,80px)] bg-white">
      {/* Summary bar */}
      <div
        className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8 p-6 lg:p-7 mb-8"
        style={{ backgroundColor: "#f2f2f2", borderRadius: 14 }}
      >
        <div className="flex items-center gap-5 shrink-0">
          <div
            className="relative flex items-center justify-center w-16 h-16 rounded-lg overflow-hidden"
            style={{ backgroundColor: "#e8e8e8" }}
          >
            {(() => {
              const { src, alt } = stickImageFor(formulaKey)
              return (
                <img src={src} alt={alt} className="h-14 w-auto object-contain" />
              )
            })()}
          </div>
          <div>
            <strong style={{ fontFamily: GC, fontWeight: 800, fontSize: 22, color: "#000", display: "block" }}>
              {formula.name}
            </strong>
            <span style={{ fontFamily: GC, fontWeight: 400, fontSize: 16, color: "rgba(0,0,0,0.55)", display: "block" }}>
              {formula.flavor}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-5 lg:ml-auto">
          <div className="flex flex-col items-start">
            <strong style={{ fontFamily: GC, fontWeight: 950, fontSize: 40, lineHeight: 1, color: "#000" }}>4.8</strong>
            <span style={{ fontSize: 16, letterSpacing: 2, color: "#000" }}>{"\u2605\u2605\u2605\u2605\u2605"}</span>
          </div>
          <span style={{ fontFamily: GC, fontWeight: 400, fontSize: 16, color: "rgba(0,0,0,0.6)", maxWidth: 180, lineHeight: 1.4 }}>
            Based on {reviewCount} verified reviews
          </span>
        </div>
        <button
          className="lg:ml-4 inline-flex items-center justify-center transition-colors"
          style={{
            fontFamily: GC,
            fontWeight: 800,
            fontSize: 17,
            minHeight: 56,
            padding: "0 28px",
            borderRadius: 10,
            backgroundColor: "#000",
            color: "#fff",
          }}
        >
          Write a review
        </button>
      </div>

      {/* Review grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {reviews.map((r) => (
          <article key={r.name + r.title} className="pb-7" style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
            <div className="flex items-baseline justify-between gap-4 mb-2">
              <strong style={{ fontFamily: GC, fontWeight: 800, fontSize: 18, color: "#000" }}>{r.name}</strong>
              <time style={{ fontFamily: GC, fontWeight: 400, fontSize: 14, color: "rgba(0,0,0,0.45)" }}>{r.date}</time>
            </div>
            <span style={{ fontSize: 15, letterSpacing: 2, color: "#000" }}>{"\u2605\u2605\u2605\u2605\u2605"}</span>
            <h3 style={{ fontFamily: GC, fontWeight: 800, fontSize: 19, color: "#000", marginTop: 10 }}>{r.title}</h3>
            <p style={{ fontFamily: GC, fontWeight: 400, fontSize: 17, color: "rgba(0,0,0,0.7)", lineHeight: 1.55, marginTop: 8 }}>{r.body}</p>
            <p className="mt-4" style={{ fontFamily: GC, fontWeight: 400, fontSize: 14, color: "rgba(0,0,0,0.5)" }}>
              {formula.flavor} &middot; {r.size}
            </p>
          </article>
        ))}
      </div>

      {/* Pagination dots */}
      <nav className="flex items-center justify-center gap-2 mt-10" aria-label="Reviews pagination">
        <span
          className="grid place-items-center w-10 h-10 rounded-lg cursor-not-allowed"
          style={{ border: "1.5px solid rgba(0,0,0,0.15)", color: "rgba(0,0,0,0.35)", fontFamily: GC, fontWeight: 600, fontSize: 18 }}
        >
          &lsaquo;
        </span>
        {[1, 2, 3, 4, 5].map((p) => (
          <span
            key={p}
            className="grid place-items-center w-10 h-10 rounded-lg cursor-pointer"
            style={{
              fontFamily: GC,
              fontWeight: 800,
              fontSize: 16,
              backgroundColor: p === 1 ? "#000" : "transparent",
              color: p === 1 ? "#fff" : "#000",
              border: p === 1 ? "none" : "1.5px solid rgba(0,0,0,0.15)",
            }}
          >
            {p}
          </span>
        ))}
        <span
          className="grid place-items-center w-10 h-10 rounded-lg cursor-pointer hover:border-black transition-colors"
          style={{ border: "1.5px solid rgba(0,0,0,0.15)", color: "#000", fontFamily: GC, fontWeight: 600, fontSize: 18 }}
        >
          &rsaquo;
        </span>
      </nav>
    </section>
  )
}
