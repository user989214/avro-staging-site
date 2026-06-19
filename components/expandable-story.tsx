"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { SectionHeading } from "@/components/sections"

export function ExpandableStory() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="max-w-[780px] mx-auto flex flex-col gap-6">
      <SectionHeading title="A different starting point." />

      {/* Quick preview — always visible */}
      <p className="text-ink/80 text-[clamp(16px,1.7vw,18px)] leading-relaxed">
        AVRO began with a simple observation. In many moments that matter most,
        people do not need more energy. They need more control.
      </p>
      <p className="text-ink/80 text-[clamp(16px,1.7vw,18px)] leading-relaxed">
        Every formula begins with a calm-first foundation of PharmaGABA®. From
        there, Calm, Focus, and Energy are each designed for a distinct role.*
      </p>

      {/* Expanded detail */}
      {expanded && (
        <>
          <p className="text-ink/80 text-[clamp(16px,1.7vw,18px)] leading-relaxed">
            More energy is not the same as more control. So many energy products
            are built around the opposite idea — more stimulation, more urgency,
            more output. But when pressure rises, more is not always better.
            Pressure can disrupt calm, blur clarity, and make control harder to
            hold.
          </p>
          <p className="text-ink/80 text-[clamp(16px,1.7vw,18px)] leading-relaxed">
            That tension became the starting point for AVRO. Founded by Keigo
            Sugawara and Peter van Stolk, AVRO was created from a shared belief
            that performance does not always come from pushing harder. Sometimes
            it comes from feeling steadier, clearer, and more in control.
          </p>
          <p className="text-ink/80 text-[clamp(16px,1.7vw,18px)] leading-relaxed">
            All three formulas also include a prebiotic fiber blend of Soluble
            Guar Fiber and Acacia Fiber, reflecting the belief that balance and
            function are connected.*
          </p>
          <p className="text-ink text-[clamp(16px,1.6vw,18px)] font-semibold leading-relaxed border-l-2 border-olive pl-5">
            &ldquo;Calm is not the opposite of performance. It is often what
            makes it possible.&rdquo;
          </p>
        </>
      )}

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="self-start inline-flex items-center gap-1.5 font-sans font-bold text-sm h-[42px] px-6 rounded-full border-2 border-ink/20 bg-transparent text-ink hover:bg-ink/5 transition-colors"
      >
        {expanded ? "Show less" : "Read the full story"}
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  )
}
