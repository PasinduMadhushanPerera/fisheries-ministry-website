export interface ApiNoticeHeader {
  badge_text?: string
  title?: string
  highlighted_title?: string
  description?: string
  featured_badge?: string
  catalogue_badge?: string
  library_title?: string
}

export interface ApiNoticeItem {
  id: number | string
  slug: string
  order: number
  notice_number: string
  category: string
  category_label: string
  priority: "normal" | "high" | "urgent"
  is_urgent: boolean
  is_featured: boolean
  title: string
  department: string
  summary: string
  content: string
  published_date: string
  expiry_date: string
  attachment_title?: string
  download_url?: string
  file_type?: "PDF" | "DOCX" | "XLSX" | "ZIP"
  file_size?: string
  created_at?: string
  updated_at?: string
}

export interface ApiNoticesPageData {
  language: string
  header: ApiNoticeHeader
  notices: ApiNoticeItem[]
}

export async function fetchNoticesPageData(
  lang: string = "en"
): Promise<ApiNoticesPageData | null> {
  const rawUrl = process.env.NEXT_PUBLIC_API_URL || "https://pasiperera.pythonanywhere.com"
  const baseUrl = rawUrl.replace(/\/api\/v1\/?$/, "").replace(/\/+$/, "")
  const endpoint = `${baseUrl}/api/v1/notices/?lang=${encodeURIComponent(lang)}&_t=${Date.now()}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Error fetching Notices page data:", error)
    return null
  }
}

export async function fetchNoticeBySlug(
  slug: string,
  lang: string = "en"
): Promise<ApiNoticeItem | null> {
  const rawUrl = process.env.NEXT_PUBLIC_API_URL || "https://pasiperera.pythonanywhere.com"
  const baseUrl = rawUrl.replace(/\/api\/v1\/?$/, "").replace(/\/+$/, "")
  const endpoint = `${baseUrl}/api/v1/notices/${encodeURIComponent(slug)}/?lang=${encodeURIComponent(lang)}&_t=${Date.now()}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error(`Error fetching Notice by slug '${slug}':`, error)
    return null
  }
}
