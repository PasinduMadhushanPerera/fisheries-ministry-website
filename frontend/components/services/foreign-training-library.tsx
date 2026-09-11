"use client"

import {
  FileText,
  ImageIcon,
  FileType2,
  FileSpreadsheet,
  FileArchive,
  Files,
  Download,
  Eye,
  Globe,
  Building2,
  SearchX,
  Calendar,
  Clock,
} from "lucide-react"

import type { ForeignTrainingProgramme } from "@/data/foreign-training-programmes"
import { Container } from "@/components/ui/container"

interface ForeignTrainingLibraryProps {
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
    case "Upcoming":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700 border border-blue-200">
          Upcoming
        </span>
      )
    case "Closed":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-bold text-red-700 border border-red-200">
          Closed
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
  programmes,
  activeYearTab,
  setActiveYearTab,
  catalogueBadge,
  libraryTitle,
  onSelectProgramme,
  onClearFilters,
}: ForeignTrainingLibraryProps) {
  return (
    <section aria-label="Foreign training library" className="bg-white py-12 sm:py-16">
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
              className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-xs font-extrabold text-slate-900 focus:border-[#256B29] focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all cursor-pointer shadow-2xs"
            >
              <option value="All">All Years</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>

        {/* Card Grid */}
        {programmes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programmes.map((programme) => {
              const FileIcon = getFileIcon(programme.fileType)

              return (
                <article
                  key={programme.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xs transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 rounded-xl bg-blue-700 border border-blue-600 px-3 py-1 text-xs font-black uppercase tracking-wider text-white shadow-xs">
                          <Globe className="h-3.5 w-3.5 text-blue-200 shrink-0" />
                          <span>{programme.country}</span>
                        </span>
                        <span className="rounded-xl bg-slate-100 px-2.5 py-1 text-xs font-mono font-extrabold text-slate-800 border border-slate-200">
                          {programme.year}
                        </span>
                      </div>

                      {getStatusBadge(programme.status)}
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-extrabold text-slate-900 leading-snug group-hover:text-[#256B29] transition-colors line-clamp-2">
                      {programme.title}
                    </h3>

                    {/* Institution */}
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <Building2 className="h-3.5 w-3.5 text-[#256B29] shrink-0" />
                      <span className="line-clamp-1">{programme.institution}</span>
                    </div>

                    {/* Description - Justified Text */}
                    <p className="text-xs text-slate-600 leading-relaxed text-justify line-clamp-3 font-normal">
                      {programme.description}
                    </p>

                    {/* File Info Bar */}
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                        <FileIcon className="h-4 w-4 text-[#256B29]" />
                        <span>{programme.fileType} Format</span>
                      </div>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600 font-medium">{programme.fileSize}</span>
                    </div>
                  </div>

                  {/* View Details & Download Buttons */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectProgramme(programme)}
                      className="inline-flex min-h-[38px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#256B29] px-4 text-xs font-extrabold text-white hover:bg-[#1b4d1d] transition shadow-2xs cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View details</span>
                    </button>

                    <a
                      href={programme.downloadUrl}
                      download
                      className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                      title="Download file"
                    >
                      <Download className="h-3.5 w-3.5 text-[#256B29]" />
                      <span>Download</span>
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center my-6">
            <SearchX className="mx-auto h-12 w-12 text-slate-400" aria-hidden="true" />
            <h3 className="mt-4 text-lg font-bold text-slate-900">No foreign training programmes found</h3>
            <p className="mt-1 text-xs text-slate-600">
              Try selecting another year option, clearing search filters, or exploring other countries.
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
        )}
      </Container>
    </section>
  )
}
