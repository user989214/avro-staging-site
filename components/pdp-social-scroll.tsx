"use client"

import { useState, useEffect, useCallback } from "react"
import { formulas, type FormulaKey } from "@/lib/data"
import { stickImageFor } from "@/components/product-visual"

interface PdpSocialScrollProps {
  formulaKey: FormulaKey
}

const GC = '"Gotham Condensed", sans-serif'
const BLUE = "#87CEEB"

// Social content cards with more variety
const socialCards = [
  { id: 1, label: "Morning routine", bg: "#2d2d2d" },
  { id: 2, label: "Work focus", bg: "#363636" },
  { id: 3, label: "Customer story", bg: "#3d3d3d" },
  { id: 4, label: "Team moment", bg: "#333333" },
  { id: 5, label: "Evening wind-down", bg: "#2a2a2a" },
]

export function PdpSocialScroll({ formulaKey }: PdpSocialScrollProps) {
  const [activeIndex, setActiveIndex] = useState(2)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const item = formulas[formulaKey]
  const stickImage = stickImageFor(formulaKey)
  
  const handlePrev = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setActiveIndex((prev) => (prev === 0 ? socialCards.length - 1 : prev - 1))
    setTimeout(() => setIsTransitioning(false), 800)
  }, [isTransitioning])
  
  const handleNext = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setActiveIndex((prev) => (prev === socialCards.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsTransitioning(false), 800)
  }, [isTransitioning])

  // Auto-advance every 5 seconds with smooth transition
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000)
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
      className="w-full py-[clamp(64px,8vw,112px)] overflow-hidden"
      style={{ fontFamily: GC, backgroundColor: BLUE }}
    >
      <div className="w-full max-w-[1600px] mx-auto px-[clamp(18px,5vw,64px)]">
        {/* Headline - Centered, Bigger */}
        <h2
          className="text-center mb-16"
          style={{
            fontFamily: GC,
            fontWeight: 950,
            fontSize: "clamp(44px,7vw,84px)",
            lineHeight: 0.92,
            color: "#000",
          }}
        >
          This is what {formulaKey} feels like.
        </h2>
        
        {/* Horizontal card carousel with smooth sliding */}
        <div className="relative">
          <div 
            className="flex items-end justify-center gap-6"
            style={{
              transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {getVisibleCards().map((card) => {
              const isFeatured = card.position === 0
              const isAdjacent = Math.abs(card.position) === 1
              
              return (
                <div
                  key={`${card.id}-${card.position}`}
                  className="relative flex-shrink-0 rounded-2xl overflow-hidden"
                  style={{
                    width: isFeatured ? 320 : isAdjacent ? 260 : 220,
                    height: isFeatured ? 560 : isAdjacent ? 480 : 420,
                    opacity: isFeatured ? 1 : isAdjacent ? 0.9 : 0.75,
                    transform: `scale(${isFeatured ? 1 : isAdjacent ? 0.98 : 0.95}) translateY(${isFeatured ? 0 : isAdjacent ? 20 : 40}px)`,
                    transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    zIndex: isFeatured ? 10 : isAdjacent ? 5 : 1,
                  }}
                >
                  {/* Placeholder content area - darker gray with gradient */}
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: card.bg }}
                  >
                    {/* Animated shimmer effect */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(
                          125deg, 
                          transparent 0%, 
                          rgba(255,255,255,0.05) 25%, 
                          rgba(255,255,255,0.12) 50%, 
                          rgba(255,255,255,0.05) 75%, 
                          transparent 100%
                        )`,
                        backgroundSize: "200% 200%",
                        animation: isFeatured ? "shimmer 3s ease-in-out infinite" : "none",
                      }}
                    />
                    
                    {/* Content type label - bigger, bolder */}
                    <div
                      className="absolute top-6 left-6 px-5 py-2.5 rounded-full"
                      style={{ backgroundColor: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)" }}
                    >
                      <span
                        style={{
                          fontFamily: GC,
                          fontWeight: 800,
                          fontSize: 18,
                          color: "#fff",
                          letterSpacing: "0.01em",
                        }}
                      >
                        {card.label}
                      </span>
                    </div>
                    
                    {/* Video controls on featured card - bigger */}
                    {isFeatured && (
                      <div className="absolute top-6 right-6 flex flex-col gap-3">
                        <button
                          className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
                          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                            <path d="M11 5L6 9H2v6h4l5 4V5z" />
                            <line x1="23" y1="9" x2="17" y2="15" />
                            <line x1="17" y1="9" x2="23" y2="15" />
                          </svg>
                        </button>
                        <button
                          className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
                          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                          </svg>
                        </button>
                      </div>
                    )}
                    
                    {/* Play icon overlay for non-featured */}
                    {!isFeatured && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                        >
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Product footer card - BIGGER, more prominent */}
                  <div 
                    className="absolute bottom-6 left-5 right-5 bg-white rounded-2xl p-5 flex items-center gap-4 shadow-2xl"
                    style={{
                      transition: "transform 0.3s ease",
                    }}
                  >
                    {/* Product thumbnail - bigger */}
                    <div
                      className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: "#e5e5e5" }}
                    >
                      <img 
                        src={stickImage.src}
                        alt={stickImage.alt}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    
                    {/* Product info - bigger text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="truncate pr-1"
                          style={{ fontFamily: GC, fontWeight: 800, fontSize: 20, color: "#000" }}
                        >
                          {item.short}
                        </span>
                        <button className="p-1 flex-shrink-0 hover:bg-gray-100 rounded transition-colors">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3">
                            <polyline points="18 15 12 9 6 15" />
                          </svg>
                        </button>
                      </div>
                      <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 20, color: "#000" }}>
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    
                    {/* Add to cart button - AVRO blue, BIGGER */}
                    <button
                      className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-110 active:scale-95"
                      style={{ backgroundColor: BLUE, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Navigation arrows - solid black, bigger */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button 
              onClick={handlePrev}
              disabled={isTransitioning}
              className="w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 disabled:opacity-50"
              style={{ backgroundColor: "#000", boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            
            {/* Progress dots */}
            <div className="flex items-center gap-3 px-4">
              {socialCards.map((card, i) => (
                <button
                  key={card.id}
                  onClick={() => {
                    if (!isTransitioning) {
                      setIsTransitioning(true)
                      setActiveIndex(i)
                      setTimeout(() => setIsTransitioning(false), 800)
                    }
                  }}
                  className="transition-all"
                  style={{
                    width: i === activeIndex ? 32 : 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: i === activeIndex ? "#000" : "rgba(0,0,0,0.3)",
                    transition: "all 0.4s ease",
                  }}
                />
              ))}
            </div>
            
            <button 
              onClick={handleNext}
              disabled={isTransitioning}
              className="w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 disabled:opacity-50"
              style={{ backgroundColor: "#000", boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* CSS animation for shimmer effect */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  )
}
