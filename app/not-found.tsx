import Link from "next/link"
import { FinalCta } from "@/components/sections"

const GC = '"DM Sans", system-ui, sans-serif'

export default function NotFound() {
  return (
    <main
      style={{
        width: "100%",
        backgroundColor: "var(--base)",
        color: "var(--ink)",
      }}
    >
      {/* Hero card — matches the flat PageHero rounded card treatment */}
      <section
        style={{
          width: "100%",
          backgroundColor: "var(--base)",
          padding: 0,
        }}
      >
        <div
          style={{
            width: "calc(100% - 32px)",
            margin: "0 auto 16px",
            borderRadius: 20,
            overflow: "hidden",
            backgroundColor: "var(--base-light)",
            position: "relative",
            minHeight: "clamp(380px, 52vh, 560px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "clamp(64px, 10vw, 120px) clamp(20px, 5vw, 64px)",
          }}
        >
          {/* Subtle gradient accent */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 70% 60% at 50% 110%, rgba(202,168,75,0.08) 0%, rgba(202,168,75,0) 65%)",
              pointerEvents: "none",
            }}
          />

          {/* 404 number */}
          <p
            style={{
              fontFamily: GC,
              fontWeight: 900,
              fontSize: "clamp(96px, 16vw, 200px)",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              color: "var(--charcoal)",
              opacity: 0.08,
              userSelect: "none",
              marginBottom: 0,
              position: "relative",
            }}
          >
            404
          </p>

          {/* Headline */}
          <h1
            style={{
              fontFamily: GC,
              fontWeight: 900,
              fontSize: "clamp(32px, 4.5vw, 56px)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              marginTop: "clamp(-32px, -3vw, -48px)",
              marginBottom: 16,
              position: "relative",
              maxWidth: 640,
            }}
          >
            Page not found.
          </h1>

          {/* Lede */}
          <p
            style={{
              fontFamily: GC,
              fontWeight: 500,
              fontSize: "clamp(16px, 1.5vw, 19px)",
              lineHeight: 1.5,
              color: "var(--warm-gray)",
              maxWidth: 460,
              marginBottom: 36,
              position: "relative",
            }}
          >
            This page doesn&apos;t exist. Let&apos;s get you back to something that does.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Link href="/" className="btn-primary">
              Back to home
            </Link>
            <Link href="/shop" className="btn-secondary">
              Shop AVRO
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA — matches every other page */}
      <FinalCta />
    </main>
  )
}
