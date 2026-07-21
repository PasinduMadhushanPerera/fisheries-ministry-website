import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CalendarDays } from "lucide-react"

import { newsItems } from "@/data/news"

export function LatestNews() {
  return (
    <section
      aria-labelledby="latest-news-heading"
      className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#256B29]">
          Latest updates
        </p>

        <h2
          id="latest-news-heading"
          className="mt-3 text-3xl font-bold text-slate-950"
        >
          Latest news
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {newsItems.map((item) => (
            <article
              key={item.slug}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative h-56 bg-slate-100">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>

              <div className="p-7">
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-800">
                    {item.category}
                  </span>

                  <span className="inline-flex items-center gap-2 text-slate-500">
                    <CalendarDays aria-hidden="true" className="h-4 w-4" />
                    {item.published}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold leading-snug text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {item.excerpt}
                </p>

                <Link
                  href={`/news/${item.slug}`}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-[#256B29]"
                >
                  Read more
                  <ArrowRight aria-hidden="true" className="h-5 w-5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}