"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const reasons = [
  ["FOR GOLFERS", "A simple way to prepare for the moments when calm, clarity and composure matter."],
  ["FOR COACHES", "Supports a golfer’s readiness to receive, process and apply feedback."],
  ["FOR GOLF BUSINESSES", "Adds a differentiated golfer experience designed to strengthen engagement and loyalty."],
]
const steps = [
  ["01", "CHOOSE", "Select Calm, Focus or Energy based on the moment ahead.", "/golf/icons/step-choose.svg"],
  ["02", "MIX", "Mix one stick with 250–300 mL of water.", "/golf/icons/step-mix.svg"],
  ["03", "TIME IT", "Drink approximately 30 minutes before your lesson, practice session or tee time.", "/golf/icons/step-time.svg"],
]
const science = [
  ["PharmaGABA® Foundation", "Calm Starts Here", "Naturally fermented PharmaGABA® is the clinically studied form of GABA at the center of every AVRO formula.", "/golf/icons/pharmagaba.svg"],
  ["AVRO Calm", "Composure When It Matters", "PharmaGABA® plus magnesium for golfers who want a calmer, more composed way to prepare for pressure-sensitive moments.", "/golf/icons/calm-foundation.svg"],
  ["AVRO Focus", "Clearer Attention for Learning", "PharmaGABA® plus Cognigrape® for lessons, fittings and practice sessions that call for calm, attentive focus.", "/golf/icons/mind-body.svg"],
  ["AVRO Energy", "Steady Energy for Demanding Golf Days", "PharmaGABA® plus natural caffeine for early tee times, longer rounds and competition days that require more energy.", "/golf/icons/standards.svg"],
]
const moments = [
  ["FIRST TEE", "A simple pre-round ritual before the opening shot.", "/golf/first-tee.png", "PRE-ROUND", "center 28%"],
  ["TOURNAMENT DAY", "Preparation for pressure-sensitive rounds when composure matters from the start.", "/golf/tournament-day.png", "PRESSURE", "center 40%"],
  ["PRACTICE SESSION", "For range work, coaching sessions and structured practice.", "/golf/practice-session.jpeg", "RANGE WORK", "center 45%"],
  ["CLUBHOUSE + SOCIAL", "An alcohol-free option for post-round conversations, travel days and social golf moments.", "/golf/clubhouse-social.png", "ZERO PROOF", "center 40%"],
]
const products = [
  ["AVRO CALM", "CAFFEINE FREE", "Calm support for pressure-sensitive golf moments.", "First tees, tournament rounds, lessons and moments when composure matters.", "Shop Calm", "/golf/product-calm.png", "/products/calm"],
  ["AVRO FOCUS", "CAFFEINE FREE", "Calm-first preparation with added support for clear, attentive focus.", "Coaching sessions, club fitting, range work and structured practice.", "Shop Focus", "/golf/product-focus.png", "/products/focus"],
  ["AVRO ENERGY", "WITH NATURAL CAFFEINE", "Calm-first preparation with natural caffeine for demanding golf days.", "Early tee times, longer rounds, travel days and competition.", "Shop Energy", "/golf/product-energy.png", "/products/energy"],
]
const faqs = [
  ["Which AVRO formula is best for golf?", "Choose based on the moment ahead. Calm is caffeine-free and designed for composure. Focus is caffeine-free and adds support for clear, attentive focus. Energy combines AVRO’s calm-first foundation with natural caffeine for longer or more demanding golf days."],
  ["When should I take AVRO before a round?", "Mix one stick with 250–300 mL of water and drink it approximately 30 minutes before a lesson, practice session, tee time or competition. Follow the directions on the package."],
  ["What role does AVRO play in golf performance?", "AVRO supports the calm, clear and composed headspace golfers seek. It complements coaching, practice, fitting and technology—it does not replace them or claim to improve the swing or score."],
]

/** Optional background image for the closing "fits your golf" CTA (behind the dark
 * overlay). Empty by default — a faded "CALM" watermark word shows instead. */
const FINAL_BG = ""
/** Faded background word shown when FINAL_BG is empty. */
const FINAL_WORD = "CALM"

/** Inline style helper for the stagger index custom property. */
const ri = (i: number) => ({ ["--ri"]: i }) as React.CSSProperties

/** Word-by-word rising headline — matches the site's page-hero hero motion. */
function Words({ text }: { text: string }) {
  const words = text.split(" ")
  return <>{words.map((w, i) => (
    <span key={i} className="golf-word" style={{ animationDelay: `${(0.1 + i * 0.09).toFixed(2)}s` }}>
      {w}{i < words.length - 1 ? "\u00A0" : ""}
    </span>
  ))}</>
}

/** Hero slideshow slides, in order: woman → man sitting → man golfing → (loop). */
const heroSlides = [
  { src: "/golf/hero-slide-1-female-putting.png", alt: "Golfer lining up a putt on a coastal course wearing an AVRO Golf visor", pos: "72% center" },
  { src: "/golf/hero-slide-2-male-sitting.png", alt: "Golfer in an AVRO Golf cap sitting above a coastal links course", pos: "60% center" },
  { src: "/golf/hero-slide-3-male-address.png", alt: "Golfer addressing the ball with a driver on a clifftop tee", pos: "center center" },
]
/** Seconds each hero slide holds before crossfading — matches the homepage hero. */
const HERO_INTERVAL = 6000
/** Show the lime dotted ticker under the hero copy. */
const HERO_SHOW_TICKER = true

/**
 * Crossfading hero with a lime dotted ticker. The current slide stays fully
 * opaque underneath while the incoming slide fades in on top (no cream flash),
 * mirroring the homepage carousel timing. Holds on frame 1 for reduced motion.
 */
function GolfHero() {
  const [base, setBase] = useState(0)
  const [top, setTop] = useState<number | null>(null)
  const [topVisible, setTopVisible] = useState(false)
  const fadeMs = 900
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const currentRef = useRef(0)
  const current = top !== null ? top : base
  useEffect(() => { currentRef.current = current }, [current])

  const goTo = (next: number) => {
    setBase((cur) => {
      if (next === cur) return cur
      setTop(next)
      setTopVisible(false)
      timers.current.push(setTimeout(() => setTopVisible(true), 20))
      timers.current.push(setTimeout(() => { setBase(next); setTop(null); setTopVisible(false) }, fadeMs + 40))
      return cur
    })
  }

  useEffect(() => {
    if (heroSlides.length <= 1) return
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduce) return
    const id = setInterval(() => goTo((currentRef.current + 1) % heroSlides.length), HERO_INTERVAL)
    const t = timers.current
    return () => { clearInterval(id); t.forEach(clearTimeout); t.length = 0 }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const layer = (idx: number, visible: boolean): React.CSSProperties => ({
    position: "absolute", inset: 0, width: "100%", height: "100%",
    objectFit: "cover", objectPosition: heroSlides[idx].pos,
    opacity: visible ? 1 : 0, transition: `opacity ${fadeMs}ms ease-in-out`,
  })

  return (
    <section className="golf-hero golf-tile">
      <div className="golf-hero-img-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroSlides[base].src || "/placeholder.svg"} alt={heroSlides[base].alt} className="golf-cover golf-hero-img" style={layer(base, true)} />
        {top !== null && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroSlides[top].src || "/placeholder.svg"} alt="" className="golf-cover golf-hero-img" style={layer(top, topVisible)} />
        )}
        <div className="golf-hero-shade" />
      </div>
      <div className="golf-hero-copy">
        <h1><Words text="Golf Performance Begins Before the First Swing." /></h1>
        <p data-reveal style={ri(2)}>AVRO supports the calm, clear and composed headspace golfers seek before lessons, practice and competition—so they can step into the moment ready.</p>
        <div className="golf-actions" data-reveal style={ri(3)}><Link href="#shop" className="golf-btn golf-btn-light">Choose Your Formula</Link><Link href="/shop" className="golf-btn golf-btn-ghost">Shop AVRO</Link></div>
        {HERO_SHOW_TICKER && heroSlides.length > 1 && (
          <div className="golf-hero-dots" role="tablist" aria-label="Hero slides" data-reveal style={ri(4)}>
            {heroSlides.map((s, idx) => (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={current === idx}
                aria-label={`Show slide ${idx + 1}`}
                className={current === idx ? "is-active" : undefined}
                onClick={() => goTo(idx)}
              />
            ))}
          </div>
        )}
      </div>
      {/* The 01/02/03 ritual steps live in a single place — the "How to use AVRO
          before golf" section below — so the hero stays clean like other pages. */}
    </section>
  )
}

/** Golf announcement ticker — black band, white uppercase copy, lime dots between
 *  phrases. Mirrors the site header marquee (42s linear loop, 4 copies, pauses on
 *  hover, honors reduced-motion) but golf-styled. */
const tickerMessages = [
  "Calm First Performance",
  "Subscribe & Save 15%",
  "Free Shipping on 2+ Tubes",
  "Naturally Fermented PharmaGABA",
  "Calm, Focused Energy — Without the Crash",
]
function GolfTicker() {
  return (
    <div className="golf-ticker" aria-label="Announcements">
      <div className="golf-ticker-track">
        {Array.from({ length: 4 }).map((_, copyIdx) => (
          <div className="golf-ticker-group" key={copyIdx} aria-hidden={copyIdx > 0}>
            {tickerMessages.map((msg, i) => (
              <span className="golf-ticker-item" key={`${copyIdx}-${i}`}>
                <span className="golf-ticker-text">{msg}</span>
                <span className="golf-ticker-dot" aria-hidden="true" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function GolfPage() {
  // Scroll-reveal — fade/rise elements into view (matches the site's page-hero
  // motion language). Content stays visible if JS never runs: the hidden state
  // only applies once [data-ready] is set here.
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".golf-page")
    if (!root) return
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"))
    root.setAttribute("data-ready", "")
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduce || typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("is-in"))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in")
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return <main className="golf-page">
    <GolfTicker />
    <GolfHero />

    <section className="golf-pressure golf-tile">
      <div className="golf-copy"><h2 data-reveal style={ri(1)}>Golf can get <mark className="golf-mark">loud in your head</mark> fast.</h2><p data-reveal style={ri(2)}>When the moment gets bigger, so does the noise. The first tee. A difficult approach. A lesson where every detail matters. When pressure rises, golfers need more than physical preparation—they need a better way to step into the moment.</p></div>
      <div className="golf-pressure-image" data-reveal style={ri(1)}><Image src="/golf/golfer-address.png" alt="Golfer preparing to address the ball on a coastal course" fill sizes="(max-width: 768px) 100vw, 50vw" className="golf-cover" /><span className="golf-pressure-pill"><b>~30<i>min</i></b>before your round</span></div>
    </section>

    <section className="golf-section golf-tile"><div className="golf-heading golf-heading-split" data-reveal><h2>Why AVRO Matters in Golf</h2><p>A calm-first platform with a clear role across the modern golf experience.</p></div><div className="golf-three">{reasons.map((x,i)=><article className="golf-reason" data-reveal style={ri(i)} key={x[0]}><span>0{i+1}</span><Image src={["/golf/icons/calm-before-pressure.svg","/golf/icons/clarity.svg","/golf/icons/built-for-ritual.svg"][i]} alt="" width={64} height={64}/><h3>{x[0]}</h3><p>{x[1]}</p></article>)}</div></section>

    <section className="golf-section golf-dark golf-tile"><div className="golf-heading" data-reveal><h2>How To Use AVRO Before Golf. <span className="golf-accent">Choose. Mix. Time It.</span></h2><p>A simple pre-golf ritual in three steps — before lessons, practice or play. Prepare, choose your formula, and step in calm, clear and composed.</p></div><div className="golf-three">{steps.map((x,i)=><article className="golf-step" data-reveal style={ri(i)} key={x[0]}><div><strong>{x[0]}</strong><Image src={x[3]} alt="" width={70} height={70}/></div><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div></section>

    <section className="golf-section golf-tile"><div className="golf-heading" data-reveal><h2>Calm First. Then Support The Moment.</h2><p>The science and formula logic behind every tube: each AVRO formula begins with naturally fermented PharmaGABA®, a clinically studied form of GABA.</p></div><div className="golf-science">{science.map((x,i)=><article data-reveal style={ri(i)} key={x[0]}><Image src={x[3]} alt="" width={60} height={60}/><h3>{x[0]}</h3><p><b>{x[1]}.</b> {x[2]}</p></article>)}</div></section>

    <section className="golf-section golf-tile"><div className="golf-heading golf-heading-split" data-reveal><h2>Golf Use Moments</h2><p>One calm-first foundation, ready for the moments that shape the golf experience.</p></div><div className="golf-moments">{moments.map((x,i)=><article data-reveal style={ri(i)} key={x[0]}><div><Image src={x[2]} alt={`${x[0].toLowerCase()} golf moment`} fill sizes="(max-width: 768px) 100vw, 25vw" className="golf-cover" style={{objectPosition:x[4]}}/><span className="golf-moment-pill">{x[3]}</span></div><h3>{x[0]}</h3><p>{x[1]}</p></article>)}</div></section>

    <section id="shop" className="golf-section golf-dark golf-tile"><div className="golf-heading" data-reveal><h2>Shop AVRO For Golf</h2><p>Choose your formula. Same calm-first base, three ways to meet the moment.</p></div><div className="golf-products">{products.map((x,i)=><article data-reveal style={ri(i)} key={x[0]}><small>{x[1]}</small><div className="golf-product-image"><Image src={x[5]} alt={`${x[0]} drink mix`} fill sizes="(max-width: 768px) 100vw, 33vw" className="golf-cover"/></div><h3>{x[0]}</h3><p>{x[2]}</p><p><b>BEST FOR</b>{x[3]}</p><Link href={x[6]} className="golf-btn golf-btn-light">{x[4]} →</Link></article>)}</div></section>

    <section className="golf-faq golf-tile"><div data-reveal><h2>Questions Before The First Tee</h2><p>Straight answers about choosing and using AVRO for golf.</p></div><div data-reveal style={ri(1)}>{faqs.map((x)=><details key={x[0]}><summary>{x[0]}<span>+</span></summary><p>{x[1]}</p></details>)}</div></section>

    <section className="golf-final golf-tile">
      <div className={`golf-final-bg${FINAL_BG ? " has-img" : ""}`} aria-hidden="true">{FINAL_BG ? <Image src={FINAL_BG} alt="" fill sizes="100vw" priority className="golf-cover" /> : <span className="golf-final-word">{FINAL_WORD}</span>}</div>
      {/* Shop buttons use the site's outline pill language; Calm carries the lime outline. */}
      <div data-reveal><h2>Calm First. Play Your Game.</h2><p>Choose the formula that fits your golf. Start with calm — then pick Calm, Focus or Energy for the moment ahead.</p><div className="golf-actions"><Link href="/products/calm" className="golf-btn golf-btn-outline golf-btn-outline-lime">Shop Calm</Link><Link href="/products/focus" className="golf-btn golf-btn-outline">Shop Focus</Link><Link href="/products/energy" className="golf-btn golf-btn-outline">Shop Energy</Link></div></div>
    </section>

    <GolfFooter />
  </main>
}

const footerCols: [string, [string, string][]][] = [
  ["Shop", [["Calm", "/calm"], ["Focus", "/focus"], ["Energy", "/energy"], ["Bundle + Save", "/shop"]]],
  ["Learn", [["Why AVRO", "/why-avro"], ["The Science", "/science"], ["Ingredients", "/ingredients"], ["Golf", "/golf"]]],
  ["Company", [["Contact", "/contact"], ["FAQ", "/faq"], ["Instagram", "https://www.instagram.com/avrohydrate"], ["LinkedIn", "https://www.linkedin.com/company/avrohydrate"]]],
]

/** Golf-only footer — mirrors the site footer's format with the AVRO Golf wordmark. */
function GolfFooter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  return (
    <footer className="golf-footer">
      <div className="golf-footer-inner">
        <div className="golf-footer-news">
          <p className="golf-kicker">NEWSLETTER</p>
          <h3>Join our community.</h3>
          <p>Updates, perks, and calm-first insights — straight to your inbox.</p>
          {submitted ? (
            <p className="golf-footer-thanks">Thanks for subscribing.</p>
          ) : (
            <form className="golf-footer-sub" onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>
              <label className="sr-only" htmlFor="golf-footer-email">Email address</label>
              <input id="golf-footer-email" type="email" required placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button type="submit">Subscribe</button>
            </form>
          )}
        </div>

        <hr className="golf-footer-rule" />

        <div className="golf-footer-mid">
          <div className="golf-footer-brand">
            <Image src="/golf/avro-golf-wordmark-wide.png" alt="AVRO Golf" width={520} height={165} className="golf-footer-logo" />
            <p>Calm-first performance drink mix. Built to support state before stimulation.*</p>
          </div>
          <div className="golf-footer-cols">
            {footerCols.map(([title, links]) => (
              <div key={title}>
                <h4>{title}</h4>
                <ul>{links.map(([label, href]) => <li key={label}><Link href={href}>{label}</Link></li>)}</ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="golf-footer-rule" />

        <div className="golf-footer-disclaimer">
          <small>* These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</small>
          <small className="golf-footer-source">** Source: www.pharmagaba.com</small>
        </div>

        <div className="golf-footer-legal">
          <span>© 2026 AVRO Life</span>
          <div className="golf-footer-legal-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/accessibility">Accessibility</Link>
            <Link href="/returns">Returns</Link>
          </div>
        </div>
      </div>
      <div className="golf-footer-watermark" aria-hidden="true">AVRO GOLF</div>
    </footer>
  )
}
