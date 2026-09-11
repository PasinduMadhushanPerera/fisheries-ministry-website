import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { RecruitmentPageContent } from "@/components/services/recruitment-page-content"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { fetchRecruitmentPageData } from "@/lib/api/recruitment"
import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Recruitment & Vacancies Portal - Ministry of Fisheries",
  description:
    "Official recruitment portal of the Ministry of Fisheries. View public service vacancies, gazette job notices, research fellowships, and career application forms.",
}

interface RecruitmentPageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function RecruitmentPage({ searchParams }: RecruitmentPageProps) {
  const lang = await getServerLanguage(searchParams)

  const [recruitmentData, headerFooterData] = await Promise.all([
    fetchRecruitmentPageData(lang),
    fetchHeaderFooterData(),
  ])

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb items={[{ label: "Recruitment & Vacancies" }]} />

        <RecruitmentPageContent initialData={recruitmentData} />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}
