"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Camera,
  Images,
  PlayCircle,
  Play,
  X,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { galleryPreview, type GalleryItem } from "@/data/media"

export function MediaGalleryPreview() {
  const photos = galleryPreview.filter((item) => item.type === "photo")
  const videos = galleryPreview.filter((item) => item.type === "video")

  // Same-Page Preview Modal State
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  return (
    <>
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#256B29]">
                Media Archives
              </p>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Photo & Video Gallery Highlights
              </h2>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Explore official photographs and video recordings showcasing ministry programmes, fisheries development initiatives, and special events across Sri Lanka.
              </p>
            </div>

            <Link
              href="/media-centre/gallery"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#256B29] transition hover:text-[#388E3C]"
            >
              <span>Browse Full Gallery</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Photo Gallery Highlights */}
          <div className="mt-12">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-[#256B29]">
                  <Images className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Photo Gallery
                  </h3>
                  <p className="text-xs text-slate-500">
                    Latest Ministry photo collections
                  </p>
                </div>
              </div>

              <Link
                href="/media-centre/gallery"
                className="hidden text-xs font-bold text-[#256B29] hover:text-[#388E3C] md:inline-flex"
              >
                View All Albums
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {photos.map((photo) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setSelectedItem(photo)}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs transition duration-300 hover:border-slate-300 hover:shadow-md text-left cursor-pointer"
                  aria-label={`Preview photo: ${photo.title}`}
                >
                  <div className="relative h-60 overflow-hidden bg-slate-900">
                    <Image
                      src={photo.image}
                      alt={photo.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

                    <div className="absolute left-4 top-4 rounded-lg bg-white/90 p-2 text-slate-900 shadow-md">
                      <Camera className="h-4 w-4 text-[#256B29]" />
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-sm font-extrabold text-white leading-snug">
                        {photo.title}
                      </h4>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Video Gallery Highlights */}
          <div className="mt-16">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-[#256B29]">
                  <PlayCircle className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Video Gallery
                  </h3>
                  <p className="text-xs text-slate-500">
                    Official Ministry video coverage
                  </p>
                </div>
              </div>

              <Link
                href="/media-centre/videos"
                className="hidden text-xs font-bold text-[#256B29] hover:text-[#388E3C] md:inline-flex"
              >
                View All Videos
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {videos.map((video) => (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => setSelectedItem(video)}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs transition duration-300 hover:border-slate-300 hover:shadow-md text-left cursor-pointer"
                  aria-label={`Preview video: ${video.title}`}
                >
                  <div className="relative h-64 overflow-hidden bg-slate-900">
                    <Image
                      src={video.image}
                      alt={video.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-slate-950/40 transition group-hover:bg-slate-950/30" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[#256B29] shadow-lg transition duration-300 group-hover:scale-110">
                        <PlayCircle className="h-8 w-8 fill-current" />
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="rounded-md bg-[#256B29] px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white">
                        Official Video
                      </span>

                      <h4 className="mt-2 text-base font-extrabold text-white leading-snug">
                        {video.title}
                      </h4>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="mt-16 rounded-3xl bg-[linear-gradient(135deg,#061d24_0%,#0a322f_50%,#0a4350_100%)] p-8 text-center text-white sm:p-12">
            <Images className="mx-auto h-10 w-10 text-emerald-300" />

            <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight !text-white">
              Explore Our Complete Media Gallery
            </h3>

            <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-slate-300 leading-relaxed">
              Browse photographs and videos documenting ministry projects, marine conservation, fisheries development, public programmes and official events across Sri Lanka.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/media-centre/gallery"
                className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-white px-5 text-xs font-extrabold text-slate-950 transition hover:bg-slate-100  !text-black"
              >
                <span>Photo Gallery</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/media-centre/videos"
                className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 text-xs font-extrabold text-white transition hover:bg-white/20"
              >
                <span>Video Gallery</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* SAME-PAGE PREVIEW MODAL WITH Z-[9999] */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-modal-title"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/85 p-4 sm:p-6 backdrop-blur-md overflow-y-auto"
        >
          <div className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[#256B29] px-2.5 py-1 text-xs font-extrabold text-white">
                  {selectedItem.type === "photo" ? "Photo Preview" : "Video Preview"}
                </span>
                <span className="text-xs font-bold text-slate-500">Ministry Media Archive</span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors cursor-pointer"
                aria-label="Close media preview"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Media Body */}
            <div className="flex-1 overflow-y-auto">
              <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden flex items-center justify-center">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                />

                {selectedItem.type === "video" && (
                  <div className="relative z-10 text-center p-6 space-y-3">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#388E3C] text-white shadow-2xl">
                      <Play className="h-8 w-8 fill-current ml-1" aria-hidden="true" />
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8 space-y-3">
                <h3 id="preview-modal-title" className="text-xl font-extrabold text-slate-900">
                  {selectedItem.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Official media release documented by the Ministry of Fisheries, Aquatic and Ocean Resources.
                </p>
              </div>
            </div>

            {/* Modal Action Bar */}
            <div className="flex shrink-0 items-center justify-between border-t border-slate-200 px-6 py-4 bg-slate-50">
              <Link
                href={selectedItem.type === "photo" ? "/media-centre/gallery" : "/media-centre/videos"}
                className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl bg-[#388E3C] px-4 text-xs font-bold text-white hover:bg-[#256B29] transition"
              >
                <span>View Full {selectedItem.type === "photo" ? "Gallery" : "Videos"} Page</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="inline-flex min-h-[38px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
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