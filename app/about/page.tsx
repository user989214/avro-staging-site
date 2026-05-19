import Image from "next/image"
import Link from "next/link"
import { Section, SectionHeading, FinalCta } from "@/components/sections"

export const metadata = {
  title: "About AVRO | Our Story & Team",
  description:
    "AVRO was built on a simple idea: state before stimulation. Meet the team behind the calm-first formulas.",
}

const team = [
  {
    name: "Keigo Tanaka",
    role: "Co-Founder & CEO",
    image: "/images/team/keigo.jpg",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    name: "Peter Lindqvist",
    role: "Co-Founder & Head of Formulation",
    image: "/images/team/peter.jpg",
    bio: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
  },
  {
    name: "Holly Mercer",
    role: "Director of Brand",
    image: "/images/team/holly.jpg",
    bio: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
  },
  {
    name: "Marianne Costa",
    role: "Head of Science & Research",
    image: "/images/team/marianne.jpg",
    bio: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias.",
  },
]

const values = [
  {
    title: "State before stimulation",
    body: "Most products in this category push harder. AVRO starts by setting the baseline — calm, focus, or energy — so the moment can carry itself.",
  },
  {
    title: "Ingredients with a reason",
    body: "Every input earns its place: naturally fermented PharmaGABA, whole-fruit polyphenols, and clean adaptogens. No proprietary blends, no filler.",
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
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(28px,6vw,80px)] items-center w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(42px,8vw,86px)] bg-gradient-to-br from-[#fffdf8] to-[#f7f4ec] border-b border-line">
        <div className="max-w-[620px]">
          <span className="block mb-3 text-olive text-xs font-black tracking-[0.12em] uppercase">
            About AVRO
          </span>
          <h1 className="font-serif font-black text-[clamp(46px,7vw,86px)] leading-[0.98] mb-5 text-balance">
            Built around the moments that matter.
          </h1>
          <p className="max-w-[560px] text-muted-foreground text-[clamp(17px,2vw,20px)] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-7">
            <Link href="/why-avro" className="btn-primary">
              Why AVRO
            </Link>
            <Link href="/science" className="btn-secondary">
              The Science
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/5] w-full max-w-[520px] justify-self-center overflow-hidden rounded-lg border border-line shadow-[0_30px_60px_-30px_rgba(20,18,12,0.35)]">
          <Image
            src="/images/lifestyle/journal-coffee-window.jpg"
            alt="Open journal and coffee at a sunlit window"
            fill
            sizes="(min-width: 1024px) 520px, 90vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Story */}
      <Section>
        <SectionHeading
          eyebrow="Our story"
          title="A different starting point."
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {values.map((v) => (
            <div
              key={v.title}
              className="flex flex-col gap-3 p-6 bg-cream/60 border border-line rounded-lg"
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

      {/* Team */}
      <Section>
        <SectionHeading
          eyebrow="The team"
          title="People behind the formulas."
          description="A small group of formulators, scientists, and brand builders working out of one studio with one rule: state before stimulation."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 max-w-[1200px] mx-auto">
          {team.map((m) => (
            <article
              key={m.name}
              className="flex flex-col gap-4 group"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-line bg-cream">
                <Image
                  src={m.image}
                  alt={`${m.name}, ${m.role}`}
                  fill
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-serif font-black text-xl leading-tight">
                  {m.name}
                </h3>
                <span className="text-olive text-xs font-black tracking-[0.1em] uppercase">
                  {m.role}
                </span>
                <p className="mt-1.5 text-muted-foreground text-[14.5px] leading-relaxed">
                  {m.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <FinalCta />
    </>
  )
}
