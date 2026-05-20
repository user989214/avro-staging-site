import type { Metadata } from "next"
import { Icon, iconMap } from "@/components/icons"

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
          component so stroke weight and proportions stay identical
          everywhere.
        </p>
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
              <figure
                key={name}
                className="flex flex-col items-center gap-3 p-5 border border-line rounded-lg bg-white/88 transition-colors hover:bg-soft"
              >
                <div className="grid place-items-center w-14 h-14 rounded-full bg-soft">
                  <Icon name={name} className="w-7 h-7 text-ink" />
                </div>
                <figcaption className="text-center">
                  <code className="text-[12px] font-bold text-ink break-all">
                    {name}
                  </code>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}

      <section className="mt-16 p-6 border border-line rounded-lg bg-soft">
        <h2 className="text-[clamp(20px,2.4vw,28px)] font-black mb-3">
          Usage
        </h2>
        <pre className="overflow-x-auto p-4 bg-white border border-line rounded text-[13px] leading-relaxed">
          <code>{`import { Icon } from "@/components/icons"

<Icon name="leaf" className="w-5 h-5 text-olive" />`}</code>
        </pre>
        <p className="mt-3 text-ink/70 text-sm leading-relaxed">
          Default size is{" "}
          <code className="px-1 bg-white rounded">w-6 h-6</code> with a{" "}
          <code className="px-1 bg-white rounded">strokeWidth</code> of 1.6.
          Override either via the <code>className</code> prop.
        </p>
      </section>
    </main>
  )
}
