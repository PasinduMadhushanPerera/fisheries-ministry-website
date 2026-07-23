"use client"

import { Search, X } from "lucide-react"

import { Container } from "@/components/ui/container"
import {
  newsCategories,
  type NewsCategory,
} from "@/data/news"

type NewsFiltersProps = {
  activeCategory: NewsCategory
  searchQuery: string
  onCategoryChange: (category: NewsCategory) => void
  onSearchChange: (query: string) => void
}

export function NewsFilters({
  activeCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
}: NewsFiltersProps) {
  const hasActiveSearch = searchQuery.trim().length > 0

  return (
    <section
      aria-labelledby="news-filter-heading"
      className="border-y border-slate-200 bg-white py-10"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
              Find news
            </p>

            <h2
              id="news-filter-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-slate-950"
            >
              Search and filter updates
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Search ministry news and narrow the results by subject to find
              relevant announcements, events and fisheries updates.
            </p>
          </div>

          <div>
            <label
              htmlFor="news-search"
              className="mb-3 block text-sm font-semibold text-slate-800"
            >
              Search news
            </label>

            <div className="relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
              />

              <input
                id="news-search"
                type="search"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search by title, topic or location"
                className="min-h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-12 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-green-700 focus:ring-4 focus:ring-green-100"
              />

              {hasActiveSearch ? (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  aria-label="Clear news search"
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                >
                  <X
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="News categories"
          className="mt-8 flex flex-wrap gap-3"
        >
          {newsCategories.map((category) => {
            const isActive = category === activeCategory

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="latest-news"
                onClick={() => onCategoryChange(category)}
                className={[
                  "inline-flex min-h-11 items-center rounded-full border px-5 py-2 text-sm font-semibold transition",
                  isActive
                    ? "border-green-700 bg-green-700 text-white shadow-sm"
                    : "border-slate-300 bg-white text-slate-700 hover:border-green-300 hover:bg-green-50 hover:text-green-800",
                ].join(" ")}
              >
                {category}
              </button>
            )
          })}
        </div>
      </Container>
    </section>
  )
}