"use client"

import { ArrowRight, CalendarDays, Download, MapPin, Sparkles } from "lucide-react"
import { Container } from "@/components/ui/container"
import { stripHtml } from "@/lib/utils"
import type { ApiPressReleaseItem } from "@/lib/api/press-releases"

interface PressReleasesFeaturedProps {
  featuredRelease: ApiPressReleaseItem
  featuredBadge?: string
  onSelectRelease: (release: ApiPressReleaseItem) => void
}

export function PressReleasesFeatured({
  featuredRelease,
  featuredBadge = "Lead Press Briefing",
  onSelectRelease,
}: PressReleasesFeaturedProps) {
  return (
    <section aria-label="Featured press release" className="py-8 bg-gradient-to-b from-emerald-50/40 to-white">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-300/90 bg-gradient-to-br from-emerald-600/10 via-emerald-50/30 to-teal-50/50 p-6 sm:p-8 lg:p-10 shadow-lg">
          {/* Subtle Background Glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1 max-w-4xl space-y-4">
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#256B29] text-white px-3.5 py-1 text-xs font-black uppercase tracking-wider shadow-xs">
                  <Sparkles className="h-3.5 w-3.5 fill-current" />
                  <span>{featuredBadge}</span>
                </span>

                <span className="inline-flex items-center rounded-full bg-white/90 border border-slate-200 px-3 py-1 text-xs font-black text-slate-800">
                  {featuredRelease.release_number || "MF/PR/2026"}
                </span>

                <span className="inline-flex items-center rounded-full bg-emerald-100/90 border border-emerald-300 px-3 py-1 text-xs font-extrabold text-[#14532d]">
                  {featuredRelease.category_label || "Press Release"}
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight text-slate-950 tracking-tight">
                {stripHtml(featuredRelease.title)}
              </h2>

              {/* Dateline & Publisher */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm font-bold text-slate-600">
                <div className="flex items-center gap-1 text-slate-900">
                  <MapPin className="h-3.5 w-3.5 text-[#256B29]" />
                  <span>{featuredRelease.location || "Colombo, Sri Lanka"}</span>
                </div>
                <span>•</span>
                <span>{featuredRelease.publisher || "Ministry of Fisheries"}</span>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl line-clamp-3">
                {stripHtml(featuredRelease.summary)}
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs font-bold text-slate-600">
                <div className="flex items-center gap-1.5 text-slate-800">
                  <CalendarDays className="h-4 w-4 text-[#256B29]" />
                  <span>Published: {featuredRelease.published_date || "Recent"}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onSelectRelease(featuredRelease)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#256B29] px-6 text-xs sm:text-sm font-black text-white transition hover:bg-[#1b4d1d] shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>Read Statement</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              {featuredRelease.download_url && (
                <a
                  href={featuredRelease.download_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-2xs"
                >
                  <Download className="h-4 w-4 text-[#256B29]" />
                  <span>Download Statement</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
