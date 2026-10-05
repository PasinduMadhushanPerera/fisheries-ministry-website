export type ApiDivisionsPageIntro = {
  badge_text: string
  title: string
  description: string
}

export type ApiMinistryDivision = {
  id: number | string
  order: number
  slug: string
  title: string
  icon_name: string
  short_description: string
  full_description: string
  full_description_paragraphs: string[]
  bullet_points: string
  bullet_points_list: string[]
  head_of_division?: string
  contact_email?: string
  contact_phone?: string
  is_active: boolean
}

export type ApiDivisionsPageData = {
  intro: ApiDivisionsPageIntro
  divisions: ApiMinistryDivision[]
}

import { getApiBaseUrl } from "../utils"

export async function fetchDivisionsPageData(lang: string = "en"): Promise<ApiDivisionsPageData | null> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/v1/divisions/?lang=${encodeURIComponent(lang)}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Error fetching Divisions page data:", error)
    return null
  }
}

