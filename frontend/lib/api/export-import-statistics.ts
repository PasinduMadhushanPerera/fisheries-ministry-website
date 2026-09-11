export interface ApiExportImportHeader {
  badge_text?: string
  title?: string
  description?: string
  summary_heading?: string
}

export interface ApiTradeMetric {
  id: string
  title: string
  value: string
  unit: string
  period: string
  trend?: string
  iconType:
    | "export-qty"
    | "import-qty"
    | "export-val"
    | "import-val"
    | "balance"
    | "latest-month"
    | string
}

export interface ApiExportImportReport {
  id: string
  year: number
  month: string
  monthNumber: number
  title: string
  description: string
  fileType:
    | "PDF"
    | "XLSX"
    | "XLS"
    | "CSV"
    | "DOCX"
    | "ZIP"
    | string
  fileSize: string
  fileUrl: string
  downloadUrl?: string
  publishedDate: string
}

export interface ApiExportImportData {
  language: string
  header: ApiExportImportHeader
  summary_metrics: ApiTradeMetric[]
  available_years: number[]
  reports: ApiExportImportReport[]
}

export async function fetchExportImportData(
  lang: string = "en"
): Promise<ApiExportImportData | null> {
  const rawUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
  const baseUrl = rawUrl.replace(/\/api\/v1\/?$/, "").replace(/\/+$/, "")
  const endpoint = `${baseUrl}/api/v1/statistics/export-and-import/?lang=${encodeURIComponent(lang)}&_t=${Date.now()}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Error fetching Export & Import statistics data:", error)
    return null
  }
}
