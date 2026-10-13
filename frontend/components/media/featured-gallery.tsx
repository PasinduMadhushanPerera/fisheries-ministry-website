"use client"

import { useState } from "react"
import Image from "next/image"
import {
  CalendarDays,
  Images,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import {
  getFeaturedGalleryAlbum,
  getGalleryImageCount,
  type GalleryAlbum,
} from "@/data/gallery"

export function FeaturedGallery() {
  const featuredAlbum = getFeaturedGalleryAlbum()
  const [modalAlbum, setModalAlbum] = useState<GalleryAlbum | null>(null)
  const [activeImageIdx, setActiveImageIdx] = useState(0)

  if (!featuredAlbum) {
    return null
  }

  const imageCount = getGalleryImageCount(featuredAlbum)

  const openModal = () => {
    setModalAlbum(featuredAlbum)
    setActiveImageIdx(0)
  }

  return (
    <>
      <section aria-labelledby="featured-gallery-heading" className="bg-white py-12 sm:py-16">
        <Container>
          <div className="flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-[#256B29] border border-emerald-200">
                <Images className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Featured Collection</span>
              </span>
              <h2
                id="featured-gallery-heading"
                className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900"
              >
                Latest Photo Album
              </h2>
            </div>
          </div>

          <article className="group mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
            <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
              <button
                type="button"
                onClick={openModal}
                className="relative block w-full min-h-72 sm:min-h-[26rem] overflow-hidden text-left cursor-pointer"
              >
                <Image
                  src={featuredAlbum.coverImage}
                  alt={featuredAlbum.coverImageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                <div className="absolute left-5 top-5">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-950/80 px-3 py-1.5 text-xs font-extrabold text-white backdrop-blur-md">
                    <Images aria-hidden="true" className="h-3.5 w-3.5 text-emerald-300" />
                    <span>Featured Album</span>
                  </span>
                </div>

                <div className="absolute bottom-5 left-5">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-white/90 px-3 py-1.5 text-xs font-extrabold text-slate-900 shadow-md">
                    <span>{imageCount} {imageCount === 1 ? "photo" : "photos"}</span>
                  </span>
                </div>
              </button>

              <div className="flex flex-col justify-center p-7 sm:p-10">
                <span className="w-fit rounded-md bg-emerald-100 border border-emerald-200 px-3 py-1 text-xs font-extrabold text-[#256B29]">
                  {featuredAlbum.category}
                </span>

                <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays aria-hidden="true" className="h-3.5 w-3.5 text-[#256B29]" />
                    <span>{featuredAlbum.displayDate}</span>
                  </div>

                  {featuredAlbum.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-[#256B29]" />
                      <span>{featuredAlbum.location}</span>
                    </div>
                  )}
                </div>

                <h3 className="mt-3 text-2xl font-extrabold text-slate-900 leading-tight">
                  <button type="button" onClick={openModal} className="text-left hover:text-[#388E3C] transition-colors cursor-pointer">
                    {featuredAlbum.title}
                  </button>
                </h3>

                <button
                  type="button"
                  onClick={openModal}
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-[#388E3C] px-5 py-2.5 text-xs font-extrabold text-white transition hover:bg-[#256B29] cursor-pointer"
                >
                  <Images className="h-4 w-4" aria-hidden="true" />
                  <span>View Album Photos ({imageCount})</span>
                </button>
              </div>
            </div>
          </article>
        </Container>
      </section>

      {/* MODAL WITH Z-[9999] */}
      {modalAlbum && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="featured-album-modal-title"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/85 p-4 sm:p-6 backdrop-blur-md overflow-y-auto"
        >
          <div className="relative w-full max-w-4xl max-h-[88vh] flex flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto">
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[#256B29] px-2.5 py-1 text-xs font-extrabold text-white">
                  {modalAlbum.category}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Image {activeImageIdx + 1} of {modalAlbum.images.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setModalAlbum(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden flex items-center justify-center">
                {modalAlbum.images[activeImageIdx] && (
                  <>
                    <Image src={modalAlbum.images[activeImageIdx].src} alt={modalAlbum.images[activeImageIdx].alt} fill className="object-contain" />
                    {modalAlbum.images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => setActiveImageIdx((prev) => (prev === 0 ? modalAlbum.images.length - 1 : prev - 1))}
                          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/80 text-white hover:bg-[#388E3C] transition cursor-pointer"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveImageIdx((prev) => (prev === modalAlbum.images.length - 1 ? 0 : prev + 1))}
                          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/80 text-white hover:bg-[#388E3C] transition cursor-pointer"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div>
                  <h3 id="featured-album-modal-title" className="text-xl font-extrabold text-slate-900">
                    {modalAlbum.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600">
                    {modalAlbum.images[activeImageIdx]?.caption || modalAlbum.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center justify-between border-t border-slate-200 px-6 py-4 bg-slate-50">
              <span className="text-xs font-semibold text-slate-500">
                Date: {modalAlbum.displayDate} • Location: {modalAlbum.location || "Colombo"}
              </span>
              <button
                type="button"
                onClick={() => setModalAlbum(null)}
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