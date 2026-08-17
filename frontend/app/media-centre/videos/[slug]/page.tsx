import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { VideoDetailContent } from "@/components/media/video-detail"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { fetchVideoBySlug } from "@/lib/api/videos"
import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

interface VideoDetailPageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{ lang?: string }>
}

export async function generateMetadata({
  params,
  searchParams,
}: VideoDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const lang = await getServerLanguage(searchParams)
  const video = await fetchVideoBySlug(slug, lang)

  if (!video) {
    return {
      title: "Video Not Found - Ministry of Fisheries",
    }
  }

  return {
    title: `${video.title} - Official Videos | Ministry of Fisheries`,
    description: video.description,
  }
}

export default async function VideoDetailPage({
  params,
  searchParams,
}: VideoDetailPageProps) {
  const { slug } = await params
  const lang = await getServerLanguage(searchParams)

  const [video, headerFooterData] = await Promise.all([
    fetchVideoBySlug(slug, lang),
    fetchHeaderFooterData(),
  ])

  if (!video) {
    notFound()
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Media Centre", href: "/media-centre/videos" },
    { label: "Videos", href: "/media-centre/videos" },
    { label: video.title },
  ]

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb items={breadcrumbItems} />
        <VideoDetailContent video={video} />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}