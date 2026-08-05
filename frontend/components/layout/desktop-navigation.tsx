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
      document.removeEventListener("pointerdown", handlePointerDown)
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
      className="hidden lg:block w-full overflow-visible"
    >
      <ul className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
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
              className="relative group/nav"
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
                    "relative flex min-h-11 items-center rounded-lg transition-colors cursor-pointer",
                    active
                      ? "bg-[#256B29] text-white font-bold"
                      : "text-slate-200 hover:bg-white/10 hover:text-white",
                  )}
                >
                  <Link
                    href={item.href}
                    aria-current={
                      isActive(item.href) ? "page" : undefined
                    }
                    onClick={() => setOpenMenu(null)}
                    className="inline-flex min-h-11 items-center rounded-l-lg px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400 xl:px-4"
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
                    className="inline-flex min-h-11 min-w-8 items-center justify-center rounded-r-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400 text-slate-300 hover:text-white cursor-pointer"
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
                      className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-green-300"
                    />
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpenMenu(null)}
                  className={cn(
                    "relative inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400 xl:px-4",
                    active
                      ? "bg-[#256B29] text-white font-bold"
                      : "text-slate-200 hover:bg-white/10 hover:text-white",
                  )}
                >
                  {item.label}

                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-green-300"
                    />
                  )}
                </Link>
              )}

              {hasChildren && (
                <div
                  id={submenuId}
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 top-full z-[9999] w-72 pt-1 transition-all duration-200 before:absolute before:inset-x-0 before:-top-3 before:h-3",
                    expanded
                      ? "visible translate-y-0 opacity-100 pointer-events-auto"
                      : "invisible translate-y-2 opacity-0 pointer-events-none",
                  )}
                >
                  <div className="overflow-hidden rounded-2xl border border-slate-700 bg-[#121c22] p-2 shadow-2xl backdrop-blur-xl">
                    <ul className="space-y-1">
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
                                "flex min-h-10 items-center rounded-xl px-4 py-2.5 text-xs sm:text-sm font-normal transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400",
                                childActive
                                  ? "bg-[#256B29] text-white font-semibold"
                                  : "text-slate-200 hover:bg-white/10 hover:text-emerald-300",
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