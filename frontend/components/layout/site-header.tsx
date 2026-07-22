"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search } from "lucide-react"

import { Container } from "@/components/ui/container"
import { siteConfig } from "@/config/site"

import { DesktopNavigation } from "./desktop-navigation"
import { MobileNavigation } from "./mobile-navigation"
import { UtilityBar } from "./utility-bar"

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  /*
   * Reset the page position whenever the user navigates
   * to another route.
   */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    })

    const frame = window.requestAnimationFrame(() => {
      setScrolled(window.scrollY > 80)
    })

    return () => {
      window.cancelAnimationFrame(frame)
    }
  }, [pathname])

  /*
   * Reduce the utility and navigation bars after scrolling.
   */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        id="site-header"
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${scrolled ? "shadow-lg" : "shadow-sm"
          }`}
      >
        {/* Utility bar */}
        <div
          className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${scrolled ? "max-h-8" : "max-h-12"
            }`}
        >
          <UtilityBar />
        </div>

        {/* Logo and search section — height remains unchanged */}
        <div className="border-b border-slate-200 bg-white/95">
          <Container className="flex min-h-28 items-center justify-between gap-5 py-4">
            <Link
              href="/"
              aria-label={`${siteConfig.shortName} homepage`}
              className="flex min-w-0 items-center gap-4 rounded-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
            >
              <div className="relative flex h-20 w-16 shrink-0 items-center justify-center">
                <Image
                  src="/images/government/logo.jpg"
                  alt="Emblem of the Government of Sri Lanka"
                  width={64}
                  height={80}
                  priority
                  className="h-auto max-h-20 w-auto object-contain"
                />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#256B29] sm:text-sm">
                  {siteConfig.governmentName}
                </p>

                <p className="mt-1 max-w-2xl text-base font-bold leading-tight text-slate-950 sm:text-xl lg:text-2xl">
                  Ministry of Fisheries, Aquatic and Ocean Resources
                </p>

                <p className="mt-1 hidden text-sm text-slate-600 sm:block">
                  Sustainable fisheries, aquatic resources and public services
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
                  placeholder="Search this website"
                  className="min-h-12 min-w-0 flex-1 border-0 px-4 text-base text-slate-950 outline-none placeholder:text-slate-500"
                />

                <button
                  type="submit"
                  aria-label="Submit website search"
                  className="inline-flex min-h-12 min-w-12 items-center justify-center bg-[#388E3C] text-white transition hover:bg-[#256B29] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-emerald-200"
                >
                  <Search aria-hidden="true" className="h-5 w-5" />
                </button>
              </form>

              <Link
                href="/search"
                aria-label="Search the website"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-slate-300 text-slate-800 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 xl:hidden"
              >
                <Search aria-hidden="true" className="h-5 w-5" />
              </Link>

              <MobileNavigation />
            </div>
          </Container>
        </div>

        {/* Primary navigation */}
        <nav
          aria-label="Primary navigation"
          className="border-b border-slate-200 bg-white/95 backdrop-blur-md"
        >
          <Container
            className={`flex items-center transition-[min-height] duration-300 ease-in-out ${scrolled ? "min-h-[52px]" : "min-h-16"
              }`}
          >
            <DesktopNavigation />
          </Container>
        </nav>
      </header>
    </>
  )
}