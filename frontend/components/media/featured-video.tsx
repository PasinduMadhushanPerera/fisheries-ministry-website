"use client"

import {
  CalendarDays,
  Clock3,
  MapPin,
  Play,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { stripHtml } from "@/lib/utils"
import type { ApiVideoItem } from "@/lib/api/videos"

interface FeaturedVideoProps {
  featuredVideo: ApiVideoItem | null
  featuredBadge?: string
  onSelectVideo: (video: ApiVideoItem) => void
}

export function FeaturedVideo({
  featuredVideo,
  featuredBadge = "Featured Official Video",
  onSelectVideo,
}: FeaturedVideoProps) {
  if (!featuredVideo) {
    return null
  }

  return (
    <section aria-labelledby="featured-video-heading" className="bg-white py-10 sm:py-14">
      <Container>
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-[#256B29] border border-emerald-200">
              <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
              <span>{featuredBadge}</span>
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
            {/* Clickable Left Thumbnail Block */}
            <button
              type="button"
              onClick={() => onSelectVideo(featuredVideo)}
              className="group relative block w-full min-h-[22rem] overflow-hidden sm:min-h-[28rem] text-left cursor-pointer"
              aria-label={`Watch ${featuredVideo.title}`}
            >
              <img
                src={featuredVideo.thumbnail_url || "/images/home/hero-fishing-harbour.jpg"}
                alt={featuredVideo.thumbnail_alt || featuredVideo.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/90 text-[#256B29] shadow-2xl backdrop-blur transition duration-300 group-hover:scale-110">
                  <Play aria-hidden="true" className="ml-1 h-9 w-9 fill-current" />
                </span>
              </div>

              <div className="absolute left-5 top-5">
                <span className="rounded-md bg-[#256B29] px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white">
                  {featuredVideo.category_label || "Featured"}
                </span>
              </div>

              <div className="absolute bottom-5 right-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/70 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                  <Clock3 aria-hidden="true" className="h-3.5 w-3.5 text-emerald-300" />
                  <span>{featuredVideo.duration}</span>
                </span>
              </div>
            </button>

            {/* Right Details Panel */}
            <div className="flex flex-col justify-center bg-[linear-gradient(145deg,#071d24_0%,#0a322f_55%,#0a4350_100%)] p-7 text-white sm:p-10">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                {featuredBadge}
              </span>

              {/* Title Topic in Pure White with Smooth Hover */}
              <h3 className="mt-3 text-2xl sm:text-3xl font-black leading-tight !text-white">
                <button
                  type="button"
                  onClick={() => onSelectVideo(featuredVideo)}
                  className="text-left !text-white hover:!text-emerald-300 transition-colors duration-200 cursor-pointer"
                >
                  {stripHtml(featuredVideo.title)}
                </button>
              </h3>

              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-300">
                {stripHtml(featuredVideo.description)}
              </p>

              <div className="mt-6 flex flex-wrap gap-4 border-y border-white/10 py-4 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                  <span>{featuredVideo.display_date || featuredVideo.published_date || "Recent"}</span>
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
                onClick={() => onSelectVideo(featuredVideo)}
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
  )
}