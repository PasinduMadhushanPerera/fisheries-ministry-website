"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Search,
  Calendar,
  ChevronDown,
  Eye,
  Download,
  FileText,
  FolderOpen,
  Filter,
  ArrowRight,
  X,
  ArrowUpDown,
  BarChart3,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { weeklyPriceReports as fallbackReports } from "@/data/weekly-fish-prices"
import type {
  ApiWeeklyPriceReport,
  ApiWeeklyPricesHeader,
} from "@/lib/api/weekly-fish-prices"

type FilterPill = "All" | "Latest" | "This Month" | "This Year"
type SortOption = "Newest first" | "Oldest first"

interface WeeklyPricesDirectoryProps {
  header?: ApiWeeklyPricesHeader
  reports?: ApiWeeklyPriceReport[]
  availableYears?: number[]
}

export function WeeklyPricesDirectory({
  header,
  reports,
  availableYears,
}: WeeklyPricesDirectoryProps) {
  const allReports: ApiWeeklyPriceReport[] =
    reports && reports.length > 0
      ? reports
      : (fallbackReports as unknown as ApiWeeklyPriceReport[])

  // Derive distinct years from data
  const yearsList = useMemo(() => {
    if (availableYears && availableYears.length > 0) {
      return availableYears.map(String)
    }
    const set = new Set<string>()
    allReports.forEach((r) => set.add(r.year.toString()))
    return Array.from(set).sort((a, b) => Number(b) - Number(a))
  }, [availableYears, allReports])

  const initialYear = yearsList.length > 0 ? yearsList[0] : "2026"

  const [selectedYear, setSelectedYear] = useState<string>(initialYear)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [activeFilter, setActiveFilter] = useState<FilterPill>("All")
  const [sortOrder, setSortOrder] = useState<SortOption>("Newest first")

  // Track open monthly accordions
  const [openMonths, setOpenMonths] = useState<Record<string, boolean>>({
    June: true,
    May: false,
    April: false,
    March: false,
    December: true,
  })

  const toggleMonth = (month: string) => {
    setOpenMonths((prev) => ({ ...prev, [month]: !prev[month] }))
  }

  const isFiltered =
    searchQuery !== "" || selectedYear !== "All years" || activeFilter !== "All"

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedYear("All years")
    setActiveFilter("All")
    setSortOrder("Newest first")
  }

  // Find newest item in dataset for Latest / This Month pill logic
  const newestItem = allReports[0] || null

  // Filter reports based on year, search, and filter pills
  const filteredReports = useMemo(() => {
    const result = allReports.filter((report) => {
      // Year check
      const matchesYear =
        selectedYear === "All years" || report.year.toString() === selectedYear

      // Search check
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        query === "" ||
        report.title.toLowerCase().includes(query) ||
        report.month.toLowerCase().includes(query) ||
        `week ${report.week}`.includes(query) ||
        report.publishedDate.toLowerCase().includes(query) ||
        report.year.toString().includes(query)

      // Quick filter pill logic
      let matchesPill = true
      if (activeFilter === "Latest" && newestItem) {
        matchesPill =
          report.year === newestItem.year &&
          report.monthNumber === newestItem.monthNumber &&
          report.week === newestItem.week
      } else if (activeFilter === "This Month" && newestItem) {
        matchesPill =
          report.year === newestItem.year &&
          report.monthNumber === newestItem.monthNumber
      } else if (activeFilter === "This Year" && newestItem) {
        matchesPill = report.year === newestItem.year
      }

      return matchesYear && matchesSearch && matchesPill
    })

    // Sort order
    if (sortOrder === "Newest first") {
      result.sort(
        (a, b) =>
          b.year - a.year ||
          b.monthNumber - a.monthNumber ||
          b.week - a.week
      )
    } else {
      result.sort(
        (a, b) =>
          a.year - b.year ||
          a.monthNumber - b.monthNumber ||
          a.week - b.week
      )
    }

    return result
  }, [allReports, selectedYear, searchQuery, activeFilter, sortOrder, newestItem])

  // Group filtered reports by Month
  const groupedByMonth = useMemo(() => {
    const map = new Map<string, ApiWeeklyPriceReport[]>()
    filteredReports.forEach((report) => {
      const monthKey = report.month
      if (!map.has(monthKey)) {
        map.set(monthKey, [])
      }
      map.get(monthKey)!.push(report)
    })
    return Array.from(map.entries())
  }, [filteredReports])

  const badgeText = header?.badge_text || "Official Market Intelligence"
  const pageTitle = header?.title || "Weekly Fish Price Reports"
  const pageDesc =
    header?.description ||
    "Browse and download official weekly retail and wholesale fish price intelligence reports across Sri Lanka's major fishery harbours and consumer markets."

  return (
    <section
      className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200"
      aria-label="Weekly Price Reports Directory"
    >
      <Container>
        {/* Page Top Header */}
        <div className="pb-8 mb-8 border-b border-slate-200">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-[#256B29] border border-emerald-300">
            <BarChart3 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{badgeText}</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight">
            {pageTitle}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-700 max-w-3xl leading-relaxed font-normal">
            {pageDesc}
          </p>
        </div>

        {/* Controls Toolbar */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <label htmlFor="search-reports" className="sr-only">
                Search weekly reports
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Search className="h-4 w-4" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="search-reports"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by week, month or date..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-500 focus:bg-white focus:border-[#388E3C] focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search query"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Selectors & Filters */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Year Select */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
                  Year:
                </span>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:border-[#388E3C] focus:ring-2 focus:ring-emerald-500/20 focus:outline-none cursor-pointer"
                  aria-label="Select report year"
                >
                  <option value="All years">All years</option>
                  {yearsList.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Order Select */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
                  Sort:
                </span>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as SortOption)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:border-[#388E3C] focus:ring-2 focus:ring-emerald-500/20 focus:outline-none cursor-pointer"
                  aria-label="Sort reports"
                >
                  <option value="Newest first">Newest first</option>
                  <option value="Oldest first">Oldest first</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filter Pills Bar */}
          <div className="mt-5 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
                <Filter className="h-3 w-3" /> Quick filters:
              </span>
              {(["All", "Latest", "This Month", "This Year"] as FilterPill[]).map((pill) => (
                <button
                  key={pill}
                  type="button"
                  onClick={() => setActiveFilter(pill)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    activeFilter === pill
                      ? "bg-[#256B29] text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {pill}
                </button>
              ))}
            </div>

            {isFiltered && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-bold text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
                <span>Reset all filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-600 font-semibold">
          <span>
            Showing <strong className="text-slate-900">{filteredReports.length}</strong> weekly reports
            {selectedYear !== "All years" ? ` for ${selectedYear}` : ""}
          </span>
          {isFiltered && (
            <span className="bg-emerald-50 text-[#256B29] px-2.5 py-0.5 rounded-full border border-emerald-200">
              Filtered results
            </span>
          )}
        </div>

        {/* Monthly Accordions List */}
        {groupedByMonth.length > 0 ? (
          <div className="space-y-6">
            {groupedByMonth.map(([monthName, monthReports]) => {
              const isOpen = openMonths[monthName] ?? true
              const reportYear = monthReports[0]?.year || selectedYear

              return (
                <div
                  key={monthName}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs transition-all"
                >
                  {/* Month Accordion Header */}
                  <button
                    type="button"
                    onClick={() => toggleMonth(monthName)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 bg-slate-50/70 hover:bg-slate-100/70 transition-colors cursor-pointer text-left select-none border-b border-slate-200/60"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-[#256B29]">
                        <FolderOpen className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                          <span>
                            {monthName} {reportYear}
                          </span>
                          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                            {monthReports.length} {monthReports.length === 1 ? "Report" : "Reports"}
                          </span>
                        </h2>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          Weekly bulletins published during {monthName}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#256B29] border-emerald-300 bg-emerald-50" : ""
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  {/* Reports Grid in this Month */}
                  {isOpen && (
                    <div className="p-5 sm:p-6 bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {monthReports.map((report) => (
                          <div
                            key={report.id}
                            className="flex flex-col justify-between p-5 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-emerald-50/20 hover:border-emerald-300 hover:shadow-xs transition-all group"
                          >
                            <div>
                              {/* Week Badge & File Size */}
                              <div className="flex items-center justify-between gap-2 mb-3">
                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-extrabold bg-emerald-100 text-[#256B29] border border-emerald-200">
                                  Week {report.week}
                                </span>
                                <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                                  {report.fileSize || "PDF"}
                                </span>
                              </div>

                              {/* Title */}
                              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#256B29] transition-colors line-clamp-2">
                                {report.title}
                              </h3>

                              {/* Publication Date */}
                              <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                <Calendar className="h-3.5 w-3.5 text-[#256B29]" />
                                <span>{report.publishedDate}</span>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-5 pt-3 border-t border-slate-200/70 flex items-center gap-2">
                              {report.pdfUrl ? (
                                <>
                                  <a
                                    href={report.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs"
                                  >
                                    <Eye className="h-3.5 w-3.5 text-[#256B29]" />
                                    <span>Preview</span>
                                  </a>

                                  <a
                                    href={report.pdfUrl}
                                    download
                                    className="inline-flex items-center justify-center p-2 rounded-lg bg-[#256B29] text-white hover:bg-[#1b4d1d] transition-colors shadow-2xs"
                                    title="Download PDF"
                                    aria-label={`Download ${report.title} Week ${report.week}`}
                                  >
                                    <Download className="h-3.5 w-3.5" />
                                  </a>
                                </>
                              ) : (
                                <span className="text-xs text-slate-400 italic py-1">
                                  PDF uploading soon
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 rounded-2xl border border-slate-200 bg-white">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-4">
              <FileText className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Weekly Price Reports Found</h3>
            <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
              We couldn&apos;t find any weekly reports matching your current search or year filters.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#256B29] px-4 py-2 text-xs font-bold text-white hover:bg-[#1b4d1d] transition-colors"
            >
              <X className="h-4 w-4" />
              <span>Clear filters & search</span>
            </button>
          </div>
        )}
      </Container>
    </section>
  )
}
