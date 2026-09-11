"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
  X,
  CalendarDays,
  Building2,
  FileText,
  Download,
  Share2,
  Sparkles,
  PlayCircle,
  Quote,
  Table as TableIcon,
  FileSpreadsheet,
  FileType,
  FileArchive,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Images,
  Camera,
  Maximize2,
  ZoomIn,
} from "lucide-react"
import type { ApiNewsArticleItem, ApiNewsContentBlock } from "@/lib/api/news"
import { getAbsoluteMediaUrl } from "@/lib/utils"

interface NewsPreviewProps {
  article: ApiNewsArticleItem | null
  onClose: () => void
}

interface GalleryImageItem {
  url: string
  caption?: string
  title?: string
  sourceType: "cover" | "block"
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

export function NewsPreview({ article, onClose }: NewsPreviewProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const modalBodyRef = useRef<HTMLDivElement>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // Reset active image when article changes
  useEffect(() => {
    setActiveImageIndex(0)
  }, [article?.id])

  // Lock body scroll and listen to Escape key
  useEffect(() => {
    if (!article) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const timer = setTimeout(() => {
      closeBtnRef.current?.focus()
    }, 50)

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener("keydown", handleKeyDown)
      clearTimeout(timer)
    }
  }, [article, onClose])

  if (!article) return null

  const defaultCover = article.image_url || "/images/home/hero-fishing-harbour.jpg"
  const blocks = article.content_blocks || []
  const hasBlocks = blocks.length > 0

  // 1. Gather all unique gallery images (Banner cover + all uploaded block images)
  const coverImage: GalleryImageItem = {
    url: defaultCover,
    caption: article.image_alt || article.title,
    title: "Article Main Cover",
    sourceType: "cover",
  }

  const blockImages: GalleryImageItem[] = []
  blocks.forEach((b) => {
    if (b.type === "image" || b.block_type === "image") {
      if (b.images && b.images.length > 0) {
        b.images.forEach((img) => {
          if (img.url) {
            blockImages.push({
              url: img.url,
              caption: img.caption || b.image_caption || `News Photo #${blockImages.length + 1}`,
              title: b.heading || `Story Image`,
              sourceType: "block",
            })
          }
        })
      } else if (b.image_url || b.media_url) {
        blockImages.push({
          url: (b.media_url || b.image_url)!,
          caption: b.image_caption || `News Photo #${blockImages.length + 1}`,
          title: b.heading || `Story Image`,
          sourceType: "block",
        })
      }
    }
  })

  const allImages: GalleryImageItem[] = [coverImage]
  blockImages.forEach((img) => {
    if (!allImages.some((existing) => existing.url === img.url)) {
      allImages.push(img)
    }
  })

  const currentImage = allImages[activeImageIndex] || allImages[0]

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  // Jump to specific image index in top gallery and smooth scroll to top
  const focusImageInGallery = (imageUrl: string) => {
    const foundIdx = allImages.findIndex((img) => img.url === imageUrl)
    if (foundIdx !== -1) {
      setActiveImageIndex(foundIdx)
      modalBodyRef.current?.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Block Renderers inside Modal
  const renderTextBlock = (block: ApiNewsContentBlock) => {
    const textContent = block.content || block.text || ""
    return (
      <div key={block.id} className="space-y-2">
        {block.heading && (
          <h4 className="text-base sm:text-lg font-extrabold text-slate-950 tracking-tight">
            {block.heading}
          </h4>
        )}
        {textContent && (
          <div
            className="prose prose-slate max-w-none prose-p:text-xs sm:prose-p:text-sm prose-p:leading-relaxed prose-p:text-slate-700 prose-p:text-justify prose-a:text-[#256B29] prose-a:font-bold text-justify"
            dangerouslySetInnerHTML={{ __html: textContent }}
          />
        )}
      </div>
    )
  }

  const renderHeadingBlock = (block: ApiNewsContentBlock) => {
    const headingText = block.content || block.heading || ""
    const level = block.level || block.heading_level || "h2"

    if (level === "h3") {
      return (
        <h4
          key={block.id}
          className="text-sm sm:text-base font-bold text-slate-950 tracking-tight mt-4 mb-2"
        >
          {headingText}
        </h4>
      )
    }

    return (
      <h3
        key={block.id}
        className="text-base sm:text-lg font-extrabold text-slate-950 tracking-tight mt-6 mb-2.5 border-b border-slate-100 pb-2"
      >
        {headingText}
      </h3>
    )
  }

  const renderImageBlock = (block: ApiNewsContentBlock) => {
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

    // 1. Multi-Image Grid Layouts (2-Col, 3-Col, Collage) - Uniform Frame Heights
    if (layout === "grid-2" || blockPhotos.length === 2) {
      return (
        <div key={block.id} className="my-6 space-y-2.5">
          {block.heading && (
            <h4 className="text-sm sm:text-base font-extrabold text-slate-950">{block.heading}</h4>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
            {blockPhotos.map((photo, pIdx) => {
              const fullUrl = getAbsoluteMediaUrl(photo.url)
              return (
                <figure
                  key={photo.id || pIdx}
                  onClick={() => focusImageInGallery(photo.url)}
                  className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm group cursor-pointer hover:border-emerald-500 transition-all"
                  title="Click to view large in gallery"
                >
                  <div className="relative h-60 sm:h-72 w-full flex items-center justify-center p-2.5 overflow-hidden bg-slate-950">
                    <img
                      src={fullUrl}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none"
                    />
                    <img
                      src={fullUrl}
                      alt={photo.alt || `Photo ${pIdx + 1}`}
                      className="relative z-10 max-h-full max-w-full h-auto w-auto object-contain mx-auto rounded-lg shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute top-2.5 right-2.5 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/70 text-white opacity-0 group-hover:opacity-100 transition shadow-md">
                      <ZoomIn className="h-3.5 w-3.5" />
                    </div>
                  </div>
                  {photo.caption && (
                    <figcaption className="mt-auto bg-white px-3.5 py-2.5 text-xs text-slate-700 font-semibold italic border-t border-slate-100 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#256B29] shrink-0" />
                      <span className="line-clamp-2">{photo.caption}</span>
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
        <div key={block.id} className="my-6 space-y-2.5">
          {block.heading && (
            <h4 className="text-sm sm:text-base font-extrabold text-slate-950">{block.heading}</h4>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-stretch">
            {blockPhotos.map((photo, pIdx) => {
              const fullUrl = getAbsoluteMediaUrl(photo.url)
              return (
                <figure
                  key={photo.id || pIdx}
                  onClick={() => focusImageInGallery(photo.url)}
                  className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm group cursor-pointer hover:border-emerald-500 transition-all"
                  title="Click to view large in gallery"
                >
                  <div className="relative h-48 sm:h-56 w-full flex items-center justify-center p-2 overflow-hidden bg-slate-950">
                    <img
                      src={fullUrl}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none"
                    />
                    <img
                      src={fullUrl}
                      alt={photo.alt || `Photo ${pIdx + 1}`}
                      className="relative z-10 max-h-full max-w-full h-auto w-auto object-contain mx-auto rounded-lg shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute top-2 right-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-slate-950/70 text-white opacity-0 group-hover:opacity-100 transition shadow-md">
                      <ZoomIn className="h-3 w-3" />
                    </div>
                  </div>
                  {photo.caption && (
                    <figcaption className="mt-auto bg-white px-3 py-2 text-[11px] text-slate-700 font-semibold italic border-t border-slate-100 line-clamp-2">
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
        <div key={block.id} className="my-6 space-y-2.5">
          {block.heading && (
            <h4 className="text-sm sm:text-base font-extrabold text-slate-950">{block.heading}</h4>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-stretch">
            {blockPhotos.map((photo, pIdx) => {
              const fullUrl = getAbsoluteMediaUrl(photo.url)
              return (
                <figure
                  key={photo.id || pIdx}
                  onClick={() => focusImageInGallery(photo.url)}
                  className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-slate-950 shadow-2xs group cursor-pointer hover:border-emerald-500 transition-all"
                  title="Click to view large in gallery"
                >
                  <div className="relative h-36 sm:h-44 w-full flex items-center justify-center p-1.5 overflow-hidden bg-slate-950">
                    <img
                      src={fullUrl}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover blur-xl opacity-25 scale-110 pointer-events-none"
                    />
                    <img
                      src={fullUrl}
                      alt={photo.alt || `Photo ${pIdx + 1}`}
                      className="relative z-10 max-h-full max-w-full h-auto w-auto object-contain mx-auto rounded-md shadow-sm transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div className="absolute top-1.5 right-1.5 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-slate-950/70 text-white opacity-0 group-hover:opacity-100 transition">
                      <ZoomIn className="h-2.5 w-2.5" />
                    </div>
                  </div>
                  {photo.caption && (
                    <figcaption className="mt-auto bg-white px-2 py-1 text-[10px] text-slate-700 font-semibold italic border-t border-slate-100 truncate">
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
          onClick={() => focusImageInGallery(singlePhoto.url)}
          className="float-left mr-5 mb-4 w-full sm:w-[380px] max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-md clear-left group cursor-pointer hover:border-emerald-500 transition-all"
          title="Click to view large in gallery"
        >
          <div className="relative h-60 sm:h-72 w-full flex items-center justify-center p-2.5 overflow-hidden bg-slate-950">
            <img
              src={singleFullUrl}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none"
            />
            <img
              src={singleFullUrl}
              alt={singlePhoto.alt}
              className="relative z-10 max-h-full max-w-full h-auto w-auto object-contain mx-auto rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute top-2.5 right-2.5 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/70 text-white opacity-0 group-hover:opacity-100 transition shadow-md">
              <ZoomIn className="h-3.5 w-3.5" />
            </div>
          </div>
          {singlePhoto.caption && (
            <figcaption className="bg-white px-3.5 py-2 text-xs text-slate-700 font-semibold italic border-t border-slate-100">
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
          onClick={() => focusImageInGallery(singlePhoto.url)}
          className="float-right ml-5 mb-4 w-full sm:w-[380px] max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-md clear-right group cursor-pointer hover:border-emerald-500 transition-all"
          title="Click to view large in gallery"
        >
          <div className="relative h-60 sm:h-72 w-full flex items-center justify-center p-2.5 overflow-hidden bg-slate-950">
            <img
              src={singleFullUrl}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none"
            />
            <img
              src={singleFullUrl}
              alt={singlePhoto.alt}
              className="relative z-10 max-h-full max-w-full h-auto w-auto object-contain mx-auto rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute top-2.5 right-2.5 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/70 text-white opacity-0 group-hover:opacity-100 transition shadow-md">
              <ZoomIn className="h-3.5 w-3.5" />
            </div>
          </div>
          {singlePhoto.caption && (
            <figcaption className="bg-white px-3.5 py-2 text-xs text-slate-700 font-semibold italic border-t border-slate-100">
              {singlePhoto.caption}
            </figcaption>
          )}
        </figure>
      )
    }

    if (layout === "centered") {
      return (
        <div key={block.id} className="my-6 flex flex-col items-center">
          <figure
            onClick={() => focusImageInGallery(singlePhoto.url)}
            className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-md group cursor-pointer hover:border-emerald-500 transition-all"
            title="Click to view large in gallery"
          >
            <div className="relative h-64 sm:h-80 md:h-[400px] w-full flex items-center justify-center p-3 overflow-hidden bg-slate-950">
              <img
                src={singleFullUrl}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none"
              />
              <img
                src={singleFullUrl}
                alt={singlePhoto.alt}
                className="relative z-10 max-h-full max-w-full h-auto w-auto object-contain mx-auto rounded-xl shadow-xl transition-transform duration-300 group-hover:scale-[1.01]"
              />
              <div className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/70 text-white opacity-0 group-hover:opacity-100 transition shadow-md">
                <ZoomIn className="h-4 w-4" />
              </div>
            </div>
            {singlePhoto.caption && (
              <figcaption className="bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 italic border-t border-slate-100 text-center flex items-center justify-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#256B29] shrink-0" />
                <span>{singlePhoto.caption}</span>
              </figcaption>
            )}
          </figure>
        </div>
      )
    }

    // Default: Full Width Large Photo Display (100% Uncropped & Uniform Height)
    return (
      <figure
        key={block.id}
        onClick={() => focusImageInGallery(singlePhoto.url)}
        className="my-6 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-md group cursor-pointer hover:border-emerald-500 transition-all"
        title="Click to view large in gallery"
      >
        <div className="relative h-64 sm:h-80 md:h-[400px] w-full flex items-center justify-center p-3 overflow-hidden bg-slate-950">
          <img
            src={singleFullUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none"
          />
          <img
            src={singleFullUrl}
            alt={singlePhoto.alt}
            className="relative z-10 max-h-full max-w-full h-auto w-auto object-contain mx-auto rounded-xl shadow-xl transition-transform duration-300 group-hover:scale-[1.01]"
          />
          <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 rounded-full bg-slate-950/80 backdrop-blur-xs border border-white/20 px-3 py-1 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition shadow-md">
            <ZoomIn className="h-3.5 w-3.5 text-emerald-400" />
            <span>View Full Size</span>
          </div>
        </div>
        {singlePhoto.caption && (
          <figcaption className="bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-slate-700 italic border-t border-slate-100 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#256B29] shrink-0" />
            <span>{singlePhoto.caption}</span>
          </figcaption>
        )}
      </figure>
    )
  }

  const renderVideoBlock = (block: ApiNewsContentBlock) => {
    const vidUrl = block.media_url || block.video_url || ""
    const embedUrl = getYouTubeEmbedUrl(vidUrl)
    const formattedVidUrl = (vidUrl && !vidUrl.startsWith("http://") && !rawVidUrlStartsWithProtocol(vidUrl) && !vidUrl.startsWith("/"))
      ? `/${vidUrl}`
      : vidUrl

    function rawVidUrlStartsWithProtocol(u: string) {
      return u.startsWith("http://") || u.startsWith("https://")
    }

    return (
      <div
        key={block.id}
        className="my-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-md"
      >
        {block.video_title && (
          <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center gap-2 text-white">
            <PlayCircle className="h-4 w-4 text-emerald-400 shrink-0" />
            <h5 className="text-xs sm:text-sm font-bold truncate">
              {block.video_title}
            </h5>
          </div>
        )}

        <div className="relative aspect-[16/9] w-full bg-black">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={block.video_title || "News Video Embed"}
              className="absolute inset-0 h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : vidUrl ? (
            <video
              src={formattedVidUrl}
              controls
              className="h-full w-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-slate-400">
              Video media unavailable
            </div>
          )}
        </div>

        {block.video_caption && (
          <div className="bg-slate-900 px-4 py-2 text-xs text-slate-300 italic border-t border-slate-800">
            {block.video_caption}
          </div>
        )}
      </div>
    )
  }

  const renderTableBlock = (block: ApiNewsContentBlock) => {
    const rawData = block.table_data || ""
    const parsed = parseMarkdownTable(rawData)

    return (
      <div
        key={block.id}
        className="my-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs"
      >
        {block.table_title && (
          <div className="bg-emerald-900/10 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
            <TableIcon className="h-4 w-4 text-[#256B29] shrink-0" />
            <h5 className="text-xs sm:text-sm font-extrabold text-slate-950">
              {block.table_title}
            </h5>
          </div>
        )}

        {parsed ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
                  {parsed.headers.map((h, i) => (
                    <th key={i} className="px-4 py-3 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {parsed.rows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className="px-4 py-2.5 text-slate-700 font-medium"
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
          <pre className="text-[11px] bg-slate-50 p-3 rounded-xl overflow-x-auto text-slate-700">
            {rawData}
          </pre>
        )}
      </div>
    )
  }

  const renderQuoteBlock = (block: ApiNewsContentBlock) => {
    const quoteText = block.content || block.text || ""
    return (
      <blockquote
        key={block.id}
        className="my-5 rounded-2xl border-l-4 border-[#256B29] bg-gradient-to-br from-emerald-50/60 to-white p-4 sm:p-5 shadow-2xs"
      >
        <div className="flex gap-3">
          <Quote className="h-5 w-5 text-[#256B29] shrink-0 opacity-80" />
          <div>
            <div
              className="text-xs sm:text-sm italic font-semibold text-slate-900 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: quoteText }}
            />
          </div>
        </div>
      </blockquote>
    )
  }

  const renderAttachmentBlock = (block: ApiNewsContentBlock) => {
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
        className="my-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5 shadow-2xs"
      >
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
          <FileText className="h-4 w-4 text-[#256B29]" />
          <span>{block.heading || "Story Documents & Attachments"}</span>
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
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs"
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
                    className="inline-flex min-h-8 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#256B29] px-4 text-xs font-bold text-white shadow-xs transition hover:bg-[#1b4d1d]"
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

  const currentFullUrl = getAbsoluteMediaUrl(currentImage.url)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="news-preview-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/85 p-3 sm:p-5 md:p-6 backdrop-blur-md overflow-y-auto"
    >
      {/* Large Spacious Centered Popup Window */}
      <div className="relative w-full max-w-5xl lg:max-w-6xl max-h-[94vh] flex flex-col rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Sleek Compact Dark Ocean Gradient Header */}
        <div className="flex shrink-0 flex-col gap-1.5 border-b border-slate-200 px-5 sm:px-6 py-3 sm:py-3.5 bg-[linear-gradient(135deg,#041c22_0%,#093835_55%,#0c4e48_100%)] text-white relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-400/10 blur-xl"
          />

          <div className="relative z-10 flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-emerald-300 shadow-xs">
                {article.category_label || "Ministry News"}
              </span>
              {article.is_featured && (
                <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/20 border border-amber-400/30 px-2 py-0.5 text-[11px] font-extrabold text-amber-300">
                  <Sparkles className="h-3 w-3" />
                  Featured Story
                </span>
              )}
              <div className="hidden sm:flex items-center gap-3 text-[11px] font-semibold text-emerald-200/90 ml-1">
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5 text-emerald-300" />
                  {article.published_date || "Recent"}
                </span>
                {article.publisher && (
                  <span className="flex items-center gap-1 text-slate-200">
                    <Building2 className="h-3.5 w-3.5 text-emerald-300" />
                    {article.publisher}
                  </span>
                )}
              </div>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-white hover:text-slate-900 transition-colors cursor-pointer"
              aria-label="Close news preview"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Article Title */}
          <div className="relative z-10">
            <h3
              id="news-preview-title"
              className="text-base sm:text-lg lg:text-xl font-extrabold !text-white leading-snug tracking-tight line-clamp-2"
            >
              {article.title}
            </h3>
            <div className="flex sm:hidden items-center gap-3 text-[11px] font-semibold text-emerald-200 mt-1">
              <span className="flex items-center gap-1">
                <CalendarDays className="h-3 w-3 text-emerald-300" />
                {article.published_date || "Recent"}
              </span>
              {article.publisher && (
                <span className="flex items-center gap-1 text-slate-200 truncate">
                  <Building2 className="h-3 w-3 text-emerald-300" />
                  {article.publisher}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Story Content Area */}
        <div ref={modalBodyRef} className="flex-1 overflow-y-auto px-5 sm:px-6 lg:px-8 py-4 sm:py-5 space-y-5">
          
          {/* ==========================================================
              Interactive Story Photo Gallery Carousel
              (100% Uncropped & Crystal Clear Large Photo Viewer)
              ========================================================== */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-md">
            {allImages.length > 1 && (
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2 font-bold">
                  <Camera className="h-4 w-4 text-emerald-400" />
                  <span>Story Photo Gallery ({allImages.length} Photos)</span>
                </div>
                <span className="font-mono text-[11px] bg-slate-800 px-2 py-0.5 rounded-full text-emerald-300 font-bold">
                  {activeImageIndex + 1} / {allImages.length}
                </span>
              </div>
            )}

            {/* Main Full Uncropped Photo Display Screen */}
            <div className="relative w-full min-h-[320px] max-h-[560px] overflow-hidden bg-slate-950 flex items-center justify-center p-2.5 sm:p-4">
              {/* Ambient Soft Blurred Backdrop */}
              <img
                src={currentFullUrl}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-30 scale-110 pointer-events-none"
              />

              {/* 100% Complete & Uncropped Foreground Image */}
              <img
                src={currentFullUrl}
                alt={currentImage.caption || currentImage.title || article.title}
                className="relative z-10 max-h-[520px] w-auto max-w-full object-contain mx-auto rounded-xl shadow-2xl transition-all duration-300"
              />

              {/* Prev / Next Slide Controls */}
              {allImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/70 text-white backdrop-blur-md hover:bg-[#256B29] transition shadow-lg z-20 cursor-pointer"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/70 text-white backdrop-blur-md hover:bg-[#256B29] transition shadow-lg z-20 cursor-pointer"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Caption Overlay */}
              {currentImage.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent p-3.5 sm:p-4 text-white z-20">
                  <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed text-center line-clamp-2">
                    {currentImage.caption}
                  </p>
                </div>
              )}
            </div>

            {/* Thumbnail Navigation Strip */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2.5 p-3 bg-slate-900 border-t border-slate-800 overflow-x-auto">
                {allImages.map((img, idx) => {
                  const isActive = idx === activeImageIndex
                  const thumbUrl = getAbsoluteMediaUrl(img.url)
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-[16/9] w-20 sm:w-24 shrink-0 rounded-xl overflow-hidden cursor-pointer transition border-2 ${
                        isActive
                          ? "border-emerald-400 ring-2 ring-emerald-400/50 scale-105 shadow-md"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                      aria-label={`View photo ${idx + 1}`}
                    >
                      <img
                        src={thumbUrl}
                        alt={`Thumbnail ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Decoupled Short Summary Excerpt */}
          {article.summary && (
            <div className="rounded-2xl bg-emerald-50/75 border border-emerald-200/90 p-4 sm:p-4.5 shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#256B29] mb-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Executive Summary</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed italic text-justify">
                &ldquo;{article.summary}&rdquo;
              </p>
            </div>
          )}

          {/* Dynamic Story Blocks */}
          {hasBlocks && (
            <div className="space-y-4 pt-1">
              {blocks.map((block) => {
                const bType = block.type || block.block_type
                switch (bType) {
                  case "text":
                    return renderTextBlock(block)
                  case "heading":
                    return renderHeadingBlock(block)
                  case "image":
                    return renderImageBlock(block)
                  case "video":
                    return renderVideoBlock(block)
                  case "table":
                    return renderTableBlock(block)
                  case "quote":
                    return renderQuoteBlock(block)
                  case "attachment":
                    return renderAttachmentBlock(block)
                  default:
                    return null
                }
              })}
            </div>
          )}

          {/* Fallback Legacy Body Text */}
          {!hasBlocks && article.content && (
            <div
              className="prose prose-slate max-w-none prose-p:text-xs sm:prose-p:text-sm prose-p:leading-relaxed prose-p:text-slate-700 prose-p:text-justify prose-headings:font-extrabold prose-headings:text-slate-900 prose-a:text-[#256B29] prose-a:font-bold text-justify pt-2"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          )}

          {/* Fallback Attachments List */}
          {(!hasBlocks || !blocks.some((b) => (b.type || b.block_type) === "attachment")) &&
            article.attachments &&
            article.attachments.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 mt-4">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-[#256B29]" />
                  <span>Official Press Attachments & Disclosures</span>
                </h4>
                <div className="grid gap-2.5">
                  {article.attachments.map((attachment) => {
                    const rawAttUrl = attachment.file_url || attachment.file || ""
                    let attachmentUrl = rawAttUrl
                    if (rawAttUrl && !rawAttUrl.startsWith("http://") && !rawAttUrl.startsWith("https://") && !rawAttUrl.startsWith("/")) {
                      attachmentUrl = `/${rawAttUrl}`
                    }
                    attachmentUrl = getAbsoluteMediaUrl(attachmentUrl)

                    return (
                      <div
                        key={attachment.id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#256B29]">
                            {getFileFormatIcon(attachment.file_type)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">
                              {attachment.title}
                            </p>
                            <p className="text-[11px] text-slate-500 font-medium">
                              {attachment.file_type || "Document"}
                            </p>
                          </div>
                        </div>

                        {attachmentUrl && attachmentUrl !== "#" ? (
                          <a
                            href={attachmentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="inline-flex min-h-8 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#256B29] px-4 text-xs font-bold text-white transition hover:bg-[#1b4d1d]"
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
            )}
        </div>

        {/* Compact Footer */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 px-5 sm:px-6 py-2.5 sm:py-3 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[36px] items-center justify-center rounded-xl bg-[#256B29] px-6 text-xs font-extrabold text-white hover:bg-[#1b4d1d] transition shadow-xs cursor-pointer ml-auto"
          >
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  )
}
