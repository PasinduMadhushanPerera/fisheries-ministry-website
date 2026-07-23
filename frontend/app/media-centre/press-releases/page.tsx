import type { Metadata } from "next"

import { FeaturedPressRelease } from "@/components/media/featured-press-release"
import { PressReleaseList } from "@/components/media/press-release-list"
import { PressReleasesHero } from "@/components/media/press-releases-hero"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "Press Releases | Media Centre",
  description:
    "Read official press releases, public statements and verified announcements issued by the Ministry of Fisheries, Aquatic and Ocean Resources.",
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
    label: "Press Releases",
  },
]

export default function PressReleasesPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <Breadcrumb items={breadcrumbItems} />

        <PressReleasesHero />

        <FeaturedPressRelease />

        <PressReleaseList />
      </main>

      <SiteFooter />
    </>
  )
}