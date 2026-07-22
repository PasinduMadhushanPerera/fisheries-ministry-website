import type { Metadata } from "next"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"

import { CitizensHero } from "@/components/services/citizens-hero"
import { CitizenGuidance } from "@/components/services/citizen-guidance"
import { CitizenHelp } from "@/components/services/citizen-help"
import { CitizenQuickTasks } from "@/components/services/citizen-quick-tasks"
import { CitizenServiceCards } from "@/components/services/citizen-service-cards"

export const metadata: Metadata = {
  title: "Services for Citizens",
  description:
    "Access fisheries-related services for citizens, including fishing licences, fisher and vessel registrations, welfare programmes, training opportunities, forms and application guidance.",
}

export default function CitizenServicesPage() {
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
              label: "Services for Citizens",
            },
          ]}
        />

        <CitizensHero />

        <CitizenQuickTasks />

        <CitizenServiceCards />

        <CitizenGuidance />

        <CitizenHelp />
      </main>

      <SiteFooter />
    </>
  )
}