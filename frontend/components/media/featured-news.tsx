import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  Newspaper,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import {
  formatNewsDate,
  getAbsoluteNewsUrl,
  getFeaturedNews,
  getNewsImageAlt,
  getNewsImageUrl,
} from "@/src/lib/news"

export async function FeaturedNews() {
  let featuredArticle = null

  try {
    const featuredArticles =
      await getFeaturedNews("en")

    featuredArticle =
      featuredArticles[0] ?? null
  } catch (error) {
    console.error(
      "Unable to load featured news:",
      error,
    )
  }

  if (!featuredArticle) {
    return null
  }

  const imageUrl = getAbsoluteNewsUrl(
    getNewsImageUrl(featuredArticle),
  )

  const publishedDate = formatNewsDate(
    featuredArticle.published_at,
  )

  return (
    <section
      aria-labelledby="featured-news-heading"
      className="bg-white py-16 sm:py-20"
    >
      <Container>
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
              Featured story
            </p>

            <h2
              id="featured-news-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
            >
              Latest featured news
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Read the latest official announcement
              and development update from the Ministry.
            </p>
          </div>

          <Link
            href="#latest-news"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
          >
            View all news

            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4"
            />
          </Link>
        </div>

        <article className="group mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-sm">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative min-h-80 overflow-hidden bg-gradient-to-br from-sky-100 via-green-50 to-white sm:min-h-[28rem]">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={getNewsImageAlt(
                    featuredArticle,
                  )}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    aria-hidden="true"
                    className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-sky-200/60"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-green-200/60"
                  />

                  <Newspaper
                    aria-hidden="true"
                    className="relative h-20 w-20 text-green-700"
                  />
                </div>
              )}

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent"
              />

              <div className="absolute left-5 top-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                  <Newspaper
                    aria-hidden="true"
                    className="h-4 w-4 text-green-200"
                  />

                  Featured News
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <span className="w-fit rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-green-800">
                {featuredArticle.category
                  ?.name ?? "Ministry news"}
              </span>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CalendarDays
                    aria-hidden="true"
                    className="h-4 w-4 text-green-700"
                  />

                  <time
                    dateTime={
                      featuredArticle.published_at ??
                      undefined
                    }
                  >
                    {publishedDate ??
                      "Publication date unavailable"}
                  </time>
                </div>
              </div>

              <h3 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                <Link
                  href={`/media-centre/news/${featuredArticle.slug}`}
                  className="transition hover:text-green-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                >
                  {featuredArticle.title}
                </Link>
              </h3>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                {featuredArticle.summary}
              </p>

              <Link
                href={`/media-centre/news/${featuredArticle.slug}`}
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
              >
                Read full story

                <ArrowRight
                  aria-hidden="true"
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </article>
      </Container>
    </section>
  )
}