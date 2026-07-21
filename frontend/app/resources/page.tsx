import type { Metadata } from "next"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { FeaturedResources } from "@/components/resources/featured-resources"
import { ResourceCategories } from "@/components/resources/resource-categories"
import { ResourceHelp } from "@/components/resources/resource-help"
import { ResourcesHero } from "@/components/resources/resources-hero"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Access Ministry documents, publications, annual reports, circulars, forms and tender information.",
}

export default function ResourcesPage() {
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
              label: "Resources",
            },
          ]}
        />

        <ResourcesHero />
        <ResourceCategories />
        <FeaturedResources />
        <ResourceHelp />
      </main>

      <SiteFooter />
    </>
  )
}