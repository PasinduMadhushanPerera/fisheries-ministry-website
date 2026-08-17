"use client"

import { useEffect, useRef, useState } from "react"
import { Check, ChevronDown, Languages } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/src/contexts/LanguageContext"
import type { LanguageCode } from "@/src/locales/translations"

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const { language: selectedLanguage, setLanguage } = useLanguage()

  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

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

  function selectLanguage(languageCode: LanguageCode) {
    setLanguage(languageCode)
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  const currentLanguage =
    siteConfig.languages.find((lang) => lang.code === selectedLanguage) ??
    siteConfig.languages[0]

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="language-menu"
        aria-haspopup="menu"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950 cursor-pointer"
      >
        <Languages aria-hidden="true" className="h-4 w-4 text-[#256B29]" />
        <span>{currentLanguage.nativeLabel}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <div
          id="language-menu"
          role="menu"
          aria-label="Choose website language"
          className="absolute right-0 top-full z-50 mt-2 min-w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-xl animate-in fade-in-50 duration-150"
        >
          {siteConfig.languages.map((language) => {
            const isSelected = language.code === selectedLanguage

            return (
              <button
                key={language.code}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                onClick={() => selectLanguage(language.code as LanguageCode)}
                className={`flex min-h-11 w-full items-center justify-between gap-4 px-4 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-emerald-50 text-[#256B29] font-bold"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                }`}
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
                  <Check aria-hidden="true" className="h-4 w-4 text-[#256B29]" />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}