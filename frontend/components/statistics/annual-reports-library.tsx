"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  FileText,
  FileSpreadsheet,
  FileType,
  Presentation,
  FileArchive,
  Files,
  Download,
  ExternalLink,
  Eye,
  Search,
  Filter,
  X,
  ArrowRight,
  Sparkles,
  FolderSearch,
  ArrowUpDown,
  BarChart3,
  FolderOpen,
  ChevronDown,
  CalendarDays,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import {
  annualStatisticsReports as fallbackReports,
} from "@/data/annual-statistics-reports"
import type {
  ApiAnnualStatisticsDocument,
  ApiAnnualStatisticsHeader,
} from "@/lib/api/annual-statistics"

type FormatCategory =
  | "All formats"
  | "PDF"
  | "Excel"
  | "Word"
  | "CSV"
  | "PowerPoint"
  | "Archive"

type SortOption = "Newest first" | "Oldest first" | "Title A–Z"

interface AnnualReportsLibraryProps {
  header?: ApiAnnualStatisticsHeader
  reports?: ApiAnnualStatisticsDocument[]
  availableYears?: number[]
}

export function AnnualReportsLibrary({
  header,
  reports,
  availableYears,
}: AnnualReportsLibraryProps) {
  const allReports: ApiAnnualStatisticsDocument[] =
    reports !== undefined && reports !== null
      ? reports
      : (fallbackReports as unknown as ApiAnnualStatisticsDocument[])

  // Derive distinct years from data
  const yearsList = useMemo(() => {
    if (availableYears && availableYears.length > 0) {
      return availableYears.map(String)
    }
    const set = new Set<string>()
    allReports.forEach((r) => set.add(r.year.toString()))
    return Array.from(set).sort((a, b) => Number(b) - Number(a))
  }, [availableYears, allReports])

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedFormat, setSelectedFormat] = useState<FormatCategory>("All formats")
  const [selectedYear, setSelectedYear] = useState<string>("All years")
  const [sortOrder, setSortOrder] = useState<SortOption>("Newest first")

  // Track open year accordions (closed by default)
  const [openYears, setOpenYears] = useState<Record<number, boolean>>({})

  const toggleYear = (year: number) => {
    setOpenYears((prev) => ({ ...prev, [year]: !prev[year] }))
  }



  // Clear filters action
  const isFiltered =
    searchQuery !== "" ||
    selectedFormat !== "All formats" ||
    selectedYear !== "All years"

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedFormat("All formats")
    setSelectedYear("All years")
    setSortOrder("Newest first")
  }

  // Filter and Sort reports
  const filteredDocuments = useMemo(() => {
    const result = allReports.filter((doc) => {
      // Search match
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        query === "" ||
        doc.title.toLowerCase().includes(query) ||
        doc.year.toString().includes(query) ||
        (doc.description && doc.description.toLowerCase().includes(query))

      // Year match
      const matchesYear =
        selectedYear === "All years" || doc.year.toString() === selectedYear

      // Format match
      let matchesFormat = true
      if (selectedFormat === "PDF") matchesFormat = doc.fileType === "PDF"
      else if (selectedFormat === "Excel")
        matchesFormat = doc.fileType === "XLSX" || doc.fileType === "XLS"
      else if (selectedFormat === "Word")
        matchesFormat = doc.fileType === "DOCX" || doc.fileType === "DOC"
      else if (selectedFormat === "CSV") matchesFormat = doc.fileType === "CSV"
      else if (selectedFormat === "PowerPoint")
        matchesFormat = doc.fileType === "PPTX" || doc.fileType === "PPT"
      else if (selectedFormat === "Archive") matchesFormat = doc.fileType === "ZIP"

      return matchesSearch && matchesYear && matchesFormat
    })

    // Sort order
    if (sortOrder === "Newest first") {
      result.sort((a, b) => b.year - a.year)
    } else if (sortOrder === "Oldest first") {
      result.sort((a, b) => a.year - b.year)
    } else if (sortOrder === "Title A–Z") {
      result.sort((a, b) => a.title.localeCompare(b.title))
    }

    return result
  }, [allReports, searchQuery, selectedYear, selectedFormat, sortOrder])

  // Group filtered reports by Year
  const groupedByYear = useMemo(() => {
    const map = new Map<number, { year: number; reports: ApiAnnualStatisticsDocument[] }>()
    filteredDocuments.forEach((doc) => {
      const yearKey = doc.year
      if (!map.has(yearKey)) {
        map.set(yearKey, {
          year: doc.year,
          reports: [],
        })
      }
      map.get(yearKey)!.reports.push(doc)
    })
    return Array.from(map.values()).sort((a, b) => b.year - a.year)
  }, [filteredDocuments])

  // Primary Featured Item (e.g. latest bulletin)
  const featuredDocument = useMemo(() => {
    return allReports.find((doc) => doc.featured) || allReports[0] || null
  }, [allReports])

  // Helper for format badge styling
  const getFormatBadge = (type: string) => {
    switch (type) {
      case "PDF":
        return {
          icon: FileText,
          bg: "bg-red-50 text-red-700 border-red-200",
          iconBg: "bg-red-100 text-red-700",
        }
      case "XLSX":
      case "XLS":
        return {
          icon: FileSpreadsheet,
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          iconBg: "bg-emerald-100 text-[#388E3C]",
        }
      case "CSV":
        return {
          icon: FileSpreadsheet,
          bg: "bg-cyan-50 text-cyan-700 border-cyan-200",
          iconBg: "bg-cyan-100 text-cyan-700",
        }
      case "DOCX":
      case "DOC":
        return {
          icon: FileType,
          bg: "bg-blue-50 text-blue-700 border-blue-200",
          iconBg: "bg-blue-100 text-blue-700",
        }
      case "PPTX":
      case "PPT":
        return {
          icon: Presentation,
          bg: "bg-orange-50 text-orange-700 border-orange-200",
          iconBg: "bg-orange-100 text-orange-700",
        }
      case "ZIP":
        return {
          icon: FileArchive,
          bg: "bg-purple-50 text-purple-700 border-purple-200",
          iconBg: "bg-purple-100 text-purple-700",
        }
      default:
        return {
          icon: Files,
          bg: "bg-slate-50 text-slate-700 border-slate-200",
          iconBg: "bg-slate-100 text-slate-700",
        }
    }
  }

  const badgeText = header?.badge_text || "Official Statistical Archive"
  const pageTitle = header?.title || "Annual Statistics Reports & Datasets"
  const pageDesc =
    header?.description ||
    "Browse and download official annual fisheries statistical bulletins, comprehensive sector performance metrics, supporting spreadsheets, raw datasets, and executive presentations published by the Ministry."
  const featuredBadge = header?.featured_badge || "Featured Annual Report"

  return (
    <section
      className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200"
      aria-label="Annual Fisheries Statistics Library"
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
        {!isFiltered && featuredDocument && (
          <div className="mb-10 overflow-hidden rounded-3xl border border-emerald-500/80 bg-linear-to-br from-emerald-700 via-emerald-700 to-slate-700 !text-white shadow-xl relative">
            <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="p-7 sm:p-10 relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-900/20 px-3.5 py-1 text-xs font-bold text-emerald-300 border border-emerald-400/30">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{featuredBadge} • {featuredDocument.year}</span>
                </div>

                <h2 className="mt-3 text-xl sm:text-2xl lg:text-3xl font-extrabold !text-white tracking-tight">
                  {featuredDocument.title}
                </h2>

                <p className="mt-2 text-xs sm:text-sm !text-slate-300 leading-relaxed font-normal">
                  {featuredDocument.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium !text-white-500">
                  <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                    <FileText className="h-3.5 w-3.5 text-emerald-300" />
                    <span>{featuredDocument.fileType} Document ({featuredDocument.fileSize})</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                    <span>Languages: {featuredDocument.language || "English / Sinhala / Tamil"}</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
                {(featuredDocument.fileUrl || featuredDocument.downloadUrl) &&
                (featuredDocument.fileUrl !== "#" || featuredDocument.downloadUrl !== "#") ? (
                  <>
                    <a
                      href={
                        featuredDocument.fileUrl && featuredDocument.fileUrl !== "#"
                          ? featuredDocument.fileUrl
                          : featuredDocument.downloadUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/20 px-5 py-3 text-xs font-bold text-white hover:bg-white/20 transition"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Preview Report</span>
                    </a>
                    {featuredDocument.downloadUrl && featuredDocument.downloadUrl !== "#" ? (
                      <a
                        href={featuredDocument.downloadUrl}
                        download
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#388E3C] px-6 py-3 text-xs font-extrabold text-white hover:bg-[#2e7d32] transition shadow-md"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download Report</span>
                      </a>
                    ) : null}
                  </>
                ) : (
                  <span className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/20 px-5 py-3 text-xs font-bold text-slate-300 opacity-60 cursor-not-allowed">
                    <Eye className="h-4 w-4" />
                    <span>Preview Unavailable</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 2. Controls Panel */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <label htmlFor="search-documents" className="sr-only">
                Search annual reports and datasets
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Search className="h-4 w-4" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="search-documents"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keywords, title, or year..."
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
                  <option value="Title A–Z">Title A–Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Format Tabs Bar */}
          <div className="mt-5 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
                <Filter className="h-3 w-3" /> Formats:
              </span>
              {(
                [
                  "All formats",
                  "PDF",
                  "Excel",
                  "Word",
                  "CSV",
                  "PowerPoint",
                  "Archive",
                ] as FormatCategory[]
              ).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    selectedFormat === fmt
                      ? "bg-[#256B29] text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {fmt}
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

        {/* 3. Results Header & Grid */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-600 font-semibold">
          <span>
            Showing <strong className="text-slate-900">{filteredDocuments.length}</strong> official documents
            {selectedYear !== "All years" ? ` for ${selectedYear}` : ""}
          </span>
          {isFiltered && (
            <span className="bg-emerald-50 text-[#256B29] px-2.5 py-0.5 rounded-full border border-emerald-200">
              Filtered results
            </span>
          )}
        </div>

        {/* Year Accordions List */}
        {groupedByYear.length > 0 ? (
          <div className="space-y-6">
            {groupedByYear.map(({ year, reports: yearReports }) => {
              const isOpen = Boolean(openYears[year])

              return (
                <div
                  key={year}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-[#256B29] ring-2 ring-emerald-600/20 shadow-md bg-gradient-to-br from-emerald-50/40 via-white to-slate-50/60"
                      : "border-slate-300 hover:border-emerald-500/60 shadow-xs hover:shadow-md bg-white"
                  }`}
                >
                  {/* Year Accordion Header */}
                  <button
                    type="button"
                    onClick={() => toggleYear(year)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer text-left select-none transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${
                          isOpen
                            ? "bg-[#256B29] text-white shadow-xs"
                            : "bg-emerald-100 text-[#256B29]"
                        }`}
                      >
                        <FolderOpen className="h-5 w-5" aria-hidden="true" />
                      </div>

                      <div className="min-w-0">
                        <h2
                          className={`text-base sm:text-lg font-extrabold transition-colors duration-200 flex items-center gap-2.5 ${
                            isOpen ? "text-[#256B29]" : "text-slate-950"
                          }`}
                        >
                          <span>{year} Annual Statistics Reports & Datasets</span>
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-full border transition-colors ${
                              isOpen
                                ? "bg-emerald-100 text-[#256B29] border-emerald-300"
                                : "bg-slate-100 text-slate-700 border-slate-300"
                            }`}
                          >
                            {yearReports.length} {yearReports.length === 1 ? "Report" : "Annual Reports"}
                          </span>
                        </h2>
                        <p className="text-xs text-slate-600 font-medium mt-0.5 truncate">
                          Official annual statistical bulletins and sector publications compiled for {year}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
                        isOpen
                          ? "border-emerald-300 bg-emerald-100 text-[#256B29] rotate-180"
                          : "border-slate-300 bg-slate-100 text-slate-700"
                      }`}
                    >
                      <ChevronDown className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </button>

                  {/* Reports Grid inside this Year Category */}
                  {isOpen && (
                    <div className="p-5 sm:p-6 bg-white border-t border-slate-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {yearReports.map((doc) => {
                          const badge = getFormatBadge(doc.fileType)
                          const FormatIcon = badge.icon

                          return (
                            <div
                              key={doc.id}
                              className="flex flex-col justify-between p-5 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-emerald-50/20 hover:border-emerald-300 hover:shadow-xs transition-all group"
                            >
                              <div>
                                {/* File Type Badge & File size */}
                                <div className="flex items-center justify-between gap-2 mb-3">
                                  <div className="flex items-center gap-2">
                                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${badge.iconBg}`}>
                                      <FormatIcon className="h-4 w-4" />
                                    </div>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-extrabold border ${badge.bg}`}>
                                      {doc.fileType}
                                    </span>
                                  </div>
                                  <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                                    {doc.fileSize || "500 KB"}
                                  </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#256B29] transition-colors line-clamp-2">
                                  {doc.title}
                                </h3>

                                {doc.description ? (
                                  <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                                    {doc.description}
                                  </p>
                                ) : null}

                                {/* Publication Date */}
                                <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                  <CalendarDays className="h-3.5 w-3.5 text-[#256B29]" />
                                  <span>Published: {doc.publishedDate}</span>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="mt-5 pt-3 border-t border-slate-200/70 flex items-center gap-2">
                                {(doc.fileUrl || doc.downloadUrl) &&
                                (doc.fileUrl !== "#" || doc.downloadUrl !== "#") ? (
                                  <a
                                    href={
                                      doc.fileUrl && doc.fileUrl !== "#"
                                        ? doc.fileUrl
                                        : doc.downloadUrl
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs"
                                  >
                                    <Eye className="h-3.5 w-3.5 text-[#256B29]" />
                                    <span>Preview</span>
                                  </a>
                                ) : (
                                  <span className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-400 cursor-not-allowed">
                                    <Eye className="h-3.5 w-3.5" />
                                    <span>Preview</span>
                                  </span>
                                )}

                                {doc.downloadUrl && doc.downloadUrl !== "#" ? (
                                  <a
                                    href={doc.downloadUrl}
                                    download
                                    className="inline-flex items-center justify-center p-2 rounded-lg bg-[#256B29] text-white hover:bg-[#1b4d1d] transition-colors shadow-2xs"
                                    title="Download file"
                                    aria-label={`Download ${doc.title}`}
                                  >
                                    <Download className="h-3.5 w-3.5" />
                                  </a>
                                ) : (
                                  <button
                                    type="button"
                                    disabled
                                    className="inline-flex items-center justify-center p-2 rounded-lg bg-slate-100 text-slate-400 cursor-not-allowed"
                                    title="Download unavailable"
                                  >
                                    <Download className="h-3.5 w-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="text-center py-16 px-4 rounded-2xl border border-slate-200 bg-white">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-4">
              <FolderSearch className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Statistical Documents Found</h3>
            <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
              We couldn&apos;t find any statistical reports or datasets matching your search and filter criteria.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#256B29] px-4 py-2 text-xs font-bold text-white hover:bg-[#1b4d1d] transition-colors"
            >
              <X className="h-4 w-4" />
              <span>Clear all filters & search</span>
            </button>
          </div>
        )}


      </Container>
    </section>
  )
}
