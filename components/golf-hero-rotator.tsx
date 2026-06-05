"use client"

import { useEffect, useRef, useState } from "react"

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
 * Crossfading background rotator for the golf hero. The current image sits fully
 * opaque underneath while the incoming image fades in on top of it, so the cream
 * page background never shows through mid-transition (no white flash).
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
  // `base` is the image showing underneath; `top` fades in over it, then becomes base.
  const [base, setBase] = useState(0)
  const [top, setTop] = useState<number | null>(null)
  const [topVisible, setTopVisible] = useState(false)
  const fadeMs = 900
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    if (images.length <= 1) return
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    const id = setInterval(() => {
      setBase((current) => {
        const next = (current + 1) % images.length
        // Mount the next image on top (still transparent), then flip it to visible
        // on the next frame so the opacity transition runs.
        setTop(next)
        setTopVisible(false)
        const raf = setTimeout(() => setTopVisible(true), 20)
        timers.current.push(raf)
        // After the fade completes, promote the top image to the base and unmount the layer.
        const settle = setTimeout(() => {
          setBase(next)
          setTop(null)
          setTopVisible(false)
        }, fadeMs + 40)
        timers.current.push(settle)
        return current
      })
    }, interval)

    return () => {
      clearInterval(id)
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [images.length, interval])

  const imgStyle = (visible: boolean): React.CSSProperties => ({
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition,
    opacity: visible ? opacity : 0,
    transition: `opacity ${fadeMs}ms ease-in-out`,
  })

  return (
    <div
      className={className}
      aria-hidden={alt === "" ? true : undefined}
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* Base layer: always fully visible, no white gap underneath */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={images[base] || "/placeholder.svg"} alt={alt} style={imgStyle(true)} />

      {/* Incoming layer: fades in on top of the base */}
      {top !== null && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={images[top] || "/placeholder.svg"} alt="" style={imgStyle(topVisible)} />
      )}
    </div>
  )
}
