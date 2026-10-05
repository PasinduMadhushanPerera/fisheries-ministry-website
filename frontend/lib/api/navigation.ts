import { NavigationItem, mainNavigation } from "@/data/navigation"
import { getApiBaseUrl } from "../utils"

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

function findStaticItem(href: string, title: string, list: NavigationItem[]): NavigationItem | undefined {
  return (
    list.find((item) => item.href === href) ||
    list.find((item) => item.label.toLowerCase() === title.toLowerCase())
  )
}

function findStaticChildItem(href: string, title: string, list: NavigationItem[]): NavigationItem | undefined {
  for (const parent of list) {
    if (parent.children) {
      const found = parent.children.find(
        (c) => c.href === href || c.label.toLowerCase() === title.toLowerCase()
      )
      if (found) return found
    }
  }
  return undefined
}

export async function getDynamicNavigation(): Promise<NavigationItem[]> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/v1/navigation/?_t=${Date.now()}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return mainNavigation
    const json = await res.json()
    const data: ApiMenuItem[] = Array.isArray(json) ? json : json.results || []

    if (!data || data.length === 0) return mainNavigation

    return data.map((item) => {
      const staticItem = findStaticItem(item.url, item.title, mainNavigation)

      const children =
        item.children && item.children.length > 0
          ? item.children.map((child) => {
              const staticChild = findStaticChildItem(child.url, child.title, mainNavigation)
              return {
                label: child.title,
                label_si: staticChild?.label_si,
                label_ta: staticChild?.label_ta,
                href: child.url,
              }
            })
          : staticItem?.children

      return {
        label: item.title,
        label_si: staticItem?.label_si,
        label_ta: staticItem?.label_ta,
        href: item.url,
        children,
      }
    })
  } catch (error) {
    console.error("Error fetching navigation tree:", error)
    return mainNavigation
  }
}
