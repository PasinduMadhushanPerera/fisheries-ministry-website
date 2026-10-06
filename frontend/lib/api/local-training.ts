export interface ApiLocalTrainingHeader {
  badge_text: string
  title: string
  description: string
  featured_badge?: string
  catalogue_badge?: string
  library_title?: string
}

export interface ApiLocalTrainingCategory {
  id: string
  title: string
  description?: string
  icon_type?: string
  order: number
}

export interface ApiLocalTrainingProgramme {
  id: number | string
  slug: string
  order: number
  year: number
  category: string
  category_label: string
  subheading?: string
  status: "Open" | "Closing Soon" | "Closed" | "Upcoming" | "Archived"
  featured: boolean
  title: string
  provider: string
  description: string
  published_date: string
  application_deadline: string
  image_url: string
  download_url: string
  file_type: "PDF" | "JPG" | "PNG" | "DOCX" | "XLSX" | "ZIP"
  file_size: string
}

export interface ApiLocalTrainingPageData {
  language: string
  header: ApiLocalTrainingHeader
  categories?: ApiLocalTrainingCategory[]
  programmes: ApiLocalTrainingProgramme[]
}

import { getApiBaseUrl } from "../utils"

export async function fetchLocalTrainingPageData(
  lang: string = "en"
): Promise<ApiLocalTrainingPageData | null> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/v1/local-training/?lang=${encodeURIComponent(lang)}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) {
      console.error(`[API Error] local-training endpoint returned status ${res.status}`)
      return null
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.error("Error fetching Local Training page data:", error)
    return null
  }
}
