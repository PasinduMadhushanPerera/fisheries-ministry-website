import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowRight,
  CalendarDays,
  Newspaper,
} from "lucide-react"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { NewsDetail } from "@/components/media/news-detail"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Container } from "@/components/ui/container"
import {
  formatNewsDate,
  getAbsoluteNewsUrl,
  getNewsBySlug,
  getNewsImageAlt,
  getNewsImageUrl,
  getRelatedNews,
} from "@/src/lib/news"

type NewsArticlePageProps = {
  params: Promise<{
    slug: string
  }>
}

export const dynamic = "force-dynamic"

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params

  const article = await getNewsBySlug(
    slug,
    "en",
  )

  if (!article) {
    return {
      title:
        "News Article Not Found | Media Centre",
      description:
        "The requested Ministry news article could not be found.",
    }
  }

  const imageUrl = getAbsoluteNewsUrl(
    getNewsImageUrl(article),
  )

  return {
    title:
      article.seo_title ??
      `${article.title} | Ministry News`,

    description:
      article.seo_description ??
      article.summary ??
      "Official Ministry news article.",

    openGraph: {
      title:
        article.seo_title ??
        article.title ??
        "Ministry News",

      description:
        article.seo_description ??
        article.summary ??
        "Official Ministry news article.",

      type: "article",

      publishedTime:
        article.published_at ?? undefined,

      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: getNewsImageAlt(article),
            },
          ]
        : [],
    },
  }
}

export default async function NewsArticlePage({
  params,
}: NewsArticlePageProps) {
  const { slug } = await params

  const article = await getNewsBySlug(
    slug,
    "en",
  )

  if (!article) {
    notFound()
  }

  const relatedArticles =
    await getRelatedNews(
      article,
      "en",
      3,
    )

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
      label: "News",
      href: "/media-centre/news",
    },
    {
      label:
        article.title ??
        "News article",
    },
  ]

  return (
    <>
      <SiteHeader />

      <main>
        <Breadcrumb
          items={breadcrumbItems}
        />

        <NewsDetail article={article} />

        {relatedArticles.length > 0 && (
          <section
            aria-labelledby="related-news-heading"
            className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20"
          >
            <Container>
              <div className="flex flex-col gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-3xl">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
                    Continue reading
                  </p>

                  <h2
                    id="related-news-heading"
                    className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
                  >
                    Related news
                  </h2>

                  <p className="mt-4 leading-7 text-slate-600">
                    Explore more Ministry news and
                    updates from the{" "}
                    {article.category?.name ??
                      "same"}{" "}
                    category.
                  </p>
                </div>

                <Link
                  href="/media-centre/news"
                  className="inline-flex shrink-0 items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                >
                  View all news

                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                </Link>
              </div>

              <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {relatedArticles.map(
                  (relatedArticle) => {
                    const imageUrl =
                      getAbsoluteNewsUrl(
                        getNewsImageUrl(
                          relatedArticle,
                        ),
                      )

                    const publishedDate =
                      formatNewsDate(
                        relatedArticle.published_at,
                      )

                    return (
                      <article
                        key={relatedArticle.id}
                        className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
                      >
                        <Link
                          href={`/media-centre/news/${relatedArticle.slug}`}
                          className="block"
                        >
                          <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-sky-100 via-green-50 to-white">
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={getNewsImageAlt(
                                  relatedArticle,
                                )}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <Newspaper
                                aria-hidden="true"
                                className="h-14 w-14 text-green-700"
                              />
                            )}

                            <div className="absolute left-4 top-4">
                              <span className="rounded-full bg-green-700 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                                {relatedArticle
                                  .category?.name ??
                                  "Ministry news"}
                              </span>
                            </div>
                          </div>
                        </Link>

                        <div className="p-6">
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <CalendarDays
                              aria-hidden="true"
                              className="h-4 w-4 text-green-700"
                            />

                            <time
                              dateTime={
                                relatedArticle.published_at ??
                                undefined
                              }
                            >
                              {publishedDate ??
                                "Date unavailable"}
                            </time>
                          </div>

                          <h3 className="mt-5 text-xl font-bold leading-8 text-slate-950">
                            <Link
                              href={`/media-centre/news/${relatedArticle.slug}`}
                              className="transition hover:text-green-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                            >
                              {
                                relatedArticle.title
                              }
                            </Link>
                          </h3>

                          <p className="mt-4 line-clamp-3 leading-7 text-slate-600">
                            {
                              relatedArticle.summary
                            }
                          </p>

                          <Link
                            href={`/media-centre/news/${relatedArticle.slug}`}
                            className="mt-6 inline-flex items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                          >
                            Read article

                            <ArrowRight
                              aria-hidden="true"
                              className="h-4 w-4 transition-transform group-hover:translate-x-1"
                            />
                          </Link>
                        </div>
                      </article>
                    )
                  },
                )}
              </div>
            </Container>
          </section>
        )}
      </main>

      <SiteFooter />
    </>
  )
}