"use client"

import { useEffect, useRef, useState } from "react"
import {
  Check,
  ChevronDown,
  Languages,
} from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

const LANGUAGE_STORAGE_KEY = "fisheries-language"

type LanguageCode =
  (typeof siteConfig.languages)[number]["code"]

function isValidLanguage(
  value: string,
): value is LanguageCode {
  return siteConfig.languages.some(
    (language) => language.code === value,
  )
}

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageCode>("en")

  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  /*
   * Read the saved preference after the component mounts.
   * The callback avoids a synchronous state update directly
   * inside the effect.
   */
  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(
      LANGUAGE_STORAGE_KEY,
    )

    if (!storedLanguage || !isValidLanguage(storedLanguage)) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setSelectedLanguage(storedLanguage)
    }, 0)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  /*
   * Synchronize the selected language with the document
   * and browser storage.
   */
  useEffect(() => {
    document.documentElement.setAttribute(
      "lang",
      selectedLanguage,
    )

    window.localStorage.setItem(
      LANGUAGE_STORAGE_KEY,
      selectedLanguage,
    )
  }, [selectedLanguage])

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node,
        )
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

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    )
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      )
      document.removeEventListener(
        "keydown",
        handleEscape,
      )
    }
  }, [isOpen])

  function selectLanguage(languageCode: LanguageCode) {
    setSelectedLanguage(languageCode)
    setIsOpen(false)
    triggerRef.current?.focus()

    /*
     * Multilingual routing will be connected later.
     * For example: /en, /si and /ta.
     */
  }

  const currentLanguage =
    siteConfig.languages.find(
      (language) =>
        language.code === selectedLanguage,
    ) ?? siteConfig.languages[0]

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="language-menu"
        aria-haspopup="menu"
        onClick={() =>
          setIsOpen((current) => !current)
        }
        className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950"
      >
        <Languages
          aria-hidden="true"
          className="h-4 w-4"
        />

        <span>{currentLanguage.nativeLabel}</span>

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
          id="language-menu"
          role="menu"
          aria-label="Choose website language"
          className="absolute right-0 top-full z-50 mt-2 min-w-48 overflow-hidden rounded-lg border border-slate-200 bg-white py-2 shadow-lg"
        >
          {siteConfig.languages.map((language) => {
            const isSelected =
              language.code === selectedLanguage

            return (
              <button
                key={language.code}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                onClick={() =>
                  selectLanguage(language.code)
                }
                className="flex min-h-11 w-full items-center justify-between gap-4 px-4 py-2 text-left text-sm text-slate-700 hover:bg-green-50 hover:text-slate-950"
              >
                <span>
                  <span className="block font-semibold">
                    {language.nativeLabel}
                  </span>

                  <span className="block text-xs text-slate-500">
                    {language.label}
                  </span>
                </span>

                {isSelected && (
                  <Check
                    aria-hidden="true"
                    className="h-4 w-4 text-[#388E3C]"
                  />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}