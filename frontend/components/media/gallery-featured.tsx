"use client"

import { ArrowRight, CalendarDays, Images, MapPin, Sparkles } from "lucide-react"
import { Container } from "@/components/ui/container"
import { stripHtml } from "@/lib/utils"
import type { ApiGalleryAlbum } from "@/lib/api/gallery"

interface GalleryFeaturedProps {
  featuredAlbum: ApiGalleryAlbum
  featuredBadge?: string
  onSelectAlbum: (album: ApiGalleryAlbum) => void
}

export function GalleryFeatured({
  featuredAlbum,
  featuredBadge = "Featured Collection",
  onSelectAlbum,
}: GalleryFeaturedProps) {
  const totalPhotos = featuredAlbum.image_count || featuredAlbum.images.length || 1

  return (
    <section aria-label="Featured photo collection" className="py-8 bg-gradient-to-b from-emerald-50/40 to-white">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-300/90 bg-gradient-to-br from-emerald-600/10 via-emerald-50/30 to-teal-50/50 p-6 sm:p-8 lg:p-10 shadow-lg">
          {/* Subtle Background Glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex-1 max-w-3xl space-y-4">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#256B29] text-white px-3.5 py-1 text-xs font-black uppercase tracking-wider shadow-xs">
                  <Sparkles className="h-3.5 w-3.5 fill-current" />
                  <span>{featuredBadge}</span>
                </span>

                <span className="inline-flex items-center rounded-full bg-emerald-100/90 border border-emerald-300 px-3 py-1 text-xs font-extrabold text-[#14532d]">
                  {featuredAlbum.category_label || "Photo Collection"}
                </span>

                <span className="inline-flex items-center gap-1 rounded-full bg-white/90 border border-slate-200 px-3 py-1 text-xs font-black text-slate-800">
                  <Images className="h-3.5 w-3.5 text-[#256B29]" />
                  <span>{totalPhotos} Photos</span>
                </span>
              </div>

              {/* Title - clickable */}
              <h2
                onClick={() => onSelectAlbum(featuredAlbum)}
                className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight text-slate-950 tracking-tight cursor-pointer hover:text-[#256B29] transition-colors"
              >
                {stripHtml(featuredAlbum.title)}
              </h2>

              {/* Location & Date */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm font-bold text-slate-600">
                <div className="flex items-center gap-1 text-slate-900">
                  <MapPin className="h-3.5 w-3.5 text-[#256B29]" />
                  <span>{featuredAlbum.location || "Sri Lanka"}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-slate-800">
                  <CalendarDays className="h-3.5 w-3.5 text-[#256B29]" />
                  <span>{featuredAlbum.display_date || featuredAlbum.event_date || "Recent"}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onSelectAlbum(featuredAlbum)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#256B29] px-6 text-xs sm:text-sm font-black text-white transition hover:bg-[#1b4d1d] shadow-sm hover:shadow-md cursor-pointer"
                >
                  <span>Explore Photo Collection</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Thumbnail Preview Banner */}
            <div className="lg:w-96 shrink-0">
              <button
                type="button"
                onClick={() => onSelectAlbum(featuredAlbum)}
                className="group relative block w-full aspect-video sm:aspect-4/3 rounded-2xl overflow-hidden shadow-lg border-2 border-white cursor-pointer"
              >
                <img
                  src={featuredAlbum.cover_image_url || "/images/home/hero-fishing-harbour.jpg"}
                  alt={featuredAlbum.cover_image_alt || featuredAlbum.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
                  <span className="bg-black/50 px-2.5 py-1 rounded-md backdrop-blur-xs">
                    Click to view {totalPhotos} photos
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#256B29] text-white">
                    <Images className="h-4 w-4" />
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
