"use client"

import {
  ArrowRight,
  Bell,
  CalendarDays,
  Clock,
  Download,
  FileText,
  LoaderCircle,
  ShieldAlert,
  X,
} from "lucide-react"
import Link from "next/link"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

import { Badge } from "@/components/ui/badge"
import { LinkButton } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { SectionTitle } from "@/components/ui/section-title"

type LanguageCode = "en" | "si" | "ta"

type NoticeAttachmentApi = {
  id: number
  title: string
  file: string
  file_url: string
}

type NoticeCategoryApi = {
  id: number
  name: string
  slug: string
}

type NoticeApi = {
  id: number
  category: NoticeCategoryApi
  status: string
  priority: string
  published_at: string
  expires_at: string | null
  title: string
  slug: string
  summary: string
  content: string
  seo_title: string
  seo_description: string
  attachments: NoticeAttachmentApi[]
  created_at: string
  updated_at: string
}

type NoticeAttachment = {
  id: number
  title: string
  fileUrl: string
  fileType: string
  fileSize?: string | null
}

type Notice = {
  id: number
  slug: string
  title: string
  summary: string
  content: string
  category: string
  priority: string
  publishedAt: string
  expiresAt: string | null
  attachments: NoticeAttachment[]
}

type NoticesApiResponse = {
  results: NoticeApi[]
  count: number
  next: string | null
  previous: string | null
}

type LatestNoticesProps = {
  language?: LanguageCode
}

import { getApiBaseUrl, getAbsoluteMediaUrl } from "@/lib/utils"

function formatPublishedDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date))
}

function getAttachmentUrl(fileUrl: string) {
  if (
    fileUrl.startsWith("http://") ||
    fileUrl.startsWith("https://")
  ) {
    return fileUrl
  }

  return getAbsoluteMediaUrl(fileUrl)
}

function getFileType(fileUrl: string) {
  const cleanUrl = fileUrl.split("?")[0]
  const extension = cleanUrl.split(".").pop()?.toUpperCase()

  return extension && extension.length <= 5
    ? `${extension} document`
    : "Document"
}

function mapNotice(apiNotice: NoticeApi): Notice {
  return {
    id: apiNotice.id,
    slug: apiNotice.slug,
    title: apiNotice.title,
    summary: apiNotice.summary,
    content: apiNotice.content,
    category: apiNotice.category.name,
    priority: apiNotice.priority,
    publishedAt: apiNotice.published_at,
    expiresAt: apiNotice.expires_at,
    attachments: apiNotice.attachments.map((attachment) => ({
      id: attachment.id,
      title: attachment.title,
      fileUrl: attachment.file_url || attachment.file,
      fileType: getFileType(
        attachment.file_url || attachment.file,
      ),
      fileSize: null,
    })),
  }
}

export function LatestNotices({
  language = "en",
}: LatestNoticesProps) {
  const [notices, setNotices] = useState<Notice[]>([])
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocusedElement = useRef<HTMLElement | null>(null)

  const loadLatestNotices = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const apiBase = getApiBaseUrl()
      const response = await fetch(
        `${apiBase}/api/v1/notices/notices/?lang=${language}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        },
      )

      if (!response.ok) {
        throw new Error(
          `Unable to load notices. Status: ${response.status}`,
        )
      }

      const data = (await response.json()) as NoticesApiResponse
      const latestNotices = data.results.map(mapNotice)

      setNotices(latestNotices.slice(0, 3))
    } catch (requestError) {
      console.error("Failed to load latest notices:", requestError)

      setError(
        "Latest notices are temporarily unavailable. Please visit the notices page for official updates.",
      )
    } finally {
      setIsLoading(false)
    }
  }, [language])

  useEffect(() => {
    void loadLatestNotices()
  }, [loadLatestNotices])

  function openNoticePreview(notice: Notice) {
    previouslyFocusedElement.current = document.activeElement as HTMLElement | null
    setSelectedNotice(notice)
  }

  const closeNoticePreview = useCallback(() => {
    setSelectedNotice(null)
    window.setTimeout(() => {
      previouslyFocusedElement.current?.focus()
    }, 0)
  }, [])

  useEffect(() => {
    if (!selectedNotice) {
      return
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    window.setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 0)

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeNoticePreview()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedNotice, closeNoticePreview])

  return (
    <>
      <Section
        id="latest-notices"
        background="white"
        labelledBy="latest-notices-heading"
        className="py-16 bg-slate-50 border-b border-slate-200"
      >
        <SectionTitle
          id="latest-notices-heading"
          eyebrow="Official updates"
          title="Latest Notices"
          description="Official announcements, public notices, circulars, application deadlines, and regulatory notifications."
          actions={
            <LinkButton
              href="/media-centre/notices"
              variant="outline"
              className="border-slate-300 bg-white hover:border-[#388E3C] hover:bg-emerald-50"
            >
              View all notices
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </LinkButton>
          }
        />

        {isLoading && (
          <div
            role="status"
            aria-live="polite"
            className="mt-10 flex min-h-56 items-center justify-center rounded-2xl border border-slate-200 bg-white"
          >
            <div className="flex flex-col items-center gap-3 text-slate-600">
              <LoaderCircle
                aria-hidden="true"
                className="h-7 w-7 animate-spin text-[#388E3C]"
              />
              <span className="font-medium">Loading latest notices...</span>
            </div>
          </div>
        )}

        {!isLoading && error && (
          <div
            role="alert"
            className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs"
          >
            <Bell aria-hidden="true" className="mx-auto h-8 w-8 text-[#388E3C]" />
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600">
              {error}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => void loadLatestNotices()}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
              >
                Try again
              </button>
              <Link
                href="/media-centre/notices"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#388E3C] px-5 font-semibold text-white transition hover:bg-[#256B29] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
              >
                View notices page
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}

        {!isLoading && !error && notices.length === 0 && (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs">
            <Bell aria-hidden="true" className="mx-auto h-8 w-8 text-[#388E3C]" />
            <h3 className="mt-4 text-xl font-bold text-slate-950">No current notices</h3>
            <p className="mt-2 text-slate-600">
              There are no published notices available at this time.
            </p>
          </div>
        )}

        {!isLoading && !error && notices.length > 0 && (
          <div className="mt-10 grid gap-5">
            {notices.map((notice) => (
              <Card
                key={notice.id}
                interactive
                className="group relative overflow-hidden border border-slate-200 border-l-4 border-l-[#388E3C] bg-white rounded-2xl p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#388E3C]">
                      <FileText className="h-6 w-6" aria-hidden="true" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700">
                          {notice.category}
                        </span>

                        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                          <CalendarDays className="h-3.5 w-3.5 text-[#388E3C]" aria-hidden="true" />
                          Published: {formatPublishedDate(notice.publishedAt)}
                        </span>

                        {notice.expiresAt && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                            <Clock className="h-3 w-3" aria-hidden="true" />
                            Closing: {formatPublishedDate(notice.expiresAt)}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-[#256B29] transition-colors line-clamp-1">
                        {notice.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {notice.summary}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 self-end md:self-center pt-2 md:pt-0">
                    <button
                      type="button"
                      onClick={() => openNoticePreview(notice)}
                      aria-label={`View notice: ${notice.title}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#388E3C] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#256B29] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                    >
                      <span>View notice</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Section>

      {/* Notice Preview Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6">
          <button
            type="button"
            aria-label="Close notice preview"
            onClick={closeNoticePreview}
            className="absolute inset-0 cursor-default bg-slate-950/75 backdrop-blur-xs"
          />

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="notice-preview-title"
            aria-describedby="notice-preview-summary"
            className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl"
          >
            <header className="flex items-start justify-between gap-5 border-b border-slate-200 bg-slate-50 px-6 py-5 sm:px-8">
              <div className="flex min-w-0 items-start gap-4">
                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#388E3C] sm:flex">
                  <Bell aria-hidden="true" className="h-6 w-6" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#256B29]">
                    Official notice
                  </p>
                  <h2
                    id="notice-preview-title"
                    className="mt-1 text-xl font-bold leading-snug text-slate-950 sm:text-2xl"
                  >
                    {selectedNotice.title}
                  </h2>
                </div>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeNoticePreview}
                aria-label="Close notice preview"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </header>

            <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-[#256B29]">
                  {selectedNotice.category}
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
                  <CalendarDays aria-hidden="true" className="h-4 w-4" />
                  Published {formatPublishedDate(selectedNotice.publishedAt)}
                </span>
                {selectedNotice.expiresAt && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
                    Closing date: {formatPublishedDate(selectedNotice.expiresAt)}
                  </span>
                )}
              </div>

              <p
                id="notice-preview-summary"
                className="mt-6 border-l-4 border-[#388E3C] pl-5 text-base font-medium leading-relaxed text-slate-700"
              >
                {selectedNotice.summary}
              </p>

              {selectedNotice.content && (
                <div
                  className="prose prose-slate mt-6 max-w-none leading-relaxed prose-headings:text-slate-950 prose-a:text-[#388E3C]"
                  dangerouslySetInnerHTML={{ __html: selectedNotice.content }}
                />
              )}

              {selectedNotice.attachments?.length > 0 && (
                <div className="mt-8 border-t border-slate-200 pt-6">
                  <h3 className="text-base font-bold text-slate-950">Attachments</h3>
                  <div className="mt-4 grid gap-3">
                    {selectedNotice.attachments.map((attachment) => (
                      <a
                        key={attachment.id}
                        href={getAttachmentUrl(attachment.fileUrl)}
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
                              {attachment.fileType}
                            </p>
                          </div>
                        </div>
                        <span className="inline-flex shrink-0 items-center gap-2 text-xs font-bold text-[#256B29]">
                          <Download aria-hidden="true" className="h-4 w-4" />
                          Open file
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <footer className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <button
                type="button"
                onClick={closeNoticePreview}
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