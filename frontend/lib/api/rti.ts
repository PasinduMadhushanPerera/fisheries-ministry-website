export interface ApiRtiOfficer {
  id: string
  officerType: "Designated Officer" | "Information Officer"
  name: string
  designation: string
  organization: string
  telephone: string
  fax?: string
  emails: string[]
  image: string
  imageAlt: string
  order?: number
}

export interface ApiRtiLegalDocument {
  id: string
  category: "legal"
  title: string
  description: string
  fileType: "PDF" | "XLSX" | "XLS" | "CSV" | "DOCX" | "DOC" | "PPTX" | "ZIP"
  fileSize: string
  fileUrl: string
  downloadUrl: string
  fileUrlEn?: string | null
  fileUrlSi?: string | null
  fileUrlTa?: string | null
  availableLanguages?: string[]
  publishedDate?: string
  order?: number
}

export interface ApiRtiCategory {
  id: string
  title: string
  description: string
  icon: string
  order?: number
}

export interface ApiRtiDocumentItem {
  id: string
  category: string
  title: string
  subheading?: string | null
  description: string
  year?: number | null
  fileType: "PDF" | "XLSX" | "XLS" | "CSV" | "DOCX" | "DOC" | "PPTX" | "ZIP"
  fileSize: string
  fileUrl: string
  downloadUrl: string
  fileUrlEn?: string | null
  fileUrlSi?: string | null
  fileUrlTa?: string | null
  availableLanguages?: string[]
  publishedDate?: string
  featured?: boolean
  order?: number
}

export interface ApiRtiPageData {
  officers: ApiRtiOfficer[]
  legalDocuments: ApiRtiLegalDocument[]
  categories: ApiRtiCategory[]
  documents: ApiRtiDocumentItem[]
}

import { getApiBaseUrl } from "../utils"

export async function fetchRtiPageData(
  language = "en"
): Promise<ApiRtiPageData | null> {
  try {
    const baseUrl = getApiBaseUrl()
    const url = `${baseUrl}/api/v1/rti/?lang=${encodeURIComponent(
      language
    )}&_t=${Date.now()}`

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    })

    if (!res.ok) {
      console.error(
        `[RTI API] Failed to fetch data: HTTP ${res.status} ${res.statusText}`
      )
      return null
    }

    const data: ApiRtiPageData = await res.json()
    return data
  } catch (error) {
    console.error("[RTI API] Network error fetching RTI page data:", error)
    return null
  }
}
