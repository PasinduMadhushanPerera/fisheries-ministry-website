import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { AnnualReportsContent } from "@/components/statistics/annual-reports-content"
import { fetchAnnualStatisticsData } from "@/lib/api/annual-statistics"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

export const metadata: Metadata = {
  title: "Annual Statistics Reports - Ministry of Fisheries",
  description:
    "Browse and download official annual fisheries statistics, statistical bulletins and supporting datasets published by the Ministry.",
}

interface PageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function AnnualStatisticsReportsPage({ searchParams }: PageProps) {
  const currentLang = await getServerLanguage(searchParams)

  const [statisticsData, headerFooterData] = await Promise.all([
    fetchAnnualStatisticsData(currentLang),
    fetchHeaderFooterData().catch(() => null),
  ])

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Statistics", href: "/statistics" },
            { label: "Annual Statistics Reports" },
          ]}
        />

        <AnnualReportsContent initialData={statisticsData} />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}
