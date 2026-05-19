import { stickImageFor } from "@/components/product-visual"
import type { FormulaKey, Formula } from "@/lib/data"

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
    <section className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(48px,6vw,80px)] bg-white border-b border-line">
      {/* Summary bar */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8 p-5 lg:p-6 mb-7 bg-soft/60 border border-line rounded-lg">
        <div className="flex items-center gap-4 shrink-0">
          <div
            className="relative flex items-center justify-center w-14 h-14 rounded-md overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${formula.color}, ${formula.accent})` }}
          >
            {(() => {
              const { src, alt } = stickImageFor(formulaKey)
              return (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={src} alt={alt} className="h-12 w-auto object-contain" />
              )
            })()}
          </div>
          <div>
            <strong className="block font-extrabold">{formula.name}</strong>
            <span className="block text-sm text-ink/65">{formula.flavor}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 lg:ml-auto">
          <div className="flex flex-col items-start">
            <strong className="text-3xl font-black leading-none">4.8</strong>
            <span className="text-[#d79a23] text-sm tracking-wider">{"\u2605\u2605\u2605\u2605\u2605"}</span>
          </div>
          <span className="text-sm text-ink/70 max-w-[180px] leading-snug">
            Based on {reviewCount} verified reviews
          </span>
        </div>
        <button className="lg:ml-4 inline-flex items-center justify-center min-h-[44px] px-5 rounded-full border border-line bg-white text-sm font-extrabold hover:border-olive transition-colors">
          Write a review
        </button>
      </div>

      {/* Review grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
        {reviews.map((r) => (
          <article key={r.name + r.title} className="pb-6 border-b border-line">
            <div className="flex items-baseline justify-between gap-4 mb-1.5">
              <strong className="font-extrabold">{r.name}</strong>
              <time className="text-xs text-ink/50">{r.date}</time>
            </div>
            <span className="text-[#d79a23] text-sm tracking-wider">{"\u2605\u2605\u2605\u2605\u2605"}</span>
            <h3 className="mt-2 font-extrabold">{r.title}</h3>
            <p className="mt-1.5 text-ink/75 text-[15px] leading-relaxed">{r.body}</p>
            <p className="mt-3 text-xs">
              <span className="text-ink/55">{formula.flavor}</span>
              <span className="text-ink/35"> &middot; </span>
              <span className="text-ink/55">{r.size}</span>
            </p>
          </article>
        ))}
      </div>

      {/* Pagination dots */}
      <nav className="flex items-center justify-center gap-2 mt-9" aria-label="Reviews pagination">
        <span className="grid place-items-center w-8 h-8 rounded-md border border-line text-ink/50 cursor-not-allowed">‹</span>
        {[1, 2, 3, 4, 5].map((p) => (
          <span
            key={p}
            className={
              p === 1
                ? "grid place-items-center w-8 h-8 rounded-md bg-olive text-white text-sm font-extrabold"
                : "grid place-items-center w-8 h-8 rounded-md border border-line text-ink/65 text-sm hover:border-olive cursor-pointer"
            }
          >
            {p}
          </span>
        ))}
        <span className="grid place-items-center w-8 h-8 rounded-md border border-line text-ink/65 cursor-pointer hover:border-olive">›</span>
      </nav>
    </section>
  )
}
