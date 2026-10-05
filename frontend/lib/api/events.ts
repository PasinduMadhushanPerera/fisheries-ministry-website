export interface ApiEventHeader {
  badge_text?: string
  title?: string
  highlighted_title?: string
  description?: string
  catalogue_badge?: string
  library_title?: string
}

export interface ApiAgendaItem {
  time: string
  topic: string
}

export interface ApiEventItem {
  id: number | string
  slug: string
  order: number
  reference_number: string
  category: string
  category_label: string
  status: "Upcoming" | "Ongoing" | "Completed"
  is_featured: boolean
  title: string
  summary: string
  description: string
  description_paragraphs?: string[]
  venue: string
  location: string
  organizer: string
  date: string
  display_date: string
  time: string
  contact_email: string
  contact_phone: string
  agenda: ApiAgendaItem[]
  image_url: string
  image_alt: string
  created_at?: string
  updated_at?: string
}

export interface ApiEventsPageData {
  language: string
  header: ApiEventHeader
  events: ApiEventItem[]
}

import { getApiBaseUrl } from "../utils"

export async function fetchEventsPageData(
  lang: string = "en"
): Promise<ApiEventsPageData | null> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/v1/events/?lang=${encodeURIComponent(lang)}&_t=${Date.now()}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Error fetching Events page data:", error)
    return null
  }
}

export async function fetchEventBySlug(
  slug: string,
  lang: string = "en"
): Promise<ApiEventItem | null> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/v1/events/${encodeURIComponent(slug)}/?lang=${encodeURIComponent(lang)}&_t=${Date.now()}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error(`Error fetching Event by slug '${slug}':`, error)
    return null
  }
}
