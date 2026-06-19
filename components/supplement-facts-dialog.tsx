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
      <DialogContent className="max-w-[420px] p-0 bg-base flex flex-col max-h-[90vh]">
        <div className="p-5 pb-2 shrink-0 sm:p-6">
          <DialogHeader>
            <DialogTitle
              className="pr-8"
              style={{
                fontFamily: GC,
                fontWeight: 700,
                fontSize: "clamp(20px, 6vw, 32px)",
                lineHeight: 1.1,
                color: "var(--ink)",
              }}
            >
              Supplement facts
            </DialogTitle>
          </DialogHeader>
          <p
            className="mt-1"
            style={{
              fontFamily: GC,
              fontWeight: 500,
              fontSize: 14,
              lineHeight: 1.4,
              color: "var(--warm-gray)",
            }}
          >
            {formula.name}
            {selectedFlavor ? ` · ${selectedFlavor.name}` : ""} · Serving size 1 stick (5 g)
          </p>
        </div>

        {/* Flavor toggle — each flavor has its own approved panel */}
        {flavors.length > 1 && (
          <div className="px-5 pb-3 pt-1 flex flex-wrap gap-1.5 shrink-0 sm:px-6">
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
                    fontSize: 12,
                    lineHeight: 1,
                    padding: "6px 12px",
                    borderRadius: 999,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "background-color 0.15s ease, color 0.15s ease",
                    backgroundColor: active ? "var(--charcoal)" : "transparent",
                    color: active ? "var(--bone)" : "var(--charcoal)",
                    border: "1.5px solid var(--charcoal)",
                  }}
                >
                  {flavor.name}
                </button>
              )
            })}
          </div>
        )}

        <div className="px-5 pb-6 overflow-y-auto sm:px-6">
          <div className="rounded-xl p-2.5 flex justify-center sm:p-4" style={{ backgroundColor: LIGHT_GRAY }}>
            {/* Approved Supplement Facts panel — rendered directly from the label graphic */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={panelSrc || "/placeholder.svg"}
              alt={`${formula.name} ${selectedFlavor?.name ?? ""} Supplement Facts panel`}
              className="h-auto block rounded-md w-full"
              style={{ backgroundColor: "var(--base)", maxWidth: 320 }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
