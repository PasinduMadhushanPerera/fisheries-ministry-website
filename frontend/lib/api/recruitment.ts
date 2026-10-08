export interface ApiRecruitmentHeader {
  badge_text: string
  title: string
  description: string
  featured_badge?: string
  catalogue_badge?: string
  library_title?: string
}

export interface ApiRecruitmentCategory {
  id: number | string
  category_id: string
  title: string
  description: string
  icon_type?: string
  order: number
}

export interface ApiRecruitmentVacancyItem {
  id: number | string
  slug: string
  order: number
  ref_number: string
  year: number
  category: string
  category_label: string
  status: "Open" | "Closing Soon" | "Closed"
  featured: boolean
  title: string
  subheading?: string
  institution: string
  department: string
  description: string
  qualifications: string[]
  published_date: string
  closing_date: string
  salary_scale?: string
  age_limit?: string
  doc_button_label?: string
  download_url: string
  file_type: "PDF" | "DOCX" | "XLSX" | "ZIP"
  file_size: string
  second_document_label?: string
  second_download_url?: string
  second_file_type?: "PDF" | "DOCX" | "XLSX" | "ZIP"
  second_file_size?: string
  additional_documents?: Array<{
    id: number | string
    label?: string
    download_url?: string
    file_type?: string
    file_size?: string
  }>
}

export interface ApiRecruitmentPageData {
  language: string
  header: ApiRecruitmentHeader
  categories?: ApiRecruitmentCategory[]
  vacancies: ApiRecruitmentVacancyItem[]
}

import { getApiBaseUrl } from "../utils"

export async function fetchRecruitmentPageData(
  lang: string = "en"
): Promise<ApiRecruitmentPageData | null> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/v1/recruitment/?lang=${encodeURIComponent(lang)}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Error fetching Recruitment page data:", error)
    return null
  }
}
