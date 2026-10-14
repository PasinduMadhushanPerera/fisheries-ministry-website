export type ApiHeaderSetting = {
  government_name: string
  ministry_name: string
  tagline: string
  logo_url: string
  logo_alt: string
  hotline_phone: string
  email: string
  help_link_text: string
  help_link_url: string
  gov_link_text: string
  gov_link_url: string
  search_placeholder: string
  enable_emergency_banner: boolean
  emergency_banner_text: string
  emergency_banner_link: string
}

export type ApiFooterLink = {
  id: number
  column: "quick" | "info" | "support" | "legal"
  label: string
  url: string
  is_external: boolean
  order: number
}

export type ApiFooterAward = {
  id: number
  title: string
  image_url: string
  url: string
  order: number
}

export type ApiFooterSetting = {
  government_badge: string
  ministry_name: string
  about_text: string
  gov_portal_label: string
  gov_portal_url: string
  hq_address: string
  telephone: string
  email: string
  copyright_text: string
  copyright_year?: string
  developed_by_text?: string
  last_updated_text?: string
  enable_social_media?: boolean
  facebook_url?: string
  youtube_url?: string
  linkedin_url?: string
  twitter_url?: string
  instagram_url?: string
  quick_links: ApiFooterLink[]
  info_links: ApiFooterLink[]
  support_links: ApiFooterLink[]
  legal_links: ApiFooterLink[]
  awards?: ApiFooterAward[]
}

export type ApiSiteMaintenanceSetting = {
  is_maintenance_mode: boolean
  title: string
  message: string
  estimated_restoration: string
  contact_phone: string
  contact_email: string
}

export type HeaderFooterData = {
  header: ApiHeaderSetting
  footer: ApiFooterSetting
  maintenance?: ApiSiteMaintenanceSetting
  total_views?: number
}

import { getApiBaseUrl } from "../utils"

export async function fetchHeaderFooterData(lang: string = "en"): Promise<HeaderFooterData | null> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/v1/header-footer/?lang=${encodeURIComponent(lang)}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Error fetching Header & Footer data:", error)
    return null
  }
}

export async function incrementVisitorCount(): Promise<number | null> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/v1/header-footer/visitor-count/`

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.total_views ?? null
  } catch (error) {
    console.error("Error incrementing visitor count:", error)
    return null
  }
}

export async function fetchVisitorCount(): Promise<number | null> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/v1/header-footer/visitor-count/`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.total_views ?? null
  } catch (error) {
    console.error("Error fetching visitor count:", error)
    return null
  }
}
