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

const COLLAPSE_SCROLL_POSITION = 140
const EXPAND_SCROLL_POSITION = 40

export function SiteHeader({ initialHeader }: { initialHeader?: ApiHeaderSetting }) {
  const pathname = usePathname()
  const { language, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)

  const scrolledRef = useRef(false)
  const animationFrameRef = useRef<number | null>(null)

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

    scrolledRef.current = false
    setScrolled(false)
  }, [pathname])

  /*
   * Collapse and expand the header using different scroll
   * positions. This prevents flickering when the header
   * height changes near the scroll threshold.
   */
  useEffect(() => {
    function updateHeader() {
      const scrollPosition = window.scrollY
      const isCurrentlyScrolled = scrolledRef.current

      if (
        !isCurrentlyScrolled &&
        scrollPosition >= COLLAPSE_SCROLL_POSITION
      ) {
        scrolledRef.current = true
        setScrolled(true)
      } else if (
        isCurrentlyScrolled &&
        scrollPosition <= EXPAND_SCROLL_POSITION
      ) {
        scrolledRef.current = false
        setScrolled(false)
      }

      animationFrameRef.current = null
    }

    function handleScroll() {
      if (animationFrameRef.current !== null) {
        return
      }

      animationFrameRef.current =
        window.requestAnimationFrame(updateHeader)
    }

    updateHeader()

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(
          animationFrameRef.current,
        )
      }
    }
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

      <header
        id="site-header"
        className={`sticky top-0 z-[100] bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "shadow-lg" : "shadow-sm"
        }`}
      >
        {/* Utility bar */}
        <div
          aria-hidden={scrolled}
          className={`relative z-[120] overflow-visible transition-[height,opacity,transform] duration-300 ease-in-out ${
            scrolled
              ? "pointer-events-none h-0 -translate-y-2 opacity-0"
              : "h-10 translate-y-0 opacity-100"
          }`}
        >
          <UtilityBar initialHeader={initialHeader} />
        </div>

        {/* Logo and search section */}
        <div className="relative z-[110] border-b border-slate-200 bg-white/95">
          <Container
            className={`flex items-center justify-between gap-5 transition-[min-height,padding] duration-300 ease-in-out ${
              scrolled
                ? "min-h-20 py-2"
                : "min-h-28 py-4"
            }`}
          >
            <Link
              href="/"
              aria-label={`${siteConfig.shortName} homepage`}
              className="flex min-w-0 items-center gap-4 rounded-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
            >
              <div
                className={`relative flex shrink-0 items-center justify-center transition-[height,width] duration-300 ease-in-out ${
                  scrolled ? "h-14 w-12" : "h-20 w-16"
                }`}
              >
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
                <p
                  className={`font-semibold uppercase text-[#256B29] transition-[font-size,letter-spacing] duration-300 ${
                    scrolled
                      ? "text-[10px] tracking-[0.1em] sm:text-xs"
                      : "text-xs tracking-[0.12em] sm:text-sm"
                  }`}
                >
                  {governmentName}
                </p>

                <p
                  className={`mt-1 max-w-2xl font-bold leading-tight text-slate-950 transition-[font-size] duration-300 ${
                    scrolled
                      ? "text-sm sm:text-lg lg:text-xl"
                      : "text-base sm:text-xl lg:text-2xl"
                  }`}
                >
                  {ministryName}
                </p>

                <p
                  className={`mt-1 overflow-hidden text-sm text-slate-600 transition-[max-height,opacity] duration-300 ${
                    scrolled
                      ? "max-h-0 opacity-0"
                      : "max-h-6 opacity-100"
                  } hidden sm:block`}
                >
                  {tagline}
                </p>
              </div>
            </Link>

            <div className="flex shrink-0 items-center gap-2">
              <form
                role="search"
                action="/search"
                method="get"
                className="hidden w-72 overflow-hidden rounded-lg border border-slate-300 bg-white focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-200 xl:flex"
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
                  className="min-h-12 min-w-0 flex-1 border-0 px-4 text-base text-slate-950 outline-none placeholder:text-slate-500"
                />

                <button
                  type="submit"
                  aria-label="Submit website search"
                  className="inline-flex min-h-12 min-w-12 items-center justify-center bg-[#388E3C] text-white transition hover:bg-[#256B29] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-emerald-200"
                >
                  <Search
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </button>
              </form>

              <Link
                href="/search"
                aria-label="Search the website"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-slate-300 text-slate-800 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 xl:hidden"
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

        {/* Primary navigation bar (Dark Charcoal Background) */}
        <nav
          aria-label="Primary navigation"
          className="relative z-[105] border-b border-slate-800 bg-[#150c39] text-white shadow-md"
        >
          <Container
            className={`flex items-center justify-center transition-[min-height] duration-300 ease-in-out ${
              scrolled ? "min-h-[48px]" : "min-h-14"
            }`}
          >
            <DesktopNavigation />
          </Container>
        </nav>
      </header>
    </>
  )
}