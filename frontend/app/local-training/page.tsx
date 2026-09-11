import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { LocalTrainingPageContent } from "@/components/services/local-training-page-content"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { fetchLocalTrainingPageData } from "@/lib/api/local-training"
import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Local Training Opportunities - Ministry of Fisheries",
  description:
    "Browse local training courses, workshops, professional development programmes and capacity building opportunities provided by the Ministry of Fisheries.",
}

interface LocalTrainingPageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function LocalTrainingPage({ searchParams }: LocalTrainingPageProps) {
  const lang = await getServerLanguage(searchParams)

  const [localTrainingData, headerFooterData] = await Promise.all([
    fetchLocalTrainingPageData(lang),
    fetchHeaderFooterData(),
  ])

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb items={[{ label: "Local Training" }]} />

        <LocalTrainingPageContent initialData={localTrainingData} />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}
