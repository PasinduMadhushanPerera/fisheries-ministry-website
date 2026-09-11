"use client"

import { useMemo } from "react"
import { Search, X, SlidersHorizontal, ArrowUpDown } from "lucide-react"

import type { LocalTrainingProgramme } from "@/data/local-training-programmes"
import { Container } from "@/components/ui/container"

interface LocalTrainingToolbarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedYear: string
  setSelectedYear: (year: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  selectedFileType: string
  setSelectedFileType: (fileType: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
  resultCount: number
  onClearFilters: () => void
  programmes?: LocalTrainingProgramme[]
}

export function LocalTrainingToolbar({
  searchQuery,
  setSearchQuery,
  selectedYear,
  setSelectedYear,
  selectedCategory,
  setSelectedCategory,
  selectedFileType,
  setSelectedFileType,
  sortBy,
  setSortBy,
  resultCount,
  onClearFilters,
  programmes = [],
}: LocalTrainingToolbarProps) {
  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedYear !== "All" ||
    selectedCategory !== "All" ||
    selectedFileType !== "All" ||
    sortBy !== "newest"

  const availableYears = useMemo(() => {
    const yearsSet = new Set<string>(["2026", "2025", "2024"])
    if (programmes) {
      programmes.forEach((p) => {
        if (p.year) yearsSet.add(p.year.toString())
      })
    }
    return Array.from(yearsSet).sort((a, b) => Number(b) - Number(a))
  }, [programmes])

  const availableCategories = useMemo(() => {
    const map = new Map<string, string>()
    map.set("language", "Language Courses")
    map.set("professional-development", "Professional Development")
    map.set("administration", "Administration")
    map.set("finance", "Finance")
    map.set("procurement", "Procurement")
    map.set("technology", "Technology")
    map.set("management", "Management")
    map.set("other", "Other Special Courses")

    if (programmes) {
      programmes.forEach((p) => {
        if (p.category && !map.has(p.category)) {
          map.set(p.category, p.categoryLabel || p.category)
        }
      })
    }

    return Array.from(map.entries())
  }, [programmes])

  return (
    <section aria-label="Search and filter toolbar" className="border-b border-slate-200/80 bg-white py-6">
      <Container>
        <div className="space-y-4">
          {/* Top Search Bar & Sort Selector */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Search training by title, provider or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 py-3 pl-11 pr-4 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#256B29] focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-100/80 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <ArrowUpDown className="h-4 w-4 text-slate-500 shrink-0" />
              <label htmlFor="sort-by-select" className="text-xs font-bold text-slate-700 shrink-0">
                Sort:
              </label>
              <select
                id="sort-by-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 focus:border-[#256B29] focus:outline-none focus:ring-2 focus:ring-emerald-100 cursor-pointer"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="title-az">Title A–Z</option>
              </select>
            </div>
          </div>

          {/* Filter Options Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <SlidersHorizontal className="h-3.5 w-3.5 text-[#256B29]" />
                <span>Filters:</span>
              </span>

              {/* Year Filter */}
              <select
                aria-label="Filter by year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 focus:border-[#256B29] focus:outline-none focus:ring-2 focus:ring-emerald-100 cursor-pointer"
              >
                <option value="All">All years</option>
                {availableYears.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>

              {/* Category Filter */}
              <select
                aria-label="Filter by category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 focus:border-[#256B29] focus:outline-none focus:ring-2 focus:ring-emerald-100 cursor-pointer"
              >
                <option value="All">All categories</option>
                {availableCategories.map(([val, label]) => (
                  <option key={val} value={val}>
                    {label}
                  </option>
                ))}
              </select>

              {/* File Format Filter */}
              <select
                aria-label="Filter by format"
                value={selectedFileType}
                onChange={(e) => setSelectedFileType(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 focus:border-[#256B29] focus:outline-none focus:ring-2 focus:ring-emerald-100 cursor-pointer"
              >
                <option value="All">All formats</option>
                <option value="PDF">PDF</option>
                <option value="JPG">JPG</option>
                <option value="PNG">PNG</option>
                <option value="DOCX">DOCX</option>
                <option value="XLSX">XLSX</option>
                <option value="ZIP">ZIP</option>
              </select>
            </div>

            {/* Results Count & Clear Button */}
            <div className="flex items-center gap-3 text-xs">
              <span className="font-bold text-slate-700">
                {resultCount} {resultCount === 1 ? "programme" : "programmes"} found
              </span>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={onClearFilters}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-extrabold text-slate-700 transition hover:bg-slate-200 cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                  <span>Clear filters</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
