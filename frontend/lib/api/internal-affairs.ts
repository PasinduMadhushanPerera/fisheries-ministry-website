import { getApiBaseUrl } from "../utils"
import { internalAffairsOfficers, type InternalAffairsOfficer } from "@/data/internal-affairs"

export interface ApiSectionHeader {
  badge?: string
  title?: string
  description?: string
}

export interface ApiInternalAffairsSettings {
  officersHeader?: ApiSectionHeader
  documentsHeader?: ApiSectionHeader
}

export interface ApiInternalAffairsDocument {
  id: string
  title: string
  description?: string
  fileType: string
  fileSize?: string
  fileUrl?: string
  downloadUrl?: string
  publishedDate?: string
  order?: number
}

export async function fetchInternalAffairsSettings(
  language = "en"
): Promise<ApiInternalAffairsSettings | null> {
  try {
    const baseUrl = getApiBaseUrl()
    const url = `${baseUrl}/api/v1/internal-affairs/settings/?lang=${encodeURIComponent(
      language
    )}&_t=${Date.now()}`

    const res = await fetch(url, {
      cache: "no-store",
    })

    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Failed to fetch internal affairs page settings from API:", error)
    return null
  }
}

export async function fetchInternalAffairsOfficers(
  language = "en"
): Promise<InternalAffairsOfficer[]> {
  try {
    const baseUrl = getApiBaseUrl()
    const url = `${baseUrl}/api/v1/internal-affairs/officers/?lang=${encodeURIComponent(
      language
    )}&_t=${Date.now()}`

    const res = await fetch(url, {
      cache: "no-store",
    })

    if (!res.ok) {
      return internalAffairsOfficers
    }

    const data = await res.json()
    if (Array.isArray(data) && data.length > 0) {
      return data
    }
    if (Array.isArray(data?.results) && data.results.length > 0) {
      return data.results
    }
  } catch (error) {
    console.error("Failed to fetch internal affairs officers from API:", error)
  }

  return internalAffairsOfficers
}

export async function fetchInternalAffairsDocuments(
  language = "en"
): Promise<ApiInternalAffairsDocument[]> {
  try {
    const baseUrl = getApiBaseUrl()
    const url = `${baseUrl}/api/v1/internal-affairs/documents/?lang=${encodeURIComponent(
      language
    )}&_t=${Date.now()}`

    const res = await fetch(url, {
      cache: "no-store",
    })

    if (!res.ok) {
      return []
    }

    const data = await res.json()
    if (Array.isArray(data)) {
      return data
    }
    if (Array.isArray(data?.results)) {
      return data.results
    }
  } catch (error) {
    console.error("Failed to fetch internal affairs documents from API:", error)
  }

  return []
}
