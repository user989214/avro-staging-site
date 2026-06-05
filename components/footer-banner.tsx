interface FooterBannerProps {
  src: string
  alt: string
}

export function FooterBanner({ src, alt }: FooterBannerProps) {
  return (
    <section
      aria-label={alt}
      style={{
        backgroundColor: "#ffffff",
        width: "100%",
        padding: "clamp(0px,calc(8vw - 32px),72px) clamp(0px,calc(6vw - 24px),64px)",
      }}
    >
      <div
        style={{
          maxWidth: 1250,
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "clamp(0px,calc(6vw - 24px),24px)",
          overflow: "hidden",
          padding: "clamp(16px,3vw,40px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          style={{
            display: "block",
            width: "100%",
            maxWidth: 1000,
            height: "auto",
          }}
        />
      </div>
    </section>
  )
}
