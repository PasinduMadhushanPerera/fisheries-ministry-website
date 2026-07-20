"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronRight,
  Mail,
  Menu,
  Phone,
  Search,
  X,
} from "lucide-react"

import { mainNavigation } from "@/data/navigation"
import { cn } from "@/lib/utils"

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  const pathname = usePathname()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape,
      )
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = ""
      return
    }

    document.body.style.overflow = "hidden"

    const firstFocusable =
      panelRef.current?.querySelector<HTMLElement>(
        "button, a, input, select, textarea, [tabindex]:not([tabindex='-1'])",
      )

    firstFocusable?.focus()

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  function closeNavigation() {
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/"
    }

    return pathname.startsWith(href)
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open main navigation"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen(true)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-800 transition-colors hover:bg-slate-50 lg:hidden"
      >
        <Menu
          aria-hidden="true"
          className="h-6 w-6"
        />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <button
            type="button"
            aria-label="Close mobile navigation"
            onClick={closeNavigation}
            className="absolute inset-0 bg-slate-950/60"
          />

          <div
            ref={panelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            className="absolute right-0 top-0 flex h-full w-[min(92vw,25rem)] flex-col overflow-y-auto bg-white shadow-2xl"
          >
            <div className="flex min-h-20 items-center justify-between border-b border-slate-200 px-5">
              <div>
                <p className="text-sm font-semibold text-[#256B29]">
                  Main menu
                </p>

                <p className="text-sm text-slate-600">
                  Ministry of Fisheries
                </p>
              </div>

              <button
                type="button"
                aria-label="Close main navigation"
                onClick={closeNavigation}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-slate-700 transition-colors hover:bg-slate-100"
              >
                <X
                  aria-hidden="true"
                  className="h-6 w-6"
                />
              </button>
            </div>

            <div className="border-b border-slate-200 p-5">
              <form
                role="search"
                action="/search"
                className="flex overflow-hidden rounded-lg border border-slate-300 bg-white focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-200"
              >
                <label
                  htmlFor="mobile-site-search"
                  className="visually-hidden"
                >
                  Search the website
                </label>

                <input
                  id="mobile-site-search"
                  name="q"
                  type="search"
                  placeholder="Search services and information"
                  className="min-h-12 min-w-0 flex-1 border-0 px-4 text-base outline-none"
                />

                <button
                  type="submit"
                  aria-label="Submit website search"
                  className="inline-flex min-h-12 min-w-12 items-center justify-center bg-[#388E3C] text-white transition-colors hover:bg-[#256B29]"
                >
                  <Search
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </button>
              </form>
            </div>

            <nav
              aria-label="Mobile main navigation"
              className="p-3"
            >
              <ul>
                {mainNavigation.map((item) => {
                  const active = isActive(item.href)

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={
                          active ? "page" : undefined
                        }
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex min-h-13 items-center justify-between gap-4 rounded-lg px-4 py-3 font-semibold transition-colors",
                          active
                            ? "bg-green-50 text-[#256B29]"
                            : "text-slate-800 hover:bg-slate-50",
                        )}
                      >
                        <span>{item.label}</span>

                        <ChevronRight
                          aria-hidden="true"
                          className="h-5 w-5 shrink-0"
                        />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="mt-auto border-t border-slate-200 bg-slate-50 p-5">
              <p className="font-semibold text-slate-950">
                Need assistance?
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Contact the Ministry for guidance on services,
                applications and official information.
              </p>

              <div className="mt-3 grid gap-2">
                <a
                  href="tel:+94000000000"
                  className="inline-flex min-h-11 items-center gap-3 rounded-md px-2 text-sm font-medium text-slate-700 transition-colors hover:bg-white hover:text-slate-950"
                >
                  <Phone
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-[#388E3C]"
                  />

                  <span>Call the Ministry</span>
                </a>

                <a
                  href="mailto:info@example.gov.lk"
                  className="inline-flex min-h-11 items-center gap-3 rounded-md px-2 text-sm font-medium text-slate-700 transition-colors hover:bg-white hover:text-slate-950"
                >
                  <Mail
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-[#388E3C]"
                  />

                  <span>Email the Ministry</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}