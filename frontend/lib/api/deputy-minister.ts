export type ApiDeputyMinisterProfile = {
  badge: string
  name: string
  role_title: string
  ministry_badge: string
  photo_url: string
  photo_alt: string
}

export type ApiDeputyMinisterMessage = {
  eyebrow: string
  message_title: string
  message_content: string
  quote_author: string
  quote_designation: string
}

export type ApiDeputyMinisterSecretariat = {
  box_title: string
  box_subtitle: string
  office_hours: string
  office_address: string
  office_phone: string
  office_email: string
  cta_contact_button_text: string
  cta_contact_button_url: string
  secondary_link_text: string
  secondary_link_url: string
}

export type ApiDeputyMinisterPageData = {
  profile: ApiDeputyMinisterProfile
  message: ApiDeputyMinisterMessage
  secretariat: ApiDeputyMinisterSecretariat
}

import { getApiBaseUrl } from "../utils"

export async function fetchDeputyMinisterPageData(lang: string = "en"): Promise<ApiDeputyMinisterPageData | null> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/v1/deputy-minister/?lang=${encodeURIComponent(lang)}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Error fetching Deputy Minister page data:", error)
    return null
  }
}

