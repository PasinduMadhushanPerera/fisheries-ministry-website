export type ApiSectionHeader = {
  eyebrow: string
  title: string
  description: string
}

export type ApiAboutOverview = {
  eyebrow: string
  title: string
  description: string
  legacy_title: string
  legacy_content: string
  economic_title: string
  economic_content: string
  economic_subcontent: string
  stat_1_value: string
  stat_1_label: string
  stat_2_value: string
  stat_2_label: string
  stat_3_value: string
  stat_3_label: string
  stat_4_value: string
  stat_4_label: string
  cta_button_text: string
  cta_button_url: string
  pillar_mandate_badge: string
  pillar_mandate_title: string
  pillar_1_title: string
  pillar_1_description: string
  pillar_2_title: string
  pillar_2_description: string
  pillar_3_title: string
  pillar_3_description: string
  benefit_banner_title: string
  benefit_banner_text: string
}

export type ApiVisionMission = {
  eyebrow: string
  title: string
  description: string
  vision_badge: string
  vision_heading: string
  vision_description: string
  vision_footer: string
  mission_badge: string
  mission_heading: string
  mission_description: string
  mission_footer: string
}

export type ApiObjective = {
  id: number
  order: number
  number_badge: string
  title: string
  description: string
  icon_name: string
}

export type ApiLeader = {
  id: number
  role_type: "minister" | "deputy_minister" | "secretary"
  order: number
  name: string
  role_title: string
  ministry_badge: string
  short_description: string
  message_title: string
  message_content: string
  biography: string
  photo_url: string
  photo_alt: string
  office_address: string
  office_phone: string
  office_email: string
  office_hours: string
  page_url: string
}

export type ApiStructure = {
  eyebrow: string
  title: string
  description: string
  chart_box_title: string
  chart_box_subtitle: string
  chart_image_url: string
  chart_pdf_url: string | null
  executive_notes: string
}

export type ApiTimelineEvent = {
  id: number
  order: number
  year: string
  title: string
  description: string
  status_badge: string
}

export type ApiDepartmentCard = {
  id?: number
  order?: number
  title: string
  description: string
  href: string
  icon_name?: string
}

export type ApiCTA = {
  badge?: string
  title?: string
  description?: string
  button_1_text?: string
  button_1_url?: string
  button_2_text?: string
  button_2_url?: string
}

export type ApiAboutData = {
  overview: ApiAboutOverview
  vision_mission: ApiVisionMission
  objective_header: ApiSectionHeader
  objectives: ApiObjective[]
  leadership_header: ApiSectionHeader
  leaders: ApiLeader[]
  structure: ApiStructure
  timeline_header: ApiSectionHeader
  timeline: ApiTimelineEvent[]
}

import { getApiBaseUrl } from "../utils"

export async function fetchAboutPageData(lang: string = "en"): Promise<ApiAboutData | null> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/v1/about/?lang=${encodeURIComponent(lang)}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Error fetching About page data:", error)
    return null
  }
}

export async function fetchLeaderDetail(roleType: string, lang: string = "en"): Promise<ApiLeader | null> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/v1/about/leaders/${roleType}/?lang=${encodeURIComponent(lang)}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error(`Error fetching leader detail for ${roleType}:`, error)
    return null
  }
}

