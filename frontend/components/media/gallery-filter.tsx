"use client"

import { Search, X } from "lucide-react"

import { Container } from "@/components/ui/container"
import {
  galleryCategories,
  type GalleryCategory,
} from "@/data/gallery"

type GalleryFilterProps = {
  activeCategory: GalleryCategory
  searchQuery: string
  onCategoryChange: (category: GalleryCategory) => void
  onSearchChange: (query: string) => void
}

export function GalleryFilter({
  activeCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
}: GalleryFilterProps) {
  const hasSearch = searchQuery.trim().length > 0

  return (
    <section
      aria-labelledby="gallery-filter-heading"
      className="border-y border-slate-200 bg-white py-10"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
              Find albums
            </p>

            <h2
              id="gallery-filter-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-slate-950"
            >
              Browse the gallery
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Search photo albums or filter them by category to quickly find
              official Ministry events, fisheries activities and community
              programmes.
            </p>
          </div>

          <div>
            <label
              htmlFor="gallery-search"
              className="mb-3 block text-sm font-semibold text-slate-800"
            >
              Search gallery
            </label>

            <div className="relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
              />

              <input
                id="gallery-search"
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by album, category or location"
                className="min-h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-12 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-green-700 focus:ring-4 focus:ring-green-100"
              />

              {hasSearch && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                >
                  <X
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                </button>
              )}
            </div>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Gallery categories"
          className="mt-8 flex flex-wrap gap-3"
        >
          {galleryCategories.map((category) => {
            const isActive = activeCategory === category

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="gallery-albums"
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