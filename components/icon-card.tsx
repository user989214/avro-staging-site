"use client"

import { useRef, useState } from "react"
import { Icon, type IconName } from "@/components/icons"

type Props = {
  name: IconName
}

export function IconCard({ name }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const svg = wrapRef.current?.querySelector("svg")
    if (!svg) return
    // Clone so we can normalize attributes for Figma without mutating the
    // live icon. Figma is happiest when the SVG declares an explicit
    // xmlns and uses currentColor / fixed dimensions.
    const clone = svg.cloneNode(true) as SVGSVGElement
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    if (!clone.getAttribute("width")) clone.setAttribute("width", "24")
    if (!clone.getAttribute("height")) clone.setAttribute("height", "24")
    const markup = clone.outerHTML
    try {
      await navigator.clipboard.writeText(markup)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      // Fallback: select-and-copy via a hidden textarea
      const ta = document.createElement("textarea")
      ta.value = markup
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    }
  }

  return (
    <figure
      data-icon-card
      data-icon-name={name}
      className="group flex flex-col items-center gap-3 p-5 border border-line rounded-2xl bg-base-light/88 transition-colors hover:bg-soft"
    >
      <div
        ref={wrapRef}
        className="grid place-items-center w-14 h-14 rounded-full bg-soft"
      >
        <Icon name={name} className="w-7 h-7 text-ink" />
      </div>
      <figcaption className="text-center w-full">
        <code className="block text-[12px] font-bold text-ink break-all mb-2">
          {name}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          className="w-full px-2 py-1.5 border border-line rounded-full text-[11px] font-extrabold tracking-wide uppercase text-ink/70 transition-colors hover:bg-ink hover:text-white hover:border-ink"
          aria-label={`Copy ${name} icon SVG to clipboard`}
        >
          {copied ? "Copied" : "Copy SVG"}
        </button>
      </figcaption>
    </figure>
  )
}
