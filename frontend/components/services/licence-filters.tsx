"use client"

import { useState } from "react"

import { Container } from "@/components/ui/container"
import {
  licenceFilters,
  type LicenceFilter,
} from "@/data/licences-and-registrations"

type LicenceFiltersProps = {
  onFilterChange?: (filter: LicenceFilter) => void
}

export function LicenceFilters({
  onFilterChange,
}: LicenceFiltersProps) {
  const [activeFilter, setActiveFilter] =
    useState<LicenceFilter>("All")

  function handleFilterChange(filter: LicenceFilter) {
    setActiveFilter(filter)
    onFilterChange?.(filter)
  }

  return (
    <section
      aria-labelledby="licence-filter-heading"
      className="border-b border-slate-200 bg-white py-10"
    >
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
              Browse services
            </p>

            <h2
              id="licence-filter-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-slate-950"
            >
              Filter by application type
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Browse licences, permits, registrations and renewals to quickly
              find the service you need.
            </p>
          </div>

          <div
            className="flex flex-wrap gap-3"
            role="tablist"
            aria-label="Licence categories"
          >
            {licenceFilters.map((filter) => {
              const isActive = activeFilter === filter

              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="licence-services"
                  onClick={() => handleFilterChange(filter)}
                  className={[
                    "inline-flex min-h-11 items-center rounded-full border px-5 py-2 text-sm font-semibold transition",
                    isActive
                      ? "border-green-700 bg-green-700 text-white shadow-sm"
                      : "border-slate-300 bg-white text-slate-700 hover:border-green-300 hover:bg-green-50 hover:text-green-800",
                  ].join(" ")}
                >
                  {filter}
                </button>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}