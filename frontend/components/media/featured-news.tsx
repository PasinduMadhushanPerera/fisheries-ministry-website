import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  Newspaper,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { featuredNews } from "@/data/media"

export function FeaturedNews() {
  const featured = featuredNews.find((item) => item.featured)
  const secondary = featuredNews.filter((item) => !item.featured)

  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#2f7d32]">
              Featured News
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Latest Ministry News & Stories
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Read the latest official news, programmes and important
              developments from the Ministry of Fisheries.
            </p>
          </div>

          <Link
            href="/media/news"
            className="inline-flex items-center gap-2 font-semibold text-[#0a322f] transition hover:gap-3"
          >
            View all news
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Featured Article */}

          {featured && (
            <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-xl">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute left-6 top-6 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white">
                  Featured
                </div>
              </div>

              <div className="p-8">
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    {featured.date}
                  </span>

                  <span className="rounded-full bg-green-50 px-3 py-1 font-semibold text-green-700">
                    {featured.category}
                  </span>
                </div>

                <h3 className="mt-5 text-3xl font-bold text-slate-900">
                  {featured.title}
                </h3>

                <p className="mt-5 leading-8 text-slate-600">
                  {featured.summary}
                </p>

                <Link
                  href={featured.href}
                  className="mt-8 inline-flex items-center gap-2 font-semibold text-[#0a322f] transition hover:gap-3"
                >
                  Read More
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </article>
          )}

          {/* Side News */}

          <div className="space-y-6">
            {secondary.map((news) => (
              <article
                key={news.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:border-green-300 hover:shadow-lg"
              >
                <div className="flex gap-5 p-5">
                  <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <span className="inline-flex w-fit items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      {news.category}
                    </span>

                    <h3 className="mt-3 text-lg font-bold leading-7 text-slate-900">
                      {news.title}
                    </h3>

                    <div className="mt-auto flex items-center justify-between pt-5">
                      <span className="flex items-center gap-2 text-sm text-slate-500">
                        <CalendarDays className="h-4 w-4" />
                        {news.date}
                      </span>

                      <Link
                        href={news.href}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#0a322f]"
                      >
                        Read
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <div className="rounded-2xl bg-[#0a322f] p-8 text-white">
              <Newspaper className="h-8 w-8 text-green-300" />

              <h3 className="mt-5 text-2xl font-bold">
                News Archive
              </h3>

              <p className="mt-3 leading-7 text-slate-300">
                Browse previous ministry news, announcements and official
                updates from the archive.
              </p>

              <Link
                href="/media/news"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-green-300"
              >
                Explore Archive
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}