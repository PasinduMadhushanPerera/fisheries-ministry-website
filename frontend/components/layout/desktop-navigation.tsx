"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"

import { mainNavigation } from "@/data/navigation"
import { cn } from "@/lib/utils"

export function DesktopNavigation() {
  const pathname = usePathname()

  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const navigationRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        navigationRef.current &&
        !navigationRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
      )
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/"
    }

    return pathname === href || pathname.startsWith(`${href}/`)
  }

  function isParentActive(
    href: string,
    children?: { href: string }[],
  ) {
    if (isActive(href)) {
      return true
    }

    return children?.some((child) => isActive(child.href)) ?? false
  }

  function toggleMenu(label: string) {
    setOpenMenu((currentMenu) =>
      currentMenu === label ? null : label,
    )
  }

  return (
    <nav
      ref={navigationRef}
      aria-label="Main navigation"
      className="hidden lg:block"
    >
      <ul className="flex flex-wrap items-center gap-1">
        {mainNavigation.map((item) => {
          const hasChildren =
            item.children && item.children.length > 0

          const active = isParentActive(
            item.href,
            item.children,
          )

          const expanded = openMenu === item.label

          const submenuId = `desktop-submenu-${item.label
            .toLowerCase()
            .replaceAll(" ", "-")}`

          return (
            <li
              key={item.href}
              className="relative"
              onMouseEnter={() => {
                if (hasChildren) {
                  setOpenMenu(item.label)
                }
              }}
              onMouseLeave={() => {
                if (hasChildren) {
                  setOpenMenu(null)
                }
              }}
            >
              {hasChildren ? (
                <div
                  className={cn(
                    "relative flex min-h-12 items-center rounded-md transition-colors",
                    active
                      ? "bg-green-50 text-[#256B29]"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-950",
                  )}
                >
                  <Link
                    href={item.href}
                    aria-current={
                      isActive(item.href) ? "page" : undefined
                    }
                    onClick={() => setOpenMenu(null)}
                    className="inline-flex min-h-12 items-center rounded-l-md px-3 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 xl:px-4"
                  >
                    {item.label}
                  </Link>

                  <button
                    type="button"
                    aria-label={`${
                      expanded ? "Close" : "Open"
                    } ${item.label} menu`}
                    aria-expanded={expanded}
                    aria-controls={submenuId}
                    onClick={() => toggleMenu(item.label)}
                    className="inline-flex min-h-12 min-w-10 items-center justify-center rounded-r-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                  >
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        expanded && "rotate-180",
                      )}
                    />
                  </button>

                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[#388E3C]"
                    />
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpenMenu(null)}
                  className={cn(
                    "relative inline-flex min-h-12 items-center rounded-md px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 xl:px-4",
                    active
                      ? "bg-green-50 text-[#256B29]"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-950",
                  )}
                >
                  {item.label}

                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[#388E3C]"
                    />
                  )}
                </Link>
              )}

              {hasChildren && (
                <div
                  id={submenuId}
                  className={cn(
                    "absolute left-0 top-full z-[60] w-72 pt-2 transition-all duration-200",
                    expanded
                      ? "visible translate-y-0 opacity-100"
                      : "invisible translate-y-2 opacity-0",
                  )}
                >
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                    <ul>
                      {item.children?.map((child) => {
                        const childActive = isActive(child.href)

                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              aria-current={
                                childActive ? "page" : undefined
                              }
                              onClick={() => setOpenMenu(null)}
                              className={cn(
                                "flex min-h-11 items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200",
                                childActive
                                  ? "bg-green-50 text-[#256B29]"
                                  : "text-slate-700 hover:bg-slate-50 hover:text-[#256B29]",
                              )}
                            >
                              {child.label}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}