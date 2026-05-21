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
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 max-w-[1400px] mx-auto px-5.5 lg:px-14 pt-8 lg:pt-10 pb-6 lg:pb-8">

        {/* Left column */}
        <div className="flex-none lg:flex-[0_0_340px] flex flex-col justify-between gap-8">
          <div>
            <h3
              className="mb-2 uppercase text-white"
              style={{ fontFamily: GC, fontWeight: 800, fontSize: "38px", lineHeight: 1.0 }}
            >
              Stay in the loop
            </h3>
            <p
              className="mb-5 text-white/60"
              style={{ fontFamily: GC, fontWeight: 400, fontSize: "20px", lineHeight: 1.2 }}
            >
              Get AVRO updates, product drops, and calm-first insights delivered
              to your inbox.
            </p>
            <form
              className="flex items-center mb-0 pb-2 border-b-[1.5px] border-white/30"
              onSubmit={handleSubmit}
            >
              <label className="sr-only" htmlFor="footer-email">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-h-[38px] py-1 text-white bg-transparent border-0 outline-none placeholder:text-white/40"
                style={{ fontFamily: GC, fontWeight: 400, fontSize: "20px" }}
              />
              <button
                type="submit"
                className="grid place-items-center p-1 text-white bg-transparent border-0 cursor-pointer transition-transform hover:translate-x-[3px]"
                aria-label="Subscribe"
              >
                <ChevronRight className="w-[18px] h-[18px]" />
              </button>
            </form>
            {submitted && (
              <p className="mt-2" style={{ fontFamily: GC, fontSize: "15px", color: "#87CEEB" }}>
                Thanks for subscribing!
              </p>
            )}
            <small
              className="block mt-4 text-white/40"
              style={{ fontFamily: GC, fontWeight: 400, fontSize: "16px", lineHeight: 1.2 }}
            >
              * These statements have not been evaluated by the Food and Drug
              Administration. This product is not intended to diagnose, treat,
              cure, or prevent any disease.
            </small>
          </div>
          <div className="flex flex-wrap gap-5">
            {["Privacy", "Terms", "Accessibility", "Return Policy"].map((label) => (
              <Link
                key={label}
                href="/faq"
                className="text-white/60 hover:text-white transition-colors"
                style={{ fontFamily: GC, fontWeight: 700, fontSize: "18px", lineHeight: 1 }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right columns */}
        <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:pl-16 lg:border-l lg:border-white/10">
          <FooterColumn title="AVRO" links={footerLinks.avro} />
          <FooterColumn title="Shop" links={footerLinks.shop} />
          <FooterColumn title="Learn" links={footerLinks.learn} />
          <FooterColumn title="Follow" links={footerLinks.follow} />
        </div>
      </div>

      {/* Large centered AVRO logo — decorative, aria-hidden so it doesn't affect semantics */}
      <div className="flex justify-center px-5.5 lg:px-14 pt-5 pb-3 border-t border-white/10" aria-hidden="true">
        <Image
          src="/brand/avro-logo.svg"
          alt=""
          width={820}
          height={265}
          className="w-full max-w-[640px] h-auto invert opacity-20 pointer-events-none"
        />
      </div>

      <div className="flex justify-center max-w-[1400px] mx-auto px-5.5 lg:px-14 pb-6">
        <span
          className="text-white/40"
          style={{ fontFamily: GC, fontWeight: 400, fontSize: "17px" }}
        >
          © 2026 AVRO Life
        </span>
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
  const GC = '"Gotham Condensed", "Gotham", Arial, sans-serif'
  return (
    <div>
      <h4
        className="mb-3 uppercase text-white"
        style={{ fontFamily: GC, fontWeight: 800, fontSize: "26px", lineHeight: 1 }}
      >
        {title}
      </h4>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="block text-white/60 hover:text-white transition-colors"
          style={{ fontFamily: GC, fontWeight: 500, fontSize: "19px", lineHeight: 1.1, paddingTop: "7px", paddingBottom: "7px" }}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}
