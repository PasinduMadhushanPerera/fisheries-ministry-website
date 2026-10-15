"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AlertCircle, Search } from "lucide-react"

import { Container } from "@/components/ui/container"
import { siteConfig } from "@/config/site"
import { ApiHeaderSetting } from "@/lib/api/header-footer"
import { useLanguage } from "@/src/contexts/LanguageContext"

import { DesktopNavigation } from "./desktop-navigation"
import { MobileNavigation } from "./mobile-navigation"
import { UtilityBar } from "./utility-bar"

const COLLAPSE_SCROLL_POSITION = 30
const EXPAND_SCROLL_POSITION = 10

export function SiteHeader({ initialHeader }: { initialHeader?: ApiHeaderSetting }) {
  const pathname = usePathname()
  const { language, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)

  const isTranslated = language === "si" || language === "ta"

  const governmentName = isTranslated ? t.header.governmentName : (initialHeader?.government_name || t.header.governmentName || siteConfig.governmentName || "Government of Sri Lanka")
  const ministryName = isTranslated ? t.header.ministryName : (initialHeader?.ministry_name || t.header.ministryName || "Ministry of Fisheries, Aquatic and Ocean Resources")
  const tagline = isTranslated ? t.header.ministryDescription : (initialHeader?.tagline || t.header.ministryDescription || "Sustainable fisheries, aquatic resources and public services")
  const logoUrl = initialHeader?.logo_url || "/images/government/logo.jpg"
  const logoAlt = isTranslated ? t.header.emblemAlt : (initialHeader?.logo_alt || t.header.emblemAlt || "Emblem of the Government of Sri Lanka")
  const searchPlaceholder = isTranslated ? t.header.searchPlaceholder : (initialHeader?.search_placeholder || t.header.searchPlaceholder || "Search this website")

  const showEmergency = initialHeader?.enable_emergency_banner && initialHeader?.emergency_banner_text

  /*
   * Return to the top whenever the route changes (unless hash navigation is present).
   */
  useEffect(() => {
    if (typeof window !== "undefined" && !window.location.hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      })
    }
  }, [pathname])

  /*
   * Detect scroll to toggle subtle elevation shadow (Zero height thrashing).
   */
  useEffect(() => {
    function handleScroll() {
      const isScrolledNow = window.scrollY > 20
      setScrolled((prev) => (prev !== isScrolledNow ? isScrolledNow : prev))
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {showEmergency && (
        <div className="bg-amber-600 px-4 py-2 text-center text-xs font-bold text-white shadow-inner">
          <Container className="flex items-center justify-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{initialHeader.emergency_banner_text}</span>
            {initialHeader.emergency_banner_link && (
              <Link href={initialHeader.emergency_banner_link} className="underline hover:text-amber-100 ml-1">
                Read Notice &rarr;
              </Link>
            )}
          </Container>
        </div>
      )}

      {/* Top Utility Bar (Scrolls naturally above sticky header, zero layout jitter) */}
      <div className="relative z-[120] border-b border-slate-200/80 bg-slate-50/95 text-slate-700">
        <UtilityBar initialHeader={initialHeader} />
      </div>

      {/* Main Sticky Header & Navigation (Rock-Solid 60FPS Sticky Header) */}
      <header
        id="site-header"
        className={`sticky top-0 z-[100] bg-white/95 backdrop-blur-md transition-shadow duration-300 border-b border-slate-200/80 ${
          scrolled ? "shadow-md shadow-slate-900/10" : "shadow-xs"
        }`}
      >
        {/* Logo and search section */}
        <div className="relative z-[110] bg-white/95 backdrop-blur-md">
          <Container className="flex items-center justify-between gap-5 py-3.5 min-h-[90px] sm:min-h-[100px]">
            <Link
              href="/"
              aria-label={`${siteConfig.shortName} homepage`}
              className="flex min-w-0 items-center gap-4 rounded-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
            >
              <div className="relative flex shrink-0 items-center justify-center h-16 w-14 sm:h-20 sm:w-16 transition-transform duration-300 hover:scale-105">
                <Image
                  src={logoUrl}
                  alt={logoAlt}
                  width={64}
                  height={80}
                  unoptimized={logoUrl.startsWith("http")}
                  priority
                  className="h-full w-auto object-contain"
                />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#256B29] sm:text-sm">
                  {governmentName}
                </p>

                <p className="mt-0.5 max-w-2xl text-base font-extrabold leading-tight text-slate-950 sm:text-xl lg:text-2xl">
                  {ministryName}
                </p>

                <p className="mt-1 hidden text-xs text-slate-600 sm:block">
                  {tagline}
                </p>
              </div>
            </Link>

            <div className="flex shrink-0 items-center gap-3">
              <form
                role="search"
                action="/search"
                method="get"
                className="hidden w-72 overflow-hidden rounded-xl border border-slate-300 bg-white focus-within:border-[#256B29] focus-within:ring-2 focus-within:ring-emerald-200 xl:flex shadow-2xs"
              >
                <label
                  htmlFor="desktop-site-search"
                  className="visually-hidden"
                >
                  Search the website
                </label>

                <input
                  id="desktop-site-search"
                  name="q"
                  type="search"
                  maxLength={100}
                  autoComplete="off"
                  placeholder={searchPlaceholder}
                  className="min-h-11 min-w-0 flex-1 border-0 px-4 text-xs font-medium text-slate-950 outline-none placeholder:text-slate-400"
                />

                {language !== "en" && (
                  <input type="hidden" name="lang" value={language} />
                )}

                <button
                  type="submit"
                  aria-label="Submit website search"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center bg-[#256B29] text-white transition hover:bg-[#1b4d1d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-emerald-200"
                >
                  <Search
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                </button>
              </form>

              <Link
                href={language !== "en" ? `/search?lang=${language}` : "/search"}
                aria-label="Search the website"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-slate-300 text-slate-800 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 xl:hidden"
              >
                <Search
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              </Link>

              <MobileNavigation />
            </div>
          </Container>
        </div>

        {/* Primary navigation bar (Dark Navy Background) */}
        <nav
          aria-label="Primary navigation"
          className="relative z-[105] border-t border-slate-100 border-b border-slate-900 bg-[#150c39] text-white shadow-sm"
        >
          <Container className="flex items-center justify-center min-h-12 sm:min-h-14">
            <DesktopNavigation />
          </Container>
        </nav>
      </header>
    </>
  )
}