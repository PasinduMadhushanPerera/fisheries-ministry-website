import type { Metadata } from "next"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { FormsHelp } from "@/components/resources/forms/forms-help"
import { FormsHero } from "@/components/resources/forms/forms-hero"
import { FormsList } from "@/components/resources/forms/forms-list"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Forms & Applications",
  description:
    "Browse and download official Ministry forms for licensing, registration, applications and fisheries services.",
}

export default function FormsPage() {
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
              label: "Forms",
            },
          ]}
        />

        <FormsHero />
        <FormsList />
        <FormsHelp />
      </main>

      <SiteFooter />
    </>
  )
}