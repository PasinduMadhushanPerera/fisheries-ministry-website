"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

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
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative inline-flex min-h-12 items-center rounded-md px-3 py-2 text-sm font-semibold transition-colors xl:px-4",
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
            </li>
          )
        })}
      </ul>
    </nav>
  )
}