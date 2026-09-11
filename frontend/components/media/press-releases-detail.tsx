"use client"

import Link from "next/link"
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Download,
  FileText,
  MapPin,
  Printer,
  Share2,
  Sparkles,
} from "lucide-react"
import { Container } from "@/components/ui/container"
import { stripHtml } from "@/lib/utils"
import type { ApiPressReleaseItem } from "@/lib/api/press-releases"

interface PressReleaseDetailContentProps {
  release: ApiPressReleaseItem
}

export function PressReleaseDetailContent({ release }: PressReleaseDetailContentProps) {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: release.title,
          text: release.summary,
          url: window.location.href,
        })
      } catch {
        // Ignored
      }
    }
  }

  return (
    <article className="py-12 bg-slate-50/50 min-h-screen">
      <Container>
        {/* Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/media-centre/press-releases"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#256B29] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Press Releases</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Main Content Box */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          {/* Dark Ocean Header */}
          <div className="bg-[linear-gradient(135deg,#041c22_0%,#093835_55%,#0c4e48_100%)] p-6 sm:p-10 text-white relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-md bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                  {release.category_label || "Official Statement"}
                </span>

                <span className="rounded-md bg-white/15 border border-white/20 px-2.5 py-0.5 text-xs font-mono font-bold text-white">
                  {release.release_number || "MF/PR/2026"}
                </span>

                {release.is_featured && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/25 border border-amber-400/40 px-2.5 py-0.5 text-xs font-extrabold text-amber-300">
                    <Sparkles className="h-3 w-3" />
                    Lead Press Briefing
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold !text-white leading-tight tracking-tight max-w-4xl">
                {stripHtml(release.title)}
              </h1>

              <div className="pt-3 border-t border-white/15 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-bold text-emerald-200">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-emerald-300" />
                  <span>{release.location || "Colombo, Sri Lanka"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-emerald-300" />
                  <span>{release.publisher || "Ministry Media Unit"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-emerald-300" />
                  <span>Published: {release.published_date || "Recent"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Excerpt */}
            <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200/80 p-5 sm:p-6">
              <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed italic">
                &ldquo;{stripHtml(release.summary)}&rdquo;
              </p>
            </div>

            {/* Rich Content */}
            {release.content && (
              <div
                className="prose prose-slate max-w-none prose-p:text-sm sm:prose-p:text-base prose-p:leading-relaxed prose-p:text-slate-700 prose-headings:font-extrabold prose-headings:text-slate-900 prose-a:text-[#256B29] prose-a:font-bold prose-ul:text-sm sm:prose-ul:text-base"
                dangerouslySetInnerHTML={{ __html: release.content }}
              />
            )}

            {/* Download Attachment */}
            {release.download_url && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-[#256B29]" />
                  <span>Official Signed Press Release Statement</span>
                </h3>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-[#256B29]">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {release.attachment_title || `${release.release_number} Official Statement`}
                      </p>
                      <p className="text-xs text-slate-500 font-medium">
                        {release.file_type || "PDF"} Document • {release.file_size || "Official Release"}
                      </p>
                    </div>
                  </div>

                  <a
                    href={release.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#256B29] px-6 text-xs font-bold text-white transition hover:bg-[#1b4d1d] shadow-2xs"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download File</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </article>
  )
}
