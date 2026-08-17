import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, CalendarDays, Newspaper } from "lucide-react"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { NewsDetail } from "@/components/media/news-detail"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Container } from "@/components/ui/container"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { fetchNewsArticleBySlug, fetchNewsPageData } from "@/lib/api/news"
import { getServerLanguage } from "@/lib/get-server-language"

type NewsArticlePageProps = {
  params: Promise<{
    slug: string
  }>
  searchParams?: Promise<{
    lang?: string
  }>
}

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function generateMetadata({
  params,
  searchParams,
}: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const lang = searchParams ? await getServerLanguage(searchParams) : "en"

  const article = await fetchNewsArticleBySlug(slug, lang)

  if (!article) {
    return {
      title: "News Article Not Found | Media Centre",
      description: "The requested Ministry news article could not be found.",
    }
  }

  return {
    title: `${article.title} - Ministry of Fisheries`,
    description: article.summary || "Official Ministry news article.",
  }
}

export default async function NewsArticlePage({
  params,
  searchParams,
}: NewsArticlePageProps) {
  const { slug } = await params
  const lang = searchParams ? await getServerLanguage(searchParams) : "en"

  const [article, newsPageData, headerFooterData] = await Promise.all([
    fetchNewsArticleBySlug(slug, lang),
    fetchNewsPageData(lang),
    fetchHeaderFooterData(),
  ])

  if (!article) {
    notFound()
  }

  const relatedArticles = (newsPageData?.articles || [])
    .filter((a) => a.slug !== slug && (a.category === article.category || !article.category))
    .slice(0, 3)

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Media Centre", href: "/media-centre/news" },
    { label: "News", href: "/media-centre/news" },
    { label: article.title },
  ]

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb items={breadcrumbItems} />

        <NewsDetail article={article} />

        {relatedArticles.length > 0 && (
          <section
            aria-labelledby="related-news-heading"
            className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20"
          >
            <Container>
              <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="inline-flex rounded-full bg-emerald-50 border border-emerald-200/80 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#256B29]">
                    Continue Reading
                  </span>
                  <h2
                    id="related-news-heading"
                    className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight"
                  >
                    Related News & Updates
                  </h2>
                </div>

                <Link
                  href="/media-centre/news"
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#256B29] transition hover:text-[#1b4d1d] hover:underline"
                >
                  <span>View All News</span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((rel) => {
                  const relImageUrl = rel.image_url || "/images/home/hero-fishing-harbour.jpg"

                  return (
                    <article
                      key={rel.id}
                      className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xs transition duration-300 hover:-translate-y-1 hover:border-[#256B29]/40 hover:shadow-xl"
                    >
                      <Link
                        href={`/media-centre/news/${rel.slug}`}
                        className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 block"
                      >
                        <img
                          src={relImageUrl}
                          alt={rel.image_alt || rel.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3.5 left-3.5">
                          <span className="rounded-full bg-[#256B29] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white">
                            {rel.category_label || "Ministry News"}
                          </span>
                        </div>
                      </Link>

                      <div className="flex flex-1 flex-col justify-between p-6">
                        <div>
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 mb-2">
                            <CalendarDays className="h-3.5 w-3.5 text-[#256B29]" />
                            <span>{rel.published_date || "Recent"}</span>
                          </div>

                          <h3 className="text-base font-extrabold text-slate-950 leading-snug group-hover:text-[#256B29] transition-colors line-clamp-2">
                            <Link href={`/media-centre/news/${rel.slug}`}>{rel.title}</Link>
                          </h3>

                          <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                            {rel.summary}
                          </p>
                        </div>

                        <Link
                          href={`/media-centre/news/${rel.slug}`}
                          className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#256B29] hover:underline"
                        >
                          <span>Read Story</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </article>
                  )
                })}
              </div>
            </Container>
          </section>
        )}
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}