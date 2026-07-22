import type { Metadata } from "next"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"

import { BusinessesHero } from "@/components/services/businesses-hero"
import { BusinessGuidance } from "@/components/services/business-guidance"
import { BusinessHelp } from "@/components/services/business-help"
import { BusinessQuickTasks } from "@/components/services/business-quick-tasks"
import { BusinessServiceCards } from "@/components/services/business-service-cards"

export const metadata: Metadata = {
  title: "Services for Businesses",
  description:
    "Access fisheries-related services for businesses, including commercial fishing, import and export permits, aquaculture approvals, processing establishment requirements, investment programmes and official forms.",
}

export default function BusinessServicesPage() {
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
              label: "Services for Businesses",
            },
          ]}
        />

        <BusinessesHero />

        <BusinessQuickTasks />

        <BusinessServiceCards />

        <BusinessGuidance />

        <BusinessHelp />
      </main>

      <SiteFooter />
    </>
  )
}