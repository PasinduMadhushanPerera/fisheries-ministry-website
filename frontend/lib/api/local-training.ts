export interface ApiLocalTrainingHeader {
  badge_text: string
  title: string
  description: string
  featured_badge?: string
  catalogue_badge?: string
  library_title?: string
}

export interface ApiLocalTrainingProgramme {
  id: number | string
  slug: string
  order: number
  year: number
  category: string
  category_label: string
  status: "Open" | "Closing Soon" | "Closed" | "Upcoming" | "Archived"
  featured: boolean
  title: string
  provider: string
  description: string
  published_date: string
  application_deadline: string
  image_url: string
  download_url: string
  file_type: "PDF" | "JPG" | "PNG" | "DOCX" | "XLSX" | "ZIP"
  file_size: string
}

export interface ApiLocalTrainingPageData {
  language: string
  header: ApiLocalTrainingHeader
  programmes: ApiLocalTrainingProgramme[]
}

export async function fetchLocalTrainingPageData(
  lang: string = "en"
): Promise<ApiLocalTrainingPageData | null> {
  const rawUrl = process.env.NEXT_PUBLIC_API_URL || "https://pasiperera.pythonanywhere.com"
  const baseUrl = rawUrl.replace(/\/api\/v1\/?$/, "").replace(/\/+$/, "")
  const endpoint = `${baseUrl}/api/v1/local-training/?lang=${encodeURIComponent(lang)}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) {
      console.error(`[API Error] local-training endpoint returned status ${res.status}`)
      return null
    }
    const data = await res.json()
    console.log(`[API Success] local-training endpoint returned ${data?.programmes?.length} items`)
    return data
  } catch (error) {
    console.error("Error fetching Local Training page data:", error)
    return null
  }
}
