"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  CalendarDays,
  Images,
  MapPin,
  Maximize2,
  Printer,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Container } from "@/components/ui/container"
import { stripHtml } from "@/lib/utils"
import type { ApiGalleryAlbum, ApiGalleryPhoto } from "@/lib/api/gallery"

interface GalleryDetailContentProps {
  album: ApiGalleryAlbum
}

export function GalleryDetailContent({ album }: GalleryDetailContentProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const photos: ApiGalleryPhoto[] = album.images && album.images.length > 0
    ? album.images
    : [
        {
          id: album.id,
          order: 1,
          src: album.cover_image_url || "/images/home/hero-fishing-harbour.jpg",
          alt: album.cover_image_alt || album.title,
          caption: album.description,
        },
      ]

  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: album.title,
          text: album.description,
          url: window.location.href,
        })
      } catch {
        // Ignored
      }
    }
  }

  return (
    <article className="py-12 bg-slate-50/50 min-h-screen">
      <Container>
        {/* Top Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/media-centre/gallery"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#256B29] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Collections</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Main Content Box */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          {/* Header */}
          <div className="bg-[linear-gradient(135deg,#041c22_0%,#093835_55%,#0c4e48_100%)] p-6 sm:p-10 text-white relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-md bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                  {album.category_label || "Photo Collection"}
                </span>

                <span className="inline-flex items-center gap-1 rounded-md bg-white/15 border border-white/20 px-2.5 py-0.5 text-xs font-bold text-white">
                  <Images className="h-3.5 w-3.5" />
                  <span>{photos.length} High-Res Photos</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold !text-white leading-tight tracking-tight max-w-4xl">
                {stripHtml(album.title)}
              </h1>

              <div className="pt-3 border-t border-white/15 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-bold text-emerald-200">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-emerald-300" />
                  <span>{album.location || "Sri Lanka"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-emerald-300" />
                  <span>{album.display_date || album.event_date || "Recent"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-6 sm:p-10 border-b border-slate-100">
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl">
              {stripHtml(album.description)}
            </p>
          </div>

          {/* Photo Gallery Grid */}
          <div className="p-6 sm:p-10">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo, idx) => (
                <div
                  key={photo.id || idx}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative aspect-4/3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-2xs cursor-pointer"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt || `Photo ${idx + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
                    <div className="self-end rounded-full bg-black/50 p-2 backdrop-blur-xs">
                      <Maximize2 className="h-4 w-4" />
                    </div>
                    {photo.caption && (
                      <p className="text-xs font-semibold line-clamp-2">{stripHtml(photo.caption)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition cursor-pointer z-50"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setLightboxIndex((prev) => (prev === 0 ? photos.length - 1 : (prev ?? 1) - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#256B29] transition backdrop-blur-md cursor-pointer z-50"
                aria-label="Previous"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={() => setLightboxIndex((prev) => (prev === photos.length - 1 ? 0 : (prev ?? 0) + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#256B29] transition backdrop-blur-md cursor-pointer z-50"
                aria-label="Next"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}

          <div className="max-h-[85vh] max-w-5xl flex flex-col items-center">
            <img
              src={photos[lightboxIndex]?.src}
              alt={photos[lightboxIndex]?.alt || "Gallery Photo"}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
            />
            {photos[lightboxIndex]?.caption && (
              <p className="mt-3 text-center text-sm text-slate-200 max-w-2xl">
                {stripHtml(photos[lightboxIndex].caption)}
              </p>
            )}
          </div>
        </div>
      )}
    </article>
  )
}
