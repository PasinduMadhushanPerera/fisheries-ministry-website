"use client"

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  LoaderCircle,
  Newspaper,
  Pause,
  Play,
  Sparkles,
  X,
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
import { SectionTitle } from "@/components/ui/section-title"
import { stripHtml } from "@/lib/utils"
import {
  formatNewsDate,
  getLatestNews,
  getNewsImageAlt,
  getNewsImageUrl,
  type LanguageCode,
  type NewsArticle,
} from "@/src/lib/news"
import type { ApiNewsSection } from "@/lib/api/home"

type LatestNewsProps = {
  language?: LanguageCode
  initialSection?: ApiNewsSection
}

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:8000/api/v1"
).replace(/\/$/, "")

function getAbsoluteFileUrl(fileUrl: string): string {
  if (
    fileUrl.startsWith("http://") ||
    fileUrl.startsWith("https://")
  ) {
    return fileUrl
  }

  try {
    const backendOrigin = new URL(API_BASE_URL).origin
    return new URL(fileUrl, backendOrigin).toString()
  } catch {
    return fileUrl
  }
}

function getFileType(fileUrl: string): string {
  const cleanUrl = fileUrl.split("?")[0]
  const extension = cleanUrl
    .split(".")
    .pop()
    ?.toUpperCase()

  if (extension && extension.length <= 5) {
    return `${extension} document`
  }

  return "Document"
}

// Fallback images for attractive card visuals if backend doesn't have custom upload
const fallbackNewsImages = [
  "/images/institutions/dfar.jpg",
  "/images/institutions/nara.jpg",
  "/images/institutions/naqda.jpg",
  "/images/institutions/cfhc.jpg",
  "/images/institutions/cfc.jpg",
]

export function LatestNews({
  language = "en",
  initialSection,
}: LatestNewsProps) {
  const [newsItems, setNewsItems] = useState<NewsArticle[]>([])
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocusedElement = useRef<HTMLElement | null>(null)
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null)

  const count = initialSection?.max_articles || 5
  const eyebrow = initialSection?.eyebrow || "Media centre"
  const title = initialSection?.title || "Latest News"
  const description =
    initialSection?.description ||
    "Follow Ministry activities, sector developments, community programmes and official public information."
  const buttonText = initialSection?.button_text || "View all news"
  const buttonUrl = initialSection?.button_url || "/media-centre/news"

  const loadLatestNews = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    // Check if custom home news cards are configured in admin
    if (initialSection?.cards && initialSection.cards.length > 0) {
      const customItems: NewsArticle[] = initialSection.cards.map((card, idx) => ({
        id: card.id,
        category: {
          id: idx + 1,
          name: card.category || "Ministry news",
          slug: "ministry-news",
        },
        status: "published",
        priority: "normal",
        is_featured: card.is_featured,
        hero_image: card.image_url || fallbackNewsImages[idx % fallbackNewsImages.length],
        hero_image_url: card.image_url || fallbackNewsImages[idx % fallbackNewsImages.length],
        published_at: card.published_date || new Date().toISOString(),
        expires_at: null,
        title: card.title,
        slug: `news-${card.id}`,
        summary: card.summary,
        content: card.content,
        image_alt_text: card.image_alt || "News illustration",
        seo_title: card.title,
        seo_description: card.summary,
        attachments: [],
        created_at: card.published_date || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }))
      setNewsItems(customItems)
      setIsLoading(false)
      return
    }

    try {
      const latestNews = await getLatestNews(language, count)
      setNewsItems(latestNews)
    } catch (requestError) {
      console.error("Failed to load latest news:", requestError)
      setNewsItems([])
      setError(
        "Latest Ministry news is temporarily unavailable. Please visit the news page for official updates."
      )
    } finally {
      setIsLoading(false)
    }
  }, [language, count, initialSection])

  useEffect(() => {
    void loadLatestNews()
  }, [loadLatestNews])

  /*
   * Smooth slow-moving horizontal marquee animation (Continuous Auto-Scroll)
   */
  useEffect(() => {
    if (isLoading || newsItems.length <= 1) return

    const container = scrollContainerRef.current
    if (!container) return

    const SCROLL_SPEED = 1 // 1 pixel per step for ultra-smooth movement
    const INTERVAL_MS = 28 // ~35 fps smooth ticker

    const scrollStep = () => {
      if (isPaused || isHovered || !scrollContainerRef.current) return

      const el = scrollContainerRef.current
      // If we reached the end, loop smoothly back to start
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 5) {
        el.scrollLeft = 0
      } else {
        el.scrollLeft += SCROLL_SPEED
      }
    }

    autoScrollTimerRef.current = setInterval(scrollStep, INTERVAL_MS)

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current)
      }
    }
  }, [isLoading, newsItems, isPaused, isHovered])

  // Manual scroll controls
  const handleScrollLeft = () => {
    if (!scrollContainerRef.current) return
    scrollContainerRef.current.scrollBy({
      left: -340,
      behavior: "smooth",
    })
  }

  const handleScrollRight = () => {
    if (!scrollContainerRef.current) return
    scrollContainerRef.current.scrollBy({
      left: 340,
      behavior: "smooth",
    })
  }

  function openNewsPreview(article: NewsArticle) {
    previouslyFocusedElement.current = document.activeElement as HTMLElement | null
    setSelectedNews(article)
  }

  const closeNewsPreview = useCallback(() => {
    setSelectedNews(null)
    window.setTimeout(() => {
      previouslyFocusedElement.current?.focus()
    }, 0)
  }, [])

  useEffect(() => {
    if (!selectedNews) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    window.setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 0)

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeNewsPreview()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedNews, closeNewsPreview])

  // Double items for seamless infinite marquee loop if 5 items
  const displayItems = newsItems.length > 0 ? [...newsItems, ...newsItems] : []

  return (
    <>
      <Section
        id="latest-news"
        background="soft"
        labelledBy="latest-news-heading"
        className="py-16 bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-100 border-b border-slate-200 overflow-hidden"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 border border-emerald-300 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#14532d] mb-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{eyebrow}</span>
            </div>
            <h2
              id="latest-news-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight"
            >
              {title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              {description}
            </p>
          </div>

          {/* Right Action Controls: Navigation Arrows + View All News */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Play/Pause Marquee Toggle */}
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 shadow-xs transition hover:bg-slate-100 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
              title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            >
              {isPaused ? <Play className="h-4 w-4 fill-current" /> : <Pause className="h-4 w-4 fill-current" />}
            </button>

            {/* Prev Button */}
            <button
              type="button"
              onClick={handleScrollLeft}
              aria-label="Previous news slide"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 shadow-xs transition hover:bg-slate-100 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleScrollRight}
              aria-label="Next news slide"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 shadow-xs transition hover:bg-slate-100 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* View all news button */}
            <LinkButton
              href={buttonUrl}
              variant="outline"
              className="border-slate-300 bg-white hover:border-[#388E3C] hover:bg-emerald-50 font-bold"
            >
              <span>{buttonText}</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </LinkButton>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div
            role="status"
            aria-live="polite"
            className="mt-10 flex min-h-72 items-center justify-center rounded-2xl border border-slate-200 bg-white"
          >
            <div className="flex flex-col items-center gap-3 text-slate-600">
              <LoaderCircle
                aria-hidden="true"
                className="h-8 w-8 animate-spin text-[#388E3C]"
              />
              <span className="font-medium">Loading latest Ministry news...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div
            role="alert"
            className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs"
          >
            <Newspaper aria-hidden="true" className="mx-auto h-9 w-9 text-[#388E3C]" />
            <h3 className="mt-4 text-xl font-bold text-slate-950">
              News temporarily unavailable
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              {error}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => void loadLatestNews()}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
              >
                Try again
              </button>
              <Link
                href="/media-centre/news"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#388E3C] px-5 font-semibold text-white transition hover:bg-[#256B29] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
              >
                View news page
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && newsItems.length === 0 && (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs">
            <Newspaper aria-hidden="true" className="mx-auto h-9 w-9 text-[#388E3C]" />
            <h3 className="mt-4 text-xl font-bold text-slate-950">No current news</h3>
            <p className="mt-2 text-slate-600">
              There are no published news articles available at this time.
            </p>
          </div>
        )}

        {/* Live Marquee Slider Track */}
        {!isLoading && !error && newsItems.length > 0 && (
          <div
            className="mt-8 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Subtle Gradient Shadow Edges for Smooth Horizon Fade */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-50 to-transparent z-10 hidden md:block" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 to-transparent z-10 hidden md:block" />

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {displayItems.map((item, index) => {
                const imageUrl = getNewsImageUrl(item)
                const publishedDate = formatNewsDate(item.published_at)

                return (
                  <div
                    key={`${item.id}-${index}`}
                    className="w-[320px] sm:w-[360px] md:w-[380px] shrink-0 flex flex-col"
                  >
                    <Card
                      interactive
                      onClick={() => openNewsPreview(item)}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-emerald-300 cursor-pointer"
                    >
                      {/* Image Header with Badge Overlay */}
                      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-slate-100">
                        {imageUrl ? (
                          <img
                            src={getAbsoluteFileUrl(imageUrl)}
                            alt={getNewsImageAlt(item)}
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-50 text-[#15803d]">
                            <Newspaper aria-hidden="true" className="h-12 w-12" />
                          </div>
                        )}

                        {/* Top Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/30 opacity-60 transition-opacity group-hover:opacity-40" />

                        {/* Category Badge */}
                        <span className="absolute left-3.5 top-3.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#064e3b] shadow-sm border border-emerald-200">
                          {item.category?.name ?? "Ministry news"}
                        </span>

                        {/* Featured Badge or Number */}
                        {item.is_featured ? (
                          <span className="absolute right-3.5 top-3.5 inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-sm">
                            <Sparkles className="h-3 w-3 fill-current" />
                            Featured
                          </span>
                        ) : (
                          <span className="absolute right-3.5 top-3.5 rounded-full bg-slate-900/70 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                            #{item.id}
                          </span>
                        )}

                        {/* Bottom Date Pill */}
                        <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 rounded-md bg-slate-950/80 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-white">
                          <CalendarDays className="h-3.5 w-3.5 text-emerald-400" />
                          <span>{publishedDate ?? "Recent"}</span>
                        </div>
                      </div>

                      {/* Card Content Body */}
                      <div className="flex flex-1 flex-col p-5 sm:p-6 justify-between bg-white">
                        <div>
                          <h3 className="text-base sm:text-lg font-extrabold leading-snug text-slate-900 line-clamp-2 transition-colors duration-200 group-hover:text-[#15803d]">
                            {stripHtml(item.title) || "Ministry news update"}
                          </h3>

                          <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
                            {stripHtml(item.summary) || "Read the latest official Ministry news update."}
                          </p>
                        </div>

                        {/* Bottom Interactive Trigger */}
                        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-extrabold text-[#15803d] group-hover:text-[#0d3829] flex items-center gap-1.5 transition-colors">
                            <span>Read Full Story</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>

                          <span className="text-[11px] font-semibold text-slate-400 group-hover:text-emerald-600 transition-colors">
                            Click to expand
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </Section>

      {/* Same-Page Full Story Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6">
          <button
            type="button"
            aria-label="Close news preview"
            onClick={closeNewsPreview}
            className="absolute inset-0 cursor-default bg-slate-950/80 backdrop-blur-sm"
          />

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="news-preview-title"
            aria-describedby="news-preview-summary"
            className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          >
            <header className="flex items-start justify-between gap-5 border-b border-slate-200 bg-gradient-to-r from-emerald-50/70 via-slate-50 to-white px-6 py-5 sm:px-8">
              <div className="flex min-w-0 items-start gap-4">
                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-[#15803d] sm:flex border border-emerald-200 shadow-xs">
                  <Newspaper aria-hidden="true" className="h-6 w-6" />
                </div>

                <div className="min-w-0">
                  <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#15803d]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {selectedNews.category?.name ?? "Ministry News"}
                  </span>
                  <h2
                    id="news-preview-title"
                    className="mt-1 text-lg sm:text-2xl font-black leading-snug text-slate-950"
                  >
                    {stripHtml(selectedNews.title) || "Ministry news update"}
                  </h2>
                </div>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeNewsPreview}
                aria-label="Close news preview"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </header>

            <div className="overflow-y-auto">
              {getNewsImageUrl(selectedNews) && (
                <div className="aspect-[16/7] overflow-hidden bg-slate-100">
                  <img
                    src={getAbsoluteFileUrl(getNewsImageUrl(selectedNews) as string)}
                    alt={getNewsImageAlt(selectedNews)}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="px-6 py-6 sm:px-8 sm:py-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-[#14532d] border border-emerald-200">
                    {selectedNews.category?.name ?? "Ministry news"}
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <CalendarDays aria-hidden="true" className="h-4 w-4 text-emerald-600" />
                    Published {formatNewsDate(selectedNews.published_at) ?? "Recent"}
                  </span>
                </div>

                <p
                  id="news-preview-summary"
                  className="mt-6 border-l-4 border-[#16a34a] pl-5 text-base font-semibold leading-relaxed text-slate-800 bg-emerald-50/40 py-3 pr-4 rounded-r-xl"
                >
                  {stripHtml(selectedNews.summary) || "Official Ministry news update."}
                </p>

                {selectedNews.content && (
                  <div
                    className="prose prose-slate mt-6 max-w-none leading-relaxed prose-headings:text-slate-950 prose-a:text-[#16a34a] prose-p:text-slate-700"
                    dangerouslySetInnerHTML={{ __html: selectedNews.content }}
                  />
                )}

                {selectedNews.attachments?.length > 0 && (
                  <div className="mt-8 border-t border-slate-200 pt-6">
                    <h3 className="text-base font-extrabold text-slate-950">Official Attachments</h3>
                    <div className="mt-4 grid gap-3">
                      {selectedNews.attachments.map((attachment) => {
                        const attachmentUrl = attachment.file_url || attachment.file
                        return (
                          <a
                            key={attachment.id}
                            href={getAbsoluteFileUrl(attachmentUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/file flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-emerald-300 hover:bg-white hover:shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 sm:flex-row sm:items-center sm:justify-between"
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#15803d]">
                                <FileText aria-hidden="true" className="h-5 w-5" />
                              </div>
                              <div className="min-w-0">
                                <p className="truncate text-sm font-bold text-slate-950">
                                  {attachment.title}
                                </p>
                                <p className="mt-0.5 text-xs text-slate-500">
                                  {attachment.file_type || getFileType(attachmentUrl)}
                                </p>
                              </div>
                            </div>
                            <span className="inline-flex shrink-0 items-center gap-2 text-xs font-bold text-[#15803d]">
                              <Download aria-hidden="true" className="h-4 w-4" />
                              Open file
                            </span>
                          </a>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <footer className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <button
                type="button"
                onClick={closeNewsPreview}
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
              >
                Close
              </button>

              <Link
                href="/media-centre/news"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#15803d] px-5 text-sm font-bold text-white transition hover:bg-[#0d3829] shadow-xs"
              >
                <span>View all news</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </footer>
          </section>
        </div>
      )}
    </>
  )
}