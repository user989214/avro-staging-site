interface FooterBannerProps {
  src: string
  alt: string
}

export function FooterBanner({ src, alt }: FooterBannerProps) {
  return (
    <section
      aria-label={alt}
      style={{ backgroundColor: "#ffffff", padding: "clamp(24px, 5vw, 64px) 16px" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        style={{
          display: "block",
          width: "100%",
          maxWidth: 1100,
          height: "auto",
          margin: "0 auto",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        }}
      />
    </section>
  )
}
