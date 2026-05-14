"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { useState } from "react"

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
    <footer className="relative overflow-hidden text-white bg-black">
      {/* Large centered AVRO logo */}
      <div className="flex justify-center px-5.5 lg:px-14 pt-12 lg:pt-20 pb-8 lg:pb-12">
        <Image
          src="/brand/avro-logo.svg"
          alt="AVRO"
          width={820}
          height={265}
          className="w-full max-w-[900px] h-auto invert brightness-0 invert opacity-100"
          priority
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8.5 lg:gap-20 max-w-[1400px] mx-auto px-5.5 lg:px-14 pt-8 lg:pt-12 pb-8 lg:pb-12 border-t border-white/10">
        {/* Left column */}
        <div className="flex-none lg:flex-[0_0_340px] flex flex-col justify-between gap-10.5">
          <div>
            <h3 className="mb-2.5 text-2xl font-black tracking-[-0.3px] leading-none uppercase text-white">
              Stay in the loop
            </h3>
            <p className="mb-6 text-white/60 text-sm leading-snug">
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
                className="flex-1 min-h-[38px] py-1 text-white bg-transparent border-0 outline-none text-[15px] placeholder:text-white/40"
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
              <p className="mt-2 text-sm text-olive font-medium">
                Thanks for subscribing!
              </p>
            )}
            <small className="block mt-5 text-white/40 text-[11px] leading-[1.45]">
              * These statements have not been evaluated by the Food and Drug
              Administration. This product is not intended to diagnose, treat,
              cure, or prevent any disease.
            </small>
          </div>
          <div className="flex flex-wrap gap-6">
            {["Privacy", "Terms", "Accessibility", "Return Policy"].map(
              (label) => (
                <Link
                  key={label}
                  href="/faq"
                  className="text-white/60 text-[13px] hover:text-white transition-colors"
                >
                  {label}
                </Link>
              )
            )}
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

      <div className="flex justify-center lg:justify-end max-w-[1400px] mx-auto px-5.5 lg:px-14 pb-8">
        <span className="text-white/50 text-[13px]">© 2026 AVRO Life</span>
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
      <h4 className="mb-5 text-[13px] font-black tracking-wide uppercase text-white">
        {title}
      </h4>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="block py-1.5 text-white/60 text-sm leading-[1.35] hover:text-white transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}
