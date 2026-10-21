"use client"

import { useEffect, useRef, useState } from "react"
import {
  Accessibility,
  Check,
  ChevronDown,
  Contrast,
  RotateCcw,
  Type,
  Eye,
  PauseCircle,
  MousePointer,
  Palette,
} from "lucide-react"

import { cn } from "@/lib/utils"

type TextSize = "default" | "large" | "larger"

const TEXT_SIZE_KEY = "fisheries-text-size"
const HIGH_CONTRAST_KEY = "fisheries-high-contrast"
const DYSLEXIC_FONT_KEY = "fisheries-dyslexic-font"
const REDUCE_MOTION_KEY = "fisheries-reduce-motion"
const GRAYSCALE_KEY = "fisheries-grayscale"
const LARGE_CURSOR_KEY = "fisheries-large-cursor"

function isValidTextSize(value: string | null): value is TextSize {
  return value === "default" || value === "large" || value === "larger"
}

export function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [textSize, setTextSize] = useState<TextSize>("default")
  const [highContrast, setHighContrast] = useState(false)
  const [dyslexicFont, setDyslexicFont] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [grayscale, setGrayscale] = useState(false)
  const [largeCursor, setLargeCursor] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // 1. Read saved accessibility values on mount
  useEffect(() => {
    const savedTextSize = localStorage.getItem(TEXT_SIZE_KEY)
    const savedContrast = localStorage.getItem(HIGH_CONTRAST_KEY) === "true"
    const savedDyslexic = localStorage.getItem(DYSLEXIC_FONT_KEY) === "true"
    const savedMotion = localStorage.getItem(REDUCE_MOTION_KEY) === "true"
    const savedGrayscale = localStorage.getItem(GRAYSCALE_KEY) === "true"
    const savedCursor = localStorage.getItem(LARGE_CURSOR_KEY) === "true"

    if (isValidTextSize(savedTextSize)) setTextSize(savedTextSize)
    if (savedContrast) setHighContrast(true)
    if (savedDyslexic) setDyslexicFont(true)
    if (savedMotion) setReduceMotion(true)
    if (savedGrayscale) setGrayscale(true)
    if (savedCursor) setLargeCursor(true)
  }, [])

  // 2. Sync Text Size class
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("text-size-large", "text-size-larger")
    if (textSize === "large") root.classList.add("text-size-large")
    if (textSize === "larger") root.classList.add("text-size-larger")
    localStorage.setItem(TEXT_SIZE_KEY, textSize)
  }, [textSize])

  // 3. Sync High Contrast class
  useEffect(() => {
    const root = document.documentElement
    if (highContrast) root.classList.add("high-contrast")
    else root.classList.remove("high-contrast")
    localStorage.setItem(HIGH_CONTRAST_KEY, String(highContrast))
  }, [highContrast])

  // 4. Sync Dyslexic Font class
  useEffect(() => {
    const root = document.documentElement
    if (dyslexicFont) root.classList.add("dyslexic-font")
    else root.classList.remove("dyslexic-font")
    localStorage.setItem(DYSLEXIC_FONT_KEY, String(dyslexicFont))
  }, [dyslexicFont])

  // 5. Sync Reduce Motion class
  useEffect(() => {
    const root = document.documentElement
    if (reduceMotion) root.classList.add("reduce-motion")
    else root.classList.remove("reduce-motion")
    localStorage.setItem(REDUCE_MOTION_KEY, String(reduceMotion))
  }, [reduceMotion])

  // 6. Sync Grayscale class
  useEffect(() => {
    const root = document.documentElement
    if (grayscale) root.classList.add("grayscale-mode")
    else root.classList.remove("grayscale-mode")
    localStorage.setItem(GRAYSCALE_KEY, String(grayscale))
  }, [grayscale])

  // 7. Sync Large Cursor class
  useEffect(() => {
    const root = document.documentElement
    if (largeCursor) root.classList.add("large-cursor")
    else root.classList.remove("large-cursor")
    localStorage.setItem(LARGE_CURSOR_KEY, String(largeCursor))
  }, [largeCursor])

  // Close menu on click outside or Escape key
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  function resetPreferences() {
    setTextSize("default")
    setHighContrast(false)
    setDyslexicFont(false)
    setReduceMotion(false)
    setGrayscale(false)
    setLargeCursor(false)

    localStorage.removeItem(TEXT_SIZE_KEY)
    localStorage.removeItem(HIGH_CONTRAST_KEY)
    localStorage.removeItem(DYSLEXIC_FONT_KEY)
    localStorage.removeItem(REDUCE_MOTION_KEY)
    localStorage.removeItem(GRAYSCALE_KEY)
    localStorage.removeItem(LARGE_CURSOR_KEY)
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Global CSS Injector for Accessibility Modes */}
      <style jsx global>{`
        /* Text size scalings */
        html.text-size-large {
          font-size: 112.5% !important;
        }
        html.text-size-larger {
          font-size: 125% !important;
        }

        /* High Contrast Enhancements */
        html.high-contrast header,
        html.high-contrast nav,
        html.high-contrast .border-b,
        html.high-contrast .border-t,
        html.high-contrast .border-slate-200,
        html.high-contrast .border-slate-100 {
          border-color: rgba(15, 23, 42, 0.35) !important;
        }

        html.high-contrast p,
        html.high-contrast span,
        html.high-contrast a,
        html.high-contrast h1,
        html.high-contrast h2,
        html.high-contrast h3 {
          text-shadow: 0 0 0.2px currentColor;
        }

        /* Dyslexia Friendly Font */
        html.dyslexic-font body,
        html.dyslexic-font p,
        html.dyslexic-font span,
        html.dyslexic-font a,
        html.dyslexic-font input,
        html.dyslexic-font select,
        html.dyslexic-font button {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          letter-spacing: 0.04em !important;
          word-spacing: 0.08em !important;
          line-height: 1.75 !important;
        }

        /* Reduced Motion / Pause Animations */
        html.reduce-motion *,
        html.reduce-motion *::before,
        html.reduce-motion *::after {
          animation: none !important;
          transition: none !important;
          scroll-behavior: auto !important;
        }

        /* Grayscale / Colorblind Filter Mode */
        html.grayscale-mode {
          filter: grayscale(100%) !important;
        }

        /* Large Cursor Mode */
        html.large-cursor,
        html.large-cursor * {
          cursor: crosshair !important;
        }
      `}</style>

      {/* Accessibility Menu Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="accessibility-menu"
        aria-haspopup="dialog"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950 cursor-pointer"
      >
        <Accessibility aria-hidden="true" className="h-4 w-4 text-[#256B29]" />
        <span className="hidden sm:inline">Accessibility</span>
        <ChevronDown
          aria-hidden="true"
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {/* Expanded Accessibility Dialog Popup */}
      {isOpen && (
        <div
          id="accessibility-menu"
          role="dialog"
          aria-label="Accessibility preferences"
          className="absolute right-0 top-full z-50 mt-2 w-[min(24rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl text-slate-900"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-100 text-[#256B29]">
              <Accessibility aria-hidden="true" className="h-6 w-6 shrink-0" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-950">
                Accessibility Controls
              </h2>
              <p className="mt-0.5 text-xs text-slate-600">
                Customize reading, display contrast, and motion preferences.
              </p>
            </div>
          </div>

          {/* 1. Text Sizing */}
          <div className="mt-4 border-t border-slate-200 pt-4">
            <div className="flex items-center gap-2 font-bold text-xs text-slate-900 uppercase tracking-wider">
              <Type aria-hidden="true" className="h-4 w-4 text-[#388E3C]" />
              <span>Text Size</span>
            </div>

            <div className="mt-2.5 grid grid-cols-3 gap-2">
              {[
                { value: "default" as const, label: "A", accessibleLabel: "Default text size" },
                { value: "large" as const, label: "A+", accessibleLabel: "Large text size (+12%)" },
                { value: "larger" as const, label: "A++", accessibleLabel: "Largest text size (+25%)" },
              ].map((option) => {
                const selected = textSize === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-label={option.accessibleLabel}
                    aria-pressed={selected}
                    onClick={() => setTextSize(option.value)}
                    className={cn(
                      "relative min-h-[40px] rounded-lg border px-3 py-1.5 text-xs font-extrabold transition-colors cursor-pointer",
                      selected
                        ? "border-[#388E3C] bg-emerald-50 text-[#256B29]"
                        : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    {option.label}
                    {selected && (
                      <Check aria-hidden="true" className="absolute right-1 top-1 h-3 w-3 text-emerald-600" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 2. Visual & Reading Feature Toggles */}
          <div className="mt-4 border-t border-slate-200 pt-4 space-y-2">
            {/* High Contrast */}
            <button
              type="button"
              aria-pressed={highContrast}
              onClick={() => setHighContrast((curr) => !curr)}
              className="flex min-h-[42px] w-full items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2 text-left transition-colors hover:bg-slate-50 cursor-pointer"
            >
              <span className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Contrast aria-hidden="true" className="h-4 w-4 text-[#388E3C]" />
                <span>High Contrast Mode</span>
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "relative h-5 w-9 shrink-0 rounded-full transition-colors",
                  highContrast ? "bg-[#388E3C]" : "bg-slate-300"
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
                    highContrast ? "translate-x-4" : "translate-x-0.5"
                  )}
                />
              </span>
            </button>

            {/* Dyslexia Friendly Font */}
            <button
              type="button"
              aria-pressed={dyslexicFont}
              onClick={() => setDyslexicFont((curr) => !curr)}
              className="flex min-h-[42px] w-full items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2 text-left transition-colors hover:bg-slate-50 cursor-pointer"
            >
              <span className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Eye aria-hidden="true" className="h-4 w-4 text-[#388E3C]" />
                <span>Dyslexia-Friendly Font</span>
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "relative h-5 w-9 shrink-0 rounded-full transition-colors",
                  dyslexicFont ? "bg-[#388E3C]" : "bg-slate-300"
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
                    dyslexicFont ? "translate-x-4" : "translate-x-0.5"
                  )}
                />
              </span>
            </button>

            {/* Stop Animations / Reduced Motion */}
            <button
              type="button"
              aria-pressed={reduceMotion}
              onClick={() => setReduceMotion((curr) => !curr)}
              className="flex min-h-[42px] w-full items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2 text-left transition-colors hover:bg-slate-50 cursor-pointer"
            >
              <span className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <PauseCircle aria-hidden="true" className="h-4 w-4 text-[#388E3C]" />
                <span>Stop Animations (Reduce Motion)</span>
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "relative h-5 w-9 shrink-0 rounded-full transition-colors",
                  reduceMotion ? "bg-[#388E3C]" : "bg-slate-300"
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
                    reduceMotion ? "translate-x-4" : "translate-x-0.5"
                  )}
                />
              </span>
            </button>

            {/* Grayscale Mode */}
            <button
              type="button"
              aria-pressed={grayscale}
              onClick={() => setGrayscale((curr) => !curr)}
              className="flex min-h-[42px] w-full items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2 text-left transition-colors hover:bg-slate-50 cursor-pointer"
            >
              <span className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Palette aria-hidden="true" className="h-4 w-4 text-[#388E3C]" />
                <span>Grayscale Mode</span>
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "relative h-5 w-9 shrink-0 rounded-full transition-colors",
                  grayscale ? "bg-[#388E3C]" : "bg-slate-300"
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
                    grayscale ? "translate-x-4" : "translate-x-0.5"
                  )}
                />
              </span>
            </button>
          </div>

          {/* 3. Reset Preferences */}
          <div className="mt-4 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={resetPreferences}
              className="inline-flex min-h-[36px] w-full items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100 cursor-pointer"
            >
              <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
              <span>Reset All Preferences</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
