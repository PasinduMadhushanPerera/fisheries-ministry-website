"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  Images,
  MapPin,
  SearchX,
} from "lucide-react"

import { GalleryFilter } from "@/components/media/gallery-filter"
import { Container } from "@/components/ui/container"
import {
  galleryAlbums,
  getGalleryImageCount,
  type GalleryCategory,
} from "@/data/gallery"

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory>("All")

  const [searchQuery, setSearchQuery] = useState("")

  const filteredAlbums = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()

    return galleryAlbums.filter((album) => {
      const matchesCategory =
        activeCategory === "All" || album.category === activeCategory

      const matchesSearch =
        keyword.length === 0 ||
        album.title.toLowerCase().includes(keyword) ||
        album.description.toLowerCase().includes(keyword) ||
        album.category.toLowerCase().includes(keyword) ||
        album.location?.toLowerCase().includes(keyword)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <>
      <GalleryFilter
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onCategoryChange={setActiveCategory}
        onSearchChange={setSearchQuery}
      />

      <section
        id="gallery-albums"
        aria-labelledby="gallery-albums-heading"
        className="scroll-mt-24 bg-slate-50 py-16 sm:py-20"
      >
        <Container>
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                Photo collections
              </p>

              <h2
                id="gallery-albums-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
              >
                {activeCategory === "All"
                  ? "All Gallery Albums"
                  : activeCategory}
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                Browse official photographs from Ministry events, projects,
                field visits and community programmes.
              </p>
            </div>

            <p
              aria-live="polite"
              className="text-sm font-semibold text-slate-600"
            >
              {filteredAlbums.length}{" "}
              {filteredAlbums.length === 1 ? "album" : "albums"}
            </p>
          </div>

          {filteredAlbums.length > 0 ? (
            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredAlbums.map((album) => {
                const imageCount = getGalleryImageCount(album)

                return (
                  <article
                    key={album.slug}
                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
                  >
                    <Link
                      href={`/media-centre/gallery/${album.slug}`}
                      className="block"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={album.coverImage}
                          alt={album.coverImageAlt}
                          fill
                          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />

                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent"
                        />

                        <div className="absolute left-4 top-4">
                          <span className="rounded-full bg-green-700 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                            {album.category}
                          </span>
                        </div>

                        <div className="absolute bottom-4 left-4">
                          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/65 px-3 py-2 text-sm font-semibold text-white backdrop-blur-md">
                            <Images
                              aria-hidden="true"
                              className="h-4 w-4 text-green-200"
                            />

                            {imageCount}{" "}
                            {imageCount === 1 ? "photo" : "photos"}
                          </span>
                        </div>
                      </div>
                    </Link>

                    <div className="p-6">
                      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          <CalendarDays
                            aria-hidden="true"
                            className="h-4 w-4 text-green-700"
                          />

                          <time dateTime={album.eventDate}>
                            {album.displayDate}
                          </time>
                        </div>

                        {album.location ? (
                          <div className="flex items-center gap-2">
                            <MapPin
                              aria-hidden="true"
                              className="h-4 w-4 text-green-700"
                            />

                            <span>{album.location}</span>
                          </div>
                        ) : null}
                      </div>

                      <h3 className="mt-5 text-xl font-bold leading-8 text-slate-950">
                        <Link
                          href={`/media-centre/gallery/${album.slug}`}
                          className="transition hover:text-green-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                        >
                          {album.title}
                        </Link>
                      </h3>

                      <p className="mt-4 line-clamp-3 leading-7 text-slate-600">
                        {album.description}
                      </p>

                      <Link
                        href={`/media-centre/gallery/${album.slug}`}
                        className="mt-6 inline-flex items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                      >
                        View album

                        <ArrowRight
                          aria-hidden="true"
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </article>
                )
              })}
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
                No albums found
              </h3>

              <p className="mx-auto mt-4 max-w-lg leading-7 text-slate-600">
                Try another search term or select a different category to
                explore more Ministry photo albums.
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