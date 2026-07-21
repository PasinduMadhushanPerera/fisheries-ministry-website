import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"

import { Container } from "@/components/ui/container"
import { siteConfig } from "@/config/site"

import { DesktopNavigation } from "./desktop-navigation"
import { MobileNavigation } from "./mobile-navigation"
import { UtilityBar } from "./utility-bar"

export function SiteHeader() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="relative z-40 bg-white">
        <UtilityBar />

        <div className="border-b border-slate-200">
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
                  className="min-h-12 min-w-0 flex-1 border-0 px-4 text-base text-slate-950 outline-none"
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

        <div className="border-b border-slate-200 bg-white">
          <Container className="flex min-h-16 items-center">
            <DesktopNavigation />
          </Container>
        </div>
      </header>
    </>
  )
}