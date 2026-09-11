export type ApiSecretaryProfile = {
  badge: string
  name: string
  role_title: string
  ministry_badge: string
  photo_url: string
  photo_alt: string
}

export type ApiSecretaryMessage = {
  eyebrow: string
  message_title: string
  message_content: string
  quote_author: string
  quote_designation: string
}

export type ApiSecretarySecretariat = {
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

export type ApiSecretaryPageData = {
  profile: ApiSecretaryProfile
  message: ApiSecretaryMessage
  secretariat: ApiSecretarySecretariat
}

export async function fetchSecretaryPageData(lang: string = "en"): Promise<ApiSecretaryPageData | null> {
  const rawUrl = process.env.NEXT_PUBLIC_API_URL || "https://pasiperera.pythonanywhere.com"
  const baseUrl = rawUrl.replace(/\/api\/v1\/?$/, "").replace(/\/+$/, "")
  const endpoint = `${baseUrl}/api/v1/secretary/?lang=${encodeURIComponent(lang)}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Error fetching Secretary page data:", error)
    return null
  }
}

