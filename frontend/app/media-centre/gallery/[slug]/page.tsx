import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Images,
  MapPin,
} from "lucide-react"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Container } from "@/components/ui/container"
import {
  galleryAlbums,
  getGalleryAlbumBySlug,
  getGalleryImageCount,
  getRelatedGalleryAlbums,
} from "@/data/gallery"

type GalleryAlbumPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return galleryAlbums.map((album) => ({
    slug: album.slug,
  }))
}

export async function generateMetadata({
  params,
}: GalleryAlbumPageProps): Promise<Metadata> {
  const { slug } = await params
  const album = getGalleryAlbumBySlug(slug)

  if (!album) {
    return {
      title: "Gallery Album Not Found | Media Centre",
      description:
        "The requested Ministry gallery album could not be found.",
    }
  }

  const coverImage =
    typeof album.coverImage === "string"
      ? album.coverImage
      : album.coverImage.src

  return {
    title: `${album.title} | Photo Gallery`,
    description: album.description,
    openGraph: {
      title: album.title,
      description: album.description,
      type: "website",
      images: [
        {
          url: coverImage,
          alt: album.coverImageAlt,
        },
      ],
    },
  }
}

export default async function GalleryAlbumPage({
  params,
}: GalleryAlbumPageProps) {
  const { slug } = await params
  const album = getGalleryAlbumBySlug(slug)

  if (!album) {
    notFound()
  }

  const imageCount = getGalleryImageCount(album)
  const relatedAlbums = getRelatedGalleryAlbums(album, 3)

  const breadcrumbItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Media Centre",
      href: "/media-centre",
    },
    {
      label: "Gallery",
      href: "/media-centre/gallery",
    },
    {
      label: album.title,
    },
  ]

  return (
    <>
      <SiteHeader />

      <main>
        <Breadcrumb items={breadcrumbItems} />

        <section
          aria-labelledby="gallery-album-heading"
          className="relative isolate overflow-hidden bg-[#061d24] text-white"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,197,94,0.18),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.22),transparent_38%),linear-gradient(135deg,#061d24_0%,#0a322f_50%,#0a4350_100%)]"
          />

          <div
            aria-hidden="true"
            className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full border border-white/10 bg-white/[0.03]"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-48 -left-28 h-[32rem] w-[32rem] rounded-full border border-green-200/10 bg-green-300/[0.03]"
          />

          <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
            <Link
              href="/media-centre/gallery"
              className="inline-flex items-center gap-2 text-sm font-semibold text-green-200 transition hover:text-white focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
            >
              <ArrowLeft
                aria-hidden="true"
                className="h-4 w-4"
              />
              Back to Gallery
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-green-100 backdrop-blur">
                  {album.category}
                </span>

                <h1
                  id="gallery-album-heading"
                  className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                >
                  {album.title}
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
                  {album.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-x-7 gap-y-4 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <CalendarDays
                      aria-hidden="true"
                      className="h-5 w-5 text-green-200"
                    />

                    <time dateTime={album.eventDate}>
                      {album.displayDate}
                    </time>
                  </div>

                  {album.location ? (
                    <div className="flex items-center gap-2">
                      <MapPin
                        aria-hidden="true"
                        className="h-5 w-5 text-green-200"
                      />

                      <span>{album.location}</span>
                    </div>
                  ) : null}

                  <div className="flex items-center gap-2">
                    <Images
                      aria-hidden="true"
                      className="h-5 w-5 text-green-200"
                    />

                    <span>
                      {imageCount}{" "}
                      {imageCount === 1 ? "photo" : "photos"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-2 shadow-2xl backdrop-blur">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem]">
                  <Image
                    src={album.coverImage}
                    alt={album.coverImageAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent"
                  />

                  <div className="absolute bottom-5 left-5">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/65 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                      <Images
                        aria-hidden="true"
                        className="h-4 w-4 text-green-200"
                      />

                      Official photo album
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="album-photos-heading"
          className="bg-white py-16 sm:py-20"
        >
          <Container>
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                  Album photographs
                </p>

                <h2
                  id="album-photos-heading"
                  className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                >
                  Photo highlights
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                  View official photographs captured during this Ministry
                  programme or event.
                </p>
              </div>

              <p className="text-sm font-semibold text-slate-600">
                {imageCount}{" "}
                {imageCount === 1 ? "photograph" : "photographs"}
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {album.images.map((image, index) => (
                <figure
                  key={image.id}
                  className={[
                    "group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm",
                    index === 0
                      ? "sm:col-span-2 sm:row-span-2"
                      : "",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "relative overflow-hidden",
                      index === 0
                        ? "aspect-[4/3] sm:h-full sm:min-h-[34rem]"
                        : "aspect-[4/3]",
                    ].join(" ")}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes={
                        index === 0
                          ? "(min-width: 1280px) 50vw, (min-width: 640px) 100vw, 100vw"
                          : "(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                      }
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent"
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <figcaption className="text-sm font-medium leading-6 text-white">
                        {image.caption}
                      </figcaption>
                    </div>
                  </div>
                </figure>
              ))}
            </div>
          </Container>
        </section>

        {relatedAlbums.length > 0 ? (
          <section
            aria-labelledby="related-albums-heading"
            className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20"
          >
            <Container>
              <div className="flex flex-col gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                    More collections
                  </p>

                  <h2
                    id="related-albums-heading"
                    className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                  >
                    Related albums
                  </h2>

                  <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                    Explore more official Ministry photo collections related to{" "}
                    {album.category.toLowerCase()}.
                  </p>
                </div>

                <Link
                  href="/media-centre/gallery"
                  className="inline-flex shrink-0 items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                >
                  View all albums

                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                </Link>
              </div>

              <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {relatedAlbums.map((relatedAlbum) => {
                  const relatedImageCount =
                    getGalleryImageCount(relatedAlbum)

                  return (
                    <article
                      key={relatedAlbum.slug}
                      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
                    >
                      <Link
                        href={`/media-centre/gallery/${relatedAlbum.slug}`}
                        className="block"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={relatedAlbum.coverImage}
                            alt={relatedAlbum.coverImageAlt}
                            fill
                            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />

                          <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"
                          />

                          <div className="absolute bottom-4 left-4">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/65 px-3 py-2 text-sm font-semibold text-white backdrop-blur-md">
                              <Images
                                aria-hidden="true"
                                className="h-4 w-4 text-green-200"
                              />

                              {relatedImageCount} photos
                            </span>
                          </div>
                        </div>
                      </Link>

                      <div className="p-6">
                        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                          <div className="flex items-center gap-2">
                            <CalendarDays
                              aria-hidden="true"
                              className="h-4 w-4 text-green-700"
                            />

                            <time dateTime={relatedAlbum.eventDate}>
                              {relatedAlbum.displayDate}
                            </time>
                          </div>

                          {relatedAlbum.location ? (
                            <div className="flex items-center gap-2">
                              <MapPin
                                aria-hidden="true"
                                className="h-4 w-4 text-green-700"
                              />

                              <span>{relatedAlbum.location}</span>
                            </div>
                          ) : null}
                        </div>

                        <h3 className="mt-5 text-xl font-bold leading-8 text-slate-950">
                          <Link
                            href={`/media-centre/gallery/${relatedAlbum.slug}`}
                            className="transition hover:text-green-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                          >
                            {relatedAlbum.title}
                          </Link>
                        </h3>

                        <p className="mt-4 line-clamp-3 leading-7 text-slate-600">
                          {relatedAlbum.description}
                        </p>

                        <Link
                          href={`/media-centre/gallery/${relatedAlbum.slug}`}
                          className="mt-6 inline-flex items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                        >
                          View album

                          <ArrowRight
                            aria-hidden="true"
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          />
                        </Link>
                      </div>
                    </article>
                  )
                })}
              </div>
            </Container>
          </section>
        ) : null}
      </main>

      <SiteFooter />
    </>
  )
}