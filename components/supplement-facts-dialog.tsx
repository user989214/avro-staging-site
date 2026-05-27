"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icon } from "@/components/icons"
import type { Formula, FormulaKey } from "@/lib/data"
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
  const factsRows: [string, string][] = [
    ["Calories", "10"],
    ["Total Carbohydrate", formulaKey === "calm" ? "2 g" : "3 g"],
    ["Total Sugars", "0 g"],
    ...(formulaKey === "calm"
      ? ([["Magnesium (as magnesium bisglycinate)", "100 mg"]] as [string, string][])
      : []),
    ["Sodium (as sodium bicarbonate)", "80 mg"],
    ["Potassium (as potassium bicarbonate)", "100 mg"],
    ["PharmaGABA® (GABA)", "200 mg"],
    [
      formula.addition,
      formulaKey === "calm" ? "850 mg" : formulaKey === "focus" ? "250 mg" : "120 mg",
    ],
  ]

  const isPrimary = variant === "primary"

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn("sf-trigger inline-flex items-center justify-center gap-2 transition-colors", className)}
          style={{
            fontFamily: GC,
            fontWeight: 700,
            fontSize: 16,
            minHeight: 48,
            padding: "0 28px",
            borderRadius: 999,
            backgroundColor: isPrimary ? "var(--charcoal)" : LIGHT_GRAY,
            color: isPrimary ? "var(--bone)" : "var(--ink)",
            border: isPrimary ? "2px solid var(--charcoal)" : "2px solid transparent",
          }}
        >
          <Icon name="card" className="w-5 h-5" />
          Supplement facts
        </button>
      </DialogTrigger>
      <style>{`
        .sf-trigger:hover { background-color: ${isPrimary ? "transparent" : "#e6e6e6"}; color: var(--ink); }
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
            {flavorName ? ` · ${flavorName}` : ""} · Serving size 1 stick (5 g)
          </p>
        </div>
        <div className="px-6 pb-6">
          <div className="rounded-xl p-4" style={{ backgroundColor: LIGHT_GRAY }}>
            <div style={{ borderTop: "4px solid var(--ink)", paddingTop: 8 }}>
              {factsRows.map(([label, value], i) => (
                <div
                  key={label}
                  className={cn(
                    "flex justify-between py-2",
                    i < factsRows.length - 1 && "border-b",
                  )}
                  style={{
                    borderColor: "rgba(0,0,0,0.1)",
                    fontFamily: GC,
                    fontSize: 14,
                  }}
                >
                  <span style={{ fontWeight: 700 }}>{label}</span>
                  <span style={{ fontWeight: 500 }}>{value}</span>
                </div>
              ))}
            </div>
            <p
              className="mt-3 leading-snug"
              style={{
                fontFamily: GC,
                fontWeight: 400,
                fontSize: 12,
                color: "var(--warm-gray)",
              }}
            >
              10 stick packets per box. Mix 1 packet into 12 fl oz of water; up to 3 times per day.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
