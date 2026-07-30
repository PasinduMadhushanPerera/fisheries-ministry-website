import Link from "next/link"
import {
  ArrowLeft,
  CalendarDays,
  Download,
  FileText,
  Newspaper,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import {
  formatNewsDate,
  getAbsoluteNewsUrl,
  getNewsImageAlt,
  getNewsImageUrl,
  type NewsArticle,
} from "@/src/lib/news"

type NewsDetailProps = {
  article: NewsArticle
}

export function NewsDetail({
  article,
}: NewsDetailProps) {
  const imageUrl = getAbsoluteNewsUrl(
    getNewsImageUrl(article),
  )

  const publishedDate = formatNewsDate(
    article.published_at,
  )

  return (
    <article className="bg-white">
      <Container className="py-16 sm:py-20">
        <Link
          href="/media-centre/news"
          className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 transition hover:text-green-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
        >
          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4"
          />

          Back to News
        </Link>

        <div className="mt-8 max-w-4xl">
          <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
            {article.category?.name ??
              "Ministry news"}
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {article.title ??
              "Ministry news update"}
          </h1>

          {article.summary && (
            <p className="mt-6 text-xl leading-9 text-slate-600">
              {article.summary}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-y border-slate-200 py-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <CalendarDays
                aria-hidden="true"
                className="h-5 w-5 text-green-700"
              />

              <time
                dateTime={
                  article.published_at ??
                  undefined
                }
              >
                {publishedDate ??
                  "Publication date unavailable"}
              </time>
            </div>

            {article.is_featured && (
              <div className="flex items-center gap-2">
                <Newspaper
                  aria-hidden="true"
                  className="h-5 w-5 text-green-700"
                />

                <span>Featured news</span>
              </div>
            )}
          </div>
        </div>

        {imageUrl && (
          <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
            <div className="aspect-[16/8]">
              <img
                src={imageUrl}
                alt={getNewsImageAlt(article)}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}

        <div className="mx-auto mt-14 max-w-3xl">
          {article.content && (
            <div
              className="prose prose-slate max-w-none prose-headings:text-slate-950 prose-p:text-slate-700 prose-p:leading-8 prose-a:text-green-700 prose-a:font-semibold hover:prose-a:text-green-900"
              dangerouslySetInnerHTML={{
                __html: article.content,
              }}
            />
          )}

          {article.attachments.length > 0 && (
            <section
              aria-labelledby="news-attachments-heading"
              className="mt-12 border-t border-slate-200 pt-8"
            >
              <h2
                id="news-attachments-heading"
                className="text-2xl font-bold text-slate-950"
              >
                Attachments
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                Open or download documents related to
                this news article.
              </p>

              <div className="mt-6 grid gap-4">
                {article.attachments.map(
                  (attachment) => {
                    const attachmentUrl =
                      getAbsoluteNewsUrl(
                        attachment.file_url ??
                          attachment.file,
                      )

                    if (!attachmentUrl) {
                      return null
                    }

                    return (
                      <a
                        key={attachment.id}
                        href={attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-green-200 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex min-w-0 items-center gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-green-700">
                            <FileText
                              aria-hidden="true"
                              className="h-6 w-6"
                            />
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate font-bold text-slate-950">
                              {attachment.title}
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                              {attachment.file_type ??
                                "News document"}
                            </p>
                          </div>
                        </div>

                        <span className="inline-flex shrink-0 items-center gap-2 font-bold text-green-700 transition group-hover:text-green-900">
                          <Download
                            aria-hidden="true"
                            className="h-4 w-4"
                          />

                          Open file
                        </span>
                      </a>
                    )
                  },
                )}
              </div>
            </section>
          )}
        </div>
      </Container>
    </article>
  )
}