"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BellRing,
  Building2,
  CalendarDays,
  Clock3,
  FileText,
  MapPin,
  SearchX,
  Tag,
} from "lucide-react"

import { NoticeFilter } from "@/components/media/notice-filter"
import { Container } from "@/components/ui/container"
import {
  notices,
  type NoticeCategory,
  type NoticeStatus,
} from "@/data/notices"

const statusStyles: Record<NoticeStatus, string> = {
  Open: "border-green-200 bg-green-100 text-green-800",
  "Closing Soon": "border-amber-200 bg-amber-100 text-amber-800",
  Closed: "border-slate-200 bg-slate-100 text-slate-700",
}

export function NoticeList() {
  const [activeCategory, setActiveCategory] =
    useState<NoticeCategory>("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredNotices = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()

    return notices.filter((notice) => {
      const matchesCategory =
        activeCategory === "All" ||
        notice.category === activeCategory

      const matchesSearch =
        keyword.length === 0 ||
        notice.title.toLowerCase().includes(keyword) ||
        notice.summary.toLowerCase().includes(keyword) ||
        notice.category.toLowerCase().includes(keyword) ||
        notice.status.toLowerCase().includes(keyword) ||
        notice.referenceNumber.toLowerCase().includes(keyword) ||
        notice.department?.toLowerCase().includes(keyword) ||
        notice.location?.toLowerCase().includes(keyword)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <>
      <NoticeFilter
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
                Browse Ministry notices, deadlines, procurement opportunities,
                recruitment announcements and licensing updates.
              </p>
            </div>

            <p
              aria-live="polite"
              className="text-sm font-semibold text-slate-600"
            >
              {filteredNotices.length}{" "}
              {filteredNotices.length === 1 ? "notice" : "notices"}
            </p>
          </div>

          {filteredNotices.length > 0 ? (
            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredNotices.map((notice) => (
                <article
                  key={notice.slug}
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
                            statusStyles[notice.status],
                          ].join(" ")}
                        >
                          {notice.status}
                        </span>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-semibold">
                        <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-green-100 backdrop-blur">
                          {notice.category}
                        </span>

                        <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-slate-200 backdrop-blur">
                          {notice.referenceNumber}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <CalendarDays
                          aria-hidden="true"
                          className="h-4 w-4 text-green-700"
                        />

                        <time dateTime={notice.publishedDate}>
                          {notice.displayPublishedDate}
                        </time>
                      </div>

                      {notice.location ? (
                        <div className="flex items-center gap-2">
                          <MapPin
                            aria-hidden="true"
                            className="h-4 w-4 text-green-700"
                          />

                          <span>{notice.location}</span>
                        </div>
                      ) : null}
                    </div>

                    <h3 className="mt-5 text-xl font-bold leading-8 text-slate-950">
                      <Link
                        href={`/media-centre/notices/${notice.slug}`}
                        className="transition hover:text-green-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                      >
                        {notice.title}
                      </Link>
                    </h3>

                    <p className="mt-4 line-clamp-3 leading-7 text-slate-600">
                      {notice.summary}
                    </p>

                    <div className="mt-6 space-y-4 border-y border-slate-200 py-5">
                      {notice.displayClosingDate ? (
                        <div className="flex items-start gap-3">
                          <Clock3
                            aria-hidden="true"
                            className={[
                              "mt-0.5 h-5 w-5 shrink-0",
                              notice.status === "Closing Soon"
                                ? "text-amber-600"
                                : notice.status === "Closed"
                                  ? "text-slate-500"
                                  : "text-green-700",
                            ].join(" ")}
                          />

                          <div>
                            <p className="text-sm text-slate-500">
                              Closing date
                            </p>

                            <p className="mt-1 font-semibold text-slate-950">
                              {notice.displayClosingDate}
                            </p>
                          </div>
                        </div>
                      ) : null}

                      {notice.department ? (
                        <div className="flex items-start gap-3">
                          <Building2
                            aria-hidden="true"
                            className="mt-0.5 h-5 w-5 shrink-0 text-green-700"
                          />

                          <div>
                            <p className="text-sm text-slate-500">
                              Issuing department
                            </p>

                            <p className="mt-1 font-semibold leading-6 text-slate-950">
                              {notice.department}
                            </p>
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                        <FileText
                          aria-hidden="true"
                          className="h-4 w-4 text-green-700"
                        />

                        Official notice
                      </div>

                      <Link
                        href={`/media-centre/notices/${notice.slug}`}
                        className="inline-flex items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                      >
                        View notice

                        <ArrowRight
                          aria-hidden="true"
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
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
                Try another search term or select a different category to
                explore more Ministry notices.
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
          )}
        </Container>
      </section>
    </>
  )
}