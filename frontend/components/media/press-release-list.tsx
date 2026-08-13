"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import {
  CalendarDays,
  FileText,
  MapPin,
  SearchX,
  Tag,
  X,
  Printer,
  ShieldCheck,
} from "lucide-react"

import { PressReleaseFilter } from "@/components/media/press-release-filter"
import { Container } from "@/components/ui/container"
import {
  pressReleases,
  type PressReleaseCategory,
  type PressRelease,
} from "@/data/press-releases"

export function PressReleaseList() {
  const [activeCategory, setActiveCategory] = useState<PressReleaseCategory>("All")
  const [searchQuery, setSearchQuery] = useState("")

  // Same-Page Press Release Modal State
  const [selectedRelease, setSelectedRelease] = useState<PressRelease | null>(null)

  const filteredPressReleases = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()

    return pressReleases.filter((pressRelease) => {
      const matchesCategory =
        activeCategory === "All" || pressRelease.category === activeCategory

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
        className="scroll-mt-24 bg-slate-50 py-12 sm:py-16"
      >
        <Container>
          <div className="flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-[#256B29] border border-emerald-200">
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Official Statements</span>
              </span>
              <h2
                id="press-release-library-heading"
                className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900"
              >
                {activeCategory === "All" ? "All Press Releases" : activeCategory}
              </h2>
            </div>

            <p aria-live="polite" className="text-xs font-bold text-slate-600">
              Showing {filteredPressReleases.length}{" "}
              {filteredPressReleases.length === 1 ? "press release" : "press releases"}
            </p>
          </div>

          {filteredPressReleases.length > 0 ? (
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {filteredPressReleases.map((pressRelease) => (
                <article
                  key={pressRelease.slug}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs transition-all duration-300 hover:border-slate-300 hover:shadow-md"
                >
                  <div className="grid h-full sm:grid-cols-[13rem_1fr]">
                    {/* Clickable Image */}
                    <button
                      type="button"
                      onClick={() => setSelectedRelease(pressRelease)}
                      className="relative block w-full min-h-[14rem] overflow-hidden bg-slate-900 text-left cursor-pointer group-hover:opacity-95"
                      aria-label={`Read ${pressRelease.title} in preview popup`}
                    >
                      <Image
                        src={pressRelease.image ?? "/images/placeholder.jpg"}
                        alt={pressRelease.imageAlt ?? pressRelease.title}
                        fill
                        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 35vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent"
                      />

                      <div className="absolute left-3 top-3">
                        <span className="rounded-md bg-[#256B29] px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-xs">
                          {pressRelease.category}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-950/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md">
                          <Tag aria-hidden="true" className="h-3.5 w-3.5 text-emerald-300" />
                          <span>{pressRelease.referenceNumber}</span>
                        </span>
                      </div>
                    </button>

                    <div className="flex flex-col justify-between p-5">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                          <div className="flex items-center gap-1.5">
                            <CalendarDays aria-hidden="true" className="h-3.5 w-3.5 text-slate-400" />
                            <time dateTime={pressRelease.publishedDate}>{pressRelease.displayDate}</time>
                          </div>

                          {pressRelease.location && (
                            <div className="flex items-center gap-1.5">
                              <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-slate-400" />
                              <span>{pressRelease.location}</span>
                            </div>
                          )}
                        </div>

                        <h3 className="mt-3 text-base font-extrabold text-slate-900 leading-snug">
                          <button
                            type="button"
                            onClick={() => setSelectedRelease(pressRelease)}
                            className="text-left hover:text-[#388E3C] transition-colors cursor-pointer"
                          >
                            {pressRelease.title}
                          </button>
                        </h3>

                        <p className="mt-2 line-clamp-3 text-xs text-slate-600 leading-relaxed">
                          {pressRelease.summary}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-slate-500">Ref: {pressRelease.referenceNumber}</span>
                        <button
                          type="button"
                          onClick={() => setSelectedRelease(pressRelease)}
                          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#256B29] hover:text-[#388E3C] cursor-pointer"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          <span>Read Full Release</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <SearchX className="mx-auto h-10 w-10 text-slate-400" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-bold text-slate-900">No press releases found</h3>
              <p className="mt-1 text-xs text-slate-600">Try adjusting your search query or selected category.</p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All")
                  setSearchQuery("")
                }}
                className="mt-4 rounded-xl bg-[#388E3C] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#256B29] cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* SAME-PAGE PRESS RELEASE PREVIEW MODAL WITH Z-[9999] AND MAX-H-[88VH] */}
      {selectedRelease && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="press-release-modal-title"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 p-4 sm:p-6 backdrop-blur-md overflow-y-auto"
        >
          <div className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[#256B29] px-2.5 py-1 text-xs font-extrabold text-white">
                  {selectedRelease.category}
                </span>
                <span className="text-xs font-bold text-slate-500">Official Press Release</span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRelease(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors cursor-pointer"
                aria-label="Close press release modal"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 mb-2">
                  <span>Ref: {selectedRelease.referenceNumber}</span>
                  <span>•</span>
                  <span>Published: {selectedRelease.displayDate}</span>
                  <span>•</span>
                  <span>Location: {selectedRelease.location || "Ministry HQ, Colombo"}</span>
                </div>

                <h3 id="press-release-modal-title" className="text-2xl font-extrabold text-slate-900 leading-snug">
                  {selectedRelease.title}
                </h3>
              </div>

              {selectedRelease.image && (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                  <Image
                    src={selectedRelease.image}
                    alt={selectedRelease.imageAlt || selectedRelease.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="prose max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4 font-normal">
                <p className="font-semibold text-slate-900 leading-relaxed text-base">
                  {selectedRelease.summary}
                </p>
                <p>
                  <strong>COLOMBO, SRI LANKA</strong> — The Ministry of Fisheries, Aquatic and Ocean Resources hereby releases the following official statement regarding key sectoral developments and policy actions.
                </p>
                <p>
                  All official departments, regional offices, and coastal authorities are advised to align operational guidelines with the directives contained within this release.
                </p>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 flex items-center gap-3 text-xs text-slate-700">
                <ShieldCheck className="h-5 w-5 text-[#256B29] shrink-0" />
                <span>This press release has been verified and authenticated by the Official Press Information Desk of the Ministry of Fisheries.</span>
              </div>
            </div>

            {/* Modal Action Bar */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 px-6 py-4 bg-slate-50">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <Printer className="h-3.5 w-3.5 text-slate-500" />
                <span>Print Release</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRelease(null)}
                className="inline-flex min-h-[38px] items-center gap-2 rounded-xl bg-[#388E3C] px-5 text-xs font-bold text-white hover:bg-[#256B29] transition cursor-pointer"
              >
                <span>Close Statement</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}