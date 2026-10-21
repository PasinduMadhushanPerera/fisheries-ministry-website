import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { RtiPageContent } from "@/components/rti/rti-page-content"
import { fetchRtiPageData } from "@/lib/api/rti"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Right to Information (RTI) - Ministry of Fisheries",
  description:
    "Official Right to Information portal of the Ministry of Fisheries. Access legislation, RTI request forms, designated officers, biannual reports, and proactive disclosures.",
}

interface RTIPageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function RTIPage({ searchParams }: RTIPageProps) {
  const lang = await getServerLanguage(searchParams)

  const [initialData, headerFooterData] = await Promise.all([
    fetchRtiPageData(lang),
    fetchHeaderFooterData(lang),
  ])

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            {
              label:
                lang === "si"
                  ? "තොරතුරු දැනගැනීමේ අයිතිය"
                  : lang === "ta"
                  ? "தகவல் அறியும் உரிமை"
                  : "Right to Information",
            },
          ]}
        />

        <RtiPageContent initialData={initialData} lang={lang} />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}
