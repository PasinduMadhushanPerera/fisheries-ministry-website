import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  ExternalLink,
  MapPin,
  Play,
} from "lucide-react"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Container } from "@/components/ui/container"
import {
  getRelatedVideos,
  getVideoBySlug,
  videos,
} from "@/data/videos"

type VideoDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return videos.map((video) => ({
    slug: video.slug,
  }))
}

export async function generateMetadata({
  params,
}: VideoDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const video = getVideoBySlug(slug)

  if (!video) {
    return {
      title: "Video Not Found | Media Centre",
      description: "The requested Ministry video could not be found.",
    }
  }

  const thumbnail =
    typeof video.thumbnail === "string"
      ? video.thumbnail
      : video.thumbnail.src

  return {
    title: `${video.title} | Videos`,
    description: video.description,
    openGraph: {
      title: video.title,
      description: video.description,
      type: "video.other",
      images: [
        {
          url: thumbnail,
          alt: video.thumbnailAlt,
        },
      ],
    },
  }
}

export default async function VideoDetailPage({
  params,
}: VideoDetailPageProps) {
  const { slug } = await params
  const video = getVideoBySlug(slug)

  if (!video) {
    notFound()
  }

  const relatedVideos = getRelatedVideos(video, 3)

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
      label: "Videos",
      href: "/media-centre/videos",
    },
    {
      label: video.title,
    },
  ]

  const hasValidYouTubeId =
    video.youtubeId &&
    !video.youtubeId.toLowerCase().startsWith("example")

  return (
    <>
      <SiteHeader />

      <main>
        <Breadcrumb items={breadcrumbItems} />

        <section
          aria-labelledby="video-detail-heading"
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
            className="absolute -bottom-52 -left-24 h-[32rem] w-[32rem] rounded-full border border-green-200/10 bg-green-300/[0.03]"
          />

          <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
            <Link
              href="/media-centre/videos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-green-200 transition hover:text-white focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              Back to Videos
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-green-100 backdrop-blur">
                  {video.category}
                </span>

                <h1
                  id="video-detail-heading"
                  className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                >
                  {video.title}
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
                  {video.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-x-7 gap-y-4 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <CalendarDays
                      aria-hidden="true"
                      className="h-5 w-5 text-green-200"
                    />

                    <time dateTime={video.publishedDate}>
                      {video.displayDate}
                    </time>
                  </div>

                  {video.location ? (
                    <div className="flex items-center gap-2">
                      <MapPin
                        aria-hidden="true"
                        className="h-5 w-5 text-green-200"
                      />

                      <span>{video.location}</span>
                    </div>
                  ) : null}

                  <div className="flex items-center gap-2">
                    <Clock3
                      aria-hidden="true"
                      className="h-5 w-5 text-green-200"
                    />

                    <span>{video.duration}</span>
                  </div>
                </div>

                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-3 rounded-lg bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-green-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
                >
                  Watch on YouTube

                  <ExternalLink
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </a>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-2 shadow-2xl backdrop-blur">
                <div className="relative aspect-video overflow-hidden rounded-[1.6rem] bg-slate-950">
                  {hasValidYouTubeId ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                      title={video.title}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="eager"
                    />
                  ) : (
                    <>
                      <Image
                        src={video.thumbnail}
                        alt={video.thumbnailAlt}
                        fill
                        priority
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="object-cover"
                      />

                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-slate-950/35"
                      />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <a
                          href={video.videoUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Watch ${video.title} on YouTube`}
                          className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/90 text-green-800 shadow-2xl transition hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 sm:h-24 sm:w-24"
                        >
                          <Play
                            aria-hidden="true"
                            className="ml-1 h-9 w-9 fill-current sm:h-11 sm:w-11"
                          />
                        </a>
                      </div>

                      <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/15 bg-slate-950/75 p-4 text-sm leading-6 text-slate-200 backdrop-blur">
                        Replace the placeholder YouTube ID in
                        <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-green-200">
                          data/videos.ts
                        </code>
                        to display the embedded official video.
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="video-information-heading"
          className="bg-white py-16 sm:py-20"
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
              <article>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                  Video overview
                </p>

                <h2
                  id="video-information-heading"
                  className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                >
                  About this video
                </h2>

                <div className="mt-6 space-y-5 text-lg leading-8 text-slate-600">
                  <p>{video.description}</p>

                  <p>
                    This official Ministry video provides coverage of activities
                    connected to {video.category.toLowerCase()}, public
                    programmes, development initiatives and stakeholder
                    participation.
                  </p>
                </div>
              </article>

              <aside
                aria-label="Video information"
                className="h-fit rounded-3xl border border-slate-200 bg-slate-50 p-6"
              >
                <h2 className="text-xl font-bold text-slate-950">
                  Video information
                </h2>

                <dl className="mt-6 divide-y divide-slate-200">
                  <div className="py-4 first:pt-0">
                    <dt className="text-sm font-semibold text-slate-500">
                      Category
                    </dt>

                    <dd className="mt-1 font-semibold text-slate-950">
                      {video.category}
                    </dd>
                  </div>

                  <div className="py-4">
                    <dt className="text-sm font-semibold text-slate-500">
                      Published
                    </dt>

                    <dd className="mt-1 font-semibold text-slate-950">
                      {video.displayDate}
                    </dd>
                  </div>

                  <div className="py-4">
                    <dt className="text-sm font-semibold text-slate-500">
                      Duration
                    </dt>

                    <dd className="mt-1 font-semibold text-slate-950">
                      {video.duration}
                    </dd>
                  </div>

                  {video.location ? (
                    <div className="py-4 last:pb-0">
                      <dt className="text-sm font-semibold text-slate-500">
                        Location
                      </dt>

                      <dd className="mt-1 font-semibold text-slate-950">
                        {video.location}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </aside>
            </div>
          </Container>
        </section>

        {relatedVideos.length > 0 ? (
          <section
            aria-labelledby="related-videos-heading"
            className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20"
          >
            <Container>
              <div className="flex flex-col gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                    Continue watching
                  </p>

                  <h2
                    id="related-videos-heading"
                    className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                  >
                    Related videos
                  </h2>

                  <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                    Explore more official videos related to{" "}
                    {video.category.toLowerCase()}.
                  </p>
                </div>

                <Link
                  href="/media-centre/videos"
                  className="inline-flex shrink-0 items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                >
                  View all videos

                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                </Link>
              </div>

              <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {relatedVideos.map((relatedVideo) => (
                  <article
                    key={relatedVideo.slug}
                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
                  >
                    <Link
                      href={`/media-centre/videos/${relatedVideo.slug}`}
                      className="relative block aspect-video overflow-hidden"
                    >
                      <Image
                        src={relatedVideo.thumbnail}
                        alt={relatedVideo.thumbnailAlt}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent"
                      />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-green-800 shadow-xl transition group-hover:scale-110">
                          <Play
                            aria-hidden="true"
                            className="ml-1 h-6 w-6 fill-current"
                          />
                        </span>
                      </div>

                      <div className="absolute bottom-4 right-4">
                        <span className="rounded-full bg-slate-950/75 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur">
                          {relatedVideo.duration}
                        </span>
                      </div>
                    </Link>

                    <div className="p-6">
                      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          <CalendarDays
                            aria-hidden="true"
                            className="h-4 w-4 text-green-700"
                          />

                          <time dateTime={relatedVideo.publishedDate}>
                            {relatedVideo.displayDate}
                          </time>
                        </div>

                        {relatedVideo.location ? (
                          <div className="flex items-center gap-2">
                            <MapPin
                              aria-hidden="true"
                              className="h-4 w-4 text-green-700"
                            />

                            <span>{relatedVideo.location}</span>
                          </div>
                        ) : null}
                      </div>

                      <h3 className="mt-5 text-xl font-bold leading-8 text-slate-950">
                        <Link
                          href={`/media-centre/videos/${relatedVideo.slug}`}
                          className="transition hover:text-green-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                        >
                          {relatedVideo.title}
                        </Link>
                      </h3>

                      <p className="mt-4 line-clamp-3 leading-7 text-slate-600">
                        {relatedVideo.description}
                      </p>

                      <Link
                        href={`/media-centre/videos/${relatedVideo.slug}`}
                        className="mt-6 inline-flex items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                      >
                        Watch video

                        <ArrowRight
                          aria-hidden="true"
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </Container>
          </section>
        ) : null}
      </main>

      <SiteFooter />
    </>
  )
}