import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Camera,
  Images,
  PlayCircle,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { galleryPreview } from "@/data/media"

export function MediaGalleryPreview() {
  const photos = galleryPreview.filter((item) => item.type === "photo")
  const videos = galleryPreview.filter((item) => item.type === "video")

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#2f7d32]">
              Gallery
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Photo & Video Gallery
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Explore official photographs and videos showcasing ministry
              programmes, fisheries development initiatives and special
              events.
            </p>
          </div>

          <Link
            href="/media/gallery"
            className="inline-flex items-center gap-2 font-semibold text-[#0a322f] transition hover:gap-3"
          >
            Browse Gallery
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Photo Gallery */}

        <div className="mt-14">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
                <Images className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Photo Gallery
                </h3>

                <p className="text-slate-600">
                  Latest ministry photographs
                </p>
              </div>
            </div>

            <Link
              href="/media/gallery"
              className="hidden font-semibold text-[#0a322f] md:inline-flex"
            >
              View All
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {photos.map((photo) => (
              <Link
                key={photo.id}
                href={photo.href}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute left-5 top-5 rounded-full bg-white/90 p-3 text-slate-900 backdrop-blur">
                    <Camera className="h-5 w-5" />
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <h4 className="font-semibold text-white">
                      {photo.title}
                    </h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Video Gallery */}

        <div className="mt-20">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                <PlayCircle className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Video Gallery
                </h3>

                <p className="text-slate-600">
                  Official ministry videos
                </p>
              </div>
            </div>

            <Link
              href="/media/videos"
              className="hidden font-semibold text-[#0a322f] md:inline-flex"
            >
              View All
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {videos.map((video) => (
              <Link
                key={video.id}
                href={video.href}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-xl"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={video.image}
                    alt={video.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/30" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-[#0a322f] shadow-lg transition duration-300 group-hover:scale-110">
                      <PlayCircle className="h-10 w-10 fill-current" />
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                      Official Video
                    </span>

                    <h4 className="mt-3 text-xl font-bold text-white">
                      {video.title}
                    </h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}

        <div className="mt-20 rounded-[2rem] bg-[#061d24] p-10 text-center text-white">
          <Images className="mx-auto h-12 w-12 text-green-300" />

          <h3 className="mt-6 text-3xl font-bold">
            Explore Our Complete Media Gallery
          </h3>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Browse photographs and videos documenting ministry projects,
            marine conservation, fisheries development, public programmes
            and official events across Sri Lanka.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/media/gallery"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Photo Gallery
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/media/videos"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
            >
              Video Gallery
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}