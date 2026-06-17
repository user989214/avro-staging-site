"use client"

import { useState } from "react"
import Link from "next/link"
import { Section, CardedSection, SectionHeading, SocialProof, FinalCta } from "@/components/sections"
import { PageHero } from "@/components/page-hero"
import { Icon } from "@/components/icons"

/**
 * Manage Subscription
 *
 * Customer-facing subscription dashboard. Shows the current plan summary,
 * exposes the four common actions (swap formula, change frequency, pause,
 * cancel), and lists upcoming shipments. Illustrative only — no live
 * subscription backend; state is held locally so the controls feel real.
 */

type Formula = "Calm" | "Focus" | "Energy"
type Cadence = "Every 30 days" | "Every 45 days" | "Every 60 days"

export default function ManageSubscriptionPage() {
  const [formula, setFormula] = useState<Formula>("Focus")
  const [cadence, setCadence] = useState<Cadence>("Every 30 days")
  const [paused, setPaused] = useState(false)

  return (
    <>
      <PageHero
        variant="flat"
        title="Manage Subscription."
        lede="Your AVRO routine, on your terms. Swap formulas, adjust how often, pause anytime."
        imageSrc=""
        imageAlt=""
        primaryCta={{ href: "#plan", label: "View My Plan" }}
        secondaryCta={{ href: "/contact", label: "Need Help?" }}
        compact
        centered
      />

      {/* Plan summary card */}
      <Section id="plan" className="!py-[clamp(32px,4vw,56px)]">
        <div
          className="mx-auto w-full max-w-[860px]"
          style={{
            padding: "clamp(28px,4vw,40px)",
            backgroundColor: "var(--base-light)",
            border: "1px solid var(--divider)",
            borderRadius: 24,
            boxShadow: "0 10px 30px rgba(31,29,24,0.04)",
          }}
        >
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <span
                className="inline-block uppercase tracking-[0.16em] mb-2"
                style={{ fontWeight: 700, fontSize: 11, color: "var(--warm-gray)" }}
              >
                Your plan
              </span>
              <h2 className="font-serif" style={{ fontWeight: 900, fontSize: "clamp(28px,3.5vw,40px)", lineHeight: 1.05, color: "var(--ink)" }}>
                AVRO {formula}
              </h2>
              <p style={{ marginTop: 8, fontSize: 15, color: "var(--warm-gray)" }}>
                {paused ? "Paused" : "Active"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="btn-primary"
              style={paused ? undefined : { backgroundColor: "transparent", color: "var(--charcoal)", border: "2px solid var(--charcoal)" }}
            >
              {paused ? "Resume Subscription" : "Pause Subscription"}
            </button>
          </div>
        </div>
      </Section>

      {/* Adjust formula */}
      <CardedSection>
        <SectionHeading eyebrow="Choose your formula" title="Swap anytime." centered={false} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(["Calm", "Focus", "Energy"] as Formula[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFormula(f)}
              className="text-left transition-colors"
              style={{
                padding: "clamp(20px,3vw,28px)",
                backgroundColor: formula === f ? "var(--charcoal)" : "var(--base)",
                color: formula === f ? "var(--bone)" : "var(--ink)",
                border: `1px solid ${formula === f ? "var(--charcoal)" : "var(--divider)"}`,
                borderRadius: 20,
              }}
            >
              <h3
                className="font-serif"
                style={{ fontWeight: 900, fontSize: 24, lineHeight: 1.05, marginBottom: 6, color: formula === f ? "var(--bone)" : "var(--ink)" }}
              >
                AVRO {f}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: formula === f ? "var(--bone)" : "var(--warm-gray)" }}>
                {f === "Calm" && "Caffeine-free composure for evening pressure moments."}
                {f === "Focus" && "Caffeine-free clarity for deep work and long sessions."}
                {f === "Energy" && "Steady energy with 120 mg natural caffeine."}
              </p>
            </button>
          ))}
        </div>
      </CardedSection>

      {/* Adjust cadence */}
      <CardedSection>
        <SectionHeading eyebrow="Delivery frequency" title="How often should we ship?" centered={false} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(["Every 30 days", "Every 45 days", "Every 60 days"] as Cadence[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCadence(c)}
              className="text-left transition-colors"
              style={{
                padding: "clamp(20px,3vw,28px)",
                backgroundColor: cadence === c ? "var(--charcoal)" : "var(--base)",
                color: cadence === c ? "var(--bone)" : "var(--ink)",
                border: `1px solid ${cadence === c ? "var(--charcoal)" : "var(--divider)"}`,
                borderRadius: 20,
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </CardedSection>

      {/* Upcoming */}
      <CardedSection>
        <SectionHeading eyebrow="What's next" title="Upcoming shipments." centered={false} />
        <div className="grid gap-3">
          {[
            { date: "Mar 12", note: "Next charge & ship" },
            { date: "Apr 11", note: "Following shipment" },
          ].map((row) => (
            <div
              key={row.date}
              className="flex items-center justify-between gap-4"
              style={{
                padding: "clamp(16px,2.4vw,22px) clamp(20px,3vw,28px)",
                backgroundColor: "var(--base)",
                border: "1px solid var(--divider)",
                borderRadius: 16,
              }}
            >
              <div className="flex items-center gap-4">
                <Icon name="clock" className="w-6 h-6 text-charcoal" />
                <div>
                  <div style={{ fontWeight: 800, color: "var(--ink)", fontSize: 16 }}>{row.date}</div>
                  <div style={{ fontSize: 13, color: "var(--warm-gray)" }}>
                    AVRO {formula} · {cadence}
                  </div>
                </div>
              </div>
              <span style={{ fontSize: 13, color: "var(--warm-gray)" }}>{row.note}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary">Contact Support</Link>
          <Link
            href="/account"
            className="btn-primary"
            style={{ backgroundColor: "transparent", color: "var(--charcoal)", border: "2px solid var(--charcoal)" }}
          >
            Back to Account
          </Link>
        </div>
      </CardedSection>

      <SocialProof mode="compact" />
      <FinalCta
        title="Need to make a change we didn't cover?"
        copy="Our team is here to help. We respond fast."
        productButtons={false}
      />
    </>
  )
}
