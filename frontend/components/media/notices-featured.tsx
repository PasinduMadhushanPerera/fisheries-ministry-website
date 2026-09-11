"use client"

import { AlertTriangle, ArrowRight, CalendarDays, Clock, Download, FileText, Sparkles } from "lucide-react"
import { Container } from "@/components/ui/container"
import { stripHtml } from "@/lib/utils"
import type { ApiNoticeItem } from "@/lib/api/notices"

interface NoticesFeaturedProps {
  featuredNotice: ApiNoticeItem
  featuredBadge?: string
  onSelectNotice: (notice: ApiNoticeItem) => void
}

export function NoticesFeatured({
  featuredNotice,
  featuredBadge = "Urgent / Important Notice",
  onSelectNotice,
}: NoticesFeaturedProps) {
  return (
    <section aria-label="Featured notice" className="py-8 bg-gradient-to-b from-emerald-50/40 to-white">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border-2 border-amber-300/80 bg-gradient-to-br from-amber-500/10 via-amber-50/30 to-emerald-50/50 p-6 sm:p-8 lg:p-10 shadow-lg">
          {/* Subtle Background Glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1 max-w-4xl space-y-4">
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 text-white px-3.5 py-1 text-xs font-black uppercase tracking-wider shadow-xs">
                  <AlertTriangle className="h-3.5 w-3.5 fill-current" />
                  <span>{featuredBadge}</span>
                </span>

                <span className="inline-flex items-center rounded-full bg-white/90 border border-slate-200 px-3 py-1 text-xs font-black text-slate-800">
                  {featuredNotice.notice_number || "MF/NOT/2026"}
                </span>

                <span className="inline-flex items-center rounded-full bg-emerald-100/90 border border-emerald-300 px-3 py-1 text-xs font-extrabold text-[#14532d]">
                  {featuredNotice.category_label || "Ministry Circular"}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight text-slate-950 tracking-tight">
                {stripHtml(featuredNotice.title)}
              </h2>

              {/* Department */}
              <p className="text-xs sm:text-sm font-bold text-slate-600">
                Issued by: <span className="text-slate-900">{featuredNotice.department}</span>
              </p>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl line-clamp-3">
                {stripHtml(featuredNotice.summary)}
              </p>

              {/* Metadata Dates */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs font-bold text-slate-600">
                <div className="flex items-center gap-1.5 text-slate-800">
                  <CalendarDays className="h-4 w-4 text-[#256B29]" />
                  <span>Published: {featuredNotice.published_date || "Recent"}</span>
                </div>

                {featuredNotice.expiry_date && (
                  <div className="flex items-center gap-1.5 text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-md">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <span>Deadline: {featuredNotice.expiry_date}</span>
                  </div>
                )}

                {featuredNotice.download_url && (
                  <div className="flex items-center gap-1 text-emerald-700 font-extrabold">
                    <FileText className="h-4 w-4" />
                    <span>Attachment Available ({featuredNotice.file_type || "PDF"})</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onSelectNotice(featuredNotice)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#256B29] px-6 text-xs sm:text-sm font-black text-white transition hover:bg-[#1b4d1d] shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>Read Full Notice</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              {featuredNotice.download_url && (
                <a
                  href={featuredNotice.download_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-2xs"
                >
                  <Download className="h-4 w-4 text-[#256B29]" />
                  <span>Download Document</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
