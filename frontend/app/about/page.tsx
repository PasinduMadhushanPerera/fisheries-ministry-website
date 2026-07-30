import type { Metadata } from "next"

import { AboutHero } from "@/components/about/about-hero"
import { CoreResponsibilities } from "@/components/about/core-responsibilities"
import { DepartmentsSection } from "@/components/about/departments-section"
import { MinistryLeadership } from "@/components/about/ministry-leadership"
import { MinistryOverview } from "@/components/about/ministry-overview"
import { OrganizationalStructure } from "@/components/about/organizational-structure"
import { StrategicPriorities } from "@/components/about/strategic-priorities"
import { VisionMission } from "@/components/about/vision-mission"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { CoreValues } from "@/components/about/core-values"
import { MinistryTimeline } from "@/components/about/ministry-timeline"
import { AboutCTA } from "@/components/about/about-cta"

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
        {/* <CoreResponsibilities /> */}
        <MinistryLeadership />
        <OrganizationalStructure />
        <DepartmentsSection />
        {/* <StrategicPriorities /> */}
        {/* <CoreValues/> */}
        <MinistryTimeline />
        <AboutCTA />
      </main>

      <SiteFooter />
    </>
  )
}