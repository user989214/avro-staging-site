// Generates a single static SVG sheet of every icon used on the AVRO site.
// Output: public/avro-icon-sheet.svg
//
// Run with:  node scripts/generate-icon-sheet.mjs
//
// The script imports each icon's `__iconNode` (path/circle/line primitive
// list) from lucide-react and rebuilds a flat <svg> at 24x24 with the same
// stroke settings as the live <Icon> component. Icons are arranged in a
// labeled grid so the resulting file can be opened, dropped into Figma, or
// pasted directly as editable vectors.

import { writeFileSync, mkdirSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Mirrors the iconMap in components/icons.tsx exactly.
const iconMap = {
  // Foundational / state
  leaf: "leaf",
  flask: "flask-conical",
  beaker: "beaker",
  shield: "shield",
  "shield-check": "shield-check",
  brain: "brain",
  target: "target",
  bolt: "zap",
  zap: "zap",
  smile: "smile",
  sun: "sun",
  moon: "moon",
  waves: "waves",
  atom: "atom",
  heart: "heart",
  "heart-pulse": "heart-pulse",
  pill: "pill",
  // Ritual + flow
  cup: "glass-water",
  droplet: "droplet",
  clock: "clock",
  timer: "timer",
  star: "star",
  sparkles: "sparkles",
  check: "check-circle-2",
  "check-circle": "check-circle-2",
  coffee: "coffee",
  // Lifestyle / moments
  users: "users",
  flag: "flag",
  monitor: "monitor",
  briefcase: "briefcase",
  gamepad: "gamepad-2",
  wine: "wine",
  card: "credit-card",
  // Comparison / proof
  search: "search",
  gauge: "gauge",
  lightbulb: "lightbulb",
  activity: "activity",
  volume: "volume-2",
  trending: "trending-up",
  scale: "scale",
  book: "book-open",
  // Quality badges
  microscope: "microscope",
  sprout: "sprout",
  wheat: "wheat",
  "badge-check": "badge-check",
}

const groups = [
  {
    title: "Foundational + state",
    names: [
      "leaf", "flask", "beaker", "shield", "shield-check",
      "brain", "target", "bolt", "smile", "sun",
      "moon", "waves", "atom", "heart", "heart-pulse", "pill",
    ],
  },
  {
    title: "Ritual + flow",
    names: [
      "cup", "droplet", "clock", "timer", "star",
      "sparkles", "check", "coffee",
    ],
  },
  {
    title: "Lifestyle + moments",
    names: ["users", "flag", "monitor", "briefcase", "gamepad", "wine", "card"],
  },
  {
    title: "Comparison + proof",
    names: [
      "search", "gauge", "lightbulb", "activity",
      "volume", "trending", "scale", "book",
    ],
  },
  {
    title: "Quality badges",
    names: ["microscope", "sprout", "wheat", "badge-check"],
  },
]

async function loadIconNode(slug) {
  // Some lucide entry files only re-export the default (e.g. aliases like
  // `check-circle-2` → `circle-check`), so __iconNode isn't always present.
  // Resolve the redirect chain by reading file contents until we hit one
  // that defines __iconNode itself.
  const { readFileSync } = await import("node:fs")
  const { resolve: resolvePath } = await import("node:path")
  const ICONS_DIR = resolvePath(
    __dirname,
    "..",
    "node_modules",
    "lucide-react",
    "dist",
    "esm",
    "icons",
  )

  let current = slug
  for (let i = 0; i < 5; i++) {
    const filePath = resolvePath(ICONS_DIR, `${current}.js`)
    const src = readFileSync(filePath, "utf8")
    const redirect = src.match(/export \{ default \} from '\.\/([^']+)\.js'/)
    if (redirect) {
      current = redirect[1]
      continue
    }
    const mod = await import(`lucide-react/dist/esm/icons/${current}.js`)
    if (mod.__iconNode) return mod.__iconNode
    throw new Error(`__iconNode not found for ${slug} (resolved to ${current})`)
  }
  throw new Error(`Too many redirects resolving ${slug}`)
}

function nodeToSvg(node) {
  return node
    .map(([tag, attrs]) => {
      const props = Object.entries(attrs)
        .filter(([k]) => k !== "key")
        .map(([k, v]) => `${k}="${v}"`)
        .join(" ")
      return `    <${tag} ${props} />`
    })
    .join("\n")
}

const CELL = 120 // total cell size (icon + label)
const ICON = 48 // rendered icon size inside the cell
const COLS = 6
const PAD_X = 32
const SECTION_GAP = 28
const HEADER = 96
const STROKE = 1.6

const titleFont =
  "font-family=\"'Gotham Condensed', 'Gotham', Arial, sans-serif\""
const labelFont = "font-family=\"'Gotham', Arial, sans-serif\""

async function build() {
  const sections = []
  let cursorY = HEADER

  for (const group of groups) {
    const rows = Math.ceil(group.names.length / COLS)
    const titleY = cursorY
    cursorY += 32 // section title
    const gridStartY = cursorY

    const cells = []
    for (let i = 0; i < group.names.length; i++) {
      const name = group.names[i]
      const slug = iconMap[name]
      const node = await loadIconNode(slug)
      const col = i % COLS
      const row = Math.floor(i / COLS)
      const cx = PAD_X + col * CELL + CELL / 2
      const cy = gridStartY + row * CELL + CELL / 2 - 12

      const iconX = cx - ICON / 2
      const iconY = cy - ICON / 2

      // Card background
      cells.push(
        `  <rect x="${iconX - 16}" y="${iconY - 16}" width="${ICON + 32}" height="${ICON + 32}" rx="10" fill="#ffffff" stroke="#e6e3da" stroke-width="1" />`,
      )
      // Icon group: lucide nodes are designed for 24x24, scale to ICON.
      const scale = ICON / 24
      cells.push(
        `  <g transform="translate(${iconX}, ${iconY}) scale(${scale})" fill="none" stroke="#1f1d18" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round">
${nodeToSvg(node)}
  </g>`,
      )
      // Label
      cells.push(
        `  <text x="${cx}" y="${iconY + ICON + 30}" ${labelFont} font-size="11" font-weight="600" fill="#3a3833" text-anchor="middle">${name}</text>`,
      )
    }

    sections.push(
      `  <text x="${PAD_X}" y="${titleY + 18}" ${titleFont} font-size="22" font-weight="900" fill="#1f1d18" letter-spacing="0.5">${group.title.toUpperCase()}</text>
  <line x1="${PAD_X}" y1="${titleY + 26}" x2="${PAD_X + COLS * CELL}" y2="${titleY + 26}" stroke="#e6e3da" stroke-width="1" />
${cells.join("\n")}`,
    )

    cursorY = gridStartY + rows * CELL + SECTION_GAP
  }

  const totalCount = groups.reduce((acc, g) => acc + g.names.length, 0)
  const W = PAD_X * 2 + COLS * CELL
  const H = cursorY + 24

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none">
  <rect width="100%" height="100%" fill="#faf8f1" />
  <text x="${PAD_X}" y="48" ${titleFont} font-size="34" font-weight="900" fill="#1f1d18">AVRO ICON SHEET</text>
  <text x="${PAD_X}" y="72" ${labelFont} font-size="13" font-weight="500" fill="#666256">${totalCount} icons — lucide-react, 24×24, stroke 1.6 — drop this file into Figma to import all icons at once</text>
${sections.join("\n")}
</svg>
`

  const outPath = resolve(__dirname, "..", "public", "avro-icon-sheet.svg")
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, svg, "utf8")
  console.log(`Wrote ${outPath} (${totalCount} icons, ${W}×${H}px)`)
}

build().catch((err) => {
  console.error(err)
  process.exit(1)
})
