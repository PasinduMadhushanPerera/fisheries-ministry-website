import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { NoticesPageContent } from "@/components/media/notices-page-content"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { fetchNoticesPageData } from "@/lib/api/notices"
import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

export const metadata: Metadata = {
  title: "Official Notices & Circulars - Ministry of Fisheries",
  description:
    "Browse official Ministry of Fisheries notices, circulars, tender announcements, recruitment updates, and public consultations.",
}

interface NoticesPageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function NoticesPage({ searchParams }: NoticesPageProps) {
  const lang = await getServerLanguage(searchParams)

  const [noticesData, headerFooterData] = await Promise.all([
    fetchNoticesPageData(lang),
    fetchHeaderFooterData(),
  ])

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Media Centre", href: "/media-centre/notices" },
            { label: "Notices" },
          ]}
        />

        <NoticesPageContent initialData={noticesData} />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}