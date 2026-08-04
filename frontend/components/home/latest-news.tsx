"use client"

import {
  ArrowRight,
  CalendarDays,
  Download,
  FileText,
  LoaderCircle,
  Newspaper,
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
import {
  formatNewsDate,
  getLatestNews,
  getNewsImageAlt,
  getNewsImageUrl,
  type LanguageCode,
  type NewsArticle,
} from "@/src/lib/news"

type LatestNewsProps = {
  language?: LanguageCode
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

export function LatestNews({
  language = "en",
}: LatestNewsProps) {
  const [newsItems, setNewsItems] = useState<NewsArticle[]>([])
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocusedElement = useRef<HTMLElement | null>(null)

  const loadLatestNews = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const latestNews = await getLatestNews(language, 3)
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
  }, [language])

  useEffect(() => {
    void loadLatestNews()
  }, [loadLatestNews])

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
    if (!selectedNews) {
      return
    }

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

  return (
    <>
      <Section
        id="latest-news"
        background="soft"
        labelledBy="latest-news-heading"
        className="py-16 bg-slate-50 border-b border-slate-200"
      >
        <SectionTitle
          id="latest-news-heading"
          eyebrow="Media centre"
          title="Latest News"
          description="Follow Ministry activities, sector developments, community programmes and official public information."
          actions={
            <LinkButton
              href="/media-centre/news"
              variant="outline"
              className="border-slate-300 bg-white hover:border-[#388E3C] hover:bg-emerald-50"
            >
              View all news
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </LinkButton>
          }
        />

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

        {!isLoading && !error && newsItems.length === 0 && (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs">
            <Newspaper aria-hidden="true" className="mx-auto h-9 w-9 text-[#388E3C]" />
            <h3 className="mt-4 text-xl font-bold text-slate-950">No current news</h3>
            <p className="mt-2 text-slate-600">
              There are no published news articles available at this time.
            </p>
          </div>
        )}

        {!isLoading && !error && newsItems.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
            {newsItems.map((item) => {
              const imageUrl = getNewsImageUrl(item)
              const publishedDate = formatNewsDate(item.published_at)

              return (
                <Card
                  key={item.id}
                  interactive
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-slate-100">
                    {imageUrl ? (
                      <img
                        src={getAbsoluteFileUrl(imageUrl)}
                        alt={getNewsImageAlt(item)}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-emerald-50 text-[#388E3C]">
                        <Newspaper aria-hidden="true" className="h-12 w-12" />
                      </div>
                    )}

                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-slate-700 shadow-xs backdrop-blur-xs">
                      {item.category?.name ?? "Ministry news"}
                    </span>

                    {item.is_featured && (
                      <span className="absolute right-4 top-4 rounded-full bg-[#388E3C] px-3 py-1 text-xs font-bold text-white shadow-xs">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6 justify-between">
                    <div>
                      <p className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <CalendarDays aria-hidden="true" className="h-3.5 w-3.5 text-[#388E3C]" />
                        {publishedDate ?? "Publication date unavailable"}
                      </p>

                      <h3 className="mt-3 text-lg font-bold leading-snug text-slate-900 line-clamp-2 transition-colors group-hover:text-[#256B29]">
                        {item.title ?? "Ministry news update"}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3">
                        {item.summary ?? "Read the latest official Ministry news update."}
                      </p>
                    </div>

                    <div className="mt-6 pt-2">
                      <button
                        type="button"
                        onClick={() => openNewsPreview(item)}
                        aria-label={`Read news: ${item.title ?? "Ministry news update"}`}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#256B29] transition-colors hover:border-[#388E3C] hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                      >
                        <span>Read news</span>
                        <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </Section>

      {/* Same-Page Popup Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6">
          <button
            type="button"
            aria-label="Close news preview"
            onClick={closeNewsPreview}
            className="absolute inset-0 cursor-default bg-slate-950/75 backdrop-blur-xs"
          />

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="news-preview-title"
            aria-describedby="news-preview-summary"
            className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl"
          >
            <header className="flex items-start justify-between gap-5 border-b border-slate-200 bg-slate-50 px-6 py-5 sm:px-8">
              <div className="flex min-w-0 items-start gap-4">
                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#388E3C] sm:flex">
                  <Newspaper aria-hidden="true" className="h-6 w-6" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#256B29]">
                    Ministry news
                  </p>
                  <h2
                    id="news-preview-title"
                    className="mt-1 text-xl font-bold leading-snug text-slate-950 sm:text-2xl"
                  >
                    {selectedNews.title ?? "Ministry news update"}
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
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-[#256B29]">
                    {selectedNews.category?.name ?? "Ministry news"}
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
                    <CalendarDays aria-hidden="true" className="h-4 w-4" />
                    Published {formatNewsDate(selectedNews.published_at) ?? "date unavailable"}
                  </span>
                </div>

                <p
                  id="news-preview-summary"
                  className="mt-6 border-l-4 border-[#388E3C] pl-5 text-base font-medium leading-relaxed text-slate-700"
                >
                  {selectedNews.summary ?? "Official Ministry news update."}
                </p>

                {selectedNews.content && (
                  <div
                    className="prose prose-slate mt-6 max-w-none leading-relaxed prose-headings:text-slate-950 prose-a:text-[#388E3C]"
                    dangerouslySetInnerHTML={{ __html: selectedNews.content }}
                  />
                )}

                {selectedNews.attachments?.length > 0 && (
                  <div className="mt-8 border-t border-slate-200 pt-6">
                    <h3 className="text-base font-bold text-slate-950">Attachments</h3>
                    <div className="mt-4 grid gap-3">
                      {selectedNews.attachments.map((attachment) => {
                        const attachmentUrl = attachment.file_url || attachment.file
                        return (
                          <a
                            key={attachment.id}
                            href={getAbsoluteFileUrl(attachmentUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/file flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white hover:shadow-xs focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 sm:flex-row sm:items-center sm:justify-between"
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#388E3C]">
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
                            <span className="inline-flex shrink-0 items-center gap-2 text-xs font-bold text-[#256B29]">
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
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
              >
                Close
              </button>
            </footer>
          </section>
        </div>
      )}
    </>
  )
}