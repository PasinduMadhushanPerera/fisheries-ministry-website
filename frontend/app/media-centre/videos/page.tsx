import type { Metadata } from "next"

import { VideosPageContent } from "@/components/media/videos-page-content"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { fetchVideosPageData } from "@/lib/api/videos"
import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

export const metadata: Metadata = {
  title: "Official Videos & Documentaries - Ministry of Fisheries",
  description:
    "Watch official videos from the Ministry of Fisheries, Aquatic and Ocean Resources, including fisheries programmes, aquaculture projects, community initiatives and marine conservation activities.",
}

interface VideosPageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function VideosPage({ searchParams }: VideosPageProps) {
  const lang = await getServerLanguage(searchParams)

  const [videosData, headerFooterData] = await Promise.all([
    fetchVideosPageData(lang),
    fetchHeaderFooterData(),
  ])

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Media Centre", href: "/media-centre/videos" },
            { label: "Videos" },
          ]}
        />

        <VideosPageContent initialData={videosData} />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}