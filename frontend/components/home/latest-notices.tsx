"use client"

import {
  ArrowRight,
  Bell,
  CalendarDays,
  Download,
  ExternalLink,
  FileText,
  LoaderCircle,
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
  publishedAt: string
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

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:8000/api/v1"
).replace(/\/$/, "")

function formatPublishedDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date))
}

function getNoticeUrl(slug: string) {
  return `/media-centre/notices/${slug}`
}

function getAttachmentUrl(fileUrl: string) {
  if (
    fileUrl.startsWith("http://") ||
    fileUrl.startsWith("https://")
  ) {
    return fileUrl
  }

  try {
    return new URL(fileUrl, API_BASE_URL).toString()
  } catch {
    return fileUrl
  }
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
    publishedAt: apiNotice.published_at,
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
  const [selectedNotice, setSelectedNotice] =
    useState<Notice | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocusedElement =
    useRef<HTMLElement | null>(null)

  const loadLatestNotices = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `${API_BASE_URL}/notices/?lang=${language}`,
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
      console.error(
        "Failed to load latest notices:",
        requestError,
      )

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
    previouslyFocusedElement.current =
      document.activeElement as HTMLElement | null

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
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      )
    }
  }, [selectedNotice, closeNoticePreview])

  return (
    <>
      <Section
        id="latest-notices"
        background="white"
        labelledBy="latest-notices-heading"
        className="relative overflow-hidden border-y border-slate-200 bg-slate-50/70"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-400/50 to-transparent"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-16 h-72 w-72 rounded-full bg-slate-300/20 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-slate-200/30 blur-3xl"
        />

        <div className="relative">
          <SectionTitle
            id="latest-notices-heading"
            eyebrow="Official updates"
            title="Latest notices and announcements"
            description="Stay informed about Ministry services, public announcements, application requirements and official documents."
            actions={
              <LinkButton
                href="/media-centre/notices"
                variant="outline"
                className="border-slate-300 bg-white shadow-sm hover:border-slate-400 hover:bg-slate-50"
              >
                View all notices

                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </LinkButton>
            }
          />

          {isLoading && (
            <div
              role="status"
              aria-live="polite"
              className="mt-12 flex min-h-56 items-center justify-center rounded-2xl border border-slate-200 bg-white"
            >
              <div className="flex flex-col items-center gap-3 text-slate-600">
                <LoaderCircle
                  aria-hidden="true"
                  className="h-7 w-7 animate-spin text-[#256B29]"
                />

                <span className="font-medium">
                  Loading latest notices
                </span>
              </div>
            </div>
          )}

          {!isLoading && error && (
            <div
              role="alert"
              className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"
            >
              <Bell
                aria-hidden="true"
                className="mx-auto h-8 w-8 text-[#256B29]"
              />

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
                {error}
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => void loadLatestNotices()}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 font-bold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                >
                  Try again
                </button>

                <Link
                  href="/media-centre/notices"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#256B29] px-5 font-bold text-white transition hover:bg-[#1d5521] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                >
                  View notices page

                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                </Link>
              </div>
            </div>
          )}

          {!isLoading &&
            !error &&
            notices.length === 0 && (
              <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <Bell
                  aria-hidden="true"
                  className="mx-auto h-8 w-8 text-[#256B29]"
                />

                <h3 className="mt-4 text-xl font-bold text-slate-950">
                  No current notices
                </h3>

                <p className="mt-2 text-slate-600">
                  There are no published notices available at
                  this time.
                </p>
              </div>
            )}

          {!isLoading &&
            !error &&
            notices.length > 0 && (
              <div className="mt-12 grid gap-6">
                {notices.map((notice, index) => (
                  <Card
                    key={notice.id}
                    interactive
                    className="group relative overflow-hidden border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-1 bg-[#256B29]"
                    />

                    <div className="grid gap-5 p-6 pl-7 sm:p-7 sm:pl-8 md:grid-cols-[auto_1fr_auto] md:items-center">
                      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-[#256B29] shadow-sm transition duration-300 group-hover:scale-105 group-hover:bg-white group-hover:shadow-md">
                        <Bell
                          aria-hidden="true"
                          className="h-7 w-7"
                        />

                        {index === 0 && (
                          <span
                            aria-hidden="true"
                            className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#256B29] shadow-[0_0_0_4px_rgba(37,107,41,0.12)]"
                          />
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <Badge variant="warning">
                            {notice.category}
                          </Badge>

                          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500">
                            <CalendarDays
                              aria-hidden="true"
                              className="h-4 w-4"
                            />

                            {formatPublishedDate(
                              notice.publishedAt,
                            )}
                          </span>
                        </div>

                        <h3 className="mt-3 text-xl font-bold leading-snug text-slate-950 transition-colors group-hover:text-[#256B29] sm:text-2xl">
                          {notice.title}
                        </h3>

                        <p className="mt-3 max-w-4xl leading-7 text-slate-600">
                          {notice.summary}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          openNoticePreview(notice)
                        }
                        aria-label={`Preview notice: ${notice.title}`}
                        className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 font-bold text-[#256B29] transition duration-300 hover:border-slate-300 hover:bg-white hover:shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                      >
                        Read notice

                        <ArrowRight
                          aria-hidden="true"
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
        </div>
      </Section>

      {selectedNotice && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6">
          <button
            type="button"
            aria-label="Close notice preview"
            onClick={closeNoticePreview}
            className="absolute inset-0 cursor-default bg-slate-950/75 backdrop-blur-sm"
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
                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#256B29] sm:flex">
                  <Bell
                    aria-hidden="true"
                    className="h-6 w-6"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#256B29]">
                    Official notice
                  </p>

                  <h2
                    id="notice-preview-title"
                    className="mt-2 text-xl font-bold leading-snug text-slate-950 sm:text-2xl"
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
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
              >
                <X
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              </button>
            </header>

            <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="warning">
                  {selectedNotice.category}
                </Badge>

                <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-500">
                  <CalendarDays
                    aria-hidden="true"
                    className="h-4 w-4"
                  />

                  Published{" "}
                  {formatPublishedDate(
                    selectedNotice.publishedAt,
                  )}
                </span>
              </div>

              <p
                id="notice-preview-summary"
                className="mt-6 border-l-4 border-[#256B29] pl-5 text-lg font-medium leading-8 text-slate-700"
              >
                {selectedNotice.summary}
              </p>

              <div
                className="prose prose-slate mt-7 max-w-none leading-8 prose-headings:text-slate-950 prose-a:text-[#256B29]"
                dangerouslySetInnerHTML={{
                  __html: selectedNotice.content,
                }}
              />

              {selectedNotice.attachments?.length > 0 && (
                <div className="mt-9 border-t border-slate-200 pt-7">
                  <h3 className="text-lg font-bold text-slate-950">
                    Attachments
                  </h3>

                  <div className="mt-4 grid gap-3">
                    {selectedNotice.attachments.map(
                      (attachment) => (
                        <a
                          key={attachment.id}
                          href={getAttachmentUrl(
                            attachment.fileUrl,
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/file flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white hover:shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#256B29]">
                              <FileText
                                aria-hidden="true"
                                className="h-5 w-5"
                              />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate font-bold text-slate-950">
                                {attachment.title}
                              </p>

                              <p className="mt-1 text-sm text-slate-500">
                                {attachment.fileType}
                                {attachment.fileSize
                                  ? ` · ${attachment.fileSize}`
                                  : ""}
                              </p>
                            </div>
                          </div>

                          <span className="inline-flex shrink-0 items-center gap-2 font-bold text-[#256B29]">
                            <Download
                              aria-hidden="true"
                              className="h-4 w-4"
                            />

                            Open file
                          </span>
                        </a>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>

            <footer className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <button
                type="button"
                onClick={closeNoticePreview}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 font-bold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
              >
                Close
              </button>

              <Link
                href={getNoticeUrl(
                  selectedNotice.slug,
                )}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#256B29] px-5 font-bold text-white transition hover:bg-[#1d5521] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
              >
                View full notice

                <ExternalLink
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </Link>
            </footer>
          </section>
        </div>
      )}
    </>
  )
}