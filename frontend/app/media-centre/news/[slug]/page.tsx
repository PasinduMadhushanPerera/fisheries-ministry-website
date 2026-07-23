import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowRight,
  CalendarDays,
} from "lucide-react"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { NewsDetail } from "@/components/media/news-detail"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Container } from "@/components/ui/container"
import {
  getNewsBySlug,
  getRelatedNews,
  newsArticles,
} from "@/data/news"

type NewsArticlePageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getNewsBySlug(slug)

  if (!article) {
    return {
      title: "News Article Not Found | Media Centre",
      description:
        "The requested Ministry news article could not be found.",
    }
  }

  return {
    title: `${article.title} | Ministry News`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedDate,
      images: [
        {
          url:
            typeof article.image === "string"
              ? article.image
              : article.image.src,
          alt: article.imageAlt,
        },
      ],
    },
  }
}

export default async function NewsArticlePage({
  params,
}: NewsArticlePageProps) {
  const { slug } = await params
  const article = getNewsBySlug(slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = getRelatedNews(article, 3)

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
      label: article.title,
    },
  ]

  return (
    <>
      <SiteHeader />

      <main>
        <Breadcrumb items={breadcrumbItems} />

        <NewsDetail article={article} />

        {relatedArticles.length > 0 ? (
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
                    Explore more Ministry news and updates related to{" "}
                    {article.category.toLowerCase()}.
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
                {relatedArticles.map((relatedArticle) => (
                  <article
                    key={relatedArticle.slug}
                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
                  >
                    <Link
                      href={`/media-centre/news/${relatedArticle.slug}`}
                      className="block"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={relatedArticle.image}
                          alt={relatedArticle.imageAlt}
                          fill
                          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />

                        <div className="absolute left-4 top-4">
                          <span className="rounded-full bg-green-700 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                            {relatedArticle.category}
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

                        <time dateTime={relatedArticle.publishedDate}>
                          {relatedArticle.displayDate}
                        </time>
                      </div>

                      <h3 className="mt-5 text-xl font-bold leading-8 text-slate-950">
                        <Link
                          href={`/media-centre/news/${relatedArticle.slug}`}
                          className="transition hover:text-green-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
                        >
                          {relatedArticle.title}
                        </Link>
                      </h3>

                      <p className="mt-4 line-clamp-3 leading-7 text-slate-600">
                        {relatedArticle.excerpt}
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