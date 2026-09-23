"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import {
  FileSpreadsheet,
  FileText,
  FileType,
  Download,
  CalendarDays,
  Eye,
  Search,
  FolderOpen,
  Filter,
  X,
  ArrowRight,
  ArrowUpDown,
  BarChart3,
  Sparkles,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import {
  monthlyProductionReports as fallbackReports,
} from "@/data/monthly-production-reports"
import type {
  ApiMonthlyProductionHeader,
  ApiMonthlyProductionReport,
} from "@/lib/api/monthly-fish-production"

type QuickFilter = "All reports" | "Latest" | "First half" | "Second half"
type SortOption = "Newest first" | "Oldest first" | "Month A–Z"

interface MonthlyProductionLibraryProps {
  header?: ApiMonthlyProductionHeader
  reports?: ApiMonthlyProductionReport[]
  availableYears?: number[]
}

export function MonthlyProductionLibrary({
  header,
  reports,
  availableYears,
}: MonthlyProductionLibraryProps) {
  const allReports: ApiMonthlyProductionReport[] =
    reports && reports.length > 0
      ? reports
      : (fallbackReports as unknown as ApiMonthlyProductionReport[])

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
  const [activeFilter, setActiveFilter] = useState<QuickFilter>("All reports")
  const [sortOrder, setSortOrder] = useState<SortOption>("Newest first")

  // Modal State
  const [selectedReport, setSelectedReport] = useState<ApiMonthlyProductionReport | null>(null)

  // Keyboard Escape listener for Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedReport(null)
      }
    }
    if (selectedReport) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [selectedReport])

  const isFiltered =
    searchQuery !== "" ||
    selectedYear !== "All years" ||
    activeFilter !== "All reports"

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedYear("All years")
    setActiveFilter("All reports")
    setSortOrder("Newest first")
  }

  const newestItem = allReports[0] || null

  // Primary Featured Item (e.g. highlighted production report)
  const featuredReport = useMemo(() => {
    return allReports.find((doc) => doc.featured) || allReports[0] || null
  }, [allReports])

  // Filter and Sort reports
  const filteredReports = useMemo(() => {
    const result = allReports.filter((report) => {
      // Year match
      const matchesYear =
        selectedYear === "All years" || report.year.toString() === selectedYear

      // Search match
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        query === "" ||
        report.month.toLowerCase().includes(query) ||
        report.year.toString().includes(query) ||
        report.title.toLowerCase().includes(query) ||
        (report.description && report.description.toLowerCase().includes(query))

      // Quick filter pill logic
      let matchesPill = true
      if (activeFilter === "Latest" && newestItem) {
        matchesPill =
          report.year === newestItem.year &&
          report.monthNumber === newestItem.monthNumber
      } else if (activeFilter === "First half") {
        matchesPill = report.monthNumber >= 1 && report.monthNumber <= 6
      } else if (activeFilter === "Second half") {
        matchesPill = report.monthNumber >= 7 && report.monthNumber <= 12
      }

      return matchesYear && matchesSearch && matchesPill
    })

    // Sort order
    if (sortOrder === "Newest first") {
      result.sort((a, b) => b.year - a.year || b.monthNumber - a.monthNumber)
    } else if (sortOrder === "Oldest first") {
      result.sort((a, b) => a.year - b.year || a.monthNumber - b.monthNumber)
    } else if (sortOrder === "Month A–Z") {
      result.sort((a, b) => a.month.localeCompare(b.month))
    }

    return result
  }, [allReports, selectedYear, searchQuery, activeFilter, sortOrder, newestItem])

  const badgeText = header?.badge_text || "Sectoral Production Data"
  const pageTitle = header?.title || "Monthly Fish Production Statistics"
  const pageDesc =
    header?.description ||
    "Download official monthly fish production statistics compiled by the Ministry of Fisheries across marine, coastal, and inland sectors."
  const featuredBadge = header?.featured_badge || "Featured Production Report"

  return (
    <section
      className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200"
      aria-label="Monthly Fish Production Library"
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

        {/* 1. Featured Document Banner (Only shown if no strict search/filter is active) */}
        {!isFiltered && featuredReport && (
          <div className="mb-10 overflow-hidden rounded-3xl border border-emerald-500/80 bg-linear-to-br from-emerald-700 via-emerald-700 to-slate-700 !text-white shadow-xl relative">
            <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="p-7 sm:p-10 relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-900/20 px-3.5 py-1 text-xs font-bold text-emerald-300 border border-emerald-400/30">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{featuredBadge} • {featuredReport.month} {featuredReport.year}</span>
                </div>

                <h2 className="mt-3 text-xl sm:text-2xl lg:text-3xl font-extrabold !text-white tracking-tight">
                  {featuredReport.month} {featuredReport.year} Production Report
                </h2>

                <p className="mt-2 text-xs sm:text-sm !text-slate-300 leading-relaxed font-normal">
                  {featuredReport.description || featuredReport.title}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium !text-white-500">
                  <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                    <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-300" />
                    <span>{featuredReport.fileType || "XLSX"} Document ({featuredReport.fileSize || "Spreadsheet"})</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                    <CalendarDays className="h-3.5 w-3.5 text-emerald-300" />
                    <span>Published: {featuredReport.publishedDate}</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedReport(featuredReport)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/20 px-5 py-3 text-xs font-bold text-white hover:bg-white/20 transition cursor-pointer"
                >
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </button>

                {featuredReport.fileUrl && featuredReport.fileUrl !== "#" ? (
                  <a
                    href={featuredReport.fileUrl}
                    download
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#388E3C] px-6 py-3 text-xs font-extrabold text-white hover:bg-[#2e7d32] transition shadow-md"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Report</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectedReport(featuredReport)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#388E3C] px-6 py-3 text-xs font-extrabold text-white hover:bg-[#2e7d32] transition shadow-md cursor-pointer"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Document Summary</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Controls Panel */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Field */}
            <div className="relative flex-1 max-w-md">
              <label htmlFor="search-monthly-reports" className="sr-only">
                Search by month or year
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Search className="h-4 w-4" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="search-monthly-reports"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by month (e.g. March, February)..."
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
                  aria-label="Select production year"
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
                  <option value="Month A–Z">Month A–Z</option>
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
              {(["All reports", "Latest", "First half", "Second half"] as QuickFilter[]).map((pill) => (
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
            Showing <strong className="text-slate-900">{filteredReports.length}</strong> monthly production files
            {selectedYear !== "All years" ? ` for ${selectedYear}` : ""}
          </span>
          {isFiltered && (
            <span className="bg-emerald-50 text-[#256B29] px-2.5 py-0.5 rounded-full border border-emerald-200">
              Filtered results
            </span>
          )}
        </div>

        {/* Reports Grid (Card View) */}
        {filteredReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs hover:border-emerald-300 hover:shadow-md transition-all group"
              >
                <div>
                  {/* Card Header: Excel Badge & File size */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#256B29] group-hover:bg-emerald-100 transition-colors">
                        <FileSpreadsheet className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-extrabold bg-emerald-100 text-[#256B29]">
                          {report.fileType || "XLSX"}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      {report.fileSize || "Spreadsheet"}
                    </span>
                  </div>

                  {/* Month Heading & Title */}
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#256B29] transition-colors">
                    {report.month} {report.year} Production
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {report.description || report.title}
                  </p>

                  {/* Meta: Published Date */}
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <CalendarDays className="h-3.5 w-3.5 text-[#256B29]" />
                    <span>Published: {report.publishedDate}</span>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedReport(report)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-slate-500 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <Eye className="h-3.5 w-3.5 text-[#256B29]" />
                    <span>Details</span>
                  </button>

                  {report.fileUrl && report.fileUrl !== "#" ? (
                    <a
                      href={report.fileUrl}
                      download
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#256B29] text-xs font-bold !text-white hover:bg-[#1b4d1d] transition-colors shadow-2xs"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-100 text-xs font-bold text-slate-900 cursor-not-allowed"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Available Soon</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 rounded-2xl border border-slate-200 bg-white">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-4">
              <FileSpreadsheet className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Production Reports Found</h3>
            <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
              We couldn&apos;t find any monthly production statistics matching your current filters.
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

        {/* Modal: Report Details */}
        {selectedReport && (
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-modal-title"
          >
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-[#256B29]">
                    <FileSpreadsheet className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 id="report-modal-title" className="text-lg font-extrabold text-slate-900">
                      {selectedReport.month} {selectedReport.year} Production
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Official Monthly Statistical Dataset
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedReport(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Dataset Description</h4>
                  <p>{selectedReport.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 px-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                  <div>
                    <span className="text-slate-500 block">File Type</span>
                    <strong className="text-slate-900 font-bold">{selectedReport.fileType} Document</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">File Size</span>
                    <strong className="text-slate-900 font-bold">{selectedReport.fileSize}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Publication Date</span>
                    <strong className="text-slate-900 font-bold">{selectedReport.publishedDate}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Coverage</span>
                    <strong className="text-slate-900 font-bold">National (All Districts)</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Close
                </button>

                {selectedReport.fileUrl && selectedReport.fileUrl !== "#" ? (
                  <a
                    href={selectedReport.fileUrl}
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#256B29] text-xs font-bold !text-white hover:bg-[#1b4d1d] transition shadow-xs"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Document</span>
                  </a>
                ) : (
                  <span className="text-xs text-slate-400 italic">File download ready soon</span>
                )}
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
