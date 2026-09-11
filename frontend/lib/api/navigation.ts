import { NavigationItem, mainNavigation } from "@/data/navigation"

export type ApiMenuItem = {
  id: number
  title: string
  url: string
  description?: string
  badge?: string
  order: number
  is_external?: boolean
  children?: ApiMenuItem[]
}

export async function getDynamicNavigation(): Promise<NavigationItem[]> {
  const rawUrl = process.env.NEXT_PUBLIC_API_URL || "https://pasiperera.pythonanywhere.com"
  const baseUrl = rawUrl.replace(/\/api\/v1\/?$/, "").replace(/\/+$/, "")
  const endpoint = `${baseUrl}/api/v1/navigation/`

  try {
    const res = await fetch(endpoint, {
      next: { revalidate: 15 },
    })
    if (!res.ok) return mainNavigation
    const json = await res.json()
    const data: ApiMenuItem[] = Array.isArray(json) ? json : json.results || []

    if (!data || data.length === 0) return mainNavigation

    return data.map((item) => ({
      label: item.title,
      href: item.url,
      children:
        item.children && item.children.length > 0
          ? item.children.map((child) => ({
              label: child.title,
              href: child.url,
            }))
          : undefined,
    }))
  } catch (error) {
    console.error("Error fetching navigation tree:", error)
    return mainNavigation
  }
}
