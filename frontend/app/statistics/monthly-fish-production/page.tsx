import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { MonthlyProductionContent } from "@/components/statistics/monthly-production-content"
import { fetchMonthlyFishProductionData } from "@/lib/api/monthly-fish-production"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

export const metadata: Metadata = {
  title: "Monthly Fish Production - Ministry of Fisheries",
  description:
    "Download official monthly fish production statistics compiled by the Ministry of Fisheries across marine, coastal, and inland sectors.",
}

interface PageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function MonthlyFishProductionPage({ searchParams }: PageProps) {
  const currentLang = await getServerLanguage(searchParams)

  const [productionData, headerFooterData] = await Promise.all([
    fetchMonthlyFishProductionData(currentLang),
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
            { label: "Monthly Fish Production" },
          ]}
        />

        <MonthlyProductionContent initialData={productionData} />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}
