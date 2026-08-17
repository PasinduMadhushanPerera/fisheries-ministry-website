"use client"

import {
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
import { stripHtml } from "@/lib/utils"
import { useLanguage } from "@/src/contexts/LanguageContext"
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
  if (!fileUrl) return "/images/home/hero-fishing-harbour.jpg"
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

const fallbackNewsImages = [
  "/images/home/hero-fishing-harbour.jpg",
  "/images/institutions/dfar.jpg",
  "/images/institutions/nara.jpg",
  "/images/institutions/naqda.jpg",
  "/images/institutions/cfhc.jpg",
]

function mapCardToArticle(card: any, idx: number): NewsArticle {
  const attachments = []
  if (Array.isArray(card.attachments) && card.attachments.length > 0) {
    card.attachments.forEach((att: any, aIdx: number) => {
      attachments.push({
        id: att.id || aIdx + 1,
        title: att.title || att.attachment_title || "Official document",
        file: att.file || att.download_url || "",
        file_url: att.file_url || att.download_url || null,
        file_type: att.file_type || "PDF",
      })
    })
  } else if (card.attachment_title || card.download_url) {
    attachments.push({
      id: 1,
      title: card.attachment_title || "Official press release / circular",
      file: card.download_url || "",
      file_url: card.download_url || null,
      file_type: card.file_type || "PDF",
    })
  }

  return {
    id: card.id || idx + 1,
    category: {
      id: idx + 1,
      name: card.category_label || card.category || "Ministry News",
      slug: card.category || "ministry-news",
    },
    status: "published",
    priority: "normal",
    is_featured: Boolean(card.is_featured),
    hero_image: card.image_url || fallbackNewsImages[idx % fallbackNewsImages.length],
    hero_image_url: card.image_url || fallbackNewsImages[idx % fallbackNewsImages.length],
    published_at: card.published_date || new Date().toISOString(),
    expires_at: null,
    title: card.title || "Ministry news update",
    slug: card.slug || `news-${card.id || idx + 1}`,
    summary: card.summary || "",
    content: card.content || card.summary || "",
    image_alt_text: card.image_alt || card.title || "News illustration",
    seo_title: card.title || "",
    seo_description: card.summary || "",
    attachments,
    created_at: card.published_date || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

export function LatestNews({
  language: propLanguage,
  initialSection,
}: LatestNewsProps) {
  const contextLanguage = useLanguage()
  const activeLanguage = ((propLanguage || contextLanguage?.language || "en") as LanguageCode)

  const initialItems = initialSection?.cards
    ? initialSection.cards.map(mapCardToArticle).slice(0, 5)
    : []

  const [newsItems, setNewsItems] = useState<NewsArticle[]>(initialItems)
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null)
  const [isLoading, setIsLoading] = useState(initialItems.length === 0)
  const [error, setError] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocusedElement = useRef<HTMLElement | null>(null)
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null)

  const eyebrow = initialSection?.eyebrow || "Media centre"
  const title = initialSection?.title || "Latest News"
  const description =
    initialSection?.description ||
    "Follow Ministry activities, sector developments, community programmes and official public information."
  const buttonText = initialSection?.button_text || "View all news"
  const buttonUrl = initialSection?.button_url || "/media-centre/news"

  const loadLatestNews = useCallback(async () => {
    try {
      const latestNews = await getLatestNews(activeLanguage, 5)
      if (latestNews && latestNews.length > 0) {
        setNewsItems(latestNews.slice(0, 5))
        setError(null)
      } else if (initialSection?.cards && initialSection.cards.length > 0) {
        setNewsItems(initialSection.cards.map(mapCardToArticle).slice(0, 5))
      }
    } catch (requestError) {
      console.error("Failed to load latest news:", requestError)
      if (initialSection?.cards && initialSection.cards.length > 0) {
        setNewsItems(initialSection.cards.map(mapCardToArticle).slice(0, 5))
      } else if (newsItems.length === 0) {
        setError(
          "Latest Ministry news is temporarily unavailable. Please visit the news page for official updates."
        )
      }
    } finally {
      setIsLoading(false)
    }
  }, [activeLanguage, initialSection, newsItems.length])

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
   * Smooth slow-moving horizontal marquee animation (Continuous Auto-Scroll)
   */
  useEffect(() => {
    if (isLoading || newsItems.length <= 1) return

    const container = scrollContainerRef.current
    if (!container) return

    const SCROLL_SPEED = 1
    const INTERVAL_MS = 28

    const scrollStep = () => {
      if (isPaused || isHovered || !scrollContainerRef.current) return

      const el = scrollContainerRef.current
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

  // Double items for seamless marquee loop
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 shadow-xs transition hover:bg-slate-100 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 cursor-pointer"
              title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            >
              {isPaused ? <Play className="h-4 w-4 fill-current" /> : <Pause className="h-4 w-4 fill-current" />}
            </button>

            {/* Prev Button */}
            <button
              type="button"
              onClick={handleScrollLeft}
              aria-label="Previous news slide"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 shadow-xs transition hover:bg-slate-100 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleScrollRight}
              aria-label="Next news slide"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 shadow-xs transition hover:bg-slate-100 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 cursor-pointer"
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
        {isLoading && newsItems.length === 0 && (
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
        {!isLoading && error && newsItems.length === 0 && (
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
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 cursor-pointer"
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
        {newsItems.length > 0 && (
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

                        {/* Featured Badge */}
                        {item.is_featured && (
                          <span className="absolute right-3.5 top-3.5 inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-sm">
                            <Sparkles className="h-3 w-3 fill-current" />
                            Featured
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

                        {/* Bottom Styled Action Button */}
                        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                          <span className="inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-xl bg-[#256B29] px-4 text-xs font-extrabold text-white shadow-2xs transition group-hover:bg-[#1b4d1d]">
                            <span>Read More</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                          </span>

                          <span className="text-[11px] font-semibold text-slate-400">
                            Click to preview
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

      {/* Screen-Centered News Story Modal */}
      {selectedNews && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="news-preview-title"
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
                    {selectedNews.category?.name ?? "Ministry News"}
                  </span>
                  {selectedNews.is_featured && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/20 border border-amber-400/30 px-2.5 py-0.5 text-xs font-extrabold text-amber-300">
                      <Sparkles className="h-3 w-3" />
                      Featured Story
                    </span>
                  )}
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeNewsPreview}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-white hover:text-slate-900 transition-colors cursor-pointer"
                  aria-label="Close news preview"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Pure White Article Title */}
              <div className="relative z-10 mt-2">
                <h3
                  id="news-preview-title"
                  className="text-xl sm:text-2xl font-extrabold !text-white leading-snug tracking-tight"
                >
                  {stripHtml(selectedNews.title)}
                </h3>

                <div className="mt-3 pt-2 border-t border-white/15 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-bold text-emerald-200">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4 text-emerald-300" />
                    <span>{formatNewsDate(selectedNews.published_at) ?? "Recent"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              {getNewsImageUrl(selectedNews) && (
                <div className="relative aspect-[16/8] w-full overflow-hidden rounded-2xl bg-slate-900 border border-slate-200">
                  <img
                    src={getAbsoluteFileUrl(getNewsImageUrl(selectedNews) as string)}
                    alt={getNewsImageAlt(selectedNews)}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {/* Excerpt */}
              <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200/80 p-4 sm:p-5">
                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed italic">
                  &ldquo;{stripHtml(selectedNews.summary)}&rdquo;
                </p>
              </div>

              {/* Rich HTML Content */}
              {selectedNews.content && (
                <div
                  className="prose prose-slate max-w-none prose-p:text-xs sm:prose-p:text-sm prose-p:leading-relaxed prose-p:text-slate-700 prose-headings:font-extrabold prose-headings:text-slate-900 prose-a:text-[#256B29] prose-a:font-bold"
                  dangerouslySetInnerHTML={{ __html: selectedNews.content }}
                />
              )}

              {/* Attachments */}
              {selectedNews.attachments?.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 mt-6">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-[#256B29]" />
                    <span>Official Attachments & Press Releases</span>
                  </h4>
                  <div className="grid gap-3">
                    {selectedNews.attachments.map((attachment) => {
                      const attachmentUrl = attachment.file_url || attachment.file
                      return (
                        <div
                          key={attachment.id}
                          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-[#256B29]">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-900 truncate">
                                {attachment.title}
                              </p>
                              <p className="text-[11px] text-slate-500 font-medium">
                                {attachment.file_type || getFileType(attachmentUrl)}
                              </p>
                            </div>
                          </div>

                          {attachmentUrl ? (
                            <a
                              href={getAbsoluteFileUrl(attachmentUrl)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#256B29] px-4 text-xs font-bold text-white transition hover:bg-[#1b4d1d]"
                            >
                              <Download className="h-3.5 w-3.5" />
                              <span>Download</span>
                            </a>
                          ) : (
                            <span className="text-[11px] font-bold text-slate-400">
                              Official Record
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Action Footer */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 px-6 py-4 bg-slate-50">
              <Link
                href={`/media-centre/news/${selectedNews.slug}`}
                className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
              >
                <span>View Full Page</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#256B29]" />
              </Link>

              <button
                type="button"
                onClick={closeNewsPreview}
                className="inline-flex min-h-[40px] items-center justify-center rounded-xl bg-[#256B29] px-6 text-xs font-extrabold text-white hover:bg-[#1b4d1d] transition shadow-xs cursor-pointer"
              >
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}