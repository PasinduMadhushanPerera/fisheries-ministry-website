"use client"

import { useState, useMemo } from "react"
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
  X,
  ArrowRight,
  FolderOpen,
  ArrowUpDown,
  BarChart3,
  ChevronDown,
  CalendarDays,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import {
  exportImportReports as fallbackReports,
} from "@/data/export-import-reports"
import { useLanguage } from "@/src/contexts/LanguageContext"
import type {
  ApiExportImportHeader,
  ApiExportImportReport,
  ApiExportImportYearCategory,
} from "@/lib/api/export-import-statistics"

type SortOption = "Newest first" | "Oldest first"

const SINHALA_MONTHS: Record<string, string> = {
  January: "ජනවාරි",
  February: "පෙබරවාරි",
  March: "මාර්තු",
  April: "අප්‍රේල්",
  May: "මැයි",
  June: "ජූනි",
  July: "ජූලි",
  August: "අගෝස්තු",
  September: "සැප්තැම්බර්",
  October: "ඔක්තෝබර්",
  November: "නොවැම්බර්",
  December: "දෙසැම්බර්",
}

const TAMIL_MONTHS: Record<string, string> = {
  January: "ஜனவரி",
  February: "பெப்ரவரி",
  March: "மார்ச்",
  April: "ஏப்ரல்",
  May: "மே",
  June: "ஜூன்",
  July: "ஜூலை",
  August: "ஆகஸ்ட்",
  September: "செப்டம்பர்",
  October: "அக்டோபர்",
  November: "நவம்பர்",
  December: "டிசம்பர்",
}

interface ExportImportLibraryProps {
  header?: ApiExportImportHeader
  reports?: ApiExportImportReport[]
  availableYears?: number[]
  categories?: ApiExportImportYearCategory[]
}

export function ExportImportLibrary({
  header,
  reports,
  availableYears,
  categories,
}: ExportImportLibraryProps) {
  const { language } = useLanguage()
  const isSi = language === "si"
  const isTa = language === "ta"

  const categoryMap = useMemo(() => {
    const map = new Map<number, ApiExportImportYearCategory>()
    if (categories && categories.length > 0) {
      categories.forEach((cat) => {
        map.set(cat.year, cat)
      })
    }
    return map
  }, [categories])

  const allReports: ApiExportImportReport[] =
    reports !== undefined && reports !== null
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

  const [selectedYear, setSelectedYear] = useState<string>("All years")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortOrder, setSortOrder] = useState<SortOption>("Newest first")

  const isFiltered =
    searchQuery !== "" ||
    selectedYear !== "All years"

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedYear("All years")
    setSortOrder("Newest first")
  }

  // Track open year accordions (closed by default)
  const [openYears, setOpenYears] = useState<Record<number, boolean>>({})

  const toggleYear = (year: number) => {
    setOpenYears((prev) => ({ ...prev, [year]: !prev[year] }))
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

      return matchesYear && matchesSearch
    })

    // Sort order
    if (sortOrder === "Newest first") {
      result.sort((a, b) => b.year - a.year || b.monthNumber - a.monthNumber)
    } else if (sortOrder === "Oldest first") {
      result.sort((a, b) => a.year - b.year || a.monthNumber - b.monthNumber)
    }

    return result
  }, [allReports, selectedYear, searchQuery, sortOrder])

  // Group filtered reports by Year
  const groupedByYear = useMemo(() => {
    const map = new Map<number, { year: number; reports: ApiExportImportReport[] }>()
    filteredReports.forEach((report) => {
      const yearKey = report.year
      if (!map.has(yearKey)) {
        map.set(yearKey, {
          year: report.year,
          reports: [],
        })
      }
      map.get(yearKey)!.reports.push(report)
    })
    return Array.from(map.values()).sort((a, b) => b.year - a.year)
  }, [filteredReports])

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
                {isSi ? "මාසය හෝ මූල පද අනුව වාර්තා සොයන්න" : isTa ? "மாதம் அல்லது முக்கிய வார்த்தைகள் மூலம் அறிக்கைகளைத் தேடுங்கள்" : "Search reports by month or keywords"}
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Search className="h-4 w-4" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="search-reports"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isSi ? "මාසය අනුව සොයන්න (උදා: මැයි, අප්‍රේල්)..." : isTa ? "மாதம் வாரியாகத் தேடுங்கள் (எ.கா. மே, ஏப்ரல்)..." : "Search by month (e.g. May, April)..."}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-500 focus:bg-white focus:border-[#388E3C] focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                  aria-label={isSi ? "සෙවුම ඉවත් කරන්න" : isTa ? "தேடலை மீட்டமை" : "Clear search query"}
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
                  {isSi ? "වසර:" : isTa ? "ஆண்டு:" : "Year:"}
                </span>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:border-[#388E3C] focus:ring-2 focus:ring-emerald-500/20 focus:outline-none cursor-pointer"
                  aria-label={isSi ? "වෙළඳ වාර්තා වසර තෝරන්න" : isTa ? "வர்த்தக அறிக்கை ஆண்டைத் தேர்ந்தெடுக்கவும்" : "Select trade report year"}
                >
                  <option value="All years">
                    {isSi ? "සියලු වසර" : isTa ? "அனைத்து ஆண்டுகள்" : "All years"}
                  </option>
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
                  {isSi ? "පිළිවෙල:" : isTa ? "வரிசைப்படுத்து:" : "Sort:"}
                </span>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as SortOption)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:border-[#388E3C] focus:ring-2 focus:ring-emerald-500/20 focus:outline-none cursor-pointer"
                  aria-label="Sort reports"
                >
                  <option value="Newest first">
                    {isSi ? "නවතම පළමුව" : isTa ? "புதியவை முதலில்" : "Newest first"}
                  </option>
                  <option value="Oldest first">
                    {isSi ? "පැරණිතම පළමුව" : isTa ? "பழையவை முதலில்" : "Oldest first"}
                  </option>
                </select>
              </div>

              {isFiltered && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-bold text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors cursor-pointer ml-auto sm:ml-0"
                >
                  <X className="h-3.5 w-3.5" />
                  <span>{isSi ? "පෙරහන් යළි සකසන්න" : isTa ? "வடிகட்டிகளை மீட்டமை" : "Reset filters"}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-600 font-semibold">
          <span>
            {isSi ? (
              <>
                මත්ස්‍ය අපනයන සහ ආනයන නිල වෙළඳ වාර්තා <strong className="text-slate-900">{filteredReports.length}</strong> ක් පෙන්වයි
                {selectedYear !== "All years" ? ` (${selectedYear} සඳහා)` : ""}
              </>
            ) : isTa ? (
              <>
                உத்தியோகபூர்வ மீன் ஏற்றுமதி மற்றும் இறக்குமதி வர்த்தக கோப்புகள் <strong className="text-slate-900">{filteredReports.length}</strong> காட்டப்படுகின்றன
                {selectedYear !== "All years" ? ` (${selectedYear} இற்கு)` : ""}
              </>
            ) : (
              <>
                Showing <strong className="text-slate-900">{filteredReports.length}</strong> official trade files
                {selectedYear !== "All years" ? ` for ${selectedYear}` : ""}
              </>
            )}
          </span>
          {isFiltered && (
            <span className="bg-emerald-50 text-[#256B29] px-2.5 py-0.5 rounded-full border border-emerald-200">
              {isSi ? "පෙරූ ප්‍රතිඵල" : isTa ? "வடிகட்டப்பட்ட முடிவுகள்" : "Filtered results"}
            </span>
          )}
        </div>

        {/* Year Accordions List */}
        {groupedByYear.length > 0 ? (
          <div className="space-y-6">
            {groupedByYear.map(({ year, reports: yearReports }) => {
              const isOpen = Boolean(openYears[year])
              const cat = categoryMap.get(year)

              let displayTitle = `${year} Export & Import Trade Reports`
              if (cat?.title) {
                displayTitle = cat.title
              } else if (isSi) {
                displayTitle = `${year} මත්ස්‍ය අපනයන සහ ආනයන වෙළඳ වාර්තා`
              } else if (isTa) {
                displayTitle = `${year} மீன் ஏற்றுமதி மற்றும் இறக்குமதி வர்த்தக அறிக்கைகள்`
              }

              let displayDesc = `Official monthly fish export and import customs trade datasets compiled for ${year}`
              if (cat?.description) {
                displayDesc = cat.description
              } else if (isSi) {
                displayDesc = `${year} වසර සඳහා සකස් කරන ලද නිල මාසික මත්ස්‍ය අපනයන සහ ආනයන රේගු වෙළඳ දත්ත වාර්තා`
              } else if (isTa) {
                displayDesc = `${year} ஆம் ஆண்டிற்காக தொகுக்கப்பட்ட உத்தியோகபூர்வ மாதாந்த மீன் ஏற்றுமதி மற்றும் இறக்குமதி சுங்க வர்த்தக தரவுத்தொகுப்புகள்`
              }

              let displayBadge = `${yearReports.length} ${yearReports.length === 1 ? "Report" : "Monthly Reports"}`
              if (isSi) {
                const label = yearReports.length === 1 ? (cat?.badgeSingular || "වාර්තාව") : (cat?.badgePlural || "මාසික වාර්තා")
                displayBadge = `${yearReports.length} ${label}`
              } else if (isTa) {
                const label = yearReports.length === 1 ? (cat?.badgeSingular || "அறிக்கை") : (cat?.badgePlural || "மாதாந்த அறிக்கைகள்")
                displayBadge = `${yearReports.length} ${label}`
              } else if (cat) {
                const label = yearReports.length === 1 ? (cat.badgeSingular || "Report") : (cat.badgePlural || "Monthly Reports")
                displayBadge = `${yearReports.length} ${label}`
              }

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
                          <span>{displayTitle}</span>
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-full border transition-colors ${
                              isOpen
                                ? "bg-emerald-100 text-[#256B29] border-emerald-300"
                                : "bg-slate-100 text-slate-700 border-slate-300"
                            }`}
                          >
                            {displayBadge}
                          </span>
                        </h2>
                        <p className="text-xs text-slate-600 font-medium mt-0.5 truncate">
                          {displayDesc}
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

                  {/* Monthly Trade Reports Grid inside this Year Category */}
                  {isOpen && (
                    <div className="p-5 sm:p-6 bg-white border-t border-slate-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {yearReports.map((report) => {
                          const badge = getFormatBadge(report.fileType)
                          const FormatIcon = badge.icon

                          const monthName = isSi
                            ? (SINHALA_MONTHS[report.month] || report.month)
                            : isTa
                            ? (TAMIL_MONTHS[report.month] || report.month)
                            : report.month

                          const cardTitle =
                            report.title &&
                            report.title.trim() &&
                            !report.title.toLowerCase().includes("trade report") &&
                            report.title !== "මත්ස්‍ය අපනයන සහ ආනයන වාර්තාව" &&
                            report.title !== "மீன் ஏற்றுமதி மற்றும் இறக்குமதி அறிக்கை"
                              ? report.title
                              : isSi
                              ? `${report.year} ${monthName} මත්ස්‍ය වෙළඳ වාර්තාව`
                              : isTa
                              ? `${monthName} ${report.year} மீன் வர்த்தக அறிக்கை`
                              : `${report.month} ${report.year} Trade Report`

                          return (
                            <div
                              key={report.id}
                              className="flex flex-col justify-between p-5 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-emerald-50/20 hover:border-emerald-300 hover:shadow-xs transition-all group"
                            >
                              <div>
                                {/* Format Badge & File Size */}
                                <div className="flex items-center justify-between gap-2 mb-3">
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${badge.iconBg}`}
                                    >
                                      <FormatIcon className="h-4 w-4" />
                                    </div>
                                    <span
                                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-extrabold border ${badge.bg}`}
                                    >
                                      {report.fileType}
                                    </span>
                                  </div>
                                  <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                                    {report.fileSize || "PDF"}
                                  </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#256B29] transition-colors line-clamp-2">
                                  {cardTitle}
                                </h3>

                                {/* Publication Date */}
                                <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                  <CalendarDays className="h-3.5 w-3.5 text-[#256B29]" />
                                  <span>{isSi ? "පළ කළ දිනය: " : isTa ? "வெளியிடப்பட்டது: " : "Published: "}{report.publishedDate}</span>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="mt-5 pt-3 border-t border-slate-200/70 flex items-center gap-2">
                                {(report.fileUrl || report.downloadUrl) &&
                                (report.fileUrl !== "#" || report.downloadUrl !== "#") ? (
                                  <a
                                    href={
                                      report.fileUrl && report.fileUrl !== "#"
                                        ? report.fileUrl
                                        : report.downloadUrl
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs"
                                  >
                                    <Eye className="h-3.5 w-3.5 text-[#256B29]" />
                                    <span>{isSi ? "පෙරදසුන" : isTa ? "முன்னோட்டம்" : "Preview"}</span>
                                  </a>
                                ) : (
                                  <span className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-400 cursor-not-allowed">
                                    <Eye className="h-3.5 w-3.5" />
                                    <span>{isSi ? "පෙරදසුන" : isTa ? "முன்னோட்டம்" : "Preview"}</span>
                                  </span>
                                )}

                                {(report.downloadUrl && report.downloadUrl !== "#") || (report.fileUrl && report.fileUrl !== "#") ? (
                                  <a
                                    href={report.downloadUrl && report.downloadUrl !== "#" ? report.downloadUrl : report.fileUrl}
                                    download
                                    className="inline-flex items-center justify-center p-2 rounded-lg bg-[#256B29] text-white hover:bg-[#1b4d1d] transition-colors shadow-2xs"
                                    title={isSi ? "වාර්තාව බාගත කරන්න" : isTa ? "அறிக்கையைப் பதிவிறக்குக" : "Download file"}
                                    aria-label={`Download ${cardTitle}`}
                                  >
                                    <Download className="h-3.5 w-3.5" />
                                  </a>
                                ) : (
                                  <button
                                    type="button"
                                    disabled
                                    className="inline-flex items-center justify-center p-2 rounded-lg bg-slate-100 text-slate-400 cursor-not-allowed"
                                    title={isSi ? "ගොනුව ළඟදීම ලබා ගත හැක" : isTa ? "கோப்பு விரைவில் கிடைக்கும்" : "Download unavailable"}
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
          /* Empty Search State */
          <div className="text-center py-16 px-4 rounded-2xl border border-slate-200 bg-white">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-4">
              <FolderOpen className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {isSi
                ? "වෙළඳ වාර්තා කිසිවක් හමු නොවීය"
                : isTa
                ? "வர்த்தக அறிக்கைகள் எதுவும் காணப்படவில்லை"
                : "No Trade Reports Found"}
            </h3>
            <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
              {isSi
                ? "ඔබේ සෙවුම් පෙරහන් සඳහා ගැලපෙන අපනයන සහ ආනයන වාර්තා කිසිවක් හමු නොවීය."
                : isTa
                ? "உங்கள் வடிகட்டிகளுடன் பொருந்தக்கூடிய ஏற்றுமதி மற்றும் இறக்குமதி அறிக்கைகள் எதுவும் காணப்படவில்லை."
                : "We couldn't find any export & import reports matching your current filter criteria."}
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#256B29] px-4 py-2 text-xs font-bold text-white hover:bg-[#1b4d1d] transition-colors"
            >
              <X className="h-4 w-4" />
              <span>
                {isSi
                  ? "පෙරහන් සහ සෙවීම ඉවත් කරන්න"
                  : isTa
                  ? "வடிகட்டிகள் & தேடலை மீட்டமை"
                  : "Clear filters & search"}
              </span>
            </button>
          </div>
        )}


      </Container>
    </section>
  )
}
