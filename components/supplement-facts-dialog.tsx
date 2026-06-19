"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icon } from "@/components/icons"
import type { Formula, FormulaKey } from "@/lib/data"
import { supplementFactsByFlavor, defaultPanelForFormula } from "@/lib/data"
import { cn } from "@/lib/utils"

const GC = '"DM Sans", system-ui, sans-serif'
const LIGHT_GRAY = "#f2f2f2"

interface SupplementFactsDialogProps {
  formula: Formula
  formulaKey: FormulaKey
  flavorName?: string
  variant?: "primary" | "secondary"
  className?: string
}

export function SupplementFactsDialog({
  formula,
  formulaKey,
  flavorName,
  variant = "secondary",
  className,
}: SupplementFactsDialogProps) {
  const isPrimary = variant === "primary"

  // The flavors that ship for this formula, each with its own approved panel.
  const flavors = formula.flavors

  // Default to the explicitly-passed flavor if provided, else the first flavor.
  const initialId =
    (flavorName ? flavors.find((f) => f.name === flavorName)?.id : undefined) ?? flavors[0].id
  const [selectedId, setSelectedId] = useState<string>(initialId)

  const panelSrc = supplementFactsByFlavor[selectedId] || defaultPanelForFormula(formulaKey)
  const selectedFlavor = flavors.find((f) => f.id === selectedId)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn("sf-trigger avro-size-lg inline-flex items-center justify-center gap-2 transition-colors", className)}
          style={{
            fontFamily: GC,
            fontWeight: 700,
            borderRadius: 999,
            backgroundColor: isPrimary ? "var(--charcoal)" : "transparent",
            color: isPrimary ? "var(--bone)" : "var(--charcoal)",
            border: "2px solid var(--charcoal)",
          }}
        >
          <Icon name="card" className="w-4 h-4" />
          Supplement facts
        </button>
      </DialogTrigger>
      <style>{`
        .sf-trigger:hover { background-color: ${isPrimary ? "transparent" : "var(--charcoal)"}; color: ${isPrimary ? "var(--charcoal)" : "var(--bone)"}; }
      `}</style>
      <DialogContent className="max-w-[440px] p-0 bg-base">
        <div className="p-6 pb-2">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: GC, fontWeight: 700, fontSize: 32, color: "var(--ink)" }}>
              Supplement facts
            </DialogTitle>
          </DialogHeader>
          <p
            className="mt-1"
            style={{
              fontFamily: GC,
              fontWeight: 500,
              fontSize: 15,
              color: "var(--warm-gray)",
            }}
          >
            {formula.name}
            {selectedFlavor ? ` · ${selectedFlavor.name}` : ""} · Serving size 1 stick (5 g)
          </p>
        </div>

        {/* Flavor toggle — each flavor has its own approved panel */}
        {flavors.length > 1 && (
          <div className="px-6 pb-3 flex flex-wrap gap-2">
            {flavors.map((flavor) => {
              const active = flavor.id === selectedId
              return (
                <button
                  key={flavor.id}
                  type="button"
                  onClick={() => setSelectedId(flavor.id)}
                  aria-pressed={active}
                  style={{
                    fontFamily: GC,
                    fontWeight: 700,
                    fontSize: 13,
                    padding: "7px 14px",
                    borderRadius: 999,
                    cursor: "pointer",
                    transition: "background-color 0.15s ease, color 0.15s ease",
                    backgroundColor: active ? "var(--charcoal)" : "transparent",
                    color: active ? "var(--bone)" : "var(--charcoal)",
                    border: "2px solid var(--charcoal)",
                  }}
                >
                  {flavor.name}
                </button>
              )
            })}
          </div>
        )}

        <div className="px-6 pb-6">
          <div className="rounded-xl p-4" style={{ backgroundColor: LIGHT_GRAY }}>
            {/* Approved Supplement Facts panel — rendered directly from the label graphic */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={panelSrc || "/placeholder.svg"}
              alt={`${formula.name} ${selectedFlavor?.name ?? ""} Supplement Facts panel`}
              className="w-full h-auto block rounded-md"
              style={{ backgroundColor: "var(--base)" }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
