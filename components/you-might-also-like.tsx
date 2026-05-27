"use client"

import Image from "next/image"
import Link from "next/link"
import { formulas, type FormulaKey } from "@/lib/data"
import { ProductCard } from "@/components/product-visual"
import { cn } from "@/lib/utils"

interface YouMightAlsoLikeProps {
  currentKey: FormulaKey
  hideHeader?: boolean
}

export function YouMightAlsoLike({ currentKey, hideHeader = false }: YouMightAlsoLikeProps) {
  const others = (Object.keys(formulas) as FormulaKey[]).filter((k) => k !== currentKey)

  return (
    <div className="w-full">
      {!hideHeader && (
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
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {others.map((key) => {
          const item = formulas[key]
          return (
            <Link
              key={key}
              href={`/${key}`}
              className="group flex flex-col gap-4 transition-all hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--base-light, #f5f1e8)",
                borderRadius: 24,
                padding: "clamp(20px,3vw,32px)",
              }}
            >
              <div
                className="relative flex items-center justify-center overflow-hidden"
                style={{
                  borderRadius: 20,
                  backgroundColor: "var(--bone)",
                  aspectRatio: "1 / 1",
                }}
              >
                <ProductCard
                  formulaKey={key}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-black text-lg">{item.name}</h3>
                  <span className="text-sm font-extrabold text-ink/80">{item.priceLabel}</span>
                </div>
                <p className="text-ink/65 text-sm leading-relaxed">{item.support}</p>
                <span
                  className={cn(
                    "inline-flex items-center justify-center mt-3 px-4 rounded-full text-sm font-extrabold transition-colors",
                    "bg-charcoal text-bone group-hover:bg-transparent group-hover:text-charcoal",
                  )}
                  style={{ minHeight: 48, border: "2px solid var(--charcoal)" }}
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
          className="group flex flex-col gap-4 transition-all hover:-translate-y-0.5"
          style={{
            backgroundColor: "var(--base-light, #f5f1e8)",
            borderRadius: 24,
            padding: "clamp(20px,3vw,32px)",
          }}
        >
          <div
            className="relative flex items-center justify-center overflow-hidden"
            style={{
              borderRadius: 20,
              backgroundColor: "var(--bone)",
              aspectRatio: "1 / 1",
            }}
          >
            <Image
              src="/images/products/avro-six-flavor-fan.png"
              alt="AVRO variety bundle showing all six flavors fanned out on a stone slab"
              width={640}
              height={640}
              className="h-full w-full object-contain p-4"
              sizes="(max-width: 768px) 80vw, 320px"
            />
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-charcoal text-bone rounded-full text-[10px] font-black tracking-[0.08em] uppercase">
              Clinician Choice
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-black text-lg">Variety Bundle</h3>
              <span className="text-sm font-extrabold text-ink/80">$59.85</span>
            </div>
            <p className="text-ink/65 text-sm leading-relaxed">
              Calm, Focus, and Energy together. Save 20% when you bundle.
            </p>
            <span
              className="inline-flex items-center justify-center mt-3 px-4 rounded-full text-sm font-extrabold bg-charcoal text-bone group-hover:bg-transparent group-hover:text-charcoal transition-colors"
              style={{ minHeight: 48, border: "2px solid var(--charcoal)" }}
            >
              Build Bundle
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}
