import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { NewsPageContent } from "@/components/media/news-page-content"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { fetchNewsPageData } from "@/lib/api/news"
import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

export const metadata: Metadata = {
  title: "News & Media Centre - Ministry of Fisheries",
  description:
    "Read the latest news, official announcements, fisheries updates, community welfare programmes and events from the Ministry of Fisheries, Aquatic and Ocean Resources.",
}

interface NewsPageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const lang = await getServerLanguage(searchParams)

  const [newsData, headerFooterData] = await Promise.all([
    fetchNewsPageData(lang),
    fetchHeaderFooterData(),
  ])

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Media Centre", href: "/media-centre/news" },
            { label: "News" },
          ]}
        />

        <NewsPageContent initialData={newsData} />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}