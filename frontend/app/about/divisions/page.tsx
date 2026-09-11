import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { DivisionsDirectory } from "@/components/about/divisions-directory"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { fetchDivisionsPageData } from "@/lib/api/divisions"

import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Ministry Divisions - Ministry of Fisheries",
  description:
    "Explore the divisions responsible for administration, finance, planning, technical services, development, audit, engineering and fisheries statistics within the Ministry.",
}

interface DivisionsPageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function DivisionsPage({ searchParams }: DivisionsPageProps) {
  const lang = await getServerLanguage(searchParams)

  const [divisionsData, headerFooterData] = await Promise.all([
    fetchDivisionsPageData(lang),
    fetchHeaderFooterData(),
  ])

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "About the Ministry", href: "/about" },
            { label: "Divisions" },
          ]}
        />

        <DivisionsDirectory
          initialIntro={divisionsData?.intro}
          initialDivisions={divisionsData?.divisions}
        />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}
