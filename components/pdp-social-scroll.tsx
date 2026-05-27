"use client"

import { useState, useEffect, useCallback } from "react"
import { formulas, type FormulaKey } from "@/lib/data"
import { stickImageFor } from "@/components/product-visual"

interface PdpSocialScrollProps {
  formulaKey: FormulaKey
}

const GC = '"DM Sans", system-ui, sans-serif'
const BLUE = "#94C6D4"

const socialCards = [
  { id: 1, label: "Morning routine", bg: "#2a2a2a" },
  { id: 2, label: "Work focus", bg: "#333333" },
  { id: 3, label: "Customer story", bg: "#3a3a3a" },
  { id: 4, label: "Team moment", bg: "#2f2f2f" },
  { id: 5, label: "Evening wind-down", bg: "#353535" },
  { id: 6, label: "Pre-workout", bg: "#2c2c2c" },
  { id: 7, label: "Study session", bg: "#383838" },
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
          className="font-serif text-center mb-10"
          style={{
            fontWeight: 900,
            fontSize: "clamp(36px,5vw,64px)",
            lineHeight: 0.95,
            color: "var(--ink)",
          }}
        >
          This is what {formulaKey} feels like.
        </h2>
        
        <div className="relative">
          <div 
            className="flex items-end justify-center gap-4"
            style={{ transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)" }}
          >
            {getVisibleCards().map((card) => {
              const isFeatured = card.position === 0
              const isAdjacent = Math.abs(card.position) === 1
              
              return (
                <div
                  key={`${card.id}-${card.position}`}
                  className="relative flex-shrink-0 rounded-3xl overflow-hidden"
                  style={{
                    width: isFeatured ? 280 : isAdjacent ? 220 : 170,
                    height: isFeatured ? 440 : isAdjacent ? 380 : 320,
                    opacity: isFeatured ? 1 : isAdjacent ? 0.9 : 0.7,
                    transform: `scale(${isFeatured ? 1 : 0.98}) translateY(${isFeatured ? 0 : isAdjacent ? 16 : 32}px)`,
                    transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                    zIndex: isFeatured ? 10 : isAdjacent ? 5 : 1,
                  }}
                >
                  {/* Card background - video placeholder */}
                  <div className="absolute inset-0" style={{ backgroundColor: card.bg }}>
                    {/* Top label */}
                    <div className="absolute top-4 left-4 right-4">
                      <div
                        className="inline-block px-3 py-1.5 rounded-full"
                        style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                      >
                        <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 14, color: "var(--bone)" }}>
                          {card.label}
                        </span>
                      </div>
                    </div>
                    
                    {/* Play button overlay for non-featured */}
                    {!isFeatured && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Quick add card at bottom */}
                  <div className="absolute bottom-3 left-2.5 right-2.5 bg-base rounded-2xl p-2.5 flex items-center gap-2.5 shadow-xl">
                    <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: "#e8e8e8" }}>
                      <img src={stickImage.src} alt={stickImage.alt} className="w-8 h-8 object-contain" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <span className="block truncate" style={{ fontFamily: GC, fontWeight: 800, fontSize: 16, color: "var(--ink)" }}>
                        {item.short}
                      </span>
                      <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 16, color: "var(--ink)" }}>
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    
                    <button
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                      style={{ backgroundColor: BLUE, border: `2.5px solid ${BLUE}` }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = BLUE
                      }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--charcoal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
          <div className="flex items-center justify-center gap-4 mt-8">
            <button 
              onClick={handlePrev}
              disabled={isTransitioning}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all disabled:opacity-50"
                    style={{ backgroundColor: "var(--charcoal)", border: "2.5px solid var(--charcoal)" }}
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
                    borderRadius: 999,
                    backgroundColor: i === activeIndex ? "#000" : "rgba(0,0,0,0.3)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
            
            <button 
              onClick={handleNext}
              disabled={isTransitioning}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all disabled:opacity-50"
                    style={{ backgroundColor: "var(--charcoal)", border: "2.5px solid var(--charcoal)" }}
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
