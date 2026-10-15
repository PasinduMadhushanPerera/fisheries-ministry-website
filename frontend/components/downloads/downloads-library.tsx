"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import {
  FileText,
  FileSpreadsheet,
  FileType,
  Presentation,
  FileArchive,
  ImageIcon,
  Files,
  Download,
  ExternalLink,
  Search,
  X,
  ChevronDown,
  FolderOpen,
  FolderSearch,
  ShieldCheck,
  Building,
  DollarSign,
  Briefcase,
  Globe,
  Users,
  Award,
  BookOpen,
  LineChart,
  Calendar,
  Layers,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import {
  downloadCategories as fallbackCategories,
  downloadDocuments as fallbackDocuments,
} from "@/data/download-documents"
import type {
  ApiDownloadCategory,
  ApiDownloadDocumentItem,
} from "@/lib/api/downloads"
import { useLanguage } from "@/src/contexts/LanguageContext"

interface DownloadsLibraryProps {
  categories?: ApiDownloadCategory[]
  documents?: ApiDownloadDocumentItem[]
}

type SortOption = "Newest first" | "Oldest first" | "Title A–Z"

const contentByLang = {
  en: {
    searchPlaceholder: "Search documents, reports, charters...",
    yearLabel: "Year:",
    allYears: "All years",
    sortLabel: "Sort:",
    sortNewest: "Newest first",
    sortOldest: "Oldest first",
    sortAZ: "Title A–Z",
    resetFilters: "Reset Filters",
    showingDocs: (count: number, catCount: number) =>
      `Showing ${count} available document${count === 1 ? "" : "s"} across ${catCount} categories`,
    collapseAll: "Collapse all",
    expandFirst: "Expand first category",
    noDocsFoundTitle: "No matching downloads found",
    noDocsFoundDesc:
      "We couldn’t find any documents matching your active search and filter parameters.",
    clearAllFilters: "Clear all filters",
    selectedBadge: "Selected",
    fileSuffix: (count: number) => (count === 1 ? "file" : "files"),
    emptyCategory: "No documents currently available under this category.",
    yearPrefix: "Year:",
    openBtn: "Open",
    getBtn: "Get",
    downloadBtn: "Download",
    docBadge: (type: string) => `${type} Document`,
    publishedPrefix: "Published:",
    modalPubYear: "Publication Year:",
    modalFileType: "File Type:",
    modalFileSize: "File Size:",
    modalLang: "Language:",
    modalSource: "Official Source:",
    modalSourceVal: "Ministry of Fisheries",
    modalVersions: "📄 Available Language File Versions:",
    closeBtn: "Close",
    openFileBtn: "Open file",
  },
  si: {
    searchPlaceholder: "ලේඛන, වාර්තා, ප්‍රඥප්ති සොයන්න...",
    yearLabel: "වසර:",
    allYears: "සියලුම වසර",
    sortLabel: "තෝරන්න:",
    sortNewest: "නවතම ඒවා පළමුව",
    sortOldest: "පැරණි ඒවා පළමුව",
    sortAZ: "මාතෘකාව A–Z",
    resetFilters: "පෙරහන් ඉවත් කරන්න",
    showingDocs: (count: number, catCount: number) =>
      `ප්‍රවර්ග ${catCount} ක් යටතේ ලබාගත හැකි ලේඛන ${count} ක් පෙන්වයි`,
    collapseAll: "සියල්ල හකුළන්න",
    expandFirst: "පළමු ප්‍රවර්ගය දිගහරින්න",
    noDocsFoundTitle: "ගැලපෙන බාගත කිරීම් හමු නොවීය",
    noDocsFoundDesc: "ඔබගේ සෙවුමට ගැලපෙන කිසිදු ලේඛනයක් සොයාගත නොහැකි විය.",
    clearAllFilters: "සියලු පෙරහන් ඉවත් කරන්න",
    selectedBadge: "තෝරාගත්",
    fileSuffix: (count: number) => (count === 1 ? "ගොනුව" : "ගොනු"),
    emptyCategory: "මෙම ප්‍රවර්ගය යටතේ දැනට ලේඛන නොමැත.",
    yearPrefix: "වසර:",
    openBtn: "විවෘත කරන්න",
    getBtn: "බාගත",
    downloadBtn: "බාගත කරන්න",
    docBadge: (type: string) => `${type} ලේඛනය`,
    publishedPrefix: "ප්‍රකාශිත දිනය:",
    modalPubYear: "ප්‍රකාශිත වසර:",
    modalFileType: "ගොනු ආකෘතිය:",
    modalFileSize: "ගොනු ප්‍රමාණය:",
    modalLang: "භාෂාව:",
    modalSource: "නිල මූලාශ්‍රය:",
    modalSourceVal: "ධීවර අමාත්‍යාංශය",
    modalVersions: "📄 ලබාගත හැකි භාෂා අනුවාද ගොනු:",
    closeBtn: "වසන්න",
    openFileBtn: "ගොනුව බලන්න",
  },
  ta: {
    searchPlaceholder: "ஆவணங்கள், அறிக்கைகள், சாசனங்களைத் தேடுக...",
    yearLabel: "வருடம்:",
    allYears: "அனைத்து வருடங்களும்",
    sortLabel: "வரிசைப்படுத்துக:",
    sortNewest: "புதியது முதலில்",
    sortOldest: "பழையது முதலில்",
    sortAZ: "தலைப்பு A–Z",
    resetFilters: "வடிப்பான்களை மீட்டமைக்க",
    showingDocs: (count: number, catCount: number) =>
      `${catCount} வகைகளில் கிடைக்கும் ${count} ஆவணங்கள் காட்டப்படுகின்றன`,
    collapseAll: "அனைத்தையும் சுருக்குக",
    expandFirst: "முதல் வகையை விரிக்கவும்",
    noDocsFoundTitle: "பொருந்தக்கூடிய பதிவிறக்கங்கள் எதுவும் காணப்படவில்லை",
    noDocsFoundDesc: "உங்கள் தேடலுடன் பொருந்தக்கூடிய ஆவணங்கள் எதுவும் கிடைக்கவில்லை.",
    clearAllFilters: "அனைத்து வடிப்பான்களையும் நீக்குக",
    selectedBadge: "தேர்ந்தெடுக்கப்பட்டது",
    fileSuffix: (count: number) => (count === 1 ? "கோப்பு" : "கோப்புகள்"),
    emptyCategory: "இந்த வகையின் கீழ் தற்போது ஆவணங்கள் எதுவும் இல்லை.",
    yearPrefix: "வருடம்:",
    openBtn: "திறக்குக",
    getBtn: "பதிவிறக்குக",
    downloadBtn: "பதிவிறக்குக",
    docBadge: (type: string) => `${type} ஆவணம்`,
    publishedPrefix: "வெளியிடப்பட்டது:",
    modalPubYear: "வெளியீட்டு ஆண்டு:",
    modalFileType: "கோப்பு வகை:",
    modalFileSize: "கோப்பின் அளவு:",
    modalLang: "மொழி:",
    modalSource: "உத்தியோகபூர்வ ஆதாரம்:",
    modalSourceVal: "கடற்றொழில் அமைச்சு",
    modalVersions: "📄 கிடைக்கும் மொழி கோப்பு பதிப்புகள்:",
    closeBtn: "மூடுக",
    openFileBtn: "கோப்பைத் திறக்குக",
  },
}

export function DownloadsLibrary({
  categories: apiCategories,
  documents: apiDocuments,
}: DownloadsLibraryProps) {
  const { language } = useLanguage()
  const c = contentByLang[language === "si" || language === "ta" ? language : "en"]

  const categoriesList =
    apiCategories !== undefined && apiCategories !== null
      ? apiCategories
      : fallbackCategories.map((cat) => ({
          id: cat.id,
          title: cat.title,
          description: cat.description,
          icon: cat.id,
        }))

  const rawDocumentsList =
    apiDocuments !== undefined && apiDocuments !== null
      ? apiDocuments
      : fallbackDocuments

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedYear, setSelectedYear] = useState<string>("All years")
  const [activeCategoryFilter, setActiveCategoryFilter] =
    useState<string>("All categories")
  const [, setShowAllCategories] = useState<boolean>(false)
  const [sortOrder, setSortOrder] = useState<SortOption>("Newest first")

  // Accordion state: Open first category by default
  const [openCategory, setOpenCategory] = useState<string | null>(
    categoriesList[0]?.id || "project-disclosures"
  )

  // Modal State
  const [selectedDoc, setSelectedDoc] =
    useState<ApiDownloadDocumentItem | null>(null)

  // Extract unique years from documents
  const availableYears = useMemo(() => {
    const years = new Set<string>()
    rawDocumentsList.forEach((doc) => {
      if (doc.year) years.add(doc.year.toString())
    })
    return [
      "All years",
      ...Array.from(years).sort((a, b) => Number(b) - Number(a)),
    ]
  }, [rawDocumentsList])

  // Keyboard Escape listener for Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedDoc(null)
    }
    if (selectedDoc) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [selectedDoc])

  const searchParams = useSearchParams()
  const categoryParam = searchParams?.get("category")
  const [highlightedCat, setHighlightedCat] = useState<string | null>(null)

  // Handle URL query parameter ?category=... dynamically on client-side dropdown navigation
  useEffect(() => {
    if (!categoryParam) {
      setHighlightedCat(null)
      return
    }

    if (categoryParam === "others") {
      setActiveCategoryFilter("All categories")
      setShowAllCategories(true)
      setHighlightedCat(null)
      setSearchQuery("")
      setTimeout(() => {
        const targetEl = document.getElementById("downloads-library")
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 150)
    } else {
      setOpenCategory(categoryParam)
      setHighlightedCat(categoryParam)
      setSearchQuery("")

      setTimeout(() => {
        const targetEl =
          document.getElementById(`category-${categoryParam}`) ||
          document.getElementById("downloads-library")
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 150)
    }
  }, [categoryParam, searchParams])

  const toggleCategory = (catId: string) => {
    setOpenCategory((prev) => (prev === catId ? null : catId))
  }

  const isFiltered =
    searchQuery !== "" ||
    selectedYear !== "All years" ||
    activeCategoryFilter !== "All categories"

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedYear("All years")
    setActiveCategoryFilter("All categories")
    setSortOrder("Newest first")
    setOpenCategory(categoriesList[0]?.id || "project-disclosures")
  }

  // Filter documents
  const filteredDocs = useMemo(() => {
    const result = rawDocumentsList.filter((doc) => {
      // Search match
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        query === "" ||
        doc.title.toLowerCase().includes(query) ||
        doc.description.toLowerCase().includes(query) ||
        (doc.year && doc.year.toString().includes(query))

      // Year match
      const matchesYear =
        selectedYear === "All years" ||
        (doc.year && doc.year.toString() === selectedYear)

      // Category filter match
      const matchesCategory =
        activeCategoryFilter === "All categories" ||
        doc.category === activeCategoryFilter

      return matchesSearch && matchesYear && matchesCategory
    })

    if (sortOrder === "Title A–Z") {
      result.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortOrder === "Newest first") {
      result.sort((a, b) => (b.year || 2026) - (a.year || 2026))
    } else if (sortOrder === "Oldest first") {
      result.sort((a, b) => (a.year || 2024) - (b.year || 2024))
    }

    return result
  }, [
    rawDocumentsList,
    searchQuery,
    selectedYear,
    activeCategoryFilter,
    sortOrder,
  ])

  // Group items by category for rendering in accordion sections
  const groupedCategories = useMemo(() => {
    return categoriesList.map((cat) => {
      const items = filteredDocs.filter((doc) => doc.category === cat.id)
      return {
        ...cat,
        items,
      }
    })
  }, [categoriesList, filteredDocs])

  // Helper for format icons
  const getFormatIcon = (fileType: string) => {
    switch (fileType) {
      case "PDF":
        return <FileText className="h-5 w-5 text-red-600" aria-hidden="true" />
      case "XLSX":
      case "XLS":
      case "CSV":
        return (
          <FileSpreadsheet
            className="h-5 w-5 text-[#256B29]"
            aria-hidden="true"
          />
        )
      case "DOCX":
      case "DOC":
        return <FileType className="h-5 w-5 text-blue-600" aria-hidden="true" />
      case "PPTX":
      case "PPT":
        return (
          <Presentation className="h-5 w-5 text-amber-600" aria-hidden="true" />
        )
      case "ZIP":
        return (
          <FileArchive className="h-5 w-5 text-slate-700" aria-hidden="true" />
        )
      case "PNG":
      case "JPG":
        return (
          <ImageIcon className="h-5 w-5 text-purple-600" aria-hidden="true" />
        )
      default:
        return <Files className="h-5 w-5 text-slate-600" aria-hidden="true" />
    }
  }

  // Helper for category header icons
  const getCategoryHeaderIcon = (
    iconName: string,
    catId: string,
    isOpen: boolean
  ) => {
    const key = iconName || catId
    const iconClass = `h-5 w-5 ${isOpen ? "!text-white" : "text-[#256B29]"}`
    switch (key) {
      case "project-disclosures":
        return <ShieldCheck className={iconClass} aria-hidden="true" />
      case "sdg14":
        return <Globe className={iconClass} aria-hidden="true" />
      case "hr-development":
        return <Users className={iconClass} aria-hidden="true" />
      case "citizen-charter":
        return <Award className={iconClass} aria-hidden="true" />
      case "policy-strategy":
        return <BookOpen className={iconClass} aria-hidden="true" />
      case "performance-report":
        return <LineChart className={iconClass} aria-hidden="true" />
      case "mega-project-progress":
        return <Building className={iconClass} aria-hidden="true" />
      case "progress-report":
        return <Layers className={iconClass} aria-hidden="true" />
      case "physical-financial-progress":
        return <DollarSign className={iconClass} aria-hidden="true" />
      case "annual-statistics":
        return <Briefcase className={iconClass} aria-hidden="true" />
      case "action-plan":
        return <Calendar className={iconClass} aria-hidden="true" />
      case "fishery-articles":
        return <FolderOpen className={iconClass} aria-hidden="true" />
      default:
        return <Files className={iconClass} aria-hidden="true" />
    }
  }

  return (
    <section
      id="downloads-library"
      className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200"
      aria-label="Official Downloads Library"
    >
      <Container>
        {/* Controls Toolbar */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <label htmlFor="search-downloads" className="sr-only">
                {c.searchPlaceholder}
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Search className="h-4 w-4" aria-hidden="true" />
              </div>
              <input
                id="search-downloads"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={c.searchPlaceholder}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#388E3C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#388E3C]/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Year Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-500">
                  {c.yearLabel}
                </span>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs font-semibold text-slate-700 shadow-2xs focus:border-[#388E3C] focus:outline-none focus:ring-1 focus:ring-[#388E3C]"
                >
                  {availableYears.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr === "All years" ? c.allYears : yr}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Order */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-500">
                  {c.sortLabel}
                </span>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as SortOption)}
                  className="rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs font-semibold text-slate-700 shadow-2xs focus:border-[#388E3C] focus:outline-none focus:ring-1 focus:ring-[#388E3C]"
                >
                  <option value="Newest first">{c.sortNewest}</option>
                  <option value="Oldest first">{c.sortOldest}</option>
                  <option value="Title A–Z">{c.sortAZ}</option>
                </select>
              </div>

              {/* Clear Filters Button */}
              {isFiltered && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{c.resetFilters}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Summary Bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            {c.showingDocs(filteredDocs.length, categoriesList.length)}
          </p>

          <button
            type="button"
            onClick={() =>
              setOpenCategory(
                openCategory
                  ? null
                  : categoriesList[0]?.id || "project-disclosures"
              )
            }
            className="text-xs font-bold text-[#388E3C] hover:underline cursor-pointer"
          >
            {openCategory ? c.collapseAll : c.expandFirst}
          </button>
        </div>

        {/* Categories Accordion */}
        {groupedCategories.every((cat) => cat.items.length === 0) ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <FolderSearch className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">
              {c.noDocsFoundTitle}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              {c.noDocsFoundDesc}
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-[#388E3C] px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-[#256B29]"
            >
              {c.clearAllFilters}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {groupedCategories.map((category) => {
              if (category.items.length === 0 && isFiltered) return null

              const isOpen = openCategory === category.id

              return (
                <div
                  key={category.id}
                  id={`category-${category.id}`}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden scroll-mt-28 ${
                    isOpen
                      ? "border-[#256B29] ring-2 ring-emerald-600/20 shadow-md bg-gradient-to-br from-emerald-50/40 via-white to-slate-50/60"
                      : highlightedCat === category.id
                      ? "border-[#256B29] ring-2 ring-[#256B29]/30 shadow-md bg-white"
                      : "border-slate-300 hover:border-emerald-500/60 shadow-xs hover:shadow-md bg-white"
                  }`}
                >
                  {/* Category Header Button */}
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer select-none transition-colors"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${
                          isOpen
                            ? "bg-[#256B29] text-white shadow-xs"
                            : "bg-emerald-100 text-[#256B29]"
                        }`}
                      >
                        {getCategoryHeaderIcon(
                          category.icon,
                          category.id,
                          isOpen
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3
                            className={`text-base sm:text-lg font-extrabold transition-colors duration-200 flex items-center gap-2.5 ${
                              isOpen ? "text-[#256B29]" : "text-slate-950"
                            }`}
                          >
                            <span>{category.title}</span>
                          </h3>
                          {highlightedCat === category.id && (
                            <span className="inline-flex items-center rounded-full bg-[#256B29] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-2xs">
                              {c.selectedBadge}
                            </span>
                          )}
                        </div>
                        {category.description && (
                          <p className="text-xs text-slate-600 font-medium mt-0.5 truncate max-w-xl">
                            {category.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full border transition-colors ${
                          isOpen
                            ? "bg-emerald-100 text-[#256B29] border-emerald-300"
                            : "bg-slate-100 text-slate-700 border-slate-300"
                        }`}
                      >
                        {category.items.length}{" "}
                        {c.fileSuffix(category.items.length)}
                      </span>

                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
                          isOpen
                            ? "border-emerald-300 bg-emerald-100 text-[#256B29] rotate-180"
                            : "border-slate-300 bg-slate-100 text-slate-700"
                        }`}
                      >
                        <ChevronDown className="h-5 w-5" aria-hidden="true" />
                      </div>
                    </div>
                  </button>

                  {/* Accordion Content */}
                  {isOpen && (
                    <div className="border-t border-slate-200 bg-white p-5 sm:p-6">
                      {category.items.length === 0 ? (
                        <p className="text-xs text-slate-500 italic py-2 text-center">
                          {c.emptyCategory}
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {category.items.map((doc) => (
                            <div
                              key={doc.id}
                              className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4.5 shadow-2xs transition hover:border-[#256B29] hover:shadow-xs"
                            >
                              <div>
                                {/* Top Meta */}
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                                      {getFormatIcon(doc.fileType)}
                                    </div>
                                    <span className="text-xs font-bold text-slate-700">
                                      {doc.fileType}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[11px] font-semibold text-slate-500">
                                      {doc.fileSize}
                                    </span>
                                    {doc.availableLanguages &&
                                      doc.availableLanguages.length > 0 && (
                                        <div className="flex items-center gap-1">
                                          {doc.availableLanguages.includes(
                                            "en"
                                          ) && (
                                            <span className="rounded bg-sky-50 px-1 py-0.5 text-[9px] font-extrabold text-sky-700 border border-sky-200/80">
                                              EN
                                            </span>
                                          )}
                                          {doc.availableLanguages.includes(
                                            "si"
                                          ) && (
                                            <span className="rounded bg-amber-50 px-1 py-0.5 text-[9px] font-extrabold text-amber-700 border border-amber-200/80">
                                              SI
                                            </span>
                                          )}
                                          {doc.availableLanguages.includes(
                                            "ta"
                                          ) && (
                                            <span className="rounded bg-rose-50 px-1 py-0.5 text-[9px] font-extrabold text-rose-700 border border-rose-200/80">
                                              TA
                                            </span>
                                          )}
                                        </div>
                                      )}
                                  </div>
                                </div>

                                {/* Title */}
                                <h4 className="mt-3 text-sm font-extrabold text-slate-900 group-hover:text-[#256B29] transition-colors leading-snug">
                                  {doc.title}
                                </h4>

                                {/* Date / Year */}
                                <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
                                  {doc.year && (
                                    <span>
                                      {c.yearPrefix} {doc.year}
                                    </span>
                                  )}
                                  {doc.year && doc.publishedDate && (
                                    <span>•</span>
                                  )}
                                  {doc.publishedDate && (
                                    <span>{doc.publishedDate}</span>
                                  )}
                                </div>
                              </div>

                              {/* Card Action Buttons */}
                              <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 pt-3 border-t border-slate-100">
                                <a
                                  href={doc.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 inline-flex min-h-[36px] items-center justify-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
                                >
                                  <ExternalLink
                                    className="h-3.5 w-3.5 text-slate-500"
                                    aria-hidden="true"
                                  />
                                  <span>{c.openBtn}</span>
                                </a>

                                <a
                                  href={doc.downloadUrl || doc.fileUrl}
                                  download
                                  className="flex-1 inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-lg bg-[#256B29] px-2 text-xs font-extrabold text-white !text-white transition hover:bg-[#1b4d1d] hover:text-white hover:!text-white shadow-2xs"
                                >
                                  <Download
                                    className="h-3.5 w-3.5 text-white !text-white"
                                    aria-hidden="true"
                                  />
                                  <span className="text-white !text-white">
                                    {c.getBtn}
                                  </span>
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Document Details Modal */}
        {selectedDoc && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedDoc(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-library-title"
              className="relative my-auto w-full max-w-lg rounded-2xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  {getFormatIcon(selectedDoc.fileType)}
                </div>
                <div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-800 uppercase tracking-wide">
                    {c.docBadge(selectedDoc.fileType)}
                  </span>
                  {selectedDoc.publishedDate && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      {c.publishedPrefix} {selectedDoc.publishedDate}
                    </p>
                  )}
                </div>
              </div>

              <h3
                id="modal-library-title"
                className="mt-4 text-xl font-bold text-slate-900"
              >
                {selectedDoc.title}
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {selectedDoc.description}
              </p>

              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs text-slate-700">
                {selectedDoc.year && (
                  <div className="flex justify-between py-1 border-b border-slate-200/70">
                    <span className="font-semibold text-slate-500">
                      {c.modalPubYear}
                    </span>
                    <span className="font-bold text-slate-900">
                      {selectedDoc.year}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-slate-200/70">
                  <span className="font-semibold text-slate-500">
                    {c.modalFileType}
                  </span>
                  <span className="font-bold text-slate-900">
                    {selectedDoc.fileType}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/70">
                  <span className="font-semibold text-slate-500">
                    {c.modalFileSize}
                  </span>
                  <span className="font-bold text-slate-900">
                    {selectedDoc.fileSize}
                  </span>
                </div>
                {selectedDoc.language && (
                  <div className="flex justify-between py-1 border-b border-slate-200/70">
                    <span className="font-semibold text-slate-500">
                      {c.modalLang}
                    </span>
                    <span className="font-bold text-slate-900">
                      {selectedDoc.language}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-1">
                  <span className="font-semibold text-slate-500">
                    {c.modalSource}
                  </span>
                  <span className="font-bold text-[#256B29]">
                    {c.modalSourceVal}
                  </span>
                </div>
              </div>

              {/* Language Specific File Versions */}
              {(selectedDoc.fileUrlEn ||
                selectedDoc.fileUrlSi ||
                selectedDoc.fileUrlTa) && (
                <div className="mt-4 rounded-xl border border-emerald-200/80 bg-emerald-50/40 p-3.5">
                  <span className="block text-xs font-extrabold text-emerald-950 mb-2">
                    {c.modalVersions}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedDoc.fileUrlEn && (
                      <a
                        href={selectedDoc.fileUrlEn}
                        download
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-emerald-300 px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-2xs hover:bg-emerald-100 transition"
                      >
                        <Download className="h-3.5 w-3.5 text-emerald-600" />
                        <span>English (EN)</span>
                      </a>
                    )}
                    {selectedDoc.fileUrlSi && (
                      <a
                        href={selectedDoc.fileUrlSi}
                        download
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-emerald-300 px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-2xs hover:bg-emerald-100 transition"
                      >
                        <Download className="h-3.5 w-3.5 text-emerald-600" />
                        <span>සිංහල (SI)</span>
                      </a>
                    )}
                    {selectedDoc.fileUrlTa && (
                      <a
                        href={selectedDoc.fileUrlTa}
                        download
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-emerald-300 px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-2xs hover:bg-emerald-100 transition"
                      >
                        <Download className="h-3.5 w-3.5 text-emerald-600" />
                        <span>தமிழ் (TA)</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  {c.closeBtn}
                </button>
                <a
                  href={selectedDoc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <ExternalLink
                    className="h-3.5 w-3.5 text-slate-500"
                    aria-hidden="true"
                  />
                  <span>{c.openFileBtn}</span>
                </a>
                <a
                  href={selectedDoc.downloadUrl || selectedDoc.fileUrl}
                  download
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#388E3C] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#256B29]"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{c.downloadBtn}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
