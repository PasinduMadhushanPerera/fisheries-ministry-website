export interface ApiContactOfficer {
  id: number
  designation: string
  name: string
  telephone: string
  mobile?: string
  fax?: string
  email: string
  location?: string
  notes?: string
  extra_data?: Record<string, string>
  order: number
}

export interface ApiContactDepartment {
  id: number
  name: string
  description: string
  location?: string
  custom_columns?: string[]
  officers_count: number
  officers: ApiContactOfficer[]
  order: number
}

export interface ApiContactFaq {
  id: number
  question: string
  answer: string
  order: number
}

export interface ApiContactPageSettings {
  page_title: string
  page_description: string

  directory_badge?: string
  directory_title: string
  directory_subtitle: string

  hq_badge?: string
  hq_title: string
  hq_description: string
  hq_address: string
  hq_telephone: string
  hq_email: string
  hq_secretary_email: string
  office_hours: string
  map_embed_url: string
  directions_url: string

  form_badge?: string
  form_title?: string
  form_subtitle?: string
  form_guidance_title?: string
  form_guidance_items?: string[]

  faq_badge?: string
  faq_title?: string
  faq_subtitle?: string

  receiver_email: string
}

export interface ApiContactPageData {
  settings: ApiContactPageSettings
  departments: ApiContactDepartment[]
  faqs?: ApiContactFaq[]
}

export interface ContactSubmissionPayload {
  name: string
  email: string
  phone?: string
  subject: string
  department_name?: string
  message: string
}

export interface ContactSubmissionResponse {
  success: boolean
  message: string
  submission_id?: number
  errors?: Record<string, string[]>
}

import { getApiBaseUrl } from "../utils"

export async function fetchContactPageData(lang: string = "en"): Promise<ApiContactPageData | null> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/v1/contact/?lang=${encodeURIComponent(lang)}&_t=${Date.now()}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })

    if (!res.ok) {
      console.error("Failed to fetch contact page data:", res.statusText)
      return null
    }

    const data: ApiContactPageData = await res.json()
    return data
  } catch (error) {
    console.error("Error fetching contact page data:", error)
    return null
  }
}

export async function submitContactMessage(
  payload: ContactSubmissionPayload
): Promise<ContactSubmissionResponse> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/v1/contact/submit/`

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json()
    return data
  } catch (error) {
    console.error("Error submitting contact form message:", error)
    return {
      success: false,
      message: "Network error occurred while submitting your message. Please try again.",
    }
  }
}
