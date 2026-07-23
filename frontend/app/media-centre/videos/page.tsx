import type { Metadata } from "next"

import { FeaturedVideo } from "@/components/media/featured-video"
import { VideoList } from "@/components/media/video-list"
import { VideosHero } from "@/components/media/videos-hero"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Videos | Media Centre",
  description:
    "Watch official videos from the Ministry of Fisheries, Aquatic and Ocean Resources, including fisheries programmes, aquaculture projects, community initiatives and marine conservation activities.",
}

const breadcrumbItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Media Centre",
    href: "/media-centre",
  },
  {
    label: "Videos",
  },
]

export default function VideosPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <Breadcrumb items={breadcrumbItems} />

        <VideosHero />

        <FeaturedVideo />

        <VideoList />
      </main>

      <SiteFooter />
    </>
  )
}