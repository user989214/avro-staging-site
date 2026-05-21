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

const navDropdownItems = [
  { href: "/why-avro", label: "Why AVRO" },
  { href: "/science", label: "The Science of AVRO" },
  { href: "/learn", label: "Ingredients" },
  { href: "/golf", label: "Golf" },
  { href: "/work", label: "Work / Tech" },
  { href: "/gaming", label: "Gaming / Poker" },
  { href: "/social", label: "Social / Non Alcohol" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { openCart, itemCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
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
      <div className="flex justify-center gap-4 md:gap-15 px-4 md:px-8 py-3 bg-soft text-ink/70 text-[11px] md:text-[13px] font-black tracking-wide uppercase text-center">
        <span>
          Naturally Fermented PharmaGABA® -{" "}
          <Link
            href="/science"
            className="text-ink underline underline-offset-3 hover:text-olive transition-colors"
          >
            Learn More
          </Link>
        </span>
        <span className="hidden md:inline">
          Free Shipping Over $50 -{" "}
          <Link
            href="/shop"
            className="text-ink underline underline-offset-3 hover:text-olive transition-colors"
          >
            Shop AVRO
          </Link>
        </span>
      </div>

      <nav
        className={`sticky top-0 z-50 grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-0 px-4 md:px-14 py-4 md:py-5 bg-white transition-shadow ${
          scrolled ? "shadow-[0_1px_16px_rgba(0,0,0,0.06)]" : ""
        }`}
        aria-label="Primary navigation"
      >
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center text-olive-dark hover:bg-gray-100 rounded-lg transition-colors"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
        </button>

        {/* Desktop nav - left */}
        <div className="hidden md:flex items-center gap-7">
          <NavLink href="/shop">Shop</NavLink>
          <NavLink href="/shop">Subscribe</NavLink>
          <div className="relative group">
            <NavLink href="/why-avro">Why AVRO</NavLink>
            <div className="absolute top-full left-1/2 -translate-x-1/2 z-50 min-w-[240px] py-2.5 bg-white rounded-md shadow-[0_8px_32px_rgba(0,0,0,0.1)] opacity-0 invisible translate-y-1.5 transition-all group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0">
              {navDropdownItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-6 py-2 text-ink/80 text-[13px] font-semibold tracking-wide uppercase hover:text-ink hover:bg-soft transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Logo - center */}
        <Link
          href="/"
          className="flex items-center justify-center justify-self-center md:justify-self-auto w-[clamp(122px,14vw,178px)]"
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
            className="relative text-ink/70 text-[15px] font-black tracking-wide uppercase hover:text-ink transition-colors"
          >
            Cart{" "}
            <span className="inline-flex items-center justify-center w-5 h-5 ml-1 text-ink/70 border-[1.5px] border-ink/40 rounded-full text-[11px] align-[1px]">
              {itemCount}
            </span>
          </button>
        </div>

        {/* Mobile cart button */}
        <button
          onClick={openCart}
          className="md:hidden relative w-10 h-10 flex items-center justify-center text-olive-dark hover:bg-gray-100 rounded-lg transition-colors"
          aria-label={`Cart with ${itemCount} items`}
        >
          {itemCount > 0 ? (
            <CartIconFilled className="w-6 h-6" />
          ) : (
            <CartIcon className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ top: "var(--header-height, 120px)" }}
      >
        <div className="pt-6 pb-8 px-6 h-full overflow-y-auto">
          <nav className="space-y-1">
            <MobileNavLink href="/shop" onClick={() => setMobileMenuOpen(false)}>
              Shop
            </MobileNavLink>
            <MobileNavLink href="/shop" onClick={() => setMobileMenuOpen(false)}>
              Subscribe
            </MobileNavLink>
            <div className="border-t border-gray-100 my-4" />
            <p className="text-xs font-bold text-ink/50 uppercase tracking-wider px-4 py-2">
              Discover
            </p>
            {navDropdownItems.map((item) => (
              <MobileNavLink
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </MobileNavLink>
            ))}
            <div className="border-t border-gray-100 my-4" />
            <MobileNavLink href="/science" onClick={() => setMobileMenuOpen(false)}>
              Science
            </MobileNavLink>
            <MobileNavLink href="/faq" onClick={() => setMobileMenuOpen(false)}>
              FAQ
            </MobileNavLink>
            <MobileNavLink href="/contact" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </MobileNavLink>
          </nav>
        </div>
      </div>
    </>
  )
}

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="relative text-ink/70 text-[15px] font-black tracking-wide uppercase hover:text-ink transition-colors after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-ink after:transition-[width] hover:after:w-full"
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
      className="block px-4 py-3 text-olive-dark text-lg font-semibold hover:bg-gray-50 rounded-lg transition-colors"
    >
      {children}
    </Link>
  )
}
