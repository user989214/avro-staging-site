"use client"

import { useState } from "react"
import { Section, SocialProof, FinalCta } from "@/components/sections"
import { PageHero } from "@/components/page-hero"

/**
 * Contact — simplified.
 *
 * Single, well-paced flat hero followed by one constrained form card. No
 * "common contact reasons" rail, no quad of duplicate "InfoCard" tiles, no
 * eyelid sections — just the hero, the form, and the standard social-proof +
 * final-CTA closing rhythm used everywhere else on the site.
 */
export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <PageHero
        variant="flat"
        title="Contact AVRO."
        lede="Have a question about your order, subscription, formula, or partnership? Send us a note and we will point you in the right direction."
        imageSrc=""
        imageAlt=""
        primaryCta={{ href: "#message", label: "Send Message" }}
        secondaryCta={{ href: "/faq", label: "Visit Help Center" }}
        compact
        centered
      />

      <Section id="message" className="!py-[clamp(40px,5vw,72px)]">
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 mx-auto w-full max-w-[640px]"
          style={{
            padding: "clamp(28px,4vw,40px)",
            backgroundColor: "var(--base-light)",
            border: "1px solid var(--divider)",
            borderRadius: 24,
            boxShadow: "0 10px 30px rgba(31,29,24,0.04)",
          }}
        >
          <Field label="Name">
            <input
              type="text"
              required
              placeholder="Your name"
              className="contact-input"
            />
          </Field>

          <Field label="Email">
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="contact-input"
            />
          </Field>

          <Field label="Order number (optional)">
            <input
              type="text"
              placeholder="#AVRO"
              className="contact-input"
            />
          </Field>

          <Field label="Inquiry type">
            <select className="contact-input" defaultValue="Order Support">
              <option>Order Support</option>
              <option>Subscription Support</option>
              <option>Product Question</option>
              <option>Retail / Wholesale</option>
              <option>Creator / Partnership</option>
              <option>Press</option>
              <option>Other</option>
            </select>
          </Field>

          <Field label="Message">
            <textarea
              rows={5}
              required
              placeholder="How can we help?"
              className="contact-input resize-y"
            />
          </Field>

          <button type="submit" className="btn-primary mt-2 self-start">
            {submitted ? "Sent!" : "Send Message"}
          </button>
        </form>

        {/* Tiny "how to reach us" line — tone-on-tone so it doesn't compete with the form. */}
        <p
          className="mx-auto w-full max-w-[640px] mt-5 text-center"
          style={{
            fontSize: 13,
            color: "var(--warm-gray)",
            lineHeight: 1.5,
          }}
        >
          You can also contact us via email at{" "}
          <a
            href="mailto:hello@avrolife.com"
            style={{ color: "var(--ink)", fontWeight: 700 }}
          >
            hello@avrolife.com
          </a>
          .
        </p>

        {/* Inline styles for the form inputs — keeps the form file self-contained
            and matches the rounded, bone-filled language used elsewhere. */}
        <style>{`
          .contact-input {
            width: 100%;
            min-height: 48px;
            padding: 12px 16px;
            background-color: var(--base);
            color: var(--ink);
            border: 1.5px solid var(--divider);
            border-radius: 12px;
            font-weight: 500;
            font-size: 15px;
            outline: none;
            transition: border-color 0.18s ease, background-color 0.18s ease;
          }
          .contact-input:focus {
            border-color: var(--charcoal);
            background-color: var(--bone);
          }
          .contact-input::placeholder { color: var(--warm-gray); opacity: 0.7; }
        `}</style>
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-ink" style={{ fontWeight: 700, fontSize: 14 }}>
      {label}
      {children}
    </label>
  )
}
