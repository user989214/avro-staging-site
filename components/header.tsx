"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useCart } from "@/lib/cart-context"
import { Plus, X } from "lucide-react"

function CartIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={className}>
      <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
    </svg>
  )
}

function CartIconFilled({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={className}>
      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0"/>
    </svg>
  )
}

const navDropdownSections: { heading: string; items: { href: string; label: string; desc: string }[] }[] = [
  {
    heading: "Discover",
    items: [
      { href: "/why-avro", label: "Why AVRO", desc: "The calm-first philosophy behind every formula." },
      { href: "/science", label: "The Science", desc: "Naturally fermented PharmaGABA®, clinically backed." },
      { href: "/learn", label: "Ingredients", desc: "Functional, food-grade, transparently sourced." },
    ],
  },
  {
    heading: "By Use Case",
    items: [
      { href: "/golf", label: "Golf", desc: "Composure under pressure, on every shot." },
      { href: "/work", label: "Work / Tech", desc: "Sustained focus without the jitter." },
      { href: "/gaming", label: "Gaming / Poker", desc: "Steady state for high-stakes decisions." },
      { href: "/social", label: "Social / Non-Alcohol", desc: "Show up calm, clear, and present." },
    ],
  },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { openCart, itemCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  return (
    <>
      {/* Announcement bar — Avro Blue background, Gotham Condensed type */}
      <div
        className="flex justify-center gap-4 md:gap-12 px-4 md:px-8 py-3 md:py-3.5 text-[14px] md:text-[15px] uppercase text-center"
        style={{
          backgroundColor: "var(--avro-blue)",
          color: "var(--charcoal)",
          fontFamily: 'var(--font-serif)',
          fontWeight: 700,
          letterSpacing: "0.05em",
        }}
      >
        <span>
          ✦ Subscribe and save 25% on every order —{" "}
          <Link
            href="/shop"
            className="underline underline-offset-4 hover:opacity-70 transition-opacity"
            style={{ color: "var(--charcoal)" }}
          >
            Shop AVRO
          </Link>
        </span>
        <span className="hidden md:inline" style={{ color: "rgba(21,21,21,0.6)" }}>
          Free shipping over $50
        </span>
      </div>

      {/* Main nav — cream/base background, charcoal text, DM Sans */}
      <nav
        className={`sticky top-0 z-50 grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-0 px-4 md:px-14 py-4 md:py-5 transition-shadow ${
          scrolled ? "shadow-[0_1px_16px_rgba(21,21,21,0.06)]" : ""
        }`}
        style={{ backgroundColor: "var(--base)" }}
        aria-label="Primary navigation"
      >
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors"
          style={{ color: "var(--charcoal)" }}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
        </button>

        {/* Desktop nav - left */}
        <div className="hidden md:flex items-center gap-7">
          <NavLink href="/shop">Shop</NavLink>
          <NavLink href="/shop">Subscribe</NavLink>
          <div
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="relative text-[15px] font-bold tracking-[0.08em] uppercase transition-colors hover:opacity-70 flex items-center gap-1" style={{ color: "var(--ink)" }}>
              Why AVRO
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"/></svg>
            </button>
          </div>
        </div>

        {/* Logo - center */}
        <Link
          href="/"
          className="flex items-center justify-center justify-self-center md:justify-self-auto w-[clamp(110px,12vw,160px)]"
          aria-label="AVRO home"
        >
          <Image
            src="/brand/avro-logo.svg"
            alt="AVRO"
            width={178}
            height={58}
            className="w-full h-auto"
            priority
          />
        </Link>

        {/* Desktop nav - right */}
        <div className="hidden md:flex items-center justify-end gap-7">
          <NavLink href="/science">Science</NavLink>
          <NavLink href="/faq">FAQ</NavLink>
          <button
            onClick={openCart}
            className="relative text-[15px] font-bold tracking-[0.08em] uppercase transition-colors flex items-center gap-1.5"
            style={{ color: "var(--ink)" }}
          >
            Cart
            <span
              className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold"
              style={{
                backgroundColor: "var(--avro-blue)",
                color: "var(--charcoal)",
              }}
            >
              {itemCount}
            </span>
          </button>
        </div>

        {/* Mobile cart button */}
        <button
          onClick={openCart}
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full transition-colors"
          style={{ color: "var(--charcoal)" }}
          aria-label={`Cart with ${itemCount} items`}
        >
          {itemCount > 0 ? (
            <CartIconFilled className="w-6 h-6" />
          ) : (
            <CartIcon className="w-6 h-6" />
          )}
          {itemCount > 0 && (
            <span
              className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold"
              style={{ backgroundColor: "var(--avro-blue)", color: "var(--charcoal)" }}
            >
              {itemCount}
            </span>
          )}
        </button>
      </nav>

      {/* Why AVRO dropdown panel — drops from the bottom of the nav */}
      <div
        className="hidden md:block fixed left-0 right-0 z-40 pointer-events-none"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
        style={{
          top: scrolled ? 73 : 122,
          height: dropdownOpen ? "auto" : 0,
          overflow: "hidden",
          transition: "top 0.2s ease",
        }}
        aria-hidden={!dropdownOpen}
      >
        <div className="mx-auto max-w-[1480px] px-4 lg:px-8">
          <div
            className="pointer-events-auto"
            style={{
              backgroundColor: "var(--base)",
              borderBottomLeftRadius: 32,
              borderBottomRightRadius: 32,
              boxShadow: dropdownOpen ? "0 24px 48px -12px rgba(21,21,21,0.22)" : "none",
              transform: dropdownOpen ? "translateY(0)" : "translateY(-100%)",
              transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease",
            }}
          >
            <div className="px-8 lg:px-12 py-10">
              <div className="flex flex-col gap-10">
                {navDropdownSections.map((section, sIdx) => (
                  <div key={section.heading}>
                    <div
                      className="mb-5 text-[12px] font-bold uppercase tracking-[0.14em]"
                      style={{
                        color: "var(--warm-gray)",
                        opacity: dropdownOpen ? 1 : 0,
                        transform: dropdownOpen ? "translateY(0)" : "translateY(8px)",
                        transition: `opacity 0.3s ease ${0.05 + sIdx * 0.06}s, transform 0.3s ease ${0.05 + sIdx * 0.06}s`,
                      }}
                    >
                      {section.heading}
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {section.items.map((item, idx) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setDropdownOpen(false)}
                          className="group flex flex-col justify-between rounded-[20px] p-6"
                          style={{
                            backgroundColor: "var(--charcoal)",
                            minHeight: 180,
                            opacity: dropdownOpen ? 1 : 0,
                            transform: dropdownOpen ? "translateY(0)" : "translateY(10px)",
                            transition: `opacity 0.3s ease ${0.1 + sIdx * 0.06 + idx * 0.04}s, transform 0.3s ease ${0.1 + sIdx * 0.06 + idx * 0.04}s`,
                          }}
                        >
                          <div className="flex flex-col gap-2.5">
                            <span
                              className="text-[16px] font-bold uppercase tracking-[0.06em] leading-tight"
                              style={{ color: "var(--bone)" }}
                            >
                              {item.label}
                            </span>
                            <span
                              className="text-[13px] leading-[1.5]"
                              style={{ color: "var(--bone)", opacity: 0.7, fontWeight: 500 }}
                            >
                              {item.desc}
                            </span>
                          </div>
                          <span
                            className="mt-4 inline-flex items-center justify-center gap-1.5 self-start rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em]"
                            style={{ backgroundColor: "var(--avro-blue)", color: "var(--charcoal)" }}
                          >
                            Explore
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 transform transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "var(--base)", top: "var(--header-height, 100px)" }}
      >
        <div className="pt-6 pb-8 px-6 h-full overflow-y-auto">
          <nav className="space-y-1">
            <MobileNavLink href="/shop" onClick={() => setMobileMenuOpen(false)}>Shop</MobileNavLink>
            <MobileNavLink href="/shop" onClick={() => setMobileMenuOpen(false)}>Subscribe</MobileNavLink>
            <div className="my-4" style={{ borderTop: "1px solid var(--divider)" }} />
            <p
              className="text-[10px] font-bold uppercase tracking-[0.12em] px-4 py-2"
              style={{ color: "var(--warm-gray)" }}
            >
              Discover
            </p>
            {navDropdownSections.flatMap((section) =>
              section.items.map((item) => (
                <MobileNavLink key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                  {item.label}
                </MobileNavLink>
              ))
            )}
            <div className="my-4" style={{ borderTop: "1px solid var(--divider)" }} />
            <MobileNavLink href="/science" onClick={() => setMobileMenuOpen(false)}>Science</MobileNavLink>
            <MobileNavLink href="/faq" onClick={() => setMobileMenuOpen(false)}>FAQ</MobileNavLink>
            <MobileNavLink href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</MobileNavLink>
          </nav>
        </div>
      </div>
    </>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
  <Link
  href={href}
  className="relative text-[15px] font-bold tracking-[0.08em] uppercase transition-colors hover:opacity-70"
  style={{ color: "var(--ink)" }}
  >
  {children}
  </Link>
  )
  }

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-3 text-lg font-medium rounded-full transition-colors"
      style={{ color: "var(--ink)" }}
    >
      {children}
    </Link>
  )
}
