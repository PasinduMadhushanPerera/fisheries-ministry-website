import type { Metadata } from "next"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

import { FeaturedNews } from "@/components/media/featured-news"
import { LatestAnnouncements } from "@/components/media/latest-announcements"
import { MediaCategories } from "@/components/media/media-categories"
import { MediaContact } from "@/components/media/media-contact"
import { MediaGalleryPreview } from "@/components/media/media-gallery-preview"
import { MediaHero } from "@/components/media/media-hero"
import { UpcomingEvents } from "@/components/media/upcoming-events"

import { Breadcrumb } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Media Centre",
  description:
    "Stay updated with the latest ministry news, announcements, events, photo galleries and official media resources.",
}

export default function MediaCentrePage() {
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
              label: "Media Centre",
            },
          ]}
        />

        <MediaHero />
        <MediaCategories />
        <FeaturedNews />
        <LatestAnnouncements />
        <UpcomingEvents />
        <MediaGalleryPreview />
        <MediaContact />
      </main>

      <SiteFooter />
    </>
  )
}