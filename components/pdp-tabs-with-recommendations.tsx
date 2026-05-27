"use client"

import { useState } from "react"
import Link from "next/link"
import { formulas, type FormulaKey } from "@/lib/data"
import { stickImageFor } from "@/components/product-visual"

const GC = '"DM Sans", system-ui, sans-serif'

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
      "Formulated with naturally fermented PharmaGABA",
      "Promotes calm without drowsiness or sedation",
      "No added sugar, artificial sweeteners, or sugar alcohols",
      "Vegan, gluten-free, non-GMO project verified",
      "Third-party tested for purity and potency",
      "HSA/FSA eligible",
    ],
    focus: [
      "Formulated with Cognigrape and PharmaGABA",
      "Supports focus and mental clarity",
      "No added sugar, artificial sweeteners, or sugar alcohols",
      "Vegan, gluten-free, non-GMO project verified",
      "Third-party tested for purity and potency",
      "HSA/FSA eligible",
    ],
    energy: [
      "Formulated with 120mg natural caffeine and PharmaGABA",
      "Clean energy without the jitters or crash",
      "No added sugar, artificial sweeteners, or sugar alcohols",
      "Vegan, gluten-free, non-GMO project verified",
      "Third-party tested for purity and potency",
      "HSA/FSA eligible",
    ],
  }

  const ingredientsList: Record<FormulaKey, { name: string; amount: string }[]> = {
    calm: [
      { name: "PharmaGABA", amount: "200 mg" },
      { name: "Magnesium (as bisglycinate)", amount: "100 mg" },
      { name: "L-Theanine", amount: "850 mg" },
      { name: "Sodium (as bicarbonate)", amount: "80 mg" },
      { name: "Potassium (as bicarbonate)", amount: "100 mg" },
    ],
    focus: [
      { name: "Cognigrape", amount: "250 mg" },
      { name: "PharmaGABA", amount: "200 mg" },
      { name: "L-Theanine", amount: "200 mg" },
      { name: "Sodium (as bicarbonate)", amount: "80 mg" },
      { name: "Potassium (as bicarbonate)", amount: "100 mg" },
    ],
    energy: [
      { name: "Natural caffeine", amount: "120 mg" },
      { name: "PharmaGABA", amount: "200 mg" },
      { name: "L-Theanine", amount: "200 mg" },
      { name: "Sodium (as bicarbonate)", amount: "80 mg" },
      { name: "Potassium (as bicarbonate)", amount: "100 mg" },
    ],
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12" style={{ fontFamily: GC }}>
      {/* Left - Tabs */}
      <div>
        <div className="flex flex-wrap gap-x-8 gap-y-2 mb-6" style={{ borderBottom: "2px solid rgba(0,0,0,0.12)" }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="pb-3 transition-colors relative"
              style={{
                fontFamily: GC,
                fontWeight: activeTab === tab ? 800 : 500,
                fontSize: 20,
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

        <div className="min-h-[260px]">
          {activeTab === "Description" && (
            <div>
              <h3
                style={{
                  fontFamily: GC,
                  fontWeight: 700,
                  fontSize: "clamp(28px,2.5vw,36px)",
                  lineHeight: 1.0,
                  color: "var(--ink)",
                  marginBottom: 20,
                }}
              >
                Our formula
              </h3>
              <ul className="space-y-3">
                {descriptionBullets[currentKey].map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3"
                    style={{ fontFamily: GC, fontWeight: 500, fontSize: 18, lineHeight: 1.35, color: "rgba(0,0,0,0.7)" }}
                  >
                    <span style={{ color: "var(--ink)", fontWeight: 700, fontSize: 20, lineHeight: 1 }}>+</span>
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
                  fontWeight: 700,
                  fontSize: "clamp(32px,3vw,42px)",
                  lineHeight: 1.0,
                  color: "var(--ink)",
                  marginBottom: 24,
                }}
              >
                Active ingredients
              </h3>
              <div>
                {ingredientsList[currentKey].map((ing, i) => (
                  <div
                    key={ing.name}
                    className="flex items-center justify-between py-4"
                    style={{
                      borderBottom: i < ingredientsList[currentKey].length - 1 ? "1px solid rgba(0,0,0,0.1)" : "none",
                    }}
                  >
                    <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 20, color: "var(--ink)" }}>{ing.name}</span>
                    <span style={{ fontFamily: GC, fontWeight: 500, fontSize: 20, color: "rgba(0,0,0,0.6)" }}>{ing.amount}</span>
                  </div>
                ))}
              </div>
              <p
                className="mt-6"
                style={{ fontFamily: GC, fontWeight: 400, fontSize: 17, color: "rgba(0,0,0,0.5)" }}
              >
                Other ingredients: Citric acid, natural flavors, silica, stevia leaf extract.
              </p>
            </div>
          )}

          {activeTab === "When to take" && (
            <div>
              <h3
                style={{
                  fontFamily: GC,
                  fontWeight: 700,
                  fontSize: "clamp(32px,3vw,42px)",
                  lineHeight: 1.0,
                  color: "var(--ink)",
                  marginBottom: 24,
                }}
              >
                Best times to use
              </h3>
              <div className="space-y-6">
                {[
                  { title: "Morning routine", body: "Start your day with clarity and composure." },
                  { title: "Before important moments", body: "Meetings, presentations, or any high-stakes situation." },
                  { title: "Afternoon reset", body: "Combat the midday slump without caffeine." },
                ].map((item) => (
                  <div key={item.title}>
                    <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 21, color: "var(--ink)", display: "block", marginBottom: 6 }}>
                      {item.title}
                    </span>
                    <p style={{ fontFamily: GC, fontWeight: 400, fontSize: 19, lineHeight: 1.4, color: "rgba(0,0,0,0.6)" }}>
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
                  fontSize: "clamp(32px,3vw,42px)",
                  lineHeight: 1.0,
                  color: "var(--ink)",
                  marginBottom: 24,
                }}
              >
                Simple 3-step ritual
              </h3>
              <div className="space-y-6">
                {[
                  { n: 1, title: "Pour", body: "Empty one stick into 8-12 oz of cold water." },
                  { n: 2, title: "Mix", body: "Stir or shake until fully dissolved." },
                  { n: 3, title: "Drink", body: "Enjoy 20-30 minutes before your moment." },
                ].map((step) => (
                  <div key={step.n} className="flex items-start gap-5">
                    <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 56, lineHeight: 1, color: "var(--ink)" }}>
                      {step.n}
                    </span>
                    <div>
                      <span style={{ fontFamily: GC, fontWeight: 700, fontSize: 21, color: "var(--ink)", display: "block", marginBottom: 6 }}>
                        {step.title}
                      </span>
                      <p style={{ fontFamily: GC, fontWeight: 400, fontSize: 19, lineHeight: 1.4, color: "rgba(0,0,0,0.6)" }}>
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

      {/* Right - You might also like */}
      <div>
        <h3
          className="mb-6"
          style={{
            fontFamily: GC,
            fontWeight: 700,
            fontSize: 24,
            color: "var(--ink)",
          }}
        >
          You might also like
        </h3>

        <div className="grid grid-cols-2 gap-5">
          {otherKeys.map((formulaKey) => {
            const formula = formulas[formulaKey]
            const stickImg = stickImageFor(formulaKey)
            const subscribePrice = (formula.bundlePrice * 0.75).toFixed(2)
            const oneTimePrice = formula.bundlePrice.toFixed(2)

            return (
              <div
                key={formulaKey}
                className="flex flex-col bg-base"
                style={{ borderRadius: 24, overflow: "hidden", border: "2px solid rgba(0,0,0,0.12)" }}
              >
                <div
                  className="aspect-square flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: "#f2f2f2" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={stickImg.src}
                    alt={stickImg.alt}
                    className="w-36 h-auto object-contain"
                  />
                </div>

                <div className="p-5 flex flex-col gap-4">
                  <div>
                    <span
                      style={{
                        fontFamily: GC,
                        fontWeight: 700,
                        fontSize: 26,
                        lineHeight: 1.05,
                        color: "var(--ink)",
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      {formula.name}
                    </span>
                    <span
                      style={{
                        fontFamily: GC,
                        fontWeight: 500,
                        fontSize: 17,
                        lineHeight: 1.3,
                        color: "rgba(0,0,0,0.55)",
                        display: "block",
                      }}
                    >
                      {formula.headline}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/${formulaKey}`}
                      className="flex items-center justify-center transition-colors hover:bg-transparent hover:text-black"
                      style={{
                        fontFamily: GC,
                        fontWeight: 700,
                        fontSize: 16,
                        minHeight: 48,
                        padding: "0 28px",
                        borderRadius: 999,
                        backgroundColor: "var(--charcoal)",
                        color: "var(--bone)",
                        border: "2px solid var(--charcoal)",
                      }}
                    >
                      Add to cart — ${oneTimePrice}
                    </Link>
                    <Link
                      href={`/${formulaKey}`}
                      className="flex items-center justify-center transition-colors hover:text-black"
                      style={{
                        fontFamily: GC,
                        fontWeight: 700,
                        fontSize: 15,
                        minHeight: 40,
                        color: "rgba(0,0,0,0.6)",
                        textDecoration: "underline",
                      }}
                    >
                      Subscribe ${subscribePrice}
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
