import type { Metadata } from "next"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { AnnualReportsHelp } from "@/components/resources/annual-reports/annual-reports-help"
import { AnnualReportsHero } from "@/components/resources/annual-reports/annual-reports-hero"
import { AnnualReportsList } from "@/components/resources/annual-reports/annual-reports-list"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Annual Reports",
  description:
    "Browse and download official annual reports of the Ministry of Fisheries.",
}

export default function AnnualReportsPage() {
  return (
    <>
      <SiteHeader />

      <main
        id="main-content"
        tabIndex={-1}
        className="outline-none"
      >
        <Breadcrumb
          items={[
            {
              label: "Resources",
              href: "/resources",
            },
            {
              label: "Annual Reports",
            },
          ]}
        />

        <AnnualReportsHero />
        <AnnualReportsList />
        <AnnualReportsHelp />
      </main>

      <SiteFooter />
    </>
  )
}