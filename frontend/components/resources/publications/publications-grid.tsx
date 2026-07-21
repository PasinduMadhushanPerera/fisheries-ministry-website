"use client"

import { useMemo, useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"

import { Container } from "@/components/ui/container"
import {
  ministryPublications,
  publicationCategories,
} from "@/data/publications"
import { PublicationCard } from "./publication-card"

export function PublicationsGrid() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] =
    useState("All Publications")

  const filteredPublications = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase()

    return ministryPublications.filter((publication) => {
      const matchesCategory =
        selectedCategory === "All Publications" ||
        publication.category === selectedCategory

      const matchesSearch =
        normalizedSearch.length === 0 ||
        publication.title.toLowerCase().includes(normalizedSearch) ||
        publication.description
          .toLowerCase()
          .includes(normalizedSearch) ||
        publication.category.toLowerCase().includes(normalizedSearch) ||
        publication.language.toLowerCase().includes(normalizedSearch) ||
        publication.year.toString().includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [searchQuery, selectedCategory])

  return (
    <section
      id="publications-list"
      aria-labelledby="publications-list-heading"
      className="bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#2f7d32]">
            Publication library
          </p>

          <h2
            id="publications-list-heading"
            className="mt-3 text-3xl font-bold tracking-[-0.025em] text-slate-950 sm:text-4xl"
          >
            Browse Ministry publications
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Search publications by title, category, year or language.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_18rem]">
            <div>
              <label
                htmlFor="publication-search"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                Search publications
              </label>

              <div className="relative">
                <Search
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="publication-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Search by title, year or language"
                  className="min-h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="publication-category"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                Filter by category
              </label>

              <div className="relative">
                <SlidersHorizontal
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                />

                <select
                  id="publication-category"
                  value={selectedCategory}
                  onChange={(event) =>
                    setSelectedCategory(event.target.value)
                  }
                  className="min-h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-10 text-slate-950 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100"
                >
                  {publicationCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <p
          aria-live="polite"
          className="mt-6 text-sm font-semibold text-slate-600"
        >
          {filteredPublications.length}{" "}
          {filteredPublications.length === 1
            ? "publication"
            : "publications"}{" "}
          found
        </p>

        {filteredPublications.length > 0 ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredPublications.map((publication) => (
              <PublicationCard
                key={publication.id}
                publication={publication}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <h3 className="text-xl font-bold text-slate-950">
              No publications found
            </h3>

            <p className="mt-2 text-slate-600">
              Try another search term or choose a different category.
            </p>
          </div>
        )}

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
          <p className="text-sm leading-6 text-amber-900">
            Replace all sample publication entries with approved Ministry
            titles, dates, languages, file details and download links.
          </p>
        </div>
      </Container>
    </section>
  )
}