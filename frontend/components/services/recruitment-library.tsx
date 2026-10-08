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
  Building2,
  SearchX,
  UserPlus,
  Calendar,
  Clock,
  ChevronDown,
  FolderOpen,
  Anchor,
  Briefcase,
  Globe,
  BookOpen,
  Award,
  ShieldCheck,
  UserCheck,
  Tag,
} from "lucide-react"

import type { RecruitmentVacancy } from "@/data/recruitment-vacancies"
import type { ApiRecruitmentCategory } from "@/lib/api/recruitment"
import { Container } from "@/components/ui/container"

interface RecruitmentLibraryProps {
  categories?: ApiRecruitmentCategory[]
  vacancies: RecruitmentVacancy[]
  activeYearTab: string
  setActiveYearTab: (year: string) => void
  catalogueBadge?: string
  libraryTitle?: string
  onSelectVacancy: (vacancy: RecruitmentVacancy) => void
  onClearFilters: () => void
}

interface RecruitmentCategoryMeta {
  id: string
  title: string
  description: string
  iconType: string
}

const DEFAULT_CATEGORIES: RecruitmentCategoryMeta[] = [
  {
    id: "technical",
    title: "Technical & Extension Services",
    description: "Public vacancies for marine engineers, fisheries inspectors, harbour technicians, and extension officers",
    iconType: "user-check",
  },
  {
    id: "administrative",
    title: "Administrative & Management Services",
    description: "Executive and administrative officer positions across ministry headquarters and regional centers",
    iconType: "building",
  },
  {
    id: "research",
    title: "Scientific & Ocean Research",
    description: "Research scientist positions, oceanographic hydrographers, and aquatic biology specialists at NARA",
    iconType: "award",
  },
  {
    id: "inspection",
    title: "Marine Inspection & Compliance",
    description: "Offshore vessel monitoring, VMS control room operators, and port state control officers",
    iconType: "shield-check",
  },
  {
    id: "other",
    title: "General Public Service Vacancies",
    description: "General support staff, procurement officers, IT technicians, and statutory agency recruitment notices",
    iconType: "briefcase",
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
    case "user-check":
      return <UserCheck className="h-5 w-5 text-white" aria-hidden="true" />
    case "building":
      return <Building2 className="h-5 w-5 text-white" aria-hidden="true" />
    case "award":
      return <Award className="h-5 w-5 text-white" aria-hidden="true" />
    case "shield-check":
      return <ShieldCheck className="h-5 w-5 text-white" aria-hidden="true" />
    case "briefcase":
      return <Briefcase className="h-5 w-5 text-white" aria-hidden="true" />
    case "globe":
      return <Globe className="h-5 w-5 text-white" aria-hidden="true" />
    case "book-open":
      return <BookOpen className="h-5 w-5 text-white" aria-hidden="true" />
    case "anchor":
    default:
      return <Anchor className="h-5 w-5 text-white" aria-hidden="true" />
  }
}

function getStatusBadge(status: RecruitmentVacancy["status"]) {
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

export function RecruitmentLibrary({
  categories = [],
  vacancies,
  activeYearTab,
  setActiveYearTab,
  catalogueBadge,
  libraryTitle,
  onSelectVacancy,
  onClearFilters,
}: RecruitmentLibraryProps) {
  const availableYears = useMemo(() => {
    const yearsSet = new Set<string>(["2026", "2025", "2024"])
    if (vacancies) {
      vacancies.forEach((v) => {
        if (v.year) yearsSet.add(v.year.toString())
      })
    }
    return Array.from(yearsSet).sort((a, b) => Number(b) - Number(a))
  }, [vacancies])

  const effectiveCategories: RecruitmentCategoryMeta[] = useMemo(() => {
    if (categories !== undefined && categories !== null) {
      return categories.map((c) => ({
        id: c.category_id || String(c.id),
        title: c.title,
        description: c.description || "",
        iconType: c.icon_type || "briefcase",
      }))
    }
    return DEFAULT_CATEGORIES
  }, [categories])

  // Group vacancies into category sections
  const groupedSections = useMemo(() => {
    const knownCategoryIds = new Set(effectiveCategories.map((c) => c.id.toLowerCase().trim()))

    const categorized = effectiveCategories.map((cat) => {
      const targetId = cat.id.toLowerCase().trim()
      const targetTitle = cat.title.toLowerCase().trim()

      const catItems = vacancies.filter((v) => {
        const itemCat = (v.category || "").toLowerCase().trim()
        const itemCatLabel = (v.categoryLabel || "").toLowerCase().trim()

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

    if (categorized.length === 0 && vacancies.length > 0) {
      return [
        {
          id: "vacancies-all",
          title: effectiveCategories[0]?.title || "Public Service Recruitment",
          description: effectiveCategories[0]?.description || "Official career notices and vacancies",
          iconType: effectiveCategories[0]?.iconType || "briefcase",
          items: vacancies,
        },
      ]
    }

    return categorized
  }, [effectiveCategories, vacancies])

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

  // Render file items grouped by Subheading / Department / Institution (Matching RTI layout)
  function renderGroupedItems(itemsList: RecruitmentVacancy[]) {
    const subMap = new Map<string, RecruitmentVacancy[]>()
    itemsList.forEach((item) => {
      const sub = item.subheading ? item.subheading.trim() : (item.institution || item.department || "").trim()
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
              {items.length} {items.length === 1 ? "vacancy" : "vacancies"}
            </span>
          </div>
        )}

        {/* File Item Rows matching RTI & Procurement layout */}
        <div className="divide-y divide-slate-100">
          {items.map((vacancy) => {
            const FileIcon = getFileIcon(vacancy.fileType)
            const targetUrl = vacancy.downloadUrl || vacancy.fileUrl || "#"

            return (
              <div
                key={vacancy.id}
                className="group flex flex-col md:flex-row md:items-center justify-between p-4 sm:p-5 transition-colors hover:bg-slate-50/80 gap-6 lg:gap-10"
              >
                {/* Left: Red Format Icon & Details */}
                <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1 md:max-w-[70%] lg:max-w-[72%] pr-2 md:pr-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 border border-red-100/80 group-hover:bg-red-100/80 group-hover:shadow-2xs transition-all">
                    <FileIcon className="h-5 w-5 text-red-600" aria-hidden="true" />
                  </div>

                  <div className="min-w-0 space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#256B29] transition-colors leading-snug text-justify pr-1 lg:pr-3">
                        {vacancy.title}
                      </h4>
                      {getStatusBadge(vacancy.status)}
                      {vacancy.featured && (
                        <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Metadata: Format, Size, Year, Closing Date */}
                    <div className="mt-3 pt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 font-medium">
                      <span className="font-bold text-slate-700">Format: {vacancy.fileType || "PDF"}</span>
                      <span>•</span>
                      <span>Size: {vacancy.fileSize || "N/A"}</span>
                      <span>•</span>
                      <span>Year: {vacancy.year}</span>
                      {vacancy.closingDate && (
                        <>
                          <span>•</span>
                          <span className="font-semibold text-amber-700">Closing Date: {vacancy.closingDate}</span>
                        </>
                      )}
                    </div>

                    {/* Secondary & Additional Documents Links */}
                    {((vacancy.secondDownloadUrl || vacancy.secondFileSize) || (vacancy.additionalDocuments && vacancy.additionalDocuments.length > 0)) && (
                      <div className="mt-2.5 flex flex-wrap items-center gap-2 pt-1.5 border-t border-slate-100">
                        <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                          Additional Files:
                        </span>
                        {vacancy.secondDownloadUrl && (
                          <a
                            href={vacancy.secondDownloadUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-[#256B29] border border-emerald-200 hover:bg-emerald-100 transition shadow-2xs"
                          >
                            <Download className="h-3 w-3" />
                            <span>{vacancy.secondDocumentLabel || "Secondary Doc"} [{vacancy.secondFileType || "PDF"} {vacancy.secondFileSize}]</span>
                          </a>
                        )}
                        {vacancy.additionalDocuments && vacancy.additionalDocuments.map((doc) => (
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
                    className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 shadow-2xs"
                    title="Open file in new tab"
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                    <span>Open</span>
                  </a>

                  <a
                    href={targetUrl}
                    download
                    className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#388E3C] px-4 text-xs font-bold text-white transition hover:bg-[#256B29] shadow-2xs cursor-pointer"
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
    <section aria-label="Recruitment vacancies library" className="bg-slate-50/70 py-12 sm:py-16 border-b border-slate-200">
      <Container>
        {/* Header & Year Select */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6 mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#256B29] flex items-center gap-1.5 mb-1">
              <UserPlus className="h-4 w-4 text-[#256B29]" />
              <span>{catalogueBadge || "Official Vacancies Catalogue"}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {libraryTitle || "Public Service Recruitment Library"}
            </h2>
          </div>

          {/* Year Select Dropdown Menu */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#256B29] shrink-0" aria-hidden="true" />
            <label htmlFor="recruitment-library-year-select" className="text-xs font-extrabold text-slate-700 shrink-0">
              Select Year:
            </label>
            <select
              id="recruitment-library-year-select"
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
        {vacancies.length === 0 || groupedSections.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center my-6">
            <SearchX className="mx-auto h-12 w-12 text-slate-400" aria-hidden="true" />
            <h3 className="mt-4 text-lg font-bold text-slate-900">No recruitment notices found</h3>
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
          /* Accordion Category Sections matching RTI layout */
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
                        {category.items.length} {category.items.length === 1 ? "vacancy" : "vacancies"}
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
                          No active vacancies currently listed under this category.
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
