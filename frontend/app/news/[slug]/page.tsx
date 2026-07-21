import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays } from "lucide-react"

import { newsItems } from "@/data/news"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"

type NewsDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return newsItems.map((item) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params

  const article = newsItems.find((item) => item.slug === slug)

  if (!article) {
    return {
      title: "News Article Not Found",
    }
  }

  return {
    title: article.title,
    description: article.excerpt,
  }
}

export default async function NewsDetailPage({
  params,
}: NewsDetailPageProps) {
  const { slug } = await params

  const article = newsItems.find((item) => item.slug === slug)

  if (!article) {
    notFound()
  }

  return (
    <>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            {
              label: "News",
              href: "/news",
            },
            {
              label: article.title,
            },
          ]}
        />

        <article className="bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800">
              {article.category}
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {article.title}
            </h1>

            <p className="mt-5 inline-flex items-center gap-2 text-slate-500">
              <CalendarDays aria-hidden="true" className="h-5 w-5" />
              {article.published}
            </p>

            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl bg-slate-100">
              <Image
                src={article.image}
                alt=""
                fill
                priority
                className="object-cover"
                sizes="(min-width: 896px) 896px, 100vw"
              />
            </div>

            <div className="mt-10 space-y-6 text-lg leading-8 text-slate-700">
              {article.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <Link
              href="/news"
              className="mt-10 inline-flex items-center gap-2 font-semibold text-[#256B29]"
            >
              <ArrowLeft aria-hidden="true" className="h-5 w-5" />
              Back to news
            </Link>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  )
}