import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { RtiPageContent } from "@/components/rti/rti-page-content"
import { fetchRtiPageData } from "@/lib/api/rti"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Right to Information (RTI) - Ministry of Fisheries",
  description:
    "Official Right to Information portal of the Ministry of Fisheries. Access legislation, RTI request forms, designated officers, biannual reports, and proactive disclosures.",
}

export default async function RTIPage() {
  const initialData = await fetchRtiPageData("en")

  return (
    <>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Right to Information" },
          ]}
        />

        <RtiPageContent initialData={initialData} />
      </main>

      <SiteFooter />
    </>
  )
}
