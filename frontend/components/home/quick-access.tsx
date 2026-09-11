"use client"

import Link from "next/link"
import {
  ArrowRight,
  Newspaper,
  Bell,
  Download,
  Building2,
  PhoneCall,
  GraduationCap,
  Globe,
  FileText,
} from "lucide-react"
import { Container } from "@/components/ui/container"
import { ApiQuickAccessItem } from "@/lib/api/home"

type QuickAccessItem = {
  title: string
  href: string
  icon: React.ElementType
  ariaLabel: string
}

const iconMap: Record<string, React.ElementType> = {
  Newspaper,
  Bell,
  Download,
  Building2,
  PhoneCall,
  GraduationCap,
  Globe,
  FileText,
}

const defaultQuickAccessItems: QuickAccessItem[] = [
  {
    title: "News",
    href: "/media-centre/news",
    icon: Newspaper,
    ariaLabel: "Go to Ministry news page",
  },
  {
    title: "Notices",
    href: "/media-centre/notices",
    icon: Bell,
    ariaLabel: "Go to official notices page",
  },
  {
    title: "Downloads",
    href: "/downloads",
    icon: Download,
    ariaLabel: "Go to document downloads page",
  },
  {
    title: "Divisions",
    href: "/about/divisions",
    icon: Building2,
    ariaLabel: "Go to Ministry Division directory",
  },
  {
    title: "Contact",
    href: "/contact",
    icon: PhoneCall,
    ariaLabel: "Go to contact Ministry page",
  },
]

export function QuickAccess({ initialItems }: { initialItems?: ApiQuickAccessItem[] }) {
  const quickAccessItems: QuickAccessItem[] =
    initialItems && initialItems.length > 0
      ? initialItems.map((item) => ({
          title: item.title,
          href: item.url,
          icon: iconMap[item.icon_name] || Newspaper,
          ariaLabel: item.aria_label || `Go to ${item.title} page`,
        }))
      : defaultQuickAccessItems

  return (
    <section
      id="quick-access"
      aria-labelledby="quick-access-heading"
      className="relative z-20 border-y border-white/10 bg-[#322a02] py-3.5 text-white shadow-md"
    >
      <Container aria-labelledby="quick-access-heading">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-6">
          {/* Label & Heading */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-0.5 text-xs font-bold uppercase tracking-[0.14em] text-green-300 backdrop-blur-xs">
              Quick access
            </span>
            <h2
              id="quick-access-heading"
              className="text-sm font-bold !text-white tracking-tight sm:text-base"
            >
              Find what you need faster
            </h2>
          </div>

          {/* Dark Quick Access Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 w-full lg:w-auto">
            {quickAccessItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.ariaLabel}
                  className="group inline-flex items-center justify-between gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white shadow-xs backdrop-blur-xs transition-all duration-200 hover:border-green-400/50 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-green-500/20 text-green-300 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#388E3C] group-hover:text-white">
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    </div>
                    <span className="truncate">{item.title}</span>
                  </div>
                  <ArrowRight
                    className="h-3.5 w-3.5 shrink-0 text-slate-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white"
                    aria-hidden="true"
                  />
                </Link>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
