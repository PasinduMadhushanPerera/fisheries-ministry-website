export interface ApiMonthlyProductionHeader {
  badge_text?: string
  title?: string
  description?: string
  featured_badge?: string
}

export interface ApiMonthlyProductionReport {
  id: string
  year: number
  month: string
  monthNumber: number
  title: string
  description: string
  fileType: "XLSX" | "XLS" | "PDF" | "CSV" | string
  fileSize: string
  fileUrl: string
  publishedDate: string
  featured?: boolean
}

export interface ApiMonthlyFishProductionData {
  language: string
  header: ApiMonthlyProductionHeader
  available_years: number[]
  reports: ApiMonthlyProductionReport[]
}

export async function fetchMonthlyFishProductionData(
  lang: string = "en"
): Promise<ApiMonthlyFishProductionData | null> {
  const rawUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
  const baseUrl = rawUrl.replace(/\/api\/v1\/?$/, "").replace(/\/+$/, "")
  const endpoint = `${baseUrl}/api/v1/statistics/monthly-fish-production/?lang=${encodeURIComponent(lang)}&_t=${Date.now()}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Error fetching Monthly Fish Production data:", error)
    return null
  }
}
