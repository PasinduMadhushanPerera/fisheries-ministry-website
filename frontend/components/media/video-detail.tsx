"use client"

import Link from "next/link"
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Download,
  ExternalLink,
  MapPin,
  Play,
  Printer,
  Share2,
} from "lucide-react"
import { Container } from "@/components/ui/container"
import { extractYouTubeId, stripHtml } from "@/lib/utils"
import type { ApiVideoItem } from "@/lib/api/videos"

interface VideoDetailContentProps {
  video: ApiVideoItem
}

export function VideoDetailContent({ video }: VideoDetailContentProps) {
  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: video.title,
          text: video.description,
          url: window.location.href,
        })
      } catch {
        // Ignored
      }
    }
  }

  const isDirectFile = Boolean(video.video_file_url)
  const cleanYouTubeId = !isDirectFile
    ? extractYouTubeId(video.youtube_id || video.video_url)
    : ""
  const youtubeEmbedUrl = cleanYouTubeId
    ? `https://www.youtube.com/embed/${cleanYouTubeId}?autoplay=1&rel=0`
    : null

  const externalWatchUrl = video.video_url || (cleanYouTubeId ? `https://www.youtube.com/watch?v=${cleanYouTubeId}` : "")

  return (
    <article className="py-12 bg-slate-50/50 min-h-screen">
      <Container>
        {/* Top Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/media-centre/videos"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#256B29] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Videos</span>
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

        {/* Video Player Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
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

          {/* Details Section */}
          <div className="p-6 sm:p-10 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-md bg-emerald-100 border border-emerald-300 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#14532d]">
                {video.category_label || "Official Video"}
              </span>

              <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-800">
                <Clock3 className="h-3.5 w-3.5 text-[#256B29]" />
                <span>{video.duration}</span>
              </span>

              {isDirectFile && (
                <span className="rounded-md bg-emerald-700 px-2.5 py-1 text-xs font-extrabold text-white uppercase tracking-wider">
                  Direct Upload (HD Video)
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
              {stripHtml(video.title)}
            </h1>

            {/* Dateline */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-bold text-slate-600 pb-4 border-b border-slate-100">
              {video.location && (
                <div className="flex items-center gap-1.5 text-slate-900">
                  <MapPin className="h-4 w-4 text-[#256B29]" />
                  <span>{video.location}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-[#256B29]" />
                <span>{video.display_date || video.published_date || "Recent"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock3 className="h-4 w-4 text-[#256B29]" />
                <span>Duration: {video.duration}</span>
              </div>
            </div>

            {/* Description */}
            <div className="prose max-w-none text-slate-700 leading-relaxed text-sm sm:text-base">
              <p>{stripHtml(video.description)}</p>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
              {isDirectFile && video.video_file_url ? (
                <a
                  href={video.video_file_url}
                  download
                  className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#256B29] px-5 text-xs sm:text-sm font-bold text-white hover:bg-[#1b4d1d] transition shadow-xs"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Video File</span>
                </a>
              ) : externalWatchUrl ? (
                <a
                  href={externalWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#256B29] px-5 text-xs sm:text-sm font-bold text-white hover:bg-[#1b4d1d] transition shadow-xs"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Watch on YouTube</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </article>
  )
}
