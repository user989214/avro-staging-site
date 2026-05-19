"use client"

import Link from "next/link"
import { formulas, type FormulaKey } from "@/lib/data"
import { ProductVisual } from "@/components/product-visual"
import { cn } from "@/lib/utils"

interface YouMightAlsoLikeProps {
  currentKey: FormulaKey
}

export function YouMightAlsoLike({ currentKey }: YouMightAlsoLikeProps) {
  const others = (Object.keys(formulas) as FormulaKey[]).filter((k) => k !== currentKey)

  return (
    <section className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(36px,5vw,64px)] border-b border-line bg-white">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <span className="block mb-2 text-olive text-[11px] font-black tracking-[0.14em] uppercase">
            You might also like
          </span>
          <h2 className="font-serif font-black text-[clamp(24px,3vw,36px)] leading-[1.05]">
            Complete your AVRO ritual.
          </h2>
        </div>
        <Link href="/shop" className="hidden sm:inline-flex btn-secondary text-sm">
          Shop all formulas
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {others.map((key) => {
          const item = formulas[key]
          return (
            <Link
              key={key}
              href={`/${key}`}
              className="group flex flex-col bg-white border border-line rounded-lg overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(31,29,24,0.08)]"
            >
              <div
                className="flex items-center justify-center h-[200px] bg-white"
                style={{
                  background: `radial-gradient(circle at 50% 60%, ${item.accent}1f, transparent 60%), #ffffff`,
                }}
              >
                <ProductVisual keys={[key]} scene={key} size="medium" />
              </div>
              <div className="flex flex-col gap-2 p-5 border-t border-line">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-black text-base">{item.name}</h3>
                  <span className="text-sm font-extrabold text-ink/80">{item.priceLabel}</span>
                </div>
                <p className="text-ink/65 text-sm leading-relaxed">{item.support}</p>
                <span
                  className={cn(
                    "inline-flex items-center justify-center mt-2 px-4 py-2 rounded-md text-xs font-extrabold transition-colors",
                    "bg-soft text-olive-dark group-hover:bg-olive group-hover:text-white"
                  )}
                >
                  Shop {item.short}
                </span>
              </div>
            </Link>
          )
        })}

        {/* Variety Bundle card */}
        <Link
          href="/shop"
          className="group flex flex-col bg-white border border-line rounded-lg overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(31,29,24,0.08)]"
        >
          <div className="relative flex items-center justify-center h-[200px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/lifestyle/coupes-grapefruit-stickpack.jpg"
              alt="AVRO stickpack styled with grapefruit coupes"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-olive text-white rounded-full text-[10px] font-black tracking-[0.08em] uppercase">
              Clinician Choice
            </span>
          </div>
          <div className="flex flex-col gap-2 p-5 border-t border-line">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-black text-base">Variety Bundle</h3>
              <span className="text-sm font-extrabold text-ink/80">$59.85</span>
            </div>
            <p className="text-ink/65 text-sm leading-relaxed">
              Calm, Focus, and Energy together. Save 20% when you bundle.
            </p>
            <span className="inline-flex items-center justify-center mt-2 px-4 py-2 rounded-md text-xs font-extrabold bg-soft text-olive-dark group-hover:bg-olive group-hover:text-white transition-colors">
              Build Bundle
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}
