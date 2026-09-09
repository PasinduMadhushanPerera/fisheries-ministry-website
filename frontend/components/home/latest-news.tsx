"use client"

import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  Newspaper,
  Pause,
  Play,
  Sparkles,
  Building2,
  Images,
} from "lucide-react"
import Link from "next/link"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

import { LinkButton } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { useLanguage } from "@/src/contexts/LanguageContext"
import {
  fetchNewsPageData,
  type ApiNewsArticleItem,
} from "@/lib/api/news"
import { NewsPreview } from "@/components/media/news-preview"
import type { ApiNewsSection } from "@/lib/api/home"
import { getAbsoluteMediaUrl } from "@/lib/utils"

type LatestNewsProps = {
  language?: string
  initialSection?: ApiNewsSection
}

const fallbackNewsImages = [
  "/images/home/hero-fishing-harbour.jpg",
  "/images/institutions/dfar.jpg",
  "/images/institutions/nara.jpg",
  "/images/institutions/naqda.jpg",
  "/images/institutions/cfhc.jpg",
]

export function LatestNews({
  language: propLanguage,
  initialSection,
}: LatestNewsProps) {
  const contextLanguage = useLanguage()
  const activeLanguage = propLanguage || contextLanguage?.language || "en"

  const [articles, setArticles] = useState<ApiNewsArticleItem[]>([])
  const [selectedArticle, setSelectedArticle] = useState<ApiNewsArticleItem | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const animFrameRef = useRef<number | null>(null)

  const eyebrow = initialSection?.eyebrow || "Media centre"
  const title = initialSection?.title || "Latest News"
  const description =
    initialSection?.description ||
    "Follow Ministry activities, sector developments, community programmes and official public information."
  const buttonText = initialSection?.button_text || "View all news"
  const buttonUrl = initialSection?.button_url || "/media-centre/news"

  const loadLatestNews = useCallback(async () => {
    try {
      const data = await fetchNewsPageData(activeLanguage)
      if (data && data.articles && data.articles.length > 0) {
        setArticles(data.articles.slice(0, 8))
      }
    } catch (requestError) {
      console.error("Failed to load latest news on home page:", requestError)
    } finally {
      setIsLoading(false)
    }
  }, [activeLanguage])

  // Fetch on mount, language change, and on tab focus
  useEffect(() => {
    void loadLatestNews()

    const handleWindowFocus = () => {
      void loadLatestNews()
    }
    window.addEventListener("focus", handleWindowFocus)

    return () => {
      window.removeEventListener("focus", handleWindowFocus)
    }
  }, [loadLatestNews])

  /*
   * Ultra-smooth Infinite Horizontal Marquee Carousel Auto-Scroll
   */
  useEffect(() => {
    if (isLoading || articles.length <= 1) return

    const container = scrollContainerRef.current
    if (!container) return

    let lastTime = performance.now()
    const SCROLL_SPEED_PX_PER_SEC = 28 // Slow, elegant marquee pace

    const step = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000
      lastTime = currentTime

      if (!isPaused && !isHovered && scrollContainerRef.current) {
        const el = scrollContainerRef.current
        const halfScrollWidth = el.scrollWidth / 2

        if (el.scrollLeft >= halfScrollWidth) {
          // Seamless reset without user noticing
          el.scrollLeft -= halfScrollWidth
        } else {
          el.scrollLeft += SCROLL_SPEED_PX_PER_SEC * deltaTime
        }
      }

      animFrameRef.current = requestAnimationFrame(step)
    }

    animFrameRef.current = requestAnimationFrame(step)

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [isLoading, isPaused, isHovered, articles.length])

  const scrollLeftNav = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -380, behavior: "smooth" })
    }
  }

  const scrollRightNav = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 380, behavior: "smooth" })
    }
  }

  // Duplicate items for infinite seamless looping
  const marqueeList = articles.length > 2 ? [...articles, ...articles] : articles

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
    <>
      <Section className="relative overflow-hidden bg-[#256B29]/10 py-16 sm:py-20 lg:py-24 border-y border-emerald-900/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 border border-emerald-300/80 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#256B29]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{eyebrow}</span>
              </span>

              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950">
                {title}
              </h2>

              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-700">
                {description}
              </p>
            </div>

            {/* Marquee Navigation & Pause/Play Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 rounded-2xl bg-white p-1.5 shadow-2xs border border-slate-200">
                <button
                  type="button"
                  onClick={scrollLeftNav}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                  aria-label="Scroll news marquee left"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsPaused((prev) => !prev)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                  title={isPaused ? "Resume Marquee Auto-scroll" : "Pause Marquee Auto-scroll"}
                  aria-label={isPaused ? "Play news auto-scroll" : "Pause news auto-scroll"}
                >
                  {isPaused ? <Play className="h-4 w-4 fill-current text-[#256B29]" /> : <Pause className="h-4 w-4 text-[#256B29]" />}
                </button>

                <button
                  type="button"
                  onClick={scrollRightNav}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                  aria-label="Scroll news marquee right"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <LinkButton
                href={buttonUrl}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#256B29] px-5 text-xs font-extrabold text-white shadow-xs transition hover:bg-[#1b4d1d] hover:shadow-md cursor-pointer"
              >
                <span>{buttonText}</span>
                <ArrowRight className="h-4 w-4" />
              </LinkButton>
            </div>
          </div>

          {/* Main Continuous Slow Marquee Track */}
          {isLoading ? (
            <div className="flex min-h-[340px] items-center justify-center rounded-3xl border border-dashed border-emerald-300 bg-white/60">
              <div className="flex flex-col items-center gap-3 text-slate-600">
                <LoaderCircle className="h-8 w-8 animate-spin text-[#256B29]" />
                <span className="text-xs font-bold">Loading latest news...</span>
              </div>
            </div>
          ) : marqueeList.length > 0 ? (
            <div
              ref={scrollContainerRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="flex gap-6 overflow-x-auto pb-4 pt-2 scrollbar-none"
              style={{ scrollBehavior: "auto" }}
            >
              {marqueeList.map((article, idx) => {
                const imageUrl = article.image_url || fallbackNewsImages[idx % fallbackNewsImages.length]
                const fullImageUrl = getAbsoluteMediaUrl(imageUrl)
                const photoCount = getArticlePhotoCount(article)

                return (
                  <div
                    key={`${article.id}-${idx}`}
                    onClick={() => setSelectedArticle(article)}
                    className="w-[300px] sm:w-[360px] shrink-0 cursor-pointer group"
                  >
                    <Card className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-[#256B29]/40 group-hover:shadow-xl">
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
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-white flex items-center justify-center p-1.5 border-b border-slate-100">
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
                      <div className="flex flex-1 flex-col p-5 sm:p-6 justify-between bg-white">
                        <div>
                          <h3 className="text-base sm:text-lg font-extrabold leading-snug text-slate-900 line-clamp-2 transition-colors duration-200 group-hover:text-[#256B29]">
                            {article.title}
                          </h3>

                          {article.publisher && (
                            <div className="mt-1.5 flex items-center gap-1 text-[11px] font-bold text-slate-500">
                              <Building2 className="h-3.5 w-3.5 text-[#256B29] shrink-0" />
                              <span className="truncate">{article.publisher}</span>
                            </div>
                          )}

                          <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3 text-justify">
                            {article.summary}
                          </p>
                        </div>

                        {/* Bottom Action Button & Published Date */}
                        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                          <span className="inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-xl bg-[#256B29] px-4 text-xs font-extrabold text-white shadow-2xs transition group-hover:bg-[#1b4d1d]">
                            <span>Read Story</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                          </span>

                          {/* Published Date in place of "Click to open" */}
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                            <CalendarDays className="h-3.5 w-3.5 text-[#256B29] shrink-0" />
                            <span>{article.published_date || "Recent"}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-8 text-center">
              <Newspaper className="mx-auto h-8 w-8 text-slate-400 mb-2" />
              <p className="text-xs sm:text-sm font-semibold text-slate-600">
                No active news updates published yet.
              </p>
            </div>
          )}
        </div>
      </Section>

      {/* Shared Popup Modal for Home Page News Cards */}
      {selectedArticle && (
        <NewsPreview
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </>
  )
}