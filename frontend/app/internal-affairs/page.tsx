import type { Metadata } from "next"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { InternalAffairsOfficers } from "@/components/internal-affairs/internal-affairs-officers"
import { InternalAffairsDocuments } from "@/components/internal-affairs/internal-affairs-documents"
import {
  fetchInternalAffairsOfficers,
  fetchInternalAffairsDocuments,
  fetchInternalAffairsSettings,
} from "@/lib/api/internal-affairs"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

export const metadata: Metadata = {
  title: "Internal Affairs Unit - Ministry of Fisheries",
  description:
    "Submit complaints, report misconduct, or contact the Internal Affairs Unit regarding Ministry services, officer integrity, and public service standards.",
}

interface PageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function InternalAffairsPage({ searchParams }: PageProps) {
  const currentLang = await getServerLanguage(searchParams)

  const [officersData, documentsData, settingsData, headerFooterData] = await Promise.all([
    fetchInternalAffairsOfficers(currentLang),
    fetchInternalAffairsDocuments(currentLang),
    fetchInternalAffairsSettings(currentLang),
    fetchHeaderFooterData().catch(() => null),
  ])

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb items={[{ label: "Internal Affairs Unit" }]} />

        <InternalAffairsOfficers
          initialOfficers={officersData}
          header={settingsData?.officersHeader}
        />

        <InternalAffairsDocuments
          initialDocuments={documentsData}
          header={settingsData?.documentsHeader}
        />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}
