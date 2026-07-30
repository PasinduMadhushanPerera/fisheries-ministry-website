export type LanguageCode = "en" | "si" | "ta"

export interface NoticeCategory {
  id: number
  name: string
  slug: string
}

export interface NoticeAttachment {
  id: number
  title: string
  file: string
  file_url: string | null
  file_type: string | null
}

export interface Notice {
  id: number
  category: NoticeCategory
  status: string
  priority: string
  is_featured: boolean
  published_at: string
  expires_at: string | null
  title: string | null
  slug: string | null
  summary: string | null
  content: string | null
  seo_title: string | null
  seo_description: string | null
  attachments: NoticeAttachment[]
  created_at: string
  updated_at: string
}

export interface NoticeApiResponse {
  count: number
  next: string | null
  previous: string | null
  results: Notice[]
}

export type NoticeDisplayStatus =
  | "Open"
  | "Closing Soon"
  | "Closed"

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:8000/api/v1"

function buildApiUrl(
  path: string,
  parameters: Record<string, string | undefined>,
): string {
  const url = new URL(`${API_BASE_URL}${path}`)

  Object.entries(parameters).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value)
    }
  })

  return url.toString()
}

export async function getNotices(
  language: LanguageCode = "en",
): Promise<NoticeApiResponse> {
  const response = await fetch(
    buildApiUrl("/notices/", {
      lang: language,
    }),
    {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    },
  )

  if (!response.ok) {
    throw new Error(
      `Unable to load notices. Server returned ${response.status}.`,
    )
  }

  const data: unknown = await response.json()

  // Supports both paginated and non-paginated DRF responses.
  if (Array.isArray(data)) {
    return {
      count: data.length,
      next: null,
      previous: null,
      results: data as Notice[],
    }
  }

  return data as NoticeApiResponse
}

export async function getNoticeById(
  id: number | string,
  language: LanguageCode = "en",
): Promise<Notice> {
  const response = await fetch(
    buildApiUrl(`/notices/${id}/`, {
      lang: language,
    }),
    {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    },
  )

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Notice not found.")
    }

    throw new Error(
      `Unable to load the notice. Server returned ${response.status}.`,
    )
  }

  return response.json() as Promise<Notice>
}

export function getNoticeDisplayStatus(
  notice: Notice,
): NoticeDisplayStatus {
  if (!notice.expires_at) {
    return "Open"
  }

  const now = new Date()
  const expiryDate = new Date(notice.expires_at)

  if (Number.isNaN(expiryDate.getTime())) {
    return "Open"
  }

  if (expiryDate.getTime() < now.getTime()) {
    return "Closed"
  }

  const millisecondsPerDay = 1000 * 60 * 60 * 24
  const remainingDays =
    (expiryDate.getTime() - now.getTime()) /
    millisecondsPerDay

  if (remainingDays <= 7) {
    return "Closing Soon"
  }

  return "Open"
}

export function formatNoticeDate(
  value: string | null,
  locale = "en-GB",
): string | null {
  if (!value) {
    return null
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

export function splitNoticeContent(
  content: string | null,
): string[] {
  if (!content) {
    return []
  }

  return content
    .split(/\n\s*\n|\r\n\s*\r\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}