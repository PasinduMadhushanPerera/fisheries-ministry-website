export interface ApiAnnualStatisticsHeader {
  badge_text?: string
  title?: string
  description?: string
  featured_badge?: string
}

export interface ApiAnnualStatisticsDocument {
  id: string
  year: number
  title: string
  description: string
  publishedDate: string
  fileType:
    | "PDF"
    | "XLSX"
    | "XLS"
    | "DOCX"
    | "DOC"
    | "CSV"
    | "PPTX"
    | "PPT"
    | "ZIP"
    | string
  fileSize: string
  fileUrl: string
  downloadUrl: string
  language?: string
  featured?: boolean
}

export interface ApiAnnualStatisticsData {
  language: string
  header: ApiAnnualStatisticsHeader
  available_years: number[]
  reports: ApiAnnualStatisticsDocument[]
}

export async function fetchAnnualStatisticsData(
  lang: string = "en"
): Promise<ApiAnnualStatisticsData | null> {
  const rawUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
  const baseUrl = rawUrl.replace(/\/api\/v1\/?$/, "").replace(/\/+$/, "")
  const endpoint = `${baseUrl}/api/v1/statistics/annual-reports/?lang=${encodeURIComponent(lang)}&_t=${Date.now()}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Error fetching Annual Statistics data:", error)
    return null
  }
}
