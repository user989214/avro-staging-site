import { formulas, type FormulaKey } from "@/lib/data"
import { cn } from "@/lib/utils"

interface ProductVisualProps {
  keys?: FormulaKey[]
  scene?: "stone" | "hero-stone" | "bundle" | FormulaKey
  className?: string
}

export function ProductVisual({
  keys = ["calm", "focus", "energy"],
  scene = "stone",
  className,
}: ProductVisualProps) {
  return (
    <div
      className={cn(
        "relative flex items-end justify-center gap-[clamp(12px,3vw,28px)] min-h-[330px] px-6 pt-14 pb-8.5 isolate",
        scene === "hero-stone" && "min-h-[470px]",
        className
      )}
      aria-label="AVRO product lineup"
    >
      {/* Stone/surface effect */}
      <div className="absolute inset-x-[5%] bottom-3 h-[86px] rounded-lg bg-gradient-to-br from-white/78 to-[rgba(204,196,179,0.35)] bg-[repeating-linear-gradient(45deg,rgba(99,88,69,0.09)_0_2px,transparent_2px_10px)] shadow-[0_18px_45px_rgba(50,46,35,0.12)] -z-10" />

      {keys.map((key, index) => {
        const item = formulas[key]
        const tilt = index - Math.floor(keys.length / 2)

        return (
          <div
            key={key}
            className={cn(
              "relative grid place-items-center content-center px-2.5 py-4.5 text-white rounded-t-3xl rounded-b-2xl overflow-hidden",
              "w-[clamp(86px,12vw,150px)] h-[clamp(260px,32vw,420px)]",
              "shadow-[0_22px_42px_rgba(30,24,20,0.2)]"
            )}
            style={
              {
                "--pack": item.color,
                "--pack-accent": item.accent,
                background: `linear-gradient(90deg, rgba(0,0,0,0.28), transparent 22%, rgba(255,255,255,0.22) 50%, transparent 78%, rgba(0,0,0,0.24)), ${item.color}`,
                transform: `rotate(${tilt}deg)`,
              } as React.CSSProperties
            }
          >
            {/* Top crimp lines */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.18)_0_3px,rgba(0,0,0,0.12)_3px_6px)]" />
            {/* Bottom crimp lines */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.18)_0_3px,rgba(0,0,0,0.12)_3px_6px)]" />

            <span className="absolute top-8.5 font-black tracking-[0.18em] uppercase text-sm">
              {item.short}
            </span>
            <strong
              className="font-serif text-[clamp(36px,6vw,58px)] leading-none tracking-[0.08em]"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              AVRO
            </strong>
            <em className="absolute bottom-9.5 max-w-[90px] text-white/88 text-[11px] font-extrabold text-center uppercase not-italic">
              {item.flavor}
            </em>
          </div>
        )
      })}
    </div>
  )
}

export function ProductCard({ formulaKey }: { formulaKey: FormulaKey }) {
  const item = formulas[formulaKey]

  return (
    <div
      className="relative grid place-items-center content-center px-2.5 py-4.5 text-white rounded-t-3xl rounded-b-2xl overflow-hidden w-[82px] h-[230px] shadow-[0_22px_42px_rgba(30,24,20,0.2)]"
      style={
        {
          "--pack": item.color,
          background: `linear-gradient(90deg, rgba(0,0,0,0.28), transparent 22%, rgba(255,255,255,0.22) 50%, transparent 78%, rgba(0,0,0,0.24)), ${item.color}`,
        } as React.CSSProperties
      }
    >
      <div className="absolute top-0 left-0 right-0 h-4 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.18)_0_3px,rgba(0,0,0,0.12)_3px_6px)]" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.18)_0_3px,rgba(0,0,0,0.12)_3px_6px)]" />

      <span className="absolute top-7 font-black tracking-[0.18em] uppercase text-xs">
        {item.short}
      </span>
      <strong
        className="font-serif text-3xl leading-none tracking-[0.08em]"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        AVRO
      </strong>
      <em className="absolute bottom-8 max-w-[70px] text-white/88 text-[9px] font-extrabold text-center uppercase not-italic">
        {item.flavor}
      </em>
    </div>
  )
}
