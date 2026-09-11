import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { FisheryInformationContent } from "@/components/statistics/fishery-information-content"
import { fetchFisheryInformationData } from "@/lib/api/fishery-information"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

export const metadata: Metadata = {
  title: "Fishery Related Information - Ministry of Fisheries",
  description:
    "Access landing-site maps, species information, identification resources, processing-establishment details and fisheries census documents.",
}

interface PageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function FisheryRelatedInformationPage({ searchParams }: PageProps) {
  const currentLang = await getServerLanguage(searchParams)

  const [infoData, headerFooterData] = await Promise.all([
    fetchFisheryInformationData(currentLang),
    fetchHeaderFooterData().catch(() => null),
  ])

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Statistics", href: "/statistics" },
            { label: "Fishery Related Information" },
          ]}
        />

        <FisheryInformationContent initialData={infoData} />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}
