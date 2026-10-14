"use client"

import { Search, RotateCcw } from "lucide-react"
import { Container } from "@/components/ui/container"

interface VideosToolbarProps {
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

export function VideosToolbar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories,
  resultCount,
  onClearFilters,
}: VideosToolbarProps) {
  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedCategory !== "All" ||
    sortBy !== "newest"

  return (
    <section aria-label="Videos search and filters" className="border-b border-slate-200 bg-white py-6 shadow-2xs">
      <Container>
        {/* Search input + Sort + Clear button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative flex-1 max-w-xl">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
              <label htmlFor="videos-search-input" className="sr-only">
                Search official videos
              </label>
              <input
                id="videos-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search official videos by title, location or topic..."
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
                  <option value="newest">Newest Videos</option>
                  <option value="featured">Featured First</option>
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
                {resultCount} {resultCount === 1 ? "Video" : "Videos"}
              </span>
            </div>
          </div>
      </Container>
    </section>
  )
}
