export interface ApiFisheryInformationHeader {
  badge_text?: string
  title?: string
  description?: string
}

export interface ApiFisheryCategoryMeta {
  id: string
  title: string
  description: string
  icon_type?: string
}

export interface ApiFisheryInformationItem {
  id: string
  category: string
  title: string
  description: string
  location?: string
  year?: number
  fileType:
    | "PDF"
    | "XLSX"
    | "XLS"
    | "CSV"
    | "DOCX"
    | "DOC"
    | "PPTX"
    | "ZIP"
    | "PNG"
    | "JPG"
    | string
  fileSize: string
  fileUrl: string
  downloadUrl?: string
  publishedDate?: string
  featured?: boolean
}

export interface ApiFisheryInformationData {
  language: string
  header: ApiFisheryInformationHeader
  categories: ApiFisheryCategoryMeta[]
  items: ApiFisheryInformationItem[]
}

export async function fetchFisheryInformationData(
  lang: string = "en"
): Promise<ApiFisheryInformationData | null> {
  const rawUrl = process.env.NEXT_PUBLIC_API_URL || "https://pasiperera.pythonanywhere.com"
  const baseUrl = rawUrl.replace(/\/api\/v1\/?$/, "").replace(/\/+$/, "")
  const endpoint = `${baseUrl}/api/v1/statistics/related-information/?lang=${encodeURIComponent(lang)}&_t=${Date.now()}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Error fetching Fishery Related Information data:", error)
    return null
  }
}
