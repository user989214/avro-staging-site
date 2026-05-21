"use client"

interface MarqueeProps {
  text: string
  variant?: "light" | "dark" | "accent"
  size?: "sm" | "lg"
}

export function PdpMarquee({ text, variant = "light", size = "sm" }: MarqueeProps) {
  const bgClass =
    variant === "dark"
      ? "bg-ink text-white"
      : variant === "accent"
        ? "bg-avro-blue text-ink"
        : "bg-soft text-ink"

  const sizeClass = size === "lg" ? "py-4" : "py-3"
  const textClass = size === "lg" ? "text-base" : "text-sm"

  return (
    <div className={`w-full overflow-hidden ${sizeClass} ${bgClass}`}>
      <div className="flex animate-marquee whitespace-nowrap">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className={`mx-8 ${textClass} font-bold tracking-wide flex items-center gap-3`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-60"
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
