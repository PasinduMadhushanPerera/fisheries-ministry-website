"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, SearchX } from "lucide-react"

import { LicenceFilters } from "@/components/services/licence-filters"
import { Container } from "@/components/ui/container"
import {
  licenceServices,
  type LicenceFilter,
} from "@/data/licences-and-registrations"

export function LicenceServiceList() {
  const [activeFilter, setActiveFilter] =
    useState<LicenceFilter>("All")

  const filteredServices = useMemo(() => {
    if (activeFilter === "All") {
      return licenceServices
    }

    return licenceServices.filter(
      (service) => service.category === activeFilter,
    )
  }, [activeFilter])

  return (
    <>
      <LicenceFilters onFilterChange={setActiveFilter} />

      <section
        id="licence-services"
        aria-labelledby="licence-services-heading"
        className="scroll-mt-24 bg-slate-50 py-16 sm:py-20"
      >
        <Container>
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                Available applications
              </p>

              <h2
                id="licence-services-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
              >
                {activeFilter === "All"
                  ? "All licences and registrations"
                  : activeFilter}
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Select a service to view its eligibility requirements,
                supporting documents, fees and application instructions.
              </p>
            </div>

            <p
              className="shrink-0 text-sm font-semibold text-slate-600"
              aria-live="polite"
            >
              {filteredServices.length}{" "}
              {filteredServices.length === 1 ? "service" : "services"} found
            </p>
          </div>

          {filteredServices.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service) => {
                const Icon = service.icon

                return (
                  <article
                    key={service.title}
                    className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700 transition group-hover:bg-green-700 group-hover:text-white">
                        <Icon
                          aria-hidden="true"
                          className="h-7 w-7"
                        />
                      </div>

                      <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-800">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-slate-950">
                      {service.title}
                    </h3>

                    <p className="mt-3 flex-1 leading-7 text-slate-600">
                      {service.description}
                    </p>

                    <Link
                      href={service.href}
                      className="mt-6 inline-flex items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                      aria-label={`View details for ${service.title}`}
                    >
                      View service details

                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                <SearchX aria-hidden="true" className="h-7 w-7" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-950">
                No services found
              </h3>

              <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-600">
                There are currently no services available under this
                application type. Select another category to continue.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}