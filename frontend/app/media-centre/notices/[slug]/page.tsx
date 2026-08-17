import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { NoticeDetailContent } from "@/components/media/notices-detail"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { fetchNoticeBySlug } from "@/lib/api/notices"
import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

interface NoticeDetailPageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{ lang?: string }>
}

export async function generateMetadata({
  params,
  searchParams,
}: NoticeDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const lang = await getServerLanguage(searchParams)
  const notice = await fetchNoticeBySlug(slug, lang)

  if (!notice) {
    return {
      title: "Notice Not Found - Ministry of Fisheries",
    }
  }

  return {
    title: `${notice.title} - Ministry of Fisheries`,
    description: notice.summary,
  }
}

export default async function NoticeDetailPage({
  params,
  searchParams,
}: NoticeDetailPageProps) {
  const { slug } = await params
  const lang = await getServerLanguage(searchParams)

  const [notice, headerFooterData] = await Promise.all([
    fetchNoticeBySlug(slug, lang),
    fetchHeaderFooterData(),
  ])

  if (!notice) {
    notFound()
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Media Centre", href: "/media-centre/notices" },
    { label: "Notices", href: "/media-centre/notices" },
    { label: notice.title },
  ]

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb items={breadcrumbItems} />
        <NoticeDetailContent notice={notice} />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}