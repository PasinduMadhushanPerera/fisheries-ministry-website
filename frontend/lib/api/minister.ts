export type ApiMinisterProfile = {
  badge: string
  name: string
  role_title: string
  ministry_badge: string
  photo_url: string
  photo_alt: string
}

export type ApiMinisterMessage = {
  eyebrow: string
  message_title: string
  message_content: string
  quote_author: string
  quote_designation: string
}

export type ApiMinisterSecretariat = {
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

export type ApiMinisterPageData = {
  profile: ApiMinisterProfile
  message: ApiMinisterMessage
  secretariat: ApiMinisterSecretariat
}

export async function fetchMinisterPageData(lang: string = "en"): Promise<ApiMinisterPageData | null> {
  const rawUrl = process.env.NEXT_PUBLIC_API_URL || "https://pasiperera.pythonanywhere.com"
  const baseUrl = rawUrl.replace(/\/api\/v1\/?$/, "").replace(/\/+$/, "")
  const endpoint = `${baseUrl}/api/v1/minister/?lang=${encodeURIComponent(lang)}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Error fetching Minister page data:", error)
    return null
  }
}

