"use client"

import { useState } from "react"
import Image from "next/image"
import {
  CalendarDays,
  Clock3,
  MapPin,
  Play,
  X,
  ExternalLink,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { getFeaturedVideo, type VideoItem } from "@/data/videos"

export function FeaturedVideo() {
  const featuredVideo = getFeaturedVideo()
  const [modalVideo, setModalVideo] = useState<VideoItem | null>(null)

  if (!featuredVideo) {
    return null
  }

  return (
    <>
      <section aria-labelledby="featured-video-heading" className="bg-white py-12 sm:py-16">
        <Container>
          <div className="flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-[#256B29] border border-emerald-200">
                <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                <span>Featured Video</span>
              </span>
              <h2
                id="featured-video-heading"
                className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900"
              >
                Latest Ministry Highlight
              </h2>
            </div>
          </div>

          <article className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-xl">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
              <button
                type="button"
                onClick={() => setModalVideo(featuredVideo)}
                className="group relative block w-full min-h-[22rem] overflow-hidden sm:min-h-[28rem] text-left cursor-pointer"
                aria-label={`Watch ${featuredVideo.title}`}
              >
                <Image
                  src={featuredVideo.thumbnail}
                  alt={featuredVideo.thumbnailAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/90 text-[#256B29] shadow-2xl backdrop-blur transition duration-300 group-hover:scale-110">
                    <Play aria-hidden="true" className="ml-1 h-9 w-9 fill-current" />
                  </span>
                </div>

                <div className="absolute left-5 top-5">
                  <span className="rounded-md bg-[#256B29] px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white">
                    {featuredVideo.category}
                  </span>
                </div>

                <div className="absolute bottom-5 right-5">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/70 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                    <Clock3 aria-hidden="true" className="h-3.5 w-3.5 text-emerald-300" />
                    <span>{featuredVideo.duration}</span>
                  </span>
                </div>
              </button>

              <div className="flex flex-col justify-center bg-[linear-gradient(145deg,#071d24_0%,#0a322f_55%,#0a4350_100%)] p-7 text-white sm:p-10">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Featured Official Video
                </span>

                <h3 className="mt-3 text-2xl sm:text-3xl font-bold leading-tight">
                  <button
                    type="button"
                    onClick={() => setModalVideo(featuredVideo)}
                    className="text-left hover:text-emerald-300 transition-colors cursor-pointer"
                  >
                    {featuredVideo.title}
                  </button>
                </h3>

                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-300">
                  {featuredVideo.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-4 border-y border-white/10 py-4 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                    <span>{featuredVideo.displayDate}</span>
                  </div>

                  {featuredVideo.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                      <span>{featuredVideo.location}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    <Clock3 className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                    <span>{featuredVideo.duration}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setModalVideo(featuredVideo)}
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-extrabold text-slate-950 transition hover:bg-emerald-100 cursor-pointer"
                >
                  <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                  <span>Watch Video</span>
                </button>
              </div>
            </div>
          </article>
        </Container>
      </section>

      {/* MODAL */}
      {modalVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="featured-video-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 sm:p-6 backdrop-blur-md overflow-y-auto"
        >
          <div className="relative w-full max-w-4xl rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[#256B29] px-2.5 py-1 text-xs font-extrabold text-white">
                  {modalVideo.category}
                </span>
                <span className="text-xs font-bold text-slate-500">Featured Video</span>
              </div>
              <button
                type="button"
                onClick={() => setModalVideo(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-slate-950 overflow-hidden flex items-center justify-center">
              <Image src={modalVideo.thumbnail} alt={modalVideo.thumbnailAlt} fill className="object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="relative z-10 text-center p-6 space-y-3">
                <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#388E3C] text-white shadow-2xl animate-pulse">
                  <Play className="h-10 w-10 fill-current ml-1" aria-hidden="true" />
                </span>
                <p className="text-sm font-bold text-white">Playing: {modalVideo.title}</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div>
                <h3 id="featured-video-modal-title" className="text-xl font-extrabold text-slate-900">
                  {modalVideo.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{modalVideo.description}</p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <a
                  href={modalVideo.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-[#388E3C] px-5 text-xs font-bold text-white hover:bg-[#256B29] transition"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  <span>Watch on YouTube</span>
                </a>
                <button
                  type="button"
                  onClick={() => setModalVideo(null)}
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  <span>Close Preview</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}