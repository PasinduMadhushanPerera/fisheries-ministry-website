export interface ApiNewsHeader {
  badge_text?: string
  title?: string
  highlighted_title?: string
  description?: string
  featured_badge?: string
  catalogue_badge?: string
  library_title?: string
}

export interface ApiNewsFileItem {
  id?: number | string
  title: string
  download_url?: string
  file_url?: string
  file?: string
  file_type?: string
  file_size?: string
}

export interface ApiNewsImageItem {
  id?: number | string
  url: string
  caption?: string
  alt?: string
}

export interface ApiNewsContentBlock {
  id: number | string
  type?: "text" | "heading" | "image" | "video" | "table" | "quote" | "attachment" | "paragraph" | "file" | string
  block_type?: "text" | "heading" | "image" | "video" | "table" | "quote" | "attachment" | "paragraph" | "file" | string
  order?: number
  display_order?: number
  level?: "h2" | "h3" | "h4" | string
  heading_level?: "h2" | "h3" | "h4" | string
  heading?: string
  content?: string
  text?: string
  // Media & Image
  media_url?: string
  image_url?: string
  image_caption?: string
  image_alt?: string
  image_layout?: "full" | "centered" | "left" | "right" | "grid-2" | "grid-3" | "collage" | "slider" | string
  image_size?: "full" | "large" | "medium" | "small" | string
  image_aspect_ratio?: "16/9" | "4/3" | "1/1" | "21/9" | "auto" | string
  images?: ApiNewsImageItem[]
  // Video
  video_url?: string
  video_title?: string
  video_caption?: string
  // Table
  table_title?: string
  table_data?: string
  // Quote
  quote_author?: string
  quote_role?: string
  callout_type?: "quote" | "info" | "success" | "warning"
  // File / Attachment (Single & Multiple files support)
  file_title?: string
  download_url?: string
  file_url?: string
  file_type?: string
  file_size?: string
  files?: ApiNewsFileItem[]
  attachments?: ApiNewsFileItem[]
  attachments_data?: ApiNewsFileItem[]
}

export interface ApiNewsArticleItem {
  id: number | string
  slug: string
  order: number
  category: string
  category_label: string
  is_featured: boolean
  title: string
  publisher: string
  summary: string
  content: string
  published_date: string
  image_url: string
  image_alt: string
  attachment_title?: string
  download_url?: string
  file_type?: "PDF" | "DOCX" | "XLSX" | "ZIP" | "CSV" | "PPTX"
  file_size?: string
  files?: ApiNewsFileItem[]
  attachments?: ApiNewsFileItem[]
  attachments_data?: ApiNewsFileItem[]
  content_blocks?: ApiNewsContentBlock[]
  created_at?: string
  updated_at?: string
}

export interface ApiNewsPageData {
  language: string
  header: ApiNewsHeader
  articles: ApiNewsArticleItem[]
}

export async function fetchNewsPageData(
  lang: string = "en"
): Promise<ApiNewsPageData | null> {
  const rawUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://127.0.0.1:8000"
  const baseUrl = rawUrl.replace(/\/api\/v1\/?$/, "").replace(/\/+$/, "")
  const endpoint = `${baseUrl}/api/v1/news/?lang=${encodeURIComponent(
    lang
  )}&_t=${Date.now()}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Error fetching News page data:", error)
    return null
  }
}

export async function fetchNewsArticleBySlug(
  slug: string,
  lang: string = "en"
): Promise<ApiNewsArticleItem | null> {
  const rawUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://127.0.0.1:8000"
  const baseUrl = rawUrl.replace(/\/api\/v1\/?$/, "").replace(/\/+$/, "")
  const endpoint = `${baseUrl}/api/v1/news/${encodeURIComponent(
    slug
  )}/?lang=${encodeURIComponent(lang)}&_t=${Date.now()}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error(`Error fetching news article slug ${slug}:`, error)
    return null
  }
}
