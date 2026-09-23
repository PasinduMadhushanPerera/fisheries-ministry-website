"use client"

import { useState, useMemo, useEffect } from "react"
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
  ChevronDown,
  FolderOpen,
  FolderSearch,
  ShieldCheck,
  Building,
  DollarSign,
  Briefcase,
  FileCode,
  FileCheck,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import type { ApiRtiCategory, ApiRtiDocumentItem } from "@/lib/api/rti"

type FormatFilterPill = "All formats" | "PDF" | "Excel" | "Word" | "Archive"

interface RtiLibraryProps {
  categories?: ApiRtiCategory[]
  documents?: ApiRtiDocumentItem[]
}

export function RtiLibrary({ categories = [], documents = [] }: RtiLibraryProps) {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("All categories")
  const [activeFormatFilter, setActiveFormatFilter] = useState<FormatFilterPill>("All formats")

  // Accordion state: Open first category or "biannual-reports" by default
  const defaultOpenCat = categories.find((c) => c.id === "biannual-reports")?.id || categories[0]?.id || "biannual-reports"
  const [openCategory, setOpenCategory] = useState<string | null>(defaultOpenCat)

  // Modal State
  const [selectedDoc, setSelectedDoc] = useState<ApiRtiDocumentItem | null>(null)

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

  const toggleCategory = (catId: string) => {
    setOpenCategory((prev) => (prev === catId ? null : catId))
  }

  const isFiltered =
    searchQuery !== "" ||
    activeCategoryFilter !== "All categories" ||
    activeFormatFilter !== "All formats"

  const clearFilters = () => {
    setSearchQuery("")
    setActiveCategoryFilter("All categories")
    setActiveFormatFilter("All formats")
    setOpenCategory(defaultOpenCat)
  }

  // Filter documents
  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      // Search match
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        query === "" ||
        doc.title.toLowerCase().includes(query) ||
        doc.description.toLowerCase().includes(query) ||
        (doc.year && doc.year.toString().includes(query))

      // Category filter match
      let matchesCategory = true
      if (activeCategoryFilter !== "All categories") {
        matchesCategory = doc.category === activeCategoryFilter
      }

      // Format filter match
      let matchesFormat = true
      if (activeFormatFilter === "PDF") matchesFormat = doc.fileType === "PDF"
      else if (activeFormatFilter === "Excel") matchesFormat = doc.fileType === "XLSX" || doc.fileType === "XLS" || doc.fileType === "CSV"
      else if (activeFormatFilter === "Word") matchesFormat = doc.fileType === "DOCX" || doc.fileType === "DOC"
      else if (activeFormatFilter === "Archive") matchesFormat = doc.fileType === "ZIP"

      return matchesSearch && matchesCategory && matchesFormat
    })
  }, [documents, searchQuery, activeCategoryFilter, activeFormatFilter])

  // Group items by category for rendering in accordion sections
  const groupedCategories = useMemo(() => {
    return categories.map((cat) => {
      const items = filteredDocs.filter((doc) => doc.category === cat.id)
      return {
        ...cat,
        items,
      }
    })
  }, [categories, filteredDocs])

  // Helper for format icons
  const getFormatIcon = (fileType: string) => {
    switch (fileType) {
      case "PDF":
        return <FileText className="h-5 w-5 text-red-600" aria-hidden="true" />
      case "XLSX":
      case "XLS":
      case "CSV":
        return <FileSpreadsheet className="h-5 w-5 text-[#256B29]" aria-hidden="true" />
      case "DOCX":
      case "DOC":
        return <FileType className="h-5 w-5 text-blue-600" aria-hidden="true" />
      case "PPTX":
        return <Presentation className="h-5 w-5 text-amber-600" aria-hidden="true" />
      case "ZIP":
        return <FileArchive className="h-5 w-5 text-slate-700" aria-hidden="true" />
      default:
        return <Files className="h-5 w-5 text-slate-600" aria-hidden="true" />
    }
  }

  // Helper for category header icons
  const getCategoryHeaderIcon = (iconOrId: string) => {
    switch (iconOrId) {
      case "forms":
        return <FileCheck className="h-5 w-5 !text-white" aria-hidden="true" style={{ color: "#ffffff" }} />
      case "biannual-reports":
        return <ShieldCheck className="h-5 w-5 !text-white" aria-hidden="true" style={{ color: "#ffffff" }} />
      case "decisions-policies":
        return <FileCode className="h-5 w-5 !text-white" aria-hidden="true" style={{ color: "#ffffff" }} />
      case "budget":
        return <DollarSign className="h-5 w-5 !text-white" aria-hidden="true" style={{ color: "#ffffff" }} />
      case "projects":
        return <Briefcase className="h-5 w-5 !text-white" aria-hidden="true" style={{ color: "#ffffff" }} />
      case "other-reports":
        return <FolderOpen className="h-5 w-5 !text-white" aria-hidden="true" style={{ color: "#ffffff" }} />
      case "procurement":
        return <Building className="h-5 w-5 !text-white" aria-hidden="true" style={{ color: "#ffffff" }} />
      default:
        return <Files className="h-5 w-5 !text-white" aria-hidden="true" style={{ color: "#ffffff" }} />
    }
  }

  return (
    <section id="rti-library" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200" aria-label="RTI Disclosure Library">
      <Container>
        {/* Section Title */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            RTI Forms &amp; Proactive Disclosure Library
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Browse official RTI request forms, biannual reports, budget allocations, project evaluations, and procurement notices.
          </p>
        </div>

        {/* Controls Toolbar */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <label htmlFor="search-rti-documents" className="sr-only">
                Search RTI documents
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Search className="h-4 w-4" aria-hidden="true" />
              </div>
              <input
                type="search"
                id="search-rti-documents"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search RTI documents..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2 text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#388E3C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#388E3C]/20"
              />
            </div>

            {/* Category Select Dropdown & Format Filter */}
            <div className="flex flex-wrap items-center gap-3">
              <select
                id="rti-category-select"
                value={activeCategoryFilter}
                onChange={(e) => {
                  const val = e.target.value
                  setActiveCategoryFilter(val)
                  if (val !== "All categories") {
                    setOpenCategory(val)
                  }
                }}
                className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-xs font-bold text-slate-700 transition cursor-pointer focus:border-[#388E3C] focus:outline-none"
              >
                <option value="All categories">All categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
                  <Filter className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                  Format:
                </span>
                {(["All formats", "PDF", "Excel", "Word", "Archive"] as FormatFilterPill[]).map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setActiveFormatFilter(fmt)}
                    className={`rounded-lg px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                      activeFormatFilter === fmt
                        ? "bg-[#0B3D3A] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
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
                  className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer ml-auto sm:ml-0"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Empty State when no filters match */}
        {filteredDocs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <FolderSearch className="mx-auto h-12 w-12 text-slate-400 mb-3" aria-hidden="true" />
            <h3 className="text-lg font-bold text-slate-900">No documents found</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1 mb-4">
              We couldn&apos;t find any RTI documents matching &quot;{searchQuery}&quot;. Try adjusting your keywords or clearing the active filters.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-2 rounded-xl bg-[#388E3C] px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[#256B29] cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              <span>Clear all filters</span>
            </button>
          </div>
        ) : (
          /* Accordion Category Sections */
          <div className="space-y-4">
            {groupedCategories.map((category) => {
              // Hide empty sections when user is searching or filtering
              if (category.items.length === 0 && isFiltered) {
                return null
              }

              const isOpen = openCategory === category.id

              return (
                <div
                  key={category.id}
                  className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                    isOpen
                      ? "border-emerald-300 bg-white shadow-md ring-1 ring-emerald-400/30"
                      : "border-slate-300/80 bg-white shadow-2xs hover:border-emerald-300/70"
                  }`}
                >
                  {/* Category Header (Accordion Trigger) */}
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    aria-expanded={isOpen}
                    className={`w-full flex items-center justify-between p-5 text-left transition-all duration-200 cursor-pointer border-b ${
                      isOpen
                        ? "bg-gradient-to-r from-emerald-100/80 via-emerald-50/90 to-teal-50/70 border-emerald-200"
                        : "bg-gradient-to-r from-slate-100 via-slate-50 to-emerald-50/40 hover:from-emerald-50/80 hover:to-slate-100 border-slate-200/80"
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#150c39] text-white shadow-xs">
                        {getCategoryHeaderIcon(category.icon || category.id)}
                      </div>
                      <div className="min-w-0 pr-2">
                        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 truncate">
                          {category.title}
                        </h3>
                        <p className="text-xs text-slate-600 truncate hidden sm:block mt-0.5">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border shadow-2xs ${
                        isOpen
                          ? "bg-white text-[#1b5e20] border-emerald-300"
                          : "bg-white text-slate-700 border-slate-200"
                      }`}>
                        {category.items.length} {category.items.length === 1 ? "document" : "documents"}
                      </span>
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full border shadow-2xs transition-transform duration-200 ${
                          isOpen
                            ? "rotate-180 bg-white text-[#256B29] border-emerald-300"
                            : "bg-white text-slate-600 border-slate-200"
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" aria-hidden="true" />
                      </div>
                    </div>
                  </button>

                  {/* Accordion Content (Document List) */}
                  {isOpen && (
                    <div className="divide-y divide-slate-100">
                      {category.items.length === 0 ? (
                        <div className="p-8 text-center text-xs text-slate-500">
                          No documents currently published under this category.
                        </div>
                      ) : (
                        (() => {
                          const subMap = new Map<string, typeof category.items>()
                          category.items.forEach((item) => {
                            const sub = item.subheading ? item.subheading.trim() : ""
                            if (!subMap.has(sub)) subMap.set(sub, [])
                            subMap.get(sub)!.push(item)
                          })

                          const groups = Array.from(subMap.entries())

                          return groups.map(([subheading, items], gIdx) => (
                            <div key={subheading || `group-${gIdx}`} className={gIdx > 0 ? "mt-4 pt-2 border-t border-slate-200/80" : ""}>
                              {subheading && (
                                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50/70 border-l-4 border-l-[#256B29] rounded-r-xl mb-3">
                                  <FolderOpen className="h-4 w-4 text-[#256B29]" aria-hidden="true" />
                                  <span className="text-xs font-black uppercase tracking-wider text-[#150c39]">
                                    {subheading}
                                  </span>
                                  <span className="ml-auto text-[11px] font-bold text-[#256B29] bg-white px-2 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
                                    {items.length} {items.length === 1 ? "file" : "files"}
                                  </span>
                                </div>
                              )}
                              <div className="divide-y divide-slate-100">
                                {items.map((doc) => (
                                  <div
                                    key={doc.id}
                                    className="group flex flex-col md:flex-row md:items-center justify-between p-4 sm:p-5 transition-colors hover:bg-slate-50/80 gap-4"
                                  >
                                    {/* Left: Format Icon & Details */}
                                    <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
                                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 group-hover:bg-white group-hover:shadow-2xs transition-all">
                                        {getFormatIcon(doc.fileType)}
                                      </div>
                                      <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#388E3C] transition-colors">
                                            {doc.title}
                                          </h4>
                                          {doc.featured && (
                                            <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200">
                                              Featured
                                            </span>
                                          )}
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                                          {doc.description}
                                        </p>
                                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 font-medium">
                                          <span className="font-bold text-slate-700">Format: {doc.fileType}</span>
                                          <span>•</span>
                                          <span>Size: {doc.fileSize}</span>
                                          {doc.publishedDate && (
                                            <>
                                              <span>•</span>
                                              <span>Date: {doc.publishedDate}</span>
                                            </>
                                          )}
                                          {doc.availableLanguages && doc.availableLanguages.length > 0 && (
                                            <div className="flex items-center gap-1 ml-1">
                                              {doc.availableLanguages.includes("en") && (
                                                <span className="rounded bg-sky-50 px-1 py-0.5 text-[9px] font-extrabold text-sky-700 border border-sky-200/80">
                                                  EN
                                                </span>
                                              )}
                                              {doc.availableLanguages.includes("si") && (
                                                <span className="rounded bg-amber-50 px-1 py-0.5 text-[9px] font-extrabold text-amber-700 border border-amber-200/80">
                                                  SI
                                                </span>
                                              )}
                                              {doc.availableLanguages.includes("ta") && (
                                                <span className="rounded bg-rose-50 px-1 py-0.5 text-[9px] font-extrabold text-rose-700 border border-rose-200/80">
                                                  TA
                                                </span>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Right: Action Buttons */}
                                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                                      <button
                                        type="button"
                                        onClick={() => setSelectedDoc(doc)}
                                        className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50 cursor-pointer shadow-2xs"
                                        title="View document details"
                                      >
                                        <Eye className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                                        <span>Details</span>
                                      </button>

                                      <a
                                        href={doc.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50 shadow-2xs"
                                        title="Open file in new tab"
                                      >
                                        <ExternalLink className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                                        <span>Open</span>
                                      </a>

                                      <a
                                        href={doc.downloadUrl || doc.fileUrl}
                                        download
                                        className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#388E3C] px-3.5 text-xs font-bold text-white transition hover:bg-[#256B29] shadow-2xs"
                                        title="Download file"
                                      >
                                        <Download className="h-3.5 w-3.5 !text-white" aria-hidden="true" />
                                        <span className="!text-white">Download</span>
                                      </a>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))
                        })()
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
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedDoc(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-doc-title"
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 text-left my-auto"
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
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                  {getFormatIcon(selectedDoc.fileType)}
                </div>
                <div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-[#256B29]">
                    RTI Disclosure File
                  </span>
                  {selectedDoc.publishedDate && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      Published: {selectedDoc.publishedDate}
                    </p>
                  )}
                </div>
              </div>

              <h3 id="modal-doc-title" className="mt-4 text-xl font-bold text-slate-900">
                {selectedDoc.title}
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {selectedDoc.description}
              </p>

              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-200/70">
                  <span className="font-semibold text-slate-500">File Type:</span>
                  <span className="font-bold text-slate-900">{selectedDoc.fileType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/70">
                  <span className="font-semibold text-slate-500">File Size:</span>
                  <span className="font-bold text-slate-900">{selectedDoc.fileSize}</span>
                </div>
                {selectedDoc.year && (
                  <div className="flex justify-between py-1 border-b border-slate-200/70">
                    <span className="font-semibold text-slate-500">Reference Year:</span>
                    <span className="font-bold text-slate-900">{selectedDoc.year}</span>
                  </div>
                )}
                <div className="flex justify-between py-1">
                  <span className="font-semibold text-slate-500">Publisher:</span>
                  <span className="font-bold text-[#256B29]">Ministry of Fisheries, Sri Lanka</span>
                </div>
              </div>

              {/* Language Specific File Versions */}
              {(selectedDoc.fileUrlEn || selectedDoc.fileUrlSi || selectedDoc.fileUrlTa) && (
                <div className="mt-4 rounded-xl border border-emerald-200/80 bg-emerald-50/40 p-3.5">
                  <span className="block text-xs font-extrabold text-emerald-950 mb-2">
                    📄 Available Language File Versions:
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
                  Close
                </button>
                <a
                  href={selectedDoc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                  <span>Open file</span>
                </a>
                <a
                  href={selectedDoc.downloadUrl || selectedDoc.fileUrl}
                  download
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#388E3C] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#256B29]"
                >
                  <Download className="h-3.5 w-3.5 !text-white" aria-hidden="true" />
                  <span className="!text-white">Download</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
