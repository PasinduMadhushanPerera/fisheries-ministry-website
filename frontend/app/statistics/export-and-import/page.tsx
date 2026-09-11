import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { ExportImportContent } from "@/components/statistics/export-import-content"
import { fetchExportImportData } from "@/lib/api/export-import-statistics"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

export const metadata: Metadata = {
  title: "Export and Import Statistics - Ministry of Fisheries",
  description:
    "Official monthly statistics on fish exports, imports, trade values and related fisheries-sector data.",
}

interface PageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function ExportAndImportPage({ searchParams }: PageProps) {
  const currentLang = await getServerLanguage(searchParams)

  const [tradeData, headerFooterData] = await Promise.all([
    fetchExportImportData(currentLang),
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
            { label: "Export and Import" },
          ]}
        />

        <ExportImportContent initialData={tradeData} />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}
