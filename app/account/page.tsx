"use client"

import { useState } from "react"
import Link from "next/link"
import { Section, CardedSection, SectionHeading, SocialProof, FinalCta } from "@/components/sections"
import { PageHero } from "@/components/page-hero"
import { Icon } from "@/components/icons"

/**
 * My Account — sign-in landing.
 *
 * Light, on-brand placeholder for the customer account hub. Hero + sign-in form
 * card + a row of "what you can do here" tiles linking to subscription mgmt,
 * orders, and address book. Form is illustrative only (no real auth wired) so
 * the page feels complete in the marketing site without standing up a backend.
 */
export default function AccountPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <PageHero
        variant="flat"
        title="My Account."
        lede="Sign in to manage your subscription, track orders, update shipping, and adjust your AVRO routine."
        imageSrc=""
        imageAlt=""
        primaryCta={{ href: "#sign-in", label: "Sign In" }}
        secondaryCta={{ href: "/contact", label: "Need Help?" }}
        compact
        centered
      />

      <Section id="sign-in" className="!py-[clamp(32px,4vw,56px)]">
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 mx-auto w-full max-w-[480px]"
          style={{
            padding: "clamp(28px,4vw,40px)",
            backgroundColor: "var(--base-light)",
            border: "1px solid var(--divider)",
            borderRadius: 24,
            boxShadow: "0 10px 30px rgba(31,29,24,0.04)",
          }}
        >
          <h2 className="font-serif" style={{ fontWeight: 900, fontSize: 26, lineHeight: 1.05, color: "var(--ink)" }}>
            Welcome back.
          </h2>
          <label className="grid gap-2 text-ink" style={{ fontWeight: 700, fontSize: 14 }}>
            Email
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="acct-input"
            />
          </label>
          <label className="grid gap-2 text-ink" style={{ fontWeight: 700, fontSize: 14 }}>
            Password
            <input
              type="password"
              required
              placeholder="Your password"
              className="acct-input"
            />
          </label>
          <button type="submit" className="btn-primary mt-2">
            {submitted ? "Signing in…" : "Sign In"}
          </button>
          <div className="flex items-center justify-between text-[13px]" style={{ color: "var(--warm-gray)" }}>
            <Link href="/contact" style={{ fontWeight: 600 }}>Forgot password?</Link>
            <Link href="/shop" style={{ fontWeight: 600, color: "var(--ink)" }}>Create account</Link>
          </div>
          <style>{`
            .acct-input {
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
            .acct-input:focus { border-color: var(--charcoal); background-color: var(--bone); }
            .acct-input::placeholder { color: var(--warm-gray); opacity: 0.7; }
          `}</style>
        </form>
      </Section>

      <CardedSection>
        <SectionHeading
          eyebrow="Once you are signed in"
          title="Manage your AVRO routine."
          centered={false}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <AccountTile
            href="/account/subscription"
            icon="clock"
            title="Manage Subscription"
            copy="Update timing, formula, frequency, or pause anytime."
          />
          <AccountTile
            href="/account/orders"
            icon="card"
            title="Orders"
            copy="Track recent orders and view order history."
          />
          <AccountTile
            href="/account/addresses"
            icon="search"
            title="Addresses"
            copy="Update shipping and billing addresses."
          />
        </div>
      </CardedSection>

      <SocialProof mode="compact" />
      <FinalCta
        title="Not a member yet?"
        copy="Subscribe and never run out of your AVRO routine."
        productButtons={false}
      />
    </>
  )
}

function AccountTile({
  href,
  icon,
  title,
  copy,
}: {
  href: string
  icon: "clock" | "card" | "search"
  title: string
  copy: string
}) {
  return (
    <Link
      href={href}
      className="group block transition-colors"
      style={{
        padding: "clamp(20px,3vw,28px)",
        backgroundColor: "var(--base)",
        border: "1px solid var(--divider)",
        borderRadius: 20,
      }}
    >
      <Icon name={icon} className="w-7 h-7 text-charcoal mb-4" />
      <h3 className="font-serif" style={{ fontWeight: 900, fontSize: 22, lineHeight: 1.1, color: "var(--ink)", marginBottom: 6 }}>
        {title}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.5, color: "var(--warm-gray)" }}>{copy}</p>
    </Link>
  )
}
