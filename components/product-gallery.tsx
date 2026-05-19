"use client"

import { useState } from "react"
import {
  tubeImageFor,
  stickImageFor,
} from "@/components/product-visual"
import { Icon } from "@/components/icons"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { FormulaKey, Formula } from "@/lib/data"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  formula: Formula
  formulaKey: FormulaKey
}

type ThumbKind = "studio" | "tube" | "stick"
interface Thumb {
  id: ThumbKind
  label: string
}

const THUMBS: Thumb[] = [
  { id: "studio", label: "Canister & Stick" },
  { id: "tube", label: "Display Tube" },
  { id: "stick", label: "Stick Pack" },
]

export function ProductGallery({ formula, formulaKey }: ProductGalleryProps) {
  const [flavorId, setFlavorId] = useState<string>(formula.flavors[0].id)
  const [activeId, setActiveId] = useState<ThumbKind>("studio")

  const tint = `${formula.color}14`
  const accentTint = `${formula.accent}24`

  const studio = tubeImageFor("studio", formulaKey, flavorId)
  const stick = stickImageFor(formulaKey, flavorId)
  const activeFlavorName =
    formula.flavors.find((f) => f.id === flavorId)?.name ?? formula.flavor

  const renderMain = () => {
    if (activeId === "studio") {
      // Canister + stick together, scaled up to fill the frame.
      return (
        <div
          className="relative flex items-center justify-center w-full h-full overflow-hidden"
          style={{
            background: `radial-gradient(circle at 50% 36%, ${accentTint}, transparent 62%), linear-gradient(180deg, #ffffff, ${tint})`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={studio.src}
            alt={studio.alt}
            className="h-full w-full object-contain scale-[1.45] origin-center"
          />
        </div>
      )
    }

    if (activeId === "tube") {
      // Solo display tube — same studio packshot, cropped & zoomed to
      // the canister so it fills the frame.
      return (
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            background: `radial-gradient(circle at 50% 36%, ${accentTint}, transparent 62%), linear-gradient(180deg, #ffffff, ${tint})`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={studio.src}
            alt={`AVRO ${formula.short} ${activeFlavorName} display tube`}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none h-[170%] w-auto object-contain"
            style={{ objectPosition: "30% 50%", transform: "translate(-62%, -50%)" }}
          />
        </div>
      )
    }

    // Solo stick — natural proportion, do not zoom.
    return (
      <div
        className="relative flex items-center justify-center w-full h-full p-8 sm:p-14"
        style={{
          background: `radial-gradient(circle at 50% 36%, ${accentTint}, transparent 62%), linear-gradient(180deg, #ffffff, ${tint})`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={stick.src}
          alt={stick.alt}
          className="max-h-full w-auto object-contain"
        />
      </div>
    )
  }

  const renderThumb = (id: ThumbKind) => {
    if (id === "studio") {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={studio.src}
          alt=""
          className="h-full w-full object-contain scale-[1.35] origin-center"
        />
      )
    }
    if (id === "tube") {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={studio.src}
          alt=""
          className="absolute top-1/2 left-1/2 max-w-none h-[170%] w-auto object-contain"
          style={{ transform: "translate(-62%, -50%)" }}
        />
      )
    }
    // stick
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={stick.src}
        alt=""
        className="max-h-[78%] w-auto object-contain"
      />
    )
  }

  const factsRows: [string, string][] = [
    ["PharmaGABA", "200 mg"],
    [
      formula.addition,
      formulaKey === "calm" ? "550 mg" : formulaKey === "focus" ? "250 mg" : "120 mg",
    ],
    ["Prebiotic Blend", "500 mg"],
    ["Natural Flavor", activeFlavorName],
  ]

  return (
    <div className="flex flex-col gap-3 lg:gap-4">
      <div className="flex gap-3 lg:gap-4">
        {/* Thumbnail rail */}
        <ul className="flex flex-row lg:flex-col gap-2.5 shrink-0 order-2 lg:order-1 overflow-x-auto lg:overflow-visible -mx-1 px-1 lg:mx-0 lg:px-0">
          {THUMBS.map((thumb) => (
            <li key={thumb.id} className="shrink-0">
              <button
                type="button"
                onClick={() => setActiveId(thumb.id)}
                aria-label={thumb.label}
                aria-pressed={activeId === thumb.id}
                className={cn(
                  "relative w-[78px] h-[78px] lg:w-[92px] lg:h-[92px] rounded-md border-2 bg-white overflow-hidden flex items-center justify-center transition-all",
                  activeId === thumb.id
                    ? "border-olive shadow-[0_4px_14px_rgba(31,29,24,0.1)]"
                    : "border-line hover:border-ink/30",
                )}
              >
                <span
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 50% 40%, ${accentTint}, transparent 70%), #ffffff`,
                  }}
                />
                <span className="relative flex items-center justify-center w-full h-full overflow-hidden">
                  {renderThumb(thumb.id)}
                </span>
                <span className="sr-only">{thumb.label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Main view */}
        <div className="relative flex-1 order-1 lg:order-2 min-h-[480px] lg:min-h-[620px] rounded-lg border border-line overflow-hidden bg-white">
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

          <div className="w-full h-full min-h-[480px] lg:min-h-[620px]">
            {renderMain()}
          </div>
        </div>
      </div>

      {/* Supplement Facts trigger — replaces the old facts thumbnail */}
      <div className="flex flex-wrap items-center gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border-2 border-line bg-white text-xs font-extrabold text-ink uppercase tracking-[0.08em] hover:border-olive hover:text-olive-dark transition-all"
            >
              <Icon name="card" className="w-4 h-4 text-olive" />
              Supplement Facts
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-[420px] p-0 bg-white">
            <div className="p-6 pb-2">
              <DialogHeader>
                <DialogTitle className="font-serif font-black text-2xl">
                  Supplement Facts
                </DialogTitle>
              </DialogHeader>
              <p className="mt-1 text-xs text-ink/65">
                {formula.name} &middot; {activeFlavorName} &middot; Serving size 1 stick (5 g)
              </p>
            </div>
            <div className="px-6 pb-6">
              <div className="border-2 border-ink rounded-md p-4 font-sans">
                <div className="border-t-4 border-ink pt-2">
                  {factsRows.map(([label, value], i) => (
                    <div
                      key={label}
                      className={cn(
                        "flex justify-between text-xs py-2",
                        i < factsRows.length - 1 && "border-b border-line",
                      )}
                    >
                      <span className="font-bold">{label}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[10px] text-ink/55 leading-snug">
                  10 sticks per canister. Net wt 1.76 oz (50 g). Other
                  ingredients: prebiotic fiber blend, citric acid, natural
                  flavors, stevia leaf extract.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Flavor selector */}
        <div className="flex items-center gap-2 flex-wrap ml-auto">
          <span className="text-[11px] font-black tracking-[0.1em] uppercase text-ink/60">
            Flavor
          </span>
          {formula.flavors.map((flavor) => {
            const selected = flavor.id === flavorId
            return (
              <button
                key={flavor.id}
                type="button"
                onClick={() => setFlavorId(flavor.id)}
                aria-pressed={selected}
                className={cn(
                  "px-3 py-1.5 rounded-full border-2 bg-white text-xs font-extrabold transition-all",
                  selected
                    ? "border-olive text-olive-dark"
                    : "border-line text-ink/70 hover:border-ink/30",
                )}
              >
                {flavor.name}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
