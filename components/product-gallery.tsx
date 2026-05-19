"use client"

import { useState } from "react"
import { ProductVisual } from "@/components/product-visual"
import { Icon, type IconName } from "@/components/icons"
import type { FormulaKey, Formula } from "@/lib/data"
import { cn } from "@/lib/utils"

interface GalleryView {
  id: string
  label: string
  icon: IconName
  render: () => React.ReactNode
}

interface ProductGalleryProps {
  formula: Formula
  formulaKey: FormulaKey
}

export function ProductGallery({ formula, formulaKey }: ProductGalleryProps) {
  const tint = `${formula.color}14`
  const accentTint = `${formula.accent}24`

  const views: GalleryView[] = [
    {
      id: "stick",
      label: "Stick",
      icon: "leaf",
      render: () => (
        <div
          className="flex items-center justify-center w-full h-full"
          style={{
            background: `radial-gradient(circle at 50% 35%, ${accentTint}, transparent 60%), #ffffff`,
          }}
        >
          <ProductVisual keys={[formulaKey]} scene={formulaKey} size="large" />
        </div>
      ),
    },
    {
      id: "glass",
      label: "In glass",
      icon: "cup",
      render: () => (
        <div
          className="relative flex items-end justify-center gap-6 w-full h-full pb-12"
          style={{
            background: `radial-gradient(circle at 70% 30%, ${accentTint}, transparent 55%), #ffffff`,
          }}
        >
          <ProductVisual keys={[formulaKey]} scene={formulaKey} size="medium" />
          <div className="relative">
            <div
              className="w-[140px] h-[260px] rounded-b-2xl rounded-t-md border border-line/80 bg-white/40 backdrop-blur-sm"
              style={{
                background: `linear-gradient(180deg, transparent 0 18%, ${formula.accent}40 22%, ${formula.color}30 100%)`,
                boxShadow: "inset 0 0 30px rgba(255,255,255,0.5), 0 8px 24px rgba(31,29,24,0.06)",
              }}
            />
            <span
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-[120px] h-3 rounded-full"
              style={{ background: `${formula.accent}80` }}
            />
          </div>
        </div>
      ),
    },
    {
      id: "ingredients",
      label: "Inside",
      icon: "flask",
      render: () => (
        <div
          className="grid grid-cols-2 gap-4 w-full h-full p-10 content-center"
          style={{ background: `linear-gradient(135deg, #ffffff, ${tint})` }}
        >
          {[
            ["leaf", "PharmaGABA"],
            ["flask", formula.addition.split(" ")[0]],
            ["shield", "Prebiotic"],
            ["star", "Natural Flavor"],
          ].map(([ic, label]) => (
            <div
              key={label as string}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-line rounded-lg"
            >
              <Icon name={ic as IconName} className="w-8 h-8 text-olive" />
              <span className="text-xs font-extrabold text-center">{label}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "moment",
      label: "In use",
      icon: "users",
      render: () => (
        <div
          className="relative flex items-center justify-center w-full h-full"
          style={{
            background: `linear-gradient(135deg, ${tint}, #ffffff 60%, ${accentTint})`,
          }}
        >
          <div className="text-center max-w-[300px] px-6">
            <span
              className="inline-flex items-center justify-center w-16 h-16 mb-5 rounded-full"
              style={{ background: formula.color }}
            >
              <Icon name="target" className="w-8 h-8 text-white" />
            </span>
            <p className="font-serif font-black text-2xl leading-tight mb-2">
              {formula.headline}
            </p>
            <p className="text-ink/70 text-sm">{formula.support}</p>
          </div>
        </div>
      ),
    },
    {
      id: "facts",
      label: "Facts",
      icon: "card",
      render: () => (
        <div className="flex items-center justify-center w-full h-full bg-white p-10">
          <div className="w-full max-w-[300px] border-2 border-ink rounded-md p-5 font-sans">
            <strong className="block text-2xl font-black mb-1">Supplement Facts</strong>
            <p className="text-xs text-ink/70 mb-3">Serving size 1 stick (5 g)</p>
            <div className="border-t-4 border-ink pt-2">
              <div className="flex justify-between text-xs py-1.5 border-b border-line">
                <span className="font-bold">PharmaGABA</span>
                <span>200 mg</span>
              </div>
              <div className="flex justify-between text-xs py-1.5 border-b border-line">
                <span className="font-bold">{formula.addition}</span>
                <span>{formulaKey === "calm" ? "550 mg" : formulaKey === "focus" ? "250 mg" : "120 mg"}</span>
              </div>
              <div className="flex justify-between text-xs py-1.5 border-b border-line">
                <span className="font-bold">Prebiotic Blend</span>
                <span>500 mg</span>
              </div>
              <div className="flex justify-between text-xs py-1.5">
                <span className="font-bold">Natural Flavor</span>
                <span>—</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  const [activeId, setActiveId] = useState(views[0].id)
  const active = views.find((v) => v.id === activeId) ?? views[0]

  return (
    <div className="flex gap-3 lg:gap-4">
      {/* Thumbnail strip - vertical on desktop */}
      <ul className="flex flex-row lg:flex-col gap-2.5 shrink-0 order-2 lg:order-1">
        {views.map((view) => (
          <li key={view.id}>
            <button
              type="button"
              onClick={() => setActiveId(view.id)}
              aria-label={view.label}
              aria-pressed={activeId === view.id}
              className={cn(
                "relative w-[64px] h-[64px] lg:w-[72px] lg:h-[72px] rounded-md border-2 bg-white overflow-hidden flex items-center justify-center transition-all",
                activeId === view.id
                  ? "border-olive shadow-[0_4px_14px_rgba(31,29,24,0.08)]"
                  : "border-line hover:border-ink/30"
              )}
            >
              <Icon name={view.icon} className="w-6 h-6 text-olive" />
              <span className="sr-only">{view.label}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Main view */}
      <div className="relative flex-1 order-1 lg:order-2 min-h-[440px] lg:min-h-[560px] rounded-lg border border-line overflow-hidden bg-white">
        {/* Clinicians' Choice badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pl-2 pr-3 py-1.5 bg-white border border-line rounded-full shadow-[0_4px_14px_rgba(31,29,24,0.06)]">
          <span className="grid place-items-center w-7 h-7 rounded-full bg-olive">
            <Icon name="shield" className="w-4 h-4 text-white" />
          </span>
          <span className="text-[11px] font-black tracking-[0.08em] uppercase text-olive-dark">
            Clinicians&apos; Choice
          </span>
        </div>

        <div className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-olive text-white rounded-full text-[11px] font-black tracking-[0.08em] uppercase">
          New
        </div>

        <div className="w-full h-full min-h-[440px] lg:min-h-[560px]">
          {active.render()}
        </div>
      </div>
    </div>
  )
}
