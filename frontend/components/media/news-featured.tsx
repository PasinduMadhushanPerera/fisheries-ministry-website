"use client"

import { CalendarDays, ArrowRight, Sparkles, Building2, FileText, Star } from "lucide-react"
import { Container } from "@/components/ui/container"
import type { ApiNewsArticleItem } from "@/lib/api/news"
import { getAbsoluteMediaUrl } from "@/lib/utils"

interface NewsFeaturedProps {
  featuredArticle: ApiNewsArticleItem | null
  featuredBadge?: string
  onSelectArticle: (article: ApiNewsArticleItem) => void
}

export function NewsFeatured({
  featuredArticle,
  featuredBadge = "Latest Featured News",
  onSelectArticle,
}: NewsFeaturedProps) {
  if (!featuredArticle) return null

  const imageUrl = featuredArticle.image_url || "/images/home/hero-fishing-harbour.jpg"
  const fullImageUrl = getAbsoluteMediaUrl(imageUrl)

  return (
    <section aria-labelledby="featured-story-heading" className="bg-slate-50/70 py-10 sm:py-14 border-b border-slate-200/80">
      <Container>
        {/* Section Top Header Pill */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 border border-emerald-300/80 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#256B29]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{featuredBadge}</span>
            </span>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            Top Announcement
          </span>
        </div>

        {/* Featured Main Card */}
        <article className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70 transition-all duration-300 hover:shadow-2xl hover:border-emerald-300/80">
          {/* Top Emerald Accent Strip */}
          <div className="h-1.5 w-full bg-[#256B29]" />

          <div className="grid gap-0 lg:grid-cols-12 items-stretch">
            {/* Left Column: Image Wrapper (5 cols) */}
            <div
              onClick={() => onSelectArticle(featuredArticle)}
              className="relative min-h-[300px] sm:min-h-[400px] lg:col-span-5 overflow-hidden bg-white flex items-center justify-center p-4 cursor-pointer border-b lg:border-b-0 lg:border-r border-slate-100 group/img"
            >
              {/* Soft Ambient Blurred Background */}
              <img
                src={fullImageUrl}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-20 scale-110 pointer-events-none transition-opacity duration-500 group-hover/img:opacity-30"
              />

              {/* Uncropped Clear Foreground Image */}
              <div className="relative z-10 p-2 w-full flex items-center justify-center">
                <img
                  src={fullImageUrl}
                  alt={featuredArticle.image_alt || featuredArticle.title}
                  className="relative z-10 max-h-[340px] lg:max-h-[400px] w-auto max-w-full object-contain mx-auto rounded-2xl shadow-lg ring-1 ring-slate-900/5 transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              {/* Featured Ribbon Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200/90 bg-amber-50/90 backdrop-blur-md px-3 py-1 text-[11px] font-black uppercase tracking-wider text-amber-800 shadow-xs">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                  Primary Feature
                </span>
              </div>
            </div>

            {/* Right Column: Content & Action (7 cols) */}
            <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10 lg:col-span-7 bg-white">
              <div>
                {/* Micro Badges & Date Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-lg bg-[#256B29] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-xs">
                      {featuredArticle.category_label || "Ministry News"}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#256B29]">
                      <Sparkles className="h-3 w-3 text-emerald-600" />
                      Official Release
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">
                    <CalendarDays className="h-3.5 w-3.5 text-[#256B29]" />
                    <span>{featuredArticle.published_date || "Recent"}</span>
                  </div>
                </div>

                {/* Article Title */}
                <h2
                  id="featured-story-heading"
                  onClick={() => onSelectArticle(featuredArticle)}
                  className="mt-5 text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-snug cursor-pointer group-hover:text-[#256B29] transition-colors"
                >
                  {featuredArticle.title}
                </h2>

                {/* Publisher / Organization line */}
                {featuredArticle.publisher && (
                  <div className="mt-3 flex items-center gap-2 text-xs font-bold text-slate-600 bg-emerald-50/50 w-fit px-3 py-1 rounded-lg border border-emerald-100/60">
                    <Building2 className="h-3.5 w-3.5 text-[#256B29] shrink-0" />
                    <span>{featuredArticle.publisher}</span>
                  </div>
                )}

                {/* Excerpt / Summary */}
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 line-clamp-3 sm:line-clamp-4 text-justify font-normal">
                  {featuredArticle.summary}
                </p>
              </div>

              {/* Bottom Actions Bar */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => onSelectArticle(featuredArticle)}
                  className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#256B29] to-emerald-700 px-7 text-xs font-extrabold uppercase tracking-wider text-white shadow-md shadow-emerald-900/15 transition-all duration-300 hover:from-[#1b4d1d] hover:to-[#256B29] hover:shadow-lg hover:shadow-emerald-900/25 hover:scale-[1.01] active:scale-[0.99] cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 group/btn"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>

                {featuredArticle.attachment_title ? (
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-50 border border-slate-200/80 px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs">
                    <FileText className="h-4 w-4 text-[#256B29]" />
                    <span>Document Attached</span>
                  </span>
                ) : (
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-400">
                    Ministry News & Media
                  </span>
                )}
              </div>
            </div>
          </div>
        </article>
      </Container>
    </section>
  )
}
