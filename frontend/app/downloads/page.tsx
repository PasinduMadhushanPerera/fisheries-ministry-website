import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { DownloadsPageContent } from "@/components/downloads/downloads-page-content"
import { fetchDownloadsPageData } from "@/lib/api/downloads"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

export const metadata: Metadata = {
  title: "Downloads & Document Portal - Ministry of Fisheries",
  description:
    "Access official Ministry circulars, forms, policy documents, project disclosures, performance reports, statistics and public resources.",
}

interface PageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function DownloadsPage({ searchParams }: PageProps) {
  const currentLang = await getServerLanguage(searchParams)

  const [initialData, headerFooterData] = await Promise.all([
    fetchDownloadsPageData(currentLang),
    fetchHeaderFooterData(currentLang).catch(() => null),
  ])

  const breadcrumbItems =
    currentLang === "si"
      ? [
          { label: "මුල් පිටුව", href: "/?lang=si" },
          { label: "බාගත කිරීම්" },
        ]
      : currentLang === "ta"
      ? [
          { label: "முகப்பு", href: "/?lang=ta" },
          { label: "பதிவிறக்கங்கள்" },
        ]
      : [
          { label: "Home", href: "/" },
          { label: "Downloads" },
        ]

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb items={breadcrumbItems} />

        <DownloadsPageContent initialData={initialData} />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}
