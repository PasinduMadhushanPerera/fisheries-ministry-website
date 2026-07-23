import type { Metadata } from "next"

import { LicenceGuidance } from "@/components/services/licence-guidance"
import { LicenceHelp } from "@/components/services/licence-help"
import { LicenceServiceList } from "@/components/services/licence-service-list"
import { LicencesHero } from "@/components/services/licences-hero"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Licences & Registrations",
  description:
    "Browse fisheries licences, permits, registrations and renewals offered by the Ministry of Fisheries, Aquatic and Ocean Resources, Sri Lanka.",
}

export default function LicencesAndRegistrationsPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content">
        <Breadcrumb
          items={[
            {
              label: "Services",
              href: "/services",
            },
            {
              label: "Licences & Registrations",
            },
          ]}
        />

        <LicencesHero />

        <LicenceServiceList />

        <LicenceGuidance />

        <LicenceHelp />
      </main>

      <SiteFooter />
    </>
  )
}