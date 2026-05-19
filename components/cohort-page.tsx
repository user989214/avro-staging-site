import Link from "next/link"
import { formulas, type FormulaKey } from "@/lib/data"
import {
  Section,
  SectionHeading,
  CtaGroup,
  SocialProof,
  ProductCards,
  FormulaLogic,
  FaqBlock,
  FinalCta,
  InfoCard,
} from "@/components/sections"
import { Icon, type IconName } from "@/components/icons"

interface CohortData {
  eyebrow: string
  title: string
  copy: string
  visual: string
  primary: string
  secondary: string
  momentTitle: string
  momentCopy: string
  whyTitle: string
  reasons: [string, string][]
  chooseTitle: string
  howTitle: string
  stepMoment: string
  useTitle: string
  useMoments: [string, string][]
  shopTitle: string
  faqTitle: string
  faqs: [string, string][]
  finalTitle: string
  finalCopy: string
}

export function CohortPage({ data }: { data: CohortData }) {
  const visualBg = {
    golf: "bg-gradient-to-r from-[#fffdf8] from-[38%] to-[#eaf0df]",
    social: "bg-gradient-to-r from-[#fffdf8] from-[38%] to-[#faecd8]",
    work: "bg-gradient-to-r from-[#fffdf8] from-[38%] to-[#e9eff0]",
    gaming: "bg-gradient-to-r from-[#fffdf8] from-[38%] to-[#eeeaf7]",
  }[data.visual] || ""

  const sceneLabels = {
    golf: "First tee routine",
    social: "Alcohol-free ritual",
    work: "Deep work routine",
    gaming: "Pre-session ritual",
  }

  // Cohort-specific lifestyle hero photo
  const cohortHero: Record<string, { src: string; alt: string }> = {
    golf: {
      src: "/images/lifestyle/golf-cart-gloves-tee.jpg",
      alt: "Golf cart with gloves and tee laid out at first tee",
    },
    social: {
      src: "/images/lifestyle/kitchen-trio-pink-cocktails.jpg",
      alt: "Three pink alcohol-free AVRO cocktails styled in a kitchen",
    },
    work: {
      src: "/images/lifestyle/focus-desk-magenta-drink.jpg",
      alt: "Focus magenta drink at a sunlit work desk with notebook",
    },
    gaming: {
      src: "/images/lifestyle/focus-iced-drink-headphones.jpg",
      alt: "Iced AVRO drink and headphones on a gaming desk",
    },
  }

  // Cohort-specific tube image folder prefix mapping
  const tubeCohort: Record<string, string> = {
    golf: "tube-golf",
    social: "tube-social",
    work: "tube-tech",
    gaming: "tube-gaming",
  }

  const tubeImageFor = (key: FormulaKey) => {
    const prefix = tubeCohort[data.visual] ?? "tube-tech"
    const flavor = formulas[key].flavors[0]
    const slug = flavor.name.toLowerCase().replace(/\s+/g, "-")
    return {
      src: `/images/lifestyle/${prefix}-${key}-${slug}.png`,
      alt: `AVRO ${formulas[key].short} ${flavor.name} in ${data.visual} setting`,
    }
  }

  const chooseCopy: Record<FormulaKey, string> = {
    calm:
      data.visual === "social"
        ? "Evening, dinner, wind down, social calm."
        : data.visual === "work"
          ? "High-pressure meetings, travel days, evening work, and calm without caffeine."
          : data.visual === "gaming"
            ? "Late sessions, decompression, poker nights, social gaming, and calm without caffeine."
            : "First tee nerves, evening rounds, travel days, clubhouse social settings, and calm without caffeine.",
    focus:
      data.visual === "social"
        ? "Events, conversations, creative work, and social work settings."
        : data.visual === "work"
          ? "Deep work, coding sessions, writing, strategy work, and presentations without caffeine."
          : data.visual === "gaming"
            ? "Ranked play, online poker, long attention blocks, and competitive sessions without caffeine."
            : "Practice sessions, competitive rounds, tournament prep, and focus support without caffeine.",
    energy:
      data.visual === "social"
        ? "Daytime events, long gatherings, travel, and social days."
        : data.visual === "work"
          ? "Early mornings, long workdays, travel, conferences, and steady energy."
          : data.visual === "gaming"
            ? "Early sessions, long tournaments, travel days, and steady energy with calm built in."
            : "Early tee times, long rounds, travel days, and steady energy with calm built in.",
  }

  return (
    <>
      {/* Hero */}
      <section
        className={`relative grid grid-cols-1 lg:grid-cols-2 gap-[clamp(28px,6vw,80px)] items-center w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(42px,8vw,86px)] border-b border-line ${visualBg}`}
      >
        <div className="max-w-[620px]">
          <span className="block mb-3 text-olive text-xs font-black tracking-[0.12em] uppercase">
            {data.eyebrow}
          </span>
          <h1 className="font-serif font-black text-[clamp(46px,7vw,86px)] leading-[0.98] mb-5">
            {data.title}
          </h1>
          <p className="max-w-[560px] text-ink/80 text-[clamp(17px,2vw,20px)] leading-relaxed">
            {data.copy}
          </p>
          <CtaGroup primary={data.primary} secondary={data.secondary} />
        </div>
        <div className="relative grid place-items-stretch min-h-[420px] border border-line rounded-lg overflow-hidden bg-cover shadow-[0_22px_70px_rgba(30,29,24,0.1)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cohortHero[data.visual]?.src}
            alt={cohortHero[data.visual]?.alt ?? ""}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute left-5.5 bottom-5.5 z-20 px-3.5 py-2.5 text-white bg-[rgba(38,50,22,0.86)] rounded-[7px] font-black">
            {sceneLabels[data.visual as keyof typeof sceneLabels]}
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="The moment"
          title={data.momentTitle}
          description={data.momentCopy}
        />
      </Section>

      <Section>
        <SectionHeading title={data.whyTitle} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
          {data.reasons.map(([title, copy], index) => (
            <InfoCard
              key={title}
              icon={(["leaf", "brain", "clock"] as const)[index]}
              title={title}
            >
              {copy}
            </InfoCard>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Choose formula"
          title={data.chooseTitle}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5.5">
          {(Object.keys(formulas) as FormulaKey[]).map((key) => {
            const item = formulas[key]
            const tube = tubeImageFor(key)
            return (
              <article
                key={key}
                className="grid content-start gap-3.5 p-6 bg-white/72 border border-line rounded-lg shadow-[0_10px_30px_rgba(31,29,24,0.04)]"
              >
                <h3 className="font-black text-lg">{item.name}</h3>
                <div className="relative min-h-[240px] flex items-center justify-center bg-soft/60 border border-line rounded-md overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tube.src}
                    alt={tube.alt}
                    className="h-[220px] w-auto object-contain"
                  />
                </div>
                <p className="text-ink/75">{chooseCopy[key]}</p>
                <Link
                  href={`/${key}`}
                  className={`btn-primary w-full ${
                    key === "calm"
                      ? "!bg-calm"
                      : key === "focus"
                        ? "!bg-focus"
                        : "!bg-energy !text-ink"
                  }`}
                >
                  Choose {item.short}
                </Link>
              </article>
            )
          })}
        </div>
      </Section>

      {/* How to Use Steps */}
      <Section>
        <SectionHeading eyebrow="How to use" title={data.howTitle} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <article className="relative p-7 bg-white/72 border border-line rounded-lg shadow-[0_10px_30px_rgba(31,29,24,0.04)]">
            <strong className="grid place-items-center w-7.5 h-7.5 mb-4.5 text-white bg-olive rounded-full">
              1
            </strong>
            <Icon name="cup" className="w-10.5 h-10.5 mb-3 text-olive" />
            <h3 className="font-black text-lg mb-2">Mix</h3>
            <p className="text-ink/75">Mix one stick with water.</p>
          </article>
          <article className="relative p-7 bg-white/72 border border-line rounded-lg shadow-[0_10px_30px_rgba(31,29,24,0.04)]">
            <strong className="grid place-items-center w-7.5 h-7.5 mb-4.5 text-white bg-olive rounded-full">
              2
            </strong>
            <Icon name="clock" className="w-10.5 h-10.5 mb-3 text-olive" />
            <h3 className="font-black text-lg mb-2">Time it</h3>
            <p className="text-ink/75">
              Drink about 30 minutes before your {data.stepMoment}.
            </p>
          </article>
          <article className="relative p-7 bg-white/72 border border-line rounded-lg shadow-[0_10px_30px_rgba(31,29,24,0.04)]">
            <strong className="grid place-items-center w-7.5 h-7.5 mb-4.5 text-white bg-olive rounded-full">
              3
            </strong>
            <Icon name="leaf" className="w-10.5 h-10.5 mb-3 text-olive" />
            <h3 className="font-black text-lg mb-2">Show up</h3>
            <p className="text-ink/75">
              Step in with a calmer, clearer routine.
            </p>
          </article>
        </div>
      </Section>

      <FormulaLogic />

      {/* Use Moments */}
      <Section>
        <SectionHeading eyebrow="Use moments" title={data.useTitle} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
          {data.useMoments.map(([title, copy], index) => (
            <InfoCard
              key={title}
              icon={(["flag", "star", "target", "users"] as const)[index]}
              title={title}
            >
              {copy}
            </InfoCard>
          ))}
        </div>
      </Section>

      <ProductCards title={data.shopTitle} shopLabel="Shop" />
      <SocialProof mode="compact" />
      <FaqBlock title={data.faqTitle} faqs={data.faqs} />
      <FinalCta title={data.finalTitle} copy={data.finalCopy} />
    </>
  )
}
