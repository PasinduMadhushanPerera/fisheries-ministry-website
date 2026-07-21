import type { Metadata } from "next"

import { AboutHero } from "@/components/about/about-hero"
import { CoreResponsibilities } from "@/components/about/core-responsibilities"
import { MinistryLeadership } from "@/components/about/ministry-leadership"
import { MinistryOverview } from "@/components/about/ministry-overview"
import { VisionMission } from "@/components/about/vision-mission"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "About the Ministry",
  description:
    "Learn about the Ministry of Fisheries, Aquatic and Ocean Resources, its responsibilities, vision, mission and leadership.",
}

export default function AboutPage() {
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
              label: "About the Ministry",
            },
          ]}
        />

        <AboutHero />
        <MinistryOverview />
        <VisionMission />
        <CoreResponsibilities />
        <MinistryLeadership />
      </main>

      <SiteFooter />
    </>
  )
}