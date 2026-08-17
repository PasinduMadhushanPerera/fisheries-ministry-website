import type { Metadata } from "next"

import { GalleryPageContent } from "@/components/media/gallery-page-content"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { fetchGalleryPageData } from "@/lib/api/gallery"
import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

export const metadata: Metadata = {
  title: "Photo Gallery & Media Archive - Ministry of Fisheries",
  description:
    "Browse official photo collections from the Ministry of Fisheries, including coastal development programmes, aquaculture projects, and state events.",
}

interface GalleryPageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const lang = await getServerLanguage(searchParams)

  const [galleryData, headerFooterData] = await Promise.all([
    fetchGalleryPageData(lang),
    fetchHeaderFooterData(),
  ])

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Media Centre", href: "/media-centre/gallery" },
            { label: "Gallery" },
          ]}
        />

        <GalleryPageContent initialData={galleryData} />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}