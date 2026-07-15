"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import {
  Accessibility,
  X,
  Plus,
  Minus,
  Contrast,
  Link2,
  Type,
  AlignJustify,
  Pause,
  MousePointer2,
  BookOpen,
  RotateCcw,
} from "lucide-react"

type Settings = {
  fontScale: number // 100, 110, 125, 150
  contrast: boolean
  highlightLinks: boolean
  readableFont: boolean
  textSpacing: boolean
  pauseMotion: boolean
  bigCursor: boolean
  readingGuide: boolean
}

const DEFAULTS: Settings = {
  fontScale: 100,
  contrast: false,
  highlightLinks: false,
  readableFont: false,
  textSpacing: false,
  pauseMotion: false,
  bigCursor: false,
  readingGuide: false,
}

const STORAGE_KEY = "avro-a11y"
const SCALES = [100, 110, 125, 150]

export function AccessibilityWidget({
  statementHref = "/accessibility",
}: {
  statementHref?: string
}) {
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState<Settings>(DEFAULTS)
  const [loaded, setLoaded] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const guideRef = useRef<HTMLDivElement>(null)

  // Load persisted settings
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setSettings({ ...DEFAULTS, ...JSON.parse(raw) })
    } catch {
      /* ignore */
    }
    setLoaded(true)
  }, [])

  // Apply settings to <html> + persist
  useEffect(() => {
    if (!loaded) return
    const root = document.documentElement
    root.style.setProperty("--a11y-font-scale", String(settings.fontScale / 100))
    root.toggleAttribute("data-a11y-contrast", settings.contrast)
    root.toggleAttribute("data-a11y-links", settings.highlightLinks)
    root.toggleAttribute("data-a11y-readable", settings.readableFont)
    root.toggleAttribute("data-a11y-spacing", settings.textSpacing)
    root.toggleAttribute("data-a11y-motion", settings.pauseMotion)
    root.toggleAttribute("data-a11y-cursor", settings.bigCursor)
    root.toggleAttribute("data-a11y-guide", settings.readingGuide)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      /* ignore */
    }
  }, [settings, loaded])

  // Reading guide follows the pointer
  useEffect(() => {
    if (!settings.readingGuide) return
    const move = (e: MouseEvent) => {
      if (guideRef.current) guideRef.current.style.top = `${e.clientY}px`
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [settings.readingGuide])

  // Esc to close + focus management
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    const first = panelRef.current?.querySelector<HTMLElement>("button, a, [tabindex]")
    first?.focus()
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  const toggle = useCallback((key: keyof Settings) => {
    setSettings((s) => ({ ...s, [key]: !s[key] }))
  }, [])

  const stepFont = useCallback((dir: 1 | -1) => {
    setSettings((s) => {
      const i = SCALES.indexOf(s.fontScale)
      const next = Math.min(SCALES.length - 1, Math.max(0, i + dir))
      return { ...s, fontScale: SCALES[next] }
    })
  }, [])

  const reset = useCallback(() => setSettings(DEFAULTS), [])

  const activeCount = (Object.keys(settings) as (keyof Settings)[]).filter((k) =>
    k === "fontScale" ? settings.fontScale !== 100 : Boolean(settings[k]),
  ).length

  return (
    <div className="avro-a11y" data-a11y-ui>
      {/* Reading guide overlay */}
      {settings.readingGuide && <div ref={guideRef} className="avro-a11y__guide" aria-hidden="true" />}

      {/* Trigger button */}
      <button
        ref={buttonRef}
        type="button"
        className="avro-a11y__fab"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Open accessibility menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="avro-a11y__pulse" aria-hidden="true" />
        <Accessibility size={26} strokeWidth={2.25} />
      </button>

      {/* Panel */}
      {open && (
        <>
          <div className="avro-a11y__scrim" onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            ref={panelRef}
            className="avro-a11y__panel"
            role="dialog"
            aria-modal="true"
            aria-label="Accessibility settings"
          >
            <div className="avro-a11y__head">
              <div className="avro-a11y__head-titles">
                <span className="avro-a11y__eyebrow">Accessibility</span>
                <h2 className="avro-a11y__title">Adjust your experience</h2>
              </div>
              <button
                type="button"
                className="avro-a11y__close"
                aria-label="Close accessibility menu"
                onClick={() => setOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Text size stepper */}
            <div className="avro-a11y__stepper">
              <div className="avro-a11y__stepper-label">
                <Type size={18} aria-hidden="true" />
                <span>Text size</span>
              </div>
              <div className="avro-a11y__stepper-ctrls">
                <button
                  type="button"
                  aria-label="Decrease text size"
                  onClick={() => stepFont(-1)}
                  disabled={settings.fontScale === SCALES[0]}
                >
                  <Minus size={16} />
                </button>
                <span className="avro-a11y__stepper-val" aria-live="polite">
                  {settings.fontScale}%
                </span>
                <button
                  type="button"
                  aria-label="Increase text size"
                  onClick={() => stepFont(1)}
                  disabled={settings.fontScale === SCALES[SCALES.length - 1]}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Toggle grid */}
            <div className="avro-a11y__grid">
              <Toggle
                icon={<Contrast size={22} />}
                label="High contrast"
                active={settings.contrast}
                onClick={() => toggle("contrast")}
              />
              <Toggle
                icon={<Link2 size={22} />}
                label="Highlight links"
                active={settings.highlightLinks}
                onClick={() => toggle("highlightLinks")}
              />
              <Toggle
                icon={<Type size={22} />}
                label="Readable font"
                active={settings.readableFont}
                onClick={() => toggle("readableFont")}
              />
              <Toggle
                icon={<AlignJustify size={22} />}
                label="Text spacing"
                active={settings.textSpacing}
                onClick={() => toggle("textSpacing")}
              />
              <Toggle
                icon={<Pause size={22} />}
                label="Pause motion"
                active={settings.pauseMotion}
                onClick={() => toggle("pauseMotion")}
              />
              <Toggle
                icon={<MousePointer2 size={22} />}
                label="Large cursor"
                active={settings.bigCursor}
                onClick={() => toggle("bigCursor")}
              />
              <Toggle
                icon={<BookOpen size={22} />}
                label="Reading guide"
                active={settings.readingGuide}
                onClick={() => toggle("readingGuide")}
              />
            </div>

            <div className="avro-a11y__foot">
              <button type="button" className="avro-a11y__reset" onClick={reset} disabled={activeCount === 0}>
                <RotateCcw size={15} />
                Reset{activeCount > 0 ? ` (${activeCount})` : ""}
              </button>
              <a href={statementHref} className="avro-a11y__statement">
                Accessibility statement
              </a>
            </div>
          </div>
        </>
      )}

      <style>{css}</style>
    </div>
  )
}

function Toggle({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className="avro-a11y__toggle"
      data-active={active}
      aria-pressed={active}
      onClick={onClick}
    >
      <span className="avro-a11y__toggle-icon">{icon}</span>
      <span className="avro-a11y__toggle-label">{label}</span>
    </button>
  )
}

const css = `
/* ============ Global effects (applied to <html>) ============ */
:root { --a11y-font-scale: 1; }

html[data-a11y-spacing] p,
html[data-a11y-spacing] li,
html[data-a11y-spacing] a,
html[data-a11y-spacing] span:not([data-a11y-ui] span) {
  line-height: 1.8 !important;
  letter-spacing: 0.06em !important;
  word-spacing: 0.16em !important;
}

html[data-a11y-readable] body:not(:has([data-a11y-ui]:hover)) {
  font-family: Verdana, Tahoma, "Segoe UI", sans-serif !important;
}
html[data-a11y-readable] :not([data-a11y-ui]):not([data-a11y-ui] *) {
  font-family: Verdana, Tahoma, "Segoe UI", sans-serif !important;
}

html[data-a11y-links] a:not([data-a11y-ui] a) {
  text-decoration: underline !important;
  text-underline-offset: 2px !important;
  outline: 2px solid var(--avro-blue, #94C6D4) !important;
  outline-offset: 2px !important;
  border-radius: 2px !important;
}

html[data-a11y-motion] *:not([data-a11y-ui]):not([data-a11y-ui] *) {
  animation-duration: 0.001ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.001ms !important;
  scroll-behavior: auto !important;
}

html[data-a11y-contrast] body {
  background: #000 !important;
}
html[data-a11y-contrast] :not([data-a11y-ui]):not([data-a11y-ui] *):not(svg):not(path) {
  background-color: #000 !important;
  color: #fff !important;
  border-color: #fff !important;
}
html[data-a11y-contrast] a:not([data-a11y-ui] a) { color: #ffea00 !important; }
html[data-a11y-contrast] img,
html[data-a11y-contrast] video { filter: grayscale(100%) contrast(1.1); }

html[data-a11y-cursor] *:not([data-a11y-ui]):not([data-a11y-ui] *) {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'%3E%3Cpath fill='%23151515' stroke='%23fff' stroke-width='1' d='M5 2l14 8-6 1 4 8-3 1-4-8-5 4z'/%3E%3C/svg%3E") 4 2, auto !important;
}

/* Font scaling — px + rem safe (scales the root font size) */
html { font-size: calc(100% * var(--a11y-font-scale)); }

/* ============ Widget UI ============ */
.avro-a11y { font-family: var(--font-dm-sans), system-ui, sans-serif; }
.avro-a11y * { box-sizing: border-box; }

.avro-a11y__guide {
  position: fixed; left: 0; right: 0; height: 44px; z-index: 2147483000;
  margin-top: -22px; pointer-events: none;
  background: rgba(148, 198, 212, 0.16);
  border-top: 2px solid var(--avro-blue, #94C6D4);
  border-bottom: 2px solid var(--avro-blue, #94C6D4);
}

.avro-a11y__fab {
  position: fixed; bottom: 24px; right: 24px; z-index: 2147483001;
  width: 60px; height: 60px; border-radius: 999px; border: 0;
  display: inline-flex; align-items: center; justify-content: center;
  background: #151515; color: #fff; cursor: pointer;
  box-shadow: 0 8px 28px rgba(0,0,0,0.28);
  transition: transform .18s ease, box-shadow .18s ease;
}
.avro-a11y__fab:hover { transform: translateY(-2px) scale(1.04); box-shadow: 0 12px 34px rgba(0,0,0,0.34); }
.avro-a11y__fab:focus-visible { outline: 3px solid var(--avro-blue, #94C6D4); outline-offset: 3px; }
.avro-a11y__pulse {
  position: absolute; inset: 0; border-radius: 999px;
  border: 2px solid var(--avro-blue, #94C6D4);
  animation: avro-a11y-pulse 2.4s ease-out infinite;
}
@keyframes avro-a11y-pulse {
  0% { transform: scale(1); opacity: .7; }
  70% { transform: scale(1.5); opacity: 0; }
  100% { transform: scale(1.5); opacity: 0; }
}

.avro-a11y__scrim {
  position: fixed; inset: 0; z-index: 2147483001;
  background: rgba(21,21,21,0.28); backdrop-filter: blur(2px);
}

.avro-a11y__panel {
  position: fixed; bottom: 96px; right: 24px; z-index: 2147483002;
  width: min(380px, calc(100vw - 32px));
  max-height: min(620px, calc(100vh - 120px)); overflow-y: auto;
  background: #FFFFFF; color: #1C1B14;
  border-radius: 22px; border: 1px solid #E2E2E2;
  box-shadow: 0 24px 60px rgba(0,0,0,0.24);
  padding: 22px;
  animation: avro-a11y-rise .28s cubic-bezier(0.22,1,0.36,1);
}
@keyframes avro-a11y-rise {
  from { opacity: 0; transform: translateY(12px) scale(.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.avro-a11y__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 18px; }
.avro-a11y__eyebrow { text-transform: uppercase; letter-spacing: 0.16em; font-weight: 700; font-size: 11px; color: #6B6857; }
.avro-a11y__title { font-weight: 800; font-size: 20px; line-height: 1.15; margin: 4px 0 0; color: #1C1B14; }
.avro-a11y__close {
  flex-shrink: 0; width: 34px; height: 34px; border-radius: 999px; border: 1px solid #E2E2E2;
  background: #F2F2F2; color: #1C1B14; display: inline-flex; align-items: center; justify-content: center; cursor: pointer;
  transition: background .15s ease;
}
.avro-a11y__close:hover { background: #E2E2E2; }
.avro-a11y__close:focus-visible { outline: 3px solid var(--avro-blue, #94C6D4); outline-offset: 2px; }

.avro-a11y__stepper {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  background: #F2F2F2; border-radius: 14px; padding: 12px 14px; margin-bottom: 16px;
}
.avro-a11y__stepper-label { display: inline-flex; align-items: center; gap: 8px; font-weight: 700; font-size: 14px; color: #1C1B14; }
.avro-a11y__stepper-ctrls { display: inline-flex; align-items: center; gap: 10px; }
.avro-a11y__stepper-ctrls button {
  width: 32px; height: 32px; border-radius: 999px; border: 0; background: #151515; color: #fff;
  display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: opacity .15s ease;
}
.avro-a11y__stepper-ctrls button:hover:not(:disabled) { opacity: .85; }
.avro-a11y__stepper-ctrls button:disabled { opacity: .3; cursor: not-allowed; }
.avro-a11y__stepper-ctrls button:focus-visible { outline: 3px solid var(--avro-blue, #94C6D4); outline-offset: 2px; }
.avro-a11y__stepper-val { min-width: 46px; text-align: center; font-weight: 700; font-size: 14px; color: #1C1B14; }

.avro-a11y__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.avro-a11y__toggle {
  display: flex; flex-direction: column; align-items: flex-start; gap: 10px;
  padding: 14px; border-radius: 14px; border: 1.5px solid #E2E2E2; background: #FFFFFF;
  color: #1C1B14; cursor: pointer; text-align: left; min-height: 92px;
  transition: border-color .15s ease, background .15s ease, transform .12s ease;
}
.avro-a11y__toggle:hover { border-color: #151515; transform: translateY(-1px); }
.avro-a11y__toggle:focus-visible { outline: 3px solid var(--avro-blue, #94C6D4); outline-offset: 2px; }
.avro-a11y__toggle[data-active="true"] { background: #151515; border-color: #151515; color: #fff; }
.avro-a11y__toggle-icon { display: inline-flex; }
.avro-a11y__toggle[data-active="true"] .avro-a11y__toggle-icon { color: var(--avro-blue, #94C6D4); }
.avro-a11y__toggle-label { font-weight: 600; font-size: 13px; line-height: 1.3; }

.avro-a11y__foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 18px; padding-top: 16px; border-top: 1px solid #E2E2E2; }
.avro-a11y__reset {
  display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 999px;
  border: 1.5px solid #E2E2E2; background: #FFFFFF; color: #1C1B14; font-weight: 700; font-size: 13px; cursor: pointer;
  transition: background .15s ease;
}
.avro-a11y__reset:hover:not(:disabled) { background: #F2F2F2; }
.avro-a11y__reset:disabled { opacity: .4; cursor: not-allowed; }
.avro-a11y__reset:focus-visible { outline: 3px solid var(--avro-blue, #94C6D4); outline-offset: 2px; }
.avro-a11y__statement { font-size: 13px; font-weight: 700; color: #1C1B14; text-decoration: underline; text-underline-offset: 2px; }
.avro-a11y__statement:hover { color: #5AAEBC; }

@media (max-width: 480px) {
  .avro-a11y__panel { right: 16px; left: 16px; width: auto; bottom: 88px; }
  .avro-a11y__fab { bottom: 16px; right: 16px; }
}
`
