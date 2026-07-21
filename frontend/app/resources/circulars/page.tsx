import type { Metadata } from "next"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { CircularsHelp } from "@/components/resources/circulars/circulars-help"
import { CircularsHero } from "@/components/resources/circulars/circulars-hero"
import { CircularsList } from "@/components/resources/circulars/circulars-list"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Circulars",
  description:
    "Browse and download official Ministry circulars, administrative instructions and procedural guidance.",
}

export default function CircularsPage() {
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
              label: "Circulars",
            },
          ]}
        />

        <CircularsHero />
        <CircularsList />
        <CircularsHelp />
      </main>

      <SiteFooter />
    </>
  )
}