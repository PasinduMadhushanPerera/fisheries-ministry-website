import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  Images,
  MapPin,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import {
  getFeaturedGalleryAlbum,
  getGalleryImageCount,
} from "@/data/gallery"

export function FeaturedGallery() {
  const featuredAlbum = getFeaturedGalleryAlbum()

  if (!featuredAlbum) {
    return null
  }

  const imageCount = getGalleryImageCount(featuredAlbum)

  return (
    <section
      aria-labelledby="featured-gallery-heading"
      className="bg-white py-16 sm:py-20"
    >
      <Container>
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
              Featured album
            </p>

            <h2
              id="featured-gallery-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
            >
              Latest photo collection
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Explore the latest official photographs from Ministry programmes,
              events and development activities.
            </p>
          </div>

          <Link
            href="#gallery-albums"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
          >
            View all albums

            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4"
            />
          </Link>
        </div>

        <article className="group mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-sm">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <Link
              href={`/media-centre/gallery/${featuredAlbum.slug}`}
              className="relative block min-h-80 overflow-hidden sm:min-h-[30rem]"
            >
              <Image
                src={featuredAlbum.coverImage}
                alt={featuredAlbum.coverImageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent"
              />

              <div className="absolute left-5 top-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                  <Images
                    aria-hidden="true"
                    className="h-4 w-4 text-green-200"
                  />

                  Featured Album
                </span>
              </div>

              <div className="absolute bottom-5 left-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                  <Images
                    aria-hidden="true"
                    className="h-4 w-4"
                  />

                  {imageCount} {imageCount === 1 ? "photo" : "photos"}
                </span>
              </div>
            </Link>

            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <span className="w-fit rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-green-800">
                {featuredAlbum.category}
              </span>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CalendarDays
                    aria-hidden="true"
                    className="h-4 w-4 text-green-700"
                  />

                  <time dateTime={featuredAlbum.eventDate}>
                    {featuredAlbum.displayDate}
                  </time>
                </div>

                {featuredAlbum.location ? (
                  <div className="flex items-center gap-2">
                    <MapPin
                      aria-hidden="true"
                      className="h-4 w-4 text-green-700"
                    />

                    <span>{featuredAlbum.location}</span>
                  </div>
                ) : null}
              </div>

              <h3 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                <Link
                  href={`/media-centre/gallery/${featuredAlbum.slug}`}
                  className="transition hover:text-green-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                >
                  {featuredAlbum.title}
                </Link>
              </h3>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                {featuredAlbum.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/media-centre/gallery/${featuredAlbum.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                >
                  View album

                  <ArrowRight
                    aria-hidden="true"
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="#gallery-albums"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:border-green-300 hover:bg-green-50 hover:text-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                >
                  Browse all albums
                </Link>
              </div>
            </div>
          </div>
        </article>
      </Container>
    </section>
  )
}