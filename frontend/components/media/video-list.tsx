"use client"

import {
  CalendarDays,
  Clock3,
  MapPin,
  Play,
  SearchX,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { stripHtml } from "@/lib/utils"
import type { ApiVideoItem } from "@/lib/api/videos"

interface VideoListProps {
  videos: ApiVideoItem[]
  catalogueBadge?: string
  libraryTitle?: string
  onSelectVideo: (video: ApiVideoItem) => void
  onClearFilters: () => void
}

export function VideoList({
  videos,
  catalogueBadge = "Video Directory",
  libraryTitle = "All Official Videos & Documentaries",
  onSelectVideo,
  onClearFilters,
}: VideoListProps) {
  return (
    <section
      id="video-library"
      aria-labelledby="video-library-heading"
      className="scroll-mt-24 bg-slate-50 py-12 sm:py-16"
    >
      <Container>
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-[#256B29] border border-emerald-200">
              <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
              <span>{catalogueBadge}</span>
            </span>
            <h2
              id="video-library-heading"
              className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900"
            >
              {libraryTitle}
            </h2>
          </div>

          <p aria-live="polite" className="text-xs font-bold text-slate-600">
            Showing {videos.length} {videos.length === 1 ? "video" : "videos"}
          </p>
        </div>

        {/* Clean 3-Column Video Card Grid */}
        {videos.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {videos.map((video) => (
              <article
                key={video.slug}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs transition-all duration-300 hover:border-emerald-300 hover:shadow-md"
              >
                <div>
                  {/* Clickable Thumbnail triggering same-page Modal */}
                  <button
                    type="button"
                    onClick={() => onSelectVideo(video)}
                    className="relative block w-full aspect-video overflow-hidden bg-slate-900 text-left cursor-pointer group-hover:opacity-95"
                    aria-label={`Watch ${video.title} in preview popup`}
                  >
                    <img
                      src={video.thumbnail_url || "/images/home/hero-fishing-harbour.jpg"}
                      alt={video.thumbnail_alt || video.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#256B29] text-white shadow-lg transition duration-300 group-hover:scale-110">
                        <Play aria-hidden="true" className="ml-0.5 h-5 w-5 fill-current" />
                      </span>
                    </div>

                    <div className="absolute left-3 top-3">
                      <span className="rounded-md bg-[#256B29] px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                        {video.category_label || "Video"}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-black/75 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-xs">
                        <Clock3 aria-hidden="true" className="h-3 w-3 text-emerald-300" />
                        <span>{video.duration}</span>
                      </span>
                    </div>
                  </button>

                  <div className="p-6">
                    <h3 className="text-lg font-bold leading-snug text-slate-900 line-clamp-2 transition-colors group-hover:text-[#256B29]">
                      <button
                        type="button"
                        onClick={() => onSelectVideo(video)}
                        className="text-left cursor-pointer hover:underline"
                      >
                        {stripHtml(video.title)}
                      </button>
                    </h3>

                    <p className="mt-3 text-xs leading-relaxed text-slate-600 line-clamp-3">
                      {stripHtml(video.description)}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 bg-slate-50/50 p-6 pt-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays aria-hidden="true" className="h-3.5 w-3.5 text-[#256B29]" />
                      <span>{video.display_date || video.published_date || "Recent"}</span>
                    </div>

                    {video.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-[#256B29]" />
                        <span>{video.location}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => onSelectVideo(video)}
                      className="inline-flex w-full min-h-[38px] items-center justify-center gap-2 rounded-xl bg-[#256B29] px-4 text-xs font-bold text-white transition hover:bg-[#1b4d1d] shadow-2xs cursor-pointer"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>Watch Video</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-[#256B29]">
              <SearchX className="h-7 w-7" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">No videos found</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              There are no official videos matching your search criteria. Try adjusting your keywords or category filters.
            </p>
            <button
              type="button"
              onClick={onClearFilters}
              className="mt-6 inline-flex min-h-10 items-center justify-center rounded-xl bg-[#256B29] px-5 text-xs font-bold text-white transition hover:bg-[#1b4d1d] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </Container>
    </section>
  )
}