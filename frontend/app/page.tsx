import { HomeHero } from "@/components/home/home-hero"
import { InstitutionsSection } from "@/components/home/institutions-section"
import { LatestNews } from "@/components/home/latest-news"
import { PopularServices } from "@/components/home/popular-services"
import { QuickAccess } from "@/components/home/quick-access"
import { QuickInformation } from "@/components/home/quick-information"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { fetchHomePageData } from "@/lib/api/home"

import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0

interface HomePageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const lang = await getServerLanguage(searchParams)

  const [homeData, headerFooterData] = await Promise.all([
    fetchHomePageData(lang),
    fetchHeaderFooterData(),
  ])

  return (
    <>
      {/* Global Header */}
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main
        id="main-content"
        tabIndex={-1}
        className="outline-none"
      >
        {/* 1. Hero Carousel */}
        <HomeHero initialSlides={homeData?.hero_slides} />

        {/* 2. Quick Access Bar */}
        <QuickAccess initialItems={homeData?.quick_access} />

        {/* 3. Media centre : Latest News */}
        <LatestNews initialSection={homeData?.news_section} />

        {/* 4. Ministry Portals : Services and Opportunities */}
        <PopularServices initialSection={homeData?.services_section} />

        {/* 5. Public Portals & Services : Quick Information & Public Services */}
        <QuickInformation initialSection={homeData?.quick_info_section} />

        {/* 6. Government Network : Ministry institutions and service organisations */}
        <InstitutionsSection initialSection={homeData?.institutions_section} />
      </main>

      {/* Global Footer */}
      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}