import type { Metadata } from "next"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { TendersHelp } from "@/components/resources/tenders/tenders-help"
import { TendersHero } from "@/components/resources/tenders/tenders-hero"
import { TendersList } from "@/components/resources/tenders/tenders-list"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Tenders & Procurement",
  description:
    "Browse Ministry tender notices, procurement opportunities, consultancy requests and bidding documents.",
}

export default function TendersPage() {
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
              label: "Tenders",
            },
          ]}
        />

        <TendersHero />
        <TendersList />
        <TendersHelp />
      </main>

      <SiteFooter />
    </>
  )
}