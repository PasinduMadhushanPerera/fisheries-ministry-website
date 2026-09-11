"use client"

import { AlertCircle, ArrowRight, CalendarDays, Clock, Download, FileText, Newspaper } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Card } from "@/components/ui/card"
import { stripHtml } from "@/lib/utils"
import type { ApiNoticeItem } from "@/lib/api/notices"

interface NoticesLibraryProps {
  notices: ApiNoticeItem[]
  catalogueBadge?: string
  libraryTitle?: string
  onSelectNotice: (notice: ApiNoticeItem) => void
  onClearFilters: () => void
}

export function NoticesLibrary({
  notices,
  catalogueBadge = "Notice Board Directory",
  libraryTitle = "All Official Notices & Public Gazettes",
  onSelectNotice,
  onClearFilters,
}: NoticesLibraryProps) {
  return (
    <section aria-label="Notices directory" className="py-12 bg-slate-50/60">
      <Container>
        {/* Section Heading */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 border border-emerald-300 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#14532d] mb-2.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>{catalogueBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            {libraryTitle}
          </h2>
        </div>

        {/* Empty State */}
        {notices.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100/70 text-[#256B29] mb-4">
              <Newspaper className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No notices found</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              There are no notices matching your search criteria. Try adjusting your filters or search keywords.
            </p>
            <button
              type="button"
              onClick={onClearFilters}
              className="mt-6 inline-flex min-h-10 items-center justify-center rounded-xl bg-[#256B29] px-5 text-xs font-bold text-white transition hover:bg-[#1b4d1d] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Notices Card Grid */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {notices.map((notice) => {
              const isUrgent = notice.is_urgent || notice.priority === "urgent"
              const isHigh = notice.priority === "high"

              return (
                <Card
                  key={notice.id}
                  interactive
                  onClick={() => onSelectNotice(notice)}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl cursor-pointer"
                >
                  <div className="space-y-4">
                    {/* Top Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-md bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11px] font-black text-slate-800 tracking-wider">
                        {notice.notice_number || "MF/NOT/2026"}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {isUrgent ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 border border-rose-300 px-2.5 py-0.5 text-[10px] font-black uppercase text-rose-700">
                            <AlertCircle className="h-3 w-3" />
                            Urgent
                          </span>
                        ) : isHigh ? (
                          <span className="inline-flex items-center rounded-full bg-amber-100 border border-amber-300 px-2.5 py-0.5 text-[10px] font-black uppercase text-amber-800">
                            High Priority
                          </span>
                        ) : null}

                        <span className="rounded-full bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-[#14532d]">
                          {notice.category_label || "Notice"}
                        </span>
                      </div>
                    </div>

                    {/* Department */}
                    <p className="text-[11px] font-bold text-slate-500 line-clamp-1">
                      {notice.department || "Ministry of Fisheries"}
                    </p>

                    {/* Notice Title */}
                    <h3 className="text-base font-extrabold leading-snug text-slate-900 line-clamp-2 transition-colors group-hover:text-[#256B29]">
                      {stripHtml(notice.title)}
                    </h3>

                    {/* Notice Summary */}
                    <p className="text-xs leading-relaxed text-slate-600 line-clamp-3">
                      {stripHtml(notice.summary)}
                    </p>
                  </div>

                  {/* Bottom Footer Section */}
                  <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                    {/* Dates */}
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                        <span>{notice.published_date || "Recent"}</span>
                      </div>

                      {notice.expiry_date && (
                        <div className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          <Clock className="h-3 w-3" />
                          <span>Closes: {notice.expiry_date}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <span className="inline-flex min-h-[34px] items-center justify-center gap-1.5 rounded-xl bg-[#256B29] px-4 text-xs font-extrabold text-white shadow-2xs transition group-hover:bg-[#1b4d1d]">
                        <span>View Notice</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>

                      {notice.download_url && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                          <FileText className="h-3.5 w-3.5" />
                          <span>{notice.file_type || "PDF"}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </Container>
    </section>
  )
}
