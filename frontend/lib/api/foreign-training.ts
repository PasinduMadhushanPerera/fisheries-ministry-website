export interface ApiForeignTrainingHeader {
  badge_text: string
  title: string
  description: string
  featured_badge?: string
  catalogue_badge?: string
  library_title?: string
}

export interface ApiForeignTrainingCategory {
  id: string
  title: string
  description?: string
  icon_type?: string
  order: number
}

export interface ApiForeignTrainingProgramme {
  id: number | string
  slug: string
  order: number
  year: number
  country: string
  category: string
  category_label: string
  subheading?: string
  status: "Open" | "Closing Soon" | "Closed" | "Upcoming" | "Archived"
  featured: boolean
  title: string
  institution: string
  description: string
  published_date: string
  application_deadline: string
  image_url: string
  download_url: string
  file_type: "PDF" | "DOCX" | "XLSX" | "JPG" | "PNG" | "ZIP"
  file_size: string
}

export interface ApiForeignTrainingPageData {
  language: string
  header: ApiForeignTrainingHeader
  categories?: ApiForeignTrainingCategory[]
  programmes: ApiForeignTrainingProgramme[]
}

import { getApiBaseUrl } from "../utils"

export async function fetchForeignTrainingPageData(
  lang: string = "en"
): Promise<ApiForeignTrainingPageData | null> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/v1/foreign-training/?lang=${encodeURIComponent(lang)}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Error fetching Foreign Training page data:", error)
    return null
  }
}
