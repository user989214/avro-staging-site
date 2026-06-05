"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useCart } from "@/lib/cart-context"
import { useThemeMode } from "@/lib/theme-context"
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

const navDropdownSections: { heading: string; items: { href: string; label: string; cta: string }[] }[] = [
  {
    heading: "Discover",
    items: [
      { href: "/why-avro", label: "Why AVRO", cta: "Why AVRO" },
      { href: "/science", label: "The Science", cta: "The Science" },
      { href: "/ingredients", label: "Ingredients", cta: "Ingredients" },
    ],
  },
  {
    heading: "By Use Case",
    items: [
      { href: "/work", label: "Work / Tech", cta: "AVRO for Work" },
      { href: "/golf", label: "Golf", cta: "AVRO for Golf" },
      { href: "/gaming", label: "Esports", cta: "AVRO for Esports" },
      { href: "/social", label: "Social / Zero Proof", cta: "AVRO for Social" },
    ],
  },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [navBottom, setNavBottom] = useState(0)
  const navRef = useRef<HTMLElement | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const themeMode = useThemeMode()
  const isZeroProof = themeMode === "zero-proof"

  // Theme colors — Zero Proof uses deep-black + gold only
  const colors = isZeroProof
    ? {
        annBg: "var(--gold)",
        annText: "var(--deep-black)",
        annBtnBg: "var(--deep-black)",
        annBtnText: "var(--gold)",
        navBg: "var(--deep-black)",
        navText: "var(--gold)",
        navTextMuted: "rgba(202,168,75,0.7)",
        cardDarkBg: "var(--dark-surface)",
        cardDarkText: "var(--gold)",
        cardLightBg: "var(--gold)",
        cardLightText: "var(--deep-black)",
        cartBtnBorder: "var(--gold)",
        cartBtnBg: "transparent",
        cartBtnText: "var(--gold)",
        cartCountBg: "var(--gold)",
        cartCountText: "var(--deep-black)",
      }
    : {
        annBg: "var(--avro-blue)",
        annText: "var(--charcoal)",
        annBtnBg: "var(--charcoal)",
        annBtnText: "var(--bone)",
        navBg: "var(--base)",
        navText: "var(--ink)",
        navTextMuted: "var(--warm-gray)",
        cardDarkBg: "var(--charcoal)",
        cardDarkText: "var(--bone)",
        cardLightBg: "var(--avro-blue)",
        cardLightText: "var(--charcoal)",
        cartBtnBorder: "var(--ink)",
        cartBtnBg: "transparent",
        cartBtnText: "var(--ink)",
        cartCountBg: "var(--ink)",
        cartCountText: "var(--bone)",
      }

  const measureNav = () => {
    if (!navRef.current) return
    const rect = navRef.current.getBoundingClientRect()
    setNavBottom(rect.bottom)
  }

  const openDropdown = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    measureNav()
    setDropdownOpen(true)
  }
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 180)
  }
  const { openCart, itemCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
      measureNav()
    }
    const handleResize = () => measureNav()
    measureNav()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
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
      <style jsx global>{`
        .hdr-card-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          align-self: stretch;
          width: 100%;
          min-height: 48px;
          padding: 0 28px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 16px;
          letter-spacing: -0.005em;
          transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .hdr-card-btn-on-dark {
          background-color: var(--bone);
          color: var(--charcoal);
          border: 2px solid var(--bone);
        }
        .hdr-card-btn-on-dark:hover {
          background-color: transparent;
          color: var(--bone);
        }
        .hdr-card-btn-on-blue {
          background-color: var(--charcoal);
          color: var(--bone);
          border: 2px solid var(--charcoal);
        }
        .hdr-card-btn-on-blue:hover {
          background-color: transparent;
          color: var(--charcoal);
        }
      `}</style>
      <header style={{ display: "contents" }}>
      {/* Announcement ticker — continuous marquee. This bar scrolls with the page (it
          is NOT sticky); only the nav below sticks to the top of the viewport. The
          surrounding <header> uses `display: contents` so it doesn't establish a
          containing block — that keeps the nav's `sticky top-0` working against the
          body for the entire page scroll, instead of un-sticking once the header's
          short box scrolls past. */}
      <div
        className="ann-bar"
        style={{
          backgroundColor: colors.annBg,
          color: colors.annText,
          overflow: "hidden",
          position: "relative",
          padding: "11px 0",
          borderBottom: isZeroProof ? "1px solid rgba(202,168,75,0.15)" : "1px solid rgba(21,21,21,0.08)",
        }}
        aria-label="Site announcements"
      >
        <div className="ann-track" style={{ display: "flex", width: "max-content", willChange: "transform" }}>
          {Array.from({ length: 4 }).map((_, copyIdx) => (
            <div key={copyIdx} aria-hidden={copyIdx > 0} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              {[
                "Subscribe and save 25% on every order",
                "Free shipping over $50",
                "Naturally fermented PharmaGABA",
                "Calm, focused energy — without the crash",
                "New: AVRO Focus and AVRO Energy now shipping",
              ].map((msg, i) => (
                <span key={`${copyIdx}-${i}`} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                  <span
                    className="font-serif"
                    style={{
                      fontWeight: 900,
                      fontSize: 17,
                      letterSpacing: "-0.005em",
                      whiteSpace: "nowrap",
                      padding: "0 28px",
                    }}
                  >
                    {msg}
                  </span>
                  <span aria-hidden="true" className="ann-plus" style={{ fontSize: 14, lineHeight: 1, opacity: 0.55, fontWeight: 700, display: "inline-block" }}>+</span>
                </span>
              ))}
              {/* Shop AVRO pill — matches site button styling */}
              <Link
                href="/shop"
                className="ann-shop-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 28px",
                  padding: "0 28px",
                  minHeight: 48,
                  borderRadius: 999,
                  border: `2px solid ${colors.annBtnBg}`,
                  backgroundColor: colors.annBtnBg,
                  color: colors.annBtnText,
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: 16,
                  letterSpacing: "-0.005em",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  transition: "background-color 150ms ease, color 150ms ease",
                }}
              >
                Shop AVRO
              </Link>
              <span aria-hidden="true" className="ann-plus" style={{ fontSize: 14, lineHeight: 1, opacity: 0.55, fontWeight: 700, display: "inline-block" }}>+</span>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes ann-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-25%); }
          }
          .ann-track {
            animation: ann-marquee 42s linear infinite;
          }
          .ann-bar:hover .ann-track {
            animation-play-state: paused;
          }
          .ann-shop-btn:hover {
            background-color: transparent !important;
            color: ${colors.annBtnBg} !important;
          }
          @media (prefers-reduced-motion: reduce) {
            .ann-track { animation: none; }
          }
        `}</style>
      </div>

      {/* Main nav */}
      <nav
        ref={navRef}
        className={`sticky top-0 z-50 grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-0 px-4 md:px-14 py-4 md:py-5 transition-shadow ${
          scrolled ? "shadow-[0_1px_16px_rgba(21,21,21,0.06)]" : ""
        }`}
        style={{ backgroundColor: colors.navBg }}
        aria-label="Primary navigation"
      >
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors"
          style={{ color: colors.navText }}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
        </button>

        {/* Desktop nav - left */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/shop" dark={isZeroProof}>Shop</NavLink>
          <NavLink href="/shop" dark={isZeroProof}>Subscribe</NavLink>
          <div
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={scheduleClose}
          >
            <button className="relative font-serif font-black text-[20px] leading-[1.1] tracking-[-0.005em] transition-colors hover:opacity-70 flex items-center gap-1.5" style={{ color: colors.navText }}>
              Why AVRO
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"/></svg>
            </button>

            {/* Full-width dropdown panel */}
            <div
              className="fixed left-0 right-0 z-50"
              style={{
                top: navBottom,
                pointerEvents: dropdownOpen ? "auto" : "none",
              }}
              aria-hidden={!dropdownOpen}
            >
              <div
                className="w-full"
                style={{
                  backgroundColor: colors.navBg,
                  opacity: dropdownOpen ? 1 : 0,
                  transform: dropdownOpen ? "translateY(0)" : "translateY(-12px)",
                  clipPath: dropdownOpen ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
                  transition: dropdownOpen
                    ? "opacity 0.3s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), clip-path 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
                    : "opacity 0.2s ease, transform 0.25s ease, clip-path 0.25s ease",
                  willChange: "clip-path, transform, opacity",
                }}
              >
                <div className="px-4 md:px-14 py-6">
                  <div className="grid grid-cols-[0.85fr_1.15fr] gap-10">
                    {/* Left half — section nav (Shop / Subscribe / Why AVRO side) */}
                    <div className="grid grid-cols-[1fr_1.3fr]">
                      {navDropdownSections.map((section, sIdx) => (
                        <div
                          key={section.heading}
                          className={sIdx === 0 ? "pr-6" : "pl-6"}
                          style={sIdx > 0 ? { borderLeft: `1px solid ${colors.navText}` } : undefined}
                        >
                          <p
                            className="text-[12px] font-bold pb-3"
                            style={{ color: colors.navTextMuted }}
                          >
                            {section.heading}
                          </p>
                          <div className="flex flex-col items-start gap-1">
                            {section.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setDropdownOpen(false)}
                                className="inline-block px-4 py-1.5 font-serif font-black text-[26px] leading-[1.15] rounded-full transition-colors"
                                style={{ color: colors.navText }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = isZeroProof ? "var(--dark-surface)" : "var(--avro-blue)" }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent" }}
                              >
                                {item.cta}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right half — two feature cards */}
                    <div className="grid grid-cols-2 gap-5">
                      <Link
                        href="/blog"
                        onClick={() => setDropdownOpen(false)}
                        className="flex flex-col justify-between rounded-[24px] p-7 min-h-[230px]"
                        style={{ backgroundColor: colors.cardDarkBg }}
                      >
                        <div>
                          <h3 className="font-serif font-black text-[30px] leading-[1.05]" style={{ color: colors.cardDarkText }}>News & Media</h3>
                          <p className="text-[14px] leading-[1.5] mt-3" style={{ color: colors.cardDarkText, opacity: 0.78 }}>Articles about calm performance, fermentation science and the rituals behind each formula.</p>
                        </div>
                        <span
                          className="hdr-card-btn"
                          style={{
                            backgroundColor: colors.cardDarkText,
                            color: colors.cardDarkBg,
                            border: `2px solid ${colors.cardDarkText}`,
                          }}
                        >
                          Learn More
                        </span>
                      </Link>

                      <Link
                        href="/#footer-newsletter"
                        onClick={() => setDropdownOpen(false)}
                        className="flex flex-col justify-between rounded-[24px] p-7 min-h-[230px]"
                        style={{ backgroundColor: colors.cardLightBg }}
                      >
                        <div>
                          <h3 className="font-serif font-black text-[30px] leading-[1.05]" style={{ color: colors.cardLightText }}>Join Our Community</h3>
                          <p className="text-[14px] leading-[1.5] mt-3" style={{ color: colors.cardLightText, opacity: 0.78 }}>Updates, perks, and calm-first insights — straight to your inbox.</p>
                        </div>
                        <span
                          className="hdr-card-btn"
                          style={{
                            backgroundColor: colors.cardLightText,
                            color: colors.cardLightBg,
                            border: `2px solid ${colors.cardLightText}`,
                          }}
                        >
                          Subscribe to Newsletter
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo - center */}
        <Link
          href="/"
          className="flex items-center justify-center justify-self-center md:justify-self-auto w-[clamp(110px,12vw,160px)]"
          aria-label="AVRO home"
        >
          <Image
            src={isZeroProof ? "/avro-golden-social-logo.svg" : "/brand/avro-logo.svg"}
            alt={isZeroProof ? "AVRO — social" : "AVRO"}
            width={isZeroProof ? 632 : 178}
            height={isZeroProof ? 204 : 58}
            className="w-full h-auto"
            priority
          />
        </Link>

        {/* Desktop nav - right */}
        <div className="hidden md:flex items-center justify-end gap-8">
          <NavLink href="/science" dark={isZeroProof}>Science</NavLink>
          <NavLink href="/faq" dark={isZeroProof}>FAQ</NavLink>
          <button
            onClick={openCart}
            className="hdr-cart-btn relative inline-flex items-center gap-2 transition-colors"
            style={{
              color: colors.cartBtnText,
              padding: "8px 16px 8px 14px",
              borderRadius: 999,
              border: `2px solid ${colors.cartBtnBorder}`,
              backgroundColor: colors.cartBtnBg,
            }}
            aria-label={`Cart with ${itemCount} items`}
          >
            {itemCount > 0 ? (
              <CartIconFilled className="w-[18px] h-[18px]" />
            ) : (
              <CartIcon className="w-[18px] h-[18px]" />
            )}
            <span className="font-serif font-black text-[18px] leading-[1.1] tracking-[-0.005em]">
              Cart
            </span>
            <span
              className="hdr-cart-count inline-flex items-center justify-center min-w-[24px] h-[24px] px-1.5 rounded-full font-serif font-black text-[12px] leading-none"
              style={{
                backgroundColor: colors.cartCountBg,
                color: colors.cartCountText,
              }}
              aria-hidden="true"
            >
              {itemCount}
            </span>
          </button>
          <style>{`
            .hdr-cart-btn { transition: background-color 0.2s ease, color 0.2s ease; }
            .hdr-cart-btn:hover { background-color: ${colors.cartBtnBorder} !important; color: ${colors.navBg} !important; }
            .hdr-cart-btn:hover .hdr-cart-count { background-color: ${colors.navBg} !important; color: ${colors.cartBtnBorder} !important; }
          `}</style>
        </div>

        {/* Mobile cart button */}
        <button
          onClick={openCart}
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full transition-colors"
          style={{ color: colors.navText }}
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
              style={{ backgroundColor: colors.cartCountBg, color: colors.cartCountText }}
            >
              {itemCount}
            </span>
          )}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed left-0 right-0 z-40 md:hidden ${mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        style={{
          top: navBottom,
          bottom: 0,
          backgroundColor: colors.navBg,
          opacity: mobileMenuOpen ? 1 : 0,
          transform: mobileMenuOpen ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1), transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
          overflowY: "auto",
        }}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="px-5 pt-6 pb-10 flex flex-col gap-7">
          {/* Top tier links */}
          <div className="flex flex-col items-start gap-1">
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block px-4 py-1.5 font-serif font-black text-[34px] leading-[1.1] rounded-full"
              style={{ color: colors.navText }}
            >
              Shop
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block px-4 py-1.5 font-serif font-black text-[34px] leading-[1.1] rounded-full"
              style={{ color: colors.navText }}
            >
              Subscribe
            </Link>
          </div>

          {/* Section nav — same heading + pill links as desktop */}
          {navDropdownSections.map((section) => (
            <div key={section.heading} className="flex flex-col">
              <p
                className="text-[12px] font-bold tracking-[0.12em] uppercase pb-2 px-1"
                style={{ color: colors.navTextMuted }}
              >
                {section.heading}
              </p>
              <div className="flex flex-col items-start gap-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-block px-4 py-1.5 font-serif font-black text-[26px] leading-[1.15] rounded-full"
                    style={{ color: colors.navText }}
                  >
                    {item.cta}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Utility links */}
          <div className="flex flex-col items-start gap-1">
            <p
              className="text-[12px] font-bold tracking-[0.12em] uppercase pb-2 px-1"
              style={{ color: colors.navTextMuted }}
            >
              More
            </p>
            {[
              { href: "/science", label: "Science" },
              { href: "/faq", label: "FAQ" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                className="inline-block px-4 py-1.5 font-serif font-black text-[26px] leading-[1.15] rounded-full"
                style={{ color: colors.navText }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Feature cards — same as desktop dropdown, stacked */}
          <div className="grid grid-cols-1 gap-4">
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col justify-between rounded-[24px] p-6 min-h-[200px]"
              style={{ backgroundColor: colors.cardDarkBg }}
            >
              <div>
                <h3 className="font-serif font-black text-[24px] leading-[1.1]" style={{ color: colors.cardDarkText }}>News & Media</h3>
                <p className="text-[14px] leading-[1.5] mt-2" style={{ color: colors.cardDarkText, opacity: 0.78 }}>Articles about calm performance, fermentation science and the rituals behind each formula.</p>
              </div>
              <span
                className="avro-size-md"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "flex-start",
                  marginTop: 16,
                  borderRadius: 999,
                  backgroundColor: colors.cardDarkText,
                  color: colors.cardDarkBg,
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                }}
              >
                Learn More
              </span>
            </Link>

            <Link
              href="/#footer-newsletter"
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col justify-between rounded-[24px] p-6 min-h-[200px]"
              style={{ backgroundColor: colors.cardLightBg }}
            >
              <div>
                <h3 className="font-serif font-black text-[24px] leading-[1.1]" style={{ color: colors.cardLightText }}>Join Our Community</h3>
                <p className="text-[14px] leading-[1.5] mt-2" style={{ color: colors.cardLightText, opacity: 0.78 }}>Updates, perks, and calm-first insights — straight to your inbox.</p>
              </div>
              <span
                className="avro-size-md"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "flex-start",
                  marginTop: 16,
                  borderRadius: 999,
                  backgroundColor: colors.cardLightText,
                  color: colors.cardLightBg,
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                }}
              >
                Subscribe
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
    </>
  )
}

function NavLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link
      href={href}
      className="relative font-serif font-black text-[20px] leading-[1.1] tracking-[-0.005em] transition-colors hover:opacity-70"
      style={{ color: dark ? "var(--gold)" : "var(--ink)" }}
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _UnusedMobileNavLink = MobileNavLink
