"use client"

import { useEffect } from "react"
import {
  FileText,
  FileType2,
  FileSpreadsheet,
  FileArchive,
  Files,
  Download,
  X,
  Sparkles,
  Building2,
  CalendarDays,
  Clock,
  MapPin,
  Coins,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react"

import type { ProcurementNotice } from "@/data/procurement-tenders"

interface ProcurementPreviewProps {
  tender: ProcurementNotice | null
  onClose: () => void
}

function getFileIcon(fileType: string) {
  switch (fileType) {
    case "PDF":
      return FileText
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

export function ProcurementPreview({
  tender,
  onClose,
}: ProcurementPreviewProps) {
  // Lock body scroll and listen to Escape key
  useEffect(() => {
    if (!tender) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [tender, onClose])

  if (!tender) return null

  const FileIcon = getFileIcon(tender.fileType)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="procurement-preview-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 p-4 sm:p-6 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl max-h-[88vh] flex flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Dark Ocean Header with Pure White Title */}
        <div className="flex shrink-0 flex-col gap-3 border-b border-slate-200 px-6 sm:px-8 py-6 bg-[linear-gradient(135deg,#041c22_0%,#093835_55%,#0c4e48_100%)] text-white relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/10 blur-xl"
          />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-1 text-xs font-extrabold text-emerald-300 shadow-xs">
                REF: {tender.refNumber}
              </span>
              <span className="text-xs font-mono font-bold text-slate-300 bg-black/30 px-2 py-0.5 rounded-md border border-white/10">
                Year: {tender.year}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-white hover:text-slate-900 transition-colors cursor-pointer"
              aria-label="Close tender preview"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Pure White Tender Title */}
          <div className="relative z-10 mt-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-300 flex items-center gap-1.5 mb-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Official Government Procurement Notice
            </span>
            <h3 id="procurement-preview-title" className="text-2xl font-extrabold !text-white leading-snug tracking-tight text-justify">
              {tender.title}
            </h3>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Publisher & Tender Status Box */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
                <Building2 className="h-4 w-4 text-[#256B29]" />
                <span>Issuing Authority / Publisher</span>
              </div>
              <span className="rounded-md bg-emerald-100 text-[#256B29] border border-emerald-300 px-2 py-0.5 text-[11px] font-extrabold">
                {tender.status}
              </span>
            </div>

            <p className="text-xs sm:text-sm font-extrabold text-slate-800">
              {tender.publisher}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 pt-2 border-t border-slate-200">
              <div className="flex items-center gap-1.5">
                <FileIcon className="h-4 w-4 text-[#256B29]" />
                <span>Format: {tender.fileType}</span>
              </div>
              <span className="text-slate-400">•</span>
              <div>Size: {tender.fileSize}</div>
              <span className="text-slate-400">•</span>
              <div>Category: {tender.categoryLabel}</div>
            </div>
          </div>

          {/* Detailed Scope */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-[#256B29]" />
              <span>Project Scope & Specifications</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify font-normal">
              {tender.description}
            </p>

            {tender.detailedScope && tender.detailedScope.length > 0 && (
              <div className="space-y-2 pt-2">
                {tender.detailedScope.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-xs text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-[#256B29] shrink-0 mt-0.5" />
                    <span className="font-semibold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Financial & Eligibility Requirements */}
          <div className="grid gap-3 sm:grid-cols-2 text-xs">
            {tender.tenderFee && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Coins className="h-4 w-4 text-[#256B29]" />
                  <span>Tender Document Fee</span>
                </div>
                <span className="text-slate-700 font-semibold block">{tender.tenderFee}</span>
              </div>
            )}

            {tender.bidSecurity && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <ShieldCheck className="h-4 w-4 text-[#256B29]" />
                  <span>Bid Security Guarantee</span>
                </div>
                <span className="text-slate-700 font-semibold block">{tender.bidSecurity}</span>
              </div>
            )}
          </div>

          {/* Submission Address & Dates */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3 text-xs">
            <div className="flex items-center gap-2 font-extrabold text-slate-900">
              <MapPin className="h-4 w-4 text-[#256B29]" />
              <span>Submission Address & Deadlines</span>
            </div>
            <p className="text-slate-700 text-justify">
              <span className="font-bold text-slate-900">Address:</span> {tender.submissionAddress}
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
              <div>
                <span className="text-slate-500 font-bold block">Publishing Date:</span>
                <span className="font-semibold text-slate-800">{tender.publishedDate}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block">Closing Deadline:</span>
                <span className="font-extrabold text-slate-900">{tender.closingDate}</span>
              </div>
            </div>
            <p className="text-slate-600 text-justify pt-1">
              <span className="font-bold text-slate-900">Eligibility:</span> {tender.eligibility}
            </p>
            <p className="text-slate-600 text-justify">
              <span className="font-bold text-slate-900">Contact:</span> {tender.contactInfo}
            </p>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 px-6 py-4 bg-slate-50">
          <a
            href={tender.downloadUrl}
            download
            className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-[#256B29] px-5 text-xs font-extrabold text-white hover:bg-[#1b4d1d] transition shadow-2xs cursor-pointer"
          >
            <Download className="h-4 w-4 text-white" />
            <span>Download Bidding Document</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  )
}
