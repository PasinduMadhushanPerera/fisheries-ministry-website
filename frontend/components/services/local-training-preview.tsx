"use client"

import { useEffect } from "react"
import {
  FileText,
  ImageIcon,
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
} from "lucide-react"

import type { LocalTrainingProgramme } from "@/data/local-training-programmes"

interface LocalTrainingPreviewProps {
  programme: LocalTrainingProgramme | null
  onClose: () => void
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

export function LocalTrainingPreview({
  programme,
  onClose,
}: LocalTrainingPreviewProps) {
  // Lock body scroll and listen to Escape key
  useEffect(() => {
    if (!programme) return

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
  }, [programme, onClose])

  if (!programme) return null

  const FileIcon = getFileIcon(programme.fileType)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="training-preview-title"
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
                {programme.categoryLabel}
              </span>
              <span className="text-xs font-mono font-bold text-slate-300 bg-black/30 px-2 py-0.5 rounded-md border border-white/10">
                Year: {programme.year}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-white hover:text-slate-900 transition-colors cursor-pointer"
              aria-label="Close training preview"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Pure White Programme Title */}
          <div className="relative z-10 mt-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-300 flex items-center gap-1.5 mb-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Official Training Programme Notice
            </span>
            <h3 id="training-preview-title" className="text-2xl font-extrabold !text-white leading-snug tracking-tight">
              {programme.title}
            </h3>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Provider & Document Info Grid */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
              <Building2 className="h-4 w-4 text-[#256B29]" />
              <span>Offering Institution / Provider</span>
            </div>
            <p className="text-xs sm:text-sm font-extrabold text-slate-800">
              {programme.provider}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 pt-2 border-t border-slate-200">
              <div className="flex items-center gap-1.5">
                <FileIcon className="h-4 w-4 text-[#256B29]" />
                <span>Format: {programme.fileType}</span>
              </div>
              <span className="text-slate-400">•</span>
              <div>Size: {programme.fileSize}</div>
              <span className="text-slate-400">•</span>
              <div>Status: {programme.status}</div>
            </div>
          </div>

          {/* Justified Description Text */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-[#256B29]" />
              <span>Programme Description & Curriculum Scope</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify font-normal">
              {programme.description}
            </p>
          </div>

          {/* Dates & Schedule Box */}
          <div className="grid gap-3 sm:grid-cols-2 text-xs">
            {programme.publishedDate && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <CalendarDays className="h-4 w-4 text-[#256B29]" />
                  <span>Publication Date</span>
                </div>
                <span className="text-slate-600 block">{programme.publishedDate}</span>
              </div>
            )}

            {programme.applicationDeadline && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Clock className="h-4 w-4 text-[#256B29]" />
                  <span>Application Deadline</span>
                </div>
                <span className="text-slate-600 block">{programme.applicationDeadline}</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 px-6 py-4 bg-slate-50">
          <a
            href={programme.downloadUrl}
            download
            className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-[#256B29] px-5 text-xs font-extrabold text-white hover:bg-[#1b4d1d] transition shadow-2xs cursor-pointer"
          >
            <Download className="h-4 w-4 text-white" />
            <span>Download Document</span>
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
