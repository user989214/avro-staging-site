import Link from "next/link"
import { ProductVisual } from "@/components/product-visual"
import {
  Section,
  SectionHeading,
  CtaGroup,
  SocialProof,
  ProductCards,
  FormulaLogic,
  FinalCta,
  InfoCard,
} from "@/components/sections"
import { Icon } from "@/components/icons"

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-[minmax(280px,0.9fr)_minmax(320px,1.1fr)] gap-[clamp(28px,6vw,80px)] items-center w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(42px,8vw,86px)] min-h-[680px] bg-[radial-gradient(circle_at_22%_28%,rgba(255,255,255,0.8),transparent_28%),linear-gradient(105deg,#fffdf8_0%,#f4efe5_100%)] border-b border-line">
        <div className="max-w-[620px]">
          <span className="block mb-3 text-olive text-xs font-black tracking-[0.12em] uppercase">
            Calm-first performance
          </span>
          <h1 className="font-serif font-black text-[clamp(46px,7vw,86px)] leading-[0.98] mb-5">
            Performance starts with being calm.
          </h1>
          <p className="max-w-[560px] text-ink/80 text-[clamp(17px,2vw,20px)] leading-relaxed">
            AVRO is a calm-first daily drink mix made with naturally fermented
            PharmaGABA® to support composure, clarity, focus, and steady energy
            before pressure-sensitive moments.
          </p>
          <CtaGroup primary="Shop AVRO" secondary="Find Your Formula" />
          <div className="grid grid-cols-3 gap-4 mt-9 max-w-[560px]">
            <span className="flex flex-col gap-2 text-olive-dark text-[13px] font-extrabold">
              <Icon name="leaf" className="w-8.5 h-8.5 text-olive" />
              Naturally Fermented PharmaGABA®
            </span>
            <span className="flex flex-col gap-2 text-olive-dark text-[13px] font-extrabold">
              <Icon name="shield" className="w-8.5 h-8.5 text-olive" />
              Transparent Standards
            </span>
            <span className="flex flex-col gap-2 text-olive-dark text-[13px] font-extrabold">
              <Icon name="flask" className="w-8.5 h-8.5 text-olive" />
              Formula Logic
            </span>
          </div>
        </div>
        <ProductVisual keys={["calm", "focus", "energy"]} scene="hero-stone" />
      </section>

      <SocialProof mode="compact" />

      {/* Why AVRO Section */}
      <Section>
        <SectionHeading
          eyebrow="Why AVRO"
          title="More energy is not always the answer."
          description="When pressure rises, the goal is not to push harder. It is to steady first, stay clear, and stay in control."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
          <InfoCard icon="bolt" title="More stimulation is not always better.">
            Not all energy is effective. More lift can create more noise when
            what you need is composure.
          </InfoCard>
          <InfoCard icon="target" title="Pressure needs control.">
            Pressure can disrupt balance, blur focus, and make steady execution
            harder to hold.
          </InfoCard>
          <InfoCard icon="leaf" title="AVRO starts with calm.">
            Calm first. Then focus, clarity, and steady lift when the moment
            calls for it.
          </InfoCard>
        </div>
      </Section>

      {/* Bands Section */}
      <Section>
        <SectionHeading
          eyebrow="Calm first. Then clarity, focus, and lift."
          title="Support the state before you support the moment."
        />
        <div className="grid grid-cols-1 md:grid-cols-4 border border-line rounded-lg overflow-hidden">
          {[
            ["Calm", "Support for staying composed and in control.", "leaf"],
            ["Clarity", "Support for clearer decisions under pressure.", "brain"],
            ["Focus", "Support for attention when distraction builds.", "target"],
            ["Steady Energy", "Support for usable lift without the usual chaos.", "bolt"],
          ].map(([title, copy, iconName], i) => (
            <article
              key={title}
              className={`p-7.5 text-center bg-white ${i > 0 ? "border-t md:border-t-0 md:border-l border-line" : ""}`}
            >
              <Icon
                name={iconName as "leaf" | "brain" | "target" | "bolt"}
                className="w-9.5 h-9.5 mx-auto mb-3.5 text-olive"
              />
              <h3 className="font-black text-lg mb-2.5">{title}</h3>
              <p className="text-ink/75">{copy}</p>
            </article>
          ))}
        </div>
      </Section>

      <ProductCards title="Calm first. Then choose the moment." shopLabel="Shop" />

      {/* Use Moments */}
      <Section>
        <SectionHeading
          eyebrow="Use AVRO for"
          title="Built for moments that test your state."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
          {[
            {
              title: "Golf",
              kicker: "Before the first tee.",
              copy: "Support composure and rhythm before pressure rises on the course.",
              icon: "flag",
              url: "/golf",
            },
            {
              title: "Work / Tech",
              kicker: "Before deep work.",
              copy: "Support clarity and control before meetings, demos, launches, and focused work blocks.",
              icon: "monitor",
              url: "/work",
            },
            {
              title: "Gaming + Online Poker",
              kicker: "Before the stakes rise.",
              copy: "Support steadiness and decision discipline before long sessions and competitive play.",
              icon: "card",
              url: "/gaming",
            },
            {
              title: "Social / Non Alcohol",
              kicker: "Before the night starts.",
              copy: "Support clear, composed presence for hosting, dinners, and alcohol-free social moments.",
              icon: "users",
              url: "/social",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className="min-h-[180px] p-7 bg-white/72 border border-line rounded-lg shadow-[0_10px_30px_rgba(31,29,24,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_70px_rgba(30,29,24,0.1)]"
            >
              <Icon
                name={item.icon as "flag" | "monitor" | "card" | "users"}
                className="w-10.5 h-10.5 mb-5 text-olive"
              />
              <h3 className="font-black mb-2">{item.title}</h3>
              <strong className="block mb-2 text-sm">{item.kicker}</strong>
              <p className="text-ink/75 text-base leading-relaxed">{item.copy}</p>
            </Link>
          ))}
        </div>
      </Section>

      <FormulaLogic />
      <SocialProof mode="full" />
      <FinalCta
        title="Calm first. Clear headed. Ready for what matters."
        copy="Support composure, clarity, and calm-first readiness for the moments that matter."
      />
    </>
  )
}
