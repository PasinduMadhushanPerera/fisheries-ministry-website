"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import {
  CalendarDays,
  Clock3,
  MapPin,
  Play,
  SearchX,
  X,
  ExternalLink,
} from "lucide-react"

import { VideoFilter } from "@/components/media/video-filter"
import { Container } from "@/components/ui/container"
import {
  videos,
  type VideoCategory,
  type VideoItem,
} from "@/data/videos"

export function VideoList() {
  const [activeCategory, setActiveCategory] = useState<VideoCategory>("All")
  const [searchQuery, setSearchQuery] = useState("")

  // Same-page Modal Preview state
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)

  const filteredVideos = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()

    return videos.filter((video) => {
      const matchesCategory =
        activeCategory === "All" || video.category === activeCategory

      const matchesSearch =
        keyword.length === 0 ||
        video.title.toLowerCase().includes(keyword) ||
        video.description.toLowerCase().includes(keyword) ||
        video.category.toLowerCase().includes(keyword) ||
        video.location?.toLowerCase().includes(keyword)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <>
      <VideoFilter
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onCategoryChange={setActiveCategory}
        onSearchChange={setSearchQuery}
      />

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
                <span>Video Directory</span>
              </span>
              <h2
                id="video-library-heading"
                className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900"
              >
                {activeCategory === "All" ? "All Official Videos" : activeCategory}
              </h2>
            </div>

            <p aria-live="polite" className="text-xs font-bold text-slate-600">
              Showing {filteredVideos.length} {filteredVideos.length === 1 ? "video" : "videos"}
            </p>
          </div>

          {/* Clean 3-Column Video Card Grid */}
          {filteredVideos.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredVideos.map((video) => (
                <article
                  key={video.slug}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs transition-all duration-300 hover:border-slate-300 hover:shadow-md"
                >
                  <div>
                    {/* Clickable Thumbnail triggering same-page Modal */}
                    <button
                      type="button"
                      onClick={() => setSelectedVideo(video)}
                      className="relative block w-full aspect-video overflow-hidden bg-slate-900 text-left cursor-pointer group-hover:opacity-95"
                      aria-label={`Watch ${video.title} in preview popup`}
                    >
                      <Image
                        src={video.thumbnail}
                        alt={video.thumbnailAlt}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"
                      />

                      {/* Centered Play Button Badge */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/90 text-[#256B29] shadow-lg backdrop-blur transition duration-300 group-hover:scale-110">
                          <Play aria-hidden="true" className="ml-0.5 h-6 w-6 fill-current" />
                        </span>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute left-3 top-3">
                        <span className="rounded-md bg-[#256B29] px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-xs">
                          {video.category}
                        </span>
                      </div>

                      {/* Duration Pill */}
                      <div className="absolute bottom-3 right-3">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-950/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md">
                          <Clock3 aria-hidden="true" className="h-3.5 w-3.5 text-emerald-300" />
                          <span>{video.duration}</span>
                        </span>
                      </div>
                    </button>

                    <div className="p-5">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays aria-hidden="true" className="h-3.5 w-3.5 text-slate-400" />
                          <time dateTime={video.publishedDate}>{video.displayDate}</time>
                        </div>

                        {video.location && (
                          <div className="flex items-center gap-1.5">
                            <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-slate-400" />
                            <span>{video.location}</span>
                          </div>
                        )}
                      </div>

                      <h3 className="mt-3 text-base font-extrabold text-slate-900 leading-snug">
                        <button
                          type="button"
                          onClick={() => setSelectedVideo(video)}
                          className="text-left hover:text-[#388E3C] transition-colors cursor-pointer"
                        >
                          {video.title}
                        </button>
                      </h3>

                      <p className="mt-2 line-clamp-2 text-xs text-slate-600 leading-relaxed">
                        {video.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      type="button"
                      onClick={() => setSelectedVideo(video)}
                      className="inline-flex min-h-[38px] w-full items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 text-xs font-extrabold text-[#256B29] transition hover:bg-[#388E3C] hover:text-white cursor-pointer border border-emerald-200"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                      <span>Watch Video</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <SearchX className="mx-auto h-10 w-10 text-slate-400" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-bold text-slate-900">No videos found</h3>
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

      {/* SAME-PAGE VIDEO DETAIL PREVIEW MODAL WITH Z-[9999] and MAX-H-[85VH] */}
      {selectedVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 p-4 sm:p-6 backdrop-blur-md overflow-y-auto"
        >
          <div className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto">
            {/* Top Bar with Close Button */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[#256B29] px-2.5 py-1 text-xs font-extrabold text-white">
                  {selectedVideo.category}
                </span>
                <span className="text-xs font-bold text-slate-500">Official Video</span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors cursor-pointer"
                aria-label="Close video preview"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto">
              {/* Video Player Container */}
              <div className="relative aspect-video w-full bg-slate-950 overflow-hidden flex items-center justify-center">
                <Image
                  src={selectedVideo.thumbnail}
                  alt={selectedVideo.thumbnailAlt}
                  fill
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="relative z-10 text-center p-6 space-y-3">
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#388E3C] text-white shadow-2xl">
                    <Play className="h-8 w-8 fill-current ml-1" aria-hidden="true" />
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-white">Playing: {selectedVideo.title}</p>
                </div>
              </div>

              {/* Video Content Details */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4 text-[#256B29]" aria-hidden="true" />
                    <span>Published: {selectedVideo.displayDate}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock3 className="h-4 w-4 text-[#256B29]" aria-hidden="true" />
                    <span>Duration: {selectedVideo.duration}</span>
                  </div>

                  {selectedVideo.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-[#256B29]" aria-hidden="true" />
                      <span>Location: {selectedVideo.location}</span>
                    </div>
                  )}
                </div>

                <div>
                  <h3 id="video-modal-title" className="text-xl font-extrabold text-slate-900">
                    {selectedVideo.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {selectedVideo.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 px-6 py-4 bg-slate-50">
              <a
                href={selectedVideo.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[38px] items-center gap-2 rounded-xl bg-[#388E3C] px-4 text-xs font-bold text-white hover:bg-[#256B29] transition"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Watch on YouTube</span>
              </a>

              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
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