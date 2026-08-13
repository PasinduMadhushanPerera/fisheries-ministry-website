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

const LANGUAGE_STORAGE_KEY = "fisheries-language"

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
  value: string | null,
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
   * Load the language from the URL first.
   * When the URL has no valid language, use localStorage.
   */
  useEffect(() => {
    let nextLanguage: LanguageCode = "en"

    if (isValidLanguage(urlLanguage)) {
      nextLanguage = urlLanguage
    } else {
      const storedLanguage =
        window.localStorage.getItem(
          LANGUAGE_STORAGE_KEY,
        )

      if (isValidLanguage(storedLanguage)) {
        nextLanguage = storedLanguage
      }
    }

    setLanguageState(nextLanguage)
  }, [urlLanguage])

  /*
   * Keep the document language and localStorage synchronized.
   */
  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = "ltr"

    window.localStorage.setItem(
      LANGUAGE_STORAGE_KEY,
      language,
    )
  }, [language])

  /*
   * Change the active language and update the URL.
   */
  const setLanguage = useCallback(
    (nextLanguage: LanguageCode) => {
      setLanguageState(nextLanguage)

      window.localStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        nextLanguage,
      )

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
    },
    [pathname, router, searchParams],
  )

  /*
   * Get the complete translation dictionary for
   * the currently selected language.
   */
  const t = useMemo<TranslationDictionary>(
    () => translations[language],
    [language],
  )

  /*
   * Retrieve a translation using a key such as:
   * translate("header.searchPlaceholder")
   */
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

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider",
    )
  }

  return context
}