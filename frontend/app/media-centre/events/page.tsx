import type { Metadata } from "next"

import { EventsList } from "@/components/media/events-list"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { fetchHeaderFooterData } from "@/lib/api/header-footer"
import { fetchEventsPageData } from "@/lib/api/events"
import { getServerLanguage } from "@/lib/get-server-language"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

export const metadata: Metadata = {
  title: "Events & Programmes - Media Centre | Ministry of Fisheries",
  description:
    "Explore official symposiums, workshops, coastal fisher safety training, aquaculture conferences, and public events organized by the Ministry of Fisheries, Sri Lanka.",
}

interface EventsPageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const lang = await getServerLanguage(searchParams)

  const [eventsData, headerFooterData] = await Promise.all([
    fetchEventsPageData(lang),
    fetchHeaderFooterData(),
  ])

  return (
    <>
      <SiteHeader initialHeader={headerFooterData?.header} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Media Centre", href: "/media-centre/events" },
            { label: "Events & Programmes" },
          ]}
        />

        <EventsList initialData={eventsData} />
      </main>

      <SiteFooter initialFooter={headerFooterData?.footer} />
    </>
  )
}
