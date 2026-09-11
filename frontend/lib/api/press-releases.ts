export interface ApiPressReleaseHeader {
  badge_text?: string
  title?: string
  highlighted_title?: string
  description?: string
  featured_badge?: string
  catalogue_badge?: string
  library_title?: string
}

export interface ApiPressReleaseItem {
  id: number | string
  slug: string
  order: number
  release_number: string
  category: string
  category_label: string
  location: string
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
  file_type?: "PDF" | "DOCX" | "XLSX" | "ZIP"
  file_size?: string
  created_at?: string
  updated_at?: string
}

export interface ApiPressReleasesPageData {
  language: string
  header: ApiPressReleaseHeader
  press_releases: ApiPressReleaseItem[]
}

export async function fetchPressReleasesPageData(
  lang: string = "en"
): Promise<ApiPressReleasesPageData | null> {
  const rawUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
  const baseUrl = rawUrl.replace(/\/api\/v1\/?$/, "").replace(/\/+$/, "")
  const endpoint = `${baseUrl}/api/v1/press-releases/?lang=${encodeURIComponent(lang)}&_t=${Date.now()}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Error fetching Press Releases page data:", error)
    return null
  }
}

export async function fetchPressReleaseBySlug(
  slug: string,
  lang: string = "en"
): Promise<ApiPressReleaseItem | null> {
  const rawUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
  const baseUrl = rawUrl.replace(/\/api\/v1\/?$/, "").replace(/\/+$/, "")
  const endpoint = `${baseUrl}/api/v1/press-releases/${encodeURIComponent(slug)}/?lang=${encodeURIComponent(lang)}&_t=${Date.now()}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error(`Error fetching Press Release by slug '${slug}':`, error)
    return null
  }
}
