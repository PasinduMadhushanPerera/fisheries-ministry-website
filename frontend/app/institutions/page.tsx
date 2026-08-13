import type { Metadata } from "next"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"

import { FeaturedInstitutions } from "@/components/institutions/featured-institutions"
import { InstitutionsGrid } from "@/components/institutions/institutions-grid"
import { InstitutionsHero } from "@/components/institutions/institutions-hero"
import { InstitutionsOverview } from "@/components/institutions/institutions-overview"

export const metadata: Metadata = {
  title: "Departments & Institutions - Ministry of Fisheries",
  description:
    "Explore the departments, statutory bodies, research institutes and affiliated institutions working together to support fisheries, aquatic resources and sustainable ocean development in Sri Lanka.",
}

export default function InstitutionsPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            {
              label: "Departments & Institutions",
            },
          ]}
        />

        <InstitutionsHero />

        <InstitutionsOverview />

        <FeaturedInstitutions />

        <InstitutionsGrid />
      </main>

      <SiteFooter />
    </>
  )
}