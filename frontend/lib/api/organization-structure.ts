export type ApiOrganizationStructureChart = {
  eyebrow: string
  title: string
  description: string
  chart_box_title: string
  chart_box_subtitle: string
  chart_image_url: string
  chart_pdf_url: string | null
  executive_notes: string
}

export type ApiOrganizationStructurePageData = {
  structure: ApiOrganizationStructureChart
}

import { getApiBaseUrl } from "../utils"

export async function fetchOrganizationStructurePageData(lang: string = "en"): Promise<ApiOrganizationStructurePageData | null> {
  const baseUrl = getApiBaseUrl()
  const endpoint = `${baseUrl}/api/v1/organization-structure/?lang=${encodeURIComponent(lang)}`

  try {
    const res = await fetch(endpoint, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("Error fetching Organization Structure page data:", error)
    return null
  }
}

