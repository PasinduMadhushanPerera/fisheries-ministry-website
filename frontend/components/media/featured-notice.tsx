import Link from "next/link"
import {
  ArrowRight,
  BellRing,
  CalendarDays,
  Clock3,
  FileText,
  MapPin,
  Tag,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { getFeaturedNotice } from "@/data/notices"

const statusStyles = {
  Open: "border-green-200 bg-green-100 text-green-800",
  "Closing Soon": "border-amber-200 bg-amber-100 text-amber-800",
  Closed: "border-slate-200 bg-slate-100 text-slate-700",
}

export function FeaturedNotice() {
  const featuredNotice = getFeaturedNotice()

  if (!featuredNotice) {
    return null
  }

  return (
    <section
      aria-labelledby="featured-notice-heading"
      className="bg-white py-16 sm:py-20"
    >
      <Container>
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
              Featured notice
            </p>

            <h2
              id="featured-notice-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
            >
              Important Public Announcement
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Review the latest featured notice and complete any required
              action before the stated deadline.
            </p>
          </div>

          <Link
            href="#notices-library"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
          >
            View all notices

            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4"
            />
          </Link>
        </div>

        <article className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
          <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            <div className="relative overflow-hidden bg-[linear-gradient(145deg,#071d24_0%,#0a322f_55%,#0a4350_100%)] p-7 text-white sm:p-10 lg:p-12">
              <div
                aria-hidden="true"
                className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/10 bg-white/[0.04]"
              />

              <div
                aria-hidden="true"
                className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full border border-green-200/10 bg-green-300/[0.04]"
              />

              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-300 text-slate-950">
                  <BellRing
                    aria-hidden="true"
                    className="h-8 w-8"
                  />
                </div>

                <p className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-green-200">
                  Notice information
                </p>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                    <p className="text-sm text-slate-300">
                      Reference number
                    </p>

                    <p className="mt-2 break-words text-xl font-bold">
                      {featuredNotice.referenceNumber}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                      <CalendarDays
                        aria-hidden="true"
                        className="h-6 w-6 text-green-200"
                      />

                      <p className="mt-4 text-sm text-slate-300">
                        Published
                      </p>

                      <p className="mt-1 font-semibold">
                        {featuredNotice.displayPublishedDate}
                      </p>
                    </div>

                    {featuredNotice.displayClosingDate ? (
                      <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                        <Clock3
                          aria-hidden="true"
                          className="h-6 w-6 text-green-200"
                        />

                        <p className="mt-4 text-sm text-slate-300">
                          Closing date
                        </p>

                        <p className="mt-1 font-semibold">
                          {featuredNotice.displayClosingDate}
                        </p>
                      </div>
                    ) : null}
                  </div>

                  {featuredNotice.location ? (
                    <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                      <MapPin
                        aria-hidden="true"
                        className="mt-0.5 h-6 w-6 shrink-0 text-green-200"
                      />

                      <div>
                        <p className="text-sm text-slate-300">
                          Applicable location
                        </p>

                        <p className="mt-1 font-semibold">
                          {featuredNotice.location}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-green-700 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white">
                  {featuredNotice.category}
                </span>

                <span
                  className={[
                    "rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wide",
                    statusStyles[featuredNotice.status],
                  ].join(" ")}
                >
                  {featuredNotice.status}
                </span>
              </div>

              <h3 className="mt-6 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
                <Link
                  href={`/media-centre/notices/${featuredNotice.slug}`}
                  className="transition hover:text-green-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                >
                  {featuredNotice.title}
                </Link>
              </h3>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                {featuredNotice.summary}
              </p>

              <div className="mt-8 grid gap-4 border-y border-slate-200 py-6 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Tag
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-green-700"
                  />

                  <div>
                    <p className="text-sm text-slate-500">
                      Notice category
                    </p>

                    <p className="mt-1 font-semibold text-slate-950">
                      {featuredNotice.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-green-700"
                  />

                  <div>
                    <p className="text-sm text-slate-500">
                      Issuing department
                    </p>

                    <p className="mt-1 font-semibold text-slate-950">
                      {featuredNotice.department ?? "Ministry"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`/media-centre/notices/${featuredNotice.slug}`}
                  className="inline-flex items-center gap-3 rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                >
                  View full notice

                  <ArrowRight
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </Link>

                {featuredNotice.applicationUrl &&
                featuredNotice.status !== "Closed" ? (
                  <Link
                    href={featuredNotice.applicationUrl}
                    className="inline-flex items-center gap-3 rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:border-green-300 hover:bg-green-50 hover:text-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                  >
                    Apply or continue
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </article>
      </Container>
    </section>
  )
}