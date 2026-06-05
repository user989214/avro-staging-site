"use client"

import { useEffect, useState } from "react"

interface GolfHeroRotatorProps {
  /** Image sources to cycle through, in order. */
  images: string[]
  /** Class applied to the wrapper (used for the desktop/mobile show-hide logic). */
  className?: string
  /** CSS object-position for the images. */
  objectPosition?: string
  /** Base opacity of the images (mobile uses a dimmed value for text legibility). */
  opacity?: number
  /** Milliseconds each image stays fully visible before crossfading to the next. */
  interval?: number
  alt?: string
}

/**
 * Crossfading background rotator for the golf hero. Renders every image stacked
 * absolutely and toggles opacity so the active frame fades into the next one.
 * Respects prefers-reduced-motion by holding on the first frame.
 */
export function GolfHeroRotator({
  images,
  className,
  objectPosition = "center",
  opacity = 1,
  interval = 4500,
  alt = "",
}: GolfHeroRotatorProps) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    const id = setInterval(() => {
      setActive((i) => (i + 1) % images.length)
    }, interval)
    return () => clearInterval(id)
  }, [images.length, interval])

  return (
    <div
      className={className}
      aria-hidden={alt === "" ? true : undefined}
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src || "/placeholder.svg"}
          alt={i === active ? alt : ""}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition,
            opacity: i === active ? opacity : 0,
            transition: "opacity 1.1s ease-in-out",
          }}
        />
      ))}
    </div>
  )
}
