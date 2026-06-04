import Image from "next/image"
import Link from "next/link"
import { Section, SectionHeading, FinalCta } from "@/components/sections"
import { PageHero } from "@/components/page-hero"

export const metadata = {
  title: "The Team | AVRO",
  description:
    "AVRO was founded by Keigo Sugawara and Peter van Stolk on one belief: performance starts with composure.",
}

const founders = [
  {
    name: "Keigo Sugawara",
    role: "Co-Founder & CEO",
    image: "/images/team/keigo.jpg",
    bio: "Keigo earned a Master's degree in Applied Microbiology from the University of Tokyo, where his training focused on fermentation and the transformation of raw materials through controlled microbial processes. Growing up in Japan shaped his view of strength — grounded, deliberate, and controlled. That perspective made PharmaGABA the right foundation: a fermented form of GABA reflecting precision, consistency, and calm functional support.",
  },
  {
    name: "Peter van Stolk",
    role: "Co-Founder & CMO",
    image: "/images/team/peter.jpg",
    bio: "Peter brought the brand and market perspective. As an entrepreneur and speaker with deep experience in branding, innovation, and building consumer ventures, he understood that science must do more than be credible — it must feel real, earn trust, and connect to how people actually live.",
  },
]

const team = [
  {
    name: "Keigo Sugawara",
    role: "Co-Founder & CEO",
    image: "/images/team/keigo.jpg",
  },
  {
    name: "Peter van Stolk",
    role: "Co-Founder & CMO",
    image: "/images/team/peter.jpg",
  },
  {
    name: "Holly",
    role: "Team",
    image: "/images/team/holly.jpg",
  },
  {
    name: "Marianne",
    role: "Team",
    image: "/images/team/marianne.jpg",
  },
]

const values = [
  {
    title: "State before stimulation",
    body: "Most products in this category push harder. AVRO starts by setting the baseline — calm, focus, or energy — so the moment can carry itself.",
  },
  {
    title: "Ingredients with a reason",
    body: "Every input earns its place: naturally fermented PharmaGABA®, whole-fruit polyphenols, prebiotic fiber, and clean support. No proprietary blends, no filler.",
  },
  {
    title: "Built for real moments",
    body: "Designed for the tee box, the pitch deck, the late table, the dinner party — wherever you want to show up as yourself.",
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        variant="flat"
        title="Built around the moments that matter."
        lede="In many moments that matter most, people do not need more energy. They need more control. AVRO was built on that distinction."
        imageSrc=""
        imageAlt=""
        primaryCta={{ href: "/why-avro", label: "Why AVRO" }}
        secondaryCta={{ href: "/science", label: "The Science" }}
      />

      {/* Origin story */}
      <Section>
        <div className="max-w-[780px] mx-auto flex flex-col gap-6">
          <SectionHeading
            title="A different starting point."
          />
          <p className="text-ink/80 text-[clamp(16px,1.7vw,18px)] leading-relaxed">
            AVRO began with a simple observation. In many moments that matter
            most, people do not need more energy. They need more control.
          </p>
          <p className="text-ink/80 text-[clamp(16px,1.7vw,18px)] leading-relaxed">
            More energy is not the same as more control. So many energy products
            are built around the opposite idea — more stimulation, more urgency,
            more output. But when pressure rises, more is not always better.
            Pressure can disrupt calm, blur clarity, and make control harder to
            hold.
          </p>
          <p className="text-ink/80 text-[clamp(16px,1.7vw,18px)] leading-relaxed">
            That tension became the starting point for AVRO. Founded by Keigo
            Sugawara and Peter van Stolk, AVRO was created from a shared belief
            that performance does not always come from pushing harder. Sometimes
            it comes from feeling steadier, clearer, and more in control.
          </p>
          <p className="text-ink/80 text-[clamp(16px,1.7vw,18px)] leading-relaxed">
            Every formula begins with a calm-first foundation of PharmaGABA®.
            From there, Calm, Focus, and Energy are each designed for a distinct
            role. All three formulas also include a prebiotic fiber blend of
            Soluble Guar Fiber and Acacia Fiber, reflecting the belief that
            balance and function are connected.
          </p>
          <p className="text-ink/75 text-[clamp(15px,1.5vw,17px)] italic leading-relaxed border-l-2 border-olive pl-5">
            &ldquo;Calm is not the opposite of performance. It is often what
            makes it possible.&rdquo;
          </p>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-cream/40">
        <SectionHeading
          title="Built on one clear belief."
          description="Performance starts with composure. That belief shaped every formula, every ingredient, and every decision at AVRO."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1100px] mx-auto">
          {values.map((v) => (
            <div
              key={v.title}
              className="flex flex-col gap-3 p-6 bg-base-light rounded-2xl"
            >
              <h3 className="font-serif font-black text-lg md:text-xl leading-tight">
                {v.title}
              </h3>
              <p className="text-muted-foreground text-[14px] md:text-[15px] leading-relaxed">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Founders */}
      <section className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(28px,5vw,64px)]">
        {/* Dark card container */}
        <div className="bg-[var(--charcoal)] rounded-[28px] overflow-hidden">
          {/* Content */}
          <div className="p-[clamp(24px,4vw,48px)]">
            <h2 className="font-serif font-black text-[clamp(28px,3.6vw,44px)] leading-[1.1] text-white mb-3">
              Born from science and brand instinct.
            </h2>
            <p className="text-white/80 text-[clamp(14px,1.2vw,17px)] leading-relaxed max-w-[680px] mb-8">
              Together, Keigo and Peter built AVRO around one clear belief: performance starts with composure.
            </p>
            
            {/* Founder bios */}
            <div className="flex flex-col gap-6 mb-8">
              {founders.map((f) => (
                <div key={f.name} className="flex flex-col gap-2 pb-6 last:pb-0 border-b border-white/15 last:border-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                    <h3 className="font-serif font-black text-[clamp(18px,2vw,24px)] leading-tight text-white">
                      {f.name}
                    </h3>
                    <span className="text-white/50 text-[10px] md:text-[11px] font-bold tracking-[0.1em] uppercase">
                      {f.role}
                    </span>
                  </div>
                  <p className="text-white/70 text-[clamp(13px,1.3vw,15px)] leading-relaxed">
                    {f.bio}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/science" className="inline-flex items-center justify-center font-sans font-bold text-sm h-[42px] px-8 rounded-full border-2 border-[var(--avro-blue)] bg-[var(--avro-blue)] text-[var(--charcoal)] hover:opacity-90 transition-opacity">
                The Science
              </Link>
              <Link href="/why-avro" className="inline-flex items-center justify-center font-sans font-bold text-sm h-[42px] px-8 rounded-full border-2 border-white bg-transparent text-white hover:bg-white/10 transition-colors">
                Why AVRO
              </Link>
            </div>
          </div>
          {/* Image inside card */}
          <div className="px-[clamp(16px,3vw,32px)] pb-[clamp(16px,3vw,32px)]">
            <div className="relative aspect-[16/10] sm:aspect-[2/1] rounded-[18px] overflow-hidden">
              <Image
                src="/images/team/founders-keigo-peter.jpg"
                alt="AVRO co-founders Keigo Sugawara and Peter van Stolk"
                fill
                sizes="(min-width: 1024px) 1200px, 100vw"
                className="object-cover grayscale contrast-[1.05] brightness-[0.98]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Full team portraits */}
      <Section className="bg-cream/40">
        <SectionHeading
          title="The people behind AVRO."
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-[1100px] mx-auto">
          {team.map((member) => (
            <div key={member.name} className="flex flex-col gap-2 md:gap-3">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-soft">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 25vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <p className="font-black text-[13px] md:text-sm leading-tight">{member.name}</p>
                <p className="text-ink/55 text-[10px] md:text-xs mt-0.5 font-medium tracking-wide uppercase">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <FinalCta
        title="Experience calm clarity."
        copy="Find the formula that fits your moment."
      />
    </>
  )
}
