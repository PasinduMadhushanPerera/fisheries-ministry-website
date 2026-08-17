"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  Suspense,
  type ReactNode,
} from "react"
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"

import { siteConfig } from "@/config/site"
import {
  translations,
  type LanguageCode,
} from "@/src/locales/translations"

export const LANGUAGE_STORAGE_KEY = "fisheries-language"

type TranslationDictionary =
  (typeof translations)[LanguageCode]

type LanguageContextValue = {
  language: LanguageCode
  setLanguage: (language: LanguageCode) => void
  t: TranslationDictionary
  translate: (key: string) => string
}

const LanguageContext =
  createContext<LanguageContextValue | null>(null)

function isValidLanguage(
  value: string | null | undefined,
): value is LanguageCode {
  if (!value) {
    return false
  }

  return siteConfig.languages.some(
    (language) => language.code === value,
  )
}

function getTranslationValue(
  dictionary: TranslationDictionary,
  key: string,
): string {
  const value = key
    .split(".")
    .reduce<unknown>((current, part) => {
      if (
        current !== null &&
        typeof current === "object" &&
        part in current
      ) {
        return (current as Record<string, unknown>)[part]
      }

      return undefined
    }, dictionary)

  return typeof value === "string" ? value : key
}

type LanguageProviderProps = {
  children: ReactNode
}

function getCookieLanguage(): LanguageCode | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${LANGUAGE_STORAGE_KEY}=([^;]*)`))
  if (match && isValidLanguage(match[1])) {
    return match[1] as LanguageCode
  }
  return null
}

function setCookieLanguage(lang: LanguageCode) {
  if (typeof document === "undefined") return
  document.cookie = `${LANGUAGE_STORAGE_KEY}=${lang}; path=/; max-age=31536000; SameSite=Lax`
}

function LanguageProviderContent({
  children,
}: LanguageProviderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [language, setLanguageState] =
    useState<LanguageCode>("en")

  const urlLanguage = searchParams.get("lang")

  /*
   * Initialize language from URL, localStorage, or Cookie.
   */
  useEffect(() => {
    let nextLanguage: LanguageCode = "en"

    if (isValidLanguage(urlLanguage)) {
      nextLanguage = urlLanguage
    } else {
      const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
      if (isValidLanguage(storedLanguage)) {
        nextLanguage = storedLanguage
      } else {
        const cookieLang = getCookieLanguage()
        if (cookieLang) {
          nextLanguage = cookieLang
        }
      }
    }

    setLanguageState(nextLanguage)
    setCookieLanguage(nextLanguage)
    document.documentElement.lang = nextLanguage
    document.documentElement.dir = "ltr"
  }, [urlLanguage])

  /*
   * Keep the document language, cookie, and localStorage synchronized whenever language state changes.
   */
  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = "ltr"
    setCookieLanguage(language)

    try {
      window.localStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        language,
      )
    } catch {
      // Ignore storage errors
    }
  }, [language])

  /*
   * Change the active language, write to cookies & localStorage, and update the URL query.
   */
  const setLanguage = useCallback(
    (nextLanguage: LanguageCode) => {
      setLanguageState(nextLanguage)
      setCookieLanguage(nextLanguage)

      try {
        window.localStorage.setItem(
          LANGUAGE_STORAGE_KEY,
          nextLanguage,
        )
      } catch {
        // Ignore storage errors
      }

      document.documentElement.lang = nextLanguage
      document.documentElement.dir = "ltr"

      const parameters = new URLSearchParams(
        searchParams.toString(),
      )

      parameters.set("lang", nextLanguage)

      const queryString = parameters.toString()

      router.replace(
        queryString
          ? `${pathname}?${queryString}`
          : pathname,
        {
          scroll: false,
        },
      )
      router.refresh()
    },
    [pathname, router, searchParams],
  )

  const t = useMemo<TranslationDictionary>(
    () => translations[language] || translations.en,
    [language],
  )

  const translate = useCallback(
    (key: string) => {
      return getTranslationValue(t, key)
    },
    [t],
  )

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t,
      translate,
    }),
    [language, setLanguage, t, translate],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function LanguageProvider({
  children,
}: LanguageProviderProps) {
  return (
    <Suspense fallback={<>{children}</>}>
      <LanguageProviderContent>
        {children}
      </LanguageProviderContent>
    </Suspense>
  )
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)

  if (!context) {
    return {
      language: "en",
      setLanguage: () => {},
      t: translations.en,
      translate: (key: string) => key,
    }
  }

  return context
}