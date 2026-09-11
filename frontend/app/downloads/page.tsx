import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { DownloadsPageContent } from "@/components/downloads/downloads-page-content"
import { fetchDownloadsPageData } from "@/lib/api/downloads"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Downloads & Document Portal - Ministry of Fisheries",
  description:
    "Access official Ministry circulars, forms, policy documents, project disclosures, performance reports, statistics and public resources.",
}

export default async function DownloadsPage() {
  const initialData = await fetchDownloadsPageData("en")

  return (
    <>
      <SiteHeader />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Downloads" },
          ]}
        />

        <DownloadsPageContent initialData={initialData} />
      </main>

      <SiteFooter />
    </>
  )
}
