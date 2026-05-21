"use client"

import { useState, useEffect, useCallback } from "react"
import { formulas, type FormulaKey } from "@/lib/data"
import { stickImageFor } from "@/components/product-visual"

interface PdpSocialScrollProps {
  formulaKey: FormulaKey
}

const GC = '"Gotham Condensed", sans-serif'
const BLUE = "#87CEEB"

// Social content cards
const socialCards = [
  { id: 1, label: "Morning routine" },
  { id: 2, label: "Work focus" },
  { id: 3, label: "Customer story" },
  { id: 4, label: "Team moment" },
  { id: 5, label: "Evening wind-down" },
]

export function PdpSocialScroll({ formulaKey }: PdpSocialScrollProps) {
  const [activeIndex, setActiveIndex] = useState(2)
  const item = formulas[formulaKey]
  const stickImage = stickImageFor(formulaKey)
  
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? socialCards.length - 1 : prev - 1))
  }, [])
  
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === socialCards.length - 1 ? 0 : prev + 1))
  }, [])

  // Auto-advance every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 6000)
    return () => clearInterval(interval)
  }, [handleNext])

  // Get visible cards (5 at a time, centered on activeIndex)
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
      className="w-full py-[clamp(56px,7vw,96px)] overflow-hidden"
      style={{ fontFamily: GC, backgroundColor: BLUE }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)]">
        {/* Headline - Centered */}
        <h2
          className="text-center mb-14"
          style={{
            fontFamily: GC,
            fontWeight: 950,
            fontSize: "clamp(40px,6vw,76px)",
            lineHeight: 0.95,
            color: "#000",
          }}
        >
          This is what {formulaKey} feels like.
        </h2>
        
        {/* Horizontal card carousel */}
        <div className="relative">
          <div className="flex items-end justify-center gap-5">
            {getVisibleCards().map((card) => {
              const isFeatured = card.position === 0
              
              return (
                <div
                  key={`${card.id}-${card.position}`}
                  className="relative flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-500 ease-out"
                  style={{
                    width: isFeatured ? 300 : 240,
                    height: isFeatured ? 520 : 440,
                    opacity: isFeatured ? 1 : 0.85,
                    transform: isFeatured ? "scale(1)" : "scale(0.97)",
                    zIndex: isFeatured ? 10 : 1,
                  }}
                >
                  {/* Placeholder content area - darker gray */}
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: isFeatured ? "#3a3a3a" : "#4a4a4a" }}
                  >
                    {/* Animated gradient overlay */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)",
                      }}
                    />
                    
                    {/* Content type label - bigger */}
                    <div
                      className="absolute top-5 left-5 px-4 py-2 rounded-full"
                      style={{ backgroundColor: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
                    >
                      <span
                        style={{
                          fontFamily: GC,
                          fontWeight: 700,
                          fontSize: 16,
                          color: "#fff",
                        }}
                      >
                        {card.label}
                      </span>
                    </div>
                    
                    {/* Video controls on featured card */}
                    {isFeatured && (
                      <div className="absolute top-5 right-5 flex flex-col gap-3">
                        <button
                          className="w-11 h-11 rounded-full flex items-center justify-center transition-colors"
                          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                            <path d="M11 5L6 9H2v6h4l5 4V5z" />
                            <line x1="23" y1="9" x2="17" y2="15" />
                            <line x1="17" y1="9" x2="23" y2="15" />
                          </svg>
                        </button>
                        <button
                          className="w-11 h-11 rounded-full flex items-center justify-center transition-colors"
                          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Product footer card - bigger */}
                  <div className="absolute bottom-5 left-5 right-5 bg-white rounded-xl p-4 flex items-center gap-4 shadow-xl">
                    {/* Product thumbnail */}
                    <div
                      className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: "#e8e8e8" }}
                    >
                      <img 
                        src={stickImage.src}
                        alt={stickImage.alt}
                        className="w-11 h-11 object-contain"
                      />
                    </div>
                    
                    {/* Product info - bigger text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span
                          className="truncate pr-1"
                          style={{ fontFamily: GC, fontWeight: 800, fontSize: 18, color: "#000" }}
                        >
                          {item.short}
                        </span>
                        <button className="p-1 flex-shrink-0">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3">
                            <polyline points="18 15 12 9 6 15" />
                          </svg>
                        </button>
                      </div>
                      <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 18, color: "#000" }}>
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    
                    {/* Add to cart button - AVRO blue, bigger */}
                    <button
                      className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-105"
                      style={{ backgroundColor: BLUE }}
                    >
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Navigation arrows - solid black background */}
          <div className="flex items-center justify-center gap-5 mt-10">
            <button 
              onClick={handlePrev}
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-105"
              style={{ backgroundColor: "#000" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button 
              onClick={handleNext}
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-105"
              style={{ backgroundColor: "#000" }}
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
