"use client"

import { useState, useEffect, useCallback } from "react"
import { formulas, type FormulaKey } from "@/lib/data"
import { stickImageFor } from "@/components/product-visual"

interface PdpSocialScrollProps {
  formulaKey: FormulaKey
}

const GC = '"Gotham Condensed", sans-serif'
const BLUE = "#87CEEB"

const socialCards = [
  { 
    id: 1, 
    label: "Morning routine", 
    bg: "#2a2a2a",
    quote: "I start every morning with AVRO. It's become my ritual.",
    author: "Sarah K.",
    role: "Product Designer"
  },
  { 
    id: 2, 
    label: "Work focus", 
    bg: "#333333",
    quote: "Helps me get into deep work mode without the jitters.",
    author: "Mike T.",
    role: "Software Engineer"
  },
  { 
    id: 3, 
    label: "Customer story", 
    bg: "#3a3a3a",
    quote: "Finally found something that actually works for me.",
    author: "Jessica L.",
    role: "Marketing Lead"
  },
  { 
    id: 4, 
    label: "Team moment", 
    bg: "#2f2f2f",
    quote: "Our whole team keeps a stash in the office now.",
    author: "David R.",
    role: "Startup Founder"
  },
  { 
    id: 5, 
    label: "Evening wind-down", 
    bg: "#353535",
    quote: "Perfect for winding down after a long day.",
    author: "Amanda C.",
    role: "Nurse Practitioner"
  },
  { 
    id: 6, 
    label: "Pre-workout", 
    bg: "#2c2c2c",
    quote: "Better than any pre-workout I've tried. Clean energy.",
    author: "Chris B.",
    role: "Fitness Coach"
  },
  { 
    id: 7, 
    label: "Study session", 
    bg: "#383838",
    quote: "Got me through finals week. Game changer.",
    author: "Taylor M.",
    role: "Graduate Student"
  },
]

export function PdpSocialScroll({ formulaKey }: PdpSocialScrollProps) {
  const [activeIndex, setActiveIndex] = useState(3)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const item = formulas[formulaKey]
  const stickImage = stickImageFor(formulaKey)
  
  const handlePrev = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setActiveIndex((prev) => (prev === 0 ? socialCards.length - 1 : prev - 1))
    setTimeout(() => setIsTransitioning(false), 600)
  }, [isTransitioning])
  
  const handleNext = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setActiveIndex((prev) => (prev === socialCards.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsTransitioning(false), 600)
  }, [isTransitioning])

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [handleNext])

  const getVisibleCards = () => {
    const cards = []
    for (let i = -2; i <= 2; i++) {
      const index = (activeIndex + i + socialCards.length) % socialCards.length
      cards.push({ ...socialCards[index], position: i })
    }
    return cards
  }

  return (
    <section
      className="w-full py-[clamp(48px,6vw,80px)] overflow-hidden"
      style={{ fontFamily: GC, backgroundColor: BLUE }}
    >
      <div className="w-full max-w-[1600px] mx-auto px-[clamp(18px,5vw,64px)]">
        <h2
          className="text-center mb-10"
          style={{
            fontFamily: GC,
            fontWeight: 950,
            fontSize: "clamp(40px,5.5vw,72px)",
            lineHeight: 0.95,
            color: "#000",
          }}
        >
          This is what {formulaKey} feels like.
        </h2>
        
        <div className="relative">
          <div 
            className="flex items-end justify-center gap-5"
            style={{ transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)" }}
          >
            {getVisibleCards().map((card) => {
              const isFeatured = card.position === 0
              const isAdjacent = Math.abs(card.position) === 1
              
              return (
                <div
                  key={`${card.id}-${card.position}`}
                  className="relative flex-shrink-0 rounded-2xl overflow-hidden"
                  style={{
                    width: isFeatured ? 280 : isAdjacent ? 220 : 180,
                    height: isFeatured ? 420 : isAdjacent ? 370 : 320,
                    opacity: isFeatured ? 1 : isAdjacent ? 0.9 : 0.7,
                    transform: `scale(${isFeatured ? 1 : 0.98}) translateY(${isFeatured ? 0 : isAdjacent ? 16 : 32}px)`,
                    transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                    zIndex: isFeatured ? 10 : isAdjacent ? 5 : 1,
                  }}
                >
                  {/* Card background with content */}
                  <div className="absolute inset-0 flex flex-col" style={{ backgroundColor: card.bg }}>
                    {/* Top label */}
                    <div className="p-4">
                      <div
                        className="inline-block px-3 py-1.5 rounded-full"
                        style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                      >
                        <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 14, color: "#fff" }}>
                          {card.label}
                        </span>
                      </div>
                    </div>
                    
                    {/* Quote content - centered */}
                    <div className="flex-1 flex flex-col justify-center px-5 pb-24">
                      <p
                        className="mb-4"
                        style={{
                          fontFamily: GC,
                          fontWeight: 700,
                          fontSize: isFeatured ? 22 : 18,
                          lineHeight: 1.3,
                          color: "#fff",
                        }}
                      >
                        "{card.quote}"
                      </p>
                      <div>
                        <span
                          className="block"
                          style={{
                            fontFamily: GC,
                            fontWeight: 800,
                            fontSize: isFeatured ? 16 : 14,
                            color: "#fff",
                          }}
                        >
                          {card.author}
                        </span>
                        <span
                          style={{
                            fontFamily: GC,
                            fontWeight: 500,
                            fontSize: isFeatured ? 14 : 12,
                            color: "rgba(255,255,255,0.7)",
                          }}
                        >
                          {card.role}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick add card at bottom */}
                  <div className="absolute bottom-4 left-3 right-3 bg-white rounded-xl p-3 flex items-center gap-3 shadow-xl">
                    <div className="w-14 h-14 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: "#e8e8e8" }}>
                      <img src={stickImage.src} alt={stickImage.alt} className="w-10 h-10 object-contain" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <span className="block truncate" style={{ fontFamily: GC, fontWeight: 800, fontSize: 18, color: "#000" }}>
                        {item.short}
                      </span>
                      <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 18, color: "#000" }}>
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    
                    <button
                      className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                      style={{ backgroundColor: BLUE, border: "2.5px solid #000" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = BLUE
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Navigation */}
          <div className="flex items-center justify-center gap-5 mt-10">
            <button 
              onClick={handlePrev}
              disabled={isTransitioning}
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all disabled:opacity-50"
              style={{ backgroundColor: "#000", border: "2.5px solid #000" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
                const svg = e.currentTarget.querySelector("svg")
                if (svg) svg.setAttribute("stroke", "#000")
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#000"
                const svg = e.currentTarget.querySelector("svg")
                if (svg) svg.setAttribute("stroke", "#fff")
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            
            <div className="flex items-center gap-2">
              {socialCards.map((card, i) => (
                <button
                  key={card.id}
                  onClick={() => {
                    if (!isTransitioning) {
                      setIsTransitioning(true)
                      setActiveIndex(i)
                      setTimeout(() => setIsTransitioning(false), 600)
                    }
                  }}
                  style={{
                    width: i === activeIndex ? 28 : 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: i === activeIndex ? "#000" : "rgba(0,0,0,0.3)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
            
            <button 
              onClick={handleNext}
              disabled={isTransitioning}
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all disabled:opacity-50"
              style={{ backgroundColor: "#000", border: "2.5px solid #000" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
                const svg = e.currentTarget.querySelector("svg")
                if (svg) svg.setAttribute("stroke", "#000")
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#000"
                const svg = e.currentTarget.querySelector("svg")
                if (svg) svg.setAttribute("stroke", "#fff")
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
