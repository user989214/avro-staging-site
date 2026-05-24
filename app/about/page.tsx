import Image from "next/image"
import Link from "next/link"
import { Section, SectionHeading, FinalCta } from "@/components/sections"

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
      {/* Hero */}
      <section className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(56px,9vw,112px)] bg-gradient-to-br from-[#fffdf8] to-[#f7f4ec] border-b border-line">
        <div className="flex flex-col items-center text-center max-w-[820px] mx-auto">
          <h1 className="font-serif font-black text-[clamp(46px,7vw,86px)] leading-[0.98] mb-5 text-balance">
            Built around the moments that matter.
          </h1>
          <p className="max-w-[640px] text-muted-foreground text-[clamp(17px,2vw,20px)] leading-relaxed text-pretty">
            In many moments that matter most, people do not need more energy.
            They need more control. AVRO was built on that distinction.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-7">
            <Link href="/why-avro" className="btn-primary">
              Why AVRO
            </Link>
            <Link href="/science" className="btn-secondary">
              The Science
            </Link>
          </div>
        </div>
      </section>

      {/* Origin story */}
      <Section>
        <div className="max-w-[780px] mx-auto flex flex-col gap-6">
          <SectionHeading
            eyebrow="Our story"
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
            role. All three formulas also include a prebiotic fiber blend of PHGG
            and acacia gum, reflecting the belief that balance and function are
            connected.
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
          eyebrow="What we believe"
          title="Built on one clear belief."
          description="Performance starts with composure. That belief shaped every formula, every ingredient, and every decision at AVRO."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {values.map((v) => (
            <div
              key={v.title}
              className="flex flex-col gap-3 p-6 bg-base-light/80 border border-line rounded-2xl"
            >
              <h3 className="font-serif font-black text-xl leading-tight">
                {v.title}
              </h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Founders */}
      <section className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(28px,5vw,64px)]">
        <SectionHeading
          eyebrow="The Founders"
          title="Born from science and brand instinct."
          description="Together, Keigo and Peter built AVRO around one clear belief: performance starts with composure."
        />
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-0 overflow-hidden border border-line rounded-2xl bg-base-light/90 shadow-[0_18px_40px_-24px_rgba(20,18,12,0.18)] mb-8">
          <div className="flex flex-col justify-center gap-4 p-[clamp(28px,4vw,52px)]">
            {founders.map((f) => (
              <div key={f.name} className="flex flex-col gap-2 pb-6 last:pb-0 border-b border-line last:border-0">
                <div className="flex items-baseline gap-2">
                  <h3 className="font-serif font-black text-[clamp(20px,2vw,26px)] leading-tight">
                    {f.name}
                  </h3>
                  <span className="text-olive text-[11px] font-black tracking-[0.1em] uppercase">
                    {f.role}
                  </span>
                </div>
                <p className="text-ink/75 text-[clamp(14px,1.4vw,16px)] leading-relaxed">
                  {f.bio}
                </p>
              </div>
            ))}
            <div className="flex flex-wrap gap-3 mt-2">
              <Link href="/science" className="btn-secondary text-sm">
                The science
              </Link>
              <Link href="/why-avro" className="btn-secondary text-sm">
                Why AVRO
              </Link>
            </div>
          </div>
          <div className="relative min-h-[320px] lg:min-h-[480px] overflow-hidden">
            <Image
              src="/images/team/founders-keigo-peter.jpg"
              alt="AVRO co-founders Keigo Sugawara and Peter van Stolk"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Full team portraits */}
      <Section className="bg-cream/40">
        <SectionHeading
          eyebrow="The Team"
          title="The people behind AVRO."
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-[1100px] mx-auto">
          {team.map((member) => (
            <div key={member.name} className="flex flex-col gap-3">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-line bg-soft">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 25vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <p className="font-black text-sm leading-tight">{member.name}</p>
                <p className="text-ink/55 text-xs mt-0.5 font-medium tracking-wide uppercase">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <FinalCta />
    </>
  )
}
