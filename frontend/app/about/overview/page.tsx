import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { MinistryOverview } from "@/components/about/ministry-overview"
import { VisionMission } from "@/components/about/vision-mission"
import { MinistryObjectives } from "@/components/about/ministry-objectives"
import { MinistryTimeline } from "@/components/about/ministry-timeline"
import { fetchAboutPageData } from "@/lib/api/about"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"

import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "About Overview",
  description: "Overview of the Ministry of Fisheries, Aquatic and Ocean Resources.",
}

interface AboutOverviewPageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function AboutOverviewPage({ searchParams }: AboutOverviewPageProps) {
  const lang = await getServerLanguage(searchParams)

  const [aboutData, headerFooterData] = await Promise.all([
    fetchAboutPageData(lang),
    fetchHeaderFooterData(),
  ])

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            { label: "About Us", href: "/about" },
            { label: "Overview" },
          ]}
        />

        <MinistryOverview initialOverview={aboutData?.overview} />
        <VisionMission initialVisionMission={aboutData?.vision_mission} />
        <MinistryObjectives
          initialHeader={aboutData?.objective_header}
          initialObjectives={aboutData?.objectives}
        />
        <MinistryTimeline
          initialHeader={aboutData?.timeline_header}
          initialTimeline={aboutData?.timeline}
        />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}
