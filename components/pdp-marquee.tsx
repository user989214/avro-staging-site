"use client"

interface MarqueeProps {
  text: string
}

export function PdpMarquee({ text }: MarqueeProps) {
  return (
    <div
      className="w-full overflow-hidden py-6"
      style={{ backgroundColor: "#94C6D4" }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="mx-12 flex items-center gap-5"
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: "0.01em",
              color: "var(--ink)",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="opacity-70"
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
