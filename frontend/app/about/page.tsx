import type { Metadata } from "next"

import { DepartmentsSection } from "@/components/about/departments-section"
import { MinistryLeadership } from "@/components/about/ministry-leadership"
import { MinistryOverview } from "@/components/about/ministry-overview"
import { OrganizationalStructure } from "@/components/about/organizational-structure"
import { VisionMission } from "@/components/about/vision-mission"
import { MinistryObjectives } from "@/components/about/ministry-objectives"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { MinistryTimeline } from "@/components/about/ministry-timeline"
import { AboutCTA } from "@/components/about/about-cta"
import { fetchAboutPageData } from "@/lib/api/about"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"

import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "About the Ministry",
  description:
    "Learn about the Ministry of Fisheries, Aquatic and Ocean Resources, its responsibilities, vision, mission and leadership.",
}

interface AboutPageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function AboutPage({ searchParams }: AboutPageProps) {
  const lang = await getServerLanguage(searchParams)

  const [aboutData, headerFooterData] = await Promise.all([
    fetchAboutPageData(lang),
    fetchHeaderFooterData(lang),
  ])

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

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

        {/* 1. Overview & Key Public Pillars */}
        <MinistryOverview initialOverview={aboutData?.overview} />

        {/* 2. Vision & Mission Section */}
        <VisionMission initialVisionMission={aboutData?.vision_mission} />

        {/* 3 & 4. Policy Objectives (Header & Cards) */}
        <MinistryObjectives
          initialHeader={aboutData?.objective_header || (aboutData as any)?.objectives_header}
          initialObjectives={aboutData?.objectives}
        />

        {/* 5 & 6. Ministry Leadership (Header & Cards) */}
        <MinistryLeadership
          initialHeader={aboutData?.leadership_header}
          initialLeaders={aboutData?.leaders || (aboutData as any)?.leadership}
          lang={lang}
        />

        {/* 7. Organizational Structure & Chart */}
        <OrganizationalStructure initialStructure={aboutData?.structure} />

        {/* 8 & 9. Departments & Statutory Institutions (Header & Cards) */}
        {/* <DepartmentsSection
          initialHeader={aboutData?.department_header}
          initialDepartments={aboutData?.departments}
        /> */}

        {/* 10 & 11. Historical Milestones & Timeline (Header & Events) */}
        <MinistryTimeline
          initialHeader={aboutData?.timeline_header}
          initialTimeline={aboutData?.timeline}
        />

        {/* 12. Call to Action Banner */}
        {/* <AboutCTA initialCTA={aboutData?.cta} /> */}
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}