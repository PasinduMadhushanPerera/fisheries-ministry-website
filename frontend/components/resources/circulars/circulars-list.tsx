"use client"

import { useMemo, useState } from "react"
import {
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import {
  circularCategories,
  circularYears,
  ministryCirculars,
} from "@/data/circulars"
import { CircularCard } from "./circular-card"

export function CircularsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] =
    useState("All Circulars")
  const [selectedYear, setSelectedYear] = useState("All Years")

  const filteredCirculars = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase()

    return ministryCirculars.filter((circular) => {
      const matchesCategory =
        selectedCategory === "All Circulars" ||
        circular.category === selectedCategory

      const matchesYear =
        selectedYear === "All Years" ||
        circular.year.toString() === selectedYear

      const matchesSearch =
        normalizedSearch.length === 0 ||
        circular.title.toLowerCase().includes(normalizedSearch) ||
        circular.description.toLowerCase().includes(normalizedSearch) ||
        circular.circularNumber.toLowerCase().includes(normalizedSearch) ||
        circular.category.toLowerCase().includes(normalizedSearch) ||
        circular.department.toLowerCase().includes(normalizedSearch)

      return matchesCategory && matchesYear && matchesSearch
    })
  }, [searchQuery, selectedCategory, selectedYear])

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All Circulars")
    setSelectedYear("All Years")
  }

  return (
    <section
      id="circulars-list"
      aria-labelledby="circulars-list-heading"
      className="bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#2f7d32]">
            Circular archive
          </p>

          <h2
            id="circulars-list-heading"
            className="mt-3 text-3xl font-bold tracking-[-0.025em] text-slate-950 sm:text-4xl"
          >
            Browse Ministry circulars
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Search by circular title, reference number, category,
            department or publication year.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-4 xl:grid-cols-[1fr_17rem_13rem_auto] xl:items-end">
            <div>
              <label
                htmlFor="circular-search"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                Search circulars
              </label>

              <div className="relative">
                <Search
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="circular-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Title, circular number or department"
                  className="min-h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="circular-category"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                Category
              </label>

              <div className="relative">
                <SlidersHorizontal
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                />

                <select
                  id="circular-category"
                  value={selectedCategory}
                  onChange={(event) =>
                    setSelectedCategory(event.target.value)
                  }
                  className="min-h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-10 text-slate-950 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
                >
                  {circularCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="circular-year"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                Year
              </label>

              <select
                id="circular-year"
                value={selectedYear}
                onChange={(event) =>
                  setSelectedYear(event.target.value)
                }
                className="min-h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
              >
                {circularYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:border-green-600 hover:bg-green-50 hover:text-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
            >
              <RotateCcw
                aria-hidden="true"
                className="h-4 w-4"
              />
              Reset
            </button>
          </div>
        </div>

        <p
          aria-live="polite"
          className="mt-6 text-sm font-semibold text-slate-600"
        >
          {filteredCirculars.length}{" "}
          {filteredCirculars.length === 1
            ? "circular"
            : "circulars"}{" "}
          found
        </p>

        {filteredCirculars.length > 0 ? (
          <div className="mt-6 space-y-5">
            {filteredCirculars.map((circular) => (
              <CircularCard
                key={circular.id}
                circular={circular}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <ScrollTextIcon />

            <h3 className="mt-4 text-xl font-bold text-slate-950">
              No circulars found
            </h3>

            <p className="mt-2 text-slate-600">
              Try changing the search term, category or year.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0a322f] px-5 py-2.5 font-semibold text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
            >
              Reset filters
            </button>
          </div>
        )}

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
          <p className="text-sm leading-6 text-amber-900">
            Replace all sample circular records with officially verified
            circular numbers, issue dates, departments, languages and files.
          </p>
        </div>
      </Container>
    </section>
  )
}

function ScrollTextIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="mx-auto h-10 w-10 text-slate-400"
    >
      <path d="M8 2h8a2 2 0 0 1 2 2v16l-4-2-4 2-4-2-4 2V4a2 2 0 0 1 2-2h4" />
      <path d="M8 7h8M8 11h8M8 15h5" />
    </svg>
  )
}