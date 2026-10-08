"use client"

import { useMemo } from "react"
import {
  Download,
  Building2,
  SearchX,
  FileText,
  Calendar,
  Clock,
} from "lucide-react"

import type { ProcurementNotice } from "@/data/procurement-tenders"
import { Container } from "@/components/ui/container"

interface ProcurementLibraryProps {
  tenders: ProcurementNotice[]
  activeYearTab: string
  setActiveYearTab: (year: string) => void
  catalogueBadge?: string
  libraryTitle?: string
  onSelectTender: (tender: ProcurementNotice) => void
  onClearFilters: () => void
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
  tenders,
  activeYearTab,
  setActiveYearTab,
  catalogueBadge,
  libraryTitle,
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

        {/* Distinct Card Item List */}
        {tenders.length > 0 ? (
          <div className="space-y-4">
            {tenders.map((tender) => {
              const primaryUrl = tender.downloadUrl || tender.fileUrl || "#"
              const secondaryUrl = tender.secondDownloadUrl || "#"

              return (
                <article
                  key={tender.id}
                  className="overflow-hidden rounded-2xl border border-slate-200/90 border-l-4 border-l-[#256B29] bg-white p-5 sm:p-6 shadow-xs transition-all duration-200 hover:border-[#256B29]/60 hover:shadow-md"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Left Side: Title & Info (~72% width on desktop) */}
                    <div className="lg:w-[72%] space-y-3 min-w-0">
                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug text-justify">
                        {tender.title}
                      </h3>

                      {/* Meta Tags: Publisher & Status if present */}
                      {(tender.publisher || tender.status) && (
                        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600">
                          {tender.publisher && (
                            <span className="flex items-center gap-1 text-slate-600">
                              <Building2 className="h-3.5 w-3.5 text-[#256B29] shrink-0" />
                              <span>{tender.publisher}</span>
                            </span>
                          )}
                          {getStatusBadge(tender.status)}
                        </div>
                      )}

                      {/* Additional Information Section (e.g. Zoom Meeting info) */}
                      {tender.additionalInfo && (
                        <div className="mt-3 rounded-2xl bg-emerald-50/50 p-4 border border-emerald-200/80 text-xs text-slate-800 leading-relaxed font-mono whitespace-pre-line shadow-2xs">
                          {tender.additionalInfo}
                        </div>
                      )}
                    </div>

                    {/* Right Side: Download Buttons (~28% width on desktop) */}
                    <div className="lg:w-[28%] flex flex-col items-stretch lg:items-end justify-start gap-3 shrink-0">
                      {/* Primary Download Button */}
                      <a
                        href={primaryUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center justify-center rounded-2xl border border-[#256B29] bg-white px-4 py-3 text-center transition-all duration-200 hover:bg-emerald-50/80 hover:shadow-xs shadow-2xs w-full cursor-pointer"
                      >
                        <span className="text-xs font-bold text-[#256B29] group-hover:text-[#1b4d1d] leading-snug">
                          {tender.docButtonLabel || "Document can be downloaded from here"}
                        </span>
                        <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-extrabold text-[#256B29] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <Download className="h-3 w-3" />
                          <span>[{tender.fileType || "PDF"} {tender.fileSize}]</span>
                        </span>
                      </a>

                      {/* Secondary Download Button (if present, e.g. SOR Document) */}
                      {(tender.secondDownloadUrl || tender.secondFileSize) && (
                        <a
                          href={secondaryUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col items-center justify-center rounded-2xl border border-[#256B29] bg-white px-4 py-3 text-center transition-all duration-200 hover:bg-emerald-50/80 hover:shadow-xs shadow-2xs w-full cursor-pointer"
                        >
                          <span className="text-xs font-bold text-[#256B29] group-hover:text-[#1b4d1d] leading-snug">
                            {tender.secondDocumentLabel || "Document can be downloaded from here"}
                          </span>
                          <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-extrabold text-[#256B29] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            <Download className="h-3 w-3" />
                            <span>[{tender.secondFileType || "PDF"} {tender.secondFileSize}]</span>
                          </span>
                        </a>
                      )}

                      {/* Additional Dynamic Documents (if present) */}
                      {tender.additionalDocuments && tender.additionalDocuments.map((doc) => (
                        <a
                          key={doc.id}
                          href={doc.downloadUrl || "#"}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col items-center justify-center rounded-2xl border border-[#256B29] bg-white px-4 py-3 text-center transition-all duration-200 hover:bg-emerald-50/80 hover:shadow-xs shadow-2xs w-full cursor-pointer"
                        >
                          <span className="text-xs font-bold text-[#256B29] group-hover:text-[#1b4d1d] leading-snug">
                            {doc.label || "Document can be downloaded from here"}
                          </span>
                          <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-extrabold text-[#256B29] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            <Download className="h-3 w-3" />
                            <span>[{doc.fileType || "PDF"} {doc.fileSize}]</span>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          /* Empty State */
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
        )}
      </Container>
    </section>
  )
}
