"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { useThemeMode } from "@/lib/theme-context"

const footerLinks = {
  avro: [
    { href: "/contact", label: "Contact Us" },
    { href: "/shop", label: "My Account" },
    { href: "/shop", label: "Manage Subscription" },
  ],
  shop: [
    { href: "/shop", label: "Shop All" },
    { href: "/calm", label: "Calm" },
    { href: "/focus", label: "Focus" },
    { href: "/energy", label: "Energy" },
    { href: "/shop", label: "Bundle + Save" },
  ],
  learn: [
    { href: "/why-avro", label: "Our Story" },
    { href: "/about", label: "The Team" },
    { href: "/science", label: "Science of AVRO" },
    { href: "/learn", label: "Ingredients" },
    { href: "/golf", label: "Golf" },
    { href: "/work", label: "Work / Tech" },
    { href: "/gaming", label: "Gaming / Poker" },
    { href: "/social", label: "Social / Non Alcohol" },
    { href: "/faq", label: "FAQ" },
  ],
  follow: [
    { href: "/social", label: "Instagram" },
    { href: "/social", label: "TikTok" },
    { href: "/social", label: "Facebook" },
  ],
}

export function Footer() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const themeMode = useThemeMode()
  const isZeroProof = themeMode === "zero-proof"

  // Theme colors — Zero Proof uses deep-black + gold only (no bone)
  const c = isZeroProof
    ? {
        bg: "var(--deep-black)",
        text: "var(--gold)",
        textMuted: "rgba(202,168,75,0.55)",
        textFaint: "rgba(202,168,75,0.35)",
        accent: "var(--gold)",
        border: "rgba(202,168,75,0.12)",
        inputBorder: "rgba(202,168,75,0.25)",
        inputBg: "rgba(202,168,75,0.04)",
        btnBg: "var(--gold)",
        btnText: "var(--deep-black)",
      }
    : {
        bg: "var(--charcoal)",
        text: "var(--bone)",
        textMuted: "rgba(245,240,232,0.55)",
        textFaint: "rgba(245,240,232,0.35)",
        accent: "var(--avro-blue)",
        border: "rgba(245,240,232,0.12)",
        inputBorder: "rgba(245,240,232,0.25)",
        inputBg: "rgba(245,240,232,0.04)",
        btnBg: "var(--avro-blue)",
        btnText: "var(--charcoal)",
      }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <footer
      className="relative overflow-hidden font-sans"
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 max-w-[1400px] mx-auto px-6 lg:px-14 pt-14 lg:pt-20 pb-10 lg:pb-12">
        {/* Left col: newsletter + legal */}
        <div className="flex-none lg:w-[400px] flex flex-col gap-7">
          <div>
            <span
              className="inline-block mb-3 text-[10px] font-bold uppercase tracking-[0.12em]"
              style={{ color: c.accent }}
            >
              Newsletter
            </span>
            <h3
              className="mb-2"
              style={{
                fontWeight: 700,
                fontSize: "32px",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: c.text,
              }}
            >
              Stay in the loop.
            </h3>
            <p
              className="mb-5"
              style={{
                fontWeight: 400,
                fontSize: "15px",
                lineHeight: 1.5,
                color: c.textMuted,
              }}
            >
              Updates, drops, and calm-first insights — straight to your inbox.
            </p>
            {submitted ? (
              <p
                className="font-medium"
                style={{ fontSize: "14px", color: c.accent }}
              >
                Thanks for subscribing.
              </p>
            ) : (
              <form
                className="flex items-stretch overflow-hidden"
                onSubmit={handleSubmit}
                style={{
                  borderRadius: 999,
                  border: `1.5px solid ${c.inputBorder}`,
                  backgroundColor: c.inputBg,
                }}
              >
                <label className="sr-only" htmlFor="footer-email">Email address</label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3 bg-transparent border-0 outline-none placeholder:opacity-50"
                  style={{
                    fontWeight: 400,
                    fontSize: "14px",
                    color: c.text,
                  }}
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 cursor-pointer hover:opacity-90 transition-opacity"
                  style={{
                    fontWeight: 700,
                    fontSize: "13px",
                    backgroundColor: c.btnBg,
                    color: c.btnText,
                    border: "none",
                    margin: 4,
                    borderRadius: 999,
                  }}
                  aria-label="Subscribe"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <small
              style={{
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: 1.5,
                color: c.textFaint,
              }}
            >
              * These statements have not been evaluated by the Food and Drug
              Administration. This product is not intended to diagnose, treat,
              cure, or prevent any disease.
            </small>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-6">
              <span style={{ fontWeight: 400, fontSize: "12px", color: c.textFaint }}>
                © 2026 AVRO Life
              </span>
              {["Privacy", "Terms", "Accessibility", "Returns"].map((label) => (
                <Link
                  key={label}
                  href="/faq"
                  className="hover:opacity-100 transition-opacity"
                  style={{
                    fontWeight: 500,
                    fontSize: "12px",
                    color: c.textMuted,
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="hidden lg:block w-px self-stretch"
          style={{ backgroundColor: c.border }}
          aria-hidden="true"
        />

        {/* Right: nav columns */}
        <div className="flex-1 lg:pl-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <FooterColumn title="Company" links={footerLinks.avro} accent={c.accent} textMuted={c.textMuted} />
            <FooterColumn title="Shop" links={footerLinks.shop} accent={c.accent} textMuted={c.textMuted} />
            <FooterColumn title="Learn" links={footerLinks.learn} accent={c.accent} textMuted={c.textMuted} />
            <FooterColumn title="Follow" links={footerLinks.follow} accent={c.accent} textMuted={c.textMuted} />
          </div>
        </div>
      </div>

      {/* Watermark logo */}
      <div className="flex justify-center overflow-hidden pb-2" aria-hidden="true">
        <Image
          src="/brand/avro-logo-footer.svg"
          alt=""
          width={1200}
          height={390}
          className="w-[min(90vw,900px)] h-auto pointer-events-none select-none"
          style={{
            filter: isZeroProof
              ? "brightness(0) saturate(100%) invert(75%) sepia(50%) saturate(400%) hue-rotate(10deg) brightness(95%)"
              : "invert(1)",
            opacity: 0.08,
          }}
        />
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
  accent,
  textMuted,
}: {
  title: string
  links: { href: string; label: string }[]
  accent: string
  textMuted: string
}) {
  return (
    <div>
      <h4
        className="mb-4"
        style={{
          fontWeight: 700,
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: accent,
        }}
      >
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="block transition-colors hover:opacity-100"
              style={{
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: 1.4,
                color: textMuted,
              }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
