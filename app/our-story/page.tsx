import Image from "next/image"
import Link from "next/link"
import { Section, SectionHeading } from "@/components/sections"
import { AvroIcon, type AvroIconName } from "@/components/avro-icons"
import { ProductCard } from "@/components/product-visual"
import { PageHero } from "@/components/page-hero"
import type { FormulaKey } from "@/lib/data"

export const metadata = {
  title: "Our Story | AVRO",
  description:
    "Calm is not the opposite of performance — it is where performance begins. AVRO pairs Japanese scientific roots and the spirit of Ikigai with modern Calm Performance.",
}

/* ----------------------------------------------------------------------------
   Ikigai Venn — the four classic overlapping circles ("what you love", "what
   the world needs", "what you can be paid for", "what you are good at") meeting
   at a calm navy center lens that reads IKIGAI. Circles breathe very gently so
   the graphic has quiet life while the labels stay perfectly legible.
---------------------------------------------------------------------------- */
function IkigaiVenn({ className }: { className?: string }) {
  // 280 x 280 canvas, center 140,140. Four large overlapping circles (r 78)
  // with their labels set INSIDE each circle, pushed toward the outer edge.
  const circles = [
    { cx: 140, cy: 78, fill: "var(--avro-blue)" }, // top
    { cx: 78, cy: 140, fill: "var(--avro-blue-deep)" }, // left
    { cx: 202, cy: 140, fill: "var(--gold)" }, // right
    { cx: 140, cy: 202, fill: "var(--olive)" }, // bottom
  ]
  const labels = [
    { x: 140, y: 50, lines: ["What you", "love"] }, // top
    { x: 60, y: 134, lines: ["What you are", "good at"] }, // left
    { x: 220, y: 134, lines: ["What the world", "needs"] }, // right
    { x: 140, y: 222, lines: ["What you can be", "paid for"] }, // bottom
  ]
  return (
    <svg
      viewBox="0 0 280 280"
      className={className}
      role="img"
      aria-label="The Ikigai Venn diagram: what you love, what you are good at, what the world needs, and what you can be paid for — meeting at your Ikigai."
    >
      <style>{`
        @keyframes ikv-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.012); }
        }
        .ikv-circles { transform-origin: 140px 140px; animation: ikv-breathe 9s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .ikv-circles { animation: none; } }
      `}</style>

      <defs>
        <linearGradient id="ikv-center" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06336f" />
          <stop offset="100%" stopColor="#001f4a" />
        </linearGradient>
        {circles.map((c, i) => (
          <radialGradient key={i} id={`ikv-fill-${i}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={c.fill} stopOpacity="0.02" />
            <stop offset="62%" stopColor={c.fill} stopOpacity="0.05" />
            <stop offset="100%" stopColor={c.fill} stopOpacity="0.22" />
          </radialGradient>
        ))}
      </defs>

      {/* four overlapping circles with a soft edge fade */}
      <g className="ikv-circles">
        {circles.map((c, i) => (
          <circle
            key={i}
            cx={c.cx}
            cy={c.cy}
            r="78"
            fill={`url(#ikv-fill-${i})`}
            stroke={c.fill}
            strokeOpacity="0.4"
            strokeWidth="1.75"
          />
        ))}
      </g>

      {/* labels inside each circle */}
      {labels.map((l, i) => (
        <text
          key={i}
          x={l.x}
          y={l.y}
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          letterSpacing="-0.01em"
          fill="var(--ink)"
          fillOpacity="0.88"
          style={{ fontFamily: "var(--font-sans, system-ui)" }}
        >
          {l.lines.map((line, j) => (
            <tspan key={j} x={l.x} dy={j === 0 ? 0 : 13}>
              {line}
            </tspan>
          ))}
        </text>
      ))}

      {/* center navy lens where all four overlap */}
      <ellipse cx="140" cy="140" rx="30" ry="40" fill="url(#ikv-center)" />
      <text
        x="140"
        y="145"
        textAnchor="middle"
        fontSize="15"
        fontWeight="800"
        letterSpacing="0.05em"
        fill="#ffffff"
        style={{ fontFamily: "var(--font-sans, system-ui)" }}
      >
        IKIGAI
      </text>
    </svg>
  )
}

/* ---- 1. HERO ---------------------------------------------------------------- */
function Hero() {
  return (
    <PageHero
      variant="flat"
      title="Calm is not the opposite of performance. It is where performance begins."
      lede="Many of life's most important moments do not require more stimulation — they require us to become calmer, clearer and more composed. AVRO is creating Calm Performance for people who want to bring the right headspace to the moments that matter."
      imageSrc=""
      imageAlt=""
      primaryCta={{ href: "/shop", label: "Find Your Formula" }}
      secondaryCta={{ href: "/science", label: "Explore the Science" }}
    />
  )
}

/* ---- 2. A BETTER HEADSPACE --------------------------------------------------- */
const useCases: { label: string; icon: AvroIconName }[] = [
  { label: "Important conversations", icon: "social-composure" },
  { label: "Demanding workdays", icon: "cohort-tech" },
  { label: "Competitive moments", icon: "cohort-golf" },
  { label: "Training and workouts", icon: "control-under-pressure" },
  { label: "Presentations and decisions", icon: "supports-clear-thinking" },
]

function HeadspaceSection() {
  return (
    <Section>
      <div className="max-w-[820px] mb-[clamp(32px,4vw,52px)]">
        <h2 className="font-serif font-black text-[clamp(28px,4vw,48px)] leading-[1.06] text-ink mb-5 text-balance">
          A Better Headspace for What Comes Next
        </h2>
        <div className="flex flex-col gap-4 text-ink/75 text-[clamp(16px,1.3vw,18px)] leading-relaxed font-medium">
          <p>Pressure is part of life. The goal is not to eliminate it. The goal is to meet it well.</p>
          <p>
            To respond instead of react. To stay clear when the environment becomes noisy. To remain
            composed when the stakes rise.
          </p>
          <p>AVRO supports the calm, clear and composed headspace people want when pressure rises.*</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10 max-w-[1100px]">
        {useCases.map((u) => (
          <div key={u.label} className="flex flex-col items-center text-center gap-3.5">
            <AvroIcon name={u.icon} size={56} className="md:w-16 md:h-16" />
            <span className="font-bold text-[clamp(13px,1.05vw,15px)] leading-snug text-ink text-balance">
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ---- 3. IKIGAI + JAPANESE INFLUENCE ----------------------------------------- */
const principles: { term: string; copy: string; icon: AvroIconName }[] = [
  { term: "Ikigai", copy: "A sense of meaning that gives direction to everyday life.", icon: "mind" },
  {
    term: "Kaizen",
    copy: "Meaningful improvement through consistent, thoughtful progress.",
    icon: "consistency-quality",
  },
  {
    term: "Kodawari",
    copy: "A commitment to quality, craft and the details others may overlook.",
    icon: "quality-standards",
  },
]

function IkigaiSection() {
  return (
    <section className="w-full bg-[var(--base-light)]">
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(52px,7vw,86px)]">
        <div className="grid lg:grid-cols-[1fr_1.05fr_1fr] gap-[clamp(32px,4vw,64px)] items-center">
          {/* Left: heading, explanation + pull quote */}
          <div className="flex flex-col">
            <h2 className="font-serif font-black text-[clamp(24px,2.6vw,34px)] leading-[1.08] text-ink mb-5 text-balance">
              Inspired by Ikigai
            </h2>
            <div className="flex flex-col gap-4 text-ink/75 text-[clamp(15px,1.15vw,16px)] leading-relaxed font-medium">
              <p>
                Ikigai is often described as the reason you get up in the morning — the people, activities,
                responsibilities and ambitions that give your life meaning.
              </p>
              <p>
                It does not need to be one grand purpose. It can be the work you care about, the people who
                rely on you, the challenge you are preparing to meet or the everyday moments that make life
                worthwhile.
              </p>
              <p className="text-ink font-bold">Your Ikigai is personal.</p>
              <p>
                AVRO does not define it for you. We simply believe the headspace you bring to it matters.
              </p>
            </div>
            <blockquote className="mt-7">
              <p className="font-serif font-black text-[clamp(19px,1.9vw,24px)] leading-[1.18] text-[var(--gold)] text-balance">
                Your purpose is yours.
                <br /> Meet it with composure.
              </p>
            </blockquote>
          </div>

          {/* Center: the classic, labelled Ikigai Venn diagram */}
          <div className="flex items-center justify-center py-4 lg:py-0">
            <IkigaiVenn className="w-[clamp(280px,32vw,400px)] h-auto" />
          </div>

          {/* Right: A Japanese Influence — icon-led principles */}
          <div className="flex flex-col">
            <h2 className="font-serif font-black text-[clamp(24px,2.6vw,34px)] leading-[1.08] text-ink mb-5 text-balance">
              A Japanese Influence
            </h2>
            <p className="text-ink/75 text-[clamp(15px,1.15vw,16px)] leading-relaxed font-medium mb-7">
              AVRO is shaped by ideas that have long influenced Japanese culture and craftsmanship.
            </p>
            <ul className="flex flex-col gap-6">
              {principles.map((p) => (
                <li key={p.term} className="flex items-start gap-4">
                  <AvroIcon name={p.icon} size={56} className="shrink-0 -mt-1 md:w-16 md:h-16" />
                  <div>
                    <h3 className="font-black text-[clamp(14px,1.1vw,16px)] tracking-[0.04em] uppercase text-ink mb-1">
                      {p.term}
                    </h3>
                    <p className="text-ink/70 text-[clamp(14px,1.1vw,16px)] leading-relaxed font-medium">
                      {p.copy}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---- 4. FOUNDERS ------------------------------------------------------------- */
const founders = [
  {
    name: "Keigo Sugawara",
    role: "Co-Founder & CEO",
    image: "/images/team/keigo.jpg",
    bio: "Keigo grew up in Japan and studied applied microbiology and fermentation science at the University of Tokyo. His background shaped his respect for ingredients, scientific discipline and the role fermentation can play in creating thoughtful, functional products.",
  },
  {
    name: "Peter van Stolk",
    role: "Co-Founder & CMO",
    image: "/images/team/peter.jpg",
    bio: "Peter brought decades of experience building consumer brands and challenging established categories. He saw that AVRO could introduce a new way of thinking about how people prepare for demanding moments.",
  },
]

function FoundersSection() {
  return (
    <Section>
      <div className="max-w-[820px] mb-[clamp(28px,3.5vw,44px)]">
        <h2 className="font-serif font-black text-[clamp(28px,4vw,48px)] leading-[1.06] text-ink text-balance">
          Two Founders. One Shared Belief.
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-[1040px] mx-auto">
        {founders.map((f) => (
          <article
            key={f.name}
            className="flex flex-col rounded-[24px] bg-base-light border border-[var(--ink)]/[0.06] overflow-hidden"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={f.image}
                alt={`${f.name}, ${f.role} of AVRO`}
                fill
                sizes="(min-width: 640px) 510px, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="p-[clamp(22px,2.8vw,34px)]">
              <h3 className="font-serif font-black text-[clamp(20px,2.1vw,26px)] leading-tight text-ink">
                {f.name}
              </h3>
              <p className="text-ink/55 text-[12px] md:text-[13px] font-bold tracking-[0.04em] uppercase mt-1 mb-3.5">
                {f.role}
              </p>
              <p className="text-ink/75 text-[clamp(14px,1.1vw,16px)] leading-relaxed font-medium">{f.bio}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Shared quote */}
      <blockquote className="mt-[clamp(32px,4vw,48px)] max-w-[820px] mx-auto text-center">
        <p className="font-serif font-black text-[clamp(19px,2.4vw,30px)] leading-[1.18] text-ink text-balance">
          {'"People do not always need more stimulation. Sometimes they need a better headspace."'}
        </p>
      </blockquote>
    </Section>
  )
}

/* ---- 5. SCIENCE + PRODUCT ---------------------------------------------------- */
const productTrio: { name: string; copy: string; formulaKey: FormulaKey; href: string }[] = [
  {
    name: "AVRO Calm",
    copy: "For moments when composure comes first.*",
    formulaKey: "calm",
    href: "/calm",
  },
  {
    name: "AVRO Focus",
    copy: "For moments that call for sustained attention and clarity.*",
    formulaKey: "focus",
    href: "/focus",
  },
  {
    name: "AVRO Energy",
    copy: "For moments when you want steady energy while maintaining a sense of control.*",
    formulaKey: "energy",
    href: "/energy",
  },
]

function ScienceSection() {
  return (
    <Section>
      <div className="max-w-[820px] mb-[clamp(32px,4vw,52px)]">
        <h2 className="font-serif font-black text-[clamp(28px,4vw,48px)] leading-[1.06] text-ink mb-5 text-balance">
          Japanese Science. Modern Performance.
        </h2>
        <div className="flex flex-col gap-4 text-ink/75 text-[clamp(16px,1.3vw,18px)] leading-relaxed font-medium">
          <p>Every AVRO formula begins with naturally fermented PharmaGABA®.*</p>
          <p>
            {
              "This calm-first foundation connects AVRO's Japanese scientific roots with its modern purpose: supporting the headspace people want for what comes next."
            }
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-[1100px] mx-auto">
        {productTrio.map((p) => (
          <Link
            key={p.name}
            href={p.href}
            className="group flex flex-col gap-4 rounded-[24px] bg-base-light border border-[var(--ink)]/[0.06] p-[clamp(20px,2.4vw,32px)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_72px_rgba(28,27,20,0.09)]"
          >
            <div
              className="relative flex items-center justify-center overflow-hidden aspect-square rounded-[16px]"
              style={{ backgroundColor: "var(--bone)" }}
            >
              <ProductCard
                formulaKey={p.formulaKey}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <h3 className="font-serif font-black text-[clamp(20px,2vw,26px)] text-ink">{p.name}</h3>
            <p className="text-ink/70 text-[clamp(14px,1.1vw,16px)] leading-relaxed font-medium">{p.copy}</p>
          </Link>
        ))}
      </div>

      <div className="mt-[clamp(28px,3vw,40px)] flex justify-center">
        <Link href="/science" className="btn-secondary">
          Explore the Science
        </Link>
      </div>
    </Section>
  )
}

/* ---- 6. BUILT FOR REAL LIFE -------------------------------------------------- */
function RealLifeSection() {
  return (
    <section className="w-full bg-[var(--base-light)]">
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(52px,7vw,86px)]">
        <div className="grid lg:grid-cols-2 gap-[clamp(28px,4vw,56px)] items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden bg-soft order-last lg:order-first">
            <Image
              src="/images/lifestyle/woman-journaling-mug.jpg"
              alt="A calm, considered moment in an everyday routine."
              fill
              sizes="(min-width: 1024px) 620px, 100vw"
              className="object-cover"
            />
          </div>

          {/* Copy + CTA */}
          <div className="flex flex-col">
            <h2 className="font-serif font-black text-[clamp(28px,4vw,48px)] leading-[1.06] text-ink mb-5 text-balance">
              Built for Real Life
            </h2>
            <div className="flex flex-col gap-4 text-ink/75 text-[clamp(15px,1.3vw,18px)] leading-relaxed font-medium">
              <p>AVRO is for anyone who cares about how they show up.</p>
              <p>
                Before an important meeting. During a demanding workday. On the first tee. Before a difficult
                conversation. While preparing to create, compete, lead or decide.
              </p>
              <p>These moments may look different, but they ask the same question:</p>
              <p className="text-ink font-bold">What headspace are you bringing with you?</p>
              <p>AVRO is designed to support calm, clarity and composure when the answer matters.*</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="btn-primary">
                Find Your Formula
              </Link>
              <Link href="/why-avro" className="btn-secondary">
                Why AVRO
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---- TEAM (kept from existing approved team content) ------------------------- */
const team = [
  { name: "Keigo Sugawara", role: "Co-Founder & CEO", image: "/images/team/keigo.jpg" },
  { name: "Peter van Stolk", role: "Co-Founder & CMO", image: "/images/team/peter.jpg" },
  { name: "Holly Weber", role: "Partnerships & Customer Success Manager", image: "/images/team/holly.jpg" },
  { name: "Marianne Lyles", role: "Growth & Marketing Director", image: "/images/team/marianne.jpg" },
]

function TeamSection() {
  return (
    <Section id="team">
      <SectionHeading title="The people behind AVRO." />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 md:gap-6 max-w-[1100px] mx-auto">
        {team.map((member) => (
          <div key={member.name} className="flex flex-col gap-3">
            <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden bg-soft">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover object-top"
              />
            </div>
            <div>
              <p className="font-black text-[13px] md:text-sm leading-tight">{member.name}</p>
              <p className="text-ink/55 text-[11px] md:text-[13px] mt-0.5 font-medium tracking-wide">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default function OurStoryPage() {
  return (
    <>
      <Hero />
      <HeadspaceSection />
      <IkigaiSection />
      <FoundersSection />
      <ScienceSection />
      <RealLifeSection />
      <TeamSection />
    </>
  )
}
