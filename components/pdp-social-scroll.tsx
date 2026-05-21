"use client"

import { useState } from "react"
import { formulas, type FormulaKey } from "@/lib/data"
import { stickImageFor } from "@/components/product-visual"

interface PdpSocialScrollProps {
  formulaKey: FormulaKey
}

// Mock social content cards - in production these would be real videos/images
const socialCards = [
  { id: 1, type: "lifestyle", label: "Morning routine" },
  { id: 2, type: "product", label: "Product showcase" },
  { id: 3, type: "featured", label: "Customer story" },
  { id: 4, type: "lifestyle", label: "Work focus" },
  { id: 5, type: "community", label: "Team moment" },
]

export function PdpSocialScroll({ formulaKey }: PdpSocialScrollProps) {
  const [activeIndex, setActiveIndex] = useState(2) // Center card is featured
  const item = formulas[formulaKey]
  const stickImage = stickImageFor(formulaKey)
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? socialCards.length - 1 : prev - 1))
  }
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === socialCards.length - 1 ? 0 : prev + 1))
  }

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
    <section className="w-full bg-avro-blue py-[clamp(48px,6vw,80px)] overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)]">
        {/* Headline */}
        <h2 className="font-serif font-black text-[clamp(36px,5vw,64px)] leading-[1.0] text-ink mb-10">
          This is what {formulaKey} feels like.
        </h2>
        
        {/* Horizontal card carousel */}
        <div className="relative">
          <div className="flex items-end justify-center gap-4">
            {getVisibleCards().map((card) => {
              const isFeatured = card.position === 0
              
              return (
                <div
                  key={`${card.id}-${card.position}`}
                  className={`relative flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-300 ${
                    isFeatured 
                      ? "w-[280px] h-[480px] z-10" 
                      : "w-[220px] h-[400px] opacity-90"
                  }`}
                >
                  {/* Placeholder content area - animated gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-ink/20 via-ink/10 to-ink/30">
                    {/* Animated shimmer effect */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 2s infinite linear",
                      }}
                    />
                    
                    {/* Content type indicator */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                      <span className="text-xs font-bold text-white">{card.label}</span>
                    </div>
                    
                    {/* Video controls on featured card */}
                    {isFeatured && (
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <button className="w-8 h-8 rounded-full bg-ink/50 flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                            <path d="M11 5L6 9H2v6h4l5 4V5z" />
                            <line x1="23" y1="9" x2="17" y2="15" />
                            <line x1="17" y1="9" x2="23" y2="15" />
                          </svg>
                        </button>
                        <button className="w-8 h-8 rounded-full bg-ink/50 flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Product footer card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl p-3 flex items-center gap-3 shadow-lg">
                    {/* Product thumbnail */}
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-soft flex items-center justify-center">
                      <img 
                        src={stickImage.src}
                        alt={stickImage.alt}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    
                    {/* Product info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-ink truncate pr-1">
                          {item.short}
                        </span>
                        <button className="p-1 flex-shrink-0">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-ink">
                            <polyline points="18 15 12 9 6 15" />
                          </svg>
                        </button>
                      </div>
                      <span className="text-sm font-bold text-ink">${item.price.toFixed(2)}</span>
                    </div>
                    
                    {/* Add to cart button */}
                    <button className="w-10 h-10 rounded-full bg-[#3B5BDB] hover:bg-[#2F4BC0] flex items-center justify-center flex-shrink-0 transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Navigation arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border-2 border-ink/30 flex items-center justify-center hover:border-ink/60 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full border-2 border-ink/30 flex items-center justify-center hover:border-ink/60 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  )
}
