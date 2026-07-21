import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CalendarDays } from "lucide-react"

import { newsItems } from "@/data/news"

export function FeaturedNews() {
  const featuredNews = newsItems.find((item) => item.featured)

  if (!featuredNews) {
    return null
  }

  return (
    <section
      aria-labelledby="featured-news-heading"
      className="bg-white px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#256B29]">
          Featured
        </p>

        <h2
          id="featured-news-heading"
          className="mt-3 text-3xl font-bold text-slate-950"
        >
          Featured news
        </h2>

        <article className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid lg:grid-cols-2">
          <div className="relative min-h-72 bg-slate-100">
            <Image
              src={featuredNews.image}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-10">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-800">
                {featuredNews.category}
              </span>

              <span className="inline-flex items-center gap-2 text-slate-500">
                <CalendarDays aria-hidden="true" className="h-4 w-4" />
                {featuredNews.published}
              </span>
            </div>

            <h3 className="mt-5 text-3xl font-bold leading-tight text-slate-950">
              {featuredNews.title}
            </h3>

            <p className="mt-5 leading-7 text-slate-600">
              {featuredNews.excerpt}
            </p>

            <Link
              href={`/news/${featuredNews.slug}`}
              className="mt-7 inline-flex w-fit items-center gap-2 font-semibold text-[#256B29]"
            >
              Read more
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Link>
          </div>
        </article>
      </div>
    </section>
  )
}