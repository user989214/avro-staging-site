"use client"

import { useState } from "react"
import {
  tubeImageFor,
  stickImageFor,
  soloTubeImageFor,
  TUBE_SCENE_LABELS,
  type TubeScene,
} from "@/components/product-visual"
import type { FormulaKey, Formula } from "@/lib/data"

interface ProductGalleryProps {
  formula: Formula
  formulaKey: FormulaKey
  flavorId: string
  onFlavorChange?: (flavorId: string) => void
  reviewCount?: number
  rating?: number
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

export function ProductGallery({ formula, formulaKey, flavorId, reviewCount, rating = 4.8 }: ProductGalleryProps) {
  const [activeId, setActiveId] = useState<ThumbKind>("studio")

  const studio = tubeImageFor("studio", formulaKey, flavorId)
  const soloTube = soloTubeImageFor(formulaKey, flavorId)
  const stick = stickImageFor(formulaKey, flavorId)

  void formula

  const renderMain = () => {
    if (activeId === "studio") {
      return (
        <div className="relative w-full h-full overflow-hidden" style={{ backgroundColor: "#FBF8F1" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={studio.src}
            alt={studio.alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )
    }

    if (activeId === "tube") {
      return (
        <div className="relative w-full h-full overflow-hidden" style={{ backgroundColor: "#FBF8F1" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={soloTube.src}
            alt={soloTube.alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )
    }

    if (activeId === "stick") {
      return (
        <div className="relative w-full h-full overflow-hidden" style={{ backgroundColor: "#FBF8F1" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={stick.src}
            alt={stick.alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )
    }

    // Lifestyle cohort scene — render edge-to-edge so its real background fills the frame.
    const scene = tubeImageFor(activeId, formulaKey, flavorId)
    return (
      <div className="relative w-full h-full overflow-hidden" style={{ backgroundColor: "#FBF8F1" }}>
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
          className="absolute inset-0 w-full h-full object-cover"
        />
      )
    }
    if (thumb.id === "tube") {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={soloTube.src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )
    }
    if (thumb.id === "stick") {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={stick.src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
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
    <div
      className="flex flex-col-reverse lg:flex-row gap-3"
      style={{ maxHeight: "min(72vh, 640px)" }}
    >
      {/* Thumbnail strip — bone tiles with thick base frame on active */}
      <div className="relative lg:w-[76px] shrink-0">
        <ul
          className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden -mx-1 px-1 pb-1 lg:mx-0 lg:px-0 lg:pb-0 lg:max-h-full snap-x lg:snap-y no-scrollbar"
          style={{ maxHeight: "min(72vh, 640px)" }}
        >
          {THUMBS.map((thumb) => {
            const isActive = activeId === thumb.id
            return (
              <li key={thumb.id} className="shrink-0 snap-start">
                <button
                  type="button"
                  onClick={() => setActiveId(thumb.id)}
                  aria-label={thumb.label}
                  aria-pressed={isActive}
                  className="relative w-[64px] h-[64px] sm:w-[68px] sm:h-[68px] flex items-center justify-center transition-all"
                  style={{
                    borderRadius: 14,
                    padding: 4,
                    backgroundColor: isActive ? "var(--charcoal)" : "transparent",
                    border: isActive ? "none" : "1px solid var(--line)",
                  }}
                >
                  <div
                    className="relative w-full h-full overflow-hidden flex items-center justify-center"
                    style={{
                      borderRadius: 10,
                      backgroundColor: "#FBF8F1",
                    }}
                  >
                    {renderThumb(thumb)}
                  </div>
                  <span className="sr-only">{thumb.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Main view — bright cream tile that pops on the section bg */}
      <div
        className="relative w-full flex-1 overflow-hidden"
        style={{
          backgroundColor: "#FBF8F1",
          borderRadius: 20,
          border: "1px solid var(--line)",
          aspectRatio: "1 / 1",
          maxHeight: "min(72vh, 640px)",
        }}
      >
        {renderMain()}

        {/* Rating overlay pill - top-left, like homepage badges */}
        {reviewCount != null && (
          <div
            className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none"
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              backgroundColor: "var(--charcoal)",
              color: "var(--bone)",
              borderRadius: 999,
              padding: "6px 12px",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.02em",
            }}
          >
            <span style={{ fontSize: 11, letterSpacing: 0.5 }}>{"\u2605"}</span>
            <span>{rating.toFixed(1)}</span>
            <span style={{ opacity: 0.65, fontWeight: 500 }}>({reviewCount})</span>
          </div>
        )}
      </div>
    </div>
  )
}
