import type { Metadata } from "next"
import { iconMap } from "@/components/icons"
import { IconCard } from "@/components/icon-card"
import { CopyAllIcons } from "@/components/copy-all-icons"

export const metadata: Metadata = {
  title: "Icon Sheet · AVRO",
  description:
    "Reference sheet of every Lucide icon used across the AVRO site, grouped by usage.",
}

// Keep groupings in sync with the comments in components/icons.tsx so the
// reference sheet mirrors how icons are organized in code.
const groups: { title: string; names: (keyof typeof iconMap)[] }[] = [
  {
    title: "Foundational / state",
    names: [
      "leaf",
      "flask",
      "beaker",
      "shield",
      "shield-check",
      "brain",
      "target",
      "bolt",
      "zap",
      "smile",
      "sun",
      "moon",
      "waves",
      "atom",
      "heart",
      "heart-pulse",
      "pill",
    ],
  },
  {
    title: "Ritual + flow",
    names: [
      "cup",
      "droplet",
      "clock",
      "timer",
      "star",
      "sparkles",
      "check",
      "check-circle",
      "coffee",
    ],
  },
  {
    title: "Lifestyle / moments",
    names: ["users", "flag", "monitor", "briefcase", "gamepad", "wine", "card"],
  },
  {
    title: "Comparison / proof",
    names: [
      "search",
      "gauge",
      "lightbulb",
      "activity",
      "volume",
      "trending",
      "scale",
      "book",
    ],
  },
  {
    title: "Quality badges",
    names: ["microscope", "sprout", "wheat", "badge-check"],
  },
]

const allNames = Object.keys(iconMap) as (keyof typeof iconMap)[]
const totalCount = allNames.length

export default function IconSheetPage() {
  return (
    <main className="w-[min(calc(100%-32px),1200px)] md:w-[min(calc(100%-72px),1200px)] mx-auto py-[clamp(36px,6vw,72px)]">
      <header className="mb-10 max-w-[640px]">
        <span className="block mb-3 text-olive text-xs font-black tracking-[0.12em] uppercase">
          Reference
        </span>
        <h1 className="text-[clamp(40px,6vw,72px)] font-black leading-[0.98] mb-4">
          Icon Sheet
        </h1>
          <p className="text-ink/75 leading-relaxed">
            Every icon used across the AVRO site. {totalCount} symbols, all from{" "}
            <code className="px-1.5 py-0.5 bg-soft rounded text-[13px]">
              lucide-react
            </code>
            , rendered through the shared{" "}
            <code className="px-1.5 py-0.5 bg-soft rounded text-[13px]">
              {"<Icon name=\"…\" />"}
            </code>{" "}
            component. The complete sheet ships with the project at{" "}
            <code className="px-1.5 py-0.5 bg-soft rounded text-[13px]">
              public/avro-icon-sheet.svg
            </code>{" "}
            — drag it straight into Figma as editable vectors.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/avro-icon-sheet.svg"
              download
              className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-white text-sm font-black rounded-full transition-colors hover:bg-olive-dark"
            >
              Download icon sheet (SVG)
            </a>
            <a
              href="/avro-icon-sheet.svg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-soft text-ink text-sm font-black rounded-full transition-colors hover:bg-line"
            >
              Open full sheet
            </a>
            <CopyAllIcons />
          </div>
      </header>

      {groups.map((group) => (
        <section key={group.title} className="mb-12">
          <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-line">
            <h2 className="text-[clamp(20px,2.4vw,28px)] font-black">
              {group.title}
            </h2>
            <span className="text-ink/55 text-xs font-bold tracking-wide uppercase">
              {group.names.length} icons
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {group.names.map((name) => (
              <IconCard key={name} name={name} />
            ))}
          </div>
        </section>
      ))}

      <section className="mt-16 p-6 border border-line rounded-lg bg-soft">
        <h2 className="text-[clamp(20px,2.4vw,28px)] font-black mb-3">
          Paste into Figma
        </h2>
        <ol className="list-decimal pl-5 mb-4 text-ink/80 text-sm leading-relaxed space-y-1">
          <li>Click <strong>Copy SVG</strong> on any icon above.</li>
          <li>Switch to your Figma file and press <kbd className="px-1.5 py-0.5 bg-base border border-line rounded text-[11px] font-bold">⌘ V</kbd> (or <kbd className="px-1.5 py-0.5 bg-base border border-line rounded text-[11px] font-bold">Ctrl V</kbd>).</li>
          <li>Figma converts the SVG to an editable vector layer at 24×24.</li>
        </ol>
        <h3 className="text-base font-black mb-2">Or use in code</h3>
        <pre className="overflow-x-auto p-4 bg-base border border-line rounded text-[13px] leading-relaxed">
          <code>{`import { Icon } from "@/components/icons"

<Icon name="leaf" className="w-5 h-5 text-olive" />`}</code>
        </pre>
      </section>
    </main>
  )
}
