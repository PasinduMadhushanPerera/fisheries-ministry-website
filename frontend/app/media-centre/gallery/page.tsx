import type { Metadata } from "next"

import { FeaturedGallery } from "@/components/media/featured-gallery"
import { GalleryGrid } from "@/components/media/gallery-grid"
import { GalleryHero } from "@/components/media/gallery-hero"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Photo Gallery | Media Centre",
  description:
    "Browse official photo galleries from the Ministry of Fisheries, Aquatic and Ocean Resources, including fisheries programmes, aquaculture projects, community initiatives and official events.",
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
    label: "Gallery",
  },
]

export default function GalleryPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <Breadcrumb items={breadcrumbItems} />

        <GalleryHero />

        <FeaturedGallery />

        <GalleryGrid />
      </main>

      <SiteFooter />
    </>
  )
}