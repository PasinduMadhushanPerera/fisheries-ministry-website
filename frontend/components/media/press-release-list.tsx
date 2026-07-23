"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  FileText,
  MapPin,
  SearchX,
  Tag,
} from "lucide-react"

import { PressReleaseFilter } from "@/components/media/press-release-filter"
import { Container } from "@/components/ui/container"
import {
  pressReleases,
  type PressReleaseCategory,
} from "@/data/press-releases"

export function PressReleaseList() {
  const [activeCategory, setActiveCategory] =
    useState<PressReleaseCategory>("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPressReleases = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()

    return pressReleases.filter((pressRelease) => {
      const matchesCategory =
        activeCategory === "All" ||
        pressRelease.category === activeCategory

      const matchesSearch =
        keyword.length === 0 ||
        pressRelease.title.toLowerCase().includes(keyword) ||
        pressRelease.summary.toLowerCase().includes(keyword) ||
        pressRelease.category.toLowerCase().includes(keyword) ||
        pressRelease.referenceNumber.toLowerCase().includes(keyword) ||
        pressRelease.location?.toLowerCase().includes(keyword)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <>
      <PressReleaseFilter
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onCategoryChange={setActiveCategory}
        onSearchChange={setSearchQuery}
      />

      <section
        id="press-release-library"
        aria-labelledby="press-release-library-heading"
        className="scroll-mt-24 bg-slate-50 py-16 sm:py-20"
      >
        <Container>
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                Official archive
              </p>

              <h2
                id="press-release-library-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
              >
                {activeCategory === "All"
                  ? "All Press Releases"
                  : activeCategory}
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                Browse official Ministry statements, public announcements and
                verified updates.
              </p>
            </div>

            <p
              aria-live="polite"
              className="text-sm font-semibold text-slate-600"
            >
              {filteredPressReleases.length}{" "}
              {filteredPressReleases.length === 1
                ? "press release"
                : "press releases"}
            </p>
          </div>

          {filteredPressReleases.length > 0 ? (
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              {filteredPressReleases.map((pressRelease) => (
                <article
                  key={pressRelease.slug}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
                >
                  <div className="grid h-full sm:grid-cols-[14rem_1fr]">
                    <Link
                      href={`/media-centre/press-releases/${pressRelease.slug}`}
                      className="relative block min-h-[15rem] overflow-hidden sm:min-h-full"
                    >
                      <Image
                        src={
                          pressRelease.image ??
                          "/images/placeholder.jpg"
                        }
                        alt={
                          pressRelease.imageAlt ??
                          pressRelease.title
                        }
                        fill
                        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 35vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent"
                      />

                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-green-700 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
                          {pressRelease.category}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/70 px-3 py-2 text-xs font-semibold text-white backdrop-blur">
                          <Tag
                            aria-hidden="true"
                            className="h-3.5 w-3.5 text-green-200"
                          />

                          {pressRelease.referenceNumber}
                        </span>
                      </div>
                    </Link>

                    <div className="flex flex-col p-6">
                      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          <CalendarDays
                            aria-hidden="true"
                            className="h-4 w-4 text-green-700"
                          />

                          <time dateTime={pressRelease.publishedDate}>
                            {pressRelease.displayDate}
                          </time>
                        </div>

                        {pressRelease.location ? (
                          <div className="flex items-center gap-2">
                            <MapPin
                              aria-hidden="true"
                              className="h-4 w-4 text-green-700"
                            />

                            <span>{pressRelease.location}</span>
                          </div>
                        ) : null}
                      </div>

                      <h3 className="mt-5 text-xl font-bold leading-8 text-slate-950">
                        <Link
                          href={`/media-centre/press-releases/${pressRelease.slug}`}
                          className="transition hover:text-green-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                        >
                          {pressRelease.title}
                        </Link>
                      </h3>

                      <p className="mt-4 line-clamp-3 leading-7 text-slate-600">
                        {pressRelease.summary}
                      </p>

                      <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                          <FileText
                            aria-hidden="true"
                            className="h-4 w-4 text-green-700"
                          />

                          Official release
                        </div>

                        <Link
                          href={`/media-centre/press-releases/${pressRelease.slug}`}
                          className="inline-flex items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                        >
                          Read more

                          <ArrowRight
                            aria-hidden="true"
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          />
                        </Link>
                      </div>
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
                No press releases found
              </h3>

              <p className="mx-auto mt-4 max-w-lg leading-7 text-slate-600">
                Try another search term or select a different category to
                explore more official announcements.
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