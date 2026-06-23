import Image from "next/image"
import Link from "next/link"
import { Section, SectionHeading, FinalCta } from "@/components/sections"
import { PageHero } from "@/components/page-hero"
import { ExpandableStory } from "@/components/expandable-story"

export const metadata = {
  title: "Our Story | AVRO",
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
    name: "Holly Weber",
    role: "Partnerships & Customer Success Manager",
    image: "/images/team/holly.jpg",
  },
  {
    name: "Marianne Lyles",
    role: "Growth & Marketing Director",
    image: "/images/team/marianne.jpg",
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

      {/* Origin story — expandable with a quick preview */}
      <Section>
        <ExpandableStory />
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
              Together, Keigo and Peter built AVRO around one clear belief:{" "}
              <span className="whitespace-nowrap">performance starts with composure.</span>
            </p>
            
            {/* Founder bios */}
            <div className="flex flex-col gap-6 mb-8">
              {founders.map((f) => (
                <div key={f.name} className="flex flex-col gap-2 pb-6 last:pb-0 border-b border-white/15 last:border-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                    <h3 className="font-serif font-black text-[clamp(18px,2vw,24px)] leading-tight text-white">
                      {f.name}
                    </h3>
                    <span className="text-white/50 text-[12px] md:text-[13px] font-bold tracking-[0.04em]">
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
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Full team portraits */}
      <Section id="team" className="bg-cream/40">
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
                <p className="text-ink/55 text-[11px] md:text-[13px] mt-0.5 font-medium tracking-wide">{member.role}</p>
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
