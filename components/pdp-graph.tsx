"use client"

import { AvroIcon } from "@/components/avro-icons"
import type { FormulaKey } from "@/lib/data"

interface MoodGraphProps {
  formulaKey: FormulaKey
}

export function MoodGraph({ formulaKey }: MoodGraphProps) {
  const isEnergy = formulaKey === "energy"
  
  return (
    <div className="w-full max-w-[600px] mx-auto">
      <div className="relative h-[280px] bg-base rounded-2xl border border-line p-6">
        {/* Y-axis label */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-4">
          <span className="text-[11px] font-bold text-ink/50 uppercase tracking-wider [writing-mode:vertical-lr] rotate-180">
            Mood Level
          </span>
        </div>
        
        {/* Graph area */}
        <div className="relative h-full">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="w-full border-t border-dashed border-line/50" />
            ))}
          </div>
          
          {/* Time labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between translate-y-6 text-[11px] font-bold text-ink/50">
            <span>0 min</span>
            <span>30 min</span>
            <span>1 hr</span>
            <span>2 hr</span>
            <span>3 hr</span>
          </div>
          
          {/* Coffee line (jittery) */}
          <svg
            viewBox="0 0 400 200"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            {/* Coffee - sharp spike then crash */}
            <path
              d="M 0 180 Q 50 180 80 40 Q 100 20 120 60 Q 160 140 200 160 Q 280 180 400 190"
              fill="none"
              stroke="#B0B0B0"
              strokeWidth="3"
              strokeDasharray="8 4"
              className="opacity-60"
            />
            
            {/* AVRO - smooth sustained curve */}
            <path
              d={isEnergy 
                ? "M 0 180 Q 60 160 100 80 Q 140 50 200 60 Q 300 70 400 100"
                : "M 0 140 Q 60 120 100 80 Q 140 60 200 70 Q 300 80 400 90"
              }
              fill="none"
              stroke="var(--avro-blue)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          
          {/* Legend */}
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-0.5 bg-avro-blue rounded" />
              <span className="text-xs font-bold text-ink">AVRO {formulaKey === "calm" ? "Calm" : formulaKey === "focus" ? "Focus" : "Energy"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-0.5 bg-ink/30 rounded" style={{ backgroundImage: "repeating-linear-gradient(90deg, #B0B0B0, #B0B0B0 4px, transparent 4px, transparent 8px)" }} />
              <span className="text-xs font-bold text-ink/50">{isEnergy ? "Coffee" : "Stress Response"}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Caption */}
      <p className="text-center text-sm text-ink/60 mt-4">
        {isEnergy 
          ? "AVRO Energy provides steady, sustained energy without the jitters or crash."
          : `AVRO ${formulaKey === "calm" ? "Calm" : "Focus"} supports a calmer baseline state over time.`
        }
      </p>
    </div>
  )
}

export function IngredientBar({ 
  ingredient, 
  amount, 
  description,
  highlight = false 
}: { 
  ingredient: string
  amount: string
  description: string
  highlight?: boolean
}) {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-2xl border ${highlight ? "border-avro-blue bg-avro-blue/5" : "border-line bg-base"}`}>
      <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center">
        <AvroIcon name="clinically-tested-ingredients" size={48} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <h4 className="font-bold text-ink truncate">{ingredient}</h4>
          <span className="text-sm font-extrabold text-olive shrink-0">{amount}</span>
        </div>
        <p className="text-sm text-ink/60 mt-0.5">{description}</p>
      </div>
    </div>
  )
}
