"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  FileText,
  FileSpreadsheet,
  FileType,
  Presentation,
  FileArchive,
  MapPinned,
  Files,
  Download,
  ExternalLink,
  Eye,
  Search,
  X,
  ChevronDown,
  ArrowRight,
  FolderOpen,
  ArrowUpDown,
  Fish,
  Building2,
  Ship,
  Map,
  BarChart3,
  ImageIcon,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import {
  informationCategories as fallbackCategories,
  fisheryInformationItems as fallbackItems,
} from "@/data/fishery-information"
import { useLanguage } from "@/src/contexts/LanguageContext"
import type {
  ApiFisheryCategoryMeta,
  ApiFisheryInformationHeader,
  ApiFisheryInformationItem,
} from "@/lib/api/fishery-information"

type SortOption = "Title A–Z" | "Newest first" | "Oldest first"

interface FisheryInformationLibraryProps {
  header?: ApiFisheryInformationHeader
  categories?: ApiFisheryCategoryMeta[]
  items?: ApiFisheryInformationItem[]
}

export function FisheryInformationLibrary({
  header,
  categories,
  items,
}: FisheryInformationLibraryProps) {
  const { language } = useLanguage()
  const isSi = language === "si"
  const isTa = language === "ta"

  const allCategories: ApiFisheryCategoryMeta[] = useMemo(() => {
    return categories !== undefined && categories !== null
      ? categories
      : (fallbackCategories as unknown as ApiFisheryCategoryMeta[])
  }, [categories])

  const allItems: ApiFisheryInformationItem[] = useMemo(() => {
    return items !== undefined && items !== null
      ? items
      : (fallbackItems as unknown as ApiFisheryInformationItem[])
  }, [items])

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortOrder, setSortOrder] = useState<SortOption>("Title A–Z")

  // Accordion state: Open the first category by default
  const defaultOpenCat = allCategories.length > 0 ? allCategories[0].id : "landing-site-maps"
  const [openCategory, setOpenCategory] = useState<string | null>(defaultOpenCat)

  const toggleCategory = (catId: string) => {
    setOpenCategory((prev) => (prev === catId ? null : catId))
  }

  const isFiltered = searchQuery !== ""

  const clearFilters = () => {
    setSearchQuery("")
    setSortOrder("Title A–Z")
    setOpenCategory(defaultOpenCat)
  }

  // Filter items
  const filteredItems = useMemo(() => {
    const result = allItems.filter((item) => {
      // Search match
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        query === "" ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.location && item.location.toLowerCase().includes(query)) ||
        (item.year && item.year.toString().includes(query))

      return matchesSearch
    })

    // Sort
    if (sortOrder === "Title A–Z") {
      result.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortOrder === "Newest first") {
      result.sort((a, b) => (b.year || 0) - (a.year || 0))
    } else if (sortOrder === "Oldest first") {
      result.sort((a, b) => (a.year || 0) - (b.year || 0))
    }

    return result
  }, [allItems, searchQuery, sortOrder])

  // Visible Categories to display (accounting for active filters and newly created categories)
  const visibleCategories = useMemo(() => {
    return allCategories.filter((cat) => {
      if (searchQuery.trim() !== "") {
        const catItems = filteredItems.filter((i) => i.category === cat.id)
        return catItems.length > 0
      }
      return true
    })
  }, [allCategories, searchQuery, filteredItems])

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
      case "PNG":
      case "JPG":
        return {
          icon: ImageIcon,
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

  // Helper for category icon
  const getCategoryIcon = (iconType?: string, catId?: string) => {
    const key = iconType || catId
    switch (key) {
      case "landing-site-maps":
      case "map":
        return <Map className="h-5 w-5 text-[#256B29]" />
      case "fish-species":
      case "fish":
        return <Fish className="h-5 w-5 text-[#256B29]" />
      case "tuna-identification":
      case "card":
        return <FileText className="h-5 w-5 text-[#256B29]" />
      case "processing-establishments":
      case "building":
        return <Building2 className="h-5 w-5 text-[#256B29]" />
      case "boat-census":
      case "ship":
        return <Ship className="h-5 w-5 text-[#256B29]" />
      default:
        return <FolderOpen className="h-5 w-5 text-[#256B29]" />
    }
  }

  const badgeText = header?.badge_text || "Fisheries Knowledge Base"
  const pageTitle = header?.title || "Fishery Related Information & Datasets"
  const pageDesc =
    header?.description ||
    "Access official landing-site maps, fish species directories, tuna identification cards, export-approved fish processing establishment lists, and national fishing boat census data."

  return (
    <section
      className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200"
      aria-label="Fishery Related Information Library"
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
              <label htmlFor="search-fishery-info" className="sr-only">
                {isSi ? "ධීවර තොරතුරු සහ සිතියම් සොයන්න" : isTa ? "மீன்பிடித் தகவல் மற்றும் வரைபடங்களைத் தேடுங்கள்" : "Search fishery information and maps"}
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Search className="h-4 w-4" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="search-fishery-info"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isSi ? "සිතියම්, මත්ස්‍ය විශේෂ, සංගණන දත්ත සොයන්න..." : isTa ? "வரைபடங்கள், மீன் இனங்கள், கணக்கெடுப்பு தரவுகளைத் தேடுங்கள்..." : "Search landing maps, species, census..."}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-500 focus:bg-white focus:border-[#388E3C] focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label={isSi ? "සෙවුම ඉවත් කරන්න" : isTa ? "தேடலை மீட்டமை" : "Clear search query"}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
                  {isSi ? "පිළිවෙල:" : isTa ? "வரிசைப்படுத்து:" : "Sort:"}
                </span>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as SortOption)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:border-[#388E3C] focus:ring-2 focus:ring-emerald-500/20 focus:outline-none cursor-pointer"
                  aria-label={isSi ? "තොරතුරු පෙළගස්වන්න" : isTa ? "தகவல்களை வரிசைப்படுத்துங்கள்" : "Sort information items"}
                >
                  <option value="Title A–Z">{isSi ? "නම (A-Z)" : isTa ? "தலைப்பு (A-Z)" : "Title A–Z"}</option>
                  <option value="Newest first">{isSi ? "නවතම පළමුව" : isTa ? "புதியவை முதலில்" : "Newest first"}</option>
                  <option value="Oldest first">{isSi ? "පැරණිතම පළමුව" : isTa ? "பழையவை முதலில்" : "Oldest first"}</option>
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
                ප්‍රවර්ග <strong className="text-slate-900">{visibleCategories.length}</strong> ක් යටතේ නිල සම්පත් සහ දත්ත කට්ටල <strong className="text-slate-900">{filteredItems.length}</strong> ක් පෙන්වයි
              </>
            ) : isTa ? (
              <>
                <strong className="text-slate-900">{visibleCategories.length}</strong> பிரிவுகளின் கீழ் <strong className="text-slate-900">{filteredItems.length}</strong> உத்தியோகபூர்வ வளங்கள் மற்றும் தரவுத்தொகுப்புகள் காட்டப்படுகின்றன
              </>
            ) : (
              <>
                Showing <strong className="text-slate-900">{filteredItems.length}</strong> official resources &amp; datasets across <strong className="text-slate-900">{visibleCategories.length}</strong> categories
              </>
            )}
          </span>
          {isFiltered && (
            <span className="bg-emerald-50 text-[#256B29] px-2.5 py-0.5 rounded-full border border-emerald-200">
              {isSi ? "පෙරූ ප්‍රතිඵල" : isTa ? "வடிகட்டப்பட்ட முடிவுகள்" : "Filtered results"}
            </span>
          )}
        </div>

        {/* Accordion Categories View */}
        {visibleCategories.length > 0 ? (
          <div className="space-y-6">
            {visibleCategories.map((category) => {
              const categoryItems = filteredItems.filter(
                (item) => item.category === category.id
              )

              const isOpen = openCategory === category.id || isFiltered

              let displayBadge = `${categoryItems.length} ${categoryItems.length === 1 ? "file" : "files"}`
              if (isSi) {
                const label = categoryItems.length === 1 ? (category.badgeSingular || "ගොනුව") : (category.badgePlural || "ගොනු")
                displayBadge = `${categoryItems.length} ${label}`
              } else if (isTa) {
                const label = categoryItems.length === 1 ? (category.badgeSingular || "கோப்பு") : (category.badgePlural || "கோப்புகள்")
                displayBadge = `${categoryItems.length} ${label}`
              } else if (category.badgeSingular || category.badgePlural) {
                const label = categoryItems.length === 1 ? (category.badgeSingular || "file") : (category.badgePlural || "files")
                displayBadge = `${categoryItems.length} ${label}`
              }

              return (
                <div
                  key={category.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-[#256B29] ring-2 ring-emerald-600/20 shadow-md bg-gradient-to-br from-emerald-50/40 via-white to-slate-50/60"
                      : "border-slate-300 hover:border-emerald-500/60 shadow-xs hover:shadow-md bg-white"
                  }`}
                >
                  {/* Category Header Bar */}
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
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
                        {getCategoryIcon(category.icon_type, category.id)}
                      </div>
                      <div className="min-w-0">
                        <h2
                          className={`text-base sm:text-lg font-extrabold transition-colors duration-200 flex items-center gap-2.5 ${
                            isOpen ? "text-[#256B29]" : "text-slate-950"
                          }`}
                        >
                          {category.title}
                        </h2>
                        {category.description && (
                          <p className="text-xs text-slate-600 font-medium mt-0.5 truncate">
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
                        {displayBadge}
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

                  {/* Items Grid or Empty Category State */}
                  {isOpen && (
                    <div className="p-5 sm:p-6 bg-white border-t border-slate-200">
                      {categoryItems.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                          {categoryItems.map((item) => {
                            const badge = getFormatBadge(item.fileType)
                            const FormatIcon = badge.icon

                            return (
                              <div
                                key={item.id}
                                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-2xs hover:border-emerald-300 hover:shadow-md transition-all group"
                              >
                                <div>
                                  {/* Header: Format Badge & Location */}
                                  <div className="flex items-center justify-between gap-2 mb-3">
                                    <div className="flex items-center gap-2">
                                      <div
                                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${badge.iconBg}`}
                                      >
                                        <FormatIcon className="h-4 w-4" />
                                      </div>
                                      <span
                                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold border ${badge.bg}`}
                                      >
                                        {item.fileType}
                                      </span>
                                    </div>

                                    {item.location && (
                                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                                        <MapPinned className="h-3 w-3 text-emerald-600" />
                                        <span>{item.location}</span>
                                      </span>
                                    )}
                                  </div>

                                  {/* Title */}
                                  <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-[#256B29] transition-colors leading-snug">
                                    {item.title}
                                  </h3>

                                  {/* Meta */}
                                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                                    <span>{isSi ? "ප්‍රමාණය: " : isTa ? "அளவு: " : "Size: "}{item.fileSize}</span>
                                    {item.publishedDate && (
                                      <span>{isSi ? "දිනය: " : isTa ? "திகதி: " : "Date: "}{item.publishedDate}</span>
                                    )}
                                  </div>
                                </div>

                                {/* Card Actions Footer */}
                                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                                  {(item.fileUrl || item.downloadUrl) &&
                                  (item.fileUrl !== "#" || item.downloadUrl !== "#") ? (
                                    <a
                                      href={
                                        item.fileUrl && item.fileUrl !== "#"
                                          ? item.fileUrl
                                          : item.downloadUrl
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition"
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

                                  {(item.downloadUrl && item.downloadUrl !== "#") || (item.fileUrl && item.fileUrl !== "#") ? (
                                    <a
                                      href={item.downloadUrl && item.downloadUrl !== "#" ? item.downloadUrl : item.fileUrl}
                                      download
                                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-lg bg-[#256B29] text-xs font-bold text-white !text-white hover:bg-[#1b4d1d] hover:text-white hover:!text-white transition shadow-2xs"
                                      title={isSi ? "බාගත කරන්න" : isTa ? "பதிவிறக்குக" : "Download"}
                                    >
                                      <Download className="h-3.5 w-3.5 text-white !text-white" />
                                      <span className="text-white !text-white">{isSi ? "බාගත කරන්න" : isTa ? "பதிவிறக்குக" : "Download"}</span>
                                    </a>
                                  ) : (
                                    <button
                                      type="button"
                                      disabled
                                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-lg bg-slate-100 text-xs font-bold text-slate-400 cursor-not-allowed"
                                    >
                                      <Download className="h-3.5 w-3.5" />
                                      <span>{isSi ? "බාගත කරන්න" : isTa ? "பதிவிறக்குக" : "Download"}</span>
                                    </button>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="p-8 text-center bg-white rounded-xl border border-dashed border-slate-200">
                          <FolderOpen className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                          <p className="text-sm font-bold text-slate-800">
                            {isSi
                              ? "මෙම ප්‍රවර්ගය සඳහා තවමත් ගොනු හෝ දත්ත ඇතුළත් කර නොමැත"
                              : isTa
                              ? "இந்த வகையின் கீழ் இன்னும் கோப்புகள் எதுவும் இணைக்கப்படவில்லை"
                              : "No resources or datasets attached to this category yet"}
                          </p>
                          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                            {isSi
                              ? "පරිපාලන පැනලය (Admin Panel) මඟින් මෙම ප්‍රවර්ගය යටතේ පළ කරනු ලබන සිතියම් සහ දත්ත කට්ටල ස්වයංක්‍රීයව මෙහි දිස්වනු ඇත."
                              : isTa
                              ? "நிர்வாக குழு மூலம் இந்த வகையின் கீழ் வெளியிடப்படும் வரைபடங்கள் மற்றும் தரவுத்தொகுப்புகள் தானாகவே இங்கே தோன்றும்."
                              : "Maps, reports, and datasets published under this category in the Admin Panel will appear here automatically."}
                          </p>
                        </div>
                      )}
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
                ? "සම්පත් කිසිවක් හමු නොවීය"
                : isTa
                ? "வளங்கள் எதுவும் காணப்படவில்லை"
                : "No Resources Found"}
            </h3>
            <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
              {isSi
                ? "ඔබගේ සෙවුම් නිර්ණායකවලට ගැලපෙන සිතියම් හෝ දත්ත කට්ටල කිසිවක් සොයා ගැනීමට නොහැකි විය."
                : isTa
                ? "உங்கள் தேடல் அளவுகோல்களுடன் பொருந்தக்கூடிய வரைபடங்கள் அல்லது தரவுத்தொகுப்புகள் எதுவும் காணப்படவில்லை."
                : "We couldn't find any maps or datasets matching your search criteria."}
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#256B29] px-4 py-2 text-xs font-bold text-white hover:bg-[#1b4d1d] transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
              <span>{isSi ? "පෙරහන් සහ සෙවීම ඉවත් කරන්න" : isTa ? "வடிகட்டிகள் & தேடலை மீட்டமை" : "Clear filters & search"}</span>
            </button>
          </div>
        )}


      </Container>
    </section>
  )
}
