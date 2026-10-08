export interface ApiProcurementHeader {
  badge_text: string
  title: string
  description: string
  featured_badge?: string
  catalogue_badge?: string
  library_title?: string
}

export interface ApiProcurementTenderItem {
  id: number | string
  slug: string
  order: number
  ref_number: string
  year: number
  category: string
  category_label: string
  status: "Open" | "Closing Soon" | "Closed" | "Awarded"
  featured: boolean
  title: string
  subheading?: string
  publisher: string
  description: string
  detailed_scope: string[]
  additional_info?: string
  doc_button_label?: string
  published_date: string
  closing_date: string
  submission_address: string
  tender_fee?: string
  bid_security?: string
  eligibility: string
  contact_info: string
  download_url: string
  file_type: "PDF" | "DOCX" | "XLSX" | "ZIP"
  file_size: string
  second_document_label?: string
  second_download_url?: string
  second_file_type?: "PDF" | "DOCX" | "XLSX" | "ZIP"
  second_file_size?: string
}

export interface ApiProcurementCategory {
  id: number | string
  category_id: string
  title: string
  description: string
  icon_type?: string
  order: number
}

export interface ApiProcurementPageData {
  language: string
  header: ApiProcurementHeader
  categories?: ApiProcurementCategory[]
  tenders: ApiProcurementTenderItem[]
}

import { getApiBaseUrl } from "../utils"

export async function fetchProcurementPageData(
  lang: string = "en"
): Promise<ApiProcurementPageData | null> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/v1/procurement/?lang=${encodeURIComponent(lang)}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Error fetching Procurement page data:", error)
    return null
  }
}
