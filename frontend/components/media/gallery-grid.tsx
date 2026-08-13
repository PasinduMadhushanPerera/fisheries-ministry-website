"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import {
  CalendarDays,
  Images,
  MapPin,
  SearchX,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { GalleryFilter } from "@/components/media/gallery-filter"
import { Container } from "@/components/ui/container"
import {
  galleryAlbums,
  getGalleryImageCount,
  type GalleryCategory,
  type GalleryAlbum,
} from "@/data/gallery"

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All")
  const [searchQuery, setSearchQuery] = useState("")

  // Same-Page Photo Album Modal State
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)

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

  const openAlbumModal = (album: GalleryAlbum) => {
    setSelectedAlbum(album)
    setActiveImageIndex(0)
  }

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
        className="scroll-mt-24 bg-slate-50 py-12 sm:py-16"
      >
        <Container>
          <div className="flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-[#256B29] border border-emerald-200">
                <Images className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Photo Albums</span>
              </span>
              <h2
                id="gallery-albums-heading"
                className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900"
              >
                {activeCategory === "All" ? "All Photo Collections" : activeCategory}
              </h2>
            </div>

            <p aria-live="polite" className="text-xs font-bold text-slate-600">
              Showing {filteredAlbums.length} {filteredAlbums.length === 1 ? "album" : "albums"}
            </p>
          </div>

          {filteredAlbums.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredAlbums.map((album) => {
                const imageCount = getGalleryImageCount(album)

                return (
                  <article
                    key={album.slug}
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs transition-all duration-300 hover:border-slate-300 hover:shadow-md"
                  >
                    <div>
                      {/* Clickable Image Cover */}
                      <button
                        type="button"
                        onClick={() => openAlbumModal(album)}
                        className="relative block w-full aspect-[4/3] overflow-hidden bg-slate-900 text-left cursor-pointer group-hover:opacity-95"
                        aria-label={`Open ${album.title} gallery in preview popup`}
                      >
                        <Image
                          src={album.coverImage}
                          alt={album.coverImageAlt}
                          fill
                          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />

                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent"
                        />

                        {/* Category Badge */}
                        <div className="absolute left-3 top-3">
                          <span className="rounded-md bg-[#256B29] px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-xs">
                            {album.category}
                          </span>
                        </div>

                        {/* Image Counter Pill */}
                        <div className="absolute bottom-3 left-3">
                          <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-950/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md">
                            <Images aria-hidden="true" className="h-3.5 w-3.5 text-emerald-300" />
                            <span>{imageCount} {imageCount === 1 ? "photo" : "photos"}</span>
                          </span>
                        </div>
                      </button>

                      <div className="p-5">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                          <div className="flex items-center gap-1.5">
                            <CalendarDays aria-hidden="true" className="h-3.5 w-3.5 text-slate-400" />
                            <time dateTime={album.eventDate}>{album.displayDate}</time>
                          </div>

                          {album.location && (
                            <div className="flex items-center gap-1.5">
                              <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-slate-400" />
                              <span>{album.location}</span>
                            </div>
                          )}
                        </div>

                        <h3 className="mt-3 text-base font-extrabold text-slate-900 leading-snug">
                          <button
                            type="button"
                            onClick={() => openAlbumModal(album)}
                            className="text-left hover:text-[#388E3C] transition-colors cursor-pointer"
                          >
                            {album.title}
                          </button>
                        </h3>

                        <p className="mt-2 line-clamp-2 text-xs text-slate-600 leading-relaxed">
                          {album.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <button
                        type="button"
                        onClick={() => openAlbumModal(album)}
                        className="inline-flex min-h-[38px] w-full items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 text-xs font-extrabold text-[#256B29] transition hover:bg-[#388E3C] hover:text-white cursor-pointer border border-emerald-200"
                      >
                        <Images className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>View Album Photos ({imageCount})</span>
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <SearchX className="mx-auto h-10 w-10 text-slate-400" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-bold text-slate-900">No albums found</h3>
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

      {/* SAME-PAGE PHOTO GALLERY MODAL WITH Z-[9999] */}
      {selectedAlbum && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="album-modal-title"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/85 p-4 sm:p-6 backdrop-blur-md overflow-y-auto"
        >
          <div className="relative w-full max-w-4xl max-h-[88vh] flex flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto">
            {/* Modal Header Bar */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[#256B29] px-2.5 py-1 text-xs font-extrabold text-white">
                  {selectedAlbum.category}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Image {activeImageIndex + 1} of {selectedAlbum.images.length}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAlbum(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors cursor-pointer"
                aria-label="Close album preview"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable Body Container */}
            <div className="flex-1 overflow-y-auto">
              {/* Main Lightbox Image View */}
              <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden flex items-center justify-center">
                {selectedAlbum.images[activeImageIndex] && (
                  <>
                    <Image
                      src={selectedAlbum.images[activeImageIndex].src}
                      alt={selectedAlbum.images[activeImageIndex].alt}
                      fill
                      className="object-contain"
                    />

                    {/* Previous / Next Controls */}
                    {selectedAlbum.images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveImageIndex((prev) =>
                              prev === 0 ? selectedAlbum.images.length - 1 : prev - 1
                            )
                          }
                          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/80 text-white hover:bg-[#388E3C] transition cursor-pointer shadow-lg"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setActiveImageIndex((prev) =>
                              prev === selectedAlbum.images.length - 1 ? 0 : prev + 1
                            )
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/80 text-white hover:bg-[#388E3C] transition cursor-pointer shadow-lg"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Image Details & Caption */}
              <div className="p-6 sm:p-8 space-y-4">
                <div>
                  <h3 id="album-modal-title" className="text-xl font-extrabold text-slate-900">
                    {selectedAlbum.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600">
                    {selectedAlbum.images[activeImageIndex]?.caption || selectedAlbum.description}
                  </p>
                </div>

                {/* Thumbnails Strip */}
                {selectedAlbum.images.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pt-2 pb-2">
                    {selectedAlbum.images.map((img, idx) => (
                      <button
                        key={img.id}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                          activeImageIndex === idx ? "border-[#256B29] ring-2 ring-emerald-300" : "border-slate-200 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image src={img.src} alt={img.alt} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Footer Bar */}
            <div className="flex shrink-0 items-center justify-between border-t border-slate-200 px-6 py-4 bg-slate-50">
              <span className="text-xs font-semibold text-slate-500">
                Date: {selectedAlbum.displayDate} • Location: {selectedAlbum.location || "Ministry HQ"}
              </span>

              <button
                type="button"
                onClick={() => setSelectedAlbum(null)}
                className="inline-flex min-h-[38px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <span>Close Preview</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}