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
  GraduationCap,
  Calendar,
  Clock,
  ChevronDown,
  FolderOpen,
  Globe,
  Anchor,
  Fish,
  Briefcase,
  Award,
  ShieldCheck,
  BookOpen,
} from "lucide-react"

import type { ForeignTrainingProgramme } from "@/data/foreign-training-programmes"
import type { ApiForeignTrainingCategory } from "@/lib/api/foreign-training"
import { Container } from "@/components/ui/container"

interface ForeignTrainingLibraryProps {
  categories?: ApiForeignTrainingCategory[]
  programmes: ForeignTrainingProgramme[]
  activeYearTab: string
  setActiveYearTab: (year: string) => void
  catalogueBadge?: string
  libraryTitle?: string
  onSelectProgramme: (programme: ForeignTrainingProgramme) => void
  onClearFilters: () => void
}

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
    case "globe":
      return <Globe className="h-5 w-5 text-white" aria-hidden="true" />
    case "anchor":
      return <Anchor className="h-5 w-5 text-white" aria-hidden="true" />
    case "fish":
      return <Fish className="h-5 w-5 text-white" aria-hidden="true" />
    case "briefcase":
      return <Briefcase className="h-5 w-5 text-white" aria-hidden="true" />
    case "award":
      return <Award className="h-5 w-5 text-white" aria-hidden="true" />
    case "shield-check":
      return <ShieldCheck className="h-5 w-5 text-white" aria-hidden="true" />
    case "book-open":
      return <BookOpen className="h-5 w-5 text-white" aria-hidden="true" />
    case "graduation-cap":
    default:
      return <GraduationCap className="h-5 w-5 text-white" aria-hidden="true" />
  }
}

function getStatusBadge(status: ForeignTrainingProgramme["status"]) {
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
        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-bold text-red-700 border border-red-200">
          Closed
        </span>
      )
    case "Upcoming":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700 border border-blue-200">
          Upcoming
        </span>
      )
    case "Archived":
    default:
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600 border border-slate-200">
          Archived
        </span>
      )
  }
}

export function ForeignTrainingLibrary({
  categories = [],
  programmes,
  activeYearTab,
  setActiveYearTab,
  catalogueBadge,
  libraryTitle,
  onSelectProgramme,
  onClearFilters,
}: ForeignTrainingLibraryProps) {
  // Define default categories if API categories empty
  const effectiveCategories: ApiForeignTrainingCategory[] = useMemo(() => {
    if (categories !== undefined) return categories

    const catMap = new Map<string, string>()
    programmes.forEach((p) => {
      const id = p.category || "other"
      const label = p.categoryLabel || "Overseas Fellowships"
      if (!catMap.has(id)) catMap.set(id, label)
    })

    const result: ApiForeignTrainingCategory[] = []
    let idx = 1
    catMap.forEach((label, id) => {
      result.push({
        id,
        title: label,
        description: `Browse available overseas fellowships and training opportunities under ${label}`,
        order: idx++,
      })
    })
    return result
  }, [categories, programmes])

  // Accordion state: First category open by default
  const [openCategory, setOpenCategory] = useState<string | null>(
    effectiveCategories[0]?.id || null
  )

  const toggleCategory = (catId: string) => {
    setOpenCategory((prev) => (prev === catId ? null : catId))
  }

  const availableYears = useMemo(() => {
    const yearsSet = new Set<string>(["2026", "2025", "2024"])
    if (programmes) {
      programmes.forEach((p) => {
        if (p.year) yearsSet.add(p.year.toString())
      })
    }
    return Array.from(yearsSet).sort((a, b) => Number(b) - Number(a))
  }, [programmes])

  // Group items by Category
  const groupedSections = useMemo(() => {
    return effectiveCategories.map((cat) => {
      const items = programmes.filter(
        (p) => p.category === cat.id || p.categoryLabel === cat.title
      )
      return {
        ...cat,
        items,
      }
    })
  }, [effectiveCategories, programmes])

  function renderGroupedItems(itemsList: ForeignTrainingProgramme[]) {
    const subMap = new Map<string, ForeignTrainingProgramme[]>()
    itemsList.forEach((item) => {
      const sub = item.subheading ? item.subheading.trim() : ""
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
              {items.length} {items.length === 1 ? "fellowship" : "fellowships"}
            </span>
          </div>
        )}

        {/* Course File Rows matching RTI layout */}
        <div className="divide-y divide-slate-100">
          {items.map((programme) => {
            const FileIcon = getFileIcon(programme.fileType)
            const targetUrl = programme.downloadUrl || programme.fileUrl || "#"

            return (
              <div
                key={programme.id}
                className="group flex flex-col md:flex-row md:items-center justify-between p-4 sm:p-5 transition-colors hover:bg-slate-50/80 gap-4"
              >
                {/* Left: Format Icon & Details */}
                <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 group-hover:bg-white group-hover:shadow-2xs transition-all">
                    <FileIcon className="h-5 w-5 text-[#256B29]" aria-hidden="true" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {programme.country && (
                        <span className="inline-flex items-center gap-1 rounded-lg bg-[#256B29] border border-emerald-800 px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-white shadow-2xs">
                          <Globe className="h-3 w-3 text-emerald-100 shrink-0" />
                          <span>{programme.country}</span>
                        </span>
                      )}

                      <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#256B29] transition-colors">
                        {programme.title}
                      </h4>
                      {getStatusBadge(programme.status)}
                      {programme.featured && (
                        <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200">
                          Featured
                        </span>
                      )}
                    </div>

                    {programme.institution && (
                      <div className="flex items-center gap-1.5 mt-1 text-xs font-medium text-slate-600">
                        <Building2 className="h-3.5 w-3.5 text-[#256B29] shrink-0" />
                        <span>{programme.institution}</span>
                      </div>
                    )}

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 font-medium">
                      <span className="font-bold text-slate-700">Format: {programme.fileType}</span>
                      <span>•</span>
                      <span>Size: {programme.fileSize}</span>
                      <span>•</span>
                      <span>Year: {programme.year}</span>
                      {programme.applicationDeadline && (
                        <>
                          <span>•</span>
                          <span className="font-semibold text-amber-700">Deadline: {programme.applicationDeadline}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Action Buttons (Details, Open, Download) matching RTI */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    type="button"
                    onClick={() => onSelectProgramme(programme)}
                    className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50 cursor-pointer shadow-2xs"
                    title="View details"
                  >
                    <Eye className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                    <span>Details</span>
                  </button>

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
    <section aria-label="Foreign training library" className="bg-slate-50 py-12 sm:py-16 border-b border-slate-200">
      <Container>
        {/* Header & Year Dropdown */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6 mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#256B29] flex items-center gap-1.5 mb-1">
              <Globe className="h-4 w-4 text-[#256B29]" />
              <span>{catalogueBadge || "Scholarship Catalogue"}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {libraryTitle || "Foreign Training & Fellowships Library"}
            </h2>
          </div>

          {/* Year Select Dropdown Menu */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#256B29] shrink-0" aria-hidden="true" />
            <label htmlFor="foreign-library-year-select" className="text-xs font-extrabold text-slate-700 shrink-0">
              Select Year:
            </label>
            <select
              id="foreign-library-year-select"
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
        {programmes.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center my-6">
            <SearchX className="mx-auto h-12 w-12 text-slate-400" aria-hidden="true" />
            <h3 className="mt-4 text-lg font-bold text-slate-900">No foreign training programmes found</h3>
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
                        {getCategoryIcon(category.icon_type)}
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
                        {category.items.length} {category.items.length === 1 ? "fellowship" : "fellowships"}
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

                  {/* Accordion Content (Grouped by Topic / Sub-heading) */}
                  {isOpen && (
                    <div className="divide-y divide-slate-100">
                      {category.items.length === 0 ? (
                        <div className="p-8 text-center text-xs text-slate-500">
                          No active fellowships currently listed under this category.
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
