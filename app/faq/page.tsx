"use client"

import { useState } from "react"
import {
  Section,
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
        "Energy is designed for mornings and long days when you want natural caffeine with AVRO's calm-first foundation.",
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
        "AVRO includes PHGG and acacia gum as part of the daily ritual and formula base.",
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
        "Can I use AVRO before gaming or online poker?",
        "Yes. AVRO can support calm, clarity, and composure before long sessions. It does not claim to improve win rates, betting decisions, or gameplay outcomes.",
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
        "AVRO is not positioned for children.",
      ],
    ],
  },
  {
    name: "Shipping + Returns",
    slug: "shipping-returns",
    faqs: [
      [
        "Where does AVRO ship?",
        "Use the current shipping policy for final operational details.",
      ],
      [
        "How do I track my order?",
        "Use your order confirmation link or contact support for order help.",
      ],
      [
        "What is your return policy?",
        "Use the current approved return policy for final refund and return details.",
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
        title="How can we help?"
        lede="Find answers about AVRO formulas, ingredients, timing, caffeine, subscriptions, shipping, and how to choose the right product."
        imageSrc=""
        imageAlt=""
        primaryCta={{ href: "/shop", label: "Shop AVRO" }}
        secondaryCta={{ href: "/contact", label: "Contact Us" }}
        compact
      >
        <label className="grid grid-cols-[24px_1fr] gap-3 items-center w-full max-w-[480px] px-4 py-3 bg-base border border-line rounded-2xl shadow-[0_8px_24px_rgba(30,29,24,0.05)]">
          <Icon name="search" className="w-6 h-6 text-muted" />
          <input
            type="search"
            placeholder="Search AVRO answers"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 outline-0 bg-transparent text-sm"
          />
        </label>
        <div className="flex flex-wrap gap-2 mt-4 max-w-[560px]">
          {faqCategories.map((cat) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="px-3 py-2 bg-base border border-line rounded-full text-[12px] font-extrabold hover:bg-gray-50 transition-colors"
            >
              {cat.name}
            </a>
          ))}
        </div>
      </PageHero>

      {filtered.map((category) => (
        <Section key={category.slug} id={category.slug}>
          <SectionHeading title={category.name} centered={false} />
          <div className="grid gap-2 w-full">
            {category.faqs.map(([question, answer]) => (
              <details
                key={question}
                className="bg-base border border-line rounded-[12px] group"
              >
                <summary className="flex justify-between gap-4 px-5.5 py-4.5 cursor-pointer font-extrabold select-none after:content-['+'] after:text-[22px] after:leading-none group-open:after:content-['-']">
                  {question}
                </summary>
                <p className="px-5.5 pb-5 text-muted-foreground leading-relaxed">{answer}</p>
              </details>
            ))}
          </div>
        </Section>
      ))}

      <SocialProof mode="compact" />
      <FinalCta
        title="Ready to find your formula?"
        copy="Choose Calm, Focus, or Energy based on the moment you want to support."
      />
    </>
  )
}
