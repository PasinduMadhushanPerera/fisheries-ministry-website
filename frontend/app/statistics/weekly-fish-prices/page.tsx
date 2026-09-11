import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { WeeklyPricesContent } from "@/components/statistics/weekly-prices-content"
import { fetchWeeklyFishPricesData } from "@/lib/api/weekly-fish-prices"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

export const metadata: Metadata = {
  title: "Weekly Fish Prices - Ministry of Fisheries",
  description:
    "Browse official weekly fish price reports published by the Ministry of Fisheries. Access harbor retail and wholesale market intelligence reports.",
}

interface PageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function WeeklyFishPricesPage({ searchParams }: PageProps) {
  const currentLang = await getServerLanguage(searchParams)

  const [pricesData, headerFooterData] = await Promise.all([
    fetchWeeklyFishPricesData(currentLang),
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
            { label: "Weekly Fish Prices" },
          ]}
        />

        <WeeklyPricesContent initialData={pricesData} />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}
