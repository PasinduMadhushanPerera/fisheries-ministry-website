"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Download,
  ExternalLink,
  MapPin,
  Play,
  X,
} from "lucide-react"
import { extractYouTubeId, stripHtml } from "@/lib/utils"
import type { ApiVideoItem } from "@/lib/api/videos"

interface VideoModalProps {
  video: ApiVideoItem | null
  onClose: () => void
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!video) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [video, onClose])

  if (!video) return null

  // Extract YouTube ID using robust utility
  const isDirectFile = Boolean(video.video_file_url)
  const cleanYouTubeId = !isDirectFile
    ? extractYouTubeId(video.youtube_id || video.video_url)
    : ""
  const youtubeEmbedUrl = cleanYouTubeId
    ? `https://www.youtube.com/embed/${cleanYouTubeId}?autoplay=1&rel=0`
    : null

  // Direct watch URL for YouTube external link button
  const externalWatchUrl = video.video_url || (cleanYouTubeId ? `https://www.youtube.com/watch?v=${cleanYouTubeId}` : "")

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/90 p-4 sm:p-6 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Dark Ocean Header */}
        <div className="flex shrink-0 flex-col gap-2 border-b border-slate-200 px-6 sm:px-8 py-5 bg-[linear-gradient(135deg,#041c22_0%,#093835_55%,#0c4e48_100%)] text-white relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-emerald-400/10 blur-xl"
          />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="rounded-md bg-emerald-500/20 border border-emerald-400/30 px-3 py-0.5 text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                {video.category_label || "Official Video"}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-300 bg-black/20 px-2.5 py-0.5 rounded-md border border-white/10">
                <Clock3 className="h-3.5 w-3.5 text-emerald-300" />
                <span>{video.duration}</span>
              </span>
              {isDirectFile && (
                <span className="rounded-md bg-emerald-700/80 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                  HD Video File
                </span>
              )}
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-white hover:text-slate-900 transition-colors cursor-pointer"
              aria-label="Close video preview"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Pure White Topic Title */}
          <div className="relative z-10 mt-1">
            <h3
              id="video-modal-title"
              className="text-lg sm:text-xl font-extrabold !text-white leading-snug tracking-tight truncate"
            >
              {stripHtml(video.title)}
            </h3>
            <div className="mt-1 flex items-center gap-3 text-xs text-emerald-200 font-medium">
              {video.location && (
                <>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-emerald-300" />
                    <span>{video.location}</span>
                  </div>
                  <span>•</span>
                </>
              )}
              <div className="flex items-center gap-1">
                <CalendarDays className="h-3 w-3 text-emerald-300" />
                <span>{video.display_date || video.published_date || "Recent"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body: Video Player & Description */}
        <div className="flex-1 overflow-y-auto">
          {/* Responsive Video Frame */}
          <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
            {isDirectFile && video.video_file_url ? (
              <video
                src={video.video_file_url}
                poster={video.thumbnail_url || undefined}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-contain"
              >
                Your browser does not support HTML5 video playback.
              </video>
            ) : youtubeEmbedUrl ? (
              <iframe
                src={youtubeEmbedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full border-0"
              />
            ) : (
              <div className="relative h-full w-full flex items-center justify-center">
                <img
                  src={video.thumbnail_url || "/images/home/hero-fishing-harbour.jpg"}
                  alt={video.thumbnail_alt || video.title}
                  className="h-full w-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                {externalWatchUrl && (
                  <a
                    href={externalWatchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 flex flex-col items-center gap-3 text-white p-6"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#256B29] text-white shadow-2xl hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 fill-current ml-1" aria-hidden="true" />
                    </span>
                    <span className="text-xs sm:text-sm font-bold">Watch Video Link</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Video Description */}
          <div className="p-6 sm:p-8 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Video Summary & Overview
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {stripHtml(video.description)}
            </p>
          </div>
        </div>

        {/* Modal Action Bar Footer */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 px-6 py-4 bg-slate-50">
          <div className="flex items-center gap-2">
            {isDirectFile && video.video_file_url ? (
              <a
                href={video.video_file_url}
                download
                className="inline-flex min-h-[38px] items-center gap-2 rounded-xl bg-[#256B29] px-4 text-xs font-bold text-white hover:bg-[#1b4d1d] transition"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Download Video</span>
              </a>
            ) : externalWatchUrl ? (
              <a
                href={externalWatchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[38px] items-center gap-2 rounded-xl bg-[#256B29] px-4 text-xs font-bold text-white hover:bg-[#1b4d1d] transition"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Watch on YouTube</span>
              </a>
            ) : null}

            <Link
              href={`/media-centre/videos/${video.slug}`}
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
            >
              <span>Full Page</span>
              <ArrowRight className="h-3 w-3 text-[#256B29]" />
            </Link>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[38px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <span>Close Preview</span>
          </button>
        </div>
      </div>
    </div>
  )
}
