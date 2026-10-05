export type DynamicPageData = {
  id: number
  title: string
  slug: string
  hero_title?: string
  hero_subtitle?: string
  badge_text?: string
  banner_image?: string
  content: string
  show_sidebar?: boolean
  sidebar_title?: string
  sidebar_content?: string
  meta_title?: string
  meta_description?: string
  updated_at?: string
}

import { getApiBaseUrl } from "../utils"

export async function fetchDynamicPageBySlug(slug: string): Promise<DynamicPageData | null> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/v1/pages/${slug}/`

  try {
    const res = await fetch(endpoint, {
      next: { revalidate: 15 },
    })
    if (!res.ok) {
      if (res.status !== 404) {
        console.error(`Fetch dynamic page '${slug}' returned status:`, res.status)
      }
      return null
    }
    return await res.json()
  } catch (error) {
    console.error(`Error fetching dynamic page '${slug}':`, error)
    return null
  }
}
