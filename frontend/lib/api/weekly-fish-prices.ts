export interface ApiWeeklyPricesHeader {
  badge_text?: string
  title?: string
  description?: string
}

export interface ApiWeeklyPriceReport {
  id: string
  year: number
  month: string
  monthNumber: number
  week: number
  title: string
  publishedDate: string
  fileSize: string
  pdfUrl: string
}

export interface ApiWeeklyPriceCategory {
  id: number
  groupKey: string
  year: number
  month: string
  monthNumber: number
  title: string
  description: string
  badgeSingular: string
  badgePlural: string
}

export interface ApiWeeklyFishPricesData {
  language: string
  header: ApiWeeklyPricesHeader
  available_years: number[]
  categories?: ApiWeeklyPriceCategory[]
  reports: ApiWeeklyPriceReport[]
}

import { getApiBaseUrl } from "../utils"

export async function fetchWeeklyFishPricesData(
  lang: string = "en"
): Promise<ApiWeeklyFishPricesData | null> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/v1/statistics/weekly-fish-prices/?lang=${encodeURIComponent(lang)}&_t=${Date.now()}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Error fetching Weekly Fish Prices data:", error)
    return null
  }
}
