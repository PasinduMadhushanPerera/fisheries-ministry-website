import type { Metadata } from "next"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { FeaturedNews } from "@/components/media/featured-news"
import { NewsHero } from "@/components/media/news-hero"
import { NewsList } from "@/components/media/news-list"

export const metadata: Metadata = {
  title: "News | Media Centre",
  description:
    "Read the latest news, official announcements, fisheries updates, community programmes and events from the Ministry of Fisheries, Aquatic and Ocean Resources.",
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
    label: "News",
  },
]

export default function NewsPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <Breadcrumb items={breadcrumbItems} />

        <NewsHero />

        <FeaturedNews />

        <NewsList />
      </main>

      <SiteFooter />
    </>
  )
}