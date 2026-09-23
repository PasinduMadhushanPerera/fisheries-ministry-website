"use client"

import { useState, useMemo, useEffect } from "react"
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
  Filter,
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
  const allCategories: ApiFisheryCategoryMeta[] = useMemo(() => {
    return categories && categories.length > 0
      ? categories
      : (fallbackCategories as unknown as ApiFisheryCategoryMeta[])
  }, [categories])

  const allItems: ApiFisheryInformationItem[] = useMemo(() => {
    return items && items.length > 0
      ? items
      : (fallbackItems as unknown as ApiFisheryInformationItem[])
  }, [items])

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("All")
  const [sortOrder, setSortOrder] = useState<SortOption>("Title A–Z")

  // Accordion state: Open the first category by default
  const defaultOpenCat = allCategories.length > 0 ? allCategories[0].id : "landing-site-maps"
  const [openCategory, setOpenCategory] = useState<string | null>(defaultOpenCat)

  // Modal State
  const [selectedItem, setSelectedItem] = useState<ApiFisheryInformationItem | null>(null)

  // Keyboard Escape listener for Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null)
      }
    }
    if (selectedItem) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [selectedItem])

  const toggleCategory = (catId: string) => {
    setOpenCategory((prev) => (prev === catId ? null : catId))
  }

  const isFiltered = searchQuery !== "" || activeCategoryFilter !== "All"

  const clearFilters = () => {
    setSearchQuery("")
    setActiveCategoryFilter("All")
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

      // Category filter pill match
      const matchesCategory =
        activeCategoryFilter === "All" || item.category === activeCategoryFilter

      return matchesSearch && matchesCategory
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
  }, [allItems, searchQuery, activeCategoryFilter, sortOrder])

  // Visible Categories to display (accounting for active filters and newly created categories)
  const visibleCategories = useMemo(() => {
    return allCategories.filter((cat) => {
      if (activeCategoryFilter !== "All" && activeCategoryFilter !== cat.id) {
        return false
      }
      if (searchQuery.trim() !== "") {
        const catItems = filteredItems.filter((i) => i.category === cat.id)
        return catItems.length > 0
      }
      return true
    })
  }, [allCategories, activeCategoryFilter, searchQuery, filteredItems])

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
                Search fishery information and maps
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Search className="h-4 w-4" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="search-fishery-info"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search landing maps, species, census..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-500 focus:bg-white focus:border-[#388E3C] focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
                Sort:
              </span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOption)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:border-[#388E3C] focus:ring-2 focus:ring-emerald-500/20 focus:outline-none cursor-pointer"
                aria-label="Sort information items"
              >
                <option value="Title A–Z">Title A–Z</option>
                <option value="Newest first">Newest first</option>
                <option value="Oldest first">Oldest first</option>
              </select>
            </div>
          </div>

          {/* Quick Filter Pills Bar */}
          <div className="mt-5 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
                <Filter className="h-3 w-3" /> Categories:
              </span>
              <button
                type="button"
                onClick={() => {
                  setActiveCategoryFilter("All")
                  setOpenCategory(defaultOpenCat)
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeCategoryFilter === "All"
                    ? "bg-[#256B29] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All
              </button>
              {allCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategoryFilter(cat.id)
                    setOpenCategory(cat.id)
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    activeCategoryFilter === cat.id
                      ? "bg-[#256B29] text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat.title}
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
            Showing <strong className="text-slate-900">{filteredItems.length}</strong> official resources &amp; datasets across <strong className="text-slate-900">{visibleCategories.length}</strong> categories
          </span>
          {isFiltered && (
            <span className="bg-emerald-50 text-[#256B29] px-2.5 py-0.5 rounded-full border border-emerald-200">
              Filtered results
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

              return (
                <div
                  key={category.id}
                  className="rounded-2xl border border-slate-200 bg-white shadow-2xs overflow-hidden transition-all"
                >
                  {/* Category Header Bar */}
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left bg-white hover:bg-slate-50/80 transition-colors cursor-pointer border-b border-slate-100"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100">
                        {getCategoryIcon(category.icon_type, category.id)}
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                          {category.title}
                        </h2>
                        <p className="text-xs text-slate-500 font-normal line-clamp-1">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#256B29] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        {categoryItems.length} files
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-slate-700" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Items Grid or Empty Category State */}
                  {isOpen && (
                    <div className="p-6 bg-slate-50/50">
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

                                  {/* Description */}
                                  <p className="mt-1.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                                    {item.description}
                                  </p>

                                  {/* Meta */}
                                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                                    <span>Size: {item.fileSize}</span>
                                    {item.publishedDate && <span>Date: {item.publishedDate}</span>}
                                  </div>
                                </div>

                                {/* Card Actions Footer */}
                                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedItem(item)}
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition cursor-pointer"
                                  >
                                    <Eye className="h-3.5 w-3.5 text-[#256B29]" />
                                    <span>Details</span>
                                  </button>

                                  {item.downloadUrl && item.downloadUrl !== "#" ? (
                                    <a
                                      href={item.downloadUrl}
                                      download
                                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-lg bg-[#256B29] text-xs font-bold text-white hover:bg-[#1b4d1d] transition shadow-2xs"
                                    >
                                      <Download className="h-3.5 w-3.5" />
                                      <span>Download</span>
                                    </a>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => setSelectedItem(item)}
                                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-100 text-xs font-bold text-slate-500 hover:bg-slate-200 transition cursor-pointer"
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
                        <div className="p-8 text-center bg-white rounded-xl border border-dashed border-slate-200">
                          <FolderOpen className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                          <p className="text-sm font-bold text-slate-800">
                            No resources or datasets attached to this category yet
                          </p>
                          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                            Maps, reports, and datasets published under this category in the Admin Panel will appear here automatically.
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
            <h3 className="text-lg font-bold text-slate-900">No Resources Found</h3>
            <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
              We couldn&apos;t find any maps or datasets matching your search criteria.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#256B29] px-4 py-2 text-xs font-bold text-white hover:bg-[#1b4d1d] transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
              <span>Clear filters & search</span>
            </button>
          </div>
        )}

        {/* Modal: Item Details */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="fishery-item-modal-title"
          >
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-[#256B29]">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 id="fishery-item-modal-title" className="text-lg font-extrabold text-slate-900">
                      {selectedItem.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Official Reference Dataset &amp; Documentation
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Scope & Details</h4>
                  <p>{selectedItem.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 px-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                  <div>
                    <span className="text-slate-500 block">File Type</span>
                    <strong className="text-slate-900 font-bold">{selectedItem.fileType} Resource</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">File Size</span>
                    <strong className="text-slate-900 font-bold">{selectedItem.fileSize}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Location / Coverage</span>
                    <strong className="text-slate-900 font-bold">{selectedItem.location || "National"}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Publication Date</span>
                    <strong className="text-slate-900 font-bold">{selectedItem.publishedDate || "Official Release"}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Close
                </button>

                {selectedItem.downloadUrl && selectedItem.downloadUrl !== "#" ? (
                  <a
                    href={selectedItem.downloadUrl}
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#256B29] text-xs font-bold text-white hover:bg-[#1b4d1d] transition shadow-xs"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download File</span>
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
