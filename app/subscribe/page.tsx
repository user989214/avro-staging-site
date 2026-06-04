"use client"

import { useState } from "react"
import { PageHero } from "@/components/page-hero"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ArrowRight, Check } from "lucide-react"

const GC = '"DM Sans", system-ui, sans-serif'

const subscriptionBenefits = [
  "25% off every order",
  "Free shipping on all deliveries",
  "Flexible delivery schedule",
  "Pause, skip, or cancel anytime",
  "Early access to new products",
  "Exclusive subscriber-only content",
]

export default function SubscribePage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Header />
      <main>
        <PageHero
          variant="flat"
          headline="Subscribe + Save"
          lede="Join the AVRO subscription and save 25% on every order. Free shipping, flexible scheduling, and the calm-first support you need — delivered on your terms."
          primaryCta={{ label: "Start Your Subscription", href: "/shop" }}
          secondaryCta={{ label: "Shop All Products", href: "/shop" }}
        />

        {/* Benefits Section */}
        <section style={{ backgroundColor: "var(--base-light)", padding: "clamp(48px,6vw,80px) clamp(20px,5vw,64px)" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <h2 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(28px,3.5vw,44px)", lineHeight: 1.05, color: "var(--ink)", marginBottom: 32 }}>
              Subscriber Benefits
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {subscriptionBenefits.map((benefit) => (
                <div
                  key={benefit}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "20px 24px",
                    backgroundColor: "var(--base)",
                    borderRadius: 16,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      backgroundColor: "var(--avro-blue)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Check size={16} color="var(--charcoal)" strokeWidth={3} />
                  </div>
                  <span style={{ fontFamily: GC, fontWeight: 500, fontSize: 16, color: "var(--ink)" }}>
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section style={{ backgroundColor: "var(--base)", padding: "clamp(48px,6vw,80px) clamp(20px,5vw,64px)" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <h2 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(28px,3.5vw,44px)", lineHeight: 1.05, color: "var(--ink)", marginBottom: 32 }}>
              How It Works
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
              {[
                { step: "1", title: "Choose Your Formula", desc: "Select the AVRO formula that fits your needs — Calm, Focus, or Energy." },
                { step: "2", title: "Set Your Schedule", desc: "Decide how often you want deliveries — every 2, 4, or 6 weeks." },
                { step: "3", title: "Save 25% Every Time", desc: "Your subscription ships automatically with 25% off and free shipping." },
              ].map((item) => (
                <div key={item.step} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      backgroundColor: "var(--avro-blue)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: GC,
                      fontWeight: 700,
                      fontSize: 20,
                      color: "var(--charcoal)",
                    }}
                  >
                    {item.step}
                  </div>
                  <h3 style={{ fontFamily: GC, fontWeight: 700, fontSize: 20, color: "var(--ink)", margin: 0 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: GC, fontWeight: 400, fontSize: 15, lineHeight: 1.5, color: "var(--warm-gray)", margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section style={{ backgroundColor: "var(--avro-blue)", padding: "clamp(48px,6vw,80px) clamp(20px,5vw,64px)" }}>
          <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontFamily: GC, fontWeight: 700, fontSize: "clamp(28px,3.5vw,44px)", lineHeight: 1.05, color: "var(--charcoal)", marginBottom: 16 }}>
              Stay in the Loop
            </h2>
            <p style={{ fontFamily: GC, fontWeight: 400, fontSize: 16, lineHeight: 1.5, color: "rgba(21,21,21,0.7)", marginBottom: 28 }}>
              Get updates on new products, subscriber-only offers, and calm-first insights.
            </p>
            {submitted ? (
              <p style={{ fontFamily: GC, fontWeight: 600, fontSize: 16, color: "var(--charcoal)" }}>
                Thanks for subscribing!
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  gap: 8,
                  maxWidth: 440,
                  margin: "0 auto",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    flex: "1 1 240px",
                    padding: "14px 20px",
                    borderRadius: 999,
                    border: "2px solid var(--charcoal)",
                    backgroundColor: "transparent",
                    fontFamily: GC,
                    fontWeight: 400,
                    fontSize: 15,
                    color: "var(--charcoal)",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "14px 28px",
                    borderRadius: 999,
                    border: "2px solid var(--charcoal)",
                    backgroundColor: "var(--charcoal)",
                    color: "var(--bone)",
                    fontFamily: GC,
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  Subscribe
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
