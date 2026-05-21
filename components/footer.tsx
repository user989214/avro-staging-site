"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { useState } from "react"

const GC = '"Gotham Condensed", "Gotham", Arial, sans-serif'

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <footer className="relative overflow-hidden text-white bg-black" style={{ fontFamily: GC }}>

      {/* Main content row */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 max-w-[1400px] mx-auto px-6 lg:px-14 pt-10 lg:pt-14 pb-8 lg:pb-10">

        {/* Left col: newsletter + legal */}
        <div className="flex-none lg:w-[360px] flex flex-col gap-7">

          {/* Newsletter box — rounded rectangle */}
          <div
            className="rounded-[12px] border-2 border-white/25 p-5"
          >
            <h3
              className="mb-1 text-white"
              style={{ fontFamily: GC, fontWeight: 800, fontSize: "28px", lineHeight: 1.0 }}
            >
              Stay in the loop
            </h3>
            <p
              className="mb-4 text-white/55"
              style={{ fontFamily: GC, fontWeight: 400, fontSize: "18px", lineHeight: 1.2 }}
            >
              Updates, drops, and calm-first insights.
            </p>
            {submitted ? (
              <p style={{ fontFamily: GC, fontSize: "17px", color: "#87CEEB", fontWeight: 600 }}>
                Thanks for subscribing!
              </p>
            ) : (
              <form
                className="flex items-stretch rounded-[8px] border-2 border-white/35 overflow-hidden"
                onSubmit={handleSubmit}
              >
                <label className="sr-only" htmlFor="footer-email">Email address</label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 text-white bg-transparent border-0 outline-none placeholder:text-white/35"
                  style={{ fontFamily: GC, fontWeight: 400, fontSize: "19px" }}
                />
                <button
                  type="submit"
                  className="flex items-center gap-1 px-5 py-3 text-black bg-white border-0 cursor-pointer hover:opacity-85 transition-opacity"
                  style={{ fontFamily: GC, fontWeight: 800, fontSize: "17px" }}
                  aria-label="Subscribe"
                >
                  Join <ChevronRight className="w-4 h-4 shrink-0" />
                </button>
              </form>
            )}
          </div>

          {/* Legal */}
          <small
            className="text-white/35"
            style={{ fontFamily: GC, fontWeight: 400, fontSize: "15px", lineHeight: 1.25 }}
          >
            * These statements have not been evaluated by the Food and Drug
            Administration. This product is not intended to diagnose, treat,
            cure, or prevent any disease.
          </small>
        </div>

        {/* Right: nav columns */}
        <div className="flex-1 lg:pl-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <FooterColumn title="Company" links={footerLinks.avro} />
            <FooterColumn title="Shop" links={footerLinks.shop} />
            <FooterColumn title="Learn" links={footerLinks.learn} />
            <FooterColumn title="Follow" links={footerLinks.follow} />
          </div>
        </div>
      </div>

      {/* Policy links + copyright — no divider line, sit directly above logo */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-14 pt-2 pb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-6">
          {["Privacy", "Terms", "Accessibility", "Return Policy"].map((label) => (
            <Link
              key={label}
              href="/faq"
              className="text-white/50 hover:text-white transition-colors"
              style={{ fontFamily: GC, fontWeight: 700, fontSize: "17px", lineHeight: 1 }}
            >
              {label}
            </Link>
          ))}
        </div>
        <span
          className="text-white/40"
          style={{ fontFamily: GC, fontWeight: 400, fontSize: "17px" }}
        >
          © 2026 AVRO Life
        </span>
      </div>

      {/* Large AVRO logo watermark */}
      <div className="flex justify-center overflow-hidden pb-2" aria-hidden="true">
        <Image
          src="/brand/avro-logo-footer.svg"
          alt=""
          width={1200}
          height={390}
          className="w-[min(90vw,900px)] h-auto invert opacity-[0.12] pointer-events-none select-none"
        />
      </div>

    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { href: string; label: string }[]
}) {
  return (
    <div>
      <h4
        className="mb-3 text-white"
        style={{ fontFamily: GC, fontWeight: 800, fontSize: "24px", lineHeight: 1 }}
      >
        {title}
      </h4>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="block text-white/55 hover:text-white transition-colors"
          style={{ fontFamily: GC, fontWeight: 500, fontSize: "19px", lineHeight: 1.1, paddingTop: "7px", paddingBottom: "7px" }}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}
