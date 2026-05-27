"use client"

import { useState } from "react"
import {
  Section,
  SectionHeading,
  SocialProof,
  FinalCta,
  InfoCard,
} from "@/components/sections"
import { PageHero } from "@/components/page-hero"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* Hero */}
      <PageHero
        variant="flat"
        title="Contact AVRO."
        lede="Have a question about your order, subscription, formula, or partnership inquiry? Send us a note and we will point you in the right direction."
        imageSrc=""
        imageAlt=""
        primaryCta={{ href: "#message", label: "Send Message" }}
        secondaryCta={{ href: "/faq", label: "Visit Help Center" }}
        compact
      />

      {/* Contact form */}
      <Section id="message">
        <form
          onSubmit={handleSubmit}
          className="grid gap-3.5 p-6 bg-base-light/90 border border-line rounded-2xl shadow-[0_10px_30px_rgba(31,29,24,0.04)] max-w-[640px] mx-auto w-full"
        >
          <label className="grid gap-1.5 text-ink font-extrabold">
            Name
            <input
              type="text"
              placeholder="Your name"
              className="min-h-[44px] w-full px-3 py-2.5 text-ink bg-base border border-line rounded-[7px] font-normal"
            />
          </label>
          <label className="grid gap-1.5 text-ink font-extrabold">
            Email
            <input
              type="email"
              placeholder="you@example.com"
              className="min-h-[44px] w-full px-3 py-2.5 text-ink bg-base border border-line rounded-[7px] font-normal"
            />
          </label>
          <label className="grid gap-1.5 text-ink font-extrabold">
            Order number, optional
            <input
              type="text"
              placeholder="#AVRO"
              className="min-h-[44px] w-full px-3 py-2.5 text-ink bg-base border border-line rounded-[7px] font-normal"
            />
          </label>
          <label className="grid gap-1.5 text-ink font-extrabold">
            Inquiry type
            <select className="min-h-[44px] w-full px-3 py-2.5 text-ink bg-base border border-line rounded-[7px] font-normal">
              <option>Order Support</option>
              <option>Subscription Support</option>
              <option>Product Question</option>
              <option>Retail / Wholesale</option>
              <option>Creator / Partnership</option>
              <option>Press</option>
              <option>Other</option>
            </select>
          </label>
          <label className="grid gap-1.5 text-ink font-extrabold">
            Message
            <textarea
              rows={5}
              placeholder="How can we help?"
              className="w-full px-3 py-2.5 text-ink bg-base border border-line rounded-[7px] font-normal resize-y"
            />
          </label>
          <button type="submit" className="btn-primary">
            {submitted ? "Sent!" : "Send Message"}
          </button>
        </form>
      </Section>

      <Section>
        <SectionHeading eyebrow="Quick help" title="Find the fastest path." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
          <InfoCard icon="card" title="Track an Order">
            Find current order status and delivery updates.
          </InfoCard>
          <InfoCard icon="clock" title="Manage Subscription">
            Update your routine, timing, or formula.
          </InfoCard>
          <InfoCard icon="search" title="Visit Help Center">
            Get answers about products, usage, and policies.
          </InfoCard>
          <InfoCard icon="flask" title="Compare Formulas">
            Choose Calm, Focus, or Energy for your moment.
          </InfoCard>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Common contact reasons"
          title="What can we help with?"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
          <article className="min-h-[180px] p-7 bg-base-light/72 border border-line rounded-full shadow-[0_10px_30px_rgba(31,29,24,0.04)]">
            <h3 className="font-black mb-2">Product Questions</h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              Ask about Calm, Focus, Energy, ingredients, or how to choose.
            </p>
          </article>
          <article className="min-h-[180px] p-7 bg-base-light/72 border border-line rounded-full shadow-[0_10px_30px_rgba(31,29,24,0.04)]">
            <h3 className="font-black mb-2">Order Support</h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              Questions about shipping, delivery, damaged product, or returns.
            </p>
          </article>
          <article className="min-h-[180px] p-7 bg-base-light/72 border border-line rounded-full shadow-[0_10px_30px_rgba(31,29,24,0.04)]">
            <h3 className="font-black mb-2">Retail / Wholesale</h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              Interested in carrying AVRO.
            </p>
          </article>
          <article className="min-h-[180px] p-7 bg-base-light/72 border border-line rounded-full shadow-[0_10px_30px_rgba(31,29,24,0.04)]">
            <h3 className="font-black mb-2">Partnerships</h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              Creators, events, golf, tech, gaming, or non alcohol
              collaborations.
            </p>
          </article>
        </div>
      </Section>

      <SocialProof mode="compact" />
      <FinalCta
        title="Still need help?"
        copy="Our team will respond as soon as possible."
        productButtons={false}
      />
    </>
  )
}
