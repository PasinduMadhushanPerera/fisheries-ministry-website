"use client"

import { useEffect, useMemo, useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Images,
  MapPin,
  CalendarDays,
  X,
} from "lucide-react"
import { stripHtml } from "@/lib/utils"
import type { ApiGalleryAlbum, ApiGalleryPhoto } from "@/lib/api/gallery"

interface GalleryPreviewProps {
  album: ApiGalleryAlbum | null
  onClose: () => void
}

export function GalleryPreview({ album, onClose }: GalleryPreviewProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)

  // Active photos list inside modal
  const albumImages: ApiGalleryPhoto[] = useMemo(() => {
    if (!album) return []
    if (album.images && album.images.length > 0) return album.images
    return [
      {
        id: album.id,
        order: 1,
        src: album.cover_image_url || "/images/home/hero-fishing-harbour.jpg",
        alt: album.cover_image_alt || album.title,
        caption: album.description,
      },
    ]
  }, [album])

  // Reset index when album changes
  useEffect(() => {
    setActiveImageIndex(0)
  }, [album])

  // Keyboard navigation & body scroll lock (Always called unconditionally at top)
  useEffect(() => {
    if (!album) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        if (albumImages.length > 1) {
          setActiveImageIndex((prev) => (prev === 0 ? albumImages.length - 1 : prev - 1))
        }
      } else if (e.key === "ArrowRight") {
        if (albumImages.length > 1) {
          setActiveImageIndex((prev) => (prev === albumImages.length - 1 ? 0 : prev + 1))
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [album, albumImages.length, onClose])

  if (!album) return null

  // Next / Previous Navigation
  const handlePrevImage = () => {
    if (albumImages.length <= 1) return
    setActiveImageIndex((prev) => (prev === 0 ? albumImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    if (albumImages.length <= 1) return
    setActiveImageIndex((prev) => (prev === albumImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-modal-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/90 p-4 sm:p-6 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Dark Ocean Header Bar */}
        <div className="flex shrink-0 flex-col gap-2 border-b border-slate-200 px-6 sm:px-8 py-5 bg-[linear-gradient(135deg,#041c22_0%,#093835_55%,#0c4e48_100%)] text-white relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-emerald-400/10 blur-xl"
          />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="rounded-md bg-emerald-500/20 border border-emerald-400/30 px-3 py-0.5 text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                {album.category_label || "Photo Album"}
              </span>
              <span className="text-xs font-mono font-bold text-slate-300 bg-black/20 px-2.5 py-0.5 rounded-md border border-white/10">
                Photo {activeImageIndex + 1} of {albumImages.length}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-white hover:text-slate-900 transition-colors cursor-pointer"
              aria-label="Close photo gallery"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Pure White Album Title */}
          <div className="relative z-10 mt-1">
            <h3
              id="gallery-modal-title"
              className="text-lg sm:text-xl font-extrabold !text-white leading-snug tracking-tight truncate"
            >
              {stripHtml(album.title)}
            </h3>
            <div className="mt-1 flex items-center gap-3 text-xs text-emerald-200 font-medium">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-emerald-300" />
                <span>{album.location || "Sri Lanka"}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <CalendarDays className="h-3 w-3 text-emerald-300" />
                <span>{album.display_date || album.event_date || "Recent"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body: Active Image + Navigation Controls */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950 flex flex-col items-center justify-center relative select-none min-h-[350px]">
          {/* Main Photo Frame */}
          <div className="relative w-full max-h-[50vh] sm:max-h-[55vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black">
            <img
              src={albumImages[activeImageIndex]?.src || "/images/home/hero-fishing-harbour.jpg"}
              alt={albumImages[activeImageIndex]?.alt || album.title}
              className="max-h-[50vh] sm:max-h-[55vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
            />

            {/* Left/Right Floating Arrows */}
            {albumImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white hover:bg-[#256B29] transition backdrop-blur-md border border-white/20 cursor-pointer"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white hover:bg-[#256B29] transition backdrop-blur-md border border-white/20 cursor-pointer"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Active Image Caption */}
          {albumImages[activeImageIndex]?.caption && (
            <div className="mt-3 text-center max-w-2xl px-4">
              <p className="text-xs sm:text-sm text-slate-200 font-medium">
                {stripHtml(albumImages[activeImageIndex].caption)}
              </p>
            </div>
          )}

          {/* Thumbnail Strip */}
          {albumImages.length > 1 && (
            <div className="mt-4 flex items-center gap-2 overflow-x-auto max-w-full pb-2 px-2 no-scrollbar">
              {albumImages.map((photo, idx) => (
                <button
                  key={photo.id || idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition cursor-pointer ${
                    activeImageIndex === idx
                      ? "border-emerald-400 scale-105 shadow-md shadow-emerald-500/20"
                      : "border-white/20 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt || `Thumbnail ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Action Bar Footer */}
        <div className="flex shrink-0 items-center justify-end gap-3 border-t border-slate-200 px-6 py-4 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[40px] items-center justify-center rounded-xl bg-[#256B29] px-6 text-xs font-extrabold text-white hover:bg-[#1b4d1d] transition shadow-xs cursor-pointer"
          >
            <span>Close Gallery</span>
          </button>
        </div>
      </div>
    </div>
  )
}
