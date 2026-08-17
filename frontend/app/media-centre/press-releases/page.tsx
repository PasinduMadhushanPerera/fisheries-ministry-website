import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { PressReleasesPageContent } from "@/components/media/press-releases-page-content"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { fetchPressReleasesPageData } from "@/lib/api/press-releases"
import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

export const metadata: Metadata = {
  title: "Press Releases & Official Statements - Ministry of Fisheries",
  description:
    "Read official press releases, policy statements, and verified media announcements issued by the Ministry of Fisheries.",
}

interface PressReleasesPageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function PressReleasesPage({ searchParams }: PressReleasesPageProps) {
  const lang = await getServerLanguage(searchParams)

  const [pressData, headerFooterData] = await Promise.all([
    fetchPressReleasesPageData(lang),
    fetchHeaderFooterData(),
  ])

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Media Centre", href: "/media-centre/press-releases" },
            { label: "Press Releases" },
          ]}
        />

        <PressReleasesPageContent initialData={pressData} />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}