import Image from "next/image"
import Link from "next/link"
import { Section, SectionHeading } from "@/components/sections"
import { AvroIcon, type AvroIconName } from "@/components/avro-icons"
import { ProductCard } from "@/components/product-visual"
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
/* Gold enso brush-circle accent (kept minimal, ~10% Japanese visual language). */
function HeroEnso({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" role="presentation">
      <path
        d="M84 22 C 104 36, 110 70, 92 92 C 72 116, 32 112, 16 86 C 2 64, 10 30, 38 18 C 52 12, 70 13, 82 21"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  )
}

function Hero() {
  return (
    <section className="os-hero-section">
      <style>{`
        @keyframes os-rise { 0% { opacity: 0; transform: translateY(24px); } 100% { opacity: 1; transform: translateY(0); } }
        .os-fade { opacity: 0; animation: os-rise 0.9s cubic-bezier(0.22,1,0.36,1) forwards; }
        .os-hero-section { width: 100%; background-color: var(--base); padding: 0; }
        .os-hero-card {
          position: relative;
          width: calc(100% - 32px);
          margin: 0 auto 16px;
          aspect-ratio: 16/9;
          overflow: hidden;
          border-radius: 20px;
          background-color: var(--base-light);
        }
        .os-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; }
        .os-hero-scrim {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(100deg,
            rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.74) 30%,
            rgba(255,255,255,0.34) 56%, rgba(255,255,255,0) 76%);
        }
        .os-hero-content {
          position: absolute; inset: 0;
          display: flex; flex-direction: column; justify-content: center;
          padding: clamp(28px,5vw,72px) clamp(20px,5vw,64px);
          max-width: 700px;
        }
        .os-hero-accents {
          position: absolute; top: clamp(24px,4vw,52px); right: clamp(24px,4vw,68px);
          display: flex; align-items: flex-start; gap: clamp(14px,1.6vw,22px);
        }
        .os-hero-vtext {
          writing-mode: vertical-rl; text-orientation: upright;
          font-size: clamp(14px,1.5vw,20px); letter-spacing: 0.18em;
          color: var(--ink); opacity: 0.7; font-weight: 500;
        }
        .os-hero-seal {
          display: flex; align-items: center; justify-content: center;
          width: clamp(22px,2.4vw,30px); height: clamp(22px,2.4vw,30px);
          border-radius: 4px; background-color: #b23b2e; color: #fff;
          font-size: clamp(11px,1.2vw,15px); font-weight: 700; line-height: 1;
        }
        .os-hero-label {
          position: absolute; left: clamp(20px,5vw,64px); bottom: clamp(14px,2.4vw,26px);
          font-weight: 800; letter-spacing: 0.14em; font-size: clamp(12px,1.1vw,14px);
          text-transform: uppercase; color: var(--ink);
        }
        .os-hero-img-mobile { display: none; }
        @media (max-width: 768px) {
          .os-hero-card {
            aspect-ratio: unset; overflow: visible; border-radius: 0;
            background: transparent; display: flex; flex-direction: column;
            width: calc(100% - 24px);
          }
          .os-hero-img-wrap {
            position: relative; width: 100%; margin: 12px auto 0;
            aspect-ratio: 4/3; border-radius: 20px; overflow: hidden; flex-shrink: 0;
          }
          .os-hero-scrim, .os-hero-accents, .os-hero-label { display: none !important; }
          .os-hero-content { position: static; padding: 24px 8px 24px; max-width: none; }
        }
        @media (min-width: 769px) {
          .os-hero-img-wrap { position: absolute; inset: 0; }
        }
      `}</style>

      <div className="os-hero-card">
        <div className="os-hero-img-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/lifestyle/journal-coffee-window.jpg"
            alt="A calm, composed moment before a demanding day begins."
            className="os-hero-img"
          />
        </div>

        <div className="os-hero-scrim" aria-hidden="true" />

        {/* Japanese accents — enso, vertical phrase, red seal */}
        <div className="os-hero-accents os-fade" style={{ animationDelay: "0.4s" }} aria-hidden="true">
          <HeroEnso className="w-[clamp(48px,6vw,84px)] h-auto" />
          <span className="os-hero-vtext">良い一日を積み重ねること。</span>
          <span className="os-hero-seal">静</span>
        </div>

        <div className="os-hero-content">
          {/* Breadcrumb */}
          <nav
            className="os-fade flex items-center gap-2 text-[11px] md:text-[12px] font-bold tracking-[0.12em] uppercase text-ink/55 mb-5"
            aria-label="Breadcrumb"
            style={{ animationDelay: "0.05s" }}
          >
            <Link href="/" className="hover:text-ink transition-colors">
              Home
            </Link>
            <span aria-hidden="true">›</span>
            <span className="text-ink/80">Our Story</span>
          </nav>

          {/* Gold eyebrow */}
          <span
            className="os-fade text-[var(--gold)] text-[clamp(12px,1.1vw,14px)] font-bold tracking-[0.16em] uppercase mb-3"
            style={{ animationDelay: "0.12s" }}
          >
            Our Story
          </span>

          {/* Two-tone serif headline */}
          <h1 className="font-serif font-black leading-[1.04] tracking-[-0.02em] text-[clamp(26px,3.3vw,44px)] text-balance">
            <span className="os-fade block text-ink" style={{ animationDelay: "0.2s" }}>
              Calm is not the opposite of performance.
            </span>
            <span className="os-fade block text-[var(--gold)] mt-1" style={{ animationDelay: "0.34s" }}>
              It is where performance begins.
            </span>
          </h1>

          {/* Gold divider */}
          <span
            className="os-fade block h-[3px] w-14 bg-[var(--gold)] rounded-full mt-6 mb-5"
            style={{ animationDelay: "0.5s" }}
            aria-hidden="true"
          />

          {/* Body copy */}
          <div
            className="os-fade flex flex-col gap-3 max-w-[440px] text-ink/75 text-[clamp(14px,1.15vw,16px)] leading-relaxed font-medium"
            style={{ animationDelay: "0.58s" }}
          >
            <p>
              {
                "Many of life's most important moments don't require more stimulation. They require us to become calmer, clearer and more composed."
              }
            </p>
            <p>
              AVRO is creating Calm Performance for people who want to bring the right headspace to the
              moments that matter.*
            </p>
          </div>

          {/* CTAs */}
          <div className="os-fade flex flex-wrap gap-3 mt-8" style={{ animationDelay: "0.7s" }}>
            <Link href="/shop" className="btn-primary">
              Find Your Formula
            </Link>
            <Link href="/science" className="btn-secondary">
              Explore the Science
            </Link>
          </div>
        </div>

        <span className="os-hero-label os-fade" style={{ animationDelay: "0.8s" }}>
          A Better Headspace
        </span>
      </div>
    </section>
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
    bio: [
      "Keigo grew up in Japan and studied applied microbiology and fermentation science at the University of Tokyo.",
      "His background shaped his respect for ingredients, scientific discipline and the role fermentation can play in creating thoughtful, functional products.",
    ],
  },
  {
    name: "Peter van Stolk",
    role: "Co-Founder & CMO",
    image: "/images/team/peter.jpg",
    bio: [
      "Peter brought decades of experience building consumer brands and challenging established categories.",
      "He saw that AVRO could introduce a new way of thinking about how people prepare for demanding moments.",
    ],
  },
]

/* Small gold monogram ornament for the center divider — two interlocking
   rounded diamonds suggesting union ("one shared belief"). */
function FounderMonogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" role="presentation">
      <g fill="none" stroke="var(--gold)" strokeWidth="1.75" strokeLinejoin="round">
        <rect x="9" y="9" width="22" height="22" rx="4" transform="rotate(45 20 20)" />
        <rect x="17" y="17" width="22" height="22" rx="4" transform="rotate(45 28 28)" />
      </g>
    </svg>
  )
}

function FounderPhoto({ founder }: { founder: (typeof founders)[number] }) {
  return (
    <div className="relative aspect-[3/4] w-full rounded-[18px] overflow-hidden bg-soft">
      <Image
        src={founder.image}
        alt={`${founder.name}, ${founder.role} of AVRO`}
        fill
        sizes="(min-width: 1024px) 240px, (min-width: 640px) 40vw, 80vw"
        className="object-cover object-top"
      />
    </div>
  )
}

function FounderText({ founder }: { founder: (typeof founders)[number] }) {
  return (
    <div className="flex flex-col">
      <h3 className="font-serif font-black text-[clamp(20px,2.1vw,26px)] leading-tight text-ink">
        {founder.name}
      </h3>
      <p className="text-[var(--gold)] text-[clamp(13px,1.05vw,15px)] font-bold mt-1 mb-4">{founder.role}</p>
      <div className="flex flex-col gap-3.5 text-ink/75 text-[clamp(14px,1.1vw,16px)] leading-relaxed font-medium">
        {founder.bio.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  )
}

function FoundersSection() {
  const [keigo, peter] = founders
  return (
    <Section>
      <div className="text-center max-w-[820px] mx-auto mb-[clamp(32px,4.5vw,56px)]">
        <h2 className="font-serif font-black text-[clamp(26px,3.4vw,42px)] leading-[1.08] text-ink text-balance">
          Two Founders. One Shared Belief.
        </h2>
      </div>

      {/* Symmetric editorial layout: photo · text · divider · text · photo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(170px,210px)_1fr_auto_1fr_minmax(170px,210px)] gap-x-[clamp(20px,2.6vw,40px)] gap-y-8 items-center max-w-[1200px] mx-auto">
        {/* Keigo */}
        <div className="hidden lg:block">
          <FounderPhoto founder={keigo} />
        </div>
        <div className="flex flex-col sm:flex-row lg:flex-col gap-5 md:gap-6 lg:gap-0">
          <div className="w-full sm:w-[200px] lg:hidden shrink-0">
            <FounderPhoto founder={keigo} />
          </div>
          <FounderText founder={keigo} />
        </div>

        {/* Center divider + monogram */}
        <div className="hidden lg:flex flex-col items-center self-stretch py-2">
          <span className="flex-1 w-px bg-[var(--ink)]/[0.12]" />
          <FounderMonogram className="w-9 h-9 my-4" />
          <span className="flex-1 w-px bg-[var(--ink)]/[0.12]" />
        </div>

        {/* Peter */}
        <div className="flex flex-col sm:flex-row-reverse lg:flex-col gap-5 md:gap-6 lg:gap-0">
          <div className="w-full sm:w-[200px] lg:hidden shrink-0">
            <FounderPhoto founder={peter} />
          </div>
          <FounderText founder={peter} />
        </div>
        <div className="hidden lg:block">
          <FounderPhoto founder={peter} />
        </div>
      </div>

      {/* Shared two-line quote */}
      <blockquote className="mt-[clamp(36px,5vw,60px)] max-w-[820px] mx-auto text-center">
        <p className="font-serif font-black text-[clamp(19px,2.4vw,30px)] leading-[1.2] text-balance">
          <span className="text-ink">People don&apos;t always need more stimulation.</span>
          <br />
          <span className="text-[var(--gold)]">Sometimes they need a better headspace.</span>
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
    <section className="w-full bg-[var(--base-light)]">
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(52px,7vw,86px)]">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-[clamp(32px,4vw,64px)] items-center">
          {/* Left: heading, copy + CTA */}
          <div className="flex flex-col">
            <h2 className="font-serif font-black text-[clamp(26px,3.4vw,42px)] leading-[1.08] text-ink mb-5 text-balance">
              Japanese Science. Modern Performance.
            </h2>
            <div className="flex flex-col gap-4 text-ink/75 text-[clamp(15px,1.3vw,17px)] leading-relaxed font-medium">
              <p>Every AVRO formula begins with naturally fermented PharmaGABA®.*</p>
              <p>
                {
                  "This calm-first foundation connects AVRO's Japanese scientific roots with its modern purpose: supporting the headspace you want for what comes next."
                }
              </p>
            </div>
            <div className="mt-8">
              <Link href="/science" className="btn-secondary">
                Explore the Science
              </Link>
            </div>
          </div>

          {/* Right: three product cards in the site style */}
          <div className="grid grid-cols-3 gap-[clamp(10px,1.6vw,20px)]">
            {productTrio.map((p) => (
              <Link
                key={p.name}
                href={p.href}
                className="group flex flex-col gap-4 rounded-[24px] bg-base-light p-[clamp(12px,1.6vw,24px)] transition-all hover:-translate-y-0.5"
              >
                <div
                  className="relative flex items-center justify-center overflow-hidden rounded-[20px]"
                  style={{ backgroundColor: "var(--bone)", aspectRatio: "1 / 1" }}
                >
                  <ProductCard formulaKey={p.formulaKey} className="h-full w-full object-cover" />
                </div>
                <p className="text-ink/70 text-[clamp(12px,1vw,14px)] leading-relaxed font-medium text-balance text-center px-1">
                  {p.copy}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---- 6. BUILT FOR REAL LIFE -------------------------------------------------- */
function RealLifeSection() {
  return (
    <section className="w-full">
      <div className="grid lg:grid-cols-2 items-stretch">
        {/* Full-bleed lifestyle image */}
        <div className="relative min-h-[280px] lg:min-h-[560px] order-first">
          <Image
            src="/images/lifestyle/journal-coffee-window.jpg"
            alt="A calm, considered moment before a demanding day begins."
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Copy + CTA */}
        <div className="flex flex-col justify-center bg-[var(--base-light)] px-[clamp(20px,5vw,72px)] py-[clamp(40px,6vw,80px)]">
          <div className="max-w-[560px]">
            <h2 className="font-serif font-black text-[clamp(26px,3.4vw,42px)] leading-[1.08] text-ink mb-5 text-balance">
              Built for Real Life
            </h2>
            <div className="flex flex-col gap-4 text-ink/75 text-[clamp(15px,1.3vw,17px)] leading-relaxed font-medium">
              <p>AVRO is for anyone who cares about how they show up.</p>
              <p>
                Before an important meeting. During a demanding workday. On the first tee. Before a difficult
                conversation. While preparing to create, compete, lead or decide.
              </p>
              <p>These moments may look different, but they ask the same question:</p>
              <p className="font-serif font-black text-[clamp(18px,2vw,24px)] leading-snug text-[var(--gold)]">
                What headspace are you bringing with you?
              </p>
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
