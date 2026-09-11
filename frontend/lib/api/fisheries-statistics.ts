export interface ApiStatisticsHeader {
  badge_text?: string
  title?: string
  description?: string
}

export interface ApiSummaryCard {
  id?: number | string
  order?: number
  title: string
  value: string
  unit: string
  year: string
  icon_name:
    | "TrendingUp"
    | "Anchor"
    | "Ship"
    | "Building2"
    | "Users"
    | "DollarSign"
    | string
}

export interface ApiStatisticRow {
  id?: number | string
  order?: number
  label: string
  value: string
  unit?: string
  emphasized?: boolean
}

export interface ApiStatisticsSection {
  id: number | string
  slug: string
  order: number
  icon_name:
    | "TrendingUp"
    | "Anchor"
    | "Building2"
    | "Users"
    | "ArrowLeftRight"
    | "PackageCheck"
    | "Activity"
    | string
  is_default_open?: boolean
  title: string
  description: string
  caption: string
  rows: ApiStatisticRow[]
}

export interface ApiFisheriesAtAGlanceData {
  language: string
  header: ApiStatisticsHeader
  summary_cards: ApiSummaryCard[]
  sections: ApiStatisticsSection[]
}

export async function fetchFisheriesAtAGlanceData(
  lang: string = "en"
): Promise<ApiFisheriesAtAGlanceData | null> {
  const rawUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
  const baseUrl = rawUrl.replace(/\/api\/v1\/?$/, "").replace(/\/+$/, "")
  const endpoint = `${baseUrl}/api/v1/statistics/at-a-glance/?lang=${encodeURIComponent(lang)}&_t=${Date.now()}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Error fetching Fisheries at a Glance data:", error)
    return null
  }
}
