import Image from "next/image"
import Link from "next/link"
import { Section, SectionHeading, FinalCta } from "@/components/sections"

export const metadata = {
  title: "The Team | AVRO",
  description:
    "AVRO was built on a simple idea: state before stimulation. Meet the team behind the calm-first formulas.",
}

const team = [
  {
    name: "Lorem Ipsum",
    role: "Co-Founder & CEO",
    image: "/images/team/keigo.jpg",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    name: "Lorem Ipsum",
    role: "Co-Founder & Head of Formulation",
    image: "/images/team/peter.jpg",
    bio: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
  },
  {
    name: "Lorem Ipsum",
    role: "Director of Brand",
    image: "/images/team/holly.jpg",
    bio: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
  },
  {
    name: "Lorem Ipsum",
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
      <section className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(56px,9vw,112px)] bg-gradient-to-br from-[#fffdf8] to-[#f7f4ec] border-b border-line">
        <div className="flex flex-col items-center text-center max-w-[820px] mx-auto">
          <h1 className="font-serif font-black text-[clamp(46px,7vw,86px)] leading-[0.98] mb-5 text-balance">
            Built around the moments that matter.
          </h1>
          <p className="max-w-[640px] text-muted-foreground text-[clamp(17px,2vw,20px)] leading-relaxed text-pretty">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
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

      {/* Founders */}
      <section className="w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(28px,5vw,64px)]">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-0 overflow-hidden border border-line rounded-lg bg-white/90 shadow-[0_18px_40px_-24px_rgba(20,18,12,0.18)]">
          <div className="flex flex-col justify-center gap-4 p-[clamp(28px,4vw,52px)]">
            <h2 className="font-serif font-black text-[clamp(30px,3.4vw,46px)] leading-[1.04] text-balance">
              Born from science and brand instinct.
            </h2>
            <p className="text-muted-foreground text-[clamp(15px,1.6vw,17px)] leading-relaxed max-w-[52ch]">
              Founded by Keigo Sugawara and Peter van Stolk, AVRO was built
              around a simple belief: people do not always need more
              stimulation. They need more control. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.
            </p>
            <p className="text-muted-foreground text-[clamp(15px,1.6vw,17px)] leading-relaxed max-w-[52ch]">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <Link href="/why-avro" className="btn-secondary text-sm">
                Read our story
              </Link>
              <Link href="/science" className="btn-secondary text-sm">
                The science
              </Link>
            </div>
          </div>
          <div className="relative min-h-[320px] lg:min-h-[460px] overflow-hidden">
            <Image
              src="/images/team/founders-keigo-peter.jpg"
              alt="AVRO co-founders Keigo Sugawara and Peter van Stolk back-to-back against a sunlit wall"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Team */}
      <Section>
        <SectionHeading
          eyebrow="The Team"
          title="People behind the formulas."
          description="A small group of formulators, scientists, and brand builders working out of one studio with one rule: state before stimulation."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 max-w-[1200px] mx-auto">
          {team.map((m, i) => (
            <article
              key={i}
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
