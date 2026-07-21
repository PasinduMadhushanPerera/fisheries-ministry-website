import type { Metadata } from "next"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { PublicationsGrid } from "@/components/resources/publications/publications-grid"
import { PublicationsHelp } from "@/components/resources/publications/publications-help"
import { PublicationsHero } from "@/components/resources/publications/publications-hero"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Browse official Ministry publications, research materials, statistical documents and public information guides.",
}

export default function PublicationsPage() {
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
              href: "/resources",
            },
            {
              label: "Publications",
            },
          ]}
        />

        <PublicationsHero />
        <PublicationsGrid />
        <PublicationsHelp />
      </main>

      <SiteFooter />
    </>
  )
}