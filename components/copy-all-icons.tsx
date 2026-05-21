"use client"

import { useState } from "react"

const COL_COUNT = 6
const CELL = 96 // grid cell size in px
const ICON_SIZE = 24
const LABEL_HEIGHT = 18

/**
 * Builds a single combined SVG sheet from every icon currently rendered on
 * the page (inside [data-icon-card]) and copies it to the clipboard.
 *
 * Pasting into Figma yields one frame containing every icon as editable
 * vectors with text labels underneath, arranged in a grid.
 */
export function CopyAllIcons() {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle")

  async function handleCopyAll() {
    try {
      const cards = Array.from(
        document.querySelectorAll<HTMLElement>("[data-icon-card]"),
      )
      if (cards.length === 0) {
        setState("error")
        return
      }

      const rows = Math.ceil(cards.length / COL_COUNT)
      const sheetWidth = COL_COUNT * CELL
      const sheetHeight = rows * (CELL + LABEL_HEIGHT)

      const cells: string[] = []
      cards.forEach((card, i) => {
        const name = card.dataset.iconName ?? ""
        const svg = card.querySelector("svg")
        if (!svg) return
        const col = i % COL_COUNT
        const row = Math.floor(i / COL_COUNT)
        const cx = col * CELL + (CELL - ICON_SIZE) / 2
        const cy = row * (CELL + LABEL_HEIGHT) + (CELL - ICON_SIZE) / 2

        const clone = svg.cloneNode(true) as SVGSVGElement
        clone.setAttribute("width", String(ICON_SIZE))
        clone.setAttribute("height", String(ICON_SIZE))
        // Force currentColor → black for portability into Figma
        clone.setAttribute("color", "#1f1d18")

        // Build a <g> wrapper that positions the icon and adds a label
        const inner = clone.innerHTML
        const viewBox = clone.getAttribute("viewBox") ?? "0 0 24 24"
        const stroke = clone.getAttribute("stroke") ?? "currentColor"
        const strokeWidth = clone.getAttribute("stroke-width") ?? "1.6"

        const labelY = row * (CELL + LABEL_HEIGHT) + CELL + 6

        cells.push(
          `<g transform="translate(${cx} ${cy})">` +
            `<svg width="${ICON_SIZE}" height="${ICON_SIZE}" viewBox="${viewBox}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>` +
            `</g>` +
            `<text x="${col * CELL + CELL / 2}" y="${labelY}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="#1f1d18">${escapeXml(name)}</text>`,
        )
      })

      const sheet =
        `<svg xmlns="http://www.w3.org/2000/svg" width="${sheetWidth}" height="${sheetHeight}" viewBox="0 0 ${sheetWidth} ${sheetHeight}" fill="none">` +
        cells.join("") +
        `</svg>`

      await navigator.clipboard.writeText(sheet)
      setState("copied")
      setTimeout(() => setState("idle"), 1500)
    } catch (err) {
      console.error("[v0] copy all icons failed", err)
      setState("error")
      setTimeout(() => setState("idle"), 1500)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopyAll}
      className="inline-flex items-center justify-center min-h-[44px] px-5 border border-ink rounded-full bg-ink text-white text-[13px] font-extrabold tracking-wide uppercase transition-opacity hover:opacity-90"
    >
      {state === "copied"
        ? "Copied entire sheet"
        : state === "error"
          ? "Copy failed"
          : "Copy all SVGs"}
    </button>
  )
}

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}
