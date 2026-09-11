export interface ApiDownloadCategory {
  id: string
  title: string
  description: string
  icon: string
  order?: number
}

export interface ApiDownloadDocumentItem {
  id: string
  category: string
  title: string
  description: string
  year?: number | null
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
    | "PNG"
    | "JPG"
  fileSize: string
  fileUrl: string
  downloadUrl: string
  publishedDate?: string
  language?: string
  featured?: boolean
  order?: number
}

export interface ApiDownloadsPageData {
  categories: ApiDownloadCategory[]
  featuredDocuments: ApiDownloadDocumentItem[]
  documents: ApiDownloadDocumentItem[]
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://pasiperera.pythonanywhere.com"

export async function fetchDownloadsPageData(
  language = "en"
): Promise<ApiDownloadsPageData | null> {
  try {
    const url = `${API_BASE_URL}/api/v1/downloads/?lang=${encodeURIComponent(
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
        `[Downloads API] Failed to fetch data: HTTP ${res.status} ${res.statusText}`
      )
      return null
    }

    const data: ApiDownloadsPageData = await res.json()
    return data
  } catch (error) {
    console.error(
      "[Downloads API] Network error fetching Downloads page data:",
      error
    )
    return null
  }
}
