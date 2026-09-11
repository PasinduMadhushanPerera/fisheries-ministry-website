"use client"

import { useState, useMemo } from "react"
import { CalendarDays, ArrowRight, Building2, Images } from "lucide-react"
import { Container } from "@/components/ui/container"
import type { ApiNewsArticleItem } from "@/lib/api/news"
import { getAbsoluteMediaUrl } from "@/lib/utils"

interface NewsLibraryProps {
  articles: ApiNewsArticleItem[]
  categories?: { key: string; label: string }[]
  libraryTitle?: string
  catalogueBadge?: string
  onClearFilters?: () => void
  onSelectArticle: (article: ApiNewsArticleItem) => void
}

export function NewsLibrary({
  articles = [],
  categories = [],
  libraryTitle = "All Ministry News & Releases",
  catalogueBadge,
  onClearFilters,
  onSelectArticle,
}: NewsLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredArticles = useMemo(() => {
    if (selectedCategory === "all") return articles
    return articles.filter(
      (article) =>
        article.category === selectedCategory ||
        article.category_label?.toLowerCase() === selectedCategory.toLowerCase()
    )
  }, [articles, selectedCategory])

  // Helper to count photos in article
  const getArticlePhotoCount = (article: ApiNewsArticleItem) => {
    let count = article.image_url ? 1 : 0
    if (article.content_blocks) {
      article.content_blocks.forEach((b) => {
        if (b.type === "image" || b.block_type === "image") {
          if (b.images && b.images.length > 0) {
            count += b.images.length
          } else if (b.image_url || b.media_url) {
            count += 1
          }
        }
      })
    }
    return count
  }

  return (
    <section aria-label="News Archive Library" className="py-12 sm:py-16 bg-white">
      <Container>
        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
              {libraryTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Showing {filteredArticles.length} news articles and official media updates.
            </p>
          </div>

          {/* Category Pills */}
          {categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.key
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                      isActive
                        ? "bg-[#256B29] text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                    }`}
                  >
                    {cat.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* News Cards Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article) => {
              const imageUrl = article.image_url || "/images/home/hero-fishing-harbour.jpg"
              const fullImageUrl = getAbsoluteMediaUrl(imageUrl)
              const photoCount = getArticlePhotoCount(article)

              return (
                <article
                  key={article.id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xs transition duration-300 hover:-translate-y-1 hover:border-[#256B29]/40 hover:shadow-xl"
                >
                  {/* 1. VERY TOP HEADER BAR: Micro Category Badges & Photo Count */}
                  <div className="flex flex-wrap items-center justify-between gap-1.5 bg-slate-50/90 border-b border-slate-100 px-3.5 py-1.5 text-[9px] font-bold">
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="inline-flex rounded bg-[#256B29] px-1.5 py-[1px] text-[8.5px] font-black uppercase tracking-wider text-white">
                        {article.category_label || "Ministry News"}
                      </span>

                      {article.is_featured && (
                        <span className="inline-flex rounded bg-amber-500 px-1.5 py-[1px] text-[8.5px] font-black uppercase tracking-wider text-white">
                          Featured
                        </span>
                      )}
                    </div>

                    {photoCount > 1 && (
                      <span className="inline-flex items-center gap-0.5 rounded bg-emerald-100/90 border border-emerald-200/90 px-1.5 py-[1px] text-[8.5px] font-extrabold text-[#256B29]">
                        <Images className="h-2.5 w-2.5" />
                        <span>{photoCount} Photos</span>
                      </span>
                    )}
                  </div>

                  {/* 2. COVER IMAGE CONTAINER (UNDER TAGS, 100% UNCROPPED & CRYSTAL CLEAR) */}
                  <div
                    onClick={() => onSelectArticle(article)}
                    className="relative aspect-[16/10] w-full overflow-hidden bg-white flex items-center justify-center p-1.5 cursor-pointer border-b border-slate-100"
                  >
                    {/* Ambient Blurred Background Fill */}
                    <img
                      src={fullImageUrl}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover blur-xl opacity-15 scale-110 pointer-events-none"
                    />

                    {/* 100% Complete & Uncropped Foreground Image */}
                    <img
                      src={fullImageUrl}
                      alt={article.image_alt || article.title}
                      className="relative z-10 max-h-full w-auto max-w-full object-contain mx-auto rounded-lg shadow-md transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* 3. CARD DETAILS & ACTION BUTTON (UNDER IMAGE) */}
                  <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                    <div>
                      {/* Title */}
                      <h4
                        onClick={() => onSelectArticle(article)}
                        className="text-base sm:text-lg font-extrabold text-slate-950 leading-snug line-clamp-2 cursor-pointer group-hover:text-[#256B29] transition-colors"
                      >
                        {article.title}
                      </h4>

                      {/* Publisher if available */}
                      {article.publisher && (
                        <div className="mt-1.5 flex items-center gap-1 text-[11px] font-bold text-slate-500">
                          <Building2 className="h-3.5 w-3.5 text-[#256B29] shrink-0" />
                          <span className="truncate">{article.publisher}</span>
                        </div>
                      )}

                      {/* Excerpt */}
                      <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3 text-justify">
                        {article.summary}
                      </p>
                    </div>

                    {/* Footer Read Action & Published Date */}
                    <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => onSelectArticle(article)}
                        className="inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-xl bg-[#256B29] px-4 text-xs font-extrabold text-white shadow-2xs transition group-hover:bg-[#1b4d1d] cursor-pointer"
                      >
                        <span>Read Story</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </button>

                      {/* Published Date in place of "Click to preview" */}
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                        <CalendarDays className="h-3.5 w-3.5 text-[#256B29] shrink-0" />
                        <span>{article.published_date || "Recent"}</span>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center">
            <p className="text-sm font-bold text-slate-600">
              No news articles found under this category filter.
            </p>
          </div>
        )}
      </Container>
    </section>
  )
}
