import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"

import { popularServices } from "@/data/services"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"

export function PopularServices() {
  return (
    <Section
      id="popular-services"
      background="white"
      labelledBy="popular-services-heading"
      spacing="lg"
    >
      <SectionTitle
        id="popular-services-heading"
        eyebrow="Quick access"
        title="Popular services"
        description="Find commonly requested Ministry services, guidance and public resources."
        align="center"
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {popularServices.map((service) => {
          const Icon = service.icon

          return (
            <Card
              key={service.title}
              interactive
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-0 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
            >
              {service.featured && (
                <div className="absolute right-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800 ring-1 ring-amber-200">
                  <Star
                    aria-hidden="true"
                    className="h-3.5 w-3.5 fill-current"
                  />
                  Popular
                </div>
              )}

              <div className="h-1.5 w-full bg-gradient-to-r from-[#256B29] via-emerald-500 to-sky-500" />

              <div className="flex flex-1 flex-col p-7 sm:p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-[#256B29] transition duration-300 group-hover:scale-105 group-hover:bg-[#256B29] group-hover:text-white">
                  <Icon
                    aria-hidden="true"
                    className="h-7 w-7"
                  />
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                  {service.category.replace("-", " ")}
                </p>

                <h3 className="mt-3 text-xl font-bold leading-snug text-slate-950">
                  {service.title}
                </h3>

                <p className="mt-4 flex-1 leading-7 text-slate-600">
                  {service.description}
                </p>

                <Link
                  href={service.href}
                  className="mt-7 inline-flex w-fit items-center gap-2 rounded-lg font-semibold text-[#256B29] transition hover:gap-3 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                >
                  View service

                  <ArrowRight
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </Link>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/services/all"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-[#256B29] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
        >
          View all services

          <ArrowRight
            aria-hidden="true"
            className="h-5 w-5"
          />
        </Link>
      </div>
    </Section>
  )
}