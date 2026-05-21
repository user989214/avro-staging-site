"use client"

import { useState } from "react"
import Link from "next/link"
import { formulas, type FormulaKey } from "@/lib/data"
import { stickImageFor } from "@/components/product-visual"

const GC = '"Gotham Condensed", sans-serif'

interface PdpTabsWithRecommendationsProps {
  currentKey: FormulaKey
}

const tabs = ["Description", "Ingredients", "When to Take", "How to Use"] as const
type TabType = typeof tabs[number]

export function PdpTabsWithRecommendations({ currentKey }: PdpTabsWithRecommendationsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("Description")

  // Get other formulas for recommendations
  const otherKeys = (Object.keys(formulas) as FormulaKey[]).filter((k) => k !== currentKey).slice(0, 2)

  const descriptionBullets: Record<FormulaKey, string[]> = {
    calm: [
      "Formulated with naturally fermented PharmaGABA®",
      "Promotes calm without drowsiness or sedation",
      "No added sugar, artificial sweeteners, or sugar alcohols",
      "Vegan, Gluten-Free, Non-GMO Project Verified",
      "Third-party tested for purity and potency",
      "HSA/FSA eligible",
    ],
    focus: [
      "Formulated with Cognigrape® and PharmaGABA®",
      "Supports focus and mental clarity",
      "No added sugar, artificial sweeteners, or sugar alcohols",
      "Vegan, Gluten-Free, Non-GMO Project Verified",
      "Third-party tested for purity and potency",
      "HSA/FSA eligible",
    ],
    energy: [
      "Formulated with 120mg natural caffeine and PharmaGABA®",
      "Clean energy without the jitters or crash",
      "No added sugar, artificial sweeteners, or sugar alcohols",
      "Vegan, Gluten-Free, Non-GMO Project Verified",
      "Third-party tested for purity and potency",
      "HSA/FSA eligible",
    ],
  }

  const ingredientsList: Record<FormulaKey, { name: string; amount: string }[]> = {
    calm: [
      { name: "PharmaGABA®", amount: "200 mg" },
      { name: "Magnesium (as Bisglycinate)", amount: "100 mg" },
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
      { name: "Natural Caffeine", amount: "120 mg" },
      { name: "PharmaGABA®", amount: "200 mg" },
      { name: "L-Theanine", amount: "200 mg" },
      { name: "Sodium (as bicarbonate)", amount: "80 mg" },
      { name: "Potassium (as bicarbonate)", amount: "100 mg" },
    ],
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16" style={{ fontFamily: GC }}>
      {/* Left side - Tabs */}
      <div>
        {/* Tab navigation */}
        <div className="flex flex-wrap gap-x-8 gap-y-2 mb-6" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="pb-3 transition-colors relative"
              style={{
                fontFamily: GC,
                fontWeight: activeTab === tab ? 800 : 500,
                fontSize: 14,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: activeTab === tab ? "#000" : "rgba(0,0,0,0.4)",
              }}
            >
              {tab}
              {activeTab === tab && (
                <span
                  className="absolute left-0 right-0"
                  style={{ bottom: -1, height: 2, backgroundColor: "#000" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="min-h-[280px]">
          {activeTab === "Description" && (
            <div>
              <h3
                style={{
                  fontFamily: GC,
                  fontWeight: 800,
                  fontSize: "clamp(22px,2vw,28px)",
                  color: "#000",
                  marginBottom: 16,
                }}
              >
                Our Formula
              </h3>
              <ul className="space-y-2">
                {descriptionBullets[currentKey].map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2"
                    style={{ fontFamily: GC, fontWeight: 400, fontSize: 16, color: "rgba(0,0,0,0.7)" }}
                  >
                    <span style={{ color: "#000", fontWeight: 800 }}>+</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "Ingredients" && (
            <div>
              <h3
                style={{
                  fontFamily: GC,
                  fontWeight: 800,
                  fontSize: "clamp(22px,2vw,28px)",
                  color: "#000",
                  marginBottom: 16,
                }}
              >
                Active Ingredients
              </h3>
              <div>
                {ingredientsList[currentKey].map((ing, i) => (
                  <div
                    key={ing.name}
                    className="flex items-center justify-between py-3"
                    style={{
                      borderBottom: i < ingredientsList[currentKey].length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
                    }}
                  >
                    <span style={{ fontFamily: GC, fontWeight: 700, color: "#000" }}>{ing.name}</span>
                    <span style={{ fontFamily: GC, fontWeight: 500, color: "rgba(0,0,0,0.6)" }}>{ing.amount}</span>
                  </div>
                ))}
              </div>
              <p
                className="mt-6"
                style={{ fontFamily: GC, fontWeight: 400, fontSize: 13, color: "rgba(0,0,0,0.5)" }}
              >
                Other ingredients: Citric acid, natural flavors, silica, stevia leaf extract.
              </p>
            </div>
          )}

          {activeTab === "When to Take" && (
            <div>
              <h3
                style={{
                  fontFamily: GC,
                  fontWeight: 800,
                  fontSize: "clamp(22px,2vw,28px)",
                  color: "#000",
                  marginBottom: 16,
                }}
              >
                Best Times to Use
              </h3>
              <ul className="space-y-3">
                <li>
                  <span style={{ fontFamily: GC, fontWeight: 800, color: "#000", display: "block" }}>
                    Morning Routine
                  </span>
                  <p style={{ fontFamily: GC, fontWeight: 400, color: "rgba(0,0,0,0.6)", fontSize: 15 }}>
                    Start your day with clarity and composure.
                  </p>
                </li>
                <li>
                  <span style={{ fontFamily: GC, fontWeight: 800, color: "#000", display: "block" }}>
                    Before Important Moments
                  </span>
                  <p style={{ fontFamily: GC, fontWeight: 400, color: "rgba(0,0,0,0.6)", fontSize: 15 }}>
                    Meetings, presentations, or any high-stakes situation.
                  </p>
                </li>
                <li>
                  <span style={{ fontFamily: GC, fontWeight: 800, color: "#000", display: "block" }}>
                    Afternoon Reset
                  </span>
                  <p style={{ fontFamily: GC, fontWeight: 400, color: "rgba(0,0,0,0.6)", fontSize: 15 }}>
                    Combat the midday slump without caffeine.
                  </p>
                </li>
              </ul>
            </div>
          )}

          {activeTab === "How to Use" && (
            <div>
              <h3
                style={{
                  fontFamily: GC,
                  fontWeight: 800,
                  fontSize: "clamp(22px,2vw,28px)",
                  color: "#000",
                  marginBottom: 16,
                }}
              >
                Simple 3-Step Ritual
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <span style={{ fontFamily: GC, fontWeight: 950, fontSize: 44, lineHeight: 1, color: "#87CEEB" }}>
                    1
                  </span>
                  <div>
                    <span style={{ fontFamily: GC, fontWeight: 800, color: "#000", display: "block" }}>Pour</span>
                    <p style={{ fontFamily: GC, fontWeight: 400, color: "rgba(0,0,0,0.6)", fontSize: 15 }}>
                      Empty one stick into 8-12 oz of cold water.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span style={{ fontFamily: GC, fontWeight: 950, fontSize: 44, lineHeight: 1, color: "#87CEEB" }}>
                    2
                  </span>
                  <div>
                    <span style={{ fontFamily: GC, fontWeight: 800, color: "#000", display: "block" }}>Mix</span>
                    <p style={{ fontFamily: GC, fontWeight: 400, color: "rgba(0,0,0,0.6)", fontSize: 15 }}>
                      Stir or shake until fully dissolved.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span style={{ fontFamily: GC, fontWeight: 950, fontSize: 44, lineHeight: 1, color: "#87CEEB" }}>
                    3
                  </span>
                  <div>
                    <span style={{ fontFamily: GC, fontWeight: 800, color: "#000", display: "block" }}>Drink</span>
                    <p style={{ fontFamily: GC, fontWeight: 400, color: "rgba(0,0,0,0.6)", fontSize: 15 }}>
                      Enjoy 20-30 minutes before your moment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right side - You Might Also Like */}
      <div>
        <h3
          className="mb-6"
          style={{
            fontFamily: GC,
            fontWeight: 800,
            fontSize: 13,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.5)",
          }}
        >
          You Might Also Like…
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {otherKeys.map((formulaKey) => {
            const formula = formulas[formulaKey]
            const stickImg = stickImageFor(formulaKey)
            const subscribePrice = (formula.bundlePrice * 0.75).toFixed(2)
            const oneTimePrice = formula.bundlePrice.toFixed(2)

            return (
              <div
                key={formulaKey}
                className="flex flex-col"
                style={{ backgroundColor: "#f5f5f5", borderRadius: 12, overflow: "hidden" }}
              >
                {/* Product image */}
                <div
                  className="aspect-square flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: "#fff" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={stickImg.src}
                    alt={stickImg.alt}
                    className="w-32 h-auto object-contain"
                  />
                </div>

                {/* Product info + buttons */}
                <div className="p-4 flex flex-col gap-3">
                  <div>
                    <span
                      style={{
                        fontFamily: GC,
                        fontWeight: 800,
                        fontSize: 11,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "rgba(0,0,0,0.5)",
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      {formula.name}
                    </span>
                    <span
                      style={{
                        fontFamily: GC,
                        fontWeight: 800,
                        fontSize: 18,
                        color: "#000",
                        display: "block",
                      }}
                    >
                      {formula.headline}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/${formulaKey}`}
                      className="flex items-center justify-center transition-colors"
                      style={{
                        fontFamily: GC,
                        fontWeight: 800,
                        fontSize: 13,
                        minHeight: 44,
                        padding: "0 16px",
                        borderRadius: 8,
                        backgroundColor: "#87CEEB",
                        color: "#000",
                        border: "2px solid #87CEEB",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#87CEEB"
                      }}
                    >
                      Subscribe — ${subscribePrice}
                    </Link>
                    <Link
                      href={`/${formulaKey}`}
                      className="flex items-center justify-center transition-colors"
                      style={{
                        fontFamily: GC,
                        fontWeight: 800,
                        fontSize: 13,
                        minHeight: 44,
                        padding: "0 16px",
                        borderRadius: 8,
                        backgroundColor: "#000",
                        color: "#fff",
                        border: "2px solid #000",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent"
                        e.currentTarget.style.color = "#000"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#000"
                        e.currentTarget.style.color = "#fff"
                      }}
                    >
                      Add to Cart — ${oneTimePrice}
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
