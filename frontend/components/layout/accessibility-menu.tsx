"use client"

import { useEffect, useRef, useState } from "react"
import {
  Accessibility,
  Check,
  ChevronDown,
  Contrast,
  RotateCcw,
  Type,
} from "lucide-react"

import { cn } from "@/lib/utils"

type TextSize = "default" | "large" | "larger"

const TEXT_SIZE_KEY = "fisheries-text-size"
const HIGH_CONTRAST_KEY = "fisheries-high-contrast"

function isValidTextSize(value: string | null): value is TextSize {
  return value === "default" || value === "large" || value === "larger"
}

export function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [textSize, setTextSize] = useState<TextSize>("default")
  const [highContrast, setHighContrast] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // 1. Read saved values immediately when component mounts
  useEffect(() => {
    const savedTextSize = localStorage.getItem(TEXT_SIZE_KEY)
    const savedContrast = localStorage.getItem(HIGH_CONTRAST_KEY) === "true"

    if (isValidTextSize(savedTextSize)) {
      setTextSize(savedTextSize)
    }

    if (savedContrast) {
      setHighContrast(true)
    }
  }, [])

  // 2. Sync Text Size class & localStorage whenever state changes
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("text-size-large", "text-size-larger")

    if (textSize === "large") root.classList.add("text-size-large")
    if (textSize === "larger") root.classList.add("text-size-larger")

    localStorage.setItem(TEXT_SIZE_KEY, textSize)
  }, [textSize])

  // 3. Sync High Contrast class & localStorage whenever state changes
  useEffect(() => {
    const root = document.documentElement

    if (highContrast) {
      root.classList.add("high-contrast")
    } else {
      root.classList.remove("high-contrast")
    }

    localStorage.setItem(HIGH_CONTRAST_KEY, String(highContrast))
  }, [highContrast])

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

  function updateTextSize(size: TextSize) {
    setTextSize(size)
  }

  function toggleHighContrast() {
    setHighContrast((current) => !current)
  }

  function resetPreferences() {
    setTextSize("default")
    setHighContrast(false)
    localStorage.removeItem(TEXT_SIZE_KEY)
    localStorage.removeItem(HIGH_CONTRAST_KEY)
  }

  return (
    <div ref={containerRef} className="relative">
      {/* CSS overrides: preserves section borders & handles sizing */}
      <style jsx global>{`
        /* Text size scalings */
        html.text-size-large {
          font-size: 112.5% !important;
        }
        html.text-size-larger {
          font-size: 125% !important;
        }

        /* High Contrast Enhancements without destroying 1px navigation borders */
        html.high-contrast header,
        html.high-contrast nav,
        html.high-contrast .border-b,
        html.high-contrast .border-t,
        html.high-contrast .border-slate-200,
        html.high-contrast .border-slate-100 {
          border-color: rgba(15, 23, 42, 0.25) !important;
        }

        /* Dark headers / Top utility sections keep subtle light borders */
        html.high-contrast header.bg-[#061d24] .border-white\/10,
        html.high-contrast header .border-white\/15,
        html.high-contrast .bg-[#061d24] {
          border-color: rgba(255, 255, 255, 0.3) !important;
        }

        /* Darken text slightly for sharper legibility */
        html.high-contrast p,
        html.high-contrast span,
        html.high-contrast a,
        html.high-contrast h1,
        html.high-contrast h2,
        html.high-contrast h3 {
          text-shadow: 0 0 0.2px currentColor;
        }
      `}</style>

      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="accessibility-menu"
        aria-haspopup="dialog"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950"
      >
        <Accessibility aria-hidden="true" className="h-4 w-4" />

        <span className="hidden sm:inline">Accessibility</span>

        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div
          id="accessibility-menu"
          role="dialog"
          aria-label="Accessibility preferences"
          className="absolute right-0 top-full z-50 mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-slate-200 bg-white p-5 shadow-xl text-slate-900"
        >
          <div className="flex items-start gap-3">
            <Accessibility
              aria-hidden="true"
              className="mt-1 h-6 w-6 shrink-0 text-[#388E3C]"
            />

            <div>
              <h2 className="font-bold text-slate-950">
                Accessibility preferences
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Adjust the display to make website content easier to read.
              </p>
            </div>
          </div>

          <div className="mt-5 border-t border-slate-200 pt-5">
            <div className="flex items-center gap-2 font-semibold text-slate-900">
              <Type aria-hidden="true" className="h-5 w-5 text-[#388E3C]" />
              <span>Text size</span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                {
                  value: "default" as const,
                  label: "A",
                  accessibleLabel: "Use default text size",
                },
                {
                  value: "large" as const,
                  label: "A+",
                  accessibleLabel: "Use large text size",
                },
                {
                  value: "larger" as const,
                  label: "A++",
                  accessibleLabel: "Use largest text size",
                },
              ].map((option) => {
                const selected = textSize === option.value

                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-label={option.accessibleLabel}
                    aria-pressed={selected}
                    onClick={() => updateTextSize(option.value)}
                    className={cn(
                      "relative min-h-11 rounded-md border px-3 py-2 font-bold transition-colors",
                      selected
                        ? "border-[#388E3C] bg-green-50 text-[#256B29]"
                        : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
                    )}
                  >
                    {option.label}

                    {selected && (
                      <Check
                        aria-hidden="true"
                        className="absolute right-1 top-1 h-3.5 w-3.5"
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-5 border-t border-slate-200 pt-5">
            <button
              type="button"
              aria-pressed={highContrast}
              onClick={toggleHighContrast}
              className="flex min-h-12 w-full items-center justify-between gap-4 rounded-lg border border-slate-300 px-4 py-3 text-left transition-colors hover:bg-slate-50"
            >
              <span className="flex items-center gap-3">
                <Contrast
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-[#388E3C]"
                />

                <span>
                  <span className="block font-semibold text-slate-900">
                    High contrast
                  </span>

                  <span className="block text-sm leading-5 text-slate-600">
                    Increase colour and border contrast
                  </span>
                </span>
              </span>

              <span
                aria-hidden="true"
                className={cn(
                  "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                  highContrast ? "bg-[#388E3C]" : "bg-slate-300",
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                    highContrast ? "translate-x-5" : "translate-x-0.5",
                  )}
                />
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={resetPreferences}
            className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-950"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            Reset preferences
          </button>
        </div>
      )}
    </div>
  )
}