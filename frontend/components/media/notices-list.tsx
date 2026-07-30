"use client"

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  AlertCircle,
  ArrowRight,
  BellRing,
  CalendarDays,
  Clock3,
  Download,
  FileText,
  LoaderCircle,
  SearchX,
  Tag,
  X,
} from "lucide-react"

import { NoticeFilter } from "@/components/media/notice-filter"
import { Container } from "@/components/ui/container"
import {
  formatNoticeDate,
  getNoticeDisplayStatus,
  getNotices,
  splitNoticeContent,
  type Notice,
  type NoticeDisplayStatus,
} from "@/src/lib/notices"

const statusStyles: Record<
  NoticeDisplayStatus,
  string
> = {
  Open: "border-green-200 bg-green-100 text-green-800",
  "Closing Soon":
    "border-amber-200 bg-amber-100 text-amber-800",
  Closed:
    "border-slate-200 bg-slate-100 text-slate-700",
}

function getPriorityLabel(priority: string): string {
  if (!priority) {
    return "Normal"
  }

  return (
    priority.charAt(0).toUpperCase() +
    priority.slice(1).toLowerCase()
  )
}

export function NoticeList() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] =
    useState<string | null>(null)

  const [activeCategory, setActiveCategory] =
    useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedNotice, setSelectedNotice] =
    useState<Notice | null>(null)

  const closeButtonRef =
    useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadNotices() {
      try {
        setIsLoading(true)
        setErrorMessage(null)

        const response = await getNotices("en")

        if (isMounted) {
          setNotices(
            response.results.filter(
              (notice) =>
                notice.title &&
                notice.summary &&
                notice.content,
            ),
          )
        }
      } catch (error) {
        if (!isMounted) {
          return
        }

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to load notices.",
        )
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadNotices()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!selectedNotice) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    window.setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 0)

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedNotice(null)
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      )
    }
  }, [selectedNotice])

  const categories = useMemo(() => {
    const categoryNames = notices
      .map((notice) => notice.category?.name)
      .filter(
        (category): category is string =>
          Boolean(category),
      )

    return [
      "All",
      ...Array.from(new Set(categoryNames)).sort(),
    ]
  }, [notices])

  const filteredNotices = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()

    return notices.filter((notice) => {
      const displayStatus =
        getNoticeDisplayStatus(notice)

      const matchesCategory =
        activeCategory === "All" ||
        notice.category.name === activeCategory

      const searchableContent = [
        notice.title,
        notice.summary,
        notice.content,
        notice.category.name,
        notice.category.slug,
        notice.priority,
        displayStatus,
        `Notice ${notice.id}`,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()

      const matchesSearch =
        keyword.length === 0 ||
        searchableContent.includes(keyword)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, notices, searchQuery])

  return (
    <>
      <NoticeFilter
        categories={categories}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onCategoryChange={setActiveCategory}
        onSearchChange={setSearchQuery}
      />

      <section
        id="notices-library"
        aria-labelledby="notices-library-heading"
        className="scroll-mt-24 bg-slate-50 py-16 sm:py-20"
      >
        <Container>
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                Public notice archive
              </p>

              <h2
                id="notices-library-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
              >
                {activeCategory === "All"
                  ? "All Notices"
                  : `${activeCategory} Notices`}
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                Browse Ministry notices, deadlines,
                procurement opportunities, recruitment
                announcements and licensing updates.
              </p>
            </div>

            {!isLoading && !errorMessage ? (
              <p
                aria-live="polite"
                className="text-sm font-semibold text-slate-600"
              >
                {filteredNotices.length}{" "}
                {filteredNotices.length === 1
                  ? "notice"
                  : "notices"}
              </p>
            ) : null}
          </div>

          {isLoading ? (
            <div
              role="status"
              className="flex min-h-80 flex-col items-center justify-center text-center"
            >
              <LoaderCircle
                aria-hidden="true"
                className="h-10 w-10 animate-spin text-green-700"
              />

              <p className="mt-4 font-semibold text-slate-700">
                Loading official notices...
              </p>
            </div>
          ) : null}

          {!isLoading && errorMessage ? (
            <div
              role="alert"
              className="mt-10 rounded-3xl border border-red-200 bg-red-50 px-6 py-16 text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-700">
                <AlertCircle
                  aria-hidden="true"
                  className="h-8 w-8"
                />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-950">
                Notices could not be loaded
              </h3>

              <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
                {errorMessage}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-7 inline-flex items-center rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
              >
                Try again
              </button>
            </div>
          ) : null}

          {!isLoading &&
          !errorMessage &&
          filteredNotices.length > 0 ? (
            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredNotices.map((notice) => {
                const displayStatus =
                  getNoticeDisplayStatus(notice)

                const publishedDate =
                  formatNoticeDate(notice.published_at)

                const closingDate =
                  formatNoticeDate(notice.expires_at)

                return (
                  <article
                    key={notice.id}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
                  >
                    <div className="relative overflow-hidden bg-[linear-gradient(145deg,#071d24_0%,#0a322f_55%,#0a4350_100%)] p-6 text-white">
                      <div
                        aria-hidden="true"
                        className="absolute -right-14 -top-14 h-40 w-40 rounded-full border border-white/10 bg-white/[0.04]"
                      />

                      <div
                        aria-hidden="true"
                        className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full border border-green-200/10 bg-green-300/[0.04]"
                      />

                      <div className="relative">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-300 text-slate-950">
                            <BellRing
                              aria-hidden="true"
                              className="h-6 w-6"
                            />
                          </div>

                          <span
                            className={[
                              "rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wide",
                              statusStyles[displayStatus],
                            ].join(" ")}
                          >
                            {displayStatus}
                          </span>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-semibold">
                          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-green-100 backdrop-blur">
                            {notice.category.name}
                          </span>

                          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-slate-200 backdrop-blur">
                            Notice #{notice.id}
                          </span>

                          {notice.is_featured ? (
                            <span className="rounded-full border border-amber-200/30 bg-amber-200/10 px-3 py-1.5 text-amber-100 backdrop-blur">
                              Featured
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-500">
                        {publishedDate ? (
                          <div className="flex items-center gap-2">
                            <CalendarDays
                              aria-hidden="true"
                              className="h-4 w-4 text-green-700"
                            />

                            <time
                              dateTime={notice.published_at}
                            >
                              {publishedDate}
                            </time>
                          </div>
                        ) : null}

                        <div className="flex items-center gap-2">
                          <Tag
                            aria-hidden="true"
                            className="h-4 w-4 text-green-700"
                          />

                          <span>
                            {getPriorityLabel(
                              notice.priority,
                            )}{" "}
                            priority
                          </span>
                        </div>
                      </div>

                      <h3 className="mt-5 text-xl font-bold leading-8 text-slate-950">
                        {notice.title}
                      </h3>

                      <p className="mt-4 line-clamp-3 leading-7 text-slate-600">
                        {notice.summary}
                      </p>

                      <div className="mt-6 space-y-4 border-y border-slate-200 py-5">
                        {closingDate ? (
                          <div className="flex items-start gap-3">
                            <Clock3
                              aria-hidden="true"
                              className={[
                                "mt-0.5 h-5 w-5 shrink-0",
                                displayStatus ===
                                "Closing Soon"
                                  ? "text-amber-600"
                                  : displayStatus ===
                                      "Closed"
                                    ? "text-slate-500"
                                    : "text-green-700",
                              ].join(" ")}
                            />

                            <div>
                              <p className="text-sm text-slate-500">
                                Closing date
                              </p>

                              <p className="mt-1 font-semibold text-slate-950">
                                {closingDate}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start gap-3">
                            <Clock3
                              aria-hidden="true"
                              className="mt-0.5 h-5 w-5 shrink-0 text-green-700"
                            />

                            <div>
                              <p className="text-sm text-slate-500">
                                Availability
                              </p>

                              <p className="mt-1 font-semibold text-slate-950">
                                No closing date specified
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                          <FileText
                            aria-hidden="true"
                            className="h-4 w-4 text-green-700"
                          />

                          Official notice
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedNotice(notice)
                          }
                          aria-haspopup="dialog"
                          className="inline-flex items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                        >
                          View notice

                          <ArrowRight
                            aria-hidden="true"
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          />
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : null}

          {!isLoading &&
          !errorMessage &&
          filteredNotices.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <SearchX
                  aria-hidden="true"
                  className="h-8 w-8"
                />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-950">
                No notices found
              </h3>

              <p className="mx-auto mt-4 max-w-lg leading-7 text-slate-600">
                Try another search term or select a
                different category to explore more
                Ministry notices.
              </p>

              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All")
                  setSearchQuery("")
                }}
                className="mt-7 inline-flex items-center rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
              >
                Clear filters
              </button>
            </div>
          ) : null}
        </Container>
      </section>

      {selectedNotice ? (
        <NoticeDrawer
          notice={selectedNotice}
          onClose={() => setSelectedNotice(null)}
          closeButtonRef={closeButtonRef}
        />
      ) : null}
    </>
  )
}

type NoticeDrawerProps = {
  notice: Notice
  onClose: () => void
  closeButtonRef: React.RefObject<HTMLButtonElement | null>
}

function NoticeDrawer({
  notice,
  onClose,
  closeButtonRef,
}: NoticeDrawerProps) {
  const displayStatus = getNoticeDisplayStatus(notice)
  const publishedDate = formatNoticeDate(
    notice.published_at,
  )
  const closingDate = formatNoticeDate(
    notice.expires_at,
  )
  const paragraphs = splitNoticeContent(notice.content)

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close notice"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-slate-950/70 backdrop-blur-sm"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={`notice-dialog-title-${notice.id}`}
        className="relative z-10 flex h-full w-full max-w-2xl flex-col overflow-hidden bg-white shadow-2xl"
      >
        <div className="relative overflow-hidden bg-[linear-gradient(145deg,#071d24_0%,#0a322f_55%,#0a4350_100%)] px-6 py-7 text-white sm:px-8">
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10 bg-white/[0.04]"
          />

          <div className="relative">
            <div className="flex items-start justify-between gap-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-green-100">
                  {notice.category.name}
                </span>

                <span
                  className={[
                    "rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wide",
                    statusStyles[displayStatus],
                  ].join(" ")}
                >
                  {displayStatus}
                </span>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close full notice"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
              >
                <X
                  aria-hidden="true"
                  className="h-6 w-6"
                />
              </button>
            </div>

            <p className="mt-7 text-sm font-semibold text-green-200">
              Official Notice #{notice.id}
            </p>

            <h2
              id={`notice-dialog-title-${notice.id}`}
              className="mt-3 text-3xl font-bold leading-tight sm:text-4xl"
            >
              {notice.title}
            </h2>

            <p className="mt-5 leading-7 text-slate-300">
              {notice.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
              {publishedDate ? (
                <div className="flex items-center gap-2">
                  <CalendarDays
                    aria-hidden="true"
                    className="h-4 w-4 text-green-200"
                  />

                  <span>Published {publishedDate}</span>
                </div>
              ) : null}

              {closingDate ? (
                <div className="flex items-center gap-2">
                  <Clock3
                    aria-hidden="true"
                    className="h-4 w-4 text-green-200"
                  />

                  <span>Closing {closingDate}</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-8">
          <article>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
              Full announcement
            </p>

            <div className="mt-6 space-y-6 text-base leading-8 text-slate-700">
              {paragraphs.length > 0 ? (
                paragraphs.map((paragraph, index) => (
                  <p key={`${notice.id}-${index}`}>
                    {paragraph}
                  </p>
                ))
              ) : (
                <p>
                  Complete notice information is not
                  currently available.
                </p>
              )}
            </div>
          </article>

          {notice.attachments.length > 0 ? (
            <section
              aria-labelledby={`notice-attachments-${notice.id}`}
              className="mt-12 border-t border-slate-200 pt-9"
            >
              <h3
                id={`notice-attachments-${notice.id}`}
                className="text-2xl font-bold text-slate-950"
              >
                Downloads and Attachments
              </h3>

              <div className="mt-6 space-y-4">
                {notice.attachments.map(
                  (attachment) => {
                    if (!attachment.file_url) {
                      return null
                    }

                    return (
                      <a
                        key={attachment.id}
                        href={attachment.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-green-300 hover:bg-green-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                      >
                        <div className="flex min-w-0 items-center gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                            <FileText
                              aria-hidden="true"
                              className="h-6 w-6"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate font-bold text-slate-950">
                              {attachment.title}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              {attachment.file_type ??
                                "Document"}
                            </p>
                          </div>
                        </div>

                        <Download
                          aria-hidden="true"
                          className="h-5 w-5 shrink-0 text-green-700 transition group-hover:translate-y-0.5"
                        />
                      </a>
                    )
                  },
                )}
              </div>
            </section>
          ) : null}
        </div>

        <div className="border-t border-slate-200 bg-white px-6 py-5 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex w-full items-center justify-center rounded-xl bg-green-700 px-6 py-3 font-bold text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
          >
            Close notice
          </button>
        </div>
      </section>
    </div>
  )
}