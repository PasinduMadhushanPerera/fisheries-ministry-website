"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"

import { mainNavigation } from "@/data/navigation"
import { cn } from "@/lib/utils"

export function DesktopNavigation() {
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/"
    }

    return pathname.startsWith(href)
  }

  return (
    <nav
      aria-label="Main navigation"
      className="hidden lg:block"
    >
      <ul className="flex flex-wrap items-center gap-1">
        {mainNavigation.map((item) => {
          const active = isActive(item.href)

          return (
            <li
              key={item.href}
              className="group relative"
            >
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                aria-haspopup={item.children ? "menu" : undefined}
                className={cn(
                  "relative inline-flex min-h-12 items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold transition-colors xl:px-4",
                  active
                    ? "bg-green-50 text-[#256B29]"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-950",
                )}
              >
                {item.label}

                {item.children && (
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                )}

                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[#388E3C]"
                  />
                )}
              </Link>

              {item.children && (
                <div className="invisible absolute left-0 top-full z-50 mt-2 w-64 translate-y-2 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <ul role="menu">
                    {item.children.map((child) => {
                      const childActive = isActive(child.href)

                      return (
                        <li
                          key={child.href}
                          role="none"
                        >
                          <Link
                            href={child.href}
                            role="menuitem"
                            className={cn(
                              "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
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
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}