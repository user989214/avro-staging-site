"use client"

import { useState } from "react"
import {
  TUBE_SCENES,
  TUBE_SCENE_LABELS,
  tubeImageFor,
  stickImageFor,
  type TubeScene,
} from "@/components/product-visual"
import { Icon, type IconName } from "@/components/icons"
import type { FormulaKey, Formula } from "@/lib/data"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  formula: Formula
  formulaKey: FormulaKey
}

type ThumbKind = "tube" | "ingredients" | "facts"
interface Thumb {
  id: string
  kind: ThumbKind
  scene?: TubeScene
  label: string
  icon?: IconName
}

export function ProductGallery({ formula, formulaKey }: ProductGalleryProps) {
  const [flavorId, setFlavorId] = useState<string>(formula.flavors[0].id)
  const [activeId, setActiveId] = useState<string>("tube-tech")

  const tint = `${formula.color}14`
  const accentTint = `${formula.accent}24`

  const thumbs: Thumb[] = [
    ...TUBE_SCENES.map<Thumb>((scene) => ({
      id: `tube-${scene}`,
      kind: "tube",
      scene,
      label: TUBE_SCENE_LABELS[scene],
    })),
    { id: "ingredients", kind: "ingredients", label: "Inside", icon: "flask" },
    { id: "facts", kind: "facts", label: "Facts", icon: "card" },
  ]

  const active = thumbs.find((t) => t.id === activeId) ?? thumbs[0]

  const renderMain = () => {
    if (active.kind === "tube" && active.scene) {
      const { src, alt, sceneLabel } = tubeImageFor(
        active.scene,
        formulaKey,
        flavorId,
      )
      return (
        <div
          className="relative flex items-center justify-center w-full h-full p-6 sm:p-10"
          style={{
            background: `radial-gradient(circle at 50% 36%, ${accentTint}, transparent 62%), linear-gradient(180deg, #ffffff, ${tint})`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-h-full max-w-full w-auto h-auto object-contain"
          />
          <span className="absolute bottom-4 left-4 px-3 py-1.5 bg-white/85 backdrop-blur-sm border border-line rounded-full text-[11px] font-black tracking-[0.08em] uppercase text-olive-dark">
            {sceneLabel}
          </span>
        </div>
      )
    }

    if (active.kind === "ingredients") {
      const additionImage =
        formulaKey === "focus"
          ? "/images/ingredients/cognigrape-2.jpg"
          : formulaKey === "energy"
            ? "/images/ingredients/natural-caffeine-2.jpg"
            : null
      const cells: Array<{ src: string | null; label: string; icon: IconName }> = [
        { src: "/images/ingredients/pharmagaba-2.jpg", label: "PharmaGABA", icon: "leaf" },
        { src: additionImage, label: formula.addition.split(" ")[0], icon: "flask" },
        { src: "/images/ingredients/prebiotic-fiber-2.jpg", label: "Prebiotic", icon: "shield" },
        { src: "/images/ingredients/stevia-2.jpg", label: "Natural Flavor", icon: "star" },
      ]
      return (
        <div
          className="grid grid-cols-2 gap-4 w-full h-full p-6 sm:p-10 content-center"
          style={{ background: `linear-gradient(135deg, #ffffff, ${tint})` }}
        >
          {cells.map(({ src, label, icon }) => (
            <div
              key={label}
              className="flex flex-col bg-white border border-line rounded-lg overflow-hidden"
            >
              {src ? (
                <div className="relative w-full aspect-square overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${label} ingredient`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full aspect-square bg-soft/60 grid place-items-center">
                  <Icon name={icon} className="w-10 h-10 text-olive" />
                </div>
              )}
              <span className="px-3 py-2 text-xs font-extrabold text-center bg-white">
                {label}
              </span>
            </div>
          ))}
        </div>
      )
    }

    // facts
    return (
      <div className="flex items-center justify-center w-full h-full bg-white p-6 sm:p-10">
        <div className="w-full max-w-[320px] border-2 border-ink rounded-md p-5 font-sans">
          <strong className="block text-2xl font-black mb-1">Supplement Facts</strong>
          <p className="text-xs text-ink/70 mb-3">Serving size 1 stick (5 g)</p>
          <div className="border-t-4 border-ink pt-2">
            <div className="flex justify-between text-xs py-1.5 border-b border-line">
              <span className="font-bold">PharmaGABA</span>
              <span>200 mg</span>
            </div>
            <div className="flex justify-between text-xs py-1.5 border-b border-line">
              <span className="font-bold">{formula.addition}</span>
              <span>
                {formulaKey === "calm"
                  ? "550 mg"
                  : formulaKey === "focus"
                    ? "250 mg"
                    : "120 mg"}
              </span>
            </div>
            <div className="flex justify-between text-xs py-1.5 border-b border-line">
              <span className="font-bold">Prebiotic Blend</span>
              <span>500 mg</span>
            </div>
            <div className="flex justify-between text-xs py-1.5">
              <span className="font-bold">Natural Flavor</span>
              <span>{formula.flavors.find((f) => f.id === flavorId)?.name}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderThumb = (thumb: Thumb) => {
    if (thumb.kind === "tube" && thumb.scene) {
      const { src } = tubeImageFor(thumb.scene, formulaKey, flavorId)
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          className="max-h-[80%] max-w-[80%] w-auto h-auto object-contain"
        />
      )
    }
    return (
      <Icon name={thumb.icon ?? "card"} className="w-6 h-6 text-olive" />
    )
  }

  return (
    <div className="flex flex-col gap-3 lg:gap-4">
      <div className="flex gap-3 lg:gap-4">
        {/* Thumbnail rail */}
        <ul className="flex flex-row lg:flex-col gap-2.5 shrink-0 order-2 lg:order-1 overflow-x-auto lg:overflow-visible -mx-1 px-1 lg:mx-0 lg:px-0">
          {thumbs.map((thumb) => (
            <li key={thumb.id} className="shrink-0">
              <button
                type="button"
                onClick={() => setActiveId(thumb.id)}
                aria-label={thumb.label}
                aria-pressed={activeId === thumb.id}
                className={cn(
                  "relative w-[68px] h-[68px] lg:w-[80px] lg:h-[80px] rounded-md border-2 bg-white overflow-hidden flex items-center justify-center transition-all",
                  activeId === thumb.id
                    ? "border-olive shadow-[0_4px_14px_rgba(31,29,24,0.1)]"
                    : "border-line hover:border-ink/30",
                )}
              >
                <span
                  className="absolute inset-0"
                  style={{
                    background:
                      thumb.kind === "tube"
                        ? `radial-gradient(circle at 50% 40%, ${accentTint}, transparent 70%), #ffffff`
                        : "#ffffff",
                  }}
                />
                <span className="relative flex items-center justify-center w-full h-full">
                  {renderThumb(thumb)}
                </span>
                <span className="sr-only">{thumb.label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Main view */}
        <div className="relative flex-1 order-1 lg:order-2 min-h-[440px] lg:min-h-[560px] rounded-lg border border-line overflow-hidden bg-white">
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
            {renderMain()}
          </div>
        </div>
      </div>

      {/* Flavor selector — drives the tube renders above */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-[11px] font-black tracking-[0.1em] uppercase text-ink/60">
          Flavor
        </span>
        <div className="flex gap-2 flex-wrap">
          {formula.flavors.map((flavor) => {
            const selected = flavor.id === flavorId
            const { src } = stickImageFor(formulaKey, flavor.id)
            return (
              <button
                key={flavor.id}
                type="button"
                onClick={() => setFlavorId(flavor.id)}
                aria-pressed={selected}
                className={cn(
                  "flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full border-2 bg-white text-xs font-extrabold transition-all",
                  selected
                    ? "border-olive text-olive-dark"
                    : "border-line text-ink/70 hover:border-ink/30",
                )}
              >
                <span
                  className="grid place-items-center w-7 h-7 rounded-full overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${formula.color}10, ${formula.accent}1f)`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    className="h-6 w-auto object-contain"
                  />
                </span>
                {flavor.name}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
