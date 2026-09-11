"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Building2,
  CalendarDays,
  Clock,
  Download,
  FileText,
  Hash,
  X,
} from "lucide-react"
import { stripHtml } from "@/lib/utils"
import type { ApiNoticeItem } from "@/lib/api/notices"

interface NoticesPreviewProps {
  notice: ApiNoticeItem | null
  onClose: () => void
}

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ??
  "https://pasiperera.pythonanywhere.com/api/v1"
).replace(/\/$/, "")

function getAbsoluteFileUrl(fileUrl: string): string {
  if (!fileUrl) return ""
  if (fileUrl.startsWith("http://") || fileUrl.startsWith("https://")) {
    return fileUrl
  }
  try {
    const backendOrigin = new URL(API_BASE_URL).origin
    return new URL(fileUrl, backendOrigin).toString()
  } catch {
    return fileUrl
  }
}

export function NoticesPreview({ notice, onClose }: NoticesPreviewProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!notice) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    window.setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 0)

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [notice, onClose])

  if (!notice) return null

  const isUrgent = notice.is_urgent || notice.priority === "urgent"
  const isHigh = notice.priority === "high"

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="notice-preview-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 p-4 sm:p-6 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Dark Ocean Header */}
        <div className="flex shrink-0 flex-col gap-3 border-b border-slate-200 px-6 sm:px-8 py-6 bg-[linear-gradient(135deg,#041c22_0%,#093835_55%,#0c4e48_100%)] text-white relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-emerald-400/10 blur-xl"
          />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-300 shadow-xs">
                {notice.category_label || "Official Notice"}
              </span>

              <span className="rounded-md bg-white/15 border border-white/20 px-2.5 py-0.5 text-xs font-mono font-bold text-white">
                {notice.notice_number || "MF/NOT/2026"}
              </span>

              {isUrgent ? (
                <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/25 border border-rose-400/40 px-2.5 py-0.5 text-xs font-extrabold text-rose-300">
                  <AlertCircle className="h-3 w-3" />
                  Urgent Notice
                </span>
              ) : isHigh ? (
                <span className="inline-flex items-center rounded-md bg-amber-500/25 border border-amber-400/40 px-2.5 py-0.5 text-xs font-extrabold text-amber-300">
                  High Priority
                </span>
              ) : null}
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-white hover:text-slate-900 transition-colors cursor-pointer"
              aria-label="Close notice preview"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Pure White Notice Title */}
          <div className="relative z-10 mt-2">
            <h3
              id="notice-preview-title"
              className="text-xl sm:text-2xl font-extrabold !text-white leading-snug tracking-tight"
            >
              {stripHtml(notice.title)}
            </h3>

            <div className="mt-3 pt-2 border-t border-white/15 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-bold text-emerald-200">
              <div className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-emerald-300" />
                <span>{notice.department || "Ministry of Fisheries"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-emerald-300" />
                <span>Published: {notice.published_date || "Recent"}</span>
              </div>
              {notice.expiry_date && (
                <div className="flex items-center gap-1.5 text-amber-300">
                  <Clock className="h-4 w-4 text-amber-400" />
                  <span>Closing Date: {notice.expiry_date}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Excerpt */}
          <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200/80 p-4 sm:p-5">
            <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed italic">
              &ldquo;{stripHtml(notice.summary)}&rdquo;
            </p>
          </div>

          {/* Rich Content */}
          {notice.content && (
            <div
              className="prose prose-slate max-w-none prose-p:text-xs sm:prose-p:text-sm prose-p:leading-relaxed prose-p:text-slate-700 prose-headings:font-extrabold prose-headings:text-slate-900 prose-a:text-[#256B29] prose-a:font-bold prose-ul:text-xs sm:prose-ul:text-sm"
              dangerouslySetInnerHTML={{ __html: notice.content }}
            />
          )}

          {/* Official Attachment / Document Download */}
          {notice.download_url && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 mt-6">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-[#256B29]" />
                <span>Official Circular / Gazette Document</span>
              </h4>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-[#256B29]">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {notice.attachment_title || `${notice.notice_number} Official Document`}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {notice.file_type || "PDF"} Document • {notice.file_size || "Official"}
                    </p>
                  </div>
                </div>

                <a
                  href={getAbsoluteFileUrl(notice.download_url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#256B29] px-4 text-xs font-bold text-white transition hover:bg-[#1b4d1d]"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download File</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 px-6 py-4 bg-slate-50">
          <Link
            href={`/media-centre/notices/${notice.slug}`}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
          >
            <span>View Full Page</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#256B29]" />
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[40px] items-center justify-center rounded-xl bg-[#256B29] px-6 text-xs font-extrabold text-white hover:bg-[#1b4d1d] transition shadow-xs cursor-pointer"
          >
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  )
}
