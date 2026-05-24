"use client"

interface AngledSectionProps {
  children: React.ReactNode
  bg?: "white" | "soft" | "accent" | "dark"
  angleDirection?: "down" | "up"
  className?: string
}

export function AngledSection({
  children,
  bg = "white",
  angleDirection = "down",
  className = "",
}: AngledSectionProps) {
  const bgClasses = {
    white: "bg-base",
    soft: "bg-soft",
    accent: "bg-avro-blue/10",
    dark: "bg-ink",
  }

  const angleStyles = {
    down: "polygon(0 0, 100% 0, 100% calc(100% - 60px), 0 100%)",
    up: "polygon(0 60px, 100% 0, 100% 100%, 0 100%)",
  }

  return (
    <section
      className={`relative w-full ${bgClasses[bg]} ${className}`}
      style={{
        clipPath: angleStyles[angleDirection],
        marginBottom: angleDirection === "down" ? "-30px" : "0",
        marginTop: angleDirection === "up" ? "-30px" : "0",
        paddingBottom: angleDirection === "down" ? "60px" : "0",
        paddingTop: angleDirection === "up" ? "60px" : "0",
      }}
    >
      {children}
    </section>
  )
}

export function AngledDivider({
  direction = "down",
  fill = "white",
}: {
  direction?: "down" | "up"
  fill?: string
}) {
  return (
    <div
      className="w-full h-[60px] relative -mt-px"
      style={{ backgroundColor: fill }}
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        style={{ transform: direction === "up" ? "scaleY(-1)" : "none" }}
      >
        <polygon
          points="0,0 1440,60 1440,60 0,60"
          fill={fill}
        />
      </svg>
    </div>
  )
}
