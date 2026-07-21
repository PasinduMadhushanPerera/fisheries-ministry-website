import type { Metadata } from "next"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { DocumentsHelp } from "@/components/resources/documents/documents-help"
import { DocumentsHero } from "@/components/resources/documents/documents-hero"
import { DocumentsList } from "@/components/resources/documents/documents-list"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Documents & Downloads",
  description:
    "Search and download official Ministry policies, guidelines, reports, forms and public documents.",
}

export default function DocumentsPage() {
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
              label: "Documents & Downloads",
            },
          ]}
        />

        <DocumentsHero />
        <DocumentsList />
        <DocumentsHelp />
      </main>

      <SiteFooter />
    </>
  )
}