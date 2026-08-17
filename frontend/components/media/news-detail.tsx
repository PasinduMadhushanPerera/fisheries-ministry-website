import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  CalendarDays,
  Download,
  FileText,
  Building2,
  Sparkles,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import type { ApiNewsArticleItem } from "@/lib/api/news"

interface NewsDetailProps {
  article: ApiNewsArticleItem
}

export function NewsDetail({ article }: NewsDetailProps) {
  const imageUrl = article.image_url || "/images/home/hero-fishing-harbour.jpg"

  return (
    <article className="bg-white">
      <Container className="py-12 sm:py-16">
        <Link
          href="/media-centre/news"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#256B29] transition hover:text-[#1b4d1d] hover:underline"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          <span>Back to All News</span>
        </Link>

        <div className="mt-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#256B29]">
              {article.category_label || "Ministry News"}
            </span>

            {article.is_featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-extrabold text-amber-800">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                <span>Featured News</span>
              </span>
            )}
          </div>

          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
            {article.title}
          </h1>

          {article.summary && (
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600 font-medium">
              {article.summary}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-slate-200 py-4 text-xs font-bold text-slate-600">
            <div className="flex items-center gap-2">
              <CalendarDays aria-hidden="true" className="h-4 w-4 text-[#256B29]" />
              <span>Published: {article.published_date || "Recent"}</span>
            </div>

            {article.publisher && (
              <div className="flex items-center gap-2 text-slate-700">
                <Building2 aria-hidden="true" className="h-4 w-4 text-[#256B29]" />
                <span>Publisher: {article.publisher}</span>
              </div>
            )}
          </div>
        </div>

        {/* Hero Cover Image */}
        {imageUrl && (
          <div className="mt-8 max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-md">
            <div className="relative aspect-[16/8] w-full">
              <Image
                src={imageUrl}
                alt={article.image_alt || article.title}
                fill
                unoptimized
                priority
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Main Article Content */}
        <div className="mt-12 max-w-3xl">
          <div className="prose prose-slate max-w-none prose-headings:font-extrabold prose-headings:text-slate-950 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-[#256B29] prose-a:font-bold">
            {article.content ? (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            ) : (
              <p>{article.summary}</p>
            )}
          </div>

          {/* Downloadable Attachment (if provided) */}
          {(article.attachment_title || article.download_url) && (
            <section aria-labelledby="news-attachments-heading" className="mt-12 border-t border-slate-200 pt-8">
              <h2 id="news-attachments-heading" className="text-xl font-extrabold text-slate-950">
                Official Attachments & Press Releases
              </h2>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-[#256B29]">
                    <FileText aria-hidden="true" className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-950">
                      {article.attachment_title || "Official Gazette / Press Release"}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {article.file_type || "PDF"} • {article.file_size || "Document"}
                    </p>
                  </div>
                </div>

                {article.download_url && article.download_url !== "#" ? (
                  <a
                    href={article.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl bg-[#256B29] px-5 text-xs font-extrabold text-white shadow-xs transition hover:bg-[#1b4d1d]"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download File</span>
                  </a>
                ) : (
                  <span className="text-xs font-bold text-slate-400">Official Record</span>
                )}
              </div>
            </section>
          )}
        </div>
      </Container>
    </article>
  )
}