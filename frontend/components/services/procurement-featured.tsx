"use client"

import {
  FileText,
  FileCode,
  FileSpreadsheet,
  FileArchive,
  Files,
  Download,
  Eye,
  Sparkles,
  Building2,
  CalendarDays,
  Clock,
  Tag,
} from "lucide-react"

import type { ProcurementNotice } from "@/data/procurement-tenders"
import { Container } from "@/components/ui/container"

interface ProcurementFeaturedProps {
  tenders: ProcurementNotice[]
  featuredBadge?: string
  onSelectTender: (tender: ProcurementNotice) => void
}

function getFileIcon(fileType: ProcurementNotice["fileType"]) {
  switch (fileType) {
    case "PDF":
      return FileText
    case "DOCX":
      return FileCode
    case "XLSX":
      return FileSpreadsheet
    case "ZIP":
      return FileArchive
    default:
      return Files
  }
}

function getStatusBadge(status: ProcurementNotice["status"]) {
  switch (status) {
    case "Open":
      return (
        <span className="rounded-md bg-emerald-100 text-[#256B29] border border-emerald-300/80 px-2 py-0.5 text-[11px] font-extrabold">
          Open
        </span>
      )
    case "Closing Soon":
      return (
        <span className="rounded-md bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 text-[11px] font-extrabold animate-pulse">
          Closing Soon
        </span>
      )
    case "Awarded":
      return (
        <span className="rounded-md bg-blue-100 text-blue-900 border border-blue-300 px-2 py-0.5 text-[11px] font-extrabold">
          Awarded
        </span>
      )
    case "Closed":
    default:
      return (
        <span className="rounded-md bg-slate-100 text-slate-700 border border-slate-300 px-2 py-0.5 text-[11px] font-bold">
          Closed
        </span>
      )
  }
}

export function ProcurementFeatured({
  tenders,
  featuredBadge,
  onSelectTender,
}: ProcurementFeaturedProps) {
  const featuredList = tenders.filter((t) => t.featured)

  if (featuredList.length === 0) return null

  return (
    <section aria-label="Featured procurement tenders" className="bg-slate-50/80 py-10 sm:py-12 border-b border-slate-200/80">
      <Container>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#256B29] flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-[#256B29]" />
            <span>{featuredBadge || "Featured Procurement Notices"}</span>
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredList.map((tender) => {
            const FileIcon = getFileIcon(tender.fileType)

            return (
              <article
                key={tender.id}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-emerald-200/80 bg-white p-6 shadow-xs transition-all duration-300 hover:border-emerald-400 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="space-y-4">
                  {/* Top Bar Badges */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 text-[11px] font-extrabold text-[#256B29]">
                        <Tag className="h-3 w-3" />
                        <span>REF: {tender.refNumber}</span>
                      </span>
                    </div>

                    {getStatusBadge(tender.status)}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-extrabold text-slate-900 leading-snug group-hover:text-[#256B29] transition-colors line-clamp-2">
                    {tender.title}
                  </h3>

                  {/* Publisher */}
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <Building2 className="h-3.5 w-3.5 text-[#256B29] shrink-0" />
                    <span className="line-clamp-1">{tender.publisher}</span>
                  </div>

                  {/* Description - Justified Text */}
                  <p className="text-xs text-slate-600 leading-relaxed text-justify line-clamp-3 font-normal">
                    {tender.description}
                  </p>

                  {/* Dates Bar */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                    <div>
                      <span className="text-slate-400 block font-bold">Published:</span>
                      <span className="font-semibold text-slate-700">{tender.publishedDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-bold">Closing Date:</span>
                      <span className="font-extrabold text-slate-900">{tender.closingDate}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectTender(tender)}
                    className="inline-flex min-h-[38px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#256B29] px-4 text-xs font-extrabold text-white hover:bg-[#1b4d1d] transition shadow-2xs cursor-pointer"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>View details</span>
                  </button>

                  <a
                    href={tender.downloadUrl}
                    download
                    className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                    title="Download document"
                  >
                    <Download className="h-3.5 w-3.5 text-[#256B29]" />
                    <span>Download</span>
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
