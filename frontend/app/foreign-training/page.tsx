import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { ForeignTrainingPageContent } from "@/components/services/foreign-training-page-content"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { fetchForeignTrainingPageData } from "@/lib/api/foreign-training"
import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Foreign Training & Overseas Fellowships - Ministry of Fisheries",
  description:
    "Discover international oceanography courses, overseas scholarships, bilateral technical seminars, and global ocean science fellowships provided by the Ministry of Fisheries.",
}

interface ForeignTrainingPageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function ForeignTrainingPage({ searchParams }: ForeignTrainingPageProps) {
  const lang = await getServerLanguage(searchParams)

  const [foreignTrainingData, headerFooterData] = await Promise.all([
    fetchForeignTrainingPageData(lang),
    fetchHeaderFooterData(),
  ])

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb items={[{ label: "Foreign Training" }]} />

        <ForeignTrainingPageContent initialData={foreignTrainingData} />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}
