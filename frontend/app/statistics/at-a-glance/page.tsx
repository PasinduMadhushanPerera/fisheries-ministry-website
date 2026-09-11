import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { AtAGlanceContent } from "@/components/statistics/at-a-glance-content"
import { fetchFisheriesAtAGlanceData } from "@/lib/api/fisheries-statistics"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

export const metadata: Metadata = {
  title: "Fisheries at a Glance - Ministry of Fisheries",
  description:
    "Explore key statistics on fish production, fishing fleets, infrastructure, social information, canned fish, fisheries indicators, exports and imports.",
}

interface PageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function FisheriesAtAGlancePage({ searchParams }: PageProps) {
  const currentLang = await getServerLanguage(searchParams)

  const [statisticsData, headerFooterData] = await Promise.all([
    fetchFisheriesAtAGlanceData(currentLang),
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
            { label: "Fisheries at a Glance" },
          ]}
        />

        <AtAGlanceContent initialData={statisticsData} />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}
