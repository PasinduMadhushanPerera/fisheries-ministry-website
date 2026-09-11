"use client"

import { Search, RotateCcw, Filter } from "lucide-react"
import { Container } from "@/components/ui/container"

interface GalleryToolbarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategory: string
  setSelectedCategory: (cat: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
  categories: { key: string; label: string }[]
  resultCount: number
  onClearFilters: () => void
}

export function GalleryToolbar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories,
  resultCount,
  onClearFilters,
}: GalleryToolbarProps) {
  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedCategory !== "All" ||
    sortBy !== "newest"

  return (
    <section aria-label="Gallery search and filters" className="border-b border-slate-200 bg-white py-6 shadow-2xs">
      <Container>
        <div className="flex flex-col gap-5">
          {/* Top row: Search input + Sort + Clear button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative flex-1 max-w-xl">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
              <label htmlFor="gallery-search-input" className="sr-only">
                Search photo albums
              </label>
              <input
                id="gallery-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search photo albums by title, location or topic..."
                className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50/50 py-2.5 pl-11 pr-4 text-xs sm:text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#256B29] focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            {/* Controls: Sort dropdown & Result badge */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 whitespace-nowrap hidden md:inline">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="min-h-10 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 outline-none transition focus:border-[#256B29] focus:ring-4 focus:ring-emerald-100 cursor-pointer"
                >
                  <option value="newest">Newest Albums</option>
                  <option value="photos-count">Most Photos</option>
                  <option value="featured">Featured Collections</option>
                  <option value="title-az">Title A – Z</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={onClearFilters}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3.5 text-xs font-bold text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 cursor-pointer"
                  title="Reset all filters"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset</span>
                </button>
              )}

              <span className="inline-flex min-h-10 items-center rounded-xl bg-emerald-50 border border-emerald-200/80 px-3.5 text-xs font-extrabold text-[#256B29]">
                {resultCount} {resultCount === 1 ? "Album" : "Albums"}
              </span>
            </div>
          </div>

          {/* Bottom row: Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 pr-1 shrink-0">
              <Filter className="h-3.5 w-3.5 text-[#256B29]" />
              <span>Collection:</span>
            </span>

            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.key
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`inline-flex min-h-9 items-center rounded-xl px-3.5 text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    isSelected
                      ? "bg-[#256B29] text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/80"
                  }`}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
