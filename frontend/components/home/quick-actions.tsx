import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { Container } from "@/components/ui/container"
import { quickActions } from "@/data/home"
import { cn } from "@/lib/utils"

const accentClasses = {
  green: {
    icon: "bg-green-50 text-green-700",
    border: "hover:border-green-200",
    bar: "bg-green-500",
  },
  blue: {
    icon: "bg-blue-50 text-blue-700",
    border: "hover:border-blue-200",
    bar: "bg-blue-500",
  },
  sky: {
    icon: "bg-sky-50 text-sky-700",
    border: "hover:border-sky-200",
    bar: "bg-sky-500",
  },
  amber: {
    icon: "bg-amber-50 text-amber-700",
    border: "hover:border-amber-200",
    bar: "bg-amber-500",
  },
  violet: {
    icon: "bg-violet-50 text-violet-700",
    border: "hover:border-violet-200",
    bar: "bg-violet-500",
  },
  rose: {
    icon: "bg-rose-50 text-rose-700",
    border: "hover:border-rose-200",
    bar: "bg-rose-500",
  },
}

export function QuickActions() {
  return (
    <section
      aria-labelledby="quick-actions-heading"
      className="relative z-20 -mt-1 bg-white pb-8 pt-8 sm:pb-12"
    >
      <Container>
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#277a3b]">
              Quick access
            </p>

            <h2
              id="quick-actions-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl"
            >
              Find what you need faster
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-right">
            Direct access to frequently requested public
            information and Ministry services.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {quickActions.map((action) => {
            const Icon = action.icon
            const accent = accentClasses[action.accent]

            return (
              <Link
                key={action.href}
                href={action.href}
                className={cn(
                  "group relative flex min-h-56 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200",
                  accent.border,
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100",
                    accent.bar,
                  )}
                />

                <div className="flex items-start justify-between gap-3">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105",
                      accent.icon,
                    )}
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-6 w-6"
                    />
                  </div>

                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-700"
                  />
                </div>

                <h3 className="mt-5 font-bold leading-snug text-slate-950">
                  {action.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                  {action.description}
                </p>

                <span className="mt-5 text-sm font-bold text-[#256B29]">
                  Open service
                </span>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}