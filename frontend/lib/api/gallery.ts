export interface ApiGalleryHeader {
  badge_text?: string
  title?: string
  highlighted_title?: string
  description?: string
  featured_badge?: string
  catalogue_badge?: string
  library_title?: string
}

export interface ApiGalleryPhoto {
  id: number | string
  order: number
  src: string
  alt: string
  caption: string
}

export interface ApiGalleryAlbum {
  id: number | string
  slug: string
  order: number
  category: string
  category_label: string
  is_featured: boolean
  title: string
  description: string
  location: string
  event_date: string
  display_date: string
  cover_image_url: string
  cover_image_alt: string
  image_count: number
  images: ApiGalleryPhoto[]
  created_at?: string
  updated_at?: string
}

export interface ApiGalleryPageData {
  language: string
  header: ApiGalleryHeader
  albums: ApiGalleryAlbum[]
}

export async function fetchGalleryPageData(
  lang: string = "en"
): Promise<ApiGalleryPageData | null> {
  const rawUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
  const baseUrl = rawUrl.replace(/\/api\/v1\/?$/, "").replace(/\/+$/, "")
  const endpoint = `${baseUrl}/api/v1/gallery/?lang=${encodeURIComponent(lang)}&_t=${Date.now()}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Error fetching Gallery page data:", error)
    return null
  }
}

export async function fetchGalleryAlbumBySlug(
  slug: string,
  lang: string = "en"
): Promise<ApiGalleryAlbum | null> {
  const rawUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
  const baseUrl = rawUrl.replace(/\/api\/v1\/?$/, "").replace(/\/+$/, "")
  const endpoint = `${baseUrl}/api/v1/gallery/${encodeURIComponent(slug)}/?lang=${encodeURIComponent(lang)}&_t=${Date.now()}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error(`Error fetching Gallery Album by slug '${slug}':`, error)
    return null
  }
}
