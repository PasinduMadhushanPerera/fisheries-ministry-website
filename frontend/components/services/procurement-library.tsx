"use client"

import { useState, useMemo } from "react"
import {
  FileText,
  ImageIcon,
  FileType2,
  FileSpreadsheet,
  FileArchive,
  Files,
  Download,
  ExternalLink,
  Eye,
  Building2,
  SearchX,
  Calendar,
  Clock,
  ChevronDown,
  FolderOpen,
  Anchor,
  Briefcase,
  Globe,
  BookOpen,
  Fish,
  ShieldCheck,
  Tag,
} from "lucide-react"

import type { ProcurementNotice } from "@/data/procurement-tenders"
import type { ApiProcurementCategory } from "@/lib/api/procurement"
import { Container } from "@/components/ui/container"

interface ProcurementLibraryProps {
  categories?: ApiProcurementCategory[]
  tenders: ProcurementNotice[]
  activeYearTab: string
  setActiveYearTab: (year: string) => void
  catalogueBadge?: string
  libraryTitle?: string
  onSelectTender: (tender: ProcurementNotice) => void
  onClearFilters: () => void
}

interface ProcurementCategoryMeta {
  id: string
  title: string
  description: string
  iconType: string
}

const DEFAULT_CATEGORIES: ProcurementCategoryMeta[] = [
  {
    id: "harbour",
    title: "Harbour & Civil Works",
    description: "Fishery harbour development, jetty rehabilitation, structural maintenance and civil engineering tenders",
    iconType: "anchor",
  },
  {
    id: "equipment",
    title: "Equipment & Machinery",
    description: "Fuel storage tanks, heavy machinery, refrigeration units and harbour operational equipment",
    iconType: "briefcase",
  },
  {
    id: "it",
    title: "IT, VMS & Communications",
    description: "Vessel Monitoring Systems, IT infrastructure, software solutions and telecommunications tenders",
    iconType: "globe",
  },
  {
    id: "consultancy",
    title: "Consultancy & Feasibility Studies",
    description: "Environmental impact assessments, technical advisory, feasibility studies and auditing services",
    iconType: "book-open",
  },
  {
    id: "supplies",
    title: "General Supplies & Services",
    description: "Aquaculture supplies, live species procurement, office supplies and routine maintenance services",
    iconType: "fish",
  },
  {
    id: "other",
    title: "Other Procurement",
    description: "General bidding notices, miscellaneous tenders and public accountability announcements",
    iconType: "shield-check",
  },
]

function getFileIcon(fileType: string) {
  switch (fileType) {
    case "PDF":
      return FileText
    case "JPG":
    case "PNG":
      return ImageIcon
    case "DOCX":
      return FileType2
    case "XLSX":
      return FileSpreadsheet
    case "ZIP":
      return FileArchive
    default:
      return Files
  }
}

function getCategoryIcon(iconType?: string) {
  switch (iconType) {
    case "anchor":
      return <Anchor className="h-5 w-5 text-white" aria-hidden="true" />
    case "briefcase":
      return <Briefcase className="h-5 w-5 text-white" aria-hidden="true" />
    case "globe":
      return <Globe className="h-5 w-5 text-white" aria-hidden="true" />
    case "book-open":
      return <BookOpen className="h-5 w-5 text-white" aria-hidden="true" />
    case "fish":
      return <Fish className="h-5 w-5 text-white" aria-hidden="true" />
    case "shield-check":
    default:
      return <ShieldCheck className="h-5 w-5 text-white" aria-hidden="true" />
  }
}

function getStatusBadge(status: ProcurementNotice["status"]) {
  if (!status || !status.trim()) return null

  switch (status) {
    case "Open":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Open
        </span>
      )
    case "Closing Soon":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700 border border-amber-200">
          <Clock className="h-3 w-3" />
          Closing Soon
        </span>
      )
    case "Awarded":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700 border border-blue-200">
          Awarded
        </span>
      )
    case "Closed":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600 border border-slate-200">
          Closed
        </span>
      )
    default:
      return null
  }
}

export function ProcurementLibrary({
  categories = [],
  tenders,
  activeYearTab,
  setActiveYearTab,
  catalogueBadge,
  libraryTitle,
  onSelectTender,
  onClearFilters,
}: ProcurementLibraryProps) {
  const availableYears = useMemo(() => {
    const yearsSet = new Set<string>(["2026", "2025", "2024"])
    if (tenders) {
      tenders.forEach((t) => {
        if (t.year) yearsSet.add(t.year.toString())
      })
    }
    return Array.from(yearsSet).sort((a, b) => Number(b) - Number(a))
  }, [tenders])

  const effectiveCategories: ProcurementCategoryMeta[] = useMemo(() => {
    if (categories !== undefined && categories !== null) {
      return categories.map((c) => ({
        id: c.category_id || String(c.id),
        title: c.title,
        description: c.description || "",
        iconType: c.icon_type || "anchor",
      }))
    }
    return DEFAULT_CATEGORIES
  }, [categories])

  // Group tenders into category sections
  const groupedSections = useMemo(() => {
    const knownCategoryIds = new Set(effectiveCategories.map((c) => c.id.toLowerCase().trim()))

    const categorized = effectiveCategories.map((cat) => {
      const targetId = cat.id.toLowerCase().trim()
      const targetTitle = cat.title.toLowerCase().trim()

      const catItems = tenders.filter((t) => {
        const itemCat = (t.category || "").toLowerCase().trim()
        const itemCatLabel = (t.categoryLabel || "").toLowerCase().trim()

        // 1. Direct match on category ID slug
        if (itemCat && itemCat === targetId) return true

        // 2. Direct match on category title
        if (itemCatLabel && itemCatLabel === targetTitle) return true

        // 3. Fallback for unassigned items when there is only 1 category or for 'other'
        if (!itemCat || !knownCategoryIds.has(itemCat)) {
          if (cat.id === "other") return true
          if (effectiveCategories.length === 1) return true
        }

        return false
      })

      return {
        ...cat,
        items: catItems,
      }
    }).filter((section) => section.items.length > 0)

    if (categorized.length === 0 && tenders.length > 0) {
      return [
        {
          id: "tenders-all",
          title: effectiveCategories[0]?.title || "Procurement Tenders",
          description: effectiveCategories[0]?.description || "Official bidding documents and tenders",
          iconType: effectiveCategories[0]?.iconType || "anchor",
          items: tenders,
        },
      ]
    }

    return categorized
  }, [effectiveCategories, tenders])

  // Accordion open state
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const openCategory = useMemo(() => {
    if (activeCategory !== null) return activeCategory
    return groupedSections[0]?.id || null
  }, [activeCategory, groupedSections])

  const toggleCategory = (catId: string) => {
    setActiveCategory((prev) => {
      const current = prev !== null ? prev : (groupedSections[0]?.id || null)
      return current === catId ? "" : catId
    })
  }

  // Render file items grouped by Subheading / Entity inside Category Section (Matching Foreign Training layout)
  function renderGroupedItems(itemsList: ProcurementNotice[]) {
    const subMap = new Map<string, ProcurementNotice[]>()
    itemsList.forEach((item) => {
      const sub = item.subheading ? item.subheading.trim() : (item.publisher ? item.publisher.trim() : "")
      if (!subMap.has(sub)) subMap.set(sub, [])
      subMap.get(sub)!.push(item)
    })

    const groups = Array.from(subMap.entries())

    return groups.map(([subheading, items], gIdx) => (
      <div
        key={subheading || `group-${gIdx}`}
        className={gIdx > 0 ? "mt-4 pt-2 border-t border-slate-200/80" : ""}
      >
        {/* Topic / Sub-heading Ribbon */}
        {subheading && (
          <div className="flex items-center gap-2 px-5 py-2.5 bg-emerald-50/80 border-l-4 border-l-[#256B29] rounded-r-xl mb-3 mx-4 mt-3">
            <FolderOpen className="h-4 w-4 text-[#256B29]" aria-hidden="true" />
            <span className="text-xs font-black uppercase tracking-wider text-[#150c39]">
              {subheading}
            </span>
            <span className="ml-auto text-[11px] font-bold text-[#256B29] bg-white px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
              {items.length} {items.length === 1 ? "notice" : "notices"}
            </span>
          </div>
        )}

        {/* File Item Rows matching Foreign Training & RTI layout */}
        <div className="divide-y divide-slate-100">
          {items.map((tender) => {
            const FileIcon = getFileIcon(tender.fileType)
            const targetUrl = tender.downloadUrl || tender.fileUrl || "#"

            return (
              <div
                key={tender.id}
                className="group flex flex-col md:flex-row md:items-center justify-between p-4 sm:p-5 transition-colors hover:bg-slate-50/80 gap-6 lg:gap-10"
              >
                {/* Left: Format Icon & Details (Capped width so long titles end early with comfortable gap) */}
                <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1 md:max-w-[70%] lg:max-w-[72%] pr-2 md:pr-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 border border-red-100/80 group-hover:bg-red-100/80 group-hover:shadow-2xs transition-all">
                    <FileIcon className="h-5 w-5 text-red-600" aria-hidden="true" />
                  </div>

                  <div className="min-w-0 space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {tender.refNumber && (
                        <span className="inline-flex items-center gap-1 rounded-lg bg-[#256B29] border border-emerald-800 px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-white shadow-2xs">
                          <Tag className="h-3 w-3 text-emerald-100 shrink-0" />
                          <span>REF: {tender.refNumber}</span>
                        </span>
                      )}

                      <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#256B29] transition-colors leading-snug text-justify pr-1 lg:pr-3">
                        {tender.title}
                      </h4>
                      {getStatusBadge(tender.status)}
                      {tender.featured && (
                        <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200">
                          Featured
                        </span>
                      )}
                    </div>

                    {tender.publisher && (
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                        <Building2 className="h-3.5 w-3.5 text-[#256B29] shrink-0" />
                        <span>{tender.publisher}</span>
                      </div>
                    )}

                    {/* Format, Size, Year metadata shifted lower with top spacing & subtle separator */}
                    <div className="mt-3 pt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 font-medium">
                      <span className="font-bold text-slate-700">Format: {tender.fileType || "PDF"}</span>
                      <span>•</span>
                      <span>Size: {tender.fileSize || "N/A"}</span>
                      <span>•</span>
                      <span>Year: {tender.year}</span>
                      {tender.closingDate && (
                        <>
                          <span>•</span>
                          <span className="font-semibold text-amber-700">Closing Date: {tender.closingDate}</span>
                        </>
                      )}
                    </div>

                    {/* Additional Information Box (e.g. Zoom details) */}
                    {tender.additionalInfo && (
                      <div className="mt-2.5 rounded-2xl bg-emerald-50/50 p-3.5 border border-emerald-200/80 text-xs text-slate-800 leading-relaxed font-mono whitespace-pre-line shadow-2xs">
                        {tender.additionalInfo}
                      </div>
                    )}

                    {/* Secondary & Additional Documents Links */}
                    {((tender.secondDownloadUrl || tender.secondFileSize) || (tender.additionalDocuments && tender.additionalDocuments.length > 0)) && (
                      <div className="mt-2.5 flex flex-wrap items-center gap-2 pt-1.5 border-t border-slate-100">
                        <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                          Additional Files:
                        </span>
                        {tender.secondDownloadUrl && (
                          <a
                            href={tender.secondDownloadUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-[#256B29] border border-emerald-200 hover:bg-emerald-100 transition shadow-2xs"
                          >
                            <Download className="h-3 w-3" />
                            <span>{tender.secondDocumentLabel || "Secondary Doc"} [{tender.secondFileType || "PDF"} {tender.secondFileSize}]</span>
                          </a>
                        )}
                        {tender.additionalDocuments && tender.additionalDocuments.map((doc) => (
                          <a
                            key={doc.id}
                            href={doc.downloadUrl || "#"}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-[#256B29] border border-emerald-200 hover:bg-emerald-100 transition shadow-2xs"
                          >
                            <Download className="h-3 w-3" />
                            <span>{doc.label || "Document"} [{doc.fileType || "PDF"} {doc.fileSize}]</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: 2 Action Buttons (Open, Download) */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">

                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50 shadow-2xs"
                    title="Open file in new tab"
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                    <span>Open</span>
                  </a>

                  <a
                    href={targetUrl}
                    download
                    className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#388E3C] px-3.5 text-xs font-bold text-white transition hover:bg-[#256B29] shadow-2xs cursor-pointer"
                    title="Download file"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    ))
  }

  return (
    <section aria-label="Procurement tenders list" className="bg-slate-50/70 py-12 sm:py-16 border-b border-slate-200">
      <Container>
        {/* Header & Year Select */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6 mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#256B29] flex items-center gap-1.5 mb-1">
              <FileText className="h-4 w-4 text-[#256B29]" />
              <span>{catalogueBadge || "Active & Archived Notices"}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {libraryTitle || "Procurement & Tenders Library"}
            </h2>
          </div>

          {/* Year Select Dropdown Menu */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#256B29] shrink-0" aria-hidden="true" />
            <label htmlFor="procurement-library-year-select" className="text-xs font-extrabold text-slate-700 shrink-0">
              Select Year:
            </label>
            <select
              id="procurement-library-year-select"
              value={activeYearTab}
              onChange={(e) => setActiveYearTab(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-extrabold text-slate-900 focus:border-[#256B29] focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all cursor-pointer shadow-2xs"
            >
              <option value="All">All Years</option>
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Empty State */}
        {tenders.length === 0 || groupedSections.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center my-6">
            <SearchX className="mx-auto h-12 w-12 text-slate-400" aria-hidden="true" />
            <h3 className="mt-4 text-lg font-bold text-slate-900">No procurement notices found</h3>
            <p className="mt-1 text-xs text-slate-600">
              Try selecting another year option, clearing search filters, or exploring other categories.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                type="button"
                onClick={onClearFilters}
                className="rounded-xl bg-[#256B29] px-5 py-2.5 text-xs font-extrabold text-white transition hover:bg-[#1b4d1d] cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          </div>
        ) : (
          /* Accordion Category Sections matching Foreign Training layout */
          <div className="space-y-4">
            {groupedSections.map((category) => {
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
                  {/* Category Header Bar (Accordion Trigger) */}
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
                        {getCategoryIcon(category.iconType)}
                      </div>
                      <div className="min-w-0 pr-2">
                        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 truncate">
                          {category.title}
                        </h3>
                        {category.description && (
                          <p className="text-xs text-slate-600 truncate hidden sm:block mt-0.5">
                            {category.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border shadow-2xs ${
                          isOpen
                            ? "bg-white text-[#1b5e20] border-emerald-300"
                            : "bg-white text-slate-700 border-slate-200"
                        }`}
                      >
                        {category.items.length} {category.items.length === 1 ? "notice" : "notices"}
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

                  {/* Accordion Content (Grouped by Subheadings / Topics) */}
                  {isOpen && (
                    <div className="divide-y divide-slate-100">
                      {category.items.length === 0 ? (
                        <div className="p-8 text-center text-xs text-slate-500">
                          No active procurement notices currently listed under this category.
                        </div>
                      ) : (
                        renderGroupedItems(category.items)
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </Container>
    </section>
  )
}
