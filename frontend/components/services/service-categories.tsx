import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { serviceCategoryCards } from "@/data/services"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"

export function ServiceCategories() {
  return (
    <Section
      id="service-categories"
      background="soft"
      labelledBy="service-categories-heading"
      spacing="lg"
    >
      <SectionTitle
        id="service-categories-heading"
        eyebrow="Browse by category"
        title="Find the right service"
        description="Explore Ministry services, guidance and public resources by category."
        align="center"
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {serviceCategoryCards.map((category, index) => {
          const Icon = category.icon
          const categoryNumber = String(index + 1).padStart(2, "0")

          return (
            <Link
              key={category.title}
              href={category.href}
              className="group relative flex min-h-72 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 sm:p-8"
            >
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald-50 transition duration-500 group-hover:scale-125"
              />

              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#256B29] text-white shadow-md transition duration-300 group-hover:scale-105">
                    <Icon
                      aria-hidden="true"
                      className="h-7 w-7"
                    />
                  </div>

                  <span className="text-sm font-bold tracking-[0.18em] text-slate-300">
                    {categoryNumber}
                  </span>
                </div>

                <h3 className="mt-7 text-2xl font-bold leading-snug text-slate-950 transition-colors group-hover:text-[#256B29]">
                  {category.title}
                </h3>

                <p className="mt-4 flex-1 leading-7 text-slate-600">
                  {category.description}
                </p>

                <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">
                  <span className="text-sm font-semibold text-slate-500">
                    {category.serviceCount}
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-[#256B29] transition duration-300 group-hover:bg-[#256B29] group-hover:text-white">
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-5 w-5"
                    />
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </Section>
  )
}