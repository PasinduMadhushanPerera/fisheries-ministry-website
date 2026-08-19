import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  CalendarDays,
  Download,
  FileText,
  Building2,
  Sparkles,
  Quote,
  PlayCircle,
  Table as TableIcon,
  FileSpreadsheet,
  FileType,
  FileArchive,
  ExternalLink,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import type { ApiNewsArticleItem, ApiNewsContentBlock } from "@/lib/api/news"

interface NewsDetailProps {
  article: ApiNewsArticleItem
}

function parseMarkdownTable(markdown: string) {
  if (!markdown || !markdown.trim()) return null
  const lines = markdown
    .trim()
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
  if (lines.length === 0) return null

  // Filter out separator lines like |---|---|
  const contentLines = lines.filter(
    (line) => !line.match(/^\|?(\s*:?-+:?\s*\|?)+$/)
  )
  if (contentLines.length === 0) return null

  const parseRow = (line: string) => {
    const clean = line.replace(/^\|/, "").replace(/\|$/, "")
    return clean.split("|").map((c) => c.trim())
  }

  const headers = parseRow(contentLines[0])
  const rows = contentLines.slice(1).map(parseRow)
  return { headers, rows }
}

function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null
  if (url.includes("youtube.com/watch?v=")) {
    const id = url.split("v=")[1]?.split("&")[0]
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
  }
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0]
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
  }
  if (url.includes("youtube.com/embed/")) {
    return url
  }
  return null
}

function getFileFormatIcon(fileType?: string) {
  switch (fileType?.toUpperCase()) {
    case "PDF":
      return <FileText className="h-5 w-5 text-red-600" aria-hidden="true" />
    case "XLSX":
    case "CSV":
      return <FileSpreadsheet className="h-5 w-5 text-[#256B29]" aria-hidden="true" />
    case "DOCX":
    case "DOC":
      return <FileType className="h-5 w-5 text-blue-600" aria-hidden="true" />
    case "ZIP":
      return <FileArchive className="h-5 w-5 text-slate-700" aria-hidden="true" />
    default:
      return <FileText className="h-5 w-5 text-slate-600" aria-hidden="true" />
  }
}

export function NewsDetail({ article }: NewsDetailProps) {
  const imageUrl = article.image_url || "/images/home/hero-fishing-harbour.jpg"
  const blocks = article.content_blocks || []
  const hasBlocks = blocks.length > 0

  // Block Renderers
  const renderText = (block: ApiNewsContentBlock) => {
    const textContent = block.content || block.text || ""
    return (
      <div key={block.id} className="space-y-3">
        {block.heading && (
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
            {block.heading}
          </h3>
        )}
        {textContent && (
          <div
            className="prose prose-slate max-w-none prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-[#256B29] prose-a:font-bold prose-strong:text-slate-950 text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: textContent }}
          />
        )}
      </div>
    )
  }

  const renderHeading = (block: ApiNewsContentBlock) => {
    const headingText = block.content || block.heading || ""
    const level = block.level || block.heading_level || "h2"

    if (level === "h3") {
      return (
        <h3
          key={block.id}
          className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight mt-8 mb-3"
        >
          {headingText}
        </h3>
      )
    }

    if (level === "h4") {
      return (
        <h4
          key={block.id}
          className="text-lg font-bold text-slate-900 tracking-tight mt-6 mb-2"
        >
          {headingText}
        </h4>
      )
    }

    return (
      <h2
        key={block.id}
        className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-10 mb-4 border-b border-slate-100 pb-3"
      >
        {headingText}
      </h2>
    )
  }

  const renderImage = (block: ApiNewsContentBlock) => {
    const imgUrl = block.media_url || block.image_url || "/images/home/hero-fishing-harbour.jpg"
    const caption = block.image_caption || ""
    const altText = block.image_alt || caption || "News Story Image"

    return (
      <figure
        key={block.id}
        className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-2xs"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
          <img
            src={imgUrl}
            alt={altText}
            className="h-full w-full object-cover"
          />
        </div>
        {caption && (
          <figcaption className="p-4 text-xs font-semibold text-slate-600 border-t border-slate-200 bg-white flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#256B29] shrink-0" />
            <span>{caption}</span>
          </figcaption>
        )}
      </figure>
    )
  }

  const renderVideo = (block: ApiNewsContentBlock) => {
    const vUrl = block.media_url || block.video_url || ""
    const ytEmbed = vUrl ? getYouTubeEmbedUrl(vUrl) : null

    return (
      <div
        key={block.id}
        className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-md"
      >
        {ytEmbed ? (
          <div className="relative aspect-video w-full">
            <iframe
              src={ytEmbed}
              title={block.video_title || "News Video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        ) : vUrl ? (
          <video controls className="w-full aspect-video bg-black">
            <source src={vUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : null}

        {(block.video_title || block.video_caption) && (
          <div className="p-4 bg-white border-t border-slate-200">
            {block.video_title && (
              <h4 className="text-sm font-extrabold text-slate-950 flex items-center gap-2">
                <PlayCircle className="h-4 w-4 text-[#256B29]" />
                <span>{block.video_title}</span>
              </h4>
            )}
            {block.video_caption && (
              <p className="mt-1 text-xs text-slate-600 font-medium">
                {block.video_caption}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }

  const renderTable = (block: ApiNewsContentBlock) => {
    const rawData = block.content || block.table_data || ""
    const tableParsed = parseMarkdownTable(rawData)

    return (
      <div
        key={block.id}
        className="my-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs"
      >
        {block.table_title && (
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
            <TableIcon className="h-4 w-4 text-[#256B29]" />
            <h3 className="text-sm sm:text-base font-extrabold text-slate-950">
              {block.table_title}
            </h3>
          </div>
        )}

        {tableParsed ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-900 font-extrabold uppercase text-[11px] tracking-wider">
                <tr>
                  {tableParsed.headers.map((h, idx) => (
                    <th key={idx} className="py-3 px-3.5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {tableParsed.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/70 transition">
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className={`py-3 px-3.5 ${
                          cIdx === 0
                            ? "font-bold text-slate-900"
                            : "text-slate-600"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <pre className="text-xs bg-slate-50 p-4 rounded-xl overflow-x-auto text-slate-700">
            {rawData}
          </pre>
        )}
      </div>
    )
  }

  const renderQuote = (block: ApiNewsContentBlock) => {
    const quoteText = block.content || block.text || ""
    return (
      <blockquote
        key={block.id}
        className="my-8 rounded-2xl border-l-4 border-[#256B29] bg-gradient-to-br from-emerald-50/60 to-white p-6 shadow-2xs"
      >
        <div className="flex gap-3">
          <Quote className="h-6 w-6 text-[#256B29] shrink-0 opacity-80" />
          <div>
            <div
              className="text-base sm:text-lg italic font-semibold text-slate-900 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: quoteText }}
            />
            {(block.quote_author || block.quote_role) && (
              <div className="mt-4 pt-3 border-t border-emerald-200/50">
                {block.quote_author && (
                  <p className="text-sm font-extrabold text-slate-950">
                    {block.quote_author}
                  </p>
                )}
                {block.quote_role && (
                  <p className="text-xs text-[#256B29] font-semibold mt-0.5">
                    {block.quote_role}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </blockquote>
    )
  }

  const renderAttachment = (block: ApiNewsContentBlock) => {
    const files = (block.files && block.files.length > 0)
      ? block.files
      : [
          {
            id: 1,
            title: block.file_title || "Official Attachment Document",
            download_url: block.download_url || block.media_url || "#",
            file_type: block.file_type || "PDF",
            file_size: block.file_size || "1.5 MB",
          },
        ]

    return (
      <div
        key={block.id}
        className="my-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 shadow-2xs space-y-3.5"
      >
        <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200/80">
          <FileText className="h-4 w-4 text-[#256B29]" />
          <h3 className="text-sm font-extrabold text-slate-950 uppercase tracking-wider">
            {block.heading || "Attached Documents & Downloads"} ({files.length})
          </h3>
        </div>

        <div className="space-y-3">
          {files.map((file, fIdx) => {
            const fUrl = file.download_url || "#"
            return (
              <div
                key={file.id || fIdx}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-[#256B29]/40 transition"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-[#256B29]">
                    {getFileFormatIcon(file.file_type)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-extrabold text-slate-950 truncate">
                      {file.title || `Document #${fIdx + 1}`}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {file.file_type || "PDF"} • {file.file_size || "1.5 MB"}
                    </p>
                  </div>
                </div>

                {fUrl && fUrl !== "#" ? (
                  <a
                    href={fUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#256B29] px-5 text-xs font-extrabold text-white shadow-xs transition hover:bg-[#1b4d1d]"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download File</span>
                  </a>
                ) : (
                  <span className="text-xs font-bold text-slate-400">
                    Official Record
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

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

        {/* Header Title Section */}
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

        {/* Main Article Content & Dynamic Story Blocks */}
        <div className="mt-12 max-w-3xl">
          {/* If no blocks exist, render legacy/standard content if provided */}
          {!hasBlocks ? (
            (article.content && article.content.trim() !== article.summary?.trim()) ? (
              <div
                className="prose prose-slate max-w-none prose-headings:font-extrabold prose-headings:text-slate-950 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-[#256B29] prose-a:font-bold"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            ) : null
          ) : (
            <div className="space-y-8">
              {/* Optional Overview Lead Content if filled (and different from summary) */}
              {article.content && article.content.trim() !== article.summary?.trim() && (
                <div
                  className="prose prose-slate max-w-none prose-headings:font-extrabold prose-headings:text-slate-950 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-[#256B29] prose-a:font-bold text-base leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              )}

              {/* Dynamic Content Blocks Rendered in EXACT Admin-defined Order */}
              {blocks.map((block) => {
                const bType = block.type || block.block_type || "text"
                switch (bType) {
                  case "text":
                  case "paragraph":
                    return renderText(block)
                  case "heading":
                    return renderHeading(block)
                  case "image":
                    return renderImage(block)
                  case "video":
                    return renderVideo(block)
                  case "table":
                    return renderTable(block)
                  case "quote":
                    return renderQuote(block)
                  case "attachment":
                  case "file":
                    return renderAttachment(block)
                  default:
                    return renderText(block)
                }
              })}
            </div>
          )}

          {/* Primary Cover Downloadable Attachments */}
          {((article.files && article.files.length > 0) || article.attachment_title || article.download_url) && (
            <section
              aria-labelledby="news-attachments-heading"
              className="mt-14 border-t border-slate-200 pt-8"
            >
              <h2
                id="news-attachments-heading"
                className="text-xl font-extrabold text-slate-950"
              >
                Official Attachments & Press Releases
              </h2>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 space-y-3">
                {((article.files && article.files.length > 0)
                  ? article.files
                  : [
                      {
                        id: 1,
                        title: article.attachment_title || "Official Gazette / Press Release",
                        download_url: article.download_url || "#",
                        file_type: article.file_type || "PDF",
                        file_size: article.file_size || "Document",
                      },
                    ]
                ).map((file, fIdx) => {
                  const fUrl = file.download_url || "#"
                  return (
                    <div
                      key={file.id || fIdx}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-[#256B29]/40 transition"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-[#256B29]">
                          {getFileFormatIcon(file.file_type)}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-extrabold text-slate-950 truncate">
                            {file.title || `Document #${fIdx + 1}`}
                          </h3>
                          <p className="text-xs text-slate-500 font-medium">
                            {file.file_type || "PDF"} • {file.file_size || "Document"}
                          </p>
                        </div>
                      </div>

                      {fUrl && fUrl !== "#" ? (
                        <a
                          href={fUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#256B29] px-5 text-xs font-extrabold text-white shadow-xs transition hover:bg-[#1b4d1d]"
                        >
                          <Download className="h-4 w-4" />
                          <span>Download File</span>
                        </a>
                      ) : (
                        <span className="text-xs font-bold text-slate-400">
                          Official Record
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>
          )}
        </div>
      </Container>
    </article>
  )
}