"use client"

import { useState } from "react"
import {
  tubeImageFor,
  stickImageFor,
  soloTubeImageFor,
  TUBE_SCENE_LABELS,
  type TubeScene,
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

type ThumbKind = "studio" | "tube" | "stick" | TubeScene

interface Thumb {
  id: ThumbKind
  label: string
  /** "white" for studio packshots and the solo stick (white background)
   *  "scene" for lifestyle cohort renders (use the image's own background) */
  bg: "white" | "scene"
}

const THUMBS: Thumb[] = [
  { id: "studio", label: "Canister & Stick", bg: "white" },
  { id: "tube", label: "Display Tube", bg: "white" },
  { id: "stick", label: "Stick Pack", bg: "white" },
  { id: "tech", label: TUBE_SCENE_LABELS.tech, bg: "scene" },
  { id: "golf", label: TUBE_SCENE_LABELS.golf, bg: "scene" },
  { id: "social", label: TUBE_SCENE_LABELS.social, bg: "scene" },
  { id: "gaming", label: TUBE_SCENE_LABELS.gaming, bg: "scene" },
]

export function ProductGallery({ formula, formulaKey }: ProductGalleryProps) {
  const [flavorId, setFlavorId] = useState<string>(formula.flavors[0].id)
  const [activeId, setActiveId] = useState<ThumbKind>("studio")

  const studio = tubeImageFor("studio", formulaKey, flavorId)
  const soloTube = soloTubeImageFor(formulaKey, flavorId)
  const stick = stickImageFor(formulaKey, flavorId)
  const activeFlavorName =
    formula.flavors.find((f) => f.id === flavorId)?.name ?? formula.flavor
  const soloTubeSrc = `/images/tubes/solo/${formulaKey}-${flavorId}.jpg`
  const soloTubeAlt = `AVRO ${formula.short} ${activeFlavorName} display tube`

  const isLifestyle = (id: ThumbKind): id is TubeScene =>
    id === "tech" || id === "golf" || id === "social" || id === "gaming"

  const renderMain = () => {
    if (activeId === "studio") {
      return (
        <div className="relative flex items-center justify-center w-full h-full bg-white overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={studio.src}
            alt={studio.alt}
            className="w-full h-full object-contain scale-[1.18] origin-center"
          />
        </div>
      )
    }

    if (activeId === "tube") {
      // Solo display tube — the canister by itself, on white.
      return (
        <div className="relative flex items-center justify-center w-full h-full bg-white overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={soloTube.src}
            alt={soloTube.alt}
            className="w-full h-full object-contain"
          />
        </div>
      )
    }

    if (activeId === "stick") {
      return (
        <div className="relative flex items-center justify-center w-full h-full bg-white p-8 sm:p-14">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={stick.src}
            alt={stick.alt}
            className="max-h-full w-auto object-contain"
          />
        </div>
      )
    }

    // Lifestyle cohort scene — render edge-to-edge so its real background fills the frame.
    const scene = tubeImageFor(activeId, formulaKey, flavorId)
    return (
      <div className="relative w-full h-full overflow-hidden bg-soft">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={scene.src}
          alt={scene.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    )
  }

  const renderThumb = (thumb: Thumb) => {
    if (thumb.id === "studio") {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={studio.src}
          alt=""
          className="h-full w-full object-contain scale-[1.18] origin-center"
        />
      )
    }
    if (thumb.id === "tube") {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={soloTube.src}
          alt=""
          className="h-full w-full object-contain"
        />
      )
    }
    if (thumb.id === "stick") {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={stick.src}
          alt=""
          className="max-h-[80%] w-auto object-contain"
        />
      )
    }
    const scene = tubeImageFor(thumb.id, formulaKey, flavorId)
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={scene.src}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
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
      {/* Main view — square, fills the frame, image-native background */}
      <div className="relative w-full aspect-square rounded-lg border border-line overflow-hidden bg-white">
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pl-2 pr-3 py-1.5 bg-white border border-line rounded-full shadow-[0_4px_14px_rgba(31,29,24,0.06)]">
          <span className="grid place-items-center w-7 h-7 rounded-full bg-olive">
            <Icon name="shield" className="w-4 h-4 text-white" />
          </span>
          <span className="text-[11px] font-black tracking-[0.08em] uppercase text-olive-dark">
            Clinicians&apos; Choice
          </span>
        </div>

        <div className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-olive text-white rounded-full text-[11px] font-black tracking-[0.08em] uppercase">
          {isLifestyle(activeId) ? TUBE_SCENE_LABELS[activeId] : "New"}
        </div>

        <div className="absolute inset-0">{renderMain()}</div>
      </div>

      {/* Thumbnail strip — horizontal, below the main image */}
      <div className="relative">
        <ul className="flex gap-2.5 overflow-x-auto -mx-1 px-1 pb-1 snap-x">
          {THUMBS.map((thumb) => (
            <li key={thumb.id} className="shrink-0 snap-start">
              <button
                type="button"
                onClick={() => setActiveId(thumb.id)}
                aria-label={thumb.label}
                aria-pressed={activeId === thumb.id}
                className={cn(
                  "relative w-[88px] h-[88px] sm:w-[96px] sm:h-[96px] rounded-md border-2 overflow-hidden flex items-center justify-center transition-all",
                  thumb.bg === "white" ? "bg-white" : "bg-soft",
                  activeId === thumb.id
                    ? "border-olive shadow-[0_4px_14px_rgba(31,29,24,0.12)]"
                    : "border-line hover:border-ink/30",
                )}
              >
                {renderThumb(thumb)}
                <span className="sr-only">{thumb.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Supplement Facts trigger + flavor selector */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
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
