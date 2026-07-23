import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  FileText,
  MapPin,
  Tag,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { getFeaturedPressRelease } from "@/data/press-releases"

export function FeaturedPressRelease() {
  const featuredPressRelease = getFeaturedPressRelease()

  if (!featuredPressRelease) {
    return null
  }

  return (
    <section
      aria-labelledby="featured-press-release-heading"
      className="bg-white py-16 sm:py-20"
    >
      <Container>
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
              Featured release
            </p>

            <h2
              id="featured-press-release-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
            >
              Latest Official Announcement
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Read the Ministry&apos;s latest official press release and public
              announcement.
            </p>
          </div>

          <Link
            href="#press-release-library"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
          >
            View all press releases

            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4"
            />
          </Link>
        </div>

        <article className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <Link
              href={`/media-centre/press-releases/${featuredPressRelease.slug}`}
              className="group relative block min-h-[22rem] overflow-hidden sm:min-h-[30rem] lg:min-h-[38rem]"
            >
              <Image
                src={featuredPressRelease.image ?? "/images/placeholder.jpg"}
                alt={
                  featuredPressRelease.imageAlt ??
                  featuredPressRelease.title
                }
                fill
                priority
                sizes="(min-width:1024px) 60vw,100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"
              />

              <div className="absolute left-5 top-5">
                <span className="rounded-full bg-green-700 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white">
                  {featuredPressRelease.category}
                </span>
              </div>

              <div className="absolute bottom-5 right-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                  <Tag
                    aria-hidden="true"
                    className="h-4 w-4 text-green-200"
                  />

                  {featuredPressRelease.referenceNumber}
                </span>
              </div>
            </Link>

            <div className="flex flex-col justify-center bg-[linear-gradient(145deg,#071d24_0%,#0a322f_55%,#0a4350_100%)] p-7 text-white sm:p-10 lg:p-12">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-200">
                Official statement
              </p>

              <h3 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                <Link
                  href={`/media-centre/press-releases/${featuredPressRelease.slug}`}
                  className="transition hover:text-green-200 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
                >
                  {featuredPressRelease.title}
                </Link>
              </h3>

              <p className="mt-6 text-lg leading-8 text-slate-300">
                {featuredPressRelease.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4 border-y border-white/10 py-6 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CalendarDays
                    aria-hidden="true"
                    className="h-5 w-5 text-green-200"
                  />

                  <time
                    dateTime={featuredPressRelease.publishedDate}
                  >
                    {featuredPressRelease.displayDate}
                  </time>
                </div>

                {featuredPressRelease.location ? (
                  <div className="flex items-center gap-2">
                    <MapPin
                      aria-hidden="true"
                      className="h-5 w-5 text-green-200"
                    />

                    <span>{featuredPressRelease.location}</span>
                  </div>
                ) : null}

                <div className="flex items-center gap-2">
                  <FileText
                    aria-hidden="true"
                    className="h-5 w-5 text-green-200"
                  />

                  <span>{featuredPressRelease.referenceNumber}</span>
                </div>
              </div>

              <Link
                href={`/media-centre/press-releases/${featuredPressRelease.slug}`}
                className="mt-8 inline-flex w-fit items-center gap-3 rounded-lg bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-green-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
              >
                Read press release

                <ArrowRight
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              </Link>
            </div>
          </div>
        </article>
      </Container>
    </section>
  )
}