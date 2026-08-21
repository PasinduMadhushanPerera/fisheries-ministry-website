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
  ZoomIn,
} from "lucide-react"

import { Container } from "@/components/ui/container"
import type { ApiNewsArticleItem, ApiNewsContentBlock } from "@/lib/api/news"
import { getAbsoluteMediaUrl } from "@/lib/utils"

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
  const imageUrl = getAbsoluteMediaUrl(article.image_url || "/images/home/hero-fishing-harbour.jpg")
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
            className="prose prose-slate max-w-none prose-p:text-sm sm:prose-p:text-base prose-p:leading-relaxed prose-p:text-slate-700 prose-p:text-justify prose-headings:font-extrabold prose-headings:text-slate-950 prose-a:text-[#256B29] prose-a:font-bold text-justify"
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
        <h4
          key={block.id}
          className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight mt-6 mb-3"
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
    const layout = block.image_layout || "full"

    // Gather photos for this block (supports multi-image grids)
    const blockPhotos = (block.images && block.images.length > 0)
      ? block.images
      : [
          {
            id: 1,
            url: block.media_url || block.image_url || "/images/home/hero-fishing-harbour.jpg",
            caption: block.image_caption || "",
            alt: block.image_alt || block.image_caption || "News Story Image",
          },
        ]

    // 1. Multi-Image Grid Layouts (2-Col, 3-Col, Collage) - Generous Large Heights
    if (layout === "grid-2" || blockPhotos.length === 2) {
      return (
        <div key={block.id} className="my-10 space-y-3">
          {block.heading && (
            <h3 className="text-lg font-extrabold text-slate-950">{block.heading}</h3>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {blockPhotos.map((photo, pIdx) => {
              const fullUrl = getAbsoluteMediaUrl(photo.url)
              return (
                <figure key={photo.id || pIdx} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-md group">
                  <div className="relative min-h-[320px] max-h-[480px] w-full flex items-center justify-center p-2.5 overflow-hidden">
                    <img
                      src={fullUrl}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none"
                    />
                    <img
                      src={fullUrl}
                      alt={photo.alt || `Photo ${pIdx + 1}`}
                      className="relative z-10 max-h-[460px] w-auto max-w-full object-contain mx-auto rounded-xl shadow-xl transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  {photo.caption && (
                    <figcaption className="bg-white p-3.5 text-xs font-semibold text-slate-700 italic border-t border-slate-100 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#256B29] shrink-0" />
                      <span>{photo.caption}</span>
                    </figcaption>
                  )}
                </figure>
              )
            })}
          </div>
        </div>
      )
    }

    if (layout === "grid-3" || blockPhotos.length === 3) {
      return (
        <div key={block.id} className="my-10 space-y-3">
          {block.heading && (
            <h3 className="text-lg font-extrabold text-slate-950">{block.heading}</h3>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {blockPhotos.map((photo, pIdx) => {
              const fullUrl = getAbsoluteMediaUrl(photo.url)
              return (
                <figure key={photo.id || pIdx} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-md group">
                  <div className="relative min-h-[260px] max-h-[400px] w-full flex items-center justify-center p-2 overflow-hidden">
                    <img
                      src={fullUrl}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none"
                    />
                    <img
                      src={fullUrl}
                      alt={photo.alt || `Photo ${pIdx + 1}`}
                      className="relative z-10 max-h-[380px] w-auto max-w-full object-contain mx-auto rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  {photo.caption && (
                    <figcaption className="bg-white p-3 text-xs font-semibold text-slate-700 italic border-t border-slate-100 line-clamp-2">
                      {photo.caption}
                    </figcaption>
                  )}
                </figure>
              )
            })}
          </div>
        </div>
      )
    }

    if (layout === "collage" || blockPhotos.length >= 4) {
      return (
        <div key={block.id} className="my-10 space-y-3">
          {block.heading && (
            <h3 className="text-lg font-extrabold text-slate-950">{block.heading}</h3>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {blockPhotos.map((photo, pIdx) => {
              const fullUrl = getAbsoluteMediaUrl(photo.url)
              return (
                <figure key={photo.id || pIdx} className="overflow-hidden rounded-xl border border-slate-200 bg-slate-950 shadow-sm group">
                  <div className="relative aspect-square w-full flex items-center justify-center p-1.5 overflow-hidden">
                    <img
                      src={fullUrl}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover blur-xl opacity-25 scale-110 pointer-events-none"
                    />
                    <img
                      src={fullUrl}
                      alt={photo.alt || `Photo ${pIdx + 1}`}
                      className="relative z-10 max-h-full w-auto max-w-full object-contain mx-auto rounded-md shadow-md transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  {photo.caption && (
                    <figcaption className="bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 italic border-t border-slate-100 truncate">
                      {photo.caption}
                    </figcaption>
                  )}
                </figure>
              )
            })}
          </div>
        </div>
      )
    }

    // 2. Single Image Layouts: Left Float Wrap, Right Float Wrap, Centered, Full Width
    const singlePhoto = blockPhotos[0] || {
      url: block.media_url || block.image_url || "/images/home/hero-fishing-harbour.jpg",
      caption: block.image_caption || "",
      alt: block.image_alt || "News Story Image",
    }
    const singleFullUrl = getAbsoluteMediaUrl(singlePhoto.url)

    if (layout === "left") {
      return (
        <figure
          key={block.id}
          className="float-left mr-6 mb-6 w-full sm:w-[460px] max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-md clear-left group"
        >
          <div className="relative min-h-[300px] max-h-[480px] w-full flex items-center justify-center p-2.5 overflow-hidden">
            <img
              src={singleFullUrl}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none"
            />
            <img
              src={singleFullUrl}
              alt={singlePhoto.alt}
              className="relative z-10 max-h-[460px] w-auto max-w-full object-contain mx-auto rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.01]"
            />
          </div>
          {singlePhoto.caption && (
            <figcaption className="bg-white p-3.5 text-xs text-slate-700 font-semibold italic border-t border-slate-100">
              {singlePhoto.caption}
            </figcaption>
          )}
        </figure>
      )
    }

    if (layout === "right") {
      return (
        <figure
          key={block.id}
          className="float-right ml-6 mb-6 w-full sm:w-[460px] max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-md clear-right group"
        >
          <div className="relative min-h-[300px] max-h-[480px] w-full flex items-center justify-center p-2.5 overflow-hidden">
            <img
              src={singleFullUrl}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none"
            />
            <img
              src={singleFullUrl}
              alt={singlePhoto.alt}
              className="relative z-10 max-h-[460px] w-auto max-w-full object-contain mx-auto rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.01]"
            />
          </div>
          {singlePhoto.caption && (
            <figcaption className="bg-white p-3.5 text-xs text-slate-700 font-semibold italic border-t border-slate-100">
              {singlePhoto.caption}
            </figcaption>
          )}
        </figure>
      )
    }

    if (layout === "centered") {
      return (
        <div key={block.id} className="my-10 flex flex-col items-center">
          <figure className="w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-xl group">
            <div className="relative min-h-[380px] max-h-[640px] w-full flex items-center justify-center p-3 sm:p-4 overflow-hidden">
              <img
                src={singleFullUrl}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none"
              />
              <img
                src={singleFullUrl}
                alt={singlePhoto.alt}
                className="relative z-10 max-h-[620px] w-auto max-w-full object-contain mx-auto rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]"
              />
            </div>
            {singlePhoto.caption && (
              <figcaption className="p-4 text-xs sm:text-sm font-semibold text-slate-700 border-t border-slate-200 bg-white flex items-center justify-center text-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#256B29] shrink-0" />
                <span>{singlePhoto.caption}</span>
              </figcaption>
            )}
          </figure>
        </div>
      )
    }

    // Default: Full Width Large Photo Display (100% Uncropped & Prominent)
    return (
      <figure
        key={block.id}
        className="my-10 w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-lg group"
      >
        <div className="relative min-h-[400px] max-h-[680px] w-full flex items-center justify-center p-3 sm:p-4 overflow-hidden">
          <img
            src={singleFullUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none"
          />
          <img
            src={singleFullUrl}
            alt={singlePhoto.alt}
            className="relative z-10 max-h-[650px] w-auto max-w-full object-contain mx-auto rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]"
          />
        </div>
        {singlePhoto.caption && (
          <figcaption className="p-4 sm:p-4.5 text-xs sm:text-sm font-semibold text-slate-700 italic border-t border-slate-100 bg-white flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#256B29] shrink-0" />
            <span>{singlePhoto.caption}</span>
          </figcaption>
        )}
      </figure>
    )
  }

  const renderVideo = (block: ApiNewsContentBlock) => {
    const vUrl = block.media_url || block.video_url || ""
    const ytEmbed = vUrl ? getYouTubeEmbedUrl(vUrl) : null
    let formattedVUrl = vUrl
    if (vUrl && !vUrl.startsWith("http://") && !vUrl.startsWith("https://") && !vUrl.startsWith("/")) {
      formattedVUrl = `/${vUrl}`
    }
    formattedVUrl = getAbsoluteMediaUrl(formattedVUrl)

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
            <source src={formattedVUrl} type="video/mp4" />
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
                            : "text-slate-700 font-medium"
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
          <pre className="text-xs bg-slate-50 p-4 rounded-xl overflow-x-auto text-slate-700 font-mono">
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
        className="my-8 rounded-2xl border-l-4 border-[#256B29] bg-gradient-to-br from-emerald-50/70 via-white to-white p-5 sm:p-6 shadow-2xs"
      >
        <div className="flex gap-4">
          <Quote className="h-6 w-6 text-[#256B29] shrink-0 opacity-80" />
          <div>
            <div
              className="text-sm sm:text-base italic font-semibold text-slate-900 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: quoteText }}
            />
          </div>
        </div>
      </blockquote>
    )
  }

  const renderAttachment = (block: ApiNewsContentBlock) => {
    const filesList = (block.attachments && block.attachments.length > 0)
      ? block.attachments
      : [
          {
            id: 1,
            title: block.file_title || block.heading || "Downloadable Document",
            file_url: block.file_url || block.media_url || "",
            file: block.file_url || block.media_url || "",
            file_type: block.file_type || "PDF",
            file_size: block.file_size || "",
          },
        ]

    return (
      <div
        key={block.id}
        className="my-8 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 shadow-2xs"
      >
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#256B29]" />
          <span>{block.heading || "Official Attachments & Press Documents"}</span>
        </h4>
        <div className="grid gap-3">
          {filesList.map((f, fIdx) => {
            const rawUrl = f.file_url || f.file || ""
            let fUrl = rawUrl
            if (rawUrl && !rawUrl.startsWith("http://") && !rawUrl.startsWith("https://") && !rawUrl.startsWith("/")) {
              fUrl = `/${rawUrl}`
            }
            fUrl = getAbsoluteMediaUrl(fUrl)

            return (
              <div
                key={f.id || fIdx}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#256B29]">
                    {getFileFormatIcon(f.file_type)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {f.title}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {f.file_type || "Document"} {f.file_size ? `• ${f.file_size}` : ""}
                    </p>
                  </div>
                </div>

                {fUrl && fUrl !== "#" ? (
                  <a
                    href={fUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="inline-flex min-h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#256B29] px-4 text-xs font-bold text-white shadow-xs transition hover:bg-[#1b4d1d]"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download</span>
                  </a>
                ) : (
                  <span className="text-[11px] font-bold text-slate-400">
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
    <article className="py-10 sm:py-16 bg-white min-h-screen">
      <Container>
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/media-centre/news"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-[#256B29] hover:text-[#1b4d1d] transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to News &amp; Updates</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center rounded-full bg-emerald-100 border border-emerald-300 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#256B29]">
              {article.category_label || "Ministry News"}
            </span>

            {article.is_featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-extrabold text-amber-800">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                Featured Story
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 border-t border-slate-100 text-xs font-bold text-slate-600">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-[#256B29]" />
              <span>Published: {article.published_date || "Recent"}</span>
            </div>

            {article.publisher && (
              <div className="flex items-center gap-1.5 text-slate-700">
                <Building2 className="h-4 w-4 text-[#256B29]" />
                <span>{article.publisher}</span>
              </div>
            )}
          </div>
        </header>

        {/* Featured Main Image Banner (100% Uncropped & Crystal Clear) */}
        <div className="max-w-4xl mb-10 overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-md">
          <div className="relative min-h-[380px] max-h-[640px] w-full flex items-center justify-center p-3 sm:p-4 overflow-hidden">
            <img
              src={imageUrl}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none"
            />
            <img
              src={imageUrl}
              alt={article.image_alt || article.title}
              className="relative z-10 max-h-[610px] w-auto max-w-full object-contain mx-auto rounded-2xl shadow-2xl"
            />
          </div>
          {article.image_alt && (
            <div className="bg-white px-5 py-3 text-xs text-slate-600 italic border-t border-slate-100 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#256B29] shrink-0" />
              <span>{article.image_alt}</span>
            </div>
          )}
        </div>

        {/* Short Summary Excerpt */}
        {article.summary && (
          <div className="max-w-4xl mb-10 rounded-3xl bg-emerald-50/80 border border-emerald-200 p-6 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#256B29] mb-2">
              <Sparkles className="h-4 w-4" />
              <span>Executive Summary</span>
            </div>
            <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed italic text-justify">
              &ldquo;{article.summary}&rdquo;
            </p>
          </div>
        )}

        {/* Article Body Content */}
        <div className="max-w-4xl">
          {hasBlocks ? (
            <div className="space-y-6">
              {blocks.map((block) => {
                const bType = block.type || block.block_type
                switch (bType) {
                  case "text":
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
                    return renderAttachment(block)
                  default:
                    return null
                }
              })}
            </div>
          ) : (
            article.content && (
              <div
                className="prose prose-slate max-w-none prose-p:text-base prose-p:leading-relaxed prose-p:text-slate-700 prose-p:text-justify prose-headings:font-extrabold prose-headings:text-slate-950 prose-a:text-[#256B29] prose-a:font-bold text-justify"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            )
          )}
        </div>
      </Container>
    </article>
  )
}