"use client"

import { useState } from "react"
import Link from "next/link"
import { formulas, type FormulaKey } from "@/lib/data"
import { ProductCard } from "@/components/product-visual"
import { AvroIcon, type AvroIconName } from "@/components/avro-icons"
import { ReviewTODO } from "@/components/compliance"

const GC = '"DM Sans", system-ui, sans-serif'

const dietaryClaims: { icon: AvroIconName; label: string }[] = [
  { icon: "free-dairy", label: "Dairy Free" },
  { icon: "free-gmo", label: "Non-GMO" },
  { icon: "free-vegan", label: "Vegan" },
  { icon: "gluten-free", label: "Gluten Free" },
  { icon: "free-sugar", label: "No Added Sugar" },
]

interface PdpTabsWithRecommendationsProps {
  currentKey: FormulaKey
}

const tabs = ["Description", "Ingredients", "When to take", "How to use"] as const
type TabType = typeof tabs[number]

export function PdpTabsWithRecommendations({ currentKey }: PdpTabsWithRecommendationsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("Description")

  const otherKeys = (Object.keys(formulas) as FormulaKey[]).filter((k) => k !== currentKey).slice(0, 2)

  const descriptionBullets: Record<FormulaKey, string[]> = {
    calm: [
      "Formulated with naturally fermented PharmaGABA®",
      "Promotes calm without drowsiness or sedation*",
      "No added sugar, artificial sweeteners, or sugar alcohols",
      "Vegan, gluten-free, non-GMO",
      "Third-party tested for purity and potency",
    ],
    focus: [
      "Formulated with Cognigrape® and PharmaGABA®",
      "Supports focus and mental clarity*",
      "No added sugar, artificial sweeteners, or sugar alcohols",
      "Vegan, gluten-free, non-GMO",
      "Third-party tested for purity and potency",
    ],
    energy: [
      "Formulated with 120mg natural caffeine and PharmaGABA®",
      "Clean energy without the jitters or crash*",
      "No added sugar, artificial sweeteners, or sugar alcohols",
      "Vegan, gluten-free, non-GMO",
      "Third-party tested for purity and potency",
    ],
  }

  const ingredientsList: Record<FormulaKey, { name: string; amount: string }[]> = {
    calm: [
      { name: "PharmaGABA®", amount: "200 mg" },
      { name: "Magnesium (as bisglycinate)", amount: "100 mg" },
      { name: "L-Theanine", amount: "850 mg" },
      { name: "Sodium (as bicarbonate)", amount: "80 mg" },
      { name: "Potassium (as bicarbonate)", amount: "100 mg" },
    ],
    focus: [
      { name: "Cognigrape®", amount: "250 mg" },
      { name: "PharmaGABA®", amount: "200 mg" },
      { name: "L-Theanine", amount: "200 mg" },
      { name: "Sodium (as bicarbonate)", amount: "80 mg" },
      { name: "Potassium (as bicarbonate)", amount: "100 mg" },
    ],
    energy: [
      { name: "Natural caffeine", amount: "120 mg" },
      { name: "PharmaGABA®", amount: "200 mg" },
      { name: "L-Theanine", amount: "200 mg" },
      { name: "Sodium (as bicarbonate)", amount: "80 mg" },
      { name: "Potassium (as bicarbonate)", amount: "100 mg" },
    ],
  }

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-8 lg:gap-12"
      style={{ fontFamily: GC }}
    >
      {/* Left - Tabs */}
      <div>
        <div className="flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-2 mb-4 lg:mb-6" style={{ borderBottom: "2px solid rgba(0,0,0,0.12)" }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="pb-2.5 transition-colors relative"
              style={{
                fontFamily: GC,
                fontWeight: activeTab === tab ? 800 : 500,
                fontSize: "clamp(13px,1.3vw,20px)",
                color: activeTab === tab ? "#000" : "rgba(0,0,0,0.45)",
              }}
            >
              {tab}
              {activeTab === tab && (
                <span
                  className="absolute left-0 right-0"
                  style={{ bottom: -2, height: 3, backgroundColor: "var(--charcoal)" }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="min-h-[200px] lg:min-h-[260px]">
          {activeTab === "Description" && (
            <div>
              <h3
                style={{
                  fontFamily: GC,
                  fontWeight: 700,
                  fontSize: "clamp(20px,2.5vw,36px)",
                  lineHeight: 1.0,
                  color: "var(--ink)",
                  marginBottom: "clamp(12px,1.5vw,20px)",
                }}
              >
                Our formula
              </h3>
              <ul className="space-y-2 lg:space-y-3">
                {descriptionBullets[currentKey].map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2"
                    style={{ fontFamily: GC, fontWeight: 500, fontSize: "clamp(12px,1.1vw,16px)", lineHeight: 1.4, color: "rgba(0,0,0,0.7)" }}
                  >
                    <span style={{ color: "var(--ink)", fontWeight: 700, fontSize: "clamp(14px,1.3vw,20px)", lineHeight: 1 }}>+</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Dietary claims — full-width single row beneath HSA/FSA bullet */}
              <div
                className="mt-6 lg:mt-8 pt-5 lg:pt-6 w-full flex items-center justify-between gap-2 sm:gap-4"
                style={{ borderTop: "1px solid rgba(0,0,0,0.12)" }}
              >
                {dietaryClaims.map((claim) => (
                  <div
                    key={claim.label}
                    className="flex flex-col items-center text-center gap-2 flex-1 min-w-0"
                  >
                    <AvroIcon
                      name={claim.icon}
                      size={48}
                      className="md:w-16 md:h-16 lg:w-20 lg:h-20 opacity-85"
                    />
                    <span
                      style={{
                        fontFamily: GC,
                        fontWeight: 700,
                        fontSize: "clamp(10px,0.95vw,13px)",
                        lineHeight: 1.2,
                        color: "var(--ink)",
                      }}
                    >
                      {claim.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Ingredients" && (
            <div>
              <h3
                style={{
                  fontFamily: GC,
                  fontWeight: 700,
                  fontSize: "clamp(22px,3vw,42px)",
                  lineHeight: 1.0,
                  color: "var(--ink)",
                  marginBottom: "clamp(16px,2vw,24px)",
                }}
              >
                Active ingredients
              </h3>
              <div>
                {ingredientsList[currentKey].map((ing, i) => (
                  <div
                    key={ing.name}
                    className="flex items-center justify-between py-3"
                    style={{
                      borderBottom: i < ingredientsList[currentKey].length - 1 ? "1px solid rgba(0,0,0,0.1)" : "none",
                    }}
                  >
                    <span style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(13px,1.2vw,17px)", color: "var(--ink)" }}>{ing.name}</span>
                    <span style={{ fontFamily: GC, fontWeight: 500, fontSize: "clamp(13px,1.2vw,17px)", color: "rgba(0,0,0,0.6)" }}>{ing.amount}</span>
                  </div>
                ))}
              </div>
              <p
                className="mt-4"
                style={{ fontFamily: GC, fontWeight: 400, fontSize: "clamp(13px,1.2vw,17px)", color: "rgba(0,0,0,0.5)" }}
              >
                Other ingredients: Citric acid, natural flavors, silica, stevia leaf extract.
              </p>
              <p className="mt-3" style={{ fontFamily: GC, fontSize: "clamp(12px,1.1vw,15px)", lineHeight: 1.5 }}>
                <ReviewTODO>
                  Ingredient names, forms, amounts &amp; &quot;other ingredients&quot; must match the
                  current approved label. Remove any ingredient/line not in the final formula.
                </ReviewTODO>
              </p>
            </div>
          )}

          {activeTab === "When to take" && (
            <div>
              <h3
                style={{
                  fontFamily: GC,
                  fontWeight: 700,
                  fontSize: "clamp(22px,3vw,42px)",
                  lineHeight: 1.0,
                  color: "var(--ink)",
                  marginBottom: "clamp(16px,2vw,24px)",
                }}
              >
                Best times to use
              </h3>
              <div className="space-y-4 lg:space-y-6">
                {[
                  { title: "Morning routine", body: "Start your day with clarity and composure.*" },
                  { title: "Before important moments", body: "Meetings, presentations, or any high-stakes situation." },
                  { title: "Afternoon reset", body: "Combat the midday slump without caffeine.*" },
                ].map((item) => (
                  <div key={item.title}>
                    <span style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(15px,1.5vw,21px)", color: "var(--ink)", display: "block", marginBottom: 4 }}>
                      {item.title}
                    </span>
                    <p style={{ fontFamily: GC, fontWeight: 400, fontSize: "clamp(14px,1.3vw,19px)", lineHeight: 1.4, color: "rgba(0,0,0,0.6)" }}>
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "How to use" && (
            <div>
              <h3
                style={{
                  fontFamily: GC,
                  fontWeight: 700,
                  fontSize: "clamp(22px,3vw,42px)",
                  lineHeight: 1.0,
                  color: "var(--ink)",
                  marginBottom: "clamp(16px,2vw,24px)",
                }}
              >
                Simple 3-step ritual
              </h3>
              <div className="space-y-4 lg:space-y-6">
                {[
                  { n: 1, title: "Pour", body: "Empty one stick into 8-12 oz of cold water." },
                  { n: 2, title: "Mix", body: "Stir or shake until fully dissolved." },
                  { n: 3, title: "Drink", body: "Enjoy 20-30 minutes before your moment." },
                ].map((step) => (
                  <div key={step.n} className="flex items-start gap-4 lg:gap-6">
                    <span
                      style={{
                        fontFamily: GC,
                        fontWeight: 700,
                        fontSize: "clamp(32px,4vw,56px)",
                        lineHeight: 1,
                        color: "var(--ink)",
                        flexShrink: 0,
                        width: "clamp(28px,3.2vw,48px)",
                        textAlign: "right",
                      }}
                    >
                      {step.n}
                    </span>
                    <div style={{ paddingTop: "clamp(3px,0.3vw,6px)" }}>
                      <span style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(15px,1.5vw,21px)", color: "var(--ink)", display: "block", marginBottom: 4 }}>
                        {step.title}
                      </span>
                      <p style={{ fontFamily: GC, fontWeight: 400, fontSize: "clamp(14px,1.3vw,19px)", lineHeight: 1.4, color: "rgba(0,0,0,0.6)" }}>
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right - You might also like — width aligns with buy box / Add-to-cart above */}
      <div>
        <h3
          className="mb-4 lg:mb-6"
          style={{
            fontFamily: GC,
            fontWeight: 700,
            fontSize: "clamp(16px,1.8vw,24px)",
            color: "var(--ink)",
          }}
        >
          You might also like
        </h3>

        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          {otherKeys.map((formulaKey) => {
            const formula = formulas[formulaKey]
            const oneTimePrice = formula.bundlePrice.toFixed(2)

            return (
              <div
                key={formulaKey}
                className="flex flex-col"
                style={{
                  backgroundColor: "var(--base-light, #f5f1e8)",
                  borderRadius: 14,
                  padding: "clamp(8px,1vw,10px)",
                  overflow: "hidden",
                }}
              >
                {/* Square image tile — bone fill, no stroke, image fills edge-to-edge */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    backgroundColor: "var(--bone)",
                    borderRadius: 10,
                    aspectRatio: "1 / 1",
                  }}
                >
                  <ProductCard formulaKey={formulaKey} className="absolute inset-0 w-full h-full object-cover" />
                </div>

                <div className="pt-2 px-0.5 flex flex-col gap-1.5">
                  <div className="flex items-baseline justify-between gap-1 flex-wrap">
                    <span
                      style={{
                        fontFamily: GC,
                        fontWeight: 800,
                        fontSize: "clamp(12px,1.1vw,15px)",
                        lineHeight: 1.1,
                        color: "var(--ink)",
                      }}
                    >
                      {formula.name}
                    </span>
                    <span
                      style={{
                        fontFamily: GC,
                        fontWeight: 700,
                        fontSize: "clamp(11px,1vw,13px)",
                        color: "rgba(0,0,0,0.6)",
                      }}
                    >
                      ${oneTimePrice}
                    </span>
                  </div>

                  <Link
                    href={`/${formulaKey}`}
                    className="ymal-btn avro-size-sm flex items-center justify-center w-full transition-colors"
                    style={{
                      fontFamily: GC,
                      fontWeight: 800,
                      borderRadius: 999,
                      backgroundColor: "var(--charcoal)",
                      color: "var(--bone)",
                      border: "2px solid var(--charcoal)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    Shop {formula.short}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
        <style>{`
          .ymal-btn:hover {
            background-color: transparent !important;
            color: var(--charcoal) !important;
          }
        `}</style>
      </div>
    </div>
  )
}
