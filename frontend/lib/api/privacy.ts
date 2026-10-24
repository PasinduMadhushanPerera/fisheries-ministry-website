import { getApiBaseUrl } from "../utils"

export interface ApiPrivacyPageSettings {
  badge_text: string
  hero_title: string
  hero_highlight: string
  hero_description: string
  pill_text1: string
  pill_text2: string
  card_eyebrow: string
  card_title: string
  card_description: string
  callout_title: string
  callout_text: string
  desk_badge: string
  desk_title: string
  desk_description: string
  desk_office_name: string
  desk_email: string
  desk_phone: string
  contact_btn_text: string
  last_updated_date: string
}

export interface ApiPrivacySection {
  id: number
  section_key: string
  order: number
  nav_label: string
  title: string
  content: string
  items?: Array<string | { title: string; description: string }>
}

export interface ApiPrivacyData {
  settings: ApiPrivacyPageSettings
  sections: ApiPrivacySection[]
}

export async function fetchPrivacyPageData(lang: string = "en"): Promise<ApiPrivacyData | null> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/v1/privacy/?lang=${encodeURIComponent(lang)}&_t=${Date.now()}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })

    if (!res.ok) {
      console.error("Failed to fetch privacy page data:", res.statusText)
      return null
    }

    const data: ApiPrivacyData = await res.json()
    return data
  } catch (error) {
    console.error("Error fetching privacy page data:", error)
    return null
  }
}
