import { getApiBaseUrl } from "../utils"

export interface SearchResultItem {
  id: string
  title: string
  summary: string
  category_key: string
  category: string
  href: string
  badge?: string
  date?: string | null
}

export interface SearchCategoryTab {
  key: string
  label: string
  count: number
}

export interface SearchPopularSuggestion {
  query: string
  label: string
}

export interface SearchApiResponse {
  query: string
  lang: string
  selected_category: string
  total_results: number
  categories: SearchCategoryTab[]
  results: SearchResultItem[]
  popular_suggestions: SearchPopularSuggestion[]
}

export async function fetchSearchResults(
  query: string = "",
  lang: string = "en",
  category: string = "all"
): Promise<SearchApiResponse | null> {
  const baseUrl = getApiBaseUrl()
  const params = new URLSearchParams()
  if (query) params.set("q", query)
  params.set("lang", lang)
  if (category && category !== "all") params.set("category", category)

  const endpoint = `${baseUrl}/api/v1/search/?${params.toString()}&_t=${Date.now()}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })

    if (!res.ok) {
      console.error("Failed to fetch search results:", res.statusText)
      return null
    }

    const data: SearchApiResponse = await res.json()
    return data
  } catch (error) {
    console.error("Error fetching search results:", error)
    return null
  }
}
