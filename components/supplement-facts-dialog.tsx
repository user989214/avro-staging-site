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
  const isPrimary = variant === "primary"

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
            {flavorName ? ` · ${flavorName}` : ""} · Serving size 1 stick (5 g)
          </p>
        </div>
        <div className="px-6 pb-6">
          <div className="rounded-xl p-5" style={{ backgroundColor: LIGHT_GRAY }}>
            <div style={{ borderTop: "4px solid var(--ink)", paddingTop: 12 }}>
              <p
                style={{
                  fontFamily: GC,
                  fontWeight: 700,
                  fontSize: 14,
                  color: "var(--ink)",
                  marginBottom: 6,
                }}
              >
                Pending approved Supplement Facts panel
              </p>
              <p
                style={{
                  fontFamily: GC,
                  fontWeight: 400,
                  fontSize: 13,
                  color: "var(--warm-gray)",
                  lineHeight: 1.5,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
