"use client"

import { useState } from "react"
import {
  Section,
  SectionHeading,
  CtaGroup,
  SocialProof,
  FinalCta,
  InfoCard,
} from "@/components/sections"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(28px,6vw,80px)] items-start w-full max-w-[1440px] mx-auto px-[clamp(18px,5vw,64px)] py-[clamp(42px,8vw,86px)] bg-gradient-to-br from-[#fffdf8] to-[#f7f4ec] border-b border-line">
        <div className="max-w-[620px]">
          <span className="block mb-3 text-olive text-xs font-black tracking-[0.12em] uppercase">
            Contact
          </span>
          <h1 className="font-serif font-black text-[clamp(46px,7vw,86px)] leading-[0.98] mb-5">
            Contact AVRO.
          </h1>
          <p className="max-w-[560px] text-muted text-[clamp(17px,2vw,20px)] leading-relaxed">
            Have a question about your order, subscription, formula, or
            partnership inquiry? Send us a note and we will point you in the
            right direction.
          </p>
          <CtaGroup primary="Send Message" secondary="Visit Help Center" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-3.5 p-6 bg-white/90 border border-line rounded-lg shadow-[0_10px_30px_rgba(31,29,24,0.04)]"
        >
          <label className="grid gap-1.5 text-ink font-extrabold">
            Name
            <input
              type="text"
              placeholder="Your name"
              className="min-h-[44px] w-full px-3 py-2.5 text-ink bg-white border border-line rounded-[7px] font-normal"
            />
          </label>
          <label className="grid gap-1.5 text-ink font-extrabold">
            Email
            <input
              type="email"
              placeholder="you@example.com"
              className="min-h-[44px] w-full px-3 py-2.5 text-ink bg-white border border-line rounded-[7px] font-normal"
            />
          </label>
          <label className="grid gap-1.5 text-ink font-extrabold">
            Order number, optional
            <input
              type="text"
              placeholder="#AVRO"
              className="min-h-[44px] w-full px-3 py-2.5 text-ink bg-white border border-line rounded-[7px] font-normal"
            />
          </label>
          <label className="grid gap-1.5 text-ink font-extrabold">
            Inquiry type
            <select className="min-h-[44px] w-full px-3 py-2.5 text-ink bg-white border border-line rounded-[7px] font-normal">
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
              className="w-full px-3 py-2.5 text-ink bg-white border border-line rounded-[7px] font-normal resize-y"
            />
          </label>
          <button type="submit" className="btn-primary">
            {submitted ? "Sent!" : "Send Message"}
          </button>
        </form>
      </section>

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
          <article className="min-h-[180px] p-7 bg-white/72 border border-line rounded-lg shadow-[0_10px_30px_rgba(31,29,24,0.04)]">
            <h3 className="font-black mb-2">Product Questions</h3>
            <p className="text-muted text-base leading-relaxed">
              Ask about Calm, Focus, Energy, ingredients, or how to choose.
            </p>
          </article>
          <article className="min-h-[180px] p-7 bg-white/72 border border-line rounded-lg shadow-[0_10px_30px_rgba(31,29,24,0.04)]">
            <h3 className="font-black mb-2">Order Support</h3>
            <p className="text-muted text-base leading-relaxed">
              Questions about shipping, delivery, damaged product, or returns.
            </p>
          </article>
          <article className="min-h-[180px] p-7 bg-white/72 border border-line rounded-lg shadow-[0_10px_30px_rgba(31,29,24,0.04)]">
            <h3 className="font-black mb-2">Retail / Wholesale</h3>
            <p className="text-muted text-base leading-relaxed">
              Interested in carrying AVRO.
            </p>
          </article>
          <article className="min-h-[180px] p-7 bg-white/72 border border-line rounded-lg shadow-[0_10px_30px_rgba(31,29,24,0.04)]">
            <h3 className="font-black mb-2">Partnerships</h3>
            <p className="text-muted text-base leading-relaxed">
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
