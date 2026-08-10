import { DocumentsSection } from "@/components/home/documents-section"
import { HomeHero } from "@/components/home/home-hero"
import { InstitutionsSection } from "@/components/home/institutions-section"
import { LatestNews } from "@/components/home/latest-news"
import { PopularServices } from "@/components/home/popular-services"
import { QuickAccess } from "@/components/home/quick-access"
import { QuickInformation } from "@/components/home/quick-information"
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
        {/* 1. Hero */}
        <HomeHero />

        {/* 2. Quick Access */}
        <QuickAccess />

        {/* 3. Latest News */}
        <LatestNews />

        {/* 4. Services and Opportunities */}
        <PopularServices />

        {/* 5. Quick Information & Public Services */}
        <QuickInformation />

        {/* 6. Government Network */}
        <InstitutionsSection />
      </main>

      {/* 7. Footer */}
      <SiteFooter />
    </>
  )
}