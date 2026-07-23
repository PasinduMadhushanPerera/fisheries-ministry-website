import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  User,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import type { NewsArticle } from "@/data/news"

type NewsDetailProps = {
  article: NewsArticle
}

export function NewsDetail({ article }: NewsDetailProps) {
  return (
    <article className="bg-white">
      <Container className="py-16 sm:py-20">
        <Link
          href="/media-centre/news"
          className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 transition hover:text-green-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to News
        </Link>

        <div className="mt-8 max-w-4xl">
          <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
            {article.category}
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {article.title}
          </h1>

          <p className="mt-6 text-xl leading-9 text-slate-600">
            {article.excerpt}
          </p>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-y border-slate-200 py-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-green-700" />

              <time dateTime={article.publishedDate}>
                {article.displayDate}
              </time>
            </div>

            {article.author && (
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-green-700" />

                <span>{article.author}</span>
              </div>
            )}

            {article.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-700" />

                <span>{article.location}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
          <div className="relative aspect-[16/8]">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="prose prose-slate max-w-none prose-headings:text-slate-950 prose-p:text-slate-700 prose-p:leading-8">
            {article.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Container>
    </article>
  )
}