"use client"

import {
  ArrowRight,
  CalendarDays,
  Images,
  MapPin,
} from "lucide-react"
import { Container } from "@/components/ui/container"
import { Card } from "@/components/ui/card"
import { stripHtml } from "@/lib/utils"
import type { ApiGalleryAlbum } from "@/lib/api/gallery"

interface GalleryGridProps {
  albums: ApiGalleryAlbum[]
  catalogueBadge?: string
  libraryTitle?: string
  onSelectAlbum: (album: ApiGalleryAlbum) => void
  onClearFilters: () => void
}

export function GalleryGrid({
  albums,
  catalogueBadge = "Photo Albums",
  libraryTitle = "All Photo Collections & State Albums",
  onSelectAlbum,
  onClearFilters,
}: GalleryGridProps) {
  return (
    <section aria-label="Photo albums directory" className="py-12 bg-slate-50/60">
      <Container>
        {/* Section Heading */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 border border-emerald-300 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#14532d] mb-2.5">
            <Images className="h-3.5 w-3.5" />
            <span>{catalogueBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            {libraryTitle}
          </h2>
        </div>

        {/* Empty State */}
        {albums.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100/70 text-[#256B29] mb-4">
              <Images className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No photo albums found</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              There are no photo collections matching your search criteria. Try adjusting your filters or search keywords.
            </p>
            <button
              type="button"
              onClick={onClearFilters}
              className="mt-6 inline-flex min-h-10 items-center justify-center rounded-xl bg-[#256B29] px-5 text-xs font-bold text-white transition hover:bg-[#1b4d1d] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Albums Grid */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => {
              const totalPhotos = album.image_count || album.images.length || 1

              return (
                <Card
                  key={album.id}
                  interactive
                  onClick={() => onSelectAlbum(album)}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl cursor-pointer"
                >
                  {/* Cover Photo */}
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                    <img
                      src={album.cover_image_url || "/images/home/hero-fishing-harbour.jpg"}
                      alt={album.cover_image_alt || album.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                    {/* Badges on Cover */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="rounded-full bg-[#041c22]/80 backdrop-blur-md border border-white/20 px-2.5 py-1 text-[10px] font-black uppercase text-emerald-300">
                        {album.category_label || "Gallery"}
                      </span>

                      <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 px-2.5 py-1 text-[10px] font-extrabold text-white">
                        <Images className="h-3 w-3" />
                        <span>{totalPhotos} Photos</span>
                      </span>
                    </div>

                    {/* Location Dateline on Cover */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-semibold">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-emerald-300" />
                        <span className="truncate">{album.location || "Sri Lanka"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-3 w-3 text-emerald-300" />
                        <span>{album.display_date || album.event_date || "Recent"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Album Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-base font-extrabold leading-snug text-slate-900 line-clamp-2 transition-colors group-hover:text-[#256B29]">
                        {stripHtml(album.title)}
                      </h3>
                    </div>

                    {/* Action Button */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="inline-flex min-h-[34px] items-center justify-center gap-1.5 rounded-xl bg-[#256B29] px-4 text-xs font-extrabold text-white shadow-2xs transition group-hover:bg-[#1b4d1d]">
                        <span>View Album</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>

                      <span className="text-[11px] font-semibold text-slate-400">
                        {totalPhotos} {totalPhotos === 1 ? "Image" : "Images"}
                      </span>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </Container>
    </section>
  )
}