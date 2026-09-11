"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { LanguageCode, translations, TranslationKey } from "@/locales/translations"

export const LANGUAGE_STORAGE_KEY = "fisheries-language"

interface LanguageContextType {
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => translations.en[key] || String(key),
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en")

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) as LanguageCode
      if (stored && (stored === "en" || stored === "si" || stored === "ta")) {
        setLanguageState(stored)
        document.documentElement.setAttribute("lang", stored)
      }
    } catch {
      // Ignore storage errors
    }
  }, [])

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang)
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
      document.documentElement.setAttribute("lang", lang)
      // Dispatch custom event for immediate subscriber reaction
      window.dispatchEvent(new CustomEvent("fisheries:language-change", { detail: lang }))
    } catch {
      // Ignore storage errors
    }
  }

  const t = (key: TranslationKey): string => {
    const langDict = translations[language] || translations.en
    return (langDict as Record<string, string>)[key] || translations.en[key] || String(key)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
