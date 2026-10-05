export interface ApiVideoHeader {
  badge_text?: string
  title?: string
  highlighted_title?: string
  description?: string
  featured_badge?: string
  catalogue_badge?: string
  library_title?: string
}

export interface ApiVideoItem {
  id: number | string
  slug: string
  order: number
  category: string
  category_label: string
  is_featured: boolean
  title: string
  description: string
  location: string
  duration: string
  published_date: string
  display_date: string
  video_file_url?: string | null
  is_direct_upload?: boolean
  video_url: string
  youtube_id: string
  thumbnail_url: string
  thumbnail_alt: string
  created_at?: string
  updated_at?: string
}

export interface ApiVideosPageData {
  language: string
  header: ApiVideoHeader
  videos: ApiVideoItem[]
}

import { getApiBaseUrl } from "../utils"

export async function fetchVideosPageData(
  lang: string = "en"
): Promise<ApiVideosPageData | null> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/v1/videos/?lang=${encodeURIComponent(lang)}&_t=${Date.now()}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Error fetching Videos page data:", error)
    return null
  }
}

export async function fetchVideoBySlug(
  slug: string,
  lang: string = "en"
): Promise<ApiVideoItem | null> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/v1/videos/${encodeURIComponent(slug)}/?lang=${encodeURIComponent(lang)}&_t=${Date.now()}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error(`Error fetching Video by slug '${slug}':`, error)
    return null
  }
}
