"use client"

import { useState } from "react"
import Link from "next/link"
import { formulas, type FormulaKey } from "@/lib/data"
import { stickImageFor } from "@/components/product-visual"
import { Icon } from "@/components/icons"

interface PdpTabsWithRecommendationsProps {
  currentKey: FormulaKey
}

const tabs = ["Description", "Ingredients", "When to Take", "How to Use"] as const
type TabType = typeof tabs[number]

export function PdpTabsWithRecommendations({ currentKey }: PdpTabsWithRecommendationsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("Description")
  const item = formulas[currentKey]
  
  // Get other formulas for recommendations
  const otherKeys = (Object.keys(formulas) as FormulaKey[]).filter(k => k !== currentKey).slice(0, 2)

  const descriptionBullets: Record<FormulaKey, string[]> = {
    calm: [
      "Formulated with naturally fermented PharmaGABA®",
      "Promotes calm without drowsiness or sedation",
      "No added sugar, artificial sweeteners, or sugar alcohols",
      "Vegan | Gluten-Free | Non-GMO",
      "Made for adults seeking everyday calm support",
      "Third-party tested for purity and potency",
      "HSA/FSA eligible",
    ],
    focus: [
      "Formulated with Cognigrape® and PharmaGABA®",
      "Supports focus and mental clarity",
      "No added sugar, artificial sweeteners, or sugar alcohols",
      "Vegan | Gluten-Free | Non-GMO",
      "Made for adults seeking cognitive support",
      "Third-party tested for purity and potency",
      "HSA/FSA eligible",
    ],
    energy: [
      "Formulated with 120mg natural caffeine + PharmaGABA®",
      "Clean energy without the jitters or crash",
      "No added sugar, artificial sweeteners, or sugar alcohols",
      "Vegan | Gluten-Free | Non-GMO",
      "Made for adults seeking steady energy support",
      "Third-party tested for purity and potency",
      "HSA/FSA eligible",
    ],
  }

  const ingredientsList: Record<FormulaKey, { name: string; amount: string }[]> = {
    calm: [
      { name: "PharmaGABA®", amount: "100mg" },
      { name: "Magnesium (as Bisglycinate)", amount: "150mg" },
      { name: "L-Theanine", amount: "200mg" },
      { name: "Vitamin B6", amount: "2mg" },
    ],
    focus: [
      { name: "Cognigrape®", amount: "150mg" },
      { name: "PharmaGABA®", amount: "100mg" },
      { name: "L-Theanine", amount: "200mg" },
      { name: "Vitamin B12", amount: "50mcg" },
    ],
    energy: [
      { name: "Natural Caffeine", amount: "120mg" },
      { name: "PharmaGABA®", amount: "100mg" },
      { name: "L-Theanine", amount: "200mg" },
      { name: "Vitamin B12", amount: "100mcg" },
    ],
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16">
      {/* Left side - Tabs */}
      <div>
        {/* Tab navigation */}
        <div className="flex gap-8 border-b border-ink/10 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-bold tracking-wide uppercase transition-colors relative ${
                activeTab === tab 
                  ? "text-ink" 
                  : "text-ink/40 hover:text-ink/60"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-olive" />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="min-h-[300px]">
          {activeTab === "Description" && (
            <div>
              <h3 className="font-serif text-2xl font-bold text-ink/70 mb-4">Our Formula</h3>
              <ul className="space-y-2">
                {descriptionBullets[currentKey].map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-ink/60">
                    <span className="text-olive mt-0.5">+</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              
              {/* Certification badges */}
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 rounded-full border-2 border-ink/20 flex items-center justify-center">
                    <Icon name="leaf" className="w-6 h-6 text-ink/50" />
                  </div>
                  <span className="text-[10px] font-bold text-ink/50 uppercase">Vegan</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 rounded-full border-2 border-ink/20 flex items-center justify-center">
                    <Icon name="wheat" className="w-6 h-6 text-ink/50" />
                  </div>
                  <span className="text-[10px] font-bold text-ink/50 uppercase">Gluten Free</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 rounded-full border-2 border-ink/20 flex items-center justify-center">
                    <Icon name="flask" className="w-6 h-6 text-ink/50" />
                  </div>
                  <span className="text-[10px] font-bold text-ink/50 uppercase">Tested</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 rounded-full border-2 border-ink/20 flex items-center justify-center">
                    <Icon name="badge-check" className="w-6 h-6 text-ink/50" />
                  </div>
                  <span className="text-[10px] font-bold text-ink/50 uppercase">HSA/FSA</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Ingredients" && (
            <div>
              <h3 className="font-serif text-2xl font-bold text-ink/70 mb-4">Active Ingredients</h3>
              <div className="space-y-3">
                {ingredientsList[currentKey].map((ing) => (
                  <div key={ing.name} className="flex items-center justify-between py-3 border-b border-ink/10">
                    <span className="font-medium text-ink">{ing.name}</span>
                    <span className="text-ink/60">{ing.amount}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-ink/50">
                Other ingredients: Citric acid, natural flavors, silica, stevia leaf extract.
              </p>
            </div>
          )}

          {activeTab === "When to Take" && (
            <div>
              <h3 className="font-serif text-2xl font-bold text-ink/70 mb-4">Best Times to Use</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-avro-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="sun" className="w-4 h-4 text-ink" />
                  </div>
                  <div>
                    <span className="font-bold text-ink">Morning Routine</span>
                    <p className="text-ink/60 text-sm">Start your day with clarity and composure.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-avro-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="target" className="w-4 h-4 text-ink" />
                  </div>
                  <div>
                    <span className="font-bold text-ink">Before Important Moments</span>
                    <p className="text-ink/60 text-sm">Meetings, presentations, or any high-stakes situation.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-avro-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="clock" className="w-4 h-4 text-ink" />
                  </div>
                  <div>
                    <span className="font-bold text-ink">Afternoon Reset</span>
                    <p className="text-ink/60 text-sm">Combat the midday slump without caffeine.</p>
                  </div>
                </li>
              </ul>
            </div>
          )}

          {activeTab === "How to Use" && (
            <div>
              <h3 className="font-serif text-2xl font-bold text-ink/70 mb-4">Simple 3-Step Ritual</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="font-serif font-black text-4xl text-avro-blue">1</span>
                  <div>
                    <span className="font-bold text-ink">Pour</span>
                    <p className="text-ink/60">Empty one stick into 8-12 oz of cold water.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="font-serif font-black text-4xl text-avro-blue">2</span>
                  <div>
                    <span className="font-bold text-ink">Mix</span>
                    <p className="text-ink/60">Stir or shake until fully dissolved.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="font-serif font-black text-4xl text-avro-blue">3</span>
                  <div>
                    <span className="font-bold text-ink">Drink</span>
                    <p className="text-ink/60">Enjoy 20-30 minutes before your moment.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right side - You Might Also Like */}
      <div>
        <h3 className="text-sm font-bold tracking-wide uppercase text-ink/50 mb-6">
          You Might Also Like...
        </h3>
        
        <div className="space-y-6">
          {otherKeys.map((formulaKey) => {
            const formula = formulas[formulaKey]
            const stickImg = stickImageFor(formulaKey)
            const subscribePrice = (formula.price * 0.85).toFixed(2)
            
            return (
              <div key={formulaKey} className="bg-soft rounded-xl p-4">
                {/* Product image */}
                <div className="aspect-[4/3] bg-white rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src={stickImg.src}
                    alt={stickImg.alt}
                    className="w-32 h-32 object-contain"
                  />
                </div>
                
                {/* Product info */}
                <div className="text-center mb-4">
                  <span className="block text-[10px] font-bold tracking-wider uppercase text-ink/50 mb-1">
                    {formula.category}
                  </span>
                  <span className="block font-bold text-ink">{formula.flavor}</span>
                  <span className="block text-ink/60">${formula.price.toFixed(2)}</span>
                </div>
                
                {/* Buttons */}
                <div className="space-y-2">
                  <Link
                    href={`/${formulaKey}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-avro-blue text-ink font-bold text-sm rounded-lg hover:bg-avro-blue/90 transition-colors"
                  >
                    Subscribe - ${subscribePrice}
                  </Link>
                  <Link
                    href={`/${formulaKey}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 border-2 border-ink text-ink font-bold text-sm rounded-lg hover:bg-ink hover:text-white transition-colors"
                  >
                    Add to Cart - ${formula.price.toFixed(2)}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
