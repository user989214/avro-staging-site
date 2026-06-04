"use client"

import { useState } from "react"
import {
  CardedSection,
  SectionHeading,
  SocialProof,
  FinalCta,
} from "@/components/sections"
import { Icon } from "@/components/icons"
import { PageHero } from "@/components/page-hero"

const faqCategories = [
  {
    name: "Start Here",
    slug: "start-here",
    faqs: [
      [
        "What is AVRO?",
        "AVRO is a calm-first daily drink mix made with naturally fermented PharmaGABA®, designed to support calm, clarity, focus, and steady energy before pressure-sensitive moments.",
      ],
      [
        "What does calm first mean?",
        "It means AVRO starts with state support before stimulation. The goal is calm, clarity, and composure before the moment.",
      ],
      [
        "Is AVRO an energy drink?",
        "AVRO Energy contains natural caffeine, but AVRO as a brand is not stimulant-first. Calm and Focus are caffeine free.",
      ],
      [
        "Is AVRO a sleep product?",
        "No. AVRO Calm is designed for calm support without positioning as a sleep product.",
      ],
    ],
  },
  {
    name: "Choose Your Formula",
    slug: "choose-your-formula",
    faqs: [
      [
        "What is the difference between Calm, Focus, and Energy?",
        "Calm supports caffeine-free composure, Focus supports caffeine-free clarity and focus, and Energy supports steady energy with 120 mg natural caffeine.",
      ],
      [
        "Which formulas are caffeine free?",
        "Calm and Focus are caffeine free.",
      ],
      [
        "Which formula is best for mornings?",
        "Energy is commonly used in the mornings and supports activities that involve alertness and focus.",
      ],
    ],
  },
  {
    name: "Ingredients + Science",
    slug: "ingredients-science",
    faqs: [
      [
        "What is PharmaGABA®?",
        "PharmaGABA® is a naturally fermented form of GABA used in every AVRO formula as part of AVRO's calm-first foundation.",
      ],
      [
        "Why does AVRO include prebiotic fiber?",
        "AVRO includes Soluble Guar Fiber and acacia fiber as part of its formula foundation and daily-use system.",
      ],
      [
        "Why is non-GMO modified corn starch included in AVRO?",
        "It is included in a small amount to help the product mix well and stay consistent from serving to serving. It is not one of AVRO's primary active ingredients.",
      ],
      [
        "Does AVRO contain sugar?",
        "AVRO is positioned as sugar free and uses stevia at 2% or less for a clean, balanced finish.",
      ],
    ],
  },
  {
    name: "How to Use AVRO",
    slug: "how-to-use-avro",
    faqs: [
      [
        "When should I take AVRO?",
        "Mix one stick with water and drink about 30 minutes before your moment.",
      ],
      [
        "Can I mix AVRO into sparkling water?",
        "Yes. AVRO can be mixed with still or sparkling water.",
      ],
      [
        "Can I use AVRO as a mocktail base?",
        "Yes. AVRO can work as a functional alcohol-free mocktail base.",
      ],
    ],
  },
  {
    name: "Use Moments",
    slug: "use-moments",
    faqs: [
      [
        "Can I use AVRO before golf?",
        "Yes. AVRO can fit a pre-round routine before first tee moments, tournament days, practice sessions, and long days on the course.",
      ],
      [
        "Can I use AVRO before work or deep focus?",
        "Yes. AVRO can support calm, clarity, and focus before deep work, meetings, presentations, coding sessions, and long workdays.",
      ],
      [
        "Can I use AVRO before esports or gaming?",
        "Yes. AVRO can support calm, clarity, and composure before long sessions. It does not claim to improve win rates or gameplay outcomes.",
      ],
    ],
  },
  {
    name: "Caffeine + Safety",
    slug: "caffeine-safety",
    faqs: [
      [
        "Which AVRO formulas contain caffeine?",
        "Energy contains 120 mg natural caffeine. Calm and Focus are caffeine free.",
      ],
      [
        "Can I take AVRO with coffee?",
        "Consider your total caffeine intake, especially with AVRO Energy. People who are pregnant, nursing, taking medication, managing a medical condition, or caffeine sensitive should consult a healthcare professional before use.",
      ],
      [
        "Is AVRO intended for children?",
        "AVRO products are intended for adults.",
      ],
    ],
  },
  {
    name: "Shipping + Returns",
    slug: "shipping-returns",
    faqs: [
      [
        "Where does AVRO ship?",
        "AVRO currently ships to anywhere in the U.S.",
      ],
      [
        "How do I track my order?",
        "Once your purchase is complete, you will receive an email with tracking information.",
      ],
      [
        "What is your return policy?",
        "All refunds, returns, or exchanges must be submitted within 30 days from purchase date. If you are looking to request a refund, return, or exchange, please email us at hello@avrolife.com. Make sure you include your purchase information — i.e. order number and date of purchase.",
      ],
      [
        "What are AVRO's Guarantee Guidelines?",
        "AVRO reserves the right to verify information, require a valid proof of purchase, and to deny Guarantee requests in its discretion in cases of suspected fraud or if a customer has abused the AVRO 30-Day Satisfaction Guarantee. If you have any questions regarding whether a seller is an authorized AVRO seller, please contact us through our Contact Page.",
      ],
    ],
  },
]

export default function FaqPage() {
  const [search, setSearch] = useState("")
  const q = search.trim().toLowerCase()

  const filtered = q
    ? faqCategories
        .map((cat) => ({
          ...cat,
          faqs: cat.faqs.filter(
            ([question, answer]) =>
              question.toLowerCase().includes(q) ||
              answer.toLowerCase().includes(q)
          ),
        }))
        .filter((cat) => cat.faqs.length > 0)
    : faqCategories

  return (
    <>
      <PageHero
        variant="flat"
        title="FAQ"
        lede="Find answers about AVRO formulas, ingredients, timing, caffeine, subscriptions, shipping, and how to choose the right product."
        imageSrc=""
        imageAlt=""
        primaryCta={{ href: "/shop", label: "Shop AVRO" }}
        secondaryCta={{ href: "/contact", label: "Contact Us" }}
        compact
        centered
      >
        {/* Search bar — wider and higher-contrast so it reads clearly against the
            cream hero. Filled with the lighter "bone" surface, ringed by a charcoal
            border, and given a visible focus state. */}
        <label
          className="flex items-center w-full max-w-[860px] gap-3 rounded-full transition-colors"
          style={{
            padding: "18px 28px",
            backgroundColor: "var(--bone)",
            border: "1.5px solid var(--charcoal)",
            boxShadow: "0 4px 24px rgba(30,29,24,0.08)",
          }}
        >
          <Icon name="search" className="w-6 h-6 text-charcoal shrink-0" />
          <input
            type="search"
            placeholder="Search AVRO answers"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 outline-0 bg-transparent w-full font-medium text-ink placeholder:text-warm-gray"
            style={{ fontSize: 16 }}
          />
        </label>
        <div className="flex flex-wrap gap-2 mt-5 max-w-[720px] justify-center">
          {faqCategories.map((cat) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="px-3.5 py-2 bg-base rounded-full text-[12px] font-extrabold hover:bg-charcoal hover:text-bone transition-colors"
            >
              {cat.name}
            </a>
          ))}
        </div>
      </PageHero>

      {filtered.map((category) => (
        <CardedSection key={category.slug} id={category.slug}>
          <SectionHeading title={category.name} centered={false} />
          <div className="grid gap-2 w-full">
            {category.faqs.map(([question, answer]) => (
              <details
                key={question}
                className="bg-base rounded-[12px] group"
              >
                <summary className="flex justify-between gap-4 px-5.5 py-4.5 cursor-pointer font-extrabold select-none after:content-['+'] after:text-[22px] after:leading-none group-open:after:content-['-']">
                  {question}
                </summary>
                <p className="px-5.5 pb-5 text-muted-foreground leading-relaxed">{answer}</p>
              </details>
            ))}
          </div>
        </CardedSection>
      ))}

      <SocialProof mode="compact" />
      <div style={{ backgroundColor: "var(--base-deep)" }}>
        <FinalCta
          title="Ready to find your formula?"
          copy="Choose Calm, Focus, or Energy based on the moment you want to support."
        />
      </div>
    </>
  )
}
