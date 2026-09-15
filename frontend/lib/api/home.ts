export type ApiHeroSlide = {
  id: number
  order: number
  eyebrow: string
  title: string
  highlighted_title: string
  description: string
  image_url: string
  image_alt: string
}

export type ApiQuickAccessItem = {
  id: number
  title: string
  url: string
  icon_name: string
  aria_label: string
  order: number
}

export type ApiNewsCard = {
  id: number | string
  slug?: string
  title: string
  category: string
  category_label?: string
  published_date: string
  summary: string
  content: string
  image_url: string
  image_alt: string
  attachment_title?: string
  download_url?: string
  file_type?: string
  file_size?: string
  is_featured: boolean
  order: number
}

export type ApiNewsSection = {
  eyebrow: string
  title: string
  description: string
  button_text: string
  button_url: string
  max_articles: number
  cards: ApiNewsCard[]
}

export type ApiServiceCard = {
  id: number
  title: string
  category: string
  description: string
  button_text: string
  url: string
  image_url: string
  image_alt: string
  order: number
}

export type ApiServicesSection = {
  badge_text: string
  section_title: string
  section_description: string
  cards: ApiServiceCard[]
}

export type ApiQuickInfoCard = {
  id: number
  title: string
  card_type: "weather" | "internal-affairs" | "custom"
  description: string
  primary_button_label: string
  url: string
  is_external: boolean
  image_url: string
  image_alt: string
  order: number
}

export type ApiQuickInfoSection = {
  badge_text: string
  section_title: string
  section_description: string
  cards: ApiQuickInfoCard[]
}

export type ApiInstitutionCard = {
  id: number
  acronym: string
  title: string
  description: string
  url: string
  is_external: boolean
  image_url: string
  image_alt: string
  order: number
}

export type ApiInstitutionsSection = {
  badge_text: string
  section_title: string
  section_description: string
  cards: ApiInstitutionCard[]
}

export type HomePageData = {
  language?: string
  hero_slides: ApiHeroSlide[]
  quick_access: ApiQuickAccessItem[]
  news_section: ApiNewsSection
  services_section: ApiServicesSection
  quick_info_section: ApiQuickInfoSection
  institutions_section: ApiInstitutionsSection
}

import { getApiBaseUrl } from "../utils"

export async function fetchHomePageData(lang: string = "en"): Promise<HomePageData | null> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/v1/home/?lang=${encodeURIComponent(lang)}&_t=${Date.now()}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Error fetching HomePage data:", error)
    return null
  }
}
