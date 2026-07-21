import { CapabilityStats } from "@/components/home/capability-stats"
import { CitizenHelp } from "@/components/home/citizen-help"
import { DocumentsSection } from "@/components/home/documents-section"
import { FeaturedProgrammes } from "@/components/home/featured-programmes"
import { HomeHero } from "@/components/home/home-hero"
import { InstitutionsSection } from "@/components/home/institutions-section"
import { LatestNews } from "@/components/home/latest-news"
import { LatestNotices } from "@/components/home/latest-notices"
import { PopularServices } from "@/components/home/popular-services"
import { QuickActions } from "@/components/home/quick-actions"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main
        id="main-content"
        tabIndex={-1}
        className="outline-none"
      >
        <HomeHero />
        <QuickActions />
        <LatestNotices />
        <LatestNews />
        <PopularServices />
        <FeaturedProgrammes />
        <CapabilityStats />
        <InstitutionsSection />
        <DocumentsSection />
        <CitizenHelp />
      </main>

      <SiteFooter />
    </>
  )
}