/**
 * Renders one of the brand data graphics (public/graphics/*.html) verbatim
 * inside an isolated, responsive iframe. The source HTML is self-contained
 * (its own SVG card, colors and DM Sans font), so we just size the frame to
 * the graphic's native aspect ratio and let it scale to the container width.
 */
export function EmbeddedGraphic({
  src,
  ratio,
  title,
  maxWidth,
}: {
  /** Path to the graphic HTML, e.g. "/graphics/calm.html". */
  src: string
  /** Native aspect ratio as a CSS value, e.g. "1200 / 740". */
  ratio: string
  /** Accessible title for the embedded frame. */
  title: string
  /** Optional max width (px) to keep the graphic from over-scaling. */
  maxWidth?: number
}) {
  // Bump this when the graphic HTML changes so browsers/iframes refetch the
  // updated file instead of serving a stale cached copy.
  const GRAPHIC_VERSION = "5"
  const versionedSrc = src.includes("?") ? `${src}&v=${GRAPHIC_VERSION}` : `${src}?v=${GRAPHIC_VERSION}`

  return (
    <div style={{ width: "100%", maxWidth, margin: maxWidth ? "0 auto" : undefined }}>
      <iframe
        src={versionedSrc}
        title={title}
        loading="lazy"
        scrolling="no"
        style={{
          width: "100%",
          aspectRatio: ratio,
          border: 0,
          display: "block",
          colorScheme: "light",
        }}
      />
    </div>
  )
}
