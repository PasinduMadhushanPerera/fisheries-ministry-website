"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  SearchX,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import { NewsFilters } from "@/components/media/news-filters"
import {
  newsArticles,
  type NewsCategory,
} from "@/data/news"

export function NewsList() {
  const [activeCategory, setActiveCategory] =
    useState<NewsCategory>("All")

  const [searchQuery, setSearchQuery] = useState("")

  const filteredArticles = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()

    return newsArticles.filter((article) => {
      const matchesCategory =
        activeCategory === "All" ||
        article.category === activeCategory

      const matchesSearch =
        keyword.length === 0 ||
        article.title.toLowerCase().includes(keyword) ||
        article.excerpt.toLowerCase().includes(keyword) ||
        article.category.toLowerCase().includes(keyword) ||
        article.location?.toLowerCase().includes(keyword)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <>
      <NewsFilters
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onCategoryChange={setActiveCategory}
        onSearchChange={setSearchQuery}
      />

      <section
        id="latest-news"
        aria-labelledby="latest-news-heading"
        className="scroll-mt-24 bg-slate-50 py-16 sm:py-20"
      >
        <Container>
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                Latest news
              </p>

              <h2
                id="latest-news-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
              >
                {activeCategory === "All"
                  ? "All News"
                  : activeCategory}
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                Browse the latest news, announcements and updates published by
                the Ministry.
              </p>
            </div>

            <p
              aria-live="polite"
              className="text-sm font-semibold text-slate-600"
            >
              {filteredArticles.length}{" "}
              {filteredArticles.length === 1
                ? "article"
                : "articles"}
            </p>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredArticles.map((article) => (
                <article
                  key={article.slug}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
                >
                  <Link
                    href={`/media-centre/news/${article.slug}`}
                    className="block"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.imageAlt}
                        fill
                        sizes="(min-width:1280px) 33vw,(min-width:768px) 50vw,100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-green-700 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                          {article.category}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-green-700" />

                        <time dateTime={article.publishedDate}>
                          {article.displayDate}
                        </time>
                      </div>

                      {article.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-green-700" />

                          <span>{article.location}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="mt-5 text-xl font-bold leading-8 text-slate-950">
                      <Link
                        href={`/media-centre/news/${article.slug}`}
                        className="transition hover:text-green-700"
                      >
                        {article.title}
                      </Link>
                    </h3>

                    <p className="mt-4 leading-7 text-slate-600">
                      {article.excerpt}
                    </p>

                    <Link
                      href={`/media-centre/news/${article.slug}`}
                      className="mt-6 inline-flex items-center gap-2 font-semibold text-green-700 transition hover:text-green-900"
                    >
                      Read More

                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <SearchX className="h-8 w-8" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-950">
                No news found
              </h3>

              <p className="mx-auto mt-4 max-w-lg leading-7 text-slate-600">
                Try another keyword or choose a different category to browse
                more Ministry news and updates.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}