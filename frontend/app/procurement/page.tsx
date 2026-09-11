import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { ProcurementPageContent } from "@/components/services/procurement-page-content"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { fetchProcurementPageData } from "@/lib/api/procurement"
import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Procurement & Tenders Portal - Ministry of Fisheries",
  description:
    "Official e-procurement portal of the Ministry of Fisheries. Access bidding documents, purchasing tenders, harbour construction notices, and contract awards.",
}

interface ProcurementPageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function ProcurementPage({ searchParams }: ProcurementPageProps) {
  const lang = await getServerLanguage(searchParams)

  const [procurementData, headerFooterData] = await Promise.all([
    fetchProcurementPageData(lang),
    fetchHeaderFooterData(),
  ])

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb items={[{ label: "Procurement & Tenders" }]} />

        <ProcurementPageContent initialData={procurementData} />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}
