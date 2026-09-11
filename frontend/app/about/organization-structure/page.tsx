import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { OrganizationalStructure } from "@/components/about/organizational-structure"
import { fetchOrganizationStructurePageData } from "@/lib/api/organization-structure"
import { fetchAboutPageData } from "@/lib/api/about"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"

import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Organization Structure - Ministry of Fisheries",
  description: "Organizational hierarchy and structural chart of the Ministry of Fisheries.",
}

interface OrganizationStructurePageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function OrganizationStructurePage({ searchParams }: OrganizationStructurePageProps) {
  const lang = await getServerLanguage(searchParams)

  const [orgData, aboutData, headerFooterData] = await Promise.all([
    fetchOrganizationStructurePageData(lang),
    fetchAboutPageData(lang),
    fetchHeaderFooterData(),
  ])

  const structure = orgData?.structure || aboutData?.structure

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            { label: "About Us", href: "/about" },
            { label: "Organization Structure" },
          ]}
        />

        <OrganizationalStructure initialStructure={structure} />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}
