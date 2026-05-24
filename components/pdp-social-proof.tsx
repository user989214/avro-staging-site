"use client"

import type { FormulaKey } from "@/lib/data"

interface SocialProofSectionProps {
  formulaKey: FormulaKey
}

const socialImages = {
  calm: [
    { src: "/images/lifestyle/calm-morning-routine.jpg", alt: "Person enjoying AVRO Calm during morning routine" },
    { src: "/images/lifestyle/calm-office-desk.jpg", alt: "AVRO Calm on a clean office desk" },
    { src: "/images/lifestyle/calm-evening-wind-down.jpg", alt: "Evening relaxation with AVRO Calm" },
  ],
  focus: [
    { src: "/images/lifestyle/focus-deep-work.jpg", alt: "Deep work session with AVRO Focus" },
    { src: "/images/lifestyle/focus-study-session.jpg", alt: "Study session powered by AVRO Focus" },
    { src: "/images/lifestyle/focus-creative-work.jpg", alt: "Creative work with AVRO Focus" },
  ],
  energy: [
    { src: "/images/lifestyle/energy-morning-workout.jpg", alt: "Morning workout with AVRO Energy" },
    { src: "/images/lifestyle/energy-golf-course.jpg", alt: "On the golf course with AVRO Energy" },
    { src: "/images/lifestyle/energy-busy-day.jpg", alt: "Busy day powered by AVRO Energy" },
  ],
}

const socialQuotes = {
  calm: [
    { quote: "My go-to before any high-pressure meeting.", name: "Sarah M.", title: "Product Manager" },
    { quote: "Finally, calm without feeling drowsy.", name: "James K.", title: "Entrepreneur" },
    { quote: "Part of my daily wind-down ritual now.", name: "Emily R.", title: "Designer" },
  ],
  focus: [
    { quote: "Deep work sessions just got easier.", name: "Michael T.", title: "Software Engineer" },
    { quote: "Clear thinking without the jitters.", name: "Anna L.", title: "Writer" },
    { quote: "My secret weapon for long study sessions.", name: "David C.", title: "Med Student" },
  ],
  energy: [
    { quote: "Steady energy all morning, no crash.", name: "Chris B.", title: "Sales Director" },
    { quote: "Better than my third cup of coffee.", name: "Rachel H.", title: "Consultant" },
    { quote: "Game changer for early tee times.", name: "Tom W.", title: "Golfer" },
  ],
}

export function SocialProofSection({ formulaKey }: SocialProofSectionProps) {
  const images = socialImages[formulaKey]
  const quotes = socialQuotes[formulaKey]
  const formulaName = formulaKey === "calm" ? "Calm" : formulaKey === "focus" ? "Focus" : "Energy"

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="inline-block px-4 py-1.5 rounded-full bg-avro-blue/10 text-avro-blue text-xs font-bold uppercase tracking-wider mb-4">
          Real People, Real Results
        </span>
        <h2 className="font-serif font-black text-[clamp(28px,4vw,48px)] leading-[1.05] text-ink mb-3">
          This is what {formulaName.toLowerCase()} feels like.
        </h2>
        <p className="text-ink/60 text-lg max-w-[600px] mx-auto">
          Join thousands who&apos;ve made AVRO {formulaName} part of their daily ritual.
        </p>
      </div>

      {/* Image grid with quotes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {quotes.map((item, i) => (
          <div
            key={item.name}
            className="group relative bg-base rounded-xl border border-line overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Image placeholder - using gradient for now */}
            <div 
              className="h-[200px] bg-gradient-to-br from-soft to-line flex items-center justify-center"
            >
              <div className="w-20 h-20 rounded-full bg-base-light/80 flex items-center justify-center">
                <span className="text-3xl font-black text-ink/20">{item.name.charAt(0)}</span>
              </div>
            </div>
            
            {/* Quote */}
            <div className="p-5">
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#d79a23"
                    className="text-[#d79a23]"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                ))}
              </div>
              <p className="text-ink font-medium leading-relaxed mb-4">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-soft flex items-center justify-center">
                  <span className="text-sm font-bold text-ink/50">{item.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-bold text-sm text-ink">{item.name}</p>
                  <p className="text-xs text-ink/50">{item.title}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mt-10 p-6 bg-soft rounded-xl">
        <div className="text-center">
          <p className="font-black text-2xl text-ink">4.8/5</p>
          <p className="text-xs text-ink/60 font-medium mt-1">Average Rating</p>
        </div>
        <div className="text-center border-x border-line">
          <p className="font-black text-2xl text-ink">25K+</p>
          <p className="text-xs text-ink/60 font-medium mt-1">Happy Customers</p>
        </div>
        <div className="text-center">
          <p className="font-black text-2xl text-ink">100K+</p>
          <p className="text-xs text-ink/60 font-medium mt-1">Sticks Sold</p>
        </div>
      </div>
    </div>
  )
}
