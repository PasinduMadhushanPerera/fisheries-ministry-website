"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import {
  FileText,
  FileSpreadsheet,
  FileType,
  FileArchive,
  Files,
  Download,
  ExternalLink,
  Eye,
  Search,
  Filter,
  X,
  ArrowRight,
  FolderOpen,
  ArrowUpDown,
  BarChart3,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import {
  exportImportReports as fallbackReports,
} from "@/data/export-import-reports"
import type {
  ApiExportImportHeader,
  ApiExportImportReport,
} from "@/lib/api/export-import-statistics"

type FormatCategory = "All formats" | "PDF" | "Excel" | "CSV" | "Archive"
type SortOption = "Newest first" | "Oldest first"

interface ExportImportLibraryProps {
  header?: ApiExportImportHeader
  reports?: ApiExportImportReport[]
  availableYears?: number[]
}

export function ExportImportLibrary({
  header,
  reports,
  availableYears,
}: ExportImportLibraryProps) {
  const allReports: ApiExportImportReport[] =
    reports && reports.length > 0
      ? reports
      : (fallbackReports as unknown as ApiExportImportReport[])

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
  const [selectedFormat, setSelectedFormat] = useState<FormatCategory>("All formats")
  const [sortOrder, setSortOrder] = useState<SortOption>("Newest first")

  // Modal State
  const [selectedReport, setSelectedReport] = useState<ApiExportImportReport | null>(null)

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
    selectedFormat !== "All formats"

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedYear("All years")
    setSelectedFormat("All formats")
    setSortOrder("Newest first")
  }

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

      // Format match
      let matchesFormat = true
      if (selectedFormat === "PDF") matchesFormat = report.fileType === "PDF"
      else if (selectedFormat === "Excel")
        matchesFormat = report.fileType === "XLSX" || report.fileType === "XLS"
      else if (selectedFormat === "CSV") matchesFormat = report.fileType === "CSV"
      else if (selectedFormat === "Archive") matchesFormat = report.fileType === "ZIP"

      return matchesYear && matchesSearch && matchesFormat
    })

    // Sort order
    if (sortOrder === "Newest first") {
      result.sort((a, b) => b.year - a.year || b.monthNumber - a.monthNumber)
    } else if (sortOrder === "Oldest first") {
      result.sort((a, b) => a.year - b.year || a.monthNumber - b.monthNumber)
    }

    return result
  }, [allReports, selectedYear, searchQuery, selectedFormat, sortOrder])

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

  const badgeText = header?.badge_text || "Trade & Commerce Statistics"
  const pageTitle = header?.title || "Export and Import of Fish and Fishery Products"
  const pageDesc =
    header?.description ||
    "Official monthly statistics on fish exports, imports, trade values, customs volume reconciliations, and balance of trade compiled by the Ministry of Fisheries."

  return (
    <section
      className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200"
      aria-label="Export and Import Reports Library"
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

        {/* Controls Panel */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <label htmlFor="search-reports" className="sr-only">
                Search reports by month or keywords
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Search className="h-4 w-4" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="search-reports"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by month (e.g. May, April)..."
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
                  aria-label="Select trade report year"
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

          {/* Format Tabs Bar */}
          <div className="mt-5 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
                <Filter className="h-3 w-3" /> Formats:
              </span>
              {(["All formats", "PDF", "Excel", "CSV", "Archive"] as FormatCategory[]).map((fmt) => (
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

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-600 font-semibold">
          <span>
            Showing <strong className="text-slate-900">{filteredReports.length}</strong> official trade files
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
            {filteredReports.map((report) => {
              const badge = getFormatBadge(report.fileType)
              const FormatIcon = badge.icon

              return (
                <div
                  key={report.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs hover:border-emerald-300 hover:shadow-md transition-all group"
                >
                  <div>
                    {/* Card Header: Format Badge & File size */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${badge.iconBg} transition-colors`}
                        >
                          <FormatIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-extrabold border ${badge.bg}`}
                          >
                            {report.fileType}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                        {report.fileSize}
                      </span>
                    </div>

                    {/* Month Heading */}
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#256B29] transition-colors">
                      {report.month} {report.year} Trade Report
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {report.description}
                    </p>

                    {/* Meta Info */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span>Published: {report.publishedDate}</span>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedReport(report)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5 text-[#256B29]" />
                      <span>Details</span>
                    </button>

                    {report.downloadUrl && report.downloadUrl !== "#" ? (
                      <a
                        href={report.downloadUrl}
                        download
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#256B29] text-xs font-bold !text-white hover:bg-[#1b4d1d] transition shadow-2xs"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedReport(report)}
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-100 text-xs font-bold text-slate-500 hover:bg-slate-200 transition cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Preview</span>
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 rounded-2xl border border-slate-200 bg-white">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-4">
              <FolderOpen className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Trade Reports Found</h3>
            <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
              We couldn&apos;t find any export &amp; import reports matching your current filter criteria.
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
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 id="report-modal-title" className="text-lg font-extrabold text-slate-900">
                      {selectedReport.month} {selectedReport.year} Trade Report
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Official Export &amp; Import Monthly Publication
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
                  <h4 className="font-bold text-slate-900 mb-1">Overview & Scope</h4>
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
                    <strong className="text-slate-900 font-bold">National Customs Trade</strong>
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

                {selectedReport.downloadUrl && selectedReport.downloadUrl !== "#" ? (
                  <a
                    href={selectedReport.downloadUrl}
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#256B29] text-xs font-bold !text-white hover:bg-[#1b4d1d] transition shadow-xs"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Report</span>
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
