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
import type { FormulaKey, Formula } from "@/lib/data"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  formula: Formula
  formulaKey: FormulaKey
  flavorId: string
  onFlavorChange?: (flavorId: string) => void
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

export function ProductGallery({ formula, formulaKey, flavorId }: ProductGalleryProps) {
  const [activeId, setActiveId] = useState<ThumbKind>("studio")

  const studio = tubeImageFor("studio", formulaKey, flavorId)
  const soloTube = soloTubeImageFor(formulaKey, flavorId)
  const stick = stickImageFor(formulaKey, flavorId)

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

  return (
    <div className="flex flex-col gap-3 lg:gap-4">
      {/* Main view — square, fills the frame, image-native background */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white" style={{ backgroundColor: "#f5f5f5" }}>
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pl-2 pr-3 py-1.5 bg-white rounded-full">
          <span className="grid place-items-center w-7 h-7 rounded-full" style={{ backgroundColor: "#000" }}>
            <Icon name="shield" className="w-4 h-4 text-white" />
          </span>
          <span className="text-[11px] tracking-[0.08em] uppercase" style={{ fontFamily: '"Gotham Condensed", sans-serif', fontWeight: 800, color: "#000" }}>
            Clinicians&apos; Choice
          </span>
        </div>

        <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full text-[11px] tracking-[0.08em] uppercase" style={{ backgroundColor: "#87CEEB", color: "#000", fontFamily: '"Gotham Condensed", sans-serif', fontWeight: 800 }}>
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
                  "relative w-[88px] h-[88px] sm:w-[96px] sm:h-[96px] rounded-lg overflow-hidden flex items-center justify-center transition-all",
                  activeId === thumb.id ? "ring-2 ring-black" : "opacity-70 hover:opacity-100",
                )}
                style={{ backgroundColor: thumb.bg === "white" ? "#fff" : "#f5f5f5" }}
              >
                {renderThumb(thumb)}
                <span className="sr-only">{thumb.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
