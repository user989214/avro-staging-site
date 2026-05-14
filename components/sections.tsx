import Link from "next/link"
import { cn } from "@/lib/utils"
import { formulas, sharedProof, testimonials, type FormulaKey } from "@/lib/data"
import { Icon, type IconName } from "@/components/icons"
import { ProductVisual } from "@/components/product-visual"

interface SectionProps {
  children: React.ReactNode
  className?: string
}

export function Section({ children, className }: SectionProps) {
  return (
    <section
      className={cn(
        "w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(52px,7vw,86px)] border-b border-line",
        className
      )}
    >
      {children}
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = true,
}: {
  eyebrow?: string
  title: string
  description?: string
  centered?: boolean
}) {
  return (
    <div
      className={cn(
        "max-w-[900px] mb-8.5",
        centered && "mx-auto text-center"
      )}
    >
      {eyebrow && (
        <span className="block mb-3 text-olive text-xs font-black tracking-[0.12em] uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif font-black text-[clamp(30px,4vw,52px)] leading-[1.05] mb-3.5">
        {title}
      </h2>
      {description && (
        <p className="max-w-[760px] mx-auto text-muted text-base leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}

export function CtaGroup({
  primary = "Shop AVRO",
  secondary = "Find Your Formula",
}: {
  primary?: string
  secondary?: string
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 mt-6.5">
      <Link href="/shop" className="btn-primary">
        {primary}
      </Link>
      <Link href="/shop" className="btn-secondary">
        {secondary}
      </Link>
    </div>
  )
}

export function SocialProof({ mode = "full" }: { mode?: "full" | "compact" }) {
  return (
    <Section className="bg-white">
      <SectionHeading
        eyebrow="Customer testimonials + social proof"
        title="Trusted for calm-first routines."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 overflow-hidden border border-line rounded-lg">
        {sharedProof.map((item, i) => (
          <div
            key={item.label}
            className={cn(
              "flex flex-col gap-1.5 p-7 text-center bg-white",
              i > 0 && "border-t md:border-t-0 md:border-l border-line"
            )}
          >
            <strong className="text-[32px] font-black">{item.stat}</strong>
            <span className="text-muted">{item.label}</span>
          </div>
        ))}
      </div>

      {mode === "full" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 mt-4.5">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="p-6.5 bg-white/72 border border-line rounded-lg shadow-[0_10px_30px_rgba(31,29,24,0.04)]"
            >
              <p className="font-serif text-[22px] leading-[1.3] text-ink mb-3">
                &ldquo;{item.quote}&rdquo;
              </p>
              <strong className="block text-ink">{item.name}</strong>
              <span className="block mt-1 text-olive text-xs font-black tracking-[0.1em] uppercase">
                {item.role}
              </span>
            </article>
          ))}
        </div>
      )}
    </Section>
  )
}

export function ProductCards({
  title = "Choose your AVRO formula",
  shopLabel = "Shop",
}: {
  title?: string
  shopLabel?: string
}) {
  return (
    <Section>
      <SectionHeading
        eyebrow="Three formulas. One foundation."
        title={title}
        description="Every AVRO formula starts with the same calm-first base, then supports the moment in a different way."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5.5">
        {(Object.keys(formulas) as FormulaKey[]).map((key) => {
          const item = formulas[key]
          return (
            <article
              key={key}
              className="grid content-start gap-3.5 p-6 bg-white/72 border border-line rounded-lg shadow-[0_10px_30px_rgba(31,29,24,0.04)]"
            >
              <div className="min-h-[280px] p-2.5 pt-4.5 pb-6.5 bg-gradient-to-br from-white to-[#f7f3eb] rounded-lg flex items-end justify-center">
                <div className="relative">
                  <div className="absolute inset-x-[-10%] bottom-0 h-12 rounded-lg bg-gradient-to-br from-white/78 to-[rgba(204,196,179,0.35)] -z-10" />
                  <ProductCard formulaKey={key} />
                </div>
              </div>
              <h3 className="font-black text-lg">{item.name}</h3>
              <p className="text-muted">{item.support}</p>
              <dl className="grid gap-2.5 pt-3 border-t border-line">
                <div>
                  <dt className="font-black text-ink">Best for</dt>
                  <dd className="mt-1 text-muted leading-[1.45]">
                    {item.bestFor}
                  </dd>
                </div>
                <div>
                  <dt className="font-black text-ink">Caffeine</dt>
                  <dd className="mt-1 text-muted leading-[1.45]">
                    {item.caffeine}
                  </dd>
                </div>
              </dl>
              <Link
                href={`/${key}`}
                className={cn("btn-primary w-full", {
                  "!bg-calm": key === "calm",
                  "!bg-focus": key === "focus",
                  "!bg-energy !text-ink": key === "energy",
                })}
              >
                {shopLabel} {item.short}
              </Link>
            </article>
          )
        })}
      </div>
    </Section>
  )
}

function ProductCard({ formulaKey }: { formulaKey: FormulaKey }) {
  const item = formulas[formulaKey]
  return (
    <div
      className="relative grid place-items-center content-center px-2.5 py-4.5 text-white rounded-t-3xl rounded-b-2xl overflow-hidden w-[82px] h-[230px] shadow-[0_22px_42px_rgba(30,24,20,0.2)]"
      style={{
        background: `linear-gradient(90deg, rgba(0,0,0,0.28), transparent 22%, rgba(255,255,255,0.22) 50%, transparent 78%, rgba(0,0,0,0.24)), ${item.color}`,
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-4 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.18)_0_3px,rgba(0,0,0,0.12)_3px_6px)]" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.18)_0_3px,rgba(0,0,0,0.12)_3px_6px)]" />
      <span className="absolute top-7 font-black tracking-[0.18em] uppercase text-xs">
        {item.short}
      </span>
      <strong
        className="font-serif text-3xl leading-none tracking-[0.08em]"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        AVRO
      </strong>
      <em className="absolute bottom-8 max-w-[70px] text-white/88 text-[9px] font-extrabold text-center uppercase not-italic">
        {item.flavor}
      </em>
    </div>
  )
}

export function FormulaLogic() {
  const cards: [string, string, IconName][] = [
    [
      "PharmaGABA®",
      "Naturally fermented PharmaGABA® is the calm-first foundation in every AVRO formula.",
      "leaf",
    ],
    [
      "Formula Logic",
      "Each formula builds from the same base, then adds targeted support for the moment.",
      "flask",
    ],
    [
      "Quality + Transparency",
      "Clear ingredient disclosure and quality standards, with documentation where applicable.",
      "shield",
    ],
    [
      "Calm First Foundation",
      "AVRO is designed to support state before stimulation.",
      "brain",
    ],
  ]

  return (
    <Section>
      <SectionHeading
        eyebrow="Science + formula logic"
        title="Calm first. Then support the moment."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
        {cards.map(([title, copy, iconName]) => (
          <InfoCard key={title} icon={iconName} title={title}>
            {copy}
          </InfoCard>
        ))}
      </div>
    </Section>
  )
}

export function InfoCard({
  icon,
  title,
  children,
  href,
}: {
  icon: IconName
  title: string
  children: React.ReactNode
  href?: string
}) {
  const content = (
    <>
      <Icon name={icon} className="w-10.5 h-10.5 mb-5 text-olive" />
      <h3 className="font-black mb-2">{title}</h3>
      <p className="text-muted text-base leading-relaxed">{children}</p>
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className="min-h-[180px] p-7 bg-white/72 border border-line rounded-lg shadow-[0_10px_30px_rgba(31,29,24,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_70px_rgba(30,29,24,0.1)]"
      >
        {content}
      </Link>
    )
  }

  return (
    <article className="min-h-[180px] p-7 bg-white/72 border border-line rounded-lg shadow-[0_10px_30px_rgba(31,29,24,0.04)]">
      {content}
    </article>
  )
}

export function FaqBlock({
  title,
  faqs,
}: {
  title: string
  faqs: [string, string][]
}) {
  return (
    <Section>
      <SectionHeading eyebrow="Questions" title={title} />
      <div className="grid gap-2 w-full max-w-[1080px] mx-auto">
        {faqs.map(([q, a]) => (
          <details
            key={q}
            className="bg-white border border-line rounded-[7px] group"
          >
            <summary className="flex justify-between gap-4 px-5.5 py-4.5 cursor-pointer font-extrabold select-none after:content-['+'] after:text-[22px] after:leading-none group-open:after:content-['-']">
              {q}
            </summary>
            <p className="px-5.5 pb-5 text-muted leading-relaxed">{a}</p>
          </details>
        ))}
      </div>
      <div className="mt-5.5 text-center">
        <Link href="/faq" className="btn-secondary">
          View All FAQs
        </Link>
      </div>
    </Section>
  )
}

export function FinalCta({
  title,
  copy,
  productButtons = true,
}: {
  title: string
  copy: string
  productButtons?: boolean
}) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-7 items-center w-[min(calc(100%-36px),1320px)] mx-auto my-8 p-[clamp(28px,5vw,44px)] text-white bg-[radial-gradient(circle_at_90%_12%,rgba(255,255,255,0.16),transparent_24%),linear-gradient(135deg,var(--olive),var(--olive-dark))] border border-line rounded-lg">
      <div>
        <span className="block mb-3 text-white text-xs font-black tracking-[0.12em] uppercase">
          Choose the formula that fits your moment.
        </span>
        <h2 className="font-serif font-black text-[clamp(30px,4vw,52px)] leading-[1.05] mb-3.5 text-white">
          {title}
        </h2>
        <p className="max-w-[620px] text-white">{copy}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {productButtons ? (
          <>
            <Link href="/calm" className="btn-primary !bg-calm">
              Shop Calm
            </Link>
            <Link href="/focus" className="btn-primary !bg-focus">
              Shop Focus
            </Link>
            <Link href="/energy" className="btn-primary !bg-energy !text-ink">
              Shop Energy
            </Link>
          </>
        ) : (
          <>
            <Link href="/shop" className="btn-primary">
              Shop AVRO
            </Link>
            <Link
              href="/contact"
              className="btn-secondary !text-white !border-white/70"
            >
              Contact Us
            </Link>
          </>
        )}
      </div>
    </section>
  )
}
