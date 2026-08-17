import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { PressReleaseDetailContent } from "@/components/media/press-releases-detail"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { fetchPressReleaseBySlug } from "@/lib/api/press-releases"
import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

interface PressReleaseDetailPageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{ lang?: string }>
}

export async function generateMetadata({
  params,
  searchParams,
}: PressReleaseDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const lang = await getServerLanguage(searchParams)
  const release = await fetchPressReleaseBySlug(slug, lang)

  if (!release) {
    return {
      title: "Press Release Not Found - Ministry of Fisheries",
    }
  }

  return {
    title: `${release.title} - Ministry of Fisheries`,
    description: release.summary,
  }
}

export default async function PressReleaseDetailPage({
  params,
  searchParams,
}: PressReleaseDetailPageProps) {
  const { slug } = await params
  const lang = await getServerLanguage(searchParams)

  const [release, headerFooterData] = await Promise.all([
    fetchPressReleaseBySlug(slug, lang),
    fetchHeaderFooterData(),
  ])

  if (!release) {
    notFound()
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Media Centre", href: "/media-centre/press-releases" },
    { label: "Press Releases", href: "/media-centre/press-releases" },
    { label: release.title },
  ]

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb items={breadcrumbItems} />
        <PressReleaseDetailContent release={release} />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}