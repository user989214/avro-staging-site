"use client"

import { useState } from "react"
import { Icon } from "@/components/icons"
import { formulas, type FormulaKey } from "@/lib/data"

interface SocialScrollProps {
  formulaKey: FormulaKey
}

export function PdpSocialScroll({ formulaKey }: SocialScrollProps) {
  const item = formulas[formulaKey]
  const [selectedProduct, setSelectedProduct] = useState(0)
  
  // Product options shown at bottom
  const productOptions = [
    { name: `${item.short} Single`, price: "$18.71", originalPrice: null },
    { name: `${item.short} 3-Pack`, price: "$49.99", originalPrice: "$56.13" },
    { name: `${item.short} 6-Pack`, price: "$89.99", originalPrice: "$112.26" },
  ]

  return (
    <section className="w-full bg-soft py-[clamp(48px,7vw,96px)] overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)]">
        {/* Section heading */}
        <h2 className="font-serif font-black text-[clamp(36px,5vw,64px)] leading-[1.0] text-ink mb-10">
          This is what {formulaKey} feels like.
        </h2>
        
        {/* Main content area - Social cards grid with vertical scroll animation */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          
          {/* Left side - Animated social cards */}
          <div className="relative h-[500px] overflow-hidden">
            {/* Two columns of scrolling cards */}
            <div className="absolute inset-0 flex gap-4 justify-center">
              {/* Column 1 - scrolls up */}
              <div className="w-[180px] flex flex-col gap-4 animate-scroll-up">
                {[...Array(10)].map((_, i) => (
                  <SocialCard key={`col1-${i}`} index={i} formulaKey={formulaKey} />
                ))}
                {/* Duplicate for seamless loop */}
                {[...Array(10)].map((_, i) => (
                  <SocialCard key={`col1-dup-${i}`} index={i} formulaKey={formulaKey} />
                ))}
              </div>
              
              {/* Column 2 - scrolls down */}
              <div className="w-[180px] flex flex-col gap-4 animate-scroll-down">
                {[...Array(10)].map((_, i) => (
                  <SocialCard key={`col2-${i}`} index={i + 5} formulaKey={formulaKey} />
                ))}
                {/* Duplicate for seamless loop */}
                {[...Array(10)].map((_, i) => (
                  <SocialCard key={`col2-dup-${i}`} index={i + 5} formulaKey={formulaKey} />
                ))}
              </div>
              
              {/* Column 3 - scrolls up (hidden on smaller screens) */}
              <div className="w-[180px] hidden md:flex flex-col gap-4 animate-scroll-up-slow">
                {[...Array(10)].map((_, i) => (
                  <SocialCard key={`col3-${i}`} index={i + 2} formulaKey={formulaKey} />
                ))}
                {/* Duplicate for seamless loop */}
                {[...Array(10)].map((_, i) => (
                  <SocialCard key={`col3-dup-${i}`} index={i + 2} formulaKey={formulaKey} />
                ))}
              </div>
            </div>
            
            {/* Gradient overlays for fade effect */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-soft to-transparent pointer-events-none z-10" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-soft to-transparent pointer-events-none z-10" />
          </div>
          
          {/* Right side - Product selection with Add to Cart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-line">
            {/* Product image */}
            <div className="relative aspect-square mb-6 bg-soft rounded-xl overflow-hidden flex items-center justify-center">
              <img 
                src={item.packshot}
                alt={`AVRO ${item.short}`}
                className="w-3/4 h-3/4 object-contain"
              />
            </div>
            
            {/* Product options */}
            <div className="space-y-3 mb-6">
              {productOptions.map((product, i) => (
                <button
                  key={product.name}
                  onClick={() => setSelectedProduct(i)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                    selectedProduct === i 
                      ? "border-avro-blue bg-avro-blue/5" 
                      : "border-line hover:border-ink/20"
                  }`}
                >
                  <span className="font-bold text-ink">{product.name}</span>
                  <div className="flex items-center gap-2">
                    {product.originalPrice && (
                      <span className="text-ink/40 line-through text-sm">{product.originalPrice}</span>
                    )}
                    <span className="font-black text-ink">{product.price}</span>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Add to Cart button */}
            <button className="w-full btn-primary py-4 text-lg font-black flex items-center justify-center gap-2">
              <Icon name="cart" className="w-5 h-5" />
              Add to Cart
            </button>
            
            {/* Trust badges */}
            <div className="flex justify-center gap-4 mt-4 text-xs text-ink/50">
              <span className="flex items-center gap-1">
                <Icon name="shield" className="w-4 h-4" />
                HSA/FSA
              </span>
              <span className="flex items-center gap-1">
                <Icon name="flask" className="w-4 h-4" />
                3rd Party Tested
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for scroll animations */}
      <style jsx>{`
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scroll-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-scroll-up {
          animation: scroll-up 40s linear infinite;
        }
        .animate-scroll-down {
          animation: scroll-down 40s linear infinite;
        }
        .animate-scroll-up-slow {
          animation: scroll-up 50s linear infinite;
        }
      `}</style>
    </section>
  )
}

// Individual social card component - placeholder style
function SocialCard({ index, formulaKey }: { index: number; formulaKey: FormulaKey }) {
  const item = formulas[formulaKey]
  
  // Different card styles for variety
  const cardStyles = [
    "bg-white",
    "bg-avro-blue/10",
    "bg-white",
    "bg-ink text-white",
    "bg-white",
    "bg-avro-blue/20",
    "bg-white",
    "bg-soft",
    "bg-white",
    "bg-avro-blue/5",
  ]
  
  const style = cardStyles[index % cardStyles.length]
  const isDark = style.includes("bg-ink")
  
  return (
    <div className={`w-full aspect-[3/4] rounded-2xl p-4 flex flex-col justify-between ${style} border border-line/50 shadow-sm`}>
      {/* Top - User info placeholder */}
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-full ${isDark ? "bg-white/20" : "bg-ink/10"}`} />
        <div className="flex-1">
          <div className={`h-2 w-16 rounded ${isDark ? "bg-white/30" : "bg-ink/20"}`} />
          <div className={`h-1.5 w-10 rounded mt-1 ${isDark ? "bg-white/20" : "bg-ink/10"}`} />
        </div>
      </div>
      
      {/* Middle - Content placeholder with subtle animation */}
      <div className="flex-1 flex items-center justify-center my-3">
        <div className={`w-16 h-16 rounded-xl ${isDark ? "bg-white/10" : "bg-avro-blue/20"} flex items-center justify-center`}>
          <Icon 
            name={formulaKey === "calm" ? "brain" : formulaKey === "focus" ? "target" : "zap"} 
            className={`w-8 h-8 ${isDark ? "text-white/60" : "text-ink/40"}`} 
          />
        </div>
      </div>
      
      {/* Bottom - Engagement placeholder */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1 ${isDark ? "text-white/50" : "text-ink/40"}`}>
            <Icon name="heart" className="w-4 h-4" />
            <span className="text-xs font-medium">{(index + 1) * 127}</span>
          </div>
        </div>
        <div className={`h-1.5 w-8 rounded ${isDark ? "bg-white/20" : "bg-ink/10"}`} />
      </div>
    </div>
  )
}
